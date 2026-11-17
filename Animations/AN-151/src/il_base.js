// ===== AN-151 The Illiterate Who Set Up for a Schoolmaster: constants, cast presets, helpers and the film's new props =====
// props (proposed for the Library, see library_proposals.md): ilTurban (bigTurban), ilLetter (letterSheet), ilTablet (writingTablet),
// ilQuilt (quilt: unroll / wrap), ilSnuffer + ilCandle (candleSnuffer), ilWorry (worryScribble), ilBulb, ilTick, ilBroom, ilMosque (mosque front), ilSign
const IL_DUR = 173.5;              // narration 169.528 + 4.0 s end hold, rounded down to the frame
const ilE = (t, a, d, e = 'inOut') => K.ease[e](K.clamp((t - a) / d));
const ilIn = (t, a, b) => t >= a && t < b;
const ilEnv = (t, a, b, f = 0.2) => Math.max(0, Math.min(K.clamp((t - a) / f), K.clamp((b - t) / f)));
const ilP = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];
const ilLp = (a, b, f) => [K.lerp(a[0], b[0], f), K.lerp(a[1], b[1], f)];
const ilSaw = (t, a, b, n) => Math.sin(K.clamp((t - a) / (b - a)) * Math.PI * 2 * n) * (t > a && t < b ? 1 : 0);   // n full oscillations between a and b
const IL_PAPER = '#fbf2da', IL_WOOD = '#8a501a', IL_WOODL = '#c98a3a', IL_GREEN = '#3f9d4a', IL_GREEND = '#2b7a38', IL_TICK = '#2fa84f', IL_GREY = '#9a98a6', IL_BRASS = '#e0a800';

// ---------- cast ----------
const IL_IMP = { costume: 'servant', s: 1, age: 0.3, seed: 3 };
const IL_WOM = { costume: 'villageWoman', s: 0.96, seed: 7 };
const IL_NEI = { costume: 'villager', s: 1, age: 0.55, seed: 13 };
const IL_PUP = [{ costume: 'servant', child: true, seed: 21 }, { costume: 'maiden', child: true, seed: 23 }, { costume: 'servant', child: true, seed: 29, pal: { robe: C.blue, dot: '#0d2f80', hc: C.yellow } }, { costume: 'villager', child: true, seed: 31 }];
const IL_KID = [{ costume: 'villageWoman', child: true, seed: 41 }, { costume: 'villager', child: true, s: 0.9, seed: 43, pal: { robe: C.yellow, dot: C.red } }];
const IL_BED = { costume: 'bedouin', seed: 51 }, IL_LADY = { costume: 'lady', seed: 53 };
const IL_HUS = { costume: 'merchant', age: 0.3, seed: 61 };
const ilWho = (base, extra) => ({ ...base, ...extra });

// world head of a costumed person (centre, radius, head scale, rotation), mirroring personCostumed + the acting wrapper
function ilHead(P) {
  const D = COSTUME[P.costume] || {}, ch = !!P.child, s = (P.s || 1) * (ch ? 0.62 : 1), dir = P.dir || 1, age = ch ? 0 : (P.age ?? D.age ?? 0.3);
  const sit = K.clamp(P.sit || 0), off = sit > 0 ? (P.seat === 'floor' ? [0, 51 * sit] : [-22 * sit, 23 * sit]) : [0, 0], lean = (P.lean || 0) + age * 0.12;
  const hdY = -195 + (P.drop || 0) + age * 6 - (ch ? 9 : 0), hx = (P.look || 0) * 4, dy = hdY + 75;
  let lx = hx * Math.cos(lean) - dy * Math.sin(lean) + off[0], ly = hx * Math.sin(lean) + dy * Math.cos(lean) - 75 + off[1];
  const sq = P.sq ?? 1; let wx = dir * s * lx * (1 + (1 - sq) * 0.7), wy = s * ly * sq;
  const tip = (P.tip || 0) * Math.sign(dir), c = Math.cos(tip), n = Math.sin(tip), hs = s * (ch ? 1.25 : 1);
  return { x: P.x + wx * c - wy * n, y: P.y + wx * n + wy * c, r: 36 * hs, s: hs, rot: tip + dir * (lean + (P.tilt || 0)) };
}
// a world point given in figure-local units (feet at 0, 0; standing, no lean) -> world
function ilW(P, l) { const s = (P.s || 1) * (P.child ? 0.62 : 1), dir = P.dir || 1, sq = P.sq ?? 1, tip = (P.tip || 0) * Math.sign(dir); const wx = dir * s * l[0] * (1 + (1 - sq) * 0.7), wy = s * l[1] * sq;
  return [P.x + wx * Math.cos(tip) - wy * Math.sin(tip), P.y + wx * Math.sin(tip) + wy * Math.cos(tip)]; }

// ---------- bigTurban: enormous turban (180 x 125 at s 1), origin = the wearer's head centre ----------
// o: s (head scale), rot (head rotation), wob (extra lag rotation), slump 0..1 (slides down; 1 = over both eyes), side (-1 | 1: tilts over that eye),
//    hopY (lift), feather (radians of feather lag), tail (sway), squeeze (0..1 squashed sideways: the window jam)
function ilTurban(ctx, x, y, o = {}) {
  const s = o.s || 1, sl = K.clamp(o.slump || 0), sd = o.side ?? 1, sqz = o.squeeze || 0;
  ctx.save(); ctx.translate(x, y); ctx.rotate((o.rot || 0) + (o.wob || 0) + sl * 0.2 * sd * (o.even ? 0 : 1)); ctx.scale(s * (1 - 0.18 * sqz), s * (1 + 0.1 * sqz)); ctx.translate(sd * sl * 4, sl * 30 - (o.hopY || 0));
  const tw = (o.tail || 0) * 10; shape(ctx, [[-76, -50], [-44, -44], [-50 + tw, 28], [-62 + tw, 40], [-80 + tw, 30]], C.white, { lw: 5, seed: 185, dot: C.blue, pitch: 7, rad: 0.2, da: 0.4 });
  shape(ctx, ell(4, -128, 46, 28, 28), C.white, { lw: 6, seed: 181, dot: C.blue, pitch: 8, rad: 0.16, da: 0.3 });
  const dome = ell(0, -84, 90, 58, 44); shape(ctx, dome, C.white, { lw: 6.5, seed: 180 });
  ctx.save(); K.poly(ctx, dome, true); ctx.clip(); ctx.fillStyle = dotPat(ctx, C.blue, 8, 0.24); ctx.globalAlpha = 0.55; ctx.fillRect(-100, -70, 200, 60); ctx.globalAlpha = 1;
  ctx.lineWidth = 4.5; ctx.strokeStyle = C.black; ctx.lineCap = 'round';
  for (let k = 0; k < 5; k++) { const yy = -40 - k * 21, a = (k % 2 ? -1 : 1) * 0.16; ctx.beginPath(); ctx.ellipse(0, yy, 92 - Math.abs(k - 1.5) * 7, 15, a, 0.08 * Math.PI, 0.92 * Math.PI); ctx.stroke(); }
  ctx.restore();
  // feather (lags the head) and jewel
  const fa = -0.35 + (o.feather || 0); ctx.save(); ctx.translate(14, -70); ctx.rotate(fa);
  shape(ctx, [[-5, 0], [-12, -30], [-4, -62], [6, -64], [9, -30], [5, 0]], C.yellow, { lw: 3.5, seed: 182, dot: C.red, pitch: 6, rad: 0.2, da: 0.4 }); seg(ctx, 0, -2, 0, -58, 1, '#c98a00', 1.5); ctx.restore();
  shape(ctx, ell(10, -62, 10, 11, 14), C.red, { lw: 3.5, seed: 183 }); ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(7, -66, 3, 0, 7); ctx.fill();
  if (o.glint > 0 && o.glint < 1) { const gx = K.lerp(-80, 80, o.glint); ctx.save(); K.poly(ctx, dome, true); ctx.clip(); ctx.globalAlpha = Math.sin(Math.PI * o.glint) * 0.9; seg(ctx, gx - 10, -150, gx - 34, -20, 10, C.white, 0); ctx.restore();
    ilStar(ctx, gx, -120, 16 * Math.sin(Math.PI * o.glint)); }
  ctx.restore();
}
// a small 4-point glint star
function ilStar(ctx, x, y, r, col = C.white) { if (r <= 0.5) return; const p = []; for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, rr = i % 2 ? r * 0.28 : r; p.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr]); } shape(ctx, p, col, { lw: 3, seed: 184 }); }
// impact stars (the jam): n yellow stars on a ring that spins and fades
function ilImpact(ctx, x, y, t, t0, r = 40) { const d = t - t0; if (d < 0 || d > 1.0) return; ctx.save(); ctx.globalAlpha *= 1 - d; for (let i = 0; i < 3; i++) { const a = d * 4 + i * 2.1; ilStar(ctx, x + Math.cos(a) * r, y + Math.sin(a) * r * 0.5, 14, C.yellow); } ctx.restore(); }

// ---------- letterSheet: centre (x, y), 90 x 120 at s 1. o: rot, fold 0..1, read 0..1 (lines turn blue right to left), gaze (portrait pupils), crumple 0..1 ----------
function ilLetter(ctx, x, y, s = 1, o = {}) {
  const fold = K.clamp(o.fold || 0), w = 90, h = 120 * (1 - 0.62 * fold), cr = o.crumple || 0;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s); if (o.alpha != null) ctx.globalAlpha *= o.alpha;
  const j = (i) => cr * 5 * Math.sin(i * 2.7 + 1), pts = [[-w / 2 + j(1), -h / 2 + j(2)], [0, -h / 2 + j(3)], [w / 2 + j(4), -h / 2 + j(5)], [w / 2 + j(6), 0], [w / 2 + j(7), h / 2 + j(8)], [0, h / 2 + j(9)], [-w / 2 + j(10), h / 2 + j(11)], [-w / 2 + j(12), 0]];
  shape(ctx, pts, IL_PAPER, { lw: 4 / Math.max(0.6, Math.min(s, 1.4)) * (s > 2 ? 0.8 : 1), seed: 190 });
  if (fold > 0.05) { seg(ctx, -w / 2 + 4, 0, w / 2 - 4, 0, 1, '#e2c68a', 1.5); }
  if (fold < 0.7) { ctx.save(); ctx.globalAlpha *= 1 - fold / 0.7;
    // portrait medallion (the husband) at the top
    const pr = 15, py = -h / 2 + 22; ctx.save(); ctx.beginPath(); ctx.arc(0, py, pr, 0, 7); ctx.fillStyle = '#ffe9a8'; ctx.fill(); ctx.clip();
    person(ctx, { ...IL_HUS, x: 0, y: py + 222 * pr / 58, s: pr / 58, gaze: o.gaze || [0, 0.1], mouth: 'smile', noBlink: true, lid: 0 }); ctx.restore();
    ctx.lineWidth = 2.5; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(0, py, pr, 0, 7); ctx.stroke();
    // six squiggle lines, right-aligned like Arabic; o.read lights them right to left, top to bottom
    const rd = (o.read || 0) * 6;
    for (let i = 0; i < 6; i++) { const yy = -h / 2 + 46 + i * 10, len = i % 2 ? 56 : 70, x1 = 36, f = K.clamp(rd - i);
      ctx.beginPath(); for (let k = 0; k <= 10; k++) ctx.lineTo(x1 - len * k / 10, yy + 1.8 * Math.sin(k * 1.9 + i)); ctx.lineWidth = 2.6; ctx.strokeStyle = C.black; ctx.stroke();
      if (f > 0) { ctx.beginPath(); for (let k = 0; k <= 10 * f; k++) ctx.lineTo(x1 - len * k / 10, yy + 1.8 * Math.sin(k * 1.9 + i)); ctx.lineWidth = 4.5; ctx.strokeStyle = C.blue; ctx.stroke(); } }
    shape(ctx, ell(-28, h / 2 - 12, 7, 7, 12), C.red, { lw: 2.5, seed: 191 });
    ctx.restore(); }
  ctx.restore();
}
// ---------- writingTablet: centre (x, y), 70 x 95 at s 1 (lesson size: s 2.1). o: rot, bands 0..4 (ink written), glow (band index lit), blank ----------
function ilTablet(ctx, x, y, s = 1, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  shape(ctx, K.rectPts(-12, -58, 24, 16), IL_WOOD, { lw: 3.5, seed: 195 }); ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(0, -52, 3.5, 0, 7); ctx.fill();
  shape(ctx, K.rectPts(-35, -47, 70, 95), IL_WOODL, { lw: 4.5, seed: 196, dot: IL_WOOD, pitch: 7, rad: 0.2, da: 0.35 });
  shape(ctx, K.rectPts(-28, -40, 56, 81), '#fff3d6', { lw: 3, seed: 197 });
  const B = o.bands ?? 4;
  for (let i = 0; i < 4; i++) { const f = K.clamp(B - i); if (f <= 0) break; const yy = -28 + i * 18;
    if (o.glow === i) { ctx.save(); ctx.globalAlpha *= 0.8; seg(ctx, 22, yy, -22, yy, 12, C.yellow, 0); ctx.restore(); }
    ctx.beginPath(); for (let k = 0; k <= 8 * f; k++) ctx.lineTo(22 - 44 * k / 8, yy + 2.5 * Math.sin(k * 2.1 + i * 1.3)); ctx.lineWidth = 3.2; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; ctx.stroke(); }
  if (o.letter) { ctx.font = K.font(40, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = C.red; ctx.fillText(o.letter, 0, 4); }
  ctx.restore();
}
// ---------- quilt: patchwork, flat on the ground (bottom centre x, y) with unroll 0..1 from a tied bundle; or wrapped round a lying figure ----------
const IL_QC = [C.red, C.blue, C.yellow, C.white];
function ilQuiltPatches(ctx, quad, cols = 4, rows = 3) { const [a, b, c, d] = quad, at = (u, v) => ilLp(ilLp(a, b, u), ilLp(d, c, u), v);
  for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) { const col = IL_QC[(i + j * 2) % 4], p = [at(i / cols, j / rows), at((i + 1) / cols, j / rows), at((i + 1) / cols, (j + 1) / rows), at(i / cols, (j + 1) / rows)];
    shape(ctx, p, col, { lw: 2.5, seed: 200 + i + j, dot: col === C.white ? C.red : col === C.yellow ? C.red : C.white, pitch: 7, rad: 0.2, da: 0.35 }); }
  ink(ctx, [a, b, c, d, a], 5, 205); }
function ilQuilt(ctx, x, y, s = 1, o = {}) {
  const u = K.clamp(o.unroll ?? 1); ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (u < 0.02) { // tied bundle
    shape(ctx, ell(0, -42, 58, 44, 30), C.red, { lw: 5, seed: 206, dot: C.yellow, pitch: 8, rad: 0.22, da: 0.5 }); shape(ctx, ell(-20, -50, 18, 30, 18), C.blue, { lw: 4, seed: 207, dot: C.white, pitch: 7, rad: 0.2, da: 0.4 });
    seg(ctx, 0, -86, 0, 2, 7, IL_WOODL, 2.5); shape(ctx, [[-4, -86], [-18, -104], [0, -94], [18, -104], [4, -86]], IL_WOODL, { lw: 3, seed: 208 });
  } else { const W = 300 * u, x0 = -150, q = [[x0 + 20, -60], [x0 + 20 + W, -60], [x0 + W, 0], [x0, 0]];
    ctx.save(); ctx.beginPath(); ctx.rect(x0 - 10, -80, W + 30, 90); ctx.clip(); ilQuiltPatches(ctx, [[x0 + 20, -60], [x0 + 320, -60], [x0 + 300, 0], [x0, 0]]); ctx.restore();
    ink(ctx, [q[0], q[1], q[2], q[3], q[0]], 5, 209);
    if (u < 0.98) { const r = 12 + 30 * (1 - u); shape(ctx, ell(x0 + W + 8, -r, r * 0.8, r, 20), C.red, { lw: 4.5, seed: 210, dot: C.yellow, pitch: 7, rad: 0.2, da: 0.45 }); ctx.save(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(x0 + W + 8, -r, r * 0.45, 0, 5); ctx.stroke(); ctx.restore(); } }
  ctx.restore(); }
// the wrap: a cylinder 260 x 100 over a lying figure (feet end at fx, bed y), wrap 0..1 grows from the feet toward the head; spiral at the foot end
function ilQuiltWrap(ctx, fx, y, s = 1, wrap = 1, rock = 0) { if (wrap <= 0) return; const L = 250 * wrap;
  ctx.save(); ctx.translate(fx, y); ctx.rotate(rock); ctx.scale(s, s);
  const q = [[-L, -96], [0, -96], [0, 0], [-L, 0]];
  ctx.save(); K.poly(ctx, q, true); ctx.clip();
  for (let i = -2; i < 12; i++) { const x0 = -L + i * 34 - (1 - wrap) * 60, col = IL_QC[(i + 8) % 4]; shape(ctx, [[x0, -100], [x0 + 34, -100], [x0 + 4, 4], [x0 - 30, 4]], col, { lw: 2.5, seed: 212 + (i & 3), dot: col === C.white ? C.red : C.white, pitch: 7, rad: 0.2, da: 0.3 }); }
  ctx.restore(); ink(ctx, [[-L + 10, -96], [-6, -96]], 6, 213); ink(ctx, [[-L + 10, 0], [-6, 0]], 6, 214);
  shape(ctx, ell(0, -48, 22, 50, 24), C.red, { lw: 5, seed: 215, dot: C.yellow, pitch: 7, rad: 0.2, da: 0.45 });
  ctx.save(); ctx.lineWidth = 3.5; ctx.strokeStyle = C.black; ctx.beginPath(); for (let k = 0; k < 60; k++) { const a = k / 60 * Math.PI * 5, r = 4 + k * 0.6; ctx.lineTo(Math.cos(a) * r * 0.42, -48 + Math.sin(a) * r * 0.95); } ctx.stroke(); ctx.restore();
  shape(ctx, ell(-L, -48, 14, 48, 20), IL_QC[1], { lw: 4.5, seed: 216 });
  ctx.restore(); }
// ---------- candleSnuffer: the hinge end of the handle at (x, y); dip 0..1 swings the cone down; o.dir (-1 | 1) the cone side ----------
function ilSnuffer(ctx, x, y, s = 1, o = {}) { const d = o.dir ?? 1; ctx.save(); ctx.translate(x, y); ctx.scale(s * d, s); ctx.rotate(-0.5 + 0.75 * K.clamp(o.dip || 0) + (o.rot || 0));
  seg(ctx, -10, 0, 110, 0, 9, IL_BRASS, 3); shape(ctx, ell(-14, 0, 9, 9, 12), IL_BRASS, { lw: 3, seed: 218 });
  ctx.save(); ctx.lineWidth = 7; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(110, 0); ctx.quadraticCurveTo(128, 2, 130, 18); ctx.stroke(); ctx.lineWidth = 3.5; ctx.strokeStyle = IL_BRASS; ctx.stroke(); ctx.restore();
  shape(ctx, [[118, 18], [142, 18], [146, 56], [114, 56]], C.yellow, { lw: 4, seed: 219, dot: C.red, pitch: 6, rad: 0.2, da: 0.45 }); ilStar(ctx, 124, 30, 6);
  ctx.restore(); }
// candle: bottom centre (x, y), 20 x 70; out 0..1 (flame shrinks), smoke age (s since out, curl rises and fades)
function ilCandle(ctx, x, y, t, s = 1, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, ell(0, -2, 22, 6, 14), IL_BRASS, { lw: 3, seed: 220 }); shape(ctx, K.rectPts(-10, -72, 20, 70), C.white, { lw: 4, seed: 221, dot: C.blue, pitch: 6, rad: 0.15, da: 0.2 });
  seg(ctx, 0, -72, 0, -80, 1, C.black, 1.5);
  const f = 1 - K.clamp(o.out || 0); if (f > 0.02) { const fl = 1 + 0.12 * Math.sin(t * 17) + 0.06 * Math.sin(t * 29); ctx.save(); ctx.translate(0, -82); ctx.scale(f, f * fl);
    shape(ctx, [[0, -30], [8, -10], [7, 0], [0, 5], [-7, 0], [-8, -10]], C.yellow, { lw: 3, seed: 222 }); shape(ctx, [[0, -16], [4, -5], [0, 1], [-4, -5]], C.red, { lw: 0, seed: 223 }); ctx.restore(); }
  const sa = o.smoke ?? -1; if (sa >= 0 && sa < 1.6) { ctx.save(); ctx.globalAlpha *= 1 - sa / 1.6; ctx.lineWidth = 5; ctx.strokeStyle = '#8c8a94'; ctx.lineCap = 'round'; ctx.beginPath();
    for (let k = 0; k <= 20; k++) { const v = k / 20 * Math.min(1, sa * 2); ctx.lineTo(10 * Math.sin(v * 9 + sa * 3), -84 - v * 70); } ctx.stroke(); ctx.restore(); }
  ctx.restore(); }
// ---------- small effects ----------
function ilWorry(ctx, x, y, t, p, s = 1) { if (p <= 0) return; const k = K.ease.back(K.clamp(p)) * (1 + 0.08 * Math.sin(t * 9)), r = K.rng(77); ctx.save(); ctx.translate(x, y); ctx.scale(k * s, k * s);
  ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); for (let i = 0; i < 28; i++) { const a = i * 1.9 + t * 3; ctx.lineTo(Math.cos(a) * (18 + r() * 14), Math.sin(a * 1.3) * (10 + r() * 10)); } ctx.stroke(); ctx.restore(); }
function ilBulb(ctx, x, y, p, t, o = {}) { const k = K.ease.back(K.clamp(p)); if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate((o.crook ?? 0.35) + 0.05 * Math.sin(t * 6)); ctx.scale(k, k);
  for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * 0.42, r0 = 46, r1 = 62 + 6 * Math.sin(t * 8 + i); seg(ctx, Math.cos(a) * r0, -10 + Math.sin(a) * r0, Math.cos(a) * r1, -10 + Math.sin(a) * r1, 5, C.yellow, 2.5); }
  shape(ctx, [[-30, -18], [-26, -44], [-8, -56], [12, -54], [28, -38], [26, -14], [14, 4], [12, 18], [-12, 18], [-14, 4]], C.yellow, { lw: 5, seed: 225, dot: C.red, pitch: 7, rad: 0.18, da: 0.35 });
  shape(ctx, K.rectPts(-13, 18, 26, 18), '#8c8a94', { lw: 4, seed: 226 }); seg(ctx, -12, 26, 12, 26, 1, C.black, 1.5);
  ctx.save(); ctx.lineWidth = 3; ctx.strokeStyle = C.red; ctx.beginPath(); ctx.moveTo(-8, 4); ctx.lineTo(-4, -20); ctx.lineTo(2, -8); ctx.lineTo(8, -24); ctx.stroke(); ctx.restore(); ctx.restore(); }
function ilTick(ctx, x, y, p, s = 1) { if (p <= 0) return; const k = K.clamp(p); ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const pts = [[-40, 0], [-12, 30], [44, -40]], q = K.trim(pts, k);
  if (q.length > 1) { ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 26; ctx.strokeStyle = C.black; K.poly(ctx, q); ctx.stroke(); ctx.lineWidth = 15; ctx.strokeStyle = IL_TICK; K.poly(ctx, q); ctx.stroke(); } ctx.restore(); }
// broom from the hands (h0 upper, h1 lower) to the bristles at the floor point f
function ilBroom(ctx, h0, f) { const a = Math.atan2(f[1] - h0[1], f[0] - h0[0]), top = [h0[0] - Math.cos(a) * 30, h0[1] - Math.sin(a) * 30];
  seg(ctx, top[0], top[1], f[0], f[1] - 22, 8, IL_WOODL, 3); ctx.save(); ctx.translate(f[0], f[1]); ctx.rotate(a - Math.PI / 2);
  shape(ctx, [[-8, -28], [8, -28], [26, 6], [-26, 6]], '#e8b25a', { lw: 4, seed: 228, dot: IL_WOOD, pitch: 6, rad: 0.2, da: 0.4 }); seg(ctx, -12, -16, 12, -16, 1, C.red, 1.5); ctx.restore(); }
// a pointer stick held at the hand h toward angle a (radians, 0 = right), length L
function ilPointer(ctx, h, a, L = 120) { seg(ctx, h[0] - Math.cos(a) * 14, h[1] - Math.sin(a) * 14, h[0] + Math.cos(a) * L, h[1] + Math.sin(a) * L, 7, IL_WOODL, 3); }
// sweat drop
function ilSweat(ctx, x, y, p) { if (p <= 0) return; ctx.save(); ctx.translate(x, y + 14 * p); ctx.globalAlpha *= Math.min(1, (1 - p) * 4); ctx.beginPath(); ctx.moveTo(0, -12); ctx.quadraticCurveTo(8, 0, 0, 7); ctx.quadraticCurveTo(-8, 0, 0, -12); ctx.fillStyle = '#9cc4ff'; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.stroke(); ctx.restore(); }
// snore bubble
function ilSnore(ctx, x, y, t) { const u = (t * 0.55) % 1, r = 6 + 16 * Math.sin(Math.PI * u); ctx.save(); ctx.globalAlpha *= 0.9; ctx.beginPath(); ctx.arc(x + r * 0.6, y - r * 0.4, r, 0, 7); ctx.fillStyle = '#e6f0ff'; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.stroke(); ctx.restore(); }
// zigzag flash lines
function ilZig(ctx, x, y, p, s = 1) { if (p <= 0 || p >= 1) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= Math.sin(Math.PI * p); for (const sd of [-1, 1]) { ctx.beginPath(); for (let k = 0; k < 5; k++) ctx.lineTo(sd * (24 + k * 3), -20 + k * 10 + (k % 2) * 4 * sd); ctx.lineWidth = 5; ctx.strokeStyle = C.red; ctx.stroke(); } ctx.restore(); }

// ---------- street pieces: mosque front (wall x0..x1, top 420; pointed door; dome with crescent; minaret) and the SCHOOL sign ----------
const IL_MOSQUE = { x0: 1760, x1: 2350, top: 420, door: [2050, 2190, 600], dome: [2120, 420, 110], min: [2300, 200] };
function ilMosqueBack(ctx) { const M = IL_MOSQUE; ctx.drawImage(bake('il_mosque', 700, 920, (c) => { c.translate(-1700, 0);
    const [mx, mt] = M.min; shape(c, K.rectPts(mx - 30, mt, 60, 900 - mt), '#fff3d6', { lw: 6, seed: 231, dot: C.blue, pitch: 11, rad: 0.15, da: 0.3 });
    shape(c, K.rectPts(mx - 42, mt + 120, 84, 18), C.yellow, { lw: 5, seed: 232 }); const md = ell(mx, mt, 30, 40, 20).filter(([, y]) => y <= mt + 1); shape(c, md.concat([[mx - 30, mt]]), C.yellow, { lw: 5, seed: 233, dot: C.red, pitch: 7, rad: 0.2, da: 0.4 });
    seg(c, mx, mt - 40, mx, mt - 62, 4, C.yellow, 2.5);
    const [dx, dy, dr] = M.dome; shape(c, K.rectPts(dx - dr - 10, dy - 40, 2 * dr + 20, 46), '#fff3d6', { lw: 5, seed: 234 });
    const d = ell(dx, dy - 40, dr, dr * 1.0, 40).filter(([, y]) => y <= dy - 39); shape(c, d.concat([[dx - dr, dy - 40]]), IL_GREEN, { lw: 7, seed: 235, dot: IL_GREEND, pitch: 10, rad: 0.2, da: 0.45 });
    seg(c, dx, dy - 40 - dr, dx, dy - 40 - dr - 30, 5, C.yellow, 2.5);
    c.save(); c.translate(dx, dy - 40 - dr - 50); c.beginPath(); c.arc(0, 0, 16, 0.3 * Math.PI, 1.7 * Math.PI, true); c.arc(7, -2, 13, 1.75 * Math.PI, 0.35 * Math.PI, false); c.closePath(); c.fillStyle = C.yellow; c.fill(); c.lineWidth = 4; c.strokeStyle = C.black; c.stroke(); c.restore();
    const holes = [townArchPts(M.door[0], M.door[1], M.door[2], 900, 'pointed')]; townWall(c, [M.x0, M.top, M.x1, 902], holes, '#fff3d6', { dot: C.blue, pitch: 12, rad: 0.15, da: 0.3 });
    ink(c, [[M.x0, 902], [M.x0, M.top], [M.x1, M.top], [M.x1, 902]], 7, 236);
    shape(c, K.rectPts(M.x0 - 8, M.top - 16, M.x1 - M.x0 + 16, 22), C.yellow, { lw: 5, seed: 237, dot: C.red, pitch: 8, rad: 0.2, da: 0.4 });
    for (let x = M.x0 + 30; x < M.x1 - 20; x += 56) shape(c, townArchPts(x - 12, x + 12, M.top + 30, M.top + 70, 'pointed'), C.blue, { lw: 3, seed: 238 });
    ink(c, townArchPts(M.door[0] - 16, M.door[1] + 16, M.door[2] - 20, 900, 'pointed').slice(1, -1), 9, 239);
    shape(c, K.rectPts(M.door[0] - 30, 880, M.door[1] - M.door[0] + 60, 20), '#d9c69a', { lw: 4, seed: 240 });
  }), 1700, 0, 700, 920);
  townDoor(ctx, M.door[0], M.door[1], M.door[2], 880, 0, { arch: 'pointed', paint: IL_GREEN });
}
// the SCHOOL sign: board 240 x 70 hanging on two chains from hooks at (cx +- 90, hookY); drop 0..1 (falls from the top), a = swing angle
function ilSign(ctx, cx, hookY, drop, a) { if (drop <= 0) return; const L = 70 * drop, bx = cx, by = hookY + L;
  ctx.save(); ctx.translate(cx, hookY); ctx.rotate(a); ctx.translate(-cx, -hookY);
  for (const sd of [-1, 1]) { ctx.save(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.ellipse(cx + sd * 90, hookY + (k + 0.5) * L / 5, 4, L / 10 + 1, 0, 0, 7); ctx.stroke(); } ctx.restore(); }
  shape(ctx, K.rectPts(bx - 120, by, 240, 70), C.yellow, { lw: 6, seed: 242, dot: C.red, pitch: 8, rad: 0.2, da: 0.4 });
  ctx.font = K.font(52, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = C.black; ctx.fillText('SCHOOL', bx, by + 38);
  ctx.restore(); for (const sd of [-1, 1]) shape(ctx, ell(cx + sd * 90, hookY, 7, 7, 10), '#4a5878', { lw: 3, seed: 243 }); }
