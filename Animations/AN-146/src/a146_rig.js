// ===== AN-146 rig: timing helpers, body-local <-> world for the Library person, tracks (pattern of the AN-111 rig) =====
const A146_DUR = 179.98;   // 177.576 narration + 2.4 end hold (plan; limit 180.0)
const A146_SH = -132;       // shoulder y of the person figure (body-local)
const a146B = (t, a, d, e = 'inOut') => K.ease[e](K.clamp((t - a) / Math.max(1e-6, d)));
const a146In = (t, a, b) => t >= a && t < b;
const a146Fade = (t, a, b, f = 0.2) => Math.max(0, Math.min(K.clamp((t - a) / f), K.clamp((b - t) / f)));
const a146Mix = (a, b, u) => (Array.isArray(a) ? a.map((v, i) => K.lerp(v, b[i], u)) : K.lerp(a, b, u));
// track: keys [[t0, value, dur, ease]]; holds the first value, then blends to each new value from t0 over dur. Values: numbers, arrays or functions of t.
function a146Tr(t, keys) { const val = (v) => (typeof v === 'function' ? v(t) : v); let v = val(keys[0][1]);
  for (let i = 1; i < keys.length; i++) { const [t0, v1, d = 0.4, e = 'inOut'] = keys[i]; if (t < t0) break; v = a146Mix(v, val(v1), K.ease[e](K.clamp((t - t0) / d))); } return v; }
// x track for walking: keys [[t, x]] linear between, with short eased starts and stops
function a146X(keys) { return (t) => { if (t <= keys[0][0]) return keys[0][1]; for (let i = 1; i < keys.length; i++) { const [t1, x1] = keys[i], [t0, x0] = keys[i - 1]; if (t <= t1) { const u = K.clamp((t - t0) / Math.max(1e-6, t1 - t0)); const e = u < 0.15 ? 0.15 * Math.pow(u / 0.15, 2) * 0.5 : u > 0.85 ? 1 - 0.15 * Math.pow((1 - u) / 0.15, 2) * 0.5 : 0.075 + (u - 0.15) * (0.85 / 0.7); return K.lerp(x0, x1, K.clamp(e)); } } return keys[keys.length - 1][1]; }; }
function a146Walk(xf, t, s = 1) { const x = xf(t), v = (xf(t + 0.05) - xf(t - 0.05)) / 0.1; return { x, ph: x / (24 * s), amp: K.clamp(Math.abs(v) / (70 * s)) }; }
const a146S = (P) => (P.s || 1) * (P.child ? 0.62 : 1);
const a146Age = (P) => (P.child ? 0 : P.age ?? (COSTUME[P.costume] || {}).age ?? 0.3);
const a146Lean = (P) => (P.lean || 0) + a146Age(P) * 0.12;
function a146Off(P) { const sit = K.clamp(P.sit || 0), kn = K.clamp(P.kneel || 0); let hc = [0, -75];
  if (sit > 0) { const S = P.seat === 'floor' ? [0, -24] : [-22, -52]; hc = [K.lerp(0, S[0], sit), K.lerp(-75, S[1], sit)]; }
  if (kn > 0) hc = [K.lerp(hc[0], -4, kn), K.lerp(hc[1], -48, kn)]; return [hc[0], hc[1] + 75]; }
// world point -> body-local (as person's own toLocal)
function a146Loc(P, w) { const s = a146S(P), dir = P.dir || 1, off = a146Off(P), lean = a146Lean(P); let lx = (w[0] - P.x) / (s * dir) - off[0], ly = (w[1] - P.y) / s - off[1];
  if (lean) { const c = Math.cos(-lean), n = Math.sin(-lean), y0 = ly + 75; [lx, ly] = [lx * c - y0 * n, lx * n + y0 * c - 75]; } return [lx, ly]; }
// body-local -> world (lean, sitting offset, scale, mirror, acting tip and sq)
function a146W(P, l) { const s = a146S(P), dir = P.dir || 1, off = a146Off(P), lean = a146Lean(P); let [lx, ly] = l;
  if (lean) { const c = Math.cos(lean), n = Math.sin(lean), y0 = ly + 75; [lx, ly] = [lx * c - y0 * n, lx * n + y0 * c - 75]; }
  lx += off[0]; ly += off[1]; let wx = P.x + lx * s * dir, wy = P.y + ly * s; const sq = P.sq ?? 1, tip = P.tip || 0;
  if (sq !== 1) { wx = P.x + (wx - P.x) * (1 + (1 - sq) * 0.7); wy = P.y + (wy - P.y) * sq; }
  if (tip) { const a = tip * Math.sign(dir), dx = wx - P.x, dy = wy - P.y; wx = P.x + dx * Math.cos(a) - dy * Math.sin(a); wy = P.y + dx * Math.sin(a) + dy * Math.cos(a); }
  return [wx, wy]; }
const a146HeadL = (P) => [(P.look || 0) * 4, -195 + (P.drop || 0) + a146Age(P) * 6 - (P.child ? 9 : 0)];
const a146Head = (P) => a146W(P, a146HeadL(P));
// hand position (body-local) from arm angles, as person() draws it
function a146FK(sd, ang) { const e1 = [sd * 31 + Math.sin(ang[0]) * 38, A146_SH + Math.cos(ang[0]) * 38]; return [e1[0] + Math.sin(ang[1]) * 36, e1[1] + Math.cos(ang[1]) * 36]; }
const A146_REST = { R: [37, -58], L: [-37, -58] };
// resolve arms: P.hR / P.hL = body-local target, {w: [x, y]} world target, or {a: [a0, a1]} arm angles -> P.aR / P.aL; P.HR / P.HL = world hand points
function a146Arms(P) {
  for (const [k, sd] of [['R', 1], ['L', -1]]) { let v = P['h' + k]; if (v == null) v = A146_REST[k];
    const ang = v.a ? v.a : armTo(sd, A146_SH, v.w ? a146Loc(P, v.w) : v); P['a' + k] = ang; P['H' + k] = a146W(P, a146FK(sd, ang)); }
  return P; }
// gaze from the head toward a world point; plan [[t, point | fn(t)]]
const a146LookAt = (P, pt) => lookAt(a146Head(P), pt);
function a146Gaze(t, P, plan, ease = 0.18) { const pl = plan.map(([a, p]) => [a, typeof p === 'function' ? p(t) : p]); return lookAt(a146Head(P), gazePlan(t, pl, ease)); }
const a146Nods = (t, list, d = 0.35, amp = 6) => list.reduce((s, a) => s + amp * pulse(t, a, d), 0);
const a146Shake = (t, a, d, amp = 0.12, n = 2) => (t > a && t < a + d ? amp * Math.sin((t - a) / d * Math.PI * 2 * n) * Math.sin(Math.PI * (t - a) / d) : 0);
// hand track: like a146Tr, but {w: [x, y]} world targets (or functions returning them) are converted to body-local first
function a146HT(t, P, keys) { const res = (v) => (v && v.w ? a146Loc(P, v.w) : v && v.a ? a146FK(v.sd ?? Math.sign(v.a[0] || 1), v.a) : v); return a146Tr(t, keys.map((k) => [k[0], typeof k[1] === 'function' ? (tt) => res(k[1](tt)) : res(k[1]), k[2], k[3]])); }
// common body-local hand targets (right side; mirror x for the left)
const A146H = { rest: [37, -58], restL: [-37, -58], chest: [4, -120], chestL: [-4, -120], palmR: [62, -104], palmL: [-62, -104], fwd: [92, -128], fwdL: [-92, -128],
  up: [44, -205], upL: [-44, -205], wave: [64, -196], waveL: [-64, -196], mouth: [10, -170], mouthL: [-8, -170], belly: [6, -96], bellyL: [-8, -96], brow: [30, -214], browL: [-30, -214],
  chin: [16, -160], hip: [40, -82], hipL: [-40, -82], foldR: [-18, -112], foldL: [22, -105], clR: [30, -134], clL: [24, -140], shadeR: [22, -212], cupR: [34, -178], down: [80, -70], downL: [-80, -70],
  pointBack: [-100, -150] };
// person drawn with resolved arms; P.hidden skips
function a146Person(ctx, P) { if (P.hidden) return; a146Arms(P); if (P.cloak) a146CapeBack(ctx, P); person(ctx, P); }
// a fuller red cloak behind the figure (the thief's cloak must read at phone size): flares from the shoulders, the hem trails the walk (P.capeLag)
function a146CapeBack(ctx, P) {
  const t = LIFE.t || 0, lag = (P.capeLag ?? K.clamp(P.amp || 0) * 34) + 4 * Math.sin(t * 6 + (P.seed || 0)) * (0.3 + K.clamp(P.amp || 0)), f = (x, y) => a146W(P, [x, y]);
  const pts = [f(-30, -150), f(30, -150), f(62 - lag, -60), f(70 - lag * 1.3, -14), f(24 - lag * 1.3, -6), f(-24 - lag * 1.3, -6), f(-72 - lag * 1.3, -16), f(-64 - lag, -60), f(-30, -150)];
  ctx.save(); if (P.alpha != null) ctx.globalAlpha *= P.alpha; shape(ctx, pts, C.red, { lw: 5, seed: 29, dot: '#8a1410', pitch: 9, rad: 0.25, da: 0.5 }); ctx.restore();
}
// shorthand for a kick (spring) sum used in footfalls of a person
const a146Steps = (t, falls, amp = 3) => kick(t, falls, amp, 11, 9);
// dashed line helper (world units)
function a146Dash(ctx, a, b, p = 1, o = {}) { if (p <= 0) return; const x = K.lerp(a[0], b[0], p), y = K.lerp(a[1], b[1], p); ctx.save(); ctx.setLineDash(o.dash || [16, 12]); ctx.lineCap = 'round';
  ctx.lineWidth = (o.w || 7) + 6; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(x, y); ctx.stroke(); ctx.lineWidth = o.w || 7; ctx.strokeStyle = o.col || C.red; ctx.stroke(); ctx.restore(); }
// v2 bow: feet planted, tip capped, the rest of the bow from squash, a lowered head and arms swept out; a small rise (0.12 s) before it.
//   returns {k (0..1 bow amount), tip, sq, lid}; a = bow start, d = hold length (down 0.22 s, hold, up 0.3 s)
function a146Bow(t, a, d = 0.5, amt = 0.26) {
  const k = t < a ? 0 : t < a + 0.22 ? K.ease.out((t - a) / 0.22) : t < a + 0.22 + d ? 1 : 1 - K.ease.inOut(K.clamp((t - a - 0.22 - d) / 0.3));
  const rise = 0.035 * pulse(t, a - 0.14, 0.14);
  return { k, tip: Math.min(0.3, amt) * k, sq: 1 + rise - 0.1 * k, lid: 0.8 * k };
}
// apply a bow (sum of several) to a person: tip, sq, lid, head drop, gaze down, both arms swept out to the sides
function a146ApplyBow(P, b) { if (b.k <= 0.001) return; P.tip = (P.tip || 0) + b.tip; P.sq = (P.sq ?? 1) * b.sq; P.lid = Math.max(P.lid || 0, b.lid); P.drop = (P.drop || 0) + 10 * b.k;
  P.gaze = [P.gaze ? P.gaze[0] * (1 - b.k) : 0, K.lerp(P.gaze ? P.gaze[1] : 0, 1, b.k)];
  const R = Array.isArray(P.hR) ? P.hR : A146H.rest, L = Array.isArray(P.hL) ? P.hL : A146H.restL;
  P.hR = a146Mix(R, [78, -70], b.k); P.hL = a146Mix(L, [-78, -70], b.k); }
