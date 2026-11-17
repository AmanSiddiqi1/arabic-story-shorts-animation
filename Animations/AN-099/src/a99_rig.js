// ===== AN-099 rig helpers: body-local <-> world for the Library person, arm tracks in angle space, held objects =====
const A99_SH = -132;   // shoulder y of the person figure (body-local)
const A99_FLOOR = 97.2; // the meal arrangement starts here (hidden under the LATER card)
const a99Age = (P) => P.age ?? (COSTUME[P.costume] || {}).age ?? 0.3;
const a99Lean = (P) => (P.lean || 0) + a99Age(P) * 0.12;
function a99Off(P) {   // upper-body offset of the blended hips (personPose), body-local
  const sit = K.clamp(P.sit || 0), kn = K.clamp(P.kneel || 0); let hc = [0, -75];
  if (sit > 0) { const S = P.seat === 'floor' ? [0, -24] : [-22, -52]; hc = [K.lerp(0, S[0], sit), K.lerp(-75, S[1], sit)]; }
  if (kn > 0) hc = [K.lerp(hc[0], -4, kn), K.lerp(hc[1], -48, kn)];
  return [hc[0], hc[1] + 75];
}
// world point -> body-local (like person's own toLocal; ignores tip/sq)
function a99Loc(P, w) {
  const s = P.s, dir = P.dir || 1, off = a99Off(P), lean = a99Lean(P); let lx = (w[0] - P.x) / (s * dir) - off[0], ly = (w[1] - P.y) / s - off[1];
  if (lean) { const c = Math.cos(-lean), n = Math.sin(-lean), y0 = ly + 75; [lx, ly] = [lx * c - y0 * n, lx * n + y0 * c - 75]; }
  return [lx, ly];
}
// body-local -> world (includes lean, sitting offset, scale, mirror, and the acting tip/sq)
function a99W(P, l) {
  const s = P.s, dir = P.dir || 1, off = a99Off(P), lean = a99Lean(P); let [lx, ly] = l;
  if (lean) { const c = Math.cos(lean), n = Math.sin(lean), y0 = ly + 75; [lx, ly] = [lx * c - y0 * n, lx * n + y0 * c - 75]; }
  lx += off[0]; ly += off[1]; let wx = P.x + lx * s * dir, wy = P.y + ly * s;
  const sq = P.sq ?? 1, tip = P.tip || 0;
  if (sq !== 1) { wx = P.x + (wx - P.x) * (1 + (1 - sq) * 0.7); wy = P.y + (wy - P.y) * sq; }
  if (tip) { const a = tip * Math.sign(dir), dx = wx - P.x, dy = wy - P.y; wx = P.x + dx * Math.cos(a) - dy * Math.sin(a); wy = P.y + dx * Math.sin(a) + dy * Math.cos(a); }
  return [wx, wy];
}
const a99Head = (P) => a99W(P, [(P.look || 0) * 4, -195 + (P.drop || 0) + a99Age(P) * 6]);
// hand position (body-local) from arm angles, as person() draws it
function a99HandL(sd, ang) { const e1 = [sd * 31 + Math.sin(ang[0]) * 38, A99_SH + Math.cos(ang[0]) * 38]; return [e1[0] + Math.sin(ang[1]) * 36, e1[1] + Math.cos(ang[1]) * 36]; }
const a99HandW = (P, side) => a99W(P, a99HandL(side === 'L' ? -1 : 1, side === 'L' ? P.aL : P.aR));
// arm track: keys [[t0, target, dur]]; target = body-local [x, y], {w: [x, y]} (world), {a: [a0, a1]} (angles), or a function of t returning one
function a99Ang(P, sd, v) { if (v.a) return v.a; return armTo(sd, A99_SH, v.w ? a99Loc(P, v.w) : v); }
function a99Arm(t, P, sd, keys) { return a99Tr(t, keys.map(([t0, v, d]) => [t0, (tt) => a99Ang(P, sd, typeof v === 'function' ? v(tt) : v), d])); }
// common hand targets (right side; mirror x for the left)
const A99H = { lapR: [16, -88], lapL: [-16, -88], kneeR: [44, -84], kneeL: [-44, -84], chest: [4, -120], chin: [16, -160], stroke: [10, -164], palmR: [62, -106], palmL: [-62, -106],
  out: [95, -150], fwd: [100, -150], down: [80, -74], up: [44, -205], temple: [38, -206], wave: [64, -196], clapR: [8, -134], clapL: [-8, -134], apartR: [44, -128], apartL: [-44, -128],
  raise: { a: [2.3, 2.6] }, raiseHi: { a: [2.45, 2.72] }, foldL: [22, -105], foldR: [-18, -112], earL: [-40, -198], earR: [40, -198], mouth: [8, -168] };
const a99Mir = (v) => [-v[0], v[1]];
// small pulses
const a99Pulse = (t, a, d) => (t > a && t < a + d ? Math.sin(Math.PI * (t - a) / d) : 0);
const a99Nods = (t, list, d = 0.35, amp = 6) => list.reduce((s, a) => s + amp * a99Pulse(t, a, d), 0);
// gaze helper: from P's head to a world point, plan [[t, pt]] (pt may be a function of t)
function a99Look(t, P, plan, ease = 0.18) { const pl = plan.map(([a, p]) => [a, typeof p === 'function' ? p(t) : p]); return lookAt(a99Head(P), gazePlan(t, pl, ease)); }
// walking from x and y functions: legs from the distance travelled, amplitude from the speed
function a99Walk(xf, yf, t, stride = 13) { const h = 0.05, x = xf(t), y = yf(t), v = Math.hypot(xf(t + h) - xf(t - h), yf(t + h) - yf(t - h)) / (2 * h); return { x, y, ph: (x + 0.5 * y) / stride, amp: K.clamp(v / 60) }; }
