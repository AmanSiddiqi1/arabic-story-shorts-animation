// ===== AN-104 library-candidate drawings and helpers: the dog (hound with headDown, chew, raise/pawW, lie, collar, age), gold dish,
// chain, debt scrolls, coins, purse, gift chest, food tray, glow and glints, balloons and insets, person-frame points =====
// Everything is prefixed a104 / A104 so no engine or Library global is redefined.
const A104_GOLD = '#e8a800', A104_GOLDD = '#b07a00', A104_BROWN = '#8a501a', A104_BROWND = '#5b3010', A104_SILVER = '#e9edf5', A104_SILVERD = '#9aa3b8';
const A104_GREEN = '#3f9d4a', A104_GREEND = '#2b7a38';

// ---------- small timing helpers ----------
const a104In = (t, a, b) => t >= a && t < b;
const a104E = (t, a, d, e = 'inOut') => K.ease[e](K.clamp((t - a) / d));
const a104Env = (t, a, b, f = 0.2) => (t < a || t >= b ? 0 : K.clamp(Math.min((t - a) / f, (b - t) / f)));
const a104L2 = (a, b, k) => [K.lerp(a[0], b[0], k), K.lerp(a[1], b[1], k)];
// gesture track: [t0, t1, target | fn(t), fade] blended over `rest` (the last active one wins)
function a104Tr(t, list, rest, f = 0.22) {
  let out = rest;
  for (const [a, b, tg, ff] of list) { const w = K.ease.inOut(a104Env(t, a, b, ff ?? f)); if (w > 0) { const T = typeof tg === 'function' ? tg(t) : tg; out = out ? a104L2(out, T, w) : T; } }
  return out;
}
// eased piecewise value: keys [[t, v], ...]
const a104K = (t, keys, e = 'inOut') => kfn(t, keys, e);

// ---------- person frame (same transform chain as acting() + personCostumed(), as in AN-097) ----------
function a104Age(P) { return P.age ?? (COSTUME[P.costume] || {}).age ?? 0.3; }
function a104M(P) {
  const s = P.s || 1, dir = P.dir || 1, sq = P.sq ?? 1, tip = P.tip || 0, M = new DOMMatrix();
  M.translateSelf(P.x, P.y); if (tip) M.rotateSelf(tip * Math.sign(dir) * 180 / Math.PI); if (sq !== 1) M.scaleSelf(1 + (1 - sq) * 0.7, sq);
  if (P.rot) M.rotateSelf(P.rot * 180 / Math.PI); M.scaleSelf(dir * s * (P.child ? 0.62 : 1), s * (P.child ? 0.62 : 1));
  const hc = personPose(P, -1, 0).hipC; M.translateSelf(hc[0], hc[1] + 75);
  const lean = (P.lean || 0) + a104Age(P) * 0.12; M.translateSelf(0, -75); M.rotateSelf(lean * 180 / Math.PI); M.translateSelf(0, 75);
  return M;
}
const a104HdY = (P) => -195 + (P.drop || 0) + a104Age(P) * 6;
function a104Pt(P, x, y) { const q = a104M(P).transformPoint({ x, y }); return [q.x, q.y]; }
const a104Head = (P) => a104Pt(P, (P.look || 0) * 4, a104HdY(P));
function a104OnBody(ctx, P, fn) { ctx.save(); const M = a104M(P); ctx.transform(M.a, M.b, M.c, M.d, M.e, M.f); fn(ctx); ctx.restore(); }

// ---------- the dog ----------
// Built on the AN-040 sheepdog (about 240 x 190 at s 1, facing +x with dir 1), drawn once for this film as a hound. Extra fields:
//   headDown 0..1 (muzzle to a dish on the floor ~150 units ahead of the feet), chew (phase: jaw and head bob), lie 0..1 (lying, chin on the paws),
//   raise 0..1 (near forepaw lifted; with pawW [x, y] world target the paw goes there: the push, the paw on a knee; without it a small beckon),
//   collar 'gold' | 'rope' (band and ring), age 0..1 (grey muzzle and brows), tailWag (phase), wagAmp, tailUp, ears, headTilt, nod, drop, sit, crouch,
//   tongue, mouth, brow, eyes + shared acting fields (gaze, lid, wet, sq, tip, alpha).
const A104_DOG_PAL = [
  { body: '#d08a3a', dot: '#8a5a1e', far: '#a0662a', cream: '#f6e4bf', ear: '#262633' },
  { body: C.white, dot: '#b9b4c6', far: '#d6d2e0', cream: C.white, ear: '#262633', patch: '#262633' },
  { body: '#7a4a22', dot: '#4a2a10', far: '#5a3414', cream: '#f2d2a0', ear: '#4a2a10' },
  { body: '#e3a656', dot: '#a8702a', far: '#b9803a', cream: '#f8ead0', ear: '#5b3010' }];
function a104DogGeo(P) {
  const ph = (P.ph || 0) * Math.sign(P.dir ?? 1), amp = P.amp ?? 0, sit = K.clamp(P.sit || 0), cr = K.clamp(P.crouch || 0), lie = K.clamp(P.lie || 0);
  const A = (0.2 * cr - 0.5 * sit) * (1 - lie), piv = cr > 0 ? [-58, -92] : [-58, -60], dy = BEAST.bob(ph, amp, 3) + 30 * sit * (1 - lie) + 58 * lie;
  const T = (p) => { const q = BEAST.rot(p, A, piv); return [q[0], q[1] + dy]; };
  const nk = T([70, -124]), hd = K.clamp(P.headDown || 0), chewB = P.chew != null ? Math.sin(P.chew) : 0;
  let hx = nk[0] + 30 + 8 * cr, hy = nk[1] - 30 + (P.drop || 0) + 12 * cr, hr = (P.headTilt || 0) + (P.nod || 0) + 0.3 * cr;
  hx = K.lerp(hx, nk[0] + 48, hd); hy = K.lerp(hy, -58, hd) + 3 * chewB * Math.max(hd, 0.3); hr += 0.5 * hd;
  hx = K.lerp(hx, nk[0] + 48, lie); hy = K.lerp(hy, -40 + (P.drop || 0) * 0.5, lie); hr = K.lerp(hr, 0.08 + (P.headTilt || 0), lie);
  return { ph, amp, sit, cr, lie, A, piv, dy, T, nk, hx, hy, hr, hd, chewB };
}
// world points: head centre, collar ring, nose
const a104DogHead = (P) => { const g = a104DogGeo(P); return BEAST.world(P, [g.hx + 6, g.hy - 4]); };
const a104DogRing = (P) => { const g = a104DogGeo(P), n0 = [g.nk[0] - 18, g.nk[1] + 14], n1 = [g.hx - 8, g.hy + 10], cc = a104L2(n0, n1, 0.6), nd = Math.hypot(n1[0] - n0[0], n1[1] - n0[1]) || 1; return BEAST.world(P, [cc[0] - (n1[1] - n0[1]) / nd * 22, cc[1] + (n1[0] - n0[0]) / nd * 22]); };
const a104DogNose = (P) => { const g = a104DogGeo(P), c = Math.cos(g.hr), s = Math.sin(g.hr); return BEAST.world(P, [g.hx + 54 * c - 2 * s, g.hy + 54 * s + 2 * c]); };
function a104DogRaw(ctx, P) {
  const s = P.s || 1, dir = P.dir ?? 1, pal = A104_DOG_PAL[P.pal || 0] || A104_DOG_PAL[0], sil = !!P.silhouette, col = (c) => (sil ? C.black : c);
  const G = a104DogGeo(P), { ph, amp, sit, cr, lie, T, A } = G, R = 22, ag = K.clamp(P.age || 0);
  ctx.save(); ctx.translate(P.x + (P.shake ? Math.sin(P.shake * 50) * 3 : 0), P.y); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s);
  const defs = [[50, 1.5 * Math.PI, true, false], [-60, Math.PI, false, false], [-48, 0, false, true], [62, 0.5 * Math.PI, true, true]];
  const rz = K.clamp(P.raise || 0);
  const legs = defs.map(([hx, off, fore, near]) => { const H = T([hx, -94]);
    let [dx, lift] = BEAST.gait(ph, off, R, 18, amp * (1 - sit) * (1 - lie));
    let Ft = [hx + 2 + dx + (fore ? 34 : 0) * cr, -lift], Kn = BEAST.ik(H, Ft, 44, 50, -1);
    if (fore && sit > 0) { const Fs = [H[0] + 2, 0]; Ft = BEAST.lp(Ft, Fs, sit); Kn = BEAST.lp(Kn, BEAST.lp(H, Fs, 0.5), sit); }
    if (!fore && sit > 0) { const Fs = [hx + 40, 0], Ks = [hx + 6, -34]; Ft = BEAST.lp(Ft, Fs, sit); Kn = BEAST.lp(Kn, Ks, sit); }
    if (lie > 0) { if (fore) { const Fl = [hx + 66 + (near ? 8 : 0), 0]; Ft = BEAST.lp(Ft, Fl, lie); Kn = BEAST.lp(Kn, BEAST.ik(H, Fl, 44, 50, -1), lie); }
      else { const Fl = [hx + 46, 0], Kl = [hx + 4, -24]; Ft = BEAST.lp(Ft, Fl, lie); Kn = BEAST.lp(Kn, Kl, lie); } }
    if (fore && !near && P.farFold > 0) { const ff = K.clamp(P.farFold), Ff = [H[0] + 14, H[1] + 62]; Ft = BEAST.lp(Ft, Ff, ff); Kn = BEAST.lp(Kn, BEAST.ik(H, Ff, 44, 50, -1), ff); }   // v3: far foreleg folded under the chest
    if (fore && near && rz > 0) {
      let tg = P.pawW ? [(P.pawW[0] - P.x) / (dir * s), (P.pawW[1] - P.y) / s] : [H[0] + 62, H[1] + 40];
      const d = Math.hypot(tg[0] - H[0], tg[1] - H[1]), mx = 108; if (d > mx) tg = [H[0] + (tg[0] - H[0]) * mx / d, H[1] + (tg[1] - H[1]) * mx / d];
      Ft = BEAST.lp(Ft, tg, rz); Kn = BEAST.lp(Kn, BEAST.ik(H, tg, 44, 50, -1), rz);
    }
    return { H, Kn, F: Ft, near, fore }; });
  const drawLeg = (L) => BEAST.limb(ctx, L.H, L.Kn, L.F, { w: 20, w2: 16, col: col(L.near ? pal.body : pal.far), paw: col(L.near ? pal.body : pal.far), pawW: 14, pawH: 7, pawDx: 6, ol: 4 });
  legs.filter((L) => !L.near).forEach(drawLeg);
  // tail
  { const r = T([-80, -118]), tu = P.tailUp ?? 0.5, wg = Math.sin(P.tailWag || 0) * (P.wagAmp ?? 0.5), a0 = K.lerp(-Math.PI + 0.3 - 1.1 * tu + wg, -Math.PI - 0.3 + wg * 0.4, lie);
    const p1 = [r[0] + Math.cos(a0) * 34, r[1] + Math.sin(a0) * 34], a1 = a0 + 0.35 + wg * 0.5, p2 = [p1[0] + Math.cos(a1) * 34, p1[1] + Math.sin(a1) * 34], a2 = a1 + 0.3 + wg * 0.4, p3 = [p2[0] + Math.cos(a2) * 26, p2[1] + Math.sin(a2) * 26];
    const pts = K.bezier(r, p1, p2, p3, 10); BEAST.tube(ctx, pts, 18, 12, col(pal.body), 4); if (!sil) BEAST.tube(ctx, pts.slice(-3), 13, 10, pal.cream, 0); }
  // body (slimmer belly with age)
  ctx.save(); ctx.translate(0, G.dy); ctx.translate(G.piv[0], G.piv[1]); ctx.rotate(A); ctx.translate(-G.piv[0], -G.piv[1]);
  const bh = 34 - 3 * ag, bodyPts = BEAST.rbox(-8, -110, 80, bh, 0.6);
  shape(ctx, bodyPts, col(pal.body), sil ? { lw: 6 } : { lw: 6, seed: 51, dot: pal.dot, pitch: 8, rad: 0.15, da: 0.45 });
  shape(ctx, ell(46, -104, 38, 38, 22), col(pal.body), sil ? { lw: 6 } : { lw: 6, seed: 52, dot: pal.dot, pitch: 8, rad: 0.15, da: 0.45 });
  if (!sil) { shape(ctx, BEAST.rbox(-8, -108, 72, bh - 6, 0.6), pal.body, { lw: 0 }); shape(ctx, ell(62, -96, 22, 28, 18), pal.cream, { lw: 0 });
    if (pal.patch) { ctx.save(); K.poly(ctx, bodyPts, true); ctx.clip(); shape(ctx, ell(-18, -142, 50, 26, 18), pal.patch, { lw: 0 }); ctx.restore(); } }
  ctx.restore();
  legs.filter((L) => L.near).forEach(drawLeg);
  if (sit > 0.2 || lie > 0.2) { const H = legs[2].H, k = Math.max(sit, lie); shape(ctx, ell(H[0] + 10, H[1] + 20, 34 * k, 28 * k, 18), col(pal.body), sil ? { lw: 5 } : { lw: 5, seed: 62, dot: pal.dot, pitch: 8, rad: 0.15, da: 0.45 }); }
  // neck, collar and head
  const nk = G.nk, hx = G.hx, hy = G.hy;
  BEAST.tube(ctx, [[nk[0] - 18, nk[1] + 14], [hx - 8, hy + 10]], 40, 36, col(pal.body), 4.5);
  if (!sil) { const n0 = [nk[0] - 18, nk[1] + 14], n1 = [hx - 8, hy + 10], cc = a104L2(n0, n1, 0.6), nd = Math.hypot(n1[0] - n0[0], n1[1] - n0[1]) || 1, px = -(n1[1] - n0[1]) / nd, py = (n1[0] - n0[0]) / nd;
    const cA = [cc[0] - px * 18, cc[1] - py * 18], cB = [cc[0] + px * 18, cc[1] + py * 18];
    if (P.collar === 'gold') { seg(ctx, cA[0], cA[1], cB[0], cB[1], 13, C.yellow, 3.5); ctx.save(); ctx.lineWidth = 5; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(cB[0] + 4, cB[1] + 4, 8, 0, 7); ctx.stroke(); ctx.lineWidth = 3; ctx.strokeStyle = C.yellow; ctx.stroke(); ctx.restore(); }
    else if (P.collar === 'rope') { seg(ctx, cA[0], cA[1], cB[0], cB[1], 9, '#c9a46a', 3); ctx.save(); ctx.lineWidth = 2; ctx.strokeStyle = '#7a5a2a'; for (let k = 0; k < 4; k++) { const u = (k + 0.5) / 4, x = K.lerp(cA[0], cB[0], u), y = K.lerp(cA[1], cB[1], u); ctx.beginPath(); ctx.moveTo(x - 5, y - 3); ctx.lineTo(x + 5, y + 3); ctx.stroke(); } ctx.restore(); } }
  ctx.save(); ctx.translate(hx, hy); ctx.rotate(G.hr);
  const ev = K.clamp(P.ears ?? 0, -1, 1);
  const ear = (ex, far) => { ctx.save(); ctx.translate(ex, -24); ctx.rotate(0.25 - ev * 0.45 + 0.15 * (P.earFlick || 0)); shape(ctx, [[-10, -2], [8, -4], [5, 34], [-6, 38], [-12, 20]], col(far ? pal.far : pal.ear), { lw: 4, seed: far ? 54 : 55 }); ctx.restore(); };
  ear(-30, true);
  const jaw = (P.mouth === 'open' ? 0.3 : 0) + (P.chew != null ? 0.07 * (1 + G.chewB) : 0);
  const muz = sil ? C.black : mixHex(pal.cream, '#b9b4c6', ag * 0.9);
  if (jaw > 0.02 && !sil) { ctx.save(); ctx.translate(8, 18); ctx.rotate(jaw); shape(ctx, [[0, 2], [48, 2], [46, 12], [2, 14]], muz, { lw: 4, seed: 57 }); ctx.restore();
    shape(ctx, [[10, 16], [52, 14], [50, 18 + 30 * jaw], [12, 20 + 18 * jaw]], C.black, { lw: 0 }); }
  shape(ctx, BEAST.rbox(0, 0, 32, 28, 0.7), col(pal.body), sil ? { lw: 6 } : { lw: 6, seed: 58, dot: pal.dot, pitch: 7, rad: 0.15, da: 0.4 });
  shape(ctx, BEAST.rbox(34, 10, 22, 14, 0.7), muz, { lw: 5, seed: 59 });
  if (!sil) {
    if (pal.patch) shape(ctx, ell(10, -8, 15, 13, 14), pal.patch, { lw: 0 });
    if (ag > 0.05) { ctx.save(); ctx.globalAlpha = ag; shape(ctx, ell(14, -24, 13, 5, 10), '#c9c4cc', { lw: 0 }); shape(ctx, ell(30, 6, 12, 10, 10), '#c9c4cc', { lw: 0 }); ctx.restore(); }
    shape(ctx, ell(54, 2, 8, 7, 12), C.black, { lw: 2, seed: 60 });
    if (jaw <= 0.02) { const m = P.mouth || 'closed'; if (m === 'smile') BEAST.line(ctx, [[22, 14], [34, 22], [52, 16]], 4); else BEAST.line(ctx, [[22, 18], [52, 17]], 4); }
    if (P.tongue) { const tg = K.clamp(P.tongue); shape(ctx, [[30, 20 + 28 * jaw], [44, 20 + 28 * jaw], [44 + 4 * tg, 24 + 26 * tg + 28 * jaw], [32, 26 + 22 * tg + 28 * jaw]], '#f07a8a', { lw: 3, seed: 61 }); }
    eyeAt(ctx, 10, -8, P.eyes || 'open', 0.8);
    if (P.brow) BEAST.brow(ctx, 12, -24, P.brow, 20);
  }
  ear(-16, false);
  ctx.restore();
  ctx.restore();
}
const a104Dog = acting(a104DogRaw, (P) => (A104_DOG_PAL[P.pal || 0] || A104_DOG_PAL[0]).body);
const A104_DOG_STRIDE = 2 * 22 / Math.PI;

// ---------- gold dish: rim 110 x 26, bowl 34 deep, foot 60. (x, y) = foot centre on the floor. o: s, fill 0..1, glint (0..1 sweep), tilt, steam (t) ----------
function a104Dish(ctx, x, y, o = {}) {
  const s = o.s ?? 1, f = K.clamp(o.fill || 0);
  ctx.save(); ctx.translate(x, y); if (o.tilt) ctx.rotate(o.tilt); ctx.scale(s, s);
  const ry = -34;
  shape(ctx, ell(0, ry, 55, 13, 28), A104_GOLDD, { lw: 5, seed: 401 });                    // back rim / inside
  if (f > 0.01) { const h = 30 * f; shape(ctx, [[-42, ry + 2], [-34, ry - h * 0.6], [-14, ry - h], [10, ry - h * 0.95], [32, ry - h * 0.55], [44, ry + 2]], '#9a5a22', { lw: 4, seed: 402, dot: '#f2d2a0', pitch: 6, rad: 0.25, da: 0.6 });
    if (o.steam != null && f > 0.3) { ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(255,255,255,0.85)'; ctx.lineCap = 'round'; for (let i = 0; i < 3; i++) { const ph = (o.steam * 0.7 + i / 3) % 1, sx = -18 + i * 18; ctx.globalAlpha = Math.sin(Math.PI * ph) * 0.9; ctx.beginPath(); for (let k = 0; k <= 8; k++) { const yy = ry - h - 6 - k * 5 - ph * 30; ctx[k ? 'lineTo' : 'moveTo'](sx + 6 * Math.sin(k * 0.9 + i + o.steam * 3), yy); } ctx.stroke(); } ctx.restore(); } }
  // bowl: front half
  shape(ctx, [[-55, ry], [-48, ry + 16], [-30, -6], [-30, 0], [30, 0], [30, -6], [48, ry + 16], [55, ry], ...Array.from({ length: 13 }, (_, i) => { const a = Math.PI * i / 12; return [55 * Math.cos(a), ry + 13 * Math.sin(a)]; })], C.yellow, { lw: 5, seed: 403, dot: C.red, pitch: 7, rad: 0.2, da: 0.45 });
  ctx.save(); ctx.lineWidth = 5; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.ellipse(0, ry, 55, 13, 0, 0, Math.PI); ctx.stroke(); ctx.restore();
  // glint
  const gl = o.glint ?? -1; if (gl >= 0 && gl <= 1) { const gx = K.lerp(-40, 40, gl); ctx.save(); ctx.lineWidth = 5; ctx.strokeStyle = C.white; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(gx - 4, ry + 6); ctx.lineTo(gx + 2, ry + 22); ctx.stroke(); ctx.restore(); a104Glint(ctx, gx + 6, ry + 4, 12, Math.sin(Math.PI * gl)); }
  else { ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = C.white; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-36, ry + 8); ctx.lineTo(-30, ry + 20); ctx.stroke(); ctx.restore(); }
  ctx.restore();
}
// four-point star glint, p 0..1 size
function a104Glint(ctx, x, y, r, p) {
  if (p <= 0.02) return; const R = r * p; ctx.save(); ctx.translate(x, y); ctx.fillStyle = C.white; ctx.strokeStyle = C.black; ctx.lineWidth = 2.5;
  ctx.beginPath(); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, rr = i % 2 ? R * 0.28 : R; ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
}
// warm dotted glow
function a104Glow(ctx, x, y, r, k) {
  if (k <= 0.01) return; ctx.save(); ctx.globalAlpha = 0.5 * K.clamp(k); const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, 'rgba(255,224,90,0.95)'); g.addColorStop(1, 'rgba(255,210,31,0)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.restore();
}
// gold rays burst (emphasis behind a prop), k 0..1
function a104Rays(ctx, x, y, r, k, t) {
  if (k <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.rotate(t * 0.3); ctx.globalAlpha = K.clamp(k);
  for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; ctx.fillStyle = i % 2 ? C.yellow : C.white; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a - 0.12) * r * k, Math.sin(a - 0.12) * r * k); ctx.lineTo(Math.cos(a + 0.12) * r * k, Math.sin(a + 0.12) * r * k); ctx.closePath(); ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.stroke(); }
  ctx.restore();
}

// ---------- silver chain: a quadratic sag from a to b drawn as links; o: sag, swing (px sideways at the middle), glint (0..1 along) ----------
function a104Chain(ctx, a, b, o = {}) {
  const sag = o.sag ?? 50, mid = [(a[0] + b[0]) / 2 + (o.swing || 0), (a[1] + b[1]) / 2 + sag], n = o.links ?? 16;
  const P = (u) => [(1 - u) * (1 - u) * a[0] + 2 * u * (1 - u) * mid[0] + u * u * b[0], (1 - u) * (1 - u) * a[1] + 2 * u * (1 - u) * mid[1] + u * u * b[1]];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n, p = P(u), q = P(Math.min(1, u + 0.01)), ang = Math.atan2(q[1] - p[1], q[0] - p[0]);
    ctx.save(); ctx.translate(p[0], p[1]); ctx.rotate(ang); const flat = i % 2;
    ctx.beginPath(); ctx.ellipse(0, 0, 9, flat ? 3 : 6, 0, 0, 7); ctx.fillStyle = flat ? A104_SILVERD : A104_SILVER; ctx.fill(); ctx.lineWidth = 2.5; ctx.strokeStyle = C.black; ctx.stroke(); ctx.restore(); }
  if (o.glint != null && o.glint >= 0 && o.glint <= 1) { const p = P(o.glint); a104Glint(ctx, p[0], p[1], 14, Math.sin(Math.PI * o.glint)); }
}
// ring post for the chains: short yellow post with a ring on top, base at (x, y)
function a104Post(ctx, x, y, top) {
  shape(ctx, K.rectPts(x - 12, top, 24, y - top), C.yellow, { lw: 5, seed: 404, dot: C.red, pitch: 7, rad: 0.2, da: 0.45 });
  shape(ctx, K.rectPts(x - 20, top - 10, 40, 14), A104_GOLD, { lw: 4, seed: 405 });
  ctx.save(); ctx.lineWidth = 6; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(x, top - 22, 12, 0, 7); ctx.stroke(); ctx.lineWidth = 3; ctx.strokeStyle = A104_SILVER; ctx.stroke(); ctx.restore();
}

// ---------- debt scroll (about 70 x 44): (x, y) centre. o: rot, struck 0..1 (red X draws), seal ----------
function a104Scroll(ctx, x, y, s = 1, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  shape(ctx, K.rectPts(-32, -22, 64, 44), C.white, { lw: 4, seed: 410 });
  for (const xx of [-34, 34]) shape(ctx, ell(xx, 0, 6, 25, 12), '#efdcae', { lw: 3.5, seed: 411 });
  ctx.lineWidth = 3; ctx.strokeStyle = '#5a5a6a'; ctx.lineCap = 'round';
  for (let k = 0; k < 3; k++) { const yy = -12 + k * 10; ctx.beginPath(); for (let i = 0; i <= 12; i++) { const xx = -22 + 40 * i / 12; ctx[i ? 'lineTo' : 'moveTo'](xx, yy + 2 * Math.sin(i * 1.4 + k)); } ctx.stroke(); }
  shape(ctx, ell(14, 14, 7, 7, 12), C.red, { lw: 3, seed: 412 });
  const st = K.clamp(o.struck || 0); if (st > 0) { ctx.lineWidth = 9; ctx.strokeStyle = C.red; ctx.lineCap = 'round'; const a = K.clamp(st * 2), b = K.clamp(st * 2 - 1);
    ctx.beginPath(); ctx.moveTo(-26, -18); ctx.lineTo(-26 + 52 * a, -18 + 36 * a); ctx.stroke(); if (b > 0) { ctx.beginPath(); ctx.moveTo(26, -18); ctx.lineTo(26 - 52 * b, -18 + 36 * b); ctx.stroke(); } }
  ctx.restore();
}
// ---------- coins ----------
function a104Coin(ctx, x, y, r = 12, sx = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(Math.max(0.15, Math.abs(sx)), 1);
  shape(ctx, ell(0, 0, r, r, 16), C.yellow, { lw: Math.max(2.5, r * 0.25), seed: 407 });
  ctx.lineWidth = Math.max(1.5, r * 0.14); ctx.strokeStyle = A104_GOLD; ctx.beginPath(); ctx.arc(0, 0, r * 0.6, 0, 7); ctx.stroke(); ctx.restore();
}
function a104CoinPile(ctx, x, y, n, r = 11) {
  const rr = K.rng(31); for (let i = 0; i < n; i++) { const row = i < 5 ? 0 : i < 9 ? 1 : i < 12 ? 2 : i < 14 ? 3 : 4, k = [i, i - 5, i - 9, i - 12, i - 14][row], w = [5, 4, 3, 2, 1][row];
    a104Coin(ctx, x + (k - (w - 1) / 2) * r * 1.7 + (rr() - 0.5) * 3, y - r * 0.55 - row * r * 0.8, r, 0.55 + 0.1 * rr()); }
}
// ---------- fat coin purse 70 x 80: (x, y) = the drawstring knot (it hangs below). o: rot, glint ----------
function a104Purse(ctx, x, y, s = 1, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  shape(ctx, [[-10, 0], [-14, 10], [-34, 30], [-38, 56], [-26, 78], [0, 84], [26, 78], [38, 56], [34, 30], [14, 10], [10, 0]], C.red, { lw: 5, seed: 413, dot: '#a8160f', pitch: 7, rad: 0.24, da: 0.5 });
  seg(ctx, -14, 10, 14, 10, 6, C.yellow, 2.5); shape(ctx, [[-8, 0], [0, -14], [8, 0]], C.red, { lw: 4, seed: 414 });
  shape(ctx, ell(0, 48, 13, 13, 14), C.yellow, { lw: 3.5, seed: 415 });
  if (o.glint != null) a104Glint(ctx, 20, 30, 14, o.glint);
  ctx.restore();
}
// ---------- gift chest 120 x 80 (s 1): (x, y) bottom centre. o: open 0..1, rot, t ----------
function a104Chest(ctx, x, y, s = 1, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s); const op = K.clamp(o.open || 0);
  if (op > 0.02) { a104Glow(ctx, 0, -70, 90, op); shape(ctx, [[-62, -78], [-58, -78 - 46 * op], [58, -78 - 46 * op], [62, -78]], A104_BROWN, { lw: 5, seed: 416, dot: A104_BROWND, pitch: 8, rad: 0.2, da: 0.45 });
    shape(ctx, [[-54, -78], [-40, -96], [-10, -90], [20, -100], [52, -80]], C.red, { lw: 4, seed: 417, dot: C.yellow, pitch: 6, rad: 0.25, da: 0.5 });
    shape(ctx, ell(-20, -96, 9, 9, 8), C.blue, { lw: 3, seed: 418 }); shape(ctx, ell(26, -100, 8, 8, 8), '#3f9d4a', { lw: 3, seed: 419 }); a104Glint(ctx, 30, -108, 12, op * (0.6 + 0.4 * Math.sin((o.t || 0) * 8))); }
  shape(ctx, K.rectPts(-60, -78, 120, 78), A104_BROWN, { lw: 5, seed: 420, dot: A104_BROWND, pitch: 8, rad: 0.2, da: 0.45 });
  for (const bx of [-38, 38]) shape(ctx, K.rectPts(bx - 7, -78, 14, 78), C.yellow, { lw: 3, seed: 421 });
  if (op <= 0.02) { shape(ctx, [[-62, -78], [-62, -92], [-48, -102], [48, -102], [62, -92], [62, -78]], A104_BROWN, { lw: 5, seed: 422, dot: A104_BROWND, pitch: 8, rad: 0.2, da: 0.45 }); for (const bx of [-38, 38]) shape(ctx, K.rectPts(bx - 7, -100, 14, 22), C.yellow, { lw: 3, seed: 423 }); }
  shape(ctx, K.rectPts(-9, -64, 18, 16), A104_GOLD, { lw: 3, seed: 424 });
  ctx.restore();
}
// ---------- food: loaf, steaming bowl, tray (bread, dates, cup) ----------
function a104Loaf(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, ell(0, 0, 32, 20, 18), '#d9903a', { lw: 4, seed: 425, dot: A104_BROWND, pitch: 6, rad: 0.2, da: 0.4 }); ctx.lineWidth = 3; ctx.strokeStyle = C.black; for (const dx of [-12, 2, 16]) { ctx.beginPath(); ctx.moveTo(dx - 4, -10); ctx.lineTo(dx + 4, 4); ctx.stroke(); } ctx.restore(); }
function a104Bowl(ctx, x, y, s = 1, t = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-36, -24], [-26, 0], [26, 0], [36, -24]], '#c9702a', { lw: 4, seed: 426, dot: A104_BROWND, pitch: 6, rad: 0.2, da: 0.4 });
  shape(ctx, ell(0, -24, 36, 8, 18), '#9a5a22', { lw: 4, seed: 427 });
  ctx.lineWidth = 4; ctx.strokeStyle = C.white; ctx.lineCap = 'round'; for (let i = 0; i < 3; i++) { const ph = (t * 0.8 + i / 3) % 1; ctx.globalAlpha = Math.sin(Math.PI * ph); ctx.beginPath(); for (let k = 0; k <= 6; k++) ctx[k ? 'lineTo' : 'moveTo'](-14 + i * 14 + 5 * Math.sin(k + t * 3 + i), -36 - k * 6 - ph * 18); ctx.stroke(); }
  ctx.restore();
}
function a104Tray(ctx, x, y, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, ell(0, 0, 70, 16, 24), A104_GOLD, { lw: 5, seed: 428, dot: C.red, pitch: 7, rad: 0.2, da: 0.4 });
  a104Loaf(ctx, -26, -14, 0.8); for (let i = 0; i < 4; i++) shape(ctx, ell(18 + (i % 2) * 12, -10 - Math.floor(i / 2) * 8, 7, 5, 10), '#5b3010', { lw: 2.5, seed: 429 + i });
  shape(ctx, [[40, -6], [42, -34], [60, -34], [62, -6]], C.blue, { lw: 4, seed: 433 });
  ctx.restore();
}
// ---------- balloon and inset (panel units, as AN-097) ----------
function a104Balloon(ctx, cx, cy, w, h, tail, p, inner, o = {}) {
  const k = K.ease.back(K.clamp(p)); if (k <= 0.02) return;
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1; ctx.translate(cx, cy); ctx.scale(k, k);
  const pts = K.circlePts(0, 0, w / 2, h / 2, 48), tx = tail ? tail[0] - cx : 0, ty = tail ? tail[1] - cy : 0, ta = Math.atan2(ty, tx);
  const tl = tail ? [[Math.cos(ta - 0.3) * w * 0.4, Math.sin(ta - 0.3) * h * 0.4], [tx * 0.85 / k, ty * 0.85 / k], [Math.cos(ta + 0.3) * w * 0.4, Math.sin(ta + 0.3) * h * 0.4]] : null;
  ctx.fillStyle = o.fill || C.white;
  if (tl) { ctx.beginPath(); ctx.moveTo(...tl[0]); ctx.lineTo(...tl[1]); ctx.lineTo(...tl[2]); ctx.closePath(); ctx.fill(); ctx.lineWidth = 7; ctx.strokeStyle = C.black; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(...tl[0]); ctx.lineTo(...tl[1]); ctx.lineTo(...tl[2]); ctx.stroke(); }
  ctx.lineWidth = 12; ctx.strokeStyle = C.black; K.poly(ctx, pts, true); ctx.stroke(); ctx.fillStyle = o.fill || C.white; K.poly(ctx, pts, true); ctx.fill();
  ctx.save(); K.poly(ctx, pts, true); ctx.clip(); inner(ctx); ctx.restore();
  ctx.restore();
}
function a104Inset(ctx, cx, cy, r, p, inner, o = {}) {
  const rr = r * K.ease.back(K.clamp(p)); if (rr < 2) return;
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1; ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 7); ctx.fillStyle = o.bg || C.paper; ctx.fill(); ctx.clip();
  ctx.translate(cx, cy); ctx.scale(rr / r, rr / r); inner(ctx);
  if (o.dream) { ctx.fillStyle = dotPat(ctx, '#3f7be6', 10, 0.3); ctx.globalAlpha *= 0.25; ctx.fillRect(-r, -r, r * 2, r * 2); }
  ctx.restore();
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1; ctx.lineWidth = 12; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 7); ctx.stroke(); ctx.lineWidth = 5; ctx.strokeStyle = o.ring || C.yellow; ctx.beginPath(); ctx.arc(cx, cy, Math.max(0, rr - 8), 0, 7); ctx.stroke(); ctx.restore();
}
// person bust: the head lands at (0, 0) at scale s
function a104Bust(ctx, P, s) { const hy = -195 + a104Age(P) * 6; person(ctx, { ...P, x: 0, y: -hy * s, s }); }
// coin eyes over a person's eyes (p 0..1 pop)
function a104CoinEyes(ctx, P, p) { if (p <= 0.02) return; const s = (P.s || 1) * K.ease.back(K.clamp(p)); for (const ex of [-13, 13]) { const q = a104Pt(P, ex + (P.look || 0) * 4, a104HdY(P) + 2); a104Coin(ctx, q[0], q[1], 11 * s); } }
// red X stamp (p 0..1) at (x, y), size r
function a104X(ctx, x, y, r, p) { if (p <= 0) return; const a = K.clamp(p * 2), b = K.clamp(p * 2 - 1); ctx.save(); ctx.lineCap = 'round'; for (const [w, c] of [[16, C.black], [10, C.red]]) { ctx.lineWidth = w; ctx.strokeStyle = c; ctx.beginPath(); ctx.moveTo(x - r, y - r); ctx.lineTo(x - r + 2 * r * a, y - r + 2 * r * a); ctx.stroke(); if (b > 0) { ctx.beginPath(); ctx.moveTo(x + r, y - r); ctx.lineTo(x + r - 2 * r * b, y - r + 2 * r * b); ctx.stroke(); } } ctx.restore(); }
// sound arcs (a growl from the belly): p 0..1
function a104Arcs(ctx, x, y, r, p, dir = 1) { if (p <= 0 || p >= 1) return; ctx.save(); ctx.lineWidth = 5; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; for (let i = 0; i < 3; i++) { const k = K.clamp(p * 1.6 - i * 0.25); if (k <= 0) continue; ctx.globalAlpha = 1 - k; ctx.beginPath(); ctx.arc(x, y, r * (0.5 + k), dir > 0 ? -0.7 : Math.PI - 0.7, dir > 0 ? 0.7 : Math.PI + 0.7); ctx.stroke(); } ctx.restore(); }
// dashed arrow along the floor
function a104Dash(ctx, a, b, p, col = C.black) { if (p <= 0) return; const e = a104L2(a, b, K.clamp(p)); ctx.save(); ctx.setLineDash([16, 12]); ctx.lineWidth = 7; ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(e[0], e[1]); ctx.stroke(); ctx.setLineDash([]); const an = Math.atan2(b[1] - a[1], b[0] - a[0]); if (p > 0.9) { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(e[0] + Math.cos(an) * 16, e[1] + Math.sin(an) * 16); ctx.lineTo(e[0] + Math.cos(an + 2.4) * 16, e[1] + Math.sin(an + 2.4) * 16); ctx.lineTo(e[0] + Math.cos(an - 2.4) * 16, e[1] + Math.sin(an - 2.4) * 16); ctx.fill(); } ctx.restore(); }
// a handcart: (x, y) = wheel contact centre, goods drawn by the caller on top (returns the bed y)
function a104Cart(ctx, x, y, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  seg(ctx, -80, -60, -150, -90, 8, A104_BROWN, 3);
  shape(ctx, K.rectPts(-90, -78, 180, 22), '#c9702a', { lw: 5, seed: 434, dot: A104_BROWND, pitch: 8, rad: 0.2, da: 0.4 });
  shape(ctx, ell(0, -26, 26, 26, 18), A104_BROWN, { lw: 5, seed: 435 }); ctx.lineWidth = 3; ctx.strokeStyle = C.black; for (let i = 0; i < 4; i++) { const a = i * Math.PI / 4; ctx.beginPath(); ctx.moveTo(-Math.cos(a) * 22, -26 - Math.sin(a) * 22); ctx.lineTo(Math.cos(a) * 22, -26 + Math.sin(a) * 22); ctx.stroke(); }
  ctx.restore(); return y - 78 * s;
}
