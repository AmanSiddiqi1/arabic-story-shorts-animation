// ===== motion helpers: small, pure functions of time for acting and movement =====
// Everything stays a pure function of t (seeded randomness only).

// blink(t, seed): upper-lid amount 0..1 for natural blinks every 2.6-5 s (0.16 s each). Use: P.lid = Math.max(P.lid || 0, blink(t, 3)).
function blink(t, seed = 1) { const r = K.rng(seed * 7919), gaps = []; let x = r() * 2; while (x < t + 6) { gaps.push(x); x += 2.6 + r() * 2.4; } for (const g of gaps) { const d = t - g; if (d >= 0 && d < 0.16) return Math.sin(Math.PI * d / 0.16); } return 0; }
// lookAt([x, y] from, [x, y] to): unit gaze vector in screen space, for P.gaze
function lookAt(from, to) { const dx = to[0] - from[0], dy = to[1] - from[1], d = Math.hypot(dx, dy) || 1; return [dx / d, dy / d]; }
// ease between two values over [a, b] (inOut), handy for pose blends: P.drop = blend(t, 27.0, 27.6, -8, 22)
function blend(t, a, b, v0, v1, e = 'inOut') { return K.lerp(v0, v1, K.ease[e](K.clamp((t - a) / (b - a)))); }
// pulse(t, a, d): 0 -> 1 -> 0 sine bump over [a, a + d] (a nod, a nudge, a hop)
function pulse(t, a, d) { return t > a && t < a + d ? Math.sin(Math.PI * (t - a) / d) : 0; }

// ---------- travel ----------
// velocity of any position function x(t) (for walk-cycle amplitude): P.amp = K.clamp(Math.abs(speed(xf, t)) / 70)
function speed(xf, t, h = 0.05) { return (xf(t + h) - xf(t - h)) / (2 * h); }
// walk(xf, t, {stride: 26, amp: 70}): pose fields for the quadrupeds (lion, fox, deer, elephant): ph from distance travelled, amp from speed,
// so legs never slide. Spread into a pose: Object.assign(P, walk(xf, t)).
function walk(xf, t, o = {}) { const x = xf(t); return { x, ph: x / (o.stride ?? 26), amp: K.clamp(Math.abs(speed(xf, t)) / (o.amp ?? 70)) }; }
// footfalls(xf, t0, t1, stride): times (and x) when a foot pair lands, for dust, thuds and camera micro-shake. Sample once, outside draw.
function footfalls(xf, t0, t1, stride = 26) { const out = []; let last = Math.floor(xf(t0) / stride / Math.PI); for (let t = t0; t < t1; t += 1 / 240) { const k = Math.floor(xf(t) / stride / Math.PI); if (k !== last) { out.push({ t, x: xf(t), odd: k % 2 !== 0 }); last = k; } } return out; }
// kick(t, times, amp, freq, damp): summed spring kicks after each time (hop of small things near a footfall, micro-shake)
function kick(t, times, amp = 3, freq = 11, damp = 9) { let s = 0; for (const h of times) { const tt = h.t ?? h; if (t >= tt && t < tt + 0.8) s += K.spring(t, tt, amp, freq, damp); } return s; }

// ---------- hops, landings, anticipation ----------
// hop(t, a, d, x0, x1, h): position during a hop of duration d starting at a; returns [x, lift]. lift is 0 on the ground.
function hop(t, a, d, x0, x1, h = 22) { const f = K.clamp((t - a) / d); return [K.lerp(x0, x1, f), t > a && f < 1 ? h * Math.sin(Math.PI * f) : 0]; }
// landSquash(t, tLand, amount = 0.16, rate = 14): value for P.sq that dips below 1 on landing and recovers
function landSquash(t, tLand, amount = 0.16, rate = 14) { return t < tLand ? 1 : 1 - amount * Math.exp(-(t - tLand) * rate); }
// anticipate(t, a, d, amount): crouch before an action: P.sq = anticipate(t, 46.3, 0.2, 0.08) (squash in, then snap back at a + d)
function anticipate(t, a, d, amount = 0.08) { return t < a || t > a + d ? 1 : 1 - amount * K.ease.inOut((t - a) / d); }
// tremble(t, amp, hz): small fast shake for crying, fear, cold: P.x += tremble(t, 2.5)
function tremble(t, amp = 2.5, hz = 9) { return amp * Math.sin(t * 2 * Math.PI * hz); }

// ---------- added for the five-story upgrade (Thief and the Moonbeam) ----------
// countedBeats(t, onsets, {ant: 0.1, decay: 6}): for repeated words (a chant, knocks, steps) cued to measured audio onsets.
// Returns {n: how many have happened, since: seconds since the last, accent: 1 on the onset decaying, dip: 0..1 anticipation just before the next}
function countedBeats(t, onsets, o = {}) { const ant = o.ant ?? 0.1, decay = o.decay ?? 6; let n = 0; for (const h of onsets) if (t >= h) n++;
  const last = n ? onsets[n - 1] : null, next = onsets[n], since = last == null ? Infinity : t - last;
  return { n, since, accent: last == null ? 0 : Math.exp(-since * decay), dip: next != null && t > next - ant ? Math.sin(Math.PI * (t - (next - ant)) / ant) : 0 }; }
// gazePlan(t, plan, ease = 0.22): eye target that holds on each [t0, [x, y]] and eases to the next over `ease` seconds. Use with lookAt().
function gazePlan(t, plan, ease = 0.22) { let cur = plan[0][1]; for (let i = 1; i < plan.length; i++) { const [t0, p] = plan[i]; if (t < t0) break; const u = K.ease.inOut(K.clamp((t - t0) / ease)); cur = [K.lerp(cur[0], p[0], u), K.lerp(cur[1], p[1], u)]; } return cur; }
// look(t, from, plan): gaze vector straight from a plan, the common case: P.gaze = look(t, [P.x, P.y - 190], [[0, [500, 600]], [21.2, [430, 560]]])
function look(t, from, plan, ease) { return lookAt(from, gazePlan(t, plan, ease)); }
// breathe(t, seed, amp = 0.012): idle breathing for P.sq when a figure holds still
function breathe(t, seed = 1, amp = 0.012) { return 1 + amp * Math.sin(t * 2 * Math.PI * 0.3 + seed * 1.7); }
// stagger(i, step = 0.13): reaction delay for member i of a group, so groups never move in unison (leader 0, then i * step)
function stagger(i, step = 0.13) { return i * step; }
// fallY(t, t0, t1, y0, y1): accelerating fall (gravity feel) from y0 at t0 to y1 at t1
function fallY(t, t0, t1, y0, y1) { const u = K.clamp((t - t0) / (t1 - t0)); return K.lerp(y0, y1, u * u); }
// impactSquash(t, tHit, deep = 0.55): P.sq on landing: deep squash for ~2 frames, overshoot stretch, settle
function impactSquash(t, tHit, deep = 0.55) { if (t < tHit) return 1; const d = t - tHit; if (d < 0.07) return deep; return 1 + (deep - 1) * 0.55 * Math.exp(-(d - 0.07) * 9) * Math.cos((d - 0.07) * 18); }
// rebound(t, tHit, h = 18, dur = 0.22): small bounce height after an impact
function rebound(t, tHit, h = 18, dur = 0.22) { return t > tHit + 0.07 && t < tHit + 0.07 + dur ? h * Math.sin(Math.PI * (t - tHit - 0.07) / dur) : 0; }
// settleTo(t, t0, v0, v1, dur = 0.35, over = 0.12): pose change with a little overshoot and settle (instead of a snap)
function settleTo(t, t0, v0, v1, dur = 0.35, over = 0.12) { if (t <= t0) return v0; const u = K.clamp((t - t0) / dur); const k = u < 0.6 ? K.ease.out(u / 0.6) * (1 + over) : 1 + over * (1 - K.ease.inOut((u - 0.6) / 0.4)); return K.lerp(v0, v1, k); }
// swing(t, t0, amp, freq = 1.4, damp = 2.2): damped pendulum (dangling legs, a hanging sign, a tail after a stop)
function swing(t, t0, amp, freq = 1.4, damp = 2.2) { return t < t0 ? 0 : amp * Math.exp(-(t - t0) * damp) * Math.cos(2 * Math.PI * freq * (t - t0)); }

// ---------- added for the five-story upgrade (The Monkey and the Turtle) ----------
// turnFlip(t, turns, dur = 0.7): side-view turn-around without collapsing to a sliver. turns = [[t0, newDir], ...] (first entry = starting dir, t0 ignored).
// Returns {dir: facing with a squeeze (abs >= 0.7, use as P.dir), tuck: 0..1 (pull the head in: ext *= 1 - 0.65 * tuck), sink: 0..1 (lower the body)}.
function turnFlip(t, turns, dur = 0.7) { let d = turns[0][1], out = { dir: d, tuck: 0, sink: 0 };
  for (let i = 1; i < turns.length; i++) { const [t0, nd] = turns[i]; if (t < t0) break; const u = (t - t0) / dur; if (u >= 1) { d = nd; out = { dir: d, tuck: 0, sink: 0 }; continue; }
    const tuck = u < 0.43 ? K.ease.out(u / 0.43) : 1 - K.ease.inOut((u - 0.57) / 0.43) * (u > 0.57 ? 1 : 0), sq = 1 - 0.3 * Math.sin(Math.PI * K.clamp((u - 0.36) / 0.28));
    out = { dir: (u < 0.5 ? d : nd) * sq, tuck: K.clamp(tuck), sink: Math.sin(Math.PI * u) }; break; }
  return out; }
// swimPhase(xf, t, stride = 22): stroke phase from the distance travelled (the water twin of walk()), and stroke strength from speed
function swimPhase(xf, t, stride = 22, idle = 0.25) { const v = Math.abs(speed(xf, t)); return { ph: Math.abs(xf(t)) / stride * Math.PI + t * 0.8, paddle: Math.max(idle, K.clamp(v / 60)), moving: v > 20 }; }
// lurch(t, tBrake, amp = 0.28): a passenger's forward tip when the carrier brakes, overshooting back and settling (use as P.tip)
function lurch(t, tBrake, amp = 0.28) { return t < tBrake ? 0 : amp * Math.exp(-(t - tBrake) * 4.2) * Math.cos((t - tBrake) * 7.5); }
// twoShot(a, b, {margin: 150, minZoom: 1, maxZoom: 2.4, w: 1000, h: 1230}): camera {x, y, zoom} that keeps two world points (heads) in the panel
function twoShot(a, b, o = {}) { const m = o.margin ?? 150, w = o.w ?? 1000, h = o.h ?? 1230; const dx = Math.abs(a[0] - b[0]) + 2 * m, dy = Math.abs(a[1] - b[1]) + 2 * m;
  return { x: (a[0] + b[0]) / 2, y: (a[1] + b[1]) / 2, zoom: K.clamp(Math.min(w / dx, h / dy), o.minZoom ?? 1, o.maxZoom ?? 2.4) }; }

// ---------- added 2026-11-21: character-motion method (rossark-motion-skill, /rossark-motion-shorts) ----------
// flow(t, keys): acting curve through key poses [[t0, v0], [t1, v1], ...] (seconds). Unlike kfn (which eases to a stop at every key),
// it passes through each key with a continuous speed and never overshoots one (monotone cubic). Repeat a value to hold a pose;
// before the first key / after the last it holds the end value. Use for lean, head turn, arm angles, any chain of poses.
const FLOW_SLOPES = new WeakMap();
function flow(t, keys) {
  const n = keys.length; if (t <= keys[0][0] || n < 2) return keys[0][1]; if (t >= keys[n - 1][0]) return keys[n - 1][1];
  let m = FLOW_SLOPES.get(keys);
  if (!m) {   // Fritsch-Carlson slopes, computed once per keys array
    const d = []; for (let i = 0; i < n - 1; i++) d.push((keys[i + 1][1] - keys[i][1]) / (keys[i + 1][0] - keys[i][0]));
    m = [0]; for (let i = 1; i < n - 1; i++) m.push(d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2);   // 0 at a turning point: no overshoot
    m.push(0);
    for (let i = 0; i < n - 1; i++) { if (d[i] === 0) { m[i] = 0; m[i + 1] = 0; continue; } const a = m[i] / d[i], b = m[i + 1] / d[i], h = a * a + b * b; if (h > 9) { const s = 3 / Math.sqrt(h); m[i] = s * a * d[i]; m[i + 1] = s * b * d[i]; } }
    FLOW_SLOPES.set(keys, m);
  }
  let i = 0; while (t > keys[i + 1][0]) i++;
  const [t0, v0] = keys[i], [t1, v1] = keys[i + 1], h = t1 - t0, u = (t - t0) / h, u2 = u * u, u3 = u2 * u;
  return (2 * u3 - 3 * u2 + 1) * v0 + (u3 - 2 * u2 + u) * h * m[i] + (-2 * u3 + 3 * u2) * v1 + (u3 - u2) * h * m[i + 1];
}
// lagged(f, t, delay = 0.09, k = 0.45): follow-through by delay, not springs. Offset to ADD to a child part so it trails its parent f(t):
// when the parent swings the child lags, then catches up with no overshoot. Forearms, hands, tails, ears, hair:
//   P.elbow = flow(t, ELBOW) + lagged((u) => flow(u, SHOULDER), t);   counter-motion: head = own(t) - 0.45 * lean(t - 0.11)
function lagged(f, t, delay = 0.09, k = 0.45) { return k * (f(t - delay) - f(t)); }
// osc(t, period, phase = 0): smooth -1..1 wave (sway, bob, breath); phase in cycles. beatIn(t, a, b): a window [a, b] as 0..1 (one beat).
function osc(t, period, phase = 0) { return Math.sin(2 * Math.PI * (t / period + phase)); }
function beatIn(t, a, b) { return K.clamp((t - a) / (b - a)); }
// idleSway(t, seed, amp, period = 3): a "moving hold": small life on one channel from two waves of different periods, phased by seed.
// Give every part its own seed so left and right never mirror (limbs: amp 2-4 deg as radians, tip: 0.02-0.035, head: 0.03).
function idleSway(t, seed, amp, period = 3) { const ph = K.rng(seed * 104729)(); return amp * (0.67 * osc(t, period, ph) + 0.33 * osc(t, period * 0.6, ph + 0.3)); }
// groundShadow(ctx, x, y, w, lift = 0, o): contact shadow on the ground at (x, y) for a body of width w lifted by `lift` units:
// it stays on the floor and shrinks and fades with height (scale 1 - lift / o.fall, default 220), so a jump or a float reads.
// Filled with the style's own texture (dotPat: Ben-Day dots in Halftone, like fx halftoneShadow), or solid with o.flat.
// o: { h: thickness (default w * 0.12: a pill for a side view; ~w * 0.3 for a view from above), color (C.black), alpha (0.5; flat 0.22), fall, flat }
function groundShadow(ctx, x, y, w, lift = 0, o = {}) {
  const s = K.clamp(1 - Math.max(0, lift) / (o.fall ?? 220), 0.25, 1), rx = (w / 2) * s, ry = (o.h ?? w * 0.12) * s;
  ctx.save(); ctx.globalAlpha *= (o.alpha ?? (o.flat ? 0.22 : 0.5)) * (0.45 + 0.55 * s);
  ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  if (o.flat) { ctx.fillStyle = o.color || C.black; ctx.fill(); } else { ctx.clip(); ctx.fillStyle = dotPat(ctx, o.color || C.black, 7, 0.32); ctx.fillRect(x - rx - 2, y - ry - 2, rx * 2 + 4, ry * 2 + 4); }
  ctx.restore();
}
// celStep(t, fps = 12): time held on a step grid, for drawings "on twos" (12 fps) or threes (8 fps) in limited-animation styles
// (80s cel anime). Pose a character with celStep(t) while the camera, light and effects keep the full t.
function celStep(t, fps = 12) { return Math.floor(t * fps + 1e-6) / fps; }
