// ===== HORSE-03: the PLAN (51.6 - 82.53): the inventor's imagined trick inside a large thought cloud (planGarden + cardboardPrince) =====
// Plan world: ground y 900, bench 760, the plan horse 1150 facing right, an orange tree 1360, a hedge strip behind (y 760).
// Plan figures are deliberately too smooth: no anticipation, no overshoot (straight flows), the princess trusts at once, no cat.
const H3_PL = { bench: 760, horse: 1150, tree: 1360, stool: 1090 };
function h3PlanBack() { return ehBakeAt('h3plan', 2000, 1100, (c) => { c.translate(0, -100);
  ehGrad(c, 0, 100, 2000, 1100, [[0, '#f4ecff'], [0.55, '#ffeef8'], [1, '#fff6e8']]);
  for (const [x, y] of [[300, 300], [900, 220], [1500, 330]]) ehCloud(c, x, y, 340, 80, '#ffffff', '#e8dcf8', 6, x);
  celShade(c, [[0, 800], ...Array.from({ length: 51 }, (_, i) => [i * 40, 760 - 6 * Math.sin(i * 1.3)]), [2000, 800]], '#8ad0a0', '#5aa878', { off: 14, lw: 3, line: '#3a7a58' });
  ehGrad(c, 0, 800, 2000, 300, [[0, '#a8e0a8'], [1, '#c8f0c0']]); c.fillStyle = '#f4e4ec'; c.fillRect(0, 884, 2000, 50);
  const x = H3_PL.tree; seg(c, x, 905, x, 760, 14, '#a87a5a', 3); for (let i = 0; i < 9; i++) { const a = i * 0.7; ehBlob(c, x + Math.cos(a) * 60, 650 + Math.sin(a) * 50, 50, 44, '#7ac88a', '#4a9a68', { lw: 2 }); } for (let i = 0; i < 7; i++) ehBlob(c, x - 70 + i * 22, 620 + (i % 3) * 30, 9, 9, '#ffb04a', '#d0802a', { lw: 1.5 });
  const B = H3_PL.bench; celShade(c, K.rectPts(B - 120, 848, 240, 14), '#fff6ff', '#d0c0e0', { off: 4, lw: 3, line: '#7a6a8a' }); for (const dx of [-90, 90]) celShade(c, K.rectPts(B + dx - 12, 862, 24, 40), '#e8e0f0', '#b8a8d0', { off: 4, lw: 2.5, line: '#7a6a8a' });
  for (let i = 0; i < 24; i++) { const R = K.rng(800 + i); ehFlower(c, 100 + i * 80 + R() * 30, 990 + R() * 80, 26, ['#ff8aa8', '#ffd36a', '#c8a0ff', '#fff6ea'][i % 4]); }
}, 0.5); }
// the plan inventor: walks in (52.16), the deep bow (53.3), the cloth off (55.7), presents (60.76), knob (61.74), lever (62.26),
// points away (63.2), schoolmaster (69.4), the acrobat leap (70.46), the reach (72.26), the turn (73.02), serene refusal (80.1)
const H3_PIX = H3_F([[52.16, 1720], [53.3, 1010], [55.4, 1010], [55.7, 1070], [60.4, 1070], [60.9, 1240], [67.67, 1240], [69.0, 1210], [70.46, 1210]]);
function h3PlanInvP(t, H) {
  const tc = EH_T2(t), P = { ...walk(H3_PIX, tc, { stride: 24 }), y: 900, s: 1.04, age: 0.4, dir: -1, lid: 0.12, brow: -0.3, mouth: 'smile', sq: breathe(tc, 141, 0.012), tip: idleSway(tc, 141, 0.015, 3.4), gaze: [-1, 0], handL: PERSON_HANDS.clasp.L, handR: PERSON_HANDS.clasp.R };
  if (t >= 53.3 && t < 54.3) { const b = flow(tc, [[53.3, 0], [53.6, 1], [54.0, 1], [54.3, 0]]); P.tip = 0.6 * b; P.drop = 26 * b; P.handR = PERSON_HANDS.chest.R; P.handL = [-90 * b - 20, -120 + 40 * b]; }
  if (t >= 53.74 && t < 55.2) P.talk = ehTalk(t, 53.74, 55.1, 141, 0.6);
  if (t >= 55.7 && t < 56.4) { P.dir = 1; P.handR = [K.lerp(40, 120, ehE(tc, 55.7, 0.3)), K.lerp(-200, -230, ehE(tc, 55.7, 0.3))]; P.handL = [-60, -200]; }
  if (t >= 56.4 && t < 60.76) { P.dir = -1; P.handL = PERSON_HANDS.palmsUp.L; P.handR = PERSON_HANDS.palmsUp.R; P.gaze = [-1, 0.1]; }
  if (t >= 60.76 && t < 63.2) { P.dir = 1; P.gaze = [1, -0.2]; const kn = ehHorsePt(H, EH_EBG.knob), lv = ehHorsePt(H, EH_EBG.lever); P.handL = [-50, -110];
    if (t < 61.74) { P.handL = PERSON_HANDS.palmsUp.L; P.handR = PERSON_HANDS.palmsUp.R; } else if (t < 62.26) P.handRW = kn; else P.handRW = lv; }
  if (t >= 63.2 && t < 65.98) { P.dir = 1; P.handR = PERSON_HANDS.pointFwd.R; P.handR = [P.handR[0] + 10, P.handR[1] - 40]; P.gaze = [1, -0.3]; P.handL = [-24, -110]; }
  if (t >= 65.98 && t < 70.46) { P.dir = -1; P.handL = PERSON_HANDS.palmsUp.L; P.handR = [60, -110]; P.gaze = [-1, 0.1]; if (t >= 69.4) { P.dir = 1; P.handR = [100, -150]; P.handRW = ehHorsePt(H, [EH_EBG.knob[0], EH_EBG.knob[1] + 30]); P.gaze = [1, 0.1]; P.mouth = 'open'; P.talk = ehTalk(t, 69.4, 70.3, 141, 0.5); } }
  return P;
}
const H3_PPX = H3_F([[57.54, H3_PL.bench - 10], [65.6, H3_PL.bench - 10], [67.5, H3_PL.stool], [70, H3_PL.stool]]);
function h3PlanPrP(t) {
  const tc = EH_T2(t), P = { ...walk(H3_PPX, tc, { stride: 24 }), y: 900, s: 0.95, dir: 1, lid: ehLid(t, 151), sq: breathe(tc, 151, 0.012), tip: idleSway(tc, 151, 0.018, 3.2), mouth: 'smile', gaze: [1, 0], handL: PERSON_HANDS.clasp.L, handR: PERSON_HANDS.clasp.R };
  if (t < 57.54) { P.sit = 1; P.seat = 'bench'; P.amp = 0; P.handL = [20, -96]; P.handR = [30, -96]; P.gaze = t < 52.98 ? [0.2, 0.7] : [1, -0.1]; P.mouth = t < 52.98 ? 'closed' : 'smile'; }
  else if (t < 58.78) { const c = Math.sin(tc * 22) > 0; P.handL = c ? [22, -140] : [0, -140]; P.handR = c ? [26, -140] : [52, -140]; P.mouth = 'open'; P.eyes = 'wide'; }
  else if (t < 65.22) { const loose = ehE(tc, 62.7, 0.4); P.handL = [K.lerp(22, 0, loose), -105]; P.handR = [K.lerp(-18, 10, loose), -112]; P.mouth = 'frown'; P.brow = 0.5; P.lid = 0.3; P.gaze = t > 61.6 && t < 63.0 ? [1, -0.3] : [1, 0]; if (t > 63.2) P.gaze = [1, -0.4]; }
  else { P.drop = 8 * pulse(tc, 65.3, 0.35); P.mouth = 'smile'; }
  return P;
}
// the plan horse and riders: lift-off 74.76 (the garden drops away), across the cloud 76.1, gone 81.06
function h3PlanHorse(t) { const H = { x: H3_PL.horse, y: 900, s: 0.9, dir: 1 }; if (t >= 74.02) H.lit = ehLitMax(ehPowerOn(t, 74.02, 0.18, 0.5), {});
  if (t >= 74.76) { const up = flow(t, [[74.76, 0], [76.1, 420], [81.06, 470]]), dx = flow(t, [[75.6, 0], [81.06, 900]]); H.y = 900 - up; H.x += dx; H.air = true; H.s = 0.9 * (1 - 0.5 * ehE(t, 80.4, 0.9)); } return H; }
function h3PlanInside(c, t) {
  const tc = EH_T2(t), H = h3PlanHorse(t), inv = h3PlanInvP(t, H), pr = h3PlanPrP(t), mounted = t >= 68.3, invM = t >= 71.3;
  c.drawImage(h3PlanBack(), 0, 100, 2000, 1100);
  if (t > 74.76) { ehTile(c, ehCloudTile('mid', 'day'), -(t - 74.76) * 300 + (H.x - 1150), (t - 74.76) * 40, 0.6); }
  // the cardboard prince behind the plan tree (64.6 - 67.0), waving on its stick
  if (t >= 64.6 && t < 67.4) { const u = ehE(t, 64.6, 0.25, 'out'), d = t > 67.0 ? ehE(t, 67.0, 0.3) : 0; c.save(); c.beginPath(); c.rect(0, 0, 2000, 905); c.clip(); cardboardPrince(c, H3_PL.tree + 70, 905 + 260 * (1 - u) + 260 * d, 1.25, 0.06 * Math.sin(t * 3.4)); c.restore(); }
  if (!H.air) { groundShadow(c, H.x, 902, 270, 0, { flat: true, color: '#7a6a9a', alpha: 0.2 }); }
  else groundShadow(c, H3_PL.horse + (H.x - H3_PL.horse) * 0.5, 902, 270, 900 - H.y, { flat: true, color: '#7a6a9a', alpha: 0.2, fall: 500 });
  if (t >= 67.67 && t < 68.3) { const u = ehE(tc, 67.67, 0.63); seatStool(c, H3_PL.stool + 40, 905, 1); }
  else if (!mounted || t < 74.76) seatStool(c, H3_PL.stool + 40, 905, 1);
  // the horse with nobody, the princess alone, or both riders
  const glints = t >= 56.86 && t < 58.0;
  if (H.air) ehWindRibbons(c, H, tc, { ang: H.x > 1160 ? Math.PI : Math.PI / 2, len: 220 });
  if (!mounted) { ebonyHorse(c, { ...H, lit: t >= 61.74 && t < 62.6 ? { chest: 0.6, neck: t > 62.26 ? 0.6 : 0 } : H.lit }); }
  else { const PF = { s: 0.95, lid: ehLid(t, 151), mouth: 'smile', gaze: [1, 0.2], handL: [60, -110], handR: [70, -104], lurch: 0.08 };
    if (t >= 69.4 && t < 71.3) { PF.lurch = 0.3; PF.gaze = [0.6, 0.8]; }
    if (t >= 76.76 && t < 78.1) { PF.gaze = [0.1, 1]; PF.handR = [-60, -90]; PF.lurch = -0.1; }
    if (t >= 78.1) { PF.gaze = [-1, 0]; PF.handR = PERSON_HANDS.pointDown.R.map((v, i) => (i ? v : -v)); PF.mouth = 'o'; }
    const PR = invM ? { s: 1.04, age: 0.4, lid: 0.12, brow: -0.3, mouth: 'smile', gaze: [1, 0], handL: [60, -110], handR: [70, -104], lurch: 0.1 } : null;
    if (PR && t >= 72.26) { const kn = h3Loc(H, 1.04, EH_EBG.knob, EH_SEAT2.rear, EH_SEAT2.rearDy); PR.handR = t < 73.02 ? [kn[0] - 30, kn[1] - 20] : kn; PR.lurch = 0.25; }
    if (PR && t >= 74.76) { PR.handR = [60, -110]; PR.lurch = 0.1; }
    if (PR && t >= 80.1) { PR.lid = 1; PR.tip = 0.12 * Math.sin((tc - 80.1) * 3.2); PR.gaze = [1, 0]; }
    if (PR && t >= 81.06) { PR.handL = PERSON_HANDS.folded.L; PR.handR = PERSON_HANDS.folded.R; }
    twoRiders(c, { ...H, knob: t >= 73.02 ? Math.PI / 2 : 0 }, { who: 'princess', D: EH_PRINCESS, P: PF }, PR ? { who: 'inventor', D: EH_INVENTOR, P: PR } : null, t, { tc, tail: { stream: H.air ? 1 : 0.3 }, veil: { stream: H.air ? 1 : 0 }, armOver: PR && t >= 72.26 && t < 74.76 ? ehHorsePt(H, EH_EBG.knob) : null }); }
  if (glints) { for (const [i, p] of [[0, EH_EBG.knob], [1, EH_EBG.chest], [2, [90, -8]], [3, [-98, -8]], [4, EH_EBG.eye], [5, [80, -84]]]) { const [x, y] = ehHorsePt(H, p); ehGlint(c, x, y, 30, ((t - 56.86) / 0.6 + i * 0.13) % 1); } }
  // the cloth: on the plan horse until 55.7, then one conjurer's sweep off to the right
  if (t < 55.7) coverCloth(c, ehClothDraped(H, t), {});
  else if (t < 56.4) { const u = ehE(tc, 55.7, 0.7, 'out'); coverCloth(c, ehClothSpread(K.lerp(H.x + 40, H.x + 520, u), K.lerp(H.y - 200, H.y - 420, u), 380, 200, -0.6 * u, t, 1), { alpha: 1 - u }); }
  // the plan figures on the ground (the princess until she mounts, the inventor until his leap)
  if (!mounted) { groundShadow(c, pr.x, 902, 80, 0, { flat: true, color: '#7a6a9a', alpha: 0.2 }); let PP = pr; if (t >= 67.67) { const [x, l] = hop(tc, 67.67, 0.63, H3_PL.stool, H.x - 30, 110); PP = { ...pr, x, y: 900 - l, amp: 0, handL: [-40, -170], handR: [40, -170] }; } person(c, ehDressP(EH_PRINCESS, PP)); ehVeilRibbon(c, PP, tc, {}); }
  if (!invM) { let I = inv; if (t >= 70.46) { const u = K.clamp((tc - 70.46) / 0.84), [x, l] = hop(tc, 70.46, 0.84, 1210, H.x - 60, 150); I = { ...inv, x, y: 900 - l, amp: 0, dir: Math.floor(u * 4) % 2 ? -1 : 1, handL: [-60, -200], handR: [60, -200], sq: 1.05 }; }
    groundShadow(c, I.x, 902, 90, 900 - I.y, { flat: true, color: '#7a6a9a', alpha: 0.2 }); ehInvTail(c, I, tc, { vx: I.amp > 0.2 ? -200 : 0 }); person(c, ehDressP(EH_INVENTOR, I)); }
}
// the plan cloud's inside camera: centred on the bench and horse; re-centres on the horse (67.67); follows the flight (74.76)
function h3PlanAt(t) { return [flow(t, [[67.67, 1040], [68.27, 1100], [75.6, 1100], [81.06, 1700]]), flow(t, [[74.76, 730], [76.1, 410], [81.06, 390]])]; }
// ---------- overlays over the garden (panel units) ----------
function h3GardenOver(ctx, t, cam, S) {
  const P = (x, y) => h3P(x, y, cam), ih = h3InvHedge(t), inv = h3InvG(t), pr = h3PrG(t), H = h3GHorse(t);
  // the plan cloud (51.6 - 82.53): three bubbles from the turban, then the big cloud; it bursts top down at 81.9, the bubbles last
  if (ih && t >= 51.6 && t < 82.53) { const hd = P(...ehHeadOf(ih)), op = K.clamp((t - 51.6) / 0.7), cl = t > 81.9 ? K.clamp(1 - (t - 81.9) / 0.4) : 1, hgt = 520 + 80 * ehE(t, 74.76, 1.3) * (t < 81.9 ? 1 : 0);
    const p = Math.min(op, t > 81.9 ? K.lerp(0.3, 1, cl) : 1), at = h3PlanAt(t);
    if (t > 81.9 && cl <= 0.02) { const k = 1 - K.clamp((t - 82.3) / 0.23); thoughtCloud(ctx, 500, 330, 820, hgt, t, { p: 0.29 * k, tail: [hd[0], hd[1] - 70], seed: 21 }); }
    else thoughtCloud(ctx, 500, 320 - (hgt - 520) * 0.4, 840, hgt * (t > 81.9 ? 0.6 + 0.4 * cl : 1), t, { p: t > 81.9 ? 0.3 + 0.7 * cl : p, tail: [hd[0], hd[1] - 70], seed: 21, bg: '#f4ecff', scale: 0.7, at, inside: (c) => h3PlanInside(c, t) });
    if (t >= 51.9 && t < 81.9) { ctx.save(); ctx.globalAlpha *= K.clamp((81.9 - t) / 0.3); S.label(ctx, 'THE PLAN', 230, 110, K.clamp((t - 51.9) / 0.35), { size: 46 }); ctx.restore(); }
    const pl = (x, y) => [500 + (x - at[0]) * 0.7, 320 - (hgt - 520) * 0.4 + (y - at[1]) * 0.7];
    if (t >= 53.74 && t < 55.4) { const I = h3PlanInvP(t, h3PlanHorse(t)); h3Say(ctx, S, [[53.74, 'FIRUZ SENT ME!']], t, pl(I.x, 900 - 200), { gone: 55.15, size: 34, up: 70, dx: 60 }); }
    if (t >= 54.96 && t < 56.4) { const [x, y] = pl(1010, 640), k = K.ease.back(K.clamp((t - 54.96) / 0.3)); ctx.save(); ctx.globalAlpha *= K.clamp((56.4 - t) / 0.3); ctx.translate(x, y); ctx.scale(k, k);
      ehRibbon(ctx, -6, 10, Math.PI / 2 + 0.3, 46, 16, t, EH_CRIMSON, { wave: 3, tip: 0.6, shade: '#b0183a' }); ehRibbon(ctx, 6, 10, Math.PI / 2 - 0.3, 46, 16, t + 0.3, EH_CRIMSON, { wave: 3, tip: 0.6, shade: '#b0183a' });
      celShade(ctx, [[-26, 10], [-26, -14], [-14, -2], [0, -22], [14, -2], [26, -14], [26, 10]], '#f2c040', '#c8961a', { off: 5, lw: 2.5, line: '#6a4a10' }); ctx.restore(); ehGlint(ctx, x, y - 10, 22, (t - 54.96) / 0.6 % 1); }
    if (t >= 58.78 && t < 65.6) { const Pp = h3PlanPrP(t), [x, y] = pl(Pp.x + 10, 900 - 260), sz = (t < 62.7 ? 1 : t < 65.22 ? 0.55 : 0.55 * (1 - K.clamp((t - 65.22) / 0.2)) + 0.6 * K.clamp((t - 65.22) / 0.1) * (t < 65.42 ? 1 : 0)) * K.ease.back(K.clamp((t - 58.78) / 0.3));
      if (sz > 0.01) { ctx.save(); ctx.font = '900 ' + Math.round(80 * sz) + 'px "Barlow Semi Condensed"'; ctx.textAlign = 'center'; ctx.lineWidth = 8 * sz; ctx.strokeStyle = '#2b1a3a'; ctx.fillStyle = '#ff7ad9'; ctx.strokeText('?', x, y); ctx.fillText('?', x, y); ctx.restore(); } }
    if (t >= 62.26 && t < 63.3) { const lv = ehHorsePt(h3PlanHorse(t), EH_EBG.lever), [x, y] = pl(lv[0] + 40, lv[1] - 10); ctx.save(); ctx.globalAlpha *= K.clamp((63.3 - t) / 0.3); S.arrow(ctx, [x, y - 30], [x, y + 40], K.clamp((t - 62.26) / 0.3), { width: 7, color: '#ff7ad9' }); ctx.restore(); }
    if (t >= 79.48 && t < 80.6) { const Hh = h3PlanHorse(t), [x, y] = pl(Hh.x + 60, Hh.y - 140), u = K.clamp((t - 79.48) / 0.5); ctx.save(); ctx.globalAlpha *= K.clamp((80.6 - t) / 0.3); S.arrow(ctx, [x, y], [x, y + 50 + 30 * u], u, { width: 7, color: '#ff7ad9' }); ctx.restore(); } }
  if (ih && t >= 81.72 && t < 82.6) { const hd = P(...ehHeadOf(ih)); h3Word(ctx, S, 'HEH HEH!', hd[0] + 150 + 4 * Math.sin(t * 40), hd[1] - 110, t, 81.72, 82.5, { size: 62 }); }
  // the real trick
  if (inv) { const hd = P(...ehHeadOf(inv));
    if (t >= 86.12 && t < 87.7) h3Say(ctx, S, [[86.12, 'FIRUZ SENT ME\nTO TEACH YOU!']], t, hd, { gone: 87.45, size: 42, up: 170, dx: 40 });
    if (t >= 98.42 && t < 99.9) h3Say(ctx, S, [[98.42, 'THE PRINCE WAITS\nNEARBY!']], t, hd, { gone: 99.65, size: 42, up: 170, dx: -60 }); }
  if (t >= 96.26 && t < 98.3) { const kb = P(...ehHorsePt(H, EH_EBG.knob)), lv = P(...ehHorsePt(H, EH_EBG.lever)); ctx.save(); ctx.globalAlpha *= K.clamp((98.3 - t) / 0.3);
    S.arrow(ctx, [kb[0] + 170, kb[1] + 150], [kb[0] + 18, kb[1] + 16], K.clamp((t - 96.26) / 0.3), { width: 10 }); S.label(ctx, 'UP', kb[0] + 200, kb[1] + 190, K.clamp((t - 96.26) / 0.3), { size: 50 });
    if (t >= 96.7) { S.arrow(ctx, [lv[0] + 190, lv[1] - 110], [lv[0] + 16, lv[1] - 8], K.clamp((t - 96.7) / 0.3), { width: 10, color: '#ff7ad9' }); S.label(ctx, 'DOWN', K.clamp(lv[0] + 220, 120, 880), lv[1] - 150, K.clamp((t - 96.7) / 0.3), { size: 50 }); } ctx.restore(); }
  if (t >= 110.36 && t < 111.0) S.emphasis(ctx, P(H3_HX0, 700)[0], P(H3_HX0, 700)[1], 300, (t - 110.36) / 0.64, { rect: [0, 0, 1000, 1230], word: '' });
  if (t >= 110.95 && t < 111.9) { const c0 = h3CatG(110.9), [x, y] = P(c0.x, c0.y); h3Word(ctx, S, 'RIP!', K.clamp(x + 90, 140, 860), y - 60, t, 110.95, 111.9, { size: 70 }); }
  // the whip pan into the garden at 48.92
  if (t >= 48.92 && t < 49.15) { const u = (t - 48.92) / 0.23; ctx.save(); ctx.globalAlpha = 1 - u; ctx.fillStyle = '#fff6ea'; for (let i = 0; i < 22; i++) { const R = K.rng(60 + i), y = R() * 1230, w = 300 + R() * 600; ctx.fillRect((R() * 1400 - 200) - 600 * u, y, w, 4 + R() * 10); } ctx.restore(); }
}
