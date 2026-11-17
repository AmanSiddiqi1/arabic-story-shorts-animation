// ===== AN-083 props, effects and person-geometry helpers (story code; reusable ones are listed in library_proposals.md) =====
// waterskin, quiver, gold arrow, arrow bundle, bow, purse, coin, scroll, icons, inset circle, heat shimmer, gold glow.
const AN83_LEATHER = '#b0692a', AN83_LEATHERD = '#7a4212', AN83_SHAFT = '#c58a18', AN83_QUIV = '#a8401a', AN83_QUIVD = '#6e2410';
const AN83_B = (t, a, d, e = 'inOut') => K.ease[e](K.clamp((t - a) / d));
const an83Fade = (t, a, b, f = 0.2) => K.clamp(Math.min((t - a) / f, (b - t) / f));
const an83In = (t, a, b) => t >= a && t < b;
const an83Close = (pts) => pts.concat([pts[0]]);

// ---------- person geometry (mirrors personCostumed + the acting wrapper, standing poses) ----------
function an83Age(P) { return P.age ?? ((COSTUME[P.costume] || COSTUME.villager).age ?? 0.3); }
// figure-local (upper body, feet at 0,0, +x = facing side) -> world
function an83W(P, lx, ly) {
  const s = P.s || 1, dir = P.dir || 1, lean = (P.lean || 0) + an83Age(P) * 0.12, c = Math.cos(lean), n = Math.sin(lean), y0 = ly + 75;
  let x = (lx * c - y0 * n) * dir * s, y = (lx * n + y0 * c - 75) * s; const sq = P.sq ?? 1; x *= 1 + (1 - sq) * 0.7; y *= sq;
  const tip = (P.tip || 0) * Math.sign(dir || 1); if (tip) { const c2 = Math.cos(tip), n2 = Math.sin(tip); [x, y] = [x * c2 - y * n2, x * n2 + y * c2]; }
  return [P.x + x, P.y + y];
}
// world -> figure-local (inverse of an83W), for hand targets on world points
function an83L(P, wx, wy) {
  const s = P.s || 1, dir = P.dir || 1, lean = (P.lean || 0) + an83Age(P) * 0.12, sq = P.sq ?? 1, tip = (P.tip || 0) * Math.sign(dir || 1);
  let x = wx - P.x, y = wy - P.y; if (tip) { const c2 = Math.cos(-tip), n2 = Math.sin(-tip); [x, y] = [x * c2 - y * n2, x * n2 + y * c2]; }
  x /= (1 + (1 - sq) * 0.7) * dir * s; y /= sq * s; const c = Math.cos(-lean), n = Math.sin(-lean), y0 = y + 75; return [x * c - y0 * n, x * n + y0 * c - 75];
}
// where the hand really ends up (local), for a target or arm angles (same maths as personCostumed's arm())
function an83HandL(sd, tgt, ang) { const a = ang || (tgt ? armTo(sd, -132, tgt) : [0.12, 0.05]), sx = sd * 31, e = [sx + Math.sin(a[0]) * 38, -132 + Math.cos(a[0]) * 38]; return [e[0] + Math.sin(a[1]) * 36, e[1] + Math.cos(a[1]) * 36]; }
function an83HandW(P, sd) { return an83W(P, ...an83HandL(sd, sd < 0 ? P.handL : P.handR, sd < 0 ? P.aL : P.aR)); }
function an83HeadW(P) { return an83W(P, (P.look || 0) * 4, -195 + (P.drop || 0) + an83Age(P) * 6); }
// draw in a figure's local space (same transform as the person, so slung props follow tip, squash, lean and facing)
function an83Local(ctx, P, fn) {
  const s = P.s || 1, dir = P.dir || 1, sq = P.sq ?? 1, tip = (P.tip || 0) * Math.sign(dir || 1), lean = (P.lean || 0) + an83Age(P) * 0.12;
  ctx.save(); ctx.translate(P.x, P.y); if (tip) ctx.rotate(tip); if (sq !== 1) ctx.scale(1 + (1 - sq) * 0.7, sq); ctx.scale(dir * s, s); ctx.translate(0, -75); ctx.rotate(lean); ctx.translate(0, 75);
  if (P.alpha != null) ctx.globalAlpha *= P.alpha; fn(ctx); ctx.restore();
}

// ---------- waterskin: goat-skin bag 78 x 50, (x, y) = centre. o: {fill 0..1, tilt (rad, neck end = +x), squeeze 0..1, slosh, glint 0..1, s} ----------
function an83Skin(ctx, x, y, o = {}) {
  const f = K.clamp(o.fill ?? 1), s = o.s || 1, sq = o.squeeze || 0, sl = o.slosh || 0;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.tilt || 0); ctx.scale(s, s);
  const rx = 39 * (1 - 0.1 * (1 - f)) * (1 + 0.18 * sq), ry = 25 * (0.42 + 0.58 * f) * (1 - 0.7 * sq);
  for (const lx of [-22, 12]) seg(ctx, lx, ry * 0.55, lx - 5 + sl * 3, ry + 9, 9, AN83_LEATHER, 3.5);
  seg(ctx, rx - 8, -ry * 0.25, rx + 14, -ry * 0.25 - 10, 13, AN83_LEATHER, 4);
  seg(ctx, rx + 4, -ry * 0.25 - 14, rx + 9, -ry * 0.25 + 1, 5, C.red, 2.5);
  const pts = []; for (let i = 0; i < 30; i++) { const a = i / 30 * Math.PI * 2, wob = 1 + 0.05 * Math.sin(a * 3 + sl * 2.5) * f + (f < 0.5 ? 0.07 * (0.5 - f) * 2 * Math.sin(a * 9) : 0); pts.push([Math.cos(a) * rx * wob, Math.sin(a) * ry * wob + (Math.sin(a) > 0 ? ry * 0.18 * f * (1 + 0.3 * sl) : 0)]); }
  shape(ctx, an83Close(pts), AN83_LEATHER, { lw: 4.5, seed: 831, dot: AN83_LEATHERD, pitch: 7, rad: 0.25, da: 0.5 });
  ctx.save(); ctx.lineCap = 'round';
  if (f > 0.5) { ctx.strokeStyle = 'rgba(255,250,240,0.75)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(-rx * 0.25 + sl * 4, -ry * 0.1, ry * 0.6, 3.6, 4.5); ctx.stroke(); }
  else { ctx.strokeStyle = C.black; ctx.lineWidth = 2.5; for (const k of [-0.4, 0, 0.35]) { ctx.beginPath(); ctx.moveTo(rx * k - 6, -ry * 0.5); ctx.lineTo(rx * k, 0); ctx.lineTo(rx * k - 5, ry * 0.5); ctx.stroke(); } }
  if (o.glint > 0) { K.poly(ctx, pts, true); ctx.clip(); ctx.globalAlpha = Math.sin(Math.PI * K.clamp(o.glint)); ctx.fillStyle = '#9cc4ff'; const gx = -rx * 1.4 + 2.8 * rx * K.clamp(o.glint); ctx.beginPath(); ctx.moveTo(gx, -ry * 1.4); ctx.lineTo(gx + 14, -ry * 1.4); ctx.lineTo(gx + 2, ry * 1.4); ctx.lineTo(gx - 12, ry * 1.4); ctx.fill(); }
  ctx.restore(); ctx.restore();
}
// a falling water drop
function an83Drop(ctx, x, y, r = 8, col = TEAR) { shape(ctx, an83Close([[x, y - r * 1.8], [x + r * 0.8, y - r * 0.2], [x + r * 0.6, y + r * 0.7], [x, y + r], [x - r * 0.6, y + r * 0.7], [x - r * 0.8, y - r * 0.2]]), col, { lw: 3, seed: 832 }); }

// ---------- quiver: (x, y) = mouth centre, body along +y. o: {rot, s, open 0..1 (flap), n (arrows inside), glint} ----------
function an83Quiver(ctx, x, y, o = {}) {
  const s = o.s || 1, op = K.clamp(o.open || 0), n = o.n ?? 6;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  if (op > 0.25 && n > 0) for (let i = 0; i < Math.min(n, 6); i++) { const ax = -12 + i * 5, top = -22 - (i % 2) * 8; seg(ctx, ax, 6, ax, top + 8, 4, AN83_SHAFT, 2); shape(ctx, an83Close([[ax, top + 8], [ax - 7, top + 4], [ax - 6, top - 10], [ax, top - 4], [ax + 6, top - 10], [ax + 7, top + 4]]), C.red, { lw: 2.5, seed: 840 + i }); }
  shape(ctx, an83Close([[-18, 0], [18, 0], [15, 108], [8, 118], [-8, 118], [-15, 108]]), AN83_QUIV, { lw: 5, seed: 841, dot: AN83_QUIVD, pitch: 8, rad: 0.25, da: 0.5 });
  for (const by of [14, 92]) seg(ctx, -16, by, 16, by, 8, C.yellow, 2.5);
  ctx.save(); ctx.translate(18, -2); ctx.rotate(-2.3 * op); shape(ctx, an83Close([[-38, 2], [-36, -10], [-19, -18], [-2, -10], [0, 2]]), AN83_LEATHER, { lw: 4, seed: 842, dot: AN83_LEATHERD, pitch: 7, rad: 0.25, da: 0.5 }); ctx.restore();
  ctx.restore();
}

// ---------- gold arrow: (x, y) = head tip, ang = pointing direction. o: {s, len 120, glint 0..1, plain (no gold)} ----------
function an83Arrow(ctx, x, y, ang, o = {}) {
  const s = o.s || 1, L = o.len || 120;
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  seg(ctx, -L, 0, -18, 0, 6, AN83_SHAFT, 2.5);
  for (const sd of [-1, 1]) shape(ctx, an83Close([[-L + 2, 0], [-L + 28, 0], [-L + 22, sd * 4], [-L - 2, sd * 11]]), C.red, { lw: 2.5, seed: 850 });
  const hd = an83Close([[0, 0], [-26, -8], [-20, 0], [-26, 8]]);
  shape(ctx, hd, o.plain ? STONE : C.yellow, { lw: 3, seed: 851, dot: o.plain ? STONED : C.red, pitch: 5, rad: 0.22, da: 0.6 });
  if (!o.plain) seg(ctx, -5, -1, -20, -5, 2.5, C.white, 0);
  ctx.restore();
  if (o.glint > 0) { const k = Math.sin(Math.PI * K.clamp(o.glint)); if (k > 0.05) star(ctx, x - Math.cos(ang) * 10 * s, y - Math.sin(ang) * 10 * s, 15 * s * k, C.white, o.glint * 2); }
}
// bundle of n arrows tied at (x, y), heads up (ang -PI/2 + rot). o: {s, rot, spread, glints: fn(i) -> 0..1}
function an83Bundle(ctx, x, y, n, o = {}) {
  const s = o.s || 1, k = Math.min(Math.max(0, Math.round(n)), 7), base = -Math.PI / 2 + (o.rot || 0), spr = o.spread ?? 0.34;
  if (k <= 0) return;
  for (let i = 0; i < k; i++) { const a = base + (k > 1 ? (i / (k - 1) - 0.5) * spr * Math.min(1, k / 5) : 0), tip = [x + Math.cos(a) * 62 * s, y + Math.sin(a) * 62 * s];
    an83Arrow(ctx, tip[0], tip[1], a, { s: s * 0.95, glint: o.glints ? o.glints(i) : 0 }); }
  ctx.save(); ctx.translate(x, y); ctx.rotate(base + Math.PI / 2); shape(ctx, an83Close([[-12 * s, -6 * s], [12 * s, -6 * s], [12 * s, 5 * s], [-12 * s, 5 * s]]), C.red, { lw: 3, seed: 852 }); ctx.restore();
}
// bow: grip at (x, y), stave along the local y axis (150 long), belly toward +x. o: {s, pull (string drawn back toward -x)}
function an83Bow(ctx, x, y, rot, o = {}) {
  const s = o.s || 1, pl = o.pull || 0;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineCap = 'round';
  ctx.strokeStyle = C.black; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(4, -72); ctx.lineTo(-pl, 0); ctx.lineTo(4, 72); ctx.stroke();
  const arc = () => { ctx.beginPath(); ctx.moveTo(2, -75); ctx.quadraticCurveTo(34, -38, 24, 0); ctx.quadraticCurveTo(34, 38, 2, 75); };
  arc(); ctx.lineWidth = 15; ctx.strokeStyle = C.black; ctx.stroke(); arc(); ctx.lineWidth = 8; ctx.strokeStyle = '#8a501a'; ctx.stroke();
  seg(ctx, 20, -10, 28, 10, 10, C.red, 2.5);
  ctx.restore();
}
// purse (drawstring pouch): (x, y) = neck; hangs along +y rotated by rot. o: {open, s}
function an83Purse(ctx, x, y, rot = 0, o = {}) {
  const s = o.s || 1; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  shape(ctx, an83Close([[-8, 0], [8, 0], [22, 18], [26, 38], [16, 50], [-16, 50], [-26, 38], [-22, 18]]), '#c8481a', { lw: 4, seed: 860, dot: '#7a2410', pitch: 7, rad: 0.25, da: 0.5 });
  seg(ctx, -11, 6, 11, 6, 6, C.yellow, 2.5); if (o.open) shape(ctx, ell(0, -2, 11 * o.open, 4, 12), C.black, { lw: 2 });
  ctx.restore();
}
// coin (icon or falling piece)
function an83Coin(ctx, x, y, r, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(Math.max(0.15, Math.abs(Math.cos(rot))), 1); shape(ctx, ell(0, 0, r, r, 20), C.yellow, { lw: Math.max(2.5, r * 0.12), seed: 861, dot: C.red, pitch: 6, rad: 0.2, da: 0.45 }); ctx.lineWidth = Math.max(2, r * 0.08); ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(0, 0, r * 0.62, 0, 7); ctx.stroke(); ctx.restore(); }
// bread loaf
function an83Bread(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, an83Close([[-26, 6], [-22, -8], [-8, -14], [10, -14], [24, -6], [26, 6]]), '#e8a040', { lw: 4, seed: 862, dot: '#a8601a', pitch: 6, rad: 0.25, da: 0.5 }); for (const k of [-10, 2, 14]) seg(ctx, k - 3, -10, k + 3, -3, 2.5, '#7a4212', 0); ctx.restore(); }
// tick and cross marks (icons), p 0..1 draws them on
function an83Tick(ctx, x, y, s, p) { if (p <= 0) return; const pts = [[x - 26 * s, y], [x - 6 * s, y + 22 * s], [x + 30 * s, y - 26 * s]], u = K.clamp(p) * 2; ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  for (const [w, c] of [[22 * s, C.black], [12 * s, '#2fa84a']]) { ctx.lineWidth = w; ctx.strokeStyle = c; ctx.beginPath(); ctx.moveTo(...pts[0]); const a = Math.min(1, u); ctx.lineTo(K.lerp(pts[0][0], pts[1][0], a), K.lerp(pts[0][1], pts[1][1], a)); if (u > 1) ctx.lineTo(K.lerp(pts[1][0], pts[2][0], u - 1), K.lerp(pts[1][1], pts[2][1], u - 1)); ctx.stroke(); } ctx.restore(); }
function an83Cross(ctx, x, y, s, p) { if (p <= 0) return; const u = K.clamp(p) * 2; ctx.save(); ctx.lineCap = 'round';
  for (const [w, c] of [[22 * s, C.black], [12 * s, C.red]]) { ctx.lineWidth = w; ctx.strokeStyle = c; ctx.beginPath(); const a = Math.min(1, u); ctx.moveTo(x - 30 * s, y - 30 * s); ctx.lineTo(x - 30 * s + 60 * s * a, y - 30 * s + 60 * s * a); if (u > 1) { ctx.moveTo(x + 30 * s, y - 30 * s); ctx.lineTo(x + 30 * s - 60 * s * (u - 1), y - 30 * s + 60 * s * (u - 1)); } ctx.stroke(); } ctx.restore(); }
// round icon badge (white disc, black ring) for sky icons
function an83Badge(ctx, x, y, r, p, fill = C.white) { const k = K.ease.back(K.clamp(p)); if (k <= 0) return false; ctx.save(); ctx.translate(x, y); ctx.scale(k, k); shape(ctx, ell(0, 0, r, r, 28), fill, { lw: 7, seed: 863, dot: C.blue, pitch: 10, rad: 0.18, da: 0.25 }); ctx.restore(); return true; }
// open hand icon
function an83HandIcon(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (let i = 0; i < 4; i++) seg(ctx, -15 + i * 10, -8, -18 + i * 12, -36 + Math.abs(i - 1.5) * 4, 9, C.white, 3); seg(ctx, 16, 4, 30, -10, 9, C.white, 3); shape(ctx, ell(0, 4, 18, 16, 16), C.white, { lw: 3.5, seed: 864, dot: C.skin, pitch: 5, rad: 0.3 }); ctx.restore(); }
// plain robe icon
function an83RobeIcon(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, an83Close([[-20, -40], [20, -40], [44, -28], [36, -8], [26, -14], [30, 44], [-30, 44], [-26, -14], [-36, -8], [-44, -28]]), CREAM, { lw: 5, seed: 865, dot: SAND, pitch: 8, rad: 0.25, da: 0.5 }); seg(ctx, -26, 6, 26, 6, 8, C.yellow, 2.5); ctx.restore(); }
// two attendant heads icon
function an83PeopleIcon(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (const [dx, hc] of [[-20, C.white], [20, C.red]]) { shape(ctx, an83Close([[dx - 18, 40], [dx - 16, 14], [dx + 16, 14], [dx + 18, 40]]), CREAM, { lw: 4, seed: 866 }); shape(ctx, ell(dx, -4, 16, 17, 16), C.white, { lw: 4, seed: 867, dot: C.skin, pitch: 5, rad: 0.3 }); shape(ctx, an83Close([[dx - 18, -6], [dx - 16, -20], [dx, -26], [dx + 16, -20], [dx + 18, -6], [dx, -14]]), hc, { lw: 3.5, seed: 868 }); } ctx.restore(); }
// scroll unrolling: (x, y) centre, w full width, p 0..1 unroll, lines 0..1 drawn
function an83Scroll(ctx, x, y, w, p, lines) {
  const hw = Math.max(10, w / 2 * K.ease.out(K.clamp(p))), h = 110;
  shape(ctx, an83Close([[x - hw, y - h / 2], [x + hw, y - h / 2], [x + hw, y + h / 2], [x - hw, y + h / 2]]), C.white, { lw: 5, seed: 870, dot: '#e8d8a8', pitch: 9, rad: 0.25, da: 0.5 });
  ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = C.blue; ctx.lineCap = 'round';
  for (let k = 0; k < 3; k++) { const u = K.clamp(lines * 3 - k); if (u <= 0) continue; ctx.beginPath(); const x0 = x - hw + 22, x1 = K.lerp(x0, x + hw - 22, u), yy = y - 28 + k * 28; for (let xx = x0; xx <= x1; xx += 4) ctx.lineTo(xx, yy + 4 * Math.sin((xx - x0) * 0.12)); ctx.stroke(); }
  ctx.restore();
  for (const sd of [-1, 1]) shape(ctx, an83Close([[x + sd * hw - 10, y - h / 2 - 10], [x + sd * hw + 10, y - h / 2 - 10], [x + sd * hw + 10, y + h / 2 + 10], [x + sd * hw - 10, y + h / 2 + 10]]), '#e8b25a', { lw: 4.5, seed: 871 });
}
// question-mark balloon that forms and pops: p 0..1 grows, pop 0..1 bursts
function an83QBalloon(ctx, x, y, p, pop, tail) {
  if (pop >= 1 || p <= 0) return;
  if (pop > 0) { for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2, r = 30 + 50 * pop; seg(ctx, x + Math.cos(a) * r, y + Math.sin(a) * r, x + Math.cos(a) * (r + 18), y + Math.sin(a) * (r + 18), 6, C.white, 2.5); } return; }
  const k = K.ease.back(K.clamp(p)) * 0.9; ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  shape(ctx, an83Close([[-14, 40], [tail[0] - x, tail[1] - y], [10, 44]]), C.white, { lw: 4, seed: 872 }); shape(ctx, ell(0, 0, 52, 46, 26), C.white, { lw: 6, seed: 873 });
  ctx.font = `64px ${BF}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = C.red; ctx.lineWidth = 5; ctx.strokeStyle = C.black; ctx.strokeText('?', 0, 4); ctx.fillText('?', 0, 4);
  ctx.restore();
}

// ---------- inset circle: iris open p 0..1, rim colour, inside(ctx) drawn in its own 2r x 2r space (origin top-left) ----------
function an83Inset(ctx, cx, cy, r, p, rim, inside, bg = '#fff3c8') {
  if (p <= 0.001) return; const rr = r * K.ease.out(K.clamp(p));
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, rr + 12, 0, 7); ctx.fillStyle = C.black; ctx.fill();
  ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 7); ctx.fillStyle = bg; ctx.fill(); ctx.clip();
  ctx.translate(cx - r, cy - r); inside(ctx); ctx.restore();
  ctx.save(); ctx.lineWidth = 10; ctx.strokeStyle = rim; ctx.setLineDash([16, 12]); ctx.beginPath(); ctx.arc(cx, cy, rr + 6, 0, 7); ctx.stroke(); ctx.restore();
}

// ---------- effects ----------
// heat shimmer: wavy rising strokes over the ground between x0 and x1 (world), strength a
function an83Heat(ctx, x0, x1, y, t, a = 1) {
  if (a <= 0) return; ctx.save(); ctx.lineCap = 'round'; ctx.lineWidth = 4; const r = K.rng(83);
  for (let x = x0; x < x1; x += 90) { const ph = r(), u = (t * 0.45 + ph) % 1, yy = y - u * 220, al = Math.sin(Math.PI * u) * 0.45 * a; if (al <= 0.01) continue;
    ctx.globalAlpha = al; ctx.strokeStyle = C.white; ctx.beginPath(); for (let k = 0; k <= 10; k++) { const py = yy - k * 7; ctx.lineTo(x + r() * 0 + 7 * Math.sin(k * 0.9 + t * 5 + ph * 9), py); } ctx.stroke(); }
  ctx.restore();
}
// gold glow: halftone disc, rays turning, star glints. p 0..1 strength
function an83Glow(ctx, x, y, r, t, p = 1) {
  if (p <= 0.01) return; ctx.save(); ctx.globalAlpha *= K.clamp(p);
  ctx.save(); ctx.globalAlpha *= 0.55; ctx.fillStyle = dotPat(ctx, C.yellow, 10, 0.42); ctx.beginPath(); ctx.arc(x, y, r * 0.55, 0, 7); ctx.fill(); ctx.restore();
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + t * 0.35, l0 = r * 0.3, l1 = r * (0.8 + 0.2 * Math.sin(t * 3 + i * 1.3)) * K.clamp(p * 1.2);
    shape(ctx, an83Close([[x + Math.cos(a - 0.05) * l0, y + Math.sin(a - 0.05) * l0], [x + Math.cos(a - 0.1) * l1, y + Math.sin(a - 0.1) * l1], [x + Math.cos(a + 0.1) * l1, y + Math.sin(a + 0.1) * l1], [x + Math.cos(a + 0.05) * l0, y + Math.sin(a + 0.05) * l0]]), C.yellow, { lw: 3.5, seed: 880 + i }); }
  [[-0.35, 0, -0.3], [0.4, 0.33, -0.2], [0.1, 0.66, 0.35]].forEach(([dx, ph, dy]) => { const k = Math.sin(Math.PI * ((t * 0.9 + ph) % 1)); if (k > 0.3) star(ctx, x + dx * r, y + dy * r, 13 * k * r / 120, C.white); });
  ctx.restore();
}
// soft ground shadow ellipse (late light: stretched to the right)
function an83Shadow(ctx, x, y, w, k = 0) { ctx.save(); ctx.globalAlpha = 0.22; ctx.fillStyle = '#7a4212'; ctx.beginPath(); ctx.ellipse(x + w * 0.9 * k, y + 2, w * (0.55 + 1.3 * k), 9, 0, 0, 7); ctx.fill(); ctx.restore(); }
// crossed spears silhouette (verse insets): x, ground y, s
function an83Spears(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (const a of [-0.35, 0.35]) { ctx.save(); ctx.rotate(a); seg(ctx, 0, 0, 0, -120, 6, C.black, 0); shape(ctx, an83Close([[0, -140], [-8, -118], [8, -118]]), C.black, { lw: 2 }); ctx.restore(); } ctx.restore(); }
