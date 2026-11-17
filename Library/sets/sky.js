// ===== skies. Sizes are world units (the stories use a 1000 x 1230 world, ground at y 900). =====
// sky(ctx, {preset: 'day'|'dawn'|'dusk'|'night', w, h, base, dot, hills}): flat dotted sky with three rounded hills (Lion and the Hare / Lark / Fox).
const SKY = { day: { base: C.blue, dot: '#3f7be6', hills: [[150, 880, 260, '#2a62c9'], [560, 900, 300, '#2457b8'], [940, 880, 250, '#2a62c9']] },
  dawn: { base: C.yellow, dot: '#ff9a2a', hills: [[150, 880, 260, '#f08a1a'], [560, 900, 300, '#e2701a'], [940, 880, 250, '#f08a1a']] },
  dusk: { base: '#e2701a', dot: C.red, hills: [[150, 880, 260, '#a8261a'], [560, 900, 300, '#7a1a12'], [940, 880, 250, '#a8261a']] },
  night: { base: NAVY2, dot: '#1b3a8f', hills: [[150, 880, 260, NAVY], [560, 900, 300, '#0a1a4a'], [940, 880, 250, NAVY]] } };
function sky(ctx, o = {}) {
  const p = { ...SKY[o.preset || 'day'], ...o }, WW = o.w || 1000, base = p.base, dot = p.dot, hills = p.hills;
  ctx.drawImage(bake('sky:' + JSON.stringify([WW, base, dot, hills]), WW, 920, (x) => { x.fillStyle = base; x.fillRect(0, 0, WW, 920); x.fillStyle = dotPat(x, dot, 13, 0.3); x.fillRect(0, 0, WW, 920); for (const [bx, by, br, col] of hills) { x.beginPath(); x.ellipse(bx, by, br, br * 0.5, 0, Math.PI, 0); x.fillStyle = col; x.fill(); x.lineWidth = 6; x.strokeStyle = C.black; x.stroke(); } }), 0, 0, WW, 920);
}
// a row of small round trees on the hills (The Lark and the Elephant). o: {y: ground line 900, seed 4, n 12}
function hillTrees(ctx, o = {}) {
  const GR = o.y ?? 900, x = ctx; const r = K.rng(o.seed ?? 4); for (let i = 0; i < (o.n ?? 12); i++) { const cx = 40 + i * 84 + r() * 30, h = 70 + r() * 60, cr = 38 + r() * 14; x.beginPath(); x.arc(cx, GR - h, cr, 0, 7); x.fillStyle = GREEND; x.fill(); x.lineWidth = 6; x.strokeStyle = C.black; x.stroke(); x.fillStyle = WOOD; x.fillRect(cx - 6, GR - h + cr - 4, 12, h - cr + 6); }
}
// sun(ctx, x, y, t): rays turn slowly with t (pass 0 for still)
function sun(ctx, x, y, t = 0) { for (let i = 0; i < 14; i++) { const a = i * Math.PI / 7 + t * 0.25; seg(ctx, x + Math.cos(a) * 88, y + Math.sin(a) * 88, x + Math.cos(a) * 118, y + Math.sin(a) * 118, 9, C.yellow, 4); } shape(ctx, ell(x, y, 70, 70, 40), C.yellow, { lw: 8, seed: 40, dot: C.red, pitch: 9, rad: 0.2, da: 0.55 }); }
function cloudFlat(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const cs = [[-60, 6, 38], [-18, -16, 46], [30, -8, 40], [66, 8, 30]]; ctx.lineWidth = 8; ctx.strokeStyle = C.black; for (const [cx, cy, r] of cs) { ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke(); } ctx.fillStyle = C.white; for (const [cx, cy, r] of cs) { ctx.beginPath(); ctx.arc(cx, cy, r - 3, 0, 7); ctx.fill(); } ctx.fillRect(-60, 6, 126, 32); ctx.restore(); }
// moon(ctx, x, y, r): yellow disc with red dot shading and craters (The Thief and the Moonbeam)
function moon(ctx, x0, y0, r = 105) {
  const x = ctx, MOON = [x0, y0, r];
  const mp = ell(MOON[0], MOON[1], MOON[2], MOON[2], 64); x.fillStyle = C.yellow; K.poly(x, mp, true); x.fill();
  ink(x, mp, 9, 77); for (const [cx, cy, cr] of [[-35, -30, 17], [28, 18, 13], [-8, 46, 10], [40, -42, 9]]) ink(x, ell(MOON[0] + cx, MOON[1] + cy, cr, cr * 0.85, 18), 4.5, 78);
}
// stars(ctx, {w, h, n, seed, avoid: [x, y, radius]})
function stars(ctx, o = {}) { const r = K.rng(o.seed ?? 5), w = o.w || 1000, h = o.h || 440; ctx.fillStyle = C.white; for (let i = 0; i < (o.n ?? 46); i++) { const sx = r() * w, sy = r() * h, sz = 2 + r() * 3.2; if (!o.avoid || Math.hypot(sx - o.avoid[0], sy - o.avoid[1]) > o.avoid[2]) { ctx.beginPath(); ctx.arc(sx, sy, sz, 0, Math.PI * 2); ctx.fill(); } } }
// night sky, moon halo, stars, twinkles and a skyline of city houses (The Thief and the Moonbeam). Anchor = moon centre; o.moon = [x, y, r]
function nightCity(ctx, o = {}) {
  const x = ctx, s = o.s ?? 1; const WW = 1000, ROOFY = 560, MOON = o.moon || [730, 175, 105];
  ctx.save(); ctx.translate(o.x ?? 730, o.y ?? 175); ctx.scale(s, s); ctx.translate(-730, -175);
      x.fillStyle = C.blue; x.fillRect(0, 0, WW, 700);
      const r = K.rng(5); x.fillStyle = C.yellow;
      for (let gy = 0, row = 0; gy < 700; gy += 12, row++) for (let gx = (row % 2) * 6; gx < WW; gx += 12) { const d = Math.hypot(gx - MOON[0], gy - MOON[1]), R = 360; if (d < R && d > MOON[2] - 6) { const rr = 5.2 * Math.pow(1 - d / R, 1.1); if (rr > 0.5) { x.beginPath(); x.arc(gx, gy, rr, 0, Math.PI * 2); x.fill(); } } }
      x.fillStyle = C.white; for (let i = 0; i < 46; i++) { const sx = r() * WW, sy = r() * 440, sz = 2 + r() * 3.2; if (Math.hypot(sx - MOON[0], sy - MOON[1]) > 150) { x.beginPath(); x.arc(sx, sy, sz, 0, Math.PI * 2); x.fill(); } }
      for (let i = 0; i < 6; i++) { const sx = 40 + r() * 560, sy = 40 + r() * 330; x.save(); x.translate(sx, sy); x.fillStyle = C.white; x.beginPath(); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4, rr = k % 2 ? 3 : 11; x.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } x.closePath(); x.fill(); x.restore(); }
      // skyline of city houses
      const rr = K.rng(9); let px = -30;
      while (px < WW + 30) { const w = 74 + rr() * 56, h = 60 + rr() * 80, y0 = 700 - (700 - ROOFY) - h + 40; const body = [[px, 700], [px, y0], [px + w, y0], [px + w, 700]];
        shape(x, body, NAVY, { lw: 5, seed: 40 + Math.floor(px) % 7 }); const g = rr() > 0.4 ? [[px - 6, y0], [px + w / 2, y0 - 38], [px + w + 6, y0]] : null; if (g) shape(x, g, NAVY2, { lw: 5, seed: 50 });
        x.fillStyle = C.yellow; for (let wy = y0 + 16; wy < 600; wy += 30) for (let wx = px + 12; wx < px + w - 14; wx += 26) if (rr() > 0.55) x.fillRect(wx, wy, 11, 15);
        px += w + 8 + rr() * 10; }
      // the moon: yellow disc, red dot shading, craters
      const mp = ell(MOON[0], MOON[1], MOON[2], MOON[2], 64); x.fillStyle = C.yellow; K.poly(x, mp, true); x.fill();
      x.save(); K.poly(x, mp, true); x.clip(); x.fillStyle = dotPat(x, C.red, 9, 0.3); x.beginPath(); x.ellipse(MOON[0] + 42, MOON[1] + 40, 130, 118, 0, 0, Math.PI * 2); x.ellipse(MOON[0] + 8, MOON[1] + 6, 100, 90, 0, 0, Math.PI * 2, true); x.fill('evenodd'); x.restore();
      ink(x, mp, 9, 77); for (const [cx, cy, cr] of [[-35, -30, 17], [28, 18, 13], [-8, 46, 10], [40, -42, 9]]) ink(x, ell(MOON[0] + cx, MOON[1] + cy, cr, cr * 0.85, 18), 4.5, 78);
    
  ctx.restore();
}

// ===== day cycle (added 2026-11-16): sky colours, sun and moon for a time of day u (0 dawn, 0.25 day, 0.5 dusk, 0.75 night, 1 dawn again) =====
// mixHex(a, b, f): blend two '#rrggbb' colours
function mixHex(a, b, f) { const h = (s) => [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16)), A = h(a), B = h(b); return '#' + A.map((v, i) => Math.round(K.lerp(v, B[i], K.clamp(f))).toString(16).padStart(2, '0')).join(''); }
// dayCycle(u): {a, b, f: blend from SKY preset a to b, sun: [x, y] | null, moon: [x, y] | null, stars: 0..1, night: 0..1, warm: 0..1, hills}
//   sun and moon travel an arc over a 1000-wide world from the left horizon (y ~860) to the right; use them with sun() / moon().
//   night (darken the land and cast: multiply NAVY2 at ~0.35 * night) and warm (dawn/dusk orange tint) are for the scene to use.
function dayCycle(u) {
  u = ((u % 1) + 1) % 1; const names = ['dawn', 'day', 'dusk', 'night'], q = u * 4, i = Math.floor(q) % 4, fr = K.clamp((q - Math.floor(q) - 0.55) / 0.45), f = fr * fr * (3 - 2 * fr);   // each preset holds, then cross-fades in the last 45% of its quarter
  const arc = (v) => (v < 0 || v > 1) ? null : [500 - Math.cos(Math.PI * v) * 440, 860 - Math.sin(Math.PI * v) * 720];
  const dn = (c) => Math.min(Math.abs(u - c), 1 - Math.abs(u - c)), A = SKY[names[i]], B = SKY[names[(i + 1) % 4]];
  return { a: names[i], b: names[(i + 1) % 4], f, sun: arc((u + 0.04) / 0.58), moon: arc((((u - 0.46) % 1) + 1) % 1 / 0.58), stars: K.clamp(1 - dn(0.75) / 0.2), night: K.clamp(1 - dn(0.75) / 0.25), warm: Math.max(K.clamp(1 - dn(0) / 0.12), K.clamp(1 - dn(0.5) / 0.12)),
    hills: A.hills.map((hl, k) => [hl[0], hl[1], hl[2], mixHex(hl[3], B.hills[k][3], f)]) };
}
// skyCycle(ctx, u, o): draws the dayCycle sky: the two presets cross-faded (sky() layers), stars, moon and sun behind the hills.
//   o: {w (1000), t (sun ray turn), sun: true, moon: true, stars: true, moonR (80), hills: true}
function skyCycle(ctx, u, o = {}) {
  const d = dayCycle(u), w = o.w || 1000;
  sky(ctx, { preset: d.a, hills: [], w }); if (d.f > 0.001) { ctx.save(); ctx.globalAlpha *= d.f; sky(ctx, { preset: d.b, hills: [], w }); ctx.restore(); }
  if (o.stars !== false && d.stars > 0) { ctx.save(); ctx.globalAlpha *= d.stars; stars(ctx, { w, h: 520 }); ctx.restore(); }
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, w, 920); ctx.clip();
  if (o.moon !== false && d.moon) moon(ctx, d.moon[0], d.moon[1], o.moonR || 80);
  if (o.sun !== false && d.sun) sun(ctx, d.sun[0], d.sun[1], o.t || 0);
  ctx.restore();
  if (o.hills !== false) for (const [bx, by, br, col] of d.hills) { ctx.beginPath(); ctx.ellipse(bx, by, br, br * 0.5, 0, Math.PI, 0); ctx.fillStyle = col; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.black; ctx.stroke(); }
  return d;
}
