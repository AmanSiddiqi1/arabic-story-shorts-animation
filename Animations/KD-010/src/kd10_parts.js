// ===== KD-010 The Louse and the Flea: story drawings (insect figure, bedchamber, macro bed and floor views, lens, sleep meter, lamp light,
// giant hand, giant eye, bindle). All names are prefixed kd10 / KD10_ so nothing collides with engine or Library globals.
// Candidates for Library/ are listed in ../library_proposals.md.
const KD10_COL = { flea: '#8a2a1a', fleaD: '#5e170b', louse: '#f4ecd6', louseD: '#c9bfa6', wood: '#8a501a', woodD: '#5b3010', gold: '#e8b10f',
  wallDay: '#2f5fc4', wallDot: '#1d4296', tile: '#f6c93a', tileD: '#d9a514', night: '#0d2260', skinDot: C.skin, sheet: C.white };

// ---------- small geometry ----------
function kd10Limb(ctx, pts, w, col, ol = 4) {   // a jointed limb as a round-capped polyline with a black rim
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
  ctx.strokeStyle = C.black; ctx.lineWidth = w + ol * 2; ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke(); ctx.restore();
}
// knee point between hip and foot, pushed sideways by bend (positive = to the left of the hip->foot direction)
function kd10Knee(h, f, bend) { const dx = f[0] - h[0], dy = f[1] - h[1], l = Math.hypot(dx, dy) || 1; return [(h[0] + f[0]) / 2 + (dy / l) * bend, (h[1] + f[1]) / 2 - (dx / l) * bend]; }
function kd10Brow(ctx, x, y, br, sd, len = 9) { ctx.save(); ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(x - len, y + (sd < 0 ? br * 5 : -br * 4)); ctx.lineTo(x + len, y + (sd < 0 ? -br * 4 : br * 5)); ctx.stroke(); ctx.restore(); }

// ===== insect(ctx, P): side-view comic insect, feet at (x, y), facing dir. kind 'louse' (round, pale, slow) or 'flea' (tall, dark, spring legs).
// Fields: s, dir, ph/amp (walk), sq, tip, rot (whole body about its centre), gaze [x,y], lid, wink ('near'|'far'), wet, brow (+ angry, - worried),
// mouth (closed|smile|smirk|grin|o|open|frown|flat|teeth|yawn), talk, ant (-1 down..1 up), antW (wobble, radians), arm / arm2 ([x,y] local target
// of the near / far front leg), crouch 0..1 (flea hind legs coil, body sinks), air 0..1 (legs trail in flight), bundle (stick on the shoulder),
// bsw (bundle swing), napkin, tongue, sweat, tremble, sil (black silhouette), alpha, headRot, eyesOnly (just two eyes in the dark).
function kd10Insect(ctx, P) {
  const flea = P.kind === 'flea', s = P.s || 1, dir = P.dir || 1, sq = P.sq || 1, crouch = K.clamp(P.crouch || 0), air = K.clamp(P.air || 0);
  ctx.save(); ctx.translate(P.x, P.y); if (P.alpha != null) ctx.globalAlpha *= P.alpha; if (P.sil) ctx.filter = 'brightness(0)';
  ctx.scale(dir * s, s); ctx.rotate(P.tip || 0); ctx.scale(1 + (1 - sq) * 0.6, sq);
  if (P.rot) { ctx.translate(0, -60); ctx.rotate(P.rot); ctx.translate(0, 60); }
  const amp = P.amp || 0, ph = P.ph || 0, gz = P.gaze || [0.8, 0], lid = P.lid || 0;
  if (P.eyesOnly) { for (const ex of [-10, 12]) eye2(ctx, ex, -40, P.eyes || 'open', gz[0], gz[1], lid, '#0d2260', false); ctx.restore(); return; }
  const body = flea ? KD10_COL.flea : KD10_COL.louse, dark = flea ? KD10_COL.fleaD : KD10_COL.louseD;
  // leg feet with a ripple gait: foot i offset along the ground and lifted
  const gait = (i, base) => { const a = ph + i * 2.1; return [base + amp * 13 * Math.sin(a), -amp * 9 * Math.max(0, Math.cos(a))]; };
  const dy = flea ? 22 * crouch : 0;
  if (!flea) {
    // ---------- louse ----------
    const hips = [[-44, -24], [-16, -20], [14, -22]], feet = [-58, -18, 30];
    for (let i = 0; i < 3; i++) { const f = gait(i + 3, feet[i] + 8); kd10Limb(ctx, [[hips[i][0] + 8, hips[i][1]], kd10Knee([hips[i][0] + 8, hips[i][1]], f, i === 2 ? -10 : 10), f], 6, dark, 3); }
    const bp = ell(-18, -50, 60, 40, 32); shape(ctx, bp, body, { lw: 5, seed: 31, dot: C.blue, pitch: 7, rad: 0.28, da: 0.45 });
    ctx.save(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; for (const sx of [-58, -36, -14]) { ctx.beginPath(); ctx.ellipse(sx + 40, -50, 12, 34, 0, 0.62 * Math.PI, 1.38 * Math.PI); ctx.stroke(); } ctx.restore();
    for (let i = 0; i < 3; i++) { if (i === 2 && P.arm) continue; const f = gait(i, feet[i]); kd10Limb(ctx, [hips[i], kd10Knee(hips[i], f, i === 2 ? -11 : 11), f], 7, body, 3.5); }
    if (P.arm) kd10Limb(ctx, [[22, -30], kd10Knee([22, -30], P.arm, -14), P.arm], 7, body, 3.5);
    // head
    ctx.save(); ctx.translate(44, -58); ctx.rotate(P.headRot || 0); ctx.translate(-44, 58);
    const ant = P.ant ?? 0.3, aw = P.antW || 0;
    for (const [bx, k] of [[44, 0], [56, 1]]) { const a = -0.55 - ant * 0.5 + aw * (k ? 1 : 0.7), L = 34 + k * 4; const tx = bx + Math.sin(a + 1.2) * L * 0.2 + Math.cos(a) * L * 0.6, ty = -78 + Math.sin(a) * L;
      ctx.save(); ctx.lineWidth = 3.5; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(bx, -76); ctx.quadraticCurveTo(bx + 6, -88 - ant * 6, tx, ty); ctx.stroke(); ctx.restore(); shape(ctx, ell(tx, ty, 4.5, 4.5, 8), body, { lw: 3, seed: 5 }); }
    shape(ctx, ell(46, -56, 28, 26, 26), body, { lw: 5, seed: 33, dot: C.skin, pitch: 5, rad: 0.25, da: 0.35 });
    kd10Face(ctx, P, [[40, -62], [60, -61]], 54, -44, body, true);
    ctx.restore();
  } else {
    // ---------- flea ----------
    const hipB = [-22, -60 + dy], kneeB = air > 0 ? [-62, -76 + dy] : [-68 - 8 * crouch, -104 + dy * 0.2 - 10 * crouch], footB = air > 0 ? [K.lerp(-34, -96, air), K.lerp(0, -30, air)] : [-38 - 10 * crouch, 0];
    // far legs (darker, behind)
    kd10Limb(ctx, [[hipB[0] + 10, hipB[1]], [kneeB[0] + 14, kneeB[1] + 4], [footB[0] + 16, footB[1]]], 9, dark, 3);
    { const f = air > 0 ? [10, -14] : gait(1, 24); kd10Limb(ctx, [[18, -52 + dy], kd10Knee([18, -52 + dy], f, -8), f], 5, dark, 3); }
    if (P.bundle && !P.bundleFront) kd10FleaBundle(ctx, P, dy);
    // body: tall egg leaning forward
    ctx.save(); ctx.translate(-6, -82 + dy); ctx.rotate(-0.3);
    const bp = ell(0, 0, 34, 52, 32); shape(ctx, bp, body, { lw: 5, seed: 41, dot: C.red, pitch: 6, rad: 0.3, da: 0.6 });
    ctx.save(); K.poly(ctx, bp, true); ctx.clip(); ctx.fillStyle = C.yellow; ctx.beginPath(); ctx.ellipse(22, 14, 16, 34, 0.1, 0, 7); ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.stroke();
    ctx.lineWidth = 3; for (const yy of [-22, 2, 26]) { ctx.beginPath(); ctx.moveTo(-34, yy); ctx.quadraticCurveTo(0, yy + 9, 34, yy); ctx.stroke(); } ctx.restore();
    ctx.restore();
    // near hind leg: fat spring thigh, thin shin
    kd10Limb(ctx, [hipB, kneeB], 15, body, 4); kd10Limb(ctx, [kneeB, footB], 8, body, 3.5); kd10Limb(ctx, [footB, [footB[0] + 14, footB[1]]], 6, dark, 3);
    // near front legs (arm = the gesturing one)
    { const f = air > 0 ? [24, -20] : gait(0, 14); kd10Limb(ctx, [[8, -48 + dy], kd10Knee([8, -48 + dy], f, -9), f], 6, body, 3.5); }
    if (P.arm2) kd10Limb(ctx, [[18, -70 + dy], kd10Knee([18, -70 + dy], P.arm2, -12), P.arm2], 6, dark, 3.5);
    const armT = P.arm || (air > 0 ? [40, -40] : gait(2, 36));
    kd10Limb(ctx, [[22, -66 + dy], kd10Knee([22, -66 + dy], armT, P.arm ? -14 : -10), armT], 6.5, body, 3.5);
    if (P.digit) kd10Limb(ctx, [armT, [armT[0] + 2, armT[1] - 22 * P.digit]], 4.5, body, 3);
    if (P.bundle && P.bundleFront) kd10FleaBundle(ctx, P, dy);
    // head
    const hx = 26, hy = -126 + dy;
    ctx.save(); ctx.translate(hx, hy); ctx.rotate(P.headRot || 0); ctx.translate(-hx, -hy);
    const ant = P.ant ?? 0.5, aw = P.antW || 0;
    for (const [bx, k] of [[20, 0], [32, 1]]) { const a = -1.05 - ant * 0.35 + aw * (k ? 1 : 0.6), L = 62 + k * 6; const tx = bx + Math.cos(a) * L, ty = hy - 18 + Math.sin(a) * L;
      ctx.save(); ctx.lineWidth = 3.5; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(bx, hy - 18); ctx.quadraticCurveTo(bx + Math.cos(a - 0.5) * L * 0.6, hy - 18 + Math.sin(a - 0.5) * L * 0.6, tx, ty); ctx.stroke(); ctx.restore(); }
    shape(ctx, ell(hx, hy, 25, 23, 24), body, { lw: 5, seed: 43, dot: C.red, pitch: 5, rad: 0.3, da: 0.5 });
    if (P.napkin) { const pn = [[hx - 4, hy + 18], [hx + 26, hy + 14], [hx + 12, hy + 42]]; shape(ctx, [...pn, pn[0]], C.red, { lw: 3.5, seed: 9, dot: C.white, pitch: 6, rad: 0.3 }); }
    kd10Face(ctx, P, [[22, hy - 6], [38, hy - 5]], 34, hy + 10, body, false);
    ctx.restore();
  }
  if (P.sweat) { ctx.save(); ctx.globalAlpha *= K.clamp(P.sweat); const x0 = flea ? 4 : 22, y0 = flea ? -150 + dy : -84; shape(ctx, [[x0, y0 - 12], [x0 + 6, y0], [x0, y0 + 6], [x0 - 6, y0], [x0, y0 - 12]], '#9cc4ff', { lw: 3, seed: 2 }); ctx.restore(); }
  ctx.restore();
}
// shared face: two eyes (near eye in front), brows, lashes (louse), mouth
function kd10Face(ctx, P, eyes, mx, my, skin, lashes) {
  const gz = P.gaze || [0.8, 0], lid = P.lid || 0;
  eyes.forEach(([ex, ey], i) => {
    const l = P.wink === (i ? 'near' : 'far') ? 0.92 : lid;
    eye2(ctx, ex, ey, P.eyes || 'open', gz[0], gz[1], l, skin, P.wet);
    if (lashes && l < 0.9) { ctx.save(); ctx.lineWidth = 2.5; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; for (const a of [-2.2, -1.75, -1.3]) { ctx.beginPath(); ctx.moveTo(ex + Math.cos(a) * 9, ey - 2 + Math.sin(a) * 11 + lid * 18); ctx.lineTo(ex + Math.cos(a) * 14, ey - 2 + Math.sin(a) * 16 + lid * 18); ctx.stroke(); } ctx.restore(); }
    if (P.brow) kd10Brow(ctx, ex, ey - 17, P.brow, i ? 1 : -1, 7);
  });
  const m = P.mouth || 'closed', tk = P.talk || 0;
  ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 4;
  if (m === 'teeth' || m === 'yawn' || tk > 0 || m === 'open') {
    const o = m === 'teeth' ? 1 : m === 'yawn' ? 1.3 : Math.max(tk, m === 'open' ? 0.8 : 0);
    shape(ctx, ell(mx, my + 2, 9 + (m === 'teeth' ? 3 : 0), 3 + 8 * o, 14), C.black, { lw: 2.5, seed: 3 });
    ctx.fillStyle = C.red; ctx.beginPath(); ctx.ellipse(mx, my + 3 + 3 * o, 5, 2 + 2.5 * o, 0, 0, 7); ctx.fill();
    if (m === 'teeth') { ctx.fillStyle = C.white; for (const sx of [-5, 3]) { ctx.fillRect(mx + sx, my - 6, 5, 8); ctx.strokeRect(mx + sx, my - 6, 5, 8); } }
    if (P.tongue) { ctx.fillStyle = C.skin; ctx.beginPath(); ctx.ellipse(mx + 7, my + 8, 6, 4, 0.3, 0, 7); ctx.fill(); ctx.lineWidth = 2; ctx.stroke(); }
  } else if (m === 'o') shape(ctx, ell(mx, my + 3, 5, 7, 12), C.black, { lw: 2, seed: 3 });
  else if (m === 'smile' || m === 'grin') { ctx.beginPath(); ctx.arc(mx, my - 5, m === 'grin' ? 11 : 8, 0.2 * Math.PI, 0.85 * Math.PI); ctx.stroke(); if (m === 'grin') { ctx.beginPath(); ctx.moveTo(mx - 9, my + 1); ctx.lineTo(mx + 9, my + 1); ctx.stroke(); } }
  else if (m === 'smirk') { ctx.beginPath(); ctx.moveTo(mx - 7, my + 2); ctx.quadraticCurveTo(mx + 2, my + 4, mx + 9, my - 4); ctx.stroke(); }
  else if (m === 'frown') { ctx.beginPath(); ctx.arc(mx, my + 9, 8, 1.2 * Math.PI, 1.8 * Math.PI); ctx.stroke(); }
  else { ctx.beginPath(); ctx.moveTo(mx - 6, my + 2); ctx.lineTo(mx + 6, my + 2); ctx.stroke(); }
  if (P.tongue && !(m === 'open' || tk > 0)) { ctx.fillStyle = C.skin; ctx.beginPath(); ctx.ellipse(mx + 8, my + 5, 6, 4, 0.3, 0, 7); ctx.fill(); ctx.lineWidth = 2; ctx.stroke(); }
  ctx.restore();
}
function kd10FleaBundle(ctx, P, dy) {   // stick from the front hand over the shoulder, spotted cloth bundle behind
  const a = -0.95 + (P.bsw || 0), hx = 22, hy = -78 + dy, L = 120, ex = hx - Math.cos(a) * L * -0.1 - 60, ey = hy - 70;
  const tip = [hx + Math.cos(Math.PI + a) * L * -0.0 - 72, hy - 74 + Math.sin(P.bsw || 0) * 14];
  seg(ctx, hx + 6, hy + 10, tip[0], tip[1], 6, '#c58a18', 3);
  kd10Bindle(ctx, tip[0] - 4, tip[1] + 18, 1, P.bsw || 0);
}
// the flea's bundle: red spotted cloth knotted at the top; (x, y) = the knot, hangs down
function kd10Bindle(ctx, x, y, s = 1, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot * 0.5); ctx.scale(s, s);
  shape(ctx, [[-6, -12], [8, -12], [26, 8], [22, 30], [0, 38], [-22, 30], [-26, 8], [-6, -12]], C.red, { lw: 4, seed: 12, dot: C.white, pitch: 7, rad: 0.32 });
  shape(ctx, [[-4, -14], [-14, -26], [-2, -20], [8, -28], [6, -14], [-4, -14]], C.red, { lw: 3, seed: 13 });
  ctx.restore();
}
function kd10BindleStick(ctx, x, y, s = 1, settle = 0) {   // lying on the ground: stick + bundle (x, y) = ground point
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); seg(ctx, -70, -6, 30, -10, 6, '#c58a18', 3); ctx.translate(36, -30 + settle); kd10Bindle(ctx, 0, 0, 0.9, 0.3); ctx.restore();
}

// ===== bedchamber (room scale, 1000 x 1230, floor y 900) =====
function kd10RoomBake() {
  return bake('kd10-room', 1000, 1230, (c) => {
    c.fillStyle = KD10_COL.wallDay; c.fillRect(0, 0, 1000, 900); c.fillStyle = dotPat(c, KD10_COL.wallDot, 12, 0.3); c.fillRect(0, 0, 1000, 900);
    // wainscot band
    c.fillStyle = '#183f99'; c.fillRect(0, 820, 1000, 80); c.fillStyle = C.yellow; c.fillRect(0, 812, 1000, 9); ink(c, [[0, 812], [1000, 812]], 4, 3);
    // floor tiles
    c.fillStyle = KD10_COL.tile; c.fillRect(0, 900, 1000, 330); c.fillStyle = dotPat(c, C.red, 9, 0.24); c.globalAlpha = 0.35; c.fillRect(0, 900, 1000, 330); c.globalAlpha = 1;
    c.strokeStyle = C.black; c.lineWidth = 4; for (const y of [900, 1000, 1115]) { c.beginPath(); c.moveTo(0, y); c.lineTo(1000, y); c.stroke(); }
    for (let r = 0; r < 3; r++) { const y0 = [900, 1000, 1115][r], y1 = [1000, 1115, 1230][r], off = r % 2 ? 55 : 0; for (let x = -off; x < 1000; x += 110) { c.beginPath(); c.moveTo(x, y0); c.lineTo(x, y1); c.stroke(); } }
    // the crack in the tiles at (480, 960)
    c.lineWidth = 5; c.beginPath(); c.moveTo(452, 952); c.lineTo(468, 962); c.lineTo(480, 955); c.lineTo(494, 966); c.lineTo(510, 958); c.stroke();
    // window opening frame (sky drawn live behind the mullions)
    // drape swag across the top
    const sw = []; for (let i = 0; i <= 40; i++) { const x = i * 25; sw.push([x, 110 + 50 * Math.abs(Math.sin(i / 40 * Math.PI * 4))]); }
    shape(c, [[0, 0], [1000, 0], ...sw.reverse(), [0, 0]], C.red, { lw: 6, seed: 51, dot: '#a8160f', pitch: 9, rad: 0.3 });
    c.strokeStyle = C.yellow; c.lineWidth = 8; c.beginPath(); for (let i = 0; i <= 40; i++) { const x = i * 25, y = 104 + 50 * Math.abs(Math.sin(i / 40 * Math.PI * 4)); i ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke();
    // gold chest
    shape(c, [[900, 812], [985, 812], [985, 900], [900, 900], [900, 812]], KD10_COL.gold, { lw: 5, seed: 52, dot: C.red, pitch: 7, rad: 0.25, da: 0.5 });
    shape(c, [[896, 800], [989, 800], [989, 822], [896, 822], [896, 800]], '#c99300', { lw: 4, seed: 53 }); shape(c, ell(942, 846, 9, 11, 10), C.black, { lw: 2 });
    // bed: legs, base, headboard
    for (const lx of [318, 862]) shape(c, [[lx - 14, 838], [lx + 14, 838], [lx + 10, 902], [lx - 10, 902], [lx - 14, 838]], KD10_COL.wood, { lw: 4, seed: lx });
    shape(c, [[846, 840], [846, 560], [868, 532], [892, 560], [892, 840], [846, 840]], KD10_COL.gold, { lw: 6, seed: 54, dot: C.red, pitch: 7, rad: 0.25, da: 0.4 });
    shape(c, ell(869, 530, 16, 16, 14), KD10_COL.gold, { lw: 4, seed: 55 });
    shape(c, [[296, 834], [884, 834], [884, 852], [296, 852], [296, 834]], KD10_COL.wood, { lw: 5, seed: 56 });
    // mattress with piping
    shape(c, [[300, 770], [858, 770], [862, 838], [300, 838], [300, 770]], C.white, { lw: 6, seed: 57, dot: C.blue, pitch: 8, rad: 0.25, da: 0.5 });
    c.fillStyle = C.yellow; c.fillRect(302, 786, 556, 8); ink(c, [[302, 786], [858, 786]], 2.5, 4); ink(c, [[302, 794], [858, 794]], 2.5, 5);
    // the nook on the piping (610, 790)
    shape(c, ell(610, 791, 11, 7, 12), KD10_COL.night, { lw: 3, seed: 58 });
    // slippers
    for (const sx of [626, 662]) shape(c, ell(sx, 904, 16, 7, 12), C.red, { lw: 3.5, seed: sx });
  });
}
function kd10Pillows(ctx, dent = 0) { shape(ctx, [[716, 770], [722, 726], [760, 714], [832, 716], [852, 740], [850, 772], [716, 770]], C.white, { lw: 5, seed: 61, dot: '#b9b4c6', pitch: 7, rad: 0.25, da: 0.6 });
  shape(ctx, [[760, 726], [778, 712], [836, 712], [842, 730], [760, 726]], C.white, { lw: 4, seed: 62 }); }
// the red blanket with yellow trim: over the bed, front flap hanging over the mattress face (x 340..560). cover: 0 thrown off .. 1 on;
// heave: a breathing / stirring bump; topY: the blanket top line over the sleeper
function kd10Blanket(ctx, o = {}) {
  const cov = o.cover ?? 1, hv = o.heave || 0, x1 = K.lerp(330, 760, cov), lift = o.lift || 0;
  if (cov <= 0.02) { // thrown off: heap at the foot of the bed
    shape(ctx, [[300, 772], [318, 738], [372, 728], [420, 744], [436, 770], [436, 812], [300, 812], [300, 772]], C.red, { lw: 5, seed: 71, dot: C.yellow, pitch: 9, rad: 0.25, da: 0.6 }); return; }
  const top = [[320, 752], [370, 716 - hv * 0.4], [450, 700 - hv], [560, 696 - hv], [660, 702 - hv * 0.6], [x1, 712]];
  const pts = [[310, 772], ...top, [x1 + 6, 772], [x1, 790], [560, 790], [562, 812 - lift], [340, 812], [336, 790], [310, 790], [310, 772]];
  shape(ctx, pts, C.red, { lw: 5, seed: 72, dot: '#a8160f', pitch: 9, rad: 0.3, da: 0.6 });
  ctx.save(); ctx.strokeStyle = C.yellow; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(342, 806 - lift); ctx.lineTo(558, 806 - lift); ctx.stroke(); ctx.restore();
  ctx.save(); ctx.strokeStyle = C.yellow; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(x1 - 4, 716); ctx.lineTo(x1 + 2, 770); ctx.stroke(); ctx.restore();
}
// window: live sky (dayCycle) in the arch, mullions, sill. u = time of day
function kd10Window(ctx, u, t) {
  const pts = townArchPts(250, 450, 250, 470, 'round');
  ctx.save(); K.poly(ctx, pts, true); ctx.clip(); ctx.translate(250, 250); ctx.scale(0.2, 0.24); skyCycle(ctx, u, { t, moonR: 150, hills: true }); ctx.restore();
  ctx.save(); ctx.strokeStyle = C.black; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(350, 262); ctx.lineTo(350, 470); ctx.moveTo(252, 370); ctx.lineTo(448, 370); ctx.stroke(); ctx.restore();
  ink(ctx, [...pts, pts[0]], 9, 81);
  shape(ctx, [[236, 470], [464, 470], [470, 488], [230, 488], [236, 470]], KD10_COL.gold, { lw: 5, seed: 82 });
}

// ===== macro bed view (1000 x 1230, blanket surface y 900) =====
function kd10BedBake() {
  return bake('kd10-bed', 1000, 1230, (c) => {
    c.fillStyle = KD10_COL.night; c.fillRect(0, 0, 1000, 1230); c.fillStyle = dotPat(c, '#1b3a8f', 14, 0.3); c.fillRect(0, 0, 1000, 640);
    // far blanket expanse with soft hills (wrinkles) receding
    const hills = [[0, 640], [140, 600], [300, 628], [460, 590], [620, 616], [760, 596], [1000, 620], [1000, 900], [0, 900], [0, 640]];
    shape(c, hills, '#b51a12', { lw: 6, seed: 91, dot: C.yellow, pitch: 11, rad: 0.2, da: 0.35 });
    c.strokeStyle = C.black; c.lineWidth = 4; c.lineCap = 'round';
    for (const [x, y, w] of [[120, 700, 160], [360, 680, 120], [520, 740, 200], [200, 800, 140], [430, 830, 110], [640, 690, 120]]) { c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + w / 2, y - 18, x + w, y + 4); c.stroke(); }
    // near edge: the blanket body, piping, mattress side
    shape(c, [[0, 900], [1000, 900], [1000, 962], [0, 962], [0, 900]], C.red, { lw: 6, seed: 92, dot: C.yellow, pitch: 9, rad: 0.25, da: 0.6 });
    shape(c, [[0, 962], [1000, 962], [1000, 990], [0, 990], [0, 962]], C.yellow, { lw: 5, seed: 93 });
    shape(c, [[0, 990], [1000, 990], [1000, 1235], [0, 1235], [0, 990]], C.white, { lw: 5, seed: 94, dot: C.blue, pitch: 12, rad: 0.25, da: 0.5 });
    // nook: the turned-back fold, navy inside (the front lip is drawn after the cast)
    shape(c, [[70, 900], [80, 820], [130, 790], [200, 782], [260, 796], [300, 840], [312, 900], [70, 900]], C.red, { lw: 6, seed: 95, dot: '#a8160f', pitch: 9, rad: 0.3 });
    shape(c, [[100, 900], [110, 838], [150, 812], [200, 806], [250, 818], [278, 850], [286, 900], [100, 900]], KD10_COL.night, { lw: 4, seed: 96 });
  });
}
// the front lip of the nook (draw after the louse so she can hide inside); lit = lamp wash 0..1
function kd10NookLip(ctx, lit = 0) {
  shape(ctx, [[64, 900], [72, 870], [102, 862], [104, 900], [64, 900]], C.red, { lw: 5, seed: 97, dot: '#a8160f', pitch: 9, rad: 0.3 });
  shape(ctx, [[282, 900], [286, 866], [316, 872], [322, 900], [282, 900]], C.red, { lw: 5, seed: 98, dot: '#a8160f', pitch: 9, rad: 0.3 });
  shape(ctx, [[60, 900], [326, 900], [326, 916], [60, 916], [60, 900]], C.red, { lw: 4, seed: 99 });
}
// the giant sleeping face in the background (upper right): eye at (800, 420) width ~110. fields lid (1 shut), brow, smile, wide, alpha
function kd10GiantFace(ctx, o = {}) {
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1;
  shape(ctx, [[560, 620], [600, 360], [700, 250], [880, 230], [1010, 300], [1010, 640], [560, 640]], '#fbe6dc', { lw: 6, seed: 101, dot: C.skin, pitch: 10, rad: 0.25, da: 0.5 });
  // pillow under the head
  shape(ctx, [[520, 640], [560, 590], [1010, 580], [1010, 660], [520, 660], [520, 640]], C.white, { lw: 5, seed: 102, dot: '#b9b4c6', pitch: 8, rad: 0.25, da: 0.5 });
  const lid = K.clamp(o.lid ?? 1), ex = 800, ey = 420;
  if (lid >= 0.97) { ctx.save(); ctx.lineWidth = 9; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(ex, ey - 18, 58, 0.18 * Math.PI, 0.82 * Math.PI); ctx.stroke(); for (const a of [0.3, 0.5, 0.7]) { ctx.beginPath(); ctx.moveTo(ex + Math.cos(a * Math.PI) * 58, ey - 18 + Math.sin(a * Math.PI) * 58); ctx.lineTo(ex + Math.cos(a * Math.PI) * 72, ey - 18 + Math.sin(a * Math.PI) * 72); ctx.stroke(); } ctx.restore(); }
  else { const wide = o.wide ? 1.25 : 1, pts = ell(ex, ey, 58 * wide, 34 * wide, 28); shape(ctx, pts, C.white, { lw: 7, seed: 103 });
    const pr = o.wide ? 10 : 16; ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(ex + (o.px || 0) * 26, ey + 4, pr, 0, 7); ctx.fill();
    if (lid > 0.02) { ctx.save(); K.poly(ctx, pts, true); ctx.clip(); ctx.fillStyle = '#fbe6dc'; ctx.fillRect(ex - 80, ey - 50, 160, 16 + 68 * lid * wide); ctx.restore(); ctx.save(); ctx.lineWidth = 7; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(ex - 58 * wide, ey - 34 * wide + 68 * wide * lid); ctx.lineTo(ex + 58 * wide, ey - 34 * wide + 68 * wide * lid); ctx.stroke(); ctx.restore(); } }
  const br = o.brow || 0; ctx.save(); ctx.lineWidth = 12; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(ex - 70, ey - 70 - br * 14); ctx.quadraticCurveTo(ex, ey - 96 - br * 10, ex + 70, ey - 74 + br * 10); ctx.stroke(); ctx.restore();
  // nose and moustache edge, mouth
  ctx.save(); ctx.lineWidth = 7; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(680, 430); ctx.quadraticCurveTo(640, 490, 676, 510); ctx.stroke(); ctx.restore();
  shape(ctx, [[600, 540], [650, 520], [700, 530], [720, 556], [680, 552], [640, 562], [600, 540]], C.black, { lw: 3, seed: 104 });
  const sm = o.smile || 0; ctx.save(); ctx.lineWidth = 7; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(612, 586); ctx.quadraticCurveTo(650, 586 + 16 * sm - (o.frown || 0) * 14, 690, 580 - sm * 6); ctx.stroke(); ctx.restore();
  ctx.restore();
}
// the giant right hand + forearm lying on the blanket from the right. shift: slides left (px). finger: index finger lift (0..1). rigid: fingers splay.
// dimple: [x, depth] a soft dent in the skin under a lander. bump: red throbbing bite bump 0..1
function kd10GiantArm(ctx, o = {}) {
  const sx = -(o.shift || 0), fg = o.finger || 0, rg = o.rigid || 0, skin = C.white, sk = { lw: 6, dot: C.skin, pitch: 8, rad: 0.28, da: 0.7 };
  ctx.save(); ctx.translate(sx, 0);
  // forearm (top 700..720), sleeve cuff from 860
  const dm = o.dimple ? o.dimple : null, topY = (x) => K.lerp(722, 702, K.clamp((x - 700) / 300)) + (dm ? dm[1] * Math.exp(-Math.pow((x - dm[0]) / 30, 2)) : 0);
  const fa = []; for (let x = 680; x <= 1010; x += 10) fa.push([x, topY(x)]);
  shape(ctx, [[680, 900], ...fa, [1010, 900], [680, 900]], skin, { ...sk, seed: 111 });
  shape(ctx, [[860, 900], [856, 712], [880, 698], [1010, 690], [1010, 900], [860, 900]], C.white, { lw: 6, seed: 112, dot: C.blue, pitch: 9, rad: 0.3, da: 0.6 });
  ctx.save(); ctx.strokeStyle = C.yellow; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(860, 900); ctx.lineTo(857, 714); ctx.stroke(); ctx.restore();
  if (o.bump) { const r = 9 + 3 * o.bump; shape(ctx, ell(780, topY(780) + 6, r * 1.2, r * 0.7, 16), '#f58f8f', { lw: 3, seed: 113 }); }
  // hand (back of the hand, fingers pointing left, fingertips at x 520)
  shape(ctx, [[700, 900], [690, 800], [640, 792], [600, 800], [600, 900], [700, 900]], skin, { ...sk, seed: 114 });
  const fingers = [[0, 806, 0], [1, 830, 0.6], [2, 854, 0.3], [3, 876, 0.1]];
  for (const [i, y, k] of fingers) { const lift = i === 0 ? fg * 34 : 0, spl = rg * (i - 1.5) * 10, len = 84 - i * 6 + rg * 8;
    const x0 = 610, x1 = 610 - len, y1 = y - lift - spl * 0.8;
    shape(ctx, [[x0, y - 11], [x1 + 6, y1 - 11], [x1 - 6, y1], [x1 + 6, y1 + 11], [x0, y + 11], [x0, y - 11]], skin, { ...sk, lw: 5, seed: 115 + i });
    ctx.save(); ctx.strokeStyle = C.black; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x1 + 8, y1 - 6); ctx.quadraticCurveTo(x1 + 2, y1, x1 + 8, y1 + 6); ctx.stroke(); ctx.restore(); }
  ctx.restore();
}
// macro bed view, everything behind the cast
function kd10BedView(ctx, t, o = {}) {
  ctx.drawImage(kd10BedBake(), 0, 0, 1000, 1230);
  if (o.face !== false) kd10GiantFace(ctx, o.face || {});
  if (o.lamp) kd10LampWash(ctx, o.lamp[0], o.lamp[1], o.lamp[2] || 200, o.lamp[3] ?? 1);
}
// ===== macro floor view (1000 x 1230, tiles y 900, crack x 620..700) =====
function kd10FloorBake() {
  return bake('kd10-floor', 1000, 1230, (c) => {
    c.fillStyle = '#183f99'; c.fillRect(0, 0, 1000, 900); c.fillStyle = dotPat(c, '#0d2a78', 14, 0.3); c.fillRect(0, 0, 1000, 900);
    c.fillStyle = '#122f80'; c.fillRect(700, 600, 300, 300); c.fillStyle = C.yellow; c.fillRect(700, 590, 300, 12); ink(c, [[700, 590], [1000, 590]], 4, 6);
    // mattress underside: dark, top of the frame
    shape(c, [[-10, -10], [720, -10], [720, 200], [700, 228], [-10, 228], [-10, -10]], KD10_COL.night, { lw: 6, seed: 121, dot: '#16337f', pitch: 12, rad: 0.3 });
    shape(c, [[-10, 196], [724, 196], [724, 232], [-10, 232], [-10, 196]], KD10_COL.wood, { lw: 5, seed: 122 });
    // the bed leg
    shape(c, [[10, 232], [140, 232], [128, 360], [146, 420], [116, 520], [124, 900], [26, 900], [34, 520], [4, 420], [22, 360], [10, 232]], KD10_COL.wood, { lw: 6, seed: 123, dot: KD10_COL.woodD, pitch: 9, rad: 0.3, da: 0.6 });
    // tiles
    c.fillStyle = KD10_COL.tile; c.fillRect(0, 900, 1000, 330); c.fillStyle = dotPat(c, C.red, 10, 0.24); c.globalAlpha = 0.35; c.fillRect(0, 900, 1000, 330); c.globalAlpha = 1;
    c.strokeStyle = C.black; c.lineWidth = 6; c.beginPath(); c.moveTo(0, 900); c.lineTo(1000, 900); c.stroke();
    c.lineWidth = 5; for (const x of [200, 420, 880]) { c.beginPath(); c.moveTo(x, 900); c.lineTo(x - 30, 1230); c.stroke(); } c.beginPath(); c.moveTo(0, 1080); c.lineTo(1000, 1080); c.stroke();
    // the crack: a jagged fissure lying in the floor plane (v2), paper-chipped rim, hairline branches
    kd10CrackDraw(c);
  });
}
const KD10_CRACK = [[572, 948], [600, 940], [622, 944], [640, 930], [662, 936], [684, 928], [706, 940], [728, 938], [752, 950], [728, 958], [704, 966], [684, 977], [660, 970], [638, 979], [618, 965], [598, 962], [572, 948]];
function kd10CrackDraw(c) {
  c.save(); c.lineCap = 'round'; c.lineJoin = 'round'; c.strokeStyle = C.black;
  c.lineWidth = 3; for (const pts of [[[572, 948], [548, 943], [528, 953], [510, 950]], [[752, 950], [776, 945], [794, 957]], [[662, 974], [656, 994], [664, 1010]], [[600, 941], [592, 928]]]) { c.beginPath(); pts.forEach((p, i) => (i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]))); c.stroke(); }
  c.restore();
  shape(c, KD10_CRACK, '#0a1640', { lw: 6, seed: 124 });
  // chipped paper-coloured edge along the far rim
  for (const [x, y, w] of [[600, 940, 12], [640, 930, 10], [684, 928, 12], [728, 938, 9]]) shape(c, [[x - w, y - 2], [x, y - 9], [x + w, y - 1], [x - w, y - 2]], '#fbf2da', { lw: 2.5, seed: x });
}
function kd10FloorView(ctx, t, o = {}) {
  ctx.drawImage(kd10FloorBake(), 0, 0, 1000, 1230);
  // moon patch on the tiles (live so it can breathe very slightly)
  ctx.save(); ctx.globalAlpha = 0.55; const pts = [[760, 920], [960, 910], [990, 1010], [790, 1030], [760, 920]]; K.poly(ctx, pts, true); ctx.clip(); ctx.fillStyle = '#fffaf0'; ctx.fillRect(740, 900, 280, 140); ctx.fillStyle = dotPat(ctx, '#9cc4ff', 8, 0.3); ctx.fillRect(740, 900, 280, 140); ctx.restore();
  if (o.lamp) kd10LampWash(ctx, o.lamp[0], o.lamp[1], o.lamp[2] || 200, o.lamp[3] ?? 1);
}

// ===== lamp light: a yellow halftone disc over the night (x, y centre, r, strength) =====
function kd10LampWash(ctx, x, y, r, k = 1) {
  if (k <= 0 || r <= 0) return; ctx.save(); ctx.globalAlpha *= 0.55 * k; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.clip();
  const g = ctx.createRadialGradient(x, y, r * 0.2, x, y, r); g.addColorStop(0, 'rgba(255,224,90,1)'); g.addColorStop(1, 'rgba(255,210,31,0.25)'); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
  ctx.fillStyle = dotPat(ctx, '#fff4b0', 10, 0.32); ctx.fillRect(x - r, y - r, 2 * r, 2 * r); ctx.restore();
}
// small brass hand lamp; (x, y) = handle grip; sw = swing angle
function kd10OilLamp(ctx, x, y, s = 1, sw = 0, t = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(sw); ctx.scale(s, s);
  shape(ctx, [[-30, 10], [26, 10], [40, 2], [20, 22], [-22, 24], [-30, 10]], KD10_COL.gold, { lw: 4, seed: 131, dot: C.red, pitch: 5, rad: 0.25, da: 0.4 });
  ctx.save(); ctx.lineWidth = 6; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(-34, 14, 9, 0.5 * Math.PI, 1.6 * Math.PI); ctx.stroke(); ctx.restore();
  const f = 1 + 0.12 * Math.sin(t * 23) + 0.06 * Math.sin(t * 37); shape(ctx, [[38, 2], [44, -18 * f], [50, -4], [44, 4], [38, 2]], C.yellow, { lw: 3, seed: 132 });
  ctx.restore();
}

// ===== giant eye (the servant searching, macro view): centre (x, y), width w; px pupil -1..1, lid, wide, lamp glow =====
function kd10GiantEye(ctx, x, y, w, o = {}) {
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1;
  shape(ctx, ell(x, y + w * 0.1, w * 1.05, w * 0.72, 30), '#fbe6dc', { lw: 0, seed: 141, dot: C.skin, pitch: 12, rad: 0.25, da: 0.4 });
  const wide = o.wide ? 1.2 : 1, pts = ell(x, y, w * 0.5 * wide, w * 0.27 * wide, 30); shape(ctx, pts, C.white, { lw: 9, seed: 142 });
  ctx.save(); K.poly(ctx, pts, true); ctx.clip(); const px = x + (o.px || 0) * w * 0.28, pr = w * (o.wide ? 0.09 : 0.13);
  shape(ctx, ell(px, y + 2, pr * 1.5, pr * 1.5, 20), '#7a4212', { lw: 4, seed: 143 }); ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(px, y + 2, pr, 0, 7); ctx.fill(); ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(px + pr * 0.4, y - pr * 0.3, pr * 0.3, 0, 7); ctx.fill();
  if ((o.lid || 0) > 0.02) { ctx.fillStyle = '#fbe6dc'; ctx.fillRect(x - w, y - w, 2 * w, w * (0.72 + 0.6 * o.lid) - w * 0.45); }
  ctx.restore();
  ctx.save(); ctx.lineWidth = 12; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - w * 0.55, y - w * 0.45 - (o.brow || 0) * 18); ctx.quadraticCurveTo(x, y - w * 0.62 - (o.brow || 0) * 22, x + w * 0.55, y - w * 0.45 - (o.brow || 0) * 18); ctx.stroke(); ctx.restore();
  ctx.restore();
}
// giant finger and thumb pinching down on a point (x, y): p 0 (open, high) .. 1 (closed on the point)
function kd10Pinch(ctx, x, y, p, o = {}) {
  const k = K.ease.inOut(K.clamp(p)), gap = K.lerp(150, 14, k), lift = K.lerp(-380, 0, Math.min(1, k * 1.4)) + (o.up || 0), sk = { lw: 6, dot: C.skin, pitch: 8, rad: 0.28, da: 0.7 };
  ctx.save(); ctx.translate(x, y + lift);
  shape(ctx, [[-gap - 40, -600], [-gap - 50, -60], [-gap - 30, -6], [-gap + 6, -10], [-gap + 14, -70], [-gap + 10, -600], [-gap - 40, -600]], C.white, { ...sk, seed: 151 });
  shape(ctx, ell(-gap - 10, -36, 14, 20, 12), '#fde3dc', { lw: 3, seed: 152 });
  shape(ctx, [[gap + 50, -600], [gap + 60, -50], [gap + 34, -2], [gap - 6, -8], [gap - 14, -60], [gap - 6, -600], [gap + 50, -600]], C.white, { ...sk, seed: 153 });
  shape(ctx, ell(gap + 14, -30, 14, 20, 12), '#fde3dc', { lw: 3, seed: 154 });
  ctx.restore();
}

// giant fingertip (left) and thumb tip (right) descending from the top onto a point (x, yb = bottom of the tips); gap between them
function kd10Tips(ctx, x, yb, gap = 70, o = {}) {
  const sk = { dot: C.skin, pitch: 9, rad: 0.28, da: 0.7 };
  const tip = (cx, w, sd, seed) => { const pts = [[cx - w / 2, yb - 900]]; for (let i = 0; i <= 12; i++) { const a = Math.PI - i * Math.PI / 12; pts.push([cx + Math.cos(a) * w / 2, yb - w * 0.55 + Math.sin(a) * w * 0.55 - (i === 0 || i === 12 ? 0 : 0)]); } pts.push([cx + w / 2, yb - 900], [cx - w / 2, yb - 900]);
    shape(ctx, pts, C.white, { lw: 7, seed, ...sk });
    shape(ctx, ell(cx + sd * w * 0.12, yb - w * 0.42, w * 0.26, w * 0.34, 16), '#fde3dc', { lw: 4, seed: seed + 1 });
    ctx.save(); ctx.strokeStyle = C.black; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx - w * 0.32, yb - w * 1.25); ctx.quadraticCurveTo(cx, yb - w * 1.32, cx + w * 0.32, yb - w * 1.25); ctx.stroke(); ctx.restore(); };
  tip(x - gap / 2 - 80, 160, 1, 171); tip(x + gap / 2 + 90, 180, -1, 173);
}
// ===== macro lens: circular inset with a fat ring and a tapering pointer to a panel point. inside(ctx) draws in lens-local coords
// (0,0 = lens centre). p = pop (0..1+)
function kd10Lens(ctx, cx, cy, r, p, to, inside) {
  const k = Math.max(0, p); if (k <= 0.01) return; const rr = r * k;
  if (to) { const a = Math.atan2(to[1] - cy, to[0] - cx), px = -Math.sin(a), py = Math.cos(a), bx = cx + Math.cos(a) * rr * 0.9, by = cy + Math.sin(a) * rr * 0.9, w = rr * 0.28;
    const tri = [[bx + px * w, by + py * w], [to[0], to[1]], [bx - px * w, by - py * w], [bx + px * w, by + py * w]];
    ctx.save(); ctx.globalAlpha *= 0.85; shape(ctx, tri, C.yellow, { lw: 5, seed: 161, dot: C.red, pitch: 7, rad: 0.3, da: 0.6 }); ctx.restore(); }
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 7); ctx.clip(); ctx.fillStyle = KD10_COL.night; ctx.fillRect(cx - rr, cy - rr, rr * 2, rr * 2);
  ctx.translate(cx, cy); ctx.scale(k, k); inside(ctx); ctx.restore();
  ctx.save(); ctx.lineWidth = 16; ctx.strokeStyle = C.yellow; ctx.beginPath(); ctx.arc(cx, cy, rr + 6, 0, 7); ctx.stroke(); ctx.restore();
  { const o = ell(cx, cy, rr + 14, rr + 14, 48), i = ell(cx, cy, rr - 1, rr - 1, 48); ink(ctx, [...o, o[0]], 8, 162); ink(ctx, [...i, i[0]], 5, 163); }   // v2: closed on the first point (no stray chord)
  // glint
  ctx.save(); ctx.globalAlpha *= 0.5; ctx.strokeStyle = C.white; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(cx, cy, rr * 0.82, -2.6, -2.0); ctx.stroke(); ctx.restore();
}
// draw a world (fn(ctx)) inside a lens: cam {x, y, zoom} -> the lens shows radius r/zoom around (x, y)
function kd10LensWorld(ctx, cam, fn) { ctx.save(); ctx.scale(cam.zoom, cam.zoom); ctx.translate(-cam.x, -cam.y); fn(ctx); ctx.restore(); }

// ===== SLEEP meter (panel space): box with 10 segments and a DEEP mark at 9. v = 0..10, p = pop, awake = red state =====
function kd10Meter(ctx, x, y, v, p, o = {}) {
  const k = K.ease.back(K.clamp(p)); if (k <= 0.01) return;
  ctx.save(); ctx.translate(x + 190, y + 32); ctx.scale(k, k); ctx.rotate(o.rot || -0.015); ctx.translate(-190, -32);
  ctx.fillStyle = 'rgba(20,20,20,0.9)'; ctx.fillRect(8, 8, 380, 64); ctx.fillStyle = C.white; ctx.fillRect(0, 0, 380, 64); ink(ctx, [[0, 0], [380, 0], [380, 64], [0, 64], [0, 0]], 6, 171);
  ctx.font = K.font(34, BF, 400); ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillStyle = o.awake ? C.red : C.black; ctx.fillText(o.awake ? 'AWAKE!' : 'SLEEP', 12, 35);
  for (let i = 0; i < 10; i++) { const sx = 130 + i * 24, on = K.clamp(v - i), col = o.awake ? C.red : i >= 8 ? '#0d2260' : C.blue;
    ctx.fillStyle = '#e8e1cc'; ctx.fillRect(sx, 14, 18, 36); if (on > 0) { ctx.fillStyle = col; ctx.globalAlpha = o.glow && i < Math.ceil(v) ? 0.75 + 0.25 * Math.sin((o.t || 0) * 12) : 1; ctx.fillRect(sx, 14 + 36 * (1 - on), 18, 36 * on); ctx.globalAlpha = 1; }
    if (o.blinkGap && i >= Math.ceil(v) && i < 9) { ctx.fillStyle = C.red; ctx.globalAlpha = o.blinkGap; ctx.fillRect(sx, 14, 18, 36); ctx.globalAlpha = 1; }
    ctx.strokeStyle = C.black; ctx.lineWidth = 3; ctx.strokeRect(sx, 14, 18, 36); }
  // DEEP mark at segment 9
  ctx.fillStyle = C.red; ctx.fillRect(130 + 9 * 24 - 4, 6, 4, 52);
  if (o.deep !== false) { ctx.font = K.font(34, BF, 400); ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.lineWidth = 7; ctx.strokeStyle = C.black; ctx.strokeText('DEEP', 392, 33); ctx.fillStyle = C.yellow; ctx.fillText('DEEP', 392, 33); }
  ctx.restore();
}
// a 4-point twinkle star
function kd10Twinkle(ctx, x, y, r, a = 1) { if (r <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); const p = []; for (let i = 0; i < 8; i++) { const ang = i * Math.PI / 4, q = i % 2 ? r * 0.25 : r; p.push([Math.cos(ang) * q, Math.sin(ang) * q]); } p.push(p[0]); shape(ctx, p, C.white, { lw: 3, seed: 181 }); ctx.restore(); }
