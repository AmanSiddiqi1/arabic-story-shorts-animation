// ===== Sinbad series kit (copied from SIND-02 into SIND-06 unchanged except SB_DUR): story kit (shared by the Sinbad episodes SIND-01, SIND-02, SIND-06) =====
// Timing helpers (twos / threes), light (bands, glow, glints, speed lines), cel building blocks (blob, stone, tuft, flower, dress),
// painted plates helpers (bake, gradient, glaze, airbrushed clouds), speech balloons, tape tracking, ribbons (turban tail, sash end),
// gulls, and the anime eye close-up (sbFace, from ALI-01-ANIME's abFace model sheet). Every name is prefixed sb/SB_ so nothing collides
// with the engine or the Library. All drawing is a pure function of its arguments (and t). Copied by later episodes as is.

const SB_PANEL = [54, 54, 972, 1196];     // story panel on the 1080 x 1920 canvas (impact frames, transitions)
const SB_ACC = '#ff7a1a', SB_ACCD = '#c8520e';   // Sinbad's one accent (turban, sash, his star seal, his sister's ribbon)

// ---------- timing ----------
const SB_T2 = (t) => celStep(t, THEME.celFps || 12);   // characters on twos
const SB_T3 = (t) => celStep(t, 8);                    // blinks, lip flaps, cel water and fire on threes
const sbIn = (t, a, b) => t >= a && t < b;
const sbE = (t, a, d, e = 'inOut') => K.ease[e](K.clamp((t - a) / d));
// lip flaps on threes while [a, b)
function sbTalk(t, a, b, seed = 1, amp = 0.9) { if (t < a || t >= b) return 0; const u = SB_T3(t); return amp * (0.25 + 0.75 * Math.abs(Math.sin(u * 9.3 + seed * 1.9) * Math.sin(u * 4.1 + seed))); }
// a one-off blink at tb (close ~0.11 s, hold, reopen ~0.17 s): for blinks on head turns
function sbBlinkAt(t, tb) { const d = t - tb; if (d < 0 || d > 0.32) return 0; return d < 0.11 ? d / 0.11 : d < 0.15 ? 1 : 1 - (d - 0.15) / 0.17; }
function sbLid(t, seed, extra = [], base = 0) { let v = Math.max(base, blink(SB_T3(t), seed)); for (const tb of extra) v = Math.max(v, sbBlinkAt(SB_T3(t), tb)); return Math.min(1, v); }
const sbP = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];   // world -> panel units
const sbHex = (r, g, b) => '#' + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
function sbMix(a, b, k) { const A = K.hex(a), B = K.hex(b); return sbHex(...A.map((v, i) => v + (B[i] - v) * k)); }
const sbDark = (c, k = 0.45) => sbMix(c, '#2b1a3a', k);
const sbLight = (c, k = 0.4) => sbMix(c, '#ffffff', k);

// ---------- light ----------
// coloured bands sweeping across a held picture (light moves, the drawing does not). rect in the current space
function sbBands(ctx, rect, t, o = {}) {
  const [x, y, w, h] = rect, cols = o.cols || ['#ffd36a', '#7fe3ff'], ang = o.angle ?? -0.55, bw = o.w || 130, sp = o.speed || 260, a = o.alpha ?? 0.22, n = o.n || 3;
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); ctx.globalCompositeOperation = o.mode || 'screen';
  ctx.translate(x + w / 2, y + h / 2); ctx.rotate(ang); const span = Math.hypot(w, h) + bw * 2;
  for (let i = 0; i < n; i++) { const px = (((t * sp + i * span / n + (o.phase || 0)) % span) + span) % span - span / 2;
    ctx.globalAlpha = a * (i % 2 ? 0.7 : 1); ctx.fillStyle = cols[i % cols.length]; ctx.fillRect(px - bw / 2, -span, bw * (i % 2 ? 0.55 : 1), span * 2); }
  ctx.restore();
}
function sbGlow(ctx, x, y, r, k = 1, col = '#ffd36a') {
  if (k <= 0 || r <= 0) return; ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = Math.min(1, k);
  const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, K.rgba(col, 0.75)); g.addColorStop(0.35, K.rgba(col, 0.28)); g.addColorStop(1, K.rgba(col, 0));
  ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2); ctx.restore();
}
function sbGlint(ctx, x, y, r, p = 1, col = '#ffffff') {
  if (p <= 0 || p >= 1) return; const k = Math.sin(Math.PI * p); ctx.save(); ctx.translate(x, y); ctx.rotate(p * 0.6); ctx.globalAlpha *= k; ctx.fillStyle = col; ctx.shadowColor = '#ffe9a0'; ctx.shadowBlur = r * 0.8;
  ctx.beginPath(); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, rr = i % 2 ? r * 0.16 * k : r * k; ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } ctx.closePath(); ctx.fill(); ctx.restore();
}
function sbGlints(ctx, rect, t, n, seed, r = 16, rate = 1.3) {
  const [x, y, w, h] = rect, R = K.rng(seed), tc = SB_T3(t);
  for (let i = 0; i < n; i++) { const px = x + R() * w, py = y + R() * h, ph = R(), per = 1.2 + R() * 1.4; const u = ((tc * rate / per + ph) % 1); if (u < 0.3) sbGlint(ctx, px, py, r * (0.7 + R() * 0.6), u / 0.3); }
}
function sbSpeed(ctx, rect, t, o = {}) {
  const [x, y, w, h] = rect, R = K.rng(o.seed || 5), n = o.n || 26, sp = (o.speed || 2600) * (o.dir || 1);
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); ctx.lineCap = 'round';
  for (let i = 0; i < n; i++) { const py = y + R() * h, len = 120 + R() * 320, ph = R() * (w + len * 2), px = x + ((((-t * sp) + ph) % (w + len * 2)) + (w + len * 2)) % (w + len * 2) - len;
    ctx.globalAlpha = (o.alpha ?? 0.5) * (0.4 + R() * 0.6); ctx.strokeStyle = i % 3 ? (o.col || '#fff1d8') : (o.col2 || '#bfe8ff'); ctx.lineWidth = 2 + R() * 4; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + len, py); ctx.stroke(); }
  ctx.restore();
}

// ---------- cel building blocks ----------
function sbBlob(ctx, cx, cy, rx, ry, fill, shade, o = {}) { celShade(ctx, ell(cx, cy, rx, ry, o.n || 24), fill, shade, { light: o.light || [-1, -1], off: o.off ?? Math.min(rx, ry) * 0.35, hi: o.hi, lw: o.lw ?? 3.5, line: o.line }); }
function sbStone(c, x, y, r, col = '#c8bcc8', sh = '#8a7e9a') { celShade(c, [[x - r, y], [x - r * 0.8, y - r * 0.55], [x - r * 0.2, y - r * 0.8], [x + r * 0.5, y - r * 0.7], [x + r, y - r * 0.2], [x + r * 0.9, y]], col, sh, { light: [-1, -1], off: r * 0.3, hi: sbLight(col, 0.5), lw: 2.5, line: sbDark(sh, 0.4) }); }
function sbTuft(c, x, y, h, col = '#5fae5a', sh = '#2f7a44') { for (let k = -2; k <= 2; k++) { c.save(); c.translate(x + k * h * 0.12, y); c.rotate(k * 0.28); celShade(c, [[-h * 0.08, 0], [0, -h * (1 - Math.abs(k) * 0.15)], [h * 0.08, 0]], col, sh, { light: [-1, 0], off: h * 0.05, lw: 2, line: sbDark(sh, 0.4) }); c.restore(); } }
function sbFlower(c, x, y, h, col) { seg(c, x, y, x + 2, y - h, 3, '#3f8a4a', 0); for (let i = 0; i < 5; i++) { const a = i * 1.2566; shape(c, ell(x + 2 + Math.cos(a) * h * 0.14, y - h + Math.sin(a) * h * 0.14, h * 0.11, h * 0.11, 10), col, { lw: 1.5, line: sbDark(col, 0.5) }); } shape(c, ell(x + 2, y - h, h * 0.08, h * 0.08, 10), '#ffe27a', { lw: 0 }); }
function sbShell(c, x, y, r, col = '#ffd8c8') { celShade(c, [[x - r, y], [x - r * 0.7, y - r * 0.8], [x, y - r], [x + r * 0.7, y - r * 0.8], [x + r, y]], col, sbDark(col, 0.25), { light: [-1, -1], off: r * 0.3, lw: 2, line: sbDark(col, 0.5) }); for (const k of [-0.5, 0, 0.5]) seg(c, x, y, x + k * r, y - r * 0.85, 1.5, sbDark(col, 0.35), 0); }
// o: {stones, tufts, flowers, shells, cols, stone [col, shade], grass [col, shade], skip [[x0, x1]]}
function sbDress(c, x0, x1, y0, y1, seed, o = {}) {
  const R = K.rng(seed), clear = (x) => (o.skip || []).some(([a, b]) => x > a && x < b), items = [];
  for (const [k, n] of [['s', o.stones ?? 10], ['t', o.tufts ?? 14], ['f', o.flowers ?? 10], ['h', o.shells ?? 0]]) for (let i = 0; i < n; i++) items.push([k, x0 + R() * (x1 - x0), y0 + R() * (y1 - y0), R()]);
  items.sort((a, b) => a[2] - b[2]);
  const cols = o.cols || ['#ff6a8a', '#ffd36a', '#fff6ea', '#9a7aff', '#ff8a3a'], [sc, ss] = o.stone || ['#c8bcc8', '#8a7e9a'], [gc, gs] = o.grass || ['#6ab85a', '#2f7a44'];
  for (const [k, x, y, q] of items) { if (clear(x)) continue; const d = 0.6 + 0.8 * (y - y0) / Math.max(1, y1 - y0);
    if (k === 's') sbStone(c, x, y, (10 + q * 22) * d, sc, ss); else if (k === 't') sbTuft(c, x, y, (26 + q * 30) * d, gc, gs); else if (k === 'h') sbShell(c, x, y, (8 + q * 8) * d, ['#ffd8c8', '#fff1d8', '#ffc0a8'][Math.floor(q * 31) % 3]);
    else sbFlower(c, x, y, (22 + q * 18) * d, cols[Math.floor(q * 97) % cols.length]); }
}

// ---------- painted plates ----------
function sbBakeAt(key, w, h, draw) { return K.cached('sb:' + key, () => { const c = K.layer(w, h), x = c.getContext('2d'); draw(x, w, h); return c; }); }
function sbGrad(ctx, x, y, w, h, stops) { const g = ctx.createLinearGradient(0, y, 0, y + h); stops.forEach(([o, c]) => g.addColorStop(o, c)); ctx.fillStyle = g; ctx.fillRect(x, y, w, h); }
function sbGlaze(ctx, x, y, r, col, a) { const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, K.rgba(col, a)); g.addColorStop(1, K.rgba(col, 0)); ctx.save(); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2); ctx.restore(); }
// a tall cumulus standing on the horizon (the series signature): flat lit top lobes, a lilac underside, a flat base. (x, base y, w, h)
function sbCumulus(ctx, x, by, w, h, o = {}) {
  const lit = o.lit || '#ffffff', body = o.body || '#f2eefa', under = o.under || '#c8b4e8', R = K.rng(o.seed || 3);
  ctx.save(); ctx.filter = `blur(${o.blur ?? 4}px)`;
  ctx.fillStyle = under; ctx.beginPath(); ctx.ellipse(x, by - h * 0.14, w * 0.5, h * 0.18, 0, 0, 7); ctx.fill();
  ctx.fillStyle = body; for (let i = 0; i < 7; i++) { const u = (i + 0.5) / 7 - 0.5, hh = h * (0.55 + 0.45 * Math.cos(u * 2.6)) * (0.85 + R() * 0.3), r = w * (0.17 + R() * 0.06); ctx.beginPath(); ctx.ellipse(x + u * w * 0.82, by - hh + r * 0.9, r, r * 0.95, 0, 0, 7); ctx.fill(); }
  ctx.fillRect(x - w * 0.45, by - h * 0.42, w * 0.9, h * 0.3);
  ctx.fillStyle = lit; for (let i = 0; i < 5; i++) { const u = (i + 0.5) / 5 - 0.5, hh = h * (0.6 + 0.4 * Math.cos(u * 2.6)), r = w * 0.12; ctx.beginPath(); ctx.ellipse(x + u * w * 0.7 - r * 0.25, by - hh + r * 0.7, r, r * 0.8, 0, 0, 7); ctx.fill(); }
  ctx.fillStyle = under; ctx.globalAlpha = 0.85; ctx.fillRect(x - w * 0.46, by - h * 0.14, w * 0.92, h * 0.14); ctx.restore();
}
function sbCloud(ctx, x, y, w, h, body, under, blur = 10) { ctx.save(); ctx.filter = `blur(${blur}px)`; ctx.fillStyle = body; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.ellipse(x + (i - 2) * w * 0.18, y - Math.sin(i * 1.3) * h * 0.25, w * 0.28, h * 0.5, 0, 0, 7); ctx.fill(); }
  ctx.fillStyle = under; ctx.beginPath(); ctx.ellipse(x, y + h * 0.28, w * 0.48, h * 0.16, 0, 0, 7); ctx.fill(); ctx.restore(); }
function sbSun(ctx, x, y, r, col = '#fff1b0', halo = '#ffc890', k = 1) { sbGlow(ctx, x, y, r * 4, 0.55 * k, halo); celShade(ctx, ell(x, y, r, r, 40), col, sbMix(col, '#ff9a5a', 0.25), { light: [-1, -1], off: r * 0.18, lw: 0 }); }
function sbMoon(ctx, x, y, r, k = 1) { sbGlow(ctx, x, y, r * 3.5, 0.45 * k, '#fff0c8'); celShade(ctx, ell(x, y, r, r, 40), '#fff6dc', '#e8d8b0', { light: [-1, -1], off: r * 0.2, lw: 0 }); ctx.save(); ctx.globalAlpha = 0.35; for (const [dx, dy, rr] of [[-0.3, -0.2, 0.18], [0.25, 0.15, 0.12], [-0.05, 0.35, 0.1]]) { ctx.fillStyle = '#e0cfa8'; ctx.beginPath(); ctx.arc(x + dx * r, y + dy * r, rr * r, 0, 7); ctx.fill(); } ctx.restore(); }

// ---------- gulls: the Library dove (white) with grey wing tips read as gulls; o: {flap, fly, dir, s} ----------
function sbGull(ctx, x, y, t, o = {}) { const tc = SB_T2(t), ph = o.seed || 1;
  bird(ctx, { kind: 'dove', pal: 0, x, y, s: o.s || 0.42, dir: o.dir || 1, fly: o.fly !== false, flap: o.flap ?? Math.sin(tc * 22 + ph * 2.1), beak: o.beak || 0, rot: o.rot || 0, lid: o.lid, gaze: o.gaze, sq: o.sq });
}
// a flock of n gulls crossing at v units/s from (x0, y0); out of sync by seed
function sbGulls(ctx, t, x0, y0, v, n = 3, seed = 1, s = 0.38) {
  const R = K.rng(seed), dir = v < 0 ? -1 : 1;
  for (let i = 0; i < n; i++) { const dx = R() * 160 - i * 90, dy = R() * 90 - 45, ph = R() * 6; sbGull(ctx, x0 + dx * dir + v * t, y0 + dy + 14 * Math.sin(SB_T2(t) * 1.6 + ph), t, { dir, s: s * (0.8 + R() * 0.4), seed: ph * 3 + i }); }
}

// ---------- ribbons: turban tail, sash end, pennant, rope tail (a tapered cel on a travelling sine, on threes) ----------
// from (x, y) along angle ang (radians, world), len units, w width at the root; o: {amp, freq, k (wave number), t, col, shade, lag}
function sbRibbon(ctx, x, y, ang, len, w, t, o = {}) {
  const tc = SB_T3(t), n = 7, amp = o.amp ?? 10, fr = o.freq ?? 9, kk = o.k ?? 1.3, ca = Math.cos(ang), sa = Math.sin(ang), A = [], B = [];
  for (let i = 0; i <= n; i++) { const u = i / n, wv = amp * u * Math.sin(tc * fr - i * kk + (o.ph || 0)) + (o.droop || 0) * u * u, px = x + ca * len * u - sa * wv, py = y + sa * len * u + ca * wv, ww = w * (1 - 0.75 * u) / 2;
    A.push([px - sa * ww, py + ca * ww]); B.push([px + sa * ww, py - ca * ww]); }
  celShade(ctx, [...A, ...B.reverse()], o.col || SB_ACC, o.shade || SB_ACCD, { light: [0, -1], off: w * 0.25, lw: o.lw ?? 2.5, line: o.line });
}

// ---------- speech: English balloons pointing at the speaker (owner direction) ----------
function sbSay(ctx, S, steps, t, x, y, to, o = {}) {
  if (t < steps[0][0] || (o.gone && t > o.gone + 0.25)) return; let txt = steps[0][1], t0 = steps[0][0];
  for (const [ts, tx] of steps) if (t >= ts) { txt = tx; t0 = ts; }
  { let hw = 0; for (const [, tx] of steps) hw = Math.max(hw, tx.length * (o.size || 50) * 0.3 + 45); x = K.clamp(x, hw + 25, 1000 - hw - 25); }   // SIND-06: keep the balloon inside the panel
  const pop = o.pop === false ? 1 : 1 + 0.12 * Math.max(0, 1 - (t - t0) / 0.2), wb = o.wobble ? Math.sin(SB_T3(t) * 17) * o.wobble : 0;
  ctx.save(); if (o.gone && t > o.gone) ctx.globalAlpha *= 1 - K.clamp((t - o.gone) / 0.25);
  ctx.translate(x, y + wb); ctx.scale(pop, pop); ctx.translate(-x, -y - wb);
  S.label(ctx, txt, x, y + wb, K.clamp((t - steps[0][0]) / 0.3), { size: o.size || 50, balloon: true, to, color: o.col }); ctx.restore();
}
// a plain tag (fades in at a, out at b)
function sbTag(ctx, S, text, x, y, t, a, b, o = {}) { if (t < a || t > b + 0.25) return; ctx.save(); if (t > b) ctx.globalAlpha *= 1 - (t - b) / 0.25; S.label(ctx, text, x, y, K.clamp((t - a) / 0.35), { size: o.size || 44, ...o }); ctx.restore(); }
// tape tracking noise band in canvas pixels inside the story panel
function sbTracking(ctx, t, t0, dur = 0.5) {
  const u = (t - t0) / dur; if (u < 0 || u > 1) return; const [x, y, w, h] = SB_PANEL, cv = ctx.canvas, R = K.rng(1 + Math.floor(t * 30)), by = y + h * u;
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  for (let i = 0; i < 4; i++) { const yy = by + (R() - 0.5) * 90, bh = 6 + R() * 26, dx = (R() - 0.5) * 70; ctx.drawImage(cv, x, yy, w, bh, x + dx, yy, w, bh); ctx.fillStyle = 'rgba(255,255,255,0.22)'; ctx.fillRect(x, yy + bh * 0.5, w, 2); }
  ctx.restore();
}

// ---------- the anime face close-up (model sheet after ALI-01-ANIME abFace) ----------
// sbFace(ctx, x, y, k, F): head centre (x, y), scale k (1 = head about 500 units wide). F: who 'sinbad', gaze [gx, gy], lid, iris 0.4..1.4,
// brow -1..1, mouth 'set' | 'o' | 'smile', reflect(ctx, r, sd) drawn inside each iris, wet 0..1, light [lx, ly]
function sbCS(ctx, pts, fill, shade, o = {}) {
  const [lx, ly] = o.light || [-1, -1], l = Math.hypot(lx, ly) || 1, off = o.off ?? 10, dx = lx / l * off, dy = ly / l * off;
  ctx.save(); K.poly(ctx, pts, true); ctx.fillStyle = fill; ctx.fill(); ctx.clip();
  const cres = (sx, sy, col, a) => { ctx.save(); ctx.beginPath(); ctx.rect(-1e4, -1e4, 2e4, 2e4); pts.forEach((p, i) => (i ? ctx.lineTo(p[0] + sx, p[1] + sy) : ctx.moveTo(p[0] + sx, p[1] + sy))); ctx.closePath(); ctx.fillStyle = col; ctx.globalAlpha = a; ctx.fill('evenodd'); ctx.restore(); };
  cres(dx, dy, shade, 1); if (o.hi) cres(-dx * 0.5, -dy * 0.5, o.hi, 0.75);
  ctx.restore(); if (o.lw !== 0) ink(ctx, pts, o.lw || 4, 1, o.line || C.black);
}
const SB_FACE = { sinbad: { skin: C.skin, shade: '#d99a80', line: '#6a3a2a', iris: '#6b3e22', irisD: '#3e2012', tur: SB_ACC, turS: SB_ACCD, band: '#ffffff', hair: '#2a1a14' } };
function sbFace(ctx, x, y, k, F = {}) {
  const D = SB_FACE[F.who || 'sinbad'], lw = (w) => w / Math.max(0.5, Math.sqrt(k)), skin = D.skin, sh = D.shade, line = D.line, gz = F.gaze || [0, 0];
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  sbCS(ctx, [[-110, 220], [110, 220], [150, 420], [-150, 420]], skin, sh, { light: [-1, -0.4], off: 30, lw: lw(3), line });
  const face = [[-196, -150], [-204, -10], [-186, 110], [-132, 220], [-56, 280], [0, 292], [56, 280], [132, 220], [186, 110], [204, -10], [196, -150], [0, -200]];
  sbCS(ctx, face, skin, sh, { light: F.light || [-1, -0.5], off: 60, lw: lw(3.5), line });
  for (const sd of [-1, 1]) sbCS(ctx, ell(sd * 210, 30, 30, 52, 16), skin, sh, { light: [-sd, 0], off: 12, lw: lw(3), line });
  // hair at the temples (young, no beard)
  for (const sd of [-1, 1]) sbCS(ctx, [[sd * 196, -150], [sd * 214, -60], [sd * 200, 10], [sd * 170, -100]], D.hair, sbDark(D.hair, 0.3), { light: [-1, -1], off: 6, lw: lw(3), line: '#120806' });
  ctx.save(); ctx.fillStyle = sh; ctx.beginPath(); ctx.moveTo(6, 30); ctx.lineTo(28, 120); ctx.lineTo(4, 128); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = line; ctx.lineWidth = lw(4); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-4, 124); ctx.lineTo(20, 130); ctx.stroke(); ctx.restore();
  const mo = F.mouth || 'set'; ctx.save(); ctx.strokeStyle = line; ctx.lineWidth = lw(5); ctx.lineCap = 'round';
  if (mo === 'o') shape(ctx, ell(0, 196, 24, 30, 18), '#5a1a22', { lw: lw(4), line });
  else if (mo === 'smile') { ctx.beginPath(); ctx.moveTo(-64, 178); ctx.quadraticCurveTo(0, 214, 64, 178); ctx.stroke(); }
  else { ctx.beginPath(); ctx.moveTo(-36, 192); ctx.quadraticCurveTo(0, 188, 36, 192); ctx.stroke(); }
  ctx.restore();
  const by = F.brow || 0;
  for (const sd of [-1, 1]) {
    const ex = sd * 92, ey = 10, ew = 70, eh = 46 + 8 * (F.wide || 0), lid = K.clamp(F.lid ?? 0);
    const alm = [[ex - sd * ew, ey + 4], [ex - sd * ew * 0.5, ey - eh * 0.95], [ex + sd * ew * 0.3, ey - eh * 1.05], [ex + sd * ew * 1.05, ey - 4], [ex + sd * ew * 0.4, ey + eh * 0.85], [ex - sd * ew * 0.5, ey + eh * 0.8]];
    ctx.save(); K.poly(ctx, alm, true); ctx.fillStyle = '#fffaf0'; ctx.fill(); ctx.clip();
    const ir = 32 * (F.iris ?? 1), ix = ex + gz[0] * 28, iy = ey + gz[1] * 14;
    ctx.fillStyle = D.iris; ctx.beginPath(); ctx.ellipse(ix, iy, ir * 0.82, ir * 1.1, 0, 0, 7); ctx.fill();
    ctx.fillStyle = D.irisD; ctx.beginPath(); ctx.ellipse(ix, iy - ir * 0.35, ir * 0.82, ir * 0.6, 0, Math.PI, 0); ctx.fill();
    ctx.fillStyle = '#120a10'; ctx.beginPath(); ctx.ellipse(ix, iy + 2, ir * 0.36 * (F.pupil ?? 1), ir * 0.48 * (F.pupil ?? 1), 0, 0, 7); ctx.fill();
    if (F.reflect) { ctx.save(); ctx.beginPath(); ctx.ellipse(ix, iy, ir * 0.82, ir * 1.1, 0, 0, 7); ctx.clip(); ctx.translate(ix, iy); F.reflect(ctx, ir, sd); ctx.restore(); }
    ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.ellipse(ix - ir * 0.32, iy - ir * 0.42, ir * 0.24, ir * 0.3, -0.4, 0, 7); ctx.fill(); ctx.beginPath(); ctx.ellipse(ix + ir * 0.3, iy + ir * 0.4, ir * 0.1, ir * 0.1, 0, 0, 7); ctx.fill();
    if (F.wet) { ctx.fillStyle = 'rgba(160,210,255,0.55)'; ctx.fillRect(ex - ew, ey + eh * 0.45, ew * 2, eh); }
    if (lid > 0) { ctx.fillStyle = skin; ctx.fillRect(ex - ew * 1.2, ey - eh * 1.2, ew * 2.4, eh * 2.3 * lid); }
    ctx.restore();
    const ly = ey - eh + eh * 1.9 * lid;
    ctx.save(); ctx.strokeStyle = '#2a1018'; ctx.lineCap = 'round'; ctx.lineWidth = lw(9); ctx.beginPath(); ctx.moveTo(ex - sd * ew * 1.02, ey + 2 + (ly - ey) * 0.4); ctx.quadraticCurveTo(ex, ly - 6, ex + sd * ew * 1.12, ly + 4 - (lid > 0.9 ? 0 : 8)); ctx.stroke();
    ctx.lineWidth = lw(5); ctx.beginPath(); ctx.moveTo(ex + sd * ew * 0.95, ly - 2); ctx.lineTo(ex + sd * ew * 1.3, ly - 16); ctx.stroke();
    const b0 = ey - 66 - (by < 0 ? -by * 26 : 0), inner = by > 0 ? by * 18 : by * 20;
    ctx.lineWidth = lw(9); ctx.strokeStyle = D.hair; ctx.beginPath(); ctx.moveTo(ex - sd * ew * 0.95, b0 + inner); ctx.quadraticCurveTo(ex, b0 - 16, ex + sd * ew * 1.1, b0 + 8); ctx.stroke(); ctx.restore();
  }
  // SIND-02: F.bare = no turban (the cloth is rope): a blue-black hair cap with three spiky tufts instead
  if (F.bare) { sbCS(ctx, [[-214, -60], [-226, -190], [-160, -300], [-40, -350], [90, -346], [190, -290], [228, -180], [214, -60], [150, -150], [40, -190], [-70, -186], [-160, -140]], '#2a2030', '#120a18', { light: [-1, -1], off: 26, lw: lw(4), line: '#120a18' });
    for (const [x, a] of [[-90, -0.5], [10, 0], [110, 0.5]]) sbCS(ctx, [[x - 40, -320], [x + Math.sin(a) * 130, -320 - Math.cos(a) * 130], [x + 40, -320]], '#2a2030', '#120a18', { light: [-1, -1], off: 10, lw: lw(3), line: '#120a18' });
    ctx.restore(); return; }
  // tangerine turban (the accent) with a white band, folds as hard cels
  const T = [[-246, -120], [-258, -230], [-196, -380], [-60, -446], [80, -442], [206, -366], [258, -230], [246, -120], [120, -150], [0, -158], [-120, -150]];
  sbCS(ctx, T, D.tur, D.turS, { light: [-1, -1], off: 34, hi: sbLight(D.tur, 0.35), lw: lw(4), line: sbDark(D.turS, 0.3) });
  ctx.save(); ctx.strokeStyle = D.turS; ctx.lineWidth = lw(7); for (const q of [[[-230, -200], [-40, -300], [200, -280]], [[-200, -300], [0, -380], [180, -350]]]) { ctx.beginPath(); K.poly(ctx, q); ctx.stroke(); } ctx.restore();
  ctx.save(); ctx.strokeStyle = D.band; ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-242, -136); ctx.quadraticCurveTo(0, -176, 242, -136); ctx.stroke(); ctx.restore();
  ctx.restore();
}

// ---------- the film ----------
const SB_DUR = 151.37;                    // SIND-06: narration 147.37 + plan end_hold 4.0
const SB_SHOTS = [];                      // { a, b, ww, cam(t), world(ctx, t, cam, S), over(ctx, t, cam, S) } or { a, b, panel(ctx, t, S) }
// a living hold for any person: idle sway on tip, breathing on sq, blinks on threes (unless set), t for ribbons
function sbAlive(t, seed, P) { const tc = SB_T2(t); P.tip = (P.tip || 0) + idleSway(tc, seed, 0.022, 2.4 + (seed % 5) * 0.37); P.sq = (P.sq ?? 1) * breathe(tc, seed, 0.014); if (P.lid == null) P.lid = sbLid(t, seed); P.t = t; return P; }
const sbF = (t, keys) => flow(SB_T2(t), keys);   // flowing key poses sampled on twos
// draw people in world units inside a vessel's crew callback: undo the vessel scale (dir +1 only), so deck y = -80 * s, x = lx * s
function sbOnDeck(c, s, draw) { c.save(); c.scale(1 / s, 1 / s); draw(c); c.restore(); }
