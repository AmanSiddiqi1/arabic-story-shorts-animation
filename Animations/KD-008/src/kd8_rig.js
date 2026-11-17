// ===== KD-008 pose tracks and the carry rig =====
// kd8Pose(t, base, keys): keys = [[t0, {field: value}, dur?], ...] in time order. Numbers overshoot and settle (settleTo) from the value
// they had at t0; arrays (gaze) ease; strings and booleans switch. Every field is a pure function of t.
function kd8Pose(t, base, keys) {
  const P = { ...base };
  for (const [t0, o, d = 0.32] of keys) { if (t < t0) break;
    for (const k in o) { const v = o[k], v0 = P[k];
      if (typeof v === 'number') P[k] = settleTo(t, t0, typeof v0 === 'number' ? v0 : v, v, d, 0.1);
      else if (Array.isArray(v)) { const a = Array.isArray(v0) ? v0 : v, u = K.ease.inOut(K.clamp((t - t0) / d)); P[k] = v.map((x, i) => K.lerp(a[i], x, u)); }
      else P[k] = v; } }
  return P;
}
const kd8Win = (t, a, b) => t >= a && t < b;
const kd8Talk = (t, spans, ph = 0) => talk(t, spans, ph);
// nod: a quick head dip (0..1..0) of length d
const kd8Nod = (t, t0, d = 0.45) => pulse(t, t0, d);
// tortoise standing on the ground with her mouth on a point: stretches the neck (bisection) up to nMax, then the body leaves the ground
function kd8TortToMouth(P, m, groundY, nMax = 1.25) {
  const Q = { ...P }; let lo = 0, hi = nMax;
  const mouthY = (n) => { Q.neck = n; Q.x = 0; Q.y = groundY; return kd8TortGeo(Q).mouth[1]; };
  if (mouthY(hi) > m[1]) { Q.neck = hi; } else { for (let i = 0; i < 16; i++) { const mid = (lo + hi) / 2; if (mouthY(mid) > m[1]) lo = mid; else hi = mid; } Q.neck = (lo + hi) / 2; }
  Q.x = 0; Q.y = 0; const g = kd8TortGeo(Q).mouth; Q.x = m[0] - g[0]; Q.y = m[1] - g[1];
  return Q;
}
// tortoise hanging from a mouth point (rot, neck and head fixed in P)
function kd8TortHang(P, m) { const Q = { ...P, x: 0, y: 0 }, g = kd8TortGeo(Q).mouth; Q.x = m[0] - g[0]; Q.y = m[1] - g[1]; return Q; }
// the stick has one length (KD8_STICK); its ends from two bill grips (centred between them)
const KD8_STICK = 600;
function kd8Grips(g1, g2, L = KD8_STICK) { const dx = g2[0] - g1[0], dy = g2[1] - g1[1], l = Math.hypot(dx, dy) || 1, m = [(g1[0] + g2[0]) / 2, (g1[1] + g2[1]) / 2]; return [[m[0] - dx / l * L / 2, m[1] - dy / l * L / 2], [m[0] + dx / l * L / 2, m[1] + dy / l * L / 2]]; }
function kd8Gaze(t, from, plan, ease = 0.2) { // plan: [[t0, point | (t) => point], ...]; eases between targets
  let i = 0; for (let k = 0; k < plan.length; k++) if (t >= plan[k][0]) i = k;
  const at = (k) => { const p = plan[k][1]; return typeof p === 'function' ? p(t) : p; }, cur = lookAt(from, at(i)); if (i === 0) return cur;
  const u = K.ease.inOut(K.clamp((t - plan[i][0]) / ease)), prv = lookAt(from, at(i - 1)); return [K.lerp(prv[0], cur[0], u), K.lerp(prv[1], cur[1], u)];
}
// grip point a little back inside the bill
function kd8Grip(D) { const g = kd8DuckGeo(D), b = kd8Add(g.H, kd8Rot([40, 8], g.ba)); return g.W(b); }
// draw the three: duck A behind, tortoise, stick, beak over the stick, duck B in front
function kd8DrawRig(ctx, R) {
  kd8Duck(ctx, R.A);
  if (R.T && !R.Tfront) kd8Tort(ctx, R.T);
  if (R.stick) kd8Stick(ctx, R.stick[0], R.stick[1], R.sag || 0);
  if (R.T && R.bite) kd8Tort(ctx, { ...R.T, pass: 'beak' });
  kd8Duck(ctx, R.B);
  if (R.T && R.Tfront) kd8Tort(ctx, R.T);
}
// flight rig in air-world units (ducks fly right). o: {bob, dipY, flapRate, neck, beatA, beatB, extra}
function kd8RigFly(t, o = {}) {
  const fr = o.flapRate ?? 7.5, bob = o.bob ?? 1, up = o.up || 0;
  const A = { x: 120 + (o.dxA || 0), y: 470 + Math.sin(t * fr) * 8 * bob + (o.dyA || 0) - up, s: 1.3, pal: 0, fly: true, flap: Math.sin(t * fr), neck: o.neckA ?? 1, clamp: true, ...(o.A || {}) };
  const B = { x: 680 + (o.dxB || 0), y: 478 + Math.sin(t * fr + 2.1) * 8 * bob + (o.dyB || 0) - up, s: 1.3, pal: 1, fly: true, flap: Math.sin(t * fr + 2.1), neck: o.neckB ?? 1, clamp: true, ...(o.B || {}) };
  const st = kd8Grips(kd8Grip(A), kd8Grip(B));
  return { A, B, stick: st, sag: o.sag ?? 14 };
}
const KD8_HANG = { s: 1.3, dir: 1, rot: -0.42, neck: 0.75, nAng: -1.22, headRot: -0.12, dangle: 1, mouth: 'closed' };
