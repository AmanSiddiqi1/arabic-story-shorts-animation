// ===== SIND-02 props (new, reusable): diamonds (jewels in colour 'diamond'), meatSlab, turbanCloth (ribbon line), sashPouch, eaglet =====

// ---------- diamonds: a six-sided cut gem, r = half width (22 wide at r 11). o: {rot, glow 0..1, tint} ----------
const SB_GEM = { face: '#f4fbff', a: '#bfeaff', b: '#d8c8ff', c: '#ffffff', line: '#5a6aa8' };
function sbGem(ctx, x, y, r, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0);
  if (o.glow) sbGlow(ctx, 0, 0, r * 4, o.glow, '#dff4ff');
  const P = [[-r, -r * 0.35], [-r * 0.55, -r * 0.9], [r * 0.55, -r * 0.9], [r, -r * 0.35], [0, r * 1.05]];
  shape(ctx, P, SB_GEM.face, { lw: Math.max(1.2, r * (o.line ? 0.16 : 0.12)), line: o.line || SB_GEM.line });
  ctx.fillStyle = o.tint || SB_GEM.a; ctx.beginPath(); ctx.moveTo(-r, -r * 0.35); ctx.lineTo(-r * 0.3, -r * 0.35); ctx.lineTo(0, r * 1.05); ctx.closePath(); ctx.fill();
  ctx.fillStyle = o.tintB || SB_GEM.b; ctx.beginPath(); ctx.moveTo(r, -r * 0.35); ctx.lineTo(r * 0.3, -r * 0.35); ctx.lineTo(0, r * 1.05); ctx.closePath(); ctx.fill();
  ctx.fillStyle = SB_GEM.c; ctx.beginPath(); ctx.moveTo(-r * 0.55, -r * 0.9); ctx.lineTo(-r * 0.2, -r * 0.35); ctx.lineTo(-r, -r * 0.35); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = o.line || SB_GEM.line; ctx.lineWidth = Math.max(1, r * 0.07); ctx.beginPath(); ctx.moveTo(-r, -r * 0.35); ctx.lineTo(r, -r * 0.35); ctx.stroke();
  ctx.restore();
}
// o.line / o.tintB (v2, optional): a darker outline and a second hard facet colour so a gem separates from pale sand
// scatter n gems over a rect (for baked floors); returns the positions
function sbGemScatter(c, x0, x1, y0, y1, n, seed, r0 = 7, r1 = 15) { const R = K.rng(seed), out = []; for (let i = 0; i < n; i++) { const y = y0 + R() * (y1 - y0), d = 0.6 + 0.8 * (y - y0) / Math.max(1, y1 - y0), x = x0 + R() * (x1 - x0), r = (r0 + R() * (r1 - r0)) * d; sbGem(c, x, y, r, { rot: (R() - 0.5) * 0.8, tint: ['#bfeaff', '#ffd8f0', '#d8ffe8', '#fff2b8'][i % 4] }); out.push([x, y, r]); } return out; }
// seven thin coloured rays from a gem (the insert)
function sbRays(ctx, x, y, len, k, rot = 0) { if (k <= 0) return; const cols = ['#ff6a8a', '#ffb04a', '#ffe24a', '#6aff9a', '#4ad0ff', '#6a8aff', '#c46aff'];
  ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha *= 0.55 * k; for (let i = 0; i < 7; i++) { const a = rot + (i - 3) * 0.16; ctx.fillStyle = cols[i]; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a - 0.05) * len, y + Math.sin(a - 0.05) * len); ctx.lineTo(x + Math.cos(a + 0.05) * len, y + Math.sin(a + 0.05) * len); ctx.closePath(); ctx.fill(); } ctx.restore(); }

// ---------- meatSlab: a friendly cartoon ham, 150 x 260 in its own frame (long axis local y, bone at the top: grip point at (0, -200)).
// sbSlab(ctx, x, y, o): (x, y) = the frame centre. o: {rot (rad; -PI/2 = lying flat, bone to the left), sq, wobble (shear), stuck (n gems on
// the local -x side = the underside when flat), s, front(c) drawn inside the frame after the slab (a strapped person), bands (0..2 strap turns)}
function sbSlab(ctx, x, y, o = {}) {
  const s = o.s || 1; ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s); if (o.wobble) ctx.transform(1, 0, o.wobble, 1, 0, 0); if (o.sq) ctx.scale(1 / Math.sqrt(o.sq), o.sq);
  // bone (behind) with a knob: the eagle's grip
  seg(ctx, 0, -110, 0, -186, 30, '#fff6e6', 3); for (const sd of [-1, 1]) sbBlob(ctx, sd * 16, -196, 18, 16, '#fff6e6', '#d8cbb8', { lw: 3, off: 5, line: '#7a5a5a' });
  const B = []; for (let i = 0; i < 32; i++) { const a = i / 32 * Math.PI * 2, c = Math.cos(a), sn = Math.sin(a); B.push([Math.sign(c) * Math.pow(Math.abs(c), 0.7) * 78, Math.sign(sn) * Math.pow(Math.abs(sn), 0.8) * (sn < 0 ? 120 : 136)]); }
  celShade(ctx, B, '#f6e6cc', '#e0c8a8', { light: [-1, -1], off: 10, lw: 4, line: '#7a3a3a' });   // fat rim
  const I = B.map(([px, py]) => [px * 0.8, py * 0.84 + 4]); celShade(ctx, I, '#ec8f8a', '#cf6a70', { light: [-1, -1], off: 22, lw: 3, line: '#a84a54', hi: '#ffc0b8' });
  ctx.save(); ctx.strokeStyle = '#f8d0c0'; ctx.lineWidth = 5; ctx.lineCap = 'round'; for (const [a, b, c2] of [[[-30, -50], [0, -30], [24, -60]], [[-20, 30], [10, 50], [30, 20]]]) { ctx.beginPath(); ctx.moveTo(...a); ctx.quadraticCurveTo(...b, ...c2); ctx.stroke(); } ctx.restore();
  for (let i = 0; i < (o.stuck || 0); i++) sbGem(ctx, -70 + (i % 2) * 6, -90 + i * 42, 11, { rot: i * 0.5, tint: ['#bfeaff', '#ffd8f0', '#d8ffe8'][i % 3] });
  if (o.front) o.front(ctx);
  ctx.restore();
}
// slab frame -> world point
function sbSlabPt(x, y, o, lx, ly) { const s = o.s || 1, a = o.rot || 0, c = Math.cos(a), n = Math.sin(a); return [x + (lx * c - ly * n) * s, y + (lx * n + ly * c) * s]; }

// ---------- turbanCloth: Sinbad's unwound turban as a tangerine ribbon line (14 wide, darker edge). pts = the cloth centre line ----------
// o: {w (14), free: n (the last n points are a free end that ripples), t, amp}
function sbCloth(ctx, pts, o = {}) {
  if (pts.length < 2) return; const w = o.w || 14, t = o.t || 0, tc = SB_T3(t), n = pts.length, fr = o.free || 0;
  const P = pts.map((p, i) => { if (i < n - fr) return p; const u = (i - (n - fr) + 1) / fr, a = (o.amp ?? 8) * u * Math.sin(tc * 9 - i * 1.3); return [p[0] + a * 0.4, p[1] + a]; });
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.strokeStyle = SB_ACCD; ctx.lineWidth = w + 5; ctx.beginPath(); K.poly(ctx, P); ctx.stroke();
  ctx.strokeStyle = SB_ACC; ctx.lineWidth = w; ctx.beginPath(); K.poly(ctx, P); ctx.stroke();
  ctx.strokeStyle = '#ffb070'; ctx.lineWidth = w * 0.28; ctx.beginPath(); K.poly(ctx, P.map(([x, y]) => [x - w * 0.15, y - w * 0.2])); ctx.stroke();
  ctx.restore();
}
// a hanging line between a and b with sag (catenary-ish), n points
function sbSag(a, b, sag, n = 14) { const out = []; for (let i = 0; i <= n; i++) { const u = i / n; out.push([K.lerp(a[0], b[0], u), K.lerp(a[1], b[1], u) + sag * 4 * u * (1 - u)]); } return out; }
// a soft bow (two ears and two tails) at (x, y), size k
function sbBow(ctx, x, y, k = 1, t = 0, flop = 0) {
  const tc = SB_T3(t);
  for (const sd of [-1, 1]) { const a = sd * (0.6 + 0.12 * Math.sin(tc * 4 + sd)) + flop * 0.3; celShade(ctx, [[x, y], [x + Math.cos(a - Math.PI / 2) * 40 * k - 16 * k, y + Math.sin(a - Math.PI / 2) * 40 * k], [x + Math.cos(a - Math.PI / 2) * 44 * k + 14 * k, y + Math.sin(a - Math.PI / 2) * 30 * k]].map((p) => [p[0], p[1]]), SB_ACC, SB_ACCD, { light: [0, -1], off: 5 * k, lw: 2.5, line: '#8a3a0e' }); }
  for (const sd of [-1, 1]) sbRibbon(ctx, x, y, Math.PI / 2 + sd * 0.4, 40 * k, 12 * k, t, { amp: 4, freq: 7, ph: sd });
  sbBlob(ctx, x, y, 9 * k, 8 * k, SB_ACC, SB_ACCD, { lw: 2.5, off: 3 });
}

// ---------- sashPouch: a knotted fold of the tangerine sash at the hip with a faint glow; (x, y) world, glow 0..1 ----------
function sbPouch(ctx, x, y, g = 1, t = 0) { sbGlow(ctx, x, y, 46, 0.35 * g, '#dff4ff'); celShade(ctx, [[x - 17, y - 6], [x - 10, y - 18], [x + 10, y - 18], [x + 17, y - 4], [x + 10, y + 14], [x - 10, y + 14]], SB_ACC, SB_ACCD, { light: [-1, -1], off: 6, lw: 2.5, line: '#8a3a0e' });
  sbGlints(ctx, [x - 10, y - 14, 20, 20], t, 1, 9, 12, 0.8); }

// ---------- eaglet: a fluffy white chick with a hooked gold beak. o: {s, dir, beak 0..1, bob, tilt, lid, gaze} ----------
function sbEaglet(ctx, x, y, o = {}) {
  const s = o.s || 1, dir = o.dir || 1; ctx.save(); ctx.translate(x, y - (o.bob || 0)); ctx.scale(dir * s, s);
  const F = []; for (let i = 0; i < 22; i++) { const a = i / 22 * Math.PI * 2, r = 1 + 0.1 * Math.sin(a * 9); F.push([Math.cos(a) * 46 * r, -46 + Math.sin(a) * 44 * r]); }
  celShade(ctx, F, '#fbf6ee', '#d6cce8', { light: [-1, -1], off: 14, lw: 3, line: '#5a4a6a' });
  ctx.save(); ctx.translate(14, -96); ctx.rotate(o.tilt || 0);
  const Hh = []; for (let i = 0; i < 18; i++) { const a = i / 18 * Math.PI * 2, r = 1 + 0.12 * Math.sin(a * 7); Hh.push([Math.cos(a) * 32 * r, Math.sin(a) * 30 * r]); }
  celShade(ctx, Hh, '#fffaf2', '#d6cce8', { light: [-1, -1], off: 10, lw: 3, line: '#5a4a6a' });
  const ob = K.clamp(o.beak || 0); celShade(ctx, [[24, 4], [52, 8 + ob * 12], [26, 14 + ob * 10]], '#f2c43a', '#c8901a', { light: [0, -1], off: 3, lw: 2 });
  celShade(ctx, [[22, -10], [44, -8], [56, 4], [50, 12], [24, 6]], '#ffcf3a', '#d89a1a', { light: [0, -1], off: 4, lw: 2.5 });
  eye2(ctx, 10, -6, 'open', (o.gaze || [1, 0])[0] * dir, (o.gaze || [1, 0])[1], o.lid || 0, '#fffaf2');
  ctx.restore(); ctx.restore();
}
