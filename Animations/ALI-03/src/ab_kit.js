// ===== ALI-03 (copied via ALI-02 from ALI-01-ANIME v4 "Open Sesame" story kit; series bible: same drawings) =====
// Colour models, the cel tint pass, light (bands, glow, speed lines), the story's props (sesameRock, sack, coinPile, chest,
// clothBale, purse, woodBundle + axe, handcart, mapCard) and the anime face close-up (abFace). Every name is prefixed ab/AB_
// so nothing collides with the engine or the Library. All drawing is a pure function of its arguments (and t).

const AB_ACC = '#ff3b2f';                 // Ali Baba's one accent (sash and turban band), never tinted
const AB_DUR = 147.48;                    // ALI-03: narration 143.48 + plan end_hold 4.0
const AB_PANEL = [54, 54, 972, 1196];     // story panel on the 1080 x 1920 canvas (impact frames, transitions)
const AB_GR = 900;                        // ground line in every world

// ---------- colour models (色指定): a tint multiplied into the cel colours, per time of day / light ----------
// v4 (owner restage): no single-hue tint over the cels. Every model keeps its tint name (rims, glows and the doorway silhouette
// still use them) but k is 0, so characters, horses and props keep their own varied colours in every scene; the time of day is
// carried by the painted backgrounds and the light (rims, glows), never by a wash over the cast. Only 'sil' (backlit) still darkens.
const AB_MODEL = {
  dawn: { tint: '#ffcfb0', k: 0 }, morning: { tint: '#fff2cc', k: 0 }, afternoon: { tint: '#ffd49a', k: 0 },
  dusk: { tint: '#b48ae0', k: 0 }, late: { tint: '#7a6ac8', k: 0 }, cave: { tint: '#ffc66a', k: 0 },
  night: { tint: '#6474c8', k: 0 }, lamp: { tint: '#ffc890', k: 0 }, predawn: { tint: '#9ab8d8', k: 0 },
  gold: { tint: '#ffd27a', k: 0 }, sil: { tint: '#2b1a3a', k: 0.9 },
};
const abHex = (r, g, b) => '#' + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
// multiply a colour toward tint*colour by k (k 0 = unchanged)
function abMul(c, tint, k) { if (!c || c[0] !== '#') return c; const a = K.hex(c), b = K.hex(tint); return abHex(...a.map((v, i) => v * (1 - k + k * b[i] / 255))); }
function abPal(base, m, extra = 1) { const M = AB_MODEL[m] || AB_MODEL.morning, o = {}; for (const k in base) o[k] = abMul(base[k], M.tint, M.k * extra); return o; }

// ---------- the cel tint pass: draw a cel offscreen and multiply the model colour into it (animals, riders, props) ----------
const AB_LAY = {};
function abLay(k, W, H) { const L = AB_LAY[k]; if (L && L.width === W && L.height === H) return L; return (AB_LAY[k] = K.layer(W, H)); }
function abBox(ctx, x, y, w, h) {   // device-pixel bbox of the world rect around feet (x, y), w wide, h tall
  const m = ctx.getTransform(), cv = ctx.canvas, pad = 24;
  const pts = [[x - w / 2 - pad, y - h - pad], [x + w / 2 + pad, y - h - pad], [x - w / 2 - pad, y + pad], [x + w / 2 + pad, y + pad]].map(([u, v]) => [m.a * u + m.c * v + m.e, m.b * u + m.d * v + m.f]);
  const x0 = Math.max(0, Math.floor(Math.min(...pts.map((q) => q[0])))), y0 = Math.max(0, Math.floor(Math.min(...pts.map((q) => q[1]))));
  const x1 = Math.min(cv.width, Math.ceil(Math.max(...pts.map((q) => q[0])))), y1 = Math.min(cv.height, Math.ceil(Math.max(...pts.map((q) => q[1]))));
  return { m, x0, y0, bw: x1 - x0, bh: y1 - y0 };
}
// abCel(ctx, [x, y, w, h], draw, o): o.m colour model name (or o.tint + o.k), o.rim neon rim colour, o.light [lx, ly], o.alpha,
// o.shade: a HARD shade shape on the side away from the light (the art minus itself shifted toward the light by o.shadeD units),
// multiplied in the given tone; o.line: outlines lifted to this colour (a 'lighten' pass: the dark purple trace becomes a dark
// version of the fills, so lines no longer read black at phone size). Nested calls use their own layers (depth).
let AB_DEPTH = 0;
function abCel(ctx, bb, draw, o = {}) {
  const M = o.tint ? { tint: o.tint, k: o.k ?? 0 } : o.m ? AB_MODEL[o.m] : { tint: '#ffffff', k: o.k ?? 0 }, k = (o.k ?? M.k) * (o.extra ?? 1);
  if (k < 0.01 && !o.rim && !o.shade && !o.line) { if (o.alpha != null) { ctx.save(); ctx.globalAlpha *= o.alpha; draw(ctx); ctx.restore(); } else draw(ctx); return; }
  const B = abBox(ctx, ...bb); if (B.bw <= 2 || B.bh <= 2) return;
  const dep = AB_DEPTH++, cv = ctx.canvas, A = abLay('a' + dep, cv.width, cv.height), a = A.getContext('2d'), T = abLay('b' + dep, cv.width, cv.height), b = T.getContext('2d');
  try {
  for (const g of [a, b]) { g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'source-over'; g.globalAlpha = 1; g.clearRect(B.x0, B.y0, B.bw, B.bh); }
  a.save(); a.beginPath(); a.rect(B.x0, B.y0, B.bw, B.bh); a.clip(); a.setTransform(B.m); draw(a); a.restore();
  const sc = Math.hypot(B.m.a, B.m.b), cp = (op) => { b.globalCompositeOperation = op; b.drawImage(A, B.x0, B.y0, B.bw, B.bh, B.x0, B.y0, B.bw, B.bh); };
  const onto = (op) => { a.save(); a.beginPath(); a.rect(B.x0, B.y0, B.bw, B.bh); a.clip(); a.globalCompositeOperation = op; a.drawImage(T, B.x0, B.y0, B.bw, B.bh, B.x0, B.y0, B.bw, B.bh); a.restore(); };
  if (k >= 0.01) {   // multiply the model tint into the art, alpha kept
    b.clearRect(B.x0, B.y0, B.bw, B.bh); cp('source-over'); b.globalCompositeOperation = 'multiply'; b.fillStyle = M.tint; b.fillRect(B.x0, B.y0, B.bw, B.bh);
    cp('destination-in'); a.globalAlpha = Math.min(1, k * 1.6); onto('source-atop'); a.globalAlpha = 1;
  }
  if (o.line) {     // coloured lines: lighten every pixel to at least the line colour, then keep the art's alpha
    b.clearRect(B.x0, B.y0, B.bw, B.bh); cp('source-over'); b.globalCompositeOperation = 'lighten'; b.fillStyle = o.line; b.fillRect(B.x0, B.y0, B.bw, B.bh); cp('destination-in'); onto('source-atop');
  }
  if (o.shade) {    // hard shade on the far side: the art minus itself shifted toward the light
    const [lx, ly] = o.shadeLight || o.light || [-1, -1], l = Math.hypot(lx, ly) || 1, d = (o.shadeD ?? 15) * sc;
    b.clearRect(B.x0, B.y0, B.bw, B.bh); cp('source-over'); b.globalCompositeOperation = 'destination-out'; b.drawImage(A, B.x0, B.y0, B.bw, B.bh, B.x0 + lx / l * d, B.y0 + ly / l * d, B.bw, B.bh);
    b.globalCompositeOperation = 'source-in'; b.fillStyle = o.shade; b.fillRect(B.x0, B.y0, B.bw, B.bh); onto('multiply');
  }
  if (o.rim) {      // hard neon rim on the light side: the art minus itself shifted away from the light
    const [lx, ly] = o.light || [-1, -1], l = Math.hypot(lx, ly) || 1, d = (o.rimW ?? 3.5) * sc;
    b.globalCompositeOperation = 'copy'; b.drawImage(A, B.x0, B.y0, B.bw, B.bh, B.x0, B.y0, B.bw, B.bh);
    b.globalCompositeOperation = 'destination-out'; b.drawImage(A, B.x0, B.y0, B.bw, B.bh, B.x0 - lx / l * d, B.y0 - ly / l * d, B.bw, B.bh);
    b.globalCompositeOperation = 'source-in'; b.fillStyle = o.rim; b.fillRect(B.x0, B.y0, B.bw, B.bh); b.globalCompositeOperation = 'source-over';
  }
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); if (o.alpha != null) ctx.globalAlpha *= o.alpha;
  ctx.drawImage(A, B.x0, B.y0, B.bw, B.bh, B.x0, B.y0, B.bw, B.bh);
  if (o.rim) { ctx.globalAlpha *= o.rimAlpha ?? 0.95; ctx.drawImage(T, B.x0, B.y0, B.bw, B.bh, B.x0, B.y0, B.bw, B.bh); }
  ctx.restore();
  } finally { AB_DEPTH--; }
}
// the cast finish per colour model: light direction, hard shade tone (multiplied), line colour, optional rim
// v4: the cast finish keeps only the light direction (for rims a scene asks for); the dark multiplied shade pass and the line
// lightening pass are gone (owner note 5: limbs merged into dark robes and horse legs into dark masses). The Library cast already
// draws its own flat cel shade tones in this style.
const AB_FIN = {
  dawn: { light: [1, -0.5] }, morning: { light: [1, -0.8] }, afternoon: { light: [-1, -0.6] }, dusk: { light: [-1, -0.2] }, late: { light: [-1, -0.2] },
  cave: { light: [1, -0.3] }, lamp: { light: [1, -0.3] }, night: { light: [1, -0.3] }, predawn: { light: [1, -0.4] }, gold: { light: [1, -0.2] }, sil: {},
};
// abCast(ctx, P, w, h, draw, m, o): a person-sized cel through the story finish (the palette already carries the model tint)
// people only (v3, Fable review 2 note 3): in the night, lamp and cave models the hard shade is a narrow shape (shadeD) so skin keeps
// its own colour on the lit two thirds of the face; in the cave the shade is warm amber (the violet stays the 4 px rim)
const AB_PSHADE = {};
function abCast(ctx, P, w, h, draw, m, o = {}) { const s = P.s || 1, F = AB_FIN[m] || {}; abCel(ctx, [P.x, P.y + 10 * s, w * s, h * s], draw, { k: 0, ...F, ...(AB_PSHADE[m] || {}), rim: null, ...o }); }

// ---------- timing helpers ----------
const AB_T2 = (t) => celStep(t, THEME.celFps || 12);     // characters on twos
const AB_T3 = (t) => celStep(t, 8);                      // blinks and lip flaps on threes
const abIn = (t, a, b) => t >= a && t < b;
const abE = (t, a, d, e = 'inOut') => K.ease[e](K.clamp((t - a) / d));
// lip flaps on threes while [a, b): 0..1, never in sync with another speaker (seed)
function abTalk(t, a, b, seed = 1, amp = 0.9) { if (t < a || t >= b) return 0; const u = AB_T3(t); return amp * (0.25 + 0.75 * Math.abs(Math.sin(u * 9.3 + seed * 1.9) * Math.sin(u * 4.1 + seed))); }
// an eased one-off blink at time tb (lid 0..1, 3-4 frames shut), for blinks on a head turn
function abBlinkAt(t, tb) { const d = t - tb; if (d < 0 || d > 0.32) return 0; return d < 0.11 ? d / 0.11 : d < 0.15 ? 1 : 1 - (d - 0.15) / 0.17; }
function abLid(t, seed, extra = []) { let v = blink(AB_T3(t), seed); for (const tb of extra) v = Math.max(v, abBlinkAt(AB_T3(t), tb)); return v; }
const abP = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];   // world -> panel units

// ---------- light: bands, glow, speed lines, glints ----------
// coloured bands sweeping across a held cel (light moves, the drawing does not). rect in the current space.
function abBands(ctx, rect, t, o = {}) {
  const [x, y, w, h] = rect, cols = o.cols || ['#ffd36a', '#7fe3ff'], ang = o.angle ?? -0.55, bw = o.w || 130, sp = o.speed || 260, a = o.alpha ?? 0.22, n = o.n || 3;
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); ctx.globalCompositeOperation = o.mode || 'screen';
  ctx.translate(x + w / 2, y + h / 2); ctx.rotate(ang);
  const span = Math.hypot(w, h) + bw * 2;
  for (let i = 0; i < n; i++) { const px = (((t * sp + i * span / n + (o.phase || 0)) % span) + span) % span - span / 2;
    ctx.globalAlpha = a * (i % 2 ? 0.7 : 1); ctx.fillStyle = cols[i % cols.length]; ctx.fillRect(px - bw / 2, -span, bw * (i % 2 ? 0.55 : 1), span * 2); }
  ctx.restore();
}
// backlit glow with halation: additive radial (o.col), strength k
function abGlow(ctx, x, y, r, k = 1, col = '#ffd36a') {
  if (k <= 0) return; ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = Math.min(1, k);
  const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, K.rgba(col, 0.75)); g.addColorStop(0.35, K.rgba(col, 0.28)); g.addColorStop(1, K.rgba(col, 0));
  ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2); ctx.restore();
}
// 4-point star glint (cel highlight), size r, 0..1 life p
function abGlint(ctx, x, y, r, p = 1, col = '#ffffff') {
  if (p <= 0 || p >= 1) return; const k = Math.sin(Math.PI * p); ctx.save(); ctx.translate(x, y); ctx.rotate(p * 0.6); ctx.globalAlpha *= k; ctx.fillStyle = col; ctx.shadowColor = '#ffe9a0'; ctx.shadowBlur = r * 0.8;
  ctx.beginPath(); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, rr = i % 2 ? r * 0.16 * k : r * k; ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } ctx.closePath(); ctx.fill(); ctx.restore();
}
// glints popping on twos at seeded spots inside a rect
function abGlints(ctx, rect, t, n, seed, r = 16, rate = 1.3) {
  const [x, y, w, h] = rect, R = K.rng(seed), tc = AB_T2(t);
  for (let i = 0; i < n; i++) { const px = x + R() * w, py = y + R() * h, ph = R(), per = 1.2 + R() * 1.4; const u = ((tc * rate / per + ph) % 1); if (u < 0.3) abGlint(ctx, px, py, r * (0.7 + R() * 0.6), u / 0.3); }
}
// horizontal speed lines (o.dir -1 = travel to the left): streaks on ones
function abSpeed(ctx, rect, t, o = {}) {
  const [x, y, w, h] = rect, R = K.rng(o.seed || 5), n = o.n || 26, sp = (o.speed || 2600) * (o.dir || 1);
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); ctx.lineCap = 'round';
  for (let i = 0; i < n; i++) { const py = y + R() * h, len = 120 + R() * 320, ph = R() * (w + len * 2), px = x + ((((-t * sp) + ph) % (w + len * 2)) + (w + len * 2)) % (w + len * 2) - len;
    ctx.globalAlpha = (o.alpha ?? 0.5) * (0.4 + R() * 0.6); ctx.strokeStyle = i % 3 ? (o.col || '#fff1d8') : (o.col2 || '#ffb3e0'); ctx.lineWidth = 2 + R() * 4; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + len, py); ctx.stroke(); }
  ctx.restore();
}
// a cel blob (flat fill + hard shade + coloured line), the building block for the props below
function abBlob(ctx, cx, cy, rx, ry, fill, shade, o = {}) { celShade(ctx, ell(cx, cy, rx, ry, o.n || 24), fill, shade, { light: o.light || [-1, -1], off: o.off ?? Math.min(rx, ry) * 0.35, hi: o.hi, lw: o.lw ?? 3.5, line: o.line }); }
const abDark = (c, k = 0.45) => abMul(c, '#2b1a3a', k);
const abLight = (c, k = 0.4) => abHex(...K.hex(c).map((v) => v + (255 - v) * k));

// ---------- props ----------
// sesameRock: the great rock (seam at x, base y), 650 x 650 at s 1. o: {open 0..1, crack 0..1, glow 0..1, model, s, t}
// Closed and uncracked it is ONE painted mass (airbrushed top light, darker base, soft asymmetric weathering, moss patches, a warm
// sunset rim in the dusk models): no seam line, so the split is a real reveal. Split, the same painting is clipped into two halves.
const AB_ROCK_COL = {   // fill, shade, top light, contact shadow, rim (dusk side)
  afternoon: ['#c49a74', '#7e5a6c', '#f6d4a4', '#6a4a5a', null], dusk: ['#b8847e', '#7a5468', '#ffc0a0', '#4a2e48', '#ffb070'],
  late: ['#7a6488', '#463a5e', '#c89ac0', '#241a36', '#f09070'], predawn: ['#4a4a72', '#24243e', '#9ab4d8', '#141a36', '#ffc8a0'],
  sil: ['#241830', '#160e20', '#3a2a4a', '#0e0814', null],
};
const AB_ROCK_L = [[0, -650], [-130, -632], [-230, -560], [-292, -430], [-322, -260], [-330, -110], [-318, 4], [0, 4]];
const AB_ROCK_R = [[0, -650], [120, -626], [236, -540], [300, -400], [326, -220], [332, -70], [322, 4], [0, 4]];
const AB_ROCK_ALL = [...AB_ROCK_L.slice(0, -1), ...AB_ROCK_R.slice(1, -1).reverse()];
function abRockPaint(m) {
  return K.cached('ab:rockpaint:' + m, () => { const Q = 1.5, c = K.layer(840 * Q, 840 * Q), x = c.getContext('2d'), [fill, shade, hi, , rim] = AB_ROCK_COL[m] || AB_ROCK_COL.afternoon, R = K.rng(71);
    x.scale(Q, Q); x.translate(420, 720);
    x.save(); K.poly(x, AB_ROCK_ALL, true); x.clip();
    const g = x.createLinearGradient(0, -650, 0, 0); g.addColorStop(0, abMul(fill, hi, 0.5)); g.addColorStop(0.55, fill); g.addColorStop(1, abMul(shade, fill, 0.3)); x.fillStyle = g; x.fillRect(-400, -700, 800, 720);
    abGlaze(x, -150, -470, 360, hi, 0.55); abGlaze(x, 210, -130, 380, abDark(shade, 0.3), 0.55); abGlaze(x, 260, -420, 220, abDark(shade, 0.2), 0.3);
    x.save(); x.filter = 'blur(5px)'; for (const [bx, by, bw, bh, a] of [[-120, -300, 260, 46, 0.22], [110, -470, 200, 36, 0.18], [-40, -150, 330, 50, 0.2], [190, -260, 160, 40, 0.16]]) { x.fillStyle = K.rgba(abDark(shade, 0.25), a); x.beginPath(); x.ellipse(bx, by, bw, bh, -0.12, 0, 7); x.fill(); } x.restore();
    x.save(); x.filter = 'blur(1.5px)'; x.lineCap = 'round';   // soft asymmetric weathering, never a vertical line at the seam
    for (let i = 0; i < 16; i++) { const px = -290 + R() * 600, py = -600 + R() * 580; if (Math.abs(px) < 50) continue; const len = 30 + R() * 90, an = -0.6 + R() * 1.2 + (R() < 0.5 ? Math.PI : 0);
      x.strokeStyle = K.rgba(abDark(shade, 0.35), 0.25 + R() * 0.3); x.lineWidth = 2 + R() * 3; x.beginPath(); x.moveTo(px, py); x.quadraticCurveTo(px + Math.cos(an) * len * 0.5 + 10, py + Math.sin(an) * len * 0.5 + 12, px + Math.cos(an) * len, py + Math.sin(an) * len); x.stroke(); }
    x.restore();
    x.save(); x.filter = 'blur(7px)'; for (const [mx, my, mr, a] of [[-250, -30, 70, 0.55], [-110, -10, 50, 0.45], [230, -20, 60, 0.4], [-285, -300, 34, 0.35], [140, -560, 28, 0.25]]) { x.fillStyle = K.rgba(abMul('#5f9a4a', fill, 0.45), a); x.beginPath(); x.ellipse(mx, my, mr, mr * 0.5, 0, 0, 7); x.fill(); } x.restore();
    if (rim) { const rg = x.createLinearGradient(-340, 0, -120, 0); rg.addColorStop(0, K.rgba(rim, 0.95)); rg.addColorStop(1, K.rgba(rim, 0)); x.save(); x.filter = 'blur(3px)'; x.strokeStyle = rg; x.lineWidth = 34; K.poly(x, AB_ROCK_ALL, true); x.stroke(); x.restore(); }
    x.restore();
    x.save(); x.strokeStyle = abDark(shade, 0.45); x.lineWidth = 4; x.lineJoin = 'round'; K.poly(x, AB_ROCK_ALL, true); x.stroke(); x.restore();
    return c; });
}
function abRockShadow(m) { return K.cached('ab:rockshadow:' + m, () => { const c = K.layer(1000, 200), x = c.getContext('2d'); x.filter = 'blur(14px)'; x.fillStyle = K.rgba((AB_ROCK_COL[m] || AB_ROCK_COL.afternoon)[3], 0.55); x.beginPath(); x.ellipse(500, 100, 420, 46, 0, 0, 7); x.fill(); return c; }); }
function abRock(ctx, x, y, o = {}) {
  const s = o.s || 1, op = K.clamp(o.open || 0), cr = K.clamp(o.crack || 0), gl = K.clamp(o.glow ?? 0), m = o.model || 'afternoon', [fill, shade] = AB_ROCK_COL[m], t = o.t || 0, img = abRockPaint(m);
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.drawImage(abRockShadow(m), -500, -90, 1000, 200);
  // the door behind the halves: an arched opening full of gold light, three steps going down (only while the rock is open)
  if (op > 0.005) {
    const D = townArchPts(-110, 110, -330, 2, 'round');
    ctx.save(); K.poly(ctx, D, true); const g = ctx.createRadialGradient(0, -90, 10, 0, -120, 300); g.addColorStop(0, '#fff6c8'); g.addColorStop(0.4, '#ffc84a'); g.addColorStop(1, '#b8601a');
    ctx.fillStyle = g; ctx.fill(); ctx.clip(); for (let k = 0; k < 3; k++) { ctx.fillStyle = k % 2 ? '#e89a2a' : '#ffd36a'; ctx.fillRect(-120 + k * 14, -40 + k * 16, 240 - k * 28, 9); }
    if (o.inside) o.inside(ctx);   // figures going down the steps, clipped to the opening
    ctx.restore(); ink(ctx, D, 4, 3, '#6a3a1a');
  }
  if (op <= 0.005 && cr <= 0.001) ctx.drawImage(img, -420, -720, 840, 840);
  else for (const [pts, sd] of [[AB_ROCK_L, -1], [AB_ROCK_R, 1]]) { ctx.save(); ctx.translate(sd * 115 * op, 0); ctx.save(); K.poly(ctx, pts, true); ctx.clip(); ctx.drawImage(img, -420, -720, 840, 840);
    if (op > 0.005) { ctx.strokeStyle = abDark(shade, 0.3); ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(0, -650); ctx.lineTo(0, 4); ctx.stroke(); } ctx.restore();
    ctx.strokeStyle = abDark(shade, 0.45); ctx.lineWidth = 4; ctx.lineJoin = 'round'; K.poly(ctx, pts, true); ctx.stroke(); ctx.restore(); }
  // the crack of light climbing the seam
  if (cr > 0 && op < 0.95) { const top = -650 * cr; ctx.save(); ctx.lineCap = 'round'; ctx.shadowColor = '#ffd36a'; ctx.shadowBlur = 24; ctx.strokeStyle = '#fff3b0'; ctx.lineWidth = (6 + 20 * op) * Math.min(1, cr * 3);
    ctx.beginPath(); ctx.moveTo(0, 0); for (let yy = 0; yy >= top; yy -= 40) ctx.lineTo(Math.sin(yy * 0.05) * 6, yy); ctx.stroke(); ctx.restore(); }
  ctx.restore();
  // light: halation in the doorway and a wedge of gold on the ground fanning toward the viewer's left (tied to the opening)
  const gk = gl * Math.min(1, op * 6 + (cr > 0 ? 0.5 * cr : 0));
  if (gk > 0.01) { const w0 = 110 * s * Math.max(op, 0.08);
    ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = 0.55 * gk; ctx.fillStyle = '#ffcf5a';
    ctx.beginPath(); ctx.moveTo(x - w0, y + 2); ctx.lineTo(x + w0, y + 2); ctx.lineTo(x - 80 * s, y + 140 * s); ctx.lineTo(x - (500 + 200 * op) * s, y + 120 * s); ctx.closePath(); ctx.fill(); ctx.restore();
    abGlow(ctx, x, y - 160 * s, 420 * s * (0.6 + 0.4 * op), gk * (0.8 + 0.05 * Math.sin(t * 9)), '#ffc24a'); }
}
// sack: fill 1 = round and heavy, 0 = flat and folded. a coin mark on it. rot radians
function abSack(ctx, x, y, s = 1, fill = 1, o = {}) {
  const col = o.col || '#c9a06a', sh = o.shade || '#8a6440', f = K.clamp(fill);
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s * (o.sq || 1));
  if (f > 0.2) { const w = 50 + 14 * f, h = 40 + 46 * f;
    celShade(ctx, [[-w, 0], [-w - 6, -h * 0.5], [-w * 0.6, -h], [-16, -h - 6], [-10, -h - 26], [10, -h - 26], [16, -h - 6], [w * 0.6, -h], [w + 6, -h * 0.5], [w, 0]], col, sh, { light: [-1, -1], off: 14, lw: 3.5, line: abDark(sh) });
    seg(ctx, -16, -h - 8, 16, -h - 8, o.tie ? 8 : 5, o.tie || abDark(sh, 0.2), o.tie ? 1.5 : 0); if (o.coin) { abBlob(ctx, 0, -h * 0.45, 14, 14, '#ffd36a', '#c88a1a', { lw: 2.5 }); }
  } else { const fl = o.flap || 0;
    celShade(ctx, [[-56, 0], [-60, -14], [-20, -20 - fl * 0.3], [30, -22 - fl], [64 + fl * 0.5, -18 - fl * 1.2], [58, 0]], col, sh, { light: [-1, -1], off: 8, lw: 3, line: abDark(sh) }); }
  ctx.restore();
}
// a gold (or silver) coin mound: ellipse stack with hard highlight crescents
function abCoinPile(ctx, x, y, w, h, o = {}) {
  const pal = o.silver ? ['#d8dcef', '#8f94b8', '#ffffff'] : ['#ffcf3a', '#c07a12', '#fff3b0'];
  celShade(ctx, [[x - w / 2, y], [x - w * 0.38, y - h * 0.45], [x - w * 0.18, y - h * 0.86], [x, y - h], [x + w * 0.2, y - h * 0.84], [x + w * 0.4, y - h * 0.4], [x + w / 2, y]], pal[0], pal[1], { light: [-1, -0.8], off: w * 0.12, hi: pal[2], lw: 3.5, line: abDark(pal[1]) });
  const R = K.rng(o.seed || 3); ctx.save(); ctx.strokeStyle = abDark(pal[1], 0.2); ctx.lineWidth = 2;
  for (let i = 0; i < Math.round(w / 12); i++) { const u = R(), v = R(); const px = x + (u - 0.5) * w * (1 - v * 0.6), py = y - v * h * 0.9; ctx.beginPath(); ctx.ellipse(px, py, 9, 4, 0, 0, 7); ctx.stroke(); }
  ctx.restore();
}
// open treasure chest (box w 200 x 150 at s 1), lid 0..1 open
function abChest(ctx, x, y, s = 1, lid = 0.8) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const la = -lid * 1.9; ctx.save(); ctx.translate(-100, -120); ctx.rotate(la); celShade(ctx, [[0, 0], [200, 0], [196, -40], [100, -62], [4, -40]], '#9a4a2a', '#5e2616', { light: [-1, -1], off: 10, lw: 4, line: '#3a160c' }); ctx.restore();
  abCoinPile(ctx, 0, -110, 190, 70, { seed: 9 });
  celShade(ctx, K.rectPts(-100, -120, 200, 120), '#a8522c', '#64281a', { light: [-1, -1], off: 16, lw: 4, line: '#3a160c' });
  for (const bx of [-70, 70]) shape(ctx, K.rectPts(bx - 9, -120, 18, 120), '#ffcf3a', { lw: 2.5, line: '#8a5a12' });
  shape(ctx, K.rectPts(-14, -96, 28, 30), '#ffcf3a', { lw: 2.5 });
  ctx.restore();
}
// tied bale of cloth (150 x 105)
function abBale(ctx, x, y, col, s = 1) { const sh = abDark(col, 0.4); celShade(ctx, K.rectPts(x - 75 * s, y - 105 * s, 150 * s, 105 * s), col, sh, { light: [-1, -1], off: 14 * s, lw: 3.5, line: abDark(col, 0.65) });
  for (const k of [-0.3, 0.3]) seg(ctx, x + 150 * s * k * 0.9, y - 104 * s, x + 150 * s * k * 0.9, y - 2, 5 * s, '#e8d2a0', 1.5); }
// coin purse (empty: flat, upside down: mouth down)
function abPurse(ctx, x, y, s = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  celShade(ctx, [[-26, 0], [-30, 22], [-18, 40], [18, 40], [30, 22], [26, 0], [12, -6], [-12, -6]], '#8a5a3a', '#5a3420', { light: [-1, -1], off: 7, lw: 3 });
  seg(ctx, -12, -4, 12, -4, 4, '#e8d2a0', 1); ctx.restore(); }
// wood axe: handle 110 along +x from the grip, wedge head
function abAxe(ctx, x, y, rot, s = 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  seg(ctx, -30, 0, 92, 0, 9, '#b07a42', 3); celShade(ctx, [[80, -8], [112, -22], [122, 0], [112, 22], [80, 8]], '#c8d0e8', '#6a7090', { light: [-1, -1], off: 6, lw: 3, line: '#3a3e5a' }); ctx.restore(); }
// bundle of 9 billets tied with two ropes (130 x 70)
function abBundle(ctx, x, y, s = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const R = K.rng(41); for (let i = 0; i < 9; i++) { const r = i % 3, c = Math.floor(i / 3), yy = -12 - r * 20 - (c % 2) * 4, xx = -4 + (R() - 0.5) * 10;
    seg(ctx, xx - 62, yy, xx + 62, yy, 18, i % 2 ? '#a8743e' : '#bd8a4e', 3); shape(ctx, ell(xx + 62, yy, 8, 9, 12), '#f0d29a', { lw: 2.5 }); }
  for (const bx of [-28, 30]) seg(ctx, bx, -4, bx, -66, 5, '#e8d2a0', 1.5); ctx.restore(); }
// handcart: bed centre x, ground y; wheel angle w; tilt; load: flapping empty sacks (t)
function abCart(ctx, x, y, o = {}) {
  const tl = o.tilt || 0, by = y - 95 - (o.bounce || 0);
  ctx.save(); ctx.translate(x, by); ctx.rotate(tl);
  seg(ctx, 120, 6, 300, 24, 9, '#8a5a32', 3);   // shafts to the collar
  if (o.inside) o.inside(ctx, by);                // Cassim standing in the bed (drawn by the scene, local coords)
  if (o.load) { for (let i = 0; i < 6; i++) { const fl = 10 * Math.sin((o.t || 0) * 9 + i * 1.7); abSack(ctx, -100 + i * 34, -46 - (i % 2) * 12, 0.62, 0, { flap: fl, col: i % 2 ? '#c9a06a' : '#b88c58', rot: -0.1 + 0.05 * i }); } }
  celShade(ctx, K.rectPts(-130, -50, 260, 60), '#a86a3a', '#6a3a1e', { light: [-1, -1], off: 10, lw: 4, line: '#3a1e10' });
  for (let k = -110; k <= 110; k += 44) seg(ctx, k, -48, k, 8, 4, '#6a3a1e', 0);
  ctx.restore();
  const wx = x - 10, wy = y - 62; ctx.save(); ctx.translate(wx, wy); ctx.rotate(o.wheel || 0);
  abBlob(ctx, 0, 0, 62, 62, '#8a5a32', '#5a3420', { lw: 4, off: 8, line: '#3a1e10' }); shape(ctx, ell(0, 0, 50, 50, 24), '#3a2a3a', { lw: 2.5 });
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; seg(ctx, 0, 0, Math.cos(a) * 50, Math.sin(a) * 50, 6, '#c08a52', 1.5); } shape(ctx, ell(0, 0, 11, 11, 12), '#5a3420', { lw: 2.5 });
  ctx.restore();
}
// map card drawn on: house, dotted road through trees, rock (p 0..1); a dark tag box with a cyan rule (the style's label look)
function abMapCard(ctx, x, y, p, s = 1, rot = 0) {
  if (p <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.fillStyle = 'rgba(40,30,70,0.94)'; ctx.strokeStyle = '#7fe3ff'; ctx.lineWidth = 6; ctx.beginPath(); ctx.roundRect(-150, -100, 300, 200, 14); ctx.fill(); ctx.stroke();
  const q = (a, b) => K.clamp((p - a) / (b - a));
  if (q(0, 0.25) > 0) { ctx.globalAlpha = q(0, 0.25); shape(ctx, K.rectPts(-122, 10, 44, 34), '#f3e2b8', { lw: 3 }); shape(ctx, [[-128, 12], [-100, -14], [-72, 12]], C.red, { lw: 3 }); ctx.fillStyle = '#ffd36a'; ctx.fillRect(-106, 24, 10, 12); ctx.globalAlpha = 1; }
  const path = K.bezier([-70, 30], [-20, -40], [40, 70], [80, 10], 30), n = Math.floor(path.length * q(0.2, 0.75));
  ctx.save(); ctx.fillStyle = '#fff6c8'; ctx.shadowColor = '#ffd36a'; ctx.shadowBlur = 10; for (let i = 0; i < n; i += 3) { ctx.beginPath(); ctx.arc(path[i][0], path[i][1], 7, 0, 7); ctx.fill(); } ctx.restore();
  if (q(0.3, 0.6) > 0) { ctx.globalAlpha = q(0.3, 0.6); for (const [tx, ty] of [[-30, -40], [10, 40]]) { shape(ctx, [[tx - 20, ty + 14], [tx, ty - 30], [tx + 20, ty + 14]], '#7ae08a', { lw: 3 }); } ctx.globalAlpha = 1; }
  if (q(0.7, 1) > 0) { ctx.globalAlpha = q(0.7, 1); abRock(ctx, 108, 50, { s: 0.13, model: 'afternoon', crack: 1, glow: o_glow(p) }); ctx.globalAlpha = 1; }
  ctx.restore();
}
const o_glow = (p) => K.clamp((p - 0.85) * 6);

// abCS(ctx, pts, fill, shade, o): a cel shape whose FILL is the lit majority and whose SHADE is a hard crescent on the side away
// from the light (o.light, o.off), optional hi crescent on the light side, coloured outline. (Used for the close-up heads and hands,
// so a head's lit skin is the same colour as the puppet's skin.)
function abCS(ctx, pts, fill, shade, o = {}) {
  const [lx, ly] = o.light || [-1, -1], l = Math.hypot(lx, ly) || 1, off = o.off ?? 10, dx = lx / l * off, dy = ly / l * off;
  ctx.save(); K.poly(ctx, pts, true); ctx.fillStyle = fill; ctx.fill(); ctx.clip();
  const cres = (sx, sy, col, a) => { ctx.save(); ctx.beginPath(); ctx.rect(-1e4, -1e4, 2e4, 2e4); pts.forEach((p, i) => (i ? ctx.lineTo(p[0] + sx, p[1] + sy) : ctx.moveTo(p[0] + sx, p[1] + sy))); ctx.closePath(); ctx.fillStyle = col; ctx.globalAlpha = a; ctx.fill('evenodd'); ctx.restore(); };
  cres(dx, dy, shade, 1); if (o.hi) cres(-dx * 0.5, -dy * 0.5, o.hi, 0.75);
  ctx.restore();
  if (o.lw !== 0) ink(ctx, pts, o.lw || 4, 1, o.line || C.black);
}
// ---------- the anime face (model sheet: one head function for every close-up) ----------
// abFace(ctx, x, y, k, F): head centre (x, y), scale k (1 = head about 500 units wide). F:
//   who 'ali' | 'cassim', gaze [gx, gy] (-1..1), lid 0..1 (lidL / lidR override per eye), iris 0.4..1.2 (shrinks in fear),
//   brow -1 (raised, worried) .. 1 (angry), mouth 'none' | 'set' | 'o' | 'smile' | 'grin' | 'talk', talk 0..1, coin 0..1 (coin pupils),
//   reflect(ctx, r) drawn inside each iris (r = iris radius), sweat 0..1 (bead slides), m colour model, rim colour, hand 0..1 (hand over the mouth)
// v3 model sheet (Fable review 2 note 2): the heads take skin, turban and facial hair from the puppets' tables. Skin = the puppet skin
// (C.skin) in every colour model (only the shade crescent takes the model); Ali: cream turban, vermilion band, moustache + small
// goatee; Cassim: saffron turban (= AB_CAS0.hc / hd in ab_cast.js), red jewel, white feather, wide moustache, no chin beard.
const AB_FACE = {
  ali: { skin: C.skin, shade: '#d99a80', line: '#6a3a2a', iris: '#6b3e22', irisD: '#3e2012', tur: '#f6efe0', turS: '#cfc4ae', band: AB_ACC, beard: '#2a1a14', beardK: 'goatee' },
  cassim: { skin: C.skin, shade: '#d99a80', line: '#5e3020', iris: '#4a3018', irisD: '#24140a', tur: '#f2a71b', turS: '#c07a10', band: '#c8481a', beard: '#2a1612', beardK: 'tache', jewel: '#e8364f', feather: true },
};
// the shade crescent per colour model (lilac only as a narrow shape at night; warm in the cave and in gold light)
const AB_FSHADE = { night: '#c08a9a', lamp: '#c88c88', cave: '#d08a62', gold: '#d48a5a', late: '#b88aa0', dusk: '#c48a96', predawn: '#b88c9c' };
function abFace(ctx, x, y, k, F = {}) {
  const D = AB_FACE[F.who || 'ali'], M = F.m ? AB_MODEL[F.m] : null, col = (c) => (M ? abMul(c, M.tint, M.k * 0.55) : c), lw = (w) => w / Math.max(0.5, Math.sqrt(k));
  const skin = D.skin, sh = AB_FSHADE[F.m] || D.shade, line = D.line, gz = F.gaze || [0, 0], fat = F.who === 'cassim' ? 1.12 : 1;
  const celShade = abCS;   // the heads use the lit-majority cel (see abCS)
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  // neck and collar (only shows on wider views)
  celShade(ctx, [[-110, 220], [110, 220], [150, 420], [-150, 420]], skin, sh, { light: [-1, -0.4], off: 30, lw: lw(3), line });
  // face: long egg with a soft-point chin
  const face = [[-200 * fat, -150], [-208 * fat, -10], [-190 * fat, 110], [-140 * fat, 220], [-60, 285], [0, 300], [60, 285], [140 * fat, 220], [190 * fat, 110], [208 * fat, -10], [200 * fat, -150], [0, -200]];
  celShade(ctx, face, skin, sh, { light: F.light || [-1, -0.5], off: 70, lw: lw(3.5), line });
  for (const sd of [-1, 1]) celShade(ctx, ell(sd * 214 * fat, 30, 30, 52, 16), skin, sh, { light: [-sd, 0], off: 12, lw: lw(3), line });   // ears
  // beard
  const bc = D.beard, bo = { light: [-1, -1], off: 8, lw: lw(3), line: '#120806' };
  if (D.beardK === 'tache') {   // Cassim: the puppet's wide moustache (two heavy wings under the nose, tips curling up)
    for (const sd of [-1, 1]) celShade(ctx, [[sd * 4, 140], [sd * 60, 138], [sd * 120, 128], [sd * 168, 96], [sd * 176, 116], [sd * 150, 160], [sd * 96, 180], [sd * 40, 176], [sd * 4, 166]], bc, abDark(bc, 0.4), bo);
  } else {                      // Ali: the puppet's moustache and a small goatee on the chin
    for (const sd of [-1, 1]) celShade(ctx, [[sd * 4, 142], [sd * 50, 140], [sd * 96, 150], [sd * 112, 170], [sd * 70, 168], [sd * 30, 166], [sd * 4, 162]], bc, abDark(bc, 0.4), bo);
    celShade(ctx, [[-38, 236], [38, 236], [44, 262], [20, 300], [0, 310], [-20, 300], [-44, 262]], bc, abDark(bc, 0.4), bo);
  }
  // nose: a shadow plane and one stroke
  ctx.save(); ctx.fillStyle = sh; ctx.beginPath(); ctx.moveTo(6, 30); ctx.lineTo(30, 128); ctx.lineTo(4, 136); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = line; ctx.lineWidth = lw(4); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-4, 132); ctx.lineTo(22, 138); ctx.stroke(); ctx.restore();
  // mouth
  const mo = F.mouth || 'set', tk = F.talk || 0;
  ctx.save(); ctx.strokeStyle = line; ctx.lineWidth = lw(5); ctx.lineCap = 'round';
  if (mo === 'o' || (mo === 'talk' && tk > 0.15)) { const oh = mo === 'o' ? 34 : 10 + 26 * tk; shape(ctx, ell(0, 196, 26, oh, 18), '#5a1a22', { lw: lw(4), line }); if (oh > 20) shape(ctx, ell(0, 196 + oh * 0.5, 14, oh * 0.3, 12), '#e8707a', { lw: 0 }); }
  else if (mo === 'smile' || mo === 'grin') { const g = mo === 'grin' ? (F.grin ?? 1) : 0.4; ctx.beginPath(); ctx.moveTo(-60 - 30 * g, 180 - 10 * g); ctx.quadraticCurveTo(0, 210 + 30 * g, 60 + 30 * g, 180 - 10 * g); ctx.stroke();
    if (mo === 'grin' && g > 0.3) { ctx.fillStyle = '#fffaf0'; ctx.beginPath(); ctx.moveTo(-50 - 26 * g, 184 - 8 * g); ctx.quadraticCurveTo(0, 204 + 22 * g, 50 + 26 * g, 184 - 8 * g); ctx.quadraticCurveTo(0, 196, -50 - 26 * g, 184 - 8 * g); ctx.fill(); if (F.goldTeeth) abGlint(ctx, 30, 196, 26, F.goldTeeth); } }
  else if (mo !== 'none') { ctx.beginPath(); ctx.moveTo(-40, 192); ctx.quadraticCurveTo(0, 186 + (F.frown ? -10 : 4), 40, 192); ctx.stroke(); }
  ctx.restore();
  // eyes: almond, tall layered iris, two highlights, thick upper lash line flicking outward
  const by = F.brow || 0;
  for (const sd of [-1, 1]) {
    const ex = sd * 92, ey = 10, ew = 70, eh = 44 + 8 * (F.wide || 0), lid = K.clamp((sd < 0 ? F.lidL : F.lidR) ?? F.lid ?? 0);
    const alm = [[ex - sd * ew, ey + 4], [ex - sd * ew * 0.5, ey - eh * 0.95], [ex + sd * ew * 0.3, ey - eh * 1.05], [ex + sd * ew * 1.05, ey - 4], [ex + sd * ew * 0.4, ey + eh * 0.85], [ex - sd * ew * 0.5, ey + eh * 0.8]];
    ctx.save(); K.poly(ctx, alm, true); ctx.fillStyle = '#fffaf0'; ctx.fill(); ctx.clip();
    const ir = 30 * (F.iris ?? 1), ix = ex + gz[0] * 30, iy = ey + gz[1] * 14;
    if ((F.coin || 0) > 0.05) { const c = F.coin; abBlob(ctx, ix, iy, 32 * c, 32 * c, '#ffcf3a', '#c07a12', { lw: lw(3), hi: '#fff3b0' }); ctx.strokeStyle = '#8a5212'; ctx.lineWidth = lw(3); ctx.beginPath(); ctx.arc(ix, iy, 20 * c, 0, 7); ctx.stroke(); }
    else { ctx.fillStyle = col(D.iris); ctx.beginPath(); ctx.ellipse(ix, iy, ir * 0.82, ir * 1.1, 0, 0, 7); ctx.fill();
      ctx.fillStyle = D.irisD; ctx.beginPath(); ctx.ellipse(ix, iy - ir * 0.35, ir * 0.82, ir * 0.6, 0, Math.PI, 0); ctx.fill();
      ctx.fillStyle = '#120a10'; ctx.beginPath(); ctx.ellipse(ix, iy + 2, ir * 0.36, ir * 0.48, 0, 0, 7); ctx.fill();
      if (F.reflect) { ctx.save(); ctx.beginPath(); ctx.ellipse(ix, iy, ir * 0.82, ir * 1.1, 0, 0, 7); ctx.clip(); ctx.translate(ix, iy); F.reflect(ctx, ir, sd); ctx.restore(); } }
    ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.ellipse(ix - ir * 0.32, iy - ir * 0.42, ir * 0.24, ir * 0.3, -0.4, 0, 7); ctx.fill(); ctx.beginPath(); ctx.ellipse(ix + ir * 0.3, iy + ir * 0.4, ir * 0.1, ir * 0.1, 0, 0, 7); ctx.fill();
    if (lid > 0) { ctx.fillStyle = skin; ctx.fillRect(ex - ew * 1.2, ey - eh * 1.2, ew * 2.4, eh * 2.3 * lid); }
    ctx.restore();
    // lash line follows the lid; lower lid line
    const ly = ey - eh * 1.0 + eh * 1.9 * lid;
    ctx.save(); ctx.strokeStyle = '#2a1018'; ctx.lineCap = 'round'; ctx.lineWidth = lw(9); ctx.beginPath(); ctx.moveTo(ex - sd * ew * 1.02, ey + 2 + (ly - ey) * 0.4); ctx.quadraticCurveTo(ex, ly - 6, ex + sd * ew * 1.12, ly + 4 - (lid > 0.9 ? 0 : 8)); ctx.stroke();
    ctx.lineWidth = lw(5); ctx.beginPath(); ctx.moveTo(ex + sd * ew * 0.95, ly - 2); ctx.lineTo(ex + sd * ew * 1.3, ly - 16); ctx.stroke();
    ctx.lineWidth = lw(3); ctx.strokeStyle = line; ctx.beginPath(); ctx.moveTo(ex - sd * ew * 0.4, ey + eh * 0.95); ctx.quadraticCurveTo(ex + sd * ew * 0.2, ey + eh * 1.05, ex + sd * ew * 0.8, ey + eh * 0.5); ctx.stroke();
    // brow: long thin, raised (worried) or knitted (angry)
    const b0 = ey - 66 - (by < 0 ? -by * 26 : 0), inner = by > 0 ? by * 18 : by * 20;
    ctx.lineWidth = lw(F.who === 'cassim' ? 14 : 9); ctx.strokeStyle = D.beard; ctx.beginPath(); ctx.moveTo(ex - sd * ew * 0.95, b0 + inner); ctx.quadraticCurveTo(ex, b0 - 16, ex + sd * ew * 1.1, b0 + 8 - (by < 0 ? by * 6 : 0)); ctx.stroke(); ctx.restore();
  }
  // sweat bead
  if (F.sweat > 0) { const sy = -60 + 110 * F.sweat, sx = 176; ctx.save(); ctx.globalAlpha = K.clamp(4 * (1 - F.sweat)); celShade(ctx, [[sx, sy - 34], [sx + 14, sy - 2], [sx, sy + 12], [sx - 14, sy - 2]], '#cfeaff', '#7fb0e0', { light: [-1, -1], off: 5, lw: lw(3), line: '#3a5a9a' }); ctx.restore(); }
  // turban: a cloth dome over the brow, folds as hard cels, the accent band for Ali
  const T = [[-250 * fat, -120], [-262 * fat, -230], [-200, -380], [-60, -450], [80, -446], [210, -370], [262 * fat, -230], [250 * fat, -120], [120, -150], [0, -158], [-120, -150]];
  celShade(ctx, T, col(D.tur), col(D.turS), { light: [-1, -1], off: 34, hi: abLight(col(D.tur), 0.45), lw: lw(4), line: abDark(D.turS, 0.3) });
  ctx.save(); ctx.strokeStyle = col(D.turS); ctx.lineWidth = lw(7); for (const q of [[[-230, -200], [-40, -300], [200, -280]], [[-200, -300], [0, -380], [180, -350]]]) { ctx.beginPath(); K.poly(ctx, q); ctx.stroke(); } ctx.restore();
  const bandCol = F.who === 'ali' ? AB_ACC : col(D.band);
  ctx.save(); ctx.strokeStyle = bandCol; ctx.lineWidth = 26; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-246 * fat, -136); ctx.quadraticCurveTo(0, -176, 246 * fat, -136); ctx.stroke(); ctx.restore();
  if (D.feather) { ctx.save(); ctx.translate(16, -214); ctx.rotate(0.38); celShade(ctx, [[-14, 0], [-22, -110], [-6, -230], [10, -250], [20, -120], [14, 0]], '#fffaf0', '#cfc8de', { light: [-1, -0.2], off: 9, lw: lw(3), line: abDark(D.turS, 0.3) }); ctx.restore(); }
  if (D.jewel) { celShade(ctx, ell(0, -190, 30, 34, 20), D.jewel, '#8a1010', { light: [-1, -1], off: 12, hi: '#ffb0b0', lw: lw(3), line: '#5a0a0a' }); abGlint(ctx, -10, -200, 30, ((F.t || 0) * 0.8) % 1); }
  // a hand over the mouth (Ali hiding)
  if (F.hand > 0) { const hy = 420 - 230 * F.hand; celShade(ctx, [[-150, hy + 40], [-120, hy - 50], [-40, hy - 70], [60, hy - 66], [140, hy - 40], [160, hy + 60], [120, hy + 200], [-130, hy + 200]], skin, sh, { light: [-1, -1], off: 20, lw: lw(3.5), line });
    ctx.save(); ctx.strokeStyle = line; ctx.lineWidth = lw(3); for (const fx of [-60, 0, 60]) { ctx.beginPath(); ctx.moveTo(fx, hy - 60); ctx.lineTo(fx + 6, hy + 10); ctx.stroke(); } ctx.restore(); }
  ctx.restore();
}

// the big hand cel (ALI-01-ANIME ab_s3.js abHandCel, copied unchanged): sleeve, back of the hand, fingers curling 0..1, thumb
function abHandCel(ctx, x, y, k, curl = 0, sd = 1, F = AB_FACE.ali) {
  const celShade = abCS;   // lit-majority cel: the hands are the puppet's skin
  ctx.save(); ctx.translate(x, y); ctx.scale(k * sd, k);
  celShade(ctx, [[-60, -300], [60, -300], [64, -40], [-64, -40]], '#8f8a40', '#64612a', { light: [-1, -0.3], off: 22, lw: 4, line: '#3e3a14' });   // sleeve
  celShade(ctx, [[-56, -50], [56, -50], [66, 20], [50, 70], [-50, 70], [-66, 20]], F.skin, F.shade, { light: [-1, -0.4], off: 18, lw: 4, line: F.line });   // back of the hand
  for (let i = 0; i < 4; i++) { const fx = -42 + i * 28, len = (i === 0 || i === 3 ? 70 : 88) * (1 - 0.62 * curl), bend = curl * 0.9;
    const pts = [[fx - 13, 60], [fx + 13, 60], [fx + 12 - bend * 20, 60 + len], [fx - bend * 30, 60 + len + 12], [fx - 12 - bend * 24, 60 + len]];
    celShade(ctx, pts, F.skin, F.shade, { light: [-1, -0.4], off: 8, lw: 3.5, line: F.line }); }
  celShade(ctx, [[60, 0], [96, 30], [104, 70], [80, 76], [56, 40]], F.skin, F.shade, { light: [-1, -0.4], off: 8, lw: 3.5, line: F.line });   // thumb
  ctx.restore();
}
