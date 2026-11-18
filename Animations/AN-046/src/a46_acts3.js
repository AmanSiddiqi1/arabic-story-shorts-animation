// ===== AN-046 acts 3: S9-S10 caution and memory, S11-S13 the fight and the throw, S14-S16 capture, the cage, the ending =====

// ---------------------------------------------------------------- S9 glade 84.4-99.2: he stays, and keeps his distance
const A46_S9 = { land: 84.9, pat: 85.5, hop1: 87.3, hop2: 87.7, scan: 89.66, creep: 91.18, off: 92.96, x: 93.82, flinch: 95.04, bush: 96.6, far: 97.68, night: 98.62 };
const A46_ARC = [[A46_LOOK[0] + 20, A46_LOOK[1]], [600, 300], [760, 250], [940, 290], [1150, 420], [1330, 640], [A46_FAR - 70, 760]];
const a46arcAt = (u) => { const q = K.trim(A46_ARC, K.clamp(u)); return q[q.length - 1]; };
function a46s9Sp(t) {
  const P = a46sp({ seed: 7, badge: true, x: A46_NEST[0] - 6, y: A46_NEST[1] - 26, dir: -1 });
  if (t < A46_S9.land) { Object.assign(P, a46fly(t, [[84.4, 760, 380], [A46_S9.land, A46_NEST[0] - 6, A46_NEST[1] - 26]], { hz: 8, arc: -20 })); P.dir = -1; }
  else if (t < A46_S9.hop1) { P.sq = landSquash(t, A46_S9.land, 0.2); P.dir = t < 86.0 ? -1 : 1; }
  else if (t < A46_S9.off) { const h1 = hop(t, A46_S9.hop1, 0.3, A46_NEST[0] - 6, 360, 24), h2 = hop(t, A46_S9.hop2, 0.3, 360, A46_LOOK[0] - 4, 24); P.dir = 1;
    if (t < A46_S9.hop2) { P.x = h1[0]; P.y = K.lerp(A46_NEST[1] - 26, 528, a46e(t, A46_S9.hop1, 0.3)) - h1[1]; } else { P.x = h2[0]; P.y = K.lerp(528, A46_LOOK[1], a46e(t, A46_S9.hop2, 0.3)) - h2[1]; }
    if (t >= A46_S9.creep) { P.x = K.lerp(A46_LOOK[0] - 4, A46_LOOK[0] + 14, a46e(t, A46_S9.creep, 1.0)); P.sq = 0.88 + 0.06 * Math.abs(Math.sin((t - A46_S9.creep) * 9)); P.tip = 0.22 * a46e(t, 91.6, 0.4); P.ph = (P.x - 400) / 3; P.amp = 0.8 * (t < 92.2 ? 1 : 0); P.gaze = [0.6, 1]; } }   // tiptoe
  else if (t < A46_S9.bush + 0.4) { const u = K.clamp((t - A46_S9.off) / (A46_S9.bush + 0.4 - A46_S9.off)), uu = u + (t > A46_S9.flinch ? -0.012 * Math.exp(-(t - A46_S9.flinch) * 6) : 0); const p = a46arcAt(K.ease.inOut(uu)); P.x = p[0]; P.y = p[1] - (a46in(t, A46_S9.flinch, A46_S9.flinch + 0.4) ? 30 * pulse(t, A46_S9.flinch, 0.4) : 0); P.fly = true; P.flap = Math.sin(t * 2 * Math.PI * 7); P.dir = 1; P.rot = u < 0.3 ? -0.3 : 0.15; }
  else { P.x = A46_FAR - 70; P.y = 900 - 140; P.dir = 1; P.y = 760; P.sq = landSquash(t, A46_S9.bush + 0.4, 0.15); }
  const H = a46sHead(P);
  if (a46in(t, A46_S9.pat, A46_S9.hop1)) { P.sag = -0.5 * a46tap(t, [85.6, 85.95], 0.3); P.lid = t < 86.3 ? 0.4 : 0; P.sq = t < 86.0 ? 0.95 : 1.04; P.gaze = t < 86.3 ? [0, 1] : lookAt(H, [760, 890]); P.eyes = t > 86.3 ? 'wide' : 'open'; }
  if (a46in(t, A46_S9.scan, A46_S9.creep)) { P.dir = a46sac(t, [[89.66, -1], [90.06, 1]]); P.gaze = a46sac(t, [[89.66, [1, 0.1]], [90.06, [1, 0.1]], [90.46, [0.6, 1]]]); P.headRot = 0.35 * a46sac(t, [[89.66, -1], [90.06, -1], [90.46, 1]]); P.sag = -0.35; P.sq = 1.05; }   // v2: three-point swivel: left, right, down at the net
  if (a46in(t, A46_S9.creep, A46_S9.off)) P.gaze = lookAt(H, [760, 890]);
  if (a46in(t, A46_S9.off, A46_S9.bush + 0.4)) { P.gaze = t < 94.2 ? [0.3, 1] : [1, 0.2]; if (a46in(t, A46_S9.flinch, 95.5)) { P.eyes = 'wide'; P.gaze = [0, 1]; } if (a46in(t, 95.9, 96.2)) P.gaze = [-1, 0.2]; }
  if (t >= A46_S9.bush + 0.4) { const ph = ((t - 97.0) / 0.5) % 1, peck = t > 97.0 && ph < 0.35 ? Math.sin(ph / 0.35 * Math.PI) : 0; P.drop = 14 * peck; P.headRot = 0.7 * peck; P.gaze = peck > 0.1 ? [1, 1] : a46sac(t, [[96.9, [-1, -0.2]], [97.4, [-1, 0.3]], [97.9, [-0.6, -0.3]], [98.4, [-1, 0]]]); }
  return P;
}
const a46U9 = (t) => kfn(t, [[84.4, 0.26], [A46_S9.night, 0.3], [A46_S9.night + 0.6, 0.72]]);
function a46s9World(ctx, t) {
  a46glade(ctx, t, a46U9(t));
  a46net(ctx, 'spread', { x: A46_NETX, rope: [[980, 892], [A46_BUSH - 20, 890]] }); a46grain(ctx, A46_NETX, A46_GR - 2, 0.5);
  const sp = a46s9Sp(t);
  a46nest(ctx, swing(t, A46_S9.land, 0.06, 2, 2.5));
  const inNest = t >= A46_S9.land - 0.05 && t < A46_S9.hop1;
  if (inNest) { ctx.save(); ctx.beginPath(); ctx.rect(A46_NEST[0] - 90, A46_NEST[1] - 200, 180, 200 - 8); ctx.clip(); a46bird(ctx, sp); ctx.restore(); a46nest(ctx, swing(t, A46_S9.land, 0.06, 2, 2.5), true); }
  if (t >= A46_S9.pat) a46bindle(ctx, A46_NEST[0] - 40, A46_NEST[1] - 30, -0.3, 0.8, 0.4);
  if (!inNest) a46bird(ctx, sp);
  if (t < A46_S9.pat) a46bindle(ctx, sp.x + 10 * sp.dir, sp.y - 40, 0.6 * sp.dir, 1, swing(t, A46_S9.land, 0.5, 2, 2.5));   // v2: he brought it from the summit
  if (a46in(t, 90.5, 91.25)) { const H = a46sHead(sp); ctx.save(); ctx.globalAlpha = a46fade(t, 90.5, 91.25, 0.12); ctx.setLineDash([12, 12]); ctx.lineWidth = 5; ctx.strokeStyle = C.white; ctx.beginPath(); ctx.moveTo(H[0] + 12, H[1] + 8); ctx.lineTo(A46_NETX - 40, 880); ctx.stroke(); ctx.restore(); }   // sight line to the net
  if (t >= A46_S9.off) { ctx.save(); ctx.globalAlpha = 0.85; a46dots(ctx, A46_ARC, Math.min(K.ease.inOut(K.clamp((t - A46_S9.off) / (A46_S9.bush + 0.4 - A46_S9.off))), 1), C.white, 5); ctx.restore(); }
  if (t >= A46_S9.x) a46X(ctx, A46_NETX, 870, 44, (t - A46_S9.x) / 0.3);
  if (a46in(t, A46_S9.flinch - 0.1, A46_S9.flinch + 0.4)) a46glint(ctx, 1000, 890, 24, (t - A46_S9.flinch + 0.1) / 0.5);
  if (a46in(t, 93.0, 94.4)) a46glint(ctx, A46_NETX + 10, 892, 18, (t - 93.0) / 0.6);
}
const a46s9 = (ctx, t) => a46s9World(ctx, t);
function a46o9(ctx, t, cam, S, tp) {
  if (a46in(t, 86.9, 88.4)) { const [x, y] = tp(A46_NEST[0], 470); S.label(ctx, 'HOME', x, y, a46e(t, 86.9, 0.3) * (1 - K.clamp((t - 88.2) / 0.2)), { size: 46, align: 'center', fill: C.yellow }); }
  if (a46in(t, A46_S9.far, 99.2)) { const p = 1 - K.clamp((t - 98.6) / 0.25); S.arrow(ctx, tp(A46_NETX + 60, 960), tp(A46_FAR - 100, 960), a46e(t, A46_S9.far, 0.5) * p, { width: 18, bend: 0.06 }); S.arrow(ctx, tp(A46_FAR - 100, 960), tp(A46_NETX + 60, 960), a46e(t, A46_S9.far + 0.2, 0.5) * p, { width: 18, bend: -0.06 }); const [x, y] = tp((A46_NETX + A46_FAR) / 2, 1060); S.label(ctx, 'FAR AWAY', x, y, a46e(t, 97.8, 0.3) * p, { size: 46, align: 'center' }); }
}

// ---------------------------------------------------------------- S10 glade 99.2-107.18: a sleepless night (the bagging replayed)
const a46U10 = (t) => kfn(t, [[99.2, 0.74], [106.02, 0.74], [107.18, 0.98]]);
function a46s10Sp(t) {
  const P = a46sp({ seed: 7, badge: true, x: A46_NEST[0] - 6, y: A46_NEST[1] - 18, dir: 1, sq: 0.94 });
  P.lid = Math.max(0.3, a46tap(t, [99.9, 100.9], 0.5)); P.gaze = [0.7, 0.7];
  if (t >= 100.74) P.gaze = [0.6, -0.8];
  if (a46in(t, 102.4, 103.6)) { P.lid = 0; P.eyes = 'wide'; P.x += tremble(t, 1) * (t < 103 ? 1 : 0.4); P.sq = 0.94 - 0.04 * pulse(t, 102.4, 0.2); }
  if (t >= 104.94) { P.wet = true; P.drop = 8 * a46e(t, 104.94, 0.4); P.sq = 0.92; P.lid = Math.max(P.lid, 0.4); }
  if (t >= 106.5) { P.lid = 1; P.drop = 8 + 4 * a46e(t, 106.5, 0.4); P.sag = -0.3 * a46e(t, 106.6, 0.3); }
  return P;
}
// the cloud picture: the S6 snap replayed (60.9-63.4 in 1.6 s), then the hunter leaving with the bag
function a46cloud10(c, t) {
  if (t < 104.2) { const tt = t < 101.94 ? 60.9 : K.lerp(60.9, 63.4, K.clamp((t - 101.94) / 1.6)); c.save(); c.fillStyle = '#d9a441'; c.fillRect(300, 900, 1000, 300); ground(c, { w: 1600 }); c.restore(); a46s6World(c, tt, { inside: true, noSet: true }); return; }
  c.fillStyle = '#d9a441'; c.fillRect(300, 900, 1000, 300); ground(c, { w: 1600 });
  const xf = (tt) => kfn(tt, [[104.2, 700], [106.2, 1100]], 'lin'), P = { ...A46_HUNT, y: A46_GR, dir: 1, ...walk(xf, t, { stride: 26 }), mouth: 'smile', brow: -0.3, aR: [2.6, 2.5], noBlink: true };
  a46hunter(c, P); const sh = a46L2W(P, [40, -190]); c.save(); c.translate(sh[0], sh[1]); c.rotate(0.3 + 0.12 * Math.sin(t * 6)); c.translate(-sh[0], -sh[1]); a46net(c, 'bag', { x: sh[0] + 20, y: sh[1] + 190, k: 1, rope: [[sh[0], sh[1]]] }); c.restore();
}
function a46s10(ctx, t) {
  a46glade(ctx, t, a46U10(t), { clouds: false });
  a46net(ctx, 'spread', { x: A46_NETX, rope: [[980, 892], [A46_BUSH - 20, 890]] });
  a46nest(ctx, 0);
  const sp = a46s10Sp(t); ctx.save(); ctx.beginPath(); ctx.rect(A46_NEST[0] - 90, A46_NEST[1] - 200, 180, 200 - 8); ctx.clip(); a46bird(ctx, sp); ctx.restore(); a46nest(ctx, 0, true);
  a46bindle(ctx, A46_NEST[0] - 40, A46_NEST[1] - 30, -0.3, 0.8, 0.4);
  const p = a46e(t, 100.74, 0.5, 'lin') * (1 - a46e(t, 106.02, 0.4));
  if (p > 0) thoughtCloud(ctx, 470, 350, 300, 210, t, { p, tail: a46sHead(sp), scale: 0.55, at: [780, 800], bg: C.paper, inside: a46cloud10 });
}

// ---------------------------------------------------------------- S11-S13: the fight, the decision, the throw
const A46_TINT = ['saturate(0.3) brightness(1.2)', 'saturate(1.6) brightness(0.68) hue-rotate(-12deg)'];   // v2: pale grey-brown and dark rufous fighters
const A46_FIGHT = 760, A46_S11 = { scan: 108.84, snap: 109.9, circle: 110.72, pow: 111.74, ground: 113.14, feather: 113.3 };
const A46_S12 = { cloud: 114.94, x: 116.3, badge: 117.1, glance: 117.86, down: 118.66, ins1: 119.92, ins2: 120.75, back: 121.55, crouch: 122.18, peace: 122.74, drift: 124.56, set: 125.26, tip: 126.46 };
const A46_S13 = { dive: 127.22, flare: 129.9, land: 130.62, freeze: 131.26, wag: 131.9, still: 132.6, feather: 133.53, eyes: 134.14, rise: 135.19, throw: 135.64, release: 135.76, open: 136.26, up: 137.08, net: 137.56 };
// the two fighters: circling (110.72), scuffle (111.74 .. 130.62), shoved apart, frozen, then under the net
function a46squab(i, t) {
  const sd = i ? 1 : -1, P = a46sp({ pal: i ? 2 : 1, tint: A46_TINT[i], seed: 90 + i, x: A46_FIGHT + sd * 34, y: A46_GR, dir: -sd });
  if (t < A46_S11.pow) { const a = (t - A46_S11.circle) * 3 + i * Math.PI; P.x = A46_FIGHT + Math.cos(a) * 36; P.dir = Math.cos(a) < 0 ? 1 : -1; P.dir = -Math.sign(P.x - A46_FIGHT) || 1; P.sq = 1.08; P.sag = -0.4; P.brow = 1; P.beak = 0.6 + 0.6 * Math.abs(Math.sin(t * 9 + i)); P.y -= Math.abs(Math.sin(t * 7 + i)) * 8; }
  if (t >= A46_S13.land) { const k = a46e(t, A46_S13.land, 0.25, 'out'); P.x = A46_FIGHT + sd * (34 + 40 * k); P.dir = -sd; P.sq = 1; P.eyes = 'wide'; P.beak = 0.5 + 0.2 * Math.sin(t * 12); P.brow = 0; P.gaze = lookAt(a46sHead(P), [A46_FIGHT, 840]); P.sag = 0.1; }
  if (t >= A46_S13.wag + 0.6) P.drop = 4;
  if (t >= A46_S13.still) { P.beak = 0.3; }
  if (t >= A46_S13.still) { P.gaze = lookAt(a46sHead(P), [A46_FIGHT, 850]); }   // dead still: pupils only
  if (t >= A46_S13.up) { const k = a46e(t, A46_S13.up, 0.2); P.x = K.lerp(P.x, A46_FIGHT + sd * 40, k); P.gaze = [0, -1]; P.eyes = 'wide'; P.sag = -0.95 * k; P.tip = 0.12 * k; }   // look up, hug the minister
  if (t >= A46_S13.net) { P.x = A46_FIGHT + sd * 48; P.sq = impactSquash(t, A46_S13.net + i * 0.06, 0.8); P.eyes = t > 138.5 ? 'shut' : 'wide'; P.sag = -0.5; P.tip = -0.1 * sd * Math.sign(P.dir); P.x += tremble(t + i, 1.2); }
  return P;
}
// the hero, from the lookout scan to the landing between them
function a46s11Hero(t) {
  const P = a46sp({ seed: 7, badge: true, x: A46_LOOK[0] + 8, y: A46_LOOK[1], dir: 1 }), H = a46sHead(P);
  if (t < A46_S11.snap) { P.gaze = a46sac(t, [[107.18, [1, 0.1]], [108.84, [-1, 0.1]], [109.24, [1, 0.1]], [109.64, [0.5, -0.4]]]); P.headRot = 0.2 * a46sac(t, [[108.9, -0.5], [109.3, 0.5], [109.7, -0.3]]); P.lid = Math.max(0.15, blink(t, 7)); }
  if (t >= A46_S11.snap) { P.headRot = 0.35 * a46e(t, A46_S11.snap, 0.07, 'out'); P.gaze = lookAt(H, [A46_FIGHT, 870]); P.eyes = 'wide'; P.tip = 0.15 * a46e(t, A46_S11.snap, 0.2); }
  return P;
}
function a46s12Hero(t) {
  const P = a46sp({ seed: 7, badge: true, x: A46_LOOK[0] + 8, y: A46_LOOK[1], dir: 1 }), H = a46sHead(P), fight = [A46_FIGHT, 860];
  P.tip = 0.15 * (1 - a46e(t, 113.7, 0.3)); P.brow = 0.5; P.gaze = lookAt(H, [600, 260]); P.ph = Math.sin(t * 12) * 0.6; P.amp = 0.3 * (t < 114.9 ? 1 : 0);
  if (a46in(t, 116.0, A46_S12.badge)) P.headRot = 0.18 * Math.sin((t - 116.0) * 14);
  if (a46in(t, A46_S12.badge, A46_S12.glance)) { P.sq = 1 + 0.08 * a46e(t, A46_S12.badge, 0.2); P.cover = a46e(t, A46_S12.badge, 0.2) * (1 - a46e(t, 117.6, 0.2)); P.glint = (t - 117.3) / 0.5; P.gaze = [0.3, 0.8]; P.brow = 0; P.lid = 0.3; }   // v2: wing over the badge, chest out
  if (a46in(t, A46_S12.glance, A46_S12.glance + 0.5)) { P.gaze = [1, -0.5]; P.headRot = -0.15; }
  if (t >= A46_S12.down) { P.gaze = lookAt(H, fight); P.brow = -0.5; P.tip = 0.1; }
  if (t >= A46_S12.crouch) { P.sq = 0.85; P.brow = 0.3; P.eyes = 'open'; }
  if (a46in(t, A46_S12.drift, A46_S12.drift + 0.6)) P.gaze = lookAt(H, a46lp([H[0] + 20, H[1] + 40], [H[0] - 10, H[1] - 80], (t - A46_S12.drift) / 0.6));
  if (t >= A46_S12.set) { P.brow = 0.8; P.sag = -0.95 * a46e(t, A46_S12.set, 1.1); P.gaze = lookAt(H, fight); P.lid = 0.15; }
  if (t >= A46_S12.tip) { P.tip = 0.5 * a46e(t, A46_S12.tip, 0.7, 'in'); P.sq = 0.85 + 0.1 * a46e(t, A46_S12.tip, 0.5); }
  return P;
}
function a46s13Hero(t) {
  const P = a46sp({ seed: 7, badge: true, dir: 1 });
  if (t < A46_S13.land) {
    const keys = [[A46_S13.dive, A46_LOOK[0] + 8, A46_LOOK[1]], [129.0, 610, 690], [A46_S13.flare, 712, 846], [A46_S13.land, A46_FIGHT, A46_GR]];
    Object.assign(P, a46fly(t, keys, { hz: 4, arc: -20 })); P.fly = true;
    if (t < A46_S13.flare) { P.sq = 1.15; P.flap = -0.85; P.rot = 0.7; P.drop = 4; } else { P.flap = 1; P.rot = -0.25; P.sq = t < A46_S13.flare + 0.07 ? 1.12 : 0.92; }
    P.gaze = [0.6, 0.8]; P.brow = 0.6; return P;
  }
  P.x = A46_FIGHT; P.y = A46_GR; P.sq = landSquash(t, A46_S13.land, 0.25); P.sag = -0.95 * (1 - a46e(t, A46_S13.freeze, 0.4)) + (t >= A46_S13.wag ? -0.7 * a46tap(t, [131.95, 132.3], 0.3) : 0);
  P.dir = t >= A46_S13.wag && t < 132.25 ? -1 : 1; P.brow = 0.6; P.beak = talk(t, [[130.62, 131.2], [131.9, 132.5]]) * 0.9;
  if (a46in(t, 132.3, A46_S13.still)) P.drop = 5 * pulse(t, 132.3, 0.3);
  if (t >= A46_S13.still) { P.brow = 0; P.beak = 0; P.gaze = [0.2, 1]; }
  if (t >= A46_S13.still) P.gaze = a46sac(t, [[132.6, [0.2, 1]], [133.9, [-0.4, 0.9]], [134.6, [0.4, 0.9]]]);   // still; never sees the bush
  if (t >= A46_S13.up) { P.gaze = [0.3, -1]; P.sq = 0.92; P.eyes = 'wide'; }
  if (t >= A46_S13.net) { P.sq = impactSquash(t, A46_S13.net, 0.78); }
  return P;
}
// the hunter behind the bush (feather, then eyes), v2: rises waist-deep above the bush with the bundle overhead, 3-frame whip, follow-through
function a46throwHunter(t) {
  const T = A46_S13, P = { ...A46_HUNT, x: A46_BUSH + 10, y: A46_GR, dir: -1, kneel: 1, lean: 0.5, sq: 0.82, look: -1, mouth: 'closed', brow: -0.4, handL: [-20, -120], handR: [30, -120] };
  if (t >= T.rise) { const k = Math.min(1.05, settleTo(t, T.rise, 0, 1, 0.22, 0.08)); P.kneel = 1 - Math.min(1, k); P.x = K.lerp(A46_BUSH + 10, A46_BUSH - 30, Math.min(1, k)); P.sq = 0.82 + 0.18 * Math.min(1, k);
    P.lean = K.lerp(0.5, -0.22, Math.min(1, k)); P.handL = P.handR = null; P.aL = [-2.78, -2.98]; P.aR = [2.78, 2.98]; P.mouth = 'closed'; P.brow = -0.7; P.look = -1; }
  if (t >= T.throw) { const k = a46e(t, T.throw, 0.1, 'in'), f = a46e(t, T.throw + 0.1, 0.5, 'out');
    P.aL = [K.lerp(-2.78, 1.75, k), K.lerp(-2.98, 1.55, k)]; P.aR = [K.lerp(2.78, 1.95, k), K.lerp(2.98, 1.7, k)]; P.lean = K.lerp(-0.22, 0.42, k) - 0.22 * f; P.mouth = 'open'; P.tip = 0.08 * k * (1 - f); }
  if (t >= T.open) { P.mouth = 'smile'; P.aL = [K.lerp(1.75, 1.2, a46e(t, T.open, 0.6)), 1.1]; P.aR = [K.lerp(1.95, 1.3, a46e(t, T.open, 0.6)), 1.2]; }
  P.lid = blink(t, 37); return P;
}
// the thrown net in the air: a bundle off the hands, opening from 136.26 to full width, rim weights trailing
function a46netFlight(ctx, t) {
  const T = A46_S13; if (t < T.release || t >= T.net) return;
  const u = K.clamp((t - T.release) / (T.net - T.release)), x = K.lerp(A46_BUSH - 40, A46_FIGHT, K.ease.inOut(u)), y = K.lerp(590, 805, u) - 150 * Math.sin(Math.PI * u);
  const o = a46e(t, T.open, 0.6, 'out');
  if (o <= 0.01) { a46net(ctx, 'roll', { x, y, rot: (t - T.release) * 9 }); return; }
  a46net(ctx, 'thrown', { x, y, r: K.lerp(36, 165, o), rot: -0.25 * (1 - u), trail: [24 * (1 - u * 0.5), -10] });
}
const a46U11 = () => 0.3;   // v2: one sky for the whole event (S11-S15), no time jump inside it
function a46fightWorld(ctx, t, o = {}) {   // S11-S13 shared ground action (fighters, grains, hunter behind the bush)
  for (let i = 0; i < 5; i++) a46grainDot(ctx, A46_FIGHT - 50 + i * 26 + (i % 2) * 7, A46_GR - 3, i);
  if (t >= A46_S11.circle - 0.6) {
    const fp = t < A46_S11.pow ? 0 : t < A46_S13.land ? 1 : 1 - K.clamp((t - A46_S13.land) / 0.15);
    if (t < A46_S11.pow || t >= A46_S13.land) { const a = a46squab(0, t), b = a46squab(1, t); if (t < A46_S11.circle) { a.x -= 200 * (1 - a46e(t, A46_S11.circle - 0.6, 0.6)); b.x += 200 * (1 - a46e(t, A46_S11.circle - 0.6, 0.6)); } a46bird(ctx, a); a46bird(ctx, b); }
    if (fp > 0) a46fight(ctx, A46_FIGHT, A46_GR - 50, t, fp * (t < A46_S11.pow + 0.3 ? (t - A46_S11.pow) / 0.3 : 1), 62 + (a46in(t, 119.9, 120.8) ? 12 : 0));
    if (a46in(t, A46_S13.land, A46_S13.land + 0.5)) for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2, d = (t - A46_S13.land) / 0.5; shape(ctx, ell(A46_FIGHT + Math.cos(a) * (60 + 80 * d), A46_GR - 50 + Math.sin(a) * 40 * (1 + d), 24 * (1 - d), 20 * (1 - d), 12), C.white, { lw: 4, seed: 160 + i }); }
    for (const [k, t0] of [[0, 111.9], [1, 112.1], [2, 112.4]]) a46featherFall(ctx, t, t0, t0 + 1.6, [A46_FIGHT + (k - 1) * 30, A46_GR - 90], [A46_FIGHT + (k - 1) * 70, A46_GR - 4], 1, k === 1 ? '#c9a27a' : '#a8741a');
  }
  if (!o.noHunter) {
    const HP = a46throwHunter(t);
    a46hunter(ctx, HP); a46bushFront(ctx);
    if (t >= A46_S13.rise) { a46upper(ctx, HP, 812, a46hunter); if (t < A46_S13.release) { const hw = HP.hands ? HP.hands.map((q) => a46L2W(HP, q)) : null, hd = a46pHead(HP), bc = hw ? [(hw[0][0] + hw[1][0]) / 2, (hw[0][1] + hw[1][1]) / 2 - 30] : [hd[0], hd[1] - 96];   // v3: the bundle sits on the fists until the whip
      ctx.save(); ctx.translate(bc[0], bc[1]); ctx.scale(2.3, 1.15); a46net(ctx, 'roll', { x: 0, y: 0, rot: 0.1 }); ctx.restore(); } }
    else { const f = a46featherW(HP), up = (t >= A46_S11.feather ? 12 * a46e(t, A46_S11.feather, 0.4) : 0) + (t >= A46_S13.feather ? 22 * a46e(t, A46_S13.feather, 0.3) : 0); a46feather(ctx, f[0] + 20, f[1] + 48 - up - 3 * a46tap(t, [116.0, 124.0], 0.3), -0.3 + 0.15 * a46e(t, A46_S13.feather, 0.3), 1);
      if (a46in(t, A46_S13.eyes, A46_S13.rise)) { const k = a46e(t, A46_S13.eyes, 0.15), bx = A46_BUSH - 40, by = 800; ctx.save(); ctx.globalAlpha = k; shape(ctx, ell(bx, by, 52, 24, 20), '#0d2a12', { lw: 0 });   // the eyes in the bush
        for (const dx of [-17, 17]) { ctx.save(); ctx.translate(bx + dx, by); ctx.scale(1, Math.max(0.1, k)); eye2(ctx, 0, 0, 'open', -0.9, 0.3, 0, C.white, false); ctx.restore(); } ctx.restore(); } }
  }
}
function a46s11(ctx, t) {
  a46glade(ctx, t, a46U11(t)); a46nest(ctx, 0); a46fightWorld(ctx, t); a46bird(ctx, a46s11Hero(t));
}
function a46o11(ctx, t, cam, S, tp) {
  if (a46in(t, 111.9, 113.0)) { const [x, y] = tp(A46_FIGHT + 70, 760); a46word(ctx, 'POW!', x, y, 76, a46e(t, 111.9, 0.2) * (1 - K.clamp((t - 112.8) / 0.2)), { rot: 0.12, fill: C.red }); }
  if (a46in(t, 112.86, 113.7)) { const [x, y] = tp(A46_FIGHT, 700); S.label(ctx, 'ON THE GROUND', x, Math.max(130, y - 60), a46e(t, 112.86, 0.2), { size: 48, align: 'center' }); S.arrow(ctx, [x, Math.max(160, y - 25)], tp(A46_FIGHT, 820), a46e(t, 113.0, 0.25), { width: 14, bend: 0 }); }
}
// S12 cloud pictures: himself ignoring the fight (X), then himself making peace (tick)
function a46cloud12(c, t) {
  c.fillStyle = '#d9a441'; c.fillRect(300, 900, 900, 300); ground(c, { w: 1600 });
  if (t < A46_S12.peace) {
    a46fight(c, 880, 850, t, 1, 70); const me = a46sp({ x: 600, y: 900, s: 2.0, dir: -1, badge: true, lid: 0.5, gaze: [-1, -0.5], noBlink: true }); me.headRot = -0.2; a46bird(c, me);
    a46glint(c, 600 - 6 * 2.0, 900 - 30 * 2.0, 40, ((t - 115.94) % 1.2) / 1.2);
    if (t >= A46_S12.x) a46X(c, 740, 790, 130, (t - A46_S12.x) / 0.3);
  } else {
    const k = K.clamp((t - A46_S12.peace) / 0.2); c.save(); c.globalAlpha = k;
    for (const sd of [-1, 1]) a46bird(c, a46sp({ pal: sd < 0 ? 1 : 2, tint: A46_TINT[sd < 0 ? 0 : 1], x: 740 + sd * 150, y: 900, s: 1.7, dir: -sd, sag: -0.5 * Math.abs(Math.sin(t * 6)), beak: 0.3, mouth: 'smile', noBlink: true }));
    a46bird(c, a46sp({ x: 740, y: 900, s: 1.9, dir: 1, sag: -0.9, badge: true, noBlink: true }));
    a46tick(c, 740, 690, 70, (t - 123.0) / 0.3); c.restore();
  }
}
function a46s12(ctx, t) {
  a46glade(ctx, t, a46U11(t)); a46nest(ctx, 0); a46fightWorld(ctx, t);
  if (a46in(t, A46_S12.ins2, A46_S12.back)) {   // insert: two eyes in the dark of the bush, four knuckles on the net
    const k = a46fade(t, A46_S12.ins2, A46_S12.back, 0.1); ctx.save(); ctx.globalAlpha = k; shape(ctx, ell(A46_BUSH - 20, 790, 70, 34, 20), '#0d2a12', { lw: 0 });
    const op = a46e(t, A46_S12.ins2 + 0.1, 0.2) * (1 - a46tap(t, [121.2], 0.16)); for (const dx of [-24, 24]) { ctx.save(); ctx.translate(A46_BUSH - 20 + dx, 790); ctx.scale(1, Math.max(0.08, op)); eye2(ctx, 0, 0, 'open', -0.9, 0.3, 0, C.white, false); ctx.restore(); }
    for (let i = 0; i < 4; i++) shape(ctx, ell(A46_BUSH - 70 + i * 15, 846 - (i % 2) * 2, 8, 7, 10), C.white, { lw: 3, seed: 170 + i, dot: C.skin, pitch: 4, rad: 0.3 });
    seg(ctx, A46_BUSH - 90, 852, A46_BUSH - 10, 852, 4, '#c9a27a', 2); ctx.restore(); }
  const sp = a46s12Hero(t); a46bird(ctx, sp);
  if (t >= A46_S12.tip) { const r = swing(t, A46_S12.tip + 0.4, 6, 2.2, 2.5); void r; }
  const p = a46e(t, A46_S12.cloud, 0.45, 'lin') * (1 - a46e(t, A46_S12.set, 0.2));
  if (p > 0 && !a46in(t, A46_S12.ins1, A46_S12.back)) thoughtCloud(ctx, 600, 300, 250, 180, t, { p, tail: [a46sHead(sp)[0] + 16, a46sHead(sp)[1] - 20], scale: 0.36, at: [740, 820], bg: C.paper, inside: a46cloud12 });
  a46featherFall(ctx, t, A46_S12.drift, A46_S12.drift + 1.2, [470, 520], [400, 300], 1.3, '#c9a27a');
}
function a46o12(ctx, t, cam, S, tp) {
  if (a46in(t, 117.2, 118.6)) { const c = a46chest(a46s12Hero(t)), [x, y] = tp(c[0] + 52, c[1] + 40); a46word(ctx, 'MINISTER!', x + 40, y + 30, 66, a46e(t, 117.2, 0.25) * (1 - K.clamp((t - 118.4) / 0.2)), { rot: -0.05 }); }
}
function a46s13(ctx, t) {
  a46glade(ctx, t, a46U11(t)); a46nest(ctx, 0);
  // the mesh shadow starts when the net opens and grows until impact
  if (a46in(t, A46_S13.open, A46_S13.net)) { const k = K.clamp((t - A46_S13.open) / (A46_S13.net - A46_S13.open)); a46meshShadow(ctx, K.lerp(860, A46_FIGHT, k), A46_GR + 4, K.lerp(80, 320, k), K.lerp(0.12, 0.4, k)); }
  const netBack = t >= A46_S13.net;
  if (netBack) a46net(ctx, 'draped', { x: A46_FIGHT, h: 130 * (1 + 0.15 * (1 - impactSquash(t, A46_S13.net, 0.8))), part: 'back' });
  a46fightWorld(ctx, t);
  const hero = a46s13Hero(t); a46bird(ctx, hero);
  if (t < A46_S13.land && t > A46_S13.dive) for (let i = 0; i < 3; i++) { const q = a46s13Hero(t - 0.04 - i * 0.03); seg(ctx, q.x - 20, q.y - 50 - i * 10, q.x - 60, q.y - 90 - i * 10, 4, C.white, 0); }
  a46netFlight(ctx, t);
  if (netBack) { a46net(ctx, 'draped', { x: A46_FIGHT, h: 130 * (1 + 0.15 * (1 - impactSquash(t, A46_S13.net, 0.8))), part: 'front' }); dustBurst(ctx, A46_FIGHT, A46_GR, t - A46_S13.net, 8, 8, 16, 120, 0.6, 5); }
}
function a46o13(ctx, t, cam, S, tp) {
  if (a46in(t, 130.7, 131.9)) { const [x, y] = tp(A46_FIGHT, 720); a46word(ctx, 'STOP!', x, y, 78, a46e(t, 130.7, 0.2) * (1 - K.clamp((t - 131.7) / 0.2)), { rot: -0.08 }); }
  if (t >= 137.6) { const n = Math.min(3, 1 + Math.floor((t - 137.6) / 0.2)); for (let i = 0; i < n; i++) { const [x, y] = tp(A46_FIGHT + (i - 1) * 60, 700); S.counter(ctx, i + 1, x, y, K.clamp((t - 137.6 - i * 0.2) / 0.2), { size: 56 }); } }
}

// ---------------------------------------------------------------- S14 glade 138.4-150.78: trapped, caught, handed over
const A46_S14 = { crouch: 138.5, rise: 139.4, top: 140.36, fall: 141.56, push: [142.34, 142.7, 143.06], stop: 143.66, walk: 144.6, bend: 145.54, grab: 146.4, wrig: 147.0, comp: 147.8, give: 148.14, cage: 149.0, door: 149.9 };
const A46_HX14 = (t) => kfn(t, [[A46_S14.walk, 1320], [145.5, 850]]);
const A46_CX14 = (t) => kfn(t, [[A46_S14.comp, 1300], [148.4, 1030]]);
const A46_CAGE = { s: 0.75, y: 884 };   // cage carried at the side by its ring: base y 884 (top about y 734)
function a46s14Hunter(t) {
  const P = { ...A46_HUNT, y: A46_GR, dir: -1, ...walk(A46_HX14, t, { stride: 26 }), mouth: 'smile', brow: -0.4 };
  P.lid = blink(t, 37);
  if (t >= A46_S14.bend) { P.lean = 0.25 * a46e(t, A46_S14.bend, 0.4); P.kneel = 0.5 * a46e(t, A46_S14.bend, 0.4); P.tilt = 0.12 * Math.sin((t - A46_S14.bend) * 6) * (t < A46_S14.grab ? 1 : 0); P.handR = t < A46_S14.grab ? [70, -150 + 8 * Math.sin(t * 10)] : null; }
  if (t >= A46_S14.grab - 0.25) P.handRW = a46lp([A46_FIGHT + 10, 880], [800, 760], a46e(t, A46_S14.grab, 0.5));
  if (t >= A46_S14.give) { P.dir = 1; P.lean = 0.1; P.kneel = 0.2; P.handRW = a46lp([800, 760], [990, 760], a46e(t, A46_S14.give, 0.7)); P.handLW = [A46_FIGHT + 40, 890]; P.look = 1; }
  if (t >= A46_S14.door) { P.handRW = null; P.handR = [40, -120]; P.lean = 0.3; P.kneel = 0.5; P.dir = -1; }
  return P;
}
function a46s14Comp(t) { const P = { ...A46_COMP, y: A46_GR, dir: -1, ...walk(A46_CX14, t, { stride: 22 }), mouth: 'smile', lid: blink(t, 41) }; P.handLW = [P.x - 78, A46_CAGE.y - 160]; P.handR = [30, -110]; P.ph *= 1.2; return P; }
const a46cageX = (C2) => C2.x - 78;
function a46s14Hero(t, HP) {
  const P = a46sp({ seed: 7, badge: true, x: A46_FIGHT, y: A46_GR, dir: 1 });
  if (t < A46_S14.grab) {
    if (t < A46_S14.rise) P.sq = anticipate(t, A46_S14.crouch, 0.4, 0.2);
    if (a46in(t, A46_S14.rise, A46_S14.fall)) { P.y -= 45 * a46e(t, A46_S14.rise, 0.9, 'out'); P.fly = true; P.flap = Math.sin(t * 2 * Math.PI * (t < A46_S14.top ? 10 : 20)); P.sq = 1.08; }
    if (a46in(t, A46_S14.fall, A46_S14.push[0])) { P.y = fallY(t, A46_S14.fall, A46_S14.fall + 0.25, A46_GR - 45, A46_GR); P.sq = impactSquash(t, A46_S14.fall + 0.25, 0.75); P.tip = -0.2; }
    if (a46in(t, A46_S14.push[0], A46_S14.stop)) { const k = a46sac(t, [[142.34, 0], [142.7, 1], [143.06, 2]]); P.sag = -0.9 * a46tap(t, A46_S14.push, 0.3); P.dir = k === 0 ? -1 : 1; P.drop = k === 2 ? -6 : 0; P.sq = 1 + 0.03 * Math.sin(t * 30); }
    if (t >= A46_S14.stop) { P.gaze = [0, 0.05]; P.eyes = 'wide'; P.dir = 1; P.lid = 0; }
    else P.gaze = [0.2, -0.8];
    return P;
  }
  // in the fist, then into the cage
  const hand = HP.hands ? a46L2W(HP, HP.hands[1]) : [800, 760];
  P.x = hand[0]; P.y = hand[1] + 36; P.sq = 0.85; P.dir = HP.dir; P.gaze = lookAt(a46sHead(P), a46pHead(HP)); P.eyes = 'wide';
  if (a46in(t, A46_S14.wrig, A46_S14.comp)) P.rot = 0.2 * a46tap(t, [147.0, 147.35], 0.3) * (Math.sin(t * 30) > 0 ? 1 : -1);
  if (t >= A46_S14.comp) P.x += tremble(t, 1.5);
  if (t >= A46_S14.cage) { const C2 = a46s14Comp(t), cx = a46cageX(C2), u = a46e(t, A46_S14.cage, 0.6); P.x = K.lerp(hand[0], cx, u); P.y = K.lerp(hand[1] + 36, A46_CAGE.y - 12, u); P.sq = K.lerp(0.85, 1, u); P.gaze = t < 149.7 ? [-1, 0] : [0.3, 0.2]; P.dir = 1; P.lid = 0; }
  return P;
}
function a46s14(ctx, t) {
  a46glade(ctx, t, a46U11(t)); a46nest(ctx, 0);
  for (let i = 0; i < 5; i++) { const HP0 = a46s14Hunter(t); let hopY = 0; if (t > A46_S14.walk) for (const f of footfalls(A46_HX14, A46_S14.walk, 145.5)) if (t > f.t && t < f.t + 0.3) hopY = 4 * Math.sin(Math.PI * (t - f.t) / 0.3); void HP0; a46grainDot(ctx, A46_FIGHT - 110 + i * 22 + (i % 2) * 7, A46_GR - 3 - hopY, i); }
  const grabbed = t >= A46_S14.grab;
  const tent = a46in(t, A46_S14.rise, A46_S14.fall + 0.25) ? [A46_FIGHT, A46_GR - 130 - 45 * a46e(t, A46_S14.rise, 0.9, 'out') * (t < A46_S14.fall ? 1 : 1 - (t - A46_S14.fall) / 0.25)] : grabbed && t < A46_S14.door ? [A46_FIGHT + 40, A46_GR - 160] : null;
  const pi = a46sac(t, [[0, -1], [142.34, 0], [142.7, 1], [143.06, 2], [143.4, -1]]), bulge = pi >= 0 ? [[[A46_FIGHT - 60, A46_GR - 60], [A46_FIGHT + 60, A46_GR - 60], [A46_FIGHT, A46_GR - 130]][pi]] : null;
  const bagged = t >= A46_S14.door;
  if (!bagged) a46net(ctx, 'draped', { x: A46_FIGHT, tent, bulge, part: 'back' });
  if (!bagged) for (let i = 0; i < 2; i++) a46bird(ctx, a46squab(i, t)); else a46net(ctx, 'bag', { x: A46_FIGHT, k: 1, w: 200, wob: t - A46_S14.door, rope: [[A46_FIGHT + 60, 760]], inside: (c) => { for (let i = 0; i < 2; i++) a46bird(c, a46sp({ pal: 1 + i, tint: A46_TINT[i], x: A46_FIGHT - 30 + i * 50, y: A46_GR - 20 - i * 30, rot: 0.4 * Math.sin(t * 8 + i), eyes: 'wide', noBlink: true })); } });
  const HP = a46s14Hunter(t), hero0 = grabbed ? null : a46s14Hero(t, HP);
  if (hero0) a46bird(ctx, hero0);
  if (!bagged) a46net(ctx, 'draped', { x: A46_FIGHT, tent, bulge, part: 'front' });
  // companion with the open cage (back bars, bird, front bars)
  const C2 = t >= A46_S14.comp ? a46s14Comp(t) : null, cx = C2 ? a46cageX(C2) : 0, door = t < A46_S14.door ? 1.6 : 1.6 * (1 - K.clamp((t - A46_S14.door) / 0.1)), crot = swing(t, A46_S14.door + 0.1, 0.06, 1.6, 2.2);
  if (C2) { person(ctx, C2); a46cage(ctx, cx, A46_CAGE.y, A46_CAGE.s, 'back', { rot: crot }); }
  if (t >= A46_S14.walk) person(ctx, HP), a46hunterOver(ctx, HP);
  if (grabbed) { const hero = a46s14Hero(t, HP); a46bird(ctx, hero); if (t < A46_S14.cage + 0.3) { const h = hero; for (let i = 0; i < 4; i++) shape(ctx, ell(h.x - 22 * (h.dir || 1) + i * 14 * (h.dir || 1), h.y - 26 - (i % 2) * 3, 11, 10, 10), C.white, { lw: 3, seed: 170 + i, dot: C.skin, pitch: 4, rad: 0.3 }); } }
  if (C2) a46cage(ctx, cx, A46_CAGE.y, A46_CAGE.s, 'front', { door, rot: crot });
}
function a46hunterOver(ctx, P) { ctx.save(); a46headXf(ctx, P); a46feather(ctx, -22, -30, -0.45, 1); ctx.fillStyle = '#3a2410'; const r = K.rng(5); for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.arc(-18 + r() * 36, 16 + r() * 14, 1.8, 0, 7); ctx.fill(); } ctx.restore(); }
function a46o14(ctx, t, cam, S, tp) {
  if (a46in(t, 143.8, 145.0)) { const [x, y] = tp(A46_FIGHT, 700); a46word(ctx, 'TRAPPED!', x, Math.max(y, 160), 92, a46e(t, 143.8, 0.25) * (1 - K.clamp((t - 144.8) / 0.2)), { rot: -0.06, fill: C.red }); }
  if (a46in(t, 150.0, 150.78)) { const [x, y] = tp(1000, 640); a46word(ctx, 'CLANK!', x, y, 64, a46e(t, 150.0, 0.2) * (1 - K.clamp((t - 150.6) / 0.15)), { rot: 0.1 }); }
}

// ---------------------------------------------------------------- S15 150.78-164.5: in the cage (v2: clear sky behind, fewer thin bars, larger bird, cage on the ground)
const A46_S15 = { cloud: 152.56, pose: 153.34, sink: 154.8, net: 156.64, shiver: 158.06, fade: 159.24, look: 160.0, fall: 161.44, out: 162.2, turn: 162.84, drop: 163.64 };
const A46_CAGE15 = [1000, A46_GR], A46_CS15 = 0.9, A46_SPS15 = 1.3, A46_BARS15 = [-84, -62, 16, 46, 80];   // gap -62..16 where his head is
const A46_BADGE = [A46_CAGE15[0] - 122, A46_GR - 8];   // where the badge comes to rest (S15, S16)
function a46s15Sp(t) {
  const T = A46_S15, P = a46sp({ seed: 7, s: A46_SPS15, badge: t < T.fall, x: A46_CAGE15[0] + 12, y: A46_GR - 14, dir: -1, sag: 0.3, noBlink: true });
  P.sq = 1 + 0.035 * Math.sin(2 * Math.PI * (t - 150.9) / 2.4); P.lid = Math.max(0.3, a46tap(t, [152.1], 0.25)); P.gaze = [-0.3, 0.5]; P.drop = 3;
  if (t >= T.pose) { P.gaze = [-0.7, -0.8]; P.lid = 0.1; P.drop = 0; P.beak = 0.25 * a46e(t, T.pose, 0.3); }   // eyes lift to the king's pose
  if (t >= T.sink) { P.wet = true; P.lid = Math.max(0.15, a46tap(t, [T.sink], 0.7)); P.beak = 0; P.drop = 4 * a46e(t, T.sink, 0.4); }   // wet, one long blink
  if (t >= T.net) { P.gaze = a46sac(t, [[T.net, [0.7, -0.8]]]); P.brow = -0.4; P.eyes = 'open'; }   // to the second cloud: the net
  if (a46in(t, T.shiver, T.fade)) P.x += tremble(t, 1.2);
  if (t >= T.look) { P.gaze = [0.3, 1]; P.drop = 7; P.brow = 0; }
  if (t >= T.fall) P.gaze = t < 161.8 ? [0.1, 1] : t < T.out ? [-0.5, 1] : [-1, 0.7];   // follows the falling badge
  if (t >= T.drop) { P.drop = 7 + 10 * a46e(t, T.drop, 0.6); P.lid = Math.max(P.lid, 0.5 * a46e(t, T.drop, 0.4)); P.gaze = [-0.6, 1]; }
  return P;
}
// the loose badge: off the chest, down to the cage floor, out between the bars to the dust
function a46badgeLoose(t) {
  const T = A46_S15, ch = a46chest(a46s15Sp(T.fall - 0.01)), fl = [A46_CAGE15[0] - 30, A46_GR - 18];
  if (t < 161.8) { const u = K.clamp((t - T.fall) / 0.36); return { x: K.lerp(ch[0], fl[0], u), y: K.lerp(ch[1], fl[1], u * u), rot: (t - T.fall) * 6 }; }
  if (t < T.out) { const u = a46e(t, 161.8, T.out - 161.8, 'out'); return { x: K.lerp(fl[0], A46_BADGE[0], u), y: K.lerp(fl[1], A46_BADGE[1], u) - 30 * Math.sin(Math.PI * u), rot: 2.2 + u * 2 }; }
  return { x: A46_BADGE[0], y: A46_BADGE[1] - rebound(t, T.out, 8, 0.25), rot: 1.3, limp: K.clamp((t - T.out) / 0.3) };
}
function a46cloud15a(c, t) { c.fillStyle = C.blue; c.fillRect(0, 0, 1400, 1400); a46pea(c, { ...A46_FATE, x: 560, y: 1000, s: 1, dir: -1, t, fanShake: 0.3, noBlink: true }); }
function a46cloud15b(c, t) {   // the danger he feared from the start: the net and the grain, large
  c.fillStyle = C.paper; c.fillRect(300, 500, 1000, 800); c.fillStyle = '#d9a441'; c.fillRect(300, 900, 1000, 400);
  c.save(); c.translate(760, A46_GR); c.scale(1.6, 1.6); c.translate(-760, -A46_GR); a46net(c, 'spread', { x: 760, w: 200 }); a46grain(c, 760, A46_GR - 2, 1, { w: 90 }); c.restore(); a46word(c, '!', 760, 770, 130, K.clamp((t - 157.0) / 0.3), { fill: C.red });
}
function a46s15(ctx, t) {
  const T = A46_S15; skyCycle(ctx, a46U11(t), { t, w: 1600, hills: false, sun: false }); ground(ctx, { w: 1600 });
  const C0 = A46_CAGE15, crot = swing(t, 150.78, 0.03, 1.6, 2);
  a46cage(ctx, C0[0], C0[1], A46_CS15, 'back', { rot: crot, doorBack: true, dx: 20 });
  const sp = a46s15Sp(t); a46bird(ctx, { ...sp, glint: (t - T.look - 0.3) / 0.6 });
  if (t >= T.fall && t < T.out) { const L = a46badgeLoose(t); a46medal(ctx, L.x, L.y, A46_SPS15 * 1.15, L.rot); }
  a46cage(ctx, C0[0], C0[1], A46_CS15, 'front', { rot: crot, bars: A46_BARS15, thin: true, dx: 20, doorBack: true, ring: -28 });
  if (t >= T.out) { const L = a46badgeLoose(t); a46medal(ctx, L.x, L.y, A46_SPS15 * 1.15, L.rot, { limp: L.limp }); }
  const H = a46sHead(sp), p1 = a46e(t, T.cloud, 0.5, 'lin') * (1 - a46e(t, T.net, 0.25)), p2 = a46e(t, T.net - 0.1, 0.45, 'lin') * (1 - a46e(t, T.fade, 0.4));
  if (p1 > 0) thoughtCloud(ctx, 880, 590, 190, 140, t, { p: p1, tail: [H[0] - 10, H[1] - 26], scale: 0.22, at: [600, 830], bg: C.blue, inside: a46cloud15a });
  if (p2 > 0) thoughtCloud(ctx, 1098, 592, 190, 140, t, { p: p2, tail: [H[0] + 20, H[1] - 30], scale: 0.55, at: [760, 860], bg: C.paper, inside: a46cloud15b, seed: 5 });
}

// ---------------------------------------------------------------- S16 glade 164.5-176.33: carried off; the badge in the dust; the king waits
const A46_S16 = { take: 164.68, go: 165.82, comp: 166.78, back: 167.86, backEnd: 168.76, glint: 170.48, lift: 171.34, night: 172.6, end: 173.0 };
const A46_HX16 = (t) => kfn(t, [[A46_S16.go, 905], [170.4, 1340]], 'lin');
const A46_CX16 = (t) => kfn(t, [[A46_S16.comp, 790], [170.4, 1180]], 'lin');
const A46_FALLS16 = footfalls(A46_HX16, A46_S16.go, 170.4, 26).concat(footfalls(A46_CX16, A46_S16.comp, 170.4, 22));
const a46U16 = (t) => kfn(t, [[164.5, 0.5], [A46_S16.night, 0.5], [174.2, 0.72]]);
function a46s16Rig(t) {
  const H = { ...A46_HUNT, y: A46_GR, dir: 1, ...walk(A46_HX16, t, { stride: 26 }), mouth: 'smile', lid: blink(t, 37), handR: [44, -168] };
  if (t < A46_S16.go) { H.handR = null; H.handRW = a46lp([A46_CAGE15[0] - 6, A46_GR - 160], [H.x + 44, A46_GR - 168], a46e(t, A46_S16.take + 0.45, 0.45)); H.lean = 0.25 * (1 - a46e(t, A46_S16.take + 0.45, 0.45)) * a46e(t, A46_S16.take, 0.3); }
  const hand = a46L2W(H, [44, -168]), lifted = t >= A46_S16.take + 0.45;
  const hang = !lifted ? [A46_CAGE15[0], A46_GR] : [K.lerp(A46_CAGE15[0], hand[0], a46e(t, A46_S16.take + 0.45, 0.45)), K.lerp(A46_GR, hand[1] + 158 * A46_CAGE.s + 22, a46e(t, A46_S16.take + 0.45, 0.45))];
  const crot = t < A46_S16.go ? 0 : 0.09 * Math.sin(H.ph || 0) + swing(t, A46_S16.go, 0.06, 1.4, 2);
  return { H, hang, crot };
}
// the 0.9 s cut-in on the cage as he looks back
function a46s16Cut(t) { if (!a46in(t, A46_S16.back, A46_S16.backEnd)) return null; const R = a46s16Rig(t); return a46cam(R.hang[0], R.hang[1] - 75, 2.4); }
function a46s16(ctx, t) {
  const T = A46_S16; a46glade(ctx, t, a46U16(t), { sunAt: [585, 790] });
  a46nest(ctx, swing(t, T.night, 0.06, 1.2, 1.5));
  a46medal(ctx, A46_BADGE[0], A46_BADGE[1], A46_SPS15 * 1.15, 1.3, { limp: 1 });
  if (a46in(t, T.glint, T.glint + 0.6)) a46glint(ctx, A46_BADGE[0] + 4, A46_BADGE[1] - 10, 30, (t - T.glint) / 0.6);
  // the far king (v2): in profile on the mountain top, long neck, crest, closed train hanging, a foot tapping, beside an empty post
  if (t >= 171.0) { const mx = A46_MTN[0] + 18, my = 682; shape(ctx, [[mx - 62, my], [mx - 58, my - 30], [mx - 44, my - 32], [mx - 40, my]], STONE2, { lw: 3, seed: 190 });   // v3: gated (no early reveal); the ghost outline removed, the post beside him stays bare
    const P = { x: mx, y: my, s: 0.26, dir: -1, t, fan: 0, crown: 1, neck: 1.08, gaze: [-1, 0.2], tapF: a46tap(t, [171.7, 172.3, 172.9, 173.5, 174.1, 174.7, 175.3, 175.9], 0.3), lid: Math.max(0.3, blink(t, 61)) };
    P.headRot = 0.15 * Math.sin(t * 0.9); a46pea(ctx, P); }
  if (t >= 171.0) return;   // the men are gone by the time the camera leaves the badge
  for (const f of A46_FALLS16) if (t >= f.t && t < f.t + 0.4) dustBurst(ctx, f.x + 10, A46_GR, t - f.t, 3, 4, 8, 22, 0.4, 3);
  // the companion follows with the sack of the two fighters
  const Cp = { ...A46_COMP, y: A46_GR, dir: 1, ...walk(A46_CX16, t, { stride: 22 }), mouth: 'smile', lid: blink(t, 41), handR: [36, -170], handL: [-10, -140] };
  person(ctx, Cp);
  { const sh = a46L2W(Cp, [30, -185]), sw = 0.25 * Math.sin((Cp.ph || 0) + Math.PI); ctx.save(); ctx.translate(sh[0], sh[1]); ctx.rotate(0.4 + sw); ctx.scale(0.4, 0.4); ctx.translate(-A46_FIGHT, -A46_GR + 40); a46net(ctx, 'bag', { x: A46_FIGHT, k: 1, w: 200, wob: t, rope: [[A46_FIGHT, A46_GR - 260]], inside: (c) => { for (let i = 0; i < 2; i++) a46bird(c, a46sp({ pal: 1 + i, tint: A46_TINT[i], x: A46_FIGHT - 30 + i * 50, y: A46_GR - 30 - i * 30 + 10 * Math.sin(t * 6 + i), rot: 0.4 * Math.sin(t * 5 + i), noBlink: true })); } }); ctx.restore(); }
  const R = a46s16Rig(t); a46hunter(ctx, R.H);
  const hang = R.hang; ctx.save(); const piv = [hang[0], hang[1] - 158 * A46_CAGE.s - 20]; ctx.translate(piv[0], piv[1]); ctx.rotate(R.crot); ctx.translate(-piv[0], -piv[1]);
  a46cage(ctx, hang[0], hang[1], A46_CAGE.s, 'back');
  const back = t >= T.back + 0.12, sp = a46sp({ x: hang[0] + 6, y: hang[1] - 12, dir: back ? -1 : 1, sag: 0.3, drop: back ? 2 : 10, gaze: back ? [-1, -0.1] : [1, 0.4], lid: back ? Math.max(0.15, a46tap(t, [168.3], 0.3)) : 0.45, wet: t >= T.back, noBlink: true });
  a46bird(ctx, sp); a46cage(ctx, hang[0], hang[1], A46_CAGE.s, 'front', { bars: [-80, -50, 20, 50, 80], thin: true, dx: 22 }); ctx.restore();
}
function a46o16(ctx, t, cam, S) {
  if (t >= A46_S16.end) S.title(ctx, 'THE END', 500, 230, a46e(t, A46_S16.end, 0.9), { size: 84, align: 'center' });
}
