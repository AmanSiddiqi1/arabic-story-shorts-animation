// ===== The Ebony Horse series (HORSE-01..05, 80s Cel Anime): shared story kit =====
// Timing on twos/threes, light (glow, glints, bands, speed lines), painted-plate helpers (gradients, glazes, soft clouds),
// ground dressing (stones, tufts, flowers), English speech balloons, tape tracking noise, and a velocity integrator for scrolls.
// Copied from the ALI-01-ANIME v4 kit (the owner's reference for this style) and renamed eh/EH_ so nothing collides with the
// engine, the Library or another story. Episodes 2-5 copy this file unchanged. Every drawing is a pure function of its arguments.

const EH_PANEL = [54, 54, 972, 1196];     // story panel on the 1080 x 1920 canvas (transitions, tracking noise)
const EH_GR = 900;                        // ground line in every ground world

// ---------- colour maths ----------
const ehHex = (r, g, b) => '#' + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
function ehMix(a, b, k) { const A = K.hex(a), B = K.hex(b); return ehHex(...A.map((v, i) => v + (B[i] - v) * k)); }
const ehDark = (c, k = 0.45) => ehMix(c, '#2b1a3a', k);
const ehLight = (c, k = 0.4) => ehMix(c, '#ffffff', k);

// ---------- timing ----------
const EH_T2 = (t) => celStep(t, THEME.celFps || 12);     // characters on twos
const EH_T3 = (t) => celStep(t, 8);                      // blinks and lip flaps on threes
const ehIn = (t, a, b) => t >= a && t < b;
const ehE = (t, a, d, e = 'inOut') => K.ease[e](K.clamp((t - a) / d));
const ehFade = (t, a, b, f = 0.25) => K.clamp(Math.min((t - a) / f, (b - t) / f));   // 0..1 window with soft edges
// lip flaps on threes while [a, b): 0..1, seeded so two speakers never flap together
function ehTalk(t, a, b, seed = 1, amp = 0.9) { if (t < a || t >= b) return 0; const u = EH_T3(t); return amp * (0.25 + 0.75 * Math.abs(Math.sin(u * 9.3 + seed * 1.9) * Math.sin(u * 4.1 + seed))); }
// a one-off blink at tb (closes ~0.11 s, holds, reopens ~0.17 s): for blinks on head turns
function ehBlinkAt(t, tb) { const d = t - tb; if (d < 0 || d > 0.32) return 0; return d < 0.11 ? d / 0.11 : d < 0.15 ? 1 : 1 - (d - 0.15) / 0.17; }
function ehLid(t, seed, extra = [], base = 0) { const u = EH_T3(t); let v = blink(u, seed); for (const tb of extra) v = Math.max(v, ehBlinkAt(u, tb)); return Math.max(base, v); }
// position from velocity keys [[t, v], ...] (linear between keys): a pure function of t through a cumulative table
function ehInteg(keys, t0 = 0, t1 = 140, dt = 1 / 60) {
  const n = Math.ceil((t1 - t0) / dt) + 1, acc = new Float64Array(n); let x = 0;
  for (let i = 1; i < n; i++) { const ta = t0 + (i - 1) * dt; x += dt * (kfn(ta, keys, 'lin') + kfn(ta + dt, keys, 'lin')) / 2; acc[i] = x; }
  return (t) => { const f = K.clamp((t - t0) / dt, 0, n - 1), i = Math.floor(f), j = Math.min(n - 1, i + 1); return acc[i] + (acc[j] - acc[i]) * (f - i); };
}

// ---------- light ----------
function ehGlow(ctx, x, y, r, k = 1, col = '#ffd36a') {
  if (k <= 0) return; ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = Math.min(1, k);
  const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, K.rgba(col, 0.75)); g.addColorStop(0.35, K.rgba(col, 0.28)); g.addColorStop(1, K.rgba(col, 0));
  ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2); ctx.restore();
}
// 4-point star glint, size r, life p 0..1
function ehGlint(ctx, x, y, r, p = 0.5, col = '#ffffff') {
  if (p <= 0 || p >= 1) return; const k = Math.sin(Math.PI * p); ctx.save(); ctx.translate(x, y); ctx.rotate(p * 0.6); ctx.globalAlpha *= k; ctx.fillStyle = col; ctx.shadowColor = '#ffe9a0'; ctx.shadowBlur = r * 0.8;
  ctx.beginPath(); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, rr = i % 2 ? r * 0.16 * k : r * k; ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } ctx.closePath(); ctx.fill(); ctx.restore();
}
// glints popping on twos at seeded spots inside a rect
function ehGlints(ctx, rect, t, n, seed, r = 16, rate = 1.3) {
  const [x, y, w, h] = rect, R = K.rng(seed), tc = EH_T2(t);
  for (let i = 0; i < n; i++) { const px = x + R() * w, py = y + R() * h, ph = R(), per = 1.2 + R() * 1.4; const u = ((tc * rate / per + ph) % 1); if (u < 0.3) ehGlint(ctx, px, py, r * (0.7 + R() * 0.6), u / 0.3); }
}
// one coloured light band sweeping across a rect (move light, not the drawing); u 0..1 position across
function ehBand(ctx, rect, u, o = {}) {
  if (u <= 0 || u >= 1) return; const [x, y, w, h] = rect, bw = o.w || 90, ang = o.angle ?? -0.5, span = w + h + bw * 2;
  ctx.save(); if (o.clip) o.clip(ctx); else { ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); }
  ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha *= (o.alpha ?? 0.45) * Math.sin(Math.PI * u); ctx.fillStyle = o.col || '#fff2c0';
  ctx.translate(x - h * 0.5 + span * u - bw, y + h / 2); ctx.rotate(ang); ctx.fillRect(-bw / 2, -span, bw, span * 2); ctx.restore();
}
// speed lines (o.vertical: streaks running down = climbing), on ones
function ehSpeed(ctx, rect, t, o = {}) {
  const [x, y, w, h] = rect, R = K.rng(o.seed || 5), n = o.n || 24, sp = (o.speed || 2600) * (o.dir || 1), V = !!o.vertical, L = V ? h : w, Wd = V ? w : h;
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); ctx.lineCap = 'round';
  for (let i = 0; i < n; i++) { const q = R() * Wd, len = 120 + R() * 320, ph = R() * (L + len * 2), p = ((((t * sp) + ph) % (L + len * 2)) + (L + len * 2)) % (L + len * 2) - len;
    ctx.globalAlpha = (o.alpha ?? 0.5) * (0.4 + R() * 0.6); ctx.strokeStyle = i % 3 ? (o.col || '#fff1d8') : (o.col2 || '#ffe08a'); ctx.lineWidth = 2 + R() * 4; ctx.beginPath();
    if (V) { ctx.moveTo(x + q, y + p); ctx.lineTo(x + q, y + p + len); } else { ctx.moveTo(x + p, y + q); ctx.lineTo(x + p + len, y + q); } ctx.stroke(); }
  ctx.restore();
}
// a cel blob (flat fill + hard shade + coloured line)
function ehBlob(ctx, cx, cy, rx, ry, fill, shade, o = {}) { celShade(ctx, ell(cx, cy, rx, ry, o.n || 24), fill, shade, { light: o.light || [-1, -1], off: o.off ?? Math.min(rx, ry) * 0.35, hi: o.hi, lw: o.lw ?? 3.5, line: o.line || ehDark(shade, 0.4) }); }

// ---------- painted plates ----------
function ehBakeAt(key, w, h, draw, q = 1) { return K.cached('eh:' + key, () => { const c = K.layer(Math.ceil(w * q), Math.ceil(h * q)), x = c.getContext('2d'); x.scale(q, q); draw(x, w, h); return c; }); }
function ehGrad(ctx, x, y, w, h, stops) { const g = ctx.createLinearGradient(0, y, 0, y + h); stops.forEach(([o, c]) => g.addColorStop(o, c)); ctx.fillStyle = g; ctx.fillRect(x, y, w, h); }
function ehGlaze(ctx, x, y, r, col, a) { const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, K.rgba(col, a)); g.addColorStop(1, K.rgba(col, 0)); ctx.save(); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2); ctx.restore(); }
// airbrushed cloud: blurred body with a lighter top and a tinted underside
function ehCloud(ctx, x, y, w, h, body, under, blur = 10, seed = 1) {
  const R = K.rng(seed); ctx.save(); ctx.filter = `blur(${blur}px)`; ctx.fillStyle = under; ctx.beginPath(); ctx.ellipse(x, y + h * 0.22, w * 0.5, h * 0.24, 0, 0, 7); ctx.fill();
  ctx.fillStyle = body; for (let i = 0; i < 6; i++) { const u = (i - 2.5) / 2.5; ctx.beginPath(); ctx.ellipse(x + u * w * 0.36, y - (1 - Math.abs(u)) * h * 0.28 - R() * h * 0.12, w * (0.2 + R() * 0.08), h * (0.36 + R() * 0.12), 0, 0, 7); ctx.fill(); }
  ctx.restore();
}
function ehSoftHills(ctx, w, base, amp, col, seed, blur = 2, bottom = 1230) { const R = K.rng(seed); ctx.save(); ctx.filter = `blur(${blur}px)`; ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(0, bottom);
  const ph = R() * 6, f1 = 0.004 + R() * 0.003, f2 = 0.011 + R() * 0.004; for (let x = 0; x <= w; x += 20) ctx.lineTo(x, base - amp * (0.6 * Math.sin(x * f1 + ph) + 0.4 * Math.sin(x * f2 + ph * 2))); ctx.lineTo(w, bottom); ctx.closePath(); ctx.fill(); ctx.restore(); }

// ---------- ground dressing (baked into plates) ----------
function ehStone(c, x, y, r, col = '#c8bcc8', sh = '#8a7e9a') { celShade(c, [[x - r, y], [x - r * 0.8, y - r * 0.55], [x - r * 0.2, y - r * 0.8], [x + r * 0.5, y - r * 0.7], [x + r, y - r * 0.2], [x + r * 0.9, y]], col, sh, { light: [-1, -1], off: r * 0.3, hi: ehLight(col, 0.5), lw: 2.5, line: ehDark(sh, 0.4) }); }
function ehTuft(c, x, y, h, col = '#5fae5a', sh = '#2f7a44') { for (let k = -2; k <= 2; k++) { c.save(); c.translate(x + k * h * 0.12, y); c.rotate(k * 0.28); celShade(c, [[-h * 0.08, 0], [0, -h * (1 - Math.abs(k) * 0.15)], [h * 0.08, 0]], col, sh, { light: [-1, 0], off: h * 0.05, lw: 2, line: ehDark(sh, 0.4) }); c.restore(); } }
function ehFlower(c, x, y, h, col) { seg(c, x, y, x + 2, y - h, 3, '#3f8a4a', 0); for (let i = 0; i < 5; i++) { const a = i * 1.2566; shape(c, ell(x + 2 + Math.cos(a) * h * 0.14, y - h + Math.sin(a) * h * 0.14, h * 0.11, h * 0.11, 10), col, { lw: 1.5, line: ehDark(col, 0.5) }); } shape(c, ell(x + 2, y - h, h * 0.08, h * 0.08, 10), '#ffe27a', { lw: 0 }); }
// scatter over a band; o: {stones, tufts, flowers, cols, stone [col, shade], grass [col, shade], skip [[x0, x1]...]}
function ehDress(c, x0, x1, y0, y1, seed, o = {}) {
  const R = K.rng(seed), clear = (x, y) => (o.skip || []).some((s) => x > s[0] && x < s[1] && (s[2] == null || (y > s[2] && y < s[3]))), items = [];
  for (let i = 0; i < (o.stones ?? 10); i++) items.push(['s', x0 + R() * (x1 - x0), y0 + R() * (y1 - y0), R()]);
  for (let i = 0; i < (o.tufts ?? 14); i++) items.push(['t', x0 + R() * (x1 - x0), y0 + R() * (y1 - y0), R()]);
  for (let i = 0; i < (o.flowers ?? 10); i++) items.push(['f', x0 + R() * (x1 - x0), y0 + R() * (y1 - y0), R()]);
  items.sort((a, b) => a[2] - b[2]);
  const cols = o.cols || ['#ff6a8a', '#ffd36a', '#fff6ea', '#9a7aff', '#ff8a3a'], [sc, ss] = o.stone || ['#c8bcc8', '#8a7e9a'], [gc, gs] = o.grass || ['#6ab85a', '#2f7a44'];
  for (const [k, x, y, q] of items) { if (clear(x, y)) continue; const d = 0.6 + 0.8 * (y - y0) / Math.max(1, y1 - y0);
    if (k === 's') ehStone(c, x, y, (10 + q * 22) * d, sc, ss); else if (k === 't') ehTuft(c, x, y, (26 + q * 30) * d, gc, gs); else ehFlower(c, x, y, (22 + q * 18) * d, cols[Math.floor(q * 97) % cols.length]); }
}

// ---------- lettering ----------
// English speech balloon pointing at the speaker; steps [[t, text], ...] grow on the spoken cues; o: {size, gone, pop}
function ehSay(ctx, S, steps, t, x, y, to, o = {}) {
  if (t < steps[0][0] || (o.gone && t > o.gone + 0.25)) return; let txt = steps[0][1], t0 = steps[0][0];
  for (const [ts, tx] of steps) if (t >= ts) { txt = tx; t0 = ts; }
  const pop = o.pop === false ? 1 : 1 + 0.12 * Math.max(0, 1 - (t - t0) / 0.2);
  ctx.save(); if (o.gone && t > o.gone) ctx.globalAlpha *= 1 - K.clamp((t - o.gone) / 0.25);
  ctx.translate(x, y); ctx.scale(pop, pop); ctx.translate(-x, -y);
  S.label(ctx, txt, x, y, K.clamp((t - steps[0][0]) / 0.3), { size: o.size || 50, balloon: true, to, color: o.col }); ctx.restore();
}
// a label with soft in/out inside [a, b)
function ehTag(ctx, S, text, x, y, t, a, b, o = {}) { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha *= K.clamp((b - t) / 0.25); S.label(ctx, text, x, y, K.clamp((t - a) / 0.35), { size: 44, ...o }); ctx.restore(); }
// tape tracking noise (torn bands), canvas pixels inside the story panel
function ehTracking(ctx, t, t0, dur = 0.5) {
  const u = (t - t0) / dur; if (u < 0 || u > 1) return; const [x, y, w, h] = EH_PANEL, cv = ctx.canvas, R = K.rng(1 + Math.floor(t * 30)), by = y + h * u;
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  for (let i = 0; i < 4; i++) { const yy = by + (R() - 0.5) * 90, bh = 6 + R() * 26, dx = (R() - 0.5) * 70; ctx.drawImage(cv, x, yy, w, bh, x + dx, yy, w, bh); ctx.fillStyle = 'rgba(255,255,255,0.22)'; ctx.fillRect(x, yy + bh * 0.5, w, 2); }
  ctx.restore();
}
// sound arcs (a call travelling away), n arcs from (x, y) toward angle a; p 0..1
function ehSoundArcs(ctx, x, y, a, p, col = '#fff6ea') {
  for (let i = 0; i < 3; i++) { const q = p * 1.4 - i * 0.2; if (q <= 0 || q >= 1) continue; const r = 40 + q * 260;
    ctx.save(); ctx.globalAlpha *= (1 - q) * (1 - i * 0.25); ctx.strokeStyle = col; ctx.lineWidth = 9 - i * 2.5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(x, y, r, a - 0.45, a + 0.45); ctx.stroke(); ctx.restore(); }
}
