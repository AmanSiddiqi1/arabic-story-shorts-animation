// ===== KD-022 The Ignorant Physician: parts (helpers, people wrappers, props, effects, sets) =====
// World 1000 x 1230, ground / floor y 900. Every frame is a pure function of t. Story names are prefixed K22 / k22.
const K22W = 1000, K22H = 1230, K22GR = 900, K22DUR = 174.9;   // narration 171.487 + 3.4 s THE END hold (plan)
const K22PURP = '#6a3a8a', K22PURPD = '#3e1f58', K22BRASS = '#d9a441', K22BRASSD = '#8a5a12';
const K22S = 1.35;

// ---------- small maths ----------
const k22e = (t, a, d, e = 'inOut') => K.ease[e](K.clamp((t - a) / d));
const k22in = (t, a, b) => t >= a && t < b;
const k22lp = (a, b, f) => (Array.isArray(a) ? a.map((v, i) => K.lerp(v, b[i], f)) : K.lerp(a, b, f));
function k22kv(t, keys, e = 'inOut') {   // keys [[t, value or [x, y]], ...]: eased holds between keys
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) if (t <= keys[i][0]) { const [t0, a] = keys[i - 1], [t1, b] = keys[i]; return k22lp(a, b, K.ease[e](K.clamp((t - t0) / Math.max(1e-6, t1 - t0)))); }
  return keys[keys.length - 1][1];
}
const k22tap = (t, list, d = 0.22) => { let v = 0; for (const a of list) if (t >= a && t < a + d) v = Math.max(v, Math.sin(Math.PI * (t - a) / d)); return v; };
const k22sac = (t, list) => { let g = list[0][1]; for (const [a, v] of list) if (t >= a) g = v; return g; };   // 2-frame snaps: hold, then jump

// ---------- person geometry (mirrors cast/people.js personCostumed) ----------
function k22age(P) { return P.age ?? (COSTUME[P.costume] || {}).age ?? 0.3; }
function k22off(P) {
  const sit = P.sit || 0, kn = P.kneel || 0, sh = P.seat === 'floor' ? [0, -24] : [-22, -52];
  let h = [K.lerp(0, sh[0], sit), K.lerp(-75, sh[1], sit)]; h = [K.lerp(h[0], -4, kn), K.lerp(h[1], -48, kn)]; return [h[0], h[1] + 75];
}
// upper-body local point (feet at 0,0, +x = facing side) -> world, including the acting tip / squash about the feet
function k22L2W(P, q) {
  const s = P.s || 1, dir = P.dir || 1, off = k22off(P), le = (P.lean || 0) + k22age(P) * 0.12, c = Math.cos(le), n = Math.sin(le), y0 = q[1] + 75;
  let wx = dir * s * (q[0] * c - y0 * n + off[0]), wy = s * (q[0] * n + y0 * c - 75 + off[1]);
  const sq = P.sq ?? 1, tip = (P.tip || 0) * Math.sign(dir); wx *= 1 + (1 - sq) * 0.7; wy *= sq;
  return [P.x + wx * Math.cos(tip) - wy * Math.sin(tip), P.y + wx * Math.sin(tip) + wy * Math.cos(tip)];
}
const k22hdY = (P) => -195 + (P.drop || 0) + k22age(P) * 6;
const k22head = (P) => (P.lie ? k22lieW(P, [(P.look || 0) * 4, k22hdY(P)]) : k22L2W(P, [(P.look || 0) * 4, k22hdY(P)]));
// lying figure (lie 0..1): local point -> world (no lean, no sit)
function k22lieW(P, q) {
  const s = P.s || 1, dir = P.dir || 1, lie = P.lie || 0, th = -Math.PI / 2 * lie, c = Math.cos(th), n = Math.sin(th), y0 = q[1] + 75;
  const lx = q[0] * c - y0 * n, ly = q[0] * n + y0 * c - 75 + 41 * lie; return [P.x + dir * s * lx, P.y + s * ly];
}
// transform into head-local space (head centre at 0,0, figure units) for face overlays and the quack's turban
function k22headXf(ctx, P) {
  const s = P.s || 1, dir = P.dir || 1, sq = P.sq ?? 1, tip = (P.tip || 0) * Math.sign(dir), hx = (P.look || 0) * 4, hy = k22hdY(P);
  ctx.translate(P.x, P.y); if (tip) ctx.rotate(tip); if (sq !== 1) ctx.scale(1 + (1 - sq) * 0.7, sq); ctx.scale(dir * s, s);
  if (P.lie) { const lie = P.lie; ctx.translate(0, 41 * lie); ctx.translate(0, -75); ctx.rotate(-Math.PI / 2 * lie); ctx.translate(0, 75); ctx.translate(hx, hy); ctx.rotate((P.tilt || 0) + 0.35 * lie); return; }
  const off = k22off(P), le = (P.lean || 0) + k22age(P) * 0.12; ctx.translate(off[0], off[1]); ctx.translate(0, -75); ctx.rotate(le); ctx.translate(0, 75);
  ctx.translate(hx, hy); ctx.rotate(P.tilt || 0);
}
// face overlays in head-local space: flush (anger, climbing red dots), green (poison / illness), sweat, tear (0..1 progress), mouthLine
function k22faceFx(ctx, o) {
  // v2: emotion colour goes UNDER the features: multiply (black lines stay black), the eyes cut out, capped alpha, never above the brow line
  if (o.flush > 0 || o.green > 0) { const lk = (o.look || 0) * 3, ew = o.wide ? 16 : 13, eh = o.wide ? 19 : 15;
    ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, 34, 35, 0, 0, Math.PI * 2); for (const sd of [-1, 1]) { ctx.moveTo(sd * 13 + lk + ew, -4); ctx.ellipse(sd * 13 + lk, -4, ew, eh, 0, 0, Math.PI * 2); } ctx.clip('evenodd');
    ctx.globalCompositeOperation = 'multiply';
    for (const [v, col, a] of [[o.flush, C.red, 0.45], [o.green, GREEN, 0.5]]) { if (!(v > 0)) continue; const top = K.lerp(37, -22, v);
      ctx.globalAlpha = a; ctx.fillStyle = dotPat(ctx, col, 7, 0.42); ctx.fillRect(-40, top, 80, 80);
      ctx.globalAlpha = Math.min(0.6, a + 0.15) * K.clamp(v * 1.5); for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(sd * 22, 13, 12, 0, Math.PI * 2); ctx.fill(); } }
    ctx.restore(); }
  if (o.pale > 0) { ctx.save(); K.poly(ctx, ell(0, 0, 35, 36, 36), true); ctx.clip(); ctx.globalAlpha = 0.5 * o.pale; ctx.fillStyle = dotPat(ctx, GREEN, 8, 0.32); for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(sd * 21, 12, 12, 0, 7); ctx.fill(); } ctx.restore(); }
  const drop = (x, y, r, col) => { ctx.save(); ctx.fillStyle = col; ctx.strokeStyle = C.black; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y - r * 1.9); ctx.quadraticCurveTo(x + r, y - r * 0.4, x + r, y + r * 0.2); ctx.arc(x, y + r * 0.2, r, 0, Math.PI); ctx.quadraticCurveTo(x - r, y - r * 0.4, x, y - r * 1.9); ctx.fill(); ctx.stroke(); ctx.restore(); };
  if (o.sweat > 0) for (let i = 0; i < Math.ceil(o.sweat); i++) { const ph = ((o.t || 0) * 0.7 + i * 0.37) % 1; drop(32 + i * 6 - i * i * 8, -26 + i * 18 + ph * 22, 5, '#bfe0ff'); }
  if (o.tear != null && o.tear > 0 && o.tear < 1) { const u = o.tear; drop((o.tearX ?? -15) - 2 * u, 4 + 52 * u, 5.5, TEAR); }
  if (o.dots) { ctx.save(); ctx.fillStyle = C.black; for (let i = 0; i < 3; i++) { const k = K.clamp(o.dots * 3 - i); if (k <= 0) continue; ctx.beginPath(); ctx.arc(34 + i * 16, -60 - i * 18, 4 + i * 1.5, 0, 7); ctx.fill(); } ctx.restore(); }
}

// ---------- the cast ----------
const K22DOC = { costume: 'physician', pal: { robe: C.blue, dot: '#9fc0ff', sash: C.yellow } };
const K22QPAL = { robe: C.yellow, dot: C.red, sash: C.black, len: 'long', sleeveLen: 'long', apron: false, head: 'none', pants: C.yellow };
// the quack's oversized red turban: drawn in head-local space (centre of the band at x, y), or on its own as a rolling prop
function k22turban(ctx, x, y, o = {}) {
  ctx.save(); ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot); if (o.s) ctx.scale(o.s, o.s);
  shape(ctx, ell(0, -10, 58, 36, 34), C.red, { lw: 5, seed: 81, dot: '#a8160f', pitch: 7, rad: 0.24, da: 0.55 });
  ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; for (const k of [0, 1, 2]) { ctx.beginPath(); ctx.ellipse(0, 4 - k * 13, 52 - k * 9, 11, -0.14, 0.15, Math.PI - 0.35); ctx.stroke(); } ctx.restore();
  shape(ctx, PEOPLE.close([[8, -36], [22, -58], [30, -54], [18, -36]]), C.white, { lw: 3, seed: 83 });
  shape(ctx, ell(14, -14, 9, 10, 12), C.yellow, { lw: 3, seed: 82 }); ctx.restore();
}
// draws a person and the face overlays; o: flush, green, pale, sweat, tear, dots, t (sweat phase)
function k22person(ctx, P, o = {}) {
  person(ctx, P); if (!o.flush && !o.green && !o.pale && !o.sweat && !(o.tear > 0) && !o.dots) return;
  ctx.save(); k22headXf(ctx, P); k22faceFx(ctx, { ...o, look: P.look, wide: P.eyes === 'wide' }); ctx.restore();
}
// the ignorant man: beanSeller body (no beard, moustache) in yellow; the turban is his own drawable (o.slip covers the eyes, o.trot lags)
function k22quack(ctx, P, o = {}) {
  const Q = { ...P, costume: 'beanSeller', pal: K22QPAL, age: 0.3 };
  person(ctx, Q); ctx.save(); k22headXf(ctx, Q); k22faceFx(ctx, { ...o, look: Q.look, wide: Q.eyes === 'wide' });
  if (!o.noTurban) k22turban(ctx, 2 + (o.tx || 0), -36 + (o.slip || 0), { rot: o.trot || 0 }); ctx.restore();
}

// ---------- props ----------
const K22JARCOL = { yellow: C.yellow, blue: '#3f7be6', white: C.white, green: GREEN2, brown: '#c98a3a', red: C.red, ochre: '#e8742a', pink: '#f4a6c0' };
// medicineJar: 70 x 100 at s 1, base centre at (x, y). o: col, mark ('leaf' | 'drop' | 'dot' | 'X'), lid colour, lidOff, rot, glow 0..1, s, seed, squig
function k22jar(ctx, x, y, o = {}) {
  const s = o.s ?? 1, col = K22JARCOL[o.col] || o.col || C.yellow;
  ctx.save(); ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot); ctx.scale(s, s);
  if (o.rot) ctx.translate(0, -50), ctx.rotate(0), ctx.translate(0, 50);
  shape(ctx, [[-27, -80], [27, -80], [35, -64], [35, -8], [27, 0], [-27, 0], [-35, -8], [-35, -64]], col, { lw: 4.5, seed: o.seed || 90, dot: col === C.white ? '#b9b4c6' : 'rgba(20,20,20,0.35)', pitch: 7, rad: 0.22, da: 0.35 });
  const lo = o.lidOff || 0; shape(ctx, K.rectPts(-23 + lo * 0.3, -96 - lo, 46, 16), o.lid || (o.mark === 'X' ? C.black : '#8a501a'), { lw: 4, seed: (o.seed || 90) + 1 });
  shape(ctx, K.rectPts(-22, -64, 44, 38), C.white, { lw: 3, seed: (o.seed || 90) + 2 });
  ctx.save(); ctx.lineWidth = 2.5; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; const r = K.rng(o.seed || 90);
  if (!o.mark) for (let k = 0; k < 3; k++) { const yy = -55 + k * 10; ctx.beginPath(); ctx.moveTo(-16, yy); for (let xx = -16; xx <= 14; xx += 5) ctx.lineTo(xx, yy + (r() - 0.5) * 6); ctx.stroke(); }
  else { ctx.beginPath(); ctx.moveTo(-17, -32); for (let xx = -17; xx <= 15; xx += 5) ctx.lineTo(xx, -32 + (r() - 0.5) * 5); ctx.stroke(); }
  ctx.restore();
  if (o.mark) k22mark(ctx, 0, -50, o.mark, 1, o.markPulse || 0);
  if (o.glow > 0) k22glint(ctx, 22, -70, 18 * o.glow);
  ctx.restore();
}
function k22mark(ctx, x, y, m, s = 1, pul = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * (1 + 0.35 * pul), s * (1 + 0.35 * pul));
  if (m === 'leaf') { shape(ctx, [[-12, 6], [-4, -6], [8, -10], [12, -6], [4, 6], [-8, 9]], GREEN2, { lw: 2.5, seed: 70 }); seg(ctx, -11, 7, 9, -7, 1.2, C.black, 0); }
  else if (m === 'drop') { ctx.fillStyle = '#3f7be6'; ctx.strokeStyle = C.black; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(0, -12); ctx.quadraticCurveTo(10, 0, 9, 4); ctx.arc(0, 4, 9, 0, Math.PI); ctx.quadraticCurveTo(-10, 0, 0, -12); ctx.fill(); ctx.stroke(); }
  else if (m === 'dot') { ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(0, 0, 7, 0, 7); ctx.fill(); }
  else if (m === 'X') { ctx.lineWidth = 6; ctx.strokeStyle = pul > 0 ? C.red : C.black; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-10, -10); ctx.lineTo(10, 10); ctx.moveTo(10, -10); ctx.lineTo(-10, 10); ctx.stroke(); }
  ctx.restore();
}
function k22glint(ctx, x, y, r) { if (r <= 0) return; ctx.save(); ctx.translate(x, y); ctx.fillStyle = C.white; ctx.strokeStyle = C.black; ctx.lineWidth = 2.5; ctx.beginPath();
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, rr = i % 2 ? r * 0.3 : r; ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); }
// mortar 120 x 70 (base centre x, y); o: mix colour, level 0..1, pest angle (radians from vertical), pestOut (pestle lifted), specks
function k22mortar(ctx, x, y, o = {}) {
  const s = o.s ?? 1; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const pa = o.pest ?? 0.5; if (!o.noPestle) { const bx = Math.sin(pa) * 18, by = -40 - (o.pestOut || 0); seg(ctx, bx, by, bx + Math.sin(pa) * 90, by - Math.cos(pa) * 90, 13, C.white, 4); }
  shape(ctx, [[-60, -66], [60, -66], [54, -36], [38, -10], [26, 0], [-26, 0], [-38, -10], [-54, -36]], C.white, { lw: 5, seed: 95, dot: C.blue, pitch: 7, rad: 0.28, da: 0.6 });
  if (o.level > 0) { const mc = o.mix || C.yellow; shape(ctx, ell(0, -64, 54 * (0.7 + 0.3 * o.level), 9, 20), mc, { lw: 3, seed: 96 });
    if (o.specks) { ctx.fillStyle = C.red; const r = K.rng(5); for (let i = 0; i < 9 * o.specks; i++) { ctx.beginPath(); ctx.arc((r() - 0.5) * 70, -64 + (r() - 0.5) * 9, 2.5, 0, 7); ctx.fill(); } } }
  ctx.restore();
}
// the small bowl (about 64 wide), centre of the rim at (x, y). o: level 0..1, rot, bubble 0..1 (swell; > 1 popped), s
function k22bowl(ctx, x, y, o = {}) {
  const s = o.s ?? 1; ctx.save(); ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot); ctx.scale(s, s);
  shape(ctx, [[-32, 0], [32, 0], [26, 18], [12, 28], [-12, 28], [-26, 18]], C.yellow, { lw: 4.5, seed: 97, dot: C.red, pitch: 6, rad: 0.25, da: 0.4 });
  const lv = o.level ?? 1; if (lv > 0.02) { const top = 2 + (1 - lv) * 18, hw = 30 - (1 - lv) * 10; shape(ctx, ell(0, top, hw, 5, 16), K22PURP, { lw: 2.5, seed: 98 });
    ctx.fillStyle = C.red; for (const [dx, dy] of [[-12, 0], [6, 1], [15, -1], [-3, -1]]) { if (Math.abs(dx) < hw - 4) { ctx.beginPath(); ctx.arc(dx, top + dy, 2, 0, 7); ctx.fill(); } }
    if (o.bubble > 0 && o.bubble < 1) { const r = 3 + 6 * o.bubble; ctx.fillStyle = C.red; ctx.strokeStyle = C.black; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(8, top - r * 0.6, r, Math.PI, 0); ctx.closePath(); ctx.fill(); ctx.stroke(); } }
  ctx.restore();
}
function k22coins(ctx, x, y, n, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const cols = [0, -1, 1, 0, -2, 2, -1, 1, 0, 0, -1, 1];
  for (let i = 0; i < n; i++) { const row = i < 5 ? 0 : i < 9 ? 1 : i < 12 ? 2 : 3, k = i < 5 ? i - 2 : i < 9 ? i - 6.5 : i < 12 ? i - 10 : 0; shape(ctx, ell(k * 34, -10 - row * 20, 22, 9, 16), C.yellow, { lw: 3.5, seed: 120 + i }); }
  ctx.restore();
}
function k22crown(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-40, 0], [-44, -44], [-20, -18], [0, -54], [20, -18], [44, -44], [40, 0]], C.yellow, { lw: 5, seed: 125, dot: C.red, pitch: 7, rad: 0.2, da: 0.5 });
  for (const [jx, jy] of [[0, -54], [-44, -44], [44, -44]]) shape(ctx, ell(jx, jy, 7, 7, 10), C.red, { lw: 2.5, seed: 126 }); ctx.restore(); }
function k22star(ctx, x, y, r, col = C.yellow) { const pts = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; pts.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr]); } shape(ctx, PEOPLE.close(pts), col, { lw: 4, seed: 127 }); }
// the walking stick: from the hand (world) to the tip (world)
function k22stick(ctx, h, tip) { seg(ctx, h[0], h[1] - 14, tip[0], tip[1], 11, '#c58a18', 4); shape(ctx, ell(h[0], h[1], 12, 12, 12), C.white, { lw: 3.5, seed: 5, dot: C.skin, pitch: 5, rad: 0.3 }); }
// oil lamp on a wall bracket (x, y = base of the lamp). flame 0..1; smoke 0..1 progress of the wisp after it goes out
function k22lamp(ctx, x, y, t, flame, smoke = 0) {
  if (flame > 0.05) { ctx.save(); ctx.globalAlpha = 0.28 * flame; ctx.fillStyle = dotPat(ctx, C.yellow, 12, 0.38); ctx.beginPath(); ctx.arc(x + 20, y - 40, 170 * (0.6 + 0.4 * flame), 0, 7); ctx.fill(); ctx.restore(); }
  shape(ctx, K.rectPts(x - 60, y, 120, 14), WOOD, { lw: 4, seed: 130 }); seg(ctx, x - 40, y + 14, x - 20, y + 50, 7, WOOD, 3);
  shape(ctx, [[x - 34, y], [x - 40, y - 18], [x - 24, y - 30], [x + 20, y - 30], [x + 46, y - 34], [x + 40, y - 22], [x + 26, y - 14], [x + 22, y]], K22BRASS, { lw: 4, seed: 131, dot: K22BRASSD, pitch: 6, rad: 0.25, da: 0.5 });
  shape(ctx, ell(x - 6, y - 32, 12, 6, 12), K22BRASSD, { lw: 3, seed: 132 });
  if (flame > 0.02) { const fl = flame * (1 + 0.12 * Math.sin(t * 17.3) + 0.08 * Math.sin(t * 9.1)), fx = x + 44 + Math.sin(t * 11) * 2 * flame, fy = y - 36;
    ctx.save(); ctx.fillStyle = C.yellow; ctx.strokeStyle = C.black; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(fx, fy - 30 * fl); ctx.quadraticCurveTo(fx + 11 * fl, fy - 8 * fl, fx, fy); ctx.quadraticCurveTo(fx - 11 * fl, fy - 8 * fl, fx, fy - 30 * fl); ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.red; ctx.beginPath(); ctx.ellipse(fx, fy - 7 * fl, 4 * fl, 7 * fl, 0, 0, 7); ctx.fill(); ctx.restore(); }
  if (smoke > 0 && smoke < 1) { ctx.save(); ctx.globalAlpha = 0.7 * (1 - smoke); ctx.strokeStyle = '#8c8a94'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath();
    for (let k = 0; k <= 12; k++) { const u = k / 12, yy = y - 40 - u * 140 * (0.3 + smoke), xx = x + 44 + Math.sin(u * 7 + smoke * 5) * 10 * u; k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); ctx.restore(); }
}
// painPulse: a throbbing red star of rings at (x, y); size 0..2.2, the beat rate in Hz
function k22pain(ctx, x, y, t, size, rate = 1.6, hollow = false) {   // hollow (v2, S7): rings and spikes only, no filled centre
  if (size <= 0.02) return; const ph = (t * rate) % 1, beat = Math.exp(-ph * 5);
  ctx.save(); ctx.translate(x, y); const r = 16 * size * (1 + 0.35 * beat);
  ctx.globalAlpha = 0.85; for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 + 0.2; seg(ctx, Math.cos(a) * r * 1.2, Math.sin(a) * r * 1.2, Math.cos(a) * r * (1.7 + 0.4 * beat), Math.sin(a) * r * (1.7 + 0.4 * beat), 5, C.red, 2); }
  ctx.globalAlpha = 1; if (hollow) { ctx.lineWidth = 9; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.stroke(); ctx.lineWidth = 5; ctx.strokeStyle = C.red; ctx.stroke(); }
  else shape(ctx, ell(0, 0, r, r, 18), C.red, { lw: 3.5, seed: 140, dot: '#a8160f', pitch: 6, rad: 0.3, da: 0.5 });
  ctx.globalAlpha = 0.6 * (1 - ph); ctx.lineWidth = 4; ctx.strokeStyle = C.red; ctx.beginPath(); ctx.arc(0, 0, r * (1.2 + ph * 1.6), 0, 7); ctx.stroke(); ctx.restore();
}
// blurVision: the same picture drawn twice, shifted (14 px at amount 1) at alpha 0.55, under a soft halftone veil. No canvas filters.
function k22blur(ctx, draw, amt, t, box = [0, 0, K22W, K22H]) {
  if (amt <= 0.01) { draw(ctx); return; }
  const d = 14 * amt, wob = Math.sin(t * 2.3) * 4 * amt;
  ctx.save(); ctx.globalAlpha = 0.55 + 0.45 * (1 - amt); ctx.translate(-d - wob, -d * 0.25); draw(ctx); ctx.restore();
  ctx.save(); ctx.globalAlpha = 0.55; ctx.translate(d + wob, d * 0.3); draw(ctx); ctx.restore();
  ctx.save(); ctx.globalAlpha = 0.3 * amt; ctx.fillStyle = dotPat(ctx, C.paper, 10, 0.42); ctx.fillRect(...box); ctx.restore();
}
// the eye-shaped mask of a point-of-view insert (black around a soft lens)
function k22povMask(ctx, p) {
  ctx.save(); ctx.fillStyle = C.black; ctx.beginPath(); ctx.rect(-20, -20, K22W + 40, K22H + 40); const rx = 560 * p, ry = 540 * p; ctx.ellipse(500, 600, Math.max(1, rx), Math.max(1, ry), 0, 0, Math.PI * 2, true); ctx.fill('evenodd'); ctx.restore();
}
function k22speedLines(ctx, x0, x1, y0, y1, t, dir = 1, a = 1) {
  if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; const r = K.rng(31);
  for (let i = 0; i < 7; i++) { const y = K.lerp(y0, y1, (i + 0.5) / 7) + (r() - 0.5) * 20, l = 60 + r() * 80, x = K.lerp(x0, x1, r()); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - dir * l, y); ctx.stroke(); } ctx.restore();
}
// recipe icons (the speech balloon in S2 and the strip in S6): yellow leaf jar, blue drop jar, white dot jar, mortar
const K22RECIPE = [{ col: 'yellow', mark: 'leaf' }, { col: 'blue', mark: 'drop' }, { col: 'white', mark: 'dot' }];
function k22recipeIcons(ctx, x, y, gap, s, pops) {   // pops[i] 0..1 per icon (3 jars then the mortar)
  for (let i = 0; i < 4; i++) { const k = K.ease.back(K.clamp(pops[i])); if (k <= 0) continue; ctx.save(); ctx.translate(x + i * gap, y); ctx.scale(k, k);
    if (i < 3) k22jar(ctx, 0, 40 * s, { ...K22RECIPE[i], s, seed: 150 + i }); else k22mortar(ctx, 0, 40 * s, { s: s * 0.75, level: 0 }); ctx.restore(); }
}
function k22tick(ctx, x, y, r, good) { ctx.save(); ctx.translate(x, y); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  for (const [w, col] of [[r * 0.5, C.black], [r * 0.3, good ? GREEN2 : C.red]]) { ctx.lineWidth = w; ctx.strokeStyle = col; ctx.beginPath();
    if (good) { ctx.moveTo(-r * 0.7, 0); ctx.lineTo(-r * 0.2, r * 0.55); ctx.lineTo(r * 0.8, -r * 0.6); } else { ctx.moveTo(-r * 0.6, -r * 0.6); ctx.lineTo(r * 0.6, r * 0.6); ctx.moveTo(r * 0.6, -r * 0.6); ctx.lineTo(-r * 0.6, r * 0.6); } ctx.stroke(); }
  ctx.restore(); }

// ---------- set 1: the street (Library marketStreet) + the physician's stall ----------
const K22PALACE = { x0: 600 };   // door 750..890, top 560 (marketStreet anchors)
const K22STALL = { x0: 200, x1: 560, top: 780, aw: 520, fr: 590 };
const K22STALLJARS = [[232, 'green'], [272, 'brown'], [312, 'ochre'], [452, 'blue'], [492, 'white'], [532, 'yellow']];
function k22stall(ctx, t, o = {}) {
  const S = K22STALL, c = ctx, closed = !!o.closed;
  for (const px of [S.x0 + 12, S.x1 - 12]) seg(c, px, K22GR, px, S.aw, 9, WOOD, 3.5);
  if (!closed) for (let b = 0; b < 2; b++) { const by = 690 - b * 70; seg(c, S.x0 + 26, by, S.x1 - 26, by, 9, BARKY, 3); for (let j = 0; j < 6; j++) { const jx = K.lerp(S.x0 + 50, S.x1 - 50, j / 5); k22jar(c, jx, by - 4, { col: ['brown', 'yellow', 'white', 'green', 'blue', 'ochre'][(j + b * 2) % 6], s: 0.42, seed: 200 + j + b * 7 }); } }
}
function k22stallFront(ctx, t, o = {}) {
  const S = K22STALL, c = ctx, closed = !!o.closed, cols = [C.red, C.white];
  if (!closed) for (const [jx, col] of K22STALLJARS) { if (o.hide && o.hide.includes(jx)) continue; k22jar(c, jx, S.top - 2, { col, s: 0.5, seed: 210 + jx, glow: o.glow && o.glow[jx] || 0 }); }
  shape(c, [[S.x0 + 4, S.top], [S.x1 - 4, S.top], [S.x1 - 4, K22GR], [S.x0 + 4, K22GR]], BARKY, { lw: 6, seed: 171, dot: '#7a4212', pitch: 9, rad: 0.18, da: 0.4 });
  shape(c, [[S.x0 + 4, S.top - 14], [S.x1 - 4, S.top - 14], [S.x1 - 4, S.top + 4], [S.x0 + 4, S.top + 4]], WOOD, { lw: 5, seed: 172 });
  c.save(); K.poly(c, [[S.x0 + 20, S.top + 20], [S.x1 - 20, S.top + 20], [S.x1 - 20, K22GR - 14], [S.x0 + 20, K22GR - 14]], true); c.clip(); for (let k = 0, px = S.x0 + 20; px < S.x1; px += 30, k++) { c.fillStyle = cols[k % 2]; c.fillRect(px, S.top + 20, 30, K22GR - S.top); } c.restore();
  ink(c, [[S.x0 + 20, S.top + 20], [S.x1 - 20, S.top + 20], [S.x1 - 20, K22GR - 14], [S.x0 + 20, K22GR - 14], [S.x0 + 20, S.top + 20]], 4, 173);
  const fade = o.fade || 0;   // the years fade the awning a little
  if (closed) { shape(c, [[S.x0 - 16, S.aw], [S.x1 + 16, S.aw], [S.x1 + 16, S.aw + 34], [S.x0 - 16, S.aw + 34]], C.red, { lw: 6, seed: 186 }); c.save(); c.lineWidth = 4; c.strokeStyle = C.black; for (let px = S.x0; px < S.x1; px += 30) { c.beginPath(); c.moveTo(px, S.aw + 2); c.lineTo(px + 14, S.aw + 32); c.stroke(); } c.restore();
    shape(c, K.rectPts(S.x0 + 30, S.top - 150, S.x1 - S.x0 - 60, 130), '#c9a46a', { lw: 5, seed: 187, dot: '#a8741a', pitch: 9, rad: 0.2, da: 0.4 }); for (let k = 0; k < 4; k++) seg(c, S.x0 + 34, S.top - 140 + k * 32, S.x1 - 34, S.top - 140 + k * 32, 3, '#a8741a', 1.5); return; }
  const awn = [[S.x0 - 26, S.fr], [S.x0 + 8, S.aw], [S.x1 - 8, S.aw], [S.x1 + 26, S.fr]];
  c.save(); K.poly(c, awn, true); c.clip(); for (let k = 0, px = S.x0 - 40; px < S.x1 + 40; px += 36, k++) { c.fillStyle = k % 2 ? C.white : mixHex(C.red, '#f4a6a0', fade); c.fillRect(px, S.aw - 4, 36, S.fr - S.aw + 8); } c.restore(); ink(c, PEOPLE.close(awn), 6, 188);
  for (let k = 0, px = S.x0 - 26; px < S.x1 + 26; px += 36, k++) { const sc = ell(px + 18, S.fr, 18, 16, 14).filter(([, y]) => y >= S.fr - 1); shape(c, sc, k % 2 ? C.white : mixHex(C.red, '#f4a6a0', fade), { lw: 4.5, seed: 189 }); }
}

// ---------- set 2: the medicine store (apothecary) ----------
const K22SHELF = [300, 460, 620];   // shelf board tops; the bottom one (620) is the one he can reach
const K22JX = [160, 270, 380, 490, 600, 710, 820];
const K22JARS = [   // [shelf, slot, col, mark]; recipe jars and the poison on the reachable shelf
  [0, 0, 'ochre'], [0, 1, 'green'], [0, 2, 'brown'], [0, 3, 'pink'], [0, 4, 'yellow'], [0, 5, 'blue'], [0, 6, 'white'],
  [1, 0, 'white'], [1, 1, 'brown'], [1, 2, 'blue'], [1, 3, 'green'], [1, 4, 'ochre'], [1, 5, 'yellow'], [1, 6, 'pink'],
  [2, 0, 'brown'], [2, 1, 'yellow', 'leaf'], [2, 2, 'green'], [2, 3, 'white', 'dot'], [2, 4, 'blue', 'drop'], [2, 5, 'red', 'X'], [2, 6, 'ochre'],
];
const K22POISON = [710, 620], K22BLUEJ = [600, 620], K22YELJ = [270, 620], K22GRNJ = [380, 620];
const K22TABLE = { x0: 300, x1: 700, top: 760 };
function k22storeBack(ctx) {
  ctx.drawImage(bake('k22store', K22W, K22H, (c) => {
    shape(c, K.rectPts(-10, -10, K22W + 20, K22GR + 10), '#24365f', { lw: 0, dot: '#1d5bd0', pitch: 12, rad: 0.24, da: 0.55 });
    shape(c, K.rectPts(-10, K22GR, K22W + 20, K22H - K22GR + 10), '#8a501a', { lw: 6, seed: 300, dot: '#5b3010', pitch: 11, rad: 0.2, da: 0.5 });
    c.save(); c.lineWidth = 3; c.strokeStyle = 'rgba(20,20,20,0.5)'; for (const y of [950, 1020, 1110]) { c.beginPath(); c.moveTo(0, y); c.lineTo(K22W, y); c.stroke(); } c.restore();
    seg(c, -10, 80, K22W + 10, 80, 22, WOOD, 4);   // ceiling beam
    for (const y of K22SHELF) { shape(c, K.rectPts(110, y, 780, 16), WOOD, { lw: 4.5, seed: 301 + y }); for (const bx of [140, 860]) seg(c, bx, y + 16, bx - 20, y + 50, 7, WOOD, 3); }
    // the worktable legs (top drawn in front)
    for (const lx of [K22TABLE.x0 + 26, K22TABLE.x1 - 26]) seg(c, lx, K22TABLE.top + 20, lx, K22GR + 6, 16, BARKY, 4);
  }), 0, 0, K22W, K22H);
}
function k22herbs(ctx, t, puff = 0) {
  for (const [i, hx] of [200, 400, 620, 800].entries()) { const sw = 0.05 * Math.sin(t * 1.3 + i * 1.7) + swing(t, 75.6, 0.06, 1.2, 1.5) + swing(t, 86.62, 0.18, 1.4, 1.6) * (1 - i * 0.15);
    ctx.save(); ctx.translate(hx, 90); ctx.rotate(sw); seg(ctx, 0, 0, 0, 40, 3, C.black, 0);
    for (let k = -2; k <= 2; k++) seg(ctx, k * 6, 40, k * 13, 140 - Math.abs(k) * 12, 9, [GREEN, GREEND, '#9ab84a'][(k + 5 + i) % 3], 3); shape(ctx, K.rectPts(-14, 36, 28, 12), C.red, { lw: 3, seed: 310 + i }); ctx.restore(); }
}
// jars on the shelves; o.take: {key: true} hides a jar that is in a hand; o.glow, o.hop (sneeze), o.rattle, o.poisonPulse
function k22storeJars(ctx, t, o = {}) {
  for (const [sh, sl, col, mark] of K22JARS) { const key = sh * 10 + sl; if (o.take && o.take[key]) continue;
    const x = K22JX[sl], y = K22SHELF[sh]; let dy = 0, rot = 0;
    if (o.hop) dy -= Math.abs(K.spring(t, o.hop + sl * 0.02, 8, 9, 6));
    if (sh === 0 && (sl === 2 || sl === 3)) rot = swing(t, 75.6, 0.08, 4, 3.5);
    const gl = o.glint ? Math.max(0, 1 - Math.abs(t - (o.glint[0] + (sh * 7 + sl) * o.glint[1])) / 0.18) : 0;
    k22jar(ctx, x, y + dy, { col, mark, s: 0.88, rot, seed: 400 + key, glow: Math.max(gl, (o.glow && o.glow[key]) || 0), markPulse: key === 25 ? (o.poisonPulse || 0) : 0 }); }
}
function k22table(ctx) { const T = K22TABLE; shape(ctx, K.rectPts(T.x0, T.top, T.x1 - T.x0, 22), WOOD, { lw: 5, seed: 320 }); shape(ctx, K.rectPts(T.x0 + 14, T.top + 22, T.x1 - T.x0 - 28, 60), BARKY, { lw: 5, seed: 321, dot: '#7a4212', pitch: 9, rad: 0.18, da: 0.4 }); }

// ---------- set 3: the sickroom (prince's bedchamber) ----------
const K22BED = { x0: 450, x1: 890, top: 770 };            // mattress top 770; headboard on the right
const K22PR = { x: 650, y: 770, s: 1.2, dir: -1 };        // the prince lies with his head toward +x (about 794, 729)
const K22CHEST = { x0: 170, x1: 400, top: 820, bot: 1000 };
const K22LAMP = [905, 520], K22DOOR = [40, 190, 560];
function k22roomBack(ctx, t, o = {}) {
  ctx.drawImage(bake('k22room', K22W, K22H, (c) => {
    shape(c, K.rectPts(-10, -10, K22W + 20, K22GR + 10), '#e9c98a', { lw: 0, dot: '#c9973f', pitch: 12, rad: 0.2, da: 0.5 });
    shape(c, K.rectPts(-10, 150, K22W + 20, 26), C.red, { lw: 4, seed: 330, dot: '#a8160f', pitch: 7, rad: 0.25, da: 0.5 });   // frieze
    shape(c, K.rectPts(-10, K22GR, K22W + 20, K22H - K22GR + 10), '#b0692a', { lw: 6, seed: 331, dot: '#7a4212', pitch: 11, rad: 0.2, da: 0.5 });
    shape(c, K.rectPts(230, 930, 560, 200), C.red, { lw: 5, seed: 332, dot: '#a8160f', pitch: 8, rad: 0.25, da: 0.5 });   // rug
    c.save(); c.strokeStyle = C.yellow; c.lineWidth = 6; c.strokeRect(250, 948, 520, 164); c.restore();
    townWindow(c, 560, 290, 170, 190, { arch: 'pointed', lit: 0, inside: (k) => { sky(k); } });
  }), 0, 0, K22W, K22H);
  townDoor(ctx, K22DOOR[0], K22DOOR[1], K22DOOR[2], K22GR, o.door || 0, { arch: 'pointed', inside: (k) => { k.fillStyle = '#5b3a1e'; k.fillRect(0, 0, K22W, K22H); } });
}
function k22bedBack(ctx) { const B = K22BED;   // headboard (behind the pillow)
  shape(ctx, [[B.x1 - 10, K22GR], [B.x1 - 10, 640], [B.x1 + 20, 610], [B.x1 + 50, 640], [B.x1 + 50, K22GR]], WOOD, { lw: 5, seed: 340, dot: '#7a4212', pitch: 9, rad: 0.2, da: 0.4 });
  shape(ctx, [[B.x0 - 20, K22GR], [B.x0 - 20, 735], [B.x0 + 4, 720], [B.x0 + 20, 735], [B.x0 + 20, K22GR]], WOOD, { lw: 5, seed: 341 });
  shape(ctx, ell(B.x1 - 84, B.top - 16, 60, 22, 20), C.white, { lw: 4.5, seed: 342, dot: C.blue, pitch: 7, rad: 0.22, da: 0.4 });   // pillow
}
function k22bedFront(ctx) { const B = K22BED;
  shape(ctx, K.rectPts(B.x0 - 6, B.top - 6, B.x1 - B.x0 + 12, 34), C.white, { lw: 5, seed: 343, dot: '#b9b4c6', pitch: 8, rad: 0.2, da: 0.5 });
  shape(ctx, K.rectPts(B.x0 - 10, B.top + 28, B.x1 - B.x0 + 20, 92), '#a8160f', { lw: 5, seed: 344, dot: '#7a1010', pitch: 9, rad: 0.25, da: 0.5 });
  for (let x = B.x0 + 30; x < B.x1 - 10; x += 70) shape(ctx, ell(x, B.top + 74, 14, 14, 12), C.yellow, { lw: 3, seed: 345 + x });
  for (const lx of [B.x0, B.x1]) shape(ctx, K.rectPts(lx - 12, B.top + 118, 24, K22GR - B.top - 118 + 4), WOOD, { lw: 4, seed: 346 });
}
// the blanket over the prince from the feet to the chest (cover 0..1 lifts it toward the chest when he lies still)
function k22blanket(ctx, P, cover = 0) { const s = P.s, d = P.dir || 1, xa = P.x + d * s * 92, xb = P.x - d * s * (30 + 42 * cover);
  const xL = Math.min(xa, xb), xR = Math.max(xa, xb), top = P.y - 46 * s;
  shape(ctx, [[xL, P.y + 8], [xL + 6, top + 10], [xL + 40, top], [xR - 20, top - 2], [xR, top + 10], [xR + 6, P.y + 8]], C.yellow, { lw: 5, seed: 350, dot: C.red, pitch: 9, rad: 0.25, da: 0.45 });
  ctx.save(); ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(20,20,20,0.6)'; for (let k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(K.lerp(xL, xR, k / 4), top + 6); ctx.lineTo(K.lerp(xL, xR, k / 4) - 6, P.y + 4); ctx.stroke(); } ctx.restore();
}
function k22chest(ctx) { const B = K22CHEST;
  shape(ctx, K.rectPts(B.x0, B.top, B.x1 - B.x0, B.bot - B.top), BARKY, { lw: 6, seed: 360, dot: '#7a4212', pitch: 9, rad: 0.2, da: 0.45 });
  shape(ctx, [[B.x0 - 12, B.top - 10], [B.x1 + 12, B.top - 10], [B.x1 + 6, B.top + 60], [B.x1 - 40, B.top + 80], [B.x0 + 60, B.top + 70], [B.x0 - 8, B.top + 76]], C.red, { lw: 5, seed: 361, dot: '#a8160f', pitch: 8, rad: 0.25, da: 0.5 });
  ctx.save(); ctx.strokeStyle = C.yellow; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(B.x0 + 4, B.top + 20); ctx.lineTo(B.x1 - 4, B.top + 20); ctx.stroke(); ctx.restore();
  for (const x of [B.x0 + 40, B.x1 - 40]) shape(ctx, K.rectPts(x - 14, B.top + 100, 28, 40), K22BRASS, { lw: 4, seed: 362 });
}
// grief wash over the room
function k22dim(ctx, a) { if (a <= 0) return; ctx.save(); ctx.globalAlpha = 0.32 * a; ctx.fillStyle = '#16245a'; ctx.fillRect(-10, -10, K22W + 20, K22H + 20); ctx.globalAlpha = 0.3 * a; ctx.fillStyle = dotPat(ctx, C.blue, 9, 0.36); ctx.fillRect(-10, -10, K22W + 20, K22H + 20); ctx.restore(); }
