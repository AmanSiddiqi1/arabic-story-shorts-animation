// ===== HORSE-03: discovery and vow. S18-S20 in the garden at golden hour (120.58 - 144.44) =====
const H3_FZA_X = H3_F([[120.58, 1440], [121.0, 1440], [122.5, 1060], [124.22, 1060], [124.65, 1150], [127.6, 1150], [128.3, 1120], [150, 1120]]);
const H3_SCRAP = [1186, 900];
function h3FzA(t) {
  const tc = EH_T2(t), sd = 3, P = { ...walk(H3_FZA_X, tc, { stride: 24 }), y: 930, s: EH_FIRUZ.s, dir: -1, lid: ehLid(t, sd, [123.34, 123.6]), sq: breathe(tc, sd, 0.014), tip: idleSway(tc, sd, 0.025, 2.9), mouth: 'smile', gaze: [-1, 0], brow: 0.3, handL: [40, -110], handR: [-10, -100] };
  const o = { vx: speed(H3_FZA_X, tc), rose: { hand: 'L', droop: 0 }, swing: 0 }, look = (p) => lookAt(ehHeadOf(P), p);
  if (t < 121.0) { const u = ehE(tc, 120.58, 0.42); P.y = K.lerp(850, 930, u); P.s *= K.lerp(0.9, 1, u); P.amp = 0.5; P.ph = tc * 9; }
  P.y -= Math.abs(Math.sin(P.ph)) * 8 * P.amp * (t < 122.62 ? 1 : 0);   // a spring in his step
  if (t >= 121.58 && t < 122.62) { P.handL = [60, -200]; P.talk = ehTalk(t, 121.58, 122.4, 3, 0.7); P.gaze = look([900, 760]); P.mouth = 'open'; }
  if (t >= 122.62 && t < 123.32) { P.mouth = 'o'; P.eyes = 'wide'; P.handL = [50, -130]; P.gaze = look([880, 780]); o.swing = swing(tc, 122.62, 0.4); P.sq *= 1 + 0.03 * pulse(tc, 122.62, 0.3); }
  if (t >= 123.32 && t < 124.22) { P.gaze = gazePlan(tc, [[123.32, [-1, 0.1]], [123.56, [1, 0.1]], [123.9, [1, 0.2]]], 0.06); P.dir = t < 123.9 ? -1 : 1; P.mouth = 'o'; P.handL = [40, -120]; o.swing = swing(tc, 123.9, 0.4); }
  if (t >= 124.22 && t < 125.44) { P.dir = 1; P.handRW = t > 124.6 ? ehRoseBranchTip(t, h3BranchAside(t)) : null; P.handR = [60, -150]; P.gaze = look([1210, 820]); P.eyes = 'wide'; P.mouth = 'o'; }
  if (t >= 125.44 && t < 126.76) { P.dir = -1; P.gaze = look([850, 760]); P.lid = Math.max(P.lid, 0.2); P.mouth = 'frown'; P.brow = 0.6; o.rose.droop = flow(tc, [[126.08, 0], [126.6, 0.6], [126.76, 1]]); P.handL = [K.lerp(40, 30, o.rose.droop), K.lerp(-120, -96, o.rose.droop)]; P.sq *= 1 - 0.03 * ehE(tc, 126.08, 0.6); }
  if (t >= 126.76) { o.rose.droop = 1; P.handL = [30, -96]; P.dir = 1; P.gaze = look(t < 127.4 ? [1240, 870] : H3_SCRAP); P.mouth = 'closed'; P.brow = 0.6; P.lid = Math.max(P.lid, 0.2);
    const kn = flow(tc, [[128.44, 0], [128.9, 1], [134.66, 1], [135.2, 0]]); P.kneel = kn; if (kn > 0.05) P.amp = 0;
    if (t >= 128.44 && t < 129.12) P.handRW = [H3_SCRAP[0], H3_SCRAP[1] - 6];
    if (t >= 129.12 && t < 133.86) { P.handR = [70, -110 + 4 * Math.sin(tc * 3)]; o.scrap = 'hand'; P.gaze = look(ehHandW(P, [70, -120])); }
    if (t >= 131.6 && t < 133.86) { P.eyes = 'wide'; P.brow = t < 132.0 ? 0.7 : -0.5; P.mouth = 'closed'; P.gaze = [0.3, -0.9]; }
    if (t >= 133.86 && t < 137.1) { P.handR = [40, -120]; o.scrap = 'fist'; P.brow = -0.5; P.mouth = 'closed'; P.gaze = [0.4, -0.9]; }
    if (t >= 134.66 && t < 135.2) { P.drop = 16 * (1 - ehE(tc, 134.8, 0.4)); P.gaze = [0.5, -0.6]; }
    if (t >= 136.46) { P.gaze = gazePlan(tc, [[136.46, [0.3, -0.9]], [136.6, [0.6, -0.8]], [137.0, [0.75, -0.65]]], 0.2); P.lid = Math.max(P.lid, ehBlinkAt(tc, 136.5)); }
    if (t >= 137.1 && t < 137.8) { P.handR = [10, -78]; P.handL = [-14, -80]; o.scrap = t < 137.6 ? 'hand' : 'sash'; P.gaze = [0.2, 0.8]; P.drop = 6; }
    if (t >= 137.8) { o.scrap = 'sash'; P.handR = PERSON_HANDS.chest.R; P.brow = -0.3; P.mouth = 'closed'; P.talk = ehTalk(t, 137.8, 139.6, 3, 0.55); P.gaze = [0.7, -0.7]; P.tip = -0.03; P.sq *= 1.02; }
    if (t >= 139.38) o.wind = 1; }
  if (o.scrap === undefined && t >= 137.6) o.scrap = 'sash';
  return [P, o];
}
function h3CatA(t) {
  const tc = EH_T2(t), P = { x: 1240, y: 905, s: 0.62, pal: 2, dir: -1, sit: 1, lid: ehLid(t, 45) * 0.8 + 0.1, tailCurl: 0.6 + 0.2 * Math.sin(tc * 1.3), ears: 0.4, gaze: [-1, 0.3] };
  if (t < 126.76) { const [fz] = h3FzA(t); P.gaze = lookAt([P.x, 860], ehHeadOf(fz)); P.dir = fz.x < P.x ? -1 : 1; }
  if (t >= 126.76 && t < 128.44) { P.sit = 0; P.crouch = 0.6; P.raise = Math.abs(Math.sin((tc - 126.76) * 7)) * (t < 127.5 ? 1 : 0); P.gaze = t < 127.5 ? [-1, 0.6] : [-0.6, -0.8]; }
  if (t >= 128.44 && t < 134.2) { P.gaze = [-0.8, -0.6]; P.lid = 0.3; }
  if (t >= 134.2 && t < 139.38) { P.gaze = [0.5, -0.9]; P.ears = 1; P.lid = 0.1; }
  if (t >= 139.38) { const u = ehE(tc, 139.38, 0.5); P.x = K.lerp(1240, 1172, u); P.sit = u < 1 ? 0.5 : 1; P.rot = -0.12 * u; P.lid = 0.55; P.gaze = [-1, -0.3]; P.tailCurl = 0.8 + 0.15 * Math.sin(tc * 2); }
  return P;
}
function h3Rose(ctx, x, y, droop, t) { const a = -1.3 + 2.6 * droop + idleSway(EH_T2(t), 99, 0.05, 2), ex = x + Math.cos(a) * 54, ey = y + Math.sin(a) * 54;
  ctx.save(); ctx.strokeStyle = '#3f8a4a'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(ex, ey); ctx.stroke(); ctx.restore(); ehBlob(ctx, x + Math.cos(a) * 28, y + Math.sin(a) * 28, 9, 5, '#46b868', '#2a8048', { lw: 1.5 });
  ehBlob(ctx, ex, ey, 14, 13, EH_CRIMSON, '#a8183a', { lw: 2, hi: '#ff8aa8' }); }
function h3AfterWorld(ctx, t, cam) {
  const tc = EH_T2(t), [fz, fo] = h3FzA(t), ct = h3CatA(t), rim = { rim: '#ffd27a', light: [1, -0.5], rimW: 3 };
  princessGardenDay(ctx, t, cam, { plate: 'golden', gate: t < 120.58 ? 0 : t < 121.2 ? ehE(t, 120.58, 0.3) : 1 - ehE(t, 121.3, 0.5), behind: (c) => { if (fz.y < 900) h3Person(c, EH_FIRUZ, fz, t, { cape: true }); } });
  // the gold ribbon trail high above (136.46 on), fading
  if (t >= 135.0) { const k = K.clamp((t - 135.0) / 0.8) * (1 - K.clamp((t - 139.5) / 4.5)); ctx.save(); ctx.globalAlpha *= k; for (let i = 0; i < 2; i++) h3DashArc(ctx, [1250 + i * 40, 420 - i * 20], [1700, -600 + i * 30], -0.35, 1, '#ffd36a', 6); ctx.restore(); }
  // what is left: four hoof dents, the fallen stool, the book face down, the scrap, the cloth on the roses
  for (const fx of [68, -110, 90, -86]) shape(ctx, ell(H3_HX0 + fx * H3_HS, 903, 16, 5, 12), '#3a7a4a', { lw: 0 });
  coverCloth(ctx, ehClothSpread(1110, 690, 300, 150, -0.25, t, 0.05), { ang: 0.6 });
  h3Stool(ctx, H3_STOOL[0] + 40, H3_STOOL[1], -Math.PI / 2);
  { const pg = Math.sin(t * 3) * 0.3; celShade(ctx, [[850, 914], [912, 910], [916, 926], [852, 930]], '#e8364f', '#a8183a', { off: 3, lw: 2.5, line: '#5a1a2a' }); shape(ctx, [[880, 912], [880 + 26 * Math.cos(pg), 900 - 10 * Math.abs(Math.sin(pg))], [884, 906]], '#fff6ea', { lw: 1.5, line: '#8a7aa8' }); }
  if (t < 129.12) turbanScrap(ctx, H3_SCRAP[0], H3_SCRAP[1], 1, 0.4);
  ghostOutline(ctx, ehGhostHorse({ x: H3_HX0, y: 900, s: H3_HS, dir: 1 }), t >= 124.7 && t < 125.7 ? Math.min(1, (t - 124.7) / 0.15) * (1 - K.clamp((t - 125.3) / 0.4)) : 0, t);
  ghostOutline(ctx, ehGhostSeated(H3_PRSEAT, 900, EH_PRINCESS.s, 1), t >= 125.44 && t < 126.4 ? Math.min(1, (t - 125.44) / 0.15) * (1 - K.clamp((t - 126.0) / 0.4)) : 0, t);
  const rows = [];
  if (fz.y >= 900) rows.push([fz.y, () => { h3Person(ctx, EH_FIRUZ, fz, t, { cape: true, vx: fo.vx || 0, swing: (fo.swing || 0) + (fo.wind ? 0.3 * Math.sin(t * 2.2) : 0), rim });
    const hl = ehHandW(fz, fz.handL); h3Rose(ctx, hl[0], hl[1], fo.rose.droop, t);
    if (fo.scrap === 'hand') { const h = fz.handRW || ehHandW(fz, fz.handR); turbanScrap(ctx, h[0] + 8, h[1] - 6, 1, 0.2); }
    if (fo.scrap === 'sash') { const [sx, sy] = ehHandW(fz, [26, -78 + 12 * (fz.kneel || 0)]); turbanScrap(ctx, sx, sy, 0.7, 0.9); ehRibbon(ctx, sx + 4, sy + 6, Math.PI / 2 - 0.3, 22, 9, tc, EH_SAFFRON, { wave: 3, tip: 0.6, shade: '#c07a10' }); }
    if (t > 127.4 && t < 127.9) ehGlint(ctx, H3_SCRAP[0], H3_SCRAP[1] - 6, 22, (t - 127.4) / 0.5); }]);
  rows.push([ct.y + 1, () => { h3Shadow(ctx, ct.x, 906, 80 * ct.s); cat(ctx, ct); }]);
  rows.sort((a, b) => a[0] - b[0]).forEach((r) => r[1]());
  ehRoseBranch(ctx, t, h3BranchAside(t));
  // the breeze: petals lift (139.38 on); two doves cross the gold sky (141.5)
  if (t > 139.38) for (let i = 0; i < 10; i++) { const R = K.rng(700 + i), u = ((t - 139.38) * 0.4 + R()) % 1; ctx.save(); ctx.globalAlpha = 1 - u; ctx.fillStyle = i % 2 ? '#ff6a8a' : '#fff6ea'; ctx.translate(1000 + R() * 300 + 260 * u, 900 - 300 * u + 30 * Math.sin(u * 9 + i)); ctx.rotate(u * 7 + i); ctx.fillRect(-5, -3, 10, 6); ctx.restore(); }
  if (t > 141.5) for (let i = 0; i < 2; i++) { const u = t - 141.5 - i * 0.2; if (u > 0) bird(ctx, { kind: 'dove', pal: 0, x: 500 + 180 * u + i * 40, y: 120 - 30 * u + i * 30, s: 0.36, dir: 1, fly: true, flap: Math.sin(tc * 26 + i * 2) }); }
  princessGardenDayFront(ctx, t);
}
const H3_ACAM = [[120.58, { x: 1012, y: 540, zoom: 0.85 }], [121.2, { x: 1012, y: 540, zoom: 0.85 }], [122.6, { x: 940, y: 540, zoom: 0.85 }], [123.8, { x: 950, y: 540, zoom: 0.85 }], [124.4, { x: 1012, y: 540, zoom: 0.85 }], [126.4, { x: 1012, y: 540, zoom: 0.85 }],
  [126.76, { x: 1130, y: 580, zoom: 0.95 }], [134.66, { x: 1130, y: 580, zoom: 0.95 }], [135.0, { x: 1120, y: 570, zoom: 0.93 }], [137.4, { x: 1012, y: 330, zoom: 0.62 }], [144.44, { x: 1040, y: 330, zoom: 0.62 }]];
function h3AfterCam(t) { const c = t >= 126.76 && t < 126.77 ? H3_ACAM[6][1] : K.camAt(H3_ACAM, t); return h3GClamp(c); }
// the thought cloud: a turban with a notch missing from its tail, the scrap flies in and fits, the face fills in; then the two riders arc away
function h3CloudClue(c, t) {
  const tc = EH_T2(t); ehGrad(c, -1200, -800, 3400, 2800, [[0, '#ffe8c8'], [1, '#ffd8a8']]);
  if (t < 132.96) { const s = 3.6, I = { x: 470, y: 690 + 195 * s, s, dir: 1, lid: 0.45, brow: 0.4, mouth: 'smirk', gaze: [0.3, 0.2], handL: [-20, -60], handR: [20, -60] };
    const [hx, hy] = ehHeadOf(I), tx = hx - 44 * s, ty = hy - 34 * s, ang = Math.PI / 2 + 0.75, L = 420, R = ehRibbonEnd(tx, ty, ang, L * 0.7, tc, { wave: 6, hz: 1.3 });
    person(c, ehDressP(EH_INVENTOR, I)); ehRibbon(c, tx, ty, ang, L * 0.7, 64, tc, EH_SAFFRON, { wave: 6, hz: 1.3, tip: 0.95, shade: '#c07a10' });
    const face = ehE(tc, 130.82, 0.4); if (face < 1) { c.save(); c.globalAlpha = 1 - face; shape(c, ell(hx, hy + 4 * s, 34 * s, 40 * s, 30), '#f7c6a3', { lw: 4, line: '#8a5a4a' }); c.restore(); }
    // the notch where the scrap was torn out of the tail, and the scrap that flies in and fits
    const nx = R[0] + Math.cos(ang) * 46, ny = R[1] + Math.sin(ang) * 46, fit = ehE(tc, 130.3, 0.5);
    if (fit < 1) { c.save(); c.setLineDash([12, 9]); c.strokeStyle = '#7a4a10'; c.lineWidth = 5; c.beginPath(); c.ellipse(nx, ny, 70, 40, ang, 0, 7); c.stroke(); c.restore(); }
    turbanScrap(c, K.lerp(nx + 700, nx, fit), K.lerp(ny + 200, ny, fit), 3.2, ang - Math.PI / 2 + (1 - fit) * 2.5);
    if (t > 130.8 && t < 131.3) ehGlint(c, nx, ny, 90, (t - 130.8) / 0.5); }
  else { const u = ehE(tc, 132.96, 0.9); c.drawImage(ehPGSkyPlate('golden'), -400, -300, 1800, 1300); h3DashArc(c, [180, 980], [900, 160], -0.4, u, '#ffd36a', 12);
    const pts = K.trim(K.arcPts([180, 980], [900, 160], -0.4, 40), Math.max(0.02, u)), e = pts[pts.length - 1], k = 1 - 0.5 * u, H = ehRigP(e[0], e[1], 0.9 * k, 1, 0.5);
    twoRiders(c, H, { who: 'princess', D: EH_PRINCESS, P: { s: 0.93 * k, lid: 0, mouth: 'open', gaze: [-1, 0], handL: [60, -110], handR: [-60, -150] } }, { who: 'inventor', D: EH_INVENTOR, P: { s: 1.02 * k, lid: 0.4, mouth: 'smirk', handL: [60, -110], handR: [70, -104], lurch: -0.1 } }, t, { tc, tail: { stream: 1, torn: true, ang: Math.PI * 0.8 }, veil: { stream: 1 } }); }
}
function h3AfterOver(ctx, t, cam, S) {
  const P = (x, y) => h3P(x, y, cam), [fz] = h3FzA(t), hd = P(...ehHeadOf(fz));
  if (t >= 130.14 && t < 134.3) { const p = t < 133.86 ? K.clamp((t - 130.14) / 0.5) : 1 - K.clamp((t - 133.86) / 0.35); thoughtCloud(ctx, 470, 330, 620, 500, t, { p, tail: [hd[0] + 10, hd[1] - 60], seed: 15, bg: '#ffe8c8', scale: 0.4, at: [500, 700], inside: (c) => h3CloudClue(c, t) }); }
  if (t >= 137.8 && t < 140.4) h3Say(ctx, S, [[137.8, 'I WILL BRING THEM\nBACK SAFELY!']], t, hd, { gone: 140.1, size: 44, up: 170, col: '#ffd36a' });
  if (t >= 140.1) S.title(ctx, 'TO BE CONTINUED...', 500, 210, K.clamp((t - 140.1) / 0.9), { size: 70, align: 'center', glow: '#ff7ad9' });
}
