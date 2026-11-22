// ===== SIND-06 shots S12-S14 (80.92 - 108.68 s): the river beneath the mountain: the low roof, the gallery, the hours, the hope =====
// the raft's x along the tunnel strip (flowing: continuous speed, never a dead stop)
const SB6_TRX = [[80.92, 450], [84.0, 1250], [86.86, 1995], [87.8, 2420], [88.7, 2850], [89.56, 3080], [93.0, 3390], [97.02, 3750], [98.5, 4250], [100.0, 5150], [101.68, 6200], [102.9, 6450], [105.16, 6800], [107.1, 7100], [108.68, 7330]];
const sbTRX = (t) => flow(t, SB6_TRX);
const SB6_FLAME = (t) => t < 97.0 ? 0.8 - (t > 95.9 ? 0.05 : 0) : t < 105.16 ? [0.8, 0.6, 0.45, 0.3, 0.15][Math.min(4, Math.floor((t - 97.0) / 1.62))] : 0.1;
const SB6_POLE = (t) => t < 85.1 ? 1 : t < 85.45 ? K.lerp(1, 0.1, K.ease.inOut((t - 85.1) / 0.35)) : t < 88.7 ? 0.1 : t < 89.3 ? K.lerp(0.1, 1, K.ease.out((t - 88.7) / 0.6)) : 1;
function sbTunRaft(t) { const tc = SB_T2(t), x = sbTRX(t), f = sbRaftFloat(x, (u) => sbTunWY(u, t)), rap = t > 86.86 && t < 88.7 ? Math.sin(Math.PI * (t - 86.86) / 1.84) : 0, spin = t > 88.7 && t < 89.56 ? 0.06 * Math.sin(Math.PI * (t - 88.7) / 0.86) : 0;
  const R = { x, y: f.y, rot: f.rot * 0.6 + 0.21 * rap * (0.7 + 0.3 * Math.sin(tc * 11)) + spin, build: 1, pole: SB6_POLE(t), flag: 1, lamp: SB6_FLAME(t), swing: 0.15 * Math.sin(t * 1.7) + swing(t, 89.3, 0.4, 1.2, 1.5), cargo: { food: 1, skin: 1, gems: 9, glow: 0.8 }, t, dip: t > 101.68 && t < 102.9 ? 6 * Math.sin(Math.PI * (t - 101.68) / 1.22) : 0 };
  const P = sbRaftPole(R), lp = sbRaftPt(R, P.hook[0], P.hook[1] + 46); R.lampAt = { x: lp[0], y: lp[1], flame: R.lamp }; return R; }
// the near rocks (front pass, panel units): a ledge of coloured rock and crystals sliding faster than the tunnel
function sbTunFore(ctx, cam, t) { const off = cam.x * 1.35, R = K.rng(7801), span = 2400;
  for (let i = 0; i < 14; i++) { const bx = (((R() * span - off) % span) + span) % span - 200, w = 90 + R() * 140, h = 50 + R() * 80, col = ['#5a4a86', '#3f7a8c', '#7a4a7a', '#4a5a8a'][i % 4];
    celShade(ctx, [[bx - w / 2, 1240], [bx - w * 0.4, 1240 - h * 0.7], [bx - w * 0.1, 1240 - h], [bx + w * 0.3, 1240 - h * 0.8], [bx + w / 2, 1240]], col, sbDark(col, 0.3), { light: [-1, -1], off: 14, hi: sbLight(col, 0.25), lw: 3, line: sbDark(col, 0.5) });
    if (i % 3 === 0) { const gc = SB_GEMV[i % 5]; sbGlow(ctx, bx, 1240 - h - 6, 50, 0.5, gc); celShade(ctx, [[bx - 10, 1240 - h + 4], [bx - 4, 1240 - h - 40], [bx + 6, 1240 - h - 46], [bx + 12, 1240 - h + 4]], gc, sbDark(gc, 0.3), { light: [-1, -1], off: 5, hi: '#ffffff', lw: 2 }); } } }
// Sinbad on the raft (local units): o: pose fields; draws inside the raft with the duck fold when o.fold > 0
function sbTunRider(t, o) { return (c) => { const P = sbLive(t, 11, { x: 0, y: -10, dir: 1, kneel: 1, gaze: [1, -0.1], mouth: 'closed', wind: -0.8, ...o }); if (o.fold > 0) sbDuck(c, P, o.fold, sbSin6); else sbSin6(c, P); if (o.after) o.after(c, P); }; }
function sbTunDraw(ctx, t, cam, R, rider, o = {}) {
  sbTunnel(ctx, t, cam, R.lampAt, o);
  castFinish(ctx, R.x, R.y, 420, 360, (c) => sbRaft(c, { ...R, rider }), { rim: '#ffd27a', light: [-1, -1] });
  // reflections of the raft and the gem heap on the water
  sbReflect(ctx, R.x, sbTunWY(R.x, t) + 10, 300, ['#c8925a', '#ffd27a', '#ff6a8a', '#6aff9a'], t, { rows: 5, gap: 10, a: 0.4, seed: 41 });
}
// ---------- S12 (80.92 - 89.56): daylight shrinks, dark but full of colour, the roof comes down, LOW ROOF!, the duck, the rapid ----------
function sbS12World(ctx, t, cam) { const tc = SB_T2(t), R = sbTunRaft(t);
  const o = { gaze: [1, -0.1] }; o.handLW = [-90, -14]; o.handRW = [90, -14];
  if (t < 82.2) { o.gaze = gazePlan(SB_T3(t), [[80.92, [-1, -0.1]], [81.6, [1, -0.1]]], 0.15); o.look = t < 81.6 ? -0.6 : 0; o.lid = sbLid(t, 11, [81.6]); }
  else if (t < 83.1) { o.mouth = 'o'; o.eyes = 'round'; o.lid = K.lerp(0.4, 0, K.clamp((t - 82.2) / 0.6)); }
  else if (t < 84.0) { o.gaze = [0.4, -1]; o.mouth = 'o'; }
  else if (t < 85.0) { o.gaze = [1, -0.4]; o.eyes = 'wide'; o.mouth = 'o'; o.sq = 1.04; }
  else if (t < 86.86) { o.fold = K.clamp((t - 85.0) / 0.4); o.handRW = [-110, -60]; o.gaze = [0.4, -1]; if (t > 86.2) { o.wink = 'L'; } o.mouth = 'closed'; }
  else if (t < 88.7) { o.fold = 0.55; o.mouth = 'frown'; o.brow = -0.7; o.lid = t < 88.2 ? 1 : 0; o.wink = t > 88.2 ? 'R' : undefined; o.handLW = [-90 + tremble(t, 2, 9), -14]; o.handRW = [90 + tremble(t, 2, 8), -14]; }
  else { o.fold = K.clamp(0.55 - (t - 88.7) / 0.4 * 0.55); o.mouth = 'o'; o.sq = 1 + 0.04 * pulse(t, 89.0, 0.4); o.brow = 0.3; }
  const rider = sbTunRider(t, o);
  sbTunDraw(ctx, t, cam, R, rider, { day: t < 82.4 ? K.clamp(1 - (t - 80.92) / 1.5) : 0 });
  // sparks off the pole tip at the lip (86.3 - 86.8), the turban tipped forward
  if (t > 86.3 && t < 86.85) { const tp = sbRaftPt(R, ...sbRaftPole(R).top), Q = K.rng(800 + Math.floor(SB_T3(t) * 8)); for (let i = 0; i < 8; i++) { const a = -Math.PI * Q(), r = 20 + 40 * Q(); seg(ctx, tp[0], tp[1], tp[0] - Math.cos(a) * r, tp[1] + Math.sin(a) * r * 0.6, 3, '#ffe27a', 0); } sbGlow(ctx, tp[0], tp[1], 50, 0.8, '#ffd27a'); }
  // spray on the rapid
  if (t > 86.86 && t < 88.8) for (let k = 0; k < 3; k++) sbSplash(ctx, R.x + 140 - k * 120, sbTunWY(R.x, t), ((t - 86.86) * 1.5 + k * 0.33) % 1, 0.7);
}
function sbS12Over(ctx, t, cam, S) { sbTunFore(ctx, cam, t);
  if (t > 84.06 && t < 85.6) { const lp = sbP(1900, 650, cam); sbTag(ctx, S, 'LOW ROOF!', Math.min(860, lp[0]), 760, t, 84.1, 85.4, { size: 50 }); S.arrow(ctx, [Math.min(860, lp[0]), 720], [Math.min(900, lp[0]) - 10, Math.max(300, lp[1] + 20)], K.clamp((t - 84.2) / 0.4), { bend: 0.1 }); }
  if (t > 88.6 && t < 89.56) sbSpeed(ctx, [0, 200, 1000, 700], t, { dir: 1, alpha: 0.3 });
}
const SB6_CAM12 = (t) => { const x = sbTRX(t), up = t < 83.1 ? 0 : t < 83.8 ? K.ease.inOut((t - 83.1) / 0.7) : t < 84.0 ? 1 : 1 - K.ease.inOut(K.clamp((t - 84.0) / 0.6)); return { x: x + 70, y: 615 - 90 * up, zoom: 1 }; };
SB_SHOTS.push({ a: 80.92, b: 89.56, cam: SB6_CAM12, world: sbS12World, over: sbS12Over });

// ---------- S13 (89.56 - 97.02): the wide gallery: listening, sound arcs, a splash and its echo, the bats, no light either way ----------
function sbS13World(ctx, t, cam) { const tc = SB_T2(t), R = sbTunRaft(t);
  // the bats on the roof (they rustle and shuffle, never together; they squint at the lantern)
  const o = { kneel: 0, sit: 1, seat: 'floor', gaze: [1, -0.1], y: -8 };
  if (t < 90.6) { o.lid = 0.5; o.gaze = [0.8, 0]; o.tilt = 0.15; }
  else if (t < 91.7) { o.gaze = gazePlan(SB_T3(t), [[90.6, [-1, -0.2]], [91.2, [1, -0.2]]], 0.15); o.look = t < 91.25 ? -0.7 : 0.7; o.tilt = 0.12; }
  else if (t < 93.1) { o.gaze = [-1, 0]; o.mouth = t > 92.3 ? 'o' : 'smile'; o.talk = sbTalk(t, 92.35, 93.0, 4, 0.6); }
  else if (t < 94.0) { o.gaze = [0.6, -1]; o.handRW = [-60, -150]; o.mouth = 'o'; }
  else if (t < 95.0) { o.gaze = gazePlan(SB_T3(t), [[94.0, [-1, 0]], [94.5, [1, 0]]], 0.15); o.look = t < 94.5 ? -0.8 : 0.8; o.lid = sbLid(t, 11, [94.05, 94.55]); o.drop = 4 * K.clamp((t - 94.6) / 0.3); }
  else if (t < 95.9) { o.handR = [40 + 6 * osc(tc, 0.3), -150]; o.handL = [30, -140]; o.talk = sbTalk(t, 95.0, 95.9, 6, 0.5); o.brow = -0.4 * K.clamp((t - 95.4) / 0.3); o.gaze = [0.4, 0.4]; }
  else { const sh = pulse(t, 95.9, 0.4); o.drop = -8 * sh; o.aL = sh > 0.1 ? [0.9, 1.6] : undefined; o.aR = sh > 0.1 ? [0.9, 1.6] : undefined; if (t > 96.3) { o.handR = [20, -165]; o.talk = 0.4 * Math.abs(Math.sin(tc * 8)); o.gaze = [-0.8, -0.6]; } }
  sbTunDraw(ctx, t, cam, R, sbTunRider(t, o));
  [[3600, 0, 4], [3680, 1, 9], [3760, 2, 13]].forEach(([bx, i, sd]) => { const by = sbRoofY(bx) - 2, w = t > 93.1 + i * 0.2 ? 1 : 0;
    sbBat(ctx, bx, by, { s: 1.0, t, eye: t > 93.2 + i * 0.25 ? 1 : 0, squint: t > 93.6, wing: i === 1 && t > 93.4 && t < 94.0 ? Math.sin(Math.PI * (t - 93.4) / 0.6) : 0, shuffle: w * 10 * Math.sin(Math.max(0, t - 93.5 - i * 0.3) * 6) * (t < 95 ? 1 : 0) + idleSway(tc, sd, 2, 2) }); });
  // a wave runs along the water and slaps the left wall (91.7 - 92.6): a swell sliding left, the fan of drops at the wall
  if (t > 91.7 && t < 92.7) { const u = (t - 91.7) / 0.9, wx = cam.x + 300 - 900 * u; sbSwell(ctx, wx, sbTunWY(wx, t), 120, 26 * (1 - u * 0.5), t, { pal: 'day', y: [0, 0, 0, 0] }, { col: '#2f9aa8', onLayer: false }); }
  if (t > 92.3 && t < 93.0) { const u = (t - 92.3) / 0.7, wx = cam.x - 520 / cam.zoom + 30; sbSplash(ctx, wx, 860, u, 1.1); }
  for (let k = 0; k < 3; k++) sbRing(ctx, R.x + 200 - k * 160, sbTunWY(R.x, t) + 20, ((t * 0.4 + k / 3) % 1), 120, { a: 0.4 });
}
function sbS13Over(ctx, t, cam, S) { sbTunFore(ctx, cam, t);
  if (t > 90.6 && t < 91.2) soundArcs(ctx, 90, 600, 1, t, '#ffe9b0'); if (t > 91.15 && t < 91.75) soundArcs(ctx, 910, 600, -1, t, '#ffe9b0');
  if (t > 92.32 && t < 93.4) { const words = ['SPLASH...', 'splash...', 'splash']; words.forEach((w, i) => { const a = K.clamp((t - 92.4 - i * 0.22) / 0.2) * (1 - K.clamp((t - 93.1) / 0.3)); if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = `800 italic ${58 - i * 14}px ${BF}`; ctx.fillStyle = '#ffe9b0'; ctx.strokeStyle = '#2b1a3a'; ctx.lineWidth = 6 - i; ctx.textAlign = 'left'; ctx.strokeText(w, 70 + i * 230, 470 - i * 40); ctx.fillText(w, 70 + i * 230, 470 - i * 40); ctx.restore(); }); }
  if (t > 95.0 && t < 95.9) { const n = Math.min(7, 1 + Math.floor((t - 95.0) / 0.12)); S.counter(ctx, n, 640, 300, 1, { size: 70 }); }
  if (t > 95.75 && t < 96.4) sbTag(ctx, S, '...?', 640, 300, t, 95.8, 96.2, { size: 50 });
}
const SB6_CAM13 = (t) => { const x = sbTRX(t), u = K.clamp((t - 89.56) / 7.46); return { x: x + 78 + 200 * Math.sin(Math.PI * u), y: 600, zoom: 0.9 }; };
SB_SHOTS.push({ a: 89.56, b: 97.02, cam: SB6_CAM13, world: sbS13World, over: sbS13Over });

// ---------- S14 (97.02 - 108.68): HOURS PASS... in one continuous shot; glow worms; yawns, nods, lies down; the lids; hope; the far light ----------
function sbS14World(ctx, t, cam) { const tc = SB_T2(t), R = sbTunRaft(t);
  const o = { kneel: 0, sit: 1, seat: 'floor', y: -8, gaze: [1, 0] }, step = Math.floor((t - 97.02) / 0.5);
  if (t < 98.5) { const k = step % 3; if (k === 1) { o.handL = [30, -70]; o.handR = [36, -66]; o.tip = 0.25; } if (k === 2) { o.handL = [30, -80]; o.handR = [36, -76]; o.tip = 0.4; o.drop = 10; o.lid = 0.4; } }
  else if (t < 99.2) { o.handL = [30, -80]; o.handR = [36, -76]; o.tip = 0.3; o.gaze = [-0.8, -0.6]; o.lid = 0.3; }
  else if (t < 100.1) { o.gaze = [0.3, -1]; o.mouth = 'o'; o.tip = -0.1; o.drop = -4; }
  else if (t < 101.68) { const NOD = [[100.1, 0], [100.3, 0.2], [100.55, 1], [100.65, 0], [100.9, 0], [101.2, 1.6], [101.45, 1.4], [101.68, 0.6]], n = flow(tc, NOD); o.drop = 8 * n; o.tilt = 0.1 * n; o.lid = 0.6 + 0.2 * n; o.mouth = t < 100.5 ? 'open' : 'closed'; o.talk = t < 100.5 ? 1 : 0; o.sq = t > 100.9 ? 0.94 : 1; o.handLW = [-90, -14]; if (t < 101.2) o.handRW = [90, -14]; else o.handR = [30, -60]; o.tailA = lagged((u) => 0.5 * flow(u, NOD), tc, 0.12, 0.8); }
  else if (t < 102.9) { const lie = sbF(t, [[101.68, 0], [102.0, 0.45], [102.35, 0.5], [102.75, 1], [102.9, 1]]); o.sit = 1 - lie; o.lie = lie; o.lid = 0.6; o.gaze = [0, -1]; o.handLW = [-90, -14]; }
  else { o.sit = 0; o.lie = 1; o.handRW = [90, -14]; o.gaze = t < 104.3 ? [0.3, -1] : [-0.6, -0.4];
    o.lid = t < 104.3 ? 0.35 : t < 105.1 ? 0.35 + 0.65 * Math.min(1, Math.floor((SB_T3(t) - 104.3) / 0.16) / 5) : 1; if (t > 105.86) { o.brow = 0.8; o.wet = true; o.talk = sbTalk(t, 105.9, 107.0, 8, 0.35); } }
  sbTunDraw(ctx, t, cam, R, sbTunRider(t, { ...o, after: (c, P) => { if (t > 102.9) { const h = sbPt(P, [0, -115], false); sbGlow(c, h[0], h[1], 50 + 12 * Math.sin(tc * 3), 0.6 + 0.3 * K.clamp((t - 105.86) / 0.5), '#ff4a6a'); sbPebble(c, h[0], h[1], 7, 0, {}); celShade(c, ell(h[0], h[1] - 2, 11, 8, 12), C.skin, '#d99a80', { light: [-1, -1], off: 2, lw: 1.5, line: '#6a3a2a' }); } } }), { exit: t > 107.1 ? K.clamp((t - 107.1) / 1.2) : 0 });
  // the turban tail trailing in the water once he lies down
  if (t > 103) { const th = sbRaftPt(R, -120, -16); sbRibbon(ctx, th[0], th[1], Math.PI * 0.85, 50, 12, t, { amp: 4, freq: 5 }); }
}
function sbS14Over(ctx, t, cam, S) { sbTunFore(ctx, cam, t);
  if (t > 97.1 && t < 99.4) sbSpeed(ctx, [0, 150, 1000, 650], t, { dir: -1, alpha: 0.25, speed: 3000 });
  if (t > 98.52 && t < 100.2) sbTag(ctx, S, 'HOURS PASS...', 500, 170, t, 98.6, 100.0, { size: 50 });
  if (t > 100.2 && t < 101.6) { const h = sbP(sbTRX(t) - 10, 700, cam); zzz(ctx, h[0] + 60, h[1] - 80, t, 100.2); }
  if (t > 107.75) { const k = K.clamp((t - 107.75) / 0.9); ctx.save(); ctx.globalAlpha = K.ease.in(k); ctx.fillStyle = '#fffaf0'; ctx.fillRect(0, 0, 1000, 1230); ctx.restore(); }
}
const SB6_CAM14 = (t) => { const x = sbTRX(t), push = t < 104.3 ? 0 : t < 105.2 ? K.ease.inOut((t - 104.3) / 0.9) : t < 107.1 ? 1 : 1 - K.ease.inOut(K.clamp((t - 107.1) / 0.6)); return { x: x + 70 - 60 * push, y: 615 + 120 * push, zoom: 1 + 0.2 * push }; };
SB_SHOTS.push({ a: 97.02, b: 108.68, cam: SB6_CAM14, world: sbS14World, over: sbS14Over });
