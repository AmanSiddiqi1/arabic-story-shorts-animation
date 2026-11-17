// ===== KD-012 local assets: lakeShore set, pond, burrow, rock, moonReflection, stump, elephant crown/talk wrapper, bumpChain, hops =====
// Drawn in this story only (Library/ stays untouched); proposed for the Library in ../library_proposals.md.
const GR = 900, VW = 1000, VH = 1230, LW = 2000;
const BX = { B0: 470, B1: 840, B2: 950, B3: 1060, B4: 1170, B5: 1330 };
const ROOMS = { B1: [840, 1010], B2: [950, 1040], B3: [1060, 1005], B4: [1170, 1045] };
const ROCK = { top: [680, 610], l1: [612, 812], l2: [652, 722] };
const STONE_P = [1770, 893], MOON_N = [1640, 300, 80], REFL = [1640, 1000, 62];
const SOIL = '#8a4a16', SOILD = '#5a2e0c', HOLE = '#2a1606';
const B = (t, a, d, e = 'lin') => K.beat(t, a, d, e);
// bake at an explicit resolution (the 2000-wide set at 1.5x keeps memory sane with three render workers)
function bakeK(key, w, h, k, draw) { return K.cached('kd12:' + key, () => { const c = K.layer(Math.round(w * k), Math.round(h * k)), x = c.getContext('2d'); x.scale(k, k); draw(x); return c; }); }

// ---------- pond(ctx, {x, y, w, h, level 0..1, t, seed}): oblique pond whose water shrinks to the centre; cracks on the exposed bed ----------
function pond(ctx, o) {
  const { x, y, w, h } = o, lv = K.clamp(o.level ?? 1), t = o.t || 0, r = K.rng(o.seed || 7);
  shape(ctx, ell(x, y, w / 2, h / 2, 40), '#c08a48', { lw: 6, seed: 61, dot: EARTHD, pitch: 9, rad: 0.2, da: 0.45 });
  const nc = Math.round(K.clamp((0.75 - lv) / 0.65) * 14);
  ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 3;
  for (let i = 0; i < 14; i++) { const a = r() * Math.PI * 2, r0 = 0.35 + r() * 0.2, r1 = r0 + 0.25 + r() * 0.3, k = r(); if (i >= nc) continue;
    ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * w / 2 * r0, y + Math.sin(a) * h / 2 * r0); ctx.lineTo(x + Math.cos(a + 0.15 * (k - 0.5)) * w / 2 * (r0 + r1) / 2 + 6 * (k - 0.5), y + Math.sin(a) * h / 2 * (r0 + r1) / 2); ctx.lineTo(x + Math.cos(a) * w / 2 * Math.min(0.95, r1), y + Math.sin(a) * h / 2 * Math.min(0.95, r1)); ctx.stroke(); }
  ctx.restore();
  if (lv > 0.01) { const k = Math.pow(lv, 0.7), wp = ell(x, y + (1 - k) * 4, w / 2 * 0.92 * k, h / 2 * 0.86 * k, 36);
    shape(ctx, wp, C.blue, { lw: 5, seed: 62, dot: C.white, pitch: 9, rad: 0.14, da: 0.55 });
    for (let i = 0; i < 2; i++) { const u = ((t * 0.12 + i * 0.5) % 1); seg(ctx, x - w * 0.25 * k + u * w * 0.3 * k, y - h * 0.12 * k + i * h * 0.18 * k, x - w * 0.14 * k + u * w * 0.3 * k, y - h * 0.12 * k + i * h * 0.18 * k, 3, C.white, 0); } }
}

// ---------- burrow(ctx, x, y, {crack 0..1, collapse 0..1, eyes: [look, shut] | null, seed}): hare mound with a dark doorway ----------
function burrow(ctx, x, y, o = {}) {
  const c = K.clamp(o.collapse || 0), h = K.lerp(44, 14, c), w = K.lerp(58, 66, c), sd = o.seed || 3, r = K.rng(sd);
  const pts = []; for (let i = 0; i <= 18; i++) { const a = Math.PI + i / 18 * Math.PI, bump = c > 0 ? (r() - 0.5) * 10 * c : 0; pts.push([x + Math.cos(a) * w, y + Math.sin(a) * h + bump]); }
  shape(ctx, pts, EARTH, { lw: 6, seed: sd, dot: EARTHD, pitch: 8, rad: 0.2, da: 0.5 });
  const dh = 30 * (1 - c);
  if (dh > 2) { const d = []; for (let i = 0; i <= 12; i++) { const a = Math.PI + i / 12 * Math.PI; d.push([x + Math.cos(a) * 22, y + 2 + Math.sin(a) * dh]); } shape(ctx, d, HOLE, { lw: 4, seed: sd + 1 });
    if (o.eyes) { ctx.save(); ctx.translate(x, y - 12); ctx.scale(0.55, 0.55); for (const ex of [-13, 13]) eyeAt(ctx, ex, 0, o.eyes[1] ? 'shut' : 'open', o.eyes[0]); ctx.restore(); } }
  if (o.crack > 0) { ctx.save(); ctx.lineWidth = 3.5; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; for (const [sx, sgn] of [[-18, -1], [16, 1]]) { const L = 30 * K.clamp(o.crack); ctx.beginPath(); ctx.moveTo(x + sx, y - h + 4); ctx.lineTo(x + sx + sgn * 6, y - h + 4 + L * 0.4); ctx.lineTo(x + sx + sgn * 2, y - h + 4 + L * 0.7); ctx.lineTo(x + sx + sgn * 9, y - h + 4 + L); ctx.stroke(); } ctx.restore(); }
  if (c > 0.05) for (let i = 0; i < 5; i++) { const cx = x + (r() - 0.5) * 140 * c, cy = y - 4 - r() * 10, s = 7 + r() * 6; shape(ctx, [[cx - s, cy], [cx - s * 0.3, cy - s], [cx + s, cy - s * 0.5], [cx + s * 0.7, cy + 2]], EARTH, { lw: 3, seed: sd + i }); }
}

// ---------- rock: tall climbable boulder with two ledge notches and a flat top (stand points ROCK.l1, l2, top) ----------
const ROCKPTS = [[586, 906], [592, 860], [600, 814], [634, 814], [638, 770], [642, 724], [672, 724], [668, 690], [664, 650], [668, 613], [700, 609], [726, 616], [738, 664], [744, 744], [752, 828], [756, 906]];
function rock(x) {
  shape(x, ROCKPTS, STONE, { lw: 8, seed: 71 }); x.save(); K.poly(x, ROCKPTS, true); x.clip(); x.fillStyle = dotPat(x, STONED, 9, 0.3); x.beginPath(); x.ellipse(800, 770, 110, 220, 0, 0, 7); x.fill(); x.restore();
  ink(x, ROCKPTS, 8, 71); for (const [a, b] of [[[700, 650], [690, 700]], [[620, 860], [640, 890]], [[712, 790], [724, 840]]]) { x.save(); x.lineWidth = 4; x.strokeStyle = C.black; x.lineCap = 'round'; x.beginPath(); x.moveTo(...a); x.lineTo(...b); x.stroke(); x.restore(); }
}
// ---------- the lake: one oblique outline (also used for the drying pond's big sister) ----------
const LAKEPTS = (() => { const p = []; for (let i = 0; i < 32; i++) { const a = i / 32 * Math.PI * 2; p.push([1700 + Math.cos(a) * (268 + 16 * Math.sin(a * 3 + 1)), 1010 + Math.sin(a) * (120 + 8 * Math.cos(a * 2))]); } return p; })();
// ---------- lakeShore: 2000 x 1230. Sky layer (behind sun/moon) + land layer (hills, ground, cutaway rooms, lake, reeds, stone, rock) ----------
const LSKY = { day: [C.blue, '#3f7be6', '#2a62c9', '#2457b8', null], dusk: ['#e2701a', C.red, '#a8261a', '#7a1a12', '#f2b08a'], night: [NAVY2, '#1b3a8f', NAVY, '#0a1a4a', '#7d88c8'], dawn: [C.yellow, '#ff9a2a', '#f08a1a', '#e2701a', '#ffe2b0'] };
function lakeSky(ctx, pre) {
  ctx.drawImage(bakeK('sky:' + pre, LW, 920, 1.5, (x) => { const [base, dot] = LSKY[pre]; x.fillStyle = base; x.fillRect(0, 0, LW, 920); x.fillStyle = dotPat(x, dot, 13, 0.3); x.fillRect(0, 0, LW, 920); if (pre === 'night') stars(x, { w: LW, h: 640, n: 110, seed: 12, avoid: [MOON_N[0], MOON_N[1], 150] }); }), 0, 0, LW, 920);
}
function lakeLand(ctx, pre) {
  ctx.drawImage(bakeK('land:' + pre, LW, VH, 1.5, (x) => {
    const [, , h1, h2, tint] = LSKY[pre];
    for (const [bx, by, br, col] of [[180, 880, 280, h1], [640, 905, 330, h2], [1080, 885, 280, h1], [1500, 905, 330, h2], [1920, 885, 290, h1]]) { x.beginPath(); x.ellipse(bx, by, br, br * 0.5, 0, Math.PI, 0); x.fillStyle = col; x.fill(); x.lineWidth = 6; x.strokeStyle = C.black; x.stroke(); }
    hillTrees(x, { n: 24, seed: 4 }); ground(x, { w: LW });
    // underground cutaway: tunnels and rooms under the burrow field
    const cut = [[766, 924], [1232, 924], [1240, 1010], [1228, 1110], [1240, 1240], [760, 1240], [772, 1120], [762, 1010]];
    shape(x, cut, SOIL, { lw: 6, seed: 81, dot: SOILD, pitch: 10, rad: 0.22, da: 0.6 });
    const rr = K.rng(19); for (let i = 0; i < 9; i++) shape(x, ell(780 + rr() * 440, 1090 + rr() * 120, 10 + rr() * 10, 7 + rr() * 5, 12), STONE, { lw: 3, seed: 20 + i });
    seg(x, 890, 1040, 900, 1040, 28, HOLE, 3);   // back tunnel between rooms 1 and 2
    for (const [rx, ry] of Object.values(ROOMS)) seg(x, rx, 930, rx, ry - 30, 30, HOLE, 3);
    for (const [rx, ry] of Object.values(ROOMS)) { shape(x, ell(rx, ry, 52, 42, 28), '#3b1f08', { lw: 5, seed: 83 }); x.save(); x.lineWidth = 3; x.strokeStyle = C.yellow; x.lineCap = 'round'; for (let k = 0; k < 7; k++) { x.beginPath(); x.moveTo(rx - 40 + k * 12, ry + 36); x.lineTo(rx - 32 + k * 12, ry + 28 - (k % 2) * 4); x.stroke(); } x.restore(); }
    // the lake, reeds and the hare's flat stone
    shape(x, LAKEPTS, '#2a62c9', { lw: 8, seed: 91, dot: '#7fb0ff', pitch: 11, rad: 0.16, da: 0.55 });
    x.save(); K.poly(x, LAKEPTS, true); x.clip(); x.lineWidth = 4; x.strokeStyle = 'rgba(255,250,240,0.7)'; x.lineCap = 'round'; for (let i = 0; i < 7; i++) { const lx = 1500 + (i * 61) % 380, ly = 930 + i * 26; x.beginPath(); x.moveTo(lx, ly); x.lineTo(lx + 50, ly); x.stroke(); } x.restore();
    for (const rx of [1436, 1452, 1470, 1930, 1946]) { seg(x, rx, 935, rx - 3, 870, 5, GREEND, 2.5); shape(x, ell(rx - 3, 864, 5, 13, 8), '#7a4e12', { lw: 3 }); }
    shape(x, ell(STONE_P[0], STONE_P[1] + 6, 46, 15, 20), STONE2, { lw: 5, seed: 93 });
    rock(x);
    if (tint) { x.save(); x.globalCompositeOperation = 'multiply'; x.fillStyle = tint; x.fillRect(0, 700, LW, VH); x.restore(); }
  }), 0, 0, LW, VH);
}
// halo of yellow Ben-Day dots around a moon (pulse 0..1)
function halo(ctx, x0, y0, r, R, pulse = 1, a = 1) { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = C.yellow; for (let gy = y0 - R, row = 0; gy < y0 + R; gy += 12, row++) for (let gx = x0 - R + (row % 2) * 6; gx < x0 + R; gx += 12) { const d = Math.hypot(gx - x0, gy - y0); if (d < R && d > r - 4) { const rr = (4.6 + pulse) * Math.pow(1 - d / R, 1.1); if (rr > 0.5) { ctx.beginPath(); ctx.arc(gx, gy, rr, 0, 7); ctx.fill(); } } } ctx.restore(); }

// ---------- moonReflection(ctx, {x, y, r, t, wobble, breakUp, alpha, tint, fill}): a disc lying on water, cut into 9 slices ----------
function moonReflection(ctx, o) {
  const { x, y, r, t } = o, wob = o.wobble || 0, br = K.clamp(o.breakUp || 0), al = o.alpha ?? 1; if (al <= 0.01) return;
  const n = 9, rg = K.rng(o.seed || 11), off = [], ry = r * 0.8; for (let i = 0; i < n; i++) off.push([(rg() - 0.5) * 2, (rg() - 0.5) * 2]);
  ctx.save(); ctx.globalAlpha *= al;
  for (let i = 0; i < n; i++) {
    const h = 2 * ry / n, y0 = y - ry + i * h, hh = h * (1 - 0.7 * br), dx = Math.sin(t * 5 + i * 1.3) * r * 0.5 * wob + off[i][0] * 2.2 * r * br, dy = off[i][1] * r * 0.5 * br;
    ctx.save(); ctx.beginPath(); ctx.rect(x - r * 4, y0 + (h - hh) / 2 + dy, r * 8, hh); ctx.clip(); ctx.translate(dx, dy);
    ctx.beginPath(); ctx.ellipse(x, y, r, ry, 0, 0, 7); ctx.fillStyle = o.fill || C.yellow; ctx.fill();
    if (o.tint) { ctx.save(); ctx.globalAlpha *= K.clamp(o.tint); ctx.fillStyle = dotPat(ctx, C.red, 7, 0.36); ctx.beginPath(); ctx.ellipse(x, y, r, ry, 0, 0, 7); ctx.ellipse(x, y, r * 0.62, ry * 0.62, 0, 0, 7, true); ctx.fill('evenodd'); ctx.restore(); }
    ctx.strokeStyle = 'rgba(224,170,0,0.9)'; ctx.lineWidth = 3; for (const [cx, cy, cr] of [[-0.33, -0.3, 0.16], [0.27, 0.2, 0.12]]) { ctx.beginPath(); ctx.ellipse(x + cx * r, y + cy * ry, cr * r, cr * ry, 0, 0, 7); ctx.stroke(); }
    ctx.lineWidth = 4; ctx.strokeStyle = '#bfe8ff'; ctx.beginPath(); ctx.ellipse(x, y, r, ry, 0, 0, 7); ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}
// ring ripple on the lake that reaches radius R (world units) over dur seconds
function ringOut(ctx, x, y, t0, t, R = 160, dur = 1.6) { const u = (t - t0) / dur; if (u < 0 || u > 1) return; ctx.save(); ctx.globalAlpha = 0.9 * (1 - u); ctx.lineWidth = 4; ctx.strokeStyle = C.white; ctx.beginPath(); ctx.ellipse(x, y, 10 + u * R, (10 + u * R) * 0.32, 0, 0, 7); ctx.stroke(); ctx.restore(); }
// tree stump (thicketMeet): x centre, top y
function stump(ctx, x, top) { shape(ctx, [[x - 36, GR + 4], [x - 34, top], [x + 34, top], [x + 36, GR + 4]], WOOD, { lw: 7, seed: 51, dot: C.black, pitch: 9, rad: 0.18, da: 0.4 }); shape(ctx, ell(x, top, 34, 9, 18), '#e0b46a', { lw: 5, seed: 52 }); ctx.save(); ctx.strokeStyle = '#a8741a'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(x, top, 18, 4.5, 0, 0, 7); ctx.stroke(); ctx.restore(); }

// ---------- elephantK: the Library elephant (unchanged) + optional crown, talk jaw, crown lag and slip ----------
// extra P: crown (bool), crownLag (units, positive = lags down), crownSlip 0..1 (slides over the eye), talk 0..1
function elephantK(ctx, P) {
  elephant(ctx, P); if (!P.crown && !P.talk) return;
  const sq = P.sq ?? 1, tip = P.tip || 0, dir = P.dir ?? 1, s = P.s || 1, hx = 152, hy = -214 + (P.drop || 0);
  ctx.save(); if (P.alpha != null) ctx.globalAlpha *= P.alpha;
  if (sq !== 1 || tip) { ctx.translate(P.x, P.y); if (tip) ctx.rotate(tip * Math.sign(dir || 1)); if (sq !== 1) ctx.scale(1 + (1 - sq) * 0.7, sq); ctx.translate(-P.x, -P.y); }
  ctx.translate(P.x, P.y); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s); ctx.translate(0, (P.bob || 0) + (P.hbob || 0));
  if (P.talk) { ctx.save(); ctx.translate(hx + 30, hy + 44); ctx.rotate(0.35 * P.talk); shape(ctx, [[-14, -6], [26, -2], [-4, 10 + 16 * P.talk]], '#e79aa8', { lw: 4, seed: 9 }); ctx.restore(); }
  if (P.crown) { const sl = P.crownSlip || 0; ctx.save(); ctx.translate(hx - 6 + sl * 34, hy - 70 + (P.crownLag || 0) + sl * 38); ctx.rotate(-0.1 + sl * 0.55);
    const cp = [[-30, 0], [-34, -34], [-17, -15], [0, -40], [17, -15], [34, -34], [30, 0]]; shape(ctx, cp, C.yellow, { lw: 5, seed: 31, dot: C.red, pitch: 6, rad: 0.22, da: 0.45 });
    for (const [cx, cy] of [[-34, -36], [0, -42], [34, -36]]) shape(ctx, ell(cx, cy, 5, 5, 10), C.red, { lw: 2.5, seed: 32 }); ctx.restore(); }
  ctx.restore();
}
// world position of an elephant's eye and trunk tip (no tip/sq), for gaze and props
const elEye = (P) => [P.x + (P.dir ?? 1) * P.s * 190, P.y + P.s * (-236 + (P.drop || 0) + (P.hbob || 0) + (P.bob || 0))];
const elTrunk = (P) => { const tr = P.trunk ?? 0, rc = P.reach || 0; return [P.x + (P.dir ?? 1) * P.s * (248 + tr * 40 + rc * 70), P.y + P.s * (-58 + (P.drop || 0) - tr * 230 - rc * 30 + (P.hbob || 0) + (P.bob || 0))]; };
const hHead = (P) => [P.x + (P.dir ?? 1) * P.s * 28, P.y - P.s * 134 * (P.sq ?? 1)];

// ---------- bumpChain(t, t0, i, gap): follower i of a stopped line closes up, bumps (lurch) and settles. Returns {dx, tip} ----------
function bumpChain(t, t0, i, gap = 60) { if (i === 0) return { dx: 0, tip: lurch(t, t0, 0.06) * 0.5 }; const tc = t0 + 0.18 * i, u = K.clamp((t - t0) / (tc - t0));
  return { dx: gap * K.ease.in(u) - (t > tc ? 14 * Math.exp(-(t - tc) * 5) * Math.sin((t - tc) * 14) : 0), tip: lurch(t, tc, 0.16) }; }

// ---------- hops(t, start [x, y], list [[t0, dur, x1, y1, h]]): a chain of hops with anticipation and landing squash -> {x, y, sq, air} ----------
function hops(t, start, list) { let x = start[0], y = start[1], sq = 1;
  for (const [t0, d, x1, y1, h = 30] of list) {
    if (t < t0) { sq *= anticipate(t, t0 - 0.13, 0.13, 0.12); return { x, y, sq, air: false }; }
    if (t < t0 + d) { const f = (t - t0) / d; return { x: K.lerp(x, x1, f), y: K.lerp(y, y1, f) - h * Math.sin(Math.PI * f), sq: 1 + 0.13 * Math.sin(Math.PI * f), air: true }; }
    x = x1; y = y1; sq = landSquash(t, t0 + d, 0.18, 12); }
  return { x, y, sq, air: false }; }
// draw a hare rising out of the ground (pop 0 hidden .. 1 fully up); call before the mound so the mound covers its feet
function hareUp(ctx, P, pop) { if (pop <= 0.01) return; ctx.save(); ctx.beginPath(); ctx.rect(P.x - 200, 0, 400, GR + 6); ctx.clip(); hare(ctx, { ...P, y: P.y + (1 - pop) * P.s * 250 }); ctx.restore(); }
