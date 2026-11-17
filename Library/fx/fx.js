// ===== small effects. Also in core/helpers.js: sfx (lettering), bubble, cloud (thought), bulb, zzz, dizzy, star, clockFace. =====
function drops(ctx, x, y, t, n = 3, col = '#5fa0ff') { for (let i = 0; i < n; i++) { const u = ((t * 1.3 + i / n) % 1), dx = (i - (n - 1) / 2) * 22, dy = u * 46; ctx.save(); ctx.globalAlpha = 1 - u; shape(ctx, [[x + dx, y + dy - 18], [x + dx + 9, y + dy], [x + dx, y + dy + 9], [x + dx - 9, y + dy], [x + dx, y + dy - 18]], col, { lw: 3, seed: 2 }); ctx.restore(); } }
function steam(ctx, x, y, t) { for (let i = 0; i < 4; i++) { const u = ((t * 0.9 + i / 4) % 1), px = x + (i - 1.5) * 34 + Math.sin(u * 7 + i) * 8, py = y - u * 80; ctx.save(); ctx.globalAlpha = Math.min(1, u * 4) * (1 - u); shape(ctx, ell(px, py, 13 + u * 10, 11 + u * 8, 12), C.white, { lw: 4, seed: 3 }); ctx.restore(); } }
function note(ctx, x, y, s = 1, col = C.black) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = col; ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(0, 0, 11, 8, -0.4, 0, 7); ctx.fill(); ctx.beginPath(); ctx.moveTo(9, -2); ctx.lineTo(9, -40); ctx.lineTo(26, -32); ctx.stroke(); ctx.restore(); }
// heart(ctx, x, y, r, {fill, lw, alpha})  (the two stories' hearts, unified)
function heart(ctx, x, y, r, o = {}) { ctx.save(); ctx.globalAlpha = o.alpha ?? 1; const p = []; for (let i = 0; i <= 40; i++) { const a = i / 40 * Math.PI * 2; p.push([x + r * 0.07 * 16 * Math.pow(Math.sin(a), 3), y - r * 0.07 * (13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a))]); } shape(ctx, p, o.fill || C.red, { lw: o.lw ?? 5, seed: 5 }); ctx.restore(); }
function peekEyes(ctx, x, y, look, blink) { ctx.save(); ctx.fillStyle = '#17401f'; ctx.beginPath(); ctx.ellipse(x, y, 38, 22, 0, 0, 7); ctx.fill(); ctx.restore(); for (const ex of [-14, 14]) eyeAt(ctx, x + ex, y, blink ? 'shut' : 'wide', look); }
function soundArcs(ctx, x, y, dirx, t, col = C.white) { for (let i = 0; i < 3; i++) { const u = ((t * 1.6 + i / 3) % 1); ctx.save(); ctx.globalAlpha = 1 - u; ctx.lineWidth = 6; ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(x, y, 20 + u * 60, dirx > 0 ? -0.7 : Math.PI - 0.7, dirx > 0 ? 0.7 : Math.PI + 0.7); ctx.stroke(); ctx.restore(); } }
function ripple(ctx, x, y, t0, t, sz = 1) { const u = (t - t0) / 1.4; if (u < 0 || u > 1) return; for (let i = 0; i < 2; i++) { const v = K.clamp(u - i * 0.18); if (v <= 0) continue; ctx.save(); ctx.globalAlpha = 1 - v; ctx.lineWidth = 5; ctx.strokeStyle = C.white; ctx.beginPath(); ctx.ellipse(x, y, (20 + v * 70) * sz, (6 + v * 16) * sz, 0, 0, 7); ctx.stroke(); ctx.restore(); } }

// ----- from the Fable experiment (Lark and the Elephant) -----
// dustBurst(ctx, x, y, d, n, rmin, rmax, dist, dur, seed): puffs leaving a point radially, out and up; d = seconds since impact.
// Footfall: dustBurst(ctx, fx, groundY, t - tFall, 4, 7, 13, 30, 0.5, k). Big impact: dustBurst(ctx, x, groundY - 10, t - tHit, 10, 10, 34, 120, 0.6, 5).
const BRNG = (() => { const r = K.rng(77), a = []; for (let i = 0; i < 40; i++) a.push(r()); return a; })();
function dustBurst(ctx, x, y, d, n, rmin, rmax, dist, dur, seed = 0) { if (d < 0 || d > dur) return; const u = d / dur, o = K.ease.out(u);
  ctx.save(); ctx.globalAlpha = 1 - u * u; for (let i = 0; i < n; i++) { const q = BRNG[(i * 3 + seed) % 40], a = Math.PI + 0.12 + (i / (n - 1)) * (Math.PI - 0.24) + (q - 0.5) * 0.3, rr = K.lerp(rmin, rmax, BRNG[(i * 7 + seed + 1) % 40]) * (1 - 0.45 * u), dd = dist * (0.55 + 0.6 * q) * o;
    ctx.beginPath(); ctx.arc(x + Math.cos(a) * dd * 1.35, y + Math.sin(a) * dd * 0.75 - rr * 0.4, rr, 0, 7); ctx.fillStyle = '#f2d27a'; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.stroke(); } ctx.restore(); }
// teardrops(ctx, t, t0, t1, eye, {groundY: 890, rate: 3, vx: 28}): round tears with a highlight, released from eye(time) -> [x, y]
// (or a fixed [x, y]) between t0 and t1, falling under gravity to the ground with a small splash.
function teardrops(ctx, t, t0, t1, eye, o = {}) {
  const gy = o.groundY ?? 890, rate = o.rate ?? 3, vx = o.vx ?? 28, at = (tt) => (typeof eye === 'function' ? eye(tt) : eye);
  for (let i = 0; ; i++) { const ts = t0 + i / rate; if (ts >= t1 || ts > t) break; const d = t - ts, [ex, ey] = at(ts), T = Math.sqrt(2 * Math.max(10, gy - ey) / 900);
    if (d < T) { const x = ex + 4 + vx * d, y = ey + 6 + 450 * d * d, g = K.clamp(d / 0.08) * 0.6 + 0.4; ctx.save(); ctx.translate(x, y); ctx.scale(g, g);
      ctx.beginPath(); ctx.moveTo(0, -11); ctx.quadraticCurveTo(6, -3, 6, 2); ctx.arc(0, 2, 6, 0, Math.PI); ctx.quadraticCurveTo(-6, -3, 0, -11); ctx.fillStyle = TEAR; ctx.fill(); ctx.lineWidth = 2.5; ctx.strokeStyle = C.black; ctx.stroke();
      ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(-2, 1, 1.8, 0, 7); ctx.fill(); ctx.restore(); }
    else if (d < T + 0.22) { const k = (d - T) / 0.22, x = ex + 4 + vx * T; ctx.save(); ctx.globalAlpha = 1 - k; ctx.fillStyle = TEAR; ctx.strokeStyle = C.black; ctx.lineWidth = 1.5;
      for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(x + sd * (4 + k * 12), gy - 4 - 10 * Math.sin(Math.PI * k), 2.6, 0, 7); ctx.fill(); ctx.stroke(); } ctx.restore(); } }
}
// feather(ctx, t, {t0, t1, a: [x, y], b: [x, y], col}): a small feather see-sawing down from a to b, then lying still
function feather(ctx, t, f) { if (t < f.t0) return; const u = K.clamp((t - f.t0) / (f.t1 - f.t0)), x = K.lerp(f.a[0], f.b[0], u) + 16 * Math.sin(u * Math.PI * 3) * (1 - u * 0.6), y = K.lerp(f.a[1], f.b[1], u);
  ctx.save(); ctx.translate(x, y); ctx.rotate(u < 1 ? 0.7 * Math.cos(u * Math.PI * 3) : 1.35); shape(ctx, ell(0, 0, 13, 5, 12), f.col || C.yellow, { lw: 3, seed: 4 }); seg(ctx, -13, 0, 6, 0, 1, '#e0a800', 1); ctx.restore(); }
// halftoneShadow(ctx, x, y, r, alpha): a dotted cast shadow on the ground (grows under a raised foot, a falling rock...)
function halftoneShadow(ctx, x, y, r, a = 0.5) { if (r <= 0) return; ctx.save(); ctx.globalAlpha = a; const pts = ell(x, y, r, r * 0.42, 28); K.poly(ctx, pts, true); ctx.clip(); ctx.fillStyle = dotPat(ctx, C.black, 7, 0.32); ctx.fillRect(x - r - 4, y - r, 2 * r + 8, 2 * r); ctx.restore(); }

// thoughtCloud(ctx, x, y, w, h, t, o): comic thought balloon centred at (x, y), w x h, with a bubble trail to the thinker; the scene draws
// inside it (clipped) at reduced scale. Added 2026-11-16 (generalises the Thief and KD-009 thought clouds). Returns true when drawn.
//   o.p      0..1 pop-in progress (default 1): the trail bubbles pop first (from the thinker outward), then the cloud with a back-ease
//   o.tail   [x, y] the thinker's head (same coordinates as x, y); no trail if omitted
//   o.inside (c, t) draws the thought in WORLD units: o.at (default [500, 700]) lands on the cloud centre, scaled by o.scale (default 0.3)
//   o.fill   balloon colour (C.white); o.bg inside background drawn before o.inside (default: o.fill); o.n bumps (11); o.seed (3); o.lw (11)
function thoughtCloud(ctx, x, y, w, h, t, o = {}) {
  const p = o.p ?? 1, rx = w / 2, ry = h / 2, r = K.rng(o.seed ?? 3), n = o.n ?? 11, fill = o.fill || C.white, lw = o.lw ?? 11;
  if (p <= 0) return false;
  // trail
  if (o.tail) {
    const dx = o.tail[0] - x, dy = o.tail[1] - y, a = Math.atan2(dy / ry, dx / rx), ex = x + Math.cos(a) * rx * 0.95, ey = y + Math.sin(a) * ry * 0.95, rr = [26, 18, 11];
    [0.82, 0.55, 0.28].forEach((f, i) => { const k = K.ease.back(K.clamp((p - i * 0.1) / 0.18)); if (k <= 0) return; const bx = K.lerp(ex, o.tail[0], f), by = K.lerp(ey, o.tail[1], f), br = rr[2 - i] * Math.min(1.4, Math.max(0.7, Math.min(w, h) / 360)) * k;
      ctx.save(); ctx.beginPath(); ctx.arc(bx, by, br, 0, Math.PI * 2); ctx.lineWidth = lw * 0.62; ctx.strokeStyle = C.black; ctx.stroke(); ctx.fillStyle = fill; ctx.fill(); ctx.restore(); });
  }
  const k = K.ease.back(K.clamp((p - 0.3) / 0.7)); if (k <= 0) return false;
  const bumps = []; for (let i = 0; i < n; i++) { const a = (i + r() * 0.35) / n * Math.PI * 2, br = Math.min(rx, ry) * (0.3 + r() * 0.1) * (1 + 0.04 * Math.sin(t * 2.1 + i * 1.7)); bumps.push([Math.cos(a) * rx * 0.76, Math.sin(a) * ry * 0.76, br]); }
  const path = (c) => { c.beginPath(); c.ellipse(0, 0, rx * 0.8, ry * 0.8, 0, 0, Math.PI * 2); for (const [bx, by, br] of bumps) { c.moveTo(bx + br, by); c.arc(bx, by, br, 0, Math.PI * 2); } };
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  ctx.lineWidth = lw * 2; ctx.strokeStyle = C.black; ctx.lineJoin = 'round'; path(ctx); ctx.stroke(); ctx.fillStyle = fill; path(ctx); ctx.fill('nonzero');
  if (o.inside) { ctx.save(); path(ctx); ctx.clip('nonzero'); if (o.bg && o.bg !== fill) { ctx.fillStyle = o.bg; ctx.fillRect(-rx * 1.2, -ry * 1.2, rx * 2.4, ry * 2.4); }
    const sc = o.scale ?? 0.3, at = o.at || [500, 700]; ctx.scale(sc, sc); ctx.translate(-at[0], -at[1]); o.inside(ctx, t); ctx.restore(); }
  ctx.restore(); return true;
}
