// ===== AN-111 rig: small timing helpers, body-local <-> world for the Library person, hand and head positions, tracks =====
const A111_DUR = 179.99;    // 177.87 narration + 2.12 end hold (plan, 3-minute cap)
const A111_SH = -132;       // shoulder y of the person figure (body-local)
const a111B = (t, a, d, e = 'inOut') => K.ease[e](K.clamp((t - a) / Math.max(1e-6, d)));
const a111In = (t, a, b) => t >= a && t < b;
const a111Fade = (t, a, b, f = 0.2) => Math.max(0, Math.min(K.clamp((t - a) / f), K.clamp((b - t) / f)));
const a111Mix = (a, b, u) => (Array.isArray(a) ? a.map((v, i) => K.lerp(v, b[i], u)) : K.lerp(a, b, u));
// track: keys [[t0, value, dur, ease]]; holds the first value, then blends to each new value from t0 over dur. Values: numbers or arrays (or functions of t).
function a111Tr(t, keys) { const val = (v) => (typeof v === 'function' ? v(t) : v); let v = val(keys[0][1]);
  for (let i = 1; i < keys.length; i++) { const [t0, v1, d = 0.4, e = 'inOut'] = keys[i]; if (t < t0) break; v = a111Mix(v, val(v1), K.ease[e](K.clamp((t - t0) / d))); } return v; }
// x track for walking: keys [[t, x]] linear between (smoothstep at each end of a move)
function a111X(keys) { return (t) => { if (t <= keys[0][0]) return keys[0][1]; for (let i = 1; i < keys.length; i++) { const [t1, x1] = keys[i], [t0, x0] = keys[i - 1]; if (t <= t1) { const u = K.clamp((t - t0) / Math.max(1e-6, t1 - t0)); const e = u < 0.15 ? 0.15 * Math.pow(u / 0.15, 2) * 0.5 : u > 0.85 ? 1 - 0.15 * Math.pow((1 - u) / 0.15, 2) * 0.5 : 0.075 + (u - 0.15) * (0.85 / 0.7); return K.lerp(x0, x1, K.clamp(e)); } } return keys[keys.length - 1][1]; }; }
function a111Walk(xf, t, s = 0.9) { const x = xf(t), v = (xf(t + 0.05) - xf(t - 0.05)) / 0.1; return { x, ph: x / (24 * s), amp: K.clamp(Math.abs(v) / (70 * s)) }; }
const a111S = (P) => (P.s || 1) * (P.child ? 0.62 : 1);
const a111Age = (P) => (P.child ? 0 : P.age ?? (COSTUME[P.costume] || {}).age ?? 0.3);
const a111Lean = (P) => (P.lean || 0) + a111Age(P) * 0.12;
function a111Off(P) { const sit = K.clamp(P.sit || 0), kn = K.clamp(P.kneel || 0); let hc = [0, -75];
  if (sit > 0) { const S = P.seat === 'floor' ? [0, -24] : [-22, -52]; hc = [K.lerp(0, S[0], sit), K.lerp(-75, S[1], sit)]; }
  if (kn > 0) hc = [K.lerp(hc[0], -4, kn), K.lerp(hc[1], -48, kn)]; return [hc[0], hc[1] + 75]; }
// world point -> body-local (as person's own toLocal)
function a111Loc(P, w) { const s = a111S(P), dir = P.dir || 1, off = a111Off(P), lean = a111Lean(P); let lx = (w[0] - P.x) / (s * dir) - off[0], ly = (w[1] - P.y) / s - off[1];
  if (lean) { const c = Math.cos(-lean), n = Math.sin(-lean), y0 = ly + 75; [lx, ly] = [lx * c - y0 * n, lx * n + y0 * c - 75]; } return [lx, ly]; }
// body-local -> world (lean, sitting offset, scale, mirror, acting tip and sq)
function a111W(P, l) { const s = a111S(P), dir = P.dir || 1, off = a111Off(P), lean = a111Lean(P); let [lx, ly] = l;
  if (lean) { const c = Math.cos(lean), n = Math.sin(lean), y0 = ly + 75; [lx, ly] = [lx * c - y0 * n, lx * n + y0 * c - 75]; }
  lx += off[0]; ly += off[1]; let wx = P.x + lx * s * dir, wy = P.y + ly * s; const sq = P.sq ?? 1, tip = P.tip || 0;
  if (sq !== 1) { wx = P.x + (wx - P.x) * (1 + (1 - sq) * 0.7); wy = P.y + (wy - P.y) * sq; }
  if (tip) { const a = tip * Math.sign(dir), dx = wx - P.x, dy = wy - P.y; wx = P.x + dx * Math.cos(a) - dy * Math.sin(a); wy = P.y + dx * Math.sin(a) + dy * Math.cos(a); }
  return [wx, wy]; }
const a111HeadL = (P) => [(P.look || 0) * 4, -195 + (P.drop || 0) + a111Age(P) * 6 - (P.child ? 9 : 0)];
const a111Head = (P) => a111W(P, a111HeadL(P));
const a111Mouth = (P) => { const h = a111HeadL(P); return a111W(P, [h[0], h[1] + 24 * (P.child ? 1.25 : 1)]); };
// hand position (body-local) from arm angles, as person() draws it
function a111FK(sd, ang) { const e1 = [sd * 31 + Math.sin(ang[0]) * 38, A111_SH + Math.cos(ang[0]) * 38]; return [e1[0] + Math.sin(ang[1]) * 36, e1[1] + Math.cos(ang[1]) * 36]; }
const A111_REST = { R: [37, -58], L: [-37, -58] };
// resolve a person's arms: P.hR / P.hL = body-local target or {w: [x, y]} world target -> P.aR / P.aL angles; returns P with P.HR / P.HL world hand points
function a111Arms(P) {
  for (const [k, sd] of [['R', 1], ['L', -1]]) { let v = P['h' + k]; if (v == null) v = A111_REST[k]; const loc = v.w ? a111Loc(P, v.w) : v; const ang = armTo(sd, A111_SH, loc); P['a' + k] = ang; P['H' + k] = a111W(P, a111FK(sd, ang)); }
  return P; }
// gaze from the head toward a world point (or plan)
const a111LookAt = (P, pt) => lookAt(a111Head(P), pt);
function a111Gaze(t, P, plan, ease = 0.18) { const pl = plan.map(([a, p]) => [a, typeof p === 'function' ? p(t) : p]); return lookAt(a111Head(P), gazePlan(t, pl, ease)); }
const a111Nods = (t, list, d = 0.35, amp = 6) => list.reduce((s, a) => s + amp * pulse(t, a, d), 0);
const a111Shake = (t, a, d, amp = 0.6) => (t > a && t < a + d ? amp * Math.sin((t - a) / d * Math.PI * 4) * Math.sin(Math.PI * (t - a) / d) : 0);
// common body-local hand targets (right side; mirror x for the left)
const A111H = { chest: [4, -120], chestL: [-4, -120], palmR: [62, -104], palmL: [-62, -104], out: [95, -150], outL: [-95, -150], fwd: [92, -128], up: [44, -205], wave: [64, -196], waveL: [-64, -196],
  neck: [24, -196], mouth: [8, -170], mouthL: [-6, -168], nose: [10, -186], belly: [6, -96], bellyL: [-8, -96], forehead: [20, -215], chin: [16, -160], hip: [40, -82], hipL: [-40, -82],
  raise: [50, -230], raiseL: [-50, -230], cupL: [-58, -118], foldR: [-18, -112], foldL: [22, -105] };
// stagger offsets (frames) for groups
const a111St = (i, f = 4) => i * f / 30;
// draw a person and what it holds; P.held = [[kind, 'R' | 'L' | 'both' | [x, y], opts]]
function a111Draw(ctx, t, P) { if (P.hidden) return; a111Arms(P); person(ctx, P); if (P.after) P.after(ctx, P); }
// blink helper that respects explicit lids
const a111Lid = (t, P, base = 0) => Math.max(base, P.noBlink ? 0 : blink(t, P.seed || 1));
// hand track for person P: like a111Tr, but {w: [x, y]} world targets (or functions returning them) are converted to body-local first
function a111HT(t, P, keys) { const res = (v) => (v && v.w ? a111Loc(P, v.w) : v); return a111Tr(t, keys.map((k) => [k[0], typeof k[1] === 'function' ? (tt) => res(k[1](tt)) : res(k[1]), k[2], k[3]])); }
