// ===== AN-151 letter world (S12) and the insides of the clouds and balloons (husband, camel, the told picture) =====
const IL_LF = { m: 26, roll: 34 };
const ilLFRect = (open, r0) => { const f = K.ease.inOut(K.clamp(open)); return [K.lerp(r0[0], 0, f), K.lerp(r0[1], 0, f), K.lerp(r0[2], 1000, f), K.lerp(r0[3], 1230, f)]; };
// letterFrame (panel space): paper edge and rollers around the open letter; clip = the picture area
function ilLetterFrame(ctx, open, r0) { const [x0, y0, x1, y1] = ilLFRect(open, r0), f = K.clamp(open), m = IL_LF.m * f + 4, rh = K.lerp(10, IL_LF.roll, f), ix = [x0 + m, y0 + m + rh * 0.6, x1 - x0 - 2 * m, y1 - y0 - 2 * m - rh * 1.2];
  ctx.save(); ctx.fillStyle = IL_PAPER; ctx.beginPath(); ctx.rect(x0, y0, x1 - x0, y1 - y0); ctx.rect(...ix); ctx.fill('evenodd'); ctx.fillStyle = dotPat(ctx, '#e2c68a', 10, 0.25); ctx.fill('evenodd'); ctx.restore();
  ink(ctx, K.rectPts(...ix).concat([[ix[0], ix[1]]]), 5, 690);
  for (const yy of [y0 + rh / 2, y1 - rh / 2]) { shape(ctx, K.rectPts(x0 - 6, yy - rh / 2, x1 - x0 + 12, rh), '#efdcae', { lw: 5, seed: 691, dot: IL_WOODL, pitch: 8, rad: 0.18, da: 0.35 });
    for (const ex of [x0 - 6, x1 + 6]) shape(ctx, ell(ex, yy, rh * 0.42, rh * 0.62, 12), IL_WOOD, { lw: 4, seed: 692 }); }
  if (f > 0.8) { ctx.save(); ctx.globalAlpha *= K.clamp((f - 0.8) * 5); const sx = x1 - 80, sy = y1 - rh - 60; shape(ctx, ell(sx, sy, 24, 24, 16), C.red, { lw: 4, seed: 693 }); shape(ctx, ell(sx, sy, 11, 11, 10), '#a8160f', { lw: 2, seed: 694 }); ctx.restore(); }
  return ix; }

// the husband (s, x, y) standing or riding; used in the clouds, the balloon, the letter world and the told picture
function ilHusband(ctx, t, x, y, s, o = {}) { const P = ilWho(IL_HUS, { x, y, s, dir: o.dir ?? 1, mouth: o.mouth || 'smile', gaze: o.gaze || [0.2, 0.1], lid: o.lid ?? blink(t, 61), noBlink: true, ...o.P }); person(ctx, P); return P; }
function ilCamelRide(ctx, t, xf, y, s, o = {}) { const M = { ...walk(xf, t, { stride: GAIT.camel * s }), y, s, dir: o.dir ?? 1, saddle: true, load: o.load || ['rug'], chew: 0.3 * Math.abs(Math.sin(t * 2)), lid: blink(t, 64), tailSwish: Math.sin(t * 2) };
  if (o.empty) { camel(ctx, M); return M; } rideOn(ctx, 'camel', M, { ...IL_HUS, s: s * 0.95, mouth: o.mouth || 'smile', lid: blink(t, 61), gaze: o.gaze || [1, 0], handR: o.handR, bob: 0 }); return M; }
function ilDunes(ctx, y0, col = '#f2d27a') { shape(ctx, [[-200, y0], [150, y0 - 80], [500, y0 - 20], [850, y0 - 100], [1200, y0], [1200, y0 + 400], [-200, y0 + 400]], col, { lw: 6, seed: 300, dot: '#d9a441', pitch: 12, rad: 0.18, da: 0.4 }); }
function ilHouseIcon(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, [[-45, 0], [-45, -60], [0, -95], [45, -60], [45, 0]], '#e8b25a', { lw: 5, seed: 301, dot: C.red, pitch: 9, rad: 0.15, da: 0.35 });
  shape(ctx, K.rectPts(-14, -40, 28, 40), IL_WOOD, { lw: 4, seed: 302 }); ctx.restore(); }

// ---------- inside: the parents' belief (S4): the man under the turban, a lectern and books to the ceiling, stars ----------
function ilCloudScholar(c, t) { c.fillStyle = '#9cc4ff'; c.fillRect(0, 300, 1000, 900); c.fillStyle = dotPat(c, C.white, 14, 0.25); c.fillRect(0, 300, 1000, 900);
  for (let k = 0; k < 14; k++) shape(c, K.rectPts(600 - 60 + (k % 2) * 10, 880 - k * 42, 150, 40), [C.red, C.blue, C.yellow, IL_GREEN][k % 4], { lw: 4, seed: 303 + (k % 4) });
  const P = ilWho(IL_IMP, { x: 400, y: 900, dir: 1, handR: PERSON_HANDS.chin.R, lid: 0.45, mouth: 'smile', gaze: [0.6, -0.4], noBlink: true }); person(c, P); const h = ilHead(P); ilTurban(c, h.x, h.y, { s: h.s, rot: h.rot, feather: 0.1 * Math.sin(t * 3) });
  for (let i = 0; i < 5; i++) { const a = t * 1.6 + i * 1.256; ilStar(c, h.x + Math.cos(a) * 150, h.y - 120 + Math.sin(a) * 40, 22, C.yellow); } }
// ---------- inside: the far husband on a walking camel (S6) ----------
function ilCloudFar(c, t) { c.fillStyle = '#ffe9a8'; c.fillRect(0, 300, 1000, 900); sun(c, 760, 470, t); ilDunes(c, 820); ilCamelRide(c, t, (u) => 300 + (u - 48) * 40, 900, 0.9); }
// ---------- inside: her fear (S8): the husband standing, then he greys and tips over ----------
// cropped to him (no horizon): waves (70.8), the wave freezes (71.6), tips over (71.80), lands flat and greys (72.48) with a dust puff
function ilCloudFear(c, t) { const g = ilE(t, 72.3, 0.25); c.fillStyle = mixHex('#ffe9a8', '#9aa6c4', g); c.fillRect(0, 300, 1000, 900); c.fillStyle = dotPat(c, mixHex(C.red, '#5a6a8a', g), 14, 0.2); c.fillRect(0, 300, 1000, 900);
  shape(c, ell(520, 902, 200, 16, 24), mixHex('#e8b25a', '#8c8a94', g), { lw: 4, seed: 305 });
  c.save(); if (g > 0) c.filter = `grayscale(${g}) brightness(${1 - 0.15 * g})`;
  const lie = ilE(t, 71.8, 0.6, 'in'), wv = t < 71.6 ? Math.sin((t - 70.8) * 12) : Math.sin((71.6 - 70.8) * 12);
  ilHusband(c, t, 500 + 40 * lie, 900 - 10 * lie, 1.1, { lid: lie > 0.3 ? 1 : blink(t, 61), mouth: lie > 0.3 ? 'closed' : t < 71.6 ? 'smile' : 'o', P: { lie, eyes: t >= 71.6 && lie < 0.3 ? 'wide' : null, handR: lie < 0.1 ? [64 + 12 * wv, -196] : null } });
  c.save(); c.globalAlpha *= 0.8; dustBurst(c, 640, 900, t - 72.42, 5, 8, 16, 70, 0.6, 5); c.restore(); c.restore(); }
// ---------- inside: the neighbour's news (S11): the husband waving, the tick, he mounts the camel toward a small house ----------
// cropped to him, large: waving and smiling, the tick at 99.66 ('well'), the camel walks in and he mounts it at 100.28 ('will return')
function ilBalloonNews(c, t) { c.fillStyle = '#fff3d6'; c.fillRect(-420, -320, 840, 640); c.fillStyle = dotPat(c, C.blue, 12, 0.16); c.fillRect(-420, -320, 840, 640);
  const G = 262; shape(c, ell(0, G + 4, 380, 22, 24), '#f2d27a', { lw: 4, seed: 306 });
  const cx = (u) => kfn(u, [[99.9, -620], [100.28, -150], [100.62, -150], [102.4, 60]], 'out');
  if (t >= 99.9) { if (t < 100.62) ilCamelRide(c, t, cx, G, 1.0, { empty: true }); else ilCamelRide(c, t, cx, G, 1.0); }
  if (t < 100.62) { const u = t < 100.28 ? 0 : ilE(t, 100.28, 0.34); ilHusband(c, t, K.lerp(-40, -150, u), G - 160 * Math.sin(Math.PI * u * 0.9), 1.6, { P: { handR: u > 0 ? [60, -200] : [64 + 12 * Math.sin(t * 10), -196], aL: u > 0 ? [-2.4, -2.8] : null } }); }
  ilTick(c, 250, -150, (t - 99.66) / 0.35, 2.0); }
// ---------- the told picture (S15): the husband lies down, the quilt rolls round him, the snuffer puts out a candle ----------
function ilToldPicture(c, t) { c.fillStyle = IL_PAPER; c.fillRect(0, 300, 1000, 900); shape(c, K.rectPts(-50, 900, 1100, 300), '#efdcae', { lw: 5, seed: 307 });
  const pop = 1, lie = ilE(t, 137.44, 0.4), hx = 560;   // the husband stands there from the moment the cloud opens
  c.save(); c.translate(hx, 900); c.scale(pop, pop); c.translate(-hx, -900);
  ilHusband(c, t, hx, 900, 1.1, { lid: lie > 0.4 ? 1 : blink(t, 61), mouth: lie > 0.4 ? 'closed' : 'smile', P: { lie } });
  const wr = ilE(t, 138.3, 0.8), rock = swing(t, 139.1, 0.05, 1.5, 2.2); if (wr > 0) ilQuiltWrap(c, hx + 170, 900, 1.45, wr * 0.85, rock);
  if (wr > 0) { const P = ilWho(IL_HUS, { x: hx, y: 900, s: 1.1, lie, lid: 1, mouth: 'closed', noBlink: true }); const h = ilHead(P); }
  c.restore();
  if (t >= 141.04) { const u = K.clamp((t - 141.04) / 0.45), x = K.lerp(1000, 400, u), y = 880 - 160 * Math.sin(Math.PI * u) * (u < 1 ? 1 : 0); ilSnuffer(c, x, y - 40 * (1 - landSquash(t, 141.49, 0.1)), 1.1, { dir: -1, dip: t >= 141.54 ? ilE(t, 141.6, 0.5) : 0 }); }
  if (t >= 141.54) { const k = K.ease.back(K.clamp((t - 141.54) / 0.25)); c.save(); c.translate(290, 900); c.scale(k, k); ilCandle(c, 0, 0, t, 1.2, { out: t >= 142.16 ? 1 : 0, smoke: t - 142.16 }); c.restore(); } }

// ---------- S12: inside the letter (panel space, 1000 x 1230) ----------
const IL_SUNS = (i) => 111.44 + 0.1 * i;
function ilLetterWorld(ctx, t) {
  const dx = -40 * K.clamp((t - 106.26) / 11.8);
  ctx.fillStyle = IL_PAPER; ctx.fillRect(0, 0, 1000, 1230);
  // the squiggle text lines part like curtains
  const part = ilE(t, 106.5, 0.8); for (let i = 0; i < 9; i++) { const yy = 380 + i * 50; for (const sd of [-1, 1]) { ctx.beginPath(); for (let k = 0; k <= 14; k++) { const x = 500 + sd * (20 + k * 28) + sd * part * 520; ctx.lineTo(x, yy + 6 * Math.sin(k * 1.4 + i)); } ctx.lineWidth = 7; ctx.strokeStyle = 'rgba(29,91,208,0.55)'; ctx.stroke(); } }
  ctx.save(); ctx.translate(dx, 0); ctx.translate(480, 760); ctx.scale(1.25, 1.25); ctx.translate(-480, -780);
  ctx.globalAlpha *= part; shape(ctx, [[-100, 860], [200, 830], [420, 860], [700, 820], [1100, 850], [1100, 1240], [-100, 1240]], '#f2d27a', { lw: 6, seed: 310, dot: '#d9a441', pitch: 12, rad: 0.18, da: 0.35 });
  seg(ctx, -100, 860, 1100, 860, 1, C.black, 0); ilHouseIcon(ctx, 930, 860, 1.0); ctx.globalAlpha = 1;
  // ten sun tokens (days) along the top
  for (let i = 0; i < 10; i++) { const k = K.ease.back(K.clamp((t - IL_SUNS(i)) / 0.25)); if (k <= 0) continue; const x = 180 + i * 71; ctx.save(); ctx.globalAlpha *= 1 - 0.6 * ilE(t, 113.2, 0.4); ctx.translate(x, 380); ctx.scale(k * 0.32, k * 0.32); sun(ctx, 0, 0, t); ctx.restore(); }
  // the camel and the husband
  // from 113.2 the camel and rider shrink to 60 percent and step back to the left on the horizon: the gifts get the centre of the page
  const mounted = t >= 110.8, cx = (u) => kfn(u, [[110.8, 560], [113.2, 610]], 'lin'), shr = ilE(t, 113.2, 0.6);
  if (shr > 0) { const px = cx(t), tx = K.lerp(px, 250, shr), sc = K.lerp(1, 0.6, shr); ctx.save(); ctx.translate(tx, 850); ctx.scale(sc, sc); ctx.translate(-px, -850); }
  if (!mounted) { const M = { x: 560, y: 850, s: 0.85, dir: 1, saddle: true, load: ['rug', 'sack'], chew: 0.3 * Math.abs(Math.sin(t * 2)), lid: blink(t, 64), tailSwish: Math.sin(t * 2) }; camel(ctx, M); }
  else { const tossH = t >= 114.3 && t < 114.7 ? [60, -230] : null; ilCamelRide(ctx, t, cx, 850, 0.85, { load: t < 114.4 ? ['rug', 'sack'] : ['sack'], gaze: t >= 114.3 && t < 115.4 ? [1, 0.3] : t >= 115.66 ? [1, -0.2] : [1, 0], handR: tossH }); }
  if (shr > 0) ctx.restore();
  if (t >= 106.9 && !mounted) { const u = ilE(t, 107.28, 0.5), r = 70 * (1 - u); // portrait medallion grows into the man
    if (r > 2) { ctx.save(); ctx.globalAlpha *= 1 - u; const px = K.lerp(500, 300, u), py = K.lerp(240, 620, u); ctx.beginPath(); ctx.arc(px, py, r, 0, 7); ctx.fillStyle = '#ffe9a8'; ctx.fill(); ctx.save(); ctx.clip(); ilHusband(ctx, t, px, py + 222 * r / 58, r / 58, { lid: 0 }); ctx.restore(); ctx.lineWidth = 5; ctx.strokeStyle = C.black; ctx.stroke(); ctx.restore(); }
    if (u > 0) { ctx.save(); ctx.globalAlpha *= u; const hop2 = t >= 110.42 ? hop(t, 110.42, 0.4, 300, 470, 120) : [300, 0];
      const P = { mouth: 'smile', gaze: [0, 0.05], lid: t < 107.9 ? Math.max(0, blink(t - 0.3, 61)) : blink(t, 61), P: { sq: t >= 109.6 ? settleTo(t, 109.6, 1, 1.04, 0.3) : 1 } };
      if (t >= 109.18 && t < 109.6) P.P.handR = [64 + 12 * Math.sin(t * 14), -196]; if (t >= 109.6 && t < 110.42) P.P.handR = [4 + 8 * pulse(t, 109.7, 0.15) + 8 * pulse(t, 109.95, 0.15), -120];
      if (t >= 110.42) { P.P.aL = [-2.4, -2.8]; P.P.aR = [2.4, 2.8]; P.gaze = [1, -0.2]; }
      ilHusband(ctx, t, hop2[0], 850 - hop2[1], 1.0, P); ctx.restore(); } }
  if (t >= 109.6) { ctx.save(); ctx.globalAlpha *= 1 - ilE(t, 113.2, 0.3); ilTick(ctx, 235, 560, (t - 109.6) / 0.35, 1.2); ctx.restore(); }
  ctx.restore();
  ilLetterGifts(ctx, t);
}
// the two gifts in the centre of the page (panel units): the quilt (114.84, unrolls left to right) and the candle snuffer (115.66, dips 116.56, smoke 117.38)
const IL_QUILT = { x0: 310, x1: 710, y0: 642, y1: 842 };
function ilLetterGifts(ctx, t) { const Q = IL_QUILT;
  if (t >= 114.4) { if (t < 114.84) { const u = ilE(t, 114.4, 0.44, 'in'), p = ilLp([170, 760], [Q.x0 + 40, Q.y1], u); ilQuilt(ctx, p[0], p[1] - 220 * Math.sin(Math.PI * u), 1.3, { unroll: 0 }); }
    else { const un = ilE(t, 114.98, 0.55, 'out'); if (un < 0.02) { const b = hop(t, 114.84, 0.14, 0, 0, 22)[1]; ctx.save(); ctx.translate(Q.x0 + 40, Q.y1 - b); ctx.scale(1, landSquash(t, 114.84, 0.2, 12)); ilQuilt(ctx, 0, 0, 1.3, { unroll: 0 }); ctx.restore(); }
      else { const xr = K.lerp(Q.x0 + 20, Q.x1, un); ctx.save(); ctx.beginPath(); ctx.rect(Q.x0 - 10, Q.y0 - 10, xr - Q.x0 + 10, Q.y1 - Q.y0 + 20); ctx.clip();
        ctx.fillStyle = 'rgba(20,20,20,0.85)'; ctx.fillRect(Q.x0 + 9, Q.y0 + 9, Q.x1 - Q.x0, Q.y1 - Q.y0); ilQuiltPatches(ctx, [[Q.x0, Q.y0], [Q.x1, Q.y0], [Q.x1, Q.y1], [Q.x0, Q.y1]], 6, 3); ctx.restore();
        if (un < 0.98) { const r = 14 + 26 * (1 - un); shape(ctx, ell(xr, (Q.y0 + Q.y1) / 2, r, (Q.y1 - Q.y0) / 2 + 6, 24), C.red, { lw: 5, seed: 210, dot: C.yellow, pitch: 7, rad: 0.2, da: 0.45 }); } } } }
  if (t >= 114.84) { ctx.save(); ctx.globalAlpha *= ilEnv(t, 114.84, 118.06, 0.2); S0.label(ctx, 'QUILT', (Q.x0 + Q.x1) / 2, Q.y1 + 76, ilE(t, 114.84, 0.35), { size: 56, align: 'center' }); ctx.restore(); }
  if (t >= 115.66) { const cxn = 850, base = 850, k = K.ease.back(K.clamp((t - 115.66) / 0.25)); ctx.save(); ctx.translate(cxn, base); ctx.scale(k, k); ilCandle(ctx, 0, 0, t, 1.8, { out: ilE(t, 116.7, 0.15), smoke: t - 117.38 }); ctx.restore();
    // the snuffer cone (bottom centre cb) with its handle rising up-left: rises in, hovers over the flame, dips on 116.56, lifts with the smoke
    const rise = ilE(t, 115.7, 0.5, 'out'), dip = ilE(t, 116.56, 0.22) * (1 - ilE(t, 117.3, 0.3)), cb = [K.lerp(cxn + 120, cxn, rise), K.lerp(1100, 636, rise) + 80 * dip + 4 * Math.sin(t * 5) * (1 - dip)];
    ilConeSnuffer(ctx, cb[0], cb[1]);
    ctx.save(); ctx.globalAlpha *= ilEnv(t, 116.0, 118.06, 0.2); S0.label(ctx, 'CANDLE SNUFFER', 590, 460, ilE(t, 116.0, 0.35), { size: 50, align: 'center' }); ctx.restore(); } }
// a candle snuffer seen from the side: brass cone (bottom centre x, y; 74 wide, 70 tall) and a long handle up to the left with a ring
function ilConeSnuffer(ctx, x, y) { const top = [x, y - 70], end = [x - 190, y - 230];
  seg(ctx, top[0] - 6, top[1] + 6, end[0], end[1], 10, IL_BRASS, 3); shape(ctx, ell(end[0] - 8, end[1] - 8, 16, 16, 14), IL_BRASS, { lw: 4, seed: 218 }); shape(ctx, ell(end[0] - 8, end[1] - 8, 7, 7, 10), IL_PAPER, { lw: 3, seed: 217 });
  shape(ctx, [[x - 12, y - 72], [x + 12, y - 72], [x + 38, y], [x - 38, y]], C.yellow, { lw: 5, seed: 219, dot: C.red, pitch: 7, rad: 0.2, da: 0.45 }); shape(ctx, ell(x, y - 74, 8, 8, 10), IL_BRASS, { lw: 3, seed: 216 }); ilStar(ctx, x - 14, y - 40, 8); }
// the woman's face in an inset circle (lower left), reacting to the letter
function ilWomanInset(ctx, t, x, y, r) { const k = K.ease.back(K.clamp((t - 107.0) / 0.4)) * (1 - ilE(t, 117.9, 0.2)); if (k <= 0.02) return; const rr = r * k, s = rr / 58;
  const P = ilWho(IL_WOM, { x, y: y + 222 * s, s, gaze: [0.3, -0.5], mouth: 'o', brow: -0.6, wet: t < 109.6, lid: Math.max(0.2, blink(t, 7)), noBlink: true });
  if (t >= 109.6) { P.lid = Math.max(0.25, blink(t, 7)); P.mouth = 'smile'; P.brow = -0.3; P.gaze = [0.4, 0.3]; }
  if (t >= 111.76 && t < 114.0) { P.talk = talk(t, [[111.8, 113.8]]); P.gaze = [0.2, 0.4]; }
  if (t >= 114.84) { P.gaze = [0.6, 0.6]; }
  if (t >= 117.38) { P.tilt = 0.2 * ilE(t, 117.38, 0.3); P.mouth = 'o'; P.lid = 0; P.gaze = [0.7, 0.7]; }
  shape(ctx, ell(x, y, rr + 10, rr + 10, 30), C.red, { lw: 5, seed: 312, dot: C.yellow, pitch: 7, rad: 0.18, da: 0.35 });
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, rr, 0, 7); ctx.clip(); ctx.fillStyle = '#9cc4ff'; ctx.fillRect(x - rr, y - rr, 2 * rr, 2 * rr); person(ctx, P);
  if (t >= 111.76 && t < 114.0) { const n = Math.min(5, 1 + Math.floor((t - 111.76) / 0.4)); for (let f = 0; f < n; f++) seg(ctx, x - 40 * s + f * 14 * s, y + 70 * s, x - 40 * s + f * 14 * s, y + 40 * s, 6 * s, C.white, 2); }
  ctx.restore(); ink(ctx, ell(x, y, rr, rr, 30), 4, 313);
  if (t >= 117.38) { const q = K.ease.back(K.clamp((t - 117.38) / 0.25)); ctx.save(); ctx.translate(x + rr + 30, y - rr * 0.4); ctx.scale(q, q); ctx.font = K.font(64, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineWidth = 10; ctx.strokeStyle = C.black; ctx.strokeText('?', 0, 0); ctx.fillStyle = C.white; ctx.fillText('?', 0, 0); ctx.restore(); } }
