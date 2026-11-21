// ===== HORSE-02: the sky (S1-S3, 0 - 21.34), the lever insert (1.9 - 5.6) and the river city wide (S4, 21.34 - 25.72) =====
// Panel units (1000 x 1230). S1 opens on HORSE-01's closing frame (same rig, sunset plate, sun, deck and the hand a finger-width
// from the lever) and pushes in a little. Characters on twos (EH_T2), sky, clouds and light on t.
const H2_F = (keys) => (t) => flow(t, keys);
const H2_HS = 0.9;   // the ebony horse's scale on the ground (as in HORSE-01's garden); riders scale with the rig
// HORSE-01's cloud scroll at its last frame (same velocity keys), so the clouds continue from where episode 1 stopped
const H2_SX0 = ehInteg([[75.12, -40], [90, -60], [97.18, -150], [101, -150], [108.69, -90], [122, -70], [129.8, -60], [140, -50]], 75, 140)(138.15);
const H2_SY0 = ehInteg([[75.12, 900], [76.0, 900], [78.16, 300], [80.44, 120], [90.22, 80], [94.6, 80], [94.9, 1100], [95.9, 400], [96.8, 120], [97.18, 40], [108, 20], [122, 0], [140, 0]], 75, 140)(138.15);
// cloud scroll in this episode: drifting, then UP past the horse while descending (8.02 on), then sideways with the pan
const H2_SY = ehInteg([[0, 0], [8.0, 0], [8.3, -260], [9.9, -320], [12.6, -120], [14, -30], [26, -30]], 0, 26);
const H2_SX = ehInteg([[0, -50], [9.3, -80], [12.6, -60], [13.6, -150], [20.2, -170], [21, -60], [26, -60]], 0, 26);
const H2_PAN = H2_F([[12.6, 0], [13.64, 40], [19.6, 1330], [20.2, 1400], [26, 1400]]);   // S3: the land plate slides 1400 left
const H2_LANDTOP = H2_F([[9.3, 1090], [10.5, 900], [12.56, 610], [13.6, 520], [26, 520]]);
// the rig: [t, cx, cy, s, pitch (nose up > 0)]
const H2_RIG = [
  [0, 560, 520, 0.408, 0], [1.9, 545, 470, 0.5, 0], [5.6, 540, 445, 0.55, 0], [5.8, 530, 400, 0.6, 0], [7.4, 520, 380, 0.6, 0], [8.0, 520, 385, 0.6, -0.21],
  [8.66, 520, 420, 0.6, -0.21], [9.3, 520, 470, 0.6, -0.18], [10.1, 500, 430, 0.6, -0.12], [12.56, 400, 330, 0.55, -0.16], [13.6, 330, 300, 0.5, -0.17], [21.34, 360, 300, 0.5, -0.17],
];
function h2RigKey(t) { let i = 0; while (i < H2_RIG.length - 2 && t >= H2_RIG[i + 1][0]) i++; const A = H2_RIG[i], B = H2_RIG[i + 1], u = K.ease.inOut(K.clamp((t - A[0]) / (B[0] - A[0])));
  return A.slice(1).map((v, k) => K.lerp(v, B[k + 1], u)); }
const H2_PITCH = H2_F([[7.4, 0], [8.0, -0.21], [9.3, -0.18], [10.1, -0.12], [12.56, -0.16], [13.6, -0.17]]);
function h2SkyHorse(t) {
  const tc = EH_T2(t); let [cx, cy, s, pitch] = h2RigKey(t); if (t >= 7.4) pitch = H2_PITCH(t);
  cy += idleSway(tc, 5, 6, 2.6); pitch += idleSway(tc, 6, 0.012, 3.1);
  const lit = t >= 5.05 ? ehLitMax(ehPowerOn(t, 5.05, 0.2, 0.3), {}) : {};
  return ehRigP(cx, cy, s, 1, pitch, { lit, reveal: t < 5.8 ? 0.8 : t < 7.4 ? 0.5 * (1 - ehE(t, 6.6, 0.8)) : 0, lever: t >= 5.0 ? 0.5 : 0 });
}
const h2Loc = (lx, ly) => [(lx + 8) * 0.9 / 0.95 - 22, (ly + 238) * 0.9 / 0.95 - 52];
function h2SkyRider(t, H) {
  const tc = EH_T2(t), sd = 3, P = { lid: ehLid(t, sd), mouth: 'closed', handL: [70, -110], handR: [76, -100], sq: breathe(tc, sd, 0.016), lurch: 0.06 + idleSway(tc, 31, 0.025, 2.2), gaze: [0.6, 0.4], brow: 0 };
  const lv = h2Loc(EH_EBG.lever[0] + 10, EH_EBG.lever[1] + 4), mane = (j) => { const [mx, my] = EH_EBG.mane[j]; return h2Loc(mx - 6, my - 6); }, hug = () => { P.handL = mane(4); P.handR = mane(2); };
  if (t < 5.6) { P.handR = [lv[0] + tremble(tc, 1.2, 7), lv[1]]; P.handL = [76, -112]; P.lurch = 0.28; P.gaze = [0.9, 0.1]; P.brow = -0.2; P.lid = Math.max(P.lid, 0.2); }
  else if (t < 5.8) { P.handR = [lv[0] - 14, lv[1] + 12]; P.handL = [76, -112]; P.lurch = 0.22; P.gaze = [0.8, 0.2]; P.eyes = 'wide'; }
  else if (t < 7.4) { hug(); P.eyes = 'wide'; P.lurch = 0.12 + tremble(tc, 0.006, 5); P.gaze = t < 6.6 ? [0.2, 1] : [0.9, -0.15]; P.lid = Math.max(ehLid(t, sd, [6.62]), 0); P.sq *= 1.01; }
  else if (t < 8.66) { hug(); const back = flow(tc, [[7.4, 0], [8.0, 1], [8.66, 1]]); P.lurch = 0.12 - 0.22 * back - lagged((u) => 0.22 * flow(u, [[7.4, 0], [8.0, 1], [8.66, 1]]), tc, 0.1, 0.5); P.eyes = 'wide'; P.mouth = t > 8.0 ? 'o' : 'closed'; P.gaze = [0.3, 1]; P.brow = -0.5; }
  else if (t < 10.08) { hug(); P.eyes = t < 9.4 ? 'shut' : 'wide'; P.mouth = 'frown'; P.lurch = -0.06; P.brow = -0.5; P.gaze = [0.2, 1]; }
  else if (t < 11.22) { const ex = flow(tc, [[10.08, 0], [10.5, 1], [11.0, 0.7], [11.22, 0.5]]); P.sq *= 1 - 0.06 * ex; P.drop = 12 * ex + lagged((u) => 12 * flow(u, [[10.08, 0], [10.5, 1], [11.0, 0.7], [11.22, 0.5]]), tc, 0.12, 0.6); P.lid = 0.7 * ex; P.mouth = t < 10.6 ? 'o' : 'smile'; P.lurch = 0.2 * ex; hug(); }
  else if (t < 11.84) { const nk = h2Loc(110, -250); P.handR = [nk[0], nk[1] - 10 * Math.abs(Math.sin((tc - 11.22) * Math.PI / 0.15))]; P.handL = t > 11.5 ? [K.lerp(-34, 24, ehE(tc, 11.5, 0.3)), -212] : [60, -110]; P.mouth = 'smile'; P.lid = 0.3; P.gaze = [0.5, 0.6]; P.drop = 5; }
  else if (t < 12.56) { P.lurch = 0.02; P.gaze = [0.3, 1]; P.brow = 0.4; P.mouth = 'smile'; P.handL = [70, -110]; P.handR = [76, -100]; P.sq *= 1.02; }
  else if (t < 13.6) { P.lurch = 0.16 + idleSway(tc, 31, 0.02, 2.2); P.handR = [30, -214]; P.handL = [70, -108]; P.gaze = [0.4, 1]; P.brow = 0.3; }
  else if (t < 15.14) { P.gaze = [0.25 + 0.15 * Math.sin(tc * 0.8), 1]; P.mouth = 'o'; P.brow = 0.4; }
  else if (t < 16.0) { const ARC = [[15.14, 0], [15.5, 0.5], [16.0, 1]], u = flow(tc, ARC), ang = K.lerp(-0.3, 2.4, u); P.handR = [36 + Math.cos(ang) * 80, -160 - Math.sin(ang) * 60]; const g = flow(tc - 0.12, ARC); P.gaze = [Math.cos(K.lerp(-0.3, 2.4, g)) * 0.9, 0.6]; P.mouth = 'o'; P.brow = 0.5; }
  else if (t < 18.18) { P.gaze = [0.5, 0.9]; P.mouth = 'smile'; P.brow = 0.3; P.lid = Math.max(P.lid, ehBlinkAt(tc, 17.36)); }
  else if (t < 18.68) { if (t < 18.45) { P.handR = [104, -118]; P.gaze = [0.8, 0.8]; } else { P.handR = [22, -232 + 4 * Math.sin(tc * 30)]; P.gaze = [0.5, 0.7]; P.mouth = 'frown'; P.brow = -0.2; } }
  else if (t < 19.24) { P.gaze = gazePlan(tc, [[18.68, [0.4, 0.9]], [18.75, [0.9, 0.7]], [18.98, [0.5, 0.9]]], 0.06); P.lid = Math.max(P.lid, ehBlinkAt(tc, 18.76), ehBlinkAt(tc, 18.99)); P.mouth = 'o'; }
  else if (t < 20.2) { const sh = flow(tc, [[19.24, 0], [19.5, 1], [19.9, 1], [20.2, 0.3]]); P.handL = [K.lerp(70, -60, sh), K.lerp(-110, -104, sh)]; P.handR = [K.lerp(76, 66, sh), -104]; P.sq *= 1 + 0.03 * sh; P.drop = -6 * sh; P.mouth = 'frown'; P.brow = 0.6 * sh; P.gaze = t > 19.8 ? [0.9, 0.7] : [0.3, 0.8]; }
  else if (t < 21.34) { P.gaze = [0.95, 0.6]; P.tip = 0.06 * ehE(tc, 20.6, 0.4); P.mouth = 'o'; P.eyes = t > 20.6 ? 'wide' : 'open'; P.lid = Math.max(P.lid, ehBlinkAt(tc, 20.66)); }
  else { P.gaze = [0.9, 0.7]; P.mouth = 'smile'; P.brow = 0.3; P.lurch = 0.1 + 0.12 * ehE(tc, 24.96, 0.5); }
  return P;
}
// the sunset / dusk mix of the sky plate (sunset until the deck swallows the frame, then dusk)
function h2SkyMix(t) { return K.clamp((t - 8.8) / 0.4); }
function h2Deck(t) { if (t < 8.0) return 760 - 15 * ehE(t, 5.8, 2); return kfn(t, [[8.0, 745], [8.66, 520], [9.3, -560]], 'in'); }
function h2Underside(t) { return t < 9.3 || t > 10.2 ? null : kfn(t, [[9.3, 1300], [10.2, -420]], 'out'); }
function h2SkyPanel(ctx, t, S) {
  const tc = EH_T2(t), H = h2SkyHorse(t), mix = h2SkyMix(t), sy = H2_SY0 + H2_SY(t), sx = H2_SX0 + H2_SX(t);
  // plates: sunset (episode 1's closing plate) and dusk below the deck
  if (mix < 1) ctx.drawImage(ehSkyPlate('sunset'), 0, 0, 1000, 1230); if (mix > 0) ehImg(ctx, ehSkyPlate('dusk'), 0, 0, 1000, 1230, mix);
  if (t < 9.3) { const sun = [620, 740 + 12 * t, 92]; ehGlow(ctx, sun[0], sun[1], sun[2] * 5, 0.7, '#ffc890'); celShade(ctx, ell(sun[0], sun[1], sun[2], sun[2], 40), '#ffd27a', ehMix('#ffd27a', '#ff9a5a', 0.3), { light: [-1, -1], off: 14, lw: 0 }); ehRays(ctx, sun[0], sun[1], t, 1.2);
    ctx.save(); ctx.globalCompositeOperation = 'screen'; ehGlow(ctx, 620, 760, 360, 0.5, '#ff9a7a'); ctx.restore(); }
  else { ehGlow(ctx, 880, 180, 120, 0.4, '#ffe6b8'); celShade(ctx, ell(880, 180, 26, 26, 24), '#ffeab8', '#f2cf98', { off: 5, lw: 0 }); }
  // the land below (dusk): rises into view after the deck, then the S3 pan
  if (t >= 9.3) ehFarLand(ctx, H2_PAN(t), H2_LANDTOP(t), t, { caravan: K.clamp((t - 14.3) / 0.8), lit: [K.clamp((t - 17.34) / 0.5), K.clamp((t - 17.7) / 0.5), K.clamp((t - 18.1) / 0.6)], glintDome: t > 20.5 && t < 21.3 ? (t - 20.5) / 0.8 : 0 });
  if (t >= 9.3) { const ly = H2_LANDTOP(t); ehGrad(ctx, 0, ly - 90, 1000, 150, [[0, 'rgba(255,190,170,0)'], [0.6, 'rgba(255,196,170,0.85)'], [1, 'rgba(255,200,170,0)']]); }
  const pal = t < 9.0 ? 'sunset' : 'dusk';
  ehTile(ctx, ehCloudTile('far', pal), sx * 0.2, sy * 0.2, t >= 9.3 ? 0.45 : 0.8); ehTile(ctx, ehCloudTile('mid', pal), sx * 0.5 + 300, sy * 0.5 + 500, t >= 9.3 ? 0.55 : 0.9);
  const deck = h2Deck(t), deckFront = t >= 8.66 && t < 9.4;
  if (!deckFront && t < 8.66) { ehDeck(ctx, deck, sx, t, 'sunset'); const k = K.clamp(1 - (deck - 520) / 300); ctx.save(); ctx.globalAlpha = 0.2; ctx.fillStyle = '#7a4a8a'; ctx.beginPath(); ctx.ellipse(H.x + 40, deck + 30, 230 * H.s * (0.4 + 0.6 * k), 22 * H.s * (0.4 + 0.6 * k), 0, 0, 7); ctx.fill(); ctx.restore(); }
  // the horse's tiny shadow sliding over the land (S3)
  if (t >= 12.0) { const ly = H2_LANDTOP(t) + 260; ctx.save(); ctx.globalAlpha = 0.25; ctx.fillStyle = '#5a3a6a'; ctx.beginPath(); ctx.ellipse(H.x + 60, ly, 34, 6, 0, 0, 7); ctx.fill(); ctx.restore(); }
  // swallows scatter from its path as it drops out of the deck (out of sync)
  if (t > 9.34 && t < 10.6) for (let i = 0; i < 2; i++) { const u = (t - 9.34 - i * 0.12) / 1.2; if (u > 0) bird(ctx, { kind: 'sparrow', pal: 1, x: 560 + (i ? 1 : -1) * 520 * u, y: 640 - 260 * u + 40 * Math.sin(u * 6), s: 0.32, dir: i ? 1 : -1, fly: true, flap: Math.sin(tc * 26 + i * 2) }); }
  if (t > 13 && t < 21.34) for (let i = 0; i < 3; i++) bird(ctx, { kind: 'sparrow', pal: 1, x: 900 - ((t - 13) * 40 + i * 50) % 1100, y: 560 + i * 24 + 10 * Math.sin(t + i), s: 0.18, dir: -1, fly: true, flap: Math.sin(tc * 24 + i * 1.3) });
  // the rig: wind ribbons, cape, horse and Firuz (sunset rim before the deck)
  const PP = h2SkyRider(t, H); PP.s = EH_FIRUZ.s * H.s / H2_HS; const pitch = -H.rot, back = Math.PI - pitch;
  const capeAng = flow(t, [[7.4, Math.PI * 0.94], [8.2, Math.PI + 0.45], [12.6, Math.PI + 0.42], [13.6, Math.PI + 0.3]]);
  const draw = (c) => { ehWindRibbons(c, H, tc, { ang: back + (t >= 7.4 ? -0.25 : 0.1), len: 200 }); ehRide(c, H, 'firuz', PP, t, { tc, stream: 1, ang: capeAng }); };
  if (t < 9.0) castFinish(ctx, H.x, H.y + 60 * H.s, 700 * H.s, 900 * H.s, draw, { rim: '#ff9a6a', light: [1, 0.4], rimW: 3 }); else castFinish(ctx, H.x, H.y + 60 * H.s, 700 * H.s, 900 * H.s, draw, { rim: '#ffc8e0', light: [1, -0.6], rimW: 2.5 });
  // entering the deck: wisps curl up where it goes in; the deck in front swallows the frame
  if (deckFront) { ehDeck(ctx, deck, sx, t, 'sunset'); if (t < 9.1) for (const sd of [-1, 1]) { const u = (t - 8.7) / 0.4; if (u > 0) { ctx.save(); ctx.globalAlpha = 1 - u; ctx.drawImage(ehCloudSprite(1, 'sunset'), H.x + sd * 90 * H.s - 90, deck - 60 - 60 * u, 180, 60); ctx.restore(); } } }
  const us = h2Underside(t); if (us != null) { const pal2 = EH_CLOUDC.dusk; ctx.fillStyle = ehMix(pal2[1], '#ffffff', 0.3); if (us > 0) ctx.fillRect(0, 0, 1000, us); ctx.save(); ctx.translate(0, us); ctx.scale(1, -1); const img = ehDeckStrip('dusk'); ctx.drawImage(img, -((sx % 1000) + 1000) % 1000, -120, 1000, 520); ctx.drawImage(img, 1000 - ((sx % 1000) + 1000) % 1000, -120, 1000, 520); ctx.restore(); }
  // cloud scraps trailing from tail and cape after it drops out
  if (t > 9.6 && t < 10.4) { const u = (t - 9.6) / 0.8, [tx, ty] = ehHorsePt(H, [-180, -150]); ctx.save(); ctx.globalAlpha = 0.8 * (1 - u); ctx.drawImage(ehCloudSprite(2, 'dusk'), tx - 120 - 60 * u, ty - 30 - 50 * u, 160, 54); ctx.restore(); }
  // breath puff with the PHEW
  const seat = mountSeat('horse', H), head = [seat.x + 24 * H.s, seat.y - 165 * H.s];
  if (t > 10.1 && t < 11.0) { const u = (t - 10.1) / 0.9; ctx.save(); ctx.globalAlpha = 0.75 * (1 - u); ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.ellipse(head[0] + 40 + 70 * u, head[1] + 20 - 10 * u, 14 + 24 * u, 9 + 14 * u, 0, 0, 7); ctx.fill(); ctx.restore(); }
  if (t > 5.6 && t < 5.9) { const [x, y] = ehHorsePt(H, EH_EBG.chest); ehGlint(ctx, x, y, 30, (t - 5.6) / 0.3); }
  h2SkyOver(ctx, t, S, H, head);
}
function h2SkyOver(ctx, t, S, H, head) {
  if (t < 3.4) { const a = 1 - K.clamp((t - 3.0) / 0.4); ctx.save(); ctx.globalAlpha *= a;
    S.title(ctx, 'LOST ABOVE', 500, 170, K.clamp((t - 0.3) / 0.9), { size: 78, align: 'center' }); S.title(ctx, 'THE CLOUDS', 500, 262, K.clamp((t - 0.45) / 0.9), { size: 78, align: 'center' });
    if (t > 0.8) S.title(ctx, 'تائه فوق الغيوم', 500, 368, K.clamp((t - 0.8) / 0.9), { size: 70, align: 'center', font: 'Lalezar', glow: '#8a5cff' }); ctx.restore(); }
  if (t >= 10.3 && t < 11.6) { ctx.save(); ctx.globalAlpha *= K.clamp((11.6 - t) / 0.3); S.title(ctx, 'PHEW!', head[0] + 190, head[1] - 90 - 20 * K.clamp((t - 10.3) / 1.2), K.clamp((t - 10.3) / 0.3), { size: 70, align: 'center' }); ctx.restore(); }
  if (t >= 18.68 && t < 20.6) { const pan = H2_PAN(t), ly = H2_LANDTOP(t); EH_FAR.towns.slice(0, 2).forEach(([tx, ty], i) => { const a = 18.68 + i * 0.25; if (t < a) return; const x = tx - pan, y = ly + ty - 110; if (x < -60 || x > 1060) return;
    ctx.save(); ctx.globalAlpha *= K.clamp((20.6 - t) / 0.4); const pop = 1 + 0.15 * Math.max(0, 1 - (t - a) / 0.2); ctx.translate(x, y); ctx.scale(pop, pop); S.label(ctx, '???', 0, 0, K.clamp((t - a) / 0.25), { size: 48 }); ctx.restore(); }); }
}
// ---------- the lever insert (1.9 - 5.6): fingers find the lever, the thumb wipes the arrow, a slow turn, the brass powers on ----------
function h2InsBgSky() { return ehBakeAt('h2insbg', 1000, 1230, (c) => { c.save(); c.filter = 'blur(6px)'; ehGrad(c, 0, 0, 1000, 1230, EH_SKY.sunset); const [b, u] = EH_CLOUDC.sunset;
  for (const [x, y, s] of [[200, 300, 1.4], [800, 520, 1.2], [450, 900, 1.8], [900, 1100, 1.5]]) ehCloud(c, x, y, 420 * s, 120 * s, b, u, 12, x); c.restore(); }, 0.5); }
const H2_LEVER = H2_F([[3.64, 0], [3.8, -0.04], [3.92, 0.12], [4.3, 0.3], [4.6, 0.42], [5.0, 0.5], [5.6, 0.5]]);
function h2LeverInsert(ctx, t, S) {
  const tc = EH_T2(t), s = 4.2, lx = 520, ly = 560, z = 1 + 0.035 * K.clamp((t - 1.9) / 3.7);
  ctx.drawImage(h2InsBgSky(), 0, 0, 1000, 1230); const cu = ((t * 18) % 1400) - 300; ctx.save(); ctx.globalAlpha = 0.5; ctx.drawImage(ehCloudSprite(2, 'sunset'), cu, 980, 600, 180); ctx.restore();
  ctx.save(); ctx.translate(500, 615); ctx.scale(z, z); ctx.translate(-500, -615);
  const lev = t < 3.64 ? 0 : H2_LEVER(tc), lit = t >= 5.02 ? { neck: t < 5.1 ? 1 : 0.4 } : {};
  const H = { x: lx - EH_EBG.lever[0] * s, y: ly - EH_EBG.lever[1] * s, s, dir: 1, close: true, reveal: 1, lever: lev, lit };
  ebonyHorse(ctx, H);
  const la = lev + 2.2, tip = ehHorsePt(H, [EH_EBG.lever[0] + Math.cos(la) * 38, EH_EBG.lever[1] + Math.sin(la) * 38]);
  // the light: a band across the engraved plate when the thumb wipes it, the glint on the ball tip, the power-on glow
  if (t > 2.86 && t < 3.7) ehBand(ctx, [lx - 140, ly - 120, 280, 240], (t - 2.9) / 0.7, { angle: 0.5, w: 90, alpha: 0.6, col: '#ffe0a0' });
  if (t > 2.15 && t < 2.25) ehGlint(ctx, tip[0], tip[1], 70, 0.5);
  if (t >= 5.02) { ehGlow(ctx, lx, ly, 260, 0.6 * (t < 5.12 ? 1.4 : 0.8), '#ffd36a'); for (let j = 0; j < 4; j++) { const [mx, my] = ehHorsePt(H, [EH_EBG.mane[j][0], EH_EBG.mane[j][1] - 12]), u = (t - 5.05 - j * 0.08) / 0.35; if (u > 0 && u < 1) ehGlint(ctx, mx, my, 40, u); } }
  // the hand: fingers walk along the block edge (1.9 - 2.1), close on the ball (2.1 - 2.5), thumb wipe, tighten and draw back, the turn, let go
  let hx = tip[0] - 36, hy = tip[1] + 30, grip = 1, rot = -0.35;
  if (t < 2.1) { const k = Math.min(2, Math.floor((tc - 1.9) / 0.08)); hx -= [150, 100, 60][k]; hy += [60, 40, 18][k]; grip = 0; }
  else if (t < 2.5) grip = K.clamp((tc - 2.1) / 0.3);
  if (t > 2.86 && t < 3.6) rot -= 0.06 * Math.sin((tc - 2.86) * 8);
  if (t >= 3.64 && t < 3.92) { hx -= 6 * pulse(tc, 3.64, 0.28); grip = 1.1; }
  if (t >= 5.2) { const u = ehE(tc, 5.2, 0.3); hx -= 40 * u; hy += 26 * u; grip = 1 - 0.7 * u; }
  handInsert(ctx, hx + (t > 5.2 ? tremble(t, 1.2, 6) : 0), hy, { s: 0.95, grip, rot, sleeve: '#eadcc0', cuff: '#f2c040' });
  ctx.restore();
}
// ---------- S4: the river city at dusk (plate world), the horse coming in small ----------
const H2_CITYCAM = [[21.34, { x: 700, y: 730, zoom: 0.8 }], [25.72, { x: 770, y: 720, zoom: 0.84 }]];
const H2_CHX = H2_F([[21.34, -80], [22.0, 200], [24.96, 700], [25.72, 860]]), H2_CHY = H2_F([[21.34, 180], [22.0, 250], [24.96, 410], [25.72, 470]]);
function h2CityHorse(t) { const tc = EH_T2(t), turn = t < 24.96 ? 0 : Math.min(3, Math.floor((tc - 24.96) / 0.2) + 1), dir = [1, 0.8, 0.62, 0.5][turn], s = K.lerp(0.28, 0.22, ehE(t, 21.34, 4.4));
  return ehRigP(H2_CHX(t), H2_CHY(t) + idleSway(tc, 5, 4, 2.6), s, dir, -0.17 - 0.06 * (turn / 3)); }
function h2CityPanel(ctx, t, S) {
  const cam = K.camAt(H2_CITYCAM, t), tc = EH_T2(t); ctx.save(); K.camera(ctx, 1000, 1230, cam);
  riverCity(ctx, t, { lit: flow(t, [[24.24, 0], [25.4, 1.1]]), band: t > 23.02 && t < 23.9 ? (t - 23.02) / 0.8 : 0 });
  // doves leave the palace parapet
  if (t > 23.1 && t < 25.0) for (let i = 0; i < 3; i++) { const u = (t - 23.1 - i * 0.12) / 1.6; if (u > 0 && u < 1) bird(ctx, { kind: 'dove', pal: 0, x: 900 + i * 50 + 380 * u, y: 550 - 300 * u + 20 * Math.sin(u * 9 + i), s: 0.22, dir: 1, fly: true, flap: Math.sin(tc * 22 + i * 1.7) }); }
  const H = h2CityHorse(t), PP = { lid: ehLid(t, 3), mouth: 'smile', handL: [70, -110], handR: [76, -100], gaze: [0.9, 0.6], lurch: 0.08 + (t > 24.96 ? 0.16 * ehE(tc, 25.06, 0.4) : 0), brow: 0.3, s: EH_FIRUZ.s * H.s / H2_HS };
  const rx = ehHorsePt(H, [0, 0])[0]; ehGlow(ctx, rx, rx < 450 ? 900 : 700, 30, 0.5, '#fff2d0');   // its reflection on the river
  ehWindRibbons(ctx, H, tc, { ang: Math.PI + 0.2, len: 160, a: 0.5 }); ehRide(ctx, H, 'firuz', PP, t, { tc, stream: 1, ang: Math.PI + 0.35 + (t > 24.96 ? 0.4 * ehE(tc, 25.1, 0.4) : 0) });
  ctx.restore();
  const P = (x, y) => [500 + (x - cam.x) * cam.zoom, 615 + (y - cam.y) * cam.zoom], seat = mountSeat('horse', H), rider = P(seat.x, seat.y - 120 * H.s), roof = P(EH_CITY.palace[0] + 40, EH_CITY.palace[1] - 268);
  if (t >= 22.04 && t < 23.4) { ctx.save(); ctx.globalAlpha *= K.clamp((23.4 - t) / 0.3); S.arrow(ctx, [rider[0] + 30, rider[1] + 30], roof, K.clamp((t - 22.04) / 0.3), { width: 11, bend: -0.25 }); S.label(ctx, 'THAT ROOF!', Math.min(820, roof[0] + 40), roof[1] - 120, K.clamp((t - 22.1) / 0.3), { size: 48 });
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = K.rgba('#fff2c0', 0.8 * K.clamp((t - 22.3) / 0.3)); ctx.lineWidth = 4; const a = P(EH_CITY.palace[0] - 186, EH_CITY.palace[1] - 268), b = P(EH_CITY.palace[0] + 186, EH_CITY.palace[1] - 268); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); ctx.restore(); ctx.restore(); }
}
