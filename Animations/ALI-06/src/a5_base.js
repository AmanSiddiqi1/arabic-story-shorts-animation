// ===== ALI-05 "The Unexpected Guest": story machinery (prefixed a5 / A5_). Small helpers copied from ALI-04 a4_base.js (windows,
// held steps, wobble, glyphs, the light streak, the cat), the market world with the new shop, the views through the dinner room's
// window and door, the merchant's switch-on smile, pose bases. Shots are pushed by a5_s1..a5_s6.js (AB_SHOTS, a3_base.js dispatch).
const A5_DSH = '#3a2a4a', A5_ESH = '#7a4a5a', A5_NSH = '#4a3a7a', A5_RSH = '#8a4a3a';   // ground shadows: day, evening, night, room
const a5Win = (t, a, b, fa = 0.2, fb = 0.2) => K.clamp((t - a) / fa) * (1 - K.clamp((t - b) / fb));   // 0..1..0 over [a, b]
const a5Step = (t, a, d, n = 2) => Math.floor(K.clamp((t - a) / d) * n + 1e-6) / n;                 // held drawings (n steps)
const a5Wob = (t, t0, amp, f = 3, d = 5) => (t < t0 ? 0 : amp * Math.exp(-(t - t0) * d) * Math.sin(2 * Math.PI * f * (t - t0)));
const a5Cam = (keys, e = 'inOut') => (t) => K.camAt(keys, t, e);
// camera key from the plan's camX (left edge of the view at that zoom) to the engine's centre
const a5CX = (camX, zoom = 1, y = null) => ({ x: camX + 500 / zoom, y: y ?? 1230 - 615 / zoom, zoom });
// a balloon kept in the panel (abSay clamps x itself since the ALI-02 series change; y kept on screen)
function a5Say(ctx, S, steps, t, x, y, to, o = {}) { abSay(ctx, S, steps, t, x, K.clamp(y, 110, 1120), to, { thin: true, ...o }); }
// the pose base: blinks on threes, a moving hold on twos (sway, breath), shared by every figure
function a5Base(t, seed, P = {}) { const tc = AB_T2(t); return { lid: abLid(t, seed), tip: idleSway(tc, seed + 1, 0.018, 2.6 + (seed % 7) * 0.2), sq: breathe(tc, seed + 2, 0.014), ...P }; }
// glyph shapes (drawn, not lettering): question -> exclamation, a drop
function a5Glyph(ctx, kind, x, y, s = 1, p = 1) { if (p <= 0) return; const k = K.ease.back(K.clamp(p)); ctx.save(); ctx.translate(x, y); ctx.scale(s * k, s * k); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const out = (f) => { ctx.strokeStyle = '#2b1a3a'; ctx.lineWidth = 14; f(); ctx.stroke(); ctx.strokeStyle = '#7fe3ff'; ctx.lineWidth = 8; f(); ctx.stroke(); };
  if (kind === 'q') { out(() => { ctx.beginPath(); ctx.arc(0, -22, 14, Math.PI * 1.1, Math.PI * 0.4); ctx.lineTo(0, 4); }); ctx.fillStyle = '#7fe3ff'; ctx.beginPath(); ctx.arc(0, 22, 6, 0, 7); ctx.fill(); }
  else { out(() => { ctx.beginPath(); ctx.moveTo(0, -38); ctx.lineTo(0, 6); }); ctx.fillStyle = '#ffd36a'; ctx.beginPath(); ctx.arc(0, 22, 7, 0, 7); ctx.fill(); }
  ctx.restore(); }
// the cat (Library cat pal 2, s 0.55): tail and ears always alive
function a5Cat(ctx, t, P, shc = A5_DSH) { const tc = AB_T2(t); a3Shadow(ctx, P.x, (P.gy ?? P.y) + 2, 60, 0, shc);
  cat(ctx, { s: 0.55, pal: 2, sit: 1, tailCurl: 0.6 + 0.3 * osc(tc, 2.3), ears: 0.4 + idleSway(tc, 91, 0.25, 1.7), lid: abLid(t, 93), tip: idleSway(tc, 92, 0.02, 3), ...P }); }

// ---------- the merchant's switch-on smile: the SAME keys every time (mechanical on purpose) ----------
// returns pose fields for the smile switched on at t0 (three held drawings), a glint life on the teeth
const A5_SMILE_T = [9.4, 10.14, 10.76, 17.0];
function a5Smile(tc, t0) { const u = tc - t0; if (u < 0) return null; const st = Math.min(2, Math.floor(u / 0.09));
  return { mouth: ['closed', 'smile', 'grin'][st], lid: [0.3, 0.45, 0.6][st], brow: [0.6, 0.1, -0.3][st], tip: 0.08 * Math.sin(Math.PI * K.clamp(u / 0.6)), glint: u > 0.25 && u < 0.7 ? (u - 0.25) / 0.45 : 0 }; }

// ---------- the market world (the ALI-03 market plate rebuilt with room for the shop at x 960..1260 and the storehouse corner) ----------
const A5_MKT = { w: 2000, palace: false, sky: false, palette: 'clear', stalls: [{ x: 320, kind: 'fruit', w: 240 }, { x: 700, kind: 'cloth', w: 240, cols: ['#e8364f', '#ffd36a'] }],
  props: [['barrel', 520, {}], ['basket', 880, {}], ['sacks', 1380, {}], ['pots', 1690, {}]] };
function a5MarketPlate() {
  return abBakeAt('a5market', 2000, 1230, (c, w) => {
    abGrad(c, 0, 0, w, 1230, [[0, '#4f94ec'], [0.3, '#8cc0f6'], [0.5, '#cfe6ff'], [0.62, '#fff2d6']]); abGlaze(c, 1500, 170, 560, '#fff8e0', 0.55);
    for (const [x, y, s] of [[250, 150, 1], [900, 100, 0.8], [1500, 190, 1.1], [1900, 120, 0.9]]) abCloud(c, x, y, 380 * s, 86 * s, '#ffffff', '#e0ecff', 9);
    abSun(c, 1500, 170, 58, '#fff6c8', '#ffe8a0', 0.9);
    marketStreet(c, { ...A5_MKT, t: 0 });
    a3Arch(c, 'day', 1750);
    abDress(c, 0, 1700, 940, 1215, 47, { stones: 12, tufts: 16, flowers: 10, stone: ['#e0c8a8', '#a08070'] });
  });
}
// the storehouse corner post (x 1255..1305): a plastered pier the merchant peeks round (front pass)
function a5Post(ctx) { celShade(ctx, K.rectPts(1262, 380, 46, 522), '#f0d6b0', '#c8a478', { light: [-1, -1], off: 10, lw: 3.5, line: '#7a5a3a' }); seg(ctx, 1256, 384, 1314, 384, 12, '#c8643a', 2); }
function a5Market(ctx, t, cam, o = {}) { ctx.drawImage(a5MarketPlate(), 0, 0); abFlock(ctx, t, -200, 230, 120, 4, 7, 0.42);
  shopFront(ctx, t, { awning: o.awning ?? 1, bounce: o.bounce || 0, sign: o.sign ?? 0.04 * Math.sin(AB_T2(t) * 2.2) }); }

// ---------- the views through the dinner room's window (the street) and door (the courtyard) ----------
// the street outside the window (TS street at 0.32 around Ali Baba's neighbours); o.m 'evening' | 'night'; o.fig(ctx) figures (street world)
function a5StreetView(ctx, t, o = {}) { const W = DR.win; a5Mini(ctx, W.x + W.w / 2, W.y + W.h - 30, o.wx ?? 700, 900, o.s ?? 0.36, (c) => { tsPlates(c, { x: 1000, y: 615, zoom: 1 }, o.m || 'evening', null, 0, (cc) => tsMoon(cc, 700, 300, 1, 60)); tsLanterns(c, t, 1); if (o.fig) o.fig(c); }); }
// the courtyard through the door (CY yard at 0.36 around the gate), lantern, lemon tree, jars, the gate (o.bar), o.fig(ctx) yard world
function a5YardView(ctx, t, o = {}) { const D = DR.door; a5Mini(ctx, (D.x0 + D.x1) / 2, D.bot - 40, o.wx ?? 760, 900, o.s ?? 0.4, (c) => {
  cySky(c, { x: 1100, y: 615, zoom: 1 }, 'night'); cyMoon(c, { x: 1100, y: 615, zoom: 1 }, 1000, 170, 1, 50); c.drawImage(cyPlate('night'), 0, 0); cyGate(c, t, 'night', { bar: o.bar ?? 1 });
  cyLemon(c, t, 'night'); cyLanterns(c, t, 1); for (let i = 0; i < 3; i++) oilJar(c, 900 + 115 * i, CY.jarY, CY.jarS, {}); if (o.fig) o.fig(c); }); }
