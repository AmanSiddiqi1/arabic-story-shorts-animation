// ===== AN-098 main: scene switch, cameras, inserts, lettering, transitions, panel, sound =====
// scene cuts (s): hut 0, road 31.6, Armenian hall 35.0, road 67.0, hall 72.62 (under the DAYS PASS card), Baghdad hall 83.28,
// Armenian hall 105.04, road 129.68, Baghdad hall 135.4, street 167.0, end 175.9
const A98_CUTS = [[0, 'hut'], [31.6, 'road'], [35.0, 'gov'], [67.0, 'road'], [72.62, 'gov'], [83.28, 'viz'], [105.04, 'gov'], [129.68, 'road'], [135.4, 'viz'], [167.0, 'street']];
const a98Scene = (t) => { let s = 'hut'; for (const [a, n] of A98_CUTS) if (t >= a) s = n; return s; };

// ---------- cameras (world 1000 x 1230; the road strip is 2400 wide) ----------
const A98_CAM = [
  [0, { x: 470, y: 720, zoom: 1.2 }], [2.76, { x: 470, y: 720, zoom: 1.2 }], [6.3, { x: 440, y: 740, zoom: 1.6 }], [7.59, { x: 440, y: 740, zoom: 1.6 }],
  [7.6, { x: 490, y: 600, zoom: 1.35 }], [16.2, { x: 490, y: 600, zoom: 1.35 }], [18.0, { x: 490, y: 650, zoom: 1.35 }], [18.43, { x: 490, y: 650, zoom: 1.35 }],
  [18.44, { x: 540, y: 730, zoom: 1.7 }], [31.6, { x: 530, y: 720, zoom: 1.7 }],
];
function a98Cam(t) {
  const sc = a98Scene(t); let c, ww = 1000;
  if (sc === 'hut') c = K.camAt(A98_CAM, t);
  else if (sc === 'road') { ww = 2400; c = a98RoadCam(t); }
  else if (sc === 'gov') c = a98GovCam(t);
  else if (sc === 'viz') c = a98VizCam(t);
  else c = a98StreetCam(t);
  const z = c.zoom; return { x: K.clamp(c.x, 500 / z, ww - 500 / z), y: K.clamp(c.y, 615 / z, 1230 - 615 / z), zoom: z };
}

// ---------- the forgery insert (S3) and the reading insert (S10), panel space ----------
// the paper: centre (500, 600), 300 x 420
function a98InsertPaper(ctx) { ctx.fillStyle = 'rgba(20,20,20,0.55)'; ctx.fillRect(0, 0, 1000, 1230);
  shape(ctx, K.rectPts(350, 390, 300, 420), A98_PAPER, { lw: 7, seed: 610 }); for (const yy of [390, 810]) shape(ctx, K.rectPts(336, yy - 16, 328, 32), '#efdcae', { lw: 6, seed: 611 }); }
function a98WavyLine(ctx, x0, x1, y, f, o = {}) { if (f <= 0) return; ctx.save(); ctx.beginPath(); const n = 40, w = x0 - x1;
  for (let k = 0; k <= n * f; k++) { const u = k / n, j = o.jit ? (K.noise ? 0 : 0) + Math.sin(k * 2.7 + y) * 4 + Math.sin(k * 7.3) * 2.5 : 0; ctx.lineTo(x0 - w * u, y + (o.amp ?? 6) * Math.sin(u * 22 + (o.ph || 0)) + j); }
  ctx.lineWidth = o.lw || 5; ctx.strokeStyle = o.col || C.black; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore(); return [x0 - w * f, y]; }
function a98ForgeInsert(ctx, t) {
  const F = a98F(t, { x: 500, y: 800, s: 2.3, sit: 0, brow: 0.4, mouth: 'closed' });
  // where the quill is
  const lineF = (i) => i === 0 ? K.clamp((t - 21.8) / 1.4) : K.clamp((t - 23.3 - (i - 1) * 0.26) / 0.26);
  let nib = [600, 520];
  for (let i = 0; i < 5; i++) { const f = lineF(i); if (f > 0 && f < 1) nib = [610 - 220 * f, 470 + i * 42]; }
  if (t >= 24.4 && t < 25.42) nib = [K.lerp(390, 590, a98E(t, 24.4, 0.6)), K.lerp(638, 470, a98E(t, 24.4, 0.6))];
  if (t >= 25.42 && t < 26.36) { const u = a98E(t, 25.42, 0.7), a = -Math.PI / 2 + u * Math.PI * 2; nib = [590 + Math.cos(a) * 44, 450 + Math.sin(a) * 44]; }
  if (t >= 26.36 && t < 27.38) { const u = a98E(t, 26.5, 0.6); nib = [K.lerp(560, 440, u), 450 - 30 * Math.sin(Math.PI * u)]; }
  if (t >= 27.38) { const i = Math.min(2, Math.floor((t - 27.38) / 0.25)); nib = [440 + i * 60 + 20, 712 - 12 * pulse(t, 27.38 + i * 0.25, 0.2)]; if (t > 28.3) nib = [K.lerp(nib[0], 640, a98E(t, 28.3, 0.5)), K.lerp(nib[1], 760, a98E(t, 28.3, 0.5))]; }
  const eyes = [500, 325]; F.gaze = lookAt(eyes, nib); F.drop = 0; if (t >= 25.42 && t < 26.4) { F.brow = -0.5; F.mouth = 'smile'; } if (t > 28.0) { F.mouth = 'smile'; F.lid = 0.3; F.brow = -0.3; }
  ctx.save(); ctx.globalAlpha *= a98Env(t, 21.56, 29.0, 0.15);
  a98InsertPaper(ctx); ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 1000, 378); ctx.clip(); person(ctx, F); ctx.restore();
  shape(ctx, K.rectPts(350, 390, 300, 420), A98_PAPER, { lw: 7, seed: 610 }); for (const yy of [390, 810]) shape(ctx, K.rectPts(336, yy - 16, 328, 32), '#efdcae', { lw: 6, seed: 611 });
  for (let i = 0; i < 5; i++) a98WavyLine(ctx, 610, 390, 520 + i * 36, lineF(i), { ph: i });
  if (t >= 25.42) { a98Medal(ctx, 590, 450, 36 * K.ease.back(K.clamp((t - 25.6) / 0.4)), 'yah', { gaze: [-1, 0.1] }); ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(590, 450, 46, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * a98E(t, 25.42, 0.7)); ctx.stroke(); ctx.restore(); }
  if (t >= 26.36) { a98Medal(ctx, 410, 450, 36 * K.ease.back(K.clamp((t - 26.36) / 0.35)), 'abd', { gaze: [1, 0.1] }); const u = a98E(t, 26.5, 0.6); if (u > 0) { ctx.save(); ctx.lineWidth = 6; ctx.strokeStyle = C.blue; ctx.lineCap = 'round'; ctx.beginPath();
    for (let k = 0; k <= 20 * u; k++) { const v = k / 20; ctx.lineTo(K.lerp(545, 458, v), 450 - 26 * Math.sin(Math.PI * v)); } ctx.stroke(); if (u > 0.95) { seg(ctx, 458, 450, 474, 436, 6, C.blue, 0); seg(ctx, 458, 450, 476, 458, 6, C.blue, 0); } ctx.restore(); } }
  const ic = [(x, y) => a98Coin(ctx, x, y, 18), (x, y) => shape(ctx, [[x - 18, y - 18], [x + 18, y - 18], [x + 24, y + 20], [x - 24, y + 20]], C.red, { lw: 4, seed: 612, dot: C.yellow, pitch: 6, rad: 0.2, da: 0.4 }),
    (x, y) => { shape(ctx, [[x - 24, y - 4], [x + 24, y - 4], [x + 14, y + 16], [x - 14, y + 16]], C.white, { lw: 4, seed: 613 }); shape(ctx, ell(x, y - 6, 18, 9, 14), '#e8742a', { lw: 3, seed: 614 }); }];
  for (let i = 0; i < 3; i++) { const k = K.ease.back(K.clamp((t - 27.38 - i * 0.25) / 0.3)); if (k > 0) { ctx.save(); ctx.translate(440 + i * 60, 740); ctx.scale(k, k); ic[i](0, 0); ctx.restore(); } }
  a98Quill(ctx, nib[0], nib[1], 0.6, 2.0);
  ctx.restore();
}
// the stamp FORGED! (panel), slams at 21.56
function a98Stamp(ctx, t, txt, x, y, t0, t1, col = C.red) { if (t < t0 || t >= t1) return; const k = t - t0 < 0.25 ? K.lerp(1.6, 1, K.ease.out((t - t0) / 0.25)) : settleTo(t, t0 + 0.25, 1, 1, 0.2, 0.06);
  ctx.save(); ctx.globalAlpha *= a98Env(t, t0, t1, 0.12); ctx.translate(x, y); ctx.rotate(-0.18); ctx.scale(k, k); ctx.font = K.font(76, BF, 400); const w = ctx.measureText(txt).width + 50;
  ctx.fillStyle = C.white; ctx.fillRect(-w / 2, -50, w, 96); ctx.lineWidth = 9; ctx.strokeStyle = col; ctx.strokeRect(-w / 2 + 8, -42, w - 16, 80); ctx.fillStyle = col; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, 0, 4); ctx.restore(); }

// ---------- lettering (panel units) ----------
function a98Over(ctx, t, cam, S, W) {
  const P = (x, y) => a98P(x, y, cam);
  const lab = (txt, x, y, a, b, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha *= a98Env(t, a, b, 0.2); S.label(ctx, txt, x, y, a98E(t, a, 0.35), { size: 44, align: 'center', ...o }); ctx.restore(); };
  const arr = (a0, a1, a, b, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha *= a98Env(t, a, b, 0.2); S.arrow(ctx, a0, a1, a98E(t, a, 0.4), { width: 16, ...o }); ctx.restore(); };
  const word = (txt, x, y, a, b, size = 80, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha *= a98Env(t, a, b, 0.15); sfx(ctx, txt, x, y, size, K.clamp((t - a) / 0.25), o); ctx.restore(); };
  const sc = a98Scene(t);
  if (sc === 'hut') {
    if (t < 1.7) { ctx.save(); ctx.globalAlpha *= 1 - K.clamp((t - 1.4) / 0.3); S.title(ctx, 'THE FORGED LETTER', 500, 150, a98E(t, 0.05, 0.7), { size: 60, align: 'center' }); ctx.restore(); }
    if (W.fh) { const h = P(...W.fh); lab('A POOR MAN OF IRAQ', 330, 250, 1.84, 4.4); arr([360, 295], [h[0] - 20, h[1] - 70], 1.9, 4.4, { bend: 0.15 }); }
    if (a98In(t, 9.3, 18.0)) { const g = P(520 + (330 - 500) * 0.55, 400 + (940 - 760) * 0.55); lab('GOVERNOR OF ARMENIA', g[0] - 40, g[1] + 20, 9.3, 18.0, { size: 32 });
      const k = K.ease.back(K.clamp((t - 9.5) / 0.3)); if (k > 0) { ctx.save(); ctx.globalAlpha *= a98Env(t, 9.3, 18.0, 0.2); ctx.translate(g[0] - 190, g[1] + 6); ctx.scale(k * 0.32, k * 0.32); a98Mountains(ctx, [[0, 120, 120], [70, 90, 100]], 0); ctx.restore(); } }
    if (a98In(t, 15.2, 18.0)) { const g = P(520 + (670 - 500) * 0.55, 400 + (940 - 760) * 0.55); lab('VIZIER YAHYA', g[0] + 60, g[1] + 20, 15.2, 18.0, { size: 32 }); }
    if (a98In(t, 21.56, 29.0)) a98ForgeInsert(ctx, t);
    a98Stamp(ctx, t, 'FORGED!', 770, 200, 21.56, 29.0);
  } else if (typeof a98Over2 === 'function') a98Over2(ctx, t, cam, S, W, { lab, arr, word, P });
}
// slanted halftone wipe band (hides a cut at time c)
function a98Wipe(ctx, t, c, col = C.yellow) { if (!a98In(t, c - 0.22, c + 0.22)) return; const u = (t - c + 0.22) / 0.44, x = K.lerp(1500, -800, u);
  shape(ctx, [[x, -20], [x + 560, -20], [x + 300, 1250], [x - 260, 1250]], col, { lw: 12, seed: 3, dot: col === C.yellow ? C.red : C.white, pitch: 12, rad: 0.22, da: 0.5 });
  if (col !== C.yellow) for (let i = 0; i < 6; i++) seg(ctx, x + 700 + i * 60, 120 + i * 170, x + 1100 + i * 60, 120 + i * 170, 8, C.black, 0); }
// panel-only shake: FORGED! (21.56) and x2 (165.26)
const a98Shake = (t) => { for (const [h, a] of [[21.56, 4], [165.26, 3]]) if (t >= h && t < h + 0.2) return a * Math.sin((t - h) * 90) * (1 - (t - h) / 0.2); return 0; };

const SCENE = {
  duration: A98_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196, sh = a98Shake(t);
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh, py - sh * 0.6); ctx.scale(pw / 1000, ph / 1230);
    const cam = a98Cam(t), sc = a98Scene(t); ctx.save(); K.camera(ctx, 1000, 1230, cam);
    const Wd = sc === 'hut' ? a98HutWorld(ctx, t, cam) : sc === 'road' ? a98RoadWorld(ctx, t, cam) : sc === 'gov' ? a98GovWorld(ctx, t, cam) : sc === 'viz' ? a98VizWorld(ctx, t, cam) : a98StreetWorld(ctx, t, cam);
    ctx.restore();
    a98Over(ctx, t, cam, S, Wd || {});
    for (const c of [31.6, 35.0, 129.68, 135.4, 167.0]) a98Wipe(ctx, t, c);
    for (const c of [83.28, 105.04]) a98Wipe(ctx, t, c, C.blue);
    if (t >= 72.0 && t < 73.24) S.transition(ctx, 1000, 1230, (t - 72.0) / 1.24, { caption: 'DAYS PASS...' });
    if (t >= 171.6) { S.title(ctx, 'THE END', 330, 210, a98E(t, 171.6, 0.9), { size: 84, align: 'center' }); const k = K.ease.back(K.clamp((t - 172.0) / 0.4)); if (k > 0) heart(ctx, 600, 150 - 10 * Math.sin((t - 172) * 2), 30 * k); }
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // the plan's effects, all in measured narration gaps (silencedetect) or after the last word (171.24); master 0.6 at render
    k.bed(S.sfx.bed, 0, A98_DUR, 0.5);
    k.play('pop', 7.4, { gain: 0.4 });                  // he hears voices (gap 6.97-8.01)
    k.play('tick', 76.5, { gain: 0.45 });               // the hourglass flips (gap 76.23-76.79)
    k.play('whoosh', 104.75, { gain: 0.3, dur: 0.22 }); // whip to Armenia (gap 104.51-105.88)
    k.play('chime', 129.35, { note: 'E6', gain: 0.45 });// the rift closed (gap 128.83-130.15)
    k.play('pop', 140.35, { gain: 0.35 });              // the inset shuts (gap 140.03-140.62)
    k.play('pop', 150.3, { gain: 0.35 });               // the held beat (gap 149.81-151.22)
    k.play('thud', 155.3, { gain: 0.45 });              // the chest bumps his shins (gap 154.99-155.84)
    k.play('chime', 166.95, { note: 'G5', gain: 0.45 });// x2 settles (gap 166.67-167.29)
    k.play('chime', 171.9, { note: 'C6', gain: 0.6 });  // THE END (after the last word 171.24)
  },
};
window.SCENE = SCENE;
