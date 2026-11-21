// ===== ALI-04 shots S4-S5 (16.3 - 33.3 s): the light band (the leader), the ring insert, the jars in cutaway, WAIT FOR MY SIGNAL. =====
const A4_N = 'night';

// ---------- S4 16.3-24.8: the merchant alone; a band of moonlight shows the leader; his wall shadow wears a cape; the ring ----------
function a4OilM4(t) {
  const tc = AB_T2(t), P = { x: 1400, y: 918, dir: -1, lid: 0.3, tip: idleSway(tc, 101, 0.015, 3), sq: breathe(tc, 102, 0.012), gaze: [-1, 0], mouth: 'closed', brow: 0.8, handL: [-14, -96], handR: [12, -98] };
  if (tc < 16.76) P.gaze = [-1, 0.1];
  else if (tc < 17.32) { P.gaze = tc < 17.0 ? [-1, 0] : [1, 0]; P.lid = 0.35; }
  else if (tc < 18.62) { P.gaze = [-1, 0.05]; P.mouth = 'smile'; P.lid = 0.25; }
  else if (tc < 19.7) { if (tc < 19.0) { P.handL = [-10, -214]; P.handR = [12, -212]; P.tilt = 0.04; } else if (tc < 19.4) { P.handR = [40, -120]; P.handL = [-12, -110]; } else { P.handR = [30, -112 + 6 * Math.abs(Math.sin(tc * 16))]; } P.gaze = [0.3, 0.6]; P.sq *= 1 + 0.02 * pulse(tc, 19.45, 0.25); }
  else { P.handR = [70, -190]; P.gaze = [1, -0.6]; P.look = 0.4; P.lid = 0.2; }
  if (tc >= 24.5) { P.handR = [30, -150]; P.gaze = [-1, 0]; }
  return P;
}
const A4_BAND_X = (t) => kfn(t, [[17.32, 1150], [17.7, 1400], [18.62, 1400], [19.5, 1720]]);
function a4S4World(ctx, t, cam) {
  const tc = AB_T2(t);
  a4Yard(ctx, t, cam, { moon: A4_MOON.early, G: { open: 0, lit: 0 }, gwin: { sh: 0, lit: 0.5 } });
  a4Cat(ctx, t, { x: 1250, y: 548, dir: 1, sit: 1, crouch: tc > 16.9 && tc < 17.4 ? 1 : 0, ears: tc > 16.9 && tc < 17.4 ? -0.8 : undefined, gaze: [1, 0.5] });
  a4Jars(ctx, t, cam, { shc: A4_NSH });
  const P = a4OilM4(t);
  // the wall shadow (a cape that moves though the cloak hangs still)
  if (t > 17.9 && t < 18.8) { const a = 0.38 * a4Win(t, 17.94, 18.6, 0.15, 0.15); abCel(ctx, [1290, 860, 400, 380], (c) => { c.save(); c.translate(1290, 860); c.transform(1, 0, -0.25, 1, 0, 0); c.translate(-1290, -860); a2Lead(c, t, { ...P, x: 1290, y: 860, dir: -1 }, A4_N, { shadow: false, stream: 1 }); c.restore(); }, { tint: '#3a2a6a', k: 1, alpha: a }); }
  const band = t > 17.32 && t < 19.6 ? { x: A4_BAND_X(t), y: 760, w: 150, ang: 0.21, h: 900, k: 1 } : null;
  disguiseWipe(ctx, band, (c) => oilMerchant(c, t, P, A4_N, { shc: A4_NSH, glint: tc > 19.9 ? K.clamp((t - 19.9) / 0.4) : 0 }), (c) => a2Lead(c, t, { ...P, fin: A3_NRIM }, A4_N, { shadow: false, kick: 0.15 }), t);
  cyFig(ctx, t, A4_N);
}
function a4S4Over(ctx, t, cam, S) {
  if (t > 17.4 && t < 19.9) { const [hx, hy] = abP(1400, 660, cam); ctx.save(); ctx.globalAlpha *= 1 - K.clamp((t - 19.6) / 0.3); S.label(ctx, 'THE LEADER OF THE THIEVES!', 500, abP(0, 430, cam)[1], K.clamp((t - 17.4) / 0.3), { size: 44 }); ctx.restore();
    a4Streak(ctx, S, [560, abP(0, 470, cam)[1]], [hx + 10, hy - 40], t, 17.5, 19.4); }
}
// the ring insert (panel units): the big hand on a dark teal card; flex, glint round the band, the stone lit from behind, blue light, the crack
function a4Ring(ctx, x, y, r, o = {}) {
  ctx.save(); ctx.translate(x, y);
  ctx.strokeStyle = '#d8dce8'; ctx.lineWidth = r * 0.42; ctx.beginPath(); ctx.ellipse(0, r * 0.2, r, r * 0.42, 0, 0, 7); ctx.stroke();
  ctx.strokeStyle = '#8a90b0'; ctx.lineWidth = r * 0.12; ctx.beginPath(); ctx.ellipse(0, r * 0.28, r, r * 0.42, 0, 0.2, Math.PI - 0.2); ctx.stroke();
  if (o.band > 0 && o.band < 1) { const a = Math.PI * 2 * o.band; abGlint(ctx, Math.cos(a) * r, r * 0.2 + Math.sin(a) * r * 0.42, r * 0.9, Math.sin(Math.PI * o.band) * 0.99); }
  if (o.back > 0) abGlow(ctx, 0, -r * 0.45, r * 3.2 * o.back, 0.9 * o.back, '#5ab0ff');
  celShade(ctx, ell(0, -r * 0.45, r * 0.7, r * 0.52, 22), o.back > 0.3 ? '#5aa8ff' : '#3a8ae8', '#1a4aa0', { light: [-1, -1], off: r * 0.18, hi: '#bfe0ff', lw: Math.max(2, r * 0.07), line: '#0e2a6a' });
  const cr = K.clamp(o.crack ?? 1); if (cr > 0) { const pts = [[-r * 0.42, -r * 0.82], [-r * 0.18, -r * 0.6], [-r * 0.24, -r * 0.42], [r * 0.08, -r * 0.3], [r * 0.02, -r * 0.14], [r * 0.32, -r * 0.05]], n = 1 + Math.floor(cr * (pts.length - 1));
    ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = o.flash ? '#ffffff' : '#0e1a40'; ctx.lineWidth = Math.max(2, r * 0.09); if (o.flash) { ctx.shadowColor = '#ffffff'; ctx.shadowBlur = 20; } ctx.beginPath(); K.poly(ctx, pts.slice(0, n + 1)); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }
function a4RingInsert(ctx, t, S) {
  const tc = AB_T2(t); abGrad(ctx, 0, 0, 1000, 1230, [[0, '#2a6a7a'], [0.6, '#1f4f66'], [1, '#2a4a6a']]); abGlow(ctx, 820, 220, 520, 0.45, '#ffb860');
  const R = K.rng(7); ctx.save(); ctx.globalAlpha = 0.25; for (let i = 0; i < 18; i++) { ctx.fillStyle = '#7ab8d0'; ctx.beginPath(); ctx.arc(R() * 1000, R() * 1230, 3 + R() * 6, 0, 7); ctx.fill(); } ctx.restore();
  const flex = pulse(tc, 20.95, 0.5), close = beatIn(tc, 24.42, 24.6), k = 3.0 + 0.06 * Math.sin(t * 0.8), hx = 480 + 10 * Math.sin(t * 0.9), hy = 880, rot = Math.PI - 0.08;
  a3BigHand(ctx, hx, hy, k, { sleeve: '#ecc062', sleeveD: '#d8a43a', curl: 0.25 + 0.45 * flex + 0.6 * close, skin: '#e8b08a', rot });
  const lx = -14 + 0.25 * 8, ly = 60 + 88 * (1 - 0.62 * (0.25 + 0.45 * flex)) * 0.35, c = Math.cos(rot), s = Math.sin(rot), rx = hx + (lx * c - ly * s) * k, ry = hy + (lx * s + ly * c) * k;
  const back = beatIn(t, 22.3, 22.8), blue = beatIn(t, 23.16, 23.4);
  if (blue > 0) { ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = 0.55 * blue; ctx.fillStyle = '#5ab0ff'; ctx.beginPath(); ctx.moveTo(rx - 30, ry - 10); ctx.lineTo(rx + 30, ry - 10); ctx.lineTo(rx + 190, ry + 330); ctx.lineTo(rx - 150, ry + 360); ctx.closePath(); ctx.fill(); ctx.restore(); }
  a4Ring(ctx, rx, ry, 52, { band: beatIn(t, 21.54, 22.2), back, crack: tc < 23.98 ? 0.0001 : beatIn(tc, 23.98, 24.2), flash: tc > 24.22 && tc < 24.3 });
  if (tc > 24.0) a4Streak(ctx, S, [820, 260], [rx + 20, ry - 40], t, 24.0, 24.45);
}
AB_SHOTS.push({ a: 16.3, b: 20.6, ww: 2200, cam: a3Cam([[16.3, { x: 1420, y: 690, zoom: 1.25 }], [19.8, { x: 1415, y: 690, zoom: 1.25 }], [20.6, { x: 1440, y: 620, zoom: 1.8 }]]), world: a4S4World, over: a4S4Over });
AB_SHOTS.push({ a: 20.6, b: 24.5, panel: a4RingInsert });
AB_SHOTS.push({ a: 24.5, b: 24.8, ww: 2200, cam: () => ({ x: 1420, y: 690, zoom: 1.25 }), world: a4S4World });

// ---------- S5 24.8-33.3: he raps the lids; the cutaway (five men, one jar of oil); WAIT FOR MY SIGNAL.; the guest room door ----------
const A4_S5_X = (u) => kfn(u, [[24.84, 820], [26.3, 1230], [27.9, 1230], [28.1, 1190], [29.02, 1190], [29.9, 1395], [31.9, 1395], [32.3, 1930]]);
function a4OilM5(t) {
  const tc = AB_T2(t), W = walk(A4_S5_X, tc, { stride: 28 }), P = { y: 918, dir: tc > 31.85 ? 1 : 1, ...W, lid: 0.3, tip: idleSway(tc, 111, 0.015, 3), sq: breathe(tc, 112, 0.012), gaze: [1, 0], mouth: 'smile', brow: 0.6, handL: [-34 + 14 * Math.sin(W.ph), -100], handR: [34 - 14 * Math.sin(W.ph), -102] };
  if (tc < 26.4) { const k = Math.floor((tc - 25.04) / 0.26); if (k >= 0 && k < 5) { const ph = (tc - 25.04 - 0.26 * k) / 0.26, J = CY_JARS[k]; P.handRW = [J.x - 8, 628 - 10 * Math.abs(Math.sin(ph * Math.PI * 2))]; P.gaze = lookAt([P.x, 720], [J.x, 640]); } }
  else if (tc < 27.9) { P.gaze = gazePlan(tc, [[26.4, [1, -0.2]], [26.9, [-1, -0.2]], [27.4, [1, 0]]]); P.mouth = 'grin'; P.handL = [-40, -96]; P.handR = [40, -98]; }
  else if (tc < 29.02) { const cr = beatIn(tc, 27.9, 28.1); P.sq *= 1 - 0.12 * cr; P.drop = 10 * cr; P.handR = PERSON_HANDS.hush.R; P.gaze = [-1, -0.3]; P.talk = abTalk(t, 27.95, 28.95, 8, 0.35); if (P.talk) P.mouth = 'open'; P.lid = 0.35;
    if (tc > 28.45) { P.handR = null; P.handRW = [CY_JARS[2].x + 6, 634]; P.gaze = [1, -0.3]; } }
  else if (tc < 29.98) { P.handR = tc > 29.5 ? [60, -190] : P.handR; P.mouth = 'smile'; }
  else if (tc < 31.4) { P.handRW = tc < 30.4 ? [1470, 628] : [1462, 600]; P.gaze = [1, 0.4]; P.lid = 0.2; }
  else if (tc < 31.9) { P.handR = [-20, -110 + 10 * Math.sin(tc * 20)]; P.mouth = 'smile'; P.lid = 0.4; P.gaze = [-1, 0]; }
  else { P.gaze = tc > 32.1 && tc < 32.3 ? [-1, 0] : [1, 0]; P.look = tc > 32.1 && tc < 32.3 ? -0.8 : 0; }
  return { P, W };
}
function a4S5World(ctx, t, cam) {
  const tc = AB_T2(t), late = t >= 32.9, gO = kfn(tc, [[31.9, 0], [32.05, 0.9], [32.3, 0.9], [32.5, 0]]);
  const { P, W } = a4OilM5(t), inDoor = tc >= 32.2 && tc < 32.5;
  a4Yard(ctx, t, cam, { moon: late ? A4_MOON.late : A4_MOON.early, G: { open: gO, lit: 1, inside: inDoor ? (c) => oilMerchant(c, t, P, A4_N, { shadow: false }) : null }, gwin: { sh: 0, lit: late ? 0 : 0.5 }, kwin: { lit: late ? 0.5 : 1 }, lan: [1, 1, late ? 0.25 : 1 - 0.6 * beatIn(tc, 32.3, 32.5)] });
  a4Cat(ctx, t, { x: 1620, y: 548, dir: -1, sit: 1, gaze: [-1, 0.6], tailCurl: tc > 32.3 && tc < 32.6 ? 1 : undefined, tailUp: tc > 32.3 && tc < 32.6 ? 1 : 0 });
  a4Jars(ctx, t, cam, { shc: A4_NSH });
  if (!inDoor && tc < 32.2) oilMerchant(ctx, t, P, A4_N, { shc: A4_NSH, kick: 0.3 * W.amp + (tc > 31.9 ? 0.4 : 0) });
  if (tc > 30.25 && tc < 30.8) { const u = beatIn(tc, 30.25, 30.6), y = 604 + 40 * u * u; if (u < 1) celShade(ctx, [[1462, y - 10 - 6 * u], [1468, y], [1462, y + 6], [1456, y]], '#ffd36a', '#d89a1a', { off: 2, lw: 1.5 }); else tsRing(ctx, 1465, 648, (tc - 30.6) / 0.25, '#ffd36a', { r0: 6, grow: 18, w: 3 }); }
  cyFig(ctx, t, A4_N);
}
function a4S5Over(ctx, t, cam, S) {
  const n = [0, 1, 2, 3, 4].filter((i) => t >= 27.7 + 0.12 * i).length;
  if (t > 27.7 && t < 32.0) { ctx.save(); ctx.globalAlpha *= 1 - K.clamp((t - 31.7) / 0.3); const [x, y] = abP(1120, 390, cam); S.counter(ctx, n, x - 90, y, K.clamp((t - 27.7) / 0.3), { size: 84 }); S.label(ctx, 'MEN', x + 40, y - 20, K.clamp((t - 27.7) / 0.3), { size: 44 });
    if (t > 30.78) { const [ox, oy] = abP(1465, 390, cam); S.label(ctx, 'OIL 1', Math.min(ox, 880), oy - 20, K.clamp((t - 30.78) / 0.3), { size: 44 }); a4Streak(ctx, S, [Math.min(ox, 880), oy + 20], abP(1465, 620, cam), t, 30.8, 31.6); } ctx.restore(); }
  if (t > 27.9 && t < 29.4) { const [hx, hy] = abP(1190, 700, cam); a4Say(ctx, S, [[27.95, 'WAIT FOR MY SIGNAL.']], t, hx + 60, hy - 210, [hx, hy - 40], { size: 44, gone: 29.0 }); }
}
AB_SHOTS.push({ a: 24.8, b: 33.3, ww: 2200, cam: a3Cam([[24.8, { x: 1000, y: 615, zoom: 1 }], [26.4, { x: 1250, y: 615, zoom: 1 }], [29.0, { x: 1250, y: 615, zoom: 1 }], [30.0, { x: 1380, y: 660, zoom: 1.15 }], [31.6, { x: 1385, y: 660, zoom: 1.15 }], [32.4, { x: 1700, y: 615, zoom: 1 }], [33.3, { x: 1700, y: 615, zoom: 1 }]]), world: a4S5World, over: a4S5Over });
