// ===== KD-026 yard (S4-S6, 33.34-63.41): two stalkers behind one bush; the deal; waiting for the lamp to go out =====
const K26_YC = { x0: 560, x1: 960, top: 560, door: [620, 700, 720], win: [800, 880, 620, 700], chimney: [880, 915, 400] };
const K26_YBUSH = { x: 250, w: 280, h: 150, seed: 6 };
const K26_YU = [[33.34, 0.6], [55.42, 0.63], [56.5, 0.68], [63.4, 0.7]];
const K26_YTX = k26Fn([[33.34, 200], [34.62, 200], [35.1, 222], [35.3, 222], [35.75, 196, 'out'], [63.4, 196]]);
const K26_YDX = k26Fn([[33.34, -90], [34.55, 302, 'out'], [34.62, 302], [35.1, 280], [35.3, 280], [35.75, 306, 'out'], [63.4, 306]]);
const K26_YAX = k26Fn([[33.34, 545], [60.26, 545], [61.6, 660, 'inOut']]);
const K26_YCX = k26Fn([[33.34, 840], [60.5, 840], [62.6, 650, 'inOut']]);
const K26_YFALLS = footfalls(K26_YDX, 33.34, 34.6, K26_STRIDE * 1.08);
const K26_DOORX = 660, K26_HOUSE = [660, 760];

function k26YardThief(t, D) {
  const P = { kind: 'thief', y: K26_GR, s: 0.95, dir: 1, x: K26_YTX(t), mouth: 'closed', seed: 8, sq: 0.95 };
  const myH = [P.x, 712], dH = [D.x, 690];
  P.gaze = lookAt(myH, K26_HOUSE);
  if (k26In(t, 34.62, 35.3)) { P.gaze = look(t, myH, [[34.62, K26_HOUSE], [34.7, dH]], 0.45); P.eyes = t > 34.95 ? 'wide' : 'open'; P.noBlink = true; P.tilt = 0.12 * k26B(t, 34.62, 0.5); }
  if (k26In(t, 35.3, 36.42)) { const [x, l] = hop(t, 35.3, 0.45, P.x, P.x, 40); P.y -= l + (t >= 35.75 ? 30 * (1 - k26B(t, 36.2, 0.22)) : 0); P.sq = 0.95 * landSquash(t, 35.75, 0.12); P.handRW = null; P.handR = [Math.min(108, (D.x - P.x) / 0.95), -176]; P.gaze = lookAt(myH, dH); P.eyes = 'wide'; P.mouth = 'closed'; P.noBlink = true; }
  if (t >= 36.42) P.gaze = lookAt(myH, dH);
  if (k26In(t, 36.42, 37.5)) { P.handR = [70, -222]; P.handL = PERSON_HANDS.cupMouth.R.map((v, i) => (i ? v : -v)); P.mouth = 'o'; P.drop = 5; }
  if (k26In(t, 37.62, 38.6)) { P.mouth = 'frown'; }
  if (k26In(t, 38.68, 39.9)) { P.handL = PERSON_HANDS.folded.L; P.handR = PERSON_HANDS.folded.R; P.tip = 0.08; P.lid = 0.5; P.y -= Math.abs(Math.sin(t * 9)) * 2; }
  if (k26In(t, 39.92, 41.2)) { P.handR = [100, -140]; P.talk = talk(t, [[39.92, 40.5]]) * 0.6; P.tip = 0.06; }
  // S5: the thief's case
  if (k26In(t, 41.28, 42.7)) { P.handR = PERSON_HANDS.chest.R; P.drop = -6; P.mouth = 'smile'; P.sq = 0.97; }
  if (k26In(t, 42.78, 44.5)) { P.talk = talk(t, [[42.78, 44.4]], 1) * 0.7; const a = Math.sin(t * 9); P.handR = [70, -150 + 26 * a]; P.handL = [40, -150 - 26 * a]; }
  if (k26In(t, 44.62, 45.3)) { P.handR = [110, -160]; P.gaze = lookAt(myH, [800, 760]); }
  if (k26In(t, 45.32, 46.5)) { P.handL = [26, -186]; P.handR = [40, -180]; P.tilt = 0.35; P.lid = t > 45.6 && t < 46.2 ? 1 : 0.3; P.mouth = 'o'; }
  if (k26In(t, 46.58, 47.4)) { P.handR = [100, -170]; P.mouth = 'smile'; P.gaze = lookAt(myH, [480, 700]); }
  if (k26In(t, 47.44, 48.8)) { P.tip = -0.08; P.mouth = 'o'; }
  if (k26In(t, 48.9, 50.4)) P.gaze = look(t, myH, [[48.9, dH], [49.3, [D.x + 20, 620]], [49.7, dH], [50.0, [D.x - 15, 620]]], 0.07);
  if (k26In(t, 50.44, 52.5)) P.gaze = lookAt(myH, [D.x + 40, 760]);
  if (k26In(t, 52.54, 53.84)) { P.gaze = look(t, myH, [[52.54, [480, 700]], [52.75, [D.x + 50, 770]], [52.95, dH]], 0.07); P.drop = 4 * pulse(t, 53.0, 0.25); if (t > 53.2) { P.handL = PERSON_HANDS.palmsUp.L; P.handR = PERSON_HANDS.palmsUp.R; P.mouth = 'smile'; } }
  // S6
  if (k26In(t, 53.84, 55.3)) { P.gaze = look(t, myH, [[53.84, K26_HOUSE], [54.9, dH]], 0.3); P.mouth = 'smile'; }
  if (k26In(t, 55.42, 56.8)) { P.gaze = lookAt(myH, [420, 320]); if (t > 55.56) P.handR = PERSON_HANDS.pointUp.R; P.drop = 5 * pulse(t, 56.0, 0.4); }
  if (k26In(t, 56.9, 58.0)) { const pump = 8 * pulse(t, 57.1, 0.35); P.handR = [(253 - P.x) / 0.95, (792 + pump - 900) / 0.95]; P.mouth = 'smile'; P.gaze = lookAt(myH, dH); if (t > 57.6) { P.handR = [12, -168]; P.mouth = 'o'; P.lid = 0.6; } }
  if (t >= 58.14) { P.sq = K.lerp(0.95, 0.88, k26B(t, 58.14, 0.6)) * breathe(t, 2); P.handR = PERSON_HANDS.chin.R; P.handL = [-10, -150]; P.gaze = lookAt(myH, [840, 660]); P.mouth = 'smile'; }
  if (k26In(t, 61.0, 61.7)) { const o = Math.sin(t * 22) * 6; P.handL = [24 + o, -140]; P.handR = [30 - o, -134]; }
  if (t >= 61.74) { P.lid = 0.5; P.mouth = 'smile'; P.handR = [Math.min(108, (D.x - 40 - P.x) / 0.95), -130 + 6 * pulse(t, 62.1, 0.3)]; }
  return P;
}
function k26YardDevil(t, T) {
  const P = { x: K26_YDX(t), y: K26_GR, s: 1.08, dir: -1, mouth: 'smile', seed: 12, sq: 0.94, lid: 0.4, ...{} };
  if (t < 34.6) { Object.assign(P, walk(K26_YDX, t, { stride: K26_STRIDE * 1.08, amp: 45 })); P.dir = 1; P.tailHold = true; P.tip = 0.08; P.capeLag = 30 * P.amp; P.y -= Math.abs(Math.sin(P.ph)) * 5 * P.amp; }
  const myH = [P.x, 690], tH = [T.x, 712];
  P.gaze = lookAt(myH, K26_HOUSE);
  if (k26In(t, 34.62, 35.3)) { P.dir = -1; P.gaze = look(t, myH, [[34.62, K26_HOUSE], [34.74, tH]], 0.45); P.eyes = t > 35.0 ? 'wide' : 'open'; P.lid = 0; P.noBlink = true; P.tilt = 0.12 * k26B(t, 34.7, 0.5); }
  if (k26In(t, 35.3, 36.42)) { const [, l] = hop(t, 35.36, 0.45, 0, 0, 40); P.y -= l + (t >= 35.81 ? 24 * (1 - k26B(t, 36.2, 0.22)) : 0); P.sq = 0.94 * landSquash(t, 35.81, 0.12); P.handRW = [T.x + 6, 900 - 30 - 176 * 0.95]; P.gaze = lookAt(myH, tH); P.eyes = 'wide'; P.lid = 0; P.noBlink = true; P.capeFlare = pulse(t, 35.3, 0.5); }
  if (t >= 36.42) P.gaze = lookAt(myH, tH);
  if (k26In(t, 36.42, 37.5)) { P.brow = 0.6; P.lid = 0.3; P.mouth = 'closed'; }
  if (k26In(t, 37.62, 38.6)) { P.handRW = [T.x + 20, 900 - 192 * 0.95]; P.brow = -0.5; P.drop = -5; P.mouth = 'o'; }
  if (k26In(t, 38.68, 39.9)) { P.handL = PERSON_HANDS.folded.L; P.handR = PERSON_HANDS.folded.R; P.tip = 0.08; P.lid = 0.5; P.tailLash = 0.4 * Math.sin(t * 14); }
  if (k26In(t, 39.92, 41.2)) { P.handRW = [T.x + 30, 900 - 125 * 0.95]; P.talk = talk(t, [[39.92, 40.5]], 2) * 0.6; P.tip = 0.06; }
  if (k26In(t, 41.28, 47.44)) { P.handL = PERSON_HANDS.folded.L; P.handR = PERSON_HANDS.folded.R; P.brow = -0.5; P.lid = 0.35; P.mouth = 'closed'; }
  if (k26In(t, 44.62, 45.4)) P.gaze = look(t, myH, [[44.62, [800, 760]], [45.1, tH]], 0.15);
  if (k26In(t, 46.58, 47.4)) { P.drop = 6 * (pulse(t, 46.6, 0.35) + pulse(t, 47.0, 0.35)); P.lid = 0.5; }
  if (k26In(t, 47.44, 48.8)) { P.sq = settleTo(t, 47.44, 0.94, 1.06, 0.6); P.capeFlare = pulse(t, 47.6, 0.9); P.drop = -6; P.talk = 0.3 * pulse(t, 47.5, 0.4); P.handL = PERSON_HANDS.chest.R.map((v, i) => (i ? v : -v)); }
  if (k26In(t, 48.9, 50.4)) { P.sq = 1.06; P.handR = [20 + 6 * Math.sin(t * 10), -172]; P.lid = 0.5; P.mouth = 'smile'; P.noBlink = true; }
  if (k26In(t, 50.44, 51.98)) { P.sq = 1.04; P.talk = talk(t, [[50.44, 51.9]], 3) * 0.7; P.sack = { open: k26B(t, 50.44, 0.3, 'back'), rot: 0.3 }; P.handR = [70, -170]; P.tailCurl = 0.5 + 0.4 * Math.sin(t * 6); }
  if (k26In(t, 51.98, 53.84)) { P.handL = [-110, -160]; P.sack = { open: 0.7, rot: 0.6 }; P.handR = [40, -110]; P.gaze = lookAt(myH, [480, 700]); P.lid = 0.4; }
  if (k26In(t, 53.84, 55.3)) { P.gaze = look(t, myH, [[53.84, K26_HOUSE], [54.97, tH]], 0.3); P.mouth = 'smile'; }
  if (k26In(t, 55.42, 56.8)) { P.gaze = lookAt(myH, [420, 320]); P.handR = PERSON_HANDS.pointUp.R; P.drop = 5 * pulse(t, 55.9, 0.4); }
  if (k26In(t, 56.9, 58.0)) { P.handRW = [247, 792 + 8 * pulse(t, 57.1, 0.35)]; P.mouth = 'smile'; P.gaze = lookAt(myH, tH); }
  if (t >= 58.14) { P.sq = K.lerp(0.94, 0.86, k26B(t, 58.14, 0.6)) * breathe(t, 5); P.handR = PERSON_HANDS.chin.R; P.gaze = lookAt(myH, [840, 660]); P.lid = 0.4; P.mouth = 'smile'; }
  if (k26In(t, 61.0, 61.7)) { P.handR = [40 + 20 * Math.sin(t * 9), -100]; P.sack = { open: 0, rot: -1.3 }; }
  if (t >= 61.74) { P.lid = 0.5; P.tailCurl = k26B(t, 61.74, 0.6); P.handRW = [T.x + 40, 900 - 124 * 0.95 - 6 * pulse(t, 62.1, 0.3)]; }
  return P;
}
function k26YardWorld(ctx, t) {
  const u = k26Path(t, K26_YU), door = k26Path(t, [[33.34, 0], [60.9, 0], [61.3, 1], [62.7, 1], [63.0, 0.1]]);
  const winLit = 1;
  villageYard(ctx, { u, cottage: K26_YC, door, winLit, trough: 650, tree: false, forest: [0, 520], t });
  // the ascetic waters the cow, later leads her inside
  const cw = { y: K26_GR, s: 0.85, dir: -1, ...walk(K26_YCX, t, { stride: K26_COWSTRIDE * 0.85, amp: 50 }), lid: 0.35, seed: 4 };
  cw.headDown = t < 35.74 ? 1 : t < 36.6 ? blend(t, 35.74, 36.0, 1, 0) : t < 39.0 ? blend(t, 37.4, 37.9, 0, 1) : t < 44.62 ? 1 : t < 45.6 ? 0.2 : t < 60.26 ? blend(t, 46.0, 46.6, 0.2, 1) : 0;
  cw.chew = t * 1.5; cw.tailSwish = Math.sin(t * 2.4) * 0.6; cw.bell = Math.sin(t * 5) * 0.2 * (cw.amp + 0.3);
  if (k26In(t, 35.74, 39.0)) { cw.gaze = [-1, 0.05]; cw.eyes = t < 36.2 ? 'wide' : 'open'; cw.lid = 0.2; }
  if (k26In(t, 39.92, 41.3)) { cw.headA = 0.2 * pulse(t, 39.92, 1.3); cw.gaze = [-1, -0.1]; }
  if (k26In(t, 44.62, 45.6)) { cw.gaze = [-1, 0]; cw.lid = 0.1; }
  if (k26In(t, 60.9, 62.0)) { cw.headA = 0.15; cw.gaze = [1, 0]; }
  const A = { x: K26_YAX(t), y: K26_GR, s: 1, dir: 1, costume: 'ascetic', ...walk(K26_YAX, t, { stride: K26_STRIDE, amp: 55 }), mouth: 'smile', seed: 6, gaze: [1, 0.3] };
  if (t < 60.26) { A.handR = [72, -126]; A.lid = 0.3; }
  if (k26In(t, 35.74, 36.4)) { A.gaze = look(t, [A.x, 700], [[35.74, [240, 740]], [36.2, [700, 820]]], 0.15); A.brow = -0.4; A.lid = 0; A.mouth = 'closed'; }
  if (k26In(t, 51.98, 53.0)) { A.handR = [100, -150 + 6 * Math.sin(t * 20)]; A.mouth = 'smile'; }
  if (t >= 60.26) { A.handL = [-56, -112]; A.alpha = 1 - k26B(t, 61.4, 0.5, 'lin'); }
  if (t >= 61.4) cw.alpha = 1 - k26B(t, 62.3, 0.5, 'lin');
  if (A.alpha === undefined || A.alpha > 0.01) person(ctx, A);
  if (t < 60.26) { const h = k26Hand(A, 1); ctx.save(); ctx.translate(h[0] + 10, h[1] - 8); ctx.rotate(0.9 + 0.1 * Math.sin(t * 2)); shape(ctx, [[-14, 0], [14, 0], [18, 30], [-18, 30]], '#e8742a', { lw: 4, seed: 41, dot: C.red, pitch: 7, rad: 0.2, da: 0.4 }); ctx.restore(); for (let i = 0; i < 4; i++) { const v = ((t * 2.5 + i / 4) % 1); shape(ctx, ell(h[0] + 40 + v * 14, h[1] + 20 + v * 70, 4, 6, 8), '#9ec2ff', { lw: 2 }); } }
  if (cw.alpha == null || cw.alpha > 0.01) { k26Cow(ctx, cw); if (t >= 60.26 && t < 62.6) k26Rope(ctx, k26Hand(A, 0), [cw.headW[0] + 28, cw.headW[1] + 30], 0.8); }
  if (k26In(t, 35.74, 37.0)) for (let i = 0; i < 3; i++) { const v = (t - 35.74 - i * 0.2) / 0.6; if (v > 0 && v < 1) shape(ctx, ell(cw.headW[0] - 30 - i * 6, cw.headW[1] + 40 + v * 70, 4, 6, 8), '#9ec2ff', { lw: 2 }); }
  // intruders, then the bush in front of them
  const D0 = { x: K26_YDX(t) }, T = k26YardThief(t, D0), D = k26YardDevil(t, T);
  const drawPair = () => { k26Devil(ctx, D); person(ctx, T); };
  drawPair();
  for (const f of K26_YFALLS) if (t >= f.t && t < f.t + 0.4) dustBurst(ctx, f.x, K26_GR - 2, t - f.t, 3, 4, 8, 16, 0.4, Math.round(f.t * 10));
  const shake = k26In(t, 35.3, 36.6) ? 5 * Math.sin((t - 35.3) * 40) * (1 - (t - 35.3) / 1.3) : 0;
  ctx.save(); ctx.translate(K26_YBUSH.x, K26_GR); ctx.rotate(shake * 0.006); ctx.translate(-K26_YBUSH.x, -K26_GR); bush(ctx, K26_YBUSH); ctx.restore();
  if (k26In(t, 35.3, 37.3)) for (let i = 0; i < 3; i++) { const v = (t - 35.35 - i * 0.12) / 1.6; if (v > 0 && v < 1) k26Leaf(ctx, 200 + i * 50 + 20 * Math.sin(v * 8 + i), 760 + v * 140, Math.sin(v * 7 + i)); }
  // handshake spark
  if (k26In(t, 57.0, 57.6)) { dustBurst(ctx, 250, 790, t - 57.05, 6, 4, 9, 30, 0.45, 3); star(ctx, 250, 770, 18 * k26Pop(t, 57.0, 0.2) * k26Fade(t, 57.0, 57.6, 0.2), C.yellow, t * 4); }
  // the shared thought cloud: lit window and lamp, flame out, Z Z Z
  if (t >= 58.98 && t < 62.98) { const p = K.clamp((t - 58.98) / 0.8) * K.clamp((62.98 - t) / 0.25);
    thoughtCloud(ctx, 300, 420, 380, 260, t, { p, tail: [255, 640], bg: CREAM, scale: 0.36, at: [500, 760], inside: (c) => {
      const out = t >= 61.0; c.save(); c.fillStyle = out ? NAVY2 : '#ffd98a'; c.fillRect(260, 520, 300, 300); c.lineWidth = 12; c.strokeStyle = '#7a4212'; c.strokeRect(260, 520, 300, 300); c.beginPath(); c.moveTo(410, 520); c.lineTo(410, 820); c.moveTo(260, 670); c.lineTo(560, 670); c.stroke(); c.restore();
      k26Lamp(c, 760, 900, out ? 0 : 1, t, 5); if (out && t < 61.7) { for (let i = 0; i < 3; i++) shape(c, ell(840 + i * 20, 700 - i * 50 - (t - 61) * 60, 14 + i * 4, 10 + i * 3, 10), '#b9b4c6', { lw: 3 }); }
      if (t >= 61.74) { k26IconMan(c, 430, 1000, 0.7, { lie: 1, lid: 1, mouth: 'closed' }); k26Zs(c, 600, 900, 3, 60, C.blue); } } }); }
  return { T, D, cow: cw, A };
}
const K26_YCAM = [[33.34, { x: 500, y: 615, zoom: 1.0 }], [34.62, { x: 500, y: 615, zoom: 1.0 }], [36.4, { x: 300, y: 700, zoom: 1.8 }], [41.28, { x: 300, y: 700, zoom: 1.8 }], [42.5, { x: 280, y: 700, zoom: 1.8 }],
  [44.62, { x: 280, y: 700, zoom: 1.8 }], [44.95, { x: 520, y: 650, zoom: 1.3 }], [45.3, { x: 520, y: 650, zoom: 1.3 }], [45.7, { x: 285, y: 700, zoom: 1.8 }], [47.44, { x: 285, y: 700, zoom: 1.8 }], [48.6, { x: 320, y: 700, zoom: 1.8 }],
  [51.98, { x: 320, y: 700, zoom: 1.8 }], [52.3, { x: 560, y: 650, zoom: 1.3 }], [52.6, { x: 560, y: 650, zoom: 1.3 }], [53.0, { x: 300, y: 700, zoom: 1.8 }], [55.0, { x: 300, y: 700, zoom: 1.75 }], [58.1, { x: 560, y: 640, zoom: 1.25 }], [63.41, { x: 560, y: 640, zoom: 1.25 }]];
function k26YardOver(ctx, t, cam, S, W) {
  const P = (x, y) => k26P(x, y, cam), mid = P((W.T.x + W.D.x) / 2, 560);
  if (k26In(t, 34.95, 36.0)) k26Word(ctx, t, '?!', mid[0], mid[1], 34.95, 36.0, 90);
  if (k26In(t, 36.42, 37.5)) { const h = P(W.T.x, 712); k26Balloon(ctx, h[0] - 70, h[1] - 230, 110, 100, [h[0] - 20, h[1] - 80], k26B(t, 36.42, 0.3, 'lin') * k26Fade(t, 36.42, 37.5, 0.15), (c) => sfx(c, '?', 0, 4, 70, 1, { fill: C.yellow })); }
  if (k26In(t, 37.62, 38.6)) { const h = P(W.D.x, 690); k26Balloon(ctx, h[0] + 80, h[1] - 230, 110, 100, [h[0] + 30, h[1] - 80], k26B(t, 37.62, 0.3, 'lin') * k26Fade(t, 37.62, 38.6, 0.15), (c) => sfx(c, '?', 0, 4, 70, 1, { fill: C.yellow })); }
  if (k26In(t, 39.92, 41.2)) { const a = P(W.T.x, 712), b = P(W.D.x, 690), f = k26Fade(t, 39.92, 41.2, 0.15);
    k26Balloon(ctx, a[0] - 60, a[1] - 260, 200, 110, [a[0] - 10, a[1] - 90], k26B(t, 39.92, 0.3, 'lin') * f, (c) => sfx(c, 'YOU?!', 0, 4, 52, 1, { fill: C.white }));
    k26Balloon(ctx, b[0] + 70, b[1] - 260, 200, 110, [b[0] + 20, b[1] - 90], k26B(t, 40.0, 0.3, 'lin') * f, (c) => sfx(c, 'YOU?!', 0, 4, 52, 1, { fill: C.white })); }
  // the thief's case (43.42-47.4) and the devil's (50.44-52.5): icon balloons on the outer side of each speaker
  if (k26In(t, 43.42, 47.4)) { const h = P(W.T.x, 712), f = k26Fade(t, 43.42, 47.4, 0.2);
    k26Balloon(ctx, Math.max(170, h[0] - 40), Math.max(170, h[1] - 330), 300, 220, [h[0] - 10, h[1] - 90], k26B(t, 43.42, 0.35, 'lin') * f, (c) => { k26IconCow(c, -40, 80, 0.45); if (t >= 45.32) { k26Zs(c, 60, -20, 3, 30, C.blue); } }); }
  if (k26In(t, 50.44, 52.6)) { const h = P(W.D.x, 690), f = k26Fade(t, 50.44, 52.6, 0.2);
    k26Balloon(ctx, Math.min(830, h[0] + 120), Math.max(170, h[1] - 330), 300, 220, [h[0] + 30, h[1] - 90], k26B(t, 50.44, 0.35, 'lin') * f, (c) => { const d = k26B(t, 50.9, 0.8, 'inOut'); k26Sack(c, 40, -10, 0.75, { open: 1 }); c.save(); c.beginPath(); c.rect(-200, -200, 400, 190 + 80 * (1 - d)); c.clip(); k26IconMan(c, 40 - 60 * (1 - d), -20 + 110 * (1 - d) + 30 * d, 0.42, { mouth: 'o', lid: 1 }); c.restore(); }); }
  if (k26In(t, 44.62, 45.3)) { const h = P(W.T.x + 80, 760), c = P(W.cow.headW[0], W.cow.headW[1]); k26Arr(ctx, S, t, h, [c[0] - 20, c[1]], 44.62, 45.3, { bend: -0.2 }); }
  if (k26In(t, 51.98, 52.6)) { const h = P(W.D.x + 80, 760), c = P(W.A.x, 690); k26Arr(ctx, S, t, h, [c[0] - 20, c[1]], 51.98, 52.6, { bend: -0.2 }); }
}
