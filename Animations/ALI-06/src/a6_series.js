// ===== ALI-06 series additions (the finale): small new drawings, each one function with a header comment; candidates for Library/
// (see library_proposals.md). lampShop + lampCounter + balanceScale (ALI-05's shopFront refitted in turquoise), feastSpread
// (rug, low table, lantern string), nameTag (paper tags + the not-equal glyph), gateKey and padlock, rewardBox, listScroll,
// returnGoods (carpet roll, coin pot, brass horse), a6MarketDuskPlate (marketDusk colour model), handOver (give and take with
// weight), a6Guest (abNewMerchant + the folded-back cuff at the wrist and the feather droop), a6Helmet (ALI-05's helmet points).
// Every drawing is a pure function of its arguments (and t). Prefix a6 / A6_ for story helpers; Library-style names for the drawings.

// ---------- the guest: abNewMerchant + folded cuff + feather droop ----------
// a6Guest(ctx, t, P, m, o): o as abNewMerchant plus droop 0..1 (the feather falls back and down), fold 0..1 (the folded-back right cuff
// shows as a cream roll at the wrist when cuffR < 0.5), foldL (same for the left cuff)
function a6Guest(ctx, t, P, m, o = {}) {
  const Q = abNewMerchant(ctx, t, P, m, { fine: 1, ...o, feather: (o.feather || 0) + 1.35 * K.clamp(o.droop || 0) }), d = Math.sign(Q.dir || 1), sc = Q.s * (Q.sq || 1);
  if (Q.mouth === 'grin' && !Q.talk) a6Grin(ctx, Q, A5_NM);   // revision 1 (ALI-05 continuity): the toothy switch-on grin
  for (const i of [0, 1]) { const cf = i ? o.cuffR ?? 1 : o.cuffL ?? 1; if (cf >= 0.5) continue; const [hx, hy] = a2Hand(Q, i, A5_NM), [ex, ey] = a2BodyPt(Q, (i ? 1 : -1) * 30, -150, A5_NM);
    const ux = ex - hx, uy = ey - hy, L = Math.hypot(ux, uy) || 1, wx = hx + ux / L * 18 * sc, wy = hy + uy / L * 18 * sc;
    celShade(ctx, ell(wx, wy, 13 * sc, 9 * sc, 12), '#f6e2c0', '#d8b88a', { light: [-d, -1], off: 4 * sc, lw: 2.5, line: '#8a6a3a' }); seg(ctx, wx - 9 * sc, wy, wx + 9 * sc, wy, 2, '#ffcf3a', 0); }
  return Q;
}
// a6Grin: ALI-05's a5Grin (revision 1) copied: the merchant's toothy grin drawn over the face (the Library person has no 'grin' mouth)
function a6Grin(ctx, Q, B, k = 1) { const pt = (x, y) => a2HeadPt(Q, x, y, B), w = 17 * k;
  const top = [], bot = []; for (let i = 0; i <= 8; i++) { const u = i / 8, x = K.lerp(-w, w, u); top.push(pt(x, 19)); bot.push(pt(x, 21 + 13 * k * Math.sin(Math.PI * u))); }
  ctx.save(); ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.beginPath(); [...top, ...bot.reverse()].forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath();
  ctx.fillStyle = '#fffaf0'; ctx.fill(); ctx.strokeStyle = '#2b1a3a'; ctx.lineWidth = 3.2; ctx.stroke();
  ctx.lineWidth = 2; ctx.beginPath(); const [a, b] = [pt(-w * 0.85, 25), pt(w * 0.85, 25)]; ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); for (const x of [-8, 0, 8]) { const [c, d] = [pt(x * k, 20), pt(x * k, 28 + 3 * k)]; ctx.moveTo(c[0], c[1]); ctx.lineTo(d[0], d[1]); } ctx.stroke();
  ctx.lineWidth = 2.6; for (const sd of [-1, 1]) { const [c, d] = [pt(sd * (w + 2), 14), pt(sd * (w + 6), 24)]; ctx.beginPath(); ctx.moveTo(c[0], c[1]); ctx.lineTo(d[0], d[1]); ctx.stroke(); }
  ctx.restore(); }
// a6Say2: a two-line speech balloon (review 1: long lines break at about 520 px). steps [[t, line1], [t2, line2]]; one rounded box, a thin
// tail to `to`, the same lettering as abSay (S.label with a clear box); clamped inside the panel
function a6Say2(ctx, S, steps, t, x, y, to, o = {}) { if (t < steps[0][0] || (o.gone && t > o.gone + 0.25)) return; const size = o.size || 42;
  const lines = steps.filter(([ts]) => t >= ts).map(([, tx]) => tx), ws = steps.map(([, tx]) => a2LabelW(S, tx, size)), w = Math.max(...ws) + size * 0.6, lh = size * 1.25, h = lh * steps.length + size * 0.7;
  const a = K.clamp((t - steps[0][0]) / 0.3) * (o.gone && t > o.gone ? 1 - K.clamp((t - o.gone) / 0.25) : 1), cx = K.clamp(x, A2_MARGIN + w / 2, 1000 - A2_MARGIN - w / 2), y0 = y - h / 2;
  ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = 'rgba(14,10,24,0.86)';
  if (to) { ctx.beginPath(); ctx.moveTo(cx - 17, y0 + h - 4); ctx.lineTo(to[0], to[1]); ctx.lineTo(cx + 17, y0 + h - 4); ctx.fill(); }
  ctx.beginPath(); ctx.roundRect(cx - w / 2, y0, w, h, Math.min(h / 2, 46)); ctx.fill(); ctx.strokeStyle = '#7fe3ff'; ctx.lineWidth = 2.5; ctx.stroke();
  lines.forEach((tx, i) => S.label(ctx, tx, cx, y0 + size * 0.35 + lh * (i + 0.5) + size * 0.3, 1, { size, fill: 'rgba(0,0,0,0)', rule: 'rgba(0,0,0,0)' }));
  ctx.restore(); }
// a6Helmet: a guard's brass helmet point seen over a wall (ALI-05 a5Helmet); o {face, plume, pl (plume swing), glint, tip (a spear tip beside it)}
function a6Helmet(ctx, x, y, s = 1, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (o.tip) { seg(ctx, 40, 30, 40, -70, 6, '#a8743e', 1.5); celShade(ctx, [[40, -66], [32, -76], [40, -102], [48, -76]], '#d8dce8', '#8a90b0', { off: 3, lw: 2, line: '#3a3e5a' }); }
  if (o.face) { abBlob(ctx, 0, 30, 26, 26, '#f0b890', '#d09070', { lw: 2.5 }); for (const sd of [-1, 1]) { ctx.fillStyle = '#2a1018'; ctx.beginPath(); ctx.ellipse(sd * 10, 30, 3.5, 5, 0, 0, 7); ctx.fill(); } }
  celShade(ctx, [[-34, 14], [-32, -6], [-12, -24], [0, -48], [12, -24], [32, -6], [34, 14]], '#e8c050', '#b08a20', { light: [-1, -1], off: 6, hi: '#fff0a0', lw: 2.5, line: '#6a4a10' }); seg(ctx, -36, 14, 36, 14, 7, '#c89a30', 1.5);
  if (o.plume) celShade(ctx, [[-2, -46], [4, -48], [24 + (o.pl || 0) * 10, -82], [34 + (o.pl || 0) * 14, -76], [14, -54]], '#e8364f', '#a81a2a', { off: 3, lw: 2, line: '#6a0a14' });
  ctx.restore(); if (o.glint) abGlint(ctx, x - 8 * s, y - 30 * s, 20 * s, o.glint); }

// ---------- gateKey and padlock ----------
// gateKey(ctx, x, y, s, o): an iron key 46 long hanging from (x, y) on a turquoise ribbon loop; o.swing radians, o.glint 0..1, o.ribbon (loop length, 26)
function gateKey(ctx, x, y, s = 1, o = {}) { ctx.save(); ctx.translate(x, y); ctx.rotate(o.swing || 0); ctx.scale(s, s); const rl = o.ribbon ?? 26;
  seg(ctx, -5, 0, -3, rl, 5, AB_MORG_ACC, 1); seg(ctx, 5, 0, 3, rl, 5, '#0e8a90', 1);
  ctx.strokeStyle = '#3a3a5a'; ctx.lineWidth = 9; ctx.beginPath(); ctx.arc(0, rl + 10, 9, 0, 7); ctx.stroke(); ctx.strokeStyle = '#9aa0c0'; ctx.lineWidth = 5; ctx.stroke();
  seg(ctx, 0, rl + 19, 0, rl + 56, 6, '#8a90b0', 1.5); seg(ctx, 0, rl + 46, 10, rl + 46, 5, '#8a90b0', 1); seg(ctx, 0, rl + 54, 12, rl + 54, 5, '#8a90b0', 1); ctx.restore();
  if (o.glint) { const a = o.swing || 0; abGlint(ctx, x - Math.sin(a) * (rl + 40) * s, y + Math.cos(a) * (rl + 40) * s, 18 * s, o.glint); } }
// padlock(ctx, x, y, s, o): an iron padlock 30 x 26 hanging from a staple at (x, y); o.swing, o.open 0..1 (shackle lifts), o.glint
function padlock(ctx, x, y, s = 1, o = {}) { ctx.save(); ctx.translate(x, y); ctx.rotate(o.swing || 0); ctx.scale(s, s); const op = K.clamp(o.open || 0);
  ctx.strokeStyle = '#3a3a5a'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(0, 8 - 10 * op, 11, Math.PI, 0); ctx.lineTo(11, 16 - 10 * op); ctx.moveTo(-11, 8 - 10 * op); ctx.lineTo(-11, 16); ctx.stroke(); ctx.strokeStyle = '#9aa0c0'; ctx.lineWidth = 4; ctx.stroke();
  celShade(ctx, K.rectPts(-17, 14, 34, 28), '#8a90b0', '#5a5e80', { light: [-1, -1], off: 5, hi: '#d8dce8', lw: 2.5, line: '#2a2a44' }); shape(ctx, ell(0, 26, 4, 4, 8), '#2a2a44', { lw: 0 }); seg(ctx, 0, 27, 0, 34, 3, '#2a2a44', 0);
  ctx.restore(); if (o.glint) abGlint(ctx, x + 8 * s, y + 20 * s, 18 * s, o.glint); }

// ---------- nameTag: a paper name tag on a string (panel units), and the red not-equal glyph ----------
// nameTag(ctx, text, x, y, p, o): string top at (x, y), tag hangs 40 below; p 0..1 pops it on; o.swing radians, o.size (font px, 40), o.blank (a ? only)
function nameTag(ctx, text, x, y, p, o = {}) { if (p <= 0) return; const k = K.ease.back(K.clamp(p)), sz = o.size || 54; ctx.save(); ctx.translate(x, y); ctx.rotate(o.swing || 0); ctx.scale(k, k);
  ctx.font = `italic 800 ${sz}px "Barlow Semi Condensed"`; const w = Math.max(120, ctx.measureText(o.blank ? 'MMMM' : text).width + 56), h = sz * 1.45, top = 40;
  ctx.strokeStyle = '#6a4a2a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-18, top + 6); ctx.lineTo(0, 0); ctx.lineTo(18, top + 6); ctx.stroke();
  celShade(ctx, [[-w / 2 + 18, top], [w / 2, top], [w / 2, top + h], [-w / 2 + 18, top + h], [-w / 2, top + h / 2]], '#fff4d8', '#e8d2a8', { light: [-1, -1], off: 6, lw: 3, line: '#6a4a2a' });
  shape(ctx, ell(-w / 2 + 20, top + h / 2, 6, 6, 10), '#c8a070', { lw: 2 });
  ctx.fillStyle = o.blank ? '#8a6aa8' : '#2b1a3a'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(o.blank ? '?' : text, 12, top + h / 2 + 2); ctx.restore(); }
function notEqual(ctx, x, y, p, s = 1) { if (p <= 0) return; const k = 1 + 0.3 * (1 - K.clamp(p)); ctx.save(); ctx.translate(x, y); ctx.scale(s * k, s * k); ctx.lineCap = 'round';
  for (const [w, c] of [[16, '#2b1a3a'], [9, '#ff3b2f']]) { ctx.strokeStyle = c; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(-30, -12); ctx.lineTo(30, -12); ctx.moveTo(-30, 12); ctx.lineTo(30, 12); ctx.moveTo(14, -34); ctx.lineTo(-14, 34); ctx.stroke(); } ctx.restore(); }

// ---------- rewardBox: a carved casket 90 x 60 (bottom centre x, y); lid 0..1; o.light 0..1 (warm light from inside), o.glint ----------
function rewardBox(ctx, x, y, s = 1, o = {}) { const lid = K.clamp(o.lid || 0); ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  if (lid > 0.05) { celShade(ctx, [[-44, -60], [44, -60], [40, -66], [-40, -66]], '#7a2a1a', '#5a1a0a', { lw: 2 }); abBlob(ctx, 0, -62, 26, 14, '#e8364f', '#a81a2a', { lw: 2.5 }); seg(ctx, -10, -74, 10, -74, 4, '#ffcf3a', 0);
    for (const cx of [-28, 28]) shape(ctx, ell(cx, -64, 7, 4, 8), '#ffcf3a', { lw: 1.5, line: '#8a5a12' }); }
  celShade(ctx, K.rectPts(-45, -60, 90, 60), '#b8562a', '#7a3418', { light: [-1, -1], off: 9, hi: '#e88a5a', lw: 3, line: '#4a1a0a' });
  for (const sx of [-45, 37]) seg(ctx, sx + 4, -58, sx + 4, -2, 6, '#ffcf3a', 1); seg(ctx, -40, -32, 40, -32, 3, '#e8a040', 0); shape(ctx, ell(0, -32, 7, 7, 10), '#ffcf3a', { lw: 2, line: '#8a5a12' });
  ctx.save(); ctx.translate(0, -60); ctx.scale(1, Math.cos(lid * 1.9)); celShade(ctx, [[-48, 0], [48, 0], [44, -20], [-44, -20]], '#c8643a', '#8a3a1e', { light: [-1, -1], off: 5, lw: 3, line: '#4a1a0a' }); seg(ctx, -40, -10, 40, -10, 4, '#ffcf3a', 0); ctx.restore();
  ctx.restore(); if ((o.light || 0) > 0) abGlow(ctx, x, y - 70 * s, 120 * s, 0.7 * o.light, '#ffcf7a'); if (o.glint) abGlint(ctx, x + 20 * s, y - 60 * s, 22 * s, o.glint); }

// ---------- listScroll: the captain's list (bottom of the open sheet at x, y), three pictogram rows (chest, bale, vase) with checks n 0..3 ----------
function listScroll(ctx, x, y, s = 1, o = {}) { ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s); const n = o.checks || 0;
  celShade(ctx, K.rectPts(-40, -130, 80, 120), '#fff1d0', '#e0c898', { light: [-1, -1], off: 6, lw: 2.5, line: '#7a5a2a' });
  for (const ry of [-134, -8]) celShade(ctx, K.rectPts(-46, ry - 6, 92, 14), '#e8c890', '#b8945a', { off: 3, lw: 2, line: '#6a4a24' });
  for (let i = 0; i < 3; i++) { const ry = -104 + i * 36; ctx.fillStyle = ['#b8562a', '#2f9a8e', '#7a4ac8'][i]; ctx.fillRect(-30, ry - 10, 22, 18); seg(ctx, -2, ry, 22, ry, 3, '#a89070', 0);
    const ck = K.clamp(n - i); if (ck > 0) { ctx.strokeStyle = '#1f9a4a'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(24, ry - 2); ctx.lineTo(24 + 6 * Math.min(1, ck * 2), ry + 6 * Math.min(1, ck * 2)); if (ck > 0.5) ctx.lineTo(30 + 12 * (ck - 0.5) * 2, ry + 6 - 18 * (ck - 0.5) * 2); ctx.stroke(); } }
  ctx.restore(); }
// a green check glyph (world or panel), p pops it
function checkGlyph(ctx, x, y, p, s = 1) { if (p <= 0) return; const k = K.ease.back(K.clamp(p)); ctx.save(); ctx.translate(x, y); ctx.scale(s * k, s * k); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  for (const [w, c] of [[18, '#2b1a3a'], [10, '#3ad06a']]) { ctx.strokeStyle = c; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(-20, 0); ctx.lineTo(-6, 16); ctx.lineTo(22, -20); ctx.stroke(); } ctx.restore(); }

// ---------- returnGoods: the three returned things ----------
// carpetRoll: a rolled carpet 120 long (centre x, y), rot; o.open 0..1 (a hand's width unrolled shows the pattern)
function carpetRoll(ctx, x, y, s = 1, o = {}) { ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s); const op = K.clamp(o.open || 0);
  if (op > 0) { celShade(ctx, K.rectPts(-50, 14, 100, 40 * op), '#e8364f', '#a81a2a', { off: 4, lw: 2.5 }); for (let i = 0; i < 4; i++) shape(ctx, [[-36 + i * 24, 14 + 20 * op], [-26 + i * 24, 14 + 8 * op], [-16 + i * 24, 14 + 20 * op], [-26 + i * 24, 14 + 32 * op]], '#ffd36a', { lw: 1.5 }); }
  celShade(ctx, K.rectPts(-60, -16, 120, 32), '#e8364f', '#a81a2a', { light: [-1, -1], off: 8, lw: 3, line: '#5a0a14' }); for (const sx of [-30, 0, 30]) seg(ctx, sx, -16, sx, 16, 4, '#ffd36a', 0);
  shape(ctx, ell(60, 0, 8, 16, 12), '#ffd36a', { lw: 2.5, line: '#5a0a14' }); ctx.restore(); }
// coinPot: a clay pot 50 x 56 (bottom centre); o.shake (a small x jitter), o.glint
function coinPot(ctx, x, y, s = 1, o = {}) { ctx.save(); ctx.translate(x + (o.shake || 0), y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  celShade(ctx, [[-16, -56], [16, -56], [26, -36], [24, -8], [14, 0], [-14, 0], [-24, -8], [-26, -36]], '#d87a3a', '#a04a1a', { light: [-1, -1], off: 7, lw: 2.5, line: '#5a2410' }); seg(ctx, -18, -54, 18, -54, 6, '#c8643a', 1);
  for (const cx of [-6, 6]) shape(ctx, ell(cx, -58, 6, 3, 8), '#ffcf3a', { lw: 1.5, line: '#8a5a12' }); ctx.restore(); if (o.glint) abGlint(ctx, x + 6 * s, y - 60 * s, 16 * s, o.glint); }
// brassHorse: a toy horse 60 x 46 on wheels (bottom centre), dir
function brassHorse(ctx, x, y, s = 1, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.dir || 1), s); ctx.rotate(o.rot || 0);
  celShade(ctx, [[-26, -14], [18, -14], [22, -30], [30, -44], [36, -38], [28, -22], [26, -10], [-24, -8], [-32, -20]], '#ffcf3a', '#c08a1a', { light: [-1, -1], off: 5, hi: '#fff3b0', lw: 2.5, line: '#6a4410' });
  for (const lx of [-18, 16]) seg(ctx, lx, -10, lx, -2, 4, '#c08a1a', 1); seg(ctx, -24, -2, 22, -2, 3, '#8a5a12', 0); for (const wx of [-18, 16]) shape(ctx, ell(wx, 2, 5, 5, 8), '#e8364f', { lw: 1.5 }); ctx.restore(); if (o.glint) abGlint(ctx, x, y - 30 * s, 16 * s, o.glint); }

// ---------- the gold coin (world), spin 0..1 (edge-on wobble then flat), flat when spin >= 1 ----------
function goldCoin(ctx, x, y, s = 1, o = {}) { const sp = o.spin ?? 1, w = sp >= 1 ? 1 : Math.abs(Math.cos(sp * 18)) * (0.3 + 0.7 * sp); ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (o.flat) { shape(ctx, ell(0, 0, 13, 5, 12), '#e8b040', { lw: 2, line: '#6a4410' }); ctx.restore(); return; }
  celShade(ctx, ell(0, -13, 13 * Math.max(0.12, w), 13, 14), '#ffcf3a', '#c08a1a', { light: [-1, -1], off: 4, hi: '#fff3b0', lw: 2, line: '#6a4410' }); ctx.restore(); if (o.glint) abGlint(ctx, x + 4 * s, y - 18 * s, 18 * s, o.glint); }

// ---------- lampShop: ALI-05's shopFront refitted for Morgiana (x 960..1260): turquoise and cream awning, name board, lamps lit ----------
// lampShop(ctx, t, o): o {awning 0..1 (turquoise unrolled; 0 = bare poles), old 0..1 (the false merchant's coral awning still up), board 0..1 (the
// name board drops on its cords), boardSwing radians, lit 0..8 (lamps on the shelf lit one by one, flames on twos), dusk 0/1 (warmer back wall), lamps 0..6
// (lamps set out on the shelf; default 6), signText}
function lampShop(ctx, t, o = {}) { const tc = AB_T2(t), aw = K.clamp(o.awning ?? 1), lit = o.lit || 0, nL = o.lamps ?? 6;
  celShade(ctx, K.rectPts(SF.x0 + 20, 600, SF.x1 - SF.x0 - 40, 300), o.dusk ? '#f8d0a0' : '#eaf6f0', o.dusk ? '#d8a070' : '#bcdcd4', { light: [-1, -1], off: 8, lw: 3, line: '#3a6a6a' });
  for (const sy of [660, 720]) seg(ctx, SF.x0 + 30, sy, SF.x1 - 30, sy, 8, '#2a8a86', 2);
  for (let i = 0; i < 6; i++) { if (i >= nL) continue; const lx = SF.x0 + 60 + i * 38, ly = i % 2 ? 712 : 652; brassLamp(ctx, lx, ly, 0.8, { glint: lit > 0 ? 0 : ((tc * 0.6 + i * 0.37) % 1) });
    const on = K.clamp(lit - i - 2); if (on > 0) a6Flame(ctx, lx + 28, ly - 18, on, tc, i); }
  for (const px of SF.pole) seg(ctx, px, 900, px, 440, 12, '#2a8a86', 3); seg(ctx, SF.pole[0] - 10, 446, SF.pole[1] + 10, 446, 10, '#2a8a86', 2);
  const ay = SF.top, old = K.clamp(o.old || 0);
  if (old > 0.02) { const ah = 80 * old; for (let i = 0; i < 8; i++) { const x = SF.x0 - 10 + i * 40; celShade(ctx, [[x, ay], [x + 40, ay], [x + 44, ay + ah], [x - 4, ay + ah]], i % 2 ? '#fff1d8' : '#f08a5a', i % 2 ? '#e8d0a8' : '#c8643a', { light: [-1, -1], off: 6, lw: 2.5, line: '#8a3a1a' }); } }
  else if (aw > 0.02) { const ah = 84 * aw; for (let i = 0; i < 8; i++) { const x = SF.x0 - 10 + i * 40; celShade(ctx, [[x, ay], [x + 40, ay], [x + 44, ay + ah], [x - 4, ay + ah]], i % 2 ? '#fffaf0' : '#14c2c8', i % 2 ? '#dfe8e4' : '#0e8a90', { light: [-1, -1], off: 6, lw: 2.5, line: '#0a4a50' });
    if (aw > 0.9) abBlob(ctx, x + 20, ay + ah + Math.sin(tc * 3 + i) * 1.5, 20, 12, i % 2 ? '#fffaf0' : '#14c2c8', i % 2 ? '#dfe8e4' : '#0e8a90', { lw: 2.5, line: '#0a4a50' }); } }
  // two side lamps hanging from the poles (lit 1 and 2)
  for (const [j, px] of [[0, SF.pole[0] + 22], [1, SF.pole[1] - 22]]) { seg(ctx, px, 446, px, 610, 2, '#3a2a1a', 0); celShade(ctx, [[px - 12, 610], [px + 12, 610], [px + 9, 646], [px - 9, 646]], '#ffcf3a', '#c08a1a', { off: 4, lw: 2, line: '#6a4410' });
    const on = K.clamp(lit - j); if (on > 0) { abGlow(ctx, px, 630, 70, 0.55 * on, '#ffcf7a'); shape(ctx, ell(px, 628, 6, 10, 10), '#fff6c8', { lw: 0 }); } }
  // the name board on two cords: drops from the beam and swings
  const bd = K.clamp(o.board ?? 1); if (bd > 0) { const by = 446 + 70 * K.ease.out(bd); ctx.save(); ctx.translate(SF.cx, 446); ctx.rotate(o.boardSwing || 0); ctx.translate(-SF.cx, -446);
    for (const sx of [-70, 70]) seg(ctx, SF.cx + sx, 446, SF.cx + sx, by - 40, 2, '#3a2a1a', 0);
    celShade(ctx, K.rectPts(SF.cx - 110, by - 44, 220, 52), '#0e8a90', '#0a5a60', { light: [-1, -1], off: 6, lw: 3, line: '#06363a' }); seg(ctx, SF.cx - 106, by - 40, SF.cx + 106, by - 40, 3, '#ffcf3a', 0);
    ctx.font = 'italic 800 38px "Barlow Semi Condensed"'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#fff6d8'; ctx.fillText(o.signText || "MORGIANA'S", SF.cx, by - 17); ctx.restore(); }
}
// a small oil flame (world), on 0..1, flickers on twos; i seeds the flicker
function a6Flame(ctx, x, y, on, tc, i = 0) { const f = 1 + 0.12 * Math.sin(tc * 13 + i * 2.1); abGlow(ctx, x, y, 46 * on, 0.5 * on, '#ffcf7a');
  ctx.save(); ctx.translate(x, y); ctx.scale(on * f, on * f); shape(ctx, [[0, -16], [7, -2], [0, 4], [-7, -2]], '#ffb43a', { lw: 1.5, line: '#c8601a' }); shape(ctx, [[0, -9], [3, -1], [0, 2], [-3, -1]], '#fff6c8', { lw: 0 }); ctx.restore(); }
// lampCounter: the front pass of the shop counter (turquoise front, brass edge, painted lamp roundels); draw after the shopkeeper
function lampCounter(ctx, t) { celShade(ctx, K.rectPts(SF.x0 + 14, SF.counter, SF.x1 - SF.x0 - 28, 900 - SF.counter), '#14a8ae', '#0a6a70', { light: [-1, -1], off: 10, lw: 3.5, line: '#06363a' });
  for (let x = SF.x0 + 40; x < SF.x1 - 30; x += 52) shape(ctx, ell(x, 836, 12, 22, 12), '#fff6d8', { lw: 2, line: '#0a4a50' }); seg(ctx, SF.x0 + 6, SF.counter, SF.x1 - 6, SF.counter, 12, '#e8b040', 2); }
// balanceScale(ctx, x, y, s, o): a brass hand scale standing on a counter at (x, y); o.tilt -1..1 (left pan down), o.left / o.right (draw(ctx, px, py) on a pan), o.glint
function balanceScale(ctx, x, y, s = 1, o = {}) { const a = 0.32 * (o.tilt || 0); ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  celShade(ctx, K.rectPts(-24, -10, 48, 10), '#e8b040', '#a8701a', { off: 3, lw: 2, line: '#6a4410' }); seg(ctx, 0, -10, 0, -110, 6, '#e8b040', 1.5);
  const bx = Math.cos(a) * 62, by = Math.sin(a) * 62; seg(ctx, -bx, -110 + by, bx, -110 - by, 5, '#ffcf3a', 1.5); shape(ctx, ell(0, -112, 6, 6, 8), '#ffcf3a', { lw: 2, line: '#6a4410' });
  for (const sd of [-1, 1]) { const px = sd * bx, py = -110 - sd * by; seg(ctx, px, py, px - 18, py + 50, 1.5, '#6a4410', 0); seg(ctx, px, py, px + 18, py + 50, 1.5, '#6a4410', 0);
    celShade(ctx, [[px - 24, py + 50], [px + 24, py + 50], [px + 14, py + 60], [px - 14, py + 60]], '#ffcf3a', '#c08a1a', { off: 3, lw: 2, line: '#6a4410' }); const f = sd < 0 ? o.left : o.right; if (f) f(ctx, px, py + 50); }
  ctx.restore(); if (o.glint) abGlint(ctx, x, y - 112 * s, 22 * s, o.glint); }

// ---------- feastSpread: the courtyard dressed for the thank-you feast ----------
const FS = { rug: [880, 1420], table: [1010, 1290], top: 845, string: [[600, 470], [1500, 470]] };
// feastRug (under the cast): a red and saffron rug in perspective on the paving, cushions o.cushions [[x, col]]
function feastRug(ctx, o = {}) { const [x0, x1] = FS.rug; celShade(ctx, [[x0 + 30, 878], [x1 - 30, 878], [x1, 940], [x0, 940]], '#c8303a', '#98202a', { off: 6, lw: 3, line: '#5a0a14' });
  seg(ctx, x0 + 40, 884, x1 - 40, 884, 4, '#ffd36a', 0); seg(ctx, x0 + 14, 932, x1 - 14, 932, 4, '#ffd36a', 0); for (let x = x0 + 70; x < x1 - 40; x += 70) shape(ctx, [[x, 896], [x + 14, 908], [x, 920], [x - 14, 908]], '#ffd36a', { lw: 1.5 });
  for (const [cx, col] of o.cushions || []) drCushion(ctx, cx, 905, col, 1); }
// feastTable (front pass): a low brass-topped table with dishes, teapot (steam), bread and fruit; o.coin {x, spin} lying on it
function feastTable(ctx, t, o = {}) { const [x0, x1] = FS.table, y = FS.top, tc = AB_T2(t);
  celShade(ctx, K.rectPts(x0, y, x1 - x0, 14), '#e8b040', '#a8701a', { light: [-1, -1], off: 4, hi: '#fff0a0', lw: 3, line: '#6a4410' });
  for (const lx of [x0 + 20, x1 - 30]) celShade(ctx, K.rectPts(lx, y + 14, 12, 40), '#8a5232', '#5a3018', { off: 3, lw: 2.5 });
  lentilBowl(ctx, x0 + 60, y, 1); lentilBowl(ctx, x0 + 200, y, 0.9);
  for (const [fx, fc] of [[x0 + 120, '#ff9a2a'], [x0 + 136, '#e8364f'], [x0 + 128, '#7ac04a']]) abBlob(ctx, fx, y - 10 - (fx === x0 + 128 ? 12 : 0), 10, 10, fc, abDark(fc, 0.3), { lw: 2 });
  celShade(ctx, ell(x0 + 165, y - 6, 22, 7, 12), '#e8c070', '#b8904a', { lw: 2 });   // bread
  celShade(ctx, [[x1 - 70, y], [x1 - 40, y], [x1 - 34, y - 26], [x1 - 46, y - 40], [x1 - 64, y - 40], [x1 - 76, y - 26]], '#3ab8b0', '#1a7a74', { light: [-1, -1], off: 5, lw: 2.5, line: '#0a4a48' }); seg(ctx, x1 - 36, y - 22, x1 - 18, y - 36, 4, '#3ab8b0', 1);
  a5Steam(ctx, x1 - 55, y - 44, t, 1, 2); teaCup(ctx, x1 - 100, y, 0.9, {}); teaCup(ctx, x0 + 240, y, 0.9, {});
  if (o.coin) goldCoin(ctx, o.coin.x, y, 1, o.coin); }
// feastLanterns: a string of six paper lanterns between two points (catenary), swaying on twos, lit 0..1
function feastLanterns(ctx, t, lit = 1) { const tc = AB_T2(t), [[ax, ay], [bx, by]] = FS.string, cols = ['#ff6a4a', '#ffd36a', '#14c2c8', '#ff8ab0', '#ffd36a', '#ff6a4a'];
  ctx.strokeStyle = '#5a3a3a'; ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i <= 20; i++) { const u = i / 20, x = K.lerp(ax, bx, u), y = K.lerp(ay, by, u) + 60 * Math.sin(Math.PI * u); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
  for (let i = 0; i < 6; i++) { const u = (i + 0.5) / 6, x = K.lerp(ax, bx, u), y = K.lerp(ay, by, u) + 60 * Math.sin(Math.PI * u), sw = 0.08 * Math.sin(tc * 1.6 + i * 1.3);
    ctx.save(); ctx.translate(x, y); ctx.rotate(sw); seg(ctx, 0, 0, 0, 14, 2, '#5a3a3a', 0); if (lit > 0) abGlow(ctx, 0, 40, 60, 0.45 * lit, cols[i]);
    celShade(ctx, ell(0, 40, 20, 26, 14), cols[i], abDark(cols[i], 0.25), { light: [-1, -1], off: 6, hi: '#fffaf0', lw: 2.5, line: abDark(cols[i], 0.55) }); seg(ctx, -10, 14, 10, 14, 4, '#3a2a2a', 0); seg(ctx, -8, 66, 8, 66, 4, '#3a2a2a', 0); ctx.restore(); } }

// ---------- marketDusk: the ALI-05 market plate repainted at golden hour (a colour model of the same layout, baked once) ----------
function a6MarketDuskPlate() {
  return abBakeAt('a6marketDusk', 2000, 1230, (c, w) => {
    abGrad(c, 0, 0, w, 1230, [[0, '#6a74c8'], [0.22, '#c88ac0'], [0.42, '#ffb07a'], [0.6, '#ffe0a0']]); abGlaze(c, 1700, 300, 640, '#fff0c0', 0.6);
    for (const [x, y, s] of [[300, 150, 1], [950, 110, 0.8], [1450, 200, 1.1]]) abCloud(c, x, y, 380 * s, 86 * s, '#ffc8b0', '#d890b0', 9);
    abSun(c, 1700, 330, 64, '#fff0b0', '#ffb07a', 0.9);
    marketStreet(c, { ...A5_MKT, t: 0, palette: 'dusk' });
    a3Arch(c, 'evening', 1750);
    abDress(c, 0, 1700, 940, 1215, 47, { stones: 12, tufts: 16, flowers: 10, stone: ['#e8b898', '#b08070'] });
    c.save(); c.globalCompositeOperation = 'soft-light'; c.globalAlpha = 0.35; c.fillStyle = '#ffb060'; c.fillRect(0, 300, w, 930); c.restore();
  });
}

// ---------- handOver: give and take with weight (motion helper) ----------
// handOver(tc, t0, d, from [x, y], to [x, y], o): the object travels from the giver's hand to the taker's on an arc over d seconds.
// Returns {x, y, k (0..1 travel), giver (0..1 arm extension), dip (the taker's weight dip in world units, peaks just after arrival), held 'giver' | 'taker'}
function handOver(tc, t0, d, from, to, o = {}) { const k = K.ease.inOut(K.clamp((tc - t0) / d)), arc = (o.arc ?? 18) * Math.sin(Math.PI * k);
  const dip = tc < t0 + d ? 0 : (o.weight ?? 8) * Math.exp(-(tc - t0 - d) * 6) * Math.cos((tc - t0 - d) * 12);
  return { x: K.lerp(from[0], to[0], k), y: K.lerp(from[1], to[1], k) - arc + Math.max(0, dip), k, giver: Math.sin(Math.PI * Math.min(1, k * 1.2)), dip, held: k < 0.5 ? 'giver' : 'taker' }; }
