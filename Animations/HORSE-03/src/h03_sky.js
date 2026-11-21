// ===== HORSE-03: S17 in the sky (114.42 - 120.58) and the two inserts (the knob 107.94 - 109.5, the scrap 129.12 - 130.1) =====
function h3S17City(t) { return 330 - 60 * (t - 114.42); }
function h3S17Horse(t) { const tc = EH_T2(t), sh = ehE(t, 119.18, 1.3, 'in'), cx = K.lerp(520, 640, (t - 114.42) / 6) + 260 * sh, cy = 400 + idleSway(tc, 5, 6, 2.2) + 60 * sh;
  return ehRigP(cx, cy, 0.9 * (1 - 0.88 * sh), 1, 0.02 + idleSway(tc, 6, 0.012, 3.0)); }
function h3S17Panel(ctx, t, S) {
  const tc = EH_T2(t), u = t - 114.42, H = h3S17Horse(t);
  ehSkyFlight(ctx, t, { w: { high: 1 }, sx: -220 * u, sy: 0, cloud: 'high', sun: [160, 170, 50] });
  // far mountains on the horizon, then the land far below: the river city slides away behind (left)
  ctx.save(); ctx.fillStyle = '#9aa8e0'; ctx.beginPath(); ctx.moveTo(0, 640); for (let x = 0; x <= 1000; x += 50) ctx.lineTo(x, 600 - 60 * Math.abs(Math.sin(x * 0.011 + 1)) - 30 * Math.abs(Math.sin(x * 0.03))); ctx.lineTo(1000, 640); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#f4faff'; for (let x = 0; x <= 1000; x += 50) { const y = 600 - 60 * Math.abs(Math.sin(x * 0.011 + 1)) - 30 * Math.abs(Math.sin(x * 0.03)); if (y < 560) { ctx.beginPath(); ctx.moveTo(x - 12, y + 16); ctx.lineTo(x, y); ctx.lineTo(x + 12, y + 16); ctx.closePath(); ctx.fill(); } } ctx.restore();
  ehLand(ctx, 610, 0.2, t, { variant: 'far', dx: -260 * u, haze: '#e4f0ff' });
  { const cx = h3S17City(t), k = 0.3 - 0.02 * u; ctx.save(); ctx.globalAlpha = 0.95; ehGrad(ctx, cx - 260 * k / 0.3, 742, 520 * k / 0.3, 26, [[0, '#4ab0e0'], [1, '#3a90d0']]); princessPalace(ctx, cx, 745, k, {}); ehRiverTowers(ctx, cx - 200 * k / 0.3, cx + 170 * k / 0.3, 748, 150 * k / 0.3, 26 * k / 0.3, EH_RC_DUSK, {}); ctx.restore(); }
  ehTile(ctx, ehCloudTile('mid', 'high'), -400 * u + 300, 500, 0.55);
  // two riders, level, with a 6 px bob; the princess twisted round, the inventor staring ahead with the torn tail
  const PF = { s: EH_PRINCESS.s * H.s / H3_HS, lid: ehLid(t, 11, [118.8]), mouth: 'open', eyes: 'wide', brow: -0.4, gaze: [-1, 0.1], handL: [50, -110], handR: [-60, -150], lurch: 0.06 + idleSway(tc, 31, 0.02, 2.2), talk: ehTalk(t, 114.42, 116.6, 19, 0.8) };
  const ps = PF.s, mane = (j) => h3Loc(H, ps, [EH_EBG.mane[j][0] - 4, EH_EBG.mane[j][1] - 4], EH_SEAT2.front);
  PF.handL = mane(5);
  if (t >= 115.98 && t < 117.6) { PF.handR = [-90, -70]; PF.gaze = [-0.8, 0.7]; }
  if (t >= 117.6) { PF.handR = [-40, -130]; PF.mouth = 'frown'; PF.talk = 0; }
  if (t >= 118.8) { PF.gaze = lookAt([0, -170], h3Loc(H, ps, EH_EBG.lever, EH_SEAT2.front)); PF.dir = 1; PF.handR = [40, -120]; PF.brow = 0.2; PF.mouth = 'closed'; PF.eyes = 'open'; }
  const PR = { s: EH_INVENTOR.s * H.s / H3_HS, lid: 0.4, mouth: 'closed', brow: 0.4, gaze: [1, -0.1], handL: [60, -110], handR: [70, -104], lurch: -0.1 + idleSway(tc, 37, 0.02, 2.3), tip: -0.04 };
  if (t >= 117.7 && t < 118.5) { PR.tip = 0.12 * Math.sin((tc - 117.7) * 7); PR.talk = ehTalk(t, 117.7, 118.1, 41, 0.7); PR.lid = 0.6; }
  if (t >= 118.5) { PR.handR = EH_PLUGEAR.R; PR.gaze = [1, -0.2]; PR.lid = 0.5; PR.mouth = 'smirk'; }
  if (t >= 118.8) PR.lurch = 0.06;
  castFinish(ctx, H.x, H.y + 60 * H.s, 760 * H.s, 1000 * H.s, (c) => { ehWindRibbons(c, H, tc, { ang: Math.PI + 0.05, len: 260 }); twoRiders(c, H, { who: 'princess', D: EH_PRINCESS, P: PF }, { who: 'inventor', D: EH_INVENTOR, P: PR }, t, { tc, tail: { stream: 1, torn: true, ang: Math.PI * 1.02 }, veil: { stream: 1 } }); }, { rim: '#fff2c0', light: [-1, -1], rimW: 2.5 });
  if (t >= 118.95 && t < 119.5) { const [x, y] = ehHorsePt(H, EH_EBG.lever); ehGlint(ctx, x, y, 30, (t - 118.95) / 0.55); }
  ehSkyFront(ctx, t, { sx: -600 * u, sy: 0, cloud: 'high', a: 0.5 });
  // lettering: TAKE ME BACK! (the arrow follows her finger to the dome), NO!
  const sF = ehRiderFrame(H, EH_SEAT2.front, 0, PF.lurch, 0, ps), hF = ehRiderPt(sF, 0, -120), sR = ehRiderFrame(H, EH_SEAT2.rear, EH_SEAT2.rearDy, PR.lurch, 0, PR.s), hR = ehRiderPt(sR, 0, -120);
  if (t >= 115.46 && t < 117.2) h3Say(ctx, S, [[115.46, 'TAKE ME BACK!']], t, hF, { gone: 116.95, size: 50, up: 190, dx: 60 });
  if (t >= 115.98 && t < 117.4) { const dm = [h3S17City(t) - 80, 700]; ctx.save(); ctx.globalAlpha *= K.clamp((117.4 - t) / 0.3); S.arrow(ctx, [hF[0] - 70, hF[1] + 80], dm, K.clamp((t - 115.98) / 0.5), { width: 10, bend: 0.3 }); ctx.restore(); }
  if (t >= 117.7 && t < 119.1) h3Say(ctx, S, [[117.7, 'NO!']], t, hR, { gone: 118.85, size: 64, up: 170, dx: -120 });
}
// ---------- the knob insert (107.94 - 109.5): his hand closes over the brass knob and gives it a hard half turn; the brass lights fast ----------
function h3InsBgGarden(pl) { return ehBakeAt('h3insg:' + pl, 1000, 1230, (c) => { c.save(); c.filter = 'blur(9px)'; c.translate(500, 615); c.scale(1.5, 1.5); c.translate(-1250, -640);
  c.drawImage(ehPGSkyPlate(pl), -500, -760, 2600, 1660); c.drawImage(ehPGFarPlate(pl), -300, 300, 2200, 520); c.drawImage(ehPGGroundPlate(), 0, 120, 1600, 1110); c.restore(); }, 0.5); }
function h3KnobInsert(ctx, t, S) {
  const tc = EH_T2(t), s = 4.2, kx = 560, ky = 640, z = 1 + 0.04 * (t - 107.94); ctx.drawImage(h3InsBgGarden('day'), 0, 0, 1000, 1230); ehGlow(ctx, 200, 200, 400, 0.4, '#fff2c0');
  ctx.save(); ctx.translate(500, 615); ctx.scale(z, z); ctx.translate(-500, -615);
  const k = flow(tc, [[107.94, 0], [108.3, 0], [108.6, 1], [109.5, 1]]), ang = k * Math.PI, lit = t >= 108.92 ? ehLitMax(ehPowerOn(t, 108.92, 0.08, 0.5), {}) : {};
  ebonyHorse(ctx, { x: kx - EH_EBG.knob[0] * s, y: ky - EH_EBG.knob[1] * s, s, dir: 1, close: true, knob: ang, lit });
  // a turquoise sleeve (hers) blurred at the edge of frame, his lilac sleeve and hand from the left
  celShade(ctx, [[640, 1230], [760, 900], [900, 860], [1000, 900], [1000, 1230]], EH_TURQ, '#14908a', { off: 30, lw: 4, line: '#0a5a56' });
  h3Click(ctx, kx + 8, ky, t, [108.3, 108.6]);
  ctx.save(); ctx.translate(kx + 8, ky); ctx.rotate(ang * 0.5); ctx.translate(-(kx + 8), -ky); handInsert(ctx, 470, ky - 30, { s: 1.1, grip: t < 108.15 ? K.clamp((t - 107.94) / 0.2) : 1, point: 0, rot: 0.1, sleeve: '#8a6ac8', cuff: '#c8a0ff' }); ctx.restore();
  if (t >= 108.92) { ehGlow(ctx, kx, ky, 300, 0.5, '#ffd36a'); ehGlint(ctx, kx + 8, ky - 20, 60, (t - 108.92) / 0.3 % 1); }
  ctx.restore();
}
// ---------- the scrap insert (129.12 - 130.1): his fingers lift the saffron scrap: torn edge, a small claw hole ----------
function h3ScrapInsert(ctx, t, S) {
  const tc = EH_T2(t), u = ehE(tc, 129.12, 0.5), z = 1 + 0.03 * (t - 129.12); ctx.drawImage(h3InsBgGarden('golden'), 0, 0, 1000, 1230); ehGlow(ctx, 900, 300, 500, 0.5, '#ffd890');
  ctx.save(); ctx.translate(500, 615); ctx.scale(z, z); ctx.translate(-500, -615);
  ctx.fillStyle = 'rgba(60,140,70,0.35)'; ctx.fillRect(0, 900, 1000, 330);
  const sx = 560, sy = K.lerp(820, 600, u); turbanScrap(ctx, sx, sy + 40, 4.2, -0.2 + 0.1 * u);
  handInsert(ctx, sx - 50, sy - 10, { s: 1.15, grip: 0.7, point: 0.2, rot: 0.1 - 0.15 * u, sleeve: '#eadcc0', cuff: '#f2c040' });
  if (t > 129.5) ehGlint(ctx, sx + 60, sy + 20, 50, (t - 129.5) / 0.5);
  ctx.restore();
}
