// ===== AN-083 main: set, camera, effects, verse insets, the gold insert, lettering, transition, sound =====
// ---------- camera (world view 1000 x 1230; keys from the plan, paired for holds; 0.01 s pairs are cuts) ----------
// v2: every hold longer than 2 s puts the feet at about 85 % of the panel height (AN83_FY) and is tight enough that heads read on a phone.
const AN83_FY = (z, f = 0.85) => AN83_GR - (f * AN83_VH - 615) / z;
const an83Ck = (t, x, z, f) => [t, { x, y: AN83_FY(z, f), zoom: z }];
const AN83_CAM = [
  [0, { x: 500, y: 640, zoom: 1.0 }], [0.4, { x: 500, y: 640, zoom: 1.0 }], an83Ck(6.0, 560, 1.3), an83Ck(7.0, 590, 1.3), an83Ck(10.8, 650, 1.75),
  an83Ck(11.6, 630, 2.0), an83Ck(15.8, 630, 2.0), an83Ck(17.0, 650, 2.1), an83Ck(18.3, 655, 2.1), an83Ck(19.6, 680, 2.25), an83Ck(19.99, 680, 2.25),
  an83Ck(20.0, 990, 1.3), an83Ck(23.2, 990, 1.3), [24.6, { x: 1330, y: 690, zoom: 1.05 }], [29.0, { x: 1330, y: 690, zoom: 1.05 }],
  an83Ck(29.9, 1345, 1.6), an83Ck(37.4, 1345, 1.6), an83Ck(38.7, 1440, 1.5), an83Ck(39.99, 1440, 1.5),
  an83Ck(40.0, 1335, 2.3), an83Ck(43.99, 1335, 2.3), an83Ck(44.0, 1690, 1.6), an83Ck(44.79, 1690, 1.6),
  an83Ck(44.8, 1345, 1.75), an83Ck(48.99, 1345, 1.75),
  an83Ck(49.0, 1290, 1.75), an83Ck(49.4, 1290, 1.75), an83Ck(50.5, 1200, 1.75), an83Ck(54.3, 1200, 1.75), an83Ck(54.9, 1140, 2.0), an83Ck(58.8, 1140, 2.0), an83Ck(59.9, 1300, 1.5), an83Ck(60.09, 1300, 1.5),
  an83Ck(60.1, 1275, 2.1), an83Ck(64.3, 1275, 2.1), [65.6, { x: 1260, y: 770, zoom: 2.4 }], [69.89, { x: 1260, y: 770, zoom: 2.4 }],
  an83Ck(69.9, 1215, 1.6), an83Ck(70.39, 1215, 1.6),
  an83Ck(70.4, 1330, 1.75), an83Ck(72.5, 1330, 1.75), an83Ck(73.6, 1390, 1.45), an83Ck(80.23, 1390, 1.45),
  an83Ck(80.24, 1500, 2.4), an83Ck(84.5, 1495, 2.55), an83Ck(90.4, 1495, 2.55), an83Ck(90.55, 1330, 2.0), an83Ck(92.0, 1330, 2.0),
  an83Ck(92.7, 1400, 1.5), an83Ck(97.9, 1400, 1.5), [99.4, { x: 1440, y: 650, zoom: 1.8 }], [100.17, { x: 1440, y: 650, zoom: 1.8 }],
  an83Ck(100.18, 1440, 1.6), an83Ck(107.89, 1440, 1.6),
  an83Ck(107.9, 1430, 1.9), an83Ck(110.3, 1430, 1.9), an83Ck(111.6, 1340, 1.45), an83Ck(141.2, 1340, 1.45), an83Ck(143.4, 1400, 1.6), an83Ck(144.05, 1400, 1.6),
  an83Ck(144.06, 1290, 2.0), an83Ck(148.6, 1290, 2.0), an83Ck(150.4, 1360, 1.55), an83Ck(151.7, 1345, 1.5), an83Ck(158.49, 1345, 1.5),
  an83Ck(158.5, 1400, 1.6), an83Ck(160.6, 1400, 1.6), [165.1, { x: 1250, y: 640, zoom: 1.0 }], [AN83_DUR, { x: 1250, y: 640, zoom: 1.0 }]];
function an83Cam(t) { const c = K.camAt(AN83_CAM, t), z = c.zoom; return { x: K.clamp(c.x, 500 / z, AN83_WW - 500 / z), y: K.clamp(c.y, 615 / z, AN83_VH - 615 / z), zoom: z }; }
const an83P = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];
const an83Insert = (t) => t >= 65.84 && t < 69.9;
const AN83_SUNSET = [300, 470];   // panel point where the sun sits at the end (just above the far dune at the final framing)
const AN83_U = () => 0.25, AN83_WARM = (t) => kfn(t, [[161.6, 0], [165.1, 1]], 'inOut');
// the sun fades out whenever an inset or a sky icon row needs that corner
const AN83_SUNOFF = [[79.0, 80.24], [110.28, 121.65], [124.38, 135.25], [137.16, 144.6], [154.2, 158.5]];
const an83SunA = (t) => AN83_SUNOFF.reduce((a, [p, q]) => Math.min(a, 1 - K.clamp(Math.min((t - p + 0.3) / 0.3, (q + 0.3 - t) / 0.3))), 1);
// footfall dust (sampled once)
const AN83_FALLS = [...footfalls(AN83_MXA, 0.5, 10.3, 29 * 0.8), ...footfalls(AN83_MXB, 20.0, 23.4, 29 * 0.7).map((f) => ({ ...f, big: true })), ...footfalls(an83X1, 20.0, 23.55, 29 * 0.75 * 0.98), ...footfalls(an83X2, 20.0, 23.7, 29 * 0.75 * 0.95)];

// ---------- the world ----------
function an83Sky(ctx, t, cam) {
  const u = AN83_U(t); skyCycle(ctx, u, { w: AN83_WW, sun: false, moon: false, hills: false, stars: false, t });
  ctx.save(); ctx.globalAlpha = 0.28 * (1 - K.clamp((u - 0.25) / 0.17)); const g = ctx.createLinearGradient(0, 0, 0, 900); g.addColorStop(0, '#fffaf0'); g.addColorStop(1, '#ffe9a0'); ctx.fillStyle = g; ctx.fillRect(0, 0, AN83_WW, 900); ctx.restore();
  { const w = AN83_WARM(t); if (w > 0) { ctx.save(); ctx.globalAlpha = 0.8 * w; const g2 = ctx.createLinearGradient(0, 0, 0, 900); g2.addColorStop(0, '#ffcf7a'); g2.addColorStop(1, '#ff9a4a'); ctx.fillStyle = g2; ctx.fillRect(0, 0, AN83_WW, 900); ctx.restore(); } }
  // the sun stays in the top left of the frame (sky-locked); it sinks and warms at the end
  const k = AN83_WARM(t), px = K.lerp(170, AN83_SUNSET[0], k), py = K.lerp(175, AN83_SUNSET[1], k), sw = [cam.x + (px - 500) / cam.zoom, cam.y + (py - 615) / cam.zoom], sa = an83SunA(t);
  const pulseS = (1 + 0.12 * pulse(t, 3.0, 1.0)) * (1 + 0.15 * k);
  if (sa > 0.01) { ctx.save(); ctx.globalAlpha *= sa; ctx.translate(sw[0], sw[1]); ctx.scale(pulseS / cam.zoom, pulseS / cam.zoom); sun(ctx, 0, 0, t);
  if (k > 0) { ctx.save(); ctx.globalAlpha *= 0.7 * k; ctx.fillStyle = '#ff7a1a'; ctx.beginPath(); ctx.arc(0, 0, 66, 0, 7); ctx.fill(); ctx.restore(); }
  if (t < 30) { ctx.globalAlpha = 0.5 * (1 - K.clamp((t - 23) / 6)); ctx.lineWidth = 6; ctx.strokeStyle = C.white; for (let i = 0; i < 2; i++) { const r = 130 + ((t * 40 + i * 50) % 100); ctx.globalAlpha *= 1; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.stroke(); } }
  ctx.restore(); }
}
function an83Girls(ctx, F, behind) { for (const P of F.g) if (!P.hidden && !!P.behind === behind) an83Draw(ctx, F, P); }
function an83Draw(ctx, F, P) { const k = P === F.M ? 'M' : P === F.m1 ? 'm1' : P === F.m2 ? 'm2' : 'g' + F.g.indexOf(P); for (const f of F.pre[k]) f(ctx); person(ctx, P); for (const f of F.post[k]) f(ctx); }
function an83World(ctx, t, cam) {
  const F = an83F(t), { M, m1, m2, g } = F, camX = cam.x - 500 / cam.zoom;
  an83Sky(ctx, t, cam);
  desertRoad(ctx, { w: AN83_WW, sky: false, road: false, milestones: [], palms: [[420, 520, 20]], rocks: [1750], thorns: [250, 985], camX, t, sun: false });
  an83Heat(ctx, camX, camX + 1000 / cam.zoom + 90, 900, t, t < 24 ? 1 : t > 162 ? 0.6 : 0.35);
  // girls rising behind the dune lip
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, AN83_WW, 902); ctx.clip(); an83Girls(ctx, F, true); ctx.restore();
  desertRoad(ctx, { w: AN83_WW, front: true, lip: { crest: [1560, 850] } });
  // ground shadows (long and to the right in the late light)
  const sk = AN83_B(t, 162.44, 2.7);
  for (const P of [M, m1, m2, ...g]) if (!P.hidden && !P.behind) an83Shadow(ctx, P.x, P.y, 46 * P.s, sk);
  // hot wind streaks in the pause (6.2-7.0)
  if (an83In(t, 6.1, 7.2)) { ctx.save(); ctx.lineCap = 'round'; for (let i = 0; i < 3; i++) { const u = K.clamp((t - 6.15 - i * 0.12) / 0.8); if (u <= 0 || u >= 1) continue; const x = 980 - u * 900, y = 860 + i * 22; ctx.globalAlpha = Math.sin(Math.PI * u) * 0.8; ctx.lineWidth = 6; ctx.strokeStyle = '#fff3c8'; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 80, y - 14, x + 180, y); ctx.stroke(); } ctx.restore(); }
  // cast, back to front
  const cast = [m2, m1, g[2], g[1], g[0], M].filter((P) => !P.hidden && !P.behind).sort((a, b) => a.y - b.y);
  for (const P of cast) an83Draw(ctx, F, P);
  for (const f of F.top) f(ctx);
  // footfall dust
  for (const f of AN83_FALLS) if (t >= f.t && t < f.t + 0.5) dustBurst(ctx, f.x + 8, AN83_GR - 4, t - f.t, f.big ? 5 : 3, 5, f.big ? 13 : 9, f.big ? 30 : 20, 0.45, Math.round(f.t * 10));
  an83Fx(ctx, t, F, cam);
}
// ---------- world effects ----------
function an83Fx(ctx, t, F, cam) {
  const { M, m1, m2, g } = F;
  // sweat drop from Ma'an's chin (10.5-11.1)
  if (an83In(t, 10.5, 11.2)) { const h = an83HeadW(M); an83Drop(ctx, h[0] + 6 * M.dir, fallY(t, 10.55, 11.15, h[1] + 40, AN83_GR - 6), 7); }
  // the one drop that misses (11.5-11.95), a puff where it lands
  if (an83In(t, 11.4, 12.4)) { const h = an83HeadW(m1), x0 = h[0] + 30 * m1.dir; if (t < 11.95) { const y = fallY(t, 11.4, 11.95, h[1] - 90, AN83_GR - 8), x = x0 + 22 * m1.dir * K.clamp((t - 11.4) / 0.55); an83Drop(ctx, x, y, 8, '#4a90e8'); shape(ctx, ell(x - 2.5, y - 3, 2.2, 3.2, 8), C.white, { lw: 0 }); }
    else { dustBurst(ctx, x0 + 22 * m1.dir, AN83_GR - 6, t - 11.95, 5, 4, 10, 26, 0.45, 7); ctx.save(); ctx.globalAlpha = 0.8 * (1 - K.clamp((t - 11.95) / 0.4)); ctx.lineWidth = 3; ctx.strokeStyle = '#7a4212'; ctx.beginPath(); ctx.ellipse(x0 + 22 * m1.dir, AN83_GR - 2, 10 + 40 * (t - 11.95), 4 + 8 * (t - 11.95), 0, 0, 7); ctx.stroke(); ctx.restore(); } }
  // Ma'an drinks: a drop runs down his chin; man2's splash
  if (an83In(t, 43.3, 44.1)) { const h = an83HeadW(M); an83Drop(ctx, h[0] + 16 * M.dir, fallY(t, 43.3, 44.1, h[1] + 22, h[1] + 200), 6, '#4a90e8'); }
  if (m2.splash) { const h = an83HeadW(m2); for (let i = 0; i < 6; i++) { const u = ((t * 1.7 + i / 6) % 1), a = -Math.PI / 2 + (i - 2.5) * 0.45; an83Drop(ctx, h[0] + Math.cos(a) * (30 + 50 * u), h[1] - 40 + 60 * u * u + Math.sin(a) * 30 * (1 - u), 6); } }
  // Ma'an's satisfied breath (43.3-43.9)
  if (an83In(t, 43.3, 43.95)) { const h = an83HeadW(M), u = (t - 43.3) / 0.65; ctx.save(); ctx.globalAlpha = Math.sin(Math.PI * u) * 0.9; cloudFlat(ctx, h[0] + (40 + 50 * u) * M.dir, h[1] + 10 - 20 * u, 0.25 + 0.2 * u); ctx.restore(); }
  // the tapped tip rings (82.2-83.3)
  if (F.tapAt && an83In(t, 82.7, 83.4)) soundArcs(ctx, F.tapAt[0] + 14, F.tapAt[1] - 10, 1, t, C.white);
  // girl3 holds an arrow to the sun (83.6-84.7)
  if (F.g3Tip && t >= 83.2) an83Glow(ctx, F.g3Tip[0], F.g3Tip[1] + 60, 50, t, an83Fade(t, 83.2, 84.0, 0.2));
  // the raised arrow (94.9-100.18): glow, the big burst on "gold"
  if (F.g1Tip && t >= 95.2 && t < 100.18) an83Glow(ctx, F.g1Tip[0], F.g1Tip[1] + 70, t >= 99.5 ? 70 + 30 * pulse(t, 99.5, 0.7) : 58, t, an83Fade(t, 95.2, 100.18, 0.3) * (t >= 98.1 ? 1 : 0.6));
  // three open hands and a heart above the girls (93.52-94.8)
  if (an83In(t, 93.52, 94.85)) { ctx.save(); ctx.globalAlpha = an83Fade(t, 93.52, 94.85, 0.15); for (let i = 0; i < 3; i++) { const k = K.ease.back(K.clamp((t - 93.55 - i * 0.12) / 0.25)); if (k > 0) an83HandIcon(ctx, 1450 + i * 75, 560, 1.3 * k); } const k = K.ease.back(K.clamp((t - 94.0) / 0.3)); if (k > 0) heart(ctx, 1525, 470, 34 * k); ctx.restore(); }
  // counting off: badges 1, 2, 3 over the raised hands (105.0-106.0)
  if (an83In(t, 104.96, 106.1)) for (let i = 0; i < 3; i++) { const st = 105.0 + i * 0.3; if (t < st + 0.05) continue; const h = an83HandW(g[i], 1); ctx.save(); ctx.globalAlpha = an83Fade(t, st, 106.1, 0.12); if (an83Badge(ctx, h[0], h[1] - 60, 30, (t - st) / 0.25, C.yellow)) { ctx.font = `44px ${BF}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = C.black; ctx.fillText(String(i + 1), h[0], h[1] - 58); } ctx.restore(); }
  // the scroll of verses (105.92-107.3)
  if (an83In(t, 105.92, 107.4)) { ctx.save(); ctx.globalAlpha = an83Fade(t, 105.92, 107.4, 0.15); an83Scroll(ctx, 1540, 545, 220, (t - 105.95) / 0.4, (t - 106.4) / 0.8); ctx.restore(); }
  // the memory of the water (148.64-150.4): a small frozen inset beside girl1's skin
  if (an83In(t, 148.64, 150.45)) { const P = g[0], w = an83W(P, -40, -128); an83Inset(ctx, w[0] - 150, w[1] - 150, 110, K.clamp((t - 148.64) / 0.35) * K.clamp((150.45 - t) / 0.3), C.yellow, (c) => an83Memory(c, t), '#f6e2a8'); }
}

// ---------- verse insets (each in its own 460 x 460 space, ground y 380) ----------
const AN83_VZ = (c, f, z = 1.7, dx = 0) => { c.save(); c.translate(230, 390); c.scale(z, z); c.translate(-230 + dx, -390); f(); c.restore(); };
const AN83_HELM = (c, P) => { const h = an83HeadW(P), s = P.s; shape(c, an83Close([[h[0] - 38 * s, h[1] - 6 * s], [h[0] - 34 * s, h[1] - 34 * s], [h[0], h[1] - 50 * s], [h[0] + 34 * s, h[1] - 34 * s], [h[0] + 38 * s, h[1] - 6 * s]]), STONE, { lw: 4, seed: 890, dot: STONED, pitch: 5, rad: 0.2, da: 0.5 }); seg(c, h[0], h[1] - 50 * s, h[0], h[1] - 64 * s, 5, C.red, 2); };
function an83InsetGround(c, col = '#edc65a') { shape(c, an83Close([[-10, 380], [470, 380], [470, 470], [-10, 470]]), col, { lw: 5, seed: 891, dot: C.red, pitch: 10, rad: 0.18, da: 0.35 }); }
function an83Verse1(c, t) {
  c.fillStyle = dotPat(c, '#f4c86a', 12, 0.25); c.fillRect(0, 0, 460, 460);
  AN83_VZ(c, () => {
  const sp = AN83_B(t, 117.6, 0.5); if (sp > 0) { c.save(); c.globalAlpha = sp; shape(c, an83Close([[40, 380], [40, 312], [110, 296], [175, 320], [195, 380]]), '#c98a3a', { lw: 4, seed: 892 }); an83Spears(c, 95, 312, 0.5); an83Spears(c, 140, 306, 0.45); c.restore(); }
  an83InsetGround(c);
  const s = 0.55, walkX = (tt) => an83Path(tt, [[118.06, 320], [119.4, 262, 'inOut']]);
  const W = { costume: 'bedouin', pal: AN83_PAL.maan, age: 0.3, s, y: 380, x: 320, dir: -1, seed: 93, mouth: 'smile' };
  // the poor man (and a second one later)
  const P1 = { costume: 'villager', pal: { robe: '#b9a27a', dot: '#7a6a4a' }, age: 0.6, s: 0.52, x: 128, y: 380, dir: 1, kneel: 1, seed: 94, handL: [92, -165], handR: [104, -190], gaze: [0.6, -0.6], mouth: t > 115.2 ? 'smile' : 'closed', wet: t > 115.0 };
  if (t < 114.68) P1.lid = 0.3;
  person(c, P1);
  const sec = AN83_B(t, 117.7, 0.4); if (sec > 0) { c.save(); c.globalAlpha = sec; person(c, { costume: 'villager', pal: { robe: STONE, dot: STONED }, age: 0.4, s: 0.5, x: 205, y: 380, dir: 1, kneel: 1, seed: 95, handL: [92, -165], handR: [104, -190], gaze: [0.5, -0.7], mouth: t > 119.2 ? 'smile' : 'closed' }); c.restore(); }
  // the warrior
  if (t < 118.06) { W.handL = [-40, -82]; W.handR = [40, -82]; if (t >= 112.9) { W.aL = [1.5, 1.55]; W.handR = an83St(t, [[112.9, [80, -152]], [113.0, [80, -152]], [113.1, [14, -148], 0.38], [113.5, [70, -150], 0.12]], 0.2, AN83_DR); W.sq = anticipate(t, 112.98, 0.45, 0.04); } }
  else { W.x = walkX(t); Object.assign(W, { ph: W.x / (29 * 0.6 * s), amp: 0.6 * K.clamp(Math.abs(speed(walkX, t)) / 20) }); W.handR = t > 118.9 ? an83St(t, [[118.9, AN83_DR], [119.0, [60, -100]]], 0.25, AN83_DR) : AN83_DR; W.handL = [-30, -110]; }
  person(c, W); AN83_HELM(c, W);
  if (t < 118.06) { const h = an83HandW(W, -1); if (t >= 112.9) an83Bow(c, h[0], h[1], Math.PI, { s: 0.45, pull: t < 113.5 ? 16 * AN83_B(t, 113.0, 0.4) : 0 }); else an83Bow(c, h[0] - 4, h[1] - 20, -0.3, { s: 0.45 }); }
  else { const h = an83HandW(W, -1); an83Bow(c, h[0], h[1] - 10, 0.3, { s: 0.45 }); if (t < 119.3) { const r = an83HandW(W, 1); an83Arrow(c, r[0] + 34, r[1] + 8, Math.PI * 0.15, { s: 0.6, head: 1.8, fl: 0.8, glint: K.clamp((t - 118.8) / 0.4) }); } }
  // the arrow's flight on a dotted gold arc, then bread and a coin
  const hh = an83Lerp(an83HandW(P1, -1), an83HandW(P1, 1), 0.5), A = [285, 300], Bp = [215, 150], Cc = [hh[0] + 6, hh[1] - 4];
  if (t >= 113.5 && t < 114.68) { const u = K.clamp((t - 113.5) / 1.18), q = (k) => [(1 - k) * (1 - k) * A[0] + 2 * (1 - k) * k * Bp[0] + k * k * Cc[0], (1 - k) * (1 - k) * A[1] + 2 * (1 - k) * k * Bp[1] + k * k * Cc[1]];
    c.save(); c.fillStyle = C.yellow; c.strokeStyle = C.black; c.lineWidth = 2; for (let k = 0; k < u; k += 0.06) { const p = q(k); c.beginPath(); c.arc(p[0], p[1], 4, 0, 7); c.fill(); c.stroke(); } c.restore();
    const p = q(u), p2 = q(Math.min(1, u + 0.02)); an83Arrow(c, p[0], p[1], Math.atan2(p2[1] - p[1], p2[0] - p[0]), { s: 0.7, head: 1.7, fl: 0.8 }); }
  if (t >= 114.68) { const h = hh; if (t < 115.2) an83Arrow(c, h[0] + 4, h[1] - 36, -Math.PI / 2 + 0.3, { s: 0.7, head: 1.8, fl: 0.8, glint: (t - 114.68) / 0.5 });
    else { const k = K.ease.back(K.clamp((t - 115.2) / 0.3)); an83Bread(c, h[0] + 8, h[1] - 18, 1.35 * k); an83Coin(c, h[0] - 20, h[1] - 50, 21 * k, t * 3); } }
  });
}
function an83Verse2(c, t) {
  const dusk = AN83_B(t, 132.94, 0.6);
  c.fillStyle = '#ffe1c8'; c.fillRect(0, 0, 460, 460); if (dusk > 0) { c.save(); c.globalAlpha = dusk; const gr = c.createLinearGradient(0, 0, 0, 380); gr.addColorStop(0, '#c8301a'); gr.addColorStop(1, '#f08a3a'); c.fillStyle = gr; c.fillRect(0, 0, 460, 380); an83Spears(c, 60, 380, 0.7); an83Spears(c, 400, 380, 0.7); an83Spears(c, 230, 300, 0.5); c.restore(); }
  c.fillStyle = dotPat(c, '#e2701a', 12, 0.2); c.fillRect(0, 0, 460, 460);
  AN83_VZ(c, () => {
  an83InsetGround(c, dusk > 0.5 ? '#c98a3a' : '#edc65a');
  const s = 0.55, app = 1, F2 = {};
  // friend (left) and foe (right)
  const fr = K.ease.back(K.clamp((t - 128.88) / 0.35)), fo = K.ease.back(K.clamp((t - 130.22) / 0.35));
  if (fr > 0.01) { const P = { costume: 'villager', s: 0.52 * fr, x: 118, y: 380, dir: 1, seed: 96, mouth: 'open', talk: 0.5 + 0.5 * Math.abs(Math.sin(t * 14)), aL: [-2.5, -2.8], aR: [2.5, 2.8], gaze: [0.5, -0.6] }; person(c, P); }
  const catchK = AN83_B(t, 130.55, 0.4);   // the foe drops his guard and cups his hands
  if (fo > 0.01) { const br = an83St(t, [[130.22, 0.9], [130.55, -0.6, 0.4]]); const P = { costume: 'bedouin', pal: { robe: '#3a3a4a', dot: '#1a1a24', cape: '#5a2a1a', hc: C.black, hd: '#3a3a4a' }, age: 0.4, s: 0.52 * fo, x: 342, y: 380, dir: -1, seed: 97, brow: br, mouth: t > 130.6 ? 'o' : 'frown', eyes: t > 130.6 ? 'wide' : 'open', handR: an83Lerp([40, -120], [44, -112], catchK), handL: an83Lerp([-40, -100], [30, -106], catchK), gaze: [-0.6, -0.5] };
    // the spear: held, then planted upright behind him
    const h = an83HandW(P, 1), sp = an83Lerp([h[0], h[1]], [392, 300], catchK); c.save(); c.translate(sp[0], sp[1]); c.rotate(-0.15 * (1 - catchK)); seg(c, 0, 60 + 20 * catchK, 0, -150, 6, '#7a4212', 2.5); shape(c, an83Close([[0, -175], [-9, -148], [9, -148]]), STONE, { lw: 2.5 }); c.restore();
    person(c, P); F2.foeHands = an83Lerp(an83HandW(P, -1), an83HandW(P, 1), 0.5);
    if (catchK > 0.9) { const hh = F2.foeHands; for (let k = 0; k < Math.min(4, Math.floor((t - 130.95) / 0.25) + 1); k++) an83Coin(c, hh[0] - 8 + k * 6, hh[1] - 6 - k * 5, 9, k); } }
  if (fr > 0.01) F2.friendHands = an83HandW({ costume: 'villager', s: 0.52 * fr, x: 118, y: 380, dir: 1, aL: [-2.5, -2.8], aR: [2.5, 2.8] }, 1);
  // the giver
  if (app > 0.01) { const P = { costume: 'bedouin', pal: AN83_PAL.maan, age: 0.3, s: s * app, x: 230, y: 380, dir: 1, seed: 98, mouth: 'smile' }; if (t >= 126.76) { const u = AN83_B(t, 126.76, 0.4); P.handL = an83Lerp(AN83_DL, [-95, -150], u); P.handR = an83Lerp(AN83_DR, [95, -150], u); }
    an83Local(c, P, (k) => an83Quiver(k, 30, -190, { rot: 0.4, n: 6, open: 1 })); person(c, P); AN83_HELM(c, P);
    // the shower of gold to both sides, without a break
    if (t >= 128.12) { const hl = an83HandW(P, -1), hr = an83HandW(P, 1);
      for (let k = 0; k < 80; k++) { const t0 = 128.12 + k * 0.11; if (t0 > t) break; const u = (t - t0) / 0.75; if (u >= 1) continue; const L = k % 2 === 0, from = L ? hl : hr, to = L ? (F2.friendHands || [128, 300]) : (F2.foeHands || [332, 300]), x = K.lerp(from[0], to[0], u), y = K.lerp(from[1], to[1], u) - 120 * Math.sin(Math.PI * u);
        if (k % 4 < 2) an83Coin(c, x, y, 15, t * 8 + k); else an83Arrow(c, x, y, L ? Math.PI + 0.6 * (u - 0.5) * 2 : 0.6 * (u - 0.5) * 2, { s: 0.5, head: 1.7, fl: 0.7 }); } } }
  const lab = (txt, x, y, a) => { if (t < a) return; c.save(); c.globalAlpha = K.clamp((t - a) / 0.2); c.font = `30px ${BF}`; c.textAlign = 'center'; c.lineWidth = 6; c.strokeStyle = C.black; c.fillStyle = C.white; c.strokeText(txt, x, y); c.fillText(txt, x, y); c.restore(); };
  lab('FRIEND', 140, 205, 129.0); lab('FOE', 330, 205, 130.35);
  }, 1.45);
}
function an83Verse3(c, t) {
  c.fillStyle = dotPat(c, '#9cc4ff', 12, 0.22); c.fillRect(0, 0, 460, 460);
  AN83_VZ(c, () => { an83InsetGround(c, '#e6c27a');
  const app = 1;
  c.save(); c.globalAlpha = app;
  const kn = AN83_B(t, 141.2, 0.4), bow = AN83_B(t, 142.9, 0.5);
  const D = { costume: 'physician', age: 0.8, s: 0.52, x: 140, y: 380, dir: 1, seed: 99, kneel: kn, handR: t < 141.2 ? (t > 139.2 ? [60, -104] : AN83_DR) : [86, -120], handL: t < 141.2 ? AN83_DL : [70, -110], gaze: [0.7, 0.4], lid: Math.max(bow, blink(t, 99)), drop: 6 * bow };
  D.tip = 0.06 * pulse(t, 140.0, 0.5);
  if (t >= 141.5 && t < 142.4) D.handR = [86 + 8 * Math.sin(t * 16), -120 + 8 * Math.cos(t * 16)];
  const Sd = { costume: 'bedouin', pal: { robe: '#7a8a9a', dot: '#4a5a6a', cape: null, hc: C.white, hd: C.blue }, age: 0.25, s: 0.52, x: 238, y: 380, dir: -1, seed: 100, sit: 1, seat: 'floor', handL: [60, -110], handR: AN83_DR,
    lid: Math.max(t < 141.5 ? 0.6 : K.lerp(0.6, 0.2, AN83_B(t, 141.5, 0.8)), bow, blink(t, 100)), mouth: t > 142.2 && t < 142.9 ? 'smile' : 'frown', drop: 6 * bow };
  person(c, Sd);
  // the bandage round the soldier's arm (red cloth cross before)
  const ah = an83HandW(Sd, -1), ar = an83Lerp(an83W(Sd, -31, -132 + 4), ah, 0.55);
  if (t < 141.5) { seg(c, ar[0] - 7, ar[1] - 7, ar[0] + 7, ar[1] + 7, 4, C.red, 0); seg(c, ar[0] + 7, ar[1] - 7, ar[0] - 7, ar[1] + 7, 4, C.red, 0); }
  else { const n = Math.min(4, Math.floor((t - 141.5) / 0.22) + 1); for (let k = 0; k < n; k++) seg(c, ar[0] - 13, ar[1] - 12 + k * 7, ar[0] + 13, ar[1] - 7 + k * 7, 9, C.white, 2.5); }
  person(c, D);
  // the golden arrowhead drops into his palm
  if (t >= 139.36) { const h = an83HandW(D, 1), y = t < 139.86 ? fallY(t, 139.36, 139.86, 60, h[1] - 8) : h[1] - 8; if (t < 141.2) { c.save(); c.translate(h[0], y); c.rotate(Math.PI / 2); c.scale(1.9, 1.9); shape(c, an83Close([[0, 0], [-16, -6], [-12, 0], [-16, 6]]), C.yellow, { lw: 2, seed: 893 }); seg(c, -3, -1, -12, -3.5, 1.5, C.white, 0); c.restore(); if (t < 140.6) star(c, h[0] + 8, y - 14, 14 * Math.sin(Math.PI * K.clamp((t - 139.86) / 0.6)), C.white); } }
  // the shroud with one flower
  const sh = K.clamp((t - 142.52) / 0.5); if (sh > 0) { c.save(); c.globalAlpha *= sh; shape(c, an83Close([[300, 380], [300, 356], [372, 356], [372, 380]]), '#a8741a', { lw: 4, seed: 894 }); shape(c, an83Close([[294, 356], [294, 330], [378, 330], [378, 356]]), C.white, { lw: 4, seed: 895 }); seg(c, 300, 343, 372, 343, 2, '#c9bfa6', 0);
    const fy = t < 142.7 ? 260 : settleTo(t, 142.7, 260, 322, 0.5, 0.06); seg(c, 336, fy + 4, 356, fy + 2, 3, '#2b7a38', 0); for (let k = 0; k < 5; k++) { const a = k / 5 * Math.PI * 2; shape(c, ell(336 + Math.cos(a) * 6, fy + Math.sin(a) * 6, 5, 5, 8), C.red, { lw: 1.5 }); } shape(c, ell(336, fy, 3.5, 3.5, 8), C.yellow, { lw: 1 }); c.restore(); }
  c.restore();
  }, 1.6, -18);
}
function an83Memory(c, t) {   // the S4 handover as one frozen frame, in a 220 x 220 space
  c.fillStyle = dotPat(c, '#e8b25a', 9, 0.3); c.fillRect(0, 0, 220, 220); shape(c, an83Close([[-5, 190], [225, 190], [225, 230], [-5, 230]]), '#edc65a', { lw: 4, seed: 896 });
  const M = { costume: 'bedouin', pal: AN83_PAL.maan, age: 0.3, s: 0.4, x: 70, y: 190, dir: 1, seed: 101, handL: [92, -165], handR: [104, -190], eyes: 'wide', noBlink: true };
  const G = { costume: 'villageWoman', age: 0, s: 0.36, x: 160, y: 190, dir: -1, seed: 102, handL: [92, -165], handR: [104, -190], mouth: 'smile', noBlink: true };
  person(c, M); person(c, G); an83Skin(c, 116, 112, { fill: 1, s: 0.42, tilt: 0.15 });
}

// ---------- the gold insert (65.84-69.9): drawn instead of the world ----------
function an83InsertDraw(ctx, t) {
  const g = ctx.createLinearGradient(0, 0, 0, 1230); g.addColorStop(0, '#fffaf0'); g.addColorStop(1, '#ffd96a'); ctx.fillStyle = g; ctx.fillRect(0, 0, 1000, 1230);
  ctx.save(); ctx.globalAlpha = 0.25; ctx.fillStyle = dotPat(ctx, C.blue, 14, 0.25); ctx.fillRect(0, 0, 1000, 1230); ctx.restore();
  sun(ctx, 170, 170, t); an83Heat(ctx, 0, 1000, 1100, t, 0.6);
  const S3 = 6.0, rim = 800, glow = AN83_B(t, 69.12, 0.25);
  // the first arrow: nock first, the head last (it hangs head down from his fingers)
  // v2: the head stays hidden in the quiver until the word: slow rise, a hesitation at 67.8, 6 frames of stillness, then it clears the rim on "al-dhahab" 69.22
  const AL = 180, tipY = an83Path(t, [[65.84, rim + 740], [66.2, rim + 720, 'inOut'], [67.8, rim + 450, 'inOut'], [68.0, rim + 452], [68.7, rim + 275, 'inOut'], [68.9, rim + 275], [69.22, rim - 50, 'out'], [69.8, rim - 130, 'inOut']]), tailY = tipY - AL * S3;
  if (glow > 0) an83Glow(ctx, 500, Math.min(rim - 120, tipY - 140), 420, t, glow);
  // four more heads rise in a fan behind it
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 1000, rim + 6); ctx.clip();
  for (let k = 0; k < 4; k++) { const st = 69.25 + k * 0.08, u = AN83_B(t, st, 0.4, 'out'); if (u <= 0) continue; const a = -Math.PI / 2 + [-0.5, -0.22, 0.22, 0.5][k], tip = [500 + Math.cos(a) * (40 + 420 * u), rim + 120 + Math.sin(a) * (40 + 420 * u)];
    an83Arrow(ctx, tip[0], tip[1], a, { s: 3.2, head: 1.5, glint: K.clamp((t - st - 0.3) / 0.4) }); }
  ctx.restore();
  an83Quiver(ctx, 500, rim, { s: S3, open: 1, n: 0 });
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 1000, rim + 10); ctx.clip();
  an83Arrow(ctx, 500, tipY, Math.PI / 2, { s: S3, len: AL, head: 1.6, glint: K.clamp((t - 69.22) / 0.5) });
  ctx.restore();
  // his hand on the shaft, the blue sleeve coming in from the left
  const hy = tailY + 60 * S3;
  shape(ctx, an83Close([[-40, hy + 260], [-40, hy + 120], [440, hy - 40], [470, hy + 40]]), C.blue, { lw: 7, seed: 898, dot: NAVY, pitch: 12, rad: 0.3 });
  shape(ctx, ell(500 - 10, hy, 70, 64, 24), C.white, { lw: 7, seed: 897, dot: C.skin, pitch: 9, rad: 0.3 }); seg(ctx, 450, hy - 34, 530, hy - 44, 36, C.white, 6);
}

// ---------- panel-space lettering, counters and icons ----------
// ---------- the verse insets, in PANEL space (centre AN83_INSET, radius 300); the sun is faded out while one is open ----------
function an83Insets(ctx, t, cam) {
  const F = an83F(t), g = F.g, I = AN83_INSET, op = (a, b) => K.clamp((t - a) / 0.5) * K.clamp((b - t) / 0.3);
  // musical notes rising from each reciter into her inset
  for (const [a, b, i] of [[110.3, 112.4, 0], [124.4, 126.5, 1], [137.2, 139.3, 2]]) if (an83In(t, a, b)) { const h = an83P(...an83HeadW(g[i]), cam); for (let k = 0; k < 3; k++) { const u = K.clamp((t - a - k * 0.35) / 1.2); if (u <= 0 || u >= 1) continue; ctx.save(); ctx.globalAlpha = Math.sin(Math.PI * u); note(ctx, K.lerp(h[0] - 20, I[0] + 40 * (k - 1), u) + 14 * Math.sin(u * 9 + k), K.lerp(h[1] - 90, I[1] + I[2] + 10, u), 1.2, [C.red, C.blue, C.black][i]); ctx.restore(); } }
  const sc = (c, f) => { c.save(); c.scale(2 * I[2] / 460, 2 * I[2] / 460); f(c); c.restore(); };
  if (an83In(t, 110.28, 121.65)) an83Inset(ctx, I[0], I[1], I[2], op(110.28, 121.65), C.yellow, (c) => sc(c, (c2) => an83Verse1(c2, t)), '#fff3c8');
  if (an83In(t, 124.38, 135.25)) an83Inset(ctx, I[0], I[1], I[2], op(124.38, 135.25), C.red, (c) => sc(c, (c2) => an83Verse2(c2, t)), '#ffe1c8');
  if (an83In(t, 137.16, 144.6)) an83Inset(ctx, I[0], I[1], I[2], op(137.16, 144.6), C.blue, (c) => sc(c, (c2) => an83Verse3(c2, t)), '#e4efff');
}
function an83Over(ctx, t, cam, S) {
  const F = an83F(t), P = (x, y) => an83P(x, y, cam);
  const lab = (txt, x, y, a, b, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha = an83Fade(t, a, b, 0.2); S.label(ctx, txt, x, y, AN83_B(t, a, 0.35), { size: 46, align: 'center', ...o }); ctx.restore(); };
  const arr = (a0, a1, a, b, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha = an83Fade(t, a, b, 0.2); S.arrow(ctx, a0, a1, AN83_B(t, a, 0.4), { width: 18, ...o }); ctx.restore(); };
  const word = (txt, x, y, a, b, size = 80, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha = an83Fade(t, a, b, 0.15); sfx(ctx, txt, x, y, size, K.clamp((t - a) / 0.25), o); ctx.restore(); };
  if (an83Insert(t)) {   // GOLD! in the insert
    if (t >= 69.22) { ctx.save(); ctx.globalAlpha = an83Fade(t, 69.22, 69.9, 0.08); S.emphasis(ctx, 690, 330, 150, AN83_B(t, 69.22, 0.3), { word: 'GOLD!', wx: 0.9, wy: 0.6 }); ctx.restore(); }
    return;
  }
  // S1 the name
  if (t < 3.2) { const h = P(...an83HeadW(F.M)); lab("MA'AN", h[0] + 40, h[1] - 175, 1.0, 3.0); arr([h[0] + 30, h[1] - 140], [h[0] + 6, h[1] - 60], 1.1, 3.0); }
  // S2 NO WATER!
  lab('NO WATER!', 620, 300, 16.25, 17.6, { size: 60, fill: C.yellow });
  // S3 counter 1 2 3 and WATER!
  if (an83In(t, 23.9, 26.5)) { const n = t < 24.35 ? 1 : t < 24.8 ? 2 : 3; ctx.save(); ctx.globalAlpha = an83Fade(t, 23.9, 26.5, 0.2); S.counter(ctx, n, 840, 170, K.clamp((t - 23.9) / 0.3), { size: 96 }); ctx.restore(); }
  if (an83In(t, 26.6, 28.6)) { const s0 = P(...an83W(F.g[0], -38, -126)); lab('WATER!', s0[0] - 150, s0[1] - 190, 26.6, 28.6, { fill: '#9cc4ff' }); arr([s0[0] - 120, s0[1] - 150], [s0[0] - 20, s0[1] - 30], 26.7, 28.6); }
  // S4 the unfinished question
  if (an83In(t, 35.3, 36.4)) { const h = an83HeadW(F.g[1]), p = P(h[0] + 10, h[1] - 120); ctx.save(); ctx.scale(1, 1); an83QBalloon(ctx, p[0], p[1], (t - 35.38) / 0.45, K.clamp((t - 36.05) / 0.25), P(h[0] - 10, h[1] - 50)); ctx.restore(); }
  // S6 the coin he asks for, NO COINS!
  if (an83In(t, 52.0, 54.35)) { const h = an83HandW(F.M, 1), p = P(h[0], h[1] - 70); ctx.save(); ctx.globalAlpha = an83Fade(t, 52.0, 54.35, 0.2); const k = K.ease.back(K.clamp((t - 52.0) / 0.3)); if (k > 0) an83Coin(ctx, p[0], p[1] - 4 * Math.sin(t * 5), 34 * k, 0); ctx.restore();
    const g = P(1430, 640); arr([p[0] + 50, p[1] - 10], [Math.min(940, g[0]), p[1] - 30], 52.6, 54.35, { bend: -0.3, width: 14 }); }
  lab('NO COINS!', 500, 300, 57.4, 59.0, { size: 60, fill: C.yellow });
  // S8 the counter 10, 20, 30 and its label
  if (an83In(t, 72.1, 80.24)) { const cb = countedBeats(t, [72.16, 74.2, 76.72]); const n = cb.n * 10; if (n > 0) { ctx.save(); ctx.globalAlpha = an83Fade(t, 72.1, 80.24, 0.25); const sc = 1 + 0.25 * cb.accent * (cb.n === 3 ? 1.5 : 1) - 0.08 * cb.dip; ctx.translate(820, 160); ctx.scale(sc, sc); S.counter(ctx, n, 0, 0, 1, { size: 104 }); ctx.restore(); } }
  lab('30 GOLDEN ARROWS', 700, 300, 76.75, 79.0, { size: 44, fill: C.yellow });
  // S8 "instead of money": coin crossed (left) and golden arrow ticked (right), side by side in the sky (79.02-80.24; the sun is faded out)
  if (an83In(t, 79.02, 80.24)) { const y = 300; ctx.save(); ctx.globalAlpha = an83Fade(t, 79.02, 80.24, 0.12);
    if (an83Badge(ctx, 320, y, 95, (t - 79.02) / 0.22)) { an83Coin(ctx, 320, y, 56, 0); an83Cross(ctx, 320, y, 1.3, (t - 79.15) / 0.25); }
    if (an83Badge(ctx, 680, y, 95, (t - 79.2) / 0.22)) { an83Arrow(ctx, 735, y - 55, -Math.PI / 4, { s: 1.0, len: 110, head: 1.9, fl: 0.8 }); an83Tick(ctx, 670, y + 45, 1.1, (t - 79.4) / 0.3); }
    ctx.restore(); }
  // S10 the name
  if (an83In(t, 90.56, 92.2)) { const h = P(...an83HeadW(F.M)); lab("MA'AN BIN ZAIDAH!", Math.max(390, Math.min(700, h[0] + 60)), Math.max(160, h[1] - 330), 90.6, 92.2, { size: 54, fill: C.yellow }); arr([h[0] + 60, Math.max(200, h[1] - 280)], [h[0] + 20, h[1] - 130], 90.7, 92.2); }
  // S12-S14 the small reciter tags
  for (const [txt, a, b, i] of [['FIRST', 109.56, 111.5, 0], ['SECOND', 123.7, 125.5, 1], ['THIRD', 136.2, 138.0, 2]]) if (an83In(t, a, b)) { const p = P(F.g[i].x, F.g[i].y); lab(txt, p[0] - 150, p[1] - 70, a, b, { size: 40, fill: [C.yellow, '#ff8a7a', '#9cc4ff'][i] }); }
  // S15 the sky icons: robe crossed (156.44), golden arrow ticked, attendants crossed (157.54); the sun is faded out; held to the cut at 158.5
  if (an83In(t, 154.2, 158.5)) { ctx.save(); ctx.globalAlpha = an83Fade(t, 154.2, 158.5, 0.15); const y = 300;
    if (an83Badge(ctx, 500, y, 84, (t - 154.25) / 0.3)) { an83Arrow(ctx, 548, y - 48, -Math.PI / 4, { s: 0.85, len: 110, head: 1.9, fl: 0.8 }); an83Tick(ctx, 530, y + 40, 0.9, (t - 154.6) / 0.3); }
    const mh = P(...an83HeadW(F.M)); if (t > 154.7) { S.arrow(ctx, [470, y + 86], [mh[0] + 20, mh[1] - 70], AN83_B(t, 154.7, 0.4), { width: 14, bend: 0.2 }); }
    if (t >= 156.0 && an83Badge(ctx, 250, y + 20, 72, (t - 156.0) / 0.25)) { an83RobeIcon(ctx, 250, y + 20, 1.0); an83Cross(ctx, 250, y + 20, 0.9, (t - 156.44) / 0.25); }
    if (t >= 157.1 && an83Badge(ctx, 750, y + 20, 72, (t - 157.1) / 0.25)) { an83PeopleIcon(ctx, 750, y + 22, 1.0); an83Cross(ctx, 750, y + 20, 0.9, (t - 157.54) / 0.25); }
    ctx.restore(); }
}

// ---------- the scene ----------
const AN83_SHAKE = (t) => K.spring(t, 69.22, 4, 14, 7) + K.spring(t, 90.56, 3, 14, 7) + 2 * K.spring(t, 165.3, 1, 14, 7);
const SCENE = {
  duration: AN83_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196, sh = AN83_SHAKE(t);
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh * 0.8, py - sh * 0.5); ctx.scale(pw / AN83_VW, ph / AN83_VH);
    const cam = an83Cam(t);
    if (an83Insert(t)) an83InsertDraw(ctx, t);
    else { ctx.save(); K.camera(ctx, AN83_VW, AN83_VH, cam); an83World(ctx, t, cam); ctx.restore(); }
    // whip pan to the caught prince (90.4-90.56)
    if (t >= 90.4 && t < 90.6) { const u = (t - 90.4) / 0.2; ctx.save(); ctx.globalAlpha = 0.85 * Math.sin(Math.PI * u); ctx.fillStyle = C.white; const r = K.rng(90); for (let i = 0; i < 26; i++) ctx.fillRect(-100 + r() * 1100 + u * 300, r() * 1230, 220 + r() * 300, 6 + r() * 8); ctx.restore(); }
    if (!an83Insert(t)) an83Insets(ctx, t, cam);
    an83Over(ctx, t, cam, S);
    if (t >= 19.7 && t < 20.3) S.transition(ctx, AN83_VW, AN83_VH, (t - 19.7) / 0.6, { caption: 'LATER...' });
    if (t >= 165.2) S.title(ctx, 'THE END', 640, 360, AN83_B(t, 165.2, 0.8), { size: 92, align: 'center' });
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // the plan's nine quiet effects, each inside a measured narration pause (or after the last word); master 0.6 at render
    k.bed(S.sfx.bed, 0, AN83_DUR, 0.5);
    k.play('whoosh', 6.4, { dur: 0.45, gain: 0.28 });   // hot wind (pause 6.03-7.10)
    k.play('pop', 11.95, { gain: 0.35 });               // the drop hits the sand (pause 11.17-12.11)
    k.play('whoosh', 19.85, { dur: 0.45, gain: 0.3 });  // LATER card (pause 19.65-21.00)
    k.play('pop', 59.7, { gain: 0.35 });                // the girls shoulder their skins (pause 59.54-60.91)
    k.play('chime', 60.15, { note: 'E6', gain: 0.45 }); // the idea
    k.play('chime', 85.0, { note: 'G6', gain: 0.45 });  // the name dawns (pause 84.86-85.64)
    k.play('pop', 88.25, { gain: 0.35 });               // the huddle closes (pause 88.06-88.62)
    k.play('chime', 121.7, { note: 'E6', gain: 0.45 }); // first verse ends (pause 121.38-122.74)
    k.play('chime', 165.45, { note: 'C6', gain: 0.6 }); // THE END (after the last word, 165.13)
  },
};
window.SCENE = SCENE;
