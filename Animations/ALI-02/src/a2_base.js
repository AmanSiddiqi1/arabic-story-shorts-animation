// ===== ALI-02 "The Forgotten Password": shared shot machinery, ALI-01 helpers reused, and this film's new assets =====
// Reused from ALI-01-ANIME (copied, not edited there): the shot dispatch, balloons, tape tracking, the doorway swallow, the standing
// cloak, the yard/village/cottage, the cave plate. New here (library_proposals.md): the dawn and morning glade models with the scree
// slope, caveDoorInside, grain icons + confusion ring, ground trails (coins, cart ruts, footprints), Cassim's feather / blush / coin
// eyes overlay (a2CasExtra), the shared arm throw (A2_ARM), the pebble throw and bounce chain (in a2_s3.js).
// Every name is prefixed a2 / A2_ (or ab / AB_ for the copied ALI-01 parts).

const AB_SHOTS = [];
function abShot(t) { for (const s of AB_SHOTS) if (t >= s.a && t < s.b) return s; return AB_SHOTS[AB_SHOTS.length - 1]; }
function abCamClamp(c, ww) { const z = c.zoom; return { x: K.clamp(c.x, 500 / z, ww - 500 / z), y: K.clamp(c.y, 615 / z, 1230 - 615 / z), zoom: z }; }
const abByY = (list) => [...list].sort((a, b) => a.y - b.y);
// panel-only shake (the rock grinding, the door opening); amplitude 3 units on ones
const A2_SHAKE = [[5.9, 6.9], [7.4, 8.1], [52.7, 53.6], [45.32, 45.7]];
function a2Shake(t) { let a = 0; for (const [t0, t1] of A2_SHAKE) if (t >= t0 && t < t1) a = 3 * Math.min(1, (t - t0) / 0.15, (t1 - t) / 0.15); return a ? [a * Math.sin(t * 61), a * 0.7 * Math.cos(t * 47)] : [0, 0]; }
// English speech balloon pointing at the speaker (ALI-01 v4). steps: [[t, text], ...]; o: {size, gone, pop, wobble, col, icon(ctx, x, y)}
function abSay(ctx, S, steps, t, x, y, to, o = {}) {
  if (t < steps[0][0] || (o.gone && t > o.gone + 0.25)) return; let txt = steps[0][1], t0 = steps[0][0];
  for (const [ts, tx] of steps) if (t >= ts) { txt = tx; t0 = ts; }
  const pop = o.pop === false ? 1 : 1 + 0.12 * Math.max(0, 1 - (t - t0) / 0.2), wb = o.wobble ? Math.sin(AB_T3(t) * 17) * o.wobble : 0;
  ctx.save(); if (o.gone && t > o.gone) ctx.globalAlpha *= 1 - K.clamp((t - o.gone) / 0.25);
  ctx.translate(x, y + wb); ctx.scale(pop, pop); ctx.translate(-x, -y - wb);
  const r = S.label(ctx, txt, x, y + wb, K.clamp((t - steps[0][0]) / 0.3), { size: o.size || 52, balloon: !o.tag, to: o.tag ? null : to, color: o.col });
  if (o.icon && r && r.w) o.icon(ctx, x - r.w / 2 - 34, y + wb - (o.size || 52) * 0.3);
  ctx.restore();
}
// a plain tag (no tail): THUMP THUMP, CLOP CLOP, CLATTER!, WAIT!
function a2Tag(ctx, S, text, x, y, t, a, b, o = {}) { if (t < a || t > b + 0.25) return; ctx.save(); if (t > b) ctx.globalAlpha *= 1 - K.clamp((t - b) / 0.25); const pop = 1 + 0.15 * Math.max(0, 1 - (t - a) / 0.2); ctx.translate(x, y); ctx.scale(pop, pop); ctx.rotate(o.rot || 0); S.label(ctx, text, 0, 0, K.clamp((t - a) / 0.3), { size: o.size || 46, color: o.col }); ctx.restore(); }
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

// ---------- the treasure cave (ALI-01 plate without the painted open door; the door is a live prop now) ----------
function a2CavePlate() {
  return abBakeAt('a2cavePlate', 1600, 1230, (c, w) => {
    abGrad(c, 0, 0, w, 1230, [[0, '#1e1020'], [0.45, '#4a2430'], [0.75, '#6a3a2a'], [1, '#2a1418']]);
    for (const [x, y, r, col, a] of [[590, 700, 520, '#ffb84a', 0.55], [940, 700, 360, '#bcd8ff', 0.35], [1300, 680, 420, '#ff7a8a', 0.3], [170, 720, 300, '#9a7aff', 0.3]]) abGlaze(c, x, y, r, col, a);
    c.save(); c.filter = 'blur(2px)'; c.strokeStyle = 'rgba(20,8,16,0.55)'; c.lineWidth = 6; const R = K.rng(6);
    for (let i = 0; i < 40; i++) { const x = R() * w, y = 100 + R() * 700; c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + 40, y + 60, x + R() * 80 - 40, y + 140); c.stroke(); } c.restore();
    c.fillStyle = '#140a12'; c.beginPath(); c.moveTo(0, 0); c.lineTo(w, 0); c.lineTo(w, 120); for (let x = w; x >= 0; x -= 80) c.lineTo(x, 110 + 40 * Math.sin(x * 0.01)); c.closePath(); c.fill();
    abGrad(c, 0, 880, w, 350, [[0, '#7a4a2a'], [0.4, '#4a2a1e'], [1, '#1e0e10']]); abGlaze(c, 600, 900, 500, '#ffb040', 0.35);
    // the arch's stone frame (the slab itself is live)
    c.save(); c.strokeStyle = '#2a141a'; c.lineWidth = 26; c.lineJoin = 'round'; K.poly(c, townArchPts(60, 280, 560, 900, 'round'), false); c.stroke(); c.restore();
  });
}
function a2CaveUnder(dimF) { return (ctx, t, cam) => { ctx.save(); K.camera(ctx, 1000, 1230, cam); ctx.translate((cam.x - 800) * 0.4, 0); ctx.drawImage(a2CavePlate(), 0, 0);
  const d = dimF ? dimF(t) : 0; if (d > 0) { ctx.globalAlpha = d; ctx.fillStyle = '#1a1e48'; ctx.globalCompositeOperation = 'multiply'; ctx.fillRect(-800, 0, 3200, 1230); } ctx.restore(); }; }
// caveDoorInside: the sesame door from inside (arch x 60..280, top y 560, floor 900). o: open 0..1 (the halves slide into the wall),
// crack 0..1 (a hairline of daylight climbing the seam), light 0..1 (the daylight blade on the floor), inside(ctx) figures in the arch
const A2_ARCH = townArchPts(60, 280, 560, 900, 'round');
function a2SlabImg() { return abBakeAt('a2slab', 240, 360, (c) => { c.translate(-50, -550); c.save(); K.poly(c, A2_ARCH, true); c.clip(); abGrad(c, 50, 550, 240, 360, [[0, '#7a5050'], [0.6, '#5e3a40'], [1, '#3e2430']]);
  abGlaze(c, 120, 640, 120, '#a87a6a', 0.5); const R = K.rng(9); c.filter = 'blur(1.2px)'; c.lineCap = 'round'; for (let i = 0; i < 12; i++) { const x = 70 + R() * 200, y = 580 + R() * 300; if (Math.abs(x - 170) < 14) continue; c.strokeStyle = 'rgba(30,14,22,0.45)'; c.lineWidth = 2 + R() * 2; c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + 14, y + 20, x + R() * 40 - 20, y + 50); c.stroke(); }
  c.restore(); }); }
function a2CaveDoor(ctx, t, o = {}) {
  const op = K.clamp(o.open || 0), cr = K.clamp(o.crack || 0), li = K.clamp(o.light ?? op);
  if (op > 0.003) { ctx.save(); K.poly(ctx, A2_ARCH, true); ctx.clip(); abGrad(ctx, 60, 560, 220, 340, [[0, '#9cc8f6'], [0.55, '#e4f2ff'], [0.78, '#fff6e0'], [1, '#8ac06a']]);
    ctx.fillStyle = '#7ab85a'; ctx.fillRect(60, 840, 220, 60); abSoftHills(ctx, 400, 830, 18, '#9ac0d8', 4, 1); if (o.inside) o.inside(ctx); ctx.restore(); }
  ctx.save(); K.poly(ctx, A2_ARCH, true); ctx.clip();
  for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * 112 * op, 0); ctx.beginPath(); if (sd < 0) ctx.rect(0, 500, 170, 420); else ctx.rect(170, 500, 200, 420); ctx.clip(); ctx.drawImage(a2SlabImg(), 50, 550);
    ctx.strokeStyle = '#2a141a'; ctx.lineWidth = op > 0.01 ? 5 : 3; ctx.beginPath(); ctx.moveTo(170, 560); ctx.lineTo(170, 900); ctx.stroke(); ctx.restore(); }
  ctx.restore();
  if (cr > 0 && op < 0.9) { const top = 900 - 330 * cr; ctx.save(); ctx.lineCap = 'round'; ctx.shadowColor = '#cfe8ff'; ctx.shadowBlur = 18; ctx.strokeStyle = '#f4fbff'; ctx.lineWidth = 3 + 12 * op;
    ctx.beginPath(); ctx.moveTo(170, 900); for (let y = 900; y >= top; y -= 30) ctx.lineTo(170 + Math.sin(y * 0.07) * 3, y); ctx.stroke(); ctx.restore(); }
  ink(ctx, A2_ARCH, 5, 3, '#1a0c12');
  for (let k = 0; k < 3; k++) celShade(ctx, K.rectPts(70 - k * 14, 894 + k * 9, 200 + k * 28, 10), k % 2 ? '#6a4a44' : '#7a5a50', '#3e2828', { light: [-1, -1], off: 3, lw: 2 });
  if (li > 0.01) { ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = 0.42 * li; const g = ctx.createLinearGradient(170, 900, 520, 1230); g.addColorStop(0, '#e8f6ff'); g.addColorStop(1, 'rgba(190,224,255,0)'); ctx.fillStyle = g;
    const w0 = 105 * Math.max(op, 0.06); ctx.beginPath(); ctx.moveTo(170 - w0, 900); ctx.lineTo(170 + w0, 900); ctx.lineTo(560 + 140 * li, 1230); ctx.lineTo(260 + 60 * (1 - li), 1230); ctx.closePath(); ctx.fill(); ctx.restore();
    abGlow(ctx, 170, 760, 260 * (0.5 + 0.5 * op), 0.7 * li, '#cfe8ff'); }
}
// the cave room: baked cels, the chest, the live bolts and glints, the door; dim 0..1 cools the gold (light, not the cast)
function a2CaveWorld(ctx, t, cam, o = {}) {
  ctx.drawImage(abCaveCels(), 0, 0, 1600, 1230); const g = 1 - 0.45 * (o.dim || 0);
  abChest(ctx, 770, 906, 1.0, 0.85); abGlow(ctx, 770, 800, 260, (0.6 + 0.1 * Math.sin(t * 3)) * g, '#ffc84a');
  abCaveLive(ctx, o.liveT ?? t);
  abGlow(ctx, 600, 760, 520, 0.35 * g, '#ffb84a'); abGlow(ctx, 940, 780, 300, 0.25, '#cfe0ff');
  a2CaveDoor(ctx, t, o.door || {});
}
// cave rims: gold from the right while shut, cool day light from the left once the door opens
const A2_GOLDRIM = { rim: '#ffd36a', light: [1, -0.3], rimW: 3 }, A2_DAYRIM = { rim: '#bfe0ff', light: [-1, -0.3], rimW: 3.5 };

// ---------- grain icons and the confusion ring ----------
// a2Grain(ctx, kind, x, y, s, rot, o): flat cel pictograms about 48 units at s 1; o.blur (the forgotten sesame), o.glow
function a2Grain(ctx, kind, x, y, s = 1, rot = 0, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); if (o.alpha != null) ctx.globalAlpha *= o.alpha; if (o.blur) ctx.filter = `blur(${o.blur}px)`;
  const cs = (pts, f, sh, off = 3) => celShade(ctx, pts, f, sh, { light: [-1, -1], off, lw: 2.2, line: abDark(sh, 0.5) });
  if (kind === 'wheat' || kind === 'barley') { const gc = kind === 'wheat' ? '#f2c84a' : '#ecd890', gs = kind === 'wheat' ? '#b88a1a' : '#a89a5a'; seg(ctx, 0, 26, 0, -24, 3, '#a8843a', 0);
    for (let i = 0; i < (kind === 'wheat' ? 7 : 6); i++) { const yy = 14 - i * 6.5, sd = i % 2 ? 1 : -1; cs(ell(sd * 5, yy, 5, 7.5, 10).map(([px, py]) => [px, py]), gc, gs, 2);
      if (kind === 'barley') { ctx.save(); ctx.strokeStyle = gs; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(sd * 7, yy - 4); ctx.lineTo(sd * 18, yy - 22); ctx.stroke(); ctx.restore(); } } }
  else if (kind === 'rice') { for (let i = 0; i < 5; i++) { ctx.save(); ctx.rotate(-0.8 + i * 0.4); cs(ell(0, -14, 5, 11, 12), '#fffaf0', '#cfc6b4', 2); ctx.restore(); } }
  else if (kind === 'lentil') { for (const [dx, dy] of [[-10, 6], [10, 6], [0, -8]]) cs(ell(dx, dy, 11, 8, 14), '#f08a3a', '#b0561a'); }
  else if (kind === 'bean') cs([[-16, 4], [-14, -10], [-2, -14], [6, -8], [12, -14], [18, -4], [14, 10], [0, 14], [-12, 12]], '#a8442a', '#6a2414', 4);
  else if (kind === 'corn') { cs([[-9, 18], [-12, -4], [-6, -22], [6, -22], [12, -4], [9, 18]], '#ffd23a', '#c8920a'); cs([[-6, 22], [-20, 4], [-14, -6], [-4, 18]], '#5ab84a', '#2f7a34', 2); cs([[6, 22], [20, 4], [14, -6], [4, 18]], '#5ab84a', '#2f7a34', 2); }
  else if (kind === 'sesame') { if (o.glow) abGlow(ctx, 0, 0, 40, o.glow, '#fff0b0'); cs([[0, -12], [7, -4], [8, 6], [0, 13], [-8, 6], [-7, -4]], '#fff1d0', '#d8c08a', 2); }
  ctx.restore();
}
const A2_GRAINS = ['wheat', 'barley', 'rice', 'lentil', 'bean', 'corn'];
// confusionRing: the icons orbiting a head on a tilted ellipse; half 'back' (behind the head, smaller) or 'front'
function a2Ring(ctx, cx, cy, tc, o = {}, half = 'front') {
  const n = o.n || 6, sp = o.speed || 1, rx = o.rx || 150, ry = o.ry || 60, k = o.k ?? 1;
  for (let i = 0; i < n; i++) { const a = tc * sp * 2.2 + i * 2 * Math.PI / n, sn = Math.sin(a); if ((half === 'back') !== (sn < 0)) continue;
    const x = cx + Math.cos(a) * rx, y = cy + sn * ry - Math.cos(a) * rx * 0.12, sc = (0.8 + 0.2 * sn) * k * (o.s || 1);
    let yy = y, al = 1; if (o.rain != null && o.rain > 0) { const d = Math.max(0, o.rain - i * 0.08); yy = y + 900 * d * d; al = 1 - K.clamp(d * 1.6); }
    if (al > 0.02) a2Grain(ctx, A2_GRAINS[i % A2_GRAINS.length], x, yy, sc, Math.sin(a * 2) * 0.3, { alpha: al }); }
}

// ---------- ground trails a character reads (coins in the cave, cart ruts in the forest, footprints at the rock) ----------
const A2_COINS = (() => { const R = K.rng(51), out = []; let x = 700; while (x > 300) { out.push([x, 916 + R() * 18, R() * 6]); x -= 44 + R() * 26; } return out; })();
// o.reveal(x) -> bool (dropped yet), o.jit (hop amplitude on hoof beats), o.lit (a highlight position x) and o.t
function a2CoinTrail(ctx, o = {}) { for (const [x, y, r] of A2_COINS) { if (o.reveal && !o.reveal(x)) continue; const j = o.jit ? o.jit(x) : 0;
  abBlob(ctx, x, y - j, 9, 4.5, '#ffcf3a', '#c07a12', { lw: 2, off: 2, hi: '#fff3b0' }); if (o.lit != null && Math.abs(x - o.lit) < 40) abGlint(ctx, x, y - 8 - j, 20, 0.5 + 0.5 * Math.sin(r + (o.t || 0) * 9) * 0.4); } }
// cart ruts: two dashed lines 26 apart with hoof prints between, for world x0..x1; lit = x of a running neon streak (or null)
function a2Ruts(ctx, x0, x1, o = {}) { const y1 = o.y || 924, y2 = y1 + 26;
  ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = o.col || 'rgba(110,60,26,0.6)'; ctx.lineWidth = 6; for (let x = Math.floor(x0 / 60) * 60; x < x1; x += 60) for (const y of [y1, y2]) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 40, y); ctx.stroke(); }
  ctx.lineWidth = 3.5; for (let x = Math.floor(x0 / 90) * 90 + 30; x < x1; x += 90) { ctx.beginPath(); ctx.arc(x, y1 + 13, 6, 0.2, Math.PI - 0.2, true); ctx.stroke(); } ctx.restore();
  if (o.lit != null) { ctx.save(); ctx.globalCompositeOperation = 'screen'; for (const y of [y1, y2]) { const g = ctx.createLinearGradient(o.lit - 260, 0, o.lit + 20, 0); g.addColorStop(0, 'rgba(127,227,255,0)'); g.addColorStop(1, 'rgba(200,250,255,0.95)');
    ctx.strokeStyle = g; ctx.lineWidth = 8; ctx.shadowColor = '#7fe3ff'; ctx.shadowBlur = 14; ctx.beginPath(); ctx.moveTo(Math.max(x0, o.lit - 260), y); ctx.lineTo(Math.min(x1, o.lit + 20), y); ctx.stroke(); } ctx.restore(); } }
// footprints: two dotted lines of slipper prints (y 930, 955) from x0 down to x1 (x0 > x1); lit 0..1 a streak running along them
function a2Prints(ctx, x0, x1, o = {}) { const R = K.rng(77); ctx.save(); ctx.fillStyle = o.col || 'rgba(60,30,40,0.45)';
  for (const [y, ph] of [[930, 0], [955, 22]]) for (let x = x0 - ph; x > x1; x -= 44) { ctx.save(); ctx.translate(x + (R() - 0.5) * 6, y + (R() - 0.5) * 4); ctx.rotate(-0.1); ctx.beginPath(); ctx.ellipse(0, 0, 12, 5, 0, 0, 7); ctx.fill(); ctx.restore(); }
  ctx.restore();
  if (o.lit != null && o.lit > 0 && o.lit < 1) { const hx = K.lerp(x0, x1, o.lit); ctx.save(); ctx.globalCompositeOperation = 'screen'; for (const y of [930, 955]) { const g = ctx.createLinearGradient(hx + 300, 0, hx, 0); g.addColorStop(0, 'rgba(127,227,255,0)'); g.addColorStop(1, 'rgba(210,250,255,0.95)');
    ctx.strokeStyle = g; ctx.lineWidth = 7; ctx.shadowColor = '#7fe3ff'; ctx.shadowBlur = 14; ctx.beginPath(); ctx.moveTo(Math.min(x0, hx + 300), y); ctx.lineTo(hx, y); ctx.stroke(); } ctx.restore(); } }

// ---------- the yard in full morning (ALI-01 S1 yard, village and cottage; the sky and ground repainted for morning) ----------
const AB_DOOR = { x0: 788, x1: 874, top: 742 };
function a2MorningSky() { return abBakeAt('a2mornSky', 1000, 1230, (c, w) => { abGrad(c, 0, 0, w, 1230, [[0, '#4f94ec'], [0.35, '#8cc0f6'], [0.6, '#cfe6ff'], [0.75, '#fff2d6']]);
  abGlaze(c, 760, 300, 360, '#fff8e0', 0.6); for (const [x, y, s] of [[200, 240, 1.1], [620, 150, 0.9], [440, 430, 0.7], [900, 500, 0.6]]) abCloud(c, x, y, 360 * s, 80 * s, '#ffffff', '#e0ecff', 8); }); }
function a2YardPlate() {
  return abBakeAt('a2yard:morning', 1000, 1230, (c, w) => {
    abGrad(c, 0, 860, w, 370, [[0, '#ecba7a'], [0.3, '#d0945a'], [1, '#8a5a3a']]);
    c.save(); c.filter = 'blur(4px)'; c.fillStyle = 'rgba(255,236,190,0.6)'; c.beginPath(); c.ellipse(520, 935, 470, 40, 0, 0, 7); c.fill(); c.restore();
    abDress(c, 0, 1000, 920, 1200, 13, { stones: 14, tufts: 16, flowers: 12, skip: [[150, 290], [380, 700]], stone: ['#e8ccb0', '#a8887a'], grass: ['#6ac05a', '#2f7a44'] });
    const R = K.rng(12); c.save(); c.filter = 'blur(1.2px)'; for (let i = 0; i < 90; i++) { c.fillStyle = K.rgba('#8a5a3a', 0.3); c.beginPath(); c.ellipse(R() * w, 900 + R() * 320, 6 + R() * 22, 2 + R() * 5, 0, 0, 7); c.fill(); } c.restore();
    c.save(); c.filter = 'blur(10px)'; c.fillStyle = 'rgba(110,70,60,0.3)'; c.beginPath(); c.ellipse(900, 910, 200, 26, 0, 0, 7); c.fill(); c.beginPath(); c.ellipse(140, 906, 170, 22, 0, 0, 7); c.fill(); c.restore();
  });
}
function abVillage() {
  return abBakeAt('village:dawn', 1400, 1230, (c) => { const R = K.rng(27), walls = ['#f3d2a8', '#e8a888', '#f6e6c8', '#d89a7a', '#f0c27a', '#c8b0d8', '#f2b8a0'];
    palmTree(c, 1010, 870, { s: 0.6, lean: -16 }); palmTree(c, 150, 872, { s: 0.5, lean: 14 });
    let x = -40; for (let i = 0; i < 11; i++) { const w = 120 + R() * 90, h = 120 + R() * 110, col = walls[i % walls.length], base = 872, top = base - h;
      celShade(c, [[x, base], [x, top], [x + w, top], [x + w, base]], col, abMul(col, '#8a6a9a', 0.35), { light: [1, -0.5], off: 18, lw: 3, line: abDark(col, 0.55) });
      celShade(c, [[x - 6, top + 10], [x - 6, top - 6], [x + w + 6, top - 6], [x + w + 6, top + 10]], abMul(col, '#c88a72', 0.3), abMul(col, '#8a5a62', 0.4), { light: [1, -0.5], off: 5, lw: 2.5, line: abDark(col, 0.55) });
      if (i === 4) { celShade(c, ell(x + w / 2, top - 4, w * 0.36, w * 0.4, 30).filter((q) => q[1] <= top - 4), '#f6efe0', '#c8b8a8', { light: [1, -0.5], off: 12, lw: 3 }); seg(c, x + w / 2, top - w * 0.4 - 4, x + w / 2, top - w * 0.4 - 34, 4, '#e0b038', 1); }
      const dx = x + w * (0.2 + R() * 0.4); celShade(c, K.rectPts(dx, base - 64, 34, 64), R() < 0.5 ? '#3a6ad0' : '#2f9a8e', '#24407a', { light: [1, -0.5], off: 6, lw: 2.5 });
      for (let k = 0; k < 2; k++) { const wx = x + w * (0.55 + k * 0.22) - 10, wy = top + 26 + R() * 20; if (wx + 22 > x + w - 6) continue; const lit = (i + k) % 4 === 1;
        c.fillStyle = lit ? '#ffd98a' : '#3a2f5a'; c.fillRect(wx, wy, 22, 26); if (lit) abGlaze(c, wx + 11, wy + 13, 40, '#ffcf6a', 0.5); c.strokeStyle = abDark(col, 0.5); c.lineWidth = 2.5; c.strokeRect(wx, wy, 22, 26); }
      if (R() < 0.4) { seg(c, x + w - 20, top - 6, x + w - 20, top - 40, 6, '#8a5a3a', 1); }
      x += w + 14 + R() * 40; }
  }); }
// washing lines (live: the cloths sway on twos)
function a2Washing(ctx, t, ox, oy) { const tc = AB_T2(t); for (const [x0, x1, y] of [[260, 470, 760], [820, 990, 744]]) { ctx.strokeStyle = '#6a4a4a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(ox + x0, oy + y); ctx.quadraticCurveTo(ox + (x0 + x1) / 2, oy + y + 26, ox + x1, oy + y); ctx.stroke();
  ['#e8364f', '#3f7ad0', '#ffd36a', '#fff6ea', '#2f9a8e'].forEach((col, k) => { const u = (k + 1) / 6, px = ox + K.lerp(x0, x1, u), py = oy + y + 26 * 4 * u * (1 - u) * 0.5 + 4, sw = 5 * Math.sin(tc * 3 + k * 1.3 + x0); ctx.save(); ctx.translate(px, py); ctx.transform(1, 0, sw * 0.02, 1, 0, 0); celShade(ctx, K.rectPts(-12, 0, 24, 30 + (k % 2) * 8), col, abDark(col, 0.3), { light: [1, -0.5], off: 5, lw: 2 }); ctx.restore(); }); } }
function abCottage(ctx, door, t) {
  const L = [1, -0.5], wall = '#e0a888', wallS = '#a8707a', D = AB_DOOR;
  celShade(ctx, [[726, 902], [726, 600], [1060, 600], [1060, 902]], wall, wallS, { light: L, off: 46, lw: 4, line: '#6a3a4a' });
  celShade(ctx, [[712, 604], [712, 572], [1070, 572], [1070, 604]], '#c88a72', '#8a5a62', { light: L, off: 10, lw: 3.5, line: '#6a3a4a' });
  for (const bx of [746, 960]) seg(ctx, bx, 590, bx + 26, 598, 7, '#8a5a3a', 1.5);
  ctx.save(); ctx.fillStyle = '#ffcf7a'; ctx.fillRect(930, 680, 44, 52); ctx.restore(); abGlow(ctx, 952, 706, 90, 0.35, '#ffb860');
  shape(ctx, K.rectPts(926, 676, 52, 60), 'rgba(0,0,0,0)', { lw: 3.5 }); seg(ctx, 952, 678, 952, 734, 4, '#6a3a4a', 0);
  ctx.save(); ctx.fillStyle = '#4a2a3a'; ctx.fillRect(D.x0, D.top, D.x1 - D.x0, 902 - D.top); abGrad(ctx, D.x0, D.top, D.x1 - D.x0, 902 - D.top, [[0, 'rgba(255,170,110,0.35)'], [1, 'rgba(255,170,110,0)']]); ctx.restore();
  const lw = (D.x1 - D.x0) * (1 - 0.85 * K.clamp(door)); celShade(ctx, K.rectPts(D.x1 - lw, D.top, lw, 902 - D.top), '#8a5a3a', '#5a3420', { light: L, off: 8, lw: 3.5, line: '#3a1e10' });
  ink(ctx, [[D.x0, 902], [D.x0, D.top], [D.x1, D.top], [D.x1, 902]], 4, 2, '#6a3a4a');
  celShade(ctx, [[D.x0 - 10, D.top - 4], [D.x0 - 10, D.top - 18], [D.x1 + 10, D.top - 18], [D.x1 + 10, D.top - 4]], '#a86a4a', '#6a3a2a', { light: L, off: 6, lw: 3 });
  for (const [px, ph] of [[1010, 40], [752, 30]]) { celShade(ctx, [[px - 18, 902], [px - 22, 902 - ph], [px + 22, 902 - ph], [px + 18, 902]], '#c0603a', '#7a3a2a', { light: L, off: 8, lw: 3 }); abLeafBlobs(ctx, px, 902 - ph - 18, 26, 'morning', px); }
}
// chimney smoke: soft puffs rising on ones
function a2Smoke(ctx, t, x, y) { ctx.save(); for (let i = 0; i < 5; i++) { const u = ((t * 0.35 + i / 5) % 1); ctx.globalAlpha = 0.35 * (1 - u); ctx.fillStyle = '#f4f0ec'; ctx.beginPath(); ctx.ellipse(x + 30 * u + 8 * Math.sin(u * 7 + i), y - 160 * u, 12 + 26 * u, 10 + 20 * u, 0, 0, 7); ctx.fill(); } ctx.restore(); }
// a small tape-edged inset (panel units): draws f(ctx) clipped into the rect, with a cream tape border and tracking lines
function a2Inset(ctx, t, rect, p, f) { if (p <= 0) return; const [x, y, w, h] = rect, k = K.ease.back(K.clamp(p));
  ctx.save(); ctx.translate(x + w / 2, y + h / 2); ctx.scale(k, k); ctx.translate(-x - w / 2, -y - h / 2);
  ctx.fillStyle = '#fff1d8'; ctx.fillRect(x - 10, y - 10, w + 20, h + 20); ctx.strokeStyle = '#2b1a3a'; ctx.lineWidth = 4; ctx.strokeRect(x - 10, y - 10, w + 20, h + 20);
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); f(ctx); const R = K.rng(1 + Math.floor(t * 12)); ctx.fillStyle = 'rgba(255,255,255,0.18)'; for (let i = 0; i < 3; i++) ctx.fillRect(x, y + R() * h, w, 2); ctx.restore();
  ctx.fillStyle = 'rgba(255,241,216,0.85)'; ctx.save(); ctx.translate(x + 10, y - 6); ctx.rotate(-0.25); ctx.fillRect(-30, -10, 70, 22); ctx.restore(); ctx.restore(); }

// the mule cart stands here at the rock from S1 on (bed centre; the mule at +290)
const A2_CARTX = 1140;
