// ===== AN-108 The Chief of the Kus Police and the Sharper: rig and time helpers (prefix ks / KS_) =====
// Film = MP3 177.958 s + end hold 2.04 s = 180.0 s (3-minute cap, plan clamp).
const KS_DUR = 180.0;
const KS_SH = -132;                                   // person shoulder y (body-local)
const ksIn = (t, a, b) => t >= a && t < b;
const ksB = (t, a, d, e = 'inOut') => K.ease[e](K.clamp((t - a) / d));
const ksFade = (t, a, b, f = 0.2) => K.clamp(Math.min((t - a) / f, (b - t) / f));
const ksWin = (t, a, b, r = 0.25) => K.ease.inOut(K.clamp(Math.min((t - a) / r, (b - t) / r)));
const ksPop = (t, a, d = 0.3) => (t < a ? 0 : K.ease.back(K.clamp((t - a) / d)));
const ksPulse = (t, a, d) => (t > a && t < a + d ? Math.sin(Math.PI * (t - a) / d) : 0);
const ksNods = (t, list, d = 0.35, amp = 5) => list.reduce((s, a) => s + amp * ksPulse(t, a, d), 0);
// keyed track: [[t0, value], [t1, value, dur], ...]; values are numbers, arrays or functions of t; each key eases from the current value over dur
function ksTr(t, keys, d0 = 0.3) {
  const val = (v) => (typeof v === 'function' ? v(t) : v);
  let cur = val(keys[0][1]);
  for (let i = 1; i < keys.length; i++) {
    const [t0, v, d] = keys[i]; if (t < t0) break;
    const u = K.ease.inOut(K.clamp((t - t0) / (d ?? d0))), nv = val(v);
    cur = Array.isArray(cur) ? cur.map((c, j) => K.lerp(c, nv[j], u)) : K.lerp(cur, nv, u);
  }
  return cur;
}
// step track: value of the last key at or before t (no easing)
function ksStep(t, keys) { let v = keys[0][1]; for (const [t0, x] of keys) if (t >= t0) v = x; return v; }

// ---------- the Library person: body-local <-> world ----------
const ksAge = (P) => P.age ?? (COSTUME[P.costume] || {}).age ?? 0.3;
const ksLean = (P) => (P.lean || 0) + ksAge(P) * 0.12;
function ksOff(P) {   // upper-body offset of the blended hips (as personPose), body-local
  const sit = K.clamp(P.sit || 0), kn = K.clamp(P.kneel || 0); let hc = [0, -75];
  if (sit > 0) { const S = P.seat === 'floor' ? [0, -24] : [-22, -52]; hc = [K.lerp(0, S[0], sit), K.lerp(-75, S[1], sit)]; }
  if (kn > 0) hc = [K.lerp(hc[0], -4, kn), K.lerp(hc[1], -48, kn)];
  return [hc[0], hc[1] + 75];
}
function ksLoc(P, w) {   // world point -> body-local (ignores tip/sq)
  const s = P.s, dir = P.dir || 1, off = ksOff(P), lean = ksLean(P); let lx = (w[0] - P.x) / (s * dir) - off[0], ly = (w[1] - P.y) / s - off[1];
  if (lean) { const c = Math.cos(-lean), n = Math.sin(-lean), y0 = ly + 75; [lx, ly] = [lx * c - y0 * n, lx * n + y0 * c - 75]; }
  return [lx, ly];
}
function ksW(P, l) {     // body-local -> world (lean, sitting offset, scale, mirror, tip, sq)
  const s = P.s, dir = P.dir || 1, off = ksOff(P), lean = ksLean(P); let [lx, ly] = l;
  if (lean) { const c = Math.cos(lean), n = Math.sin(lean), y0 = ly + 75; [lx, ly] = [lx * c - y0 * n, lx * n + y0 * c - 75]; }
  lx += off[0]; ly += off[1]; let wx = P.x + lx * s * dir, wy = P.y + ly * s;
  const sq = P.sq ?? 1, tip = P.tip || 0;
  if (sq !== 1) { wx = P.x + (wx - P.x) * (1 + (1 - sq) * 0.7); wy = P.y + (wy - P.y) * sq; }
  if (tip) { const a = tip * Math.sign(dir), dx = wx - P.x, dy = wy - P.y; wx = P.x + dx * Math.cos(a) - dy * Math.sin(a); wy = P.y + dx * Math.sin(a) + dy * Math.cos(a); }
  return [wx, wy];
}
const ksHeadL = (P) => [(P.look || 0) * 4, -195 + (P.drop || 0) + ksAge(P) * 6];
const ksHead = (P) => ksW(P, ksHeadL(P));
function ksHandL(sd, ang) { if (!ang) ang = [0.12, 0.05]; const e1 = [sd * 31 + Math.sin(ang[0]) * 38, KS_SH + Math.cos(ang[0]) * 38]; return [e1[0] + Math.sin(ang[1]) * 36, e1[1] + Math.cos(ang[1]) * 36]; }
const ksHandW = (P, side) => ksW(P, ksHandL(side === 'L' ? -1 : 1, side === 'L' ? P.aL : P.aR));
// arm target -> angles: body-local [x, y], {w: [x, y]} world, {a: [a0, a1]} angles
function ksAng(P, sd, v) { if (v.a) return v.a; return armTo(sd, KS_SH, v.w ? ksLoc(P, v.w) : v); }
function ksArm(t, P, sd, keys) { return ksTr(t, keys.map(([t0, v, d]) => [t0, (tt) => ksAng(P, sd, typeof v === 'function' ? v(tt) : v), d])); }
const ksMir = (v) => [-v[0], v[1]];
// hand targets (right side; ksMir for the left)
const KSH = { rest: [36, -62], lap: [18, -88], chest: [4, -120], heart: [10, -124], badge: [16, -128], chin: [16, -160], mouth: [8, -168], eye: [14, -186], temple: [38, -206],
  up: [44, -205], fwd: [100, -150], palm: [62, -102], offer: [92, -132], out: [95, -150], wave: [64, -196], ear: [42, -200], cup: [34, -178], hush: [8, -170],
  cheek: [34, -180], fold: [-18, -112], foldL: [22, -105], hips: [40, -82], low: [70, -80], raise: { a: [2.3, 2.62] }, raiseHi: { a: [2.5, 2.8] } };
// gaze: from P's head toward a world point, by plan [[t, pt]] (pt may be a function of t)
function ksLook(t, P, plan, ease = 0.18) { const pl = plan.map(([a, p]) => [a, typeof p === 'function' ? p(t) : p]); return lookAt(ksHead(P), gazePlan(t, pl, ease)); }
// walk from x (and optional y) functions: leg phase from distance, amplitude from speed
function ksWalk(xf, t, stride = 13, yf = null) { const h = 0.05, x = xf(t), y = yf ? yf(t) : 900, v = Math.hypot(xf(t + h) - xf(t - h), yf ? yf(t + h) - yf(t - h) : 0) / (2 * h); return { x, y, ph: x / stride, amp: K.clamp(v / 60) }; }
// footfall times of a walk (for dust, dips and thuds)
function ksFalls(xf, t0, t1, stride = 13) { const out = []; let last = Math.floor(xf(t0) / stride / Math.PI); for (let t = t0; t < t1; t += 1 / 120) { const k = Math.floor(xf(t) / stride / Math.PI); if (k !== last) { out.push({ t, x: xf(t) }); last = k; } } return out; }
const ksMid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
