// ===== KD-005 scenes S1-S7 (home tree): the nest, the snake, grief, the jackal, the peck plan, the warning, the whisper =====
const k5Flip = (t, tf, d0, d1, dur = 0.2) => ({ dir: t < tf ? d0 : d1, sq: 1 - 0.22 * pulse(t, tf - dur / 2, dur) });
const k5Talk = (t, list, k = 1) => talk(t, list) * k;
const K5_NEST = K5_HOME.nest, K5_EGGX = [-32, 0, 32];
// chick acting helper: positions of the three chicks / eggs in world space
const k5ChickW = (i) => [K5_NEST[0] + K5_EGGX[i], K5_NEST[1] - 49];

// ---------------- S1 0-7.3: establishing, crane up, the raven lands, THE NEST ----------------
const K5S1 = { a: 0, ww: 1000, cam: [[0, { x: 700, y: 800, zoom: 1.6 }], [1.3, { x: 700, y: 800, zoom: 1.6 }], [4.0, { x: 520, y: 360, zoom: 1.9 }], [7.3, { x: 520, y: 360, zoom: 1.9 }]],
  rv(t) {
    const P = { x: 425, y: 346, dir: 1, seed: 3 };
    if (t < 3.3) { const u = k5u(t, 2.55, 3.3), b = K.bezier([1010, 120], [760, 90], [520, 200], [425, 346], 30), q = b[Math.round(u * 30)];
      Object.assign(P, { x: q[0], y: q[1], fly: true, flap: Math.sin(t * 16) * (u < 0.8 ? 1 : 0.3) - (u > 0.8 ? 0.8 : 0), sq: u > 0.75 ? 1.1 : 1, tailDrop: u > 0.8 ? 0.5 : 0 }); if (t < 2.55) P.x = 2000; return P; }
    P.sq = landSquash(t, 3.3, 0.18) * breathe(t, 3); P.tailDrop = 0.6 * Math.exp(-(t - 3.3) * 5);
    P.gaze = lookAt(k5HeadPos(P), gazePlan(t, [[3.3, [520, 300]], [4.4, k5ChickW(0)], [4.7, k5ChickW(1)], [5.0, k5ChickW(2)]], 0.08)); P.headRot = t > 4.3 && t < 5.3 ? -0.2 : 0;
    if (t >= 5.3) { const [hx, hy] = hop(t, 5.3, 0.45, 425, 468, 24); P.x = hx; P.y = K.lerp(346, 318, k5u(t, 5.3, 5.75)) - hy; P.sq = landSquash(t, 5.75, 0.14) * (t > 5.75 ? 0.92 + 0.02 * Math.sin(t * 20) * Math.exp(-(t - 5.75) * 4) : 1); P.lid = Math.max(t > 5.8 ? 0.4 : 0, blink(t, 3)); P.gaze = [0.8, 0.3]; }
    if (t >= 6.6) { P.eyes = 'wide'; P.lid = 0; P.gaze = [0.9, 0.9]; P.sag = blend(t, 6.6, 6.85, 0, -0.6); P.drop = 4; P.sq = settleTo(t, 6.6, 0.92, 1.04); }
    return P;
  },
  draw(ctx, t) {
    k5Home(ctx, t);
    k5Burrow(ctx, ...K5_HOME.burrow, {});
    if (t < 1.4) { const x = K.lerp(250, 1150, t / 1.3); bird(ctx, { kind: 'crow', x, y: 470 + Math.sin(t * 3) * 8, s: 0.6, fly: true, flap: Math.sin(t * 12) });
      halftoneShadow(ctx, 860 + (t - 0.9) * 700, 906, 46, 0.35);
      const lx = K.lerp(720, 960, k5u(t, 0.3, 1.3)); ctx.save(); ctx.translate(lx, 893 - Math.abs(Math.sin(t * 9)) * 6); ctx.rotate(t * 7); shape(ctx, ell(0, 0, 11, 5, 10), '#c9952a', { lw: 3, seed: 4 }); ctx.restore(); }
    nestDraw(ctx, ...K5_NEST, { t, eggs: 3 });
    if (t > 6.6) { const a = Math.sin((t - 6.6) * 26) * 0.3 * Math.exp(-(t - 6.6) * 2.5), [ex, ey] = [K5_NEST[0] + 32, K5_NEST[1] - 43]; ctx.save(); ctx.translate(ex, ey + 19); ctx.rotate(a); shape(ctx, ell(0, -19, 15, 19, 16), C.white, { lw: 4, seed: 7, dot: C.skin, pitch: 6, rad: 0.2, da: 0.5 }); ctx.restore(); }
    const P = this.rv(t); k5Raven(ctx, P, t); if (t >= 5.3) k5NestFront(ctx, ...K5_NEST);
  },
  over(ctx, t, cam, S) {
    if (t >= 4.24 && t < 7.3) { const [nx, ny] = k5P(K5_NEST[0] + 20, K5_NEST[1] - 50, cam); S.label(ctx, 'THE NEST', nx + 150, ny - 210, K5_B(t, 4.3, 0.4), { align: 'center', size: 46 }); S.arrow(ctx, [nx + 140, ny - 175], [nx + 60, ny - 50], K5_B(t, 4.5, 0.4, 'out'), { width: 18 }); }
  } };

// ---------------- S2 7.3-18.0: hatching, CHICKS 3, father leaves, the snake comes out and climbs, whip to the sky ----------------
const K5_HATCH = [8.2, 8.6, 9.0], K5_CRACK = [7.6, 7.95, 8.3], K5_SNL = 320;
const K5S2 = { a: 7.3, ww: 1000, ymin: -900, cam: [[7.3, { x: 510, y: 350, zoom: 2.2 }], [10.29, { x: 510, y: 350, zoom: 2.2 }], [10.3, { x: 820, y: 830, zoom: 2.0 }], [12.8, { x: 820, y: 830, zoom: 2.0 }], [14.4, { x: 650, y: 760, zoom: 1.25 }], [16.3, { x: 530, y: 430, zoom: 1.6 }], [16.97, { x: 530, y: 420, zoom: 1.6 }], [17.1, { x: 500, y: -330, zoom: 1.6 }], [18, { x: 500, y: -330, zoom: 1.6 }]],
  hs(t) { return kfn(t, [[11.36, 0], [12.7, 46], [14.4, 300], [15.2, 600], [15.55, 620], [16.36, K5_CLIMB.len]], 'lin'); },
  rv(t) {
    const P = { x: 468, y: 318, dir: 1, seed: 3 };
    if (t < 7.6) { P.lid = 0.4; return P; }
    const [hx, hy] = hop(t, 7.6, 0.35, 468, 425, 18); P.x = hx; P.y = K.lerp(318, 346, k5u(t, 7.6, 7.95)) - hy; P.tip = -0.08 * (t < 8.6 ? 1 : 0); P.eyes = t < 8.6 ? 'wide' : 'open'; P.sq = landSquash(t, 7.95, 0.12);
    P.gaze = lookAt(k5HeadPos(P), gazePlan(t, [[7.6, k5ChickW(0)], [8.25, k5ChickW(0)], [8.65, k5ChickW(1)], [9.05, k5ChickW(2)], [9.35, k5ChickW(0)], [9.65, [400, 100]]], 0.08));
    if (t >= 8.6) { P.sq = settleTo(t, 8.6, 1, 1.08, 0.3, 0.12) * (t > 9.2 ? 1 : 1); P.beak = 0.45 + 0.1 * Math.sin(t * 9); P.drop = -2 * Math.abs(Math.sin(t * 8)) * (t < 9.6 ? 1 : 0); }
    if (t >= 9.6) { P.sq = anticipate(t, 9.6, 0.22, 0.14); P.beak = 0; }
    if (t >= 9.82) { const u = k5u(t, 9.82, 10.3), b = K.bezier([425, 346], [380, 250], [300, 170], [180, -60], 24), q = b[Math.round(u * 24)]; Object.assign(P, { x: q[0], y: q[1], fly: true, flap: Math.sin(t * 18), sq: 1.12, dir: -1, rot: 0.3 }); }
    return P;
  },
  ck(t) { // chick acting array
    return [0, 1, 2].map((i) => { const h = K5_HATCH[i]; if (t < h) return null; const k = { bob: Math.max(0, Math.sin((t - h) * 10)) * 3 * Math.exp(-(t - h) * 2) };
      k.gx = i === 2 && t < 9.3 ? 1 : -0.8; k.gy = -0.3; if (t > 9.6) { k.gx = -1; k.gy = -1; }
      if ((t > 9.0 && t < 10.2) || (t > 13.0 && t < 16.4)) k.open = Math.max(0, Math.sin(t * 9 + i * 2.1)) * 0.9;
      if (t > 13.0 && t < 16.36) { k.gx = 0.3; k.gy = -1; }
      if (t >= 16.36 + i * 0.12) { k.open = 0; k.wide = true; k.gx = -0.6; k.gy = -1; k.cw = blend(t, 16.36 + i * 0.12, 16.7 + i * 0.12, 0, 1); }
      return k; });
  },
  draw(ctx, t) {
    const hs = this.hs(t), on = t >= 11.36, body = on ? K5_CLIMB.slice(hs - K5_SNL, hs, 7, (s) => (s < 270 ? 5 * Math.sin(s / 38) : 0)) : [];
    const runs = k5Runs(body), last = runs.length - 1, sn = (r, i) => k5Snake(ctx, r.p, { head: i === last && hs > 6, lid: 0.35, tongue: pulse(t, 11.7, 0.25) + pulse(t, 12.15, 0.25) + pulse(t, 15.3, 0.3) + pulse(t, 16.5, 0.3), mouth: t > 16.4 ? 0.25 : 0, gaze: [0.4, -1] });
    const nearNest = t > 15.9;
    k5Home(ctx, t, { behind: () => runs.forEach((r, i) => r.f && sn(r, i)) });
    const eyesOpen = Math.max(K5_B(t, 10.42, 0.2), K5_B(t, 10.62, 0.2) * 0.999); k5Burrow(ctx, ...K5_HOME.burrow, { eyes: t < 11.4 ? { open: t >= 10.42 ? eyesOpen : 0, look: [-0.2, -kfn(t, [[10.6, 0], [11.2, 1]])] } : null });
    if (!nearNest) runs.forEach((r, i) => !r.f && sn(r, i));
    if (on) k5BurrowShade(ctx, ...K5_HOME.burrow);
    // bark flakes under the climbing head
    if (t > 14.4 && t < 16.6) for (let i = 0; i < 4; i++) { const t0 = 14.5 + i * 0.45; if (t < t0) continue; const p0 = K5_CLIMB.at(this.hs(t0)), y = fallY(t, t0, t0 + 1.1, p0[1], p0[1] + 300); if (t < t0 + 1.1) shape(ctx, [[p0[0] - 4 + (t - t0) * 20, y], [p0[0] + 4 + (t - t0) * 20, y - 3], [p0[0] + 3 + (t - t0) * 20, y + 4]], WOOD, { lw: 2, seed: i }); }
    if (nearNest) runs.forEach((r, i) => !r.f && sn(r, i));
    const ch = K5_HATCH.filter((h) => t >= h).length;
    nestDraw(ctx, ...K5_NEST, { t, eggs: 3, chicks: ch, ck: this.ck(t) });
    for (let i = 0; i < 3; i++) { const [ex, ey] = [K5_NEST[0] + K5_EGGX[i], K5_NEST[1] - 43]; if (t < K5_HATCH[i]) k5Crack(ctx, ex, ey, k5u(t, K5_CRACK[i], K5_CRACK[i] + 0.3));
      else { const u = k5u(t, K5_HATCH[i], K5_HATCH[i] + 0.6); k5Shell(ctx, ex + (i - 1) * 30 * u + 14 * u, ey - 16 - 40 * Math.sin(Math.PI * u) + 34 * u, u * 5 * (i % 2 ? -1 : 1), 0.8); } }
    if (t > 16.36 && t < 17.1) { ctx.save(); ctx.globalAlpha = 0.35 * K5_B(t, 16.36, 0.3); halftoneShadow(ctx, K5_NEST[0] + 10, K5_NEST[1] - 50, 70, 1); ctx.restore(); }
    if (t < 10.3) { const P = this.rv(t); k5Raven(ctx, P, t); if (t < 7.6) k5NestFront(ctx, ...K5_NEST); }
    // down drifting up into the empty sky
    if (t > 17.4) for (let i = 0; i < 3; i++) feather(ctx, t, { t0: 17.45 + i * 0.12, t1: 19, a: [430 + i * 60, -40], b: [470 + i * 50, -520], col: '#9a9aa8' });
  },
  over(ctx, t, cam, S) {
    if (t > 8.95 && t < 9.9) { const [x, y] = k5P(K5_NEST[0] + 40, K5_NEST[1] - 110, cam); sfx(ctx, 'CHEEP!', x + 120, y - 60, 58, K5_B(t, 9.0, 0.25), { rot: 0.12 }); }
    if (t >= 9.2 && t < 10.3) { S.label(ctx, 'CHICKS', 170, 150, K5_B(t, 9.2, 0.3), { align: 'center', size: 40 }); S.counter(ctx, t < 9.4 ? 1 : t < 9.6 ? 2 : 3, 170, 290, K5_B(t, 9.2, 0.3), { size: 90 }); }
    if (t >= 11.9 && t < 12.9) { const hp = K5_CLIMB.at(this.hs(t)), [x, y] = k5P(hp[0], hp[1], cam); S.label(ctx, 'THE SNAKE', x - 210, y - 260, K5_B(t, 11.9, 0.35), { align: 'center', size: 46 }); S.arrow(ctx, [x - 200, y - 220], [x - 40, y - 50], K5_B(t, 12.05, 0.35, 'out'), { width: 18 }); }
    if (t > 16.97 && t < 17.12) { ctx.save(); ctx.globalAlpha = 0.7; ctx.strokeStyle = C.white; ctx.lineWidth = 10; for (let i = 0; i < 9; i++) { const x = 80 + i * 110; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + 20, 1230); ctx.stroke(); } ctx.restore(); }
    if (t >= 17.5) { S.label(ctx, 'CHICKS', 170, 150, K5_B(t, 17.5, 0.3), { align: 'center', size: 40 }); S.counter(ctx, 0, 170, 290, K5_B(t, 17.55, 0.3), { size: 90, color: C.red }); sfx(ctx, 'GULP!', 560, 760, 70, K5_B(t, 17.6, 0.3), { rot: -0.08 }); }
  } };

// ---------------- S3 18.0-23.3: the worm falls, grief, helpless looks, the tail slides into the burrow ----------------
const K5S3 = { a: 18.0, ww: 1000, cam: [[18, { x: 510, y: 350, zoom: 2.2 }], [20.6, { x: 510, y: 350, zoom: 2.2 }], [23.3, { x: 540, y: 560, zoom: 1.15 }]],
  rv(t) {
    const P = { x: 425, y: 346, dir: 1, seed: 3 };
    if (t < 18.4) { const u = k5u(t, 18.0, 18.4), b = K.bezier([200, 220], [300, 220], [380, 280], [425, 346], 20), q = b[Math.round(u * 20)]; return { ...P, x: q[0], y: q[1], fly: true, flap: Math.sin(t * 16) * 0.5 - 0.5, worm: true, beak: 0.15, sq: 1.08 }; }
    P.sq = landSquash(t, 18.4, 0.16); P.worm = t < 19.1; P.beak = t < 18.9 ? 0.15 : blend(t, 18.9, 19.3, 0.15, 1.3);
    P.gaze = lookAt(k5HeadPos(P), gazePlan(t, [[18.4, k5ChickW(0)], [18.55, k5ChickW(1)], [18.7, k5ChickW(2)], [19.0, [K5_NEST[0], K5_NEST[1] - 30]]], 0.07)); P.lid = 0;
    if (t >= 19.8) { const g = K5_B(t, 19.8, 0.6, 'inOut'); P.sag = -0.6 * g; P.drop = 8 * g; P.wet = true; P.lid = Math.max(0.35 * g, pulse(t, 20.1, 0.5)); P.sq = 1 - 0.08 * g; P.beak = K.lerp(1.3, 0.2, g); P.tailDrop = -0.4 * g; }
    if (t >= 20.6) { P.gaze = gazePlan(t, [[20.6, [-1, -0.1]], [20.95, [1, -0.1]], [21.3, [0, -1]]], 0.2); P.headRot = gazePlan(t, [[20.6, [-0.3, 0]], [20.95, [0.2, 0]], [21.3, [-0.1, 0]]], 0.25)[0]; }
    if (t >= 21.6) { const g = K5_B(t, 21.6, 0.5, 'inOut'); P.sag = K.lerp(-0.6, 0.7, g); P.tip = 0.1 * g; P.headRot = 0.25 * g; P.gaze = lookAt(k5HeadPos(P), K5_HOME.burrow); }
    return P;
  },
  draw(ctx, t) {
    const hs = kfn(t, [[22.1, K5_HOMEIN.len + 160], [23.3, K5_HOMEIN.len + K5_SNL + 5]], 'lin'), body = t > 22.0 ? K5_HOMEIN.slice(hs - K5_SNL, hs, 7, (s) => 4 * Math.sin(s / 34)) : [];
    k5Home(ctx, t); k5Burrow(ctx, ...K5_HOME.burrow, {}); if (body.length) { k5Snake(ctx, body, { head: false }); k5BurrowShade(ctx, ...K5_HOME.burrow); }
    nestDraw(ctx, ...K5_NEST, { t, eggs: 0 }); [[-30, -46, 0.4], [4, -52, -0.3], [34, -44, 0.9]].forEach(([dx, dy, r]) => k5Shell(ctx, K5_NEST[0] + dx, K5_NEST[1] + dy, r, 0.85));
    const P = this.rv(t); k5Raven(ctx, P, t);
    if (t > 19.1) { const g = k5Grip({ ...P, worm: false }, 64), y = fallY(t, 19.1, 19.9, g[1], 940); if (y < 935) worm(ctx, g[0] + 10, y, t); }
  },
  over() {} };

// ---------------- the jackal at home (S4-S7) ----------------
const K5_JX = (t) => kfn(t, [[24.3, -260], [25.52, 140], [30.0, 140], [30.9, 200]], 'out');
const K5_JFALLS = footfalls(K5_JX, 24.3, 31.0, 26 * 0.8);
function k5JackalP(t) {
  const P = { y: K5_GR, s: 0.8, dir: 1, seed: 7, ...walk(K5_JX, t, { stride: 26 * 0.8, amp: 60 }), tailUp: 0.5 + 0.1 * Math.sin(t * 4) };
  P.gaze = [1, -0.3];
  if (t >= 25.5) { P.raise = t < 26.4 ? K5_B(t, 25.5, 0.12) : blend(t, 26.4, 26.7, 1, 0); P.ears = blend(t, 25.5, 25.6, 0.3, 0); P.headUp = blend(t, 25.6, 25.8, 0, -0.12); P.gaze = lookAt([P.x + 74, 798], [446, 640]); P.tailUp = 0.5; }
  if (t >= 26.4) { P.tailUp = 0.6 + 0.25 * Math.sin((t - 26.4) * 16) * (t < 27.2 ? 1 : 0); P.mouth = t < 26.9 ? 'smile' : 'closed'; P.ears = t > 26.9 ? 0.25 : 0; }
  if (t >= 29.2) { P.gaze = gazePlan(t, [[29.2, [0.3, -1]], [29.65, lookAt([300, 798], [446, 640])]], 0.15); P.ears = 0.3; }
  if (t >= 30.9) { P.sit = settleTo(t, 30.9, 0, 0.4, 0.45, 0.1); P.plant = true; P.headUp = -0.08; }
  if (t >= 31.5) { P.talk = k5Talk(t, [[31.5, 32.9]], 0.7); P.headUp = -0.16; P.raise = 0; P.gaze = lookAt([300, 780], [440, 630]); P.ears = 0.15; }
  if (t >= 33.5) { P.sit = 0.4; P.talk = 0; P.headUp = -0.12; P.gaze = lookAt([300, 780], [420, 610]); }
  return P;
}

// ---------------- S4 23.3-33.5: alone on the low branch; the jackal trots in, sits, asks ----------------
const K5S4 = { a: 23.3, ww: 1000, cam: [[23.3, { x: 420, y: 700, zoom: 1.3 }], [29.8, { x: 420, y: 700, zoom: 1.3 }], [30.8, { x: 385, y: 718, zoom: 1.9 }], [33.5, { x: 385, y: 718, zoom: 1.9 }]],
  rv(t) {
    const f = k5Flip(t, 33.1, 1, -1, 0.3), br = breathe(t, 3, 0.02), sigh = pulse(t, 28.2, 1.0);
    const P = { x: 438, y: 686, dir: f.dir, seed: 3, sq: (0.9 - 0.04 * sigh) * br * f.sq, drop: 8 + 6 * sigh, sag: -0.45, tailDrop: -0.3, lid: Math.max(0.5, blink(t, 3)), gaze: [0.8, 0.5] };
    if (t > 32.7) { P.lid = Math.max(0.3, blink(t, 3)); P.wet = true; P.drop = 4; }
    if (t > 33.1) P.gaze = lookAt(k5HeadPos(P), [300, 780]);
    return P;
  },
  draw(ctx, t) {
    k5Home(ctx, t); k5Burrow(ctx, ...K5_HOME.burrow, {});
    const J = k5JackalP(t); k5Jackal(ctx, J);
    for (const f of K5_JFALLS) if (f.t < 25.6) dustBurst(ctx, f.x + (f.odd ? 30 : -30), K5_GR - 4, t - f.t, 3, 5, 10, 22, 0.45, Math.round(f.t * 10));
    k5Raven(ctx, this.rv(t), t);
    if (t > 23.5 && t < 25.6) { const u = k5u(t, 23.5, 25.6); ctx.save(); ctx.translate(480 + Math.sin(u * 9) * 30, K.lerp(600, 900, u)); ctx.rotate(Math.sin(u * 9) * 0.6); shape(ctx, ell(0, 0, 13, 6, 12), GREEN, { lw: 3, seed: 6 }); ctx.restore(); }
  },
  over(ctx, t, cam, S) {
    if (t >= 27.2 && t < 29.4) { const J = k5JackalP(t), [x, y] = k5P(J.x, J.y - 190, cam); S.label(ctx, 'JACKAL', x - 30, y - 120, K5_B(t, 27.2, 0.35), { align: 'center', size: 46 }); S.arrow(ctx, [x - 30, y - 90], [x - 10, y + 10], K5_B(t, 27.4, 0.35, 'out'), { width: 18 }); }
  } };

// ---------------- the thought cloud of S5/S6: the snake asleep, the mini raven dives, the replay strikes ----------------
const K5_CLOUD = [680, 500, 450, 280];
const K5_DIVE = [[470, 400], [560, 370], [650, 430], [712, 520]];
function k5CoilPts(cx, cy, strike = 0, tgt = [0, 0]) {
  const pts = [], n = 54; for (let i = 0; i <= n; i++) { const f = i / n, th = f * 3.6 * Math.PI, r = 78 - 46 * f; pts.push([cx + r * Math.cos(th + 1), cy + 0.42 * r * Math.sin(th + 1) - f * 26, f]); }
  const head = [[cx - 2, cy - 44, 1.02], [cx + 18, cy - 50, 1.04]]; const all = pts.concat(head).map(([x, y, u]) => [x, y, Math.min(1, u)]);
  if (strike <= 0) return all; const k0 = Math.round(all.length * 0.55), base = all[k0];
  return all.map((p, i) => { if (i < k0) return p; const f = (i - k0) / (all.length - 1 - k0), line = [K.lerp(base[0], tgt[0], f), K.lerp(base[1], tgt[1], f)]; return [K.lerp(p[0], line[0], strike), K.lerp(p[1], line[1], strike), p[2]]; });
}
function k5CloudInside(ctx, t) {
  const red = K5_B(t, 49.5, 0.3); if (red > 0) { ctx.save(); ctx.globalAlpha = red; ctx.fillStyle = '#ffd9d0'; ctx.fillRect(400, 300, 620, 420); ctx.fillStyle = dotPat(ctx, C.red, 12, 0.32); ctx.fillRect(400, 300, 620, 420); ctx.restore(); }
  ctx.fillStyle = GREEN; ctx.fillRect(400, 585, 620, 140); ctx.fillStyle = C.black; ctx.fillRect(400, 583, 620, 5);
  const sx = 760, sy = 590, st = t >= 48.74 ? K5_B(t, 48.74, 0.1) : 0, fz = K.bezier(...K5_DIVE, 20)[Math.round(K.ease.in(1) * 0.62 * 20)], tgt = [fz[0] + 10, fz[1] + 10];
  const lid = t < 48.08 ? 1 : blend(t, 48.08, 48.3, 1, 0.15);
  k5Snake(ctx, k5CoilPts(sx, sy, st, tgt), { w: 20, lid, mouth: st > 0.5 ? 1 : 0, gaze: [-1, -0.4] });
  if (t < 46.54 && t > 38.9 && t < 44.0) zzz(ctx, sx + 40, sy - 70, t, 0);
  // the mini raven: S5 dive (41.4-42.6), S6 replay dive (44.4-46.54, frozen), jolt at the strike
  let P = null;
  if (t >= 41.4 && t < 44.0) { const u = K.ease.in(k5u(t, 41.4, 42.4)), b = K.bezier(...K5_DIVE, 20), q = b[Math.round(u * 20)]; P = { x: q[0], y: q[1], s: 0.6, fly: true, flap: Math.sin(t * 20), rot: 0.5 * u, brow: 1, beak: t > 42.3 ? 0.6 : 0 }; if (t > 42.4) Object.assign(P, { y: q[1] - Math.abs(Math.sin((t - 42.4) * 12)) * 8, rot: 0.6 }); }
  if (t >= 44.0 && t < 49.5) { const u = K.ease.in(k5u(t, 44.4, 46.54)) * 0.62, b = K.bezier(...K5_DIVE, 20), q = b[Math.round(u * 20)]; P = { x: q[0], y: q[1], s: 0.6, fly: true, flap: t < 46.54 ? Math.sin(t * 20) : 0.6, rot: 0.4, brow: 1 };
    if (t >= 48.74) { const j = K5_B(t, 48.74, 0.12); P.x -= 50 * j; P.y -= 20 * j; P.rot = -0.6 * j; P.eyes = 'wide'; P.brow = 0; P.flap = -0.9; } }
  if (P) k5Raven(ctx, { ...P, kind: 'crow' }, t);
}
function k5Cloud(ctx, t, tail) {
  const p = t < 44 ? K5_B(t, 38.3, 0.7) : t < 50.9 ? 1 : 1 - K5_B(t, 50.9, 0.4); if (p <= 0) return;
  const [x, y, w, h] = K5_CLOUD; thoughtCloud(ctx, x, y, w, h, t, { p, tail, scale: 1, at: [x, y], inside: (c) => k5CloudInside(c, t), seed: 5 });
}

// ---------------- S5 33.5-44.0: "that snake", a tear, the peck plan in a thought cloud ----------------
const K5S5 = { a: 33.5, ww: 1000, cam: [[33.5, { x: 385, y: 718, zoom: 1.9 }], [35.2, { x: 385, y: 718, zoom: 1.9 }], [35.6, { x: 610, y: 790, zoom: 1.35 }], [36.0, { x: 610, y: 790, zoom: 1.35 }], [36.4, { x: 385, y: 718, zoom: 1.9 }], [38.3, { x: 385, y: 718, zoom: 1.9 }], [39.3, { x: 555, y: 640, zoom: 1.45 }], [44, { x: 555, y: 640, zoom: 1.45 }]],
  rv(t) {
    const f1 = k5Flip(t, 35.15, -1, 1, 0.16), f2 = k5Flip(t, 36.35, 1, -1, 0.2), dir = t < 35.8 ? f1.dir : f2.dir;
    const P = { x: 438, y: 686, dir, seed: 3, sq: f1.sq * f2.sq * breathe(t, 3), wet: true, gaze: lookAt([400, 610], [300, 780]) };
    P.sq *= blend(t, 33.7, 34.1, 0.92, 1); P.beak = k5Talk(t, [[34.04, 35.0], [35.18, 38.2], [38.34, 41.0], [42.72, 44.0]], 0.9);
    if (t >= 35.15 && t < 36.35) { P.sag = -0.8 * K5_B(t, 35.2, 0.1); P.gaze = lookAt(k5HeadPos(P), K5_HOME.burrow); P.brow = 1; P.tip = 0.06; }
    if (t >= 36.4) { P.gaze = [0.25, -1]; P.drop = 6 * K5_B(t, 36.4, 0.3); P.lid = Math.max(blink(t, 3), pulse(t, 37.12, 0.7)); P.sag = -0.25; }
    if (t >= 38.3) { const g = K5_B(t, 38.3, 0.3); P.brow = 1; P.lid = Math.max(0.4 * g, blink(t, 3)); P.tip = 0.08 * g; P.drop = 0; P.sag = 0; P.wet = false; P.gaze = lookAt(k5HeadPos(P), [K5_CLOUD[0], K5_CLOUD[1]]); }
    if (t >= 40.0 && t < 41.3) { P.lid = t < 40.5 ? 1 : 0.4; P.sq = t < 40.5 ? 1 : 0.85; P.drop = t < 40.5 ? 4 : 10; P.x = K.lerp(438, 428, k5u(t, 40.5, 41.1)); P.gaze = [-1, 0.2]; }
    if (t >= 41.3) { const j = pulse(t, 41.32, 0.2) + pulse(t, 41.92, 0.2); P.x = 428; P.drop = 10 + 14 * j; P.headRot = 0.45 * j; P.sq = 0.9; P.brow = 1; P.gaze = [-1, 0.4]; }
    if (t >= 42.7) { P.sq = settleTo(t, 42.7, 0.9, 1.1, 0.35, 0.1); P.sag = t < 43.1 ? -0.9 * pulse(t, 42.7, 0.4) : 0; P.headRot = -0.2; P.drop = -2; P.lid = Math.max(0.3, blink(t, 3)); P.brow = 0; P.beak = Math.max(P.beak, 0.2); }
    return P;
  },
  jk(t) { const P = k5JackalP(33.6); P.talk = 0; P.gaze = lookAt([300, 780], [440, 630]); P.lid = null;
    if (t >= 35.6 && t < 36.4) { P.gaze = lookAt([300, 780], K5_HOME.burrow); P.ears = 0.6; }
    if (t >= 37.12 && t < 38.3) P.ears = 0.5;
    if (t >= 38.4) P.gaze = lookAt([300, 780], [K5_CLOUD[0], K5_CLOUD[1]]);
    if (t >= 43.3) { P.eyes = 'wide'; P.ears = 1; P.x -= 6 * K5_B(t, 43.3, 0.15); P.headUp = -0.18; P.lid = Math.max(pulse(t, 43.5, 0.12), pulse(t, 43.7, 0.12)); }
    return P; },
  draw(ctx, t) {
    k5Home(ctx, t); k5Burrow(ctx, ...K5_HOME.burrow, {}); k5Jackal(ctx, this.jk(t)); const P = this.rv(t); k5Raven(ctx, P, t);
    if (t > 36.8 && t < 38.6) teardrops(ctx, t, 36.9, 38.0, () => { const h = k5HeadPos(P); return [h[0] - 8, h[1] + 2]; }, { groundY: 890, rate: 2, vx: 10 });
    k5Cloud(ctx, t, k5HeadPos(P));
  },
  over(ctx, t, cam, S) {
    if (t >= 41.4 && t < 43.0) { const [x, y] = k5P(K5_CLOUD[0] - 120, K5_CLOUD[1] - 160, cam); sfx(ctx, 'PECK!', x, y, 66, K5_B(t, 41.4, 0.25), { rot: -0.12 }); }
  } };
