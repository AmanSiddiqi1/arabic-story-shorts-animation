// ===== HORSE-05: the two inserts (knob 74.32 - 76.36, lever 94.9 - 96.4), the flight home S11 - S12 (86.88 - 100.32),
// the river run S13 (100.32 - 104.87) and the sunset close S19 (142.06 - end). Panel units 1000 x 1230.
// ---------- inserts ----------
function h5InsBgSquare() { return ehBakeAt('h5inssq', 1000, 1230, (c) => { c.save(); c.filter = 'blur(10px)'; c.translate(500, 615); c.scale(1.6, 1.6); c.translate(-1960, -560);
  c.drawImage(ehFarSkyPlate('morning'), -600 + 360, -700 + 20, 3800, 1560); c.drawImage(ehFarMainPlate('morning'), 0, 0, 2600, 1430); c.restore(); }, 0.5); }
function h5KnobInsert(ctx, t, S) {
  const tc = EH_T2(t), s = 4.4, z = 1 + 0.03 * (t - 74.32); ctx.drawImage(h5InsBgSquare(), 0, 0, 1000, 1230); ehGlow(ctx, 260, 220, 420, 0.45, '#ffe0b8');
  ctx.save(); ctx.translate(500, 615); ctx.scale(z, z); ctx.translate(-500, -615);
  const turn = t < 75.16 ? 0 : [0.2, 0.55, 1][Math.min(2, Math.floor((tc - 75.16) / (1 / 6)))] * Math.PI / 2, lit = t >= 75.7 ? { neck: 0.3 + 0.2 * Math.sin(t * 6), chest: 0.3 } : {};
  const Hc = { x: 540 - EH_EBG.knob[0] * s, y: 700 - EH_EBG.knob[1] * s, s, dir: 1, close: true, knob: turn, lit }; ebonyHorse(ctx, Hc); ehRosettes(ctx, Hc, { missing: 3, t: tc });
  const k = ehHorsePt(Hc, EH_EBG.knob);
  // her turquoise sleeve edge at the top (she sits in front)
  celShade(ctx, [[600, -40], [1040, -40], [1040, 120], [760, 160], [640, 90]], '#6fded6', '#3fb0a8', { light: [-1, -1], off: 20, lw: 4, line: '#14706a' }); seg(ctx, 640, 90, 760, 160, 10, '#f2c040', 0);
  const flex = t < 75.16 ? 0.1 * Math.sin((tc - 74.32) * 9) : 0;
  handInsert(ctx, k[0] - 90, k[1] + 4, { s: 1.15, grip: 0.45 + flex + (t >= 75.16 ? 0.15 : 0), rot: 0.08 - turn * 0.25, sleeve: '#e2d2b0', cuff: EH_CRIMSON });
  if (t >= 75.16) { ehGlow(ctx, k[0], k[1], 180, 0.4 + 0.1 * Math.sin(t * 8), '#ffd36a'); ehGlint(ctx, k[0] + 20, k[1] - 50, 50, ((t - 75.2) / 0.5) % 1); }
  ctx.restore();
  if (t >= 75.74) { ehTag(ctx, S, 'UP', 760, 330, t, 75.74, 76.36, { size: 60 }); S.arrow(ctx, [760, 600], [760, 400], K.clamp((t - 75.74) / 0.3), { width: 12, bend: 0 }); }
}
function h5InsBgSky() { return ehBakeAt('h5inssky', 1000, 1230, (c) => { c.save(); c.filter = 'blur(10px)'; c.drawImage(ehSkyPlate('low'), 0, 0, 1000, 1230); for (const [x, y, w] of [[200, 300, 600], [760, 760, 700], [300, 1100, 800]]) ehCloud(c, x, y, w, w * 0.25, '#ffffff', '#cfe0f6', 8, x); c.restore(); }, 0.5); }
function h5LeverInsert(ctx, t, S) {
  const tc = EH_T2(t), s = 4.0, u = t - 94.9; ctx.drawImage(h5InsBgSky(), -((u * 260) % 1000), 0, 1000, 1230); ctx.drawImage(h5InsBgSky(), 1000 - ((u * 260) % 1000), 0, 1000, 1230);
  ctx.save(); const z = 1 + 0.03 * u; ctx.translate(500, 615); ctx.scale(z, z); ctx.translate(-500, -615);
  const ease = t < 95.06 ? 0 : 0.35 * ehE(tc, 95.06, 0.4), Hc = { x: 460 - EH_EBG.lever[0] * s, y: 640 - EH_EBG.lever[1] * s, s, dir: 1, close: true, reveal: 1, cover: 1 - ehE(t, 94.95, 0.15), lever: ease, lit: { neck: 0.25 } };
  ebonyHorse(ctx, Hc); const k = ehHorsePt(Hc, [EH_EBG.lever[0] - 6, EH_EBG.lever[1] + 10]);
  handInsert(ctx, k[0] + 100, k[1] + 10, { dir: -1, s: 1.05, grip: 0.3, point: 0.5, rot: -0.1 + ease * 0.3, sleeve: '#6fded6', cuff: '#f2c040' });
  if (t >= 95.06) { ehGlow(ctx, k[0], k[1], 160, 0.35, '#ffd36a'); ehGlint(ctx, k[0] - 10, k[1] - 40, 40, ((t - 95.1) / 0.5) % 1); }
  ctx.restore();
  ehSkyFront(ctx, t, { sx: -800 * u, sy: 0, cloud: 'day', a: 0.35 });
  if (t >= 95.3) { ehTag(ctx, S, 'DOWN', 250, 330, t, 95.3, 96.4, { size: 60 }); S.arrow(ctx, [250, 400], [250, 620], K.clamp((t - 95.3) / 0.3), { width: 12, bend: 0 }); }
}
// ---------- kingdomBelow 'fields' (patchwork, poppies, three braided rivers, windmills, sheep) and the homeland mountains ----------
function h5FieldsTile() {
  return ehBakeAt('h5fields', 800, 500, (c, w, h) => { const R = K.rng(77), cols = ['#7ac85a', '#a8d86a', '#e8c850', '#5aa84a', '#d8a838', '#8ac870', '#e84a4a', '#c8d870'];
    c.fillStyle = '#8ac870'; c.fillRect(0, 0, w, h);
    for (let gy = 0; gy < 5; gy++) for (let gx = 0; gx < 8; gx++) { const x = gx * 100 + (R() - 0.5) * 10, y = gy * 100 + (R() - 0.5) * 10, col = cols[Math.floor(R() * cols.length)];
      c.fillStyle = col; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 100, y + (R() - 0.5) * 14); c.lineTo(x + 100, y + 100); c.lineTo(x, y + 100 + (R() - 0.5) * 14); c.closePath(); c.fill(); c.strokeStyle = 'rgba(80,90,40,0.35)'; c.lineWidth = 2; c.stroke();
      if (col === '#e84a4a') { c.fillStyle = '#ffd0c0'; for (let k = 0; k < 10; k++) c.fillRect(x + R() * 90, y + R() * 90, 3, 3); }
      else if (R() < 0.25) { c.fillStyle = 'rgba(255,255,255,0.9)'; for (let k = 0; k < 7; k++) { c.beginPath(); c.ellipse(x + 15 + R() * 70, y + 15 + R() * 70, 4, 3, 0, 0, 7); c.fill(); } }
      else if (R() < 0.2) { c.strokeStyle = 'rgba(90,60,30,0.35)'; c.lineWidth = 1.5; for (let k = 8; k < 100; k += 12) { c.beginPath(); c.moveTo(x + k, y + 4); c.lineTo(x + k, y + 96); c.stroke(); } } }
    // three silver rivers braiding together
    for (const [ph, amp, wd] of [[0, 60, 30], [1.7, 80, 24], [3.1, 50, 20]]) { c.lineCap = 'round'; c.strokeStyle = '#3a8ae0'; c.lineWidth = wd; c.beginPath(); for (let x = 0; x <= w; x += 10) c.lineTo(x, 250 + Math.sin(x / w * Math.PI * 2 + ph) * amp + Math.sin(x / w * Math.PI * 6) * 10); c.stroke(); c.strokeStyle = '#d8f0ff'; c.lineWidth = wd * 0.3; c.stroke(); }
    // windmills, a waterwheel hut and a farm
    for (const [x, y] of [[140, 90], [560, 410], [690, 120]]) { c.fillStyle = '#f6ead0'; c.fillRect(x - 6, y - 16, 12, 18); c.strokeStyle = '#6a4a3a'; c.lineWidth = 3; for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2 + 0.4; c.beginPath(); c.moveTo(x, y - 16); c.lineTo(x + Math.cos(a) * 16, y - 16 + Math.sin(a) * 16); c.stroke(); } }
    for (let i = 0; i < 4; i++) { const vx = R() * w, vy = R() * h; for (let k = 0; k < 6; k++) { c.fillStyle = ['#f6ead0', '#e8b888', '#d88a6a'][k % 3]; c.fillRect(vx + (R() - 0.5) * 36, vy + (R() - 0.5) * 22, 8, 6); } } });
}
function h5Land(ctx, y, k, t, o = {}) {   // perspective land from horizon y (as ehLand) with the fields tile
  if (y >= 1230) return; const img = h5FieldsTile(); ctx.save(); ctx.beginPath(); ctx.rect(0, y, 1000, 1230 - y); ctx.clip();
  const pat = ctx.createPattern(img, 'repeat'), N = 14;
  for (let j = 0; j < N; j++) { const v0 = j / N, v1 = (j + 1) / N, y0 = y + (1230 - y) * v0 * v0, y1 = y + (1230 - y) * v1 * v1 + 1, sc = k * (0.35 + 2.4 * (v0 + v1) / 2);
    pat.setTransform(new DOMMatrix().translate(500 + (o.dx || 0) * sc + j * 211 * sc, y0 - j * 97 * sc).scale(sc * 1.3, sc * 0.55)); ctx.fillStyle = pat; ctx.fillRect(0, y0, 1000, y1 - y0); }
  ehGrad(ctx, 0, y, 1000, Math.min(360, 1230 - y), [[0, K.rgba(o.haze || '#e4f0ff', 0.9)], [0.35, K.rgba(o.haze || '#e4f0ff', 0.25)], [1, K.rgba(o.haze || '#e4f0ff', 0)]]);
  ctx.save(); ctx.globalCompositeOperation = 'screen'; ehGlints(ctx, [0, y + 120, 1000, 1230 - y - 120], t, 6, 88, 14); ctx.restore();
  ctx.restore(); }
// a band of peaks along y (panel), scale k, scrolled by x0
function h5Range(ctx, y, k, x0, col, sh, snow, seed) { const R = K.rng(seed), w = 2000, span = Math.max(w * k, 1500), n = Math.max(14, Math.ceil(span / (160 * k))); ctx.save();   // review 1: the band always runs past both panel edges
  for (let i = 0; i < n; i++) { const bx = ((i * 160 * k + x0) % span + span) % span - 250, hh = (120 + R() * 140) * k, ww = (150 + R() * 90) * k;
    celShade(ctx, [[bx - ww, y + 30 * k], [bx, y - hh], [bx + ww, y + 30 * k]], col, sh, { light: [-1, -1], off: ww * 0.3, lw: 2.5, line: ehDark(sh, 0.3) });
    shape(ctx, [[bx - ww * 0.32, y - hh * 0.62], [bx, y - hh], [bx + ww * 0.34, y - hh * 0.6], [bx + ww * 0.1, y - hh * 0.7], [bx - ww * 0.08, y - hh * 0.58]], snow, { lw: 1.5, line: ehDark(sh, 0.2) }); }
  ctx.restore(); }
// a farmer with two oxen looking up (panel units, tiny)
function h5Farmer(ctx, x, y, t, look) { const tc = EH_T2(t); for (const dx of [-36, -16]) { celShade(ctx, ell(x + dx, y - 6, 9, 5, 10), '#c8a070', '#9a7a50', { off: 2, lw: 1.5, line: '#5a3a2a' }); }
  seg(ctx, x - 4, y - 2, x - 4, y - 16, 4, '#4a6ac8', 0); const r = look ? -0.6 : 0; ctx.save(); ctx.translate(x - 4, y - 20); ctx.rotate(r); celShade(ctx, ell(0, 0, 9, 3, 10), '#f2d070', '#c8a040', { off: 1, lw: 1.2, line: '#6a4a10' }); ctx.restore(); }
// ---------- S11 - S12: the flight home ----------
function h5FlightHorse(t) { const tc = EH_T2(t), bob = idleSway(tc, 5, 6, 2.2);
  if (t < 93.32) { const dr = ehE(t, 86.88, 1.2), dx = 40 * Math.sin((tc - 86.88) * 0.9) * dr, dy = 25 * Math.sin((tc - 86.88) * 1.3 + 0.6) * dr, bank = 0.05 * Math.sin((tc - 86.88) * 0.9 + 0.8) * dr;   // review 1: the rig drifts and banks
    return ehRigP(430 + dx, 330 + bob + dy + 30 * ehE(t, 90.9, 2), 0.8, 1, 0.02 + bank + idleSway(tc, 6, 0.012, 3.0)); }
  const dn = t < 96.56 ? 0 : ehE(t, 96.56, 0.5), d0 = 40 * Math.sin((93.32 - 86.88) * 0.9), cx = K.lerp(430 + d0, 470, ehE(t, 93.32, 1.5)), cy = 360 + bob + 70 * ehE(t, 96.56, 3.6);
  return ehRigP(cx, cy, 0.8, 1, 0.02 - 0.21 * dn + idleSway(tc, 6, 0.012, 3.0)); }
function h5FlightPanel(ctx, t, S) {
  const tc = EH_T2(t), u = t - 86.88, H = h5FlightHorse(t), desc = t >= 96.56 ? ehE(t, 96.56, 1) : 0, hz = t < 96.4 ? 700 : 700 - 260 * ehE(t, 96.56, 3.6, 'inOut');
  ehSkyFlight(ctx, t, { w: { low: 1 }, sx: -240 * u, sy: -300 * Math.max(0, t - 96.56), cloud: 'day', sun: [140, 150, 50] });
  // the homeland mountains rise on the horizon (90.9 -) with the bright river gap (91.52)
  const mu = ehE(t, 90.9, 1.6), mY = hz + 60 - 60 * mu;
  if (t >= 89.5) { ctx.save(); ctx.globalAlpha *= K.clamp((t - 89.5) / 1.2); h5Range(ctx, mY, 0.7, -30 * u, '#c890d0', '#9a68b0', '#fff4fa', 11); ctx.restore();
    if (t >= 91.52) { ctx.save(); ctx.globalCompositeOperation = 'screen'; ehGlow(ctx, 640, mY - 40, 160, 0.5 * K.clamp((t - 91.52) / 0.5), '#fff2c0'); ctx.restore(); } }
  h5Land(ctx, hz, 0.24 + 0.2 * desc, t, { dx: -340 * u, haze: '#e4f0ff' });
  // details on the near land: the farmer (88.32), boats on the rivers, a waterwheel
  if (t >= 87.8 && t < 93.0) { const fx = 1100 - 300 * (t - 87.8); h5Farmer(ctx, fx, 1040, t, t > 88.6); }
  // the river city grows below (97.74 -)
  if (t >= 97.0) { const g = ehE(t, 97.0, 3.3), s = K.lerp(0.18, 0.5, g), cx = 560, cy = K.lerp(hz + 140, 1020, g);
    ctx.save(); ctx.fillStyle = '#7ac85a'; ctx.beginPath(); ctx.ellipse(cx, cy, 1100 * s, 260 * s, 0, 0, 7); ctx.fill();
    ehGrad(ctx, cx - 1100 * s, cy + 40 * s, 2200 * s, 60 * s, [[0, '#3a9ae8'], [0.5, '#6ac0f8'], [1, '#2a80d8']]);
    const HS = ehHouses(55, 26, -900, 900, -200, 60, [[-420, 300]]); for (const Ho of HS) ehHouse(ctx, { ...Ho, x: cx + Ho.x * s, y: cy + Ho.y * s, w: Ho.w * s * 1.2, h: Ho.h * s * 1.2 }, EH_RC_DUSK, 0);
    princessPalace(ctx, cx, cy, s, {}); ehRiverTowers(ctx, cx - 620 * s, cx - 450 * s, cy + 50 * s, 330 * s, 50 * s, EH_RC_DUSK, { lamps: false });
    // people dots popping up (98.86)
    for (let i = 0; i < 9; i++) { const ti = 98.86 + i * 0.09; if (t < ti) continue; const R = K.rng(900 + i), px = cx + (R() - 0.5) * 1400 * s, py = cy + (R() * 0.4 - 0.05) * 200 * s;
      ctx.fillStyle = ['#e84a4a', '#3a74ea', '#ffd23a', '#ff8ab8'][i % 4]; ctx.beginPath(); ctx.arc(px, py - 6 * K.ease.back(K.clamp((t - ti) / 0.2)), 5, 0, 7); ctx.fill(); }
    // the horse's shadow crosses the blue dome; doves burst up (99.58)
    if (t >= 99.2) { const sx = K.lerp(cx - 600 * s, cx + 200 * s, (t - 99.2) / 1.2); ctx.save(); ctx.globalAlpha = 0.25; ctx.fillStyle = '#2b1a3a'; ctx.beginPath(); ctx.ellipse(sx, cy - 140 * s, 70, 16, 0, 0, 7); ctx.fill(); ctx.restore(); }
    for (let i = 0; i < 6; i++) { const t0 = 99.58 + stagger(i, 0.08), du = t - t0; if (du < 0) continue; bird(ctx, { kind: 'dove', x: cx - 300 * s + (i - 3) * 30 + (i % 2 ? 1 : -1) * 120 * du, y: cy - 330 * s - 160 * du, s: 0.18, dir: i % 2 ? 1 : -1, fly: true, flap: Math.sin(tc * 20 + i), pal: 0 }); }
    ctx.restore(); }
  // the horse's shadow on the land
  if (t < 97) { ctx.save(); ctx.globalAlpha = 0.18; ctx.fillStyle = '#2b1a3a'; ctx.beginPath(); ctx.ellipse(H.x + 80, 1000, 60, 12, 0, 0, 7); ctx.fill(); ctx.restore(); }
  // swallows beside the horse (89.6 -)
  if (t >= 89.6 && t < 93.4) for (let i = 0; i < 3; i++) { const R = K.rng(950 + i), x = H.x + 260 + i * 50 + 20 * Math.sin(tc * 2 + i), y = H.y - 200 + i * 30 + 10 * Math.sin(tc * 3 + i * 2);
    bird(ctx, { kind: 'sparrow', x: x - 200 * ehE(t, 89.6, 0.6, 'out') + 200, y, s: 0.16, dir: 1, fly: true, flap: Math.sin(tc * 24 + i * 1.7), pal: 1 }); }
  // the riders
  const ps = h5PsF(H), PF = { lid: ehLid(t, 11, [92.64]), mouth: 'smile', gaze: [1, 0.3], handL: h5Loc(H, ps, EH_EBG.mane[5], EH_SEAT2.front), handR: [40, -112], lurch: 0.03 + idleSway(tc, 31, 0.02, 2.2) };
  const PR = { lid: ehLid(t, 3, [93.32]), mouth: 'smile', gaze: [1, 0.2], handL: [50, -110], handR: [60, -112], lurch: 0.02 + idleSway(tc, 37, 0.02, 2.3) };
  if (t >= 89.6 && t < 90.04) { PF.handR = [90, -130]; PF.gaze = [1, -0.3]; PR.mouth = 'open'; PR.lid = 0.3; }
  if (t >= 90.04 && t < 92.1) { PF.lurch = 0.12; PF.handR = t < 90.9 ? [24, -168] : [120, -150]; PF.gaze = [1, 0.3]; if (t >= 91.06) { PR.lurch = 0.08; PR.gaze = [1, 0.15]; PR.lid = 0; } }   // she points ahead, he leans to look
  if (t >= 92.1 && t < 93.32) { PF.handR = [110, -160]; PF.bob = 6 * Math.abs(Math.sin(tc * 14)); PF.eyes = 'wide'; PF.mouth = 'open'; PF.lid = 0; }
  if (t >= 92.64 && t < 93.32) { PR.lurch = 0.1; PR.gaze = [1, 0.3]; PF.wet = t < 93.14 ? 1 : 0; }
  if (t >= 93.32) { PF.dir = -1; PF.gaze = [-1, -0.1]; PF.brow = 0.5; PF.mouth = 'closed'; PR.handL = [60, -200]; PR.handR = [70, -196]; PR.mouth = 'smile'; PR.brow = 0.4; }
  if (t >= 94.2) { PF.dir = 1; PF.gaze = [1, 0.6]; PF.handR = h5Loc(H, ps, [EH_EBG.lever[0] - 6, EH_EBG.lever[1] + 10], EH_SEAT2.front); PF.lurch = 0.1; }
  if (t >= 96.4) { PR.handL = [60, -214 + 6 * Math.sin(tc * 4)]; PR.handR = [70, -206 - 6 * Math.sin(tc * 4)]; PR.lid = 0; PR.mouth = 'open'; }
  if (t >= 98.26 && t < 99.2) { PF.handR = [10, -140]; PF.wet = t < 98.66 ? 1 : 0; PF.gaze = [0.6, 0.8]; PF.handL = h5Loc(H, ps, EH_EBG.mane[5], EH_SEAT2.front); }
  if (t >= 99.2) { PF.handR = h5Loc(H, ps, [EH_EBG.lever[0] - 6, EH_EBG.lever[1] + 10], EH_SEAT2.front); PF.gaze = [0.6, 0.8]; }
  // through a thin deck: wisps whip past (97.3), drawn behind the rig (review 1: no front cloud over the cast)
  if (t >= 97.1 && t < 97.9) { ctx.save(); ctx.globalAlpha *= Math.sin(Math.PI * (t - 97.1) / 0.8) * 0.85; for (let i = 0; i < 3; i++) ehCloud(ctx, 500 + (i - 1) * 380, 1300 - 2400 * (t - 97.1) + i * 220, 700, 160, '#ffffff', '#dfeaf8', 6, 61 + i); ctx.restore(); }
  const st = desc > 0 ? K.lerp(1, 0.8, desc) : 1, ang = Math.PI * (1 + 0.15 * desc);
  castFinish(ctx, H.x, H.y + 60 * H.s, 760 * H.s, 1000 * H.s, (c) => { ehWindRibbons(c, H, tc, { ang: Math.PI + 0.05 - 0.3 * desc, len: 260 }); h5Pair(c, H, PF, PR, t, { veil: { stream: st }, cape: { stream: st, ang } }); saddleRope(c, H, t, { lf: PF.lurch, lr: PR.lurch }); }, { rim: '#fff2c0', light: [-1, -1], rimW: 2.5 });
  h1DeckFront(ctx, t, { pal: 'high', y: t < 96.56 ? 1030 : 1030 + 400 * desc, a: 1 });
  const hd = h5RiderHeads(H, PF, PR);
  if (t >= 92.1 && t < 93.4) h5Say(ctx, S, [[92.1, 'HOME!']], t, hd.f, { gone: 93.2, size: 60, up: 150, dx: 80 });
  if (t >= 93.32 && t < 94.9) h5Say(ctx, S, [[93.32, 'MAY I?']], t, hd.f, { gone: 94.7, size: 50, up: 150, dx: 60 });
}
// ---------- S13: riverRun (side view along her river; strip 2800, panel scale 1, ground of the far bank y 700..760, water 760..1230) ----------
const H5_RR = { w: 2800, towers: [1900, 2020], top: 330, deck: 640, palace: 2320, boats: [700, 1250, 1680] };
function h5RRSky() { return ehBakeAt('h5rrsky', 1400, 760, (c, w, h) => { ehGrad(c, 0, 0, w, h, [[0, '#3a8ef0'], [0.6, '#8ac8ff'], [1, '#e8f6ff']]); for (const [x, y, s] of [[200, 160, 1.2], [800, 260, 1.0], [1200, 120, 0.8]]) ehCloud(c, x, y, 420 * s, 110 * s, '#ffffff', '#cfe0f6', 8, x); ehSoftHills(c, w, 690, 30, '#9ac8a8', 5, 3, 760); }, 0.5); }
function h5RRFar() { return ehBakeAt('h5rrfar', 2000, 200, (c) => { const R = K.rng(311); c.translate(0, -580);
  for (let i = 0; i < 26; i++) { const x = i * 78 + R() * 30, hh = 40 + R() * 46, ww = 46 + R() * 26, col = ['#fff1dc', '#ffd8b8', '#ffc8d0', '#d8e8ff'][i % 4];
    celShade(c, K.rectPts(x, 700 - hh, ww, hh), col, ehDark(col, 0.12), { light: [-1, -1], off: 6, lw: 2, line: '#7a5a5a' }); c.fillStyle = '#6a7ac8'; c.fillRect(x + ww * 0.3, 700 - hh * 0.7, 8, 10);
    if (i % 5 === 2) { c.strokeStyle = '#8a6a5a'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(x + ww, 700 - hh + 10); c.lineTo(x + ww + 40, 700 - hh + 14); c.stroke(); for (let k = 0; k < 4; k++) { c.fillStyle = ['#ff8ab8', '#ffffff', '#5ab8f0', '#ffd23a'][k]; c.fillRect(x + ww + 4 + k * 9, 700 - hh + 12, 6, 10); } } }
  for (const x of [300, 1100, 1700]) { celShade(c, K.rectPts(x, 560, 22, 140), '#fff6ea', '#d8c8b0', { off: 6, lw: 2, line: '#7a5a5a' }); ehDome(c, x + 11, 560, 16, '#2f7ae0', '#1f4aa8'); }
  ehGrad(c, 0, 700, 2000, 60, [[0, '#6ab07a'], [1, '#4a9a6a']]); }, 0.6); }
function h5RiverRun(ctx, t, camX) {   // camX: world x at the left panel edge
  ctx.drawImage(h5RRSky(), -camX * 0.15, 0, 1400, 760);
  ctx.drawImage(h5RRFar(), -camX * 0.5, 580, 2000, 200); ctx.drawImage(h5RRFar(), -camX * 0.5 + 2000, 580, 2000, 200);
  // the rose palace and the garden hedge beyond (parallax 0.85)
  { const px = H5_RR.palace - camX * 0.85; if (px > -400 && px < 1500) { princessPalace(ctx, px, 745, 0.55, {}); ctx.fillStyle = '#4aa060'; ctx.fillRect(px - 300, 730, 700, 30); } }
  // palms on the near bank (parallax 0.8)
  for (const x of [200, 760, 1300, 2100]) { const px = x - camX * 0.8; if (px > -200 && px < 1200) palmTree(ctx, px, 760, { h: 300, lean: 14, t, sway: 1, s: 0.6 }); }
  // the river
  ehGrad(ctx, 0, 760, 1000, 470, [[0, '#6ac0f8'], [0.4, '#3a9af0'], [1, '#2a7ad0']]);
  ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,0.7)'; ctx.lineWidth = 3; for (let i = 0; i < 22; i++) { const R = K.rng(40 + i), y = 790 + R() * 420, x = ((R() * 2800 - camX * (0.9 + y / 4000) + t * 30) % 1400 + 1400) % 1400 - 200; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 40 + R() * 40, y); ctx.stroke(); } ctx.restore();
  // the two towers with the lamp bridge (world x, scale 1)
  const tx1 = H5_RR.towers[0] - camX, tx2 = H5_RR.towers[1] - camX; if (tx2 > -200 && tx1 < 1200) ehRiverTowers(ctx, tx1, tx2, 770, 440, 54, EH_RC_DUSK, { lamps: true });
  return [tx1, tx2]; }
const H5_RRX = H5_F([[100.32, 0], [103.38, 1480], [104.87, 1700]]);
function h5RiverPanel(ctx, t, S) {
  const tc = EH_T2(t), camX = H5_RRX(t), [tx1, tx2] = h5RiverRun(ctx, t, camX), bank = t >= 101.5 && t < 102.3 ? 0.14 * Math.sin(Math.PI * (t - 101.5) / 0.8) : 0;
  const H = ehRigP(420, 420 + idleSway(tc, 5, 5, 2.0) + 60 * ehE(t, 104.1, 0.7), 0.75, 1, 0.02 - bank * 0.6 - 0.1 * ehE(t, 104.1, 0.7));
  // washerwomen on the bank waving, the fisherman's boat and hat, the boy on the bridge
  for (let i = 0; i < 3; i++) { const wx = 520 + i * 60 - camX * 0.8, w = t > 101.0 + i * 0.15 ? Math.sin(tc * 10 + i) : 0; if (wx < -60 || wx > 1060) continue;
    person(ctx, ehDressP(EH_GUESTS[[1, 3, 5][i]], { x: wx, y: 762, s: 0.32, dir: 1, mouth: 'smile', gaze: [0.6, -0.8], handL: [-20, -100], handR: [30, -190 + 30 * w], lid: 0 })); }
  for (const [k, bx0] of H5_RR.boats.entries()) { const bx = bx0 - camX * 0.95, by = 880 + k * 90; if (bx < -200 || bx > 1200) continue;
    if (k === 1) { const look = t > 102.1; person(ctx, ehDressP(EH_GUESTS[2], { x: bx, y: by - 14, s: 0.5, dir: -1, sit: 1, seat: 'floor', mouth: look ? 'o' : 'closed', gaze: look ? [-0.6, -0.8] : [-1, 0.2], handL: [30, -90], handR: [40, -100], lid: 0, pal: { head: 'none' } }));
      const hu = K.clamp((t - 102.1) / 1.2), hx = bx + 10 - 120 * hu, hy = by - 120 + 80 * hu * hu - 60 * Math.sin(Math.PI * hu); ctx.save(); ctx.translate(hx, hy); ctx.rotate(hu * 4); celShade(ctx, ell(0, 0, 26, 8, 12), '#f2d070', '#c8a040', { off: 3, lw: 2, line: '#6a4a10' }); celShade(ctx, ell(0, -6, 12, 8, 10), '#f2d070', '#c8a040', { off: 2, lw: 2, line: '#6a4a10' }); ctx.restore(); }
    celShade(ctx, [[bx - 80, by - 20], [bx + 80, by - 20], [bx + 60, by + 10], [bx - 60, by + 10]], '#a8703a', '#7a4a2a', { light: [-1, -1], off: 8, lw: 3, line: '#4a2a14' }); }
  // reflection: the rig flipped about the water line, alpha 0.35, in sliced wobbling bands
  const PF = { lid: ehLid(t, 11), mouth: 'smile', gaze: [1, 0.3], handL: [50, -110], handR: h5Loc(H, h5PsF(H), [EH_EBG.lever[0] - 6, EH_EBG.lever[1] + 10], EH_SEAT2.front), lurch: 0.04 + idleSway(tc, 31, 0.02, 2.2) };
  const PR = { lid: ehLid(t, 3), mouth: 'smile', gaze: [1, 0.2], handL: [40, -96], handR: [44, -98], lurch: idleSway(tc, 37, 0.02, 2.3) };
  if (t >= 102.48 && t < 103.4) { PF.handR = [120, -150]; PF.gaze = [1, 0.1]; }
  if (t >= 103.38) { PF.mouth = 'open'; PR.handL = [60, -200]; }
  const rig = (c) => { ehWindRibbons(c, H, tc, { ang: Math.PI + 0.05, len: 240 }); h5Pair(c, H, PF, PR, t, { veil: { stream: 1 }, cape: { stream: 1 } }); saddleRope(c, H, t, { lf: PF.lurch, lr: PR.lurch }); };
  const wl = 740; ctx.save(); ctx.globalAlpha *= 0.35; for (let b = 0; b < 7; b++) { const y0 = 760 + b * 70; ctx.save(); ctx.beginPath(); ctx.rect(0, y0, 1000, 70); ctx.clip(); ctx.translate(6 * Math.sin(tc * 6 + b), 0); ctx.translate(0, 2 * wl); ctx.scale(1, -1); rig(ctx); ctx.restore(); } ctx.restore();
  // the gold path of glints toward the towers (102.48 - 104.1)
  if (t >= 102.48) { const k = K.clamp((t - 102.48) / 0.5) * (1 - K.clamp((t - 104.1) / 0.6)); ctx.save(); ctx.globalCompositeOperation = 'screen'; for (let i = 0; i < 9; i++) { const px = K.lerp(380, (tx1 + tx2) / 2, i / 8), py = K.lerp(1150, 800, i / 8); ehGlint(ctx, px, py, 26 * k, ((t * 1.3 + i * 0.13) % 1)); ehGlow(ctx, px, py, 50, 0.4 * k, '#ffd36a'); } ctx.restore(); }
  castFinish(ctx, H.x, H.y + 60 * H.s, 760 * H.s, 1000 * H.s, rig, { rim: '#fff2c0', light: [-1, -1], rimW: 2.5 });
  // the nearer tower as a front pass over the rig while passing (103.2 - 104.2), the boy on the bridge
  if (tx2 > -100 && tx2 < 1100) { const bx = (tx1 + tx2) / 2, by = 770 - 440 * 0.16 - 6, duck = t >= 103.3 && t < 103.7;
    person(ctx, ehDressP(EH_CHILD, { x: bx, y: by, s: 0.7, dir: -1, child: true, mouth: duck ? 'o' : 'smile', gaze: [-0.6, -0.8], handL: duck ? [-10, -150] : [-20, -100], handR: t > 103.7 ? [30, -210 + 20 * Math.sin(tc * 12)] : [10, -150], sq: duck ? 0.8 : 1, lid: 0 }));
    if (t >= 103.2 && t < 104.4) { celShade(ctx, K.rectPts(tx2 - 27, 330, 54, 440), '#f0b8a8', '#d08a80', { light: [-1, -1], off: 14, lw: 3, line: '#7a4a4a' }); celShade(ctx, [[tx2 - 34, 330], [tx2, 270], [tx2 + 34, 330]], '#2f7ae0', '#1f4aa8', { off: 8, lw: 3, line: '#14306a' }); } }
  // reeds on the near edge (front strip)
  ctx.save(); for (let i = 0; i < 26; i++) { const x = ((i * 60 - camX * 1.3) % 1600 + 1600) % 1600 - 300, h = 60 + (i % 3) * 30; ctx.strokeStyle = i % 2 ? '#3a8a4a' : '#4aa058'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x, 1240); ctx.quadraticCurveTo(x + 8 * Math.sin(t * 2 + i), 1240 - h * 0.6, x + 14 * Math.sin(t * 1.6 + i), 1240 - h); ctx.stroke(); } ctx.restore();
}
// ---------- S19: the sunset close (142.06 - end) ----------
function h5SunsetHorse(t) { const tc = EH_T2(t), bob = idleSway(tc, 5, 6, 2.2);
  if (t < 145.2) return ehRigP(K.lerp(430, 470, (t - 142.06) / 3), 500 + bob, 0.7, 1, 0.02 + idleSway(tc, 6, 0.012, 3.0));
  const a = Math.PI * 2 * K.ease.inOut(K.clamp((t - 145.2) / 2.2)), cx = 500 + Math.sin(a) * 260 * -1 + (470 - 500), cy = 500 + (1 - Math.cos(a)) * 60 + bob, s = 0.7 - 0.12 * (1 - Math.cos(a)) / 2;
  let dir = 1; const ph = (a % (Math.PI * 2)); if (ph > Math.PI * 0.5 && ph < Math.PI * 1.5) dir = -1; if (Math.abs(ph - Math.PI * 0.5) < 0.25 || Math.abs(ph - Math.PI * 1.5) < 0.25) dir *= 0.45;
  return ehRigP(cx, cy, s, dir, 0.02); }
function h5SunsetPanel(ctx, t, S) {
  const tc = EH_T2(t), z = K.lerp(1.15, 1.0, ehE(t, 142.06, 6.4)), H = h5SunsetHorse(t);
  ctx.save(); ctx.translate(500, 615); ctx.scale(z, z); ctx.translate(-500, -615);
  ehGrad(ctx, -200, -200, 1400, 1630, H1_SUNSET_SKY);
  const sun = [640, 760 + 30 * ehE(t, 142.06, 6), 140]; ehGlow(ctx, sun[0], sun[1], sun[2] * 3.2, 0.8, '#ff9a60'); ehRays(ctx, sun[0], sun[1] - 20, t, 0.7);
  celShade(ctx, ell(sun[0], sun[1], sun[2], sun[2], 48), '#fff2b8', '#ffc060', { light: [-1, -1], off: 26, hi: '#ffffff', lw: 4, line: '#ff8a4a' });
  // first star (146.4)
  const st = K.clamp((t - 146.4) / 0.8); if (st > 0) { ctx.save(); ctx.globalAlpha *= st; ehGlint(ctx, 170, 230, 24, 0.5); ehGlow(ctx, 170, 230, 44, 0.6, '#fff6ea'); ctx.restore(); }
  // the land: his cream palace at the lower left, her rose palace small on the far right horizon, the river shining between
  ehTile(ctx, ehCloudTile('far', 'sunset'), -20 * (t - 142), 0, 0.6);
  h5Range(ctx, 780, 0.5, -10 * (t - 142), '#a878c0', '#7a58a0', '#ffd8e8', 21);
  ehLand(ctx, 790, 0.26, t, { variant: 'home', dx: -60 * (t - 142), haze: '#ffc8a0' });
  ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = '#ffd88a'; ctx.lineWidth = 18; ctx.beginPath(); ctx.moveTo(880, 800); ctx.quadraticCurveTo(620, 900, 520, 1000); ctx.quadraticCurveTo(420, 1100, 160, 1240); ctx.stroke(); ctx.strokeStyle = '#fff4c8'; ctx.lineWidth = 6; ctx.stroke(); ctx.restore();
  ctx.save(); ctx.globalCompositeOperation = 'screen'; for (let i = 0; i < 5; i++) ehGlint(ctx, K.lerp(860, 200, i / 4), K.lerp(810, 1200, i / 4), 18, ((EH_T3(t) * 0.7 + i / 5) % 1)); ctx.restore();
  { const s = 0.3; ctx.fillStyle = '#5aa84a'; ctx.beginPath(); ctx.ellipse(220, 1140, 1050 * s, 160 * s, 0, 0, 7); ctx.fill(); ctx.drawImage(ehPalacePlate(), 220 - 710 * s, 1140 - 1020 * s, 1360 * s, 1020 * s); }
  princessPalace(ctx, 860, 804, 0.15, {});
  const li = K.clamp((t - 146.4) / 0.6); if (li > 0) { ctx.save(); ctx.globalAlpha *= li; for (const [x, y] of [[160, 1080], [230, 1070], [290, 1085], [862, 790], [878, 792]]) ehGlow(ctx, x, y, 14, 0.9, '#ffd27a'); ctx.restore(); }
  // swallows (146.4)
  for (let i = 0; i < 3; i++) { const u = (t - 146.4 - i * 0.3) / 2.2; if (u > 0 && u < 1) bird(ctx, { kind: 'sparrow', x: 900 - 800 * u + i * 30, y: 560 - i * 30 + 12 * Math.sin(u * 9 + i), s: 0.2, dir: -1, fly: true, flap: Math.sin(tc * 22 + i * 1.7), pal: 1 }); }
  // the gold ring the ribbons draw (145.2 - )
  if (t >= 145.2) { const p = K.clamp((t - 145.2) / 2.2); ctx.save(); ctx.globalAlpha *= 0.9 * (1 - K.clamp((t - 147.6) / 1.0)); ctx.shadowColor = '#ffd36a'; ctx.shadowBlur = 16; ctx.strokeStyle = '#ffe08a'; ctx.lineWidth = 8; ctx.beginPath(); ctx.ellipse(470, 500 + 60 + 120, 270, 90, 0, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * p); ctx.stroke(); ctx.restore(); }
  // the riders
  const ps = h5PsF(H), PF = { lid: ehLid(t, 11), mouth: 'smile', gaze: [1, 0.2], handL: h5Loc(H, ps, EH_EBG.mane[5], EH_SEAT2.front), handR: [40, -112], lurch: 0.03 + idleSway(tc, 31, 0.02, 2.2) };
  const PR = { lid: ehLid(t, 3), mouth: 'smile', gaze: [1, 0.2], handL: [50, -110], handR: [60, -112], lurch: idleSway(tc, 37, 0.02, 2.3) };
  if (t >= 143.6 && t < 145.2) { PF.handL = [40, -200]; PF.handR = [60, -196]; PF.mouth = 'open'; PF.gaze = [-1, 0]; PF.dir = -1; PR.handR = h5Loc(H, h5PsR(H), EH_EBG.knob, EH_SEAT2.rear, EH_SEAT2.rearDy); PR.eyes = 'wide'; PR.mouth = 'o'; PR.lurch = 0.1; }
  if (t >= 147.4) { const w = Math.sin(tc * 10); PF.handR = [20, -210 + 20 * w]; PR.handL = [20, -214 - 20 * w]; PF.gaze = [0, 0.2]; PR.gaze = [0, 0.2]; PF.dir = 1; }
  castFinish(ctx, H.x, H.y + 60 * H.s, 760 * H.s, 1000 * H.s, (c) => { ehWindRibbons(c, H, tc, { ang: Math.sign(H.dir) > 0 ? Math.PI + 0.05 : -0.05, len: 260 }); h5Pair(c, H, PF, PR, t, { veil: { stream: 1 }, cape: { stream: 1, ang: Math.sign(H.dir) > 0 ? Math.PI * 0.94 : Math.PI * 0.06 } }); }, { rim: '#ffd0a0', light: [1, -1], rimW: 2.5 });
  h1DeckFront(ctx, t, { pal: 'sunset', y: 1080, a: 0.85, speed: 0.4 });
  ctx.restore();
  // counters 1 and 2 over the riders (143.08 - 144.3), THE END
  if (t >= 143.08 && t < 144.6) { const hd = h5RiderHeads(H, PF, PR), a = K.clamp((144.6 - t) / 0.3); const P = (p) => [500 + (p[0] - 500) * z, 615 + (p[1] - 615) * z];
    ctx.save(); ctx.globalAlpha *= a; S.counter(ctx, 1, P(hd.f)[0] + 40, P(hd.f)[1] - 90, K.clamp((t - 143.08) / 0.3), { size: 84 }); S.counter(ctx, 2, P(hd.r)[0] - 50, P(hd.r)[1] - 90, K.clamp((t - 143.3) / 0.3), { size: 84 }); ctx.restore(); }
  if (t >= 144.3) S.title(ctx, 'THE END', 500, 200, K.clamp((t - 144.3) / 0.9), { size: 104, align: 'center', glow: '#ff7ad9' });
}
