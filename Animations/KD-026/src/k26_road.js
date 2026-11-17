// ===== KD-026 road (S1-S3, 0-33.34): the ascetic leads the cow home at dusk; the thief, then the devil, follow =====
const K26_RW = 2000;
const K26_RPL = [{ kind: 'tree', x: 520 }, { kind: 'wall', x: 800, w: 130, h: 120 }, { kind: 'bush', x: 1060, w: 220, h: 160, seed: 5 }, { kind: 'wall', x: 1560, w: 200, h: 80 }];
const K26_RU = [[0, 0.44], [5.4, 0.46], [6.7, 0.5, 'lin'], [12.6, 0.53], [33.34, 0.58, 'lin']];
// ascetic and cow positions (the rope tug at 3.38: the cow stops for a tuft, he is pulled back half a step)
const K26_AX = k26Fn([[0, 150], [3.38, 495, 'lin'], [3.7, 520, 'out'], [3.92, 508], [5.4, 690, 'lin'], [11.92, 880, 'out'], [14.15, 935], [15.1, 935], [15.8, 960, 'in'], [21.66, 1400, 'lin'], [33.34, 1580, 'lin']]);
const K26_CXk = k26Fn([[0, -40], [3.38, 305, 'lin'], [3.95, 309, 'out'], [4.45, 350, 'in'], [5.4, 500, 'lin']]);
const K26_CX = (t) => (t < 5.4 ? K26_CXk(t) : K26_AX(t) - 190);
// thief: behind the tree trunk (x 520), peeks, slides out, sneaks to the low wall (800), then to the bush (1060)
const K26_TX = k26Fn([[0, 540], [12.5, 540], [13.0, 566, 'out'], [14.38, 566], [14.5, 540, 'out'], [15.4, 540], [15.9, 645, 'out'], [17.14, 645], [18.4, 735], [18.8, 735], [19.4, 790, 'out'], [22.0, 790], [24.2, 1040], [33.34, 1040]]);
// devil: behind the trunk, leans out, steps out, glides to the low wall
const K26_DXr = k26Fn([[0, 530], [23.2, 530], [23.7, 584, 'out'], [24.02, 584], [24.5, 640, 'out'], [24.74, 640], [26.15, 785], [33.34, 785]]);
const K26_RFALLS = footfalls(K26_TX, 17.14, 24.3, K26_STRIDE * 0.95);

function k26RoadCow(t) {
  const P = { y: K26_GR, s: 0.85, dir: 1, ...walk(K26_CX, t, { stride: K26_COWSTRIDE * 0.85, amp: 60 }), lid: 0.35, seed: 4 };
  P.bell = Math.sin(t * 6.5) * 0.35 * P.amp + swing(t, 3.9, 0.5); P.tailSwish = Math.sin(t * 2 * Math.PI / 1.3) * 0.7;
  P.gaze = [1, 0.1];
  if (k26In(t, 1.62, 3.2)) { P.gaze = t < 2.4 ? [-0.3, -0.9] : [0.1, 0.05]; P.lid = t > 2.6 && t < 2.9 ? 0.9 : 0.35; }
  if (k26In(t, 2.28, 3.3)) { P.talk = 0.8 * pulse(t, 2.28, 1.0); P.headUp = 8 * pulse(t, 2.28, 1.0); }
  if (k26In(t, 3.38, 4.6)) { P.headDown = 0.7 * pulse(t, 3.3, 1.3); P.chew = (t - 3.38) * 3; }
  if (k26In(t, 9.94, 10.6)) { P.gaze = [0.2, -1]; P.brow = -0.5; P.lid = 0.45; }
  if (k26In(t, 11.0, 11.6)) P.headA = 0.15 * pulse(t, 11.0, 0.6);   // nudges him round the pebble
  // S2: notices the thief and keeps staring back at the tree
  if (t >= 13.6) { const head = k26CowHead(P); P.gaze = look(t, head, [[13.6, [K26_AX(t) + 200, 700]], [14.45, [580, 700]], [16.3, [580, 700]], [16.9, [K26_AX(t) + 300, 700]], [18.35, [700, 760]], [18.9, [1500, 700]], [20.3, [1500, 700]]], 0.15);
    if (k26In(t, 14.6, 15.1)) { P.eyes = 'wide'; P.lid = 0; P.ears = 1; } else if (k26In(t, 14.45, 16.3)) { P.lid = 0.45 + 0.5 * pulse(t, 15.6, 0.6); P.ears = 0.8; }
    if (k26In(t, 18.78, 19.6)) { P.ears = -1; P.tailSwish = 1.2 * Math.sin((t - 18.78) * 20) * (1 - (t - 18.78) / 0.8); } }
  if (t >= 21.66) { P.gaze = [1, 0.1]; P.lid = 0.35; }
  if (k26In(t, 26.2, 27.5)) { P.gaze = [-1, 0]; P.lid = 0.2; }   // she glances back when the stalkers swap places
  return P;
}
function k26RoadAscetic(t, cow) {
  const P = { y: K26_GR, s: 1, dir: 1, costume: 'ascetic', ...walk(K26_AX, t, { stride: K26_STRIDE, amp: 55 }), mouth: 'smile', seed: 6 };
  P.gaze = [0.9, -0.3]; P.handL = [-48, -112];   // the rope hand, behind him
  if (k26In(t, 2.28, 3.3)) { P.gaze = lookAt([P.x, 700], k26CowHead(cow)); P.handL = [-60 - 8 * Math.sin(t * 12), -150]; }
  if (k26In(t, 3.38, 4.4)) { P.tip = -0.07 * pulse(t, 3.38, 0.9); P.mouth = 'o'; }
  if (k26In(t, 4.5, 5.4)) { P.handR = PERSON_HANDS.pointFwd.R; P.tip = 0.05; P.brow = -0.4; P.mouth = 'open'; }
  if (k26In(t, 6.5, 11.92)) { P.gaze = [0.2, -0.8]; P.lid = 0.4; P.brow = -0.3; }
  if (k26In(t, 8.88, 9.9)) { P.mouth = t < 9.2 ? 'o' : 'smile'; P.drop = 4 * pulse(t, 9.2, 0.7); }
  if (k26In(t, 10.68, 11.92)) { P.lid = 1; P.tip = 0.04 * pulse(t, 11.05, 0.5); }
  if (k26In(t, 14.22, 15.1)) { P.gaze = look(t, [P.x, 700], [[14.22, [1200, 700]], [14.3, [560, 720]], [14.95, [1200, 700]]], 0.12); P.brow = -0.5; P.mouth = 'closed'; if (t > 14.8) { P.handL = PERSON_HANDS.palmsUp.L; P.handR = PERSON_HANDS.palmsUp.R; P.drop = -4 * pulse(t, 14.8, 0.3); } }
  return P;
}
function k26RoadThief(t) {
  const sneak = k26In(t, 17.14, 19.45) || k26In(t, 22.0, 24.25);
  const P = { kind: 'thief', y: K26_GR, s: 0.95, dir: 1, ...walk(K26_TX, t, { stride: K26_STRIDE * 0.95, amp: 40 }), mouth: 'smile', seed: 8 };
  const cow = K26_CX(t), cowH = [cow + 130, 730];
  P.gaze = lookAt([P.x, 700], cowH);
  if (t < 12.5) P.gaze = [1, 0];
  if (k26In(t, 12.5, 13.46)) { P.gaze = [0.6, 0.1]; P.mouth = 'closed'; }
  if (k26In(t, 13.46, 14.38)) { P.gaze = look(t, [P.x, 700], [[13.46, [P.x + 60, 690]], [13.5, cowH]], 0.07); P.mouth = 'smile'; }
  if (k26In(t, 14.38, 15.4)) { P.gaze = [-0.4, 0]; P.mouth = 'o'; }
  if (k26In(t, 15.4, 16.16)) { const o = Math.sin(t * 22) * 6; P.handL = [24 + o, -140]; P.handR = [30 - o, -134]; P.drop = 6; }
  if (k26In(t, 16.16, 17.14)) { P.handL = [30, -128]; P.handR = t < 16.4 ? [70, -170] : [34, -132]; P.sq = t < 16.4 ? anticipate(t, 16.16, 0.24, 0.07) : settleTo(t, 16.4, 0.93, 1, 0.4); P.drop = 8 * pulse(t, 16.45, 0.3); P.mouth = 'smile'; }
  if (sneak) { P.tip = 0.12; P.handL = [22, -132]; P.handR = [30, -122]; P.y -= Math.abs(Math.sin(P.ph)) * 6 * P.amp; }
  if (k26In(t, 18.4, 18.8)) { P.tip = 0.04; P.eyes = 'wide'; P.noBlink = true; }   // freezes: the cow looked back
  if (k26In(t, 18.02, 19.5)) { P.handR = t < 18.8 ? PERSON_HANDS.grip.R : [60 + 30 * K.clamp((t - 18.8) / 0.3), -150]; }
  if (k26In(t, 19.45, 22.0) || t >= 24.25) { P.legs = 0.6; P.sq = 0.85; P.tip = 0; }   // crouched behind cover
  if (k26In(t, 19.5, 20.2)) P.drop = 6 * pulse(t, 19.6, 0.5);
  if (k26In(t, 20.26, 21.6)) { P.legs = 1; P.sq = settleTo(t, 20.26, 0.85, 1, 0.3); P.handR = PERSON_HANDS.hush.R; P.wink = 'R'; P.gaze = [0, 0.05]; P.mouth = 'smile'; }
  if (k26In(t, 26.2, 27.5)) { P.legs = 1; P.sq = 1; P.gaze = look(t, [P.x, 700], [[26.2, [600, 760]], [26.9, [1300, 700]]], 0.1); if (t > 26.8) { P.handL = PERSON_HANDS.palmsUp.L; P.handR = PERSON_HANDS.palmsUp.R; } }
  if (t >= 27.5) P.gaze = lookAt([P.x, 760], [1350, 720]);
  return P;
}
function k26RoadDevil(t) {
  const sneak = k26In(t, 24.74, 26.15);
  const P = { x: K26_DXr(t), y: K26_GR, s: 1.08, dir: 1, ...walk(K26_DXr, t, { stride: K26_STRIDE * 1.08, amp: 45 }), mouth: 'smile', lid: 0.45, seed: 12 };
  P.gaze = lookAt([P.x, 690], [K26_AX(t), 690]);
  if (t < 23.2) { P.sq = 0.9; P.drop = 0; }
  if (k26In(t, 22.78, 24.02)) { P.tailCurl = 0.5 + 0.5 * Math.sin(t * 4); P.tailLash = 0.3 * Math.sin(t * 3); P.gaze = [1, 0.1]; }
  if (k26In(t, 24.02, 24.74)) { P.sq = settleTo(t, 24.02, 1.08, 1, 0.5); P.capeFlare = pulse(t, 24.02, 0.7); P.handR = PERSON_HANDS.moustache.R; P.handL = [-40, -120]; P.drop = -6; P.lid = 0.5; P.noBlink = true; }
  if (sneak) { P.tailHold = true; P.tip = 0.08; P.capeLag = 30 * P.amp; P.handR = [36, -130]; P.y -= Math.abs(Math.sin(P.ph)) * 5 * P.amp; }
  if (t >= 26.15 && t < 29.4) { P.kneel = 1; P.sq = 0.82; }
  if (k26In(t, 26.15, 26.5)) { P.kneel = K.clamp((t - 26.15) / 0.12); P.sq = 1 - 0.18 * P.kneel; }
  if (k26In(t, 26.78, 28.56)) { P.lid = 0.6; P.mouth = 'closed'; P.gaze = [0.2, -0.9]; }
  if (k26In(t, 28.56, 29.2)) { P.handR = [70 + 20 * Math.sin((t - 28.56) * 25), -170]; P.lid = t < 28.9 ? 1 : 0.4; P.mouth = 'frown'; }
  if (t >= 29.2) { P.kneel = K.clamp(1 - (t - 29.2) / 0.4); P.sq = 1 - 0.18 * P.kneel; }
  if (k26In(t, 29.4, 30.56)) { P.eyes = 'wide'; P.lid = 0; P.brow = -0.6; P.mouth = 'smile'; P.gaze = [0.3, -0.8]; P.noBlink = true; }
  if (t >= 30.56 && t < 33.34) { const o = k26B(t, 30.56, 0.35, 'back'); P.sack = { open: o, rot: 0.2 * (1 - o) }; P.handR = t < 30.7 ? [20, -110] : t < 31.16 ? [80, -190] : [110, -175]; P.sq = anticipate(t, 30.4, 0.16, 0.06); P.tailLash = swing(t, 30.6, 0.8, 2.2, 3); }
  if (k26In(t, 31.16, 32.34)) { P.wink = 'L'; P.gaze = [1, -0.05]; P.mouth = 'o'; P.lid = 0; P.noBlink = true; }
  if (t >= 32.34) { P.handR = PERSON_HANDS.hush.R; P.sack = { open: 0.6, rot: -1.2 }; P.handL = [-60, -100]; P.gaze = [0, 0.05]; P.lid = blend(t, 32.4, 33.0, 0, 0.45); P.mouth = 'smile'; P.noBlink = true; }
  P.tailCurl = P.tailCurl ?? 0.2; return P;
}
function k26RoadWorld(ctx, t, cam) {
  const u = k26Path(t, K26_RU), camX = cam.x - 500 / cam.zoom;
  countryRoad(ctx, { w: K26_RW, u, camX, places: K26_RPL, house: { x: 860, lit: 1 }, t });
  const cow = k26RoadCow(t), A = k26RoadAscetic(t, cow), T = k26RoadThief(t), D = k26RoadDevil(t);
  // leaves fall where the thief vanished (14.4)
  if (k26In(t, 14.4, 16.0)) for (let i = 0; i < 3; i++) { const u2 = (t - 14.4 - i * 0.15) / 1.4; if (u2 > 0 && u2 < 1) k26Leaf(ctx, 590 + i * 22 + 18 * Math.sin(u2 * 9 + i), 560 + u2 * 330, Math.sin(u2 * 8 + i)); }
  // hiders first, then the occluders, then the walkers in front
  if (t >= 21.66) k26Devil(ctx, D);
  person(ctx, T);
  for (const f of K26_RFALLS) if (t >= f.t && t < f.t + 0.4) dustBurst(ctx, f.x + 10, K26_GR - 2, t - f.t, 3, 4, 8, 16, 0.4, Math.round(f.t * 10));
  countryRoad(ctx, { w: K26_RW, front: true, places: K26_RPL });
  const ropeA = (() => { k26Cow(ctx, cow); const h = cow.headW; return [h[0] - 34, h[1] + 34]; })();
  person(ctx, A);
  k26Rope(ctx, k26Hand(A, 0), ropeA, k26In(t, 3.38, 3.95) ? 0.05 : t >= 3.95 && t < 4.4 ? 0.4 : 1);
  // grass tuft she stops for
  if (t < 5) { const gx = 410; for (let k = -2; k <= 2; k++) seg(ctx, gx + k * 6, K26_GR + 2, gx + k * 9, K26_GR - 22 + (t > 3.6 ? 12 : 0), 4, GREEN2, 2); }
  // thought cloud: the daydream (6.5-12.3)
  if (t >= 6.4 && t < 12.3) { const h = k26Head(A), p = t < 11.92 ? K.clamp((t - 6.4) / 1.1) : 1 - K.clamp((t - 11.92) / 0.35);
    thoughtCloud(ctx, h[0] - 20, h[1] - 250, 520, 340, t, { p, tail: [h[0] + 10, h[1] - 50], bg: CREAM, scale: 0.52, at: [500, 840], inside: (c) => k26Dream(c, t) }); }
  return { A, cow, T, D };
}
// the dream inside the cloud (world units around [500, 760], scale 0.42)
function k26Dream(c, t) {
  const drink = k26In(t, 8.88, 9.95), dx = 250;
  person(c, { x: dx, y: 1020, s: 1.1, costume: 'ascetic', mouth: drink ? 'o' : 'smile', lid: drink ? 1 : 0.2, handR: drink ? [22, -178] : [52, -120], handL: drink ? [-10, -176] : [-40, -110], noBlink: true });
  k26Bowl(c, dx + (drink ? 10 : 58) * 1.1, 1020 - (drink ? 186 : 120) * 1.1, 2.0 * (drink ? 1.1 : 1), 1);
  // the cow and a jug filling under the udder
  k26Cow(c, { x: 720, y: 1020, s: 0.9, dir: -1, lid: 0.4, noBlink: true, mouth: 'smile' });
  const fill = k26B(t, 9.94, 0.7, 'inOut'); shape(c, [[640, 1020], [640, 900], [700, 900], [700, 1020]], C.white, { lw: 5, seed: 31 }); if (fill > 0) { c.save(); c.fillStyle = CREAM; c.fillRect(643, 1018 - 112 * fill, 54, 112 * fill); c.restore(); }
  if (k26In(t, 9.94, 10.7)) for (let i = 0; i < 3; i++) { const u = ((t * 3 + i / 3) % 1); shape(c, ell(670, 905 + u * 90, 5, 8, 8), C.white, { lw: 2 }); }
  // DAY 1..5 with stacking bowls
  const days = [10.68, 10.92, 11.14, 11.38, 11.62], n = days.filter((d) => t >= d).length;
  if (n > 0) { c.save(); S0.counter(c, 'DAY ' + n, 500, 600, 1, { size: 90, seed: 70 + n }); c.restore(); for (let i = 0; i < n; i++) k26Bowl(c, 430 + (i % 3) * 60 + (i >= 3 ? 30 : 0), 1020 - (i >= 3 ? 30 : 0), 1.6, 1); }
}
const K26_RCAM = [[0, { x: 500, y: 690, zoom: 1.15 }], [4.4, { x: 700, y: 690, zoom: 1.15 }], [4.95, { x: 900, y: 660, zoom: 1.15 }], [5.4, { x: 900, y: 660, zoom: 1.15 }], [6.3, { x: 760, y: 600, zoom: 1.5 }], [11.92, { x: 830, y: 600, zoom: 1.5 }],
  [12.5, { x: 680, y: 700, zoom: 1.6 }], [16.16, { x: 690, y: 700, zoom: 1.6 }], [16.9, { x: 840, y: 690, zoom: 1.2 }], [21.66, { x: 860, y: 690, zoom: 1.2 }], [23.6, { x: 960, y: 615, zoom: 1.0 }],
  [29.4, { x: 960, y: 615, zoom: 1.0 }], [30.4, { x: 820, y: 700, zoom: 1.7 }], [32.3, { x: 830, y: 690, zoom: 1.8 }], [33.34, { x: 830, y: 690, zoom: 1.8 }]];
// panel-space lettering for the road
function k26RoadOver(ctx, t, cam, S, W) {
  const P = (x, y) => k26P(x, y, cam);
  if (t < 2.8) S.title(ctx, 'The Thief and the Devil', 500, 200, k26B(t, 0.1, 0.9) * K.clamp((2.8 - t) / 0.3), { size: 62, align: 'center' });
  { const c = W.cow.headW, p = P(c[0] - 40, c[1] - 90); k26Lab(ctx, S, t, 'MILKING COW', Math.max(200, p[0] - 60), p[1] - 120, 1.62, 3.2); k26Arr(ctx, S, t, [Math.max(200, p[0] - 60), p[1] - 100], [p[0], p[1] + 10], 1.62, 3.2); }
  k26Lab(ctx, S, t, 'HOME', 760, 560, 4.5, 5.6); k26Arr(ctx, S, t, [760, 590], [975, 640], 4.5, 5.6, { bend: 0.15 });
  { const h = P(K26_TX(13), 700); k26Lab(ctx, S, t, 'THIEF', h[0] + 150, h[1] - 140, 12.66, 14.3); k26Arr(ctx, S, t, [h[0] + 140, h[1] - 120], [h[0] + 50, h[1] - 40], 12.66, 14.3, { bend: -0.2 }); }
  if (k26In(t, 13.46, 14.25)) { const a = P(K26_TX(t) + 10, 712), b = P(W.cow.headW[0], W.cow.headW[1]); k26Dash(ctx, a, b, k26B(t, 13.46, 0.3)); }
  if (k26In(t, 16.16, 17.2)) { const h = P(K26_TX(t), 705); S.emphasis(ctx, h[0], h[1], 120, k26B(t, 16.16, 0.4) * k26Fade(t, 16.16, 17.2, 0.15), { word: 'YES!', wx: 0.6, wy: 0.9 }); }
  // the thief's icon balloon (18.02-20.25)
  if (k26In(t, 18.02, 20.25)) { const h = P(K26_TX(t), 700 - (t > 19.45 ? -40 : 0)), bx = h[0] + 170, by = h[1] - 230;
    ctx.save(); ctx.globalAlpha = k26Fade(t, 18.02, 20.25, 0.15); k26Balloon(ctx, bx, by, 290, 210, [h[0] + 40, h[1] - 60], k26B(t, 18.02, 0.35, 'lin'), (c) => {
      if (t < 19.5) { k26IconCow(c, -30, 70, 0.42); c.save(); c.lineWidth = 6; c.strokeStyle = C.black; c.beginPath(); c.moveTo(20, 20); c.quadraticCurveTo(60, 50, 90, 10); c.stroke(); c.restore(); shape(c, ell(92, 6, 18, 16, 12), C.white, { lw: 4, seed: 5, dot: C.skin, pitch: 5, rad: 0.3 }); }
      else { moon(c, -90, -40, 32); k26IconMan(c, 10, 60, 0.32, { lie: 1, lid: 1, mouth: 'closed' }); k26Zs(c, 50, -10, 3, 26, C.blue); } }); ctx.restore(); }
  if (k26In(t, 18.78, 19.5)) { const h = P(K26_TX(t), 700), c = P(W.cow.headW[0], W.cow.headW[1] + 40); k26Arr(ctx, S, t, [h[0] + 260, h[1] - 170], [Math.min(960, c[0]), c[1]], 18.78, 19.5, { bend: -0.25 }); }
  // devil
  { const d = P(640, 690); k26Lab(ctx, S, t, 'DEVIL', d[0] - 40, d[1] - 170, 24.02, 25.4); k26Arr(ctx, S, t, [d[0] - 40, d[1] - 150], [d[0] - 10, d[1] - 70], 24.02, 25.4, { bend: 0.2 }); }
  if (k26In(t, 25.5, 26.7)) { const a = P(K26_DXr(t) + 30, 640), b = P(Math.min(K26_AX(t), 1440), 660); ctx.save(); ctx.globalAlpha = k26Fade(t, 25.5, 26.7, 0.15); S.arrow(ctx, a, b, k26B(t, 25.5, 0.6), { width: 18, bend: -0.35 }); ctx.restore(); }
  if (k26In(t, 26.78, 33.34)) { const d = W.D, h = P(d.x, d.y - 205 * 1.08 * (d.sq ?? 1)), bx = Math.min(800, h[0] + 200), by = Math.max(170, h[1] - 230);
    ctx.save(); ctx.globalAlpha = k26Fade(t, 26.78, 33.34, 0.2); k26Balloon(ctx, bx, by, 280, 210, [h[0] + 40, h[1] - 40], k26B(t, 26.78, 0.35, 'lin'), (c) => {
      if (t < 29.6) { k26IconCow(c, -10, 70, 0.42); if (t >= 28.56) k26X(c, 0, 10, 80, k26B(t, 28.56, 0.25, 'lin')); }
      else { k26IconMan(c, 0, 92, 0.5, { mouth: 'smile', lid: t >= 32.34 ? 1 : 0, lie: 0 }); if (t >= 32.34) { moon(c, -90, -50, 26); k26Zs(c, 50, -40, 3, 24, C.blue); } } }); ctx.restore(); }
  if (k26In(t, 31.16, 32.34)) { const s0 = P(W.D.x + 100, 700); k26Arr(ctx, S, t, [s0[0] + 40, s0[1]], [960, s0[1] - 20], 31.2, 32.34, { bend: 0.1 }); }
}
