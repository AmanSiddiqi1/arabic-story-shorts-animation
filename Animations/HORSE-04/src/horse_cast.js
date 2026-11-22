// ===== The Ebony Horse series: cast settings and the series' own drawings =====
// Series bible colours (accents never change with the light; skin keeps the theme skin): Firuz crimson, the inventor saffron,
// the king emerald. ebonyHorse (the carved flying horse, never alive), platformCart, handInsert, ehRibbon (capes, turban tail),
// rider helpers on top of the Library rideOn. Episodes 2-5 copy this file unchanged.

// ---------- costume settings (Library person presets + pal) ----------
const EH_CRIMSON = '#e8264f', EH_SAFFRON = '#f2a71b', EH_EMERALD = '#1f9a6a';
const EH_FIRUZ = { costume: 'prince', s: 0.95, age: 0, pal: { robe: '#f6efe0', dot: '#d9cdb4', sleeve: '#eadcc0', trim: '#f2c040', sash: EH_CRIMSON, pants: '#2a8f9a', shoes: '#7a4a2a', hair: '#1a1420' } };
// Firuz riding (HORSE-01 v2, Fable note 4): short tunic so the whole leg reads teal, sleeves one step darker than the tunic
const EH_FIRUZ_RIDE = { len: 'short', sleeve: '#e2d2b0' };
const EH_INVENTOR = { costume: 'vizier', s: 1.02, age: 0.7, pal: { robe: '#5a3a8a', dot: '#43296a', sleeve: '#8a6ac8', cape: '#3a2458', capeDot: '#2a1a40', sash: '#3fae6a', trim: '#c8a0ff', hc: EH_SAFFRON, hd: '#c07a10', jewel: '#3fae6a' } };
const EH_KING = { costume: 'caliph', s: 1.0, age: 0.6, pal: { robe: EH_EMERALD, dot: '#126e4a', sleeve: '#2fb884', cape: '#f2c040', capeDot: '#c8961a', trim: '#f2c040', sash: '#f2c040', hc: '#fff6ea', hd: '#d8d0c0', jewel: '#e8364f' } };
// seven guests in bright colours that are none of the leads' accents, plus the palace child
const EH_GUESTS = [
  { costume: 'merchant', s: 1.0, pal: { robe: '#f07a2a', dot: '#b8541a', sleeve: '#ff9a5a', sash: '#3f7ad0', trim: '#3f7ad0', hc: '#fff6ea', hd: '#3f7ad0', jewel: '#3f7ad0' } },
  { costume: 'lady', s: 0.92, pal: { robe: '#5ab8f0', dot: '#3a8ac8', sleeve: '#8ad0ff', trim: '#fff6ea', hc: '#fff6ea', hd: '#5ab8f0', jewel: '#ff6a8a' } },
  { costume: 'physician', s: 0.97, age: 0.55, pal: { robe: '#8a9a3a', dot: '#66741e', sleeve: '#b0c05a', sash: '#ffd36a', hc: '#fff6ea', hd: '#8a9a3a' } },
  { costume: 'maiden', s: 0.88, pal: { robe: '#ff8ab8', dot: '#d8608e', sleeve: '#ffb0d0', sash: '#7a4ad0', band: '#7a4ad0' } },
  { costume: 'vizier', s: 0.98, age: 0.4, pal: { robe: '#b48ae0', dot: '#8a64b8', sleeve: '#d0b0f6', cape: '#3f7ad0', capeDot: '#2a5aa8', sash: '#ffd36a', trim: '#ffd36a', hc: '#fff6ea', hd: '#b48ae0', jewel: '#3f7ad0' } },
  { costume: 'servant', s: 0.92, pal: { robe: '#fff6ea', dot: '#cfc6d8', sleeve: '#fff6ea', sash: '#3f7ad0', hc: '#3f7ad0' } },   // fan
  { costume: 'servant', s: 0.9, pal: { robe: '#fff6ea', dot: '#cfc6d8', sleeve: '#fff6ea', sash: '#2fb8b0', hc: '#3f7ad0' } },   // tray
];
const EH_CHILD = { costume: 'servant', child: true, s: 1, pal: { robe: '#ffd23a', dot: '#d8a818', sleeve: '#ffd23a', sash: '#3f7ad0', pants: '#fff1d8', hc: '#3f7ad0' } };
const ehDressP = (D, P) => ({ ...D, ...P, pal: { ...D.pal, ...(P.pal || {}) } });
// head centre of a standing Library person (world), with its tip and drop
function ehHeadOf(P) { const s = P.s || 1, d = Math.sign(P.dir || 1), a = (P.tip || 0) * d, h = (195 - (P.drop || 0)) * s * (P.sq || 1); return [P.x + Math.sin(a) * h, P.y - Math.cos(a) * h]; }

// ---------- ribbons: capes, turban tails, sashes ----------
// ehRibbon(ctx, x, y, ang, len, w0, t, col, o): a tapered ribbon from (x, y) along angle ang (0 = +x, PI/2 = down), with a
// travelling wave (o.wave amplitude, o.hz, o.k wavelength), width w0 at the root tapering to w0 * (o.tip ?? 0.55); o.sag bends it down
// (gravity) as it goes; o.shade, o.line. Pure function of t (pass a cel-stepped t for drawings on twos).
function ehRibbon(ctx, x, y, ang, len, w0, t, col, o = {}) {
  const n = 9, wave = o.wave ?? 10, hz = o.hz ?? 1.6, kk = o.k ?? 2.2, sag = o.sag || 0, L = [], Rr = [];
  let px = x, py = y, a = ang;
  for (let i = 0; i <= n; i++) {
    const u = i / n, wv = Math.sin(t * hz * Math.PI * 2 - u * kk * Math.PI) * wave * u, nx = -Math.sin(a), ny = Math.cos(a), w = w0 * (1 - (1 - (o.tip ?? 0.55)) * u) / 2;
    const cx = px + nx * wv, cy = py + ny * wv; L.push([cx + nx * w, cy + ny * w]); Rr.push([cx - nx * w, cy - ny * w]);
    px += Math.cos(a) * len / n; py += Math.sin(a) * len / n; a += sag / n * Math.cos(a);
  }
  const pts = [...L, ...Rr.reverse()];
  celShade(ctx, pts, col, o.shade || ehDark(col, 0.35), { light: o.light || [-1, -1], off: w0 * 0.3, lw: o.lw ?? 3, line: o.line || ehDark(col, 0.55) });
}
// Firuz's crimson cape. Standing: hangs behind the body from the shoulders (P a standing person), swings with o.swing and trails
// against travel (o.vx world units/s). Riding: streams from the neck point opposite to travel (o.stream 0..1, o.ang).
function ehCapeStand(ctx, P, t, o = {}) {
  const s = P.s || 1, [hx, hy] = ehHeadOf(P), nx = hx, ny = hy + 46 * s, tr = K.clamp((o.vx || 0) / 260, -1, 1), sw = (o.swing || 0) + idleSway(t, 71, 0.05, 2.4);
  const ang = Math.PI / 2 - tr * 0.9 + sw;
  ctx.save(); ehRibbon(ctx, nx, ny, ang, 150 * s, 74 * s, t, EH_CRIMSON, { wave: 4 + 10 * Math.abs(tr), hz: 1.1 + Math.abs(tr), tip: 1.25, shade: '#b0183a', lw: 3 }); ctx.restore();
}
function ehCapeFly(ctx, x, y, s, t, o = {}) {
  const st = K.clamp(o.stream ?? 1), ang = o.ang ?? Math.PI * (1 - 0.08), a = K.lerp(Math.PI / 2 + (o.hangSide || 0.15), ang, st);
  ehRibbon(ctx, x, y, a, (130 + 40 * st) * s, 56 * s, t, EH_CRIMSON, { wave: (4 + 14 * st) * s, hz: 1.2 + 2.2 * st, k: 2.4, tip: 0.8 + 0.4 * (1 - st), sag: 0.25 * st, shade: '#b0183a' });
}

// ---------- ebonyHorse: the carved wooden flying horse ----------
// ebonyHorse(ctx, P): feet at (P.x, P.y), facing dir (narrow values such as 0.45 are the in-between drawings of a turn), s, rot
// (about the feet, as the Library horse). Same size and seat as the Library horse (320 wide, back 235, head top 335 at s 1;
// seat EQUINE.horse.seat), so rideOn(ctx, ebonyHorse, P, personP, { name: 'horse', reins: false }) seats a rider.
// It never moves a leg, blinks or breathes. Fields: knob (angle of the ascent knob notch, rad), lever (lever angle), reveal 0..1
// (the descent lever under the first mane block lights; 0 = hidden, as in every wide shot), close (draw the fine engraving),
// cover 0..1 (close inserts: a carved block lies over the lever slot, 1 = hidden; sliding it to 0 uncovers the lever),
// lit {neck, chest, joints, hooves, eye} 0..1 (the power-on brass flashes), frost 0..1, alpha.
const EH_EB = { ebony: '#3a3448', shade: '#241f30', far: '#2c2738', hi: '#6a6288', line: '#181222', brass: '#e0b038', brassS: '#a87a1c', brassH: '#fff1b0', cloth: EH_CRIMSON, clothB: '#f2c040' };
const EH_EBG = {   // geometry at s 1 (facing +x, feet at y 0)
  body: [[-120, -198], [-106, -226], [-60, -236], [40, -238], [96, -228], [122, -204], [124, -160], [106, -134], [40, -126], [-60, -126], [-108, -136], [-124, -166]],
  neck: [[48, -228], [80, -264], [116, -306], [138, -320], [164, -300], [152, -264], [140, -222], [124, -172], [90, -160], [60, -176]],
  head: [[128, -322], [148, -338], [172, -326], [216, -266], [228, -246], [218, -230], [188, -234], [158, -256], [142, -282]],
  ear: [[136, -328], [140, -368], [156, -334]],
  legs: [[60, 68, false, true], [-98, -110, false, false], [80, 90, true, true], [-76, -86, true, false]],   // [hip x, foot x, near, fore]
  knob: [88, -205], lever: [128, -296], eye: [168, -300], chest: [116, -186], seat: [-8, -238],
  mane: Array.from({ length: 7 }, (_, i) => { const u = i / 6; return [K.lerp(134, 56, u), K.lerp(-326, -240, u) - 4, -0.85 + 0.15 * u]; }),
};
const ehBrass = (k) => (k > 0 ? ehMix(EH_EB.brass, EH_EB.brassH, Math.min(1, k)) : EH_EB.brass);
function ehBrassDisc(ctx, x, y, r, k = 0, o = {}) { celShade(ctx, ell(x, y, r, r, 18), ehBrass(k), k > 0.5 ? '#e8c050' : EH_EB.brassS, { light: [-1, -1], off: r * 0.35, hi: EH_EB.brassH, lw: o.lw ?? 2.5, line: '#6a4a10' }); }
function ebonyHorse(ctx, P) {
  const s = P.s || 1, dir = P.dir ?? 1, G = EH_EBG, E = EH_EB, lit = P.lit || {}, cl = !!P.close;
  ctx.save(); if (P.alpha != null) ctx.globalAlpha *= P.alpha;
  ctx.translate(P.x, P.y); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s);
  const L = [-1, -1], ln = E.line, lw = 3.5;
  // legs (far first): straight carousel legs, brass discs at the top and the knee, brass hooves
  const leg = (hx, fx, near) => { const top = -152, col = near ? E.ebony : E.far, sh = near ? E.shade : '#1e1a28';
    celShade(ctx, [[hx - 12, top], [hx + 12, top], [fx + 10, -16], [fx - 10, -16]], col, sh, { light: L, off: 7, lw, line: ln });
    celShade(ctx, [[fx - 13, -18], [fx + 13, -18], [fx + 16, 0], [fx - 16, 0]], ehBrass(lit.hooves || 0), E.brassS, { light: L, off: 5, hi: E.brassH, lw: 2.5, line: '#6a4a10' });
    ehBrassDisc(ctx, (hx + fx) / 2, -84, 8, lit.joints || 0); };
  for (const [hx, fx, near] of G.legs) if (!near) leg(hx, fx, false);
  // carved S-curl tail (one piece, never swings)
  const tp = K.bezier([-114, -206], [-176, -262], [-196, -178], [-150, -150], 16).concat(K.bezier([-150, -150], [-118, -128], [-150, -96], [-182, -112], 10).slice(1));
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = ln; ctx.lineWidth = 26; K.poly(ctx, tp); ctx.stroke(); ctx.strokeStyle = E.ebony; ctx.lineWidth = 19; K.poly(ctx, tp); ctx.stroke();
  ctx.strokeStyle = E.hi; ctx.lineWidth = 4; ctx.beginPath(); K.poly(ctx, tp.slice(2, 12).map(([x, y]) => [x - 4, y - 4])); ctx.stroke(); ctx.restore();
  // body barrel with plank seams and a lifted top edge
  celShade(ctx, G.body, E.ebony, E.shade, { light: L, off: 16, hi: E.hi, lw: 4, line: ln });
  ctx.save(); ctx.strokeStyle = ln; ctx.lineWidth = 2.5; for (const yy of [-200, -168]) { ctx.beginPath(); ctx.moveTo(-112, yy); ctx.quadraticCurveTo(0, yy + 8, 116, yy - 2); ctx.stroke(); } ctx.restore();
  // saddle cloth (crimson, gold border, fringe) and the built-in saddle for two
  const cloth = [[-78, -232], [52, -236], [58, -172], [-6, -166], [-82, -170]];
  celShade(ctx, cloth, E.cloth, '#a8183a', { light: L, off: 8, lw: 3, line: '#6a0a20' });
  ctx.save(); ctx.strokeStyle = E.clothB; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-80, -178); ctx.lineTo(-6, -174); ctx.lineTo(56, -180); ctx.stroke();
  ctx.lineWidth = 3; for (let x = -76; x <= 52; x += 10) { ctx.beginPath(); ctx.moveTo(x, -172); ctx.lineTo(x, -162); ctx.stroke(); } ctx.restore();
  celShade(ctx, [[-70, -236], [-66, -262], [-52, -250], [-30, -244], [28, -244], [44, -270], [58, -262], [54, -236]], E.ebony, E.shade, { light: L, off: 6, hi: E.hi, lw: 3, line: ln });
  ctx.save(); ctx.strokeStyle = ehBrass(lit.neck ? lit.neck * 0.5 : 0); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-64, -258); ctx.lineTo(-50, -248); ctx.lineTo(30, -246); ctx.lineTo(46, -266); ctx.stroke(); ctx.restore();
  // near legs over the body edge
  for (const [hx, fx, near] of G.legs) if (near) leg(hx, fx, true);
  for (const [hx, , near] of G.legs) ehBrassDisc(ctx, hx, -146, near ? 11 : 9, lit.joints || 0);
  // neck block, head wedge, ear
  celShade(ctx, G.neck, E.ebony, E.shade, { light: L, off: 12, hi: E.hi, lw: 4, line: ln });
  celShade(ctx, G.head, E.ebony, E.shade, { light: L, off: 10, hi: E.hi, lw: 4, line: ln });
  celShade(ctx, G.ear, E.ebony, E.shade, { light: L, off: 5, lw: 3, line: ln });
  seg(ctx, 214, -244, 226, -244, 3, ln, 0);   // mouth line on the squared muzzle
  ctx.save(); ctx.strokeStyle = E.brassS; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(150, -262); ctx.lineTo(196, -236); ctx.stroke(); ctx.restore();   // bridle strap
  for (const [bx, by] of [[176, -286], [192, -266], [206, -250], [160, -262]]) ehBrassDisc(ctx, bx, by, 4, lit.neck || 0, { lw: 1.5 });
  ehBrassDisc(ctx, G.eye[0], G.eye[1], 7, lit.eye || 0, { lw: 2 });   // pupil-less brass disc eye
  // the descent lever under the first mane block (drawn only when revealed or in a close insert)
  const rv = K.clamp(P.reveal || 0), cov = K.clamp(P.cover || 0);
  if (rv > 0 || cl) { const [lx, ly] = G.lever, la = (P.lever || 0) + 2.2;
    celShade(ctx, K.rectPts(lx - 13, ly - 10, 26, 22), ehMix(E.shade, E.brass, 0.25 + 0.5 * rv), E.shade, { light: L, off: 4, lw: 2, line: ln });
    if (cl) { ctx.save(); ctx.strokeStyle = ehMix(E.shade, '#ffe9a0', 0.2 + 0.7 * rv); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(lx, ly - 6); ctx.lineTo(lx, ly + 7); ctx.moveTo(lx - 4, ly + 3); ctx.lineTo(lx, ly + 8); ctx.lineTo(lx + 4, ly + 3); ctx.stroke(); ctx.restore(); }
    const ex = lx + Math.cos(la) * 38, ey = ly + Math.sin(la) * 38, bc = ehMix(E.brassS, E.brass, rv);
    seg(ctx, lx, ly, ex, ey, 5, bc, 1.5); ehBrassDisc(ctx, ex, ey, 5, rv * 0.6, { lw: 1.5 }); }
  // mane: seven stepped carved blocks with a brass edge strip (block 0 overhangs the lever)
  G.mane.forEach(([mx, my, ma], i) => { ctx.save(); ctx.translate(mx, my); ctx.rotate(ma); const w = 26, h = i === 0 ? 30 : 22;
    celShade(ctx, K.rectPts(-w / 2, -h / 2, w, h), E.ebony, E.shade, { light: L, off: 5, hi: E.hi, lw: 3, line: ln });
    seg(ctx, -w / 2 + 2, -h / 2 + 2, w / 2 - 2, -h / 2 + 2, 3.5, ehBrass(lit.neck || 0), 0.8);
    if (cl) { ctx.strokeStyle = ln; ctx.lineWidth = 1.2; for (const q of [-5, 3]) { ctx.beginPath(); ctx.moveTo(-w / 2 + 4, q); ctx.lineTo(w / 2 - 4, q + 1); ctx.stroke(); } }
    ctx.restore(); });
  // cover (0..1, close inserts): a carved block lying over the lever slot; 1 = the slot hidden, slides up the neck as it opens
  if (cov > 0) { const [lx, ly] = G.lever, sl = (1 - cov) * 52; ctx.save(); ctx.translate(lx + 2 + sl * 0.35, ly - 2 - sl); ctx.rotate(-0.85);
    celShade(ctx, K.rectPts(-27, -24, 54, 48), E.ebony, E.shade, { light: L, off: 7, hi: E.hi, lw: 3, line: ln }); seg(ctx, -24, -21, 24, -21, 3.5, ehBrass(lit.neck || 0), 0.8);
    if (cl) { ctx.strokeStyle = ln; ctx.lineWidth = 1.2; for (const q of [-8, 4]) { ctx.beginPath(); ctx.moveTo(-22, q); ctx.lineTo(22, q + 1); ctx.stroke(); } } ctx.restore(); }
  // brass chest plate with a sun boss
  const [cx, cy] = G.chest; celShade(ctx, [[cx - 4, cy - 26], [cx + 10, cy - 22], [cx + 12, cy + 18], [cx + 2, cy + 30], [cx - 8, cy + 18]], ehBrass(lit.chest || 0), E.brassS, { light: L, off: 6, hi: E.brassH, lw: 2.5, line: '#6a4a10' });
  ehBrassDisc(ctx, cx + 3, cy, 8, lit.chest || 0, { lw: 2 }); if (cl) for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; seg(ctx, cx + 3 + Math.cos(a) * 10, cy + Math.sin(a) * 10, cx + 3 + Math.cos(a) * 15, cy + Math.sin(a) * 15, 2, '#a87a1c', 0); }
  // the ascent knob: a dark round plate engraved with an up arrow, the brass disc with a pointer notch
  const [kx, ky] = G.knob; celShade(ctx, ell(kx, ky, 22, 22, 22), '#4a4258', E.shade, { light: L, off: 6, hi: E.hi, lw: 2.5, line: ln });
  ctx.save(); ctx.strokeStyle = ehMix('#8a82a8', '#ffe9a0', lit.neck || 0); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(kx - 17, ky + 8); ctx.lineTo(kx - 17, ky - 10); ctx.moveTo(kx - 21, ky - 5); ctx.lineTo(kx - 17, ky - 11); ctx.lineTo(kx - 13, ky - 5); ctx.stroke(); ctx.restore();
  ehBrassDisc(ctx, kx + 2, ky, 14, lit.neck || 0); const na = (P.knob || 0) - Math.PI / 2; seg(ctx, kx + 2, ky, kx + 2 + Math.cos(na) * 12, ky + Math.sin(na) * 12, 4, '#6a4a10', 0);
  // frost (the cold beat): pale glints on the brass and the top edges
  if (P.frost > 0) { ctx.save(); ctx.globalAlpha *= P.frost * 0.8; ctx.strokeStyle = '#dff4ff'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-60, -238); ctx.lineTo(40, -240); ctx.moveTo(84, -266); ctx.lineTo(136, -320); ctx.stroke(); ctx.restore(); }
  // power-on halation (light, not drawing)
  const glow = (x, y, r, k) => { if (k > 0.05) ehGlow(ctx, x, y, r, k * 0.9, '#ffd36a'); };
  glow(kx, ky, 60, lit.neck || 0); glow(cx, cy, 70, lit.chest || 0); for (const [hx, fx] of G.legs) { glow(hx, -146, 36, lit.joints || 0); glow(fx, -8, 40, lit.hooves || 0); }
  if (rv > 0.05) glow(G.lever[0], G.lever[1], 70, rv * 0.8);
  ctx.restore();
}
// world point of a horse-local point (rot about the feet, dir, s)
function ehHorsePt(P, p) { return BEAST.world(P, p); }
// power-on: the brass lights in order (neck, chest, joints, hooves), each a 2-frame flash then a held glow while on; rate s per piece
function ehPowerOn(t, t0, rate = 0.25, hold = 0.25, k = 1) {
  const o = {}; ['neck', 'chest', 'joints', 'hooves'].forEach((n, i) => { const a = t0 + i * rate, d = t - a; o[n] = d < 0 ? 0 : d < 0.07 ? k : hold * k; }); o.eye = o.neck * 0.6; return o;
}
const ehLitMax = (...L) => { const o = {}; for (const l of L) for (const k in l) o[k] = Math.max(o[k] || 0, l[k]); return o; };
// a horse placed by its body centre (cx, cy) with a pitch (nose up > 0): returns P with x, y (feet) and rot
function ehRigP(cx, cy, s, dir, pitch, extra = {}) { const r = -pitch * Math.sign(dir || 1), h = 182 * s; return { x: cx - Math.sin(r) * h, y: cy + Math.cos(r) * h, s, dir, rot: r, ...extra }; }

// ---------- platformCart: the low four-wheeled trolley with a T push bar and leaf springs ----------
// x: centre, y: ground; o: {dir, wheel (rad), sag (platform pushed down, units), tick}; returns the platform top y
function platformCart(ctx, x, y, o = {}) {
  const d = Math.sign(o.dir || 1), top = y - 58 + (o.sag || 0), red = '#a8552a', redS = '#6a2e14', ln = '#3a1a0a';
  // push bar at the rear
  ctx.save(); ctx.translate(x, 0); ctx.scale(d, 1);
  seg(ctx, -150, top + 6, -170, top - 92, 9, '#8a5a32', 3); seg(ctx, -170, top - 92, -170, top - 92, 9, '#8a5a32', 3); celShade(ctx, K.rectPts(-196, top - 104, 52, 16), '#8a5a32', '#5a3420', { off: 4, lw: 3, line: ln });
  // leaf springs and axles
  for (const ax of [-100, 100]) { ctx.save(); ctx.strokeStyle = '#5a5470'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(ax - 40, top + 30); ctx.quadraticCurveTo(ax, top + 44 - (o.sag || 0) * 0.5, ax + 40, top + 30); ctx.stroke(); ctx.restore(); }
  celShade(ctx, K.rectPts(-150, top, 300, 30), red, redS, { light: [-1, -1], off: 8, hi: '#d8804a', lw: 3.5, line: ln });
  for (const cx of [-150, 150]) celShade(ctx, K.rectPts(cx - 10, top - 3, 20, 36), '#e0b038', '#a87a1c', { off: 4, lw: 2, line: '#6a4a10' });
  ctx.save(); ctx.strokeStyle = redS; ctx.lineWidth = 2; for (let k = -110; k <= 110; k += 55) { ctx.beginPath(); ctx.moveTo(k, top + 3); ctx.lineTo(k, top + 27); ctx.stroke(); } ctx.restore();
  ctx.restore();
  for (const ax of [-100, 100]) { const wx = x + ax * d, wy = y - 24; ctx.save(); ctx.translate(wx, wy); ctx.rotate((o.wheel || 0) * d);
    ehBlob(ctx, 0, 0, 24, 24, '#7a4a2a', '#4a2a14', { lw: 3, off: 5 }); shape(ctx, ell(0, 0, 18, 18, 18), '#3a2a3a', { lw: 2 });
    for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; seg(ctx, 0, 0, Math.cos(a) * 18, Math.sin(a) * 18, 4, '#c08a52', 1); } ehBrassDisc(ctx, 0, 0, 5, 0, { lw: 1.5 }); ctx.restore(); }
  return top;
}

// ---------- handInsert: a large hand for the close inserts (knob, lever) ----------
// (x, y) = the fingertips' working point; o: {rot, s, grip 0..1 (fingers curl round a knob), point 0..1 (index out), sleeve, cuff,
// dir (1: hand comes from the left, fingers toward +x)}
function handInsert(ctx, x, y, o = {}) {
  const s = o.s || 1, sk = C.skin, sh = '#d99a80', ln = '#6a3a2a', g = K.clamp(o.grip || 0), pt = K.clamp(o.point || 0);
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale((o.dir ?? 1) * s, s);
  // sleeve and cuff from off-screen
  celShade(ctx, [[-420, -70], [-120, -62], [-112, 58], [-420, 70]], o.sleeve || '#eadcc0', ehDark(o.sleeve || '#eadcc0', 0.25), { light: [-1, -1], off: 18, lw: 4, line: ehDark(o.sleeve || '#eadcc0', 0.6) });
  celShade(ctx, [[-136, -66], [-104, -64], [-98, 62], [-130, 64]], o.cuff || '#f2c040', ehDark(o.cuff || '#f2c040', 0.3), { light: [-1, -1], off: 6, lw: 3.5, line: ehDark(o.cuff || '#f2c040', 0.6) });
  // palm
  celShade(ctx, [[-104, -50], [-20, -58], [10, -40], [14, 30], [-10, 52], [-104, 50]], sk, sh, { light: [-1, -1], off: 14, lw: 4, line: ln });
  // four-finger block (grip: shorter and curled), or the index out (point)
  const fl = K.lerp(96, 44, g);
  for (let i = 0; i < 4; i++) { const fy = -44 + i * 26, isIdx = i === 0, len = isIdx ? K.lerp(fl, 118, pt) : fl * (1 - 0.35 * pt), bend = isIdx ? 0 : g * 26 + pt * 30;
    celShade(ctx, [[0, fy - 11], [len * 0.6, fy - 12 + bend * 0.3], [len, fy - 6 + bend], [len + 6, fy + 6 + bend], [len * 0.6, fy + 12 + bend * 0.4], [0, fy + 12]], sk, sh, { light: [-1, -1], off: 6, lw: 3, line: ln });
    ctx.save(); ctx.strokeStyle = ehDark(sh, 0.3); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(len * 0.45, fy - 9 + bend * 0.2); ctx.lineTo(len * 0.45, fy + 9 + bend * 0.2); ctx.stroke(); ctx.restore(); }
  // thumb capsule on top
  ctx.save(); ctx.translate(-40, -54); ctx.rotate(-0.5 + 0.6 * g); celShade(ctx, [[0, -14], [70, -12], [82, 0], [70, 12], [0, 14]], sk, sh, { light: [-1, -1], off: 6, lw: 3, line: ln }); ctx.restore();
  ctx.restore();
}

// ---------- riders ----------
// ehRide(ctx, H, who, PP, t, o): the ebony horse with a seated rider (Library rideOn, no reins). who 'firuz' | 'inventor'.
// o.cape: draw Firuz's cape (stream 0..1, ang) behind the rider; o.tail: the inventor's turban tail (stream). Returns the seat.
function ehRide(ctx, H, who, PP, t, o = {}) {
  const D = who === 'firuz' ? EH_FIRUZ : EH_INVENTOR, seat = mountSeat('horse', H), sg = Math.sign(H.dir || 1), ps = PP.s ?? D.s;
  const rot = seat.rot + (PP.lurch || 0) * sg, nk = [seat.x + Math.sin(rot) * 150 * ps + 24 * sg * ps * Math.cos(rot), seat.y - Math.cos(rot) * 150 * ps];
  if (who === 'firuz' && o.cape !== false) ehCapeFly(ctx, nk[0], nk[1], ps, o.tc ?? t, { stream: o.stream ?? 0, ang: o.ang ?? (sg > 0 ? Math.PI * 0.94 : Math.PI * 0.06), hangSide: -0.25 * sg });
  if (who === 'inventor' && o.tail !== false) ehRibbon(ctx, nk[0] - 14 * sg * ps, nk[1] - 70 * ps, o.tailAng ?? (Math.PI / 2 + 0.5 * sg + (o.stream || 0) * (sg > 0 ? 1.2 : -1.2)), 110 * ps * (o.tailLen || 1), 16 * ps, o.tc ?? t, EH_SAFFRON, { wave: 6 + 10 * (o.stream || 0), hz: 1.3 + 2 * (o.stream || 0), tip: 0.6, shade: '#c07a10' });
  const pp = who === 'firuz' ? { ...PP, s: ps, pal: { ...EH_FIRUZ_RIDE, ...(PP.pal || {}) } } : { ...PP, s: ps };
  return rideOn(ctx, ebonyHorse, H, ehDressP(D, pp), { name: 'horse', reins: false });
}
