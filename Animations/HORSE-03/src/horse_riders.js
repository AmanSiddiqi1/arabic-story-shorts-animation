// ===== The Ebony Horse series: two riders, the cover cloth, the turban scrap, ghost outlines, the travel cloak (new in HORSE-03) =====
// twoRiders (front and rear seat on the ebony horse, ground or flight, with the rear rider's reaching arm drawn over the front rider),
// coverCloth (striped carpet cloth: draped over the horse, spread / flying, heap) with its shape helpers, turbanScrap (the saffron
// clue) and ehInvTail (the inventor's turban tail, whole or torn), ghostOutline (dashed flickering outline of what is missing),
// travelCloak (hooded sand cloak, standing or riding), cardboardPrince (a flat cut-out Firuz on a stick, for imagined lies),
// and the costume settings of the princess's parents. Episodes 4-5 copy this file unchanged. Pure functions of their arguments.

// ---------- costumes: the princess's father and mother; the finger-in-ear hand ----------
const EH_FKING = { costume: 'caliph', s: 1.03, age: 0.65, pal: { robe: '#2a5ad0', dot: '#1a3a90', sleeve: '#5a86f0', cape: '#d8dce8', capeDot: '#a8b0c8', trim: '#c8d0e0', sash: '#c8d0e0', hc: '#fff6ea', hd: '#c8d0e0', jewel: '#3a74ea', beard: '#5a5a6a' } };
const EH_QUEEN = { costume: 'lady', s: 0.95, age: 0.45, pal: { robe: '#d88ad0', dot: '#b068a8', sleeve: '#f2b8ea', trim: '#c8d0e0', sash: '#3a74ea', hc: '#fff3e0', hd: '#e0d0c0', jewel: '#3a74ea', band: '#c8d0e0', shoes: '#c8d0e0' } };
const EH_PLUGEAR = { R: [30, -196] };

// ---------- twoRiders ----------
// front seat 30 ahead of the single-rider seat, rear seat 40 behind it and 4 lower (horse-local units at s 1)
const EH_SEAT2 = { front: 30, rear: -40, rearDy: 4 };
function ehSeatShift(H, d, dy = 0) { const a = ehHorsePt(H, [0, 0]), b = ehHorsePt(H, [d, dy]); return { ...H, x: H.x + b[0] - a[0], y: H.y + b[1] - a[1] }; }
// a rider's frame: hip centre and rotation (seat frame of rideOn) for a mount P on the given seat shift
function ehRiderFrame(H, d, dy = 0, lurch = 0, bob = 0, ps = 1) { const Hs = ehSeatShift(H, d, dy), seat = mountSeat('horse', Hs), sg = Math.sign(H.dir || 1); return { x: seat.x, y: seat.y - bob * ps, rot: seat.rot + lurch * sg, sg, ps }; }
// world point of a seated rider's upper-body point (lx, ly) relative to the hip centre (+lx = facing side)
function ehRiderPt(F, lx, ly) { const c = Math.cos(F.rot), s = Math.sin(F.rot), x = lx * F.sg * F.ps, y = ly * F.ps; return [F.x + c * x - s * y, F.y + s * x + c * y]; }
// twoRiders(ctx, H, front, rear, t, o): front / rear = { D: costume, P: person fields, who: 'firuz' | 'inventor' | 'princess' } or null.
// o: { tc (twos time), tail: {stream, torn, len} inventor tail, veil: {vx} princess veil, armOver: [x, y] world point (the rear rider's
// right hand passes in front of the front rider to it), cape: {stream, ang} } Returns { front, rear } rider frames.
function twoRiders(ctx, H, front, rear, t, o = {}) {
  const tc = o.tc ?? t, noop = () => {}, sg = Math.sign(H.dir || 1), out = {};
  ebonyHorse(ctx, H);
  const ride = (R, d, dy) => { const ps = R.P.s ?? R.D.s, F = ehRiderFrame(H, d, dy, R.P.lurch || 0, R.P.bob || 0, ps), Hs = ehSeatShift(H, d, dy);
    if (R.who === 'inventor' && o.tail !== false) { const tl = o.tail || {}, [hx, hy] = ehRiderPt(F, -14, -170); ehInvTailAt(ctx, hx, hy, ps, tc, { ang: tl.ang ?? (Math.PI / 2 + 0.5 * sg + (tl.stream || 0) * (sg > 0 ? 1.2 : -1.2)), stream: tl.stream || 0, torn: tl.torn, len: tl.len }); }
    if (R.who === 'princess') { const [hx, hy] = ehRiderPt(F, -26, -122); const st = (o.veil && o.veil.stream) || 0; ehRibbon(ctx, hx, hy, Math.PI / 2 + sg * 0.35 + st * (sg > 0 ? 1.1 : -1.1) + idleSway(tc, 83, 0.05, 2.1), 120 * ps, 34 * ps, tc, '#fffaf0', { wave: 4 + 12 * st, hz: 1 + 1.6 * st, tip: 0.5, shade: '#d8d2e8', lw: 2.5, line: '#8a7aa8' }); }
    if (R.who === 'firuz' && o.cape !== false) { const cp = o.cape || {}, [nx, ny] = ehRiderPt(F, 0, -86); ehCapeFly(ctx, nx, ny, ps, tc, { stream: cp.stream || 0, ang: cp.ang ?? (sg > 0 ? Math.PI * 0.94 : Math.PI * 0.06), hangSide: -0.25 * sg }); }
    rideOn(ctx, noop, Hs, ehDressP(R.D, { ...R.P, s: ps }), { name: 'horse', reins: false }); return F; };
  if (rear) out.rear = ride(rear, EH_SEAT2.rear, EH_SEAT2.rearDy);
  if (front) out.front = ride(front, EH_SEAT2.front, 0);
  if (rear && o.armOver && out.rear) {   // redraw the rear rider clipped to a band along his reaching arm, over the front rider
    const F = out.rear, sh = ehRiderPt(F, 30, -66), hd = o.armOver, ax = hd[0] - sh[0], ay = hd[1] - sh[1], L = Math.hypot(ax, ay) || 1, nx = -ay / L * 34 * F.ps, ny = ax / L * 34 * F.ps;
    ctx.save(); ctx.beginPath(); ctx.moveTo(sh[0] + nx + ax * 0.25, sh[1] + ny + ay * 0.25); ctx.lineTo(hd[0] + nx * 1.2 + ax / L * 24, hd[1] + ny * 1.2 + ay / L * 24); ctx.lineTo(hd[0] - nx * 1.2 + ax / L * 24, hd[1] - ny * 1.2 + ay / L * 24); ctx.lineTo(sh[0] - nx + ax * 0.25, sh[1] - ny + ay * 0.25); ctx.closePath(); ctx.clip();
    rideOn(ctx, noop, ehSeatShift(H, EH_SEAT2.rear, EH_SEAT2.rearDy), ehDressP(rear.D, { ...rear.P, s: rear.P.s ?? rear.D.s }), { name: 'horse', reins: false }); ctx.restore(); }
  return out;
}

// ---------- the inventor's turban tail (whole, or torn: shorter with a ragged end) ----------
function ehRibbonEnd(x, y, ang, len, t, o = {}) {   // the centre-line end of ehRibbon with the same arguments
  const n = 9, wave = o.wave ?? 10, hz = o.hz ?? 1.6, kk = o.k ?? 2.2, sag = o.sag || 0; let px = x, py = y, a = ang, cx = x, cy = y;
  for (let i = 0; i <= n; i++) { const u = i / n, wv = Math.sin(t * hz * Math.PI * 2 - u * kk * Math.PI) * wave * u; cx = px - Math.sin(a) * wv; cy = py + Math.cos(a) * wv; if (i < n) { px += Math.cos(a) * len / n; py += Math.sin(a) * len / n; a += sag / n * Math.cos(a); } }
  return [cx, cy, a];
}
function ehInvTailAt(ctx, x, y, s, t, o = {}) {
  const st = o.stream || 0, len = 110 * s * (o.len || 1) * (o.torn ? 0.6 : 1), ro = { wave: 6 + 10 * st, hz: 1.3 + 2 * st, tip: o.torn ? 0.85 : 0.6, shade: '#c07a10' };
  ehRibbon(ctx, x, y, o.ang, len, 16 * s, t, EH_SAFFRON, ro);
  if (o.torn) { const [ex, ey, a] = ehRibbonEnd(x, y, o.ang, len, t, ro), w = 7 * s, nx = -Math.sin(a), ny = Math.cos(a), fx = Math.cos(a), fy = Math.sin(a);
    shape(ctx, [[ex + nx * w, ey + ny * w], [ex + nx * w * 0.5 + fx * 9 * s, ey + ny * w * 0.5 + fy * 9 * s], [ex + fx * 3 * s, ey + fy * 3 * s], [ex - nx * w * 0.4 + fx * 10 * s, ey - ny * w * 0.4 + fy * 10 * s], [ex - nx * w, ey - ny * w]], EH_SAFFRON, { lw: 2, line: '#8a5a10' }); }
}
// standing inventor: tail from the back of the turban (P a standing person); o {torn, swing, vx, len}
function ehInvTail(ctx, P, t, o = {}) { const [hx, hy] = ehHeadOf(P), d = Math.sign(P.dir || 1), s = P.s || 1, tr = K.clamp((o.vx || 0) / 260, -1, 1);
  ehInvTailAt(ctx, hx - d * 30 * s, hy - 40 * s, s, t, { ang: Math.PI / 2 + d * 0.35 - tr * 0.9 + (o.swing || 0) + idleSway(t, 87, 0.05, 2.3), stream: Math.abs(tr) * 0.6 + (o.stream || 0), torn: o.torn, len: o.len }); }

// ---------- coverCloth: the striped carpet cloth (orange and blue stripes, cream fringe) ----------
// shapes are point lists (world); mix two with ehClothMix (both resampled to 48 points) and draw with coverCloth
const EH_CLOTH_DRAPE = [[-142, -70], [-140, -150], [-134, -210], [-112, -246], [-60, -254], [40, -254], [92, -250], [120, -300], [138, -352], [146, -384], [168, -350], [232, -272], [246, -240], [228, -212], [178, -216], [150, -188], [140, -130], [138, -70]];
function ehResample(pts, n = 48) {
  const P = [...pts, pts[0]], d = [0]; for (let i = 1; i < P.length; i++) d.push(d[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]));
  const L = d[d.length - 1], out = []; let j = 1; for (let k = 0; k < n; k++) { const s = (k / n) * L; while (j < d.length - 1 && d[j] < s) j++; const u = (s - d[j - 1]) / ((d[j] - d[j - 1]) || 1); out.push([K.lerp(P[j - 1][0], P[j][0], u), K.lerp(P[j - 1][1], P[j][1], u)]); }
  return out;
}
function ehClothMix(A, B, k) { const a = ehResample(A), b = ehResample(B); return a.map((p, i) => [K.lerp(p[0], b[i][0], k), K.lerp(p[1], b[i][1], k)]); }
// draped over horse H (hem wave on t)
function ehClothDraped(H, t) { const hem = []; for (let i = 1; i < 10; i++) { const u = i / 10, x = K.lerp(138, -142, u); hem.push([x, -64 + 7 * Math.sin(t * 3 + u * 9)]); }
  return [...EH_CLOTH_DRAPE, ...hem].map((p) => ehHorsePt(H, p)); }
// spread / flying: a rectangle w x h centred (cx, cy), angle ang, billow (0..1) ripples it
function ehClothSpread(cx, cy, w, h, ang, t, billow = 0) { const pts = [], c = Math.cos(ang), s = Math.sin(ang), wav = (u) => billow * 22 * Math.sin(t * 9 + u * 7);
  const add = (u, v) => { const x = (u - 0.5) * w, y = (v - 0.5) * h + wav(u + v); pts.push([cx + c * x - s * y, cy + s * x + c * y]); };
  for (let i = 0; i <= 8; i++) add(i / 8, 0); for (let i = 1; i <= 5; i++) add(1, i / 5); for (let i = 7; i >= 0; i--) add(i / 8, 1); for (let i = 4; i >= 1; i--) add(0, i / 5); return pts; }
// heap on the ground (x centre, y ground)
function ehClothHeap(x, y) { return Array.from({ length: 16 }, (_, i) => { const a = Math.PI + (i / 15) * Math.PI, r = 1 + 0.12 * Math.sin(i * 2.3); return [x + Math.cos(a) * 64 * r, y + Math.sin(a) * 26 * r - (i % 3 === 0 ? 6 : 0)]; }).concat([[x + 60, y + 2], [x - 60, y + 2]]); }
function coverCloth(ctx, pts, o = {}) {
  const A = '#ff9a3a', B = '#2a6ae0', ln = '#6a2a14'; let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9; for (const [x, y] of pts) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
  ctx.save(); if (o.alpha != null) ctx.globalAlpha *= o.alpha; K.poly(ctx, pts, true); ctx.fillStyle = A; ctx.fill(); ctx.save(); ctx.clip();
  const ang = o.ang || 0.35; ctx.translate((x0 + x1) / 2, (y0 + y1) / 2); ctx.rotate(ang); const R = Math.max(x1 - x0, y1 - y0);
  for (let k = -R; k < R; k += 44) { ctx.fillStyle = B; ctx.fillRect(-R, k, 2 * R, 16); ctx.fillStyle = '#fff0d8'; ctx.fillRect(-R, k + 18, 2 * R, 4); }
  ctx.rotate(-ang); ctx.fillStyle = 'rgba(90,30,60,0.22)'; ctx.fillRect(-R, (y1 - y0) * 0.12, 2 * R, R); ctx.restore();
  ctx.strokeStyle = ln; ctx.lineWidth = 3; ctx.lineJoin = 'round'; K.poly(ctx, pts, true); ctx.stroke();
  // fringe where the edge faces down
  ctx.strokeStyle = '#fff0d8'; ctx.lineWidth = 3; ctx.lineCap = 'round'; const n = pts.length;
  for (let i = 0; i < n; i++) { const a = pts[i], b = pts[(i + 1) % n], ex = b[0] - a[0], ey = b[1] - a[1], L = Math.hypot(ex, ey) || 1, nx = ey / L, ny = -ex / L; if (ny < 0.6 || L < 4) continue;
    for (let u = 0.15; u < 1; u += 0.35) { const px = a[0] + ex * u, py = a[1] + ey * u; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + nx * 4, py + 12); ctx.stroke(); } }
  ctx.restore();
}

// ---------- turbanScrap: the saffron clue (centre x, y; s 1 = 46 x 26), rot ----------
function turbanScrap(ctx, x, y, s = 1, rot = 0, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const pts = [[-23, -13], [12, -13], [17, -6], [12, -1], [19, 4], [13, 8], [18, 13], [-23, 13]];
  celShade(ctx, pts, EH_SAFFRON, '#c8801a', { light: [-1, -1], off: 6, lw: 2.5, line: '#7a4a10', hi: '#ffd070' });
  ctx.strokeStyle = '#c8801a'; ctx.lineWidth = 1.6; for (const yy of [-4, 5]) { ctx.beginPath(); ctx.moveTo(-20, yy); ctx.lineTo(8, yy + 1); ctx.stroke(); }
  ctx.fillStyle = '#5a3a10'; ctx.beginPath(); ctx.ellipse(-8, 1, 2.6, 1.8, 0.4, 0, 7); ctx.fill();
  ctx.restore();
}

// ---------- ghostOutline: dashed, flickering outline (k 0..1) of polygons (world) ----------
function ghostOutline(ctx, polys, k, t, o = {}) {
  if (k <= 0.01) return; const fl = Math.floor(EH_T2(t) * 12) % 2 ? 1 : 0.7;
  ctx.save(); ctx.globalAlpha *= k * fl; ctx.setLineDash(o.dash || [12, 9]); ctx.lineDashOffset = -t * 20; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.shadowColor = o.glow || '#bfe6ff'; ctx.shadowBlur = 14; ctx.strokeStyle = o.col || '#fffaf0'; ctx.lineWidth = o.w || 5;
  for (const p of polys) { if (p.circle) { ctx.beginPath(); ctx.arc(p.circle[0], p.circle[1], p.circle[2], 0, 7); ctx.stroke(); } else { K.poly(ctx, p, !p.open); ctx.stroke(); } }
  ctx.restore();
}
// outlines of the ebony horse H (body, neck, head, ear, four legs)
function ehGhostHorse(H) { const W = (p) => ehHorsePt(H, p), G = EH_EBG, out = [G.body.map(W), G.neck.map(W), G.head.map(W), G.ear.map(W)];
  for (const [hx, fx] of G.legs) out.push([[hx - 13, -150], [hx + 13, -150], [fx + 14, 0], [fx - 14, 0]].map(W)); return out; }
// outline of a person seated on a bench (feet x, ground y, s): head, veil, torso, lap and shins
function ehGhostSeated(x, y, s = 1, dir = -1) { const P = (lx, ly) => [x + lx * s * dir, y + ly * s];
  return [{ circle: [...P(-22, -170), 34 * s] }, [P(-60, -205), P(-22, -214), P(16, -200), P(24, -150), P(16, -112), P(-60, -112)].concat([]), [P(-52, -126), P(8, -126), P(18, -52), P(-58, -52)], [P(-58, -52), P(40, -52), P(46, -6), P(10, -6), P(10, -40), P(-58, -40)]]; }

// ---------- travelCloak: hooded sand cloak over a person, in the hip frame (hip centre hx, hy; rot; sg facing; s) ----------
function travelCloak(ctx, hx, hy, rot, sg, s, t, o = {}) {
  const col = '#e6cf9a', sh = '#c9ad74', ln = '#7a5a30'; ctx.save(); ctx.translate(hx, hy); ctx.rotate(rot); ctx.scale(sg * s, s);
  const wv = 3 * Math.sin(t * 5);
  if (!o.noBody) celShade(ctx, [[-34, -84], [34, -84], [46 + wv, o.seated ? 8 : 60], [-46 + wv, o.seated ? 8 : 60]], col, sh, { light: [-1, -1], off: 16, lw: 3, line: ln });
  // hood: a ring round the face, pushed into a point by the tall turban
  ctx.beginPath(); const hood = [[-40, -80], [-54, -122], [-46, -164], [-22, -204], [4, -250], [24, -200], [46, -162], [54, -122], [40, -80]]; K.poly(ctx, hood, true);
  ctx.ellipse(2, -122, 30, 38, 0, 0, Math.PI * 2, true); ctx.fillStyle = col; ctx.fill('evenodd'); ctx.strokeStyle = ln; ctx.lineWidth = 3; ctx.stroke();
  ctx.save(); ctx.globalAlpha = 0.6; ctx.fillStyle = sh; ctx.beginPath(); ctx.moveTo(4, -250); ctx.lineTo(24, -200); ctx.lineTo(46, -162); ctx.lineTo(54, -122); ctx.lineTo(40, -80); ctx.lineTo(28, -90); ctx.lineTo(32, -150); ctx.closePath(); ctx.fill(); ctx.restore();
  ctx.restore();
}

// ---------- cardboardPrince: a flat cut-out Firuz on a stick (feet of the stick at x, y; s; sway rad) ----------
function ehCardboardSprite() { return ehBakeAt('cardprince', 300, 420, (c) => {
  const tmp = K.layer(300, 420), x = tmp.getContext('2d'); person(x, ehDressP(EH_FIRUZ, { x: 150, y: 380, s: 1.4, dir: 1, mouth: 'smile', lid: 0, gaze: [0.2, 0.2], handR: PERSON_HANDS.wave.R, handL: [-30, -100] }));
  const B = K.layer(300, 420), b = B.getContext('2d'); for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; b.drawImage(tmp, Math.cos(a) * 10, Math.sin(a) * 10); } b.globalCompositeOperation = 'source-in'; b.fillStyle = '#d8b07a'; b.fillRect(0, 0, 300, 420);
  const E = K.layer(300, 420), e = E.getContext('2d'); for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; e.drawImage(B, Math.cos(a) * 3, Math.sin(a) * 3); } e.globalCompositeOperation = 'source-in'; e.fillStyle = '#7a4a20'; e.fillRect(0, 0, 300, 420);
  c.drawImage(E, 0, 0); c.drawImage(B, 0, 0); c.drawImage(tmp, 0, 0); }); }
function cardboardPrince(ctx, x, y, s = 1, sway = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(sway); seg(ctx, 0, 0, 0, -150 * s, 9 * s, '#8a5a32', 2); ctx.drawImage(ehCardboardSprite(), -150 * s * 0.5, -150 * s - 420 * s * 0.5 + 40 * s, 300 * s * 0.5, 420 * s * 0.5);
  ctx.save(); ctx.setLineDash([8 * s, 6 * s]); ctx.strokeStyle = '#7a4a20'; ctx.lineWidth = 2.5 * s; ctx.strokeRect(-150 * s * 0.5 + 6 * s, -150 * s - 420 * s * 0.5 + 46 * s, 300 * s * 0.5 - 12 * s, 420 * s * 0.5 - 12 * s); ctx.restore();
  ctx.restore();
}
