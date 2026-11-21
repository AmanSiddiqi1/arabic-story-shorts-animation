// ===== HORSE-03: the promise. S4-S5 on the rose palace roof at golden dusk (palaceRoof dusk plate, 18.4 - 34.39) =====
// World units on palaceRoof (floor y 900, people stand at y 930, star tile 640, pavilion door 1330..1450).
const H3_RGY = 930;
const H3_RH_Y = H3_F([[18.4, 690], [18.7, 690], [18.94, 900], [40, 900]]);
function h3RoofHorse(t) { return { x: 640, y: H3_RH_Y(t), s: H3_HS, dir: 1, lift: 900 - H3_RH_Y(t) }; }
// Firuz: rides in, drops from the saddle at 19.4, the password, the bow (22.22), the bounce (25.58)
function h3FzRoof(t) {
  const tc = EH_T2(t), sd = 3; if (t < 19.4) return null;
  const P = { x: 800, y: H3_RGY, s: EH_FIRUZ.s, dir: 1, lid: ehLid(t, sd, [21.0, 23.1]), sq: breathe(tc, sd, 0.014), tip: idleSway(tc, sd, 0.025, 2.9), mouth: 'smile', gaze: [1, 0], brow: 0.3, handL: [-26, -98], handR: [26, -98] };
  if (t < 19.78) { const H = h3RoofHorse(t), seat = mountSeat('horse', H), [x, l] = hop(tc, 19.4, 0.38, seat.x + 20, 800, 40); P.x = x; P.y = K.lerp(seat.y + 52 * P.s, H3_RGY, ehE(tc, 19.4, 0.38, 'in')) - l; P.handR = [60, -170]; return P; }
  P.sq *= landSquash(tc, 19.78, 0.12);
  if (t < 20.9) { P.handR = PERSON_HANDS.chest.R; P.talk = ehTalk(t, 19.8, 20.8, 3, 0.6); P.lid = Math.max(P.lid, 0.15); }
  else if (t < 22.22) { P.gaze = lookAt([P.x, P.y - 190], [1200, 740]); P.eyes = t < 21.4 ? 'wide' : 'open'; P.handR = [30, -100]; P.sq *= 1 + 0.03 * pulse(tc, 20.95, 0.3); if (t > 21.7) { P.handL = [-10, -110]; P.handR = [20, -112]; P.mouth = 'o'; } }
  else if (t < 23.08) { const b = flow(tc, [[22.22, 0], [22.36, -0.1], [22.6, 1], [22.85, 1], [23.08, 0]]); P.drop = 22 * b; P.tip = 0.28 * b; P.handR = b > 0.6 ? PERSON_HANDS.headHold.R : PERSON_HANDS.chest.R; P.handL = [-30, -90]; P.gaze = [1, 0.6]; P.mouth = 'closed'; }
  else { P.gaze = lookAt([P.x, P.y - 190], [1040, 720]);
    if (t >= 25.58 && t < 26.1) { const j = flow(tc, [[25.58, 0], [25.75, 1], [25.95, 0.4], [26.1, 0]]); P.y -= 24 * j; P.handL = [-60, -210]; P.handR = [60, -210]; P.mouth = 'open'; P.eyes = 'wide'; P.sq *= 1 + 0.05 * j; }
    else if (t >= 26.1 && t < 27.0) { P.handL = [-24, -96]; P.handR = [24, -96]; P.tip = -0.03; P.sq *= 1.02; P.gaze = lookAt([P.x, P.y - 190], [1180, 740]); P.lid = Math.max(P.lid, ehBlinkAt(tc, 26.12)); }
    if (t >= 30.0) { P.gaze = lookAt([P.x, P.y - 190], t < 32 ? [560, 740] : [470, 880]); }
    if (t >= 32.0 && t < 33.0) { P.handR = PERSON_HANDS.mouthCover.R; P.lid = 0.3; }
    if (t >= 33.4) { P.mouth = 'smile'; P.gaze = lookAt([P.x, P.y - 190], [470, 860]); } }
  return P;
}
const H3_PRX = H3_F([[18.94, 1150], [19.6, 940], [23.08, 940], [23.5, 1020], [30, 1020], [30.6, 990], [40, 990]]);
function h3PrRoof(t) {
  const tc = EH_T2(t), sd = 11; if (t < 18.94) return null;
  const P = { ...walk(H3_PRX, tc, { stride: 24 }), y: H3_RGY, s: EH_PRINCESS.s, dir: -1, lid: ehLid(t, sd, [21.0]), sq: breathe(tc, sd, 0.014), tip: idleSway(tc, sd, 0.022, 3.1), mouth: 'smile', gaze: [-1, 0], handL: PERSON_HANDS.clasp.L, handR: PERSON_HANDS.clasp.R };
  const fz = [800, 740], look = (p) => lookAt(ehHeadOf(P), p);
  if (t < 19.6) { P.handL = [-50, -130]; P.handR = [50, -130]; P.mouth = 'open'; }
  else if (t < 20.9) { P.gaze = look(fz); if (t > 20.4) { P.handR = PERSON_HANDS.chest.R; P.mouth = 'open'; P.lid = 0.25; P.sq *= 1 + 0.03 * Math.abs(Math.sin(tc * 9)); } }
  else if (t < 23.08) { P.gaze = t < 21.3 ? [1, -0.1] : look(fz); P.dir = t < 21.3 ? 1 : -1; P.lid = Math.max(P.lid, ehBlinkAt(tc, 21.3)); P.handR = PERSON_HANDS.clasp.R; if (t > 22.3) { P.handR = PERSON_HANDS.mouthCover.R; P.lid = 0.3; } }
  else { P.dir = t < 23.5 ? 1 : -1; P.gaze = t < 24.9 ? [1, -0.1] : look(fz);
    if (t >= 23.08 && t < 26.32) { P.handR = PERSON_HANDS.pointUp.R; P.talk = ehTalk(t, 25.1, 26.3, 19, 0.6); P.brow = 0.3; }
    if (t >= 26.32 && t < 28.4) { P.handR = [70, -170]; P.handL = PERSON_HANDS.clasp.L; P.talk = ehTalk(t, 26.32, 27.5, 19, 0.5); P.dir = -1; P.gaze = look(fz); }
    if (t >= 28.4 && t < 29.76) { P.dir = 1; P.gaze = [1, -0.1]; P.mouth = 'smile'; }
    if (t >= 29.76) { P.dir = -1; P.gaze = look(t < 32 ? [600, 760] : [470, 880]); P.handR = PERSON_HANDS.clasp.R; }
    if (t >= 32.0 && t < 33.2) { P.handR = PERSON_HANDS.mouthCover.R; P.lid = 0.35; P.sq *= 1 + 0.025 * Math.abs(Math.sin(tc * 10)); } }
  return P;
}
// her parents out of the pavilion at 20.9; the guards behind them at 21.6
const H3_FKX = H3_F([[20.9, 1390], [22.0, 1170], [40, 1170]]), H3_QX = H3_F([[21.15, 1390], [22.2, 1270], [40, 1270]]);
function h3Parents(t) {
  if (t < 20.9) return []; const tc = EH_T2(t), out = [];
  const Kp = { ...walk(H3_FKX, tc, { stride: 22 }), y: K.lerp(888, H3_RGY - 6, ehE(tc, 20.9, 1.0)), s: EH_FKING.s, dir: -1, lid: ehLid(t, 61), sq: breathe(tc, 61, 0.014), tip: idleSway(tc, 61, 0.018, 3.4), mouth: 'closed', brow: 0.5, gaze: [-1, 0.1], handL: [-26, -100], handR: [30, -100] };
  if (t >= 22.0 && t < 22.6) { Kp.handR = [90, -175]; Kp.gaze = [-1, 0]; }
  if (t >= 22.6 && t < 23.0) Kp.tip = -0.04 * pulse(tc, 22.62, 0.4);
  if (t >= 23.08) Kp.gaze = lookAt(ehHeadOf(Kp), [1020, 740]);
  if (t >= 28.4 && t < 29.3) { Kp.handR = PERSON_HANDS.moustache.R; Kp.handR = [Kp.handR[0], Kp.handR[1] + 14 + 6 * Math.sin(tc * 9)]; Kp.drop = 10 * pulse(tc, 28.9, 0.4); Kp.lid = 0.3; Kp.brow = 0.2; }
  if (t >= 29.3) { Kp.mouth = 'smile'; Kp.brow = 0.1; Kp.gaze = lookAt(ehHeadOf(Kp), t < 31 ? [1020, 740] : [500, 860]); }
  out.push([EH_FKING, Kp, 'king']);
  if (t >= 21.15) { const Q = { ...walk(H3_QX, tc, { stride: 22 }), y: K.lerp(886, H3_RGY - 12, ehE(tc, 21.15, 1.0)), s: EH_QUEEN.s, dir: -1, lid: ehLid(t, 63), sq: breathe(tc, 63, 0.014), tip: idleSway(tc, 63, 0.022, 2.8), mouth: 'smile', gaze: [-1, 0], handL: PERSON_HANDS.clasp.L, handR: PERSON_HANDS.clasp.R };
    if (t >= 22.6 && t < 23.4) { Q.handR = PERSON_HANDS.mouthCover.R; Q.lid = 0.35; Q.handL = [-60, -130]; Q.tip = -0.05; }
    if (t >= 32.0 && t < 33.4) { Q.handR = PERSON_HANDS.mouthCover.R; Q.lid = 0.4; Q.sq *= 1 + 0.03 * Math.abs(Math.sin(tc * 11)); }
    if (t >= 23.4) Q.gaze = lookAt(ehHeadOf(Q), t < 30 ? [1020, 740] : [520, 860]);
    out.push([EH_QUEEN, Q, 'queen']); }
  return out;
}
const H3_GAX = H3_F([[21.6, 1390], [22.4, 1360], [40, 1360]]), H3_GBX = H3_F([[21.8, 1400], [22.6, 1460], [40, 1460]]);
function h3GuardsRoof(t) {
  if (t < 21.6) return []; const tc = EH_T2(t);
  const A = { ...walk(H3_GAX, tc, { stride: 22 }), y: 904, s: EH_GUARD_A.s, dir: -1, lid: ehLid(t, 51), sq: breathe(tc, 51, 0.012), tip: idleSway(tc, 51, 0.02, 2.7), gaze: [-1, 0], mouth: 'closed', handR: [60, -150], handL: [-30, -100], torch: false };
  const B = { ...walk(H3_GBX, tc, { stride: 22 }), y: 896, s: EH_GUARD_B.s, dir: -1, lid: ehLid(t, 53), sq: breathe(tc, 53, 0.012), tip: idleSway(tc, 53, 0.02, 3.3), gaze: [-1, 0.1], mouth: 'closed', handR: [50, -140], handL: [-30, -100], spear: true, lean: 0.05 };
  if (t >= 21.9 && t < 22.6) { A.handR = PERSON_HANDS.pointFwd.R; A.mouth = 'open'; A.eyes = 'wide'; B.lean = -0.9; B.handR = [70, -120]; }
  if (t >= 22.6 && t < 23.2) { B.lean = K.lerp(-0.9, 0.05, ehE(tc, 22.6, 0.4)); }
  if (t >= 28.0) { const a = pulse(tc, 28.0, 0.4), b = pulse(tc, 28.22, 0.4); A.sq *= 1 + 0.05 * a; B.sq *= 1 + 0.05 * b; A.handL = [-24, -90]; A.helmetDrop = t > 28.1 ? 14 : 0; A.handR = t > 28.6 && t < 29.2 ? [10, -214] : [24, -96]; }
  if (t >= 29.3 && t < 29.8) { B.stamp = pulse(tc, 29.3, 0.3); }
  if (t >= 30) { A.gaze = [-1, 0.2]; B.gaze = [-1, 0.3]; }
  return [[EH_GUARD_A, A], [EH_GUARD_B, B]];
}
function h3Guard(ctx, D, P, t) { const t3 = EH_T3(t); h3Shadow(ctx, P.x, P.y, 90 * P.s); ehNeckCloth(ctx, P); person(ctx, ehDressP(D, P)); ehHelmet(ctx, { ...P, drop: (P.drop || 0) + (P.helmetDrop || 0) });
  if (P.spear) { const [hx, hy] = ehHandW(P, P.handR); ehSpear(ctx, hx, hy - (P.stamp || 0) * 20, P.s, (P.lean || 0) * (P.dir || 1)); if (P.stamp > 0.5) dustBurst(ctx, hx - 20, P.y, 0.2, 5, 4, 8, 40, 0.4, 5); } }
// the maid with three trunks (29.76), the top one slides off the rump (31.98) and lands at 32.3
const H3_MDX = H3_F([[29.76, 1390], [31.5, 560], [40, 560]]);
function h3MaidRoof(t) {
  if (t < 29.76) return null; const tc = EH_T2(t), P = { ...walk(H3_MDX, tc, { stride: 20 }), y: K.lerp(886, 900, ehE(tc, 29.76, 0.6)), s: EH_MAID.s, dir: -1, lid: ehLid(t, 17), sq: breathe(tc, 17, 0.016), tip: idleSway(tc, 17, 0.03, 2.4), mouth: 'closed', gaze: [-1, -0.2], handL: [-30, -230], handR: [30, -230] };
  P.y -= Math.abs(Math.sin(P.ph)) * 6 * P.amp;
  if (t >= 31.5 && t < 32.0) { const u = flow(tc, [[31.5, 0], [31.98, 1]]); P.handL = [-40, K.lerp(-230, -260, u)]; P.handR = [K.lerp(30, -10, u), K.lerp(-230, -270, u)]; P.sq *= 1 - 0.04 * u; P.mouth = 'grit'; }
  if (t >= 32.0) { P.handL = [-30, -200]; P.handR = [30, -200]; P.eyes = 'wide'; P.mouth = 'o'; P.gaze = [-0.4, 0.6]; P.sq *= 1 - 0.03 * pulse(tc, 32.3, 0.4); }
  return P;
}
function h3TrunkTop(t) {   // the top trunk: on the stack, on the rump (31.98), sliding off, landed (32.3)
  const R = [500, 702]; if (t < 31.98) return null;
  if (t < 32.3) { const u = (t - 31.98) / 0.32; return [K.lerp(R[0], 450, u), K.lerp(R[1], 924, u * u), -0.5 * u]; }
  return [450, 924 + 0, 0];
}
function h3CatRoof(t) {
  const tc = EH_T2(t), P = { x: EH_ROOF.catSpot[0], y: EH_ROOF.catSpot[1], s: 0.62, pal: 2, dir: -1, crouch: 0, sit: 1, lid: ehLid(t, 45) * 0.7 + 0.2, tailCurl: 0.6 + 0.2 * Math.sin(tc * 1.3), ears: 0.4, gaze: [-1, 0.3] };
  if (t > 30.5) P.gaze = [-1, 0.5];
  if (t >= 32.4 && t < 32.8) { const [x, l] = hop(tc, 32.4, 0.4, 880, 830, 40); P.x = x; P.y = K.lerp(EH_ROOF.catSpot[1], 905, ehE(tc, 32.4, 0.4, 'in')) - l; P.sit = 0; }
  else if (t >= 32.8 && t < 33.5) { Object.assign(P, walk(H3_F([[32.8, 830], [33.5, 500]]), tc, { stride: GAIT.cat * 0.62 })); P.y = 905; P.sit = 0; P.tailUp = 1; }
  else if (t >= 33.5) { const [x, l] = hop(tc, 33.5, 0.3, 500, 452, 30); P.x = x; P.y = K.lerp(905, 924 - 46 * 0.85, ehE(tc, 33.5, 0.3)) - l; P.sit = t > 33.8 ? 1 : 0; P.tailCurl = 0.9; P.lid = Math.max(0.3, ehLid(t, 45)); P.gaze = [1, 0]; }
  return P;
}
function h3RoofWorld(ctx, t, cam) {
  const tc = EH_T2(t), t3 = EH_T3(t);
  palaceRoof(ctx, t, cam, { night: 0, moon: [1150, 240, 80], door: t < 20.9 ? 0 : flow(t, [[20.9, 0], [21.3, 1], [30.6, 1], [31.2, 0.4]]), win: 0.3, lanterns: 0.7, path: flow(t, [[19.94, 0], [20.9, 1]]), cup: true, wind: 0 });
  const H = h3RoofHorse(t), fz = h3FzRoof(t), pr = h3PrRoof(t), PA = h3Parents(t), GU = h3GuardsRoof(t), md = h3MaidRoof(t), ct = h3CatRoof(t), rim = { rim: '#ffb0a0', light: [1, -0.6], rimW: 2.5 };
  if (ct.y < 850) { h3Shadow(ctx, ct.x, EH_ROOF.catSpot[1] + 2, 70 * ct.s); cat(ctx, ct); }
  const rows = [];
  for (const [D, P] of GU) rows.push([P.y, () => h3Guard(ctx, D, P, t)]);
  rows.push([900, () => { h3Shadow(ctx, H.x + 10, 902, 300 * H3_HS, H.lift, { alpha: 0.34, fall: 420 });
    if (t < 19.4) { const PP = { s: EH_FIRUZ.s, lid: ehLid(t, 3), mouth: 'smile', gaze: [1, 0.1], handL: [70, -110], handR: [76, -100], sq: landSquash(tc, 18.94, 0.12), lurch: 0.1 }; castFinish(ctx, H.x, H.y + 20, 700, 900, (c) => ehRide(c, H, 'firuz', PP, t, { tc, stream: 0.2, ang: Math.PI / 2 + 0.4 }), rim); }
    else castFinish(ctx, H.x, H.y + 20, 700, 900, (c) => ebonyHorse(c, H), { rim: '#ffd27a', light: [1, -0.6], rimW: 3 });
    if (t > 18.94 && t < 19.8) dustBurst(ctx, H.x, 902, t - 18.94, 12, 8, 18, 150, 0.8, 7);
    // counters over the two seats, then the trunk that slides off the polished rump
    if (t >= 31.08 && t < 33.6) { const A = ehHorsePt(H, [EH_EBG.seat[0] + EH_SEAT2.front, -300]), B = ehHorsePt(H, [EH_EBG.seat[0] + EH_SEAT2.rear, -300]); ctx.save(); ctx.globalAlpha *= K.clamp((33.6 - t) / 0.3); S0.counter(ctx, 1, A[0] + 20, A[1], K.clamp((t - 31.08) / 0.3), { size: 90 }); if (t >= 31.36) S0.counter(ctx, 2, B[0] - 20, B[1], K.clamp((t - 31.36) / 0.3), { size: 90 }); ctx.restore(); } }]);
  if (fz) rows.push([fz.y, () => h3Person(ctx, EH_FIRUZ, fz, t, { cape: true, swing: swing(tc, 19.78, 0.3) + swing(tc, 25.9, 0.25), rim })]);
  if (pr) rows.push([pr.y + 1, () => h3Person(ctx, EH_PRINCESS, pr, t, { veil: true, vx: t < 19.6 ? -300 : 0, rim })]);
  for (const [D, P] of PA) rows.push([P.y, () => h3Person(ctx, D, P, t, { rim })]);
  if (md) rows.push([md.y - 1, () => { h3Person(ctx, EH_MAID, md, t); const top = md.y - 210 * md.s, n = t < 31.98 ? 3 : 2; packLoad(ctx, Array.from({ length: n }, (_, i) => ({ kind: 'chest', col: ['#3f7ad0', '#e8604a', '#3fae6a'][i] })), md.x - 6, top + 6, 0.62); }]);
  const tk = h3TrunkTop(t); if (tk) rows.push([925, () => { ctx.save(); ctx.translate(tk[0], tk[1]); ctx.rotate(tk[2]); packLoad(ctx, [{ kind: 'chest', col: '#3fae6a' }], 0, 0, 0.85); ctx.restore(); if (t > 32.3 && t < 32.8) dustBurst(ctx, 450, 926, t - 32.3, 7, 5, 10, 70, 0.5, 9); if (ct.y >= 850) { h3Shadow(ctx, ct.x, Math.min(ct.y, 905), 80 * ct.s); cat(ctx, ct); } }]);
  else if (ct.y >= 850) rows.push([905, () => { h3Shadow(ctx, ct.x, ct.y, 80 * ct.s); cat(ctx, ct); }]);
  rows.sort((a, b) => a[0] - b[0]).forEach((r) => r[1]());
  if (t > 32.26 && t < 32.7) { ctx.save(); ctx.globalAlpha = 1 - (t - 32.26) / 0.44; ctx.strokeStyle = '#fff6ea'; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(450, 928, 40 + 120 * (t - 32.26), 10 + 20 * (t - 32.26), 0, 0, 7); ctx.stroke(); ctx.restore(); }
  palaceRoofFront(ctx, t, { door: 0, night: 0 });
}
const H3_RCAM = [[18.4, { x: 900, y: 480, zoom: 0.75 }], [20.9, { x: 920, y: 480, zoom: 0.75 }], [21.9, { x: 1080, y: 540, zoom: 0.85 }], [29.4, { x: 1060, y: 540, zoom: 0.85 }], [30.8, { x: 860, y: 540, zoom: 0.85 }], [34.4, { x: 840, y: 540, zoom: 0.85 }]];
function h3RoofCam(t) { const c = K.camAt(H3_RCAM, t), z = c.zoom; return { x: K.clamp(c.x, 500 / z, EH_ROOF.w - 500 / z), y: K.clamp(c.y, EH_ROOF.top + 615 / z, 1230 - 615 / z), zoom: z }; }
// the picture balloon of her plan: his palace (right), her dome (left), a dashed land road with the escort; sun and moon pass twice
function h3CloudLand(c, t) {
  const tc = EH_T2(t); ehGrad(c, 0, 0, 1600, 900, [[0, '#7ab8f8'], [1, '#d8f0ff']]);
  const k = ((t - 26.32) / 0.64) % 1; if (t >= 26.32 && t < 27.6) { const a = Math.PI * (1 - k); (Math.floor((t - 26.32) / 0.64) % 2 ? ehMoon : (cc, x, y, r) => { ehGlow(cc, x, y, r * 3, 0.6, '#fff2c0'); celShade(cc, ell(x, y, r, r, 30), '#fff6d0', '#ffe2a0', { off: 6, lw: 0 }); })(c, 800 + Math.cos(a) * 600, 420 - Math.sin(a) * 300, 50, t); }
  c.fillStyle = '#e8c890'; c.fillRect(0, 640, 1600, 400); c.fillStyle = '#7ac85a'; c.fillRect(1100, 600, 500, 400); c.fillRect(0, 610, 420, 400);
  c.drawImage(ehPalacePlate(), 1060, 160, 560, 420); for (const bx of [1150, 1520]) { seg(c, bx, 600, bx, 420, 6, '#8a5a3a', 2); ehRibbon(c, bx, 430, 0.1, 120, 40, tc, EH_EMERALD, { wave: 8, hz: 1.2, tip: 0.7, shade: '#126e4a' }); }
  if (t >= 27.14) { const u = ehE(tc, 27.14, 0.4, 'out'); c.save(); c.globalAlpha = u; princessPalace(c, 230, 640, 0.9, {}); c.restore(); h3DashArc(c, [360, 700], [1180, 660], -0.18, K.clamp((t - 27.2) / 0.8), '#e8604a', 14); }
  if (t >= 27.62) { const u = (t - 27.62) * 120, road = (x) => 700 - (x - 360) / 820 * 40 - 50 * Math.sin((x - 360) / 820 * Math.PI) * 0.6;
    const fx = 380 + u; camel(c, { ...walk((tt) => 380 + (tt - 27.62) * 120, tc, { stride: GAIT.camel * 0.4 }), y: road(fx) + 6, s: 0.4, pal: 0, dir: 1, saddle: true, load: [{ kind: 'rug', col: '#e8364f' }] });
    [[-80, EH_GUARD_A], [-130, EH_GUARD_B], [-180, EH_MAID]].forEach(([dx, D], i) => { const x = fx + dx; person(c, ehDressP(D, { ...walk((tt) => 380 + dx + (tt - 27.62) * 120, tc, { stride: 20 }), y: road(x) + 4, s: 0.42, dir: 1, mouth: 'smile', lid: 0, handL: [-20, -96], handR: [30, -150] })); }); }
}
function h3RoofOver(ctx, t, cam, S) {
  const P = (x, y) => h3P(x, y, cam), fz = h3FzRoof(t), pr = h3PrRoof(t), fzH = fz ? P(...ehHeadOf(fz)) : null, prH = pr ? P(...ehHeadOf(pr)) : null;
  if (fzH && t >= 19.6 && t < 21.1) h3Say(ctx, S, [[19.6, "THE MOON KNOWS\nTHE RIVER'S PATH"]], t, fzH, { gone: 20.85, size: 42, dx: 60, up: 170, col: '#ffd36a' });
  if (prH && t >= 24.3 && t < 30.2) { const p = t < 29.8 ? K.clamp((t - 24.3) / 0.6) : 1 - K.clamp((t - 29.8) / 0.4); thoughtCloud(ctx, 500, 290, 860, 400, t, { p, tail: [prH[0] - 10, prH[1] - 40], seed: 11, bg: '#bfe6ff', scale: 0.52, at: [800, 560], inside: (c) => h3CloudLand(c, t) }); }
  if (prH && t >= 25.1 && t < 26.9) h3Say(ctx, S, [[25.1, 'I WILL COME BY LAND']], t, [prH[0], prH[1] + 40], { gone: 26.6, size: 42, up: 110, dx: 80 });
  if (t >= 32.48 && t < 34.3) { const H = h3RoofHorse(t), sa = P(...ehHorsePt(H, [EH_EBG.seat[0], -250])); ctx.save(); ctx.globalAlpha *= K.clamp((34.3 - t) / 0.3); S.arrow(ctx, [sa[0] + 150, sa[1] - 190], [sa[0] + 10, sa[1] - 20], K.clamp((t - 32.48) / 0.3), { width: 9 }); S.label(ctx, 'ONLY TWO SEATS!', K.clamp(sa[0] + 170, 230, 770), sa[1] - 230, K.clamp((t - 32.48) / 0.35), { size: 48 }); ctx.restore(); }
}
