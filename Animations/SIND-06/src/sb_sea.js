// ===== SIND-01 sea kit "openSea" (shared by the Sinbad episodes): skies, four water layers, seaY, floating, swells, splash,
// shore foam, the under-sea cross-section, fish, bubbles, the moon path =====
// Sea grammar (series bible): horizon at world y 600 in every wide; four FLAT water layers from far turquoise to near cobalt, each
// with a hard lighter crest strip and white foam dashes stepping on threes; one wave function seaY for everything that floats; the
// front layer is drawn over hulls and swimmers. Moods (amp): glass 3, calm 6, swell 22, storm 60 (+ single big swells).
// A shot describes its sea with a spec: { y: [far, mid, ship, front] base lines, amp, scroll (units/s the water drifts left,
// for a tracking shot), pal: 'day' | 'gold' | 'night' | 'dawn' | 'sunset', swells: [{x0, v, t0, h, w}], x0, x1 (drawn range) }

const SB_SEA_PAR = [0.2, 0.45, 1, 1.3];            // parallax of the four layers (also their drift speed share)
const SB_SEA_AMP = [0.25, 0.5, 1, 1.3];            // share of the mood amplitude
const SB_MOOD = { glass: 3, calm: 6, swell: 22, storm: 60 };
// water colours per palette: [base top, far, mid, ship, front, crest tint, foam]
const SB_WATER = {
  day: ['#bfeef0', '#7fd6d8', '#4fb6d6', '#2f88cf', '#1f5fc0', '#c8f6ff', '#ffffff'],
  morning: ['#d8f0ee', '#8ed8dc', '#5ab8d8', '#3a8ad0', '#2462c0', '#d8f8ff', '#ffffff'],
  gold: ['#ffe0b0', '#9ad0c8', '#5aaec8', '#2f84c0', '#2060b0', '#ffe6a0', '#fff6dc'],
  sunset: ['#ffd0b0', '#a8c8d8', '#6aa4d0', '#3a78c0', '#2458a8', '#ffd0a8', '#fff0e0'],
  night: ['#b8c8f0', '#6aa8c8', '#4a88bc', '#2f6aac', '#244e98', '#c8e0ff', '#eef6ff'],
  dawn: ['#ffd8c8', '#9cd0d8', '#62b0d4', '#3684c8', '#2460b4', '#ffe0d0', '#ffffff'],
};
// one wave function for everything that floats: the surface line of layer li at world x and time t
function seaY(x, t, li, sea) {
  const amp = (sea.amp ?? 6) * SB_SEA_AMP[li], d = (sea.scroll || 0) * SB_SEA_PAR[li] * t, X = x + d, L = sea.long || 1;
  let y = sea.y[li] + amp * (0.62 * Math.sin(X * 0.024 / L + t * 1.35 + li * 1.7) + 0.38 * Math.sin(X * 0.051 / L - t * 0.9 + li * 0.6));
  if (sea.swells && li >= 1) for (const s of sea.swells) { if (t < s.t0 - 0.5 || (s.t1 && t > s.t1 + 1)) continue; const sx = s.x0 + s.v * (t - s.t0), g = Math.exp(-Math.pow((x - sx) / s.w, 2)), ramp = K.clamp((t - s.t0 + 0.5) / 0.6) * (s.t1 ? K.clamp((s.t1 + 1 - t) / 1) : 1);
    y -= s.h * g * ramp * (li === 1 ? 0.45 : li === 3 ? 1.1 : 1); }
  return y;
}
// a floating thing's line and tilt on layer li (default the ship layer)
function sbFloat(x, t, sea, li = 2, half = 60) { const y0 = seaY(x - half, t, li, sea), y1 = seaY(x + half, t, li, sea); return { y: (y0 + y1) / 2, rot: Math.atan2(y1 - y0, 2 * half) }; }

// ---------- skies: painted plates (gradient, tall cumulus on the horizon, high cloud), baked once, 2400 x 640 ----------
const SB_SKIES = {
  morning: { g: [[0, '#5a9ae8'], [0.45, '#9ccaf4'], [0.8, '#ffe2c8'], [1, '#ffd2b0']], cu: ['#ffffff', '#fff2e6', '#d6bce8'] },
  day: { g: [[0, '#3f86e6'], [0.5, '#86c2f6'], [0.9, '#d2ecfa'], [1, '#e8f6fa']], cu: ['#ffffff', '#f2f0fa', '#c4b4e6'] },
  sunset: { g: [[0, '#4a5ab8'], [0.4, '#a87ac8'], [0.72, '#ff9a8a'], [1, '#ffc87a']], cu: ['#ffe6c0', '#f0b0a8', '#a87ab8'] },
  night: { g: [[0, '#4a4f9e'], [0.45, '#7a74c0'], [0.82, '#c49ac8'], [1, '#ffbf9a']], cu: ['#d8d0f0', '#a89ad0', '#7a6aaa'], stars: true },
  dawn: { g: [[0, '#6a7ad0'], [0.4, '#b4a0dc'], [0.75, '#ffc0a8'], [1, '#ffe0a8']], cu: ['#fff0e0', '#f4c8c0', '#b498c8'] },
  gold: { g: [[0, '#4f8ae0'], [0.42, '#9cc4ee'], [0.72, '#ffd8a0'], [1, '#ffbe78']], cu: ['#fff6e0', '#ffe0b8', '#d0a8c8'] },
};
function sbSkyPlate(name) {
  return sbBakeAt('sky:' + name, 2400, 640, (c, w) => { const P = SB_SKIES[name] || SB_SKIES.day, R = K.rng(name.length * 13 + 5);
    sbGrad(c, 0, 0, w, 640, P.g);
    if (P.stars) { for (let i = 0; i < 140; i++) { c.globalAlpha = 0.35 + R() * 0.6; c.fillStyle = '#fff6ea'; const s = R() < 0.1 ? 3 : 2; c.fillRect(R() * w, R() * 420, s, s); } c.globalAlpha = 1; }
    for (let i = 0; i < 7; i++) sbCloud(c, R() * w, 80 + R() * 200, 260 + R() * 260, 40 + R() * 30, K.rgba(P.cu[1], 0.6), K.rgba(P.cu[2], 0.35), 12);
    // the series signature: tall cumulus standing on the horizon
    let x = 60 + R() * 120; while (x < w) { const cw = 220 + R() * 260, ch = 160 + R() * 210; sbCumulus(c, x, 606, cw, ch, { lit: P.cu[0], body: P.cu[1], under: P.cu[2], seed: Math.floor(x) }); x += cw * (0.9 + R() * 0.9); }
    sbGrad(c, 0, 560, w, 80, [[0, K.rgba(P.g[P.g.length - 1][1], 0)], [1, K.rgba(P.g[P.g.length - 1][1], 0.7)]]);   // haze on the horizon
  });
}
// draw a sky (or a cross-fade list [[name, alpha], ...]) in world units across [x0, x1], at a slow parallax to the camera
function sbSky(ctx, sky, cam, o = {}) {
  const list = typeof sky === 'string' ? [[sky, 1]] : sky, par = o.par ?? 0.85, ox = (cam ? (cam.x - 500) * par : 0) - 700 + (o.dx || 0);
  for (const [n, a] of list) { if (a <= 0.003) continue; ctx.save(); ctx.globalAlpha *= a; ctx.drawImage(sbSkyPlate(n), ox, (o.hz ?? 600) - 600, 2400, 640); ctx.restore(); }
}

// ---------- the water ----------
// one layer li across [x0, x1]: flat fill to the bottom, a hard crest strip, foam dashes on threes. o.alpha for a see-through layer
function sbWaterCols(sea) { const A = SB_WATER[sea.pal || 'day']; if (!sea.pal2 || !(sea.mix > 0)) return A; const B = SB_WATER[sea.pal2]; return A.map((c, i) => sbMix(c, B[i], K.clamp(sea.mix))); }
function sbSeaLayer(ctx, li, t, sea, x0, x1, o = {}) {
  const W = sbWaterCols(sea), col = o.col || W[1 + li], step = o.step || 22, pts = [];
  for (let x = x0 - step; x <= x1 + step; x += step) pts.push([x, seaY(x, t, li, sea)]);
  ctx.save(); if (o.alpha != null) ctx.globalAlpha *= o.alpha;
  ctx.beginPath(); ctx.moveTo(pts[0][0], o.bottom ?? 2400); for (const p of pts) ctx.lineTo(p[0], p[1]); ctx.lineTo(pts[pts.length - 1][0], o.bottom ?? 2400); ctx.closePath(); ctx.fillStyle = col; ctx.fill();
  // crest strip: a lighter hard band under the top edge, then the coloured line
  ctx.lineJoin = 'round'; ctx.strokeStyle = sbMix(col, W[5], 0.45); ctx.lineWidth = 7 + li * 2; ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1] + 4 + li) : ctx.moveTo(p[0], p[1] + 4 + li))); ctx.stroke();
  ctx.strokeStyle = sbDark(col, 0.35); ctx.lineWidth = 2.5; ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.stroke();
  // foam dashes travel with the water and step on threes
  const tc = SB_T3(t), d = (sea.scroll || 0) * SB_SEA_PAR[li] * tc, R = K.rng(31 + li * 7), n = Math.round((x1 - x0) / (110 - li * 18)), span = x1 - x0 + 200, fa = (sea.foam ?? 1) * (0.55 + 0.15 * li);
  ctx.strokeStyle = W[6]; ctx.lineCap = 'round'; ctx.globalAlpha *= Math.min(1, fa);
  for (let i = 0; i < n; i++) { const fx = x0 - 100 + ((((R() * span - d + Math.sin(tc * 2 + i) * 6) % span) + span) % span), len = (10 + R() * 26) * (0.7 + li * 0.25), on = Math.floor(tc * 8 / 3 + i) % 4; if (on === 0) continue;
    const fy = seaY(fx, t, li, sea) + 8 + R() * (12 + li * 10); ctx.lineWidth = 2 + li; ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(fx + len, fy - 1); ctx.stroke(); }
  ctx.restore();
}
// the base water from the horizon down (painted), then layers [from..to] (default the two far ones)
function sbSeaBack(ctx, t, sea, x0, x1, o = {}) {
  const W = sbWaterCols(sea), hz = sea.hz ?? 600;
  sbGrad(ctx, x0, hz - 2, x1 - x0, 140, [[0, W[0]], [1, W[1]]]); ctx.fillStyle = W[1]; ctx.fillRect(x0, hz + 136, x1 - x0, 2400);
  for (let li = 0; li <= (o.to ?? 1); li++) sbSeaLayer(ctx, li, t, sea, x0, x1);
}
// o.mid(ctx): drawn between the ship layer (2) and the front layer (3): reflections, rings, flotsam that sit on the water
function sbSeaFront(ctx, t, sea, x0, x1, o = {}) { for (let li = o.from ?? 2; li <= 3; li++) { sbSeaLayer(ctx, li, t, sea, x0, x1, { alpha: o.alpha?.[li - 2] }); if (li === 2 && o.mid) o.mid(ctx); } }
// a horizontal light path on the water (sun or moon): broken dashes from the horizon down to y1, column centred at x, half width w
function sbLightPath(ctx, t, x, hz, y1, w, col = '#fff2c8', a = 0.8, joined = 0) {
  const R = K.rng(77), tc = SB_T3(t); ctx.save(); ctx.globalCompositeOperation = 'screen';
  for (let i = 0; i < 26; i++) { const v = i / 26, y = hz + 6 + (y1 - hz) * v * v * 0.9 + (y1 - hz) * v * 0.1, ww = w * (0.35 + v * 1.3) * (0.5 + R() * 0.8), dx = (R() - 0.5) * w * 0.6 * (1 - joined) + Math.sin(tc * 3 + i) * 6 * (1 - joined);
    ctx.globalAlpha = a * (0.45 + 0.55 * (1 - v)) * (joined > 0.5 || (Math.floor(tc * 4 + i) % 3) ? 1 : 0.4); ctx.fillStyle = col; ctx.fillRect(x - ww / 2 + dx, y, ww, 3 + v * 7 + joined * 4); }
  ctx.restore();
}

// ---------- water effects ----------
// splash crown at (x, y) d seconds after the hit (cel, on threes): spikes up and fall, drops fly, a ring of foam. s scale
function sbSplash(ctx, x, y, d, s = 1, col = '#e8fbff') {
  if (d < 0 || d > 1.2) return; const u = SB_T3(d + 1) - 1, k = K.clamp(u / 1.1), R = K.rng(9), up = Math.sin(Math.PI * Math.min(1, k * 1.4));
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (let i = 0; i < 9; i++) { const a = -Math.PI / 2 + (i - 4) * 0.27, h = (60 + R() * 70) * up, wd = 16 + R() * 10, bx = (i - 4) * 16;
    if (h < 4) continue; celShade(ctx, [[bx - wd, 0], [bx + Math.cos(a) * h * 0.6, -h], [bx + wd, 0]], col, '#8fd0f0', { light: [-1, -1], off: 5, lw: 2.5, line: '#2a6aa8' }); }
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (R() - 0.5) * 2.2, v = 160 + R() * 160, px = Math.cos(a) * v * u, py = Math.sin(a) * v * u + 320 * u * u, r = 5 + R() * 6;
    if (py > 10) continue; ctx.globalAlpha = 1 - k * 0.6; sbBlob(ctx, px, py, r, r * 1.2, col, '#8fd0f0', { lw: 2, off: 2, line: '#2a6aa8' }); ctx.globalAlpha = 1; }
  ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 5; ctx.globalAlpha = 1 - k; ctx.beginPath(); ctx.ellipse(0, 4, 40 + 160 * k, 8 + 20 * k, 0, 0, 7); ctx.stroke();
  ctx.restore();
}
// a ring on the water (u 0..1; o.rev contracts instead of spreading)
function sbRing(ctx, x, y, u, r = 120, o = {}) { if (u <= 0 || u >= 1) return; const v = o.rev ? 1 - u : u; ctx.save(); ctx.globalAlpha = (o.a ?? 0.9) * (o.rev ? u : 1 - u); ctx.strokeStyle = o.col || '#ffffff'; ctx.lineWidth = o.lw || 4; ctx.beginPath(); ctx.ellipse(x, y, 12 + r * v, (12 + r * v) * 0.22, 0, 0, 7); ctx.stroke(); ctx.restore(); }
// shore foam: a scalloped white band along a line from (xa, ya) to (xb, yb), stepping on threes
function sbFoamLine(ctx, pts, t, o = {}) {
  const tc = SB_T3(t), w = o.w || 16; ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.strokeStyle = o.col || '#ffffff'; ctx.lineWidth = w; ctx.globalAlpha = o.a ?? 0.95; ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1] + Math.sin(tc * 5 + i) * 2) : ctx.moveTo(p[0], p[1]))); ctx.stroke();
  for (let i = 0; i < pts.length; i += 2) { const [px, py] = pts[i], r = w * (0.6 + 0.4 * Math.abs(Math.sin(tc * 3 + i * 1.7))); ctx.beginPath(); ctx.arc(px, py - w * 0.2, r, 0, 7); ctx.fillStyle = '#ffffff'; ctx.fill(); }
  ctx.restore();
}
function sbBubble(ctx, x, y, r, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#e8fbff'; ctx.lineWidth = Math.max(1.5, r * 0.18); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.stroke(); ctx.fillStyle = 'rgba(232,251,255,0.25)'; ctx.fill(); ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(x - r * 0.35, y - r * 0.35, r * 0.22, 0, 7); ctx.fill(); ctx.restore(); }
// a stream of bubbles rising from (x, y) since t0 (seeded)
function sbBubbles(ctx, x, y, t, t0, n = 6, h = 200, seed = 3, r = 9) { const R = K.rng(seed); for (let i = 0; i < n; i++) { const st = t0 + R() * 1.2, u = (t - st) / 1.6; if (u < 0 || u > 1) continue; sbBubble(ctx, x + Math.sin(u * 9 + i) * 10 + (R() - 0.5) * 30, y - u * h, r * (0.6 + R() * 0.8), 1 - u * 0.5); } }
// a small silver fish (side view), facing dir; flick 0..1 tail
function sbFish(ctx, x, y, s = 1, dir = 1, o = {}) {
  const col = o.col || '#cfe0f0', sh = o.shade || '#7a94b8'; ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(dir * s, s);
  const fl = (o.flick || 0) * 8; celShade(ctx, [[-40, 0], [-58, -16 + fl], [-56, 16 + fl]], sh, sbDark(sh, 0.3), { light: [0, -1], off: 4, lw: 2.5 });
  celShade(ctx, ell(0, 0, 42, 15, 18), col, sh, { light: [0, -1], off: 6, hi: '#ffffff', lw: 2.5, line: '#2a4a7a' });
  ctx.fillStyle = '#1a1a2a'; ctx.beginPath(); ctx.arc(26, -3, 3.5, 0, 7); ctx.fill(); ctx.restore();
}
// a jumping fish on an arc from (x0, y) to (x1, y), u 0..1, h height (drops trail)
function sbFishJump(ctx, x0, x1, y, u, h = 110, s = 0.7) { if (u <= 0 || u >= 1) return; const x = K.lerp(x0, x1, u), yy = y - h * 4 * u * (1 - u), dir = x1 > x0 ? 1 : -1, rot = Math.atan2(-h * 4 * (1 - 2 * u), Math.abs(x1 - x0)) * -1 * dir;
  sbFish(ctx, x, yy, s, dir, { rot, flick: Math.sin(u * 20) }); for (let i = 1; i <= 3; i++) { const v = u - i * 0.06; if (v <= 0) continue; ctx.save(); ctx.globalAlpha = 0.7 - i * 0.18; sbBlob(ctx, K.lerp(x0, x1, v), y - h * 4 * v * (1 - v) + 6, 5, 7, '#e8fbff', '#8fd0f0', { lw: 1.5, off: 2 }); ctx.restore(); } }

// ---------- under the sea: the cross-section plate (teal to deep blue, light shafts, sea grass), w x h from the waterline down ----------
function sbUnderPlate(w = 2400, h = 1800) {
  return sbBakeAt('under:' + w + 'x' + h, w, h, (c) => { const R = K.rng(17);
    sbGrad(c, 0, 0, w, h, [[0, '#3fb4c4'], [0.25, '#2a86b4'], [0.6, '#1e5a9a'], [1, '#18346e']]);
    c.save(); c.globalCompositeOperation = 'screen'; c.filter = 'blur(10px)';
    for (let i = 0; i < 9; i++) { const x = R() * w, ww = 50 + R() * 90; c.fillStyle = 'rgba(190,250,255,0.16)'; c.beginPath(); c.moveTo(x, 0); c.lineTo(x + ww, 0); c.lineTo(x + ww + 260, h * 0.8); c.lineTo(x + 180, h * 0.8); c.closePath(); c.fill(); }
    c.restore();
    for (let i = 0; i < 46; i++) { const x = R() * w, hh = 60 + R() * 140, col = R() < 0.5 ? '#2f8a6a' : '#3fa07a'; c.save(); c.globalAlpha = 0.8; celShade(c, [[x - 10, h], [x - 16 + Math.sin(i) * 20, h - hh * 0.5], [x + Math.sin(i * 1.7) * 30, h - hh], [x + 10, h - hh * 0.5], [x + 12, h]], col, sbDark(col, 0.3), { light: [-1, -1], off: 4, lw: 2 }); c.restore(); }
    for (let i = 0; i < 18; i++) sbStone(c, R() * w, h - R() * 10, 14 + R() * 30, '#5a7aa0', '#3a4e78');
  });
}
// a school of n small fish around (cx, cy), turning together with per-fish phase; scatter 0..1 flings them out radially
function sbSchool(ctx, cx, cy, t, n = 14, o = {}) {
  const R = K.rng(o.seed || 44), tc = SB_T2(t), dir = o.dir || -1, sc = K.clamp(o.scatter || 0);
  for (let i = 0; i < n; i++) { const ax = (R() - 0.5) * 220, ay = (R() - 0.5) * 110, ph = R() * 6, a = Math.atan2(ay, ax || 1);
    const x = cx + ax + Math.sin(tc * 1.3 + ph) * 14 + Math.cos(a) * 360 * sc * sc, y = cy + ay + Math.sin(tc * 2.1 + ph) * 8 + Math.sin(a) * 260 * sc * sc;
    sbFish(ctx, x, y, (o.s || 0.42) * (0.8 + R() * 0.4), sc > 0.2 ? (Math.cos(a) >= 0 ? 1 : -1) : dir, { flick: Math.sin(tc * 14 + ph) }); }
}

// ===================== sea framing kit (SIND-01 revision 1, series rule) =====================
// Rule for every open-sea shot: the subject's waterline at 62-68% of the panel height, a reflection under every floating thing,
// the foreground crest band (sbSeaFore) across the bottom of the panel, and one living thing per shot (fish, dolphins, gulls,
// flotsam). No sea frame should keep more than ~15% of the panel as unbroken flat blue.

// the foreground crest band: the nearest water, across the bottom h (fraction of the panel, default 0.14), sliding faster than the
// rest (parallax o.par, default 1.8) with a lighter lip, a dark line, foam caps and dashes on threes. Draw it LAST over the sea, in
// world units with the shot camera cam ({x, y, zoom}). o: {h, par, amp (panel units), col, lip, alpha, drift (units/s)}
function sbSeaFore(ctx, t, sea, cam, o = {}) {
  const W = sbWaterCols(sea), z = cam.zoom || 1, tc = SB_T3(t), H = (o.h ?? 0.15) * 1230, base = 1230 - H;   // panel units
  const amp = o.amp ?? Math.min(34, 12 + (sea.amp ?? 6) * 0.6), par = o.par ?? 1.8, drift = ((sea.scroll || 0) * par + (o.drift ?? 34)) * tc;
  const col = o.col || sbMix(W[4], '#162e78', 0.28), lip = o.lip || sbMix(col, W[5], 0.5), pts = [];
  const U = (px) => px + cam.x * z * par + drift;                       // pattern coordinate (panel units): faster than the world
  const Y = (px) => { const u = U(px); return base + amp * (0.6 * Math.sin(u * 0.0105 + tc * 1.5) + 0.4 * Math.sin(u * 0.023 - tc * 1.1)); };
  for (let px = -40; px <= 1040; px += 20) pts.push([px, Y(px)]);
  ctx.save(); ctx.setTransform(ctx.getTransform().multiply(new DOMMatrix([1 / z, 0, 0, 1 / z, cam.x - 500 / z, cam.y - 615 / z]))); // panel units
  if (o.alpha != null) ctx.globalAlpha *= o.alpha;
  ctx.beginPath(); ctx.moveTo(-40, 1300); for (const p of pts) ctx.lineTo(p[0], p[1]); ctx.lineTo(1040, 1300); ctx.closePath(); ctx.fillStyle = col; ctx.fill();
  ctx.lineJoin = 'round'; ctx.strokeStyle = lip; ctx.lineWidth = 14; ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1] + 9) : ctx.moveTo(p[0], p[1] + 9))); ctx.stroke();
  ctx.strokeStyle = sbDark(col, 0.4); ctx.lineWidth = 3; ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.stroke();
  // foam caps on the crests (where the line turns over), and dashes in the body, all travelling with the pattern
  ctx.fillStyle = W[6]; ctx.strokeStyle = W[6]; ctx.lineCap = 'round';
  for (let px = -40; px <= 1040; px += 10) { const y0 = Y(px - 10), y1 = Y(px), y2 = Y(px + 10); if (y1 < y0 && y1 <= y2 && y1 < base - amp * 0.35) { ctx.globalAlpha = 0.95; for (let k = -2; k <= 2; k++) { ctx.beginPath(); ctx.arc(px + k * 13, Y(px + k * 13) + 2 - (2 - Math.abs(k)) * 2, 7 - Math.abs(k), 0, 7); ctx.fill(); } } }
  const R = K.rng(97), span = 1200;
  for (let i = 0; i < 14; i++) { const fx = ((((R() * span - drift * 1.0) % span) + span) % span) - 100, fy = Y(fx) + 26 + R() * (H - 40), len = 24 + R() * 50, on = Math.floor(tc * 8 / 3 + i) % 4;
    if (on === 0) continue; ctx.globalAlpha = 0.5 + 0.3 * R(); ctx.lineWidth = 4 + R() * 3; ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(fx + len, fy - 2); ctx.stroke(); }
  ctx.restore();
}
// mid-water streaks: long flat lighter and darker cels in the near water (between y0 and y1, world units), stepping on threes;
// o.li the layer whose colour they are cut from (default 3, the front)
function sbSeaStreaks(ctx, t, sea, x0, x1, y0, y1, o = {}) {
  const W = sbWaterCols(sea), tc = SB_T3(t), R = K.rng(o.seed || 61), n = o.n || 9, d = (sea.scroll || 0) * 1.2 * tc + (o.drift ?? 14) * tc, span = x1 - x0 + 400;
  ctx.save(); ctx.lineCap = 'round';
  for (let i = 0; i < n; i++) { const yy = y0 + (y1 - y0) * (i + R() * 0.6) / n, x = x0 - 200 + ((((R() * span - d * (0.6 + (yy - y0) / (y1 - y0 + 1))) % span) + span) % span), len = 90 + R() * 220, lit = i % 3 !== 1;
    ctx.globalAlpha = (o.a ?? 0.8) * (0.6 + 0.4 * R()); const bc = W[1 + (o.li ?? 3)]; ctx.strokeStyle = lit ? sbMix(bc, W[5], 0.42) : sbDark(bc, 0.22); ctx.lineWidth = 5 + 5 * (yy - y0) / (y1 - y0 + 1);
    ctx.beginPath(); ctx.moveTo(x, yy + Math.sin(tc * 2 + i) * 2); ctx.lineTo(x + len, yy + Math.sin(tc * 2 + i + 1) * 2); ctx.stroke(); }
  ctx.restore();
}
// a broken reflection under a floating thing: rows of dashes in its colours (hull, band, sail stripes...), wobbling on threes.
// (x, y) the waterline centre, w the width, cols top to bottom, o {rows, gap, a, sway}
function sbReflect(ctx, x, y, w, cols, t, o = {}) {
  const tc = SB_T3(t), rows = o.rows || 6, gap = o.gap || 9, R = K.rng(o.seed || 23);
  ctx.save();
  for (let i = 0; i < rows; i++) { const v = i / rows, ww = w * (1 - v * 0.45), yy = y + 5 + i * gap, col = cols[Math.min(cols.length - 1, Math.floor(v * cols.length))], sw = Math.sin(tc * 3.1 + i * 1.7) * (o.sway ?? 10) * (0.4 + v);
    ctx.globalAlpha = (o.a ?? 0.6) * (1 - v * 0.75); ctx.fillStyle = col;
    let xx = x - ww / 2 + sw; const end = x + ww / 2 + sw; while (xx < end) { const seg = Math.min(end - xx, ww * (0.18 + R() * 0.3)); ctx.fillRect(xx, yy, seg, gap * 0.55); xx += seg + ww * (0.04 + R() * 0.08); } }
  ctx.restore();
}
// a dolphin (side view) facing dir, s scale (1 = 200 long), rot; o {flick}
function sbDolphin(ctx, x, y, s = 1, dir = 1, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(dir * s, s); const fl = (o.flick || 0) * 10, line = '#1e2a58';
  celShade(ctx, [[-88, -2], [-112, -26 + fl], [-104, -2 + fl * 0.5], [-114, 22 + fl], [-86, 6]], '#5a7ab8', '#3a5490', { light: [0, -1], off: 5, lw: 2.5, line });
  celShade(ctx, [[-10, -34], [6, -62], [22, -34]], '#5a7ab8', '#3a5490', { light: [-1, -1], off: 4, lw: 2.5, line });
  const B = [[-90, 0], [-60, -22], [-10, -36], [40, -32], [74, -18], [98, -10], [112, -6], [98, 2], [70, 8], [30, 18], [-30, 16], [-70, 8]];
  celShade(ctx, B, '#7a9ad0', '#4f6aa8', { light: [-0.4, -1], off: 10, hi: '#b8d0f0', lw: 3, line });
  ctx.save(); K.poly(ctx, B, true); ctx.clip(); ctx.fillStyle = '#d8e4f4'; ctx.beginPath(); ctx.ellipse(20, 20, 80, 14, 0, 0, 7); ctx.fill(); ctx.restore();
  celShade(ctx, [[20, 6], [6, 30], [36, 12]], '#5a7ab8', '#3a5490', { light: [0, -1], off: 3, lw: 2, line });
  ctx.fillStyle = '#141a30'; ctx.beginPath(); ctx.arc(76, -12, 4, 0, 7); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(75, -13, 1.4, 0, 7); ctx.fill();
  ctx.strokeStyle = line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(92, -2); ctx.quadraticCurveTo(86, 2, 76, 0); ctx.stroke(); ctx.restore();
}
// a dolphin leap from x0 to x1 on the water line y (u 0..1 of the arc, h height); entry and exit splashes and rings
function sbDolphinLeap(ctx, x0, x1, y, u, h = 120, s = 0.6) {
  if (u <= -0.1 || u >= 1.4) return; const dir = x1 > x0 ? 1 : -1;
  if (u > 0 && u < 1) { const x = K.lerp(x0, x1, u), yy = y - h * 4 * u * (1 - u), rot = Math.atan2(-h * 4 * (1 - 2 * u), Math.abs(x1 - x0)) * dir; sbDolphin(ctx, x, yy + 10 * s, s, dir, { rot, flick: Math.sin(u * 14) }); }
  sbRing(ctx, x0, y + 3, (u + 0.1) / 0.6, 90 * s, { lw: 3 }); sbRing(ctx, x1, y + 3, (u - 0.95) / 0.45, 110 * s, { lw: 3 });
  if (u > 0.92 && u < 1.25) sbSplash(ctx, x1, y, (u - 0.92) * 1.6, 0.35 * s / 0.6);
}
// a flying fish: the silver fish with two spread pectoral wings (glide), on an arc like sbFishJump
function sbFlyingFish(ctx, x0, x1, y, u, h = 70, s = 0.5) {
  if (u <= 0 || u >= 1) return; const x = K.lerp(x0, x1, u), yy = y - h * Math.sin(Math.PI * u), dir = x1 > x0 ? 1 : -1, tc = SB_T3(u * 3);
  ctx.save(); ctx.translate(x, yy); ctx.scale(dir * s, s); const fl = Math.sin(tc * 30) * 6;
  for (const k of [1, -1]) celShade(ctx, [[-6, -4], [-46, -38 - fl * k], [-30, -6]], k > 0 ? '#e8f4ff' : '#b8cce8', '#7a94b8', { light: [0, -1], off: 4, lw: 2, line: '#2a4a7a' });
  ctx.restore(); sbFish(ctx, x, yy, s, dir, { rot: -Math.cos(Math.PI * u) * 0.35 * dir, flick: Math.sin(u * 30) });
  sbRing(ctx, x0, y + 3, u / 0.4, 50 * s, { lw: 2 }); if (u > 0.8) sbRing(ctx, x1, y + 3, (u - 0.8) / 0.2, 30 * s, { lw: 2 });
}
// a school seen from above the surface: dark fish shadows gliding under the water (cx, cy), drifting at v units/s
function sbSchoolShadow(ctx, cx, cy, t, n = 12, o = {}) {
  const R = K.rng(o.seed || 71), tc = SB_T2(t), dir = o.dir || 1; ctx.save(); ctx.globalAlpha = o.a ?? 0.32; ctx.fillStyle = o.col || '#0f2a6a';
  for (let i = 0; i < n; i++) { const ax = (R() - 0.5) * 260, ay = (R() - 0.5) * 50, ph = R() * 6, x = cx + ax + Math.sin(tc * 1.2 + ph) * 12, y = cy + ay + Math.sin(tc * 1.9 + ph) * 4;
    ctx.beginPath(); ctx.ellipse(x, y, 22, 6, 0, 0, 7); ctx.fill(); ctx.beginPath(); ctx.moveTo(x - dir * 20, y); ctx.lineTo(x - dir * 34, y - 7); ctx.lineTo(x - dir * 34, y + 7); ctx.closePath(); ctx.fill(); }
  ctx.restore();
}
// flotsam bobbing on the water at (x, y): 'wood' (driftwood with a stub), 'pot' (the camp pot on its side), 'turban' (the plum turban
// unwinding). rot radians, s scale
function sbFlotsam(ctx, kind, x, y, t, o = {}) {
  const s = o.s || 1, tc = SB_T3(t); ctx.save(); ctx.translate(x, y); ctx.rotate((o.rot || 0) + 0.06 * Math.sin(tc * 2.3 + (o.seed || 0))); ctx.scale(s, s);
  if (kind === 'wood') { celShade(ctx, [[-70, -6], [66, -10], [74, 2], [66, 12], [-68, 12], [-76, 2]], '#b0845a', '#7a5432', { light: [-0.3, -1], off: 6, lw: 3, line: '#4a2a14' }); celShade(ctx, [[20, -8], [36, -30], [44, -26], [32, -6]], '#b0845a', '#7a5432', { light: [-1, -1], off: 3, lw: 2.5, line: '#4a2a14' }); }
  else if (kind === 'pot') { ctx.rotate(1.2); celShade(ctx, [[-30, -20], [30, -20], [34, 2], [24, 26], [-24, 26], [-34, 2]], '#5a5a72', '#363648', { light: [-1, -1], off: 8, hi: '#8a8aa8', lw: 3, line: '#1a1a2a' }); shape(ctx, ell(0, -20, 32, 7, 16), '#2a2a3a', { lw: 2.5 }); }
  else if (kind === 'turban') { sbRibbon(ctx, 28, 2, 0.1, 90, 16, t, { col: '#9a5ab8', shade: '#6a3a88', amp: 5, freq: 5 }); celShade(ctx, ell(0, -6, 34, 20, 18), '#9a5ab8', '#6a3a88', { light: [-1, -1], off: 8, hi: '#c89ae0', lw: 3, line: '#3a1a4a' }); seg(ctx, -28, -6, 26, -14, 4, '#6a3a88', 0); }
  ctx.restore();
  sbRing(ctx, x, y + 6, ((t * 0.7 + (o.seed || 0) * 0.37) % 1), 40 * s, { lw: 2, a: 0.6 });
}
// a proper travelling swell for close-ups and set pieces: a hump of water with the crest strip, dark line, foam lip and spray, drawn
// as a cel (never a flat block). (x crest centre, y base line, w half width, h height); col from the sea palette (o.li layer, default 3);
// with o.li set the hump sits on that layer's own surface line (o.dy below it) so it merges into the water at both ends
function sbSwell(ctx, x, y, w, h, t, sea, o = {}) {
  if (h < 2) return; const W = sbWaterCols(sea), col = o.col || W[1 + (o.li ?? 3)], tc = SB_T3(t), pts = [];
  for (let i = -16; i <= 16; i++) { const u = i / 16, g = Math.exp(-u * u * 3.2), lean = (o.lean ?? 0.25) * w * g * (1 - Math.abs(u)), px = x + u * w * 1.2 - lean, by = o.li != null && o.onLayer !== false ? seaY(px, t, o.li, sea) + (o.dy || 0) : y; pts.push([px, by - h * g + (g > 0.2 ? Math.sin(tc * 5 + i) * 2 : 0)]); }
  ctx.save(); if (o.alpha != null) ctx.globalAlpha *= o.alpha;
  ctx.beginPath(); ctx.moveTo(pts[0][0], y + (o.bottom ?? 2400)); for (const p of pts) ctx.lineTo(p[0], p[1]); ctx.lineTo(pts[pts.length - 1][0], y + (o.bottom ?? 2400)); ctx.closePath(); ctx.fillStyle = col; ctx.fill();
  ctx.lineJoin = 'round'; ctx.strokeStyle = sbMix(col, W[5], 0.45); ctx.lineWidth = 12; ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1] + 8) : ctx.moveTo(p[0], p[1] + 8))); ctx.stroke();
  ctx.strokeStyle = sbDark(col, 0.35); ctx.lineWidth = 3; ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.stroke();
  // foam lip on the crest, spray flecks above it
  ctx.fillStyle = W[6]; for (let i = 12; i <= 20; i++) { const p = pts[i], r = 9 + 6 * Math.exp(-Math.pow((i - 15) / 3, 2)); ctx.beginPath(); ctx.arc(p[0], p[1] + 2, r * (h / 160 + 0.4), 0, 7); ctx.fill(); }
  const R = K.rng(5 + Math.floor(tc * 8)); for (let i = 0; i < 7; i++) { const p = pts[12 + Math.floor(R() * 8)]; ctx.globalAlpha = 0.85; ctx.beginPath(); ctx.arc(p[0] + (R() - 0.5) * 40, p[1] - 10 - R() * 30, 3 + R() * 4, 0, 7); ctx.fill(); }
  ctx.restore();
}
// the near water in one call (after sbSeaFront): streaks in the front layer down to the crest band, then the crest band.
// o: {streaks: false, n, fore: {...sbSeaFore options}}
function sbSeaNear(ctx, t, sea, cam, o = {}) {
  const z = cam.zoom || 1, top = cam.y + (1230 * (1 - (o.fore?.h ?? 0.15)) - 615) / z, y0 = Math.max(sea.y[3] + 30, cam.y - 615 / z), x0 = cam.x - 560 / z, x1 = cam.x + 560 / z;
  if (o.streaks !== false && top - y0 > 40) sbSeaStreaks(ctx, t, sea, x0, x1, y0, top - 16, { n: o.n || Math.max(3, Math.round((top - y0) * z / 40)), a: o.a });
  sbSeaFore(ctx, t, sea, cam, o.fore || {});
}
