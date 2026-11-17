// ===== the story: the fox and the drum =====
const WW = 1000, WH = 1230, GR = 900, DUR = 163.5;
const HB = [24.8, 25.9, 43.4, 45.6, 61.2, 62.8, 64.4, 66.0, 68.2, 69.8, 71.4, 77.6, 84.2, 104.2, 105.8, 133.6, 144.0], HITS = [...HB.filter((h) => h < 123.6), 98.4];
const SLOW = [92.2, 93.6, 95.0, 96.2];
function layer1(key, w, h, draw) { return K.cached(key, () => { const c = K.layer(w * 2, h * 2), x = c.getContext('2d'); x.scale(2, 2); draw(x); return c; }); }
const skyL = () => layer1('sky', WW, 920, (x) => { x.fillStyle = C.blue; x.fillRect(0, 0, WW, 920); x.fillStyle = dotPat(x, '#3f7be6', 13, 0.3); x.fillRect(0, 0, WW, 920); for (const [bx, by, br, col] of [[150, 880, 260, '#2a62c9'], [560, 900, 300, '#2457b8'], [940, 880, 250, '#2a62c9']]) { x.beginPath(); x.ellipse(bx, by, br, br * 0.5, 0, Math.PI, 0); x.fillStyle = col; x.fill(); x.lineWidth = 6; x.strokeStyle = C.black; x.stroke(); } });
const groundL = () => layer1('ground', WW, WH, (x) => { shape(x, [[-10, GR], [1010, GR], [1010, WH], [-10, WH]], '#d9a441', { lw: 8, seed: 20, dot: C.red, pitch: 11, rad: 0.2, da: 0.5 }); shape(x, [[-10, GR - 8], [1010, GR - 8], [1010, GR + 22], [-10, GR + 22]], GREEN, { lw: 6, seed: 21, dot: GREEND, pitch: 8, rad: 0.2 }); for (let px = 4; px < 1010; px += 26) seg(x, px, GR - 8, px + 4, GR - 22, 5, GREEN2, 2.5); });
const bushL = () => layer1('bush', WW, GR + 20, (x) => { const r = K.rng(3); for (let i = 0; i < 26; i++) { const bx = 600 + r() * 420, by = GR - 20 - r() * 250, br = 50 + r() * 40; x.beginPath(); x.arc(bx, by, br, 0, 7); x.fillStyle = i % 2 ? GREEN : GREEND; x.fill(); x.lineWidth = 7; x.strokeStyle = C.black; x.stroke(); } x.fillStyle = GREEN; x.fillRect(600, GR - 60, 420, 80); });
function drawSun(ctx, x, y) { for (let i = 0; i < 14; i++) { const a = i * Math.PI / 7; seg(ctx, x + Math.cos(a) * 88, y + Math.sin(a) * 88, x + Math.cos(a) * 118, y + Math.sin(a) * 118, 9, C.yellow, 4); } shape(ctx, ell(x, y, 70, 70, 40), C.yellow, { lw: 8, seed: 40, dot: C.red, pitch: 9, rad: 0.2, da: 0.55 }); }
function cloudFlat(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const cs = [[-60, 6, 38], [-18, -16, 46], [30, -8, 40], [66, 8, 30]]; ctx.lineWidth = 8; ctx.strokeStyle = C.black; for (const [cx, cy, r] of cs) { ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke(); } ctx.fillStyle = C.white; for (const [cx, cy, r] of cs) { ctx.beginPath(); ctx.arc(cx, cy, r - 3, 0, 7); ctx.fill(); } ctx.fillRect(-60, 6, 126, 32); ctx.restore(); }
// ---------- upgrade (Fable 5.2 direction, review 1): distance kept, the branch shown as the cause, the payoff played on the fox ----------
const win = (t, a, b) => t >= a && t < b;
const ss = (t, a, b) => K.ease.inOut(K.clamp((t - a) / (b - a)));
const NEAR_MISS = 66.0, LATE = [133.6, 144.0, 162.0];
const STRIKES = HB.filter((h) => h < 123.6 && h !== NEAR_MISS);             // real contacts before the tear
const DRUM_HITS = [...STRIKES, 98.4];                                     // plus the fox's own touch
const HOLE = [748, 769];

const CAM = [[0, { x: 330, y: 720, zoom: 1.5 }], [2.9, { x: 340, y: 720, zoom: 1.5 }], [8.0, { x: 340, y: 710, zoom: 1.5 }], [19.3, { x: 330, y: 710, zoom: 1.6 }], [25.6, { x: 330, y: 710, zoom: 1.6 }], [26.4, { x: 330, y: 730, zoom: 1.8 }], [36.8, { x: 330, y: 730, zoom: 1.8 }],
  [38.2, { x: 360, y: 730, zoom: 1.75 }], [54.9, { x: 360, y: 730, zoom: 1.75 }], [56.4, { x: 610, y: 680, zoom: 1.4 }], [91.0, { x: 610, y: 680, zoom: 1.4 }], [93.0, { x: 560, y: 720, zoom: 1.5 }], [96.2, { x: 590, y: 740, zoom: 1.5 }], [97.0, { x: 600, y: 760, zoom: 1.8 }], [101.2, { x: 600, y: 760, zoom: 1.8 }],
  [102.0, { x: 620, y: 690, zoom: 1.4 }], [107.1, { x: 620, y: 690, zoom: 1.4 }], [109.6, { x: 560, y: 720, zoom: 1.5 }], [113.4, { x: 640, y: 750, zoom: 1.9 }], [126.1, { x: 660, y: 760, zoom: 2.0 }], [130.46, { x: 640, y: 750, zoom: 1.7 }], [139.1, { x: 640, y: 750, zoom: 1.7 }],
  [140.5, { x: 600, y: 730, zoom: 1.5 }], [157.7, { x: 600, y: 730, zoom: 1.5 }], [159.5, { x: 480, y: 720, zoom: 1.15 }], [163.5, { x: 480, y: 720, zoom: 1.15 }]];
const camAt = (t) => { const c = K.camAt(CAM, t), z = c.zoom; return { x: K.clamp(c.x, 500 / z, WW - 500 / z), y: K.clamp(c.y, 615 / z, WH - 615 / z), zoom: z }; };
const toPanel = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];
const inside = (t) => t >= 126.16 && t < 130.46;

// ---------- the branch: a mallet with a gap at rest; lift, whip, contact, damped rebound (one near miss) ----------
function branchTipY(t) { let y = 548;
  for (const h of [...HB, ...LATE]) { const D = h === NEAR_MISS ? 32 : h === 162.0 ? 40 : 52;
    if (t >= h - 0.55 && t < h - 0.25) y = 548 - 26 * ss(t, h - 0.55, h - 0.25);
    else if (t >= h - 0.25 && t < h) y = 548 - 26 + (26 + D) * K.ease.in((t - h + 0.25) / 0.25);
    else if (t >= h && t < h + 1.4) y = 548 + D * Math.exp(-(t - h) * 6) * Math.cos((t - h) * 11); }
  return y; }
function branchDraw2(ctx, t) {
  const ty = branchTipY(t), sw = Math.sin(t * 2.2) * 6, p = K.bezier([940, 520], [900, 470], [858 + sw, 500 + 0.4 * (ty - 548)], [812 + sw * 0.5, ty], 18);
  for (let i = 1; i < p.length; i++) seg(ctx, p[i - 1][0], p[i - 1][1], p[i][0], p[i][1], 42 - i * 0.9, C.black, 0); for (let i = 1; i < p.length; i++) seg(ctx, p[i - 1][0], p[i - 1][1], p[i][0], p[i][1], 30 - i * 0.9, WOOD, 0);
  const e = p[p.length - 1]; for (const [dx, dy, r] of [[0, 0, 36], [-24, -14, 26], [20, -18, 26]]) { ctx.beginPath(); ctx.arc(e[0] + dx, e[1] + dy, r, 0, 7); ctx.fillStyle = GREEN2; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.black; ctx.stroke(); }
  return e;
}
// ---------- the drum: a bigger reaction while it has its voice, almost none after the tear ----------
function drumHit(t) { let v = 0; for (const h of DRUM_HITS) if (t >= h) v = Math.max(v, Math.exp(-(t - h) * 7)); for (const h of LATE) if (t >= h) v = Math.max(v, 0.35 * Math.exp(-(t - h) * 7)); return v; }
function drumHop(t) { let v = 0; for (const h of DRUM_HITS) if (t >= h && t < h + 0.25) v = Math.max(v, 3 * Math.sin(Math.PI * (t - h) / 0.25)); return v; }
function drumWrap(ctx, t, o) {
  ctx.save(); ctx.translate(-10 * (o.pull || 0), -drumHop(t)); drumDraw(ctx, t, { hit: drumHit(t) * (t < 123.6 ? 1.8 : 1), hole: o.hole });
  // ripple rings on the skin from the strike point (only while the skin is whole)
  ctx.save(); K.poly(ctx, ell(800, 775, 113, 113, 40), true); ctx.clip();
  for (const h of DRUM_HITS) { const d = t - h; if (d < 0 || d > 0.7 || t > 121) continue; const src = h === 98.4 ? [672, 790] : [800, 668]; for (let k = 0; k < 2; k++) { const u = K.clamp((d - k * 0.12) / 0.55); if (u <= 0 || u >= 1) continue; ctx.save(); ctx.globalAlpha = 1 - u; ctx.lineWidth = 5; ctx.strokeStyle = '#c9a54a'; ctx.beginPath(); ctx.ellipse(src[0], src[1], 20 + u * 150, 10 + u * 90, 0, 0, 7); ctx.stroke(); ctx.restore(); } }
  ctx.restore();
  // torn edges flap after the tear
  if (o.hole > 0.95) for (let k = 0; k < 3; k++) { const a = k * 2.1 + 0.4, f = drumHit(t) * 6 + 2, ex = HOLE[0] + Math.cos(a) * 44, ey = HOLE[1] + Math.sin(a) * 50; seg(ctx, ex, ey, ex + Math.cos(a) * 18, ey + Math.sin(a) * 18 + f * Math.sin(t * 9 + k), 6, '#f6e7bf', 3); }
  ctx.restore();
}
// ---------- the fox ----------
const FXK = [[0, -120], [2.9, 40], [3.58, 60], [4.6, 60], [6.76, 110], [16.08, 110], [24.8, 225], [26.1, 240], [30.3, 240], [30.8, 205], [34.9, 205], [35.4, 165], [37.24, 165], [38.6, 282], [40.9, 282], [42.06, 322], [43.4, 322], [43.5, 250],
  [45.26, 250], [46.6, 322], [48.54, 322], [48.85, 260], [50.84, 260], [52.4, 215], [52.9, 215], [53.7, 335], [72.14, 335], [75.0, 372], [92.55, 372], [92.95, 396.5], [93.95, 396.5], [94.35, 421], [95.15, 421], [95.55, 445.5], [95.9, 445.5], [96.24, 470],
  [101.38, 470], [102.3, 380], [102.5, 372], [109.64, 372], [113.4, 478], [123.6, 478], [125.4, 627], [130.46, 627], [131.3, 500], [157.7, 500], [159.3, 500], [163.0, -100]];
const TURNS = [[0, 1], [28.35, -1], [29.1, 1], [38.2, -1], [40.6, 1], [50.24, -1], [52.78, 1], [158.3, -1]];
const MOOD = { hungry: [-0.2, 1], alarm: [0.9, 1.5], hide: [-0.3, 1.3], curious: [0.3, 1], greedy: [0.7, 1], brave: [0.9, 1.1], sad: [-0.3, 1], peace: [0.3, 1] };
const moodAt = (t) => t < 24.8 ? 'hungry' : t < 37.04 ? 'alarm' : t < 52.78 ? 'hide' : t < 89.24 ? 'curious' : t < 101.38 ? 'curious' : t < 107.1 ? 'curious' : t < 113.4 ? 'brave' : t < 130.46 ? 'greedy' : t < 157.7 ? 'sad' : 'peace';
const eyeF = (P) => [P.x + Math.sign(P.dir || 1) * 104, P.y - 129 + (P.drop || 0) * 0.95];
function biteOff(t) { let x = 0; for (const b of [116.2, 117.0, 117.8]) { if (win(t, b - 0.3, b - 0.15)) x = -14 * ss(t, b - 0.3, b - 0.15); else if (win(t, b - 0.15, b)) x = K.lerp(-14, 55, K.ease.out((t - b + 0.15) / 0.15)); else if (win(t, b, b + 0.35)) x = 55 - 6 * Math.sin(Math.PI * (t - b) / 0.35); else if (win(t, b + 0.35, b + 0.6)) x = K.lerp(49, -8, ss(t, b + 0.35, b + 0.6)); }
  if (win(t, 119.6, 121.08)) x = K.lerp(0, 55, ss(t, 119.6, 119.8)) - 12 * ss(t, 120.0, 121.0); if (win(t, 121.08, 121.6)) x = K.lerp(43, -10, K.ease.out((t - 121.08) / 0.3)) + 10 * ss(t, 121.38, 121.6); return x; }
function foxP(t) {
  const xf = (u) => kfn(u, FXK, 'inOut'), v = (xf(t + 0.05) - xf(t - 0.05)) / 0.1, tf = turnFlip(t, TURNS, 0.5), md = MOOD[moodAt(t)];
  const P = { x: xf(t), y: GR + 2, s: 0.95, dir: tf.dir, ph: xf(t) / 22, amp: K.clamp(Math.abs(v) / 22), eyes: 'open', mouth: 'closed', tailUp: md[0], puff: md[1], drop: 0, ears: 0, sq: breathe(t, 2, 0.01), seed: 9 };
  const tkI = (l) => talk(t, l, 0.4), D = [800, 775], BR = [812, branchTipY(t)], look = (p) => { P.gaze = lookAt(eyeF(P), p); };
  P.tailUp += moodAt(t) === 'curious' ? 0.08 * Math.sin(t * 2.4) : moodAt(t) === 'greedy' ? 0.12 * Math.sin(t * 9) : moodAt(t) === 'hide' ? 0.03 * Math.sin(t * 30) : moodAt(t) === 'peace' ? 0.08 * Math.sin(t * 1.8) : 0;
  // ---- opening: hunger and the failed search ----
  if (t < 19.26) { P.drop = 6; P.headUp = 0.1; P.ears = 0.3; look([P.x + 260, GR - 40]);
    if (win(t, 3.58, 4.6)) { P.sq *= 1 - 0.03 * (pulse(t, 3.7, 0.25) + pulse(t, 4.0, 0.25)); P.gaze = [0.2, 1]; P.ears = 0.5; P.drop = 10; }
    if (win(t, 4.6, 6.76)) { P.drop = 14; P.ears = 0.4; }
    if (win(t, 6.76, 8.5)) { P.drop = 24; P.headUp = 0.25; P.gaze = [0.5, 1]; P.drop += 3 * Math.abs(Math.sin(t * 9)); }
    if (win(t, 8.5, 10.24)) { P.drop = 0; P.headUp = -0.4 * ss(t, 8.5, 9.0); P.gaze = [0.3, -1]; }
    if (win(t, 10.24, 13.14)) { P.drop = 16 * ss(t, 10.24, 10.8); P.headUp = 0.2; P.ears = 0.6; P.tailUp = -0.35; P.gaze = [0.4, 0.8]; if (win(t, 12.5, 13.0)) P.lid = Math.sin(Math.PI * (t - 12.5) / 0.5); }
    if (t >= 13.14) { P.drop = 16 * (1 - ss(t, 13.14, 13.7)); P.headUp = -0.1; P.sq *= 1 + 0.02 * pulse(t, 13.2, 1.2); P.brow = 0.5; P.ears = 0.1; P.talk = tkI([[13.6, 19.2]]); } }
  // ---- first fright ----
  if (win(t, 19.26, 37.04)) { P.ears = 0; look([P.x + 300, GR - 120]);
    if (t >= 24.8) { P.ears = 0.8; P.drop = 8; P.eyes = 'wide'; P.tailUp = K.lerp(0.3, 0.9, ss(t, 25.9, 26.3)); P.puff = K.lerp(1, 1.5, ss(t, 25.9, 26.3)); }
    if (win(t, 25.9, 26.8)) { P.tip = -0.08 * ss(t, 25.9, 26.1); P.sq = settleTo(t, 25.95, 1, 0.9, 0.2) + 0.1 * ss(t, 26.2, 26.8); }
    for (const h of [24.8, 25.9]) if (win(t, h, h + 0.5)) P.x += tremble(t, 2.5 * (1 - (t - h) / 0.5), 9);
    if (win(t, 28.2, 30.06)) { P.gaze = t < 28.95 ? [-1, 0] : t < 29.6 ? [1, 0] : [0.3, -1]; P.drop = t < 28.95 ? 8 : t < 29.6 ? 12 : 16; }
    if (t >= 30.06) { P.talk = tkI([[30.06, 31.08], [31.08, 33.3], [33.3, 37.04]]); P.gaze = win(t, 35.4, 35.7) ? [-1, 0] : [1, -0.1]; P.drop = 14; } }
  // ---- hiding, peeking, wanting to run ----
  if (win(t, 37.04, 52.78)) { P.drop = 14; P.sq = 0.92 * anticipate(t, 37.04, 0.2, 0.1); P.ears = 0.8; P.eyes = 'wide';
    if (win(t, 37.24, 38.6)) P.amp = 1;
    if (t >= 38.6 && t < 40.6) { P.tailUp = K.lerp(-0.1, -0.7, ss(t, 38.6, 40.0)); P.gaze = [1, 0]; }
    if (win(t, 40.6, 43.4)) { P.ears = 0.3; P.eyes = 'open'; P.gaze = [1, 0]; P.drop = 10; }
    if (win(t, 43.4, 45.26)) { P.ears = 1; P.puff = 1.5; P.tailUp = -0.2 + 0.6 * K.spring(t, 45.6, 1, 4, 5) * (t > 45.6 ? 1 : 0); P.gaze = [1, 0]; }
    if (win(t, 45.26, 48.54)) { P.ears = 0.4; P.eyes = 'open'; P.drop = 10; P.gaze = gazePlan(t, [[45.26, [1, 0]], [46.6, [1, 0]], [47.1, [1, 0.2]], [47.6, [0.4, -1]], [48.1, [0.6, 0.8]]], 0.07); P.brow = -0.3; }
    if (win(t, 48.54, 50.24)) { P.ears = 1; P.sq = 0.94; P.x += tremble(t, 2, 10) * (pulse(t, 48.6, 0.4) + pulse(t, 49.5, 0.4)); P.gaze = [1, 0]; }
    if (t >= 50.24) { P.drop = 18; P.tailUp = -0.45; P.ears = 0.9; P.gaze = [1, 0]; if (t >= 52.4) { P.raise = 0.35; P.amp = 0; } } }
  // ---- the reveal: head up, eyes first, the camera follows his eye line; the branch's lesson, with falling fear ----
  if (win(t, 52.78, 72.14)) { P.eyes = 'open'; P.ears = 0.3; P.drop = 14; P.tailUp = 0.1; P.puff = 1.1;
    if (t >= 53.78) { P.drop = K.lerp(14, 2, ss(t, 53.78, 54.3)); P.headUp = -0.25 * ss(t, 53.78, 54.3); }
    if (t >= 54.94) { P.gaze = [1, -0.05]; }
    if (win(t, 56.9, 57.8)) { P.gaze = [0.6, -0.8]; P.x -= 8 * ss(t, 56.9, 57.1); P.eyes = 'wide'; }
    if (t >= 57.8) { let tgt = D; for (const h of [61.2, 62.8, 64.4, 66.0, 68.2, 69.8, 71.4]) { if (t >= h - (h >= 64.4 ? 0.7 : 0.4) && t < h) tgt = h === 68.2 ? BR : BR; } look(t > 60.5 ? tgt : [800, 700]); }
    // flinches that shrink: full duck, half duck, ears only; the near miss; no flinch
    P.x += -35 * pulse(t, 61.2, 1.0) * (t < 61.32 ? K.clamp((t - 61.2) / 0.12) : 1) - 18 * pulse(t, 62.8, 0.7);
    P.ears += 0.6 * pulse(t, 61.2, 0.8) + 0.4 * pulse(t, 62.8, 0.6) + 0.4 * pulse(t, 64.4, 0.3);
    if (win(t, 65.7, 66.25)) { P.lid = 1; P.ears = 1; P.sq = 0.95; }
    if (win(t, 66.25, 67.6)) { P.gaze = t < 66.9 ? [0.6, -0.8] : [1, 0.1]; P.brow = -0.3; }
    if (win(t, 67.8, 68.3)) look(BR);
    if (t >= 69.0) P.x += 6 * ss(t, 69.8, 70.2) + 6 * ss(t, 71.4, 71.8);
    if (t >= 64.4) { P.ears = Math.min(P.ears, 0.3); P.tailUp = 0.25 + 0.08 * Math.sin(t * 2.4); } }
  // ---- from a distance; thinking; greed beats fear ----
  if (win(t, 72.14, 91.1)) { P.drop = 6; P.headUp = -0.1; P.ears = 0; look(D); P.x += -14 * pulse(t, 77.6, 1.0) - 6 * pulse(t, 84.2, 0.6); P.ears += 0.9 * pulse(t, 77.6, 0.8) + 0.4 * pulse(t, 84.2, 0.5); P.puff += 0.5 * pulse(t, 77.6, 0.9);
    if (t >= 80.5) { P.talk = tkI([[82.4, 91]]); P.brow = 0.3; P.gaze = [0.6, -0.5]; }
    if (win(t, 84.96, 86.98)) { P.sq = 0.95; P.ears = 0.6; }
    if (t >= 89.24) { P.headUp = -0.18; P.mouth = win(t, 89.5, 89.9) ? 'open' : 'closed'; P.tailUp = 0.6 + 0.12 * Math.sin(t * 6); P.brow = 0.3; look(D); } }
  // ---- the sneak: paw hangs, eyes flick to the branch, paw placed, body flows ----
  if (win(t, 91.1, 96.24)) { P.drop = 16; P.tailUp = -0.1; P.puff = 1; P.ears = 0.15 * Math.sin(t * 5); P.eyes = 'open'; look(D);
    for (const s of [92.2, 93.6, 94.8, 95.55]) if (win(t, s, s + 0.4)) { P.raise = 0.45 * Math.sin(Math.PI * (t - s) / 0.4); look(BR); }
    if (win(t, 94.35, 94.75)) { P.raise = 0.4; P.amp = 0; } }
  // ---- the touch, the jump back, the realization ----
  if (win(t, 96.24, 101.38)) { P.amp = 0; P.tip = -0.07; P.drop = -4; P.headUp = -0.2; P.ears = 0.8; P.lid = 0.5; look(D);
    P.reach = t < 97.0 ? 0.25 * ss(t, 96.5, 96.8) : t < 97.25 ? K.lerp(0.5, 0.1, ss(t, 97.0, 97.25)) : t < 97.5 ? 0.1 : t < 98.3 ? K.lerp(0.1, 1, ss(t, 97.5, 98.3)) : 0.95;
    if (t >= 98.28) { P.lid = null; P.eyes = 'wide'; P.puff = 1.5; P.tailUp = 0.9; P.ears = 1; if (t < 98.7) P.x += tremble(t, 2.5, 11); P.gaze = t < 99.0 ? lookAt(eyeF(P), D) : gazePlan(t, [[99.0, [1, 0.1]], [99.5, [0.6, -0.8]], [100.0, [1, 0.1]]], 0.07); }
    if (t >= 100.6) { P.reach = K.lerp(0.95, 0, ss(t, 100.6, 100.9)); P.sq = K.lerp(1, 0.88, ss(t, 100.6, 101.3)); P.drop = 10; } }
  if (win(t, 101.38, 102.82)) { const u = K.clamp((t - 101.38) / 0.92); P.y = GR + 2 - 110 * Math.sin(Math.PI * u) * (u < 1 ? 1 : 0); P.rot = -0.3 * Math.sin(Math.PI * u); P.sq = u < 1 ? 1.08 : landSquash(t, 102.3, 0.18); P.eyes = 'wide'; P.mouth = u < 1 ? 'open' : 'closed'; P.amp = 0; P.tailUp = 0.9 + swing(t, 102.3, 0.4); P.ears = 1; P.gaze = [1, 0]; }
  if (win(t, 102.82, 107.1)) { P.drop = 10; P.sq = 0.94; P.amp = 0; P.tailUp = 0.2; P.gaze = t < 103.9 ? lookAt(eyeF(P), D) : t < 104.2 ? lookAt(eyeF(P), BR) : lookAt(eyeF(P), t < 105.5 ? D : BR); P.headUp = 0.15 * pulse(t, 105.8, 0.4); P.brow = K.lerp(-0.4, 0, ss(t, 105.0, 106.5)); P.ears = t < 106.0 ? 0.7 : t < 106.3 ? 0.35 : 0; }
  // ---- courage: breath, shake-off, chest out, a stamp ----
  if (win(t, 107.1, 113.4)) { P.ears = 0; P.brow = 0.8; P.headUp = -0.15; P.gaze = lookAt(eyeF(P), D);
    if (t < 109.64) { P.sq = 1 + 0.06 * ss(t, 107.1, 107.8); P.rot = win(t, 108.0, 108.3) ? 0.05 * Math.sin((t - 108.0) * 60) : 0; P.raise = 0.5 * pulse(t, 108.35, 0.3); P.amp = 0; }
    if (win(t, 111.5, 112.0)) P.ears = 0.6 * pulse(t, 111.5, 0.5); }
  // ---- sniff, three failed bites, the tear ----
  if (win(t, 113.4, 123.6)) { P.amp = 0; P.x += biteOff(t); P.gaze = lookAt(eyeF(P), [700, 770]); P.drop = 8; P.ears = 0.1;
    if (t < 115.34) { P.drop = 8 + 3 * (pulse(t, 113.6, 0.15) + pulse(t, 113.85, 0.15) + pulse(t, 114.1, 0.15) + pulse(t, 114.35, 0.5)); P.headUp = 0.1; P.mouth = win(t, 114.9, 115.15) ? 'open' : 'closed'; }
    for (const b of [116.2, 117.0, 117.8]) { if (win(t, b - 0.15, b)) P.mouth = 'open'; if (win(t, b, b + 0.35)) { P.tip = -0.08; P.mouth = 'closed'; } if (win(t, b + 0.35, b + 0.6)) P.mouth = 'open'; }
    P.ears += 0.7 * pulse(t, 116.6, 0.3);
    if (win(t, 118.1, 119.6)) { P.mouth = 'open'; P.sq = 1 + 0.025 * Math.sin(t * 22); }
    if (win(t, 119.8, 121.08)) { P.rot = 0.07 * Math.sin((t - 119.8) * 31); P.tip = -0.08; P.brow = 1; }
    if (win(t, 121.08, 121.7)) { P.eyes = 'wide'; P.tailUp = 0.7 + swing(t, 121.2, 0.4, 2); }
    if (t >= 121.7) { P.gaze = lookAt(eyeF(P), HOLE); P.brow = 0.3; } }
  if (win(t, 123.6, 126.16)) { P.amp = K.clamp(Math.abs(v) / 22); P.tailUp = 0.75 + 0.15 * Math.sin(t * 10); P.gaze = lookAt(eyeF(P), HOLE); P.drop = 4; }
  // ---- outside again: tail limp, head comes out, disbelief ----
  if (win(t, 130.46, 139.14)) { P.ears = t < 131.0 ? 0.6 : 0.5; P.tailUp = -0.35; P.gaze = lookAt(eyeF(P), HOLE); P.lid = 0.2; P.drop = 6;
    P.ears -= 0.5 * pulse(t, 133.7, 0.4);
    if (win(t, 135.92, 137.1)) P.gaze = lookAt(eyeF(P), [812, 548]);
    if (t >= 137.1) { P.lid = 0.3; P.rot = 0.04 * Math.sin((t - 137.3) * 12) * (win(t, 137.3, 138.4) ? 1 : 0); } }
  // ---- the moral: sitting, thinking, looking ----
  if (win(t, 139.14, 157.7)) { P.amp = 0; P.sit = 0.4 * K.ease.out(K.clamp((t - 139.14) / 0.3)); P.plant = true; P.sq = landSquash(t, 139.44, 0.1) * (1 - 0.02 * pulse(t, 139.6, 1.0)); P.gaze = lookAt(eyeF(P), HOLE); P.brow = 0.2; P.ears = 0.3; P.tailUp = 0.0;
    if (win(t, 140.8, 143.22)) P.gaze = [0.5, -0.8];
    P.talk = tkI([[143.22, 148.6], [148.6, 153.48], [153.48, 157.14]]);
    if (win(t, 145.3, 145.9)) { P.gaze = [-1, 0]; P.ears = 0.7; }
    if (win(t, 147.4, 147.9)) P.headUp = 0.15 * pulse(t, 147.4, 0.5);
    if (win(t, 148.6, 152.9)) P.gaze = lookAt(eyeF(P), [812, 548]);
    if (win(t, 152.9, 153.3)) P.headUp = -0.2 * pulse(t, 152.9, 0.4);
    if (t >= 153.48) { P.gaze = gazePlan(t, [[153.48, [0.6, -0.8]], [154.3, [1, 0.6]], [155.2, [0.8, -0.6]], [156.0, [1, 0.3]]], 0.4); }
    if (t >= 156.2) P.lid = 0.3; }
  // ---- off he goes, nose low, still in frame for "looking for food" ----
  if (t >= 157.7) { P.sit = 0.4 * (1 - ss(t, 157.7, 158.1)); P.plant = P.sit > 0; P.sq = anticipate(t, 157.7, 0.2, 0.06); P.ears = 0; P.gaze = t < 158.3 ? lookAt(eyeF(P), D) : [-1, 0.4]; if (t >= 159.3) { P.drop = 14; P.headUp = 0.2; } P.ears += 0.5 * pulse(t, 162.0, 0.3); }
  return P;
}
// ---------- inside the drum: a cross-section, his head through the tear ----------
function drawInside(ctx, t) {
  ctx.fillStyle = NAVY2; ctx.fillRect(-10, -10, 1020, 1250); ctx.fillStyle = dotPat(ctx, '#1b3a8f', 12, 0.22); ctx.fillRect(-10, -10, 1020, 1250);
  ctx.save(); ctx.globalAlpha = 0.18; ctx.fillStyle = '#ffe9a8'; K.poly(ctx, [[150, 520], [150, 760], [900, 1000], [900, 300]], true); ctx.fill(); ctx.restore();
  for (const rx of [400, 640]) { ctx.save(); ctx.lineWidth = 6; ctx.strokeStyle = '#2c4ea6'; ctx.beginPath(); ctx.moveTo(rx, 250); ctx.lineTo(rx, 980); ctx.stroke(); ctx.restore(); }
  for (const [y0, y1] of [[100, 250], [980, 1130]]) { shape(ctx, [[-10, y0], [1010, y0], [1010, y1], [-10, y1]], C.red, { lw: 9, seed: 60, dot: '#7a1008', pitch: 9, rad: 0.18, da: 0.5 }); for (let x = 40; x < 1000; x += 90) { ctx.fillStyle = C.yellow; ctx.beginPath(); ctx.arc(x, (y0 + y1) / 2, 11, 0, 7); ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.stroke(); } }
  shape(ctx, [[880, 250], [1010, 250], [1010, 980], [880, 980]], '#f6e7bf', { lw: 8, seed: 61, dot: '#c9a54a', pitch: 10, rad: 0.15, da: 0.5 });
  // the fox's head, 1.7 times stage size, pushed through the tear
  const P = foxP(t), F = { x: 104, y: 858, s: 1.7, dir: 1, eyes: 'open', ears: 0, drop: 0, tailUp: 0.7, mouth: 'closed', seed: 9, lid: null };
  F.gaze = t < 127.82 ? [K.lerp(0.3, 1, ss(t, 126.16, 126.6)), 0] : t < 129.64 ? [0.7, -0.7] : [0.3, 1]; F.brow = t >= 127.82 && t < 129.64 ? -0.5 : 0;
  if (t >= 129.64) { F.ears = 0.6 * ss(t, 129.64, 130.0); F.mouth = 'frown'; } if (win(t, 130.05, 130.4)) F.lid = Math.sin(Math.PI * (t - 130.05) / 0.35);
  F.x += 6 * Math.sin(t * 1.3); void P;
  ctx.save(); ctx.beginPath(); ctx.rect(150, 0, 900, 1230); ctx.clip(); fox(ctx, F); ctx.restore();
  // the torn skin wall with the hole he looks through
  const holeP = []; for (let i = 0; i <= 16; i++) { const a = -Math.PI / 2 + i / 16 * Math.PI, r = 125 + 18 * Math.sin(i * 2.7); holeP.push([150 + Math.cos(a) * 30, 640 + Math.sin(a) * r]); }
  ctx.save(); ctx.beginPath(); ctx.rect(-10, 250, 160, 730); K.poly(ctx, holeP, true); ctx.fillStyle = '#f6e7bf'; ctx.fill('evenodd'); ctx.restore();
  shape(ctx, [[-10, 250], [150, 250], ...holeP, [150, 980], [-10, 980]], '#f6e7bf', { lw: 8, seed: 62, dot: '#c9a54a', pitch: 10, rad: 0.15, da: 0.5 });
  for (let k = 0; k < 4; k++) { const [hx, hy] = holeP[2 + k * 4]; seg(ctx, hx, hy, hx + 26, hy + (k < 2 ? -8 : 8) + 4 * Math.sin(t * 6 + k), 7, '#f6e7bf', 3); }
}
function drawWorld(ctx, t, cam) {
  ctx.drawImage(skyL(), 0, 0, WW, 920); drawSun(ctx, 760, 130); cloudFlat(ctx, 120 + ((t * 3) % 1100), 110, 1.0); cloudFlat(ctx, ((t * 2 + 700) % 1200) - 100, 250, 0.8);
  ctx.drawImage(treeBack(), 0, 0, WW, GR + 10); ctx.drawImage(groundL(), 0, 0, WW, WH);
  ctx.drawImage(drumTree(), 0, 0, WW, GR + 10);
  const hole = t < 121.08 ? 0 : K.ease.out(K.clamp((t - 121.08) / 1.5)), pull = [116.2, 117.0, 117.8].reduce((a, b) => a + (win(t, b, b + 0.35) ? Math.sin(Math.PI * (t - b) / 0.35) : 0), 0) + (win(t, 119.8, 121.08) ? 1 : 0);
  drumWrap(ctx, t, { hole, pull });
  const tip = branchDraw2(ctx, t);
  // the bushes that hid the drum sink out of the view as he lifts his head (no dissolve)
  if (t < 56.6) { ctx.save(); ctx.beginPath(); ctx.rect(0, -300, WW, GR - 8 + 300); ctx.clip(); ctx.drawImage(bushL(), 0, 300 * K.ease.in(K.clamp((t - 54.94) / 1.5)), WW, GR + 20); ctx.restore(); }
  const F = foxP(t), TR = (c) => c.drawImage(hideTree(), -141, 0, WW, GR + 10);
  const headIn = t >= 124.5 && t < 131.0;
  if (t < 37.04) { TR(ctx); fox(ctx, F); }
  else { if (headIn) { ctx.save(); ctx.beginPath(); ctx.rect(-10, -10, 1020, 1250); K.poly(ctx, ell(800, 775, 146, 146, 48).map(([x, y]) => [x < 702 ? 702 : x, y]), true); ctx.clip('evenodd'); fox(ctx, F); ctx.restore(); } else fox(ctx, F); TR(ctx); }
  worldFX(ctx, t, cam, F, tip);
}
function windStreaks(ctx, t) { for (let i = 0; i < 9; i++) { const u = ((t * 0.35 + i / 9) % 1), x = 1100 - u * 1300, y = 380 + (i * 61) % 300 + Math.sin(t * 2 + i) * 10; ctx.save(); ctx.globalAlpha = Math.sin(Math.PI * u); ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.strokeStyle = C.white; ctx.beginPath(); ctx.moveTo(x, y); ctx.bezierCurveTo(x + 40, y - 18, x + 80, y + 18, x + 130, y - 4); ctx.stroke(); ctx.restore(); } }
function worldFX(ctx, t, cam, F, tip) {
  const B = (a, b) => K.beat(t, a, b, 'lin'), fh = [F.x + Math.sign(F.dir) * 132 * F.s, F.y - 130 * F.s];
  if (t >= 14.2 && t < 19.3) cloud(ctx, fh[0] + 30, fh[1] - 160, 120, 84, C.blue, B(14.2, 0.4), { tail: [-70, 130], inside: (c) => { seg(c, -22, 14, 22, -14, 26, C.red, 5); shape(c, ell(-26, 16, 12, 12, 10), C.white, { lw: 4, seed: 2 }); shape(c, ell(-12, 24, 12, 12, 10), C.white, { lw: 4, seed: 2 }); } });
  if (t >= 33.3 && t < 37.0) cloud(ctx, fh[0] + 20, fh[1] - 170, 130, 90, C.blue, B(33.3, 0.4), { tail: [-60, 140], inside: (c) => { shape(c, ell(0, 20, 70, 50, 22), C.black, { lw: 4, seed: 2 }); for (const ex of [-24, 24]) { shape(c, ell(ex, 8, 13, 10, 10), C.yellow, { lw: 3, seed: 2 }); } shape(c, [[-30, 38], [-20, 22], [-10, 38], [0, 22], [10, 38], [20, 22], [30, 38]], C.white, { lw: 3, seed: 3 }); sfx(c, '?', 62, -22, 50, 1, { fill: C.red }); } });
  if (t >= 80.5 && t < 91.1) cloud(ctx, 450, 500, 150, 100, C.blue, B(80.8, 0.4), { tail: [fh[0] - 450 - 10, fh[1] - 500 - 60], inside: (c) => { shape(c, ell(-30, 10, 52, 52, 24), C.red, { lw: 5, seed: 2 }); for (const ex of [-46, -14]) shape(c, ell(ex, -6, 11, 9, 10), C.yellow, { lw: 3, seed: 2 }); for (let i = 0; i < 3; i++) { seg(c, 40 + i * 18, 40 - i * 4, 62 + i * 18, 6 - i * 4, 14, C.red, 4); shape(c, ell(34 + i * 18, 44 - i * 4, 9, 9, 8), C.white, { lw: 3 }); } } });
  // wind gusts while the branch strikes
  if (t >= 59.6 && t < 72.4) { ctx.save(); ctx.globalAlpha = K.env(t, 59.6, 72.4, 0.6, 0.6) * 0.8; windStreaks(ctx, t); ctx.restore(); }
  // sound comes out of the drum on each real hit
  for (const h of DRUM_HITS) if (h > 52 && t >= h && t < h + 0.7) soundArcs(ctx, 655, 760, -1, (t - h) * 2 + h);
  if (t >= 61.2 && t < 62.1) sfx(ctx, 'BOOM!', 700, 560, 56, B(61.2, 0.1), { rot: -0.1, fill: C.yellow });
  if (t >= 98.4 && t < 99.2) sfx(ctx, 'BOOM!', 640, 640, 56, B(98.4, 0.1), { rot: 0.1, fill: C.yellow });
  // a leaf falls on the strong hits
  for (const h of [61.2, 68.2, 104.2]) { const d = t - h; if (d < 0 || d > 2.2) continue; ctx.save(); ctx.translate(812 + 30 * Math.sin(d * 3) - d * 20, 600 + d * 130); ctx.rotate(Math.sin(d * 4) * 0.8); shape(ctx, ell(0, 0, 14, 7, 10), GREEN2, { lw: 3, seed: 2 }); ctx.restore(); }
  // the courage stamp
  dustBurst(ctx, F.x + 60, GR + 2, t - 108.5, 5, 6, 11, 30, 0.45, 3);
  dustBurst(ctx, 380, GR + 2, t - 102.3, 6, 8, 14, 40, 0.5, 5);
  if (t >= 116.2 && t < 116.9) sfx(ctx, 'CHOMP!', 690, 660, 50, B(116.2, 0.1), { rot: -0.1 });
  if (t >= 131.98 && t < 133.4) sfx(ctx, 'EMPTY!', 720, 600, 60, B(131.98, 0.15), { rot: -0.06, fill: C.white });
  void tip; void cam;
}
const SCENE = {
  duration: DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    const shake = DRUM_HITS.reduce((a, h) => a + K.spring(t, h, 3.2, 11, 9), 0) + K.spring(t, 102.3, 5, 9, 6);
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196;
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip();
    ctx.translate(px + shake * 0.8, py - shake * 0.5); ctx.scale(pw / WW, ph / WH);   // the shake moves the picture only; the caption panel stays still
    const cam = inside(t) ? { x: 500, y: 615, zoom: 1 } : camAt(t);
    ctx.save(); K.camera(ctx, WW, WH, cam); if (inside(t)) drawInside(ctx, t); else drawWorld(ctx, t, cam); ctx.restore();
    overlays(ctx, t, cam, S);
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);
  },
  score(k, S) {
    k.bed(S.sfx.bed, 0, DUR, 0.5);
    [0.3, 0.75, 1.2, 1.65].forEach((h, i) => k.play('pop', h, { pitch: 0.8 + i * 0.08, gain: 0.4 }));
    [24.8, 25.9, 43.4, 45.6].forEach((h) => { k.play('thud', h, { gain: 0.6 }); k.play('stamp', h, { gain: 0.4 }); });
    STRIKES.filter((h) => h > 50).forEach((h) => { k.play('thud', h, { gain: 0.5 }); k.play('stamp', h, { gain: 0.3 }); }); k.play('thud', 98.4, { gain: 0.6 }); k.play('stamp', 98.4, { gain: 0.4 });
    k.play('whoosh', 101.38, { dur: 0.5, gain: 0.3 }); k.play('pop', 102.3, { pitch: 0.8, gain: 0.35 }); k.play('thud', 108.52, { gain: 0.3 });
    [116.45, 117.25, 118.05].forEach((h, i) => k.play('thud', h, { gain: 0.25 - i * 0.05 })); k.play('paper', 121.08, { dur: 0.4, gain: 0.6 });
    k.play('whoosh', 126.1, { dur: 0.3, gain: 0.2 }); k.play('whoosh', 130.4, { dur: 0.3, gain: 0.2 }); k.play('pop', 132.0, { pitch: 0.7, gain: 0.3 });
    LATE.forEach((h) => k.play('thud', h, { gain: 0.18 })); k.play('pop', 139.44, { pitch: 0.7, gain: 0.25 });
    k.play('chime', 161.8, { note: 'C6', gain: 0.8 });
  },
};
function overlays(ctx, t, cam, S) {
  if (t < 3.8) { const ex = K.beat(t, 3.0, 0.7, 'lin'); ctx.save(); ctx.globalAlpha = 1 - ex; ctx.translate(0, ex * 60);
    S.title(ctx, 'The Fox and', 500, 1010, K.beat(t, 0.15, 1.0, 'lin'), { size: 64, align: 'center' }); S.title(ctx, 'the Drum', 500, 1130, K.beat(t, 0.9, 1.0, 'lin'), { size: 64, align: 'center' }); ctx.restore(); }
  // the first booms come from off screen right: one word each, fully inside the frame, arcs entering from the border
  for (const [h, y] of [[24.8, 380], [25.9, 470], [43.4, 400]]) if (t >= h && t < h + 0.9) { ctx.save(); ctx.globalAlpha = 1 - K.clamp((t - h - 0.6) / 0.3); sfx(ctx, 'BOOM!', 820, y, 62, K.beat(t, h, 0.12, 'lin'), { rot: -0.1, fill: C.yellow }); ctx.restore();
    for (let i = 0; i < 3; i++) { const u = ((t - h) * 1.4 + i / 3) % 1; ctx.save(); ctx.globalAlpha = (1 - u) * 0.9; ctx.lineWidth = 8; ctx.strokeStyle = C.white; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(1060 - u * 120, y + 140, 70 + u * 90, Math.PI - 0.7, Math.PI + 0.7); ctx.stroke(); ctx.restore(); } }
  if (t >= 161.7) S.title(ctx, 'THE END', 500, 190, K.beat(t, 161.7, 0.8, 'lin'), { size: 80, align: 'center' });
}
window.SCENE = SCENE;
