// ===== SIND-02 snake (new reusable character, planned name "snake"): a body that follows any path, here at giant scale =====
// sbSnake(ctx, path, t, o): path = [[x, y], ...] from the tail to the head (world units). o: {w (70), out 0..1 (how much of the path
// is out of the crevice, from the head back), wave (travelling sine amplitude), pal 0..2, lid 0..1, gaze [gx, gy], tongue 0..1, mouth 0..1
// (a yawn), rear 0..1 (the head lifts off the path end), dir (head facing: +1 right), headRot}. Calm and heavy: the wave always moves.
const SB_SNAKE_PAL = [
  { body: '#2fae6a', shade: '#1f7a4e', belly: '#f2e2a0', pat: '#f2c43a', line: '#164a36', eye: '#ffe24a' },   // emerald with mustard diamonds
  { body: '#d89a2a', shade: '#a86a1a', belly: '#fff0c0', pat: '#6a3a8a', line: '#5a3410', eye: '#a8ff6a' },   // mustard with plum
  { body: '#5a7ad8', shade: '#3a52a8', belly: '#e8f0ff', pat: '#ffd36a', line: '#1e2a6a', eye: '#ffe24a' },   // blue with gold
];
function sbPathLen(P) { let L = 0; for (let i = 1; i < P.length; i++) L += Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); return L; }
// resample a path every step units
function sbResample(P, step) { const out = [P[0]]; let acc = 0; for (let i = 1; i < P.length; i++) { const a = P[i - 1], b = P[i], d = Math.hypot(b[0] - a[0], b[1] - a[1]); let u = (step - acc); while (u <= d) { out.push([K.lerp(a[0], b[0], u / d), K.lerp(a[1], b[1], u / d)]); u += step; } acc = d - (u - step); } out.push(P[P.length - 1]); return out; }
function sbSnake(ctx, path, t, o = {}) {
  const pal = SB_SNAKE_PAL[o.pal || 0], w = o.w || 70, tc = SB_T2(t), base = sbResample(path, 12), L = base.length, out = K.clamp(o.out ?? 1), n0 = Math.floor((1 - out) * (L - 1));
  // travelling wave along the normal (none at the head end so the head stays calm)
  const pts = []; for (let i = n0; i < L; i++) { const a = base[Math.max(0, i - 1)], b = base[Math.min(L - 1, i + 1)], dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1, nx = -dy / l, ny = dx / l, u = i / (L - 1), fade = Math.min(1, (1 - u) * 6), wv = (o.wave ?? 14) * Math.sin(i * 0.22 - tc * 2.4) * fade;
    pts.push([base[i][0] + nx * wv, base[i][1] + ny * wv]); }
  if (pts.length < 3) return null;
  // rear: lift the last part of the body
  const rear = K.clamp(o.rear || 0), m = pts.length; if (rear > 0) for (let i = Math.max(0, m - 14); i < m; i++) { const k = (i - (m - 14)) / 13; pts[i] = [pts[i][0], pts[i][1] - rear * 120 * k * k]; }
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const taper = (i) => { const u = i / (m - 1); return u < 0.25 ? 0.35 + 0.65 * u / 0.25 : 1; };
  // body in short tapered strokes: outline, body, shade belly, highlight
  for (const [col, extra, dy] of [[pal.line, 8, 0], [pal.body, 0, 0]]) { ctx.strokeStyle = col; for (let i = 1; i < m; i++) { ctx.lineWidth = w * taper(i) + extra; ctx.beginPath(); ctx.moveTo(pts[i - 1][0], pts[i - 1][1] + dy); ctx.lineTo(pts[i][0], pts[i][1] + dy); ctx.stroke(); } }
  ctx.strokeStyle = pal.shade; for (let i = 1; i < m; i++) { ctx.lineWidth = w * taper(i) * 0.3; ctx.beginPath(); ctx.moveTo(pts[i - 1][0], pts[i - 1][1] + w * taper(i) * 0.32); ctx.lineTo(pts[i][0], pts[i][1] + w * taper(i) * 0.32); ctx.stroke(); }
  ctx.strokeStyle = pal.belly; ctx.globalAlpha = 0.9; for (let i = 1; i < m; i++) { ctx.lineWidth = w * taper(i) * 0.14; ctx.beginPath(); ctx.moveTo(pts[i - 1][0], pts[i - 1][1] + w * taper(i) * 0.36); ctx.lineTo(pts[i][0], pts[i][1] + w * taper(i) * 0.36); ctx.stroke(); }
  ctx.globalAlpha = 1;
  // diamond pattern every 5 samples (60 units)
  for (let i = 3; i < m - 4; i += 5) { const a = pts[i - 1], b = pts[i + 1], ang = Math.atan2(b[1] - a[1], b[0] - a[0]), r = w * taper(i) * 0.3; ctx.save(); ctx.translate(pts[i][0], pts[i][1] - r * 0.2); ctx.rotate(ang);
    ctx.fillStyle = pal.pat; ctx.beginPath(); ctx.moveTo(-r * 1.2, 0); ctx.lineTo(0, -r); ctx.lineTo(r * 1.2, 0); ctx.lineTo(0, r); ctx.closePath(); ctx.fill(); ctx.strokeStyle = pal.line; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
  ctx.restore();
  // head: a rounded wedge at the path end, sleepy eyes, tongue and yawn
  const H = pts[m - 1], Hb = pts[Math.max(0, m - 4)], dir = o.dir ?? (H[0] >= Hb[0] ? 1 : -1), ang = Math.atan2(H[1] - Hb[1], (H[0] - Hb[0]) * dir) * 0.6 + (o.headRot || 0), hw = w * 0.85, mo = K.clamp(o.mouth || 0);
  ctx.save(); ctx.translate(H[0], H[1]); ctx.scale(dir, 1); ctx.rotate(ang);
  if (o.tongue > 0) { const tl = 40 * o.tongue * w / 70; ctx.strokeStyle = '#e8364f'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(hw * 1.3, 8); ctx.lineTo(hw * 1.3 + tl, 8); ctx.lineTo(hw * 1.3 + tl + 12, 0); ctx.moveTo(hw * 1.3 + tl, 8); ctx.lineTo(hw * 1.3 + tl + 12, 16); ctx.stroke(); }
  if (mo > 0.02) celShade(ctx, [[0, 6], [hw * 1.3, 10], [hw * 1.1, 10 + hw * 0.9 * mo], [0, 20 + hw * 0.4 * mo]], '#c8405a', '#8a2a3a', { light: [0, -1], off: 6, lw: 3, line: pal.line });
  const Hd = [[-hw * 0.6, -hw * 0.5], [hw * 0.4, -hw * 0.62], [hw * 1.15, -hw * 0.38], [hw * 1.38, 0], [hw * 1.2, hw * 0.3], [hw * 0.3, hw * 0.5 + mo * hw * 0.3], [-hw * 0.6, hw * 0.45]];
  ctx.save(); ctx.translate(0, -mo * hw * 0.25); ctx.rotate(-mo * 0.35);
  celShade(ctx, Hd, pal.body, pal.shade, { light: [-0.3, -1], off: hw * 0.25, lw: 4, line: pal.line, hi: sbLight(pal.body, 0.35) });
  ctx.fillStyle = pal.line; ctx.beginPath(); ctx.arc(hw * 1.22, -hw * 0.08, 4, 0, 7); ctx.fill();
  // a big sleepy eye with a heavy lid (never hunting): lid default 0.5
  const ex = hw * 0.5, ey = -hw * 0.3, er = hw * 0.26, lid = K.clamp(o.lid ?? 0.5), gz = o.gaze || [1, 0];
  ctx.save(); ctx.beginPath(); ctx.ellipse(ex, ey, er, er * 1.05, 0, 0, 7); ctx.fillStyle = pal.eye; ctx.fill(); ctx.clip(); ctx.fillStyle = '#1a1a10'; ctx.beginPath(); ctx.ellipse(ex + gz[0] * dir * er * 0.3, ey + gz[1] * er * 0.3, er * 0.42, er * 0.62, 0, 0, 7); ctx.fill();
  ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(ex - er * 0.25, ey - er * 0.3, er * 0.2, 0, 7); ctx.fill();
  if (lid > 0) { ctx.fillStyle = pal.body; ctx.fillRect(ex - er * 1.2, ey - er * 1.2, er * 2.4, er * 2.3 * lid); } ctx.restore();
  ctx.strokeStyle = pal.line; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.ellipse(ex, ey, er, er * 1.05, 0, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.moveTo(ex - er * 1.05, ey - er * 1.05 + er * 2.1 * lid); ctx.lineTo(ex + er * 1.05, ey - er * 1.05 + er * 2.1 * lid); ctx.stroke();
  ctx.restore(); ctx.restore();
  return { head: H, eye: [H[0] + dir * hw * 0.5, H[1] - hw * 0.3] };
}
// a coiled sleeping snake: a 2.5 turn spiral of outer radius r about (cx, cy) ending in the head lying on top
function sbCoilPath(cx, cy, r, turns = 2.5, a0 = 0) { const out = []; const n = Math.round(turns * 28); for (let i = 0; i <= n; i++) { const u = i / n, a = a0 + u * turns * Math.PI * 2, rr = r * (1 - 0.62 * u); out.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.42]); } return out; }
