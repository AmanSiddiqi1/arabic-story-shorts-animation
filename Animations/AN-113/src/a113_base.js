// ===== AN-113 The Poor Man and His Friend in Need: base (story constants, time helpers, person rig, props, the jewel stall, sets) =====
// Every value is a pure function of t. Story names carry the PM_ / pm prefix so no engine or Library global is redefined.
const PM_DUR = 179.886;          // narration 176.386 + end hold 3.5 (plan duration + end_hold)
const PM_GR = 900;
const PM_BLUE = C.blue;          // the friend's colour: every helper he sends carries one blue item (the clue)
const PM_GEMC = [C.red, C.blue, '#3f9d4a', C.white];
const PM_PAPER = '#fff3d6';

// ---------- time helpers ----------
const pmB = (t, a, d, e = 'inOut') => K.ease[e](K.clamp((t - a) / d));
const pmIn = (t, a, b) => t >= a && t < b;
const pmFade = (t, a, b, f = 0.2) => K.clamp(Math.min((t - a) / f, (b - t) / f));
const pmWin = (t, a, b, r = 0.25) => K.ease.inOut(K.clamp(Math.min((t - a) / r, (b - t) / r)));
const pmPop = (t, a, d = 0.3) => K.ease.back(K.clamp((t - a) / d));
// track: keys [[t0, value, dur]]; value a number, an array or a function of t; eases from the previous value
function pmTr(t, keys, d0 = 0.3) {
  const val = (v) => (typeof v === 'function' ? v(t) : v);
  let cur = val(keys[0][1]);
  for (let i = 1; i < keys.length; i++) {
    const [t0, v, d] = keys[i]; if (t < t0) break;
    const u = K.ease.inOut(K.clamp((t - t0) / (d ?? d0))), nv = val(v);
    cur = Array.isArray(cur) ? cur.map((c, j) => K.lerp(c, nv[j], u)) : K.lerp(cur, nv, u);
  }
  return cur;
}
const pmNods = (t, list, d = 0.35, amp = 6) => list.reduce((s, a) => s + amp * pulse(t, a, d), 0);
const pmShake = (t, a, d, amp = 0.12, hz = 3.2) => (t > a && t < a + d ? amp * Math.sin((t - a) * hz * 2 * Math.PI) * Math.sin(Math.PI * (t - a) / d) : 0);

// ---------- person rig (body-local <-> world for the Library person; arm tracks in angle space) ----------
const PM_SH = -132;
const pmAge = (P) => P.age ?? (COSTUME[P.costume] || {}).age ?? 0.3;
const pmLean = (P) => (P.lean || 0) + pmAge(P) * 0.12;
function pmOff(P) {
  const sit = K.clamp(P.sit || 0), kn = K.clamp(P.kneel || 0); let hc = [0, -75];
  if (sit > 0) { const S = P.seat === 'floor' ? [0, -24] : [-22, -52]; hc = [K.lerp(0, S[0], sit), K.lerp(-75, S[1], sit)]; }
  if (kn > 0) hc = [K.lerp(hc[0], -4, kn), K.lerp(hc[1], -48, kn)];
  return [hc[0], hc[1] + 75];
}
function pmLoc(P, w) {
  const s = P.s, dir = Math.sign(P.dir || 1), off = pmOff(P), lean = pmLean(P); let lx = (w[0] - P.x) / (s * dir) - off[0], ly = (w[1] - P.y) / s - off[1];
  if (lean) { const c = Math.cos(-lean), n = Math.sin(-lean), y0 = ly + 75; [lx, ly] = [lx * c - y0 * n, lx * n + y0 * c - 75]; }
  return [lx, ly];
}
function pmW(P, l) {
  const s = P.s, dir = P.dir || 1, off = pmOff(P), lean = pmLean(P); let [lx, ly] = l;
  if (lean) { const c = Math.cos(lean), n = Math.sin(lean), y0 = ly + 75; [lx, ly] = [lx * c - y0 * n, lx * n + y0 * c - 75]; }
  lx += off[0]; ly += off[1]; let wx = P.x + lx * s * dir, wy = P.y + ly * s;
  const sq = P.sq ?? 1, tip = P.tip || 0;
  if (sq !== 1) { wx = P.x + (wx - P.x) * (1 + (1 - sq) * 0.7); wy = P.y + (wy - P.y) * sq; }
  if (tip) { const a = tip * Math.sign(dir), dx = wx - P.x, dy = wy - P.y; wx = P.x + dx * Math.cos(a) - dy * Math.sin(a); wy = P.y + dx * Math.sin(a) + dy * Math.cos(a); }
  return [wx, wy];
}
const pmHead = (P) => pmW(P, [(P.look || 0) * 4, -195 + (P.drop || 0) + pmAge(P) * 6]);
const pmMouth = (P) => pmW(P, [(P.look || 0) * 4, -171 + (P.drop || 0) + pmAge(P) * 6]);
function pmHandL(sd, ang) { if (!ang) ang = [0.12, 0.05]; const e1 = [sd * 31 + Math.sin(ang[0]) * 38, PM_SH + Math.cos(ang[0]) * 38]; return [e1[0] + Math.sin(ang[1]) * 36, e1[1] + Math.cos(ang[1]) * 36]; }
const pmHandW = (P, side) => pmW(P, pmHandL(side === 'L' ? -1 : 1, side === 'L' ? P.aL : P.aR));
function pmAng(P, sd, v) { if (v.a) return v.a; return armTo(sd, PM_SH, v.w ? pmLoc(P, v.w) : v); }
// arm track: keys [[t0, target, dur]]; target body-local [x, y], {w: [x, y]} world, {a: [a0, a1]} angles, or a function of t returning one
function pmArm(t, P, sd, keys) { return pmTr(t, keys.map(([t0, v, d]) => [t0, (tt) => pmAng(P, sd, typeof v === 'function' ? v(tt) : v), d])); }
const PMH = { side: [36, -80], sideL: [-36, -80], chest: [6, -122], chestL: [-6, -118], chin: [16, -160], hips: [40, -82], hipsL: [-40, -82], fwd: [100, -150], palm: [62, -104], palmL: [-62, -104],
  up: [44, -205], wave: [64, -196], head: [44, -212], headL: [-44, -212], cheek: [34, -182], cheekL: [-34, -182], mouth: [10, -172], mouthL: [-6, -168], clasp: [30, -134], claspL: [24, -140],
  foldL: [22, -105], foldR: [-18, -112], out: [95, -150], outL: [-95, -150], sash: [18, -82], raise: { a: [2.45, 2.85] }, raiseL: { a: [-2.45, -2.85] }, hush: [8, -170], down: [80, -74], hang: [33, -61], hangL: [-33, -61], wring: [22, -94], wringL: [12, -98] };
function pmLook(t, P, plan, ease = 0.2) { const pl = []; for (const [a, p] of plan) { if (pl.length && a > t) break; pl.push([a, typeof p === 'function' ? p(t) : p]); } return lookAt(pmHead(P), gazePlan(t, pl, ease)); }
// walk from a position function: legs from the distance travelled, amplitude from the speed (feet never slide)
function pmWalk(xf, t, stride = 13) { const x = xf(t), v = Math.abs(speed(xf, t)); return { x, ph: x / stride, amp: v < 4 ? 0 : K.clamp(v / 70) }; }
// final acting pass: blinks on top of a set lid, then draw (with held things)
function pmFin(t, P) { if (P.lid != null && !P.noBlink && P.eyes !== 'wide' && P.eyes !== 'shut') P.lid = Math.min(1, Math.max(P.lid, blink(t, P.seed || 1))); return P; }
function pmDraw(ctx, t, P) { if (!P || P.hidden) return; person(ctx, P); for (const h of P.held || []) h(ctx); }

// ---------- the cast (Library person presets) ----------
const PM_CAST = {
  man: { costume: 'villager', age: 0.35, s: 1.0, seed: 11 },
  wife: { costume: 'villageWoman', s: 0.95, seed: 12 },
  friend: { costume: 'merchant', age: 0.4, s: 1.05, seed: 13 },
  kin1: { costume: 'bedouin', pal: { sash: PM_BLUE }, age: 0.6, s: 1.05, seed: 14 },
  kin2: { costume: 'merchant', pal: { robe: GREEN, dot: GREEND, hc: C.yellow, sash: PM_BLUE }, s: 0.98, seed: 15 },
  kin3: { costume: 'servant', pal: { hc: PM_BLUE }, age: 0.1, s: 0.92, seed: 16 },
  lady: { costume: 'lady', age: 0.8, s: 0.93, seed: 17 },
  nA: { costume: 'beanSeller', s: 0.97, seed: 18 },
  nB: { costume: 'carpenter', age: 0.7, s: 1.0, seed: 19 },
};
const pmC = (who, o = {}) => ({ ...PM_CAST[who], y: PM_GR, dir: 1, ...o });

// ---------- props (story drawings; proposed for Library in library_proposals.md) ----------
// purse: drawstring pouch, (x, y) = bottom centre; fill 0 limp .. 1 fat; rot about the neck; bow: red ribbon
function pmPurse(ctx, x, y, s = 1, o = {}) {
  const f = o.fill ?? 1, w = 30 * (0.55 + 0.45 * f) * s, h = (44 + 8 * (1 - f)) * s, sq = o.sq ?? 1;
  ctx.save(); ctx.translate(x, y); if (o.rot) { ctx.translate(0, -h - 10 * s); ctx.rotate(o.rot); ctx.translate(0, h + 10 * s); } ctx.scale(1 + (1 - sq) * 0.7, sq);
  const pts = [[-w * 0.35, -h], [w * 0.35, -h], [w * 0.95, -h * 0.55], [w, -h * 0.2], [w * 0.7, 0], [-w * 0.7, 0], [-w, -h * 0.2], [-w * 0.95, -h * 0.55], [-w * 0.35, -h]];
  if (f < 0.35) { pts[2][0] *= 0.8; pts[3][0] *= 0.75; pts[6][0] *= 0.75; pts[7][0] *= 0.8; }
  shape(ctx, pts, '#b0692a', { lw: 4 * s, seed: 501, dot: '#7a4212', pitch: 7 * s, rad: 0.2, da: 0.45 });
  shape(ctx, [[-w * 0.38, -h - 2 * s], [w * 0.38, -h - 2 * s], [w * 0.5, -h - 12 * s], [-w * 0.5, -h - 12 * s]], '#c98a3a', { lw: 3 * s, seed: 502 });
  seg(ctx, -w * 0.35, -h + 3 * s, w * 0.35, -h + 3 * s, 4 * s, o.bow ? C.red : C.yellow, 1.5 * s);
  if (f > 0.35) shape(ctx, ell(0, -h * 0.45, 9 * s, 9 * s, 12), C.yellow, { lw: 3 * s, seed: 503 });
  if (o.bow) { const k = o.bow; for (const sd of [-1, 1]) shape(ctx, [[0, -h + 2 * s], [sd * 18 * s * k, -h - 10 * s * k], [sd * 18 * s * k, -h + 12 * s * k]], C.red, { lw: 3 * s, seed: 504 }); shape(ctx, ell(0, -h + 2 * s, 5 * s, 5 * s, 10), C.red, { lw: 3 * s, seed: 505 }); }
  ctx.restore();
}
// a single coin (spin 1 face-on .. 0 edge-on) and a coin heap
function pmCoin(ctx, x, y, r = 10, spin = 1) { shape(ctx, ell(x, y, Math.max(2, r * Math.abs(spin)), r, 14), C.yellow, { lw: 3, seed: 510 }); }
function pmCoinPile(ctx, x, y, n, s = 1, seed = 3) {
  const r = K.rng(seed); for (let i = 0; i < n; i++) { const row = Math.floor(Math.sqrt(i)), k = i - row * row, w = row * 2 + 1, cx = x + (k - row) * 14 * s + (r() - 0.5) * 6 * s, cy = y - (6 - Math.min(6, row)) * 0 - (n > 1 ? (Math.sqrt(n) - row) * 7 * s : 0);
    shape(ctx, ell(cx, cy, 13 * s, 5.5 * s, 12), C.yellow, { lw: 2.5 * s, seed: 511 + (i % 3) }); }
}
// cut gem: hexagon with a facet line and a glint
function pmGem(ctx, x, y, r, col, glint = 0) {
  const pts = []; for (let i = 0; i <= 6; i++) { const a = i / 6 * Math.PI * 2 + Math.PI / 6; pts.push([x + Math.cos(a) * r, y + Math.sin(a) * r * 0.85]); }
  shape(ctx, pts, col, { lw: Math.max(2, r * 0.22), seed: 520 }); seg(ctx, x - r * 0.5, y - r * 0.15, x + r * 0.5, y - r * 0.15, Math.max(1, r * 0.08), C.black, 0);
  ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(x - r * 0.35, y - r * 0.4, r * 0.18, 0, 7); ctx.fill();
  if (glint > 0.02) star(ctx, x + r * 0.6, y - r * 0.7, r * 0.9 * glint, C.white, glint * 2);
}
// necklace hanging from (x, y): 9 gold beads and gems on a loop, rotated by a (swing)
function pmNecklace(ctx, x, y, s = 1, a = 0, t = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(a);
  for (let i = 0; i <= 10; i++) { const u = i / 10, px = Math.sin(u * Math.PI * 2) * 22 * s, py = (1 - Math.cos(u * Math.PI * 2)) * 34 * s; if (i % 3 === 1) pmGem(ctx, px, py, 7 * s, PM_GEMC[i % 4], 0); else shape(ctx, ell(px, py, 5 * s, 5 * s, 8), C.yellow, { lw: 2, seed: 530 }); }
  pmGem(ctx, 0, 70 * s, 10 * s, C.red, 0.5 + 0.5 * Math.sin(t * 5)); ctx.restore();
}
// small jewel box, (x, y) bottom centre, lid 0 shut .. 1 open
function pmBox(ctx, x, y, s = 1, lid = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, K.rectPts(-35, -36, 70, 36), '#a8261a', { lw: 4, seed: 540, dot: '#7a1410', pitch: 7, rad: 0.2, da: 0.4 }); seg(ctx, -35, -18, 35, -18, 4, C.yellow, 1.5);
  ctx.save(); ctx.translate(-35, -36); ctx.rotate(-lid * 1.9); shape(ctx, [[0, 0], [70, 0], [66, -14], [4, -14]], '#c8301e', { lw: 4, seed: 541 }); ctx.restore();
  shape(ctx, K.rectPts(-6, -30, 12, 10), C.yellow, { lw: 2.5, seed: 542 }); ctx.restore();
}
// saddlebag: leather satchel, (x, y) bottom centre, open 0..1 (flap folds back), strap colour (the blue clue)
function pmBag(ctx, x, y, o = {}) {
  const s = o.s ?? 1, op = o.open || 0, sq = o.sq ?? 1, w = 52 * s, h = 80 * s;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(1 + (1 - sq) * 0.7, sq);
  shape(ctx, [[-w, -h * 0.85], [w, -h * 0.85], [w * 1.08, -h * 0.3], [w * 0.9, 0], [-w * 0.9, 0], [-w * 1.08, -h * 0.3], [-w, -h * 0.85]], '#8a501a', { lw: 4.5 * s, seed: 550, dot: '#5b3010', pitch: 8 * s, rad: 0.2, da: 0.45 });
  if (op > 0.05 && o.inside) { ctx.save(); ctx.beginPath(); ctx.rect(-w + 4, -h * 1.4, 2 * w - 8, h * 0.6); ctx.clip(); o.inside(ctx, op); ctx.restore(); }
  const fy = -h * 0.85, fl = h * 0.55 * Math.cos(op * Math.PI);   // flap: down over the front, folding back over the top when open
  shape(ctx, [[-w - 2, fy], [w + 2, fy], [w * 0.8, fy + fl], [-w * 0.8, fy + fl], [-w - 2, fy]], '#a8641e', { lw: 4.5 * s, seed: 551 });
  if (op < 0.5) { seg(ctx, 0, fy + fl * 0.6, 0, -h * 0.12, 9 * s, o.strap || PM_BLUE, 3 * s); shape(ctx, K.rectPts(-8 * s, fy + fl - 6 * s, 16 * s, 12 * s), C.yellow, { lw: 3 * s, seed: 552 }); }
  else seg(ctx, -w * 0.3, fy + fl * 0.3, w * 0.3, fy + fl * 0.3, 8 * s, o.strap || PM_BLUE, 3 * s);
  if (o.glint > 0.02) star(ctx, w * 0.6, fy + fl * 0.6, 16 * s * o.glint, C.white, o.glint * 3);
  ctx.restore();
}
// sealed note: rolled (open 0) or an open sheet unrolled downward (open 1) with verse half-lines; seal 1 whole, 0 broken
function pmNote(ctx, x, y, o = {}) {
  const s = o.s ?? 1, op = K.clamp(o.open || 0);
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  if (op < 0.02) { shape(ctx, K.rectPts(-44, -12, 88, 24), PM_PAPER, { lw: 4, seed: 560 }); shape(ctx, ell(-44, 0, 7, 12, 10), '#efdcae', { lw: 3, seed: 561 }); shape(ctx, ell(44, 0, 7, 12, 10), '#efdcae', { lw: 3, seed: 561 });
    if ((o.seal ?? 1) > 0.5) shape(ctx, ell(0, 0, 13, 13, 12), C.red, { lw: 3, seed: 562 }); ctx.restore(); return; }
  const H = 190 * op, W = 140;
  shape(ctx, K.rectPts(-W / 2, 0, W, H), PM_PAPER, { lw: 4, seed: 563, dot: '#e2c68a', pitch: 9, rad: 0.15, da: 0.3 });
  shape(ctx, ell(0, H, W / 2 + 6, 9, 20), '#efdcae', { lw: 3.5, seed: 564 }); shape(ctx, ell(0, 0, W / 2 + 6, 8, 20), '#efdcae', { lw: 3.5, seed: 565 });
  const L = o.lines || 0; ctx.save(); ctx.beginPath(); ctx.rect(-W / 2, 8, W, H - 14); ctx.clip(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 3;
  for (let i = 0; i < 4; i++) { const k = K.clamp(L - i); if (k <= 0) break; const ly = 34 + i * 40;
    for (const [a, b] of [[60, 8], [-8, -60]]) { const kk = K.clamp(a > 0 ? k * 2 : k * 2 - 1); if (kk <= 0) continue; const xe = K.lerp(a, b, kk); ctx.beginPath(); for (let px = a; px >= xe; px -= 3) ctx.lineTo(px, ly + 3 * Math.sin(px * 0.45 + i)); ctx.stroke(); } }
  ctx.restore(); ctx.restore();
}
// portrait medallion: a person head clipped to a circle with a yellow rim; grey 0..1 drains the colour
function pmMedal(ctx, x, y, r, P, o = {}) {
  const k = o.p ?? 1; if (k <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  ctx.save(); ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fillStyle = o.bg || '#9cc4ff'; ctx.fill(); ctx.fillStyle = dotPat(ctx, C.white, 9, 0.28); ctx.fill(); ctx.clip();
  const s = r / 62, age = P.age ?? 0.3; person(ctx, { ...P, x: 0, y: (195 - age * 6 + 10) * s, s, noBlink: P.lid == null, tip: 0 });
  if (o.grey > 0) { ctx.globalCompositeOperation = 'saturation'; ctx.globalAlpha = K.clamp(o.grey); ctx.fillStyle = '#808080'; ctx.fillRect(-r, -r, 2 * r, 2 * r); ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 0.3 * K.clamp(o.grey); ctx.fillStyle = PM_PAPER; ctx.fillRect(-r, -r, 2 * r, 2 * r); }
  ctx.restore(); ctx.lineWidth = r * 0.16; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.stroke(); ctx.lineWidth = r * 0.08; ctx.strokeStyle = C.yellow; ctx.stroke(); ctx.restore();
}
const PM_FATHER = { costume: 'villager', age: 1, pal: { hc: C.yellow, jewel: C.red }, mouth: 'smile' };
const PM_FRIENDF = { costume: 'merchant', age: 0.4, mouth: 'smile', lid: 0.25 };
// treasure light: halftone disc, tapering rays, glints (strength k)
function pmGlow(ctx, x, y, r, t, k, o = {}) {
  if (k <= 0.01) return; ctx.save(); ctx.globalAlpha = 0.55 * k; ctx.fillStyle = dotPat(ctx, C.yellow, 11, 0.4); ctx.beginPath(); ctx.arc(x, y, r * 0.7, 0, 7); ctx.fill();
  const n = o.n ?? 9, a0 = o.a0 ?? -Math.PI, a1 = o.a1 ?? 0; ctx.globalAlpha = 0.5 * k; ctx.fillStyle = '#ffe680';
  for (let i = 0; i < n; i++) { const a = K.lerp(a0, a1, (i + 0.5) / n) + 0.04 * Math.sin(t * 2 + i), L = r * (0.8 + 0.25 * Math.sin(t * 3 + i * 1.7)); ctx.beginPath(); ctx.moveTo(x + Math.cos(a - 0.06) * 10, y + Math.sin(a - 0.06) * 10); ctx.lineTo(x + Math.cos(a) * L, y + Math.sin(a) * L); ctx.lineTo(x + Math.cos(a + 0.06) * 10, y + Math.sin(a + 0.06) * 10); ctx.fill(); }
  ctx.restore(); const R = K.rng(o.seed ?? 7); for (let i = 0; i < 5; i++) { const gx = x + (R() - 0.5) * r * 1.2, gy = y - R() * r * 0.7, g = Math.max(0, Math.sin(t * 4 + i * 1.9)) * k; if (g > 0.1) star(ctx, gx, gy, 9 * g, C.white, t + i); }
}
// hand-over: the object follows hand A, then eases to hand B over dur with a small weight dip on arrival
function pmHandOver(t, t0, dur, A, B, dip = 6) { if (t < t0) return A; const u = K.clamp((t - t0) / dur), e = K.ease.inOut(u), d = t > t0 + dur ? dip * Math.exp(-(t - t0 - dur) * 10) * Math.sin((t - t0 - dur) * 22) : 0; return [K.lerp(A[0], B[0], e), K.lerp(A[1], B[1], e) - 14 * Math.sin(Math.PI * u) + d]; }
// a dotted path drawn on (p 0..1)
function pmDots(ctx, a, b, p, o = {}) { if (p <= 0) return; const n = Math.max(2, Math.round(Math.hypot(b[0] - a[0], b[1] - a[1]) / (o.gap || 22))); for (let i = 0; i <= n * p; i++) { const u = i / n, bend = (o.bend || 0) * Math.sin(Math.PI * u); ctx.beginPath(); ctx.arc(K.lerp(a[0], b[0], u), K.lerp(a[1], b[1], u) - bend, o.r || 5, 0, 7); ctx.fillStyle = o.col || C.black; ctx.fill(); } }
// glint ring (flash on a clue)
function pmRing(ctx, x, y, t, a, r = 30) { if (t < a || t > a + 0.8) return; const u = (t - a) / 0.8; ctx.save(); ctx.globalAlpha = 1 - u; ctx.lineWidth = 8; ctx.strokeStyle = C.yellow; ctx.beginPath(); ctx.arc(x, y, r * (0.4 + u), 0, 7); ctx.stroke(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.stroke(); ctx.restore(); star(ctx, x + r * 0.5, y - r * 0.5, 14 * Math.sin(Math.PI * u), C.white, u * 3); }
function pmTick(ctx, x, y, s, p) { if (p <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; const pts = [[-22, 0], [-6, 18], [26, -22]], L = K.trim(pts, K.clamp(p)); ctx.lineWidth = 18; ctx.strokeStyle = C.black; K.poly(ctx, L); ctx.stroke(); ctx.lineWidth = 9; ctx.strokeStyle = '#3f9d4a'; K.poly(ctx, L); ctx.stroke(); ctx.restore(); }
function pmCross(ctx, x, y, r, p1, p2, w = 14) { ctx.save(); ctx.lineCap = 'round'; for (const [p, a, b] of [[p1, [-r, -r], [r, r]], [p2, [r, -r], [-r, r]]]) { if (p <= 0) continue; const e = [K.lerp(a[0], b[0], p), K.lerp(a[1], b[1], p)]; ctx.lineWidth = w + 6; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(x + a[0], y + a[1]); ctx.lineTo(x + e[0], y + e[1]); ctx.stroke(); ctx.lineWidth = w; ctx.strokeStyle = C.red; ctx.stroke(); } ctx.restore(); }
function pmStrike(ctx, x0, y0, x1, y1, p) { if (p <= 0) return; ctx.save(); ctx.lineCap = 'round'; const e = [K.lerp(x0, x1, p), K.lerp(y0, y1, p)]; ctx.lineWidth = 16; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(e[0], e[1]); ctx.stroke(); ctx.lineWidth = 9; ctx.strokeStyle = C.red; ctx.stroke(); ctx.restore(); }
// a tiny house icon (at home)
function pmHouseIcon(ctx, x, y, s) { if (s <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, K.rectPts(-30, -40, 60, 40), '#fff3d6', { lw: 4, seed: 570 }); shape(ctx, [[-40, -38], [0, -72], [40, -38]], C.red, { lw: 4, seed: 571 }); shape(ctx, K.rectPts(-9, -24, 18, 24), WOOD, { lw: 3, seed: 572 }); ctx.restore(); }

// ---------- the jewel stall (story drawing: marketStall kind 'jewel', proposed for Library) ----------
// layer 'back' (posts, back cloth, necklace stand) is drawn before the jeweller; 'front' (counter, closing board, tray, awning, sign) after him.
const PM_ST = { x0: 420, x1: 700, top: 790, aw: 560, cx: 560 };
const PM_TRAY = [455, 475, 495, 515, 545, 565, 585, 605].map((x) => [x, PM_ST.top - 22]);
function pmStall(ctx, layer, o = {}) {
  const { x0, x1, top, aw } = PM_ST, op = o.open ?? 1, c = ctx;
  if (layer === 'back') {
    for (const px of [x0 + 12, x1 - 12]) seg(c, px, PM_GR, px, aw + 6, 10, WOOD, 3.5);
    shape(c, K.rectPts(x0 + 18, aw + 30, x1 - x0 - 36, PM_GR - aw - 30), NAVY, { lw: 4, seed: 580, dot: '#2a4fae', pitch: 10, rad: 0.25, da: 0.5 });
    if (op > 0.3) { seg(c, x1 - 60, top, x1 - 60, top - 120, 5, '#4a5878', 2); seg(c, x1 - 88, top - 120, x1 - 32, top - 120, 5, '#4a5878', 2); pmNecklace(c, x1 - 82, top - 118, 0.55, 0, o.t || 0); pmNecklace(c, x1 - 38, top - 118, 0.55, 0, (o.t || 0) + 1); }
    return;
  }
  // counter
  shape(c, [[x0 + 4, top], [x1 - 4, top], [x1 - 4, PM_GR], [x0 + 4, PM_GR]], BARKY, { lw: 6, seed: 581, dot: '#7a4212', pitch: 9, rad: 0.18, da: 0.4 });
  c.save(); K.poly(c, [[x0 + 20, top + 20], [x1 - 20, top + 20], [x1 - 20, PM_GR - 14], [x0 + 20, PM_GR - 14]], true); c.clip(); for (let k = 0, px = x0 + 20; px < x1; px += 30, k++) { c.fillStyle = k % 2 ? C.white : PM_BLUE; c.fillRect(px, top + 20, 30, PM_GR - top); } c.restore(); ink(c, K.rectPts(x0 + 20, top + 20, x1 - x0 - 40, PM_GR - top - 34), 4, 582);
  shape(c, [[x0 + 4, top - 12], [x1 - 4, top - 12], [x1 - 4, top + 4], [x0 + 4, top + 4]], WOOD, { lw: 5, seed: 583 });
  if (op > 0.5) shape(c, K.rectPts(445, top - 22, 170, 12), '#1b3a8f', { lw: 3.5, seed: 584, dot: NAVY2, pitch: 6, rad: 0.3, da: 0.6 });
  // closing board: hinged at the counter edge, swings from up (closed) to hanging over the front (open)
  const bh = top - 12 - (aw + 40), ca = Math.cos(Math.PI * K.clamp(op)), by = top - 12, bt = by - bh * ca;
  if (Math.abs(ca) > 0.03) { shape(c, [[x0 + 8, by], [x1 - 8, by], [x1 - 8, bt], [x0 + 8, bt]], WOOD, { lw: 5, seed: 585, dot: '#7a4212', pitch: 9, rad: 0.16, da: 0.35 }); c.save(); c.lineWidth = 3; c.strokeStyle = C.black; for (let k = 1; k < 4; k++) { const yy = K.lerp(by, bt, k / 4); c.beginPath(); c.moveTo(x0 + 10, yy); c.lineTo(x1 - 10, yy); c.stroke(); } c.restore(); }
  // awning: rolled up (20) to unrolled (90), stripes blue and white, scalloped front
  const fr = aw + K.lerp(22, 90, K.clamp(o.awning ?? op)), cols = [PM_BLUE, C.white];
  const awn = [[x0 - 26, fr], [x0 + 8, aw], [x1 - 8, aw], [x1 + 26, fr]]; c.save(); K.poly(c, awn, true); c.clip(); for (let k = 0, px = x0 - 30; px < x1 + 30; px += 36, k++) { c.fillStyle = cols[k % 2]; c.fillRect(px, aw - 5, 36, fr - aw + 40); } c.restore(); ink(c, awn.concat([awn[0]]), 6, 586);
  if ((o.awning ?? op) < 0.95) shape(c, [[x0 - 30, fr - 12], [x1 + 30, fr - 12], [x1 + 30, fr + 12], [x0 - 30, fr + 12]], PM_BLUE, { lw: 5, seed: 587, dot: C.white, pitch: 8, rad: 0.2, da: 0.5 });
  else for (let k = 0, px = x0 - 26; px < x1 + 26; px += 36, k++) { const sc = ell(px + 18, fr, 18, 16, 14).filter(([, y]) => y >= fr - 1); shape(c, sc, cols[k % 2], { lw: 4.5, seed: 588 }); }
  // sign JEWELS on the valance (pops in)
  const sg = o.sign ?? 0; if (sg > 0.01) { c.save(); c.translate((x0 + x1) / 2, aw - 34); c.scale(sg, sg); shape(c, K.rectPts(-92, -30, 184, 56), C.yellow, { lw: 5, seed: 589 }); c.font = K.font(46, BF, 400); c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = C.black; c.fillText('JEWELS', 0, 0); c.restore(); seg(c, x0 + 40, aw - 4, x0 + 40, aw - 10, 3, C.black, 0); }
}
// the street: four house fronts with three doors (left, centre right, right) behind the stall
// v2: four doors (one per house) so the doors-of-fortune shot can stay close: x centres 255, 384, 760, 915
const PM_HOUSES = [{ x0: -10, x1: 330, top: 480, col: 0, door: [215, 295, 650, 'round'], windows: [[40, 560, 70, 86]] }, { x0: 338, x1: 610, top: 520, col: 1, door: [356, 412, 668, 'round'], windows: [[505, 600, 74, 86]] },
  { x0: 618, x1: 860, top: 470, col: 2, door: [720, 800, 650, 'round'], windows: [] }, { x0: 868, x1: 1010, top: 500, col: 0, door: [880, 950, 650, 'round'], windows: [] }];
const PM_DOORS = [255, 384, 760, 915];
function pmMarketSet(ctx, t, doors = [0, 0, 0, 0]) { return marketStreet(ctx, { palette: 'clear', palace: false, houses: PM_HOUSES, doors, props: [['pots', 330, {}], ['sacks', 1030, {}]], t }); }
// homes
const pmHomeO = (o = {}) => ({ variant: 'merchant', wall: 'ochre', shelves: [], desk: false, treasure: false, curtain: 0.5, ...o });
const pmFriendO = (o = {}) => ({ variant: 'merchant', wall: 'blue', curtain: 0, lampsLit: 1, ...o });
