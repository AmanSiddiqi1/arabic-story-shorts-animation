// ===== Experiment (Fable 5.2 direction, review 1): re-staged sequence 20.2-46.5 s =====
// The elephant arrives, sees the nest, chooses not to care, crushes it without looking; the lark comes home happy,
// sees, searches, and breaks down. Cues are set on the Arabic word timings in timing.json:
// رأى 26.78 (saw) | لكنه 28.92 | لم يهتم 30.30 (did not care) | داس 31.80 (stepped) | فكسر 34.52 | وماتت الفراخ 36.26
// عادت 38.16 (returned) | إلى عشها 39.78 | ورأت 40.92 (saw) | ما حدث 42.42 | فبكت 43.92 (cried) | بحزن شديد 44.82 | طارت 46.46
const SEQ_A = 20.2, SEQ_B = 46.5, STOMP = 34.4;
const inSeq = (t) => t >= SEQ_A && t < SEQ_B;
const sm = (t, a, b) => K.ease.inOut(K.clamp((t - a) / (b - a)));
const hold = (t, keys) => kfn(t, keys, 'inOut');

// ---------- elephant path: steady heavy walk in, stop short of the nest, lurching steps, the stomp, walk on ----------
const E_STOP = 165, E_V = (E_STOP + 300) / 6.1;
function seqEX(t) {
  if (t < 25.9) return -300 + E_V * (t - SEQ_A);
  if (t < 26.7) { const u = (t - 25.9) / 0.8; return -300 + E_V * 5.7 + E_V * 0.8 * (u - u * u / 2); }
  if (t < 31.8) return E_STOP;
  if (t < 33.4) return hold(t, [[31.8, E_STOP], [32.6, 232], [32.8, 232], [33.4, 288]]);
  if (t < STOMP) return K.lerp(288, 328, K.ease.inOut(K.clamp((t - 33.4) / 1.0)));
  if (t < 35.1) return 328;
  if (t < 38.0) return K.lerp(328, 520, K.ease.inOut((t - 35.1) / 2.9));
  return 520;
}
// footfalls: every half walk cycle (leg phase = x / 26 crosses a multiple of pi), sampled once; plus the stomp
const FOOTFALLS = (() => { const out = []; let last = Math.floor(seqEX(SEQ_A) / 26 / Math.PI);
  for (let t = SEQ_A; t < 38.2; t += 1 / 240) { const k = Math.floor(seqEX(t) / 26 / Math.PI); if (k !== last) { if (t < 33.35 || t > 35.15) out.push({ t, x: seqEX(t), odd: k % 2 !== 0 }); last = k; } }
  return out; })();
const lastFall = (t) => { let f = null; for (const x of FOOTFALLS) if (x.t <= t) f = x; return f; };
const fallKick = (t, amp, freq, damp) => { let s = 0; for (const f of FOOTFALLS) if (t >= f.t && t < f.t + 0.6) s += K.spring(t, f.t, amp, freq, damp); return s; };

function elephantSeq(t) {
  const x = seqEX(t), v = (seqEX(t + 0.05) - seqEX(t - 0.05)) / 0.1, P = { s: 0.8, dir: 1, y: GR, x, eyes: 'open', ph: x / 26 };
  P.amp = K.clamp(Math.abs(v) / 70);
  const bobAt = (tt) => { const xx = seqEX(tt), vv = Math.abs(seqEX(tt + 0.05) - seqEX(tt - 0.05)) / 0.1; return K.clamp(vv / 70) * 12 * (1 - Math.abs(Math.sin(xx / 26))); };
  P.bob = bobAt(t); P.hbob = bobAt(t - 0.12) - P.bob;                    // body dips on each footfall, head lags behind
  P.trunk = 0.12 + 0.16 * Math.sin(P.ph) * P.amp;                        // trunk swings like a pendulum while walking
  P.tail = Math.sin(t * 2.4) * 0.22 * (t < 46 ? 1 : K.clamp((46.4 - t) / 0.4));
  // A: arrival, chin up, half-lidded: arrogant before he does anything
  P.drop = -8; P.lid = 0.45; P.gaze = [1, 0];
  if (t >= 26.7 && t < 27.4) P.rot = K.spring(t, 26.7, 0.035, 1.3, 3.5);   // stop and settle
  // B: "saw" - head lowers, eye opens, looks down at the nest, trunk prods the rim once
  if (t >= 27.0 && t < 30.3) { const u = sm(t, 27.0, 27.6); P.drop = K.lerp(-8, 22, u); P.lid = K.lerp(0.45, 0, u); P.gaze = [K.lerp(1, 0.45, u), K.lerp(0, 1, u)];
    P.reach = 0.35 * Math.sin(Math.PI * K.clamp((t - 27.7) / 0.55)); P.trunk = 0.05;
    if (t >= 29.45 && t < 29.75) P.lid = Math.sin(Math.PI * (t - 29.45) / 0.3);   // the slow blink in the stillness
  }
  // "did not care" - head lifts past neutral, eye closes to the smug line, brow up, trunk flicks away, ear flicks
  if (t >= 30.3) { const u = sm(t, 30.3, 30.65); P.drop = K.lerp(22, -10, u); P.gaze = [1, 0];
    if (u > 0.4) { P.eyes = 'smug'; P.brow = -0.6; } else P.lid = 0;
    P.trunk = (t < 31.8 ? 0.3 + K.spring(t, 30.3, 0.55, 1.8, 3.5) : 0.12 + 0.16 * Math.sin(P.ph) * P.amp); P.earOff = K.spring(t, 30.5, 0.35, 3, 4); }
  if (t >= 31.8 && t < 35.1) P.trunk = 0.22 + 0.04 * Math.sin(t * 3);   // trunk curled up and away: he is not even looking
  if (t >= 31.2 && t < 31.8) P.rot = -0.03 * Math.sin(Math.PI * (t - 31.2) / 0.6);   // weight shifts back: anticipation
  // C: the step. Near front foot lifts high, hangs over the nest, slams down at exactly 34.40
  if (t >= 33.4 && t < 35.1) { P.amp = 0; P.ph = 0;
    if (t < 33.75) P.lift = 100 * K.ease.out((t - 33.4) / 0.35);
    else if (t < 34.25) { P.lift = 100 + 3 * Math.sin((t - 33.75) * 8); P.rot = -0.02; }
    else if (t < STOMP) { P.lift = 100 * (1 - K.ease.in((t - 34.25) / 0.15)); P.sq = t >= 34.33 ? 1.045 : 1.02; }
    else { const d = t - STOMP; P.sq = 1 - 0.045 * Math.exp(-d * 5) * Math.max(0, Math.cos(d * 9)); }
  }
  if (t >= 33.25 && t < 35.0) { const u = sm(t, 33.25, 33.6) * (1 - sm(t, 34.5, 35.0)); P.drop = K.lerp(-10, -48, u); P.trunk = K.lerp(P.trunk, 0.75, u); }   // chin high: he does not even look down, and the raised leg reads clear of his head
  if (t >= 35.1 && t < 35.4) P.lift = 40 * Math.sin(Math.PI * (t - 35.1) / 0.3);   // foot peels up off the ruin
  // D: he walks on, never looks back; at the pull-out his face returns to the neutral look the next scene starts with
  if (t >= 45.6) { P.eyes = 'open'; P.brow = 0; P.gaze = null; P.drop = K.lerp(-10, 0, sm(t, 45.6, 46.3)); }
  return P;
}

// ---------- chicks in the nest ----------
function chicksSeq(t, L) {
  const out = [];
  for (let i = 0; i < 3; i++) {
    const cx = NEST[0] + (i - 1) * 32, cy = NEST[1] - 50, k = { bob: Math.sin(t * 6 + i) * 3, gx: 0.8, gy: 0 };
    if (t < 22.0) { const dx = L.x - cx, dy = L.y - 50 - cy, d = Math.hypot(dx, dy) || 1; k.gx = dx / d; k.gy = dy / d; }   // watch mother leave
    else {
      k.bob = 0; const tr = t - 22.0 - i * 0.06; k.gx = tr > 0 ? -1 : 0.8; k.gy = 0;                                     // first tremor: freeze, look left
      if (t >= 24.0 && t < 33.3) k.hop = Math.abs(fallKick(t, 4, 6, 9));
      if (t >= 25.5) k.wide = true;
      if (t >= 26.7) { k.gx = -0.8; k.gy = -0.6; }
      if (t >= 27.2) k.cw = 0.8 * sm(t, 27.25, 27.6);
      if (i === 1 && t >= 28.2 && t < 28.75) { k.cw = 0.3; k.open = Math.abs(Math.sin((t - 28.2) * 18)); k.hop = 4 * Math.sin(Math.PI * (t - 28.2) / 0.55); }   // one brave cheep up at him
      if (t >= 30.3) { k.gx = -0.45; k.gy = -1; }
      if (t >= 31.8) { k.gx = (1 - i) * 0.15; k.gy = -1; k.open = 0.8; k.cw = K.lerp(0.8, 1, sm(t, 31.8, 32.6)); }       // look straight up, mouths open
    }
    out.push(k);
  }
  return out;
}

// ---------- the lark comes home ----------
const WORM_REL = 39.85;
function larkSeq(t) {
  const P = { s: 0.85, dir: 1, kind: 'lark', eyes: 'open', fly: false, flap: 0, gaze: [0.8, 0] };
  if (t < 39.8) { const u = (t - 38.2) / 1.6; P.x = -110 + 415 * K.ease.out(u); P.y = 560 + 185 * Math.pow(u, 1.5) - 18 * Math.sin((t - 38.2) * 7);   // happy dipping flight
    P.fly = true; P.flap = (t > 38.95 && t < 39.3) ? -0.35 : Math.sin(t * 20); P.gaze = [0.6, 0.7]; P.beak = 0.15; P.rot = 0.08 * Math.sin((t - 38.2) * 7); }
  else if (t < 40.2) { const u = sm(t, 39.8, 39.92); P.x = 305 - 10 * K.ease.out((t - 39.8) / 0.4); P.y = 745 - 10 * K.ease.out((t - 39.8) / 0.4);   // she sees it: air-brake, freeze
    P.fly = true; P.flap = Math.sin(t * 42); P.rot = -0.3 * u; P.eyes = 'wide'; P.gaze = [0.5, 0.9]; P.beak = 0.5 * u; P.crest = -0.3 * u; }
  else if (t < 40.5) { const u = (t - 40.2) / 0.3; P.x = K.lerp(295, 300, u); P.y = K.lerp(735, 878, K.ease.in(u)); P.fly = u < 0.85; P.flap = Math.sin(t * 30) * 0.5; P.rot = -0.3 * (1 - u); P.eyes = 'wide'; P.gaze = [0.5, 0.9]; }
  else {
    const GX = 350; P.x = GX; P.y = 878; P.gaze = [0.6, 0.9];
    const hop = (a, x0, x1) => { const f = K.clamp((t - a) / 0.2); if (t >= a && f < 1) { P.x = K.lerp(x0, x1, f); P.y = 878 - 22 * Math.sin(Math.PI * f); } else if (t >= a + 0.2) P.x = x1; };
    if (t < 40.95) { P.x = 300; P.eyes = 'wide'; hop(40.55, 300, 325); hop(40.75, 325, GX); }
    // landing squash, then a squash on each hop landing
    P.sq = 1 - 0.16 * Math.exp(-(t - 40.5) * 14) - (t >= 40.75 ? 0.08 * Math.exp(-(t - 40.75) * 16) : 0) - (t >= 40.95 ? 0.08 * Math.exp(-(t - 40.95) * 16) : 0);
    // searching (ورأت): head down to the ruin, quick look left, quick look right, nudges a shell
    if (t >= 40.95) { P.drop = 8 * sm(t, 40.95, 41.1); P.gaze = [0.6, 0.9];
      if (t >= 41.2 && t < 41.5) P.gaze = [-1, -0.1]; if (t >= 41.5 && t < 41.85) P.gaze = [1, -0.1];
      if (t >= 41.9 && t < 42.35) { const u = Math.sin(Math.PI * (t - 41.9) / 0.45); P.drop = 8 + 8 * u; P.headRot = 0.35 * u; P.gaze = [0.8, 1]; } }
    // the last feather drifts past; her eye follows it to the ground, then perfect stillness
    if (t >= 42.35 && t < 43.35) { const [fx, fy] = featherAt(2, Math.min(t, 43.1)), ex = P.x + 32, ey = P.y - 60, d = Math.hypot(fx - ex, fy - ey) || 1; P.gaze = [(fx - ex) / d, (fy - ey) / d]; }
    // 1. collapse (فبكت): eyes shut, body sinks low, head drops, crest flat, wings and tail drop
    if (t >= 43.35) { const u = sm(t, 43.35, 43.8); P.crest = u; P.drop = K.lerp(8, 20, u); P.sq = K.lerp(1, 0.85, u); P.sag = u; P.tailDrop = u; if (t >= 43.5) P.eyes = 'shut'; }
    // 2. wail: head thrown back, beak to the sky and wide open, body stretched up, wings flung out and back, trembling
    if (t >= 43.9 && t < 44.75) { const u = sm(t, 43.9, 44.08), tr = Math.sin(t * 46) * 0.03 * u; P.headRot = -0.6 * u + tr; P.beak = 1.7 * u; P.drop = K.lerp(20, 2, u); P.sq = K.lerp(0.85, 1.06, u); P.sag = K.lerp(1, -0.85, u); P.crest = 1 - 0.4 * u; P.tailDrop = 1 - u; }
    // 3. sobs: head sunk below the shoulders, wings hanging, shaking in two bursts
    if (t >= 44.75 && t < 45.4) { const u = sm(t, 44.75, 44.92); P.headRot = K.lerp(-0.6, 0.35, u); P.beak = K.lerp(1.7, 0.25, u); P.drop = K.lerp(2, 24, u); P.sq = K.lerp(1.06, 0.88, u); P.sag = K.lerp(-0.85, 1.1, u); P.crest = 1; P.tailDrop = u;
      if ((t >= 44.85 && t < 45.1) || (t >= 45.15 && t < 45.4)) { P.shake = 3 * Math.sin(t * 2 * Math.PI * 9); P.sq += 0.02 * Math.sin(t * 2 * Math.PI * 9); } }
    // the turn: grief into resolve. Head lifts and tilts up toward his head, brow down, crest up, then two hops toward him
    if (t >= 45.4) { const u = sm(t, 45.4, 45.7), w = sm(t, 45.45, 45.8); P.headRot = K.lerp(0.35, -0.22, u); P.beak = 0; P.eyes = 'open'; P.wet = true; P.gaze = [0.7, -0.7];
      P.crest = 1 - w; P.sag = 1.1 * (1 - w); P.tailDrop = 1 - w; P.brow = w; P.drop = K.lerp(24, 0, u); P.sq = K.lerp(0.88, 1, u);
      hop(45.85, GX, 368); hop(46.1, 368, 385); if (t >= 46.3) P.sq = 1 - 0.07 * sm(t, 46.3, 46.45); }
  }
  return P;
}
// worm in her beak, dropped at the shock, bounces once and stays
function wormSeq(ctx, t) {
  if (t < 38.2) return;
  const bx = (tt) => { const L = larkSeq(Math.min(tt, WORM_REL)); return [L.x + 61, L.y - 54]; };
  if (t < WORM_REL) { const [x, y] = bx(t); worm(ctx, x + 18, y + 4, t); return; }
  const [x0, y0] = bx(WORM_REL), d = t - WORM_REL, fall = 0.42, gy = 889;
  let x = K.lerp(x0 + 18, 292, K.ease.out(K.clamp(d / (fall + 0.18)))), y;
  if (d < fall) y = K.lerp(y0 + 4, gy, (d / fall) * (d / fall)); else if (d < fall + 0.18) y = gy - 12 * Math.sin(Math.PI * (d - fall) / 0.18); else y = gy;
  worm(ctx, x, y, d < fall + 0.3 ? t : WORM_REL + fall + 0.3);
}
// small yellow chick feathers drifting down in a see-saw (how "the chicks died" is told)
const FEATHERS = [{ t0: 36.3, t1: 38.0, a: [405, 846], b: [372, 894] }, { t0: 36.7, t1: 38.5, a: [432, 842], b: [462, 894] }, { t0: 41.55, t1: 43.1, a: [345, 470], b: [375, 894] }];
function featherAt(i, t) { const f = FEATHERS[i], u = K.clamp((t - f.t0) / (f.t1 - f.t0)); return [K.lerp(f.a[0], f.b[0], u) + 16 * Math.sin(u * Math.PI * 3) * (1 - u * 0.6), K.lerp(f.a[1], f.b[1], u)]; }
function feathersSeq(ctx, t) {
  FEATHERS.forEach((f, i) => { if (t < f.t0) return; const u = K.clamp((t - f.t0) / (f.t1 - f.t0)), [x, y] = featherAt(i, t);
    ctx.save(); ctx.translate(x, y); ctx.rotate(u < 1 ? 0.7 * Math.cos(u * Math.PI * 3) : 1.35 + i * 0.3); shape(ctx, ell(0, 0, 13, 5, 12), C.yellow, { lw: 3, seed: 4 + i }); seg(ctx, -13, 0, 6, 0, 1, '#e0a800', 1); ctx.restore(); });
}

function larkEye(P) { // world position of the lark's eye for a pose
  const hx = 32, hy = -64 + (P.drop || 0), hr = P.headRot || 0, ox = hx + 6 - (hx - 14), oy = hy - 6 - (hy + 16);
  let x = hx - 14 + ox * Math.cos(hr) - oy * Math.sin(hr), y = hy + 16 + ox * Math.sin(hr) + oy * Math.cos(hr); const sq = P.sq ?? 1;
  x *= 1 + (1 - sq) * 0.7; y *= sq; return [P.x + (P.shake || 0) + x * P.s * P.dir, P.y + y * P.s]; }
function tearsSeq(ctx, t) {
  for (let i = 0; i < 6; i++) { const t0 = 43.95 + i / 3; if (t < t0 || t0 >= 45.4) continue; const d = t - t0, [ex, ey] = larkEye(larkSeq(t0)), gy = 890, T = Math.sqrt(2 * Math.max(10, gy - ey) / 900);
    if (d < T) { const x = ex + 4 + 28 * d, y = ey + 6 + 450 * d * d, g = K.clamp(d / 0.08) * 0.6 + 0.4; ctx.save(); ctx.translate(x, y); ctx.scale(g, g);
      ctx.beginPath(); ctx.moveTo(0, -11); ctx.quadraticCurveTo(6, -3, 6, 2); ctx.arc(0, 2, 6, 0, Math.PI); ctx.quadraticCurveTo(-6, -3, 0, -11); ctx.fillStyle = '#5fa0ff'; ctx.fill(); ctx.lineWidth = 2.5; ctx.strokeStyle = C.black; ctx.stroke();
      ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(-2, 1, 1.8, 0, 7); ctx.fill(); ctx.restore(); }
    else if (d < T + 0.22) { const k = (d - T) / 0.22, x = ex + 4 + 28 * T; ctx.save(); ctx.globalAlpha = 1 - k; ctx.fillStyle = '#5fa0ff'; ctx.strokeStyle = C.black; ctx.lineWidth = 1.5;
      for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(x + sd * (4 + k * 12), gy - 4 - 10 * Math.sin(Math.PI * k), 2.6, 0, 7); ctx.fill(); ctx.stroke(); } ctx.restore(); } }
}
// ---------- frogs: witnesses ----------
function frogSeq(t, i, P) {
  P.gaze = [0.6, 0]; const st = i * 0.12;
  if (t >= 23.6) { P.eyes = 'wide'; P.gaze = [-1, 0]; }
  if (t >= 24.4 + st) P.duck = 62 * sm(t, 24.4 + st, 24.65 + st);                        // duck behind the bank as the feet pass
  if (t >= 26.3 + st * 2) { P.duck = K.lerp(62, 36, sm(t, 26.3 + st * 2, 26.8 + st * 2)); P.gaze = [0.3, -1]; }   // eyes-only peek
  if (t >= STOMP) { P.duck = K.lerp(36, 64, sm(t, STOMP, STOMP + 0.12)); }                 // flinch
  if (t >= 35.6 + st * 3) { P.duck = K.lerp(64, 0, sm(t, 35.6 + st * 3, 37.4 + st * 3)); P.eyes = 'open'; P.gaze = [1, 0.25]; P.lid = 0.3; }
  if (t >= 38.2) { P.duck = 0; P.eyes = 'open'; const L = larkSeq(Math.max(38.2, Math.min(t, SEQ_B - 0.01))), dx = L.x - P.x, dy = L.y - 40 - (P.y - 50), d = Math.hypot(dx, dy) || 1; P.gaze = [dx / d, dy / d]; P.lid = 0.45 * sm(t, 40.9, 41.4); }
  if (i === 0 && t >= 44.0) P.duck = 40 * sm(t, 44.0, 45.4) * (1 - sm(t, 45.8, 46.4));     // one sinks slowly out of sight
  if (t >= 46.0) P.lid = 0.45 * (1 - sm(t, 46.0, 46.45));
  return P;
}

// ---------- world-space effects (drawn after the ground layer) ----------
function puff(ctx, x, y, d, r0) { if (d < 0 || d > 0.6) return; const u = d / 0.6; ctx.save(); ctx.globalAlpha = 1 - u * u; for (const [ox, sz] of [[-1, 0.8], [0, 1], [1, 0.75]]) { const rr = r0 * sz * (0.5 + u * 0.8); ctx.beginPath(); ctx.arc(x + ox * r0 * (0.6 + u), y - rr * 0.6 - u * 10, rr, 0, 7); ctx.fillStyle = '#f2d27a'; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.stroke(); } ctx.restore(); }
const BRNG = (() => { const r = K.rng(77), a = []; for (let i = 0; i < 40; i++) a.push(r()); return a; })();
function dustBurst(ctx, x, y, d, n, rmin, rmax, dist, dur, seed = 0) { if (d < 0 || d > dur) return; const u = d / dur, o = K.ease.out(u);
  ctx.save(); ctx.globalAlpha = 1 - u * u; for (let i = 0; i < n; i++) { const q = BRNG[(i * 3 + seed) % 40], a = Math.PI + 0.12 + (i / (n - 1)) * (Math.PI - 0.24) + (q - 0.5) * 0.3, rr = K.lerp(rmin, rmax, BRNG[(i * 7 + seed + 1) % 40]) * (1 - 0.45 * u), dd = dist * (0.55 + 0.6 * q) * o;
    ctx.beginPath(); ctx.arc(x + Math.cos(a) * dd * 1.35, y + Math.sin(a) * dd * 0.75 - rr * 0.4, rr, 0, 7); ctx.fillStyle = '#f2d27a'; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.stroke(); } ctx.restore(); }
function seqFX(ctx, t) {
  if (t < SEQ_A || t >= 58) { if (t >= 36.3) { feathersSeq(ctx, t); wormSeq(ctx, t); } return; }
  // dust at every footfall: the near pair and the far pair alternate
  for (const f of FOOTFALLS) { const d = t - f.t; if (d < 0 || d > 0.6) continue; const feet = f.odd ? [115, -90] : [80, -50]; feet.forEach((lx, k) => dustBurst(ctx, f.x + lx * 0.8, GR - 4, d, 4, k ? 5 : 7, k ? 9 : 13, k ? 22 : 30, 0.5, Math.round(f.t * 10) + k)); }
  // the stomp: a ring of dust bursts out of the nest
  dustBurst(ctx, NEST[0], GR - 10, t - STOMP, 10, 10, 34, 120, 0.6, 5);
  if (t >= 36.3) feathersSeq(ctx, t);
  wormSeq(ctx, t); tearsSeq(ctx, t);
  // the only two words: HMPH (small, in the sky) and CRUNCH (drawn with the style's emphasis, see overlays)
  if (t >= 30.35 && t < 31.45) sfx(ctx, 'HMPH', 420, 585, 44, K.beat(t, 30.35, 0.2, 'lin'), { rot: 0.08, fill: C.white });
}
// a halftone shadow growing over the nest as the foot rises above it
function seqShadow(ctx, t) {
  if (t < 32.6 || t >= STOMP) return; const u = sm(t, 32.6, 34.2), r = 30 + 80 * u;
  ctx.save(); ctx.globalAlpha = 0.55 * u; const pts = ell(NEST[0] + 10, GR - 14, r, r * 0.42, 28); K.poly(ctx, pts, true); ctx.clip(); ctx.fillStyle = dotPat(ctx, C.black, 7, 0.32); ctx.fillRect(NEST[0] - 130, GR - 70, 260, 120); ctx.restore();
}
function seqOverlay(ctx, t, cam, S) {
  if (t < STOMP || t >= 35.6) return;
  const [cx, cy] = toPanel(NEST[0], GR - 20, cam), [wx, wy] = toPanel(560, 572, cam), r = 130;
  ctx.save(); ctx.globalAlpha = 1 - K.clamp((t - 35.3) / 0.3); S.emphasis(ctx, cx, cy, r, K.beat(t, STOMP, 0.45, 'lin'), { word: 'CRUNCH!', wx: (wx - cx) / r, wy: (cy - wy) / r, ry: 0.5 }); ctx.restore();
}
// camera: holds, and short eased moves on beat boundaries (replaces the original keys between 19.0 and 46.0)
const CAM_SEQ = [[20.2, { x: 370, y: 722, zoom: 1.8 }], [21.6, { x: 385, y: 725, zoom: 1.8 }], [22.6, { x: 420, y: 690, zoom: 1.25 }], [25.8, { x: 410, y: 700, zoom: 1.3 }], [26.8, { x: 395, y: 705, zoom: 1.35 }],
  [27.6, { x: 300, y: 735, zoom: 2.0 }], [31.4, { x: 305, y: 735, zoom: 2.0 }], [32.4, { x: 400, y: 735, zoom: 2.2 }], [35.1, { x: 400, y: 737, zoom: 2.2 }], [37.0, { x: 410, y: 765, zoom: 2.8 }], [38.0, { x: 410, y: 765, zoom: 2.8 }],
  [38.8, { x: 330, y: 735, zoom: 2.0 }], [40.2, { x: 335, y: 740, zoom: 2.0 }], [40.9, { x: 290, y: 762, zoom: 2.6 }], [43.9, { x: 285, y: 765, zoom: 2.8 }], [45.6, { x: 285, y: 765, zoom: 2.8 }], [46.5, { x: 474, y: 720, zoom: 1.7 }]];
