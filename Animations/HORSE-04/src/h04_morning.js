// ===== HORSE-04: S17 the next morning in the open square (132.4 - end). farPalace, model morning =====
const H4_MCAM = [[132.4, { x: 1950, y: h4GY(0.8), zoom: 0.8 }], [134.0, { x: 1950, y: h4GY(0.8), zoom: 0.8 }], [137.8, { x: 1900, y: h4GY(0.66), zoom: 0.66 }], [138.6, { x: 1900, y: h4GY(0.66), zoom: 0.66 }],
  [140.3, { x: 1960, y: h4GY(1.05), zoom: 1.05 }], [145.6, { x: 1975, y: h4GY(1.1), zoom: 1.1 }]];
function h4MCam(t) { return h4Cam(H4_MCAM, t, EH_FP.w, -700, 1430); }
const H4_MCART = H4_F([[132.4, 2470], [133.26, 2470], [133.9, 1900], [134.4, 1900], [135.6, 2330]]);
function h4MHorse(t) { const H = { x: t < 134.1 ? H4_MCART(t) : 1900, y: 900, s: H4_HS, dir: 1 }; if (t < 134.1) H.y = 842; else if (t < 134.4) H.y = 842 + 58 * ehE(t, 134.1, 0.3, 'in'); return H; }
// the crowd: [x, y, costume index, arrive time, from x]
// review 1 note 4: a cleared stage. Front row on the left only (the two guests HORSE-05 opens with); the rest in a back row (s x 0.85, 30 higher)
const H4_CROWD = [[1440, 868, 0, 133.94, 1250], [1495, 872, 3, 134.3, 1300], [1540, 840, 1, 134.1, 1350, 1], [1585, 836, 7, 134.5, 1400, 1], [1715, 838, 2, 134.9, 1500, 1], [1765, 842, 4, 134.6, 1520, 1], [1825, 836, 6, 135.2, 1560, 1]];
function h4MPeople(t, items, ctx) { const tc = EH_T2(t);
  H4_CROWD.forEach(([x, y, ci, ta, fx, back], i) => { const xf = H4_F([[ta, fx], [ta + 1.3, x]]), D = ci === 7 ? EH_CHILD : EH_GUESTS[ci], sd = 101 + i * 3;
    const P = { ...walk(xf, tc, { stride: 22 }), y, s: (D.s || 1) * (back ? 0.85 : 1), dir: x > 1900 ? -1 : 1, lid: ehLid(t, sd, [138.44 + stagger(i, 0.1)]), mouth: 'smile', gaze: [x > 1900 ? -1 : 1, 0.2], handL: [-24, -100], handR: [26, -100], sq: breathe(tc, sd, 0.016), tip: idleSway(tc, sd, 0.025, 2.7 + i * 0.2) };
    if (ci === 7) P.child = true;
    if (t >= 138.44 + stagger(i, 0.12)) { P.gaze = lookAt(ehHeadOf(P), [2470, 640]); P.dir = 1; } if (t >= 139.6) { P.gaze = lookAt(ehHeadOf(P), [1960, 700]); P.dir = P.x > 1960 ? -1 : 1; P.mouth = 'o'; }
    items.push([y, () => h4Fig(ctx, D, P, t)]); }); }
const H4_MGX = [[1600, 2080, 876], [1660, 2160, 878]];   // the line (A, B) as HORSE-05 opens; C and D escort the inventor
function h4MGuard(t, i) { const tc = EH_T2(t), sd = 121 + i * 5, D = EH_FARGUARDS[i], [x, fx, y] = H4_MGX[i], ta = 133.4 + stagger(i, 0.3), xf = H4_F([[ta, fx], [ta + 1.6, x]]);
  const P = { ...walk(xf, tc, { stride: 24 }), y, s: D.s, dir: 1, lid: ehLid(t, sd, [138.44 + stagger(i, 0.12)]), mouth: 'closed', gaze: [1, 0.1], handL: [-26, -100], handR: [40, -110], sq: breathe(tc, sd, 0.012), tip: idleSway(tc, sd, 0.022, 2.9 + i * 0.3) }, o = { helmet: {}, neck: true, spear: { lean: 0 } };
  if (Math.abs(speed(xf, t)) > 20) P.dir = -1;
  const rip = 135.58 + stagger(i, 0.14) + (i === 3 ? 0.35 : 0); if (t >= rip && t < rip + 0.3) P.sq *= 1 - 0.05 * pulse(tc, rip, 0.3);
  if (t >= 138.44 + stagger(i, 0.12)) P.gaze = lookAt(ehHeadOf(P), [2470, 640]);
  if (t >= 139.6) P.gaze = lookAt(ehHeadOf(P), [1960, 700]);
  P.dir = Math.abs(speed(xf, t)) > 20 ? -1 : 1;
  return [P, o, D]; }
// the inventor between guards C and D, the captain behind them (136.6 -): HORSE-05's opening places (2375 / 2330 / 2420 / 2282)
const H4_MIX = H4_F([[136.6, 2660], [138.0, 2375]]);
function h4MInventor(t, items, ctx) { if (t < 136.6) return; const tc = EH_T2(t);
  const P = { ...walk(H4_MIX, tc, { stride: 22 }), y: 904, s: EH_INVENTOR.s, dir: -1, lid: ehLid(t, 7, [138.44]), mouth: 'closed', brow: 0.4, gaze: [-1, 0.3], handL: [10, -110 + 6 * Math.sin(tc * 9)], handR: [20, -104 - 6 * Math.sin(tc * 9)], sq: breathe(tc, 7, 0.014), tip: idleSway(tc, 7, 0.03, 2.4) };
  if (t >= 138.0) { P.tip = -0.06 + 0.04 * Math.sin(tc * 2); P.x += 6 * Math.sin(tc * 1.7); P.gaze = lookAt(ehHeadOf(P), [1920, 640]); }
  if (t >= 138.44 && t < 139.6) P.gaze = lookAt(ehHeadOf(P), [2470, 640]);
  if (t >= 139.6 && t < 140.8) { P.gaze = lookAt(ehHeadOf(P), [1960, 700]); P.lid = 0.45; }
  if (t >= 140.8) { const C = h4MCraft(t); P.gaze = lookAt(ehHeadOf(P), h4MCorner(C)); P.eyes = 'wide'; P.lid = 0; P.mouth = 'o'; P.brow = 0.9; P.handL = [-30, -214]; P.tip = 0.04 + 0.03 * pulse(tc, 140.8, 0.3); }
  if (t >= 141.4) { const u = ehE(tc, 141.4, 0.3); P.handR = [K.lerp(20, -34, u), K.lerp(-104, -236, u) + 3 * Math.sin(tc * 7)]; }   // his hand goes to the torn turban tail
  items.push([P.y, () => h4Fig(ctx, EH_INVENTOR, P, t, { tail: true, vx: t < 138 ? -60 : 0 })]);
  for (const [k, dx, y, dr] of [[2, -45, 898, 1], [3, 45, 904, -1], [-1, -93, 872, -1]]) { const D = k < 0 ? EH_CAPTAIN : EH_FARGUARDS[k], sd = 131 + k, Q = { ...walk((tt) => H4_MIX(tt) + dx, tc, { stride: 24 }), y, s: D.s, dir: -1, lid: ehLid(t, sd), mouth: 'closed', gaze: [-1, 0.1], handL: [-26, -100], handR: [40, -110], sq: breathe(tc, sd, 0.012), tip: idleSway(tc, sd, 0.02, 3) };
    if (t >= 138.0) Q.dir = dr;
    if (t >= 138.44 + Math.max(0, k) * 0.15) Q.gaze = lookAt(ehHeadOf(Q), t < 139.6 ? [2470, 640] : [1960, 700]);
    if (k >= 0 && t >= 141.6) { const a = 141.7 + (k - 2) * 0.55; if (t >= a && t < a + 0.7) { Q.gaze = lookAt(ehHeadOf(Q), [H4_MIX(t) - dx, 680]); Q.dir = -Math.sign(dx); } if (t >= a + 1.6 && t < a + 2.2) { Q.gaze = lookAt(ehHeadOf(Q), [H4_MIX(t) - dx, 680]); Q.dir = -Math.sign(dx); } }   // glances at each other, out of step
    items.push([Q.y, () => h4Fig(ctx, D, Q, t, { helmet: {}, neck: true, spear: { lean: 0.02 } })]); } }
// the corner's world point on a craftsman (his left hip; facing -x it shows to the right, toward the inventor)
function h4MCorner(C) { const s = C.s || 1, d = Math.sign(C.dir || 1); return [C.x - d * 26 * s, C.y - 84 * s]; }
// the craftsman (138.44 -)
const H4_MCX = H4_F([[138.44, 2470], [139.34, 2060]]);   // right of the knob, far enough that the raised hand shows in front of his head
function h4MCraft(t) { const tc = EH_T2(t), sd = 3;
  const P = { ...walk(H4_MCX, tc, { stride: 20 }), y: 935, s: EH_CRAFT.s, dir: -1, lid: Math.max(0.3, ehLid(t, sd, [139.58])), mouth: 'closed', brow: 0.3, gaze: [-1, 0.1], handL: [-30, -100], handR: [30, -100], sq: breathe(tc, sd, 0.014), tip: 0.07 + idleSway(tc, sd, 0.02, 2.6) };
  P.o = { box: { open: 0, hang: true }, corner: 1 }; const H = h4MHorse(t);
  if (t >= 139.34) { P.o.box = null; P.o.boxAt = true; P.dir = -1; P.handL = [-10, -110 + 10 * Math.sin(tc * 16)]; P.handR = [10, -112 - 10 * Math.sin(tc * 16)]; }
  if (t >= 139.58) { P.dir = -1; P.handLW = ehHorsePt(H, [-10, -236]); P.gaze = lookAt(ehHeadOf(P), [1680, 640]); P.tip = 0.04 + 0.05 * pulse(tc, 139.9, 0.4); P.lid = 0.15; }
  if (t >= 140.52) { const k = ehHorsePt(H, EH_EBG.knob), u = ehE(tc, 140.52, 0.35), tr = 2 * Math.sin(EH_T3(t) * 9), hx = k[0] + 16 + tr, hy = k[1] + 4, [sx, sy] = ehHandW(P, [30, -100]);   // the arm rises on a flow and hovers, a 2 px tremble on threes
    P.handLW = null; P.handL = [-30, -100]; P.handRW = [K.lerp(sx, hx, u), K.lerp(sy, hy, u) - 20 * Math.sin(Math.PI * u)]; P.gaze = lookAt(ehHeadOf(P), k); P.tip = 0.05; P.lid = 0.25; P.brow = 0.5; }
  return P; }
function h4MornWorld(ctx, t, cam) {
  const tc = EH_T2(t), H = h4MHorse(t);
  farPalace(ctx, t, cam, { model: 'morning', court: t < 133.4 ? ehE(t, 132.9, 0.3) : t < 139.4 ? 1 - ehE(t, 135.6, 0.4) + (t > 138.3 ? ehE(t, 138.3, 0.3) : 0) : 1 - ehE(t, 139.4, 0.4),
    sky: (c, dx, dy) => { ehGlow(c, 760 + dx, 300 + dy, 520, 0.7, '#ffe0b8'); celShade(c, ell(760 + dx, 300 + dy, 70, 70, 30), '#fff4d8', '#ffd6a0', { off: 8, lw: 0 }); } });
  h4Doves(ctx, t, [[132.5, 1500, 260, 1, 170], [132.9, 1460, 320, 1, 150], [136.5, 2500, 240, -1, 160], [141.5, 1600, 280, 1, 140], [143.0, 2400, 300, -1, 150]]);
  // dew glints on the square
  ctx.save(); ctx.globalCompositeOperation = 'screen'; ehGlints(ctx, [1600, 960, 900, 300], t, 8, 17, 12); ctx.restore();
  const items = [];
  // the king: up the pavilion steps, sits, chin on fist, leaning further forward through the hold
  { const xf = H4_F([[134.2, 1980], [135.0, 2100], [135.4, 2230]]), sitting = t >= 135.4, sd = 13;
    const P = { ...walk(xf, tc, { stride: 22 }), y: t < 135.0 ? 905 : t < 135.4 ? K.lerp(905, 850, ehE(tc, 135.0, 0.4)) : 850, s: EH_FARKING.s, dir: sitting ? -1 : 1, lid: ehLid(t, sd, [138.44]), mouth: 'smile', brow: 0.3, gaze: [-1, 0.3], handL: [-26, -96], handR: [26, -96], sq: breathe(tc, sd, 0.016), tip: idleSway(tc, sd, 0.02, 3.3) };
    if (t < 134.2) P.x = 1980;
    if (sitting) { P.sit = ehE(tc, 135.4, 0.3); P.seat = 'bench'; P.handR = PERSON_HANDS.chin.R; P.handL = [20, -60]; P.tip = 0.04 + 0.1 * ehE(t, 136, 9); P.gaze = lookAt(ehHeadOf(P), t >= 138.44 && t < 139.6 ? [2470, 640] : [1940, 700]); }
    items.push([850, () => h4Fig(ctx, EH_FARKING, P, t)]); }
  // the cart wheels the horse out of the court gate to the star; slid off; pulled back
  items.push([899, () => { const cx = H4_MCART(t); if (t < 135.6) platformCart(ctx, cx, 900, { dir: 1, wheel: (cx - 2470) / 24, sag: t < 134.1 ? 6 : 0 }); h4Shadow(ctx, H.x, 900, 260 * H.s, 900 - H.y); ebonyHorse(ctx, H); ehRosettes(ctx, H, { missing: 3, t: tc }); }]);
  if (t < 135.6) { for (const [k, dx] of [[2, -200], [3, 170]]) { const D = EH_FARGUARDS[k], xf = (tt) => H4_MCART(tt) + dx, P = { ...walk(xf, tc, { stride: 24 }), y: 905 + k, s: D.s, dir: -1, lid: ehLid(t, 140 + k), mouth: 'grit', gaze: [-1, 0.2], handL: [-60, -120], handR: [-70, -130], tip: -0.1 };
    if (t >= 134.4) { P.dir = 1; P.mouth = 'closed'; P.tip = 0.05; } items.push([P.y, () => h4Fig(ctx, D, P, t, { helmet: {}, neck: true })]); } }
  else for (let i = 0; i < 2; i++) { const g = h4MGuard(t, i); items.push([g[0].y, () => h4Fig(ctx, g[2], g[0], t, g[1])]); }
  if (t >= 133.94) h4MPeople(t, items, ctx);
  h4MInventor(t, items, ctx);
  // the princess in the second arch of the arcade, the end of her rose sash round one finger (two flicks at 139.58)
  { const sd = 11, P = { x: EH_FP.arch2, y: 884, s: EH_PRINCESS.s, dir: 1, lid: ehLid(t, sd, [138.44, 139.58]), mouth: 'closed', gaze: [1, 0.3], handL: [14, -96], handR: [30, -98], sq: breathe(tc, sd, 0.016), tip: idleSway(tc, sd, 0.02, 3.1) };
    if (t < 137.56) P.alpha = K.clamp((t - 136.9) / 0.5);
    if (t >= 138.44) P.gaze = lookAt(ehHeadOf(P), t < 139.6 ? [2470, 640] : [1940, 700]);
    if (t >= 139.58 && t < 140.4) P.tip = 0.05 * pulse(tc, 139.7, 0.4);
    if (P.alpha !== 0) items.push([884, () => { ctx.save(); if (P.alpha != null) ctx.globalAlpha *= P.alpha; h4Fig(ctx, EH_PRINCESS, P, t, { veil: true }); const [hx, hy] = ehHandW(P, P.handR);
      const fl = t >= 139.58 && t < 140.3 ? Math.sin((tc - 139.58) * Math.PI * 2 / 0.35) : 0; ehRibbon(ctx, hx, hy, Math.PI / 2 + 0.3 + 0.8 * fl, 50, 12, tc, EH_ROSESASH, { wave: 4, hz: 1.5, tip: 0.6, shade: '#d8507a', lw: 2 }); ctx.restore(); }]); }
  // the craftsman
  if (t >= 138.44) { const C = h4MCraft(t); items.push([C.y, () => { if (C.o.boxAt) toolbox(ctx, 2108, 944, { s: 0.95 }); ehCraftsman(ctx, h4W(C), t, { corner: 1, box: C.o.box }); h4BigCorner(ctx, C, 1, t >= 141.0 && t < 141.6 ? pulse(t, 141.0, 0.6) : 0); }]); }
  items.sort((a, b) => a[0] - b[0]); for (const [, f] of items) f();
  if (t >= 140.52) { const k = ehHorsePt(H, EH_EBG.knob); ehGlow(ctx, k[0], k[1], 60, 0.3 + 0.15 * Math.sin(t * 4), '#ffd36a'); if (t < 141.0) ehGlint(ctx, k[0], k[1] - 6, 30, (t - 140.6) / 0.4); }
  if (t >= 140.9) { const C = h4MCraft(t), [x, y] = h4MCorner(C); if (t < 141.7) ehBand(ctx, [x - 90, y - 120, 180, 240], (t - 140.9) / 0.8, { w: 50, alpha: 0.75, col: '#fff2c0' }); if (t >= 141.0 && t < 141.8) ehGlint(ctx, x, y, 30, (t - 141.0) / 0.8); }
}
function h4MornOver(ctx, t, cam, S) {
  // review 1 note 4: what the inventor sees. A dotted eye line to the hip, then the corner large in a round callout by his head
  if (t >= 140.9) { const tc = EH_T2(t), C = h4MCraft(t), cp = h4MCorner(C), [cx, cy] = h4P(...cp, cam), ip = h4P(H4_MIX(t) + 6 * Math.sin(tc * 1.7) - 12, 904 - 232 * EH_INVENTOR.s, cam), u = K.clamp((t - 140.9) / 0.4);
    ctx.save(); ctx.setLineDash([12, 12]); ctx.lineDashOffset = -tc * 40; ctx.strokeStyle = '#fff6ea'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(ip[0], ip[1]); ctx.lineTo(K.lerp(ip[0], cx + 20, u), K.lerp(ip[1], cy, u)); ctx.stroke(); ctx.restore();
    const p = ehE(tc, 141.2, 0.25), ox = 750, oy = 430; ehCallout(ctx, ox, oy, 120, p, (c) => { ehGrad(c, ox - 130, oy - 130, 260, 260, [[0, '#d8b880'], [1, '#a8784a']]);
      const Q = { x: ox + 26 * 4.2 - 10, y: oy + 84 * 4.2 + 10, s: 4.2, dir: 1, tip: 0 }; h4BigCorner(c, Q, 1, 0.2 + 0.2 * Math.sin(tc * 5)); ehGlint(c, ox - 10, oy - 20, 40, ((t - 141.4) / 0.7) % 1); });
    if (p > 0) { ctx.save(); ctx.globalAlpha *= p; S.arrow(ctx, [ip[0] - 30, ip[1] - 40], [ox + 90, oy + 110], K.clamp((t - 141.3) / 0.3), { width: 6, bend: 0.25 }); ctx.restore(); } }
  if (t >= 141.2) S.title(ctx, 'TO BE CONTINUED...', 500, 190, K.clamp((t - 141.2) / 0.9), { size: 70, align: 'center', glow: '#ff7ad9' });
}
