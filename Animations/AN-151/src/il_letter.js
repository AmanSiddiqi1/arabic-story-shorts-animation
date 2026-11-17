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
function ilCloudFear(c, t) { const g = ilE(t, 71.8, 0.6); c.fillStyle = mixHex('#ffe9a8', '#9aa6c4', g); c.fillRect(0, 300, 1000, 900); c.fillStyle = dotPat(c, mixHex(C.red, '#5a6a8a', g), 14, 0.2); c.fillRect(0, 300, 1000, 900);
  shape(c, K.rectPts(0, 900, 1000, 300), mixHex('#f2d27a', '#8c8a94', g), { lw: 6, seed: 305 });
  c.save(); if (g > 0) c.filter = `grayscale(${g}) brightness(${1 - 0.15 * g})`;
  const lie = ilE(t, 71.8, 0.6); ilHusband(c, t, 500 + 30 * lie, 900 - 10 * lie, 1.1, { lid: lie > 0.3 ? 1 : blink(t, 61), mouth: lie > 0.3 ? 'closed' : 'smile', P: { lie, handR: lie < 0.1 ? PERSON_HANDS.wave.R : null } }); c.restore(); }
// ---------- inside: the neighbour's news (S11): the husband waving, the tick, he mounts the camel toward a small house ----------
function ilBalloonNews(c, t) { c.fillStyle = '#fff3d6'; c.fillRect(-400, -300, 800, 600); c.fillStyle = dotPat(c, C.blue, 12, 0.16); c.fillRect(-400, -300, 800, 600);
  shape(c, K.rectPts(-400, 110, 800, 200), '#f2d27a', { lw: 5, seed: 306 }); ilHouseIcon(c, 300, 112, 0.9);
  if (t < 100.28) ilHusband(c, t, -150, 112, 0.75, { P: { handR: [64 + 12 * Math.sin(t * 10), -196] } });
  else { const xf = (u) => K.lerp(-120, 120, K.clamp((u - 100.6) / 1.8)); if (t < 100.6) { const u = ilE(t, 100.28, 0.32); ilCamelRide(c, t, () => -120, 112, 0.5, { empty: true }); ilHusband(c, t, K.lerp(-150, -125, u), 112 - 90 * Math.sin(Math.PI * u * 0.9), 0.75); }
    else ilCamelRide(c, t, xf, 112, 0.5); }
  ilTick(c, 230, -150, (t - 99.66) / 0.35, 1.0); }
// ---------- the told picture (S15): the husband lies down, the quilt rolls round him, the snuffer puts out a candle ----------
function ilToldPicture(c, t) { c.fillStyle = IL_PAPER; c.fillRect(0, 300, 1000, 900); shape(c, K.rectPts(-50, 900, 1100, 300), '#efdcae', { lw: 5, seed: 307 });
  if (t < 136.96) return; const pop = K.ease.back(K.clamp((t - 136.96) / 0.3)), lie = ilE(t, 137.44, 0.4), hx = 520;
  c.save(); c.translate(hx, 900); c.scale(pop, pop); c.translate(-hx, -900);
  ilHusband(c, t, hx, 900, 1.1, { lid: lie > 0.4 ? 1 : blink(t, 61), mouth: lie > 0.4 ? 'closed' : 'smile', P: { lie } });
  const wr = ilE(t, 138.3, 0.8), rock = swing(t, 139.1, 0.05, 1.5, 2.2); if (wr > 0) ilQuiltWrap(c, hx + 150, 900, 1.05, wr * 0.85, rock);
  if (wr > 0) { const P = ilWho(IL_HUS, { x: hx, y: 900, s: 1.1, lie, lid: 1, mouth: 'closed', noBlink: true }); const h = ilHead(P); }
  c.restore();
  if (t >= 141.04) { const u = K.clamp((t - 141.04) / 0.45), x = K.lerp(1000, 300, u), y = 880 - 160 * Math.sin(Math.PI * u) * (u < 1 ? 1 : 0); ilSnuffer(c, x, y - 40 * (1 - landSquash(t, 141.49, 0.1)), 1.1, { dir: -1, dip: t >= 141.54 ? ilE(t, 141.6, 0.5) : 0 }); }
  if (t >= 141.54) { const k = K.ease.back(K.clamp((t - 141.54) / 0.25)); c.save(); c.translate(150, 900); c.scale(k, k); ilCandle(c, 0, 0, t, 1.2, { out: t >= 142.16 ? 1 : 0, smoke: t - 142.16 }); c.restore(); } }

// ---------- S12: inside the letter (panel space, 1000 x 1230) ----------
const IL_SUNS = (i) => 111.44 + 0.1 * i;
function ilLetterWorld(ctx, t) {
  const dx = -40 * K.clamp((t - 106.26) / 11.8);
  ctx.fillStyle = IL_PAPER; ctx.fillRect(0, 0, 1000, 1230);
  // the squiggle text lines part like curtains
  const part = ilE(t, 106.5, 0.8); for (let i = 0; i < 9; i++) { const yy = 380 + i * 50; for (const sd of [-1, 1]) { ctx.beginPath(); for (let k = 0; k <= 14; k++) { const x = 500 + sd * (20 + k * 28) + sd * part * 520; ctx.lineTo(x, yy + 6 * Math.sin(k * 1.4 + i)); } ctx.lineWidth = 7; ctx.strokeStyle = 'rgba(29,91,208,0.55)'; ctx.stroke(); } }
  ctx.save(); ctx.translate(dx, 0); ctx.translate(480, 860); ctx.scale(1.25, 1.25); ctx.translate(-480, -780);
  ctx.globalAlpha *= part; shape(ctx, [[-100, 860], [200, 830], [420, 860], [700, 820], [1100, 850], [1100, 1240], [-100, 1240]], '#f2d27a', { lw: 6, seed: 310, dot: '#d9a441', pitch: 12, rad: 0.18, da: 0.35 });
  seg(ctx, -100, 860, 1100, 860, 1, C.black, 0); ilHouseIcon(ctx, 930, 860, 1.0); ctx.globalAlpha = 1;
  // ten sun tokens (days) along the top
  for (let i = 0; i < 10; i++) { const k = K.ease.back(K.clamp((t - IL_SUNS(i)) / 0.25)); if (k <= 0) continue; const x = 180 + i * 71; ctx.save(); ctx.translate(x, 300); ctx.scale(k * 0.32, k * 0.32); sun(ctx, 0, 0, t); ctx.restore(); }
  // the camel and the husband
  const mounted = t >= 110.8, cx = (u) => kfn(u, [[110.8, 560], [118.08, 720]], 'lin');
  if (!mounted) { const M = { x: 560, y: 850, s: 0.85, dir: 1, saddle: true, load: ['rug', 'sack'], chew: 0.3 * Math.abs(Math.sin(t * 2)), lid: blink(t, 64), tailSwish: Math.sin(t * 2) }; camel(ctx, M); }
  else { const tossH = t >= 113.18 && t < 113.7 ? [-60, -230] : null; ilCamelRide(ctx, t, cx, 850, 0.85, { load: ['rug', 'sack'], gaze: t >= 113.18 && t < 114.9 ? [-0.8, 0.5] : [1, 0], handR: tossH }); }
  if (t >= 106.9 && !mounted) { const u = ilE(t, 107.28, 0.5), r = 70 * (1 - u); // portrait medallion grows into the man
    if (r > 2) { ctx.save(); ctx.globalAlpha *= 1 - u; const px = K.lerp(500, 300, u), py = K.lerp(240, 620, u); ctx.beginPath(); ctx.arc(px, py, r, 0, 7); ctx.fillStyle = '#ffe9a8'; ctx.fill(); ctx.save(); ctx.clip(); ilHusband(ctx, t, px, py + 222 * r / 58, r / 58, { lid: 0 }); ctx.restore(); ctx.lineWidth = 5; ctx.strokeStyle = C.black; ctx.stroke(); ctx.restore(); }
    if (u > 0) { ctx.save(); ctx.globalAlpha *= u; const hop2 = t >= 110.42 ? hop(t, 110.42, 0.4, 300, 470, 120) : [300, 0];
      const P = { mouth: 'smile', gaze: [0, 0.05], lid: t < 107.9 ? Math.max(0, blink(t - 0.3, 61)) : blink(t, 61), P: { sq: t >= 109.6 ? settleTo(t, 109.6, 1, 1.04, 0.3) : 1 } };
      if (t >= 109.18 && t < 109.6) P.P.handR = [64 + 12 * Math.sin(t * 14), -196]; if (t >= 109.6 && t < 110.42) P.P.handR = [4 + 8 * pulse(t, 109.7, 0.15) + 8 * pulse(t, 109.95, 0.15), -120];
      if (t >= 110.42) { P.P.aL = [-2.4, -2.8]; P.P.aR = [2.4, 2.8]; P.gaze = [1, -0.2]; }
      ilHusband(ctx, t, hop2[0], 850 - hop2[1], 1.0, P); ctx.restore(); } }
  if (t >= 109.6) ilTick(ctx, 235, 560, (t - 109.6) / 0.35, 1.2);
  // the quilt bundle (tossed 113.18, lands 114.84, unrolls) and the snuffer (115.66, dips 116.56) by the candle
  if (t >= 113.18) { const u = K.clamp((t - 113.18) / 1.66), from = [cx(113.18) - 40, 640], p = ilLp(from, [480, 930], u), y = p[1] - 260 * Math.sin(Math.PI * u) * (u < 1 ? 1 : 0);
    const un = t < 114.84 ? 0 : ilE(t, 114.84, 0.6, 'out'); ilQuilt(ctx, t < 114.84 ? p[0] : 480 + 150 * un * 0 , t < 114.84 ? y : 930, t < 114.84 ? 0.9 : 1.2 * landSquash(t, 114.84, 0.12, 10), { unroll: un }); }
  if (t >= 115.66) { const u = K.clamp((t - 115.66) / 0.5), p = ilLp([cx(115.66) - 40, 620], [700, 1000], u), y = p[1] - 200 * Math.sin(Math.PI * u) * (u < 1 ? 1 : 0); ilCandle(ctx, 880, 1010, t, 1.4, { out: t >= 116.95 ? 1 : 0, smoke: t - 116.95 });
    ilSnuffer(ctx, p[0], y, 1.4, { dip: t >= 116.56 ? ilE(t, 116.56, 0.4) * (1 - ilE(t, 117.3, 0.4)) : 0, rot: u < 1 ? (1 - u) * 3 : 0 }); }
  ctx.restore();
}
// the woman's face in an inset circle (lower left), reacting to the letter
function ilWomanInset(ctx, t, x, y, r) { const k = K.ease.back(K.clamp((t - 107.0) / 0.4)) * (1 - ilE(t, 117.9, 0.2)); if (k <= 0.02) return; const rr = r * k, s = rr / 58;
  const P = ilWho(IL_WOM, { x, y: y + 222 * s, s, gaze: [0.3, -0.5], mouth: 'o', brow: -0.6, wet: t < 109.6, lid: Math.max(0.2, blink(t, 7)), noBlink: true });
  if (t >= 109.6) { P.lid = Math.max(0, blink(t, 7)); P.mouth = 'o'; P.brow = -0.3; }
  if (t >= 111.76 && t < 114.0) { P.talk = talk(t, [[111.8, 113.8]]); P.gaze = [0.2, 0.4]; }
  if (t >= 116.56) { P.tilt = 0.12 * ilE(t, 116.56, 0.4); P.mouth = 'o'; P.brow = -0.5; }
  if (t >= 117.38) { P.tilt = 0.05; P.mouth = 'smile'; P.lid = 0.3; P.brow = K.lerp(-0.4, 0.5, ilE(t, 117.6, 0.4)); }
  shape(ctx, ell(x, y, rr + 10, rr + 10, 30), C.red, { lw: 5, seed: 312, dot: C.yellow, pitch: 7, rad: 0.18, da: 0.35 });
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, rr, 0, 7); ctx.clip(); ctx.fillStyle = '#9cc4ff'; ctx.fillRect(x - rr, y - rr, 2 * rr, 2 * rr); person(ctx, P);
  if (t >= 111.76 && t < 114.0) { const n = Math.min(5, 1 + Math.floor((t - 111.76) / 0.4)); for (let f = 0; f < n; f++) seg(ctx, x - 40 * s + f * 14 * s, y + 70 * s, x - 40 * s + f * 14 * s, y + 40 * s, 6 * s, C.white, 2); }
  ctx.restore(); ink(ctx, ell(x, y, rr, rr, 30), 4, 313); }
