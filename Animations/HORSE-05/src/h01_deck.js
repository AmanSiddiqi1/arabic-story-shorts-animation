// ===== HORSE-01 v2: the dressed cloud deck (Fable review 1, notes 2, 3, 12) =====
// Three baked layers per palette, each 2000 wide and tiling sideways, sliding opposite to the horse's travel (it faces +x):
//   far   towers of cumulus and three snow peaks standing on the horizon (0.2 x the deck speed)
//   mid   the deck seen from above, lit tops and tinted undersides, with holes showing the land far below (fields, a river bend, a village)
//   near  big soft puffs crossing the bottom of the panel (2 x the deck speed), drawn in front of the rider
// A sky camera (zoom about a focus point) pushes in on the cue words. Plus the strange country (S14 tilt) and the sunset wide (S15).
// Every drawing is baked once (K.cached through ehBakeAt) and every frame is a pure function of t.

const H1_DK = {
  high:   { top: '#ffffff', body: '#e2edfc', under: '#7f9fd8', far: '#dfeafc', farU: '#b4c8ee', mtn: '#7486c6', mtnS: '#53609e', snow: '#f6f9ff', haze: '#d4e4fb', land: ['#86c46a', '#a8d27a', '#6aae5a', '#d6d08a'], river: '#4a8ee0' },
  gold:   { top: '#fff3d6', body: '#ffe4c0', under: '#d89a8a', far: '#ffe2bc', farU: '#e6a898', mtn: '#9a7aa8', mtnS: '#6e5688', snow: '#fff0d8', haze: '#ffd6a8', land: ['#c8b25a', '#d8c070', '#9ab060', '#e0c890'], river: '#e8b860' },
  sunset: { top: '#ffcf8a', body: '#ffb09a', under: '#8a6ab8', far: '#e8a0b0', farU: '#8a6ab8', mtn: '#6a5aa0', mtnS: '#46387a', snow: '#ffd2b0', haze: '#ff9a8a', land: ['#8a6a8a', '#a07a7a', '#7a6a9a', '#b08a7a'], river: '#ffc070' },
};
const H1_DW = 2000;
// draw fn at x and x +/- 2000 so the strip tiles sideways
// bake cost: puffs are drawn sharp (h1Puff, ehCloud without its per-shape blur filter) into a scratch layer and softened in ONE blur pass (h1Soft)
function h1Puff(ctx, x, y, w, h, body, under, seed = 1) { const R = K.rng(seed); ctx.fillStyle = under; ctx.beginPath(); ctx.ellipse(x, y + h * 0.22, w * 0.5, h * 0.24, 0, 0, 7); ctx.fill();
  ctx.fillStyle = body; for (let i = 0; i < 6; i++) { const u = (i - 2.5) / 2.5; ctx.beginPath(); ctx.ellipse(x + u * w * 0.36, y - (1 - Math.abs(u)) * h * 0.28 - R() * h * 0.12, w * (0.2 + R() * 0.08), h * (0.36 + R() * 0.12), 0, 0, 7); ctx.fill(); } }
function h1Soft(c, px, draw, op) { const L = K.layer(c.canvas.width, c.canvas.height), l = L.getContext('2d'); l.setTransform(c.getTransform()); draw(l);
  c.save(); c.setTransform(1, 0, 0, 1, 0, 0); if (op) c.globalCompositeOperation = op; c.filter = `blur(${px}px)`; c.drawImage(L, 0, 0); c.restore(); }
const h1Wrap = (f, x, ...a) => { for (const o of [-H1_DW, 0, H1_DW]) f(x + o, ...a); };

// far: horizon at strip y 720 (towers, peaks, haze); the strip is 760 high
function h1DeckFar(pal) {
  return ehBakeAt('h1far:' + pal, H1_DW, 760, (c) => { const P = H1_DK[pal], R = K.rng(71); c.translate(0, 200);
    const peak = (x, h, w) => { celShade(c, [[x - w, 540], [x - w * 0.35, 520 - h * 0.62], [x, 520 - h], [x + w * 0.3, 520 - h * 0.7], [x + w, 540]], P.mtn, P.mtnS, { light: [-1, -1], off: w * 0.3, lw: 3, line: ehDark(P.mtnS, 0.3) });
      celShade(c, [[x - w * 0.3, 520 - h * 0.66], [x, 520 - h], [x + w * 0.26, 520 - h * 0.72], [x + w * 0.08, 520 - h * 0.62], [x - w * 0.1, 520 - h * 0.7]], P.snow, ehMix(P.snow, P.mtnS, 0.3), { light: [-1, -1], off: w * 0.08, lw: 2.5, line: ehDark(P.mtnS, 0.3) }); };
    h1Wrap(peak, 360, 300, 230); h1Wrap(peak, 560, 210, 170); h1Wrap(peak, 1420, 260, 210);
    const tower = (c, x, h, w, sd) => { for (let k = 0; k < 5; k++) { const u = k / 4; h1Puff(c, x + Math.sin(sd + k) * w * 0.12, 520 - u * h, w * (1 - 0.45 * u), h * 0.32, k > 2 ? P.top : P.far, P.farU, sd * 10 + k); } };
    h1Soft(c, 3, (l) => { for (const [x, h, w] of [[90, 380, 300], [860, 470, 360], [1150, 300, 260], [1760, 420, 320]]) h1Wrap((xx) => tower(l, xx, h, w, x), x);
      for (let i = 0; i < 18; i++) { const x = R() * H1_DW, yy = 520 - R() * 30, ww = 260 + R() * 200; h1Wrap((xx) => h1Puff(l, xx, yy, ww, 90, P.far, P.farU, i + 40), x); } });
    ehGrad(c, 0, 400, H1_DW, 160, [[0, K.rgba(P.haze, 0)], [0.7, K.rgba(P.haze, 0.75)], [1, P.haze]]); }, 0.8);
}
// mid: the deck from above, top edge at strip y 40, holes showing the land
const H1_HOLES = [[300, 290, 200, 50], [1240, 350, 270, 70], [720, 520, 330, 100], [1660, 610, 370, 118], [160, 720, 300, 104], [1100, 800, 340, 112]];
function h1DeckLand(pal) {   // the land below (fields, river, roads, a village), one tile seen through the holes
  return ehBakeAt('h1land:' + pal, 600, 400, (c) => { const P = H1_DK[pal], R = K.rng(pal.length * 7 + 3); c.fillStyle = P.land[0]; c.fillRect(0, 0, 600, 400);
    for (let gy = 0; gy < 5; gy++) for (let gx = 0; gx < 8; gx++) { c.fillStyle = P.land[Math.floor(R() * P.land.length)]; c.fillRect(gx * 75 + R() * 6, gy * 80 + R() * 6, 72, 76); }
    c.strokeStyle = P.river; c.lineWidth = 26; c.lineCap = 'round'; c.beginPath(); for (let x = -20; x <= 620; x += 10) c.lineTo(x, 200 + Math.sin(x / 600 * Math.PI * 2) * 110); c.stroke();
    c.strokeStyle = ehLight(P.river, 0.5); c.lineWidth = 6; c.stroke();
    c.strokeStyle = '#e8d8a8'; c.lineWidth = 5; c.beginPath(); c.moveTo(0, 340); c.quadraticCurveTo(300, 260, 600, 330); c.stroke();
    for (let k = 0; k < 9; k++) { c.fillStyle = ['#fff1dc', '#e8a070', '#d06a5a'][k % 3]; c.fillRect(420 + (k % 3) * 14 + R() * 6, 300 + Math.floor(k / 3) * 12, 11, 9); }
    for (let k = 0; k < 14; k++) { c.fillStyle = 'rgba(40,80,40,0.55)'; c.beginPath(); c.arc(R() * 600, R() * 400, 6 + R() * 5, 0, 7); c.fill(); } });
}
function h1DeckMid(pal) {
  return ehBakeAt('h1mid:' + pal, H1_DW, 880, (c) => { const P = H1_DK[pal];
    // the land layer (only inside the holes)
    const land = c.createPattern(h1DeckLand(pal), 'repeat');
    for (const [hx, hy, rx, ry] of H1_HOLES) h1Wrap((x) => { c.save(); c.beginPath(); c.ellipse(x, hy, rx * 1.1, ry * 1.2, 0, 0, 7); c.clip(); land.setTransform(new DOMMatrix().translate(x * 0.3, hy).scale(0.35 + ry / 200, 0.25 + ry / 300)); c.fillStyle = land; c.fillRect(x - rx * 1.2, hy - ry * 1.3, rx * 2.4, ry * 2.6);
      c.fillStyle = K.rgba(P.haze, 0.22); c.fillRect(x - rx * 1.2, hy - ry * 1.3, rx * 2.4, ry * 2.6); c.restore(); }, hx);
    // the cloud mass on its own layer, holes punched out softly
    const A = K.layer(c.canvas.width, c.canvas.height), a = A.getContext('2d'), R = K.rng(17); a.setTransform(c.getTransform());
    ehGrad(a, 0, 120, H1_DW, 760, [[0, ehMix(P.body, P.under, 0.25)], [1, ehMix(P.body, P.under, 0.45)]]);
    h1Soft(a, 2, (l) => { for (let i = 0; i < 22; i++) { const w = 160 + R() * 160, yy = 120 + R() * 20; h1Wrap((x) => h1Puff(l, x, yy, w, w * 0.55, P.top, P.under, i + 3), i * 92 + R() * 40); }
    for (const [row, n, sz] of [[200, 15, 0.55], [330, 12, 0.78], [490, 9, 1.05], [680, 7, 1.4], [850, 6, 1.7]]) for (let i = 0; i < n; i++) { const x = (i + R() * 0.7) * H1_DW / n, w = 300 * sz * (0.7 + R() * 0.6), yy = row + R() * 40, col = R() < 0.5 ? P.top : P.body; h1Wrap((xx) => h1Puff(l, xx, yy, w, w * 0.42, col, P.under, i + row), x); } });
    h1Soft(a, 5, (l) => { l.fillStyle = '#000'; for (const [hx, hy, rx, ry] of H1_HOLES) h1Wrap((x) => { l.beginPath(); l.ellipse(x, hy, rx, ry, 0, 0, 7); l.fill(); }, hx); }, 'destination-out');
    // the inner rim of each hole: the tinted underside showing on the far edge
    a.save(); a.globalCompositeOperation = 'source-atop'; for (const [hx, hy, rx, ry] of H1_HOLES) h1Wrap((x) => { const g = a.createLinearGradient(0, hy - ry, 0, hy); g.addColorStop(0, K.rgba(P.under, 0.9)); g.addColorStop(1, K.rgba(P.under, 0)); a.fillStyle = g; a.beginPath(); a.ellipse(x, hy - ry * 0.25, rx * 1.05, ry * 0.95, 0, 0, 7); a.fill(); }, hx); a.restore();
    c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.drawImage(A, 0, 0); c.restore(); }, 0.7);
}
// near: big soft puffs (strip 420 high, puff tops near y 120)
function h1DeckNear(pal) {
  return ehBakeAt('h1near:' + pal, H1_DW, 420, (c) => { const P = H1_DK[pal];
    h1Soft(c, 6, (l) => { for (const [x, y, w, h] of [[150, 220, 700, 240], [760, 280, 560, 200], [1260, 210, 760, 260], [1780, 270, 520, 200]]) h1Wrap((xx) => h1Puff(l, xx, y, w, h, P.top, P.under, Math.round(x)), x); }); }, 0.5);
}
// the sky camera (96.6 - 132.14): zoom z about (500, 300) and the horizon hy at z = 1; cuts at 97.18 and 108.69
const H1_SKYCAM = [
  [96.6, 1500, 1.0], [97.18, 660, 1.0], [99.76, 660, 1.0], [100.3, 660, 1.5], [101.08, 660, 1.5], [101.5, 660, 1.8], [107.9, 660, 1.8],
  [108.69, 660, 1.0], [113.42, 660, 1.55], [115.6, 660, 1.7], [121.3, 660, 1.5], [122.82, 660, 1.3], [129.84, 660, 1.4], [130.86, 660, 1.6], [132.14, 660, 1.6],
];
function h1KeyAt(table, cuts, t) {
  let i = 0; while (i < table.length - 2 && t >= table[i + 1][0]) i++; const A = table[i], B = table[i + 1];
  const cut = cuts.some((c) => c > A[0] && c <= B[0] && t < c); const u = cut ? 0 : K.ease.inOut(K.clamp((t - A[0]) / (B[0] - A[0])));
  return A.slice(1).map((v, k) => K.lerp(v, B[k + 1], u));
}
function h1SkyCam(t) { const [hy, z] = h1KeyAt(H1_SKYCAM, [97.18, 108.69], t); return { hy: t < 97.18 ? K.lerp(1500, 760, ehE(t, 96.6, 0.58, 'out')) : hy, z }; }
const h1DeckPal = (t) => (t < 108.2 ? 'high' : t < 132.14 ? 'gold' : 'sunset');
// scroll offsets (panel units, the strips slide toward -x): far, deck, near
const h1DeckScroll = (t, k = 1) => [-28 * t * k, -120 * t * k, -250 * t * k];
function h1Strip(ctx, img, x, y, w, h) { const x0 = ((x % w) + w) % w - w; for (let xx = x0; xx < 1000; xx += w) ctx.drawImage(img, xx, y, w, h); }
// the deck behind the rig: far, mid (and the land where the deck breaks in S14)
function h1DeckBack(ctx, t, o = {}) {
  const pal = o.pal || h1DeckPal(t), P = H1_DK[pal], cam = o.cam || h1SkyCam(t), [f0, mx] = h1DeckScroll(t, o.speed ?? 1), fx = f0 + (o.fx0 || 0), hy = cam.hy - (o.lift || 0);
  ctx.save(); ctx.translate(500, 300); ctx.scale(cam.z, cam.z); ctx.translate(-500, -300);
  h1Strip(ctx, h1DeckFar(pal), fx, hy - 720, H1_DW, 760);
  if (o.under) o.under(ctx, hy);   // the sun sinking into the deck (S15)
  const brk = o.brk;   // S14: the deck breaks open and the strange country shows below brk (panel y at z = 1)
  if (brk != null) { h1Country(ctx, t, brk - 40); ctx.save(); ctx.beginPath(); ctx.rect(-600, -600, 2200, brk + 600); ctx.clip(); }
  h1Strip(ctx, h1DeckMid(pal), mx, hy - 120, H1_DW, 880); ctx.fillStyle = ehMix(P.body, P.under, 0.45); ctx.fillRect(-600, hy + 758, 2200, 2000);
  if (brk != null) { ctx.restore(); h1Strip(ctx, h1DeckNear(pal), mx * 1.3 + 400, brk - 290, H1_DW, 420); h1Strip(ctx, h1DeckNear(pal), mx * 1.3 + 1400, brk - 330, H1_DW, 420); }
  ctx.restore();
}
// the near puffs in front of the rider (o.y: puff band top in panel units)
function h1DeckFront(ctx, t, o = {}) { const pal = o.pal || h1DeckPal(t), [, , nx] = h1DeckScroll(t, o.speed ?? 1); ctx.save(); ctx.globalAlpha *= o.a ?? 0.92; h1Strip(ctx, h1DeckNear(pal), nx, o.y ?? 1000, H1_DW, 420); ctx.restore(); }

// ---------- S14: the strange country (a broad winding river, a walled city with a blue dome and two towers, hills, long shadows) ----------
function h1CountryPlate() {
  return ehBakeAt('h1country', 1000, 900, (c) => { const R = K.rng(23);
    ehGrad(c, 0, 0, 1000, 900, [[0, '#e8c890'], [1, '#c8a060']]);
    for (let gy = 0; gy < 9; gy++) for (let gx = 0; gx < 10; gx++) { c.fillStyle = ['#d8b86a', '#c89a4a', '#e8c890', '#b8a05a', '#d0a868'][Math.floor(R() * 5)]; c.fillRect(gx * 100 + R() * 8, 160 + gy * 84 + R() * 8, 96, 80); }
    // a line of hills on the far edge, with long evening shadows falling right
    ehSoftHills(c, 1000, 150, 60, '#a8805a', 3, 1, 300); ehSoftHills(c, 1000, 190, 40, '#8e6a50', 9, 1, 300);
    c.fillStyle = 'rgba(80,50,70,0.25)'; for (let i = 0; i < 6; i++) { const x = 80 + i * 170; c.beginPath(); c.moveTo(x, 200); c.lineTo(x + 140, 210); c.lineTo(x + 40, 230); c.closePath(); c.fill(); }
    // the broad river catching the gold light
    c.lineCap = 'round'; c.strokeStyle = '#6aa8c8'; c.lineWidth = 70; c.beginPath(); for (let y = 220; y <= 920; y += 10) c.lineTo(560 + Math.sin(y / 170) * 160 + (y - 220) * 0.15, y); c.stroke();
    c.strokeStyle = '#ffd88a'; c.lineWidth = 22; c.stroke(); c.strokeStyle = '#fff4c8'; c.lineWidth = 6; c.stroke();
    // the walled city on the bank: wall ring, houses, a blue dome and two towers, each with a long shadow
    const cx = 330, cy = 330; c.fillStyle = 'rgba(70,40,60,0.3)'; c.beginPath(); c.ellipse(cx + 80, cy + 30, 190, 60, 0.1, 0, 7); c.fill();
    celShade(c, ell(cx, cy, 170, 70, 30), '#f0dcb0', '#c8a878', { light: [-1, -1], off: 10, lw: 3, line: '#6a4a3a' });
    for (let k = 0; k < 22; k++) { const a = R() * Math.PI * 2, r = R() * 0.8; c.fillStyle = ['#fff1dc', '#e8b888', '#f6e0c0'][k % 3]; c.fillRect(cx + Math.cos(a) * 150 * r - 8, cy + Math.sin(a) * 55 * r - 6, 16, 12); }
    for (const tx of [cx - 70, cx + 70]) { c.fillStyle = 'rgba(70,40,60,0.35)'; c.fillRect(tx, cy - 10, 70, 8); celShade(c, K.rectPts(tx - 8, cy - 70, 16, 64), '#f6e6c6', '#c8a878', { off: 4, lw: 2.5, line: '#6a4a3a' }); celShade(c, [[tx - 10, cy - 70], [tx, cy - 90], [tx + 10, cy - 70]], '#e8604a', '#b8402e', { off: 3, lw: 2, line: '#6a4a3a' }); }
    c.fillStyle = 'rgba(70,40,60,0.35)'; c.beginPath(); c.ellipse(cx + 60, cy + 4, 60, 12, 0, 0, 7); c.fill();
    celShade(c, K.rectPts(cx - 34, cy - 30, 68, 30), '#fff1dc', '#d8c0a0', { off: 6, lw: 2.5, line: '#6a4a3a' }); ehDome(c, cx, cy - 30, 34, '#2f7ae0', '#1f4aa8');
  });
}
function h1Country(ctx, t, y) { ctx.drawImage(h1CountryPlate(), 0, y - 60, 1000, 900); ehGrad(ctx, -100, y, 1200, 260, [[0, K.rgba('#ffe0b0', 0.85)], [1, K.rgba('#ffe0b0', 0)]]);
  ctx.save(); ctx.globalCompositeOperation = 'screen'; for (let i = 0; i < 3; i++) { const u = ((t * 0.45 + i / 3) % 1); ehGlint(ctx, 560 + i * 60 + Math.sin(i * 2) * 30, y + 300 + i * 170, 18, u); } ctx.restore(); }

// ---------- S15: the sunset wide (132.14 - end) ----------
const H1_SUNSET_SKY = [[0, '#3a3a9a'], [0.22, '#6a5ac8'], [0.42, '#c070b8'], [0.55, '#ff8a8a'], [0.64, '#ffa870'], [0.7, '#ffd27a'], [1, '#ffd8a0']];
function h1SunsetBack(ctx, t) {
  const sink = 60 * ehE(t, 132.14, 5.9, 'inOut'), sun = [600, 700 + sink, 150];
  ehGrad(ctx, 0, 0, 1000, 1230, H1_SUNSET_SKY);
  // the first star and a thin moon high up at 135
  const st = K.clamp((t - 135) / 0.8); if (st > 0) { ctx.save(); ctx.globalAlpha *= st; ehGlint(ctx, 150, 300, 22, 0.5); ehGlow(ctx, 150, 300, 40, 0.6, '#fff6ea');
    ctx.drawImage(ehBakeAt('h1moon', 120, 120, (lc) => { lc.fillStyle = '#fff6d8'; lc.beginPath(); lc.arc(60, 60, 34, 0, 7); lc.fill(); lc.globalCompositeOperation = 'destination-out'; lc.beginPath(); lc.arc(74, 50, 32, 0, 7); lc.fill(); }), 820, 240); ctx.restore(); }
  h1DeckBack(ctx, t, { pal: 'sunset', cam: { hy: 770, z: 1 }, speed: 0.35, fx0: 1383, under: (c) => {
    ehGlow(c, sun[0], sun[1], sun[2] * 3.2, 0.8, '#ff9a60'); ehRays(c, sun[0], sun[1] - 20, t, 0.7);
    celShade(c, ell(sun[0], sun[1], sun[2], sun[2], 48), '#fff2b8', '#ffc060', { light: [-1, -1], off: 26, hi: '#ffffff', lw: 4, line: '#ff8a4a' }); } });
  // gold light along the deck's top edge under the sun
  ctx.save(); ctx.globalCompositeOperation = 'screen'; ehGlow(ctx, sun[0], 790, 420, 0.55, '#ff9a5a'); ctx.restore();
  // three birds crossing the disc
  for (let i = 0; i < 3; i++) { const u = (t - 132.6 - i * 0.35) / 5.5; if (u > 0 && u < 1) bird(ctx, { kind: 'sparrow', x: 860 - 560 * u + i * 30, y: 700 + sink * 0.3 - i * 26 + 10 * Math.sin(u * 9 + i), s: 0.2, dir: -1, fly: true, flap: Math.sin(EH_T2(t) * 22 + i * 1.7), pal: 1 }); }
  return sun;
}
