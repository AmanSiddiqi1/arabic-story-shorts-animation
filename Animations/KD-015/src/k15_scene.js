// ===== KD-015 The Ascetic, the Ghee, and the Honey: the hut, the ascetic, the jar, the dream cloud, camera, lettering, sound =====
// World 1000 x 1230, floor y 900 (Library hutRoom). Every frame is a pure function of t. Story constants are prefixed K15 / k15.
const K15W = 1000, K15H = 1230, K15GR = 900, K15DUR = 171.14;   // narration 168.144 + 3.0 s THE END hold
const K15S = 1.35, K15SEATX = 350, K15HOOK = [362, 279];
const K15HUT = { mat: [200, 480], doorY: 540, peg: false };

// ---------- person geometry (mirrors cast/people.js for the seated / kneeling ascetic, age 0.75) ----------
function k15off(P) { const sit = P.sit || 0, kn = P.kneel || 0; return [K.lerp(0, -4, kn), K.lerp(K.lerp(-75, -24, sit), -48, kn) + 75]; }
function k15L2W(P, q) {   // upper-body local point -> world (before the acting sq / tip transform)
  const s = P.s, off = k15off(P), le = (P.lean || 0) + (P.age ?? 0.75) * 0.12, c = Math.cos(le), n = Math.sin(le), y0 = q[1] + 75;
  return [P.x + s * (q[0] * c - y0 * n + off[0]), P.y + s * (q[0] * n + y0 * c - 75 + off[1])];
}
function k15W2L(P, w) { const s = P.s, off = k15off(P), le = (P.lean || 0) + (P.age ?? 0.75) * 0.12, c = Math.cos(le), n = Math.sin(le), dx = (w[0] - P.x) / s - off[0], dy = (w[1] - P.y) / s + 75 - off[1]; return [dx * c + dy * n, -dx * n + dy * c - 75]; }
function k15clampL(sd, q, f = 0.97) { const sx = sd * 31, sy = -132, dx = q[0] - sx, dy = q[1] - sy, d = Math.hypot(dx, dy), m = 73.5 * f; return d <= m ? q : [sx + dx / d * m, sy + dy / d * m]; }
function k15clampW(P, sd, w, f = 0.97) { const sh = k15L2W(P, [sd * 31, -132]), dx = w[0] - sh[0], dy = w[1] - sh[1], d = Math.hypot(dx, dy), m = 73.5 * f * P.s; return d <= m ? w : [sh[0] + dx / d * m, sh[1] + dy / d * m]; }
function k15head(P) { return k15L2W(P, [(P.look || 0) * 4, -190.5 + (P.drop || 0)]); }
function k15act(ctx, P, fn) {   // run fn inside the same squash / tip transform that acting() gives the figure
  const sq = P.sq ?? 1, tip = P.tip || 0; ctx.save();
  if (sq !== 1 || tip) { ctx.translate(P.x, P.y); if (tip) ctx.rotate(tip); if (sq !== 1) ctx.scale(1 + (1 - sq) * 0.7, sq); ctx.translate(-P.x, -P.y); }
  fn(); ctx.restore();
}
const k15kv = (t, keys, e = 'inOut') => { if (t <= keys[0][0]) return keys[0][1]; for (let i = 1; i < keys.length; i++) if (t <= keys[i][0]) { const [t0, a] = keys[i - 1], [t1, b] = keys[i]; return k15lp(a, b, K.ease[e](K.clamp((t - t0) / (t1 - t0)))); } return keys[keys.length - 1][1]; };
const k15tap = (t, list, d = 0.22) => { let v = 0; for (const a of list) if (t >= a && t < a + d) v = Math.max(v, Math.sin(Math.PI * (t - a) / d)); return v; };

// ---------- the jar ----------
function k15jar(t) {
  const o = { hx: K15HOOK[0], hy: K15HOOK[1], fill: 0, glint: 0, crack: 0, ooze: 0, drip: 0, jump: 0 };
  if (t < 20.75) {   // S1: lowered for filling, then the days fill it
    o.L = 400 + 6 * (1 - landSquash(t, 12.9, 1, 6)) * (t > 12.9 ? 1 : 0) + 10 * k15e(t, 17.1, 1.1) + 7 * pulse(t, 11.45, 0.45) + 7 * pulse(t, 12.2, 0.45);   // v2: lower for the pour; dips on each pour
    const heavy = k15e(t, 17.1, 1.1); o.ang = (0.035 - 0.017 * heavy) * Math.sin(t * (1.7 - 0.5 * heavy)) + swing(t, 12.9, 0.05, 1.1, 1.6) + swing(t, 11.5, 0.035, 1.3, 2) + swing(t, 12.25, 0.035, 1.3, 2) - 0.06 * pulse(t, 3.6, 1.4);
    o.fill = t < 12.9 ? 0.05 * k15e(t, 11.5, 0.3) + 0.05 * k15e(t, 12.25, 0.3) : t < 15.84 ? 0.1 : t < 17.12 ? 0.1 + 0.25 * Math.floor((t - 15.84) / 0.32) / 4 : Math.min(0.9, 0.35 + 0.55 * Math.floor((t - 17.12) / 0.15) / 7);
    o.drip = k15e(t, 19.0, 0.8, 'out') * 0.55;
    o.glint = pulse(t, 18.9, 0.5);
    return o;
  }
  o.L = 161; o.fill = 0.9; o.ang = 0.02 * Math.sin(t * 1.15) + swing(t, 123.95, -0.11, 1.0, 0.9) - 0.05 * pulse(t, 128.45, 0.7) + 0.03 * Math.sin(t * 4) * pulse(t, 128.0, 1.2);
  o.glint = pulse(t, 31.4, 0.45) + pulse(t, 31.95, 0.45); o.glintCol = t < 31.9 ? C.white : C.yellow;
  o.pulse = 0.5 * (pulse(t, 31.54, 0.5) + pulse(t, 32.1, 0.5)); o.pulseCol = t < 32.0 ? K15GHEE : K15HONEY;
  // drips: one beads at 24.1 and falls at 60.46; another beads slowly after; the crack drip from 137
  o.drip = t < 60.46 ? k15e(t, 24.1, 1.1, 'out') * 0.62 + 0.15 * k15e(t, 41, 19) : 0.6 * k15e(t, 66, 30);
  if (t >= 128.5) o.drip = Math.max(o.drip, 0.75 * k15e(t, 128.5, 0.6));
  o.halo = t >= 41.65 && t < 139.44;
  if (t >= 135.56) { o.jump = 10 * Math.max(0, Math.sin(Math.PI * K.clamp((t - 135.56) / 0.22))); o.crack = t < 136.4 ? 0.3 : 0.3 + 0.7 * Math.min(1, Math.floor((t - 136.4) / 0.5 + 1) / 3); o.ooze = k15e(t, 137.4, 1.8); o.ang = -0.06 * Math.exp(-(t - 135.56) * 3) * Math.cos((t - 135.56) * 9) + 0.01 * Math.sin(t * 1.15); }
  if (t >= 139.44) { o.broken = true; const d = t - 139.44; o.ang = swing(t, 139.44, 0.5, 1.05, 0.22) + 0.06 * Math.sin(d * 2.2) * Math.exp(-d * 0.04) * K.clamp(d / 3);
    o.goo = t < 141.3 ? 0.4 : t < 143.62 ? 0.4 + 0.6 * k15e(t, 141.3, 2.3) : 0.2 * k15e(t, 165.9, 1.0); }
  return o;
}
const k15jarCentre = (J) => k15JarPoint(J, 0, 80);

// ---------- the stick (world): butt..tip through the grip; angle 0 points right ----------
const K15STICKL = 210, K15STICKG = 0.24;
const K15BOYD = (t) => (t < 126.5 || t >= 139.44 ? 0 : settleTo(t, 126.5, 0, 1, 0.6, 0.1));   // v2: the dream father and son sink to the man's arm height for the swing
const K15CROSS = 130.24;
const K15TOP = [40, -196], K15TOPA = -1.47, K15END = [80, -215], K15ENDA = -0.4, K15SWD = 0.36, K15HIT = 130.1;   // v2 raise / swing poses (local grip, stick angle)
function k15stick(t, P) {
  // returns {grip: [x, y] world (pre-acting), a, two (left hand on it too)} or a floor pose {floor: true, x0, x1}
  if (t < 116.9) return { floor: true, x0: 470, y: 892, a: 0 };
  const kn = P.kneel || 0, L = (q) => k15L2W(P, q);
  let g, a, two = false;
  if (t < 117.4) { g = [482, 888 - 20 * k15e(t, 117.4, 0.4)]; a = 0; }
  else if (t < 118.5) { g = k15lp([482, 868], L([46, -118]), k15e(t, 117.4, 1.0)); a = K.lerp(0, -0.7, k15e(t, 117.4, 1.0)); }
  else if (t < 123.3) { g = L([46, -122]); a = -0.75 + 0.04 * Math.sin(t * 13) * k15c((t - 119.3) * 3) * (t < 121.4 ? 1 : 0.4); }
  else if (t < 124.5) { const u = (t - 123.3) / 1.2, sh = Math.sin(u * Math.PI * 2 * 2 - 0.3); g = L([46 + 8 * sh, -126 - 6 * sh]); a = -0.75 - (sh > 0 ? 1.4 : 0.35) * sh * (u > 0.5 ? 1 : 0.55); }
  else if (t < 125.68) { g = L(k15lp([46, -126], [70, -138], k15e(t, 124.5, 0.4, 'out'))); a = K.lerp(-0.75, -0.42, k15e(t, 124.5, 0.4, 'out')); }
  else if (t < 127.08) { g = L([70 + tremble(t, 1.2, 7), -138 + tremble(t, 1.0, 5.3)]); a = -0.42 + 0.02 * Math.sin(t * 23); }   // v2: hold the thrust, breathing hard
  else if (t < 130.1) { const u = k15e(t, 127.08, 1.36); g = L(k15lp([70, -138], K15TOP, u)); a = K.lerp(-0.42, K15TOPA, u) + (t > 128.0 ? 0.014 * Math.sin(t * 40) : 0) + 0.05 * pulse(t, 129.85, 0.25); }   // v2: raise on "rafa'a"; anticipate dip before the swing
  else if (t < 133.04) { const u = K.clamp((t - 130.1) / K15SWD); const e = u * u * (3 - 2 * u) * 0.5 + u * 0.5; g = L(k15lp(K15TOP, K15END, e)); a = K.lerp(K15TOPA, K15ENDA, e) - (t > 130.1 + K15SWD ? 0.08 * Math.exp(-(t - 130.1 - K15SWD) * 6) * Math.cos((t - 130.1 - K15SWD) * 20) : 0); }   // v2: the swing on "wa-daraba", through the boy
  else if (t < 133.8) { const u = k15e(t, 133.04, 0.7); g = L(k15lp(K15END, [40, -104], u)); a = K.lerp(K15ENDA, 0.55, u); two = u > 0.3; }
  else if (t < 135.56) { const u = K.ease.in(K.clamp((t - 133.8) / 1.76)); g = L(k15lp([40, -104], [24, -150], u)); a = K.lerp(0.55, -1.42, u); two = true; }
  else if (t < 144.9) { g = L([24 + (t > 139.44 ? 4 : 0), -150 + (t > 139.44 && t < 140.4 ? 8 : 0)]); a = -1.42 + 0.01 * Math.sin(t * 30) * (t < 139.44 ? 1 : 0) + (t > 139.44 ? 0.1 * k15e(t, 139.44, 0.3) : 0); two = true; }
  else if (t < 147.6) { const u = k15e(t, 144.9, 2.6, 'lin'); const st = Math.floor(u * 5) / 5 + K.ease.inOut((u * 5) % 1) / 5; g = L(k15lp([28, -150], [44, -74], st)); a = K.lerp(-1.32, 0.08, st); two = u < 0.4; }
  else if (t < 157.3) { g = L([44, -74]); a = 0.08; }
  else if (t < 159.4) { const u = k15e(t, 157.3, 0.9); g = L(k15lp([44, -74], [46, -128], u)); a = K.lerp(0.08, -0.75, u); }
  else { const d = t - 159.4; if (d < 0.08) { g = L([46, -128]); a = -0.75; } else { const u = K.clamp((d - 0.08) / 0.3); return { floor: true, x0: K.lerp(470, 476, u), y: 892, a: 0, fall: u < 1 ? { g: k15lp(L([46, -128]), [520, 880], u * u), a: K.lerp(-0.75, 0.05, u * u) } : null }; } }
  return { grip: g, a, two };
}
function k15stickPts(S) { const c = Math.cos(S.a), s = Math.sin(S.a), b = [S.grip[0] - c * K15STICKL * K15STICKG, S.grip[1] - s * K15STICKL * K15STICKG], tp = [S.grip[0] + c * K15STICKL * (1 - K15STICKG), S.grip[1] + s * K15STICKL * (1 - K15STICKG)]; return [b, tp]; }
function k15drawStick(ctx, b, tp) { seg(ctx, b[0], b[1], tp[0], tp[1], 11, '#a8741a', 4); for (const f of [0.3, 0.62]) { const q = k15lp(b, tp, f); shape(ctx, ell(q[0], q[1], 6, 5, 8), '#7a4212', { lw: 2 }); } }

// ---------- the ascetic ----------
const K15WALK1 = (t) => kfn(t, [[0.5, -150], [2.3, 30], [3.3, 30], [5.4, 495]]);
const K15WALK2 = (t) => kfn(t, [[14.55, 495], [15.35, 232]]);
const K15WALK3 = (t) => kfn(t, [[21.6, 470], [22.35, K15SEATX]]);
function k15asc(t) {
  const P = { s: K15S, y: K15GR, costume: 'ascetic', seat: 'floor', sit: 0, kneel: 0, mouth: 'closed', brow: 0, drop: 0, lean: 0, look: 0, sq: 1, tip: 0 };
  let tgt = null;   // gaze target (world)
  let lidX = 0, noBlink = false;
  const H = (q) => q;   // local hand target
  // --- S1 ---
  if (t < 14.55) {
    Object.assign(P, walk(K15WALK1, t, { stride: 35, amp: 90 })); P.handL = [-34, -112]; P.handR = [34, -112];
    tgt = t < 3.3 ? [200, 700] : [P.x, 800];
    if (k15in(t, 2.3, 3.3)) { tgt = [125, 700]; }
    if (t >= 5.4) {
      P.x = 495; P.amp = 0;
      if (t < 8.4) { tgt = k15L2W(P, [0, -110]); P.mouth = 'smile'; if (k15in(t, 6.0, 7.0)) { P.brow = -0.4 * pulse(t, 6.0, 1.0) * 2; P.drop = -4 * pulse(t, 6.0, 0.7); P.mouth = 'closed'; } }
      P.handL = [-34, -112 - 8 * k15tap([t], [7.06], 0.4) * 0 - 10 * pulse(t, 7.06, 0.45)]; P.handR = [34, -112 - 10 * pulse(t, 7.64, 0.45)];
      if (t >= 8.4 && t < 11.0) {   // both bowls in the left palm; the right hand dips, eats, pats the stomach once, takes its bowl back
        P.handL = [-18, -112]; P.handR = k15kv(t, [[8.4, [34, -112]], [8.6, [2, -116]], [8.9, [4, -122]], [9.2, [14, -168]], [9.5, [14, -168]], [9.75, [10, -108]], [9.84, [12, -96]], [10.0, [12, -104]], [10.4, [30, -100]], [10.8, [16, -114]]]);
        tgt = t < 9.2 ? k15L2W(P, [-10, -115]) : [P.x, 500]; if (k15in(t, 9.25, 10.2)) { lidX = 0.8; P.talk = 0.25 + 0.2 * Math.sin(t * 18); P.mouth = 'smile'; }
        if (k15in(t, 10.2, 11)) P.mouth = 'smile';
      }
      if (t >= 11.0) {   // the pour: dip, tiptoe, left pours ghee, the bowls swap, left pours honey
        P.sq = anticipate(t, 11.0, 0.22, 0.05) * (t > 11.22 && t < 12.75 ? 1.04 : 1); P.y = K15GR - 12 * (k15e(t, 11.2, 0.2) - k15e(t, 12.6, 0.25));
        const JM = k15W2L(P, k15lp(k15JarPoint(k15jar(t), 0, 0), [0, 0], 0).map((v, i) => v + (i ? -34 : 20)));   // v2: the near hand over the jar mouth
        P.handL = k15clampL(-1, k15kv(t, [[11.0, [-18, -112]], [11.3, JM], [11.82, JM], [11.95, [-10, -128]], [12.0, [-10, -128]], [12.13, JM], [12.62, JM], [12.9, [-34, -112]]]));
        P.handR = k15kv(t, [[11.0, [16, -114]], [11.3, [34, -112]], [11.82, [34, -112]], [11.95, [6, -128]], [12.0, [6, -128]], [12.13, [34, -112]]]);
        tgt = [K15HOOK[0], 640]; if (k15in(t, 11.3, 12.7)) P.mouth = 'o';
        if (t >= 12.9) { const J = k15jar(t); tgt = k15jarCentre(J); P.mouth = 'smile'; P.handL = [-34, -112]; P.handR = [34, -112]; }
      }
    }
  } else if (t < 20.75) {   // back to the mat, sits; the days fly; looks up at the full jar
    Object.assign(P, walk(K15WALK2, t, { stride: 35, amp: 90 })); P.sit = k15e(t, 15.2, 0.55); P.sq = t > 15.75 ? settleTo(t, 15.75, 0.95, 1, 0.4) : 1;
    const lay = k15e(t, 15.35, 0.3); P.handL = k15lp([-34, -112], [-62, -40], lay); P.handR = k15lp([34, -112], [62, -40], lay);
    if (t > 15.65) { P.handL = k15lp([-62, -40], [-44, -80], k15e(t, 15.65, 0.3)); P.handR = k15lp([62, -40], [44, -80], k15e(t, 15.65, 0.3)); }
    tgt = t < 15.2 ? [P.x - 100, 800] : t < 17.1 ? [760, 470] : k15jarCentre(k15jar(t));
    if (k15in(t, 15.84, 17.12)) { const u = ((t - 15.84) / 0.32) % 1; P.handR = [44, -80 - 70 * Math.sin(Math.PI * u)]; }
    if (t >= 18.3) { P.mouth = 'smile'; P.drop = 7 * pulse(t, 19.3, 0.5); lidX = 0.2; }
    P.lean = 0;
  } else if (t < 22.4) {   // S2 opens: he steps under the jar, ducking a little, and sits
    Object.assign(P, walk(K15WALK3, t, { stride: 35, amp: 90 })); P.drop = 22 * k15e(t, 21.7, 0.3) * (1 - k15e(t, 22.25, 0.2)); P.handL = [-34, -100]; P.handR = [34, -100]; tgt = [K15SEATX, 880]; P.mouth = 'closed';
  } else {
    P.x = K15SEATX; P.sit = 1;
    if (t < 23.6) { P.sit = k15e(t, 22.4, 0.7); P.sq = t < 23.1 ? 1 : settleTo(t, 23.1, 0.94, 1, 0.5); }
    P.handL = [-44, -80]; P.handR = [44, -80]; tgt = [520, 860]; lidX = 0.4;
    if (t >= 23.6 && t < 27.89) { lidX = 0.4; tgt = [600, 840]; P.mouth = 'smile'; }
    if (t >= 27.89 && t < 32.9) { tgt = [K15HOOK[0] + 4, 470]; P.brow = -0.6 * k15e(t, 28.13, 0.4); P.tilt = -0.06 * k15e(t, 28.13, 0.5); P.drop = -7 * k15e(t, 28.13, 0.4); P.mouth = 'smile'; lidX = 0;   // v2: looks up, then points at the jar
      if (k15in(t, 29.16, 32.96)) { P.talk = talk(t, [[29.16, 29.84], [30.43, 31.5], [31.54, 32.9]]); P.mouth = 'open'; }
      if (t >= 30.2) { const b = 10 * (k15tap(t, [31.54], 0.3) + k15tap(t, [32.1], 0.3)); P.handR = k15kv(t, [[30.2, [44, -80]], [30.6, [PERSON_HANDS.pointUp.R[0], PERSON_HANDS.pointUp.R[1]]]]).map((v, i) => v - (i ? b : 0)); P.handL = k15kv(t, [[30.2, [-44, -80]], [30.6, [-6, -120]]]); }
      if (k15in(t, 32.3, 32.9)) P.mouth = 'o'; }
    if (t >= 32.9 && t < 41.65) {   // the first dream: eyes drift up right; hands rub; counts on the fingers
      tgt = gazePlan(t, [[32.9, [K15HOOK[0], 470]], [33.6, [640, 420]], [34.4, [700, 440]], [35.1, [700, 470]], [37.7, [700, 480]], [38.3, [620, 330]], [39.44, [700, 470]]], 0.12);
      lidX = 0.35; P.mouth = t > 36.4 ? 'smile' : 'closed'; P.brow = -0.35 - 0.3 * (pulse(t, 35.2, 0.25) + pulse(t, 35.6, 0.25) + pulse(t, 36.0, 0.25));
      P.talk = talk(t, [[33.41, 37.6]]) * 0.7;
      if (k15in(t, 35.1, 36.4)) { const r = Math.sin(t * 16); P.handL = [-8 + r * 4, -112]; P.handR = [10 - r * 4, -108]; }
      if (t >= 37.7) { P.handL = [-24, -128]; const taps = [38.3, 38.84, 39.44]; const k = taps.filter((x) => t >= x).length; P.handR = [-14 + k * 5, -134 - 16 * (1 - k15tap(t, taps, 0.25))]; P.drop = 5 * k15tap(t, taps.map((x) => x - 0.1), 0.25); P.mouth = 'o'; P.talk = talk(t, [[38.28, 41.3]]) * 0.4; }
      if (t >= 40.5) { lidX = 1; P.mouth = 'smile'; P.handL = [-44, -80]; P.handR = [44, -80]; P.talk = 0; P.sq = 1 - 0.02 * pulse(t, 40.6, 0.7); }
    }
    if (t >= 41.65 && t < 62.4) {   // S3: chin, paying, goats, counting, arms wide, smiling with closed eyes
      lidX = 0.3; P.mouth = 'smile';
      tgt = gazePlan(t, [[41.65, [700, 460]], [43.8, [620, 520]], [45.3, [860, 520]], [46.5, [520, 500]], [46.8, [640, 500]], [47.1, [760, 500]], [47.4, [640, 270]], [49.3, [560, 520]], [51.4, [500, 500]], [51.9, [700, 480]], [52.4, [880, 480]], [53.1, [900, 500]], [55.2, [600, 380]], [55.9, [640, 520]], [56.8, [500, 560]], [57.6, [900, 560]]], 0.12);
      if (t < 43.7) { P.handR = [16, -160]; P.drop = 4 * Math.sin(t * 2.6); P.talk = talk(t, [[42.5, 43.7]]) * 0.25; }
      else if (t < 46.6) { P.handL = [-24, -128]; const taps = [44.3, 44.75, 45.2, 45.65, 46.1]; const k = taps.filter((x) => t >= x).length; P.handR = [-14 + k * 5, -134 - 16 * (1 - k15tap(t, taps, 0.25))]; P.drop = 4 * k15tap(t, taps.map((x) => x - 0.1), 0.25); P.talk = talk(t, [[44.16, 46.5]]) * 0.3; tgt = [P.x - 10, 740]; }   // v2: counts on his fingers
      if (k15in(t, 47.3, 49.2)) { P.tilt = 0.12 * k15e(t, 47.3, 0.5) * (1 - k15e(t, 48.9, 0.3)); }
      if (k15in(t, 51.4, 53.0)) { P.handR = [40 + 30 * Math.sin((t - 51.4) * 9), -170]; P.talk = talk(t, [[51.64, 52.96]]) * 0.4; P.drop = 8 * (pulse(t, 51.64, 0.35) + pulse(t, 52.22, 0.35)); }   // v2: a nod per counter step
      if (k15in(t, 47.25, 48.15) || k15in(t, 53.0, 53.45)) { lidX = 1; P.tip = 0.035 * Math.sin((t - 47) * 3.2); P.sq = breathe(t, 3, 0.02); }   // v2: eyes closed, rocking between lines
      if (k15in(t, 57.58, 58.9)) { const u = k15e(t, 57.58, 0.35) * (1 - k15e(t, 58.6, 0.3)); P.handL = k15clampL(-1, k15lp([-44, -80], [-100, -150], u)); P.handR = k15clampL(1, k15lp([44, -80], [100, -150], u)); P.mouth = 'open'; P.brow = -0.5 * u; }
      if (t >= 58.9) { lidX = 1; P.handL = [24, -140]; P.handR = [30, -134]; P.tip = 0.04 * Math.sin((t - 58.9) * 3.2); P.mouth = 'smile'; P.look = 0.2 * Math.sin((t - 58.9) * 3.2); }
      if (t >= 60.5 && t < 61.4) { P.brow = 0.3 * pulse(t, 60.6, 0.5); }
    }
    if (t >= 62.4 && t < 84.15) {   // S4: one eye opens, a finger goes up; sowing, harvest, house, rich
      lidX = 0.3; P.mouth = 'smile';
      tgt = gazePlan(t, [[62.4, [640, 400]], [63.6, [640, 420]], [64.0, [500, 520]], [65.2, [690, 520]], [65.4, [560, 520]], [67.8, [560, 540]], [70.2, [870, 520]], [71.0, [720, 500]], [72.7, [720, 300]], [73.7, [720, 480]], [76.6, [880, 490]], [78.0, [690, 480]], [80.0, [620, 380]], [82.0, [560, 260]]], 0.18);
      if (t < 64.0) { if (t > 62.9) { P.wink = 'L'; lidX = 0; } P.brow = -0.4; P.handR = k15kv(t, [[62.9, [44, -80]], [63.3, [30, -205]], [64.0, [30, -205]]]); if (t > 63.5) P.wink = null; }
      else { P.talk = talk(t, [[64.63, 67.74], [68.24, 71.0], [71.56, 79.7]]) * 0.35; }
      if (k15in(t, 67.75, 68.2) || k15in(t, 71.0, 71.5)) { lidX = 1; P.tip = 0.035 * Math.sin((t - 67) * 3.2); P.sq = breathe(t, 3, 0.02); }   // v2: eyes closed, rocking between lines
      if (k15in(t, 69.3, 70.4)) { const pats = [69.5, 69.95]; P.handR = [10, -100 + 12 * k15tap(t, pats, 0.28)]; P.handL = [-12, -98]; }   // v2: two stomach pats on "ta'am"
      if (k15in(t, 71.0, 73.7)) { P.tip = 0.06 * k15e(t, 71.0, 0.5) * (1 - k15e(t, 73.4, 0.3)); P.mouth = t > 71.5 ? 'o' : 'smile'; P.drop = -10 * k15e(t, 72.7, 0.4) * (1 - k15e(t, 73.5, 0.3)); }
      if (k15in(t, 74.58, 75.5)) { P.handR = [16 + 4 * Math.sin((t - 74.58) * 12), -160 + 8 * Math.sin((t - 74.58) * 6)]; lidX = 0.4; P.brow = -0.3; }   // v2: strokes his chin on "athathan"
      if (t >= 79.28 && t < 80.6) { const u = k15e(t, 79.28, 0.3); P.handL = k15lp([-44, -80], PERSON_HANDS.hipsHands.L, u); P.handR = k15lp([44, -80], PERSON_HANDS.hipsHands.R, u); P.drop = -9 * u; P.sq = 1 + 0.05 * u; lidX = 0.5; P.brow = -0.3; }   // v2: chest out with the dream self
      if (t >= 80.6) { lidX = 0.15; P.mouth = 'o'; P.drop = -8; }
    }
    if (t >= 84.15 && t < 104.58) {   // S5: sits up for more; wife and son; teaching finger; the palace; a proud tear
      lidX = 0.25; P.mouth = 'smile';
      tgt = gazePlan(t, [[84.15, [560, 260]], [85.14, [560, 140]], [86.0, [400, 380]], [87.8, [600, 470]], [89.6, [620, 470]], [91.1, [650, 480]], [91.9, [600, 520]], [95.8, [760, 470]], [97.0, [760, 440]], [99.2, [700, 500]], [100.3, [800, 480]], [101.6, [870, 400]], [102.9, [740, 470]]], 0.18);
      if (t < 85.9) { P.sq = 1 - 0.03 * k15e(t, 84.3, 0.4) + 0.05 * k15e(t, 85.14, 0.3) * (1 - k15e(t, 85.6, 0.3)); lidX = t > 85.14 ? 0 : 0.5; if (t > 85.14) { P.brow = -0.6; P.mouth = 'open'; } }
      if (k15in(t, 87.8, 89.5)) { lidX = 1; P.tilt = 0.1 * k15e(t, 87.8, 0.5); P.handL = [24, -140]; P.handR = [30, -134]; P.look = 0.15 * Math.sin((t - 87.8) * 2.5); }
      if (k15in(t, 94.3, 99.2)) { P.handR = [34 + 10 * Math.sin(t * 12) * (t < 95.8 ? 1 : 0.3), -200]; P.brow = -0.4; P.drop = -6; P.talk = talk(t, [[94.75, 98.87]]) * 0.5; P.mouth = 'closed'; }
      if (k15in(t, 99.2, 104.58)) P.talk = talk(t, [[99.16, 104.58]]) * 0.35;
      if (t >= 103.4) { P.wet = true; P.handR = k15kv(t, [[103.4, [44, -80]], [103.75, [20, -190]], [104.2, [26, -186]], [104.58, [20, -120]]]); P.handL = [-6, -124]; P.y = K15GR + 0.8 * Math.sin(t * 40) * (t < 104.5 ? 1 : 0); }
    }
    if (t >= 104.58 && t < 125.68) {   // S6: the turn, anger, the blind grope, kneel, shout, shakes
      lidX = 0.2; P.mouth = 'closed';
      const boy = [560, 470];
      tgt = gazePlan(t, [[104.58, [740, 450]], [105.6, [600, 470]], [106.3, boy], [108.2, [650, 450]], [109.2, boy]], 0.2);
      if (t < 111.1) { P.brow = 0.25 * k15e(t, 105.9, 0.6) + 0.5 * k15e(t, 109.2, 0.6); P.mouth = t > 106.3 ? 'closed' : 'smile'; }
      if (t >= 111.1) { const fl = k15e(t, 111.1, 1.0); P.brow = 1; P.mouth = 'frown'; lidX = 0.2; P.x += tremble(t, 1.5 * fl, 11); tgt = boy; }
      if (k15in(t, 112.7, 113.3)) P.mouth = 'o';
      if (t >= 116.26 && t < 117.5) { P.lean = 0.3 * k15e(t, 116.26, 0.25); P.handRW = k15clampW(P, 1, k15kv(t, [[116.26, [400, 860]], [116.45, [412, 888]], [116.6, [430, 868]], [116.75, [446, 890]], [116.9, [460, 872]], [117.05, [482, 888]]])); }
      if (t >= 117.5 && t < 118.5) P.lean = 0.3 * (1 - k15e(t, 117.5, 0.5));
      if (t >= 118.48) { P.kneel = k15e(t, 118.62, 0.5); P.sq = anticipate(t, 118.48, 0.16, 0.06) * (t > 118.64 ? settleTo(t, 118.64, 1.05, 1, 0.4) : 1); }
      if (t >= 119.86 && t < 121.6) { P.mouth = 'open'; P.talk = 1; P.tip = 0.08 * k15e(t, 119.86, 0.2) * (1 - k15e(t, 121.4, 0.2)); }
      if (t >= 122.02 && t < 125.68) { P.talk = talk(t, [[122.02, 125.68]]); }
      if (t >= 124.5) { P.brow = 1; lidX = 0.3; }
    }
    if (t >= 125.68 && t < 145.58) {   // S7
      const bd = K15BOYD(t); P.kneel = 1; P.brow = 1; lidX = 0.3; P.mouth = 'frown'; tgt = [540 - 40 * bd, 480 + 95 * bd];
      if (t < 127.08) { P.x += tremble(t, 1.4, 9); P.sq = 1 + 0.025 * Math.sin((t - 125.68) * 9); P.mouth = 'open'; }   // v2: holds the thrust, panting
      if (t < 130.1) { P.tip = -0.08 * k15e(t, 127.08, 1.36); if (t > 129.85) P.sq = anticipate(t, 129.85, 0.25, 0.06); }
      else if (t < 131.0) P.tip = K.lerp(-0.08, 0.12, k15e(t, 130.1, 0.3, 'in')) * (1 - k15e(t, 130.6, 0.4));
      if (k15in(t, 130.5, 132.4)) { P.brow = K.lerp(1, 0.6, k15e(t, 130.6, 0.4)); P.mouth = 'frown'; }
      if (t >= 132.6 && t < 133.8) { P.sq = 1 - 0.1 * k15e(t, 132.6, 0.5); lidX = 0.45; P.drop = 6; }
      if (t >= 133.8 && t < 135.56) { P.sq = K.lerp(0.9, 1.06, k15e(t, 133.8, 1.2, 'in')); P.mouth = 'open'; lidX = 0.2; }
      if (t >= 135.56) { P.sq = settleTo(t, 135.56, 1.06, 1, 0.3); P.mouth = 'o'; lidX = 0; noBlink = true;
        tgt = t < 136.4 ? [560, 470] : t < 138.1 ? k15lp([560, 470], [K15HOOK[0] + 10, 500], k15e(t, 136.4, 1.4)) : null;
        P.brow = t < 136.4 ? 1 : K.lerp(1, -0.7, k15e(t, 136.4, 1.4));
        if (t >= 138.1 && t < 139.44) { P.gaze = [0, 0.05]; P.drop = 7 * pulse(t, 138.75, 0.3); P.mouth = 'closed'; } }
      if (t >= 139.44) { const f = 1 - k15e(t, 140.3, 0.8); P.sq = 1 - 0.12 * f; P.eyes = t < 141.3 ? 'shut' : 'open'; P.brow = -0.6; P.mouth = 'o'; P.drop = 10 * f;
        if (t >= 141.3) { P.wink = t < 142.4 ? 'L' : null; P.eyes = 'open'; tgt = [K15HOOK[0], 560 + 80 * k15e(t, 141.8, 2.2)]; }
        if (t >= 144.04) { P.sq = impactSquash(t, 144.04, 0.88); P.y = K15GR - rebound(t, 144.04, 6, 0.2); P.mouth = 'closed'; P.wink = null; lidX = t < 144.9 ? 1 : 0; tgt = null; P.gaze = [0, 0]; } }
    }
    if (t >= 145.58) {   // S8: sinks to sitting; stunned; drips; shards; stick; ghosts; the last drop
      P.kneel = 1 - k15e(t, 145.6, 1.6); P.sq = t < 147.2 ? 1 : settleTo(t, 147.2, 0.92, 1, 0.8); P.mouth = 'o'; P.brow = -0.3; P.gaze = [0, 0]; tgt = null; noBlink = true;
      lidX = Math.max(pulse(t, 147.6, 0.6), pulse(t, 148.7, 0.6));   // v2: two slow blinks, then the mouth closes to a flat line
      if (t >= 149.5) P.mouth = 'closed';
      P.drop = 4 * k15e(t, 145.6, 1.6); P.handL = [-40, -82];
      if (t >= 149.86 && t < 153.7) { tgt = [K15SEATX - 30, 700 + 140 * (((t - 149.86) / 0.68) % 1)]; noBlink = false; }
      if (t >= 154.16) { P.wet = 0.5; tgt = gazePlan(t, [[154.16, [430, 890]], [155.4, [470, 892]], [157.3, k15L2W(P, [60, -150])], [159.5, [520, 890]], [160.1, [620, 420]], [161.16, [518, 362]], [162.16, [746, 650]], [163.44, [772, 340]], [164.7, [K15HOOK[0], 320]], [165.9, [K15HOOK[0], 460]]], 0.25);
        P.drop = 4 + 12 * k15e(t, 154.16, 0.6); P.brow = -0.75; P.mouth = 'closed'; noBlink = false; }
      if (t >= 157.3) { P.drop = 4 + 10 * (1 - k15e(t, 157.3, 0.6)); P.brow = 0.4; }
      if (k15in(t, 157.31, 159.4)) { tgt = k15L2W(P, [80, -175]); }   // v2: looks at the stick in his hand
      if (k15in(t, 158.76, 160.4)) { P.mouth = 'frown'; P.sq = 1 - 0.035 * k15e(t, 158.76, 0.4) * (1 - k15e(t, 160.0, 0.4)); P.drop = (P.drop || 0) + 5 * k15e(t, 158.76, 0.4); }
      if (t >= 160.1) { P.wet = true; P.brow = -0.6; P.mouth = 'closed'; P.drop = 4 + 3 * (k15e(t, 161.3, 0.4) + k15e(t, 162.3, 0.4) + k15e(t, 163.6, 0.4)); P.sq = 1 - 0.01 * (k15e(t, 161.3, 0.4) + k15e(t, 162.3, 0.4) + 2 * k15e(t, 163.6, 0.4)); }
      if (t >= 165.9) { P.drop = 4 + 9 - 12 * k15e(t, 165.9, 0.6); tgt = null; P.gaze = [0, -1 + 1.9 * k15e(t, 166.0, 1.0)]; }
      if (t >= 167.0) { P.gaze = [0, 0.9]; lidX = 0.4; P.sq = 1 - 0.04 * pulse(t, 167.2, 1.4); P.mouth = 'o'; }
      if (t >= 167.8) { const ex = k15e(t, 167.8, 0.8); P.sq = 1 - 0.03 * ex; P.drop = (P.drop || 0) + 4 * ex; if (t < 168.6) { P.mouth = 'o'; lidX = 0.6; } }   // v2: one long exhale
      if (t >= 168.6) { P.gaze = [0, 0.3]; P.mouth = 'closed'; lidX = Math.max(0.45, pulse(t, 169.4, 0.7)); }
    }
  }
  // stick hands
  const ST = k15stick(t, P);
  if (!ST.floor) { P.handRW = k15clampW(P, 1, ST.grip, 0.995); if (ST.two) { const c = Math.cos(ST.a), s = Math.sin(ST.a); P.handLW = k15clampW(P, -1, [ST.grip[0] - c * 34, ST.grip[1] - s * 34], 0.995); P.handL = null; } P.handR = null; }
  if (P.handRW) P.handR = null; if (P.handLW) P.handL = null;
  // eyes
  const hd = k15head(P);
  if (!P.gaze && tgt) P.gaze = lookAt(hd, tgt);
  P.lid = noBlink ? lidX : Math.max(lidX, blink(t, 4));
  return { P, ST, hd };
}

// ---------- the thought cloud ----------
const K15BOX = { s1: [700, 400, 380, 300], s2: [640, 400, 600, 420], s3: [540, 400, 820, 520], s4: [520, 390, 900, 600] };
const k15bx = (a, b, u) => a.map((v, i) => K.lerp(v, b[i], u));
function k15cloud(t) {
  if (t < 32.9 || t >= 139.44) return null;
  let b = K15BOX.s1; const bk = (a, d) => K.ease.back(K.clamp((t - a) / d));
  if (t >= 41.65) b = k15bx(b, K15BOX.s2, bk(41.65, 0.6));
  if (t >= 51.4) b = k15bx(b, [b[0] + 24, b[1], b[2] * 1.08, b[3]], k15e(t, 51.4, 1.5));
  if (t >= 57.6 && t < 63) b = k15bx(b, [b[0] + 26, b[1], b[2] + 52, b[3]], k15e(t, 57.6, 1.2, 'out'));
  if (t >= 62.9) b = k15bx(K15BOX.s2, K15BOX.s3, bk(62.9, 0.7));
  if (t >= 72.7) b = k15bx(b, [b[0], b[1] - 20, b[2], b[3] + 40], bk(72.7, 0.5));
  if (t >= 80.74) { const st = (t >= 82.7 ? 1 : 0) + (t >= 81.54 ? 1 : 0) + 1, last = t >= 82.7 ? 82.7 : t >= 81.54 ? 81.54 : 80.74; b = k15bx(k15bx([540, 380, 820, 560], K15BOX.s4, (st - 1) / 3), k15bx([540, 380, 820, 560], K15BOX.s4, st / 3), bk(last, 0.35)); }
  if (t >= 84.3) b = k15bx(b, [b[0], b[1], b[2] * 0.97, b[3] * 0.97], k15e(t, 84.3, 0.5) * (1 - bk(85.14, 0.3)));
  const p = K.clamp((t - 32.9) / 1.1), blue = k15e(t, 105.9, 1.2);
  const flick = (k15in(t, 40.5, 40.62) || (k15in(t, 113.5, 115.5) && Math.floor(t * 10) % 2 === 0)) ? 0.45 : 1;
  return { x: b[0], y: b[1], w: b[2], h: b[3], p, blue, flick, lobe: t >= 85.14 ? K.clamp((t - 85.14) / 0.5) : 0 };
}
function k15cloudBg(c, CL, t) {
  c.fillStyle = '#fff6e0'; c.fillRect(0, 0, K15W, K15H);
  c.save(); c.globalAlpha = 0.5 * (1 - CL.blue); c.fillStyle = dotPat(c, C.yellow, 16, 0.34); c.fillRect(0, 0, K15W, K15H); c.restore();
  if (CL.blue > 0) { c.save(); c.globalAlpha = 0.42 * CL.blue; c.fillStyle = dotPat(c, '#9ec2ff', 16, 0.34); c.fillRect(0, 0, K15W, K15H); c.restore(); }
}
function k15drawCloud(ctx, t, A) {
  const CL = k15cloud(t);
  if (!CL) {   // the burst: the dream scatters into dots
    if (t >= 139.44 && t < 140.6) { const d = t - 139.44, r = K.rng(4242), b = K15BOX.s4; ctx.save(); ctx.globalAlpha = 1 - d / 1.16;
      for (let i = 0; i < 70; i++) { const ox = b[0] + (r() - 0.5) * b[2] * 0.9, oy = b[1] + (r() - 0.5) * b[3] * 0.85, a = Math.atan2(oy - b[1], ox - b[0]), sp = 300 + r() * 500, rr = 6 + r() * 12;
        ctx.fillStyle = i % 3 ? C.yellow : '#9ec2ff'; ctx.beginPath(); ctx.arc(ox + Math.cos(a) * sp * d, oy + Math.sin(a) * sp * d + 200 * d * d, rr * (1 - d * 0.5), 0, 7); ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.stroke(); }
      ctx.restore(); }
    return null;
  }
  ctx.save();
  if (CL.lobe > 0) thoughtCloud(ctx, 560, 150, 420, 190, t, { p: 0.3 + 0.7 * CL.lobe, fill: '#fff6e0', seed: 9, n: 7, lw: 10, inside: (c) => k15cloudBg(c, CL, t), scale: 1, at: [560, 150] });
  thoughtCloud(ctx, CL.x, CL.y, CL.w, CL.h, t, { p: CL.p, tail: [K15SEATX + 10, 632], fill: '#fff6e0', seed: 5, n: 12, lw: 10, scale: 1, at: [CL.x, CL.y], inside: (c) => { k15cloudBg(c, CL, t); c.globalAlpha *= CL.flick; k15dream(c, t); } });
  ctx.restore();
  return CL;
}

// ---------- the dream (drawn inside the cloud, world units) ----------
const K15D2S = 1.5, K15D2 = (x, y) => [600 + (x - 600) * K15D2S, 566 + (y - 548) * K15D2S];   // v2 stage-2 dream scale (local -> world)
const K15GOATS = [[525, 548], [640, 548], [755, 548]];
const K15MID = [[585, 508], [700, 508], [800, 508]];
const K15BACK = [[520, 470], [585, 468], [650, 471], [715, 468], [780, 470], [840, 468]];
const K15COWS = [[575, 506], [740, 506]];
function k15d3(c, t) { const f = 1 - k15e(t, 86.0, 1.6), g = 1 + 0.45 * f; c.translate(700, 566 + 22 * f); c.scale(g, g); c.translate(-700, -566); }   // v2 stage-3 dream scale
function k15dream(c, t) {
  // ---- stage 1: the stall, the coins, the abacus ----
  if (t < 41.95) {
    const sk = k15pop(t, 34.4, 0.3) * (t < 41.65 ? 1 : 0); if (sk > 0) { c.save(); c.translate(700, 520); c.scale(sk, sk); c.translate(-700, -520); k15Stall(c, 700, 520, 0.8);
      if (t < 35.4) { const f = k15e(t, 35.08, 0.32); c.save(); c.translate(700, 470); c.rotate(f * 3); c.scale(0.32 * (1 - f) + 0.001, 0.32 * (1 - f) + 0.001); c.translate(0, -150); shape(c, K15JAR, K15CLAY, { lw: 12, seed: 804, dot: C.yellow, pitch: 20, rad: 0.2, da: 0.4 }); c.restore(); }
      c.restore(); }
    if (t >= 35.1) { const n = Math.min(12, Math.floor((t - 35.4) / 0.08)) + (t >= 39.44 ? Math.min(12, Math.floor((t - 39.44) / 0.05)) : 0); if (n > 0) k15Coins(c, 700, t < 41.65 ? 470 : 470 + 70 * k15e(t, 41.65, 0.3, 'in'), n, 0.9);
      for (let i = 0; i < 10; i++) { const a = 35.1 + i * 0.1, d = t - a; if (d < 0 || d > 0.6) continue; const u = d / 0.6, dx = (i % 2 ? 1 : -1) * (20 + i * 6); k15Coin(c, 700 + dx * u, 460 - 160 * Math.sin(Math.PI * u) + 10 * u, 11, t * 10 + i); }
      for (let i = 0; i < 3; i++) { const d = t - 36.82 - i * 0.12; if (d < 0 || d > 0.8) continue; const u = d / 0.8; k15Coin(c, 700 + (i - 1) * 60 * u * 1.6, 440 - 70 * Math.sin(Math.PI * u * 0.8) + 120 * u * u, 10, t * 12 + i); } }
    const ab = k15pop(t, 37.7, 0.3) * (t < 41.65 ? 1 : 0); if (ab > 0) { c.save(); c.translate(600, 330); c.scale(ab, ab); c.translate(-600, -330); const taps = [38.3, 38.84, 39.44]; k15Abacus(c, 600, 330, 0.7, taps.map((x) => k15e(t, x, 0.18))); c.restore(); }
  }
  // ---- stage 2: paying, goats, kids, herd, cows, the field ----
  // v2: drawn 1.5x larger about (600, 548), ground line moved down to 588; three clear rows; half the herd trots out before the cows drop in
  if (t >= 41.65 && t < 64.2) {
    c.save(); c.translate(600, 566); c.scale(K15D2S, K15D2S); c.translate(-600, -548);
    if (t < 46.5) { const x = K.lerp(700, 600, k15e(t, 41.65, 0.4)) + 150 * k15e(t, 43.8, 1.5); const n = t < 45.5 ? 24 : t < 45.8 ? 5 : t < 46.1 ? 3 : t < 46.4 ? 1 : 0; if (n) k15Coins(c, x, 545, n, 0.9); }
    if (t >= 54.3) for (let i = 0; i < 8; i++) { const a = 54.3 + i * 0.07, d = t - a; if (d < 0) continue; const u = K.clamp(d / 0.35); k15Coin(c, K.lerp(900, 790 + (i % 4) * 14, u), 470 - (i >> 2) * 12 - 50 * Math.sin(Math.PI * u), 10, 0); }
    const fu = k15e(t, 56.8, 0.78, 'lin'); if (fu > 0) k15Field(c, 300, 1120, 548, fu, 40);
    const gone = (i) => t >= 63.6 + i * 0.08, GC = '#d6cebd';
    const trot = (x, i, t0) => x + kfn(t, [[t0 + i * 0.1, 0], [t0 + 1.5 + i * 0.1, 560]], 'in');
    // back row (6) pops at 52.22, trots out right on "abi'u" (53.78)
    if (t >= 52.22) K15BACK.forEach(([x, y], i) => { if (gone(i)) return; const k = k15pop(t, 52.22 + i * 0.05, 0.25); const W = walk((tt) => x + kfn(tt, [[53.78 + i * 0.1, 0], [55.3 + i * 0.1, 560]], 'in'), t, { stride: 10 });
      if (W.x > 1000) return; k15Goat(c, { x: W.x, y, s: 0.4 * k, kind: 'goat', ph: W.ph, amp: W.amp, head: t < 53.78 ? 0.5 + 0.5 * Math.sin(t * 2 + i) : 0, t, col: GC }); });
    // middle row: the kids, grown on "yakburu" (51.64); they trot out too
    if (t >= 49.32) K15GOATS.forEach(([x0, y0], i) => { const ka = 49.32 + i * 0.2, kk = k15pop(t, ka, 0.3), grow = k15e(t, 51.64, 0.35), m = K15MID[i];
      const hop = t > 50.66 && t < 51.4 ? 16 * Math.abs(Math.sin((t - 50.66 - i * 0.12) * 9)) : 0;
      const bx = K.lerp(x0 + 52, m[0], grow), by = K.lerp(y0 + 4, m[1], grow), W = walk((tt) => K.lerp(x0 + 52, m[0], k15e(tt, 51.64, 0.35)) + kfn(tt, [[53.9 + i * 0.1, 0], [55.4 + i * 0.1, 560]], 'in'), t, { stride: 10 });
      if (W.x > 1000) return; k15Goat(c, { x: t >= 53.9 ? W.x : bx, y: by, s: 0.55 * kk * K.lerp(1, 0.85, grow), kind: grow > 0.5 ? 'goat' : 'kid', hop, t, ph: t >= 53.9 ? W.ph : (t - ka) * 20, amp: t >= 53.9 ? W.amp : t < ka + 0.6 ? 0.4 : 0, head: 0.2, lid: 0, dir: 1, col: GC }); });
    // the cows drop into the clear space behind the front goats, larger, one lazy blink each
    if (t >= 55.6) K15COWS.forEach(([x, y], i) => { if (gone(i + 9)) return; const land = 55.88 + i * 0.12, yy = t < land ? K.lerp(150, y, K.clamp((t - 55.6) / (land - 55.6)) ** 2) : y - rebound(t, land, 12, 0.25);
      k15Goat(c, { x, y: yy, s: 0.64, kind: 'cow', lid: 0.25 + 0.75 * pulse(t, 56.9 + i * 0.5, 0.6), chew: Math.abs(Math.sin(t * 5 + i)), t, head: 0.15, dir: i ? 1 : -1 }); });
    // the three front goats
    if (t >= 46.5) K15GOATS.forEach(([x, y], i) => { if (gone(i + 6)) return; const a = 46.5 + i * 0.15, k = k15pop(t, a, 0.25); const hopy = 14 * pulse(t, a, 0.3) + 10 * pulse(t, 55.9, 0.35);
      k15Goat(c, { x, y, s: 0.55 * k, kind: 'goat', head: k15in(t, 47.3, 49.4) ? 0.5 + 0.5 * Math.sin((t - 47.3) * 3 + i * 2) : k15in(t, 49.4, 50.6) ? 0 : 0.3 + 0.3 * Math.sin(t * 1.3 + i), fat: k15e(t, 47.3, 1.9) * (1 - k15e(t, 49.3, 0.2)), hop: hopy, t, bleat: pulse(t, a + 0.1, 0.5), chew: Math.abs(Math.sin(t * 6 + i)), dir: i === 2 ? -1 : 1, col: GC }); });
    for (let i = 0; i < 11; i++) { const a = 63.6 + i * 0.08; if (t >= a && t < a + 0.35) { const P0 = i < 6 ? K15BACK[i] : i < 9 ? K15GOATS[i - 6] : K15COWS[i - 9]; k15PopRing(c, P0[0], P0[1] - 40, 40, t - a); } }
    c.restore();
  }
  // the moon ticks across three times
  if (k15in(t, 47.3, 49.2)) { const u = ((t - 47.3) / 0.633) % 1; moon(c, K.lerp(420, 860, u), 270 - 40 * Math.sin(Math.PI * u), 22); }
  // ---- stage 3: sowing, wheat, sheaves, sacks, loaves, coins, house, neighbours, rich ----
  if (t >= 63.6 && t < 87.5) {   // v2: the old estate fades out by 87.5 instead of parking behind the rope
    c.save(); c.globalAlpha *= 1 - k15e(t, 86.3, 1.1);
    k15d3(c, t);   // v2: 1.45x larger, ground line lower
    k15Field(c, 360, 1000, 562, 1, 40);
    // wheat: sprouts in a wave on 65.36, golden on 65.9; gathered at 66.3
    if (t >= 65.3 && t < 66.6) for (let k = 0; k < 11; k++) { const x = 520 + k * 22, a = 65.36 + k * 0.04, h = 10 * k15pop(t, a, 0.2) + 34 * k15e(t, 65.8, 0.4, 'out'); const gath = k15e(t, 66.3, 0.3, 'in'); if (h > 0) k15Wheat(c, K.lerp(x, 605, gath), 566, h * (1 - gath), 3 * Math.sin(t * 4 + k)); }
    const sx = [560, 605, 650];
    if (t >= 66.5 && t < 71.0) sx.forEach((x, i) => { const a = 66.5 + i * 0.25, k = k15pop(t, a, 0.25), flip = k15e(t, 67.8 + i * 0.1, 0.25); if (flip < 0.5) k15Sheaf(c, x, 566, k * (1 - flip * 2) + 0.001); else k15Sack(c, x, 566, (flip - 0.5) * 2 * 0.9); });
    if (t >= 69.42 && t < 71.0) [560, 600, 640, 680].forEach((x, i) => k15Loaf(c, x + 6, 600, k15pop(t, 69.42 + i * 0.08, 0.25) * 0.8, t - 69.42));
    for (let i = 0; i < 7; i++) { const a = 71.0 + i * 0.05; if (t >= a && t < a + 0.35) k15PopRing(c, 560 + i * 20, 560, 26, t - a); }
    if (t >= 70.2) { const cx = 790; const n = Math.round(K.lerp(24, 60, k15e(t, 70.2, 0.4))) * (t < 71.0 ? 1 : 0); if (n) k15Coins(c, cx, 572, n, 1); if (k15in(t, 71.0, 71.35)) k15PopRing(c, cx, 540, 40, t - 71.0); }   // v2: the coins are spent on the house
    // the house builds itself
    if (t >= 71.0) { const blocks = K.clamp((t - 71.0) / 0.2, 0, 6); const lampOn = k15e(t, 75.6, 0.2);
      k15House(c, 720, 572, 0.8, { blocks, door: K.clamp((t - 72.18) / 0.25), roof: K.clamp((t - 72.4) / 0.25), storey: K.clamp((t - 72.72) / 0.25), dome: K.clamp((t - 72.95) / 0.3), open: k15e(t, 73.9, 0.5),
        inside: (k) => { k15Furniture(k, 'carpet', 0, 0, k15pop(t, 74.58, 0.25) + 0.001); k15Furniture(k, 'chair', -44, -8, k15pop(t, 74.8, 0.25) + 0.001); k15Furniture(k, 'table', 30, -8, k15pop(t, 75.0, 0.25) + 0.001); k15Furniture(k, 'lamp', 0, -84, k15pop(t, 75.2, 0.25) + 0.001, lampOn); } });
      if (k15in(t, 75.4, 76.6)) for (let i = 0; i < 4; i++) { const a = 75.4 + i * 0.22; if (t > a && t < a + 0.4) { c.save(); c.globalAlpha = 1 - (t - a) / 0.4; star(c, [650, 700, 760, 720][i], [460, 430, 470, 380][i], 14, C.white, t * 3); c.restore(); } } }
    // neighbours walk in and admire (they fade when the pictures are pushed aside)
    if (t >= 76.5 && t < 87.0) { const al = 1 - k15e(t, 86.0, 0.5); [[640, C.blue, 'villager', 0.44], [590, C.red, 'servant', 0.4], [540, '#3f9d4a', 'servant', 0.45]].forEach(([x, col, cos, s], i) => {
      const xf = (tt) => kfn(tt, [[76.5 + i * 0.13, 330 - i * 40], [77.6 + i * 0.13, x]]); const W = walk(xf, t, { stride: 26 * s });
      const R = [{ handR: PERSON_HANDS.pointUp.R, mouth: 'open' }, { handL: PERSON_HANDS.mouthCover.L, handR: PERSON_HANDS.mouthCover.R, mouth: 'o' }, { handL: PERSON_HANDS.clasp.L, handR: PERSON_HANDS.clasp.R, drop: 10, mouth: 'smile' }][i];
      person(c, { x: W.x, y: 572, s, ph: W.ph, amp: W.amp, costume: cos, pal: { robe: col, dot: mixHex(col, C.black, 0.3), hc: cos === 'servant' ? [C.yellow, C.white, C.yellow][i] : undefined }, gaze: [0.6, -0.7], alpha: al, seed: 30 + i, ...(t > 77.18 + i * 0.13 ? R : {}) }); }); }
    c.restore();
  }
  // the dream self: sows, gathers, stands proud; turns rich; becomes the father of S5 and S6
  if (t >= 63.9 && t < 139.44) {
    const rich = t >= 78.64, k = k15pop(t, 63.9, 0.3);
    let x = 470, y = 570, s = (0.62 + 0.13 * k15e(t, 86.0, 1.6)) * k, P = { gaze: [0.6, 0.2], mouth: 'smile', seed: 21 };
    if (t < 65.2) { const xf = (tt) => kfn(tt, [[64.02, 520], [65.2, 720]]); const W = walk(xf, t, { stride: 26 * 0.62 }); x = W.x; Object.assign(P, { ph: W.ph, amp: W.amp, handR: [60, -170 + 60 * Math.sin((t - 64) * 9)], handL: [-30, -110] }); }
    else if (t < 70.2) { x = 720; if (k15in(t, 66.3, 67.0)) P.handR = k15kv(t, [[66.3, [90, -150]], [66.7, [-60, -150]], [67.0, [40, -100]]]); if (k15in(t, 67.0, 67.6)) { P.handL = [-10, -100 + 6 * Math.sin(t * 30)]; P.handR = [10, -100 - 6 * Math.sin(t * 30)]; } P.gaze = [-0.8, 0.3]; }
    else if (t < 71.0) { x = 720; y = 562; P.gaze = [0.8, -0.5]; P.mouth = 'o'; }
    else if (t < 86.0) { const xf = (tt) => kfn(tt, [[71.0, 720], [71.6, 600], [75.9, 600], [76.4, 720]]); const W = walk(xf, t, { stride: 26 * 0.62 }); x = W.x; Object.assign(P, { ph: W.ph, amp: W.amp, gaze: [0.6, -0.6] });
      if (t >= 78.64) Object.assign(P, { gaze: [0, 0] }); if (t >= 79.28) { Object.assign(P, { handL: PERSON_HANDS.hipsHands.L, handR: PERSON_HANDS.hipsHands.R, lid: 0.5, sq: 1.04, gaze: [0, 0], drop: -6 }); } }   // v2: hips on "ghani", same frame as the dreamer
    else { const xf = (tt) => kfn(tt, [[86.0, 720], [87.6, 560]]); const W = walk(xf, t, { stride: 26 * 0.62 }); x = W.x; Object.assign(P, { ph: W.ph, amp: W.amp, gaze: [0.8, 0] }); }
    if (k15in(t, 86.0, 87.6)) { /* walking left with the push */ }
    if (t >= 89.62 && t < 105.9) { P.gaze = t < 91.86 ? [1, 0] : [0.5, 0.8]; P.mouth = 'smile'; P.sq = 1 + 0.04 * k15e(t, 89.7, 0.3); }
    if (k15in(t, 95.6, 98.0)) { P.handR = PERSON_HANDS.pointFwd.R; P.talk = talk(t, [[95.8, 97.9]]) * 0.6; P.gaze = [1, -0.2]; }
    if (t >= 99.2 && t < 105.9) { x = K.lerp(560, 520, k15e(t, 99.2, 0.5)); P.gaze = [1, -0.2]; }
    if (t >= 105.9) {   // S6: the scolding father
      x = K.lerp(520, 650, k15e(t, 105.9, 0.6)); P.gaze = [-1, 0.4]; P.mouth = 'closed'; P.brow = 0;
      if (k15in(t, 108.1, 109.2)) { P.handR = [40 + 10 * Math.sin(t * 16), -190]; P.handR = [-60 + 10 * Math.sin(t * 16), -190]; P.talk = talk(t, [[108.1, 109.1]]); P.brow = 0.5; }
      if (t >= 110.1) { P.mouth = 'o'; P.brow = -0.6; P.handL = PERSON_HANDS.cheeks.L; P.handR = PERSON_HANDS.cheeks.R; }
      if (t >= 111.6) { P.mouth = 'frown'; P.brow = 0.3; P.handL = PERSON_HANDS.hipsHands.L; P.handR = PERSON_HANDS.hipsHands.R; }
      if (k15in(t, 130.3, 131.6)) { P.mouth = 'o'; P.brow = -0.5; }
      y += 95 * K15BOYD(t); x += 25 * K15BOYD(t); }
    const pop = rich && t < 79.1 ? K.clamp((t - 78.64) / 0.46) : 0;
    c.save(); if (t < 88) k15d3(c, t);
    person(c, { x, y, s, costume: rich ? 'merchant' : 'ascetic', pal: rich ? { robe: C.yellow, dot: C.red, sash: C.red, hc: C.yellow, hd: C.red, jewel: C.red } : undefined, ...P });
    if (pop > 0) { c.save(); c.globalAlpha = 1 - pop; for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; shape(c, ell(x + Math.cos(a) * 40 * (0.6 + pop), y - 80 + Math.sin(a) * 50 * (0.6 + pop), 26, 22, 14), C.white, { lw: 3 }); } c.restore(); }
    c.restore();
  }
  // ---- stage 4: wife, heart, bundle, son, star, slate, palace, cheers ----
  if (t >= 89.62 && t < 106.3) {
    const g = k15pop(t, 89.62, 0.3) * (t < 105.9 ? 1 : 0); const wx = 650;
    if (g > 0) { const hold = k15in(t, 91.1, 91.86); person(c, { x: wx, y: 570, s: 0.6 * g, costume: 'villageWoman', pal: { hc: C.blue, hd: NAVY }, mouth: 'smile', gaze: t < 91.86 ? [-1, 0] : [-0.5, 0.8], lid: hold ? 0.3 : undefined, seed: 41,
      handL: hold ? [-10, -110 + 6 * Math.sin(t * 8)] : undefined, handR: hold ? [20, -112 - 6 * Math.sin(t * 8)] : undefined });
      if (hold) k15Bundle(c, wx + 3, 570 - 112 * 0.6, 0.8); }
    if (k15in(t, 89.7, 91.2)) heart(c, 605, 470 - 60 * k15e(t, 89.7, 1.4, 'out'), 16 + 4 * Math.sin(t * 10), { alpha: 1 - k15e(t, 90.9, 0.3) });
    if (t >= 105.9 && t < 106.3) k15PopRing(c, wx, 500, 50, t - 105.9);
  }
  if (t >= 95.6 && t < 99.6) { const k = k15pop(t, 95.6, 0.3) * (1 - k15e(t, 99.2, 0.3)); k15Slate(c, 780, 572, 0.85 * k + 0.001, t < 97.96 ? 'abc' : 'sum', t < 97.96 ? (t - 97.02) / 0.88 : (t - 97.96) / 0.6); }
  if (t >= 100.28 && t < 106.3) { const x = K.lerp(1100, 850, k15e(t, 100.28, 0.6, 'out')); c.save(); if (t >= 105.9) { const u = (t - 105.9) / 0.25; c.globalAlpha = 1 - K.clamp(u); } k15Palace(c, x, 572, 0.8, K.clamp((t - 101.54) / 0.3) * (1 + 0.15 * Math.sin(t * 14) * pulse(t, 101.54, 0.8)), k15e(t, 101.8, 0.3)); c.restore(); if (t >= 105.9) k15PopRing(c, x, 470, 80, t - 105.9); }
  if (t >= 91.86 && t < 139.44) k15boy(c, t);
  if (t >= 102.7 && t < 106.3) [[700, C.blue, 'villager'], [745, C.red, 'servant'], [790, '#3f9d4a', 'servant']].forEach(([x, col, cos], i) => {
    if (t >= 105.9 + i * 0.05) { k15PopRing(c, x, 470, 40, t - 105.9 - i * 0.05); return; }
    const k = k15pop(t, 102.7 + i * 0.08, 0.25), th = 102.9 + i * 0.1, up = t > th;
    person(c, { x, y: 545, s: 0.48 * k, costume: cos, pal: { robe: col, dot: mixHex(col, C.black, 0.3) }, mouth: 'open', aL: up ? [2.5, 2.8] : undefined, aR: up ? [-2.5, -2.8] : undefined, seed: 50 + i, y0: 0 });
    if (up && cos === 'servant') { const d = t - th, cx = x + (i - 1.5) * 30 * d, cy = 545 - 0.48 * 250 - 220 * d + 300 * d * d; shape(c, ell(cx, cy, 14, 9, 10), [C.yellow, C.yellow, C.white][i], { lw: 3 }); } });
}
let K15SPLITC = null;
function k15split(t) {   // v2: the swing passes through the imaginary son; q = crossing point on the stick, a = stick angle, off = half offset
  if (t < K15CROSS || t > K15CROSS + 0.8) return null;
  if (!K15SPLITC) { const A = k15asc(K15CROSS), [b, tp] = k15stickPts(A.ST), bc = [540 - 40, 570 + 95 - 52], dx = tp[0] - b[0], dy = tp[1] - b[1], u = K.clamp(((bc[0] - b[0]) * dx + (bc[1] - b[1]) * dy) / (dx * dx + dy * dy)); K15SPLITC = { q: [b[0] + dx * u, b[1] + dy * u], a: A.ST.a }; }
  return { ...K15SPLITC, off: 13 * (1 - k15e(t, K15CROSS + 0.12, 0.55)) };
}
function k15boy(c, t) {
  // the son: bundle hops out and unfolds (91.86), clever star, sits at the slate, grows (99.3), walks to the palace; small and cheeky again in S6
  let x = 605, y = 570, s = 0.62, child = true, P = { costume: 'servant', pal: { robe: C.blue, dot: NAVY, hc: C.red }, mouth: 'smile', seed: 61 };
  if (t < 92.4) { const u = K.clamp((t - 91.86) / 0.5); const bx = K.lerp(653, 605, u), by = K.lerp(570 - 67, 570, u) - 40 * Math.sin(Math.PI * u); if (u < 0.6) { k15Bundle(c, bx, by, 0.8); return; } P.sq = landSquash(t, 92.2, 0.25); P.aL = [2.3, 2.6]; P.aR = [-2.3, -2.6]; s *= K.ease.back(K.clamp((u - 0.6) / 0.4)); }
  else if (t < 95.6) { P.aL = t < 92.8 ? [2.3, 2.6] : undefined; P.aR = t < 92.8 ? [-2.3, -2.6] : undefined; P.eyes = 'open'; P.gaze = [0, -0.6]; if (t >= 93.5) { P.handR = [14, -196]; P.lid = Math.max(pulse(t, 93.7, 0.12), pulse(t, 93.95, 0.12)); } }
  else if (t < 99.2) { x = K.lerp(605, 700, k15e(t, 95.6, 0.4)); P.sit = k15e(t, 95.9, 0.3); P.seat = 'floor'; P.gaze = [0.6, -0.8]; if (t >= 97.0 && t < 97.96) P.gaze = [0.3 + 0.3 * Math.floor((t - 97.0) / 0.3), -0.8];
    if (t >= 97.96) { const k = settleTo(t, 98.0, 0, 1, 0.3, 0.2); P.handR = k15lp([30, -110], [30, -205], k); y -= 6 * Math.abs(Math.sin((t - 98) * 10)) * (t < 99 ? 1 : 0); P.mouth = 'open'; } }
  else if (t < 105.9) {   // grows in three pops, then walks to the palace and bows
    x = 700; const st = t < 99.3 ? 0 : t < 99.7 ? 1 : t < 100.1 ? 2 : 3; s = [0.62, 0.62, 0.8, 0.62][st]; child = st < 3; P.sq = st > 0 ? settleTo(t, [0, 99.3, 99.7, 100.1][st], 1.1, 1, 0.2) : 1;
    if (st === 0) { P.sit = 1 - k15e(t, 99.2, 0.1); P.seat = 'floor'; }
    if (t >= 100.28) { const xf = (tt) => kfn(tt, [[100.28, 700], [101.4, 830]]); const W = walk(xf, t, { stride: 26 * 0.62 }); x = W.x; P.ph = W.ph; P.amp = W.amp; P.handL = [-20, -110]; P.gaze = [1, -0.3]; }
    if (t >= 101.9) { P.drop = 14 * pulse(t, 101.9, 0.9); P.lid = 0.6 * pulse(t, 101.9, 0.9); P.gaze = [0.6, 0.6]; }
    if (!child && t < 102.9) for (const yy of [0]) { /* scroll under the arm */ c.save(); const hx = x - 0.62 * 22, hy = y - 0.62 * 112; shape(c, K.rectPts(hx - 22, hy - 6, 34, 12), C.white, { lw: 3 }); c.restore(); }
    if (t >= 102.9) { x = 830; P.gaze = [-0.8, 0.2]; P.mouth = 'smile'; }
  } else {   // S6: small again, bored, defiant, cheeky
    x = 540 - 40 * K15BOYD(t); y += 95 * K15BOYD(t); child = true; s = 0.8; P.sq = t < 106.5 ? settleTo(t, 106.1, 0.7, 1, 0.3) : 1; P.gaze = t < 107.46 ? [1, 0] : [-1, -0.2]; P.lid = t > 107.46 && t < 109.18 ? 0.5 : undefined; P.mouth = 'closed';
    if (t >= 109.18) { const ft = turnFlip(t, [[109.18, 1], [109.3, -1]], 0.5); P.handL = PERSON_HANDS.folded.L; P.handR = PERSON_HANDS.folded.R; P.eyes = 'shut'; P.tilt = -0.15; P.mouth = 'frown'; P.sq = (P.sq || 1) * (1 - 0.25 * pulse(t, 109.18, 0.5)); y -= 4 * k15tap(t, [110.1, 110.4, 110.7], 0.15); }
    if (k15in(t, 121.5, 123.3) || k15in(t, 128.6, 130.0)) { P.eyes = 'open'; P.wink = 'L'; P.gaze = [-1, 0.2]; P.mouth = 'o'; P.tilt = 0.1; P.sq = 1 + 0.03 * Math.sin(t * 12); }
    if (k15in(t, 130.1, 130.85)) { P.eyes = 'shut'; P.mouth = 'o'; }   // v2: the stick passes through him
    if (k15in(t, 130.85, 132.6)) { P.mouth = 'smile'; P.eyes = 'open'; P.wink = 'L'; P.gaze = [-1, 0.1]; P.tilt = 0.08; }
  }
  let alpha = 1, wob = 0;
  if (k15in(t, 114.92, 115.32)) alpha = 0.6;
  const sp = k15split(t);
  if (k15in(t, 130.5, 132.3)) { const d = t - 130.5; wob = 0.6 * Math.sin(d * 18) * Math.exp(-d * 3); }
  c.save(); c.globalAlpha *= alpha; if (wob) { c.translate(x, y - 60); c.scale(1 + 0.1 * wob, 1 - 0.05 * wob); c.translate(-x, -(y - 60)); }
  if (sp) {   // v2: cut in two along the stick line, the halves slide back together
    const { q, a, off } = sp, ux = Math.cos(a), uy = Math.sin(a), nx = -uy, ny = ux;
    for (const sd of [1, -1]) { c.save(); c.beginPath(); const R = 600; c.moveTo(q[0] - ux * R, q[1] - uy * R); c.lineTo(q[0] + ux * R, q[1] + uy * R); c.lineTo(q[0] + ux * R + nx * R * sd, q[1] + uy * R + ny * R * sd); c.lineTo(q[0] - ux * R + nx * R * sd, q[1] - uy * R + ny * R * sd); c.closePath(); c.clip();
      c.translate(ux * off * sd + nx * off * 0.35 * sd, uy * off * sd + ny * off * 0.35 * sd); person(c, { x, y, s, child, ...P }); c.restore(); }
    ripple(c, q[0], q[1], 130.2, t, 0.8);
  } else person(c, { x, y, s, child, ...P });
  const tongue = (k15in(t, 121.7, 123.3) || k15in(t, 128.7, 130.0));
  if (tongue) { const hy = y + s * 0.62 * (-203 + 34 * 1.25 + 4); shape(c, ell(x, hy, 6, 8, 10), C.red, { lw: 2.5 }); }
  c.restore();
}

// ---------- goo on the ascetic (after the splat) ----------
// v2: an irregular two-tone cap with a scalloped edge, 5 tapering runs ending in beads (turban edge, beside the eyes, beard, shoulder),
// blotches on the robe, separate drops that form at a bead, stretch, fall and land with a ring, and a flat puddle on the mat.
const K15CAP = (() => {   // dome on top, scalloped lower edge of uneven round lobes (head-local units)
  const out = [[-53, -40], [-50, -53], [-36, -65], [-14, -72], [12, -71], [34, -64], [50, -53], [54, -40]];
  const lobes = [[54, 36, 13], [36, 22, 7], [22, 8, 15], [8, -10, 9], [-10, -26, 14], [-26, -40, 8], [-40, -53, 12]];
  for (const [x0, x1, dp] of lobes) for (let k = 0; k <= 6; k++) { const u = k / 6; out.push([K.lerp(x0, x1, u), -40 + dp * Math.sin(Math.PI * u)]); }
  return out; })();
// runs: [x, y0, length, width, colour, delay]; head-local units (x s); none crosses the eyes or the mouth
const K15RUNS = [[-47, -34, 26, 9, K15GHEE, 0.0], [-34, -30, 24, 7, K15HONEY, 0.15], [33, -28, 32, 8, K15GHEE, 0.08], [-12, 50, 24, 11, K15HONEY, 0.35], [-40, 52, 18, 10, K15GHEE, 0.5]];
const K15BLOTS = [[30, 58, 10, 6, K15GHEE, 12], [-24, 74, 9, 6, K15HONEY, 0], [24, 88, 10, 6, K15HONEY, 14], [-4, 100, 8, 5, K15GHEE, 0]];
const K15DRIPS = [[149.88, K15GHEE, 3], [150.54, K15HONEY, 1], [151.14, K15HONEY, 3], [151.74, K15GHEE, 2], [152.34, K15HONEY, 3], [152.94, K15GHEE, 1]];
function k15drip(ctx, x, y0, yE, w, col, top = 0) {   // a paint-drip band: flat top (optional smear blob), round bulb at the bottom
  ctx.save(); ctx.fillStyle = col; ctx.strokeStyle = C.black; ctx.lineWidth = 2.5; ctx.lineJoin = 'round'; const r = w * 0.62, h = w / 2;
  const splat = (sh) => { const rg = K.rng(Math.round(x * 7 + y0)), n = 11; ctx.beginPath(); for (let i = 0; i <= n; i++) { const an = (i % n) / n * Math.PI * 2, rr = (top - sh) * (i % 2 ? 0.88 : 1.02 + 0.14 * rg()); const px = x + Math.cos(an) * rr * 1.25, py = y0 + Math.sin(an) * rr * 0.75; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); };
  if (top) { splat(0); ctx.fill(); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(x - h, y0); ctx.lineTo(x - h, yE - r * 0.6); ctx.quadraticCurveTo(x - r, yE - r * 0.3, x - r, yE); ctx.arc(x, yE, r, Math.PI, 0, true); ctx.quadraticCurveTo(x + r, yE - r * 0.3, x + h, yE - r * 0.6); ctx.lineTo(x + h, y0); ctx.fill(); ctx.stroke();
  if (top) { splat(1.6); ctx.fill(); }
  ctx.fillStyle = 'rgba(255,255,255,0.75)'; ctx.beginPath(); ctx.arc(x - r * 0.35, yE - r * 0.3, r * 0.25, 0, 7); ctx.fill(); ctx.restore();
}
function k15runLen(t, R) { const g = k15e(t, 144.1 + R[5], 1.1, 'out'); return R[2] * (g + 0.15 * k15e(t, 146, 14, 'lin')); }
function k15bead(t, hd, s, i) { const R = K15RUNS[i]; return [hd[0] + R[0] * s, hd[1] + (R[1] + k15runLen(t, R)) * s]; }
function k15goo(ctx, t, P, hd) {
  if (t < 144.04) return; const d = t - 144.04, s = P.s, hx = hd[0], hy = hd[1], W = (q) => [hx + q[0] * s, hy + q[1] * s];
  // robe blotches and short streaks
  K15BLOTS.forEach(([x, y, rx, ry, col, st], i) => { const k = k15e(t, 144.6 + i * 0.25, 0.5); if (k <= 0) return; const c = W([x, y]);
    k15drip(ctx, c[0], c[1], c[1] + Math.max(2, st) * s * k, 6 * s, col, rx * 0.8 * s * k); });
  // runs (behind the cap): tapering, each ending in a round bead
  K15RUNS.forEach((R, i) => { if (d < R[5] * 0.5) return; const [x, y0, , w, col] = R, L = k15runLen(t, R), a = W([x, y0]), e = W([x + (i === 3 ? 2 : 0), y0 + L]);
    k15drip(ctx, a[0], a[1], e[1], w * 0.75 * s, col, y0 > 0 ? w * 0.9 * s : 0); });
  // the cap: honey underneath, ghee on top, one glint
  const sq = 1 + 0.12 * Math.exp(-d * 6) * Math.cos(d * 22);
  ctx.save(); ctx.translate(hx, hy - 40 * s); ctx.scale(1 / sq, sq); ctx.translate(-hx, -(hy - 40 * s));
  shape(ctx, K15CAP.map(([x, y]) => [hx + x * 1.02 * s, hy + (y + (y > -45 ? 3 + 0.5 * Math.max(0, y + 40) : 2)) * s]), K15HONEY, { lw: 3.5, seed: 961 });
  shape(ctx, K15CAP.map(([x, y]) => [hx + x * s, hy + (y > -45 ? y - 4 : y) * s]), K15GHEE, { lw: 3, seed: 960 });
  ctx.save(); ctx.fillStyle = C.white; ctx.beginPath(); ctx.ellipse(hx - 22 * s, hy - 60 * s, 8 * s, 3.5 * s, -0.35, 0, 7); ctx.fill(); ctx.beginPath(); ctx.arc(hx - 8 * s, hy - 64 * s, 2 * s, 0, 7); ctx.fill(); ctx.restore();
  ctx.restore();
  // the splash: a ring of drops flying out and falling
  if (d < 0.7) { ctx.save(); ctx.globalAlpha *= 1 - k15e(t, 144.04 + 0.45, 0.25); for (let i = 0; i < 8; i++) { const an = -Math.PI * (0.02 + 0.96 * i / 7), sp = 260 + 60 * (i % 3), x = hx + Math.cos(an) * (50 * s + sp * d), y = hy - 45 * s + Math.sin(an) * (20 * s + sp * 0.6 * d) + 900 * d * d;
    ctx.fillStyle = i % 2 ? K15GHEE : K15HONEY; ctx.strokeStyle = C.black; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(x, y, 6.5, 0, 7); ctx.fill(); ctx.stroke(); } ctx.restore(); }
}
// drips: separate drops form at a bead, stretch, fall and land with a ring; the flat puddle on the mat
function k15drips(ctx, t, hd, s) {
  const pud = k15e(t, 145.0, 7, 'out'); if (pud > 0) { const cx = K15SEATX + 6, rx = 64 * pud + 12, ry = 5 * pud + 2;
    ctx.save(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.fillStyle = K15HONEY; ctx.beginPath(); ctx.ellipse(cx, 899 - ry, rx, ry, 0, 0, 7); ctx.fill(); ctx.stroke();
    ctx.fillStyle = K15GHEE; ctx.beginPath(); ctx.ellipse(cx - 8, 899 - ry - 1, rx * 0.55, ry * 0.55, 0, 0, 7); ctx.fill(); ctx.restore(); }
  for (const [a, col, ri] of K15DRIPS) { const d = t - (a - 0.4); if (d < 0 || d > 1.9) continue;
    const b = k15bead(Math.min(t, a), hd, s, ri), r = 4.6 * s;
    if (t < a) { const g = K.clamp(d / 0.4), st = 6 * s * k15e(t, a - 0.15, 0.15); ctx.save(); ctx.fillStyle = col; ctx.strokeStyle = C.black; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(b[0], b[1] + 2 * s + st * 0.5, r * g, r * g + st * 0.5, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.restore(); continue; }
    const h = 893 - b[1], tf = Math.sqrt(2 * Math.max(10, h) / 1500), y = fallY(t, a, a + tf, b[1] + 4 * s, 893);
    if (t < a + tf) { const v = K.clamp((t - a) / tf); ctx.save(); ctx.fillStyle = col; ctx.strokeStyle = C.black; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(b[0], y, r * (1 - 0.15 * v), r * (1 + 0.5 * v), 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.restore(); }
    else { ripple(ctx, b[0], 895, a + tf, t, 0.45); const k = 1 - k15e(t, a + tf, 0.3); if (k > 0) { ctx.save(); ctx.fillStyle = col; ctx.strokeStyle = C.black; ctx.lineWidth = 2; for (const sd of [-1, 1]) { const u = (t - a - tf) / 0.3; ctx.beginPath(); ctx.arc(b[0] + sd * 14 * u, 893 - 18 * Math.sin(Math.PI * Math.min(1, u)), 3 * k, 0, 7); ctx.fill(); ctx.stroke(); } ctx.restore(); } } }
}

// ---------- world ----------
function k15drawWorld(ctx, t) {
  const day = t < 20.75, u = day ? (k15in(t, 15.2, 17.0) ? 0.25 + 5 * k15e(t, 15.2, 1.8, 'lin') : 0.25) : K.lerp(0.47, 0.6, k15e(t, 21, 140, 'lin'));
  const door = day ? (t < 2.6 ? 0 : t < 6.2 ? settleTo(t, 2.6, 0, 0.95, 0.6, 0.12) : 0.95 * (1 - K.ease.in(K.clamp((t - 6.2) / 0.7))) + 0.04 * Math.exp(-(t - 6.9) * 8) * (t > 6.9 ? Math.cos((t - 6.9) * 30) : 0)) : 0;
  const lamp = day ? 0 : k15e(t, 21.0, 0.6) * (1 + 0.15 * pulse(t, 80.74, 0.4)), o = { ...K15HUT, palette: day ? 'day' : 'dusk', u, door, lamp, t, jar: false, niche: [600, 560] };
  hutRoom(ctx, { ...o, layer: 'back' });
  if (!day && lamp > 0) { ctx.save(); ctx.globalAlpha = 0.25 * lamp; ctx.fillStyle = dotPat(ctx, C.yellow, 12, 0.34); ctx.beginPath(); ctx.arc(600, 570, 140, 0, 7); ctx.fill(); ctx.restore(); }
  if (k15in(t, 80.74, 81.3)) { ctx.save(); ctx.translate(600 + 3 * Math.sin(t * 60) * (1 - (t - 80.74) / 0.56), 0); ctx.restore(); }
  // ghosts on the empty wall (S8)
  k15ghosts(ctx, t);
  const CL = k15drawCloud(ctx, t);
  // the jar
  const J = k15jar(t); k15Jar(ctx, J);
  // free-falling drop at 60.46 past his nose; the last drop at 165.9 onto his nose
  if (k15in(t, 60.46, 61.2)) { const d = t - 60.46, p0 = k15JarPoint(J, 0, 156); k15Drop(ctx, p0[0], Math.min(890, p0[1] + 0.5 * 1500 * d * d), 6, K15HONEY); }
  if (k15in(t, 165.9, 167.0)) { const p0 = k15JarPoint(J, 0, 44); const u = K.clamp((t - 166.45) / 0.55); const y = t < 166.45 ? p0[1] + 6 * k15e(t, 165.9, 0.5) : K.lerp(p0[1] + 6, 712, u * u); k15Drop(ctx, p0[0] - 4 * u, y, 5 + 2 * k15e(t, 165.9, 0.5), K15HONEY); }
  // the goo blob (141.3) and the bowls (S1)
  const A = k15asc(t), P = A.P;
  // shards behind him (those that land behind)
  const shardsOn = t >= 139.44; const bc = k15JarPoint({ ...J, broken: false, ang: 0, L: 161, jump: 0 }, 0, 80);
  if (shardsOn) K15SHARDS.forEach((sh, i) => { if (i % 3 !== 0) return; const [x, y, r] = k15ShardPos(sh, bc[0], bc[1], t - 139.44); k15Shard(ctx, x, y - 6, r, sh.sz, sh.seed, sh.big, 0); });
  // the stick on the floor (before the grab; after the drop)
  if (A.ST.floor) { const fl = A.ST; if (fl.fall) { const S2 = { grip: fl.fall.g, a: fl.fall.a }; const [b, tp] = k15stickPts(S2); k15drawStick(ctx, b, tp); } else k15drawStick(ctx, [fl.x0, fl.y], [fl.x0 + K15STICKL, fl.y]); }
  person(ctx, P);
  k15act(ctx, P, () => {
    const hd = k15head(P);
    // bowls (S1)
    if (t < 15.7) { const hl = k15L2W(P, P.handL || [-34, -112]), hr = k15L2W(P, P.handR || [34, -112]); const bowl = (p, col, tilt, lvl) => { ctx.save(); ctx.translate(p[0], p[1] - 10); ctx.rotate(tilt); shape(ctx, [[-20, -8], [20, -8], [14, 8], [-14, 8]], '#e8742a', { lw: 3.5, seed: 991 }); if (lvl > 0) seg(ctx, -16, -8, 16, -8, 3 * lvl, col, 0); ctx.restore(); };
      const swapped = t >= 11.97 && t < 15.7, inLeft = k15in(t, 8.5, 10.85);
      const gTilt = -1.5 * (k15e(t, 11.3, 0.12) - k15e(t, 11.78, 0.12)) - 0.5 * (pulse(t, 6.0, 0.8)), hTilt = -1.5 * (k15e(t, 12.08, 0.12) - k15e(t, 12.56, 0.12)) - 0.5 * pulse(t, 6.1, 0.8);
      if (t < 15.35) { const gL = t < 11.8 ? 1 : 0, hL = t < 12.58 ? 1 : 0;
        if (inLeft) { bowl([hl[0] - 14, hl[1]], K15GHEE, 0, 1); bowl([hl[0] + 16, hl[1] - 2], K15HONEY, 0, 1); }
        else if (!swapped) { bowl(hl, K15GHEE, gTilt, gL); bowl(hr, K15HONEY, -hTilt * 0, hL); }
        else { bowl(hl, K15HONEY, hTilt, hL); bowl(hr, K15GHEE, 0, 0); } }
      else { bowl([P.x - 70, 900], K15HONEY, 0, 0); bowl([P.x + 76, 900], K15GHEE, 0, 0); }
      // the streams
      const mouth = k15JarPoint(J, 0, 0);
      for (const [a0, a1, col] of [[11.38, 11.82, K15GHEE], [12.15, 12.6, K15HONEY]]) if (k15in(t, a0, a1)) {   // v2: short streams straight into the mouth
        const lip = [hl[0] - 14, hl[1] - 4], u = K.clamp((t - a0) / 0.1), bot = [mouth[0] + 4, K.lerp(lip[1], mouth[1] + 6, u)]; ctx.save(); ctx.lineCap = "round"; ctx.lineWidth = 13; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(lip[0], lip[1]); ctx.quadraticCurveTo(lip[0] - 4, (lip[1] + bot[1]) / 2, bot[0], bot[1]); ctx.stroke(); ctx.lineWidth = 8; ctx.strokeStyle = col; ctx.stroke(); ctx.restore(); }
    }
    // the stick in his hand
    if (!A.ST.floor) { const [b, tp] = k15stickPts(A.ST); k15drawStick(ctx, b, tp); const hr = A.ST.grip; shape(ctx, ell(hr[0], hr[1], 12 * P.s * 0.9, 12 * P.s * 0.9, 12), C.white, { lw: 3.5, seed: 5, dot: C.skin, pitch: 5, rad: 0.3 });
      if (A.ST.two) { const c = Math.cos(A.ST.a), s = Math.sin(A.ST.a); shape(ctx, ell(A.ST.grip[0] - c * 34, A.ST.grip[1] - s * 34, 11 * P.s * 0.9, 11 * P.s * 0.9, 12), C.white, { lw: 3.5, seed: 6, dot: C.skin, pitch: 5, rad: 0.3 }); }
      if (k15in(t, 158.6, 159.45)) { const u = k15e(t, 158.6, 0.7); const q = k15lp(tp, A.ST.grip, u); k15Drop(ctx, q[0], q[1], 7, K15HONEY); }
      if (t >= 144.04) { const g = k15lp(b, tp, 0.8); shape(ctx, ell(g[0], g[1], 8, 5, 10), K15HONEY, { lw: 2 }); } }
    // flush, steam, sparkle, sweat
    const fl = t >= 111.1 && t < 139.0 ? k15e(t, 111.1, 1.0) * (1 - k15e(t, 136.6, 1.4)) * (t > 131.2 && t < 133 ? 1.1 : 1) : 0;
    if (fl > 0) { ctx.save(); ctx.globalAlpha = Math.min(1, fl) * 0.55; ctx.fillStyle = C.red; ctx.beginPath(); const s9 = P.s;   // v2: flush on the cheeks and the forehead only (flat tint)
      ctx.ellipse(hd[0] - 19 * s9, hd[1] + 9 * s9, 8 * s9, 5.5 * s9, 0, 0, 7); ctx.ellipse(hd[0] + 19 * s9, hd[1] + 9 * s9, 8 * s9, 5.5 * s9, 0, 0, 7); ctx.fill(); ctx.beginPath(); ctx.ellipse(hd[0], hd[1] - 21 * s9, 17 * s9, 4.5 * s9 * Math.min(1, fl * 1.3), 0, 0, 7); ctx.fill(); ctx.restore(); }
    if (k15in(t, 112.7, 113.6)) { steam(ctx, hd[0] - 52 * P.s, hd[1] - 10, (t - 112.7) * 1.5); steam(ctx, hd[0] + 52 * P.s, hd[1] - 10, (t - 112.7) * 1.5 + 0.3); }
    if (k15in(t, 29.6, 31.3)) for (const k of [0, 1]) { const ph = ((t - 29.6) * 2 + k * 0.5) % 1; ctx.save(); ctx.globalAlpha = Math.sin(Math.PI * ph); star(ctx, hd[0] + (k ? 58 : -58) * P.s * 0.8, hd[1] - 30, 9, C.white, t); ctx.restore(); }
    if (k15in(t, 30.45, 32.9) && P.handR) { const hp = k15L2W(P, k15clampL(1, P.handR)), jc2 = k15jarCentre(k15jar(t)), an = Math.atan2(jc2[1] - hp[1], jc2[0] - hp[0]), L = 22 * P.s * k15e(t, 30.45, 0.15);   // v2: the index finger points at the jar
      seg(ctx, hp[0] + Math.cos(an) * 8 * P.s, hp[1] + Math.sin(an) * 8 * P.s, hp[0] + Math.cos(an) * (8 * P.s + L), hp[1] + Math.sin(an) * (8 * P.s + L), 8, C.white, 3); }
    if (k15in(t, 119.86, 121.6)) soundArcs(ctx, hd[0] + 50 * P.s, hd[1] + 10, 1, t, C.black);
    k15goo(ctx, t, P, hd);
  });
  // goo blob hanging from the neck stub, stretching, falling (141.3 .. 144.04)
  if (k15in(t, 141.3, 144.1)) { const p0 = k15JarPoint(J, 0, 34); if (t < 143.62) { const u = k15e(t, 141.3, 2.3, 'in'); k15Blob(ctx, p0[0], p0[1], 36 + 10 * u, 30 + 50 * u); } else { const d = t - 143.62, y = p0[1] + 30 + 0.5 * 1400 * d * d; k15Blob(ctx, p0[0] - 6 * d, Math.min(y, A.hd[1] - 70), 46, 70); } }
  if (t >= 145.0) k15drips(ctx, t, A.hd, P.s);
  if (shardsOn) K15SHARDS.forEach((sh, i) => { if (i % 3 === 0) return; const [x, y, r] = k15ShardPos(sh, bc[0], bc[1], t - 139.44); const rock = sh.big ? 0.12 * Math.sin((t - 155.4) * 7) * k15e(t, 155.4, 0.2) * (1 - k15e(t, 157.0, 0.3)) : 0; k15Shard(ctx, x, y - 4, r + rock, sh.sz, sh.seed, sh.big, sh.big ? 1 - k15e(t, 155.6, 1.5) : 0); });
  hutRoom(ctx, { ...o, layer: 'front' });
  return { A, J, CL };
}
// three dotted ghosts on the empty wall, crossed out on their words
function k15ghosts(ctx, t) {   // v2: 1.6x larger, on the empty wall between the rope and the window, kept until 164.2, then fade together
  if (t < 160.1 || t > 164.8) return;
  const out = 1 - k15e(t, 164.2, 0.5);
  K15GHOSTS.forEach(([x, y, a, kind], i) => {
    const fin = k15e(t, 160.1 + i * 0.25, 0.6);
    ctx.save(); ctx.globalAlpha = 0.6 * fin * out;
    if (kind === 'coins') k15Coins(ctx, x, y, 15, 1.9);
    if (kind === 'goat') k15Goat(ctx, { x: x - 10, y, s: 1.15, kind: 'goat', t, bleat: pulse(t, a + 0.1, 0.5) });
    if (kind === 'field') { const r = k15e(t, a, 0.6); k15Field(ctx, x - 78, x + 78 - 90 * r, y, 1, 42); }
    ctx.restore(); ctx.save(); ctx.globalAlpha *= out; k15X(ctx, x, K15GHOSTX[i], 72, k15e(t, a, 0.35)); ctx.restore();
  });
}
const K15GHOSTS = [[518, 402, 161.16, 'coins'], [746, 728, 162.16, 'goat'], [772, 318, 163.44, 'field']], K15GHOSTX = [362, 652, 340];

// ---------- camera ----------
const K15CAM = [
  [0, { x: 500, y: 600, zoom: 1.0 }], [3.3, { x: 500, y: 600, zoom: 1.0 }], [8, { x: 440, y: 640, zoom: 1.35 }], [11.1, { x: 440, y: 640, zoom: 1.35 }], [12.5, { x: 425, y: 665, zoom: 1.55 }],
  [15.2, { x: 425, y: 665, zoom: 1.55 }], [16.0, { x: 480, y: 620, zoom: 1.3 }], [20.74, { x: 480, y: 620, zoom: 1.3 }],
  [20.76, { x: 410, y: 640, zoom: 1.5 }], [24.1, { x: 400, y: 640, zoom: 1.5 }], [25.3, { x: 380, y: 520, zoom: 1.7 }], [26.3, { x: 380, y: 560, zoom: 1.7 }], [27.5, { x: 400, y: 620, zoom: 1.5 }],
  [32.9, { x: 400, y: 620, zoom: 1.5 }], [35, { x: 560, y: 540, zoom: 1.2 }], [42, { x: 560, y: 560, zoom: 1.2 }], [44, { x: 600, y: 540, zoom: 1.45 }],
  [57.6, { x: 600, y: 540, zoom: 1.45 }], [58.6, { x: 620, y: 540, zoom: 1.3 }], [59.4, { x: 420, y: 620, zoom: 1.6 }], [62.9, { x: 420, y: 620, zoom: 1.6 }],
  [64, { x: 600, y: 520, zoom: 1.5 }], [71, { x: 620, y: 520, zoom: 1.5 }], [73, { x: 620, y: 490, zoom: 1.45 }], [79.7, { x: 600, y: 500, zoom: 1.4 }],
  [80.74, { x: 600, y: 500, zoom: 1.4 }], [81.1, { x: 570, y: 490, zoom: 1.28 }], [81.54, { x: 570, y: 490, zoom: 1.28 }], [81.9, { x: 540, y: 540, zoom: 1.16 }], [82.7, { x: 540, y: 540, zoom: 1.16 }], [83.1, { x: 500, y: 600, zoom: 1.05 }],
  [84.15, { x: 500, y: 600, zoom: 1.05 }], [85.0, { x: 500, y: 560, zoom: 1.15 }], [99, { x: 530, y: 560, zoom: 1.15 }], [101.5, { x: 640, y: 480, zoom: 1.35 }], [103.4, { x: 640, y: 480, zoom: 1.35 }], [104.3, { x: 480, y: 580, zoom: 1.15 }],
  [104.6, { x: 480, y: 580, zoom: 1.15 }], [106, { x: 450, y: 580, zoom: 1.5 }], [111.1, { x: 450, y: 580, zoom: 1.5 }], [112.5, { x: 370, y: 690, zoom: 2.2 }], [116.1, { x: 370, y: 690, zoom: 2.2 }], [116.6, { x: 430, y: 780, zoom: 1.9 }],
  [118.4, { x: 430, y: 780, zoom: 1.9 }], [119.3, { x: 440, y: 600, zoom: 1.45 }], [125.6, { x: 440, y: 590, zoom: 1.45 }], [127.6, { x: 420, y: 540, zoom: 1.6 }],
  [133.9, { x: 420, y: 540, zoom: 1.6 }], [134.7, { x: 380, y: 520, zoom: 2.2 }], [139.43, { x: 380, y: 520, zoom: 2.2 }], [139.44, { x: 440, y: 600, zoom: 1.3 }], [141.3, { x: 440, y: 600, zoom: 1.3 }], [143.9, { x: 370, y: 680, zoom: 1.9 }],
  [145.6, { x: 370, y: 690, zoom: 1.9 }], [153.7, { x: 380, y: 700, zoom: 1.9 }], [155.3, { x: 420, y: 800, zoom: 1.8 }], [157.3, { x: 420, y: 800, zoom: 1.8 }], [158.0, { x: 420, y: 760, zoom: 1.9 }],
  [159.4, { x: 420, y: 760, zoom: 1.9 }], [160.6, { x: 500, y: 600, zoom: 1.15 }], [K15DUR, { x: 500, y: 600, zoom: 1.15 }],
];
const k15cam = (t) => { const c = K.camAt(K15CAM, t), z = c.zoom; return { x: K.clamp(c.x, 500 / z, K15W - 500 / z), y: K.clamp(c.y, 615 / z, K15H - 615 / z), zoom: z }; };
const k15P = (cam, x, y) => [500 + (x - cam.x) * cam.zoom, 615 + (y - cam.y) * cam.zoom];

// ---------- lettering ----------
function k15lbl(ctx, S, text, p, t, t0, t1, o = {}) {
  if (!k15in(t, t0, t1)) return; const x = K.clamp(p[0], 140, 860), y = K.clamp(p[1], 110, 1150);
  ctx.save(); ctx.globalAlpha *= 1 - k15e(t, t1 - 0.25, 0.25); S.label(ctx, text, x, y, K.clamp((t - t0) / 0.35), { size: 44, align: 'center', ...o }); ctx.restore();
}
function k15arrow(ctx, S, a, b, t, t0, t1, o = {}) { if (!k15in(t, t0, t1)) return; ctx.save(); ctx.globalAlpha *= 1 - k15e(t, t1 - 0.25, 0.25); S.arrow(ctx, a, b, K.beat(t, t0, 0.35, 'out'), { width: 20, bend: 0.12, ...o }); ctx.restore(); }
function k15word(ctx, text, p, t, t0, t1, size, o = {}) { if (!k15in(t, t0, t1)) return; ctx.save(); ctx.globalAlpha *= 1 - k15e(t, t1 - 0.2, 0.2); sfx(ctx, text, K.clamp(p[0], 150, 850), K.clamp(p[1], 110, 1150), size, K.clamp((t - t0) / 0.25), o); ctx.restore(); }
function k15overlays(ctx, t, cam, S, W) {
  const P = (x, y) => k15P(cam, x, y), J = W.J, jc = k15jarCentre(J), hd = W.A.hd;
  // S1
  k15lbl(ctx, S, 'A SMALL HOUSE', P(700, 140), t, 1.4, 2.5, { size: 46 }); k15arrow(ctx, S, P(640, 160), P(560, 205), t, 1.5, 2.5);
  if (t < 9) { const A = W.A.P, hl = k15L2W(A, [-34, -112]), hr = k15L2W(A, [34, -112]); k15lbl(ctx, S, 'GHEE', P(hl[0] - 40, hl[1] + 90), t, 7.06, 8.6, { fill: C.yellow }); k15lbl(ctx, S, 'HONEY', P(hr[0] + 50, hr[1] + 90), t, 7.64, 8.9, { fill: '#f4a64a' }); }
  k15lbl(ctx, S, 'CLAY JAR', P(jc[0] - 30, jc[1] - 230), t, 12.9, 14.6); k15arrow(ctx, S, P(jc[0] - 10, jc[1] - 205), P(jc[0] - 20, jc[1] - 90), t, 13.0, 14.6, { bend: -0.1 });
  if (k15in(t, 15.2, 17.4)) { const n = Math.min(30, 1 + Math.floor(29 * k15e(t, 15.3, 1.7, 'lin'))); ctx.save(); ctx.globalAlpha *= 1 - k15e(t, 17.15, 0.25); S.counter(ctx, n, 820, 210, K.clamp((t - 15.2) / 0.3), { size: 84 }); S.label(ctx, 'DAY', 820, 300, K.clamp((t - 15.3) / 0.3), { size: 40, align: 'center', fill: C.yellow }); ctx.restore(); }
  k15lbl(ctx, S, 'ALMOST FULL!', P(700, 560), t, 18.88, 20.3, { size: 54, fill: C.yellow }); k15arrow(ctx, S, P(620, 600), P(jc[0] + 30, jc[1] - 20), t, 18.95, 20.3, { bend: -0.2 });
  // S2: the plumb line from the jar to his head
  if (k15in(t, 25.3, 27.6)) { const a = k15JarPoint(J, 22, 146), b = [a[0], hd[1] - 60 * K15S + 6], u = k15e(t, 25.4, 1.3), e = k15lp(a, b, u); const pa = P(...a), pe = P(...e); ctx.save(); ctx.globalAlpha *= 1 - k15e(t, 27.3, 0.3); ctx.setLineDash([10, 12]); ctx.lineWidth = 6; ctx.strokeStyle = C.red; ctx.beginPath(); ctx.moveTo(pa[0], pa[1]); ctx.lineTo(pe[0], pe[1]); ctx.stroke(); ctx.setLineDash([]);
    if (u > 0.9) { ctx.fillStyle = C.red; ctx.beginPath(); ctx.moveTo(pe[0], pe[1] + 4); ctx.lineTo(pe[0] - 13, pe[1] - 16); ctx.lineTo(pe[0] + 13, pe[1] - 16); ctx.closePath(); ctx.fill(); } ctx.restore(); }
  if (k15in(t, 36.36, 37.9)) { const n = Math.round(100 * k15e(t, 36.4, 0.8, 'out')); ctx.save(); ctx.globalAlpha *= 1 - k15e(t, 37.65, 0.25); const q = P(830, 300); S.counter(ctx, n, Math.min(q[0], 870), Math.max(q[1], 170), K.clamp((t - 36.36) / 0.3), { size: 66 }); S.label(ctx, 'COINS', Math.min(q[0], 870), Math.max(q[1], 170) + 66, K.clamp((t - 36.5) / 0.3), { size: 36, align: 'center', fill: C.yellow }); ctx.restore(); }
  k15lbl(ctx, S, 'IN HIS HEAD', P(600, 640), t, 40.48, 41.65, { size: 42 }); k15arrow(ctx, S, P(600, 610), P(640, 560), t, 40.55, 41.65);
  // S3
  if (k15in(t, 43.8, 45.4)) k15arrow(ctx, S, P(...K15D2(580, 575)), P(...K15D2(745, 570)), t, 43.8, 45.4, { bend: -0.2, color: C.white });
  if (k15in(t, 51.32, 53.3)) { const n = t < 51.64 ? 3 : t < 52.22 ? 6 : 12; ctx.save(); ctx.globalAlpha *= 1 - k15e(t, 53.05, 0.25); const q = P(880, 260); S.counter(ctx, n, Math.min(q[0], 870), Math.max(q[1], 160), K.clamp((t - 51.32) / 0.3) * (1 + 0.15 * (pulse(t, 51.64, 0.2) + pulse(t, 52.22, 0.2))), { size: 70 }); S.label(ctx, 'GOATS', Math.min(q[0], 870), Math.max(q[1], 160) + 70, K.clamp((t - 51.4) / 0.3), { size: 36, align: 'center', fill: C.yellow }); ctx.restore(); }
  // S4
  if (k15in(t, 70.2, 71.6)) { const n = Math.round(K.lerp(100, 1000, k15e(t, 70.25, 0.6, 'out')) / 10) * 10; ctx.save(); ctx.globalAlpha *= 1 - k15e(t, 71.35, 0.25); const q = P(860, 300); S.counter(ctx, n, Math.min(q[0], 850), Math.max(q[1], 170), K.clamp((t - 70.2) / 0.3), { size: 64 }); ctx.restore(); }
  { const q = P(720, 240); k15word(ctx, 'RICH!', [q[0], Math.max(q[1], 140)], t, 79.28, 80.7, 96, { fill: C.yellow, rot: -0.08 }); }
  // S5
  k15lbl(ctx, S, 'THE PALACE', P(780, 280), t, 102.04, 103.5, { size: 44 }); k15arrow(ctx, S, P(800, 300), P(870, 380), t, 102.1, 103.5, { bend: 0.1 });
  // S6
  if (k15in(t, 109.18, 110.6)) { const q = P(470, 380); ctx.save(); ctx.globalAlpha *= 1 - k15e(t, 110.35, 0.25); S.label(ctx, 'NO!', q[0], q[1], K.clamp((t - 109.18) / 0.3), { size: 60, balloon: true, align: 'center' }); ctx.restore(); }
  k15lbl(ctx, S, 'NOT REAL', [745, 575], t, 114.92, 116.2, { size: 50, fill: C.red, color: C.white }); k15arrow(ctx, S, [822, 536], [852, 292], t, 113.5, 116.2, { bend: 0.15 });   // v2: clear of the border, pointing at the boy
  k15lbl(ctx, S, 'STICK', P(560, 790), t, 117.36, 118.45, { size: 48 }); k15arrow(ctx, S, P(560, 815), P(520, 870), t, 117.4, 118.45, { bend: -0.1 });
  // S7
  if (k15in(t, 128.0, 130.0)) { const st = W.A.ST; if (!st.floor) { const [, tp] = k15stickPts(st), bj = k15JarPoint(J, 62, 90); const a = P(...tp), b = P(...bj); ctx.save(); ctx.setLineDash([6, 8]); ctx.lineWidth = 4; ctx.strokeStyle = C.red; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); ctx.restore(); } }
  { const q = P(600, 690); k15word(ctx, 'SWISH!', q, t, 130.1, 130.95, 80, { fill: C.white, rot: 0.1 }); }
  k15lbl(ctx, S, 'IMAGINARY SON', P(500, 395), t, 131.98, 133.74, { size: 42 }); k15arrow(ctx, S, P(500, 420), P(503, 530), t, 132.0, 133.74, { bend: 0.1 });
  if (k15in(t, 135.56, 136.5)) { const q = P(jc[0] + 20, jc[1]); S.emphasis(ctx, q[0], q[1], 190, K.clamp((t - 135.56) / 0.35), { word: 'CRACK!', wx: 0.4, wy: 0.95 }); }
  { const jq = P(jc[0] - 66, jc[1]); k15lbl(ctx, S, 'REAL JAR', [190, jq[1] - 150], t, 136.94, 138.1, { size: 50, fill: C.yellow }); k15arrow(ctx, S, [210, jq[1] - 110], [jq[0] + 6, jq[1] - 10], t, 137.0, 138.1, { bend: -0.15 }); }   // v2: left of the jar, clear of the boy
  { const q = P(560, 300); k15word(ctx, 'SMASH!', q, t, 139.44, 140.6, 120, { fill: C.red, rot: -0.1 }); }
  { const q = P(hd[0] + 170, hd[1] - 110); k15word(ctx, 'SPLAT!', q, t, 144.04, 144.95, 96, { fill: C.yellow, rot: 0.12 }); }
  // S8
  k15lbl(ctx, S, 'DRIP', P(K15SEATX + 150, 860), t, 151.34, 152.9, { size: 40 });
  k15lbl(ctx, S, 'THE JAR', P(520, 760), t, 155.4, 157.25, { size: 46 }); k15arrow(ctx, S, P(500, 790), P(470, 870), t, 155.45, 157.25, { bend: 0.1 });
  if (k15in(t, 164.7, 165.9)) k15arrow(ctx, S, P(520, 380), P(K15HOOK[0] + 20, 380), t, 164.7, 165.9, { bend: -0.15 });
  if (t >= 168.2) S.title(ctx, 'THE END', 650, 230, K.beat(t, 168.2, 0.8, 'lin'), { size: 84, align: 'center' });
  // the white flash of the hit
  if (k15in(t, 135.56, 135.63)) { ctx.save(); ctx.globalAlpha = 0.8; ctx.fillStyle = C.white; ctx.fillRect(0, 0, K15W, K15H); ctx.restore(); }
}

// ---------- panel ----------
const K15SHAKE = (t) => K.spring(t, 135.56, 8, 9, 6) + K.spring(t, 139.44, 5, 10, 7) + K.spring(t, 144.04, 4, 10, 7) + K.spring(t, 80.74, 1.5, 12, 9);
const SCENE = {
  duration: K15DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196, sh = K15SHAKE(t);
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh * 0.8, py - sh * 0.5); ctx.scale(pw / K15W, ph / K15H);
    const cam = k15cam(t); ctx.save(); K.camera(ctx, K15W, K15H, cam); const Wd = k15drawWorld(ctx, t); ctx.restore();
    k15overlays(ctx, t, cam, S, Wd);
    if (k15in(t, 19.95, 21.55)) S.transition(ctx, K15W, K15H, (t - 19.95) / 1.6, { caption: 'ONE EVENING...' });
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // quiet effects only in the narration pauses (master 0.6 at render)
    k.play('pop', 2.9, { gain: 0.3 });                          // door (pause 2.52-3.57)
    k.play('chime', 14.9, { note: 'C6', gain: 0.3 });           // the pour settles (14.70-15.46)
    k.play('thud', 22.5, { gain: 0.25 });                       // sits (22.28-22.86)
    k.play('tick', 27.7, { gain: 0.3 });                        // drip (27.49-28.13)
    k.play('pop', 41.65, { gain: 0.3 });                        // cloud grows (41.30-42.50)
    k.play('chime', 62.4, { note: 'A5', gain: 0.3 });           // dream goes on (61.90-63.23)
    k.play('pop', 84.15, { gain: 0.3 });                        // new lobe (83.55-84.91)
    k.play('whoosh', 133.95, { dur: 0.3, gain: 0.3 });          // the upswing (133.74-134.42)
    k.play('thud', 139.38, { gain: 0.3 }); k.play('tick', 139.4, { gain: 0.25 });   // short crash (139.31-139.82)
    k.play('tick', 153.4, { gain: 0.3 });                       // drip (153.04-154.16)
    k.play('thud', 159.7, { gain: 0.3 });                       // the stick drops (159.30-160.28)
    k.play('chime', 168.0, { note: 'C6', gain: 0.4 });          // THE END (after the last word)
  },
};
window.SCENE = SCENE;
