// ===== ALI-05 dinner shots S7, S8, S11-S15 (51-69, 80.6-122.6 s): all drawn through a5RoomWorld (a5_room.js) with their own camera
// and overlays: WHAT A FINE HOME! and the matching voices, MAY I SIT BY THE DOOR?, the travels, the lie and the map, the oil merchant
// question and the broken voice, Morgiana's eyes, THE LEADER!, the signal, the helmets at the window, I MUST GO! =====
// a brass helmet with its point and the top of a face (eyes over a sill or a wall); o: {plume (the captain), glint, face 0..1, kid (the boy's cap)}
function a5Helmet(ctx, x, y, s = 1, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (o.face !== 0) { abBlob(ctx, 0, 30, 26, 26, '#f0b890', '#d09070', { lw: 2.5 }); for (const sd of [-1, 1]) { ctx.fillStyle = '#2a1018'; ctx.beginPath(); ctx.ellipse(sd * 10, 30, 3.5, 5, 0, 0, 7); ctx.fill(); } }
  if (o.kid) { celShade(ctx, [...K.circlePts(0, 14, 28, 22, 16, Math.PI, Math.PI), [-28, 14]], '#f2c84a', '#c8a020', { off: 4, lw: 2.5, line: '#6a5010' }); if (o.hush) seg(ctx, 0, 34, 0, 58, 7, '#f0b890', 1.5); ctx.restore(); return; }
  celShade(ctx, [[-34, 14], [-32, -6], [-12, -24], [0, -48], [12, -24], [32, -6], [34, 14]], '#e8c050', '#b08a20', { light: [-1, -1], off: 6, hi: '#fff0a0', lw: 2.5, line: '#6a4a10' }); seg(ctx, -36, 14, 36, 14, 7, '#c89a30', 1.5);
  if (o.plume) celShade(ctx, [[-2, -46], [4, -48], [24 + (o.pl || 0) * 10, -82], [34 + (o.pl || 0) * 14, -76], [14, -54]], '#e8364f', '#a81a2a', { off: 3, lw: 2, line: '#6a0a14' });
  ctx.restore(); if (o.glint) abGlint(ctx, x - 8 * s, y - 30 * s, 20 * s, o.glint); }
// the file of helmets passing outside the street window (114.0 - 118.6), drawn clipped to the window (room world)
function a5WindowHelmets(ctx, t) { if (t < 113.9 || t > 118.7) return; const W = DR.win, tc = AB_T2(t), lead = (u) => kfn(u, [[113.9, 360], [114.7, 260], [115.6, 255], [117.8, 205]]);
  ctx.save(); ctx.beginPath(); ctx.rect(W.x, W.y, W.w, W.h); ctx.clip();
  for (let i = 0; i < 5; i++) { const dl = 0.12 * i, x = lead(tc - dl) + 52 * i, bump = lurch(tc, 114.7 + dl * 0.6, 0.12) * 40, bob = 8 * Math.abs(Math.sin((tc - dl) * 9)), drop = 90 * beatIn(tc, 117.8 + 0.07 * i + (i === 2 ? 0.1 : 0), 118.0 + 0.07 * i);
    const kid = i === 0, cap = i === 3, y = (kid ? 590 : 560) - bob + drop + (i === 3 ? 0 : 0); a5Helmet(ctx, x + bump * 0.2, y, 0.95, { kid, hush: kid, plume: cap, pl: Math.sin(tc * 6), face: 1 });
    if (cap && tc > 117.95 && tc < 118.3) { celShade(ctx, [[x - 2, 560 - 60], [x + 6, 560 - 62], [x + 30, 560 - 100], [x + 40, 560 - 92], [x + 16, 560 - 70]], '#e8364f', '#a81a2a', { off: 3, lw: 2 }); if (tc > 118.15) abBlob(ctx, x + 30, 470, 12, 10, '#f0b890', '#d09070', { lw: 2 }); }
    if (i === 1 && tc > 114.7 && tc < 115.4) { const w = a5Wob(tc, 114.7, 0.25, 3, 4); ctx.save(); ctx.translate(x + 20, 560); ctx.rotate(w); seg(ctx, 0, 0, 0, -120, 5, '#a8743e', 1); celShade(ctx, [[0, -116], [-7, -126], [0, -150], [7, -126]], '#d8dce8', '#8a90b0', { off: 2, lw: 2 }); ctx.restore(); } }
  ctx.restore(); celShade(ctx, K.rectPts(W.x - 20, W.y + W.h, W.w + 40, 18), '#fbe0b0', '#d8a878', { off: 4, lw: 3, line: '#8a5a3a' }); }
// little picture bubbles (panel units): pop with a bounce at a, gone after b; draw(c, x, y) the pictogram
function a5Bubble(ctx, t, x, y, r, a, b, draw, tail) { if (t < a || t > b + 0.2) return; const k = K.ease.back(K.clamp((t - a) / 0.25)) * (1 - K.clamp((t - b) / 0.2));
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); if (tail) { ctx.fillStyle = '#fffaf0'; ctx.strokeStyle = '#2b1a3a'; ctx.lineWidth = 4; for (const [dx, dy, rr] of tail) { ctx.beginPath(); ctx.arc(dx, dy, rr, 0, 7); ctx.fill(); ctx.stroke(); } }
  ctx.fillStyle = '#fffaf0'; ctx.strokeStyle = '#2b1a3a'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill(); ctx.stroke(); ctx.save(); ctx.beginPath(); ctx.arc(0, 0, r - 4, 0, 7); ctx.clip(); draw(ctx); ctx.restore(); ctx.restore(); }
const A5_PICS = {
  camel: (c) => { abBlob(c, 0, 6, 34, 18, '#e8b060', '#b8803a', { lw: 3 }); abBlob(c, -6, -12, 14, 12, '#e8b060', '#b8803a', { lw: 3 }); seg(c, 26, 0, 38, -26, 9, '#e8b060', 2.5); abBlob(c, 42, -28, 9, 7, '#e8b060', '#b8803a', { lw: 2.5 }); for (const lx of [-22, -8, 10, 24]) seg(c, lx, 18, lx, 44, 6, '#c8904a', 2); },
  ship: (c) => { c.fillStyle = '#7fc8ff'; c.fillRect(-60, 20, 120, 50); celShade(c, [[-44, 14], [44, 14], [30, 34], [-30, 34]], '#a8643a', '#6a3a1e', { lw: 3 }); seg(c, 0, 14, 0, -40, 5, '#6a3a1e', 1); celShade(c, [[2, -38], [36, 4], [2, 6]], '#fffaf0', '#d8d0c8', { lw: 2.5 }); },
  dune: (c) => { c.fillStyle = '#9ad8ff'; c.fillRect(-60, -60, 120, 60); abSun(c, 24, -24, 12); celShade(c, [[-60, 40], [-30, 0], [10, 14], [40, -6], [60, 20], [60, 60], [-60, 60]], '#f2c46a', '#c8944a', { lw: 3 }); },
  thieves: (c, t) => { const cols = ['#4f5fb8', '#8e4a8e', '#b85a30', '#3f8a4e', '#d8962a']; cols.forEach((col, i) => { const x = -48 + i * 24, y = 10 + (i % 2) * 8 + 3 * Math.sin(t * 12 + i); abBlob(c, x, y, 11, 11, '#f0b890', '#d09070', { lw: 2 }); abBlob(c, x, y - 12, 12, 7, col, abDark(col, 0.3), { lw: 2 }); }); },
};
// the lane map drawing itself (panel units): market square, the arch, three crooked lanes, a well; lit lanes (array of 0..1)
function a5Map(ctx, x, y, w, h, p, lit = [0, 0, 0]) { const q = (a, b) => K.clamp((p - a) / (b - a)); ctx.save(); ctx.translate(x, y); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.fillStyle = '#fff1d8'; ctx.fillRect(-w / 2, -h / 2, w, h);
  if (q(0, 0.2) > 0) { ctx.globalAlpha = q(0, 0.2); celShade(ctx, K.rectPts(-w / 2 + 14, h / 2 - 60, 70, 46), '#f2a71b', '#c07a10', { lw: 2.5 }); ctx.globalAlpha = 1; }
  const lanes = [[[-w / 2 + 84, h / 2 - 40], [-20, h / 2 - 50], [10, 0], [w / 2 - 30, -10]], [[-w / 2 + 84, h / 2 - 30], [0, 30], [30, 60], [w / 2 - 20, 50]], [[-w / 2 + 60, h / 2 - 60], [-50, -20], [-30, -50], [20, -h / 2 + 20]]];
  lanes.forEach((L, i) => { const n = q(0.2 + i * 0.2, 0.4 + i * 0.2); if (n <= 0) return; const pts = K.bezier(L[0], L[1], L[2], L[3], 24), m = Math.max(2, Math.floor(pts.length * n));
    ctx.strokeStyle = lit[i] > 0 ? '#ffd36a' : '#8a5a3a'; ctx.lineWidth = lit[i] > 0 ? 9 : 6; if (lit[i] > 0) { ctx.shadowColor = '#ffd36a'; ctx.shadowBlur = 16 * lit[i]; } ctx.beginPath(); pts.slice(0, m).forEach((pt, j) => (j ? ctx.lineTo(...pt) : ctx.moveTo(...pt))); ctx.stroke(); ctx.shadowBlur = 0; });
  if (q(0.8, 1) > 0) { ctx.globalAlpha = q(0.8, 1); abBlob(ctx, 20, -h / 2 + 28, 16, 12, '#3f7ad0', '#1a4aa0', { lw: 2.5 }); ctx.strokeStyle = '#8a5a3a'; ctx.lineWidth = 3; ctx.strokeRect(10, -h / 2 + 4, 20, 14); }
  ctx.restore(); }

// ---------- S7 51-58 and S8 58-69 ----------
function a5S7Over(ctx, t, cam, S) {
  const G = a5GuestR(t).P, [gx, gy] = abP(...a2HeadPt(G, 0, 10, A5_NM), cam), M = a5MorgR(t).P;
  if (t > 54.3 && t < 55.9) a5Say(ctx, S, [[54.36, 'WHAT A FINE HOME!']], t, gx - 120, gy - 200, [gx - 10, gy - 40], { size: 50, gone: 55.6 });
  // the coral voice ribbon (his), the remembered mustard one sliding onto it over Morgiana's head; they click with a glint
  if (t > 54.36 && t < 57.6) { const a = abP(G.x - 30, 690, cam), b = abP(G.x + 260, 560, cam), k = 1 - K.clamp((t - 57.2) / 0.4);
    voiceWave(ctx, a, b, t, { col: '#f08a5a', p: K.clamp((t - 54.36) / 0.5), alpha: k, amp: 18 });
    if (t > 55.0) { const sl = K.ease.out(K.clamp((t - 55.0) / 0.7)), dy = (1 - sl) * -140; voiceWave(ctx, [a[0], a[1] + dy], [b[0], b[1] + dy], t, { col: '#e8b040', p: 1, alpha: k * 0.95, amp: 18, w: 6 }); if (t > 55.7 && t < 56.3) abGlint(ctx, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, 40, (t - 55.7) / 0.6); } }
  if (t > 57.38 && t < 58.0) { const [mx, my] = abP(...a2HeadPt(M, 0, -80, A3_MORG), cam); a5Glyph(ctx, 'x', mx, my - 30, 0.8, K.clamp((t - 57.38) / 0.25) * (1 - K.clamp((t - 57.8) / 0.2))); }
}
function a5S8Over(ctx, t, cam, S) {
  const G = a5GuestR(t).P, [gx, gy] = abP(...a2HeadPt(G, 0, 10, A5_NM), cam);
  if (t > 58.55 && t < 60.2) a5Say(ctx, S, [[58.6, 'MAY I SIT BY THE DOOR?']], t, gx - 60, gy - 200, [gx, gy - 40], { size: 48, gone: 59.9 });
  if (t > 61.0 && t < 62.7) { const a = abP(1250, 860, cam), b = abP(1345, 780, cam); ctx.save(); ctx.globalAlpha *= 1 - K.clamp((t - 62.4) / 0.3); S.arrow(ctx, a, b, K.clamp((t - 61.0) / 0.5), { color: '#7fe3ff', bend: -0.3 }); ctx.restore(); }
}
const A5_RW = (ctx, t, cam) => a5RoomWorld(ctx, t, cam, {});
AB_SHOTS.push({ a: 51.0, b: 58.0, ww: 1600, cam: a5Cam([[51, a5CX(0)], [54, a5CX(420)], [58, a5CX(450)]]), world: A5_RW, over: a5S7Over });
AB_SHOTS.push({ a: 58.0, b: 69.0, ww: 1600, cam: a5Cam([[58, a5CX(380, 1.1)], [59.7, a5CX(380, 1.1)], [61.5, a5CX(600, 1.1)], [64.1, a5CX(600, 1.1)], [64.8, a5CX(680, 1.1)], [69, a5CX(690, 1.1)]]), world: A5_RW, over: a5S8Over });

// ---------- S11 80.6-88.6: the bowl, the tea, WHERE HAVE YOU TRAVELLED?, camel, ship, dune, five little thieves swatted ----------
function a5S11Over(ctx, t, cam, S) {
  const G = a5GuestR(t).P, M = a5MorgR(t).P, [gx, gy] = abP(...a2HeadPt(G, 0, 10, A5_NM), cam), [mx, my] = abP(...a2HeadPt(M, 0, 10, A3_MORG), cam);
  if (t > 85.2 && t < 86.7) a5Say(ctx, S, [[85.22, 'WHERE HAVE YOU TRAVELLED?']], t, mx - 40, my - 230, [mx, my - 40], { size: 46, gone: 86.4 });
  const tail = [[30, 90, 10], [16, 60, 14]];
  a5Bubble(ctx, t, gx - 210, gy - 300, 78, 86.1, 88.2, A5_PICS.camel, [[120, 150, 9], [80, 110, 13]]);
  a5Bubble(ctx, t, gx - 30, gy - 340, 78, 86.4, 88.2, A5_PICS.ship, tail);
  a5Bubble(ctx, t, gx + 150, gy - 290, 78, 86.7, 88.2, A5_PICS.dune, [[-80, 120, 9], [-60, 86, 13]]);
  if (t > 87.04 && t < 87.6) { const sw = K.clamp((t - 87.3) / 0.3), x = gx + 40 + 300 * sw * sw, y = gy - 180 - 200 * sw; ctx.save(); ctx.translate(x, y); ctx.rotate(sw * 3); a5Bubble(ctx, t, 0, 0, 70, 87.04, 87.55, (c) => A5_PICS.thieves(c, t)); ctx.restore(); if (sw > 0 && sw < 1) a2Tag(ctx, S, 'SWAT!', gx + 120, gy - 140, t, 87.3, 87.6, { size: 36 }); }
  if (t > 87.5 && t < 88.3) a2Tag(ctx, S, 'COUGH!', gx - 90, gy - 120, t, 87.55, 88.1, { size: 34, rot: 0.1 });
}
AB_SHOTS.push({ a: 80.6, b: 88.6, ww: 1600, cam: a5Cam([[80.6, a5CX(560, 1.1)], [88.6, a5CX(530, 1.1)]]), world: A5_RW, over: a5S11Over });

// ---------- S12 88.6-98.7: MY FIRST TIME IN THIS TOWN! (hangs), the map, the strike, ...BY OLD WELL LANE, OF COURSE!, CLUES 4 ----------
function a5S12Over(ctx, t, cam, S) {
  const G = a5GuestR(t).P, [gx, gy] = abP(...a2HeadPt(G, 0, 10, A5_NM), cam);
  if (t > 89.0) { const tilt = t > 95.68 ? 0.08 * K.ease.back(K.clamp((t - 95.68) / 0.3)) : 0, x = 560, y = 150; ctx.save(); ctx.translate(x, y); ctx.rotate(tilt); ctx.translate(-x, -y);
    a5Say(ctx, S, [[89.06, 'MY FIRST TIME IN THIS TOWN!']], t, x, y, [gx - 20, gy - 60], { size: 46, gone: 98.4 });
    if (t > 95.68) { const p = K.clamp((t - 95.68) / 0.14); ctx.save(); ctx.globalAlpha *= 1 - K.clamp((t - 98.4) / 0.25); ctx.strokeStyle = '#e8202a'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(150, y + 18); ctx.lineTo(K.lerp(150, 880, p), y + 18 - 30 * p); ctx.stroke(); ctx.restore(); }
    ctx.restore(); }
  if (t > 94.3 && t < 98.7) { const p = K.clamp((t - 94.3) / 1.2), k = K.clamp((t - 94.3) / 0.25) * (1 - K.clamp((t - 98.4) / 0.25)), lit = [0, 1, 2].map((i) => a5Win(t, 97.5 + i * 0.2, 97.7 + i * 0.2 + (i === 2 ? 0.8 : 0), 0.05, 0.1));
    a3PicBalloon(ctx, gx - 250, gy - 260, 260, 200, [gx - 40, gy - 60], k, (c) => a5Map(c, gx - 250, gy - 260, 260, 200, p, lit)); }
  if (t > 96.9 && t < 98.6) a5Say(ctx, S, [[96.96, '...BY OLD WELL LANE, OF COURSE!']], t, 500, 330, [gx - 10, gy - 50], { size: 42, gone: 98.3 });
  if (t > 98.0) { const N = a5NephR(t).P, [nx, ny] = abP(...a2HeadPt(N, 0, -60, A5_NEPH), cam); a5Glyph(ctx, 'q', nx, ny - 40, 0.9, K.clamp((t - 98.08) / 0.25)); }
}
AB_SHOTS.push({ a: 88.6, b: 98.7, ww: 1600, cam: a5Cam([[88.6, { x: 1130, y: 738, zoom: 1.25 }], [98.7, { x: 1155, y: 738, zoom: 1.25 }]]), world: A5_RW, over: a5S12Over });

// ---------- S13 98.7-106.6: EVER MET AN OIL MERCHANT?, the freeze, N-NO!, the broken voice, the cup, CLUES 5 ----------
function a5S13Over(ctx, t, cam, S) {
  const G = a5GuestR(t).P, M = a5MorgR(t).P, [gx, gy] = abP(...a2HeadPt(G, 0, 10, A5_NM), cam), [mx, my] = abP(...a2HeadPt(M, 0, 10, A3_MORG), cam), tc = AB_T2(t);
  if (t > 98.9 && t < 101.2) a5Say(ctx, S, [[98.98, 'EVER MET AN OIL MERCHANT?']], t, 470, my - 250, [mx, my - 40], { size: 44, gone: 100.9, icon: t > 100.6 ? (c, x, y) => oilJar(c, x, y + 40 + 6 * Math.abs(Math.sin((t - 100.6) * 8)), 0.42, {}) : null });
  if (t > 102.55 && t < 103.9) a5Say(ctx, S, [[102.6, 'N-NO!']], t, gx + 40, gy - 230, [gx, gy - 40], { size: 56, gone: 103.6, wobble: 5 });
  if (t > 103.2 && t < 104.3) voiceWave(ctx, [gx - 20, gy + 20], [gx - 330, gy - 120], t, { col: '#f08a5a', p: K.clamp((t - 103.2) / 0.3), jag: 1, brk: K.clamp((t - 103.6) / 0.3), amp: 26, alpha: 1 - K.clamp((t - 104.0) / 0.3) });
  if (t > 105.5 && t < 106.6) { const [rx, ry] = abP(...a2Hand(G, 1, A5_NM), cam); tsRing(ctx, rx, ry - 4, K.clamp((t - 105.5) / 1.0), '#7fe3ff', { r: 40 }); }
}
AB_SHOTS.push({ a: 98.7, b: 106.6, ww: 1600, cam: a5Cam([[98.7, { x: 1120, y: 738, zoom: 1.25 }], [101.6, { x: 1120, y: 738, zoom: 1.25 }], [103.0, { x: 1170, y: 742, zoom: 1.38 }], [105.4, { x: 1170, y: 742, zoom: 1.38 }], [105.9, { x: 1000, y: 700, zoom: 1.15 }], [106.6, { x: 990, y: 700, zoom: 1.15 }]]), world: A5_RW, over: a5S13Over });

// ---------- S14 106.6-113: Morgiana's eyes, the band and THE LEADER!, the ring-finger signal, Ali Baba's double take ----------
function a5S14Eyes(ctx, t, S) { const tc = AB_T3(t);
  a3Eyes(ctx, t, { who: 'morgiana', gaze: [0.5 + 0.02 * Math.sin(t * 3), 0.15], lid: abBlinkAt(tc, 108.06) > 0 ? K.clamp(abBlinkAt(tc, 108.06) * 1.6) : 0.05, wide: 0.2 - 0.2 * K.clamp((t - 107.0) / 0.6), brow: t > 108.4 ? 0.5 : 0, iris: 1 - 0.2 * K.clamp((t - 107.0) / 0.6),
    reflect: (c, r) => { abBlob(c, r * 0.3, -r * 0.3, r * 0.22, r * 0.16, '#ffd36a', '#c08a1a', { lw: 0 }); abGlow(c, r * 0.3, -r * 0.3, r * 0.6, 0.7, '#ffcf6a'); } }); }
function a5S14Over(ctx, t, cam, S) {
  const G = a5GuestR(t).P, [gx, gy] = abP(...a2HeadPt(G, 0, 10, A5_NM), cam);
  if (t > 109.54 && t < 110.4) { a2Tag(ctx, S, 'THE LEADER!', gx, gy - 230, t, 109.6, 110.3, { size: 58 }); }
  if (t > 110.3 && t < 111.0) { const M = a5MorgR(t).P, [hx, hy] = abP(...a2Hand(M, 1, A3_MORG), cam); for (let k = 0; k < 2; k++) tsRing(ctx, hx, hy, K.clamp((t - 110.3 - k * 0.3) / 0.35), '#7fe3ff', { r: 26 }); }
  if (t > 111.85 && t < 112.6) { const A = a5AliR(t), [ax, ay] = abP(...a2HeadPt(A, 0, -70, A2_ALI), cam); a5Glyph(ctx, 'x', ax, ay - 40, 0.8, K.clamp((t - 111.88) / 0.2)); }
  if (t > 111.5 && t < 111.65) abSpeed(ctx, [0, 0, 1000, 1230], t, { dir: -1, alpha: 0.6 });
}
const A5_RWB = (ctx, t, cam) => a5RoomWorld(ctx, t, cam, { band: t >= 108.8 && t < 110.6 ? { x: kfn(t, [[108.8, 960], [110.4, 1480]], 'lin'), y: 760, w: 170, ang: 0.21, k: 1 } : null });
AB_SHOTS.push({ a: 106.6, b: 108.8, panel: a5S14Eyes, noClues: true });
AB_SHOTS.push({ a: 108.8, b: 113.0, ww: 1600, cam: a5Cam([[108.8, { x: 1140, y: 718, zoom: 1.2 }], [111.5, { x: 1150, y: 718, zoom: 1.2 }], [111.62, { x: 720, y: 718, zoom: 1.2 }], [113.0, { x: 700, y: 718, zoom: 1.2 }]], 'out'), world: A5_RWB, over: a5S14Over });

// ---------- S15 113-122.6: helmets at the window, his eyes, the duck, I MUST GO!, three bows, the bolt ----------
const A5_RWH = (ctx, t, cam) => { a5RoomWorld(ctx, t, cam, {}); a5WindowHelmets(ctx, t); };
function a5S15Over(ctx, t, cam, S) {
  const G = a5GuestR(t).P, [gx, gy] = abP(...a2HeadPt(G, 0, 10, A5_NM), cam);
  if (t > 118.9 && t < 120.3) a5Say(ctx, S, [[118.98, 'I MUST GO!']], t, gx - 40, gy - 220, [gx, gy - 40], { size: 54, gone: 120.0 });
  if (t > 116.98 && t < 117.8) for (const sd of [-1, 1]) { const [ex, ey] = abP(...a2HeadPt(G, sd * 13 - 3, -4, A5_NM), cam); abGlint(ctx, ex, ey, 12, ((t - 116.98) * 2) % 1, '#ffe080'); }
  for (const [a, d] of [[115.5, 1], [117.8, -1], [118.3, 1]]) if (t > a && t < a + 0.15) abSpeed(ctx, [0, 0, 1000, 1230], t, { dir: d, alpha: 0.6 });
  if (t > 121.58 && t < 122.6) abSpeed(ctx, [0, 300, 1000, 700], t, { dir: 1, alpha: 0.5, n: 14 });
}
AB_SHOTS.push({ a: 113.0, b: 122.6, ww: 1600, cam: a5Cam([[113, a5CX(600, 1.1)], [114, a5CX(0, 1.1)], [115.5, a5CX(0, 1.1)], [115.6, a5CX(600, 1.1)], [117.8, a5CX(600, 1.1)], [117.9, a5CX(0, 1.1)], [118.3, a5CX(0, 1.1)], [118.4, a5CX(600, 1.1)], [122.6, a5CX(640, 1.1)]]), world: A5_RWH, over: a5S15Over });
