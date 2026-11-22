// ===== HORSE-04: S1 the flight on (0 - 7.96): two riders over the mountains, down toward a palace neither knows =====
function h4S1Horse(t) { const tc = EH_T2(t), dn = ehE(t, 3.68, 0.9), sink = ehE(t, 7.0, 0.96, 'in');
  const cx = K.lerp(470, 560, t / 8), cy = 400 + idleSway(tc, 5, 6, 2.2) + 40 * dn + 900 * sink;
  return ehRigP(cx, cy, 0.8, 1, -0.21 * dn + idleSway(tc, 6, 0.012, 3.0)); }
function h4S1Range(ctx, y, k, x0, col, sh, snow, seed) {   // a band of snow peaks along y (panel), scale k, scrolled by x0
  const R = K.rng(seed), w = 2000; ctx.save(); for (let i = 0; i < 14; i++) { const bx = ((i * 160 * k + x0) % (w * k / 1) + w * k) % (w * k) - 200, hh = (120 + R() * 140) * k, ww = (150 + R() * 90) * k;
    celShade(ctx, [[bx - ww, y + 30 * k], [bx, y - hh], [bx + ww, y + 30 * k]], col, sh, { light: [-1, -1], off: ww * 0.3, lw: 2.5, line: ehDark(sh, 0.3) });
    shape(ctx, [[bx - ww * 0.32, y - hh * 0.62], [bx, y - hh], [bx + ww * 0.34, y - hh * 0.6], [bx + ww * 0.1, y - hh * 0.7], [bx - ww * 0.08, y - hh * 0.58]], snow, { lw: 1.5, line: ehDark(sh, 0.2) }); }
  ctx.restore(); }
function h4S1Panel(ctx, t, S) {
  const tc = EH_T2(t), g = ehE(t, 2.95, 0.4), H = h4S1Horse(t), tilt = 80 * ehE(t, 3.68, 1.2), hy = 640 - tilt;
  ehSkyFlight(ctx, t, { w: { high: 1 - g, gold: g }, sx: -220 * t, sy: -260 * ehE(t, 3.68, 3, 'in') * (t - 3.68 > 0 ? 1 : 0), cloud: g < 0.5 ? 'high' : 'gold', sun: g < 0.5 ? [160, 170, 46] : [860, 260, 52] });
  // far snow range on the horizon, the land below with the river city sliding away, a near range passing under the hooves (2.08 - 4.6)
  h4S1Range(ctx, hy, 0.6, -40 * t, g < 0.5 ? '#9aa8e0' : '#b8a0c8', g < 0.5 ? '#7480c0' : '#8a78a8', '#f6f8ff', 3);
  ehLand(ctx, hy, 0.22, t, { variant: 'far', dx: -420 * t, haze: g < 0.5 ? '#e4f0ff' : '#ffe8c8' });
  if (t < 3) { const x = 260 - 150 * t, k = 0.11 * (1 - t / 4); princessPalace(ctx, x, hy + 120, k, {}); }
  if (t > 1.9 && t < 4.8) { const u = (t - 1.9) / 2.9; h4S1Range(ctx, 1240 - 120 * Math.sin(Math.PI * K.clamp(u * 1.1)), 1.6, 1200 - 1500 * u, g < 0.5 ? '#8a96d8' : '#a890c0', g < 0.5 ? '#6470b8' : '#7a68a0', '#ffffff', 7); }
  // the valley and the white palace with tangerine domes growing (4.56 -)
  if (t > 4.4) { const u = ehE(t, 4.4, 3.6, 'in'), py = K.lerp(hy + 70, 1100, u), s = K.lerp(0.05, 0.62, u);
    ctx.save(); ctx.fillStyle = '#6ab85a'; ctx.beginPath(); ctx.ellipse(600, py, 900 * s + 60, 120 * s + 14, 0, 0, 7); ctx.fill(); ctx.restore(); farPalaceToy(ctx, 600, py, s, 'golden');
    if (t > 5.18) { ctx.save(); ctx.globalAlpha *= K.clamp((t - 5.18) / 0.3); for (let i = 0; i < 2; i++) peacock(ctx, { x: 600 + (i ? 170 : -260) * s * 2, y: py + 30 * s, s: 0.16 * s * 2, dir: i ? -1 : 1, fan: 0.6 + 0.4 * Math.sin(tc * 2 + i) }); ctx.restore(); } }
  // the riders
  const PF = { s: EH_PRINCESS.s * H.s / H4_HS, lid: ehLid(t, 11, [1.24, 5.66]), mouth: 'frown', eyes: 'open', brow: -0.3, gaze: [1, 0.2], handL: PERSON_HANDS.folded.L, handR: PERSON_HANDS.folded.R, lurch: 0.03 + idleSway(tc, 31, 0.02, 2.2) };
  const PR = { s: EH_INVENTOR.s * H.s / H4_HS, lid: 0.2 + ehLid(t, 7) * 0.8, mouth: 'smile', brow: 0.3, gaze: [1, 0.1], handL: [60, -110], handR: [70, -104], lurch: 0.02 + idleSway(tc, 37, 0.02, 2.3) };
  const ps = PR.s; PR.handR = h4Loc(H, ps, EH_EBG.knob, EH_SEAT2.rear, EH_SEAT2.rearDy);
  if (t >= 0.44 && t < 1.6) { PR.mouth = 'smile'; PR.lid = 0.15; PR.gaze = [1, 0.4]; PR.tip = 0.04; }
  if (t >= 1.24 && t < 2.6) { PF.dir = -1; PF.gaze = [1, -0.1]; PF.brow = 0.6; PF.handL = [20, -112]; PF.handR = [-10, -118]; }
  if (t >= 2.0 && t < 2.6) PF.gaze = lookAt([0, -170], h4Loc(H, PF.s, EH_EBG.lever, EH_SEAT2.front));
  if (t >= 2.6) { PF.dir = 1; PF.gaze = [1, 0.5]; }
  if (t >= 3.68 && t < 4.3) { PR.handR = h4Loc(H, ps, [EH_EBG.knob[0] - 6, EH_EBG.knob[1] + 4], EH_SEAT2.rear, EH_SEAT2.rearDy); PR.gaze = [0.8, 0.8]; }
  if (t >= 5.66) { PF.gaze = gazePlan(tc, [[5.66, [-1, 0.6]], [6.0, [1, 0.6]], [6.4, [0.2, -0.3]], [6.9, [0.6, 0.9]]], 0.1); PF.lurch = 0.12; PF.mouth = 'closed'; PF.brow = 0.1; PF.handL = [50, -110]; PF.handR = [40, -112]; }
  if (t >= 6.22) { PR.gaze = [0.6, 0.9]; PR.tip = 0.1 * pulse(tc, 6.6, 0.5); PR.handL = [70, -140 - 30 * pulse(tc, 6.8, 0.5)]; PR.mouth = 'smirk'; PR.lid = 0.3; }
  castFinish(ctx, H.x, H.y + 60 * H.s, 760 * H.s, 1000 * H.s, (c) => { ehWindRibbons(c, H, tc, { ang: Math.PI + 0.05 + 0.2 * ehE(t, 3.68, 0.9), len: 240 });
    twoRiders(c, H, { who: 'princess', D: EH_PRINCESS, P: PF }, { who: 'inventor', D: EH_INVENTOR, P: PR }, t, { tc, tail: { stream: 1, torn: true, ang: Math.PI * 1.02 }, veil: { stream: 1 }, armOver: t < 4.3 ? ehHorsePt(H, EH_EBG.knob) : null }); }, { rim: '#fff2c0', light: g < 0.5 ? [-1, -1] : [1, -1], rimW: 2.5 });
  if (t > 2.0 && t < 2.6) { const [x, y] = ehHorsePt(H, EH_EBG.lever); ehGlint(ctx, x, y, 22, (t - 2.0) / 0.6); }
  ehSkyFront(ctx, t, { sx: -600 * t, sy: 0, cloud: g < 0.5 ? 'high' : 'gold', a: 0.45 });
  // the cloud deck sweeps over the frame while the sky is repainted (2.84 - 3.5)
  { const k = Math.sin(Math.PI * K.clamp((t - 2.7) / 0.95)); if (k > 0) { ctx.save(); ctx.globalAlpha *= Math.min(1, k * 1.4); const pal = g < 0.5 ? 'high' : 'gold';
    for (let i = 0; i < 4; i++) h1Strip(ctx, h1DeckNear(pal), -700 * t + i * 330, K.lerp(1230, -120 + i * 300, k) - 120, H1_DW, 420); ctx.restore(); } }
  // the title, the Arabic line in Lalezar under it (over the land, clear of the riders)
  if (t < 2.62) { ctx.save(); ctx.globalAlpha *= 1 - K.clamp((t - 2.3) / 0.3);
    S.title(ctx, 'THE STOLEN HORSE', 500, 760, K.clamp((t - 0.3) / 0.8), { size: 76, align: 'center' });
    if (t > 0.6) S.title(ctx, 'الحصان المسروق', 500, 880, K.clamp((t - 0.6) / 0.8), { size: 70, align: 'center', font: 'Lalezar', glow: '#8a5cff' }); ctx.restore(); }
}
