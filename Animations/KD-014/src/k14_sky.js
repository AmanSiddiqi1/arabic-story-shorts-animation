// ===== KD-014 S7-S9 (65.50-100.32): the hill under the big sky. Sun -> cloud -> wind -> mountain, each humbled by the next. =====
// World 1300 wide; a grassy mound (crest y ~846) on the left carries the pair (s 0.6). The far mountain (S9) sits right at 0.55 scale.
const K14S_RIDGE = [[-10, 905], [-10, 868], [150, 850], [350, 846], [560, 862], [800, 905], [1310, 905]];
const k14sRidgeY = (x) => { for (let i = 1; i < K14S_RIDGE.length; i++) { const [x0, y0] = K14S_RIDGE[i - 1], [x1, y1] = K14S_RIDGE[i]; if (x <= x1) return K.lerp(y0, y1, K.clamp((x - x0) / Math.max(1, x1 - x0))); } return 905; };
const K14S_bake = () => bake('k14sky', 1300, 1230, (x) => { sky(x, { w: 1300 }); hillTrees(x, { y: 905, seed: 12, n: 16 }); ground(x, { w: 1300 });
  shape(x, K14S_RIDGE.concat([[1310, 1240], [-10, 1240]]), GREEN, { lw: 7, seed: 600, dot: GREEND, pitch: 9, rad: 0.22, da: 0.5 }); });
const K14S_SUN = [640, 330], K14S_SUNR = 150;
// cloud path (x, y, rot)
const k14sCloudX = (t) => t < 74.3 ? kfn(t, [[69.04, 1500], [69.5, 1030], [70.98, 1030], [72.8, 640]], 'inOut')
  : t < 84.68 ? kfn(t, [[76.6, 640], [80.7, 640], [81.3, 950], [81.72, 950], [82.5, 760], [82.66, 760], [83.25, 380], [83.4, 380], [83.94, 600]], 'out') : kfn(t, [[84.68, 600], [85.7, 1650]], 'in');
const k14sCloudY = (t) => (t < 72.8 ? kfn(t, [[69.04, 300], [72.8, 360]]) : 360) + 6 * Math.sin(t * 2.2);
// wind path (x, y, dir)
function k14sWind(t) {
  if (t < 77.52) return null;
  let x, y, dir = 1;
  if (t < 77.9) { x = kfn(t, [[77.52, -200], [77.9, 1500]], 'lin'); y = 330; return { x, y, dir, streak: true }; }
  if (t < 82.0) { x = kfn(t, [[77.9, -200], [78.5, 240], [80.1, 240], [80.6, 190], [80.75, 250]], 'out'); y = 340 + 8 * Math.sin(t * 3); }
  else if (t < 82.66) { const u = K.ease.inOut((t - 82.0) / 0.66); x = K.lerp(240, 1060, u); y = 340 - 230 * Math.sin(Math.PI * u); dir = u < 0.5 ? 1 : -1; }
  else if (t < 83.2) { x = kfn(t, [[82.66, 1060], [82.8, 1010]]); y = 340; dir = -1; }
  else if (t < 85.84) { x = kfn(t, [[83.2, 1060], [83.85, 230]], 'inOut'); y = 360 + 120 * Math.sin(Math.PI * K.clamp((t - 83.2) / 0.65)); dir = 1; }
  else if (t < 87.7) { const a = (t - 85.84) / 1.86 * Math.PI * 2 + Math.PI; x = 380 + Math.cos(a) * 190; y = 690 + Math.sin(a) * 90; dir = Math.sin(a) > 0 ? -1 : 1; }
  else if (t < 95.6) { x = kfn(t, [[87.7, 190], [87.84, 520], [92.16, 520], [92.6, 480]], 'out'); y = kfn(t, [[87.7, 690], [87.84, 500]], 'out') + 6 * Math.sin(t * 2.5); }
  else if (t < 98.04) { x = kfn(t, [[95.6, 480], [96.2, 420], [98.04, 1000]], 'in'); y = kfn(t, [[95.6, 500], [96.2, 480], [98.04, 600]], 'in'); }
  else { x = 1000; y = t < 99.58 ? 600 : kfn(t, [[99.58, 600], [100.32, 850]], 'in'); }
  return { x, y, dir };
}
function k14sPair(t) {
  const fx = (u) => kfn(u, [[74.32, 200], [75.8, 330]]), mx = (u) => kfn(u, [[74.32, 290], [75.8, 420]]);
  const F = { ...walk(fx, t, { stride: 14 }), s: 0.6, dir: 1, costume: 'ascetic', age: 1, hold: 'stick', mouth: 'closed', seed: 11 };
  const M = { ...walk(mx, t, { stride: 13 }), s: 0.6, dir: 1, costume: 'maiden', mouth: 'smile', seed: 51 };
  F.y = k14sRidgeY(F.x); M.y = k14sRidgeY(M.x); F.lid = blink(t, 11); M.lid = blink(t, 51);
  const fh = [F.x, F.y - 130], mh = [M.x, M.y - 130], W = k14sWind(t), cx = k14sCloudX(t), cy = k14sCloudY(t);
  let tgt = K14S_SUN; if (t >= 69.04) tgt = [Math.min(cx, 1000), cy]; if (t >= 77.9 && W && !W.streak) tgt = t < 80.7 || (t > 82.0 && t < 83.94) ? [W.x, W.y] : [cx, cy]; if (t >= 85.84) tgt = W ? [W.x, W.y] : [700, 400]; if (t >= 89.76) tgt = [1050, 600];
  F.gaze = lookAt(fh, tgt); M.gaze = lookAt(mh, tgt); F.tip = -0.08; M.tip = -0.06;
  if (t >= 66.42 && t < 67.2) { F.handR = PERSON_HANDS.cupMouth.R; F.hold = null; F.talk = 0.6; M.handR = [64 + 10 * Math.sin(t * 14), -196]; }
  if (t >= 72.92 && t < 74.3) { M.handL = PERSON_HANDS.folded.L; M.handR = PERSON_HANDS.folded.R; M.mouth = 'o'; }
  if (t >= 74.32 && t < 75.8) { F.tip = 0; M.tip = 0; F.handL = PERSON_HANDS.headHold.L; M.gaze = [1, 0]; F.gaze = [1, -0.2]; }
  if (t >= 75.9 && t < 77.4) { const k = settleTo(t, 75.9, 0, 1, 0.3); M.aR = [K.lerp(0.3, 2.45, k), K.lerp(0.3, 2.75, k)]; F.talk = 0.3 + 0.3 * Math.abs(Math.sin(t * 9)); F.handR = PERSON_HANDS.cupMouth.R; F.hold = null; }
  if (t >= 84.68 || (t >= 85.84 && t < 87.7)) { M.handR = PERSON_HANDS.headHold.R; F.handL = PERSON_HANDS.headHold.L; F.tip = 0.1; M.tip = 0.1; F.lid = 0.5; M.lid = 0.5; }
  if (t >= 85.84 && t < 87.7) { F.talk = 0.5 + 0.3 * Math.abs(Math.sin(t * 8)); M.handLW = null; M.handL = [-60, -120]; }
  if (t >= 94.64 && t < 95.6) { F.handL = PERSON_HANDS.headHold.L; F.handR = PERSON_HANDS.headHold.R; F.hold = null; F.tip = 0.12; M.tip = 0.12; M.handR = PERSON_HANDS.headHold.R; }
  if (t >= 98.04) { M.mouth = 'o'; F.mouth = 'o'; F.brow = -0.8; }
  return [F, M];
}
function k14sSunF(t) {
  const F = { lidL: 1, lidR: 1, mouth: 'smile', brow: 0, gaze: lookAt(K14S_SUN, [260, 800]), t, rot: 0, rays: 1, pulse: Math.sin(t * 3) * 0.5 };
  if (t >= 67.12) { F.lidL = blend(t, 67.12, 67.27, 1, 0); F.lidR = blend(t, 67.27, 67.42, 1, 0); F.brow = -0.4; }
  if (t >= 67.5) { F.lidL = F.lidR = blink(t, 61); }
  if (t >= 67.84 && t < 69.0) { F.talk = 0.3 + 0.4 * Math.abs(Math.sin(t * 9)); F.rot = 0.1 * Math.sin((t - 67.84) / 1.16 * Math.PI * 2) * (1 - K.clamp((t - 68.7) / 0.3)); F.mouth = 'line'; }
  if (t >= 69.04) { F.gaze = lookAt(K14S_SUN, [k14sCloudX(t), k14sCloudY(t)]); F.brow = -0.6; F.mouth = 'frown'; }
  const cover = K.clamp(1 - Math.abs(k14sCloudX(t) - K14S_SUN[0]) / 300);
  F.rays = 1 - cover;
  if (t >= 73.5 && t < 80.7) { F.brow = 0.6; F.mouth = 'frown'; F.droop = swing(t, 73.6, 0.5) + 0.6; F.gaze = [0.2, 0.6]; }
  if (t >= 80.7) { F.brow = -0.2; F.mouth = 'smile'; F.lidL = F.lidR = Math.max(0.5 * (t > 82.66 ? 1 : 0), blink(t, 61)); F.gaze = lookAt(K14S_SUN, [k14sCloudX(t), k14sCloudY(t)]); }
  return { F, cover };
}
function k14sCloudF(t) {
  const F = { lid: 0.5, mouth: 'smile', gaze: [-0.8, 0.3], t, sq: 1, rot: 0 };
  if (t < 69.5) F.gaze = [-1, 0.2];
  if (t >= 76.6 && t < 77.5) { F.sq = 1 + 0.08 * K14B(t, 76.6, 0.3); F.sx = 1.08; F.talk = 0.3 + 0.4 * Math.abs(Math.sin(t * 8)); F.lid = 0.5; }
  if (t >= 77.52) { F.lid = 0; F.eyes = 'wide'; F.brow = -0.8; F.mouth = 'o'; const W = k14sWind(t); if (W && !W.streak) F.gaze = lookAt([k14sCloudX(t), k14sCloudY(t)], [W.x, W.y]); }
  if (t >= 80.7 && t < 81.4) { F.sq = 0.82 + 0.18 * K14B(t, 81.0, 0.4); F.sx = 1.25 - 0.25 * K14B(t, 81.0, 0.4); F.mouth = 'o'; F.eyes = 'wide'; }
  if (t >= 81.72 && t < 82.6) { F.arms = 1; F.brow = 0.6; F.mouth = 'grit'; F.sweat = 1; F.eyes = 'open'; }
  if (t >= 82.66 && t < 83.3) { F.sq = 0.84; F.sx = 1.2; F.eyes = 'wide'; }
  if (t >= 83.94 && t < 84.68) { F.lid = 0.85; F.mouth = 'grit'; F.brow = 0.8; F.rot = -0.15; F.shake = 1; F.arms = 0.4; }
  if (t >= 84.68) { F.rot = K.ease.in(K.clamp((t - 84.68) / 1.0)) * Math.PI * 4; F.eyes = 'spiral'; F.mouth = 'o'; F.lid = 0; }
  return F;
}
const K14_SKY = {
  a: 65.5, b: 100.32, bounds: [0, 1300, 0, 1230],
  cam: [[65.5, { x: 520, y: 520, zoom: 1.25 }], [74.32, { x: 520, y: 520, zoom: 1.25 }], [75.9, { x: 600, y: 520, zoom: 1.25 }], [85.83, { x: 600, y: 520, zoom: 1.25 }],
    [85.84, { x: 520, y: 560, zoom: 1.2 }], [89.76, { x: 520, y: 560, zoom: 1.2 }], [90.7, { x: 700, y: 560, zoom: 1.2 }], [95.6, { x: 700, y: 560, zoom: 1.2 }], [98.0, { x: 950, y: 640, zoom: 1.45 }], [100.32, { x: 950, y: 660, zoom: 1.45 }]],
  draw(ctx, t) {
    ctx.drawImage(K14S_bake(), 0, 0, 1300, 1230);
    // S9: the far mountain (asleep) on the right
    if (t >= 85.84) { ctx.save(); ctx.translate(1050, 905); ctx.scale(0.55, 0.55); ctx.translate(-600, -905); mountainMassif(ctx, t, { lidL: t >= 98.3 ? blend(t, 98.3, 98.9, 1, 0.6) : 1, lidR: 1, mouth: 'line', gaze: [-0.6, 0.2] }); ctx.restore(); }
    // three bendable trees on the ridge (S9)
    const W = k14sWind(t);
    if (t >= 85.84) for (const [i, x, h] of [[0, 520, 260], [1, 620, 300], [2, 720, 280]]) { const b = 0.7 * K.clamp((t - 94.64 - i * 0.1) / 0.25) * (1 - blend(t, 95.5 + i * 0.1, 96.2 + i * 0.1, 0, 1)) + 0.04 * Math.sin(t * 3 + i); k14Tree(ctx, x, k14sRidgeY(x), h, b);
      if (t > 94.64 && t < 95.6) for (let j = 0; j < 3; j++) { const u = ((t - 94.64) * 1.5 + j * 0.33 + i * 0.2) % 1; ctx.save(); ctx.translate(x + 120 + u * 400, k14sRidgeY(x) - h + 40 * j + 20 * Math.sin(u * 9)); ctx.rotate(u * 9); shape(ctx, ell(0, 0, 10, 5, 10), GREEN, { lw: 3, seed: 610 + j }); ctx.restore(); } }
    // sun, cloud
    const { F: SF, cover } = k14sSunF(t), sunY = K14S_SUN[1], peek = t >= 73.5 && t < 80.7 ? K14B(t, 73.5, 0.4, 'back') * (1 - K14B(t, 80.4, 0.3)) : 0;
    if (t < 85.84) sunFace(ctx, K14S_SUN[0], sunY, K14S_SUNR, t, SF);
    if (t < 85.8) { const CF = k14sCloudF(t), sh = CF.shake ? tremble(t, 3, 14) : 0; cloudFace(ctx, k14sCloudX(t) + sh, k14sCloudY(t), 2.8, t, CF);
      if (peek > 0) { ctx.save(); ctx.beginPath(); ctx.rect(0, -10, 1300, k14sCloudY(t) - 128); ctx.clip(); sunFace(ctx, K14S_SUN[0], K14S_SUN[1] - 130 * peek, K14S_SUNR, t, { ...SF, rays: 0 }); ctx.restore(); }
      if (t >= 80.7 && t < 81.8) for (let i = 0; i < 4; i++) { const d = t - 80.7 - i * 0.06, k = K.clamp(1 - d / 1.0); if (d > 0 && k > 0) shape(ctx, ell(k14sCloudX(t) - 300 - i * 50 - d * 80, 330 + i * 30, 30 * k, 26 * k, 16), C.white, { lw: 5, seed: 620 + i }); }
      if (t >= 84.68) { const d = t - 84.68; ctx.save(); ctx.translate(600 + d * 120, 360 - d * 30); ctx.rotate(d * 10); cloudFlat(ctx, 0, 0, 0.35); ctx.restore(); } }
    // S9 marbles: three small clouds and the dizzy cloud rolling past
    if (t >= 93.3 && t < 95.6) { for (const [i, y, v] of [[0, 220, 900], [1, 320, 700], [2, 160, 1100]]) cloudFlat(ctx, 400 + (t - 93.3 - i * 0.1) * v, y, 0.6);
      cloudFace(ctx, kfn(t, [[93.6, 100], [95.3, 1500]], 'lin'), 420, 1.2, t, { eyes: 'spiral', mouth: 'o', rot: (t - 93.6) * 7, t }); }
    // the pair
    const [F, M] = k14sPair(t); person(ctx, F); person(ctx, M);
    // the wind
    if (W) {
      if (W.streak) { ctx.save(); ctx.lineCap = 'round'; for (let i = 0; i < 3; i++) { seg(ctx, W.x - 260 - i * 60, W.y + i * 22, W.x - i * 60, W.y + i * 22, 6, C.white, 3); } ctx.restore(); }
      else {
        const Wf = { dir: W.dir, t, lid: 0.45, mouth: 'smile', gaze: lookAt([W.x, W.y], [k14sCloudX(t), k14sCloudY(t)]) };
        if (t < 80.1) Wf.lid = Math.max(0.45, blink(t, 71));
        if (t >= 80.1 && t < 80.7) { Wf.coil = K14B(t, 80.1, 0.5, 'inOut'); Wf.blow = 0.6; Wf.lid = 0.3; }
        if (t >= 80.7 && t < 81.4) { Wf.blow = 1; Wf.stretch = 1.3; }
        if (t >= 82.66 && t < 83.2) { Wf.blow = 1; Wf.stretch = 1.3; }
        if (t >= 83.94 && t < 85.84) { Wf.blow = t < 84.68 ? 0.7 : 1; Wf.stretch = 1.2; }
        if (t >= 85.84) { Wf.gaze = lookAt([W.x, W.y], [380, 700]); Wf.mouth = 'smile'; Wf.lid = 0.3; }
        if (t >= 87.84 && t < 92.16) { Wf.rot = -0.12 * K14B(t, 87.84, 0.4); Wf.gaze = [-0.6, 0.5]; Wf.lid = Math.max(0, blink(t, 71)); if (t >= 88.44 && t < 89.7) Wf.talk = 0.3 + 0.4 * Math.abs(Math.sin(t * 7)); if (t >= 89.76) Wf.gaze = [1, 0.1]; }
        if (t >= 92.16 && t < 93.3) { Wf.coil = K14B(t, 92.16, 0.6, 'inOut'); Wf.mouth = 'grit'; Wf.lid = 0.4; Wf.gaze = [1, 0]; }
        if (t >= 93.3 && t < 95.6) { Wf.blow = 1; Wf.stretch = 1.3; Wf.gaze = [1, -0.3]; }
        if (t >= 95.6 && t < 98.04) { Wf.coil = t < 96.2 ? K14B(t, 95.6, 0.5) : 0; Wf.stretch = t >= 96.2 ? 1.3 + 0.4 * K14B(t, 96.2, 1.0) : 1; Wf.mouth = 'grit'; Wf.brow = 0.8; Wf.gaze = [1, 0.2]; Wf.lid = 0.2; }
        if (t >= 98.04) { const f = t < 98.11 ? 1 : t < 99.58 ? 0.9 : 0.4; Wf.flat = f; Wf.eyes = 'spiral'; Wf.mouth = 'o'; Wf.lid = 0; if (t >= 99.58) { Wf.limp = 1; Wf.eyes = 'open'; Wf.lid = 0.6; Wf.mouth = 'frown'; Wf.flat = 0.3; } }
        windSpirit(ctx, W.x, W.y, t >= 98.04 ? 0.8 : 0.9, t, Wf);
        if (t >= 88.44 && t < 89.7) for (const t0 of [88.5, 89.0, 89.5]) { const d = t - t0; if (d > 0 && d < 0.6) { ctx.save(); ctx.globalAlpha = 1 - d / 0.6; ctx.lineWidth = 4; ctx.strokeStyle = C.white; ctx.beginPath(); ctx.arc(W.x - 40 - d * 120, W.y + 30, 8 + d * 30, 0, 7); ctx.stroke(); ctx.restore(); } }
        if (t >= 96.2 && t < 98.04) for (let i = 0; i < 6; i++) seg(ctx, W.x - 120 - i * 40, W.y - 50 + i * 20, W.x - 260 - i * 40, W.y - 70 + i * 20, 4, C.white, 2);
        if (t >= 98.04 && t < 99.58) for (let i = 0; i < 4; i++) { const a = (t - 98.04) * 6 + i * 1.57; star(ctx, W.x + Math.cos(a) * 60, W.y - 70 + Math.sin(a) * 18, 11, C.yellow, a); }
        if (t >= 99.9) { shape(ctx, ell(1060, 900, 9, 7, 10), K14_ROCK, { lw: 3, seed: 630 }); for (const t0 of [99.95, 100.15]) { const d = t - t0; if (d > 0 && d < 0.4) { ctx.save(); ctx.globalAlpha = 1 - d / 0.4; ctx.strokeStyle = C.white; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(1030 + d * 40, 870, 5 + d * 20, 0, 7); ctx.stroke(); ctx.restore(); } } }
      }
    }
    // blue shade while the cloud covers the sun (and the pair's rim light goes out)
    if (t < 85.84 && cover > 0.01 && t >= 72.9) { ctx.save(); ctx.globalAlpha = 0.35 * cover * K.clamp((t - 72.92) / 0.3); ctx.fillStyle = NAVY2; ctx.fillRect(-10, -10, 1320, 1250); ctx.fillStyle = dotPat(ctx, C.blue, 16, 0.4); ctx.fillRect(-10, -10, 1320, 1250); ctx.restore(); }
  },
  over(ctx, t, cam, S) {
    k14Label(ctx, S, cam, 830, 560, 'THE CLOUD', t, 69.1, 70.9); k14Arrow(ctx, S, cam, [880, 520], [960, 380], t, 69.2, 70.9, { width: 18 });
    k14Sfx(ctx, cam, 640, 560, 'BLOCKED!', t, 73.0, 1.3, 80, { rot: -0.05 });
    k14Label(ctx, S, cam, 300, 560, 'THE WIND', t, 77.6, 79.8); k14Arrow(ctx, S, cam, [300, 510], [260, 420], t, 77.7, 79.8, { width: 18 });
    k14Sfx(ctx, cam, 640, 560, 'WHOOSH!', t, 80.75, 1.0, 84, { rot: 0.06 });
    k14Label(ctx, S, cam, 960, 470, 'THE MOUNTAIN', t, 89.8, 92.0); k14Arrow(ctx, S, cam, [1000, 490], [1040, 560], t, 89.9, 92.0, { width: 16 });
    k14Sfx(ctx, cam, 980, 470, 'BONK!', t, 98.1, 1.3, 96, { rot: -0.1 });
  },
};
