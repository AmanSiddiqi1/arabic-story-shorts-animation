// ===== AN-149 rig: timing helpers, body-local <-> world for the Library person, tracks (pattern of the AN-135 rig, prefix sm) =====
const SM_DUR = 174.9;      // 171.897 narration + 3.0 end hold (plan)
const SM_SH = -132;        // shoulder y of the person figure (body-local)
const smB = (t, a, d, e = 'inOut') => K.ease[e](K.clamp((t - a) / Math.max(1e-6, d)));
const smIn = (t, a, b) => t >= a && t < b;
const smFade = (t, a, b, f = 0.2) => Math.max(0, Math.min(K.clamp((t - a) / f), K.clamp((b - t) / f)));
const smMix = (a, b, u) => (Array.isArray(a) ? a.map((v, i) => K.lerp(v, b[i], u)) : K.lerp(a, b, u));
// track: keys [[t0, value, dur, ease]]; holds the first value, then blends to each new value from t0 over dur. Values: numbers, arrays or functions of t.
function smTr(t, keys) { const val = (v) => (typeof v === 'function' ? v(t) : v); let v = val(keys[0][1]);
  for (let i = 1; i < keys.length; i++) { const [t0, v1, d = 0.4, e = 'inOut'] = keys[i]; if (t < t0) break; v = smMix(v, val(v1), K.ease[e](K.clamp((t - t0) / d))); } return v; }
// x track for walking: keys [[t, x]] linear between, with short eased starts and stops
function smX(keys) { return (t) => { if (t <= keys[0][0]) return keys[0][1]; for (let i = 1; i < keys.length; i++) { const [t1, x1] = keys[i], [t0, x0] = keys[i - 1]; if (t <= t1) { const u = K.clamp((t - t0) / Math.max(1e-6, t1 - t0)); const e = u < 0.15 ? 0.15 * Math.pow(u / 0.15, 2) * 0.5 : u > 0.85 ? 1 - 0.15 * Math.pow((1 - u) / 0.15, 2) * 0.5 : 0.075 + (u - 0.15) * (0.85 / 0.7); return K.lerp(x0, x1, K.clamp(e)); } } return keys[keys.length - 1][1]; }; }
function smWalk(xf, t, s = 1) { const x = xf(t), v = (xf(t + 0.05) - xf(t - 0.05)) / 0.1; return { x, ph: x / (24 * s), amp: K.clamp(Math.abs(v) / (70 * s)) }; }
const smS = (P) => (P.s || 1) * (P.child ? 0.62 : 1);
const smAge = (P) => (P.child ? 0 : P.age ?? (COSTUME[P.costume] || {}).age ?? 0.3);
const smLean = (P) => (P.lean || 0) + smAge(P) * 0.12;
function smOff(P) { const sit = K.clamp(P.sit || 0), kn = K.clamp(P.kneel || 0); let hc = [0, -75];
  if (sit > 0) { const S = P.seat === 'floor' ? [0, -24] : [-22, -52]; hc = [K.lerp(0, S[0], sit), K.lerp(-75, S[1], sit)]; }
  if (kn > 0) hc = [K.lerp(hc[0], -4, kn), K.lerp(hc[1], -48, kn)]; return [hc[0], hc[1] + 75]; }
// world point -> body-local (as person's own toLocal)
function smLoc(P, w) { const s = smS(P), dir = P.dir || 1, off = smOff(P), lean = smLean(P); let lx = (w[0] - P.x) / (s * dir) - off[0], ly = (w[1] - P.y) / s - off[1];
  if (lean) { const c = Math.cos(-lean), n = Math.sin(-lean), y0 = ly + 75; [lx, ly] = [lx * c - y0 * n, lx * n + y0 * c - 75]; } return [lx, ly]; }
// body-local -> world (lean, sitting offset, scale, mirror, acting tip and sq)
function smW(P, l) { const s = smS(P), dir = P.dir || 1, off = smOff(P), lean = smLean(P); let [lx, ly] = l;
  if (lean) { const c = Math.cos(lean), n = Math.sin(lean), y0 = ly + 75; [lx, ly] = [lx * c - y0 * n, lx * n + y0 * c - 75]; }
  lx += off[0]; ly += off[1]; let wx = P.x + lx * s * dir, wy = P.y + ly * s; const sq = P.sq ?? 1, tip = P.tip || 0;
  if (sq !== 1) { wx = P.x + (wx - P.x) * (1 + (1 - sq) * 0.7); wy = P.y + (wy - P.y) * sq; }
  if (tip) { const a = tip * Math.sign(dir), dx = wx - P.x, dy = wy - P.y; wx = P.x + dx * Math.cos(a) - dy * Math.sin(a); wy = P.y + dx * Math.sin(a) + dy * Math.cos(a); }
  return [wx, wy]; }
const smHeadL = (P) => [(P.look || 0) * 4, -195 + (P.drop || 0) + smAge(P) * 6 - (P.child ? 9 : 0)];
const smHead = (P) => smW(P, smHeadL(P));
const smTop = (P) => smW(P, [smHeadL(P)[0], smHeadL(P)[1] - (P.child ? 62 : 58)]);   // top of the headwear (approx.)
// hand position (body-local) from arm angles, as person() draws it
function smFK(sd, ang) { const e1 = [sd * 31 + Math.sin(ang[0]) * 38, SM_SH + Math.cos(ang[0]) * 38]; return [e1[0] + Math.sin(ang[1]) * 36, e1[1] + Math.cos(ang[1]) * 36]; }
const SM_REST = { R: [37, -58], L: [-37, -58] };
// resolve arms: P.hR / P.hL = body-local target, {w: [x, y]} world target, or {a: [a0, a1]} arm angles -> P.aR / P.aL; P.HR / P.HL = world hand points
function smArms(P) {
  for (const [k, sd] of [['R', 1], ['L', -1]]) { let v = P['h' + k]; if (v == null) v = SM_REST[k];
    const ang = v.a ? v.a : armTo(sd, SM_SH, v.w ? smLoc(P, v.w) : v); P['a' + k] = ang; P['H' + k] = smW(P, smFK(sd, ang)); }
  return P; }
const smLookAt = (P, pt) => lookAt(smHead(P), pt);
function smGaze(t, P, plan, ease = 0.18) { const pl = plan.map(([a, p]) => [a, typeof p === 'function' ? p(t) : p]); return lookAt(smHead(P), gazePlan(t, pl, ease)); }
const smNods = (t, list, d = 0.35, amp = 6) => list.reduce((s, a) => s + amp * pulse(t, a, d), 0);
// head shake for the front-facing figure: x offset (units) with n cycles over d seconds
const smShakeX = (t, a, d, amp = 6, n = 2) => (t > a && t < a + d ? amp * Math.sin((t - a) / d * Math.PI * 2 * n) * Math.sin(Math.PI * (t - a) / d) : 0);
// hand track: like smTr, but {w: [x, y]} world targets (or functions returning them) are converted to body-local first
function smHT(t, P, keys) { const res = (v) => (v && v.w ? smLoc(P, v.w) : v); return smTr(t, keys.map((k) => [k[0], typeof k[1] === 'function' ? (tt) => res(k[1](tt)) : res(k[1]), k[2], k[3]])); }
// common body-local hand targets (right side; mirror x for the left)
const SM_H = { rest: [37, -58], restL: [-37, -58], chest: [4, -120], chestL: [-4, -120], palmR: [62, -104], palmL: [-62, -104], fwd: [92, -128], fwdL: [-92, -128],
  up: [44, -205], upL: [-44, -205], wave: [64, -196], waveL: [-64, -196], mouth: [10, -170], mouthL: [-8, -170], belly: [6, -96], bellyL: [-8, -96],
  chin: [16, -160], chinL: [-16, -160], hip: [40, -82], hipL: [-40, -82], foldR: [-18, -112], foldL: [22, -105], clR: [30, -134], clL: [24, -140], cupR: [42, -200],
  head: [44, -212], headL: [-44, -212], cheekR: [34, -180], cheekL: [-34, -180], eyeR: [16, -192], eyeL: [-16, -192], knee: [40, -60], kneeL: [-40, -60],
  back: [30, -86], backL: [-30, -86], down: [80, -70], downL: [-80, -70], armOut: [95, -150], armOutL: [-95, -150] };
// person drawn with resolved arms; P.hidden skips
function smPerson(ctx, P) { if (P.hidden) return; smArms(P); person(ctx, P); }
// palettes
const SM_GREEN = { robe: GREEN, dot: GREEND, sleeve: GREEN, hc: C.yellow, hd: C.red, sash: C.yellow, trim: C.yellow, jewel: C.red };
const SM_MOURN = { robe: '#26262e', dot: '#3c3c48', sleeve: '#26262e', hc: '#26262e', hd: '#3c3c48', sash: '#141414', trim: '#55555f', jewel: '#26262e' };
const smPalMix = (a, b, f) => { const o = {}; for (const k of Object.keys(a)) o[k] = f <= 0 ? a[k] : f >= 1 ? b[k] : mixHex(a[k], b[k], f); return o; };
const SM_SINGER = { robe: C.red, dot: '#a3140e', sleeve: C.red, sash: C.yellow };
// dashed line helper (world units)
function smDash(ctx, a, b, p = 1, o = {}) { if (p <= 0) return; const x = K.lerp(a[0], b[0], p), y = K.lerp(a[1], b[1], p); ctx.save(); ctx.setLineDash(o.dash || [16, 12]); ctx.lineCap = 'round';
  ctx.lineWidth = (o.w || 7) + 6; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(x, y); ctx.stroke(); ctx.lineWidth = o.w || 7; ctx.strokeStyle = o.col || C.red; ctx.stroke(); ctx.restore(); }
// camera from keys [[t, x, y, zoom]] (eased; equal keys hold), clamped to a world of width w
function smCamK(K2, t, w = 1000) { let c; const i = K2.findIndex((q) => t < q[0]);
  if (i === 0) c = { x: K2[0][1], y: K2[0][2], zoom: K2[0][3] }; else if (i < 0) { const q = K2[K2.length - 1]; c = { x: q[1], y: q[2], zoom: q[3] }; }
  else { const a = K2[i - 1], b = K2[i], u = K.ease.inOut(K.clamp((t - a[0]) / (b[0] - a[0]))); c = { x: K.lerp(a[1], b[1], u), y: K.lerp(a[2], b[2], u), zoom: K.lerp(a[3], b[3], u) }; }
  const z = c.zoom; return { x: K.clamp(c.x, 500 / z, w - 500 / z), y: K.clamp(c.y, 615 / z, 1230 - 615 / z), zoom: z }; }
const smPan = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];
