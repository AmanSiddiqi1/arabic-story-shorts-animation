// ===== lion, hare and forest friends for the lion and the hare =====
const GREEN = '#3f9d4a', GREEN2 = '#6cc35a', GREEND = '#2b7a38', CREAM = '#fff3d6', FOXC = '#e8742a', FOXD = '#b5501a';
const MANE = '#c8481a', MANED = '#7a2408', STONE = '#b9b4c6', STONE2 = '#d6d2e0', STONED = '#6f6a86', EARTH = '#b0692a', EARTHD = '#7a4212', DEERC = '#c98a3a', DEERD = '#9a6420';
const LPAL = [{ body: C.yellow, dark: '#d9a40c', mane: MANE, maneD: MANED, dot: C.red }, { body: '#ff8a2a', dark: '#c95f10', mane: NAVY2, maneD: C.black, dot: C.red }];
const HPAL = [{ body: C.white, dot: '#9db7e8' }, { body: '#e8b36a', dot: '#b5762a' }, { body: '#c9c4d6', dot: '#6f6a86' }];
const manePts = (cx, cy, r, n = 13, ph = 0) => { const pts = []; for (let i = 0; i <= n * 8; i++) { const a = i / (n * 8) * Math.PI * 2, rr = r * (0.84 + 0.16 * Math.abs(Math.sin(a * n / 2 + ph))); pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]); } return pts; };
const browLine = (ctx, x0, y0, x1, y1, lw = 7) => { ctx.save(); ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.restore(); };

// side-view lion, feet at (x, y), local +x = facing side.
// P: {x,y,s,dir,ph,amp,pal,crouch,puff,tailUp,tw,raise,reach,drop,nod,flush,talk,roar,mouth,eyes,brow,shake,rot}
function lion(ctx, P) {
  const s = P.s || 1, dir = P.dir ?? 1, ph = P.ph || 0, amp = P.amp ?? 0, pal = LPAL[P.pal || 0], cr = (P.crouch || 0) * 22, puff = P.puff || 1;
  ctx.save(); ctx.translate(P.x + (P.shake ? Math.sin(P.shake * 47) * 4 : 0), P.y); ctx.scale(dir * s, s); if (P.rot) ctx.rotate(P.rot);
  const tu = P.tailUp ?? 0.3, tsw = Math.sin(P.tw ?? ph * 0.5) * 14, tp = K.bezier([-118, -130 + cr], [-176, -128 + cr - 30 * tu], [-204, -150 - 90 * tu], [-182 + tsw, -196 - 90 * tu], 14);
  for (let i = 1; i < tp.length; i++) seg(ctx, tp[i - 1][0], tp[i - 1][1], tp[i][0], tp[i][1], 24, C.black, 0);
  for (let i = 1; i < tp.length; i++) seg(ctx, tp[i - 1][0], tp[i - 1][1], tp[i][0], tp[i][1], 13, pal.body, 0);
  const te = tp[tp.length - 1]; shape(ctx, ell(te[0], te[1] - 6, 19, 26, 16), pal.mane, { lw: 5, seed: 4 });
  const leg = (x, sw, far) => { const a = Math.sin(ph + sw) * amp * 0.55, fx = x + Math.sin(a) * 46, lift = a > 0 ? a * 28 : 0; seg(ctx, x, -84 + cr, fx, -16 - lift, 30, far ? pal.dark : pal.body, 5); shape(ctx, ell(fx + 9, -11 - lift, 27, 13, 14), far ? pal.dark : pal.body, { lw: 4.5, seed: 3 }); };
  leg(-86, 0, true); leg(72, Math.PI, true);
  shape(ctx, ell(-4, -130 + cr, 128, 62, 34), pal.body, { lw: 8, seed: 5, dot: pal.dot, pitch: 10, rad: 0.18, da: 0.4 });
  shape(ctx, ell(-6, -96 + cr, 88, 24, 22), CREAM, { lw: 0 });
  leg(-58, Math.PI, false);
  if (P.raise) { const r = P.raise, px = 100 + 64 * r, py = -66 + cr - 74 * r; seg(ctx, 100, -96 + cr, px, py, 30, pal.body, 5); shape(ctx, ell(px + 6, py, 26, 16, 14), pal.body, { lw: 4.5, seed: 3 }); } else leg(102, 0, false);
  // head
  ctx.save(); ctx.translate(120 + (P.reach || 0), -186 + cr * 1.2 + (P.drop || 0)); ctx.rotate(P.nod || 0);
  shape(ctx, manePts(-8, 4, 98 * puff, 13, P.mph || 0), pal.mane, { lw: 8, seed: 6, dot: pal.maneD, pitch: 10, rad: 0.2, da: 0.55 });
  for (const ex of [-36, 24]) { shape(ctx, ell(ex, -50, 18, 18, 14), pal.body, { lw: 5, seed: 7 }); shape(ctx, ell(ex, -50, 8, 8, 10), pal.mane, { lw: 0 }); }
  shape(ctx, ell(8, 2, 60, 55, 30), pal.body, { lw: 7, seed: 8 });
  if (P.flush) { ctx.save(); ctx.globalAlpha = K.clamp(P.flush) * 0.6; shape(ctx, ell(8, 2, 56, 51, 30), C.red, { lw: 0 }); ctx.restore(); }
  if (P.crown) { shape(ctx, [[-30, -46], [-36, -92], [-14, -70], [6, -100], [24, -70], [48, -92], [42, -46], [-30, -46]], C.yellow, { lw: 5, seed: 9 }); }
  const tk = Math.max(P.talk || 0, P.roar || 0), big = (P.roar || 0) > 0.3, m = P.mouth || 'closed';
  if (tk > 0) {
    shape(ctx, [[10, 34], [74, 30], [70 - tk * 4, 40 + tk * (big ? 58 : 30)], [20, 42 + tk * (big ? 46 : 22)], [10, 34]], C.black, { lw: 4, seed: 3 });
    ctx.fillStyle = C.red; ctx.beginPath(); ctx.ellipse(44, 42 + tk * (big ? 34 : 16), 17, 3 + tk * (big ? 12 : 6), 0, 0, 7); ctx.fill();
    if (big) { ctx.fillStyle = C.white; for (const tx of [16, 56]) { ctx.beginPath(); ctx.moveTo(tx, 38); ctx.lineTo(tx + 12, 38); ctx.lineTo(tx + 6, 58); ctx.fill(); } for (const tx of [28, 48]) { ctx.beginPath(); ctx.moveTo(tx, 40 + tk * 44); ctx.lineTo(tx + 10, 40 + tk * 44); ctx.lineTo(tx + 5, 26 + tk * 44); ctx.fill(); } }
  }
  shape(ctx, ell(42, 20, 37, 25, 22), CREAM, { lw: 5, seed: 9 });
  shape(ctx, [[60, 0], [88, 5], [74, 23], [60, 0]], C.black, { lw: 3, seed: 2 });
  ctx.fillStyle = C.black; for (const [wx, wy] of [[30, 20], [42, 28], [26, 31]]) { ctx.beginPath(); ctx.arc(wx, wy, 3, 0, 7); ctx.fill(); }
  eyeAt(ctx, -2, -12, P.eyes || 'open', 0.8); eyeAt(ctx, 34, -14, P.eyes || 'open', 0.8);
  if (P.brow) { const b = P.brow; browLine(ctx, -16, -34 - b * 7, 12, -30 + b * 7); browLine(ctx, 22, -30 + b * 7, 50, -38 - b * 7); }
  if (tk <= 0) { ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 5; ctx.beginPath(); if (m === 'smile') ctx.arc(44, 24, 20, 0.2 * Math.PI, 0.8 * Math.PI); else if (m === 'frown') ctx.arc(44, 56, 18, 1.2 * Math.PI, 1.8 * Math.PI); else { ctx.moveTo(26, 40); ctx.lineTo(64, 38); } ctx.stroke(); ctx.restore(); }
  ctx.restore(); ctx.restore();
}
// front view of the lion's face (the reflection, and the lion in the water). o: {pal,roar,eyes,brow,mouth,puff,mph,rot,wet}
function lionFace(ctx, x, y, s, o = {}) {
  const pal = LPAL[o.pal || 0], r = o.roar || 0; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); if (o.rot) ctx.rotate(o.rot);
  if (o.wet) { const d = []; for (let i = 0; i <= 26; i++) { const a = Math.PI * 0.08 + i / 26 * Math.PI * 0.84, rr = 96 + (i % 2 ? 34 : 0); d.push([Math.cos(a) * rr * 1.02, Math.sin(a) * rr]); } const top = K.circlePts(0, 0, 96, 96, 20, Math.PI * 0.92, Math.PI * 1.16).map((q) => q); shape(ctx, [...top, ...d, top[0]], pal.mane, { lw: 8, seed: 6, dot: pal.maneD, pitch: 10, rad: 0.2, da: 0.55 }); }
  else shape(ctx, manePts(0, 0, 104 * (o.puff || 1), 13, o.mph || 0), pal.mane, { lw: 8, seed: 6, dot: pal.maneD, pitch: 10, rad: 0.2, da: 0.55 });
  for (const ex of [-52, 52]) { shape(ctx, ell(ex, -50, 19, 19, 14), pal.body, { lw: 5, seed: 7 }); shape(ctx, ell(ex, -50, 8, 8, 10), pal.mane, { lw: 0 }); }
  shape(ctx, ell(0, 0, 62, 58, 30), pal.body, { lw: 7, seed: 8 });
  if (r > 0) { shape(ctx, ell(0, 36 + r * 14, 24 + r * 6, 6 + r * 26, 20), C.black, { lw: 4, seed: 3 }); ctx.fillStyle = C.red; ctx.beginPath(); ctx.ellipse(0, 44 + r * 24, 15, 4 + r * 9, 0, 0, 7); ctx.fill(); if (r > 0.4) { ctx.fillStyle = C.white; for (const tx of [-20, 10]) { ctx.beginPath(); ctx.moveTo(tx, 34); ctx.lineTo(tx + 10, 34); ctx.lineTo(tx + 5, 50); ctx.fill(); } } }
  for (const ex of [-17, 17]) shape(ctx, ell(ex, 22, 21, 16, 16), CREAM, { lw: 4.5, seed: 9 });
  shape(ctx, [[-13, 5], [13, 5], [0, 21], [-13, 5]], C.black, { lw: 3, seed: 2 });
  eyeAt(ctx, -24, -14, o.eyes || 'open', 0); eyeAt(ctx, 24, -14, o.eyes || 'open', 0);
  if (o.brow) { const b = o.brow; browLine(ctx, -40, -34 - b * 7, -10, -28 + b * 7); browLine(ctx, 10, -28 + b * 7, 40, -34 - b * 7); }
  if (r <= 0) { ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 5; ctx.beginPath(); if (o.mouth === 'frown') ctx.arc(0, 58, 16, 1.2 * Math.PI, 1.8 * Math.PI); else if (o.mouth === 'smile') ctx.arc(0, 28, 18, 0.2 * Math.PI, 0.8 * Math.PI); else { ctx.moveTo(-14, 44); ctx.lineTo(14, 44); } ctx.stroke(); ctx.restore(); }
  ctx.restore();
}
// little hare sitting upright, feet at (x, y). P: {x,y,s,dir,pal,ears(1 up..-1 droop),earWig,eyes,brow,mouth,talk,raise(-1..1),nod,drop,squash,shake,rot}
function hare(ctx, P) {
  const s = P.s || 1, dir = P.dir ?? 1, pal = HPAL[P.pal || 0], sq = P.squash || 0, e = P.ears ?? 1;
  ctx.save(); ctx.translate(P.x + (P.shake ? Math.sin(P.shake * 55) * 3 : 0), P.y); ctx.scale(dir * s * (1 + sq * 0.14), s * (1 - sq * 0.14)); if (P.rot) ctx.rotate(P.rot);
  shape(ctx, ell(-38, -36, 15, 15, 14), C.white, { lw: 4, seed: 2 });
  shape(ctx, ell(2, -9, 34, 12, 16), pal.body, { lw: 4.5, seed: 3 });
  shape(ctx, ell(0, -60, 40, 52, 26), pal.body, { lw: 6, seed: 5, dot: pal.dot, pitch: 8, rad: 0.2, da: 0.6 });
  shape(ctx, ell(14, -52, 20, 32, 18), C.white, { lw: 0 });
  shape(ctx, ell(-12, -30, 27, 25, 18), pal.body, { lw: 4.5, seed: 6 });
  ctx.save(); ctx.translate(16, -126 + (P.drop || 0)); ctx.rotate(P.nod || 0);
  for (const [ex, off] of [[-12, -0.3], [6, 0.08]]) { ctx.save(); ctx.translate(ex, -20); ctx.rotate(off - (1 - e) * 0.95 + (P.earWig || 0) * (ex > 0 ? 1 : 0.6)); shape(ctx, ell(0, -46, 13, 48, 20), pal.body, { lw: 5, seed: 7 }); shape(ctx, ell(0, -44, 6, 34, 14), C.skin, { lw: 0 }); ctx.restore(); }
  shape(ctx, ell(0, 0, 37, 32, 24), pal.body, { lw: 6, seed: 8, dot: pal.dot, pitch: 8, rad: 0.2, da: 0.6 });
  shape(ctx, ell(22, 10, 18, 14, 14), C.white, { lw: 0 });
  shape(ctx, ell(37, 3, 6, 5, 10), C.skin, { lw: 3, seed: 2 });
  eyeAt(ctx, 12, -8, P.eyes || 'open', 0.8);
  if (P.brow) browLine(ctx, 0, -24 - P.brow * 5, 26, -22 + P.brow * 7, 5);
  const tk = P.talk || 0, m = P.mouth || 'closed'; ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 4;
  if (tk > 0) shape(ctx, ell(25, 19, 7, 2 + 7 * tk, 12), C.black, { lw: 2.5, seed: 3 });
  else if (m === 'smile') { ctx.beginPath(); ctx.arc(22, 9, 13, 0.2 * Math.PI, 0.8 * Math.PI); ctx.stroke(); ctx.fillStyle = C.white; ctx.fillRect(19, 21, 8, 7); ctx.lineWidth = 2.5; ctx.strokeRect(19, 21, 8, 7); }
  else if (m === 'o') shape(ctx, ell(26, 19, 6, 8, 12), C.black, { lw: 2.5, seed: 3 });
  else if (m === 'frown') { ctx.beginPath(); ctx.arc(24, 30, 10, 1.2 * Math.PI, 1.8 * Math.PI); ctx.stroke(); }
  else { ctx.beginPath(); ctx.moveTo(18, 19); ctx.lineTo(32, 18); ctx.stroke(); }
  ctx.restore(); ctx.restore();
  const r = P.raise || 0, hx = 40 + 22 * Math.abs(r), hy = -50 - 64 * r; seg(ctx, 20, -78, hx, hy, 13, pal.body, 4); shape(ctx, ell(hx, hy, 9, 9, 10), C.white, { lw: 3.5, seed: 5 });
  ctx.restore();
}
// P: {x,y,s,dir,ph,amp,graze,nod,eyes,talk,mouth,shake}
function deer(ctx, P) {
  const s = P.s || 1, dir = P.dir ?? 1, ph = P.ph || 0, amp = P.amp ?? 0, g = P.graze || 0;
  ctx.save(); ctx.translate(P.x + (P.shake ? Math.sin(P.shake * 50) * 3 : 0), P.y); ctx.scale(dir * s, s);
  const leg = (x, sw, far) => { const a = Math.sin(ph + sw) * amp * 0.6, fx = x + Math.sin(a) * 40, lift = a > 0 ? a * 24 : 0; seg(ctx, x, -100, fx, -10 - lift, 13, far ? DEERD : DEERC, 4); shape(ctx, ell(fx + 3, -6 - lift, 11, 7, 10), C.black, { lw: 2, seed: 3 }); };
  leg(-52, 0, true); leg(44, Math.PI, true);
  shape(ctx, ell(-72, -138, 12, 14, 12), C.white, { lw: 4, seed: 2 });
  shape(ctx, ell(0, -125, 76, 40, 28), DEERC, { lw: 7, seed: 5, dot: C.white, pitch: 13, rad: 0.2, da: 0.9 });
  leg(-36, Math.PI, false); leg(58, 0, false);
  const hx = K.lerp(96, 126, g), hy = K.lerp(-222, -62, g);
  seg(ctx, 56, -140, hx - 8, hy + 14, 30, DEERC, 5);
  ctx.save(); ctx.translate(hx, hy); ctx.rotate(g * 0.9 + (P.nod || 0));
  for (const ax of [-10, 4]) { seg(ctx, ax, -16, ax - 8, -66, 7, CREAM, 3); seg(ctx, ax - 5, -44, ax + 14, -62, 6, CREAM, 3); seg(ctx, ax - 7, -58, ax - 24, -74, 6, CREAM, 3); }
  shape(ctx, ell(-22, -10, 16, 9, 12), DEERC, { lw: 4, seed: 6 });
  shape(ctx, ell(0, 0, 30, 24, 22), DEERC, { lw: 6, seed: 8 });
  shape(ctx, ell(26, 8, 20, 15, 16), CREAM, { lw: 5, seed: 9 }); shape(ctx, ell(42, 4, 7, 6, 10), C.black, { lw: 2, seed: 2 });
  eyeAt(ctx, 4, -6, P.eyes || 'open', 0.8);
  const tk = P.talk || 0; ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 4;
  if (tk > 0) shape(ctx, ell(28, 19, 9, 2 + 6 * tk, 12), C.black, { lw: 2.5, seed: 3 }); else if (P.mouth === 'smile') { ctx.beginPath(); ctx.arc(26, 8, 13, 0.25 * Math.PI, 0.8 * Math.PI); ctx.stroke(); }
  ctx.restore(); ctx.restore(); ctx.restore();
}
// P: {x,y,s,dir,ph,amp,hide(0 out..1 in shell),eyes,mouth}
function turtle(ctx, P) {
  const s = P.s || 1, dir = P.dir ?? 1, h = K.clamp(P.hide || 0), ph = P.ph || 0, amp = P.amp || 0;
  ctx.save(); ctx.translate(P.x + (P.shake ? Math.sin(P.shake * 50) * 2.5 : 0), P.y); ctx.scale(dir * s, s);
  for (const lx of [-34, 30]) shape(ctx, ell(lx + Math.sin(ph + lx) * amp * 9, -8, 17 * (1 - h * 0.85), 12, 12), GREEN2, { lw: 4, seed: 3 });
  const hx = K.lerp(66, 26, h);
  if (h < 0.92) { seg(ctx, 36, -26, hx, -36, 20, GREEN2, 4.5); shape(ctx, ell(hx + 8, -40, 22, 19, 16), GREEN2, { lw: 5, seed: 4 }); eyeAt(ctx, hx + 12, -44, P.eyes || 'open', 0.8); ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 3.5; ctx.beginPath(); if (P.mouth === 'smile') ctx.arc(hx + 16, -38, 10, 0.25 * Math.PI, 0.8 * Math.PI); else { ctx.moveTo(hx + 12, -29); ctx.lineTo(hx + 24, -30); } ctx.stroke(); ctx.restore(); }
  const sp = []; for (let i = 0; i <= 24; i++) { const a = Math.PI + i / 24 * Math.PI; sp.push([Math.cos(a) * 62, -16 + Math.sin(a) * 66]); } sp.push(sp[0]);
  shape(ctx, sp, GREEND, { lw: 7, seed: 5, dot: GREEN2, pitch: 12, rad: 0.3, da: 0.9 });
  shape(ctx, [[-66, -20], [66, -20], [66, -8], [-66, -8], [-66, -20]], '#d9a441', { lw: 4, seed: 6 });
  ctx.restore();
}
// P: {x,y,s,dir,flap,fly,col,eyes}
function bird(ctx, P) {
  const s = P.s || 1, dir = P.dir ?? 1, fl = Math.sin(P.flap || 0), col = P.col || C.red;
  ctx.save(); ctx.translate(P.x, P.y); ctx.scale(dir * s, s);
  if (!P.fly) { ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(-6, 18); ctx.lineTo(-6, 32); ctx.moveTo(6, 18); ctx.lineTo(6, 32); ctx.stroke(); ctx.restore(); }
  shape(ctx, [[-20, 2], [-46, -8], [-44, 12], [-20, 2]], col, { lw: 4, seed: 2 });
  shape(ctx, ell(0, 0, 26, 22, 18), col, { lw: 5, seed: 3, dot: C.yellow, pitch: 7, rad: 0.2, da: 0.6 });
  shape(ctx, [[22, -5], [44, 2], [22, 9], [22, -5]], C.yellow, { lw: 3.5, seed: 4 });
  eyeAt(ctx, 10, -6, P.eyes || 'open', 0.8);
  if (P.fly) shape(ctx, [[-10, -4], [-30, -6 - 36 * fl], [10, -2], [-10, -4]], col, { lw: 4, seed: 5 }); else shape(ctx, ell(-6, 4, 14, 9, 12), col, { lw: 3.5, seed: 5 });
  ctx.restore();
}
// the fox from The Fox and the Drum (this story's own copy)
function fox(ctx, P) {
  const s = P.s || 1, dir = P.dir ?? 1, ph = P.ph || 0, amp = P.amp ?? 0;
  ctx.save(); ctx.translate(P.x + (P.shake ? Math.sin(P.shake * 50) * 3 : 0), P.y); ctx.scale(dir * s, s);
  const tu = P.tailUp ?? 0.2, pf = P.puff || 1, tp = K.bezier([-78, -96], [-130, -96 - 40 * tu], [-150, -90 - 100 * tu], [-124 + Math.sin(ph * 0.5) * 8, -150 - 60 * tu], 14);
  const tw = (i) => (22 + 16 * Math.sin(Math.PI * i / tp.length)) * pf; for (let i = 1; i < tp.length; i++) seg(ctx, tp[i - 1][0], tp[i - 1][1], tp[i][0], tp[i][1], tw(i) + 10, C.black, 0); for (let i = 1; i < tp.length; i++) seg(ctx, tp[i - 1][0], tp[i - 1][1], tp[i][0], tp[i][1], tw(i), i > 11 ? C.white : FOXC, 0);
  const leg = (x, sw, far) => { const a = Math.sin(ph + sw) * amp * 0.6, fx = x + Math.sin(a) * 34, lift = a > 0 ? a * 24 : 0; seg(ctx, x, -70, fx, -12 - lift, 18, far ? FOXD : FOXC, 4.5); shape(ctx, ell(fx + 8, -8 - lift, 20, 9, 12), C.black, { lw: 3, seed: 3 }); };
  leg(-56, 0, true); leg(52, Math.PI, true);
  shape(ctx, ell(0, -92, 90, 44, 30), FOXC, { lw: 7, seed: 5, dot: FOXD, pitch: 9, rad: 0.16, da: 0.5 });
  shape(ctx, ell(18, -76, 62, 24, 22), CREAM, { lw: 0 });
  leg(-30, Math.PI, false); leg(66, 0, false);
  const hx = 92, hy = -128 + (P.drop || 0);
  seg(ctx, 66, -100, hx, hy + 10, 38, FOXC, 5);
  ctx.save(); ctx.translate(hx, hy); ctx.rotate(P.nod || 0);
  const ea = (P.ears || 0) * 0.9;
  for (const ex of [-16, 6]) { ctx.save(); ctx.translate(ex, -26); ctx.rotate(-0.1 - ea * 1.1 + (ex > 0 ? 0.35 : 0)); shape(ctx, [[-16, 6], [0, -50], [16, 6]], FOXC, { lw: 5, seed: 6 }); shape(ctx, [[-8, 0], [0, -30], [8, 0]], C.black, { lw: 0 }); ctx.restore(); }
  shape(ctx, [[-4, -22], [74, 6], [-4, 26]], FOXC, { lw: 6, seed: 7 });
  shape(ctx, ell(0, 0, 34, 30, 22), FOXC, { lw: 7, seed: 8, dot: FOXD, pitch: 8, rad: 0.15, da: 0.5 });
  shape(ctx, [[8, 8], [70, 8], [10, 30], [-8, 22]], CREAM, { lw: 0 });
  shape(ctx, ell(76, 4, 9, 8, 10), C.black, { lw: 3, seed: 9 });
  eyeAt(ctx, 18, -8, P.eyes || 'open', 0.8);
  ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 4.5; ctx.beginPath();
  if (P.mouth === 'smile') ctx.arc(34, 8, 16, 0.2 * Math.PI, 0.8 * Math.PI); else if (P.mouth === 'frown') ctx.arc(34, 30, 14, 1.15 * Math.PI, 1.85 * Math.PI); else { ctx.moveTo(14, 16); ctx.lineTo(60, 14); }
  ctx.stroke(); ctx.restore(); ctx.restore(); ctx.restore();
}
// ----- small effects -----
function drops(ctx, x, y, t, n = 3, col = '#5fa0ff') { for (let i = 0; i < n; i++) { const u = ((t * 1.3 + i / n) % 1), dx = (i - (n - 1) / 2) * 22, dy = u * 46; ctx.save(); ctx.globalAlpha = 1 - u; shape(ctx, [[x + dx, y + dy - 18], [x + dx + 9, y + dy], [x + dx, y + dy + 9], [x + dx - 9, y + dy], [x + dx, y + dy - 18]], col, { lw: 3, seed: 2 }); ctx.restore(); } }
function steam(ctx, x, y, t) { for (let i = 0; i < 4; i++) { const u = ((t * 0.9 + i / 4) % 1), px = x + (i - 1.5) * 34 + Math.sin(u * 7 + i) * 8, py = y - u * 80; ctx.save(); ctx.globalAlpha = Math.min(1, u * 4) * (1 - u); shape(ctx, ell(px, py, 13 + u * 10, 11 + u * 8, 12), C.white, { lw: 4, seed: 3 }); ctx.restore(); } }
function note(ctx, x, y, s = 1, col = C.black) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = col; ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(0, 0, 11, 8, -0.4, 0, 7); ctx.fill(); ctx.beginPath(); ctx.moveTo(9, -2); ctx.lineTo(9, -40); ctx.lineTo(26, -32); ctx.stroke(); ctx.restore(); }
function heart(ctx, x, y, r, a = 1) { ctx.save(); ctx.globalAlpha = a; const p = []; for (let i = 0; i <= 28; i++) { const u = i / 28 * Math.PI * 2; p.push([x + r * 0.062 * 16 * Math.pow(Math.sin(u), 3), y - r * 0.062 * (13 * Math.cos(u) - 5 * Math.cos(2 * u) - 2 * Math.cos(3 * u) - Math.cos(4 * u))]); } shape(ctx, p, C.red, { lw: 4, seed: 6 }); ctx.restore(); }
function peekEyes(ctx, x, y, look, blink) { ctx.save(); ctx.fillStyle = '#17401f'; ctx.beginPath(); ctx.ellipse(x, y, 38, 22, 0, 0, 7); ctx.fill(); ctx.restore(); for (const ex of [-14, 14]) eyeAt(ctx, x + ex, y, blink ? 'shut' : 'wide', look); }
