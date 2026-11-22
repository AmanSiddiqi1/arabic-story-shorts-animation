// ===== HORSE-02: shot list, overlays (lettering, picture clouds, the map card), the knob insert, the eye close-up, sound =====
const H2_DUR = 151.49;   // narration 147.49 + plan end_hold 4.0
const H2_SHOTS = [
  { a: 0, b: 1.9, panel: h2SkyPanel }, { a: 1.9, b: 5.6, panel: h2LeverInsert }, { a: 5.6, b: 21.34, panel: h2SkyPanel }, { a: 21.34, b: 25.72, panel: h2CityPanel },
  { a: 25.72, b: 82.84, roof: true }, { a: 82.84, b: 83.5, panel: h2KnobInsert }, { a: 83.5, b: 88.3, roof: true }, { a: 88.3, b: 90.04, panel: h2EyesCU },
  { a: 90.04, b: 98.35, roof: true }, { a: 98.35, b: 121.38, garden: true }, { a: 121.38, b: 124.48, panel: h2MoonInsert }, { a: 124.48, b: 126.7, garden: true }, { a: 126.7, b: 1e9, roof: true },
];
const H2_CUTS = [1.9, 5.6, 21.34, 25.72, 82.84, 83.5, 88.3, 90.04, 121.38, 124.48, 126.7];
function h2Shot(t) { for (const s of H2_SHOTS) if (t >= s.a && t < s.b) return s; return H2_SHOTS[H2_SHOTS.length - 1]; }
const h2P = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];
// a balloon in the sky band with its tail to a head (panel units), kept inside the panel
function h2SayAt(ctx, S, steps, t, head, o = {}) {   // rows split on '\n'; the tail leaves the last row toward the head
  if (t < steps[0][0] || (o.gone && t > o.gone + 0.25)) return; let txt = steps[0][1], t0 = steps[0][0]; for (const [ts, tx] of steps) if (t >= ts) { txt = tx; t0 = ts; }
  const rows = txt.split('\n'), size = o.size || 46, half = Math.max(...rows.map((r) => r.length)) * size * 0.36 + size * 0.6, x = K.clamp(head[0] + (o.dx || 0), 30 + half, 970 - half);
  const y0 = K.clamp(head[1] - (o.up || 150) - (rows.length - 1) * size * 2.05, 110, 1000), pop = 1 + 0.12 * Math.max(0, 1 - (t - t0) / 0.2), p = K.clamp((t - steps[0][0]) / 0.3);
  ctx.save(); if (o.gone && t > o.gone) ctx.globalAlpha *= 1 - K.clamp((t - o.gone) / 0.25); ctx.translate(x, y0); ctx.scale(pop, pop); ctx.translate(-x, -y0);
  rows.forEach((r, i) => S.label(ctx, r, x, y0 + i * size * 2.05, p, { size, balloon: true, to: i === rows.length - 1 ? [head[0], head[1] - 34] : null, color: o.col })); ctx.restore();
}
function h2DashArc(ctx, a, b, bend, p, col = '#ff7ad9') { const pts = K.trim(K.arcPts(a, b, bend, 40), K.clamp(p)); if (pts.length < 2) return; ctx.save(); ctx.lineCap = 'round'; ctx.setLineDash([18, 14]); ctx.shadowColor = col; ctx.shadowBlur = 14; ctx.strokeStyle = col; ctx.lineWidth = 8; K.poly(ctx, pts); ctx.stroke(); ctx.shadowBlur = 0; ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); return pts[pts.length - 1]; }

// ---------- picture clouds (drawn inside thoughtCloud, in their own world units) ----------
function h2CloudHome(c, t, phase) {   // S9: the king and Firuz at home, the palace becomes a toy far away, the flight, the lost way back
  const tc = EH_T2(t); c.drawImage(ehGardenSkyPlate(), 0, -820, 2000, 2050); c.drawImage(ehPalacePlate(), 640, -240);
  c.fillStyle = '#7ac85a'; c.fillRect(-2000, 900, 8000, 800); c.drawImage(ehFarLandPlate(), 2050, 840, 2400, 710);
  const K1 = { x: 1180, y: 900, s: 1, dir: 1, sit: 0, lid: ehLid(t, 61), handR: PERSON_HANDS.chin.R, gaze: [1, 0], mouth: 'smile', tip: idleSway(tc, 61, 0.03, 2.4) }; K1.handR = [16 + 6 * Math.sin(tc * 8), -160];
  person(c, ehDressP(EH_KING, K1)); const F1 = { x: 1360, y: 905, s: 0.82, dir: -1, lid: ehLid(t, 62), gaze: [-1, -0.3], mouth: 'smile', handR: PERSON_HANDS.chest.R }; ehCapeStand(c, F1, tc, {}); person(c, ehDressP(EH_FIRUZ, F1));
  if (t >= 67.98) { const p = K.clamp((t - 67.98) / 0.6), a = [1340, 300], b = [4100, 700]; c.save(); c.setLineDash([60, 44]); c.strokeStyle = '#e8264f'; c.lineWidth = 26; c.lineCap = 'round'; K.poly(c, K.trim(K.arcPts(a, b, 0.45, 40), p)); c.stroke(); c.restore();
    const q = K.trim(K.arcPts(a, b, 0.45, 40), p), e = q[q.length - 1]; ehRide(c, ehRigP(e[0], e[1] - 200, 1.6, 1, -0.1), 'firuz', { lid: 0, mouth: 'o', handL: [70, -110], handR: [76, -100], s: 1.6 * 0.95 / 0.9 }, t, { tc, stream: 1 }); }
  if (t >= 70.48) { const p = K.clamp((t - 70.48) / 0.4), w = [[4100, 900], [3800, 700], [3950, 500], [3600, 560], [3500, 400]]; c.save(); c.setLineDash([60, 44]); c.strokeStyle = '#2b1a3a'; c.lineWidth = 22; c.lineCap = 'round'; K.poly(c, K.trim(densify(w, 20), p)); c.stroke(); c.restore();
    if (t > 70.8) { c.save(); c.font = '900 620px "Barlow Semi Condensed"'; c.textAlign = 'center'; c.fillStyle = '#e8264f'; c.strokeStyle = '#2b1a3a'; c.lineWidth = 24; const k = K.ease.back(K.clamp((t - 70.8) / 0.25)); c.translate(3200, 300); c.scale(k, k); c.strokeText('?', 0, 0); c.fillText('?', 0, 0); c.restore(); } }
}
function h2CloudTwo(c, t, which) {   // S13: his home (turquoise domes, sun, emerald banners) and hers (blue dome, river, boats)
  if (which === 'his') { c.drawImage(ehGardenSkyPlate(), 0, -820, 2000, 2050); celShade(c, ell(1800, -80, 90, 90, 30), '#fff6d0', '#ffd87a', { off: 14, lw: 0 }); ehGlow(c, 1800, -80, 300, 0.6, '#fff2c0'); c.drawImage(ehPalacePlate(), 640, -240); c.fillStyle = '#7ac85a'; c.fillRect(0, 780, 2600, 600);
    for (const bx of [800, 1500, 1900]) { seg(c, bx, 780, bx, 420, 8, '#8a5a3a', 2); ehRibbon(c, bx, 430, 0.1, 160, 50, EH_T2(t), EH_EMERALD, { wave: 10, hz: 1.2, tip: 0.7, shade: '#126e4a' }); } }
  else { ehGrad(c, 0, -100, 1400, 900, EH_SKY.warmNight); ehMoon(c, 1150, 300, 60, t); c.drawImage(ehCityPlate(), 0, EH_CITY.top, EH_CITY.w, EH_CITY.h); }
}
function h2CloudWorry(c, t) {   // S14: the king on the steps at sunset reaching up at an empty sky; then a tiny horse lands and he smiles
  const tc = EH_T2(t); ehGrad(c, -200, -900, 2800, 2200, EH_SKY.sunset); c.drawImage(ehPalacePlate(), 640, -240); c.fillStyle = '#c8a86a'; c.fillRect(-200, 880, 2800, 500);
  const home = t >= 111.78, kx = home ? 1150 : H2_F([[108.1, 1100], [108.5, 1180], [108.85, 1180], [109.3, 1120]])(tc);
  const P = { ...walk(H2_F([[108.1, 1100], [108.5, 1180], [108.85, 1180], [109.3, 1120]]), tc, { stride: 24 }), x: kx, y: 900, s: 1, dir: 1, lid: ehLid(t, 66), gaze: home ? [1, 0.1] : [0.4, -1], mouth: home ? 'smile' : 'frown', brow: home ? 0.3 : 0.6, handR: home ? [40, -110] : [70, -230 + 6 * Math.sin(tc * 6)], handL: home ? [-40, -110] : [-30, -120] };
  if (home) P.amp = 0; person(c, ehDressP(EH_KING, P));
  if (home) { const u = ehE(tc, 111.78, 0.5), H = { x: 1450, y: 900 - 300 * (1 - u), s: 0.7, dir: -1 }; ehShadowCloud(c, 1450, 905, 200, 300 * (1 - u)); ehRide(c, H, 'firuz', { lid: 0, mouth: 'smile', handL: [70, -110], handR: [76, -100], gaze: [1, 0], s: 0.7 * 0.95 / 0.9 }, t, { tc, stream: 0 }); }
}
function ehShadowCloud(c, x, y, w, lift) { groundShadow(c, x, y, w, lift, { flat: true, color: '#2b1a3a', alpha: 0.2, fall: 300 }); }
function h2CloudReturn(c, t) {   // S18: the horse flying back along the gold river path, and a question mark
  ehGrad(c, 0, 0, 1000, 1000, EH_SKY.warmNight); ehMoon(c, 760, 230, 70, t); ehGrad(c, 0, 640, 1000, 120, [[0, '#6a7ad8'], [1, '#5a6ac8']]);
  moonPath(c, [[300, 700], [600, 700], [1000, 700]], t, 1, { w: 4, w1: 16 }); ehRiverTowers(c, 380, 520, 720, 200, 40, EH_RC_NIGHT, { lamps: true });
  const u = K.clamp((t - 144.9) / 1.4), H = ehRigP(K.lerp(1000, 560, u), K.lerp(420, 500, u), 0.7, -1, 0); ehRide(c, H, 'firuz', { lid: 0, mouth: 'smile', handL: [-48, -96], handR: [62, -100], gaze: [1, 0], s: 0.7 * 0.95 / 0.9 }, t, { tc: EH_T2(t), stream: 1, ang: 0.15 });
  if (t > 145.4) { c.save(); c.font = '900 260px "Barlow Semi Condensed"'; c.textAlign = 'center'; c.fillStyle = '#ffe08a'; c.strokeStyle = '#2b1a3a'; c.lineWidth = 12; const k = K.ease.back(K.clamp((t - 145.4) / 0.25)); c.translate(250, 400); c.scale(k, k); c.strokeText('?', 0, 0); c.fillText('?', 0, 0); c.restore(); }
}

// ---------- overlays on the roof (panel units) ----------
function h2RoofOver(ctx, t, cam, S) {
  const P = (x, y) => h2P(x, y, cam), H = h2RoofHorse(t), Pr = h2PrRoof(t), prH = Pr ? P(...ehHeadOf(Pr)) : null, fzG = h2FzState(t) === 'ground' ? h2FzGround(t, H)[0] : null, fzH = fzG ? P(...ehHeadOf(fzG)) : null;
  if (t >= 37.9 && t < 38.9 && fzH) { ctx.save(); ctx.globalAlpha *= K.clamp((38.9 - t) / 0.25); S.arrow(ctx, [fzH[0] + 40, fzH[1] + 120], P(EH_ROOF.door.x0 + 40, 820), K.clamp((t - 37.9) / 0.5), { width: 9, bend: -0.35 }); ctx.restore(); }
  if (t >= 39.25 && t < 40.3 && fzG) { const f = P(fzG.x + 40, H2_GY - 30); ctx.save(); ctx.globalAlpha *= K.clamp((40.3 - t) / 0.25); S.title(ctx, 'CLACK!', f[0] + 80, f[1] - 60, K.clamp((t - 39.25) / 0.2), { size: 70, align: 'center' }); ctx.restore(); }
  if (t >= 56.2 && t < 59.9 && prH) h2SayAt(ctx, S, [[56.2, 'WHO ARE YOU?'], [57.48, 'HOW DID YOU GET HERE?']], t, prH, { gone: 59.7, size: 46, dx: -60 });
  if (t >= 63.3 && t < 71.6 && fzH) { const p = t < 71.02 ? K.clamp((t - 63.3) / 0.7) : 1 - K.clamp((t - 71.02) / 0.4), ph = K.clamp((t - 65.78) / 0.7);
    thoughtCloud(ctx, 330, 270, 500, 340, t, { p, tail: [fzH[0] - 10, fzH[1] - 40], seed: 9, bg: '#bfe6ff', scale: K.lerp(0.26, 0.085, K.ease.inOut(ph)), at: [K.lerp(1270, 2900, K.ease.inOut(ph)), K.lerp(640, 420, K.ease.inOut(ph))], inside: (c) => h2CloudHome(c, t) }); }
  if (t >= 77.4 && t < 78.9 && prH) h2SayAt(ctx, S, [[77.4, 'YOU ARE JOKING!']], t, prH, { gone: 78.66, size: 50, dx: 230, up: 170 });
  if (t >= 73.88 && t < 74.75) { const c = P(...h2HP(H, [128, -196])); for (const tr of [73.9, 74.1, 74.3]) if (t >= tr && t < tr + 0.07) ehGlint(ctx, c[0] - 10, c[1], 30, 0.5);
    ctx.save(); ctx.globalAlpha *= K.clamp((74.75 - t) / 0.2); S.title(ctx, t < 74.1 ? 'TOK' : 'TOK TOK', c[0] - 60, c[1] - 170, K.clamp((t - 73.9) / 0.15), { size: 52, align: 'center' }); ctx.restore(); }
  if (t >= 80.94 && t < 81.85) { const kb = P(...h2HP(H, EH_EBG.knob)), lv = P(...h2HP(H, EH_EBG.lever)); ctx.save(); ctx.globalAlpha *= K.clamp((81.85 - t) / 0.15);
    S.arrow(ctx, [kb[0] - 170, kb[1] + 150], [kb[0] - 14, kb[1] + 14], K.clamp((t - 80.94) / 0.3), { width: 10 }); S.label(ctx, 'UP', kb[0] - 190, kb[1] + 190, K.clamp((t - 80.94) / 0.3), { size: 50 });
    if (t >= 81.3) { S.arrow(ctx, [lv[0] - 200, lv[1] - 110], [lv[0] - 14, lv[1] - 8], K.clamp((t - 81.3) / 0.3), { width: 10, color: '#ff7ad9' }); S.label(ctx, 'DOWN', lv[0] - 230, lv[1] - 150, K.clamp((t - 81.3) / 0.3), { size: 50 }); } ctx.restore(); }
  if (t >= 91.38 && t < 92.7 && prH) { ctx.save(); ctx.globalAlpha *= K.clamp((92.7 - t) / 0.3); S.title(ctx, 'HA HA!', prH[0] + 30 + 4 * Math.sin(t * 40), prH[1] - 130, K.clamp((t - 91.38) / 0.25), { size: 72, align: 'center' }); ctx.restore(); }
  if (t >= 93.14 && t < 98.0 && prH) h2SayAt(ctx, S, [[93.14, 'THE STRANGEST HORSE\nIN THE WORLD!']], t, prH, { gone: 97.87, size: 44, dx: 200, up: 150 });
  if (t >= 128.48 && t < 130.3) { const tw = P(EH_ROOF.towers[0] + 60 + (cam.x - 800) * 0.55, 560); ctx.save(); ctx.globalAlpha *= K.clamp((130.3 - t) / 0.25); S.arrow(ctx, [tw[0] + 120, tw[1] - 90], [tw[0] + 10, tw[1] - 20], K.clamp((t - 128.48) / 0.3), { width: 10 }); S.label(ctx, 'TWO TOWERS', K.clamp(tw[0] + 150, 200, 690), tw[1] - 120, K.clamp((t - 128.48) / 0.3), { size: 48 }); ctx.restore(); }
  if (t >= 130.24 && t < 132.2) { const dm = P(EH_ROOF.dome[0] + (cam.x - 800) * 0.2, 560); ctx.save(); ctx.globalAlpha *= K.clamp((132.2 - t) / 0.25); S.arrow(ctx, [dm[0] + 200, dm[1] - 150], [dm[0] + 60, dm[1] - 80], K.clamp((t - 130.24) / 0.3), { width: 10 }); S.label(ctx, 'BLUE DOME', K.clamp(dm[0] + 240, 200, 720), dm[1] - 180, K.clamp((t - 130.24) / 0.3), { size: 48 }); ctx.restore(); }
  if (t >= 134.9 && t < 140.5 && fzG) { const sc = P(...ehHandW(fzG, [46, -126])), k = kfn(t, [[135.74, 0], [136.42, 1], [137.44, 2], [138.3, 3], [138.95, 4], [139.38, 5], [139.9, 6]], 'lin');
    const tip = mapCard(ctx, 320, 300, k, t, { s: 0.95, pop: (t - 134.9) / 0.35, fold: (t - 139.96) / 0.4, tail: sc });
    if (tip && t < 139.96) { ctx.save(); ctx.translate(tip[0], tip[1]); ctx.rotate(-0.5); seg(ctx, 0, 0, 40, 40, 6, '#3a2a3a', 1); ctx.restore(); } }
  if (t >= 144.64 && t < 147.4 && prH) { const p = t < 146.9 ? K.clamp((t - 144.64) / 0.6) : 1 - K.clamp((t - 146.9) / 0.4); thoughtCloud(ctx, 300, 330, 400, 300, t, { p, tail: [prH[0] - 20, prH[1] - 40], seed: 4, scale: 0.4, at: [520, 560], bg: '#4a5ac0', inside: (c) => h2CloudReturn(c, t) }); }
  if (t >= 146.38 && t < 147.2) { const [x, y] = P(1190, 160); ehGlint(ctx, x, y, 34, (t - 146.38) / 0.4 % 1); }
  if (t >= 147.3) S.title(ctx, 'TO BE CONTINUED...', 500, 210, K.clamp((t - 147.3) / 0.9), { size: 70, align: 'center', glow: '#ff7ad9' });
}
// ---------- overlays in the garden ----------
function h2GardenOver(ctx, t, cam, S) {
  const P = (x, y) => h2P(x, y, cam), [fz] = h2FzGarden(t), [pr] = h2PrGarden(t), fzH = P(...ehHeadOf(fz)), prH = P(...ehHeadOf(pr));
  if (t >= 102.2 && t < 104.86) { const p = K.clamp((t - 102.2) / 0.6), sh = ehE(t, 103.66, 0.5); thoughtCloud(ctx, K.lerp(330, 270, sh), 270, K.lerp(440, 360, sh), K.lerp(320, 260, sh), t, { p: t > 104.5 ? 1 - (t - 104.5) / 0.36 : p, tail: [fzH[0], fzH[1] - 40], seed: 3, bg: '#8ad0ff', scale: K.lerp(0.26, 0.21, sh), at: [1320, 320], inside: (c) => h2CloudTwo(c, t, 'his') });
    if (t >= 103.66) thoughtCloud(ctx, 700, 270, 380, 280, t, { p: t > 104.5 ? 1 - (t - 104.5) / 0.36 : K.clamp((t - 103.66) / 0.6), tail: [prH[0], prH[1] - 40], seed: 6, bg: '#8a9ae8', scale: 0.25, at: [800, 700], inside: (c) => h2CloudTwo(c, t, 'hers') }); }
  if (t >= 108.1 && t < 113.9) { const p = t < 113.5 ? K.clamp((t - 108.1) / 0.6) : 1 - K.clamp((t - 113.5) / 0.35); thoughtCloud(ctx, 330, 260, 460, 330, t, { p, tail: [fzH[0] - 10, fzH[1] - 40], seed: 8, bg: '#ffb08a', scale: 0.27, at: [1300, 620], inside: (c) => h2CloudWorry(c, t) }); }
  if (t >= 111.12 && t < 112.6) { const hr = P(EH_PGARDEN.horseX + 60, EH_PGARDEN.wallTop - 120); ctx.save(); ctx.globalAlpha *= K.clamp((112.6 - t) / 0.3); const e = h2DashArc(ctx, hr, [-40, hr[1] - 40], 0.6, (t - 111.12) / 0.5); ctx.restore(); if (t < 111.8) ehGlint(ctx, hr[0], hr[1] + 60, 24, (t - 111.12) / 0.7); }
  if (t >= 113.02 && t < 114.3) { ctx.save(); ctx.globalAlpha *= K.clamp((114.3 - t) / 0.3); h2DashArc(ctx, [-40, 380], P(940, 905), -0.5, (t - 113.02) / 0.7, '#ffd36a'); ctx.restore(); }
  if (t >= 115.86 && t < 117.1) { const gx = P(H2_GUARDX(t), 640); ctx.save(); ctx.globalAlpha *= K.clamp((117.1 - t) / 0.25); S.title(ctx, 'TRAMP TRAMP', K.clamp(gx[0] - 80, 270, 730), Math.max(150, gx[1] - 150) + 6 * Math.abs(Math.sin(t * 9)), K.clamp((t - 115.86) / 0.25), { size: 58, align: 'center' }); ctx.restore(); }
  if (t >= 119.26 && t < 126.6) { const sp = [[119.26, 'IF YOU RETURN, SAY:'], [121.38, "THE MOON KNOWS\nTHE RIVER'S PATH"], [124.48, 'THEN I WILL KNOW YOU']]; let i = 0; while (i < 2 && t >= sp[i + 1][0]) i++;
    const st = sp[i], gone = [121.2, 124.4, 126.3][i]; h2SayAt(ctx, S, [st], t, prH, { gone, size: 44, dx: 160, up: 160, col: i === 1 ? '#ffd36a' : undefined }); }
}

// ---------- v2 (Fable 1 note 6): the password's picture (121.38 - 124.48): moon over the river, scattered glints lock into one gold path ----------
function h2MoonBg() { return ehBakeAt('h2moonbg', 1000, 1230, (c) => {
  ehGrad(c, 0, 0, 1000, 600, [[0, '#2a2a7a'], [0.5, '#4a4aa8'], [1, '#8a7ad0']]);
  ehSoftHills(c, 1000, 520, 30, '#5a5aa8', 17, 2, 620); ehRiverTowers(c, 820, 930, 560, 260, 48, EH_RC_NIGHT, { lamps: true });
  const hs = ehHouses(71, 22, -40, 760, 520, 560); hs.forEach((H) => ehHouse(c, { ...H, w: H.w * 0.8, h: H.h * 0.8 }, EH_RC_NIGHT, 1));
  c.fillStyle = '#3a3a80'; c.fillRect(0, 556, 1000, 10);   // the far bank line
  ehGrad(c, 0, 566, 1000, 480, [[0, '#2e58b8'], [0.5, '#2a4ea8'], [1, '#22408e']]);   // the water, darker toward us
  c.strokeStyle = 'rgba(160,200,255,0.35)'; c.lineWidth = 3; const R = K.rng(9); for (let i = 0; i < 26; i++) { const y = 590 + Math.pow(R(), 1.6) * 440, x = R() * 1000, l = 20 + (y - 560) * 0.12; c.beginPath(); c.moveTo(x, y); c.lineTo(x + l, y); c.stroke(); }
  ehGrad(c, 0, 1040, 1000, 190, [[0, '#4a3a5a'], [1, '#2a1f3a']]); c.fillStyle = '#5a4a6a'; c.fillRect(0, 1040, 1000, 8);   // the near bank
  for (const x of [80, 260, 900]) { c.fillStyle = '#1f1830'; c.beginPath(); c.ellipse(x, 1060, 50, 14, 0, 0, 7); c.fill(); }
}, 0.6); }
function h2MoonInsert(ctx, t, S) {
  const tc = EH_T2(t), z = 1 + 0.012 * (t - 121.38); ctx.save(); ctx.translate(500, 700); ctx.scale(z, z); ctx.translate(-500, -700);
  ctx.drawImage(h2MoonBg(), 0, 0, 1000, 1230); ehMoon(ctx, 500, 250, 92, t, 1);
  for (let i = 0; i < 2; i++) { const bx = ((140 + i * 520 + t * 16) % 1200) - 100; ctx.fillStyle = '#1a1430'; ctx.beginPath(); ctx.moveTo(bx - 40, 700 + i * 120); ctx.lineTo(bx + 40, 700 + i * 120); ctx.lineTo(bx + 26, 714 + i * 120); ctx.lineTo(bx - 26, 714 + i * 120); ctx.closePath(); ctx.fill(); seg(ctx, bx, 700 + i * 120, bx + 6, 660 + i * 120, 3, '#1a1430', 1); }
  // glints: scattered until 122.58, then they slide together in 8 drawings into one path (far bank under the moon -> near bank, widening)
  const k = t < 122.58 ? 0 : Math.min(8, Math.floor((t - 122.58) / (1 / 12))) / 8, R = K.rng(41), lock = t >= 123.25, flash = t >= 123.25 && t < 123.35 ? 1 : 0;
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.lineCap = 'round';
  for (let i = 0; i < 34; i++) { const v = (i + 0.5) / 34, y = K.lerp(572, 1036, v), hw = K.lerp(16, 150, v), cx = 500 + (R() - 0.5) * 2 * hw * 0.85, sx = 500 + (R() - 0.5) * 900, x = K.lerp(sx, cx, k), len = K.lerp(10, 46, v) * (1 + 0.3 * Math.sin(t * 3 + i * 1.7)), sh = 0.6 + 0.4 * Math.sin(t * 4 + i * 2.3);
    ctx.globalAlpha = 0.85 * sh; ctx.strokeStyle = '#ffe9a8'; ctx.lineWidth = K.lerp(2, 6, v); ctx.beginPath(); ctx.moveTo(x - len / 2, y); ctx.lineTo(x + len / 2, y); ctx.stroke(); }
  if (lock) { const pts = (sd, wk) => Array.from({ length: 21 }, (_, j) => { const v = j / 20, y = K.lerp(572, 1036, v); return [500 + sd * K.lerp(12, 150, v) * wk * (1 + 0.04 * Math.sin(t * 6 + j)), y]; });
    for (const [col, wk, a] of [['#ffd27a', 1, 0.55], ['#fff8e0', 0.38, 0.8]]) { ctx.globalAlpha = Math.min(1, a + 0.4 * flash); ctx.fillStyle = col; ctx.shadowColor = '#ffd27a'; ctx.shadowBlur = 18; ctx.beginPath(); K.poly(ctx, [...pts(-1, wk), ...pts(1, wk).reverse()], true); ctx.fill(); } }
  ctx.restore(); if (flash) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ehGlow(ctx, 500, 800, 500, 0.5, '#fff2c0'); ctx.restore(); }
  ctx.restore();
  if (t >= 121.5) { const a = K.clamp((124.48 - t) / 0.2); ctx.save(); ctx.globalAlpha *= a; S.title(ctx, 'THE MOON KNOWS', 500, 1110, K.clamp((t - 121.5) / 0.4), { size: 58, align: 'center', glow: '#ffd36a' }); S.title(ctx, "THE RIVER'S PATH", 500, 1180, K.clamp((t - 121.7) / 0.4), { size: 58, align: 'center', glow: '#ffd36a' }); ctx.restore(); }
}

// ---------- the knob insert (82.84 - 83.5): finger and thumb give the knob an eighth turn ----------
function h2InsBgRoof() { return ehBakeAt('h2insroof', 1000, 1230, (c) => { c.save(); c.filter = 'blur(10px)'; c.translate(500, 615); c.scale(1.6, 1.6); c.translate(-760, -700);
  c.drawImage(ehCitySkyPlate(true), -500, -760, 2600, 1660); c.drawImage(ehRoofFarPlate(true), -300, 420, 2200, 460); c.drawImage(ehRoofDomePlate(true), 40, 380, 580, 480); c.drawImage(ehRoofTerracePlate(true), 0, 420, 1600, 810); c.restore(); }, 0.5); }
function h2KnobInsert(ctx, t, S) {
  const tc = EH_T2(t), s = 4.2, kx = 560, ky = 640, z = 1 + 0.04 * (t - 82.84); ctx.drawImage(h2InsBgRoof(), 0, 0, 1000, 1230); ehGlow(ctx, 900, 900, 400, 0.4, '#ffd27a');
  ctx.save(); ctx.translate(500, 615); ctx.scale(z, z); ctx.translate(-500, -615);
  const k = t < 83.0 ? 0 : t < 83.15 ? 1 : 2, ang = k * Math.PI / 8, lit = t > 83.25 ? { neck: t < 83.32 ? 1 : 0.5 } : {};
  ebonyHorse(ctx, { x: kx - EH_EBG.knob[0] * s, y: ky - EH_EBG.knob[1] * s, s, dir: 1, close: true, knob: ang, lit });
  h1lessClick(ctx, kx + 8, ky, t, [83.0, 83.15]);
  ctx.save(); ctx.translate(kx + 8, ky); ctx.rotate(ang); ctx.translate(-(kx + 8), -ky); handInsert(ctx, 470, ky - 30, { s: 1.1, grip: 0.75, point: 0.3, rot: 0.1, sleeve: '#eadcc0', cuff: '#f2c040' }); ctx.restore();
  if (t > 83.25) ehGlint(ctx, kx + 8, ky - 20, 60, (t - 83.25) / 0.25);
  ctx.restore();
}
function h1lessClick(ctx, x, y, t, times) { for (const tr of times) { const u = (t - tr) / 0.4; if (u > 0 && u < 1) { ctx.save(); ctx.globalAlpha = 1 - u; ctx.strokeStyle = '#fff6c8'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(x, y, 50 + 140 * u, 0, 7); ctx.stroke(); ctx.restore(); } } }

// ---------- the eye close-up (88.3 - 90.04): the only face close-up of the film ----------
function h2EyesCU(ctx, t) {
  const tc = EH_T2(t), t3 = EH_T3(t), skin = C.skin, sk2 = '#e8a888', ln = '#6a3a3a', z = 1 + 0.02 * (t - 88.3);
  ctx.save(); ctx.translate(500, 615); ctx.scale(z, z); ctx.translate(-500, -615);
  ctx.fillStyle = skin; ctx.fillRect(-50, -50, 1100, 1330); ehGrad(ctx, 0, 700, 1000, 530, [[0, K.rgba(sk2, 0)], [1, K.rgba(sk2, 0.6)]]);
  ehGlow(ctx, 980, 520, 520, 0.55, '#ffd27a');   // the lamp from the right
  // the veil and its gold band above
  celShade(ctx, [[-40, -40], [1040, -40], [1040, 230], [820, 196], [500, 178], [180, 196], [-40, 230]], '#fffaf0', '#d8d2e8', { light: [-1, -1], off: 26, lw: 4, line: '#8a7aa8' });
  celShade(ctx, [[-40, 210], [180, 178], [500, 160], [820, 178], [1040, 210], [1040, 244], [820, 212], [500, 196], [180, 212], [-40, 244]], '#f2c040', '#c8961a', { off: 6, lw: 3, line: '#6a4a10' });
  ehBlob(ctx, 500, 214, 22, 26, EH_ROSESASH, '#c84a7a', { lw: 3, hi: '#ffc0d8' }); ehGlint(ctx, 494, 204, 26, (t3 * 0.7) % 1);
  // brows go up, lids lift, pupils grow; gold horse highlights rise and settle; one slow blink at the end
  const up = ehE(tc, 88.3, 0.5), lid = Math.max(0.15 * (1 - up), flow(t3, [[89.85, 0], [89.95, 1], [90.04, 1]])), pr = K.lerp(1, 1.25, up), hl = 14 * pulse(tc, 89.66, 0.34);
  for (const sd of [-1, 1]) { const ex = 500 + sd * 220, ey = 470;
    ctx.save(); ctx.strokeStyle = '#3a2420'; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(ex - sd * 110, 336 - 30 * up + 10); ctx.quadraticCurveTo(ex, 300 - 40 * up, ex + sd * 120, 330 - 20 * up); ctx.stroke(); ctx.restore();
    const eyePts = [...Array.from({ length: 13 }, (_, i) => { const u = i / 12; return [ex - 140 + 280 * u, ey - Math.sin(u * Math.PI) * 92 - (sd * (u - 0.5)) * 10]; }), ...Array.from({ length: 11 }, (_, i) => { const u = 1 - (i + 1) / 12; return [ex - 140 + 280 * u, ey + Math.sin(u * Math.PI) * 62]; })];
    ctx.save(); K.poly(ctx, eyePts, true); ctx.fillStyle = '#fffaf2'; ctx.fill(); ctx.clip();
    const ix = ex + sd * -6, iy = ey - 8; celShade(ctx, ell(ix, iy, 64 * pr, 70 * pr, 30), '#7a4a2a', '#4a2a1a', { light: [1, -1], off: 16, lw: 3, line: '#2a1410' }); shape(ctx, ell(ix, iy, 30 * pr, 32 * pr, 24), '#1a0f14', { lw: 0 });
    shape(ctx, ell(ix - 22, iy - 26, 14, 16, 14), '#ffffff', { lw: 0 }); shape(ctx, ell(ix + 24, iy + 20, 6, 7, 10), '#ffffff', { lw: 0 });
    ctx.save(); ctx.translate(ix + 12, iy + 6 - hl); ctx.scale(0.5, 0.5); ctx.fillStyle = '#ffd36a'; ctx.shadowColor = '#ffd36a'; ctx.shadowBlur = 16; ctx.beginPath(); ctx.moveTo(-30, 0); ctx.lineTo(20, 0); ctx.lineTo(30, -26); ctx.lineTo(40, -26); ctx.lineTo(26, 8); ctx.lineTo(20, 26); ctx.lineTo(14, 8); ctx.lineTo(-20, 8); ctx.lineTo(-26, 26); ctx.lineTo(-32, 8); ctx.closePath(); ctx.fill(); ctx.restore();
    if (lid > 0.01) { ctx.fillStyle = skin; ctx.fillRect(ex - 160, ey - 120, 320, (186) * lid); }
    ctx.restore();
    ctx.save(); ctx.strokeStyle = ln; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; const top = eyePts.slice(0, 13).map(([x, y]) => [x, y + 186 * lid * Math.sin(Math.PI * (x - ex + 140) / 280)]); K.poly(ctx, top); ctx.stroke();
    for (let i = 0; i < 4; i++) { const p = top[8 + (sd > 0 ? i : -i - 4 + 12 - 8)] || top[10]; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(p[0] + sd * 18, p[1] - 22); ctx.stroke(); }
    ctx.lineWidth = 5; K.poly(ctx, eyePts.slice(12)); ctx.stroke(); ctx.restore(); }
  for (const sd of [-1, 1]) { const ex = (x) => 500 + sd * x; celShade(ctx, [[ex(560), 220], [ex(420), 236], [ex(380), 520], [ex(400), 900], [ex(460), 1290], [ex(560), 1290]], '#fffaf0', '#d8d2e8', { light: [-1, -1], off: 20, lw: 4, line: '#8a7aa8' }); }
  const mo = flow(tc, [[88.3, 0.3], [88.9, 1], [90.04, 0.8]]); celShade(ctx, ell(500, 1010, 46 * (0.8 + 0.2 * mo), 34 * mo + 8, 24), '#8a2a3a', '#5a1a2a', { off: 8, lw: 5, line: '#5a2a2a' }); shape(ctx, ell(500, 1010 + 14 * mo, 24, 10 * mo + 2, 16), '#ff8aa0', { lw: 0 });
  ctx.save(); ctx.strokeStyle = '#c8806a'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(500, 560); ctx.quadraticCurveTo(486, 700, 470, 780); ctx.stroke(); ctx.restore();
  ehGlow(ctx, 300, 760, 160, 0.35, '#ff8aa0'); ehGlow(ctx, 700, 760, 160, 0.35, '#ff8aa0');
  ctx.restore();
}

// ---------- the scene ----------
const SCENE = {
  duration: H2_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = null;
    S.background(ctx, W, H, t, THEME.page);
    const [px, py, pw, ph] = EH_PANEL; S.box(ctx, px, py, pw, ph, 1, THEME.panel);
    const sc = h2Shot(t), shk = t > 27.46 && t < 27.8 ? 3 * (1 - (t - 27.46) / 0.34) : t > 39.25 && t < 39.45 ? 2.5 : 0, sh = shk ? [shk * Math.sin(t * 61), shk * 0.7 * Math.cos(t * 47)] : [0, 0];
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh[0], py + sh[1]); ctx.scale(pw / 1000, ph / 1230);
    if (sc.panel) sc.panel(ctx, t, S);
    else if (sc.garden) { const cam = h2GardenCam(t); ctx.save(); K.camera(ctx, 1000, 1230, cam); h2GardenWorld(ctx, t, cam); ctx.restore(); h2GardenOver(ctx, t, cam, S); }
    else { const cam = h2RoofCam(t); ctx.save(); K.camera(ctx, 1000, 1230, cam); h2RoofWorld(ctx, t, cam); ctx.restore(); h2RoofOver(ctx, t, cam, S); }
    ctx.restore();
    if (t >= 97.95 && t < 98.84) S.transition(ctx, W, H, K.clamp((t - 97.95) / 0.89), { rect: EH_PANEL, caption: 'LATER, IN THE GARDEN...' });
    for (const c of H2_CUTS) ehTracking(ctx, t, c - 0.04, 0.16);
    subtitle(ctx, W, H, t, 1);
    S.finish(ctx, W, H, t);   // the CRT pass, always last
  },
  score(k, S) {   // 8 quiet effects, each inside a narration pause (timeline gaps); master 0.6 at render
    k.bed('tape', 0, H2_DUR, 0.6);
    k.play('chime', 20.6, { note: 'E6', gain: 0.45 });    // 20.16-21.34: the blue dome glints
    k.play('blip', 39.5, { gain: 0.5 });                   // 39.06-40.22: the loose tile (CLACK)
    k.play('blip', 60.3, { gain: 0.45 });                  // 59.74-60.83: he points straight up
    k.play('blip', 79.05, { gain: 0.45 });                 // 78.66-79.52: wait! (one finger)
    k.play('glitch', 98.35, { gain: 0.55 });               // 97.87-98.84: LATER, IN THE GARDEN (tape)
    k.play('chime', 114.3, { note: 'A5', gain: 0.4 });     // 113.93-114.75: the arc lands at her feet
    k.play('blip', 132.35, { gain: 0.45 });                // 131.99-132.78: the maid waves: they are on the stairs
    k.play('chime', 147.25, { note: 'C6', gain: 0.55 });   // after the last word: TO BE CONTINUED
  },
};
window.SCENE = SCENE;
