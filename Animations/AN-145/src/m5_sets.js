// ===== AN-145 sets: pyramidSite (views far, face, section) and the night camp. World 1000 x 1230, ground y 900. =====
// Proposed for Library/sets as pyramidSite(ctx, {view, ...}) (see library_proposals.md).
const M5_GP = { apex: [560, 250], L: [160, 900], R: [960, 900], split: [650, 900] };
function m5Dunes(c, base, amp, seed, col, dotc, da, w = 1000) { const n = nz(seed), pts = [[-10, 1000]]; for (let x = -10; x <= w + 10; x += 20) pts.push([x, base - amp * (0.5 + 0.5 * n.n2(x * 0.0026, seed)) - amp * 0.35 * Math.sin(x * 0.0061 + seed)]); pts.push([w + 10, 1000]);
  shape(c, pts, col, { lw: 6, seed }); c.save(); K.poly(c, pts, true); c.clip(); c.fillStyle = dotPat(c, dotc, 10, 0.26); c.globalAlpha = da; for (let i = 1; i < pts.length - 2; i++) if (pts[i + 1][1] > pts[i][1]) c.fillRect(pts[i][0], pts[i][1] - 4, 20, 1000 - pts[i][1]); c.restore(); }
function m5SandGround(c, y0 = 884) { const n = nz(303), pts = [[-10, 1240], [-10, y0]]; for (let x = -10; x <= 1010; x += 20) pts.push([x, y0 + 6 * n.n2(x * 0.01, 3)]); pts.push([1010, y0], [1010, 1240]);
  shape(c, pts, SANDL, { lw: 7, seed: 304, dot: C.red, pitch: 12, rad: 0.16, da: 0.35 });
  c.save(); c.lineWidth = 3.5; c.strokeStyle = '#c98a3a'; c.lineCap = 'round'; const r = K.rng(7); for (let i = 0; i < 26; i++) { const x = r() * 1000, y = 990 + r() * 220; c.beginPath(); c.arc(x, y + 20, 26, 4.2, 5.2); c.stroke(); } c.restore(); }
// a pyramid with faces, course lines and joints: apex, base x0..x1 at y, split x (lit face left), n courses
function m5Pyr(c, apex, x0, x1, y, split, n, o = {}) { const lit = [[x0, y], apex, [split, y]], dark = [apex, [x1, y], [split, y]];
  shape(c, lit, o.lit || M5_STONE, { lw: 0, dot: C.red, pitch: o.pitch || 10, rad: 0.2, da: 0.45 }); shape(c, dark, o.dark || '#c98a3a', { lw: 0, dot: C.black, pitch: o.pitch || 10, rad: 0.24, da: 0.35 });
  c.save(); K.poly(c, [[x0, y], apex, [x1, y]], true); c.clip(); c.lineWidth = o.lw2 || 3; c.strokeStyle = 'rgba(20,20,20,0.55)'; const h = (y - apex[1]) / n;
  for (let k = 1; k < n; k++) { const yy = y - h * k; c.beginPath(); c.moveTo(x0 - 10, yy); c.lineTo(x1 + 10, yy); c.stroke();
    if (o.joints) { const f = (yy - apex[1]) / (y - apex[1]), lx = K.lerp(apex[0], x0, f), rx = K.lerp(apex[0], x1, f); for (let x = lx + ((k % 2) * 50); x < rx; x += 100) { c.beginPath(); c.moveTo(x, yy); c.lineTo(x, yy + h); c.stroke(); } } }
  c.restore(); seg(c, apex[0], apex[1], split, y, 2, C.black, 1.5); ink(c, [[x0, y], apex, [x1, y], [x0, y]], o.ink || 7, o.seed || 610); }
function m5FarLand(c) {
  m5Dunes(c, 760, 80, 301, '#e0a13a', C.red, 0.55);
  m5Pyr(c, [190, 520], 20, 360, 885, 230, 4, { pitch: 8, ink: 5, seed: 611 });
  m5Pyr(c, [70, 690], -50, 190, 890, 95, 4, { pitch: 8, ink: 5, seed: 612 });
  m5Dunes(c, 860, 40, 302, '#edc65a', '#e2701a', 0.5);
  m5Pyr(c, M5_GP.apex, 160, 960, 900, 650, 13, { joints: true, seed: 613 });
  m5SandGround(c);
}
// far view. o: u (sky), t, scar 0..1, outline 0..1, pulse 0..1 (outline flash), shadow true, palms true, extra(c) drawn on the land before the dim
function m5Far(ctx, o = {}) { const u = o.u ?? 0.22, t = o.t || 0, d = skyCycle(ctx, u, { t, hills: false });
  ctx.drawImage(bake('m5far', 1000, 1230, m5FarLand), 0, 0, 1000, 1230);
  if (o.shadow !== false && d.sun) { const el = K.clamp((860 - d.sun[1]) / 700), tx = 560 + (560 - d.sun[0]) * 1.1 * (1 - el * 0.6), ty = 960 + 90 * (1 - el); ctx.save(); ctx.globalAlpha = 0.3 * K.clamp((860 - d.sun[1]) / 80); ctx.beginPath(); K.poly(ctx, [[160, 902], [960, 902], [tx, ty]], true); ctx.clip(); ctx.fillStyle = dotPat(ctx, C.black, 7, 0.34); ctx.fillRect(-500, 890, 2000, 300); ctx.restore(); }
  if (o.scar > 0) { ctx.save(); ctx.globalAlpha = K.clamp(o.scar); shape(ctx, [[287, 900], [287, 884], [300, 870], [313, 884], [313, 900]], '#140c06', { lw: 2.5, seed: 614 }); ctx.restore(); }
  if (o.extra) o.extra(ctx, d);
  if (o.palms !== false) { palmTree(ctx, 60, 904, { h: 260, lean: 10, t, sway: 0.5 }); palmTree(ctx, 930, 904, { h: 220, lean: -14, t, sway: 0.5 }); }
  if (d.night > 0.001 || d.warm > 0.001) { ctx.save(); if (d.night > 0.001) { ctx.globalAlpha = 0.45 * d.night; ctx.fillStyle = NAVY2; ctx.fillRect(-20, 200, 1040, 1100); } if (d.warm > 0.001) { ctx.globalAlpha = 0.16 * d.warm; ctx.fillStyle = '#e2701a'; ctx.fillRect(-20, 200, 1040, 1100); } ctx.restore(); }
  if (o.pulse > 0) { ctx.save(); ctx.globalAlpha = K.clamp(o.pulse); ctx.lineJoin = 'round'; ctx.lineWidth = 18; ctx.strokeStyle = C.yellow; K.poly(ctx, [[160, 900], [560, 250], [960, 900]]); ctx.stroke(); ctx.lineWidth = 6; ctx.strokeStyle = C.black; ctx.stroke(); ctx.restore(); }
  if (o.pulseB > 0) { ctx.save(); ctx.globalAlpha = K.clamp(o.pulseB); ctx.lineWidth = 10; ctx.strokeStyle = C.yellow; K.poly(ctx, [[20, 885], [190, 520], [360, 885]]); ctx.stroke(); ctx.restore(); }
  if (o.pulseC > 0) { ctx.save(); ctx.globalAlpha = K.clamp(o.pulseC); ctx.lineWidth = 8; ctx.strokeStyle = C.yellow; K.poly(ctx, [[-50, 890], [70, 690], [190, 890]]); ctx.stroke(); ctx.restore(); }
  if (o.outline > 0) m5DashRect(ctx, 220, 640, 470, 900, o.outline, { t, w: 8, dash: [16, 10] });
  return d; }

// ---------- face view: the bottom courses as a stepped wall ----------
const M5_FACE = { tops: [730, 560, 390, 220, 50], h: 170, dig: [560, 820, 730, 900] };
function m5Blocks(n) { const out = [], y = M5_FACE.tops[n], x0 = 300 + 90 * n; let x = x0 + 260 - (n % 2) * 130; out.push([x0, x]); while (x < 1000) { out.push([x, x + 260]); x += 260; } return out.map(([a, b], i) => ({ n, i, x0: a, x1: b, y0: y, y1: y + 170 })); }
const M5_BLOCKS = [0, 1, 2, 3, 4].map(m5Blocks);
function m5Block(c, B, o = {}) { const r = K.rng(B.n * 31 + B.i * 7 + 3), chip = r() < 0.45, cs = 14 + r() * 16, { x0, x1, y0, y1 } = B;
  const pts = chip && B.i % 2 ? [[x0, y1], [x0, y0], [x1 - cs, y0], [x1, y0 + cs], [x1, y1]] : chip ? [[x0, y1], [x0, y0 + cs], [x0 + cs, y0], [x1, y0], [x1, y1]] : K.rectPts(x0, y0, x1 - x0, y1 - y0);
  shape(c, pts, o.col || (r() < 0.5 ? M5_STONE : '#e3ae40'), { lw: 6, seed: 620 + B.n * 5 + B.i, dot: C.red, pitch: 10, rad: 0.2, da: 0.3 + r() * 0.2 });
  c.save(); K.poly(c, pts, true); c.clip(); c.fillStyle = dotPat(c, '#7a4212', 8, 0.3); c.globalAlpha = 0.35; c.fillRect(x0 + (x1 - x0) * 0.62, y0, x1 - x0, y1 - y0); c.fillRect(x0, y1 - 26, x1 - x0, 26); c.restore();
  c.save(); c.globalAlpha = 0.5; c.fillStyle = '#fff3d6'; c.fillRect(x0 + 8, y0 + 6, (x1 - x0) * 0.5, 7); c.restore(); }
function m5FaceBack(c) { m5Dunes(c, 820, 70, 305, '#e0a13a', C.red, 0.55); m5Pyr(c, [120, 420], -140, 380, 880, 170, 5, { pitch: 8, ink: 5, seed: 615 }); m5Dunes(c, 880, 30, 306, '#edc65a', '#e2701a', 0.5); m5SandGround(c, 896); }
function m5FaceWall(c, from = 0) { for (let n = from; n < 5; n++) for (const B of M5_BLOCKS[n]) m5Block(c, B); }
// o: u, t, dig 0..1, outline 0..1, xMark 0..1, upper: false (courses 2-4 drawn by o.blocks(c) instead), q (question mark p)
function m5Face(ctx, o = {}) { const t = o.t || 0, d = skyCycle(ctx, o.u ?? 0.24, { t, hills: false });
  ctx.drawImage(bake('m5faceback', 1000, 1230, m5FaceBack), 0, 0, 1000, 1230);
  ctx.drawImage(bake(o.upper === false ? 'm5wallLow' : 'm5wall', 1000, 1230, (c) => { if (o.upper === false) { for (let n = 0; n < 2; n++) for (const B of M5_BLOCKS[n]) m5Block(c, B); } else m5FaceWall(c); }), 0, 0, 1000, 1230);
  if (o.blocks) o.blocks(ctx);
  if (o.dig > 0) m5Dig(ctx, o.dig, t, o);
  if (o.xMark > 0) { const k = K.clamp(o.xMark); ctx.save(); ctx.lineCap = 'round'; ctx.lineWidth = 9; ctx.strokeStyle = C.white; const L = 34; ctx.beginPath(); ctx.moveTo(690 - L, 815 - L); ctx.lineTo(690 - L + 2 * L * Math.min(1, k * 2), 815 - L + 2 * L * Math.min(1, k * 2)); if (k > 0.5) { const f = (k - 0.5) * 2; ctx.moveTo(690 + L, 815 - L); ctx.lineTo(690 + L - 2 * L * f, 815 - L + 2 * L * f); } ctx.stroke(); ctx.restore(); }
  if (d.night > 0.001) { ctx.save(); ctx.globalAlpha = 0.45 * d.night; ctx.fillStyle = NAVY2; ctx.fillRect(-20, 40, 1040, 1200); ctx.restore(); }
  if (o.shadow != null) { ctx.save(); ctx.globalAlpha = 0.28; ctx.beginPath(); ctx.rect(0, 896, 1000, 340); ctx.clip(); const sx = o.shadow; K.poly(ctx, [[300, 900], [1000, 900], [1000, 1230], [300 + sx, 1230]], true); ctx.clip(); ctx.fillStyle = dotPat(ctx, C.black, 7, 0.34); ctx.fillRect(0, 890, 1000, 340); ctx.restore(); }
  if (o.outline > 0) m5DashRect(ctx, 480, 220, 1000, 900, o.outline, { t });
  return d; }
// the dig on block x 560..820: chips (0.15), dent (0.4), arched opening (1) with rubble
function m5Dig(ctx, dig, t, o = {}) { const cx = 690;
  if (dig < 0.5) { const k = K.clamp(dig / 0.15); for (let i = 0; i < 3; i++) if (k > i / 3) { const a = [[-14, -6], [10, 4], [-2, 12]][i]; ctx.save(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(cx + a[0] - 7, 815 + a[1] - 5); ctx.lineTo(cx + a[0] + 6, 815 + a[1] + 4); ctx.moveTo(cx + a[0] + 5, 815 + a[1] - 6); ctx.lineTo(cx + a[0] - 3, 815 + a[1] + 5); ctx.stroke(); ctx.restore(); }
    const dn = K.clamp((dig - 0.15) / 0.25); if (dn > 0) shape(ctx, ell(cx, 818, 35 * dn, 22 * dn, 18), '#7a4212', { lw: 3, seed: 630, dot: C.black, pitch: 6, rad: 0.3, da: 0.5 }); return; }
  const k = K.clamp((dig - 0.5) / 0.5), w = K.lerp(70, 120, k), h = K.lerp(44, 140, k), pts = [[cx - w / 2, 900], [cx - w / 2, 900 - h + w / 2]]; for (let i = 0; i <= 10; i++) { const a = Math.PI + Math.PI * i / 10; pts.push([cx + Math.cos(a) * w / 2, 900 - h + w / 2 + Math.sin(a) * w / 2]); } pts.push([cx + w / 2, 900]);
  shape(ctx, pts, '#140c06', { lw: 6, seed: 631 }); if (o.glow > 0) { ctx.save(); K.poly(ctx, pts, true); ctx.clip(); m5Glow(ctx, cx, 880, 80, 0.5 * o.glow); ctx.restore(); }
  const r = K.rng(12); for (let i = 0; i < 6; i++) { const x = cx - 80 + r() * 160, s = 10 + r() * 12; shape(ctx, [[x - s, 912], [x - s * 0.6, 912 - s], [x + s * 0.7, 912 - s * 0.8], [x + s, 912]], i % 2 ? M5_STONE : M5_STONED, { lw: 3, seed: 632 + i }); } }

// ---------- section view: the cutaway ----------
const M5_SEC = { apex: [500, 180], x0: 60, x1: 940, y: 900, tunnel: [790, 850], niche: [372, 470, 770, 850], ch: { A: [500, 560, 130, 84], B: [420, 690, 110, 70], C: [610, 740, 124, 80] } };
const m5FaceX = (y) => 60 + (900 - y) / 720 * 440;
function m5SecMass(c) { const P = [[60, 900], [500, 180], [940, 900]]; shape(c, P, '#6a4420', { lw: 0, dot: '#1b1430', pitch: 9, rad: 0.24, da: 0.5 });
  c.save(); K.poly(c, P, true); c.clip(); c.lineWidth = 2.5; c.strokeStyle = 'rgba(20,20,20,0.6)'; for (let y = 900 - 48; y > 180; y -= 48) { c.beginPath(); c.moveTo(0, y); c.lineTo(1000, y); c.stroke(); const k = Math.round((900 - y) / 48); for (let x = (k % 2) * 40; x < 1000; x += 80) { c.beginPath(); c.moveTo(x, y); c.lineTo(x, y + 48); c.stroke(); } }
  c.fillStyle = 'rgba(255,210,31,0.18)'; K.poly(c, [[60, 900], [500, 180], [530, 180], [110, 900]], true); c.fill(); c.restore(); ink(c, [[60, 900], [500, 180], [940, 900], [60, 900]], 8, 640); }
function m5TunnelPts(len) { const xe = 109 + 260 * K.clamp(len), pts = [[m5FaceX(850) - 4, 850], [xe, 850], [xe, 792]]; const r = K.rng(4); for (let x = xe - 18; x > m5FaceX(790); x -= 18) pts.push([x, 790 + (r() - 0.5) * 8]); pts.push([m5FaceX(790) - 4, 790]); return pts; }
// o: u, t, len 0..1, breach 0..1, legend 0..1, dark 0..1 (chambers black), qs [pA, pB, pC], inside(c, key, cx, cy, w, h), light: {x, y, r, a}, hoard(c)
function m5Section(ctx, o = {}) { const t = o.t || 0, d = skyCycle(ctx, o.u ?? 0.24, { t, hills: false });
  ctx.drawImage(bake('m5secback', 1000, 1230, (c) => { m5Dunes(c, 860, 50, 307, '#e0a13a', C.red, 0.5); m5SandGround(c, 896); m5SecMass(c); }), 0, 0, 1000, 1230);
  if (o.len > 0) { const tp = m5TunnelPts(o.len); shape(ctx, tp, '#1a120a', { lw: 4, seed: 641 });
    if (o.light) { const L = o.light; ctx.save(); K.poly(ctx, tp, true); ctx.clip(); m5Glow(ctx, L.x, L.y, L.r, L.a ?? 0.6, '#ffb84a'); ctx.globalAlpha = 0.5 * (L.a ?? 0.6); ctx.fillStyle = '#8a5a2a'; ctx.beginPath(); ctx.arc(L.x, L.y, L.r * 0.8, 0, 7); ctx.fill(); ctx.restore(); }
    if (o.niche) { const [a, b, c0, c1] = M5_SEC.niche, br = K.clamp(o.breach || 0); if (br > 0) { shape(ctx, K.rectPts(a, c0, b - a, c1 - c0), '#1a120a', { lw: 4, seed: 642 }); if (o.hoard) { ctx.save(); ctx.beginPath(); ctx.rect(a, c0, b - a, c1 - c0); ctx.clip(); o.hoard(ctx); ctx.restore(); } }
      if (br < 1) { ctx.save(); const f = K.clamp(br * 1.4); for (let i = 0; i < 4; i++) { const y = 792 + i * 15, dx = f * (14 + i * 9), dy = f * f * (40 - i * 10); ctx.globalAlpha = 1 - K.clamp((br - 0.5) * 2); shape(ctx, K.rectPts(369 + dx, y + dy, 12, 14), '#6a4420', { lw: 2.5, seed: 643 + i }); } ctx.restore(); } } }
  if (o.legend > 0) m5Legend(ctx, o, t);
  if (d.night > 0.001) { ctx.save(); ctx.globalAlpha = 0.4 * d.night; ctx.fillStyle = NAVY2; ctx.fillRect(-20, 40, 1040, 1200); ctx.restore(); }
  return d; }
function m5Legend(ctx, o, t) { const L = K.clamp(o.legend), C3 = M5_SEC.ch, pas = [[C3.A, C3.B], [C3.A, C3.C], [C3.C, [700, 900]]];
  ctx.save(); ctx.globalAlpha = L; ctx.setLineDash([12, 9]); ctx.lineDashOffset = -t * 30; ctx.lineCap = 'round';
  pas.forEach(([a, b], i) => { const f = K.clamp(o.legend * 3 - i); if (f <= 0) return; ctx.lineWidth = 30; ctx.strokeStyle = 'rgba(20,12,6,0.6)'; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(K.lerp(a[0], b[0], f), K.lerp(a[1], b[1], f)); ctx.stroke(); ctx.lineWidth = 4; ctx.strokeStyle = C.yellow; ctx.stroke(); });
  ctx.restore();
  ['A', 'B', 'C'].forEach((k, i) => { const p = o.chP ? o.chP[i] : 1; if (p <= 0) return; const [cx, cy, w, h] = C3[k], s = K.ease.back(K.clamp(p)); ctx.save(); ctx.translate(cx, cy); ctx.scale(s, s);
    ctx.fillStyle = '#2a1a0e'; ctx.fillRect(-w / 2, -h / 2, w, h); if (o.inside) o.inside(ctx, k, 0, 0, w, h); if (o.dark > 0) { ctx.globalAlpha = o.dark; ctx.fillStyle = '#05030a'; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.globalAlpha = 1; }
    ctx.setLineDash([12, 8]); ctx.lineDashOffset = -t * 30; ctx.lineWidth = 5; ctx.strokeStyle = C.yellow; ctx.strokeRect(-w / 2, -h / 2, w, h); ctx.restore();
    if (o.qs && o.qs[i] > 0) m5Q(ctx, cx, cy + 4, 62, o.qs[i], C.yellow); }); }

// ---------- the night camp (planned desertCamp, reduced) ----------
function m5CampBack(c) { m5Dunes(c, 800, 70, 308, '#c98a3a', '#7a4212', 0.5);
  shape(c, [[400, 880], [700, 330], [1000, 880]], '#24356e', { lw: 7, seed: 650, dot: '#0d1a40', pitch: 9, rad: 0.25, da: 0.5 }); seg(c, 700, 330, 400, 880, 6, C.yellow, 2);
  m5Dunes(c, 880, 30, 309, '#d9a441', '#7a4212', 0.5); m5SandGround(c, 896);
  shape(c, [[-20, 905], [-20, 600], [110, 560], [230, 905]], '#b01a14', { lw: 7, seed: 651, dot: '#a8160f', pitch: 9, rad: 0.25, da: 0.5 }); for (let i = 0; i < 4; i++) seg(c, -10 + i * 52, 905, 110 - (110 - (-10 + i * 52)) * 0.05, 575, 6, C.yellow, 0);
  shape(c, [[60, 905], [110, 700], [160, 905]], '#2a1a0e', { lw: 5, seed: 652 });
  shape(c, [[250, 900], [760, 900], [770, 930], [240, 930]], C.blue, { lw: 5, seed: 653, dot: C.yellow, pitch: 10, rad: 0.2, da: 0.5 }); }
function m5Camp(ctx, o = {}) { const t = o.t || 0; skyCycle(ctx, o.u ?? 0.72, { t, hills: false, moonR: 70 });
  ctx.drawImage(bake('m5camp', 1000, 1230, m5CampBack), 0, 0, 1000, 1230);
  ctx.save(); ctx.globalAlpha = 0.38; ctx.fillStyle = NAVY2; ctx.fillRect(-20, 897, 1040, 340); ctx.restore(); }
function m5Fire(ctx, t, x = 500, y = 905) { const n = nz(77), fl = 0.85 + 0.15 * n.n2(t * 3, 1);
  m5Glow(ctx, x, y - 40, 200 * fl, 0.22, C.yellow);
  for (let i = 0; i < 3; i++) seg(ctx, x - 40 + i * 30, y + 2, x - 20 + i * 18, y - 14, 10, '#7a4212', 3);
  [[-22, 70, C.red], [0, 100, C.yellow], [22, 64, C.red], [0, 50, C.white]].forEach(([dx, h, col], i) => { const hh = h * (0.8 + 0.25 * n.n2(t * 4 + i, 2)), sw = 8 * Math.sin(t * 7 + i * 2);
    shape(ctx, [[x + dx - 20 + (i === 3 ? 8 : 0), y - 4], [x + dx - 12, y - hh * 0.5], [x + dx + sw, y - hh], [x + dx + 12, y - hh * 0.5], [x + dx + 20 - (i === 3 ? 8 : 0), y - 4]], col, { lw: i === 3 ? 0 : 4, seed: 660 + i }); }); }
