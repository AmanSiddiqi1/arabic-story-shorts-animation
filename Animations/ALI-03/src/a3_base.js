// ===== ALI-03 "The Marked Door": series machinery copied from ALI-02 a2_base.js (shot dispatch, balloons, tape tracking, body points,
// cloaks, leader / men on foot, horses, the doorway state, the morning glade model, the far town, the tape inset). Unchanged except
// that ALI-02's own shake table is not used (a3Shake in a3_main.js). Names keep their a2 / ab prefixes (series helpers).
const AB_SHOTS = [];
function abShot(t) { for (const s of AB_SHOTS) if (t >= s.a && t < s.b) return s; return AB_SHOTS[AB_SHOTS.length - 1]; }
function abCamClamp(c, ww) { const z = c.zoom; return { x: K.clamp(c.x, 500 / z, ww - 500 / z), y: K.clamp(c.y, 615 / z, 1230 - 615 / z), zoom: z }; }
const abByY = (list) => [...list].sort((a, b) => a.y - b.y);
// panel-only shake (the rock grinding, the door opening); amplitude 3 units on ones
// English speech balloon pointing at the speaker (ALI-01 v4). steps: [[t, text], ...]; o: {size, gone, pop, wobble, col, icon(ctx, x, y)}
function abSay(ctx, S, steps, t, x, y, to, o = {}) {
  if (t < steps[0][0] || (o.gone && t > o.gone + 0.25)) return; let txt = steps[0][1], t0 = steps[0][0];
  for (const [ts, tx] of steps) if (t >= ts) { txt = tx; t0 = ts; }
  const pop = o.pop === false ? 1 : 1 + 0.12 * Math.max(0, 1 - (t - t0) / 0.2), wb = o.wobble ? Math.sin(AB_T3(t) * 17) * o.wobble : 0;
  ctx.save(); if (o.gone && t > o.gone) ctx.globalAlpha *= 1 - K.clamp((t - o.gone) / 0.25);
  ctx.translate(x, y + wb); ctx.scale(pop, pop); ctx.translate(-x, -y - wb);
  // v2 (review 1 note 9, ALI-02's clamp): the box is clamped inside the panel with a 24 px margin; the tail stays on the speaker
  let size = o.size || 52, w = a2LabelW(S, txt, size); const room = 1000 - 2 * A2_MARGIN - (o.icon ? 70 : 0); if (w > room) { size *= room / w; w = room; }
  const lo = A2_MARGIN + w / 2 + (o.icon ? 70 : 0), hi = 1000 - A2_MARGIN - w / 2, dx = K.clamp(x, lo, hi) - x; ctx.translate(dx, 0); if (to) to = [to[0] - dx, to[1]];
  // o.thin: a thin tail (base 34 units) drawn here instead of the style's wide wedge
  const a = K.clamp((t - steps[0][0]) / 0.3); if (o.thin && to && !o.tag) { ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = 'rgba(14,10,24,0.86)'; ctx.beginPath(); ctx.moveTo(x - 17, y + wb + size * 0.4); ctx.lineTo(to[0], to[1]); ctx.lineTo(x + 17, y + wb + size * 0.4); ctx.fill(); ctx.restore(); }
  const r = S.label(ctx, txt, x, y + wb, a, { size, balloon: !o.tag, to: o.tag || o.thin ? null : to, color: o.col });
  if (o.icon && r && r.w) o.icon(ctx, x - r.w / 2 - 34, y + wb - size * 0.3);
  ctx.restore();
}
// a plain tag (no tail): THUMP THUMP, CLOP CLOP, CLATTER!, WAIT!
const A2_MARGIN = 34;   // 24 px inside the panel's 9 px clip, in panel units
function a2LabelW(S, text, size) { return K.cached('a2lw:' + size + ':' + text, () => { const c = K.layer(1080, 1920), x = c.getContext('2d'); x.globalAlpha = 0; return S.label(x, text, 500, 500, 1, { size }).w || 0; }); }
function a2Tag(ctx, S, text, x, y, t, a, b, o = {}) { if (t < a || t > b + 0.25) return; { const w = a2LabelW(S, text, o.size || 46) * 1.15; x = K.clamp(x, A2_MARGIN + w / 2, 1000 - A2_MARGIN - w / 2); } ctx.save(); if (t > b) ctx.globalAlpha *= 1 - K.clamp((t - b) / 0.25); const pop = 1 + 0.15 * Math.max(0, 1 - (t - a) / 0.2); ctx.translate(x, y); ctx.scale(pop, pop); ctx.rotate(o.rot || 0); S.label(ctx, text, 0, 0, K.clamp((t - a) / 0.3), { size: o.size || 46, color: o.col }); ctx.restore(); }
// tape tracking noise band (torn lines) inside the story panel, canvas pixels
function abTracking(ctx, t, t0, dur = 0.5) {
  const u = (t - t0) / dur; if (u < 0 || u > 1) return; const [x, y, w, h] = AB_PANEL, cv = ctx.canvas, R = K.rng(1 + Math.floor(t * 30)), by = y + h * u;
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  for (let i = 0; i < 4; i++) { const yy = by + (R() - 0.5) * 90, bh = 6 + R() * 26, dx = (R() - 0.5) * 70; ctx.drawImage(cv, x, yy, w, bh, x + dx, yy, w, bh); ctx.fillStyle = 'rgba(255,255,255,0.22)'; ctx.fillRect(x, yy + bh * 0.5, w, 2); }
  ctx.restore();
}
// world -> panel and a keyed camera with ease
const a2Cam = (keys) => (t) => K.camAt(keys, t);

// ---------- the shared arm throw (the leader's "Open Sesame" arm from episode 1, AB_S6_ARM re-based to 0) ----------
// used at 4.25 (works), 17.2 (stalls), 21.76 and 23.7 (fail), and by the leader at 135.0 (points at the town)
const A2_ARM = [[0, 0], [0.5, -0.45], [0.64, 1.25], [0.8, 0.94], [1.0, 1.02], [1.2, 1.0]];
function a2ArmVal(tc, t0) { return flow(tc - t0, A2_ARM) + lagged((u) => flow(u - t0, A2_ARM), tc, 0.1, 0.3); }
function a2ArmHand(a) { return a < 0 ? [-30 - 40 * -a, -110 + 20 * a] : [K.lerp(20, 112, Math.min(a, 1.25)), K.lerp(-120, -214, Math.min(a, 1.25))]; }

// ---------- body points of a Library person (head, cheeks, eyes, turban top) in world units ----------
// lx, ly in the upper-body frame (as P.hands and the head: feet at 0,0 standing, +x the facing side); follows sit/kneel hips, the
// figure's lean (age), its tip and squash (the acting wrapper), dir and scale. o: defaults for s and age when P has none.
function a2BodyPt(P, lx, ly, o = {}) {
  const s = (P.s ?? o.s ?? 1) * (P.child ? 0.62 : 1), dir = Math.sign(P.dir || 1), age = P.age ?? o.age ?? 0.3, lean = (P.lean || 0) + age * 0.12;
  const pc = personPose(P, -1, 0).hipC, off = [pc[0], pc[1] + 75];
  const c = Math.cos(lean), n = Math.sin(lean), y0 = ly + 75; let x1 = lx * c - y0 * n + off[0], y1 = lx * n + y0 * c - 75 + off[1];
  let wx = dir * s * x1, wy = s * y1; const sq = P.sq ?? 1, tip = (P.tip || 0) * dir; wx *= 1 + (1 - sq) * 0.7; wy *= sq;
  const C2 = Math.cos(tip), N2 = Math.sin(tip); return [P.x + wx * C2 - wy * N2, P.y + wx * N2 + wy * C2];
}
// a point on the head (dx, dy from the head centre, before the head tilt)
function a2HeadPt(P, dx, dy, o = {}) { const age = P.age ?? o.age ?? 0.3, hx0 = (P.look || 0) * 4, hdY = -195 + (P.drop || 0) + age * 6, tl = P.tilt || 0;
  return a2BodyPt(P, hx0 + dx * Math.cos(tl) - dy * Math.sin(tl), hdY + dx * Math.sin(tl) + dy * Math.cos(tl), o); }
// a hand in world units (P.hands after drawing; follows sit/kneel hips)
function a2Hand(P, i = 1, o = {}) { const h = (P.hands || [[0, -100], [0, -100]])[i]; return a2BodyPt(P, h[0], h[1], o); }
const A2_CAS = { s: 1.1, age: 0.4 }, A2_ALI = { s: 0.95, age: 0.25 }, A2_LEAD = { s: 1.08, age: 0.4 };
// Cassim's extras over the puppet: the feather plume (his antenna: fa radians backward, + lag/buzz from the scene), blush, coin eyes
function a2CasExtra(ctx, P, o = {}) {
  const s = P.s ?? 1.1, dir = Math.sign(P.dir || 1), sc = s * (P.sq ?? 1), tot = dir * ((P.tip || 0) + (P.tilt || 0) + 0.048);
  if (o.feather !== false && !o.noTurban) { const b = a2HeadPt(P, 14, -58, A2_CAS), th = tot - dir * (o.fa ?? 0.35), L = 64 * sc, droop = o.droop || 0, pts = [], pts2 = [];
    for (let k = 0; k <= 6; k++) { const u = k / 6, a = th - dir * droop * u * u * 1.6, w = (9 - 6 * u) * sc; const x = b[0] + Math.sin(a) * L * u, y = b[1] - Math.cos(a) * L * u; pts.push([x - Math.cos(a) * w, y - Math.sin(a) * w]); pts2.push([x + Math.cos(a) * w, y + Math.sin(a) * w]); }
    celShade(ctx, [...pts, ...pts2.reverse()], '#fffaf0', '#d8cfe6', { light: [-dir, -1], off: 4 * sc, lw: 2.5, line: '#8a6a3a' }); }
  if ((o.blush || 0) > 0.02) { ctx.save(); ctx.globalAlpha *= 0.75 * K.clamp(o.blush); for (const sd of [-1, 1]) { const [x, y] = a2HeadPt(P, sd * 21, 12, A2_CAS); ctx.fillStyle = '#ff8a9a'; ctx.beginPath(); ctx.ellipse(x, y, 10 * sc, 5.5 * sc, 0, 0, 7); ctx.fill(); } ctx.restore(); }
  if ((o.coin || 0) > 0.02) for (const sd of [-1, 1]) { const [x, y] = a2HeadPt(P, sd * 13 + (P.look || 0) * 3, -4, A2_CAS), r = 8 * sc * K.clamp(o.coin); abBlob(ctx, x, y, r, r, '#ffcf3a', '#c07a12', { lw: 2, off: r * 0.3, hi: '#fff3b0' }); }
  if ((o.sweat || 0) > 0.02 && o.sweat < 1) { const [x, y] = a2HeadPt(P, -dir * 30, -20 + 40 * o.sweat, A2_CAS); ctx.save(); ctx.globalAlpha *= K.clamp(4 * (1 - o.sweat)); celShade(ctx, [[x, y - 9 * sc], [x + 4 * sc, y], [x, y + 3 * sc], [x - 4 * sc, y]], '#cfeaff', '#7fb0e0', { light: [-1, -1], off: 2, lw: 1.5, line: '#3a5a9a' }); ctx.restore(); }
}
// people with a flat ground shadow (the plate's shade colour) and their extras
function a2Cas(ctx, P, m, o = {}) { if (o.shadow !== false) groundShadow(ctx, P.x, o.gy ?? (P.y + (o.lift || 0)), 130 * (P.s ?? 1.1), o.lift || 0, { flat: true, color: o.shc || '#2b1a3a' });
  const Q = o.noTurban ? { ...P, pal: { ...abPal(AB_CAS0, m), head: 'none', hair: '#2a1612' } } : P; if (o.noTurban) { abPerson(ctx, { s: 1.1, ...Q }, m, { costume: 'merchant', s: 1.1, age: 0.4, ...Q }); } else abCassim(ctx, P, m); a2CasExtra(ctx, P, o); return P; }
function a2Ali(ctx, P, m, o = {}) { if (o.shadow !== false) groundShadow(ctx, P.x, o.gy ?? (P.y + (o.lift || 0)), 110, o.lift || 0, { flat: true, color: o.shc || '#2b1a3a' }); abAli(ctx, P, m); return P; }

// ---------- the leader on foot: a cloak ribbon from the shoulders (ALI-01 abStandCloak), then the figure ----------
function abStandCloak(ctx, P, t, col, len = 1, wind = 1) {
  const s = P.s || 1.08, d = Math.sign(P.dir || 1), x0 = P.x - d * 10 * s, y0 = P.y - 186 * s * (P.sq || 1), tc = AB_T3(t), pts = [], pts2 = [];
  for (let k = 0; k <= 7; k++) { const u = k / 7, wv = Math.sin(tc * 13 - k * 1.05) * 12 * u * s * wind; pts.push([x0 - d * u * 120 * s * len, y0 + u * 150 * s + wv]); pts2.push([x0 - d * u * 120 * s * len + d * 30 * s, y0 + u * 150 * s + wv + 22 * s * (1 - u * 0.4)]); }
  celShade(ctx, [...pts, ...pts2.reverse()], col, abDark(col, 0.45), { light: [d, -1], off: 7 * s, lw: 3, line: abDark(col, 0.6) });
}
// hanging cloak (standing still): a tapered ribbon behind the shoulders, tip sways on its own 6-drawing cycle; kick 0..1 streams it
function a2HangCloak(ctx, P, t, col, kick = 0, ph = 0) {
  const s = P.s || 1.08, d = Math.sign(P.dir || 1), x0 = P.x - d * 8 * s, y0 = P.y - 180 * s * (P.sq || 1), q = Math.floor((t + ph) * 4) / 4, pts = [], pts2 = [];
  for (let k = 0; k <= 6; k++) { const u = k / 6, sw = Math.sin(q * Math.PI * 2 / 1.6 - u * 1.4) * 10 * u * u * s + kick * 60 * u * s, x = x0 - d * (18 + 30 * u) * s - d * sw, y = y0 + u * 160 * s - kick * 40 * u * u * s, w = (34 - 14 * u) * s;
    pts.push([x, y]); pts2.push([x - d * w, y + 4]); }
  celShade(ctx, [...pts, ...pts2.reverse()], col, abDark(col, 0.45), { light: [d, -1], off: 6 * s, lw: 3, line: abDark(col, 0.6) });
}
function a2Lead(ctx, t, P, m, o = {}) {
  if (o.shadow !== false) groundShadow(ctx, P.x, P.y + (o.lift || 0), 140, o.lift || 0, { flat: true, color: o.shc || '#2b1a3a' });
  if (o.cloak !== false) { if (o.stream) abStandCloak(ctx, P, t, AB_LEAD0.cape, 1, o.stream); else a2HangCloak(ctx, P, t, AB_LEAD0.cape, o.kick || 0, 0.3); }
  abLeader(ctx, P, m); return P;
}
function a2Man(ctx, i, P, m, o = {}) { if (o.shadow !== false) groundShadow(ctx, P.x, P.y, 110 * (P.s || 0.95), 0, { flat: true, color: o.shc || '#2b1a3a' }); if (o.cloak !== false) a2HangCloak(ctx, { s: 0.95, ...P }, AB_T2(o.t ?? 0), AB_RIDER0[i % AB_RN].cape, o.kick || 0, i * 0.37); abMan(ctx, i, P, m); return P; }
// a standing horse with its own idle life (ALI-01 abLineHorse)
function abLineHorse(h, k, tc, o = {}) {
  return { x: h.x, y: h.y, s: h.s, dir: o.dir ?? h.dir ?? 1, pal: h.pal, tailSwish: osc(tc, 1.7 + k * 0.23, k * 0.37), earL: 0.3 + idleSway(tc, 40 + k, 0.3, 1.9), earR: 0.2 + idleSway(tc, 50 + k, 0.3, 2.3),
    headDown: k === 3 ? 0.7 + 0.2 * osc(tc, 2.6) : idleSway(tc, 60 + k, 0.08, 3.1) + 0.1, neck: idleSway(tc, 70 + k, 0.1, 3.7), lid: abLid(tc, 80 + k), ...o.P };
}
function a2Horse(ctx, P, m, o = {}) { groundShadow(ctx, P.x, P.y, 300 * (P.s || 1), 0, { flat: true, color: o.shc || '#2b1a3a' }); abHorse(ctx, P, m, o); }
// the mule (donkey pal 1, s 0.78) and the handcart: cart bed centre cx, mule at cx + 290 (episode 1's ending)
function a2MuleCart(ctx, t, cx, m, o = {}) {
  const tc = AB_T2(t), xf = o.xf || (() => cx), M = { y: 902, s: 0.78, dir: o.dir ?? 1, pal: 1, ...walk((u) => xf(u) + 290 * (o.dir ?? 1), tc, { stride: GAIT.donkey * 0.78 }),
    earL: 0.5 + idleSway(tc, 61, 0.3, 1.3), earR: 0.3 + idleSway(tc, 62, 0.35, 1.7), tailSwish: osc(tc, 1.4), lid: abLid(t, 27), neck: idleSway(tc, 63, 0.08, 3.3), ...(o.P || {}) };
  const wheel = (xf(tc) - 1200) / 62, bounce = o.moving ? 3 * Math.abs(Math.sin(xf(tc) * 0.045)) : 0;
  groundShadow(ctx, M.x, 902, 220, 0, { flat: true, color: o.shc || '#2b1a3a' }); groundShadow(ctx, xf(tc), 902, 300, 0, { flat: true, color: o.shc || '#2b1a3a' });
  if ((o.dir ?? 1) < 0) { ctx.save(); ctx.translate(2 * xf(tc), 0); ctx.scale(-1, 1); abCart(ctx, xf(tc), 900, { wheel: -wheel, bounce, t, inside: o.inside, load: o.load }); ctx.restore(); }
  else abCart(ctx, xf(tc), 900, { wheel, bounce, tilt: o.tilt || 0, t, inside: o.inside, load: o.load });
  abDonkey(ctx, M, m); return M;
}

// ---------- the doorway swallow (ALI-01 abDoorState) for the great rock at x 1820 ----------
const AB_DIN = 1745, AB_DEND = 1912;
function abDoorState(x) { const dark = K.clamp((x - 1640) / 105); if (x < AB_DIN) return { inside: false, sink: 0, k: 1, dark };
  const u = K.clamp((x - AB_DIN) / (AB_DEND - AB_DIN)); return { inside: true, sink: 130 * u, k: 1 - 0.2 * u, dark: 1 }; }
// draw(ctx, x, y, s) a figure at feet (x, y) and scale factor; mode 'in' (inside the arch, called from abRock o.inside) | 'out';
// o.maxDark caps the silhouette (Cassim keeps his colours readable), o.rim rim colour, o.stateX: use this x for the state
function a2DoorFig(ctx, t, x, y, draw, mode, o = {}) {
  const st = abDoorState(o.stateX ?? x); if ((mode === 'in') !== st.inside) return; const dk = Math.min(o.maxDark ?? 1, st.dark);
  if (dk < 0.02) { draw(ctx, x, y + st.sink, st.k); return; }
  if (mode === 'out') { ctx.save(); ctx.globalAlpha = 0.3 * dk; ctx.fillStyle = '#2b1a3a'; ctx.beginPath(); ctx.moveTo(x - 18, y + 2); ctx.lineTo(x + 18, y + 2); ctx.lineTo(x - 330 + (1820 - x) * 0.2, y + 58); ctx.lineTo(x - 380 + (1820 - x) * 0.2, y + 38); ctx.closePath(); ctx.fill(); ctx.restore(); }
  abCel(ctx, [x, y + st.sink, 360 * st.k, 360 * st.k], (c) => draw(c, x, y + st.sink, st.k), { tint: '#2b1a3a', k: 0.85 * Math.round(dk * 4) / 4, rim: dk > 0.2 ? (o.rim || '#ff7ad9') : null, light: [1, -0.25], rimW: 4.5 });
}
// ---------- glade colour models (new: dawn, morning; dusk from ALI-01) and the scree slope ----------
AB_ROCK_COL.dawn = ['#c8968a', '#86607a', '#ffc8b0', '#6a4a5a', '#ffb08a'];
AB_ROCK_COL.morning = ['#c8a07a', '#806070', '#fbe0b0', '#6a4a5a', null];
AB_LEAF.dawn = ['#4f9a6a', '#2e6a50', '#ffc0a8'];
AB_BARK.dawn = ['#8a5a4a', '#5a3a34'];
const A2_SKY = { dawn: [[0, '#6a78c8'], [0.3, '#a48ad0'], [0.52, '#f0a0b0'], [0.7, '#ffd8a8']], morning: [[0, '#58a0f0'], [0.42, '#9ccaf8'], [0.6, '#cfe8ff'], [0.72, '#fff4d6']], dusk: AB_SKY.dusk };
const A2_LAND = {   // far hills, near hills, tree line, ground top, ground bottom, path
  dawn: ['#b49ad0', '#9a8ac4', '#4f8a6a', '#e4aa8a', '#b4806a', '#f8cca8'],
  morning: ['#a8c8ec', '#86b4dc', '#3f9a5a', '#eab66a', '#c4823e', '#fde2a8'], dusk: AB_LAND.dusk };
// boulders of the scree: rows stepping up to the right against the rock's right shoulder (x 2200..2400, top y 600)
const A2_SCREE = (() => { const R = K.rng(81), out = []; for (let r = 0; r < 5; r++) { const y = 908 - r * 70; for (let x = 2190 + r * 42; x < 2440; x += 62 + R() * 26) out.push({ x: x + R() * 14, y: y + R() * 8, r: 56 + R() * 30 - r * 3, row: r, sd: Math.floor(R() * 1000) }); } return out; })();
const A2_SCREE_PTS = [[2360, 600], [2330, 668], [2290, 742], [2255, 820], [2230, 896]];
const A2_SCREE_COL = { dawn: ['#d8b0a0', '#8a6a78'], morning: ['#dcc4a4', '#8a7078'], dusk: ['#c89a8a', '#7a5468'] };
function a2Boulder(c, b, m) { const [f, sh] = A2_SCREE_COL[m] || A2_SCREE_COL.morning, R = K.rng(b.sd), r = b.r, pts = [];
  for (let i = 0; i < 9; i++) { const a = Math.PI + i / 8 * Math.PI, rr = r * (0.8 + R() * 0.3); pts.push([b.x + Math.cos(a) * rr * 1.15, b.y + Math.sin(a) * rr * 0.95]); }
  celShade(c, pts, f, sh, { light: [-1, -1], off: r * 0.3, hi: abLight(f, 0.35), lw: 3, line: abDark(sh, 0.45) }); }
function a2ScreeFront(m) { return abBakeAt('a2screeF:' + m, 500, 420, (c) => { c.translate(-2000, -600); A2_SCREE.filter((b) => b.row === 0).slice(0, 3).forEach((b) => a2Boulder(c, b, m)); }); }
function a2GladePlate(m) {
  return abBakeAt('a2glade:' + m, 2400, 1230, (c, w) => {
    const L = A2_LAND[m]; abGrad(c, 0, 0, w, 1230, A2_SKY[m]);
    if (m === 'dawn') { abGlaze(c, 300, 780, 760, '#ffc8a0', 0.7); abGlaze(c, 300, 820, 300, '#fff0c8', 0.7); }
    else if (m === 'morning') abGlaze(c, 300, 300, 560, '#fff6d8', 0.55);
    else { abGlaze(c, 260, 640, 520, '#ffb060', 0.55); c.save(); c.filter = 'blur(6px)'; c.fillStyle = '#ffcf7a'; c.beginPath(); c.arc(260, 660, 70, 0, 7); c.fill(); c.restore(); }
    const cu = m === 'dawn' ? ['#b89ad8', '#ffc0a8'] : m === 'morning' ? ['#ffffff', '#e4eeff'] : ['#d8a0c8', '#ffd0a0'];
    for (const [x, y, s] of [[300, 220, 1], [900, 140, 0.8], [1500, 260, 1.2], [2100, 160, 0.9], [1150, 420, 0.6]]) abCloud(c, x, y, 360 * s, 90 * s, cu[0], cu[1], 9);
    abSoftHills(c, w, 720, 90, L[0], 3, 3); abSoftHills(c, w, 800, 60, L[1], 5, 2); abSoftTrees(c, w, 860, 70, L[2], 7, 60, 1.5);
    abGrad(c, 0, 860, w, 370, [[0, L[3]], [1, L[4]]]);
    c.save(); c.filter = 'blur(3px)'; c.fillStyle = L[5]; c.globalAlpha = 0.75; c.beginPath(); c.moveTo(0, 892); c.bezierCurveTo(800, 880, 1600, 904, w, 888); c.lineTo(w, 960); c.bezierCurveTo(1600, 980, 800, 950, 0, 968); c.closePath(); c.fill(); c.restore();
    const R = K.rng(21); c.save(); c.filter = 'blur(1px)'; for (let i = 0; i < 160; i++) { c.fillStyle = K.rgba(L[4], 0.5); c.beginPath(); c.ellipse(R() * w, 880 + R() * 340, 8 + R() * 30, 3 + R() * 6, 0, 0, 7); c.fill(); } c.restore();
    if (m === 'morning') abSun(c, 300, 300, 58, '#fff6c8', '#ffe8a0', 0.9);
    const bushC = m === 'morning' ? ['#4fae5a', '#2f7044'] : m === 'dawn' ? ['#4a8a6a', '#2e5a50'] : ['#4a7a5e', '#2e5048'];
    const Rb = K.rng(66); for (let i = 0; i < 16; i++) { const x = Rb() * w, r = 40 + Rb() * 40; if (x > 1500 && x < 2140) continue; abBlob(c, x, 872 - r * 0.3, r, r * 0.6, bushC[0], bushC[1], { lw: 2.5, off: r * 0.3, line: abDark(bushC[1], 0.4) }); }
    const fl = m === 'morning' ? undefined : ['#ff9ab0', '#ffd36a', '#fff1d8', '#c8a0ff'];
    abDress(c, 0, w, 905, 1215, 67, { stones: 26, tufts: 30, flowers: 22, cols: fl, skip: [[1600, 2040], [2170, 2420]], grass: m === 'morning' ? ['#6ac05a', '#2f7a44'] : ['#5a9a6a', '#2f6050'], stone: m === 'morning' ? ['#dcc4a8', '#9a8078'] : ['#d0a8a8', '#8a6a70'] });
    A2_SCREE.filter((b) => !(b.row === 0 && A2_SCREE.indexOf(b) < 3)).sort((a, b) => b.row - a.row).forEach((b) => a2Boulder(c, b, m));
    const Rt = K.rng(83); for (let i = 0; i < 6; i++) abTuft(c, 2230 + Rt() * 170, 880 - Rt() * 250, 30, '#5a9a5a', '#2f6050');
    if (m === 'dusk') { c.save(); c.globalAlpha = 0.25; c.fillStyle = '#2a1a4a'; for (const x of [520, 1820]) { c.beginPath(); c.moveTo(x - 60, 900); c.lineTo(x + 60, 900); c.lineTo(x + 900, 1000); c.lineTo(x + 700, 1040); c.closePath(); c.fill(); } c.restore(); }
  });
}
const a2GladeUnder = (m) => (ctx, t, cam) => { ctx.save(); K.camera(ctx, 1000, 1230, cam); ctx.drawImage(a2GladePlate(m), 0, 0); ctx.restore(); };
// faint fading stars (dawn), on ones
function a2Stars(ctx, t, k) { if (k <= 0) return; const R = K.rng(5); ctx.save(); ctx.fillStyle = '#fff6ea'; for (let i = 0; i < 14; i++) { const x = 900 + R() * 1500, y = 60 + R() * 300; ctx.globalAlpha = k * (0.35 + 0.4 * R()) * (0.7 + 0.3 * Math.sin(t * 3 + i)); ctx.fillRect(x, y, 3, 3); } ctx.restore(); }

// ---------- the far town on the horizon (S14): the ALI-01 roof strip at half scale, windows twinkling on twos ----------
function a2FarTown(ctx, t, x, base, s = 0.5, k = 1) {
  ctx.save(); ctx.globalAlpha *= k; ctx.drawImage(abTownRoofs('dawn'), 0, 600, 1400, 280, x, base - 160 * s, 1400 * s, 280 * s);
  const R = K.rng(33), tc = AB_T2(t); for (let i = 0; i < 12; i++) { const wx = x + (80 + R() * 1240) * s, wy = base - (14 + R() * 40) * s, on = Math.sin(tc * 3 + i * 2.1) > -0.4;
    if (on) { ctx.fillStyle = '#ffe9a0'; ctx.fillRect(wx, wy, 6, 7); abGlow(ctx, wx + 3, wy + 3, 18, 0.5, '#ffcf6a'); } }
  ctx.restore();
}
// a small tape-edged inset (panel units): draws f(ctx) clipped into the rect, with a cream tape border and tracking lines
function a2Inset(ctx, t, rect, p, f) { if (p <= 0) return; const [x, y, w, h] = rect, k = K.ease.back(K.clamp(p));
  ctx.save(); ctx.translate(x + w / 2, y + h / 2); ctx.scale(k, k); ctx.translate(-x - w / 2, -y - h / 2);
  ctx.fillStyle = '#fff1d8'; ctx.fillRect(x - 10, y - 10, w + 20, h + 20); ctx.strokeStyle = '#2b1a3a'; ctx.lineWidth = 4; ctx.strokeRect(x - 10, y - 10, w + 20, h + 20);
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); f(ctx); const R = K.rng(1 + Math.floor(t * 12)); ctx.fillStyle = 'rgba(255,255,255,0.18)'; for (let i = 0; i < 3; i++) ctx.fillRect(x, y + R() * h, w, 2); ctx.restore();
  ctx.fillStyle = 'rgba(255,241,216,0.85)'; ctx.save(); ctx.translate(x + 10, y - 6); ctx.rotate(-0.25); ctx.fillRect(-30, -10, 70, 22); ctx.restore(); ctx.restore(); }
