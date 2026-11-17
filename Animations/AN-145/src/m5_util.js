// ===== AN-145 Al-Maamun and the Pyramids: timing helpers, person rig, props =====
TIMING.chunks.forEach((c) => { c.en = c.en.replace(/\s*[—–]\s*/g, ', '); });   // display only: a script dash shows as ", "
const M5_DUR = 177.861;   // narration 173.861 + THE END hold 4.0 (plan duration + end_hold)
const M5B = (t, a, d, e = 'inOut') => K.ease[e](K.clamp((t - a) / d));
const m5In = (t, a, b) => t >= a && t < b;
const m5Fade = (t, a, b, f = 0.2) => K.clamp(Math.min((t - a) / f, (b - t) / f));
const m5Win = (t, a, b, r = 0.25) => K.ease.inOut(K.clamp(Math.min((t - a) / r, (b - t) / r)));
const m5Pulse = (t, a, d) => (t > a && t < a + d ? Math.sin(Math.PI * (t - a) / d) : 0);
const m5Pop = (t, a, d = 0.3) => K.ease.back(K.clamp((t - a) / d));
// timed value track: keys [[t0, v, dur]] -> v eases from the previous value over dur (default 0.3) from t0. v: number, array or fn(t)
function m5Tr(t, keys, d0 = 0.3) {
  const val = (v) => (typeof v === 'function' ? v(t) : v);
  let cur = val(keys[0][1]);
  for (let i = 1; i < keys.length; i++) { const [t0, v, d] = keys[i]; if (t < t0) break; const u = K.ease.inOut(K.clamp((t - t0) / (d ?? d0))), nv = val(v); cur = Array.isArray(cur) ? cur.map((c, j) => K.lerp(c, nv[j], u)) : K.lerp(cur, nv, u); }
  return cur;
}
const M5_STONE = '#e9b949', M5_STONED = '#c98a3a', M5_DARK = '#5b3a1e', M5_IRON = '#46506e', M5_LEAD = '#cfd3de', M5_GOLD = '#ffd21f', M5_GREY = '#9aa0a8', M5_NIGHT = '#1b2a5a';

// ---------- person rig: body-local <-> world (same maths as the Library person) ----------
const M5_SH = -132;
const m5Age = (P) => P.age ?? (COSTUME[P.costume] || {}).age ?? 0.3;
const m5Lean = (P) => (P.lean || 0) + m5Age(P) * 0.12;
function m5Off(P) { const sit = K.clamp(P.sit || 0), kn = K.clamp(P.kneel || 0); let hc = [0, -75];
  if (sit > 0) { const S = P.seat === 'floor' ? [0, -24] : [-22, -52]; hc = [K.lerp(0, S[0], sit), K.lerp(-75, S[1], sit)]; }
  if (kn > 0) hc = [K.lerp(hc[0], -4, kn), K.lerp(hc[1], -48, kn)];
  return [hc[0], hc[1] + 75]; }
function m5Loc(P, w) { const s = P.s, dir = P.dir || 1, off = m5Off(P), lean = m5Lean(P); let lx = (w[0] - P.x) / (s * dir) - off[0], ly = (w[1] - P.y) / s - off[1];
  if (lean) { const c = Math.cos(-lean), n = Math.sin(-lean), y0 = ly + 75; [lx, ly] = [lx * c - y0 * n, lx * n + y0 * c - 75]; } return [lx, ly]; }
function m5W(P, l) { const s = P.s, dir = P.dir || 1, off = m5Off(P), lean = m5Lean(P); let [lx, ly] = l;
  if (lean) { const c = Math.cos(lean), n = Math.sin(lean), y0 = ly + 75; [lx, ly] = [lx * c - y0 * n, lx * n + y0 * c - 75]; }
  lx += off[0]; ly += off[1]; let wx = P.x + lx * s * dir, wy = P.y + ly * s; const sq = P.sq ?? 1, tip = P.tip || 0;
  if (sq !== 1) { wx = P.x + (wx - P.x) * (1 + (1 - sq) * 0.7); wy = P.y + (wy - P.y) * sq; }
  if (tip) { const a = tip * Math.sign(dir), dx = wx - P.x, dy = wy - P.y; wx = P.x + dx * Math.cos(a) - dy * Math.sin(a); wy = P.y + dx * Math.sin(a) + dy * Math.cos(a); }
  return [wx, wy]; }
const m5Head = (P) => m5W(P, [(P.look || 0) * 4, -195 + (P.drop || 0) + m5Age(P) * 6]);
function m5HandL(sd, ang) { const e1 = [sd * 31 + Math.sin(ang[0]) * 38, M5_SH + Math.cos(ang[0]) * 38]; return [e1[0] + Math.sin(ang[1]) * 36, e1[1] + Math.cos(ang[1]) * 36]; }
function m5Hand(P, side) { const sd = side === 'L' ? -1 : 1, a = side === 'L' ? P.aL : P.aR; if (a) return m5W(P, m5HandL(sd, a)); const h = side === 'L' ? P.handL : P.handR; return m5W(P, h || [sd * 34, -122]); }
// arm angles from a body-local target or {a: [..]} or {w: world point}
function m5Ang(P, sd, v) { if (v.a) return v.a; return armTo(sd, M5_SH, v.w ? m5Loc(P, v.w) : v); }
function m5Arm(t, P, sd, keys) { return m5Tr(t, keys.map(([t0, v, d]) => [t0, (tt) => m5Ang(P, sd, typeof v === 'function' ? v(tt) : v), d])); }
const M5H = { hipR: [40, -82], hipL: [-40, -82], chestR: [4, -120], chin: [16, -160], ear: [42, -200], mouth: [8, -170], pointR: [100, -150], pointUp: [44, -205], turban: [10, -236], temple: [38, -206],
  palmR: [62, -102], palmL: [-62, -102], outR: [95, -150], outL: [-95, -150], foldL: [22, -105], foldR: [-18, -112], lowR: [34, -86], lowL: [-34, -86], raise: { a: [2.3, 2.6] }, raiseL: { a: [-2.3, -2.6] },
  brow: [20, -212], wideR: [92, -190], wideL: [-92, -190], clapR: [10, -140], clapL: [-6, -140], ledgerR: [26, -112], ledgerL: [-14, -116] };
function m5Look(t, P, plan, ease = 0.18) { const pl = plan.map(([a, p]) => [a, typeof p === 'function' ? p(t) : p]); return lookAt(m5Head(P), gazePlan(t, pl, ease)); }
function m5Walk(xf, t, stride = 13) { const x = xf(t), v = Math.abs(speed(xf, t)); return { x, ph: x / stride, amp: K.clamp(v / 60) }; }
function m5Blink(P, t, seed, lid = 0) { P.lid = Math.min(1, Math.max(lid, blink(t, seed))); return P; }

// ---------- strike cycle (front-facing figure: arm angles + tool rotation) ----------
// r: 0 contact pose, 1 raised; rest 0.15. hits = list of contact times. o.lift (0.45 s), o.whip (0.13 s)
function m5Strike(t, hits, o = {}) { const lift = o.lift ?? 0.45, whip = o.whip ?? 0.13, rest = o.rest ?? 0.15, top = o.top ?? 1; let r = rest, contact = null;
  for (const h of hits) { const a = h - whip - 0.12 - lift;
    if (t < a) break;
    if (t < a + lift) { r = K.lerp(rest, top, K.ease.inOut((t - a) / lift)); break; }
    if (t < h - whip) { r = top + 0.04 * Math.sin((t - a - lift) * 20); break; }
    if (t < h) { const u = (t - (h - whip)) / whip; r = K.lerp(top, 0, u * u); break; }
    contact = t - h; r = Math.min(rest, 0.32 * Math.exp(-contact * 7) * Math.abs(Math.sin(contact * 12)) + rest * K.clamp(contact / 0.5)); }
  return { r, contact }; }
// apply the strike to a person: both hands on the shaft; returns the tool angle (world, radians) for m5Pick
function m5StrikePose(P, r) { const k = K.clamp(r);
  P.aR = [K.lerp(1.25, 2.85, k), K.lerp(1.45, 3.05, k)]; P.aL = [K.lerp(1.0, 2.6, k), K.lerp(1.3, 2.95, k)];
  const dir = P.dir || 1, a = K.lerp(0.55, -2.35, k); return dir > 0 ? a : Math.PI - a; }

// ---------- props ----------
// pickaxe: grip at (x, y), shaft along ang, head at the far end. bend 0..1 curls one point up
function m5Pick(ctx, x, y, ang, s = 0.75, bend = 0, o = {}) { ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  seg(ctx, -24, 0, 128, 0, 9, '#9a5a1e', 4);
  const up = [], dn = []; for (let i = 0; i <= 6; i++) { const f = i / 6; up.push([128 + 6 * f * f, -f * 48]); dn.push([128 + 6 * f * f, f * 48]); }
  if (bend > 0) for (let i = 1; i <= 6; i++) { const f = i / 6, a = bend * 1.6 * f * f; up[i] = [up[i - 1][0] + 8 * Math.sin(a) * (1 + f) + 1, up[i - 1][1] - 8 * Math.cos(a)]; }
  const head = up.slice().reverse().concat(dn);
  ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 24; K.poly(ctx, head); ctx.stroke(); ctx.strokeStyle = M5_GREY; ctx.lineWidth = 15; K.poly(ctx, head); ctx.stroke();
  ctx.strokeStyle = '#d6dae2'; ctx.lineWidth = 4; K.poly(ctx, head.slice(2, -2)); ctx.stroke();
  ctx.restore(); }
function m5Shovel(ctx, x, y, ang, s = 0.75) { ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s); seg(ctx, -20, 0, 130, 0, 8, '#9a5a1e', 4);
  shape(ctx, [[126, -20], [178, -24], [190, 0], [178, 24], [126, 20]], M5_GREY, { lw: 4, seed: 501 }); ctx.restore(); }
// torch: stick from (x, y) upward at ang; light: disc radius scale; returns the flame point
function m5Torch(ctx, x, y, t, o = {}) { const s = o.s ?? 0.5, ang = o.ang ?? -0.25, lt = o.light ?? 1, fl = 1 + 0.12 * Math.sin(t * 23) + 0.08 * Math.sin(t * 37);
  const fx = x + Math.sin(ang) * 70 * s, fy = y - Math.cos(ang) * 70 * s;
  seg(ctx, x, y, fx, fy, 8 * s, '#7a4212', 3 * s);
  for (let i = 0; i < 3; i++) { const dx = (i - 1) * 9 * s, h = (34 + 10 * Math.sin(t * 17 + i * 2)) * s * (0.5 + 0.5 * lt) * fl;
    shape(ctx, [[fx + dx - 8 * s, fy], [fx + dx + Math.sin(t * 9 + i) * 5 * s, fy - h], [fx + dx + 8 * s, fy]], i === 1 ? C.yellow : C.red, { lw: 3 * s, seed: 510 + i }); }
  return [fx, fy - 14 * s]; }
function m5Glow(ctx, x, y, r, a = 0.55, col = C.yellow) { if (r <= 0 || a <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.clip(); ctx.fillStyle = dotPat(ctx, col, 9, 0.38); ctx.fillRect(x - r, y - r, 2 * r, 2 * r); ctx.globalAlpha = a * 0.35; ctx.fillStyle = col; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); ctx.restore(); }
function m5Coin(ctx, x, y, r = 11, sx = 1, col = M5_GOLD) { ctx.save(); ctx.translate(x, y); ctx.scale(Math.max(0.12, Math.abs(sx)), 1); shape(ctx, ell(0, 0, r, r, 14), col, { lw: Math.max(2, r * 0.25), seed: 520, dot: '#e0a800', pitch: 4, rad: 0.25, da: 0.6 }); ctx.restore(); }
// ghost coin: dashed red outline only
function m5Ghost(ctx, x, y, r = 11) { ctx.save(); ctx.setLineDash([5, 4]); ctx.lineWidth = 3; ctx.strokeStyle = C.red; ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.42, 0, 0, 7); ctx.stroke(); ctx.restore(); }
// coin mound: base centre (x, y), w wide, fill 0..1
function m5Mound(ctx, x, y, w, fill = 1, o = {}) { if (fill <= 0.01) return; const h = w * 0.42 * fill, pts = []; for (let i = 0; i <= 16; i++) { const f = i / 16; pts.push([x - w / 2 + w * f, y - h * Math.sin(Math.PI * f) ** 0.8]); }
  if (o.ghost) { ctx.save(); ctx.setLineDash([8, 6]); ctx.lineWidth = 4; ctx.strokeStyle = C.red; K.poly(ctx, pts, true); ctx.stroke(); ctx.restore(); for (let i = 0; i < 5; i++) m5Ghost(ctx, x - w * 0.3 + i * w * 0.15, y - h * 0.5 + (i % 2) * h * 0.2, w * 0.07); return; }
  shape(ctx, pts, M5_GOLD, { lw: 4, seed: 521, dot: '#e0a800', pitch: 6, rad: 0.28, da: 0.7 });
  const r = K.rng(o.seed || 9); for (let i = 0; i < Math.round(9 * fill); i++) { const f = 0.15 + r() * 0.7; m5Coin(ctx, x - w / 2 + w * f, y - h * Math.sin(Math.PI * f) ** 0.8 * (0.35 + r() * 0.55), w * 0.06, 1); } }
function m5Gem(ctx, x, y, r, col) { shape(ctx, [[x - r, y - r * 0.3], [x - r * 0.5, y - r], [x + r * 0.5, y - r], [x + r, y - r * 0.3], [x, y + r]], col, { lw: 3, seed: 530 }); seg(ctx, x - r * 0.5, y - r * 0.3, x + r * 0.5, y - r * 0.3, 1, C.white, 0); }
// pay chest (the caliph's): base centre (x, y), 150 x 100 at s 1, open 0..1, fill 0..1
function m5Chest(ctx, x, y, o = {}) { const s = o.s ?? 1, op = K.clamp(o.open || 0), fill = o.fill ?? 1, old = !!o.old;
  const body = old ? '#5f7a5a' : '#8a5a14', bodyD = old ? '#3a4a36' : '#5b3010', band = old ? '#9aa0a8' : C.yellow;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s * (o.sqx || 1), s * (o.sqy || 1));
  if (op > 0.05) { const lift = 70 * Math.sin(op * Math.PI / 2); shape(ctx, [[-75, -100], [-70, -100 - lift], [70, -100 - lift], [75, -100]], old ? '#4a6046' : '#6a3e10', { lw: 5, seed: 540 }); }
  shape(ctx, K.rectPts(-75, -100, 150, 100), body, { lw: 6, seed: 541, dot: bodyD, pitch: 8, rad: 0.22, da: 0.45 });
  if (op > 0.05 && fill > 0.01) { m5Mound(ctx, 0, -98, 140, fill, { seed: 3 }); if (o.jewels) { m5Gem(ctx, -30, -104 - 26 * fill, 12, C.red); m5Gem(ctx, 18, -110 - 30 * fill, 13, C.blue); m5Gem(ctx, 44, -100 - 14 * fill, 10, '#2f9a3e'); } }
  for (const bx of [-50, 50]) shape(ctx, K.rectPts(bx - 8, -100, 16, 100), band, { lw: 3.5, seed: 542 });
  shape(ctx, K.rectPts(-11, -80, 22, 20), old ? M5_GREY : C.yellow, { lw: 3.5, seed: 543 });
  if (old) seg(ctx, -6, -70, 8, -62, 3, C.black, 0);
  if (op <= 0.05) shape(ctx, [[-79, -100], [-72, -126], [72, -126], [79, -100]], old ? '#4a6046' : '#a8741a', { lw: 6, seed: 544, dot: bodyD, pitch: 8, rad: 0.2, da: 0.35 });
  ctx.restore(); }
// ledger: open book centred at (x, y), fill 0..1 tally strokes, rot
function m5Ledger(ctx, x, y, o = {}) { const s = o.s ?? 0.6, f = o.fill ?? 0.3, open = o.open ?? 1; ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  if (open < 0.5) { shape(ctx, K.rectPts(-40, -32, 80, 64), C.red, { lw: 5, seed: 550, dot: '#a8160f', pitch: 7, rad: 0.25 }); ctx.restore(); return; }
  shape(ctx, [[-90, -30], [0, -38], [90, -30], [90, 32], [0, 26], [-90, 32]], C.red, { lw: 5, seed: 551 });
  shape(ctx, [[-84, -34], [-2, -40], [-2, 24], [-84, 28]], C.white, { lw: 3.5, seed: 552 }); shape(ctx, [[2, -40], [84, -34], [84, 28], [2, 24]], C.white, { lw: 3.5, seed: 553 });
  const n = Math.floor(f * 24); ctx.strokeStyle = C.black; ctx.lineWidth = 3.5; ctx.lineCap = 'round';
  for (let i = 0; i < n; i++) { const pg = i < 12 ? -1 : 1, k = i % 12, col = Math.floor(k / 4), row = k % 4, bx = pg < 0 ? -76 + col * 24 : 12 + col * 24, by = -26 + row * 12; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + 16, by); ctx.stroke(); }
  ctx.restore(); }
// reed pen held at (x, y)
function m5Pen(ctx, x, y, ang = -0.6, s = 0.6) { ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s); seg(ctx, 0, 0, 0, -60, 5, '#c58a18', 3); seg(ctx, 0, 0, 0, 10, 3, C.black, 1); ctx.restore(); }
// balance scale: post on (x, y) floor, pivot 230 above; tilt radians (+ = right pan down); pans with contents callbacks (c, px, py)
function m5Scale(ctx, x, y, tilt, o = {}) { const py = y - 230, L = 190, ch = 110;
  shape(ctx, [[x - 210, y], [x - 210, y - 60], [x + 210, y - 60], [x + 210, y]], C.red, { lw: 6, seed: 560, dot: C.yellow, pitch: 10, rad: 0.2, da: 0.4 });
  shape(ctx, [[x - 80, y - 60], [x - 60, y - 82], [x + 60, y - 82], [x + 80, y - 60]], '#a8741a', { lw: 5, seed: 561 });
  seg(ctx, x, y - 82, x, py, 12, '#c58a18', 5);
  const ends = [-1, 1].map((sd) => [x + sd * L * Math.cos(tilt), py + sd * L * Math.sin(tilt)]);
  seg(ctx, ends[0][0], ends[0][1], ends[1][0], ends[1][1], 11, '#e0a92a', 5); shape(ctx, ell(x, py, 14, 14, 14), C.yellow, { lw: 4, seed: 562 });
  if (o.level > 0) { ctx.save(); ctx.globalAlpha = o.level; ctx.lineWidth = 4; ctx.strokeStyle = C.white; ctx.beginPath(); ctx.moveTo(ends[0][0], ends[0][1] - 10); ctx.lineTo(ends[1][0], ends[1][1] - 10); ctx.stroke(); ctx.restore(); }
  const pans = ends.map(([ex, ey], i) => { const pb = ey + ch; ctx.save(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; for (const dx of [-52, 0, 52]) { ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ex + dx, pb); ctx.stroke(); } ctx.restore();
    const cb = i ? o.right : o.left; if (cb) cb(ctx, ex, pb);
    shape(ctx, [[ex - 66, pb], [ex + 66, pb], [ex + 44, pb + 18], [ex - 44, pb + 18]], '#e0a92a', { lw: 5, seed: 563 + i }); return [ex, pb]; });
  return { pivot: [x, py], pans }; }
// legend icons (about 90 x 60): ghost = dashed outlines
function m5Icon(ctx, kind, x, y, s = 1, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const g = o.ghost || 0;
  const S = (pts, col, seed) => { if (g < 1) { ctx.save(); ctx.globalAlpha *= 1 - g; shape(ctx, pts, col, { lw: 4, seed }); ctx.restore(); } if (g > 0) { ctx.save(); ctx.globalAlpha *= g; ctx.setLineDash([7, 6]); ctx.lineWidth = 4; ctx.strokeStyle = o.ghostCol || C.white; K.poly(ctx, pts, true); ctx.stroke(); ctx.restore(); } };
  if (kind === 'gems') { [[-30, 6, 16, C.red], [0, -10, 19, C.blue], [30, 6, 16, '#2f9a3e'], [6, 18, 12, C.yellow]].forEach(([gx, gy, r, c], i) => S([[gx - r, gy - r * 0.3], [gx - r * 0.5, gy - r], [gx + r * 0.5, gy - r], [gx + r, gy - r * 0.3], [gx, gy + r]], c, 570 + i));
    if (g < 0.5 && o.t != null) star(ctx, 10 + 14 * Math.sin(o.t * 3), -20, 9 * (0.6 + 0.4 * Math.sin(o.t * 9)), C.white, o.t); }
  else if (kind === 'swords') { S(ell(0, 6, 30, 30, 22), C.red, 575); for (const sd of [-1, 1]) { ctx.save(); ctx.rotate(sd * 0.75); S([[-5, -52], [5, -52], [8, 30], [0, 40], [-8, 30]], '#d6dae2', 576 + sd); S(K.rectPts(-16, 26, 32, 8), C.yellow, 578); ctx.restore(); } }
  else if (kind === 'books') { S(K.rectPts(-42, 8, 84, 18), C.blue, 580); S(K.rectPts(-38, -10, 76, 18), C.red, 581); S([[-44, -12], [0, -20], [44, -12], [44, -38], [0, -44], [-44, -38]], C.white, 582);
    if (g < 1) { ctx.save(); ctx.globalAlpha *= 1 - g; ctx.lineWidth = 2.5; ctx.strokeStyle = C.black; for (let i = 0; i < 2; i++) { ctx.beginPath(); ctx.moveTo(-36, -32 + i * 9); ctx.quadraticCurveTo(-20, -38 + i * 9, -8, -32 + i * 9); ctx.stroke(); ctx.beginPath(); ctx.moveTo(8, -32 + i * 9); ctx.quadraticCurveTo(22, -38 + i * 9, 36, -32 + i * 9); ctx.stroke(); } ctx.restore(); } }
  else if (kind === 'throne') { S([[-30, 30], [-30, -40], [-20, -60], [20, -60], [30, -40], [30, 30]], C.red, 585); S(K.rectPts(-40, 0, 80, 16), C.yellow, 586); }
  else if (kind === 'scroll') { S(K.rectPts(-34, -22, 68, 44), CREAM, 587); S(ell(-36, 0, 8, 24, 12), '#e6c27a', 588); S(ell(36, 0, 8, 24, 12), '#e6c27a', 589); }
  else if (kind === 'pyramid') { S([[-44, 26], [0, -34], [44, 26]], M5_STONE, 590); }
  else if (kind === 'hourglass') { S([[-22, -36], [22, -36], [4, 0], [22, 36], [-22, 36], [-4, 0]], C.white, 591); const f = o.f ?? 0.5; if (g < 1) { shape(ctx, [[-16 * (1 - f), -30 + 30 * f], [16 * (1 - f), -30 + 30 * f], [0, -2]], SANDL, { lw: 0 }); shape(ctx, [[-18 * f, 32], [18 * f, 32], [0, 32 - 22 * f]], SANDL, { lw: 0 }); seg(ctx, 0, -2, 0, 30, 1.5, SANDL, 0); } }
  ctx.restore(); }
// a question mark in Bangers
function m5Q(ctx, x, y, size, p, col = C.red, o = {}) { const k = K.ease.back(K.clamp(p)); if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(k, k); ctx.font = K.font(size, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round'; ctx.lineWidth = size * 0.18; ctx.strokeStyle = C.black; ctx.strokeText(o.text || '?', 0, 0); ctx.fillStyle = col; ctx.fillText(o.text || '?', 0, 0); ctx.restore(); }
// dashed rectangle drawn on one side at a time (p 0..1)
function m5DashRect(ctx, x0, y0, x1, y1, p, o = {}) { if (p <= 0) return; const pts = [[x0, y1], [x0, y0], [x1, y0], [x1, y1], [x0, y1]], L = 2 * (x1 - x0 + y1 - y0); let rem = p * L; const path = [pts[0]];
  for (let i = 1; i < pts.length && rem > 0; i++) { const a = pts[i - 1], b = pts[i], l = Math.hypot(b[0] - a[0], b[1] - a[1]), f = Math.min(1, rem / l); path.push([K.lerp(a[0], b[0], f), K.lerp(a[1], b[1], f)]); rem -= l; }
  ctx.save(); ctx.setLineDash(o.dash || [26, 16]); ctx.lineDashOffset = -(o.t || 0) * 40; ctx.lineCap = 'round'; ctx.lineWidth = (o.w || 12) + 8; ctx.strokeStyle = C.black; K.poly(ctx, path); ctx.stroke(); ctx.lineWidth = o.w || 12; ctx.strokeStyle = o.col || C.red; K.poly(ctx, path); ctx.stroke(); ctx.restore(); }
// sand dissolve: draw(c) paints a figure into an offscreen layer (world box bx..), then it crumbles from the head down (p 0..1) into drifting grains
const M5_SANDC = {};
function m5Sand(ctx, key, box, draw, p, t, o = {}) { const [bx, by, bw, bh] = box, sc = 2;
  const L = M5_SANDC[key] || (M5_SANDC[key] = (() => { const c = K.layer(bw * sc, bh * sc), x = c.getContext('2d'); x.scale(sc, sc); x.translate(-bx, -by); draw(x); return c; })());
  const cut = by + bh * K.clamp(p * 1.15 - 0.1);
  if (p < 1) { ctx.save(); ctx.beginPath(); ctx.rect(bx - 5, cut, bw + 10, by + bh - cut + 5); ctx.clip(); ctx.drawImage(L, bx, by, bw, bh);
    if (p > 0) { ctx.globalAlpha = 0.55; ctx.fillStyle = SANDL; ctx.fillRect(bx, cut, bw, 14); } ctx.restore(); }
  if (p <= 0) return; const r = K.rng(o.seed || 5), n = 90, wind = o.wind ?? 1;
  ctx.save(); ctx.fillStyle = '#e0a13a'; ctx.strokeStyle = C.black; ctx.lineWidth = 1;
  for (let i = 0; i < n; i++) { const gx = bx + r() * bw, gy = by + r() * bh, rel = (gy - by) / bh, st = rel / 1.15 + 0.08, age = (p - st) * (o.dur || 2.2); if (age <= 0) continue;
    const x = gx + wind * (120 * age + 40 * age * age) + 8 * Math.sin(age * 5 + i), y = gy - 30 * age + 20 * Math.sin(age * 3 + i * 0.7), a = K.clamp(1 - age / 1.6); if (a <= 0) continue;
    ctx.globalAlpha = a; ctx.beginPath(); ctx.arc(x, y, 2.5 + (i % 3), 0, 7); ctx.fill(); ctx.stroke(); }
  ctx.restore(); }
// round inset (panel space): draw(c) in world units, centred on world point `at` with zoom z
function m5Inset(ctx, cx, cy, r, k, at, z, draw) { if (k <= 0) return; ctx.save(); ctx.translate(cx, cy); ctx.scale(k, k); ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.save(); ctx.clip(); ctx.fillStyle = C.paper || '#fbf2da'; ctx.fillRect(-r, -r, 2 * r, 2 * r); ctx.scale(z, z); ctx.translate(-at[0], -at[1]); draw(ctx); ctx.restore();
  ctx.lineWidth = 12; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.stroke(); ctx.lineWidth = 5; ctx.strokeStyle = C.yellow; ctx.stroke(); ctx.restore(); }
// tag (panel space): coloured chip with a coin and a number
function m5Tag(ctx, S, x, y, label, val, p, col, o = {}) { const k = K.ease.back(K.clamp(p)); if (k <= 0 || ctx.globalAlpha < 0.03) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.rotate(o.rot ?? -0.03);
  const w = o.w || 250, h = 104; shape(ctx, [[-w / 2, -h / 2], [w / 2 - 20, -h / 2], [w / 2, 0], [w / 2 - 20, h / 2], [-w / 2, h / 2]], col, { lw: 7, seed: 600, dot: col === C.red ? '#a8160f' : '#e0a800', pitch: 8, rad: 0.25, da: 0.5 });
  ctx.font = K.font(34, BF, 400); ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.lineWidth = 6; ctx.strokeStyle = C.black; ctx.lineJoin = 'round'; ctx.strokeText(label, -w / 2 + 16, -24); ctx.fillStyle = C.white; ctx.fillText(label, -w / 2 + 16, -24);
  m5Coin(ctx, -w / 2 + 36, 20, 18); if (val != null) { ctx.font = K.font(60, BF, 400); ctx.strokeText(String(val), -w / 2 + 66, 22); ctx.fillStyle = col === C.red ? C.yellow : C.black; if (col !== C.red) { ctx.strokeStyle = C.white; ctx.lineWidth = 6; ctx.strokeText(String(val), -w / 2 + 66, 22); } ctx.fillText(String(val), -w / 2 + 66, 22); }
  ctx.restore(); }
