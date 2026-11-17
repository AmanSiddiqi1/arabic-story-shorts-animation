// ===== AN-124 Al-Mutalammis and His Wife Umaymah: rig and time helpers (prefix mt / MT_) =====
// Film = MP3 171.61 s + end hold 4.49 s = 176.1 s (plan duration + end_hold).
const MT_DUR = 176.1;
const MT_SH = -132;                                   // person shoulder y (body-local)
const mtIn = (t, a, b) => t >= a && t < b;
const mtB = (t, a, d, e = 'inOut') => K.ease[e](K.clamp((t - a) / d));
const mtFade = (t, a, b, f = 0.2) => K.clamp(Math.min((t - a) / f, (b - t) / f));
const mtPop = (t, a, d = 0.3) => (t < a ? 0 : K.ease.back(K.clamp((t - a) / d)));
const mtPulse = (t, a, d) => (t > a && t < a + d ? Math.sin(Math.PI * (t - a) / d) : 0);
// keyed track: [[t0, value], [t1, value, dur], ...]; numbers or arrays; each key eases from the current value over dur
function mtTr(t, keys, d0 = 0.3) {
  let cur = keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const [t0, v, d] = keys[i]; if (t < t0) break;
    const u = K.ease.inOut(K.clamp((t - t0) / (d ?? d0)));
    cur = Array.isArray(cur) ? cur.map((c, j) => K.lerp(c, v[j], u)) : K.lerp(cur, v, u);
  }
  return cur;
}
function mtStep(t, keys) { let v = keys[0][1]; for (const [t0, x] of keys) if (t >= t0) v = x; return v; }

// ---------- the Library person: body-local <-> world ----------
const mtAge = (P) => (P.child ? 0 : P.age ?? (COSTUME[P.costume] || {}).age ?? 0.3);
const mtS = (P) => (P.s || 1) * (P.child ? 0.62 : 1);
function mtOff(P) {   // upper-body offset of the blended hips (as personPose), body-local
  const sit = K.clamp(P.sit || 0), kn = K.clamp(P.kneel || 0); let hc = [0, -75];
  if (sit > 0) { const S = P.seat === 'floor' ? [0, -24] : [-22, -52]; hc = [K.lerp(0, S[0], sit), K.lerp(-75, S[1], sit)]; }
  if (kn > 0) hc = [K.lerp(hc[0], -4, kn), K.lerp(hc[1], -48, kn)];
  return [hc[0], hc[1] + 75];
}
function mtW(P, l) {     // body-local -> world (lean, sitting offset, scale, mirror, tip, sq)
  const s = mtS(P), dir = P.dir || 1, off = mtOff(P), lean = (P.lean || 0) + mtAge(P) * 0.12; let [lx, ly] = l;
  if (lean) { const c = Math.cos(lean), n = Math.sin(lean), y0 = ly + 75; [lx, ly] = [lx * c - y0 * n, lx * n + y0 * c - 75]; }
  lx += off[0]; ly += off[1]; let wx = P.x + lx * s * dir, wy = P.y + ly * s;
  const sq = P.sq ?? 1, tip = P.tip || 0;
  if (sq !== 1) { wx = P.x + (wx - P.x) * (1 + (1 - sq) * 0.7); wy = P.y + (wy - P.y) * sq; }
  if (tip) { const a = tip * Math.sign(dir), dx = wx - P.x, dy = wy - P.y; wx = P.x + dx * Math.cos(a) - dy * Math.sin(a); wy = P.y + dx * Math.sin(a) + dy * Math.cos(a); }
  return [wx, wy];
}
const mtHeadL = (P) => [(P.look || 0) * 4, -195 + (P.drop || 0) + mtAge(P) * 6 - (P.child ? 9 : 0)];
const mtHead = (P) => mtW(P, mtHeadL(P));
const mtHeadR = (P) => 37 * mtS(P) * (P.child ? 1.25 : 1);          // head radius in world units
const mtMouth = (P) => mtW(P, [mtHeadL(P)[0], mtHeadL(P)[1] + 26 * (P.child ? 1.25 : 1)]);
// a world hand point for a body-local target (used to place held props)
const mtHand = (P, side) => { const v = side === 'L' ? P.handL : P.handR, w = side === 'L' ? P.handLW : P.handRW; return w || mtW(P, v || [side === 'L' ? -36 : 36, -62]); };
// gaze from P's head toward a world point
const mtLook = (P, pt) => lookAt(mtHead(P), pt);
function mtLookPlan(t, P, plan, ease = 0.18) { return lookAt(mtHead(P), gazePlan(t, plan, ease)); }
// walk from an x function: leg phase from distance, amplitude from speed
function mtWalk(xf, t, stride = 14) { const h = 0.05, x = xf(t), v = Math.abs(xf(t + h) - xf(t - h)) / (2 * h); return { x, ph: x / stride, amp: K.clamp(v / 60) }; }
function mtFalls(xf, t0, t1, stride = 14) { const out = []; let last = Math.floor(xf(t0) / stride / Math.PI); for (let t = t0; t < t1; t += 1 / 120) { const k = Math.floor(xf(t) / stride / Math.PI); if (k !== last) { out.push({ t, x: xf(t) }); last = k; } } return out; }
const mtMir = (v) => [-v[0], v[1]];
// hand targets (right side, body-local; mtMir for the left)
const MTH = { rest: [36, -62], lap: [20, -86], chest: [6, -122], heart: [10, -124], chin: [16, -160], mouth: [8, -168], brow: [22, -205], cheek: [30, -182],
  fwd: [100, -150], palm: [64, -104], offer: [92, -132], out: [96, -146], wave: [64, -200], ear: [42, -200], cupEar: [44, -196], sash: [26, -84], clasp: [8, -112] };
// drum grid: one onset every 0.4 s from 62.52 (stops by 107.3), again from 163.3 to the end
const MT_DRUM = (() => { const a = []; for (let x = 62.52; x <= 107.3; x += 0.4) a.push(+x.toFixed(2)); for (let x = 163.32; x <= 176.1; x += 0.4) a.push(+x.toFixed(2)); return a; })();
function mtBeat(t, off = 0) { let last = null; for (const h of MT_DRUM) { if (h + off <= t) last = h + off; else break; } return last == null ? 99 : t - last; }   // seconds since the last hit
const mtPlaying = (t) => (t >= 62.3 && t < 107.6) || t >= 163.1;
function mtLoc(P, w) {   // world point -> body-local (ignores tip/sq)
  const s = mtS(P), dir = P.dir || 1, off = mtOff(P), lean = (P.lean || 0) + mtAge(P) * 0.12; let lx = (w[0] - P.x) / (s * dir) - off[0], ly = (w[1] - P.y) / s - off[1];
  if (lean) { const c = Math.cos(-lean), n = Math.sin(-lean), y0 = ly + 75; [lx, ly] = [lx * c - y0 * n, lx * n + y0 * c - 75]; }
  return [lx, ly];
}
const mtKX = (keys, d) => (tt) => mtTr(tt, keys, d);          // a keyed x track as a function (for walks)
const mtLid = (t, base, seed) => Math.max(base, blink(t, seed));
// stand <-> sit with a dip before rising and a settle when landing
const mtSit = (t, keys) => mtTr(t, keys, 0.5);
