// ===== HORSE-04: the close shots. The ornament (65.88 - 68.7), the knob and the lever (100.78 - 102.3), her eyes in the lattice (120.44 - 124.5) =====
// ---------- the ornament in his hand; the picture behind it: the flying horse dropping it, then the saddle cloth's gap ----------
function h4OrnInsert(ctx, t, S) {
  const tc = EH_T2(t), z = 1 + 0.03 * (t - 65.88); ehGrad(ctx, 0, 0, 1000, 1230, [[0, '#5aa0f0'], [0.6, '#b8dcff'], [1, '#f2dcae']]); ehGlow(ctx, 760, 220, 520, 0.6, '#fff2c0');
  ctx.save(); ctx.translate(500, 615); ctx.scale(z, z); ctx.translate(-500, -615);
  ctx.fillStyle = '#ecd29a'; ctx.fillRect(0, 980, 1000, 300);
  // the picture: a silhouette high above with a dotted fall (67.1 - 68.18); the saddle cloth (68.18 -)
  if (t >= 67.1 && t < 68.18) { const p = ehE(tc, 67.1, 0.25); ctx.save(); ctx.globalAlpha *= p; ctx.filter = 'brightness(0.25)'; ehHorseSil(ctx, 300, 300, 0.36, { riders: 2, rot: -0.1 }); ctx.restore();
    ctx.save(); ctx.globalAlpha *= p; ctx.setLineDash([16, 14]); ctx.strokeStyle = '#fff6ea'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(300, 240); ctx.quadraticCurveTo(360, 520, 520, 860 * K.clamp((t - 67.2) / 0.7) + 240 * (1 - K.clamp((t - 67.2) / 0.7))); ctx.stroke(); ctx.restore(); }
  const fit = t >= 68.18;
  if (fit) { const s = 3.6, Hc = { x: 560 - (-6) * s, y: 300 - (-170) * s, s, dir: 1, close: true }; ebonyHorse(ctx, Hc); ehRosettes(ctx, Hc, { missing: 3, t: tc });
    const gap = ehHorsePt(Hc, [K.lerp(-70, 48, 3 / 4), -160]); const u = ehE(tc, 68.25, 0.35); saddleOrnament(ctx, K.lerp(500, gap[0], u), K.lerp(860, gap[1], u), { s: K.lerp(5, s * 0.62, u), t: tc, swing: 0.1 * Math.sin(tc * 3) });
    if (u >= 1) ehGlint(ctx, gap[0], gap[1], 50, (t - 68.6) / 0.3); }
  else { // his hand lifts the rosette out of the sand; sand runs off; a turn to the light (66.42)
    const lift = ehE(tc, 65.88, 0.5), turn = ehE(tc, 66.42, 0.3), ox = 500, oy = K.lerp(980, 760, lift);
    saddleOrnament(ctx, ox, oy, { s: 5, rot: 0.6 - 0.6 * turn, t: tc, swing: 0.2 * Math.sin(tc * 3), lit: turn > 0.5 ? 0.6 : 0 });
    for (let i = 0; i < 9; i++) { const u = ((tc * 1.4 + i / 9) % 1); if (t < 66.6) { ctx.fillStyle = '#d8b878'; ctx.beginPath(); ctx.arc(ox - 40 + (i * 37) % 90, oy + 30 + u * 240, 5, 0, 7); ctx.fill(); } }
    handInsert(ctx, ox - 70, oy + 44, { s: 1.15, grip: 0.75, rot: -0.15, sleeve: '#eadcc0', cuff: EH_CRIMSON });
    if (t >= 66.42) ehGlint(ctx, ox + 20, oy - 30, 70, (t - 66.5) / 0.45); }
  ctx.restore();
}
// ---------- the knob, then the lever (the court blurred behind) ----------
function h4InsBgCourt() { return ehBakeAt('h4insc', 1000, 1230, (c) => { c.save(); c.filter = 'blur(9px)'; c.translate(500, 615); c.scale(1.6, 1.6); c.translate(-900, -560);
  c.drawImage(ehCourtSkyPlate('golden'), -400, -600, 2400, 1100); c.drawImage(ehCourtMainPlate('golden'), 0, 280, 1600, 1050); c.restore(); }, 0.5); }
function h4KnobInsert(ctx, t, S) {
  const tc = EH_T2(t), s = 4.2, up = ehE(tc, 101.3, 0.3), kx = 560, ky = K.lerp(700, 700 + (EH_EBG.lever[1] - EH_EBG.knob[1]) * s * 0.85, up) - up * 0, z = 1 + 0.03 * (t - 100.78);
  ctx.drawImage(h4InsBgCourt(), 0, 0, 1000, 1230); ehGlow(ctx, 820, 200, 400, 0.4, '#fff2c0');
  ctx.save(); ctx.translate(500, 615); ctx.scale(z, z); ctx.translate(-500, -615);
  const wig = t < 101.42 ? 0.08 * Math.sin((tc - 100.9) * 22) * (t > 100.9 ? 1 : 0) : 0, lit = t >= 101.0 && t < 101.42 ? { neck: 0.4 * pulse(tc, 101.0, 0.4) } : {};
  const tp = [K.lerp(EH_EBG.knob[0], EH_EBG.lever[0], up), K.lerp(EH_EBG.knob[1], EH_EBG.lever[1], up)], Hc = { x: 560 - tp[0] * s, y: 700 - tp[1] * s, s, dir: 1, close: true, knob: wig, lit, reveal: t >= 101.42 ? 1 : 0, lever: t >= 101.42 ? 0.25 * Math.sin((tc - 101.42) * 6) : 0 };
  ebonyHorse(ctx, Hc); ehRosettes(ctx, Hc, { missing: 3, t: tc });
  const tgt = t < 101.3 ? ehHorsePt(Hc, EH_EBG.knob) : ehHorsePt(Hc, [EH_EBG.lever[0] - 6, EH_EBG.lever[1] + 10]);
  handInsert(ctx, tgt[0] - 96, tgt[1] - 4, { s: 1.05, grip: t < 101.3 ? 0.55 : 0.2, point: t < 101.3 ? 0 : 0.7, rot: 0.08 - 0.3 * up, sleeve: '#c89a6a', cuff: '#f6efe0' });
  if (t >= 101.0 && t < 101.42) ehGlow(ctx, tgt[0], tgt[1], 160, 0.4 * pulse(tc, 101.0, 0.4), '#ffd36a');
  if (t >= 101.42) { ehGlow(ctx, tgt[0], tgt[1], 200, 0.5, '#ffd36a'); ehGlint(ctx, tgt[0] + 10, tgt[1] - 30, 50, ((t - 101.5) / 0.4) % 1); }
  ctx.restore();
}
// ---------- her eyes in two star openings; the memory card of her own roof ----------
function h4EyesClose(ctx, t, S) {   // review 1 note 2: dark cells, two whole anime eyes in the middle third, light from outside
  const tc = EH_T2(t), z = 1 + 0.05 * ehE(t, 120.44, 3.6), EY = 540, EX = [372, 628], PX = 256, PY = 240;
  ctx.save(); ctx.translate(500, EY); ctx.scale(z, z); ctx.translate(-500, -EY);
  // behind: dark warm interior, her face only a soft skin tone, the veil above the brows
  ehGrad(ctx, -100, -100, 1200, 1430, [[0, '#3a1a30'], [0.5, '#4a2430'], [1, '#2a1620']]);
  ctx.save(); ctx.globalAlpha = 0.55; shape(ctx, ell(500, 700, 470, 640, 40), '#b87868', { lw: 0 }); ctx.globalAlpha = 0.6; shape(ctx, [[-100, 300], [200, 330], [500, 320], [800, 330], [1100, 300], [1100, -100], [-100, -100]], '#8a6a90', { lw: 0 }); ctx.restore();
  const op = (c) => { for (const ex of EX) { c.moveTo(ex + 124, EY); c.ellipse(ex, EY, 124, 98, 0, 0, Math.PI * 2); } };
  // inside the two eye openings: lit skin, brows, whole eyes
  const lid = t < 121.82 ? 0.5 + 0.5 * ehLid(t, 11, [121.3]) : t < 121.9 ? 0.6 : t < 123.6 ? 0 : 0.18, wide = t >= 121.82 && t < 123.6, pupil = t >= 121.82 ? (t < 121.96 ? 0.55 : 0.72) : 1;
  const shine = ehE(tc, 122.54, 0.4), tear = t >= 123.6 ? ehE(tc, 123.6, 0.5) : 0, gaze = t < 121.82 ? [-0.25, 0.25] : [0, 0.05];
  ctx.save(); ctx.beginPath(); op(ctx); ctx.clip(); ctx.fillStyle = H4_SKIN; ctx.fillRect(0, EY - 130, 1000, 260); ctx.fillStyle = '#e8b090'; ctx.fillRect(0, EY + 70, 1000, 60);
    EX.forEach((ex, i) => { const sd = i ? 1 : -1, by = EY - 66 - (wide ? 12 : 0) + 4 * Math.sin(tc * 2); ctx.strokeStyle = '#2a1420'; ctx.lineCap = 'round'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(ex - sd * 70, by + 10); ctx.quadraticCurveTo(ex, by - 14, ex + sd * 80, by + 6); ctx.stroke();
      h4Eye(ctx, ex + sd * 6, EY + 8, 196 * (wide ? 1.04 : 1), { side: sd, lid, gaze, wide, pupil, shine, tear: sd < 0 ? tear : tear * 0.7 }); });
  ctx.restore();
  // the lattice runs off the panel on every side; the two eye cells are round openings
  ctx.beginPath(); ctx.rect(-200, -200, 1400, 1630);
  for (let j = -3; j <= 3; j++) for (let i = -3; i <= 3; i++) { const cx = EX[0] + i * PX, cy = EY + j * PY; if (j === 0 && (i === 0 || i === 1)) continue; const r = 92, pts = (i + j) % 2 === 0 ? ehStarPts(cx, cy, r) : ehCrossPts(cx, cy, r * 0.9); ctx.moveTo(pts[0][0], pts[0][1]); for (let q = 1; q < pts.length; q++) ctx.lineTo(pts[q][0], pts[q][1]); ctx.closePath(); }
  op(ctx); ctx.fillStyle = '#b8864a'; ctx.fill('evenodd'); ctx.strokeStyle = '#4a2a14'; ctx.lineWidth = 8; ctx.stroke();
  ctx.save(); ctx.globalAlpha = 0.4; ctx.strokeStyle = '#e8c088'; ctx.lineWidth = 5; for (let i = -1; i < 5; i++) { const x = EX[0] - PX / 2 + i * PX; ctx.beginPath(); ctx.moveTo(x, -100); ctx.lineTo(x, 1330); ctx.stroke(); } ctx.restore();
  ctx.restore();
  // a pale moonlight band crosses the screen (121.82 - 122.6)
  if (t >= 121.82 && t < 122.6) ehBand(ctx, [0, 0, 1000, 1230], (t - 121.82) / 0.78, { w: 200, alpha: 0.4, col: '#dfe8ff', angle: -0.35 });
  // the memory card: her roof at night, she and Firuz at the parapet, the moon path forming on the river
  const k = ehE(EH_T2(t), 121.82, 0.25) * (1 - ehE(EH_T2(t), 124.05, 0.25));
  memoryCard(ctx, 270, 1010, k, t, { s: 1.0, draw: (c, w, h) => {
    ehGrad(c, 0, 0, w, h, [[0, '#4a4aa8'], [0.6, '#8a6ab8'], [1, '#d890a8']]); ehMoon(c, w - 70, 60, 28, t, 1);
    c.fillStyle = '#2e4aa8'; c.fillRect(0, 150, w, 34); moonPath(c, [[w - 70, 152], [w * 0.3, 176]], t, ehE(t, 122.54, 0.8), { w: 2, w1: 6, scatter: 60 });
    c.fillStyle = '#e8c8b8'; c.fillRect(0, 196, w, h - 196); for (let x = 4; x < w; x += 26) c.fillRect(x, 186, 14, 12);
    const pr = { x: 150, y: 246, s: 0.36, dir: 1, mouth: t < 123.6 ? 'open' : 'smile', gaze: [1, 0.1], handL: [14, -96], handR: t < 123.6 ? PERSON_HANDS.mouthCover.R : PERSON_HANDS.chest.R, lid: 0.1, talk: t >= 122.54 && t < 123.5 ? ehTalk(t, 122.54, 123.5, 3, 0.5) : 0 };
    person(c, ehDressP(EH_PRINCESS, pr)); person(c, ehDressP(EH_FIRUZ, { x: 226, y: 248, s: 0.36, dir: -1, mouth: 'smile', gaze: [-1, 0.1], handL: [-20, -100], handR: [30, -100], lid: 0.1 })); } });
}
