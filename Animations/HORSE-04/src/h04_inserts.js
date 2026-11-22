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
function h4EyesClose(ctx, t, S) {
  const tc = EH_T2(t), z = 1 + 0.08 * ehE(t, 120.44, 3.2), s = 5.2, eyeY = 560, hx = 500, hy = eyeY + 4 * s;
  ctx.save(); ctx.translate(500, 560); ctx.scale(z, z); ctx.translate(-500, -560);
  const pitch = 13 * 2 * s, rh = 150, cols = 9, rows = 9, x0 = hx - pitch * 4.5 - pitch * 0.0, y0 = eyeY - rh * 3.5;
  // eye cells: columns 4 and 5 hold the eyes (centres at hx -/+ 13 s), row 3
  const P = { x: hx, y: hy + 195 * s, s, dir: 1, lid: ehLid(t, 11, [121.6]), eyes: 'wide', mouth: 'closed', gaze: t < 121.82 ? [0.05, 0.15] : [-0.25, 0.2], handL: [20, -110], handR: [30, -112] };
  if (t >= 123.6) { P.eyes = 'open'; P.lid = Math.max(P.lid, 0.2); P.mouth = 'smile'; P.wet = true; }
  latticeScreen(ctx, { x0: hx - pitch * 5, x1: hx + pitch * 4, y0, y1: y0 + rh * rows, cols, rows, hole: 0.5, stars: [[4, 3], [5, 3]], starBig: 1.2, glow: 1, lw: 7, frame: 0, col: '#c89a5a', t: tc, behind: (c) => { person(c, ehDressP(EH_PRINCESS, P));
    for (const sx of [-1, 1]) { ctx.save(); ctx.globalAlpha = 0.9; ehGlint(c, hx + sx * 13 * s - 14, eyeY - 18, 22, 0.5); ctx.restore(); } } });
  ctx.restore();
  // the memory card: her roof at night, she and Firuz at the parapet, the moon path forming on the river
  const k = ehE(EH_T2(t), 121.82, 0.25) * (1 - ehE(EH_T2(t), 124.05, 0.25));
  memoryCard(ctx, 290, 250, k, t, { s: 1.1, draw: (c, w, h) => {
    ehGrad(c, 0, 0, w, h, [[0, '#4a4aa8'], [0.6, '#8a6ab8'], [1, '#d890a8']]); ehMoon(c, w - 70, 60, 28, t, 1);
    c.fillStyle = '#2e4aa8'; c.fillRect(0, 150, w, 34); moonPath(c, [[w - 70, 152], [w * 0.3, 176]], t, ehE(t, 122.54, 0.8), { w: 2, w1: 6, scatter: 60 });
    c.fillStyle = '#e8c8b8'; c.fillRect(0, 196, w, h - 196); for (let x = 4; x < w; x += 26) c.fillRect(x, 186, 14, 12);
    const pr = { x: 150, y: 246, s: 0.36, dir: 1, mouth: t < 123.6 ? 'open' : 'smile', gaze: [1, 0.1], handL: [14, -96], handR: t < 123.6 ? PERSON_HANDS.mouthCover.R : PERSON_HANDS.chest.R, lid: 0.1, talk: t >= 122.54 && t < 123.5 ? ehTalk(t, 122.54, 123.5, 3, 0.5) : 0 };
    person(c, ehDressP(EH_PRINCESS, pr)); person(c, ehDressP(EH_FIRUZ, { x: 226, y: 248, s: 0.36, dir: -1, mouth: 'smile', gaze: [-1, 0.1], handL: [-20, -100], handR: [30, -100], lid: 0.1 })); } });
}
