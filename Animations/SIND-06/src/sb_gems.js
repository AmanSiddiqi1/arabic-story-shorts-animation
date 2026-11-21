// ===== SIND-06 new props: gemPebbles (planned "jewels" in a rounded pebble cut) and oilLamp (the ship lantern with lampGlow) =====
// Reusable (see library_proposals.md). All drawing is a pure function of its arguments and t.

// ---------- gemPebbles ----------
// five gem colours: [fill, shade, light]
const SB_GEMC = [['#ff4a6a', '#c01a46', '#ffb0c0'], ['#3adf8a', '#14965a', '#b8ffd8'], ['#4aa0ff', '#1a5ac8', '#c0e0ff'], ['#ffc83a', '#c8860e', '#fff0a8'], ['#b07aff', '#6a3ac8', '#e4d0ff']];
// one pebble: a smooth five sided stone r wide (half width), two hard facets, a glow underneath (o.glow 0..1), a glint p (0..1 of a
// four point star; any other value = none). (x, y) is the centre. o: {rot, s (extra scale), line}
function sbPebble(ctx, x, y, r, ci = 0, o = {}) {
  const [f, sh, li] = SB_GEMC[ci % 5], R = K.rng(17 + ci * 5 + Math.round(r)), pts = [];
  if (o.glow > 0) sbGlow(ctx, x, y, r * 3.2, o.glow, f);
  for (let i = 0; i < 5; i++) { const a = (o.rot || 0) + i * 1.2566 - 1.3, rr = r * (0.86 + R() * 0.22); pts.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr * 0.78]); }
  const sm = []; for (let i = 0; i < 5; i++) { const a = pts[i], b = pts[(i + 1) % 5]; sm.push([K.lerp(a[0], b[0], 0.2), K.lerp(a[1], b[1], 0.2)], [K.lerp(a[0], b[0], 0.8), K.lerp(a[1], b[1], 0.8)]); }
  celShade(ctx, sm, f, sh, { light: [-1, -1], off: r * 0.38, lw: o.lw ?? Math.max(1.5, r * 0.14), line: o.line || sbDark(sh, 0.45) });
  // two hard facets: a light triangle top left, a deep one bottom right
  ctx.save(); ctx.fillStyle = li; ctx.globalAlpha = 0.9; ctx.beginPath(); ctx.moveTo(x - r * 0.55, y - r * 0.12); ctx.lineTo(x - r * 0.1, y - r * 0.55); ctx.lineTo(x + r * 0.05, y - r * 0.08); ctx.closePath(); ctx.fill();
  ctx.fillStyle = sbDark(sh, 0.2); ctx.globalAlpha = 0.6; ctx.beginPath(); ctx.moveTo(x + r * 0.1, y + r * 0.1); ctx.lineTo(x + r * 0.62, y + r * 0.05); ctx.lineTo(x + r * 0.25, y + r * 0.5); ctx.closePath(); ctx.fill(); ctx.restore();
  if (o.glint > 0 && o.glint < 1) sbGlint(ctx, x - r * 0.2, y - r * 0.35, r * 1.6, o.glint);
}
// a seeded scatter along a bank: list of [x, y, r, ci, ph] (sorted back to front). Bigger toward the front (y).
function sbPebbleList(x0, x1, y0, y1, n, seed, r0 = 9, r1 = 14) { const R = K.rng(seed), out = [];
  for (let i = 0; i < n; i++) { const y = y0 + R() * (y1 - y0), d = 0.75 + 0.5 * (y - y0) / Math.max(1, y1 - y0); out.push([x0 + R() * (x1 - x0), y, (r0 + R() * (r1 - r0)) * d, Math.floor(R() * 5), R()]); }
  return out.sort((a, b) => a[1] - b[1]); }
// draw a list (baked or live). o: {glow, lit 0..1 (only the first lit * n are drawn: the banks light up), t (live glints on threes)}
function sbPebbles(ctx, list, o = {}) { const n = Math.round(list.length * (o.lit ?? 1)), tc = SB_T3(o.t || 0);
  for (let i = 0; i < n; i++) { const [x, y, r, ci, ph] = list[i], g = o.t != null ? ((tc * 0.8 + ph * 3) % 1.6) / 0.5 : 0; sbPebble(ctx, x, y, r, ci, { glow: o.glow ?? 0, glint: g, rot: ph * 6 }); } }
// a heap of n pebbles (raft bow, a palm): the pile settles from the bottom up; (x, y) the base centre
function sbPebbleHeap(ctx, x, y, n, t, o = {}) { const s = o.s || 1, R = K.rng(o.seed || 91), tc = SB_T3(t);
  if (o.glow) sbGlow(ctx, x, y - 14 * s, 80 * s, o.glow, '#ffd8f0');
  for (let i = 0; i < n; i++) { const row = i < 4 ? 0 : i < 7 ? 1 : 2, k = row === 0 ? i : row === 1 ? i - 4 : i - 7, w = [4, 3, 2][row], px = x + (k - (w - 1) / 2) * 21 * s + (R() - 0.5) * 4 * s, py = y - 9 * s - row * 13 * s;
    sbPebble(ctx, px, py, 10.5 * s, (i * 3 + 1) % 5, { rot: R() * 6, glint: o.glints === false ? 0 : ((tc * 0.7 + i * 0.37) % 1.4) / 0.45 }); }
}

// ---------- oilLamp: the ship lantern ----------
// hung by its ring at (x, y): brass frame 34 x 52 with four panes, a peaked cap, the flame 0..1 drawn in five sizes with a three
// frame flicker on threes. o: {flame, swing (radians), s, t, lit (pane glow 0..1)}
function sbLantern(ctx, x, y, o = {}) {
  const s = o.s || 1, fl = K.clamp(o.flame ?? 1), tc = SB_T3(o.t || 0), fk = [0, 1, 2][Math.floor(tc * 8) % 3];
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.swing || 0); ctx.scale(s, s);
  ctx.strokeStyle = '#8a6a2a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 5, 6, 0, 7); ctx.stroke();
  celShade(ctx, [[-20, 26], [0, 10], [20, 26]], '#e0b04a', '#a8761e', { light: [-1, -1], off: 4, lw: 2.2, line: '#5a3a14' });
  // glass: warm with the flame inside
  const gl = sbMix('#7a6a8a', '#ffe7a0', 0.25 + 0.75 * fl);
  ctx.fillStyle = gl; ctx.fillRect(-15, 26, 30, 40);
  if (fl > 0.02) { const k = [0.3, 0.45, 0.6, 0.8, 1][Math.min(4, Math.floor(fl * 5))], h = 26 * k * (1 + 0.08 * (fk - 1)), w = 7 * k + 2;
    ctx.fillStyle = '#ff9a2a'; ctx.beginPath(); ctx.moveTo(0, 60 - h - 2); ctx.quadraticCurveTo(w + 1, 56 - h * 0.3, 0, 60); ctx.quadraticCurveTo(-w - 1, 56 - h * 0.3, 0, 60 - h - 2); ctx.fill();
    ctx.fillStyle = '#fff2b0'; ctx.beginPath(); ctx.moveTo(fk - 1, 60 - h * 0.62); ctx.quadraticCurveTo(w * 0.5, 58 - h * 0.2, 0, 60); ctx.quadraticCurveTo(-w * 0.5, 58 - h * 0.2, fk - 1, 60 - h * 0.62); ctx.fill(); }
  ctx.strokeStyle = '#c89a3a'; ctx.lineWidth = 3.5; ctx.strokeRect(-15, 26, 30, 40); seg(ctx, 0, 26, 0, 66, 2.5, '#c89a3a', 0);
  celShade(ctx, [[-19, 64], [19, 64], [16, 74], [-16, 74]], '#e0b04a', '#a8761e', { light: [-1, -1], off: 3, lw: 2.2, line: '#5a3a14' });
  ctx.restore();
}
// the lit radius of the lantern (world units) for a flame value (plan: 150 + 180 * flame)
const sbLampR = (fl) => 150 + 180 * K.clamp(fl);
// warm halation on the PLATE around the lamp (never over the cast: draw it before the raft and the people)
function sbLampGlow(ctx, x, y, fl, t, o = {}) { const tc = SB_T3(t), r = sbLampR(fl) * (1 + 0.03 * Math.sin(tc * 23)); sbGlow(ctx, x, y, r * (o.k ?? 1.15), (o.a ?? 0.55) * (0.4 + 0.6 * fl), o.col || '#ffc870'); }
