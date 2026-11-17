// ===== lion (side view) and lionFace (front view). From The Lion and the Hare. =====
// lion P: {x,y,s,dir,ph,amp,pal(0 gold,1 orange/navy mane),crouch,puff,tailUp,tw,raise,reach,drop,nod,flush,crown,talk,roar,mouth,eyes,brow,shake,rot}
// lionFace(ctx,x,y,s,o) o: {pal,roar,eyes,brow,mouth,puff,mph,rot,wet}
const LPAL = [{ body: C.yellow, dark: '#d9a40c', mane: MANE, maneD: MANED, dot: C.red }, { body: '#ff8a2a', dark: '#c95f10', mane: NAVY2, maneD: C.black, dot: C.red }];
const manePts = (cx, cy, r, n = 13, ph = 0) => { const pts = []; for (let i = 0; i <= n * 8; i++) { const a = i / (n * 8) * Math.PI * 2, rr = r * (0.84 + 0.16 * Math.abs(Math.sin(a * n / 2 + ph))); pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]); } return pts; };
const browLine = (ctx, x0, y0, x1, y1, lw = 7) => { ctx.save(); ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.restore(); };
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
