// ===== AN-151 schoolroom (palaceHall merchant variant, ochre, kuttab dressing): S3, S5-S9, S14-S17 =====
// staging (learned by the audience): door left (60..200), pupils on mats A 200, C 300, B 400, D 500, lesson stand 610, teacher's cushion 740, window 840..950 x 470..620
const IL_TABX = [300, 400, 500, 600, 700], IL_NAIL = 414;
const IL_PX = [200, 400, 300, 470], IL_PY = [900, 900, 880, 880];        // pupils A, B, C, D (B sits by the stand: she ends up teaching)
const IL_WIN = { x0: 840, x1: 950, top: 470, bottom: 620 };
const IL_TAB_T = (i) => 15.9 + 0.25 * i;                                 // the wall tablets pop on
const IL_SNEAK = [[50.48, 740], [50.7, 740], [50.95, 772], [51.15, 772], [51.4, 804], [51.6, 804], [51.85, 836], [52.05, 836], [52.3, 860]];

function ilRoomSet(ctx, t, o) {
  palaceHall(ctx, { variant: 'merchant', wall: 'ochre', desk: false, shelves: [], arches: [], window: IL_WIN, doorOpen: o.door || 0, behind: o.behind, t });
  for (let i = 0; i < 5; i++) { const x = IL_TABX[i]; shape(ctx, ell(x, IL_NAIL, 5, 5, 10), '#4a5878', { lw: 2.5, seed: 250 });
    const ti = IL_TAB_T(i); if (t < ti && t < 21.3) continue; const k = t < 21.3 ? settleTo(t, ti, 0.2, 1, 0.3, 0.2) : 1;
    let flip = i === 3 ? Math.PI : 0, hang = 0; if (i === 3 && t >= 168.3) { hang = 0.06 * pulse(t, 168.3, 0.25) + (t >= 168.94 ? swing(t, 168.94, 0.07, 2.2, 3) : 0); if (t >= 168.54) flip = settleTo(t, 168.54, Math.PI, 0, 0.4, 0.06); }
    ctx.save(); ctx.translate(x, IL_NAIL); ctx.rotate(hang); ctx.scale(k, k); ctx.translate(0, 58); ctx.rotate(flip); ilTablet(ctx, 0, 0, 1, { bands: [3, 4, 2, 4, 3][i], letter: ['ا', 'ب', 'ت', 'ث', 'ج'][i] }); ctx.restore(); }
  for (const [px, t0] of [[350, 16.05], [550, 16.55]]) { if (t < t0 && t < 21.3) continue; const k = t < 21.3 ? K.ease.back(K.clamp((t - t0) / 0.25)) : 1;
    ctx.save(); ctx.translate(px, 610); ctx.scale(k, k); shape(ctx, K.rectPts(-30, -38, 60, 76), IL_PAPER, { lw: 4, seed: 252 }); for (let l = 0; l < 4; l++) seg(ctx, 20, -20 + l * 13, l % 2 ? -12 : -20, -20 + l * 13, 1, C.black, 1.5);
    shape(ctx, ell(0, -34, 5, 5, 8), C.red, { lw: 2, seed: 253 }); ctx.restore(); }
  if (o.empty) { if (o.stool) seatStool(ctx, 760, 900); return; }
  for (let i = 0; i < 4; i++) { const x = IL_PX[i], y = IL_PY[i]; shape(ctx, ell(x, y - 4, 70, 18, 28), i % 2 ? C.blue : C.red, { lw: 4, seed: 255 + i, dot: C.yellow, pitch: 7, rad: 0.2, da: 0.4 }); }
  shape(ctx, [[680, 900], [686, 868], [794, 868], [800, 900]], C.red, { lw: 5, seed: 260, dot: C.yellow, pitch: 8, rad: 0.2, da: 0.5 });
  for (const sd of [-1, 1]) shape(ctx, ell(740 + sd * 58, 870, 8, 8, 10), C.yellow, { lw: 3, seed: 261 });
}
// the lesson stand (X frame + the big lesson tablet), drawn in the cast order (y 896)
function ilStand(ctx, t) { seg(ctx, 580, 900, 640, 810, 7, IL_WOOD, 3); seg(ctx, 640, 900, 580, 810, 7, IL_WOOD, 3);
  const b = t >= 162.5 ? K.clamp((t - 162.8) / 2.5) * 4 : 4; ilTablet(ctx, 610, 770, 1.15, { bands: b, glow: t >= 162.5 && t < 166 ? Math.floor((t - 162.5) * 1.6) % 4 : -1, letter: 'ب' }); }

// ---------- the teacher ----------
function ilTeacher(t) {
  const P = ilWho(IL_IMP, { x: 740, y: 900, dir: -1, sit: 1, seat: 'floor', lid: Math.max(0.4, blink(t, 3)) }); const R = { P, tb: { on: true, slump: 0, side: 1 } };
  const sitLap = () => { P.handL = [-28, -96]; P.handR = [30, -92]; };
  if (t < 21.24) { // ---------- S3: hangs the tablets, puts on the turban ----------
    const xf = (u) => kfn(u, [[13.34, 120], [15.0, 300], [15.75, 300], [16.95, 700], [17.4, 620], [18.36, 620], [18.6, 690]]);
    Object.assign(P, walk(xf, t, { stride: 18 }), { sit: 0, dir: 1, gaze: [0.2, -0.7], mouth: 'o', lid: blink(t, 3) }); R.tb.on = false;
    const hung = [0, 1, 2, 3, 4].filter((i) => t >= IL_TAB_T(i)).length;
    if (t < 17.0) { P.handL = [-24, -124]; P.handR = [24, -124]; R.stack = { n: 5 - hung, a: swing(t, 13.9, 0.22, 1.1, 2.4) - 0.04 * Math.sin(t * 5) }; }
    if (t >= 13.9 && t < 14.4) { P.eyes = 'wide'; P.lid = null; P.tip = -0.07 * pulse(t, 13.9, 0.5); }
    if (t >= 14.86 && t < 15.3) { P.gaze = [0.3, 0.9]; P.sq = 1 - 0.04 * pulse(t, 14.86, 0.4); }
    R.roll = t < 16.6 ? 14 * pulse(t, 14.86, 0.4) : null;
    for (let i = 0; i < 5; i++) { const ti = IL_TAB_T(i); if (t >= ti - 0.14 && t < ti + 0.08) { if (i % 2) P.aL = [-2.45, -2.85]; else P.aR = [2.45, 2.85]; P.gaze = lookAt([P.x, 700], [IL_TABX[i], IL_NAIL]); } }
    if (t >= 16.6 && t < 17.0 && R.stack) R.stack.n = 0;
    if (t >= 17.0) { R.stack = null; P.handL = PERSON_HANDS.hipsHands.L; P.handR = PERSON_HANDS.hipsHands.R; P.aL = P.aR = null; P.mouth = 'smile';
      P.gaze = look(t, [P.x, 700], [[17.18, [300, 470]], [17.55, [500, 470]], [17.8, [600, 470]], [18.1, [700, 470]]]); P.tilt = -0.22 * pulse(t, 17.65, 0.55); P.tip = 0.05 * pulse(t, 17.65, 0.55); P.drop = 6 * pulse(t, 18.1, 0.25); }
    if (t >= 18.36) { P.gaze = lookAt([P.x, 700], [760, 820]); P.brow = -0.5; P.handL = [12 + 6 * Math.sin(t * 30), -136]; P.handR = [30 - 6 * Math.sin(t * 30), -132]; }
    if (t >= 18.7 && t < 19.12) { const u = ilE(t, 18.7, 0.32), tp = ilLp([760, 876], [P.x + 2, 520], u); R.loose = tp; P.handL = P.handR = null; P.handLW = [tp[0] - 70, tp[1] - 40 + tremble(t, 2, 8)]; P.handRW = [tp[0] + 70, tp[1] - 40 - tremble(t, 2, 8)];
      P.sq = anticipate(t, 18.6, 0.2, 0.07); P.gaze = lookAt([P.x, 700], tp); P.mouth = 'o'; }
    if (t >= 19.12) { R.tb.on = true; P.handLW = P.handRW = null; P.sq = t < 19.4 ? landSquash(t, 19.12, 0.12) : settleTo(t, 19.4, 0.97, 1, 0.3); P.handL = [-50, -100]; P.handR = [50, -100]; P.gaze = [0.3, -0.8]; R.tb.wobKick = swing(t, 19.12, 0.12, 1.6, 2.6); }
    if (t >= 19.94) { P.handL = null; P.handR = PERSON_HANDS.chin.R; P.lid = Math.max(0.45, blink(t, 3)); P.mouth = 'smile'; P.gaze = [0, 0.05]; P.brow = -0.4; R.tb.glint = (t - 19.94) / 0.7; }
    if (t >= 20.7) { R.tb.slump = 0.6 * ilE(t, 20.7, 0.15) * (1 - ilE(t, 21.0, 0.15)); R.tb.side = 1; if (t >= 20.95) P.handR = [24, -232]; }
    return R;
  }
  if (t < 43.4) { // ---------- S5: the lesson ----------
    sitLap(); P.gaze = look(t, [740, 760], [[28.7, [500, 800]], [29.0, [200, 800]], [29.3, [500, 800]]]); P.mouth = 'closed';
    // 29.44 the stick snaps out at D (WRITE! 32.25); 33.35 a big arc over to B (READ! 35.67)
    if (t >= 29.29 && t < 36.3) { P.sq = anticipate(t, 29.29, 0.15, 0.06); const snap = ilE(t, 29.29, 0.15, 'out'), sw = ilE(t, 33.35, 0.8);
      P.handR = [K.lerp(40, 96, snap), K.lerp(-110, -150, snap) - 14 * Math.sin(Math.PI * sw)]; const a0 = Math.atan2(12, -120), a1 = Math.atan2(40, -236);
      R.pointer = { a: K.lerp(a0, a1, sw) + 0.95 * Math.sin(Math.PI * sw) + 0.08 * swing(t, 29.44, 1, 3, 6) + 0.05 * swing(t, 34.15, 1, 3, 6), L: K.lerp(120, 240, sw) * K.lerp(0.4, 1, snap) };
      P.brow = 0.6; P.lid = Math.max(0.3, blink(t, 3)); P.gaze = t < 33.35 ? lookAt([740, 760], [500, 800]) : lookAt([740, 760], [K.lerp(500, 400, sw), 800]); P.tip = 0.04 * snap * (1 - sw); }
    P.talk = talk(t, [[32.25, 32.9], [35.67, 36.2]]);
    // after each command: eyes closed, chin up, satisfied
    if ((t >= 32.95 && t < 33.35) || (t >= 36.25 && t < 36.9)) { P.lid = 1; P.tilt = -0.14; P.mouth = 'smile'; P.brow = -0.3; P.gaze = [0, -0.5]; }
    if (t >= 36.3) { P.handR = [30, -92]; R.pointer = null; P.lid = Math.max(K.lerp(0.4, 0.6, ilE(t, 35.9, 1.0)), blink(t, 3)); P.gaze = [-0.4, 0.4]; }
    if (t >= 40.3) ilDoze(t, P, R, 40.5);
    if (t >= 42.6 && t < 43.0) { P.wink = 'L'; P.lid = 0; P.gaze = [-0.8, 0.4]; }
    if (t >= 43.0) { P.mouth = 'smile'; }
    return R;
  }
  if (t < 56.36) { // ---------- S6: the woman with the letter; the sneak; the window jam; the drop ----------
    ilDoze(t, P, R, 40.5); P.mouth = 'smile';
    if (t >= 48.76) { P.eyes = 'wide'; P.lid = null; P.brow = -0.9; P.mouth = 'o'; P.drop = 0; P.tilt = 0; P.y = 900 - 8 * pulse(t, 48.76, 0.14); P.gaze = lookAt([740, 760], [575, 760]); R.snore = false; R.tb.slump = 0.65 * (1 - ilE(t, 48.76, 0.15)); R.tb.hopY = 22 * pulse(t, 48.76, 0.3);
      const ly = K.lerp(-96, -58, ilE(t, 48.82, 0.15)); P.handL = [-24, ly + 6]; P.handR = [24, ly + 6]; R.screen = { local: [0, ly] }; }
    if (t >= 49.6) { const u = ilE(t, 49.6, 0.55); P.sit = 1 - u; P.sq = anticipate(t, 49.45, 0.15, 0.06); P.handL = [-50, -120]; P.handR = [50, -120]; R.screen = null; R.lapTab = true; P.mouth = 'frown';
      P.gaze = gazePlan(t, [[49.6, lookAt([0, 0], [-1, 0.2])], [49.95, [1, -0.3]], [50.2, [-1, 0.2]], [50.45, [1, -0.3]]], 0.07); }
    if (t >= 50.1) { P.handR = PERSON_HANDS.hush.R; P.handL = [-40, -96]; P.mouth = 'closed'; P.brow = -0.7; }
    if (t >= 50.48) { const xs = kfn(t, IL_SNEAK, 'out'); P.x = xs; P.dir = 1; P.ph = xs / 9; P.amp = K.clamp(Math.abs(speed((u) => kfn(u, IL_SNEAK, 'out'), t)) / 60) * 1.9;
      P.sq = 1.04 * (P.amp < 0.2 ? 1 : 0.985); P.drop = 6; P.tip = -0.06; P.eyes = null; P.lid = 0.2;
      P.gaze = gazePlan(t, [[50.48, [1, -0.3]], [51.0, [-1, 0.1]], [51.25, [1, -0.3]], [51.5, [-1, 0.1]], [51.75, [1, -0.3]], [52.0, [-1, 0.1]], [52.17, [1, -0.3]]], 0.06); }
    if (t >= 52.17 && t < 52.92) { P.dir = 1; P.handL = null; P.handR = null; R.screen = null; P.x = 860; P.amp = 0; P.tip = 0;
      if (t < 52.42) P.sq = anticipate(t, 52.17, 0.25, 0.1); else { const u = ilE(t, 52.42, 0.5, 'out'); P.x = K.lerp(860, 895, u); P.y = 900 - 160 * u; P.sq = 1.08; P.aL = [-2.5, -2.9]; P.aR = [2.5, 2.9]; } }
    if (t >= 52.92 && t < 55.24) { P.x = 895; P.y = 745; P.dir = 1; P.handL = P.handR = null; P.aL = [-2.4, -2.7]; P.aR = [2.4, 2.7]; R.jam = true; R.screen = null;
      P.ph = swing(t, 52.92, 2.2, 1.8, 1.0) + (t >= 54.18 ? Math.sin(t * 22) * 1.2 : 0); P.amp = 1; if (t >= 54.18) P.x += tremble(t, 3, 13); }
    if (t >= 55.24) { R.jam = false; R.screen = null; P.dir = -1; P.handL = P.handR = null; P.aL = P.aR = null; P.x = 875;
      if (t < 55.5) { P.y = fallY(t, 55.24, 55.5, 745, 900); P.sit = 0; P.eyes = 'wide'; P.lid = null; }
      else { P.y = 900 - rebound(t, 55.5, 10); P.sit = 1; P.sq = impactSquash(t, 55.5, 0.82); P.eyes = null; P.lid = 0; P.wink = 'L'; P.gaze = lookAt([875, 760], [700, 700]); P.mouth = 'o'; }
      R.tb.slump = 0.8; R.tb.side = 1; P.handL = [-50, -70]; P.handR = [50, -70]; }
    return R;
  }
  if (t < 86.06) { // ---------- S7-S9: the two-shot with the woman ----------
    Object.assign(P, { x: 760, sit: 0, dir: -1 }); P.gaze = lookAt([760, 700], [575, 700]); P.lid = Math.max(0.3, blink(t, 3)); P.brow = -0.3;
    let lt = null;   // letter: {w: world centre, rot, s}
    if (t < 56.36 + 0.25) { /* hand-over drawn by the scene */ }
    if (t >= 56.6 && t < 61.44) { const tr = t < 59.3 ? tremble(t, 2, 12) : 0; P.handLW = [702 + tr, 810]; P.handRW = [716, 812 + tr]; lt = { w: [708 + tr, 800], rot: 0, s: 1.0 }; if (t < 58.3) { P.brow = -0.7; P.gaze = look(t, [760, 700], [[56.6, [708, 760]], [57.9, [575, 700]]], 0.08); } }
    if (t >= 60.44 && t < 61.44) { P.handLW = null; P.handL = [-48, -232]; P.gaze = [0.5, -0.9]; P.drop = 4 * pulse(t, 60.9, 0.25); lt = { w: [716, 805], rot: 0.1, s: 1.0 }; P.handRW = [716, 812]; }
    if (t >= 61.44) { const u = ilE(t, 61.44, 0.5), h = ilHead(P), c = ilLp([712, 800], [h.x, h.y + 100], u); lt = { w: c, rot: Math.PI * u, s: K.lerp(1, 1.25, u) }; P.handLW = [c[0] + 50, c[1] + 6]; P.handRW = [c[0] - 50, c[1] + 6]; P.handL = P.handR = null; P.gaze = [0, 0.6]; }
    // 64.35-73.58: the page held at chest height (face clear); the head shake (65.86), worry (67.16), her fear (69.29); lifted again at 73.25
    let held = null;
    if (t >= 64.35 && t < 73.58) { held = 2; P.gaze = [0, 0.6]; P.brow = kfn(t, [[64.35, -0.3], [65.4, -0.85]]); P.mouth = 'closed'; P.lid = Math.max(0.35, blink(t, 3)); }
    if (t >= 65.12 && t < 67.16) { P.sq = 1 + 0.02 * Math.sin((t - 65.12) * 4); }
    if (t >= 65.86 && t < 67.16) { const env = Math.min(1, (t - 65.86) / 0.12, (67.16 - t) / 0.12), ph = (t - 65.86) / 1.24 * Math.PI * 2 * 3, sh = Math.sin(ph) * env;
      P.look = 2.8 * sh; P.tilt = 0.12 * sh; P.tip = 0.035 * sh; P.gaze = [0.95 * Math.sin(ph + 0.7) * env, 0.25]; P.brow = -0.95; P.mouth = 'frown'; P.lid = 0.25; R.tb.wobGain = 2.4; R.tb.tail = -1.6 * sh; }
    if (t >= 67.16 && t < 73.58) { held = 1; P.handL = [-12, -222]; P.handLW = null; P.mouth = 'frown'; P.brow = -0.95; P.lid = 0.85; P.drop = 6 * ilE(t, 67.16, 0.3); P.gaze = [0, 0.4]; R.sweat = t >= 67.8 && t < 68.5 ? (t - 67.8) / 0.7 : 0; }
    if (t >= 68.1 && t < 68.95) { P.lid = 0.15; P.wink = 'L'; P.gaze = [-0.9, 0.2]; }
    if (t >= 68.4 && t < 69.3) { P.tip = 0.07 * ilE(t, 68.4, 0.25); P.mouth = 'o'; }
    if (t >= 69.3 && t < 73.58) { P.lid = Math.max(0.85, blink(t, 3)); P.drop = 8; P.wink = null; }
    if (held) { const h = ilHead(P), low = 100 + 52 * ilE(t, 64.95, 0.3) - 52 * ilE(t, 73.25, 0.3); if (held === 2) { lt = { w: [ilHead({ ...P, look: 0, tilt: 0, tip: 0 }).x, ilHead({ ...P, look: 0, tilt: 0, tip: 0 }).y + low], rot: Math.PI, s: 1.25 }; P.handLW = [lt.w[0] + 50, lt.w[1] + 6]; P.handRW = [lt.w[0] - 50, lt.w[1] + 6]; P.handL = P.handR = null; }
      else { lt = { w: [h.x - 20, h.y + low], rot: Math.PI, s: 1.25 }; P.handRW = [lt.w[0] - 46, lt.w[1] + 6]; } }
    // 73.58-79.5: she mimes; he peers over the page with half lids; a tiny unsure shrug at 78.6
    if (t >= 73.58) { const sg = pulse(t, 78.6, 0.45); P.sq = 1 + 0.05 * sg; P.tilt = 0.1 * sg; const h = ilHead(P); P.handL = null; lt = { w: [h.x, h.y + 100 - 8 * sg], rot: Math.PI, s: 1.25 }; P.handLW = [h.x + 50, lt.w[1] + 6]; P.handRW = [h.x - 50, lt.w[1] + 6]; P.lid = Math.max(0.5, blink(t, 3)); P.gaze = lookAt([760, 700], [575, 720]); P.drop = 0; P.mouth = 'frown'; P.brow = -0.5 + 0.4 * sg; }
    if (t >= 79.48) { const dd = 10 * ilE(t, 79.48, 0.3); lt.w = [lt.w[0], lt.w[1] + dd]; P.handLW[1] += dd; P.handRW[1] += dd; P.lid = 1; P.brow = -0.6; }
    if (t >= 80.44) { P.drop = settleTo(t, 80.44, 0, 14, 0.45, 0.1) * (1 - ilE(t, 81.2, 0.4)); }
    if (t >= 81.3) { P.lid = Math.max(0.6, blink(t, 3)); P.gaze = [-0.5, 0.4]; }
    if (t >= 84.0 && t < 84.6) { P.gaze = [0, 0.05]; P.lid = 0.3; R.sweat = (t - 84.0) / 0.6; }
    if (t >= 84.6) { P.gaze = [-0.5, 0.4]; P.lid = Math.max(0.5, blink(t, 3)); }
    R.letter = lt; return R;
  }
  if (t < 134.78) { // ---------- S14: she storms in; WHY?!; no confession; the invention ----------
    sitLap(); ilDoze(t, P, R, 120); P.lid = 0.9; R.snore = t < 124.32;
    if (t >= 124.32) { P.eyes = 'wide'; P.lid = null; P.sq = 1 + 0.06 * pulse(t, 124.32, 0.3); R.snore = false; R.tb.hopY = 30 * pulse(t, 124.32, 0.35); R.tb.slump = 0.5 * ilE(t, 124.6, 0.15); R.tb.side = -1; P.gaze = lookAt([740, 760], [200, 700]); R.screen = null; P.handL = [-28, -96]; P.handR = [30, -92]; }
    if (t >= 125.04) P.gaze = lookAt([740, 760], [680, 745]);
    if (t >= 125.66) { P.tip = -0.12 * ilE(t, 125.66, 0.25); P.sq = 0.92 + 0.08 * (1 - ilE(t, 125.66, 0.25)); }
    if (t >= 126.7) { P.tip = -0.06; P.sq = 1; P.eyes = null; P.lid = Math.max(0.1, blink(t, 3)); P.gaze = lookAt([740, 760], [610, 720]); P.handRW = [690, 812]; }
    if (t >= 126.8) R.letter = { w: [688, 820], rot: 0.15, s: 0.9 };
    if (t >= 128.14) { P.gaze = gazePlan(t, [[128.14, [-1, 0]], [128.3, [1, -0.3]], [128.46, [-0.6, 0.6]], [128.62, [0.3, 0.8]], [128.78, [-1, 0.1]]], 0.07); P.mouth = pulse(t, 128.2, 0.4) > 0.3 ? 'o' : 'closed'; R.sweat = K.clamp((t - 128.3) / 0.9); }
    if (t >= 128.98) { const u = ilE(t, 128.98, 0.5); P.sit = 1 - u; P.tip = -0.06 * (1 - u); P.handR = [36, -236]; P.handRW = null; R.tb.slump = 0.5 * (1 - ilE(t, 129.3, 0.5)); R.letter = null; P.handLW = null; P.handL = [-40, -78]; R.letterL = true; P.gaze = [0.3, -0.7]; }
    if (t >= 129.9) { P.handR = [40, -90]; P.gaze = [-0.4, 0.2]; P.mouth = 'smile'; }
    if (t >= 130.28) { P.gaze = lookAt([740, 700], [480, 380]); P.eyes = 'wide'; P.lid = null; P.mouth = 'o'; }
    if (t >= 131.08) { const u = ilE(t, 131.08, 0.3); P.handR = [K.lerp(60, -40, u), K.lerp(-240, -150, u)]; P.eyes = null; P.lid = Math.max(0.2, blink(t, 3)); }
    if (t >= 131.6) { P.handR = [40, -90]; P.mouth = 'smile'; P.gaze = lookAt([740, 700], [610, 720]); P.brow = -0.6; }
    if (t >= 132.48) { P.handR = PERSON_HANDS.chin.R; P.gaze = gazePlan(t, [[132.48, [-0.6, -0.9]], [132.7, [-0.2, -1]], [132.9, [-0.7, -0.8]]], 0.07); P.brow = -0.5; P.mouth = 'closed'; }
    if (t >= 133.12) { P.gaze = lookAt([740, 700], [610, 720]); P.mouth = 'smile'; }
    if (t >= 134.04) { P.handR = PERSON_HANDS.pointUp.R; P.gaze = t < 134.4 ? [0, 0.05] : lookAt([740, 700], [610, 720]); P.brow = -0.4; P.sq = settleTo(t, 134.04, 1, 1.03, 0.3); }
    if (t >= 128.98) P.sit = 1 - ilE(t, 128.98, 0.5);
    return R;
  }
  if (t < 156.14) { // ---------- S15-S16: the told story; the pretence; she believes it ----------
    Object.assign(P, { x: 760, sit: 0, dir: -1 }); P.lid = Math.max(0.4, blink(t, 3)); P.gaze = lookAt([760, 700], [600, 710]); P.handL = [-40, -78]; R.letterL = true;
    P.sq = settleTo(t, 134.78, 1, 1.03, 0.3); P.talk = talk(t, [[134.9, 143.4], [143.6, 149.1]]);
    P.handR = [70, -150]; R.pointer = { a: Math.atan2(-1, -0.6), L: 120 };
    if (t >= 137.44) { R.pointer.a = Math.atan2(-1.2, -0.7) + 0.05 * pulse(t, 137.44, 0.3); P.gaze = lookAt([760, 700], [560, 330]); }
    if (t >= 138.3 && t < 141.0) { P.handL = [-50 + 22 * Math.cos(t * 9), -170 + 22 * Math.sin(t * 9)]; R.letterL = false; R.letterSide = true; }
    if (t >= 141.54 && t < 142.3) { P.handL = [-60, -180 + 20 * ilE(t, 141.6, 0.4)]; R.letterL = false; R.letterSide = true; }
    if (t >= 143.42) { R.pointer = null; P.handL = PERSON_HANDS.palmsUp.L; P.handR = PERSON_HANDS.palmsUp.R; P.brow = -0.6; P.mouth = 'smile'; P.talk = 0; R.letterL = false; R.letterSide = true; P.gaze = lookAt([760, 700], [600, 710]); }
    if (t >= 145.36) { P.handR = PERSON_HANDS.chest.R; P.handL = [-40, -78]; R.letterL = true; R.letterSide = false; P.drop = 8 * ilE(t, 145.36, 0.3); P.lid = 0.8; P.mouth = 'frown'; }
    if (t >= 146.38) { P.handR = [20, -190]; P.lid = 0.65; P.wink = 'R'; P.gaze = [-0.8, 0.1]; if (t >= 146.9) { P.lid = 1; P.wink = null; } }
    if (t >= 147.42) { const h = ilHead(P); P.drop = 0; R.letterL = false; R.letter = { w: [h.x, h.y + 100], rot: Math.PI, s: 1.25 }; P.handLW = [h.x + 50, h.y + 106]; P.handRW = [h.x - 50, h.y + 106]; P.handL = P.handR = null; P.lid = Math.max(0.3, blink(t, 3)); P.gaze = lookAt([760, 700], [600, 710]); P.mouth = 'smile'; P.wink = null; }
    if (t >= 149.2) { P.talk = 0; P.lid = Math.max(0.2, blink(t, 3)); }
    if (t >= 152.9) { const h = ilHead(P); R.letter = t < 153.15 ? { w: ilLp([h.x, h.y + 84], [600, 770], ilE(t, 152.9, 0.25)), rot: Math.PI * (1 - ilE(t, 152.9, 0.25)), s: 1 } : null; P.handLW = P.handRW = null; P.handL = [-34, -100]; P.handR = [34, -100]; P.mouth = 'smile'; P.gaze = lookAt([760, 700], [300, 720]); }
    if (t >= 154.9) { P.sq = 0.93 + 0.07 * (1 - ilE(t, 154.9, 0.4)) * 0; P.sq = settleTo(t, 154.9, 1, 0.93, 0.5, 0.05); P.lid = 0.7; P.mouth = 'o'; R.tb.slump = 0.6 * ilE(t, 154.9, 0.4) * (1 - ilE(t, 155.6, 0.4)); R.tb.side = 1; P.gaze = [0, 0.6]; }
    if (t >= 155.4) { P.handR = [kfn(t, [[155.4, 50], [155.75, -30]]), -214]; P.lid = Math.max(0.5, blink(t, 3)); if (t >= 155.8) P.handR = [36, -236]; }
    return R;
  }
  // ---------- S17: he sits again, the class teaches itself, the turban slides over his eyes ----------
  P.sit = t < 156.8 ? settleTo(t, 156.14, 0, 1, 0.6, 0.08) : 1; P.lid = Math.max(0.4, blink(t, 3)); P.gaze = [-0.4, 0.4]; sitLap(); P.mouth = 'smile';
  if (t >= 157.7) R.pointer = { a: Math.PI * 0.98, L: 120, lap: true };
  if (t >= 159.64 && t < 160.7) { P.aL = [-2.45, -2.85]; P.aR = [2.45, 2.85]; P.gaze = [0.2, -1]; R.tb.wobKick = 0.06 * Math.sin((t - 159.64) * 14) * (1 - ilE(t, 159.64, 1)); R.pointer = null; }
  if (t >= 160.8) { R.tb.glint = (t - 160.8) / 0.7; R.tb.wobKick = swing(t, 160.8, 0.06, 1.8, 2.5); }
  if (t >= 161.84) { P.handR = [70 + 14 * Math.sin(t * 6), -170]; P.lid = Math.max(kfn(t, [[161.84, 0.4], [162.6, 0.7]]), blink(t, 3)); if (t >= 162.9) P.handR = [30, -92]; }
  if (t >= 164.3) { P.lid = 0.9; P.drop = 6 * ilE(t, 164.3, 0.5); R.tb.slump = 0.3 * ilE(t, 164.3, 0.5); R.tb.side = 1; R.tb.even = true; }
  if (t >= 165.82 && t < 166.54) { P.wink = 'R'; P.lid = 0; P.gaze = [0, 0.05]; }
  if (t >= 166.54 && t < 167.8) { P.wink = 'R'; P.lid = 0; P.gaze = lookAt([740, 760], kfn(t, [[166.54, 0], [168.0, 1]], 'lin') > 0.5 ? [130, 640] : [480, 520]); }
  if (t >= 167.8) { P.lid = 1; }
  if (t >= 169.4) { R.tb.slump = 0.3 + 0.35 * ilE(t, 169.6, 0.14) + 0.35 * ilE(t, 170.3, 0.1, 'in'); R.tb.hopY = -24 * ilE(t, 170.3, 0.1, 'in') + 3 * pulse(t, 170.4, 0.15); R.tb.even = true; P.lid = 1; R.snore = t >= 170.7; P.sq = t < 170.4 ? 1 : landSquash(t, 170.4, 0.06, 10) * breathe(t, 3, 0.015); }
  return R;
}
// dozing behind an upside-down tablet held as a screen: head sinks, jerks, sinks; turban tips forward; snore bubble
function ilDoze(t, P, R, t0) { const ph = (t - t0) % 2.6, sag = t < 44 ? ilE(t, 40.6, 0.5) : 1, ly = K.lerp(-150, -96, sag); P.handL = [-14, ly]; P.handR = [14, ly]; R.screen = { local: [0, ly] };
  P.lid = Math.max(0.85, blink(t, 3)); P.drop = 14 * sag * K.clamp(ph / 1.2) * (ph < 2.0 ? 1 : 1 - (ph - 2.0) / 0.15) * (ph > 2.15 ? 0 : 1); R.tb.slump = 0.12 + 0.3 * K.clamp(P.drop / 14); R.tb.side = 1; R.tb.even = false; R.snore = sag > 0.5; P.mouth = 'closed'; P.tilt = 0.08 * sag; }

// ---------- the woman in the room ----------
function ilWomanRoom(t) {
  const P = ilWho(IL_WOM, { y: 915, dir: 1, x: 560, lid: Math.max(0.1, blink(t, 7)), gaze: [1, 0] }); const R = { P };
  if (t < 56.36) { const xf = (u) => kfn(u, [[44.76, 150], [46.0, 560], [55.0, 560], [55.5, 700]]); Object.assign(P, walk(xf, t, { stride: 20 })); R.hidden = t < 44.76;
    P.brow = -0.3; P.gaze = look(t, [P.x, 700], [[44.76, [400, 800]], [45.4, [740, 760]], [45.9, [300, 820]]]); P.mouth = 'smile';
    if (t >= 46.2) { P.handL = [6, -104]; P.handR = [34, -104]; R.letter = { w: ilW(P, [22, -96]), rot: 0, s: 0.75, fold: 1 - ilE(t, 47.0, 0.4) }; P.gaze = [0.3, 0.6]; P.lid = 0.3; }
    if (t >= 48.14) { P.gaze = [-0.4, -0.9]; P.lid = Math.max(0.2, blink(t, 7)); P.sq = 1 + 0.025 * pulse(t, 48.6, 1.2); }
    if (t >= 49.6) { P.gaze = [0.25, 0.95]; P.lid = Math.max(0.35, blink(t, 7)); P.mouth = 'smile'; P.tilt = 0.08 * ilE(t, 49.6, 0.5); P.sq = breathe(t, 7, 0.02); }
    if (t >= 52.92) { P.handR = [34, -104]; P.gaze = lookAt([P.x, 700], [895, 545]); P.mouth = 'o'; P.eyes = t < 53.6 ? 'wide' : null; P.lid = null; P.tilt = 0; }
    if (t >= 55.0) { P.gaze = lookAt([P.x, 700], [875, 800]); P.mouth = 'smile'; P.handL = [20, -112]; P.handR = [60, -112]; R.letter = { w: ilW(P, [44, -104]), rot: 0, s: 0.8 }; }
    return R; }
  if (t < 86.06) { // S7-S9
    P.gaze = lookAt([560, 700], [760, 700]); P.brow = -0.4; P.mouth = 'smile';
    if (t < 56.36) {}
    if (t < 56.61) { P.handL = [40, -112]; P.handR = [80, -112]; R.letter = { w: ilLp(ilW(P, [62, -104]), [708, 800], ilE(t, 56.36, 0.25)), rot: 0, s: 1 }; R.letter.w[1] += 6 * pulse(t, 56.5, 0.2); P.gaze = lookAt([560, 700], R.letter.w); }
    if (t >= 58.5 && t < 59.84) { P.handL = PERSON_HANDS.palmsUp.L; P.handR = PERSON_HANDS.palmsUp.R; P.talk = talk(t, [[58.5, 59.8]]); P.tip = 0.06 * ilE(t, 58.5, 0.3); P.brow = -0.4; }
    if (t >= 59.84 && t < 60.6) { P.handRW = [708, 758 + 4 * pulse(t, 60.1, 0.2)]; P.tip = 0.06; P.gaze = lookAt([560, 700], [760, 700]); }
    if (t >= 60.6) { P.tip = 0.03; P.gaze = lookAt([560, 700], [760, 700]); }
    if (t >= 61.44) P.gaze = lookAt([560, 700], [760, 690]);
    if (t >= 64.35) { P.gaze = lookAt([560, 700], [760, 700]); P.lid = Math.max(0.1, blink(t, 7)); P.mouth = 'smile'; P.tip = 0.03; }
    if (t >= 66.4) { P.mouth = 'closed'; P.lid = Math.max(0.05, blink(t, 7)); }
    if (t >= 67.2) { const k = ilE(t, 67.2, 0.35); P.x = 560 + 10 * k; P.tip = 0.03 + 0.05 * k; P.mouth = 'o'; P.gaze = lookAt([570, 700], [740, 700]); }
    if (t >= 68.1) { P.handR = PERSON_HANDS.mouthCover.R; P.eyes = 'wide'; P.lid = null; }
    if (t >= 69.26) { P.handR = null; P.x = 570 - 30 * ilE(t, 69.26, 0.3); P.eyes = 'wide'; P.lid = null; P.brow = -1; P.mouth = 'o'; P.sq = settleTo(t, 69.26, 1, 0.95, 0.3); P.x += tremble(t, 2, 9); P.tip = 0; }
    if (t >= 70.02) { P.handL = PERSON_HANDS.cheeks.L; P.handR = PERSON_HANDS.cheeks.R; P.gaze = lookAt([540, 700], [760, 700]); }
    if (t >= 70.8) { P.gaze = [-0.3, -0.9]; }
    if (t >= 72.48) { P.eyes = null; P.wet = true; P.lid = 0.3; P.mouth = 'frown'; P.y = 915 + tremble(t, 1.2, 14); }
    if (t >= 73.58) { P.handL = P.handR = null; P.talk = talk(t, [[73.58, 75.1], [75.9, 76.6], [77.4, 78.3]]); P.gaze = lookAt([540, 700], [760, 700]); P.brow = -1; }
    if (t >= 75.14 && t < 76.7) { const pa = 20 * (pulse(t, 75.18, 0.4) + pulse(t, 75.62, 0.4)); P.handL = [-12 - pa, -150 + 0.2 * pa]; P.handR = [12 + pa, -150 + 0.2 * pa]; P.mouth = 'open'; R.q = t >= 76.1; }
    if (t >= 76.7 && t < 78.3) { const pL = pulse(t, 76.72, 0.2) + pulse(t, 77.12, 0.2) + pulse(t, 77.52, 0.2), pR = pulse(t, 76.92, 0.2) + pulse(t, 77.32, 0.2); P.handL = [-58 + 26 * pL, -170 - 8 * pL]; P.handR = [58 - 26 * pR, -170 - 8 * pR]; P.tilt = 0.1 * (pL - pR); R.q = t >= 77.8; }
    if (t >= 78.3) { P.handL = [-30, -110]; P.handR = [30, -110]; P.lid = 0.25; P.wet = true; P.gaze = lookAt([540, 720], [760, 690]); P.tilt = 0; P.sq = breathe(t, 7, 0.03); P.x = 540 + tremble(t, 1, 7); }
    if (t >= 81.0) { P.tilt = -0.25 * ilE(t, 81.0, 0.25); P.tip = -0.1 * ilE(t, 81.0, 0.25); P.eyes = 'shut'; P.lid = null; P.mouth = 'open'; P.handL = PERSON_HANDS.grip.L; P.handR = [-8, -170]; R.wail = true; }
    return R; }
  if (t < 124.32) return { P, hidden: true };
  if (t < 134.78) { // S14
    const xf = (u) => kfn(u, [[124.12, 120], [125.04, 600]], 'out'); Object.assign(P, walk(xf, t, { stride: 26 })); P.brow = 1; P.mouth = 'frown'; P.gaze = lookAt([P.x, 700], [740, 760]); P.lid = Math.max(0.3, blink(t, 7));
    P.tip = 0.12 * (1 - ilE(t, 125.6, 0.4)); P.aR = [2.0, 1.6]; R.letter = { w: ilHandW(P, 1), rot: 0.1, s: 0.9 };
    if (t >= 125.04) { P.aR = null; P.handRW = [652 + 4 * Math.sin(t * 20) * (t < 125.6 ? 1 : 0), 790]; R.letter = { w: [664, 776], rot: -0.1, s: 0.8 }; }
    if (t >= 125.66) { P.talk = talk(t, [[125.66, 126.6]]); }
    if (t >= 126.7) { P.handRW = null; R.letter = null; P.handL = PERSON_HANDS.cheeks.L; P.handR = PERSON_HANDS.cheeks.R; P.eyes = 'wide'; P.lid = null; P.mouth = 'o'; P.brow = -0.8; }
    if (t >= 127.1) { P.handL = [-30, -110]; P.handR = PERSON_HANDS.pointFwd.R; P.eyes = null; P.lid = 0.25; P.brow = 1; P.mouth = 'frown'; }
    if (t >= 127.9) { P.handL = PERSON_HANDS.hipsHands.L; P.handR = PERSON_HANDS.hipsHands.R; P.tip = 0; }
    return R; }
  if (t < 156.14) { // S15-S16
    P.x = 600; P.handL = PERSON_HANDS.folded.L; P.handR = PERSON_HANDS.folded.R; P.brow = 0.8; P.mouth = 'frown'; P.gaze = lookAt([600, 700], [760, 700]); P.lid = Math.max(0.2, blink(t, 7));
    if (t >= 135.74 && t < 144.2) { P.gaze = lookAt([600, 700], [560, 380]); }
    if (t >= 139.4) { P.brow = K.lerp(0.8, 0.3, ilE(t, 139.4, 0.5)); P.tilt = 0.1 * ilE(t, 139.4, 0.5); }
    if (t >= 144.2) { P.tilt = 0.06; P.gaze = lookAt([600, 700], [760, 700]); }
    if (t >= 146.38 && t < 146.9) P.gaze = lookAt([600, 700], [760, 690]);
    if (t >= 148.12) { P.handL = [-30, -110]; P.handR = [30, -110]; P.gaze = look(t, [600, 700], [[148.12, [760, 790]], [148.5, [760, 700]], [148.85, [760, 790]]]); P.brow = K.lerp(0.3, -0.2, ilE(t, 148.12, 0.8)); P.tilt = 0; }
    if (t >= 150.64) { P.handR = [16, -160]; P.gaze = gazePlan(t, [[150.64, [0.7, -0.8]], [150.85, [0.3, -0.9]], [151.0, [0.8, -0.7]]], 0.07); P.mouth = 'closed'; }
    if (t >= 151.2) { P.handR = [30, -110]; P.brow = -0.2; P.mouth = 'smile'; P.drop = 6 * (pulse(t, 151.25, 0.3) + pulse(t, 151.6, 0.3)); P.gaze = lookAt([600, 700], [760, 700]); }
    if (t >= 152.9) { P.handR = [60, -140]; R.letter = t >= 153.15 ? { w: ilW(P, [60, -150]), rot: 0, s: 0.9 } : null; }
    if (t >= 153.3) { const xf = (u) => kfn(u, [[153.3, 600], [154.05, 160]], 'inOut'); Object.assign(P, walk(xf, t, { stride: 20 })); P.dir = -1; P.handL = PERSON_HANDS.chest.R && [-4, -120]; P.handR = [36, -96]; P.gaze = [-0.6, 0.5]; R.letter = { w: ilW(P, [40, -88]), rot: 0, s: 0.7 }; P.tip = 0.05 * pulse(t, 153.3, 0.4); }
    R.hidden = t >= 154.6; R.behind = P.x < 205;
    return R; }
  return { P, hidden: true };
}

// ---------- the four pupils ----------
function ilPupil(i, t) {
  const x = IL_PX[i], y = IL_PY[i], P = ilWho(IL_PUP[i], { x, y, dir: 1, sit: 1, seat: 'floor', gaze: lookAt([x, 800], [740, 760]), lid: Math.max(0.15, blink(t, 21 + i * 4)) }); const R = { P, tab: { rot: 0, bands: 1 + (i % 3), up: 0 } };
  const st = stagger(i, 0.1), teach = [740, 760];
  P.handL = [8, -112]; P.handR = [40, -112];
  if (t < 36.0) { P.gaze = lookAt([x, 800], teach); }
  if (t >= 29.6 && t < 33.35) { P.gaze = lookAt([x, 800], [500, 800]); if (i === 3) { P.eyes = t < 30.9 ? 'wide' : null; if (t < 30.9) P.lid = null; P.sq = settleTo(t, 29.5, 1, 1.07, 0.3); P.y = y - 6 * pulse(t, 29.5, 0.25); P.gaze = lookAt([x, 800], teach); } }
  if (i === 3 && t >= 32.3 && t < 36.8) { R.tab.bands = 1 + Math.min(1, (t - 32.3) / 0.8) * 2.5; P.gaze = [0.4, 0.9]; P.mouth = 'o'; P.drop = 5; if (t < 34.3) P.handR = [30 + 12 * Math.sin(t * 30), -100 + 7 * Math.sin(t * 13)]; }
  if (t >= 33.35 && t < 36.3 && i !== 3) { P.gaze = lookAt([x, 800], t < 33.8 ? [600, 700] : [400, 800]); if (i === 1) { P.gaze = lookAt([x, 800], teach); if (t >= 34.1 && t < 35.4) { R.tab.hide = true; P.handR = [8, -160]; P.eyes = 'wide'; P.lid = null; P.brow = -0.6; P.mouth = 'o'; P.tip = -0.06 * ilE(t, 34.1, 0.2); } } }
  if (i === 1 && t >= 35.67 && t < 36.8) { R.tab.up = 1; P.talk = talk(t, [[35.7, 36.8]]); const u = (t - 35.67) % 0.5 / 0.5; P.handL = [K.lerp(46, 6, u), -150]; P.gaze = [K.lerp(0.8, -0.8, u), 0.6]; R.notes = true; }
  if (t >= 36.8 && t < 43.32) { P.gaze = lookAt([x, 800], [x + 30, 860]); P.mouth = 'closed'; R.tab.bands = 1 + (i % 3) + Math.min(1.5, (t - 36.8 - st) * 0.4);
    if (i === 1 && t >= 37.28 && t < 38.6) { P.tip = 0.12 * ilE(t, 37.28, 0.25); P.handR = PERSON_HANDS.pointFwd.R; P.gaze = lookAt([x, 800], [500, 850]); P.mouth = 'smile'; }
    if (i === 3 && t >= 37.28) { P.gaze = lookAt([x, 790], [400, 790]); P.brow = t < 37.9 ? -0.5 : 0; P.look = t < 37.9 ? 0.8 * Math.sin((t - 37.28) * 16) : 0; if (t >= 38.04) { R.tab.glow = 1; P.drop = 4 * pulse(t, 38.1, 0.3); P.mouth = 'smile'; R.bulb = K.clamp((t - 37.9) / 0.3) * (1 - ilE(t, 39.0, 0.3)); } }
    if (i === 0 && t >= 38.04 && t < 39.5) { R.tab.up = 1; P.gaze = lookAt([x, 800], [300, 790]); }
    if (i === 2 && t >= 38.04 && t < 39.5) { P.gaze = lookAt([x, 790], [200, 800]); P.drop = 5 * pulse(t, 38.6, 0.35); }
    if (i === 0 && t >= 41.74 && t < 42.6) { P.gaze = lookAt([x, 800], teach); P.handL = [-50, -110]; P.handR = [60, -100]; } }
  if (t >= 43.32 && t < 56.36) { P.gaze = lookAt([x, 800], [x + 30, 860]); R.tab.bands = 3;
    if (t >= 45.46 + st) P.gaze = lookAt([x, 800], [kfn(t, [[44.76, 150], [46.0, 560]]), 720]);
    if (t >= 48.76 + st) P.gaze = lookAt([x, 800], [740, 760]);
    if (t >= 50.5 + st) { P.gaze = lookAt([x, 800], [kfn(t - 0.1 * i, IL_SNEAK, 'out'), 720]); }
    if (t >= 52.92 + st) { P.gaze = lookAt([x, 800], [895, 560]); P.mouth = 'o'; P.eyes = t < 53.6 + st ? 'wide' : null; if (P.eyes) P.lid = null; }
    if (t >= 55.4 + st) { P.gaze = lookAt([x, 800], [875, 800]); P.mouth = 'o'; } }
  if (t >= 56.36 && t < 86.06) { P.gaze = lookAt([x, 800], t < 61.44 ? [700, 760] : [760, 760]); R.tab.bands = 3; if (t >= 69.26) P.gaze = lookAt([x, 800], [560, 720]);
    { const g0 = 64.35 + 0.1 * [2, 0, 3, 1][i]; if (t >= g0 && t < 65.3) { P.handR = PERSON_HANDS.mouthCover.R; P.handL = PERSON_HANDS.mouthCover.L; R.tab.hide = true; P.y = y - Math.abs(Math.sin((t - g0) * 16)) * 5 * (1 - ilE(t, 65.0, 0.3)); P.lid = 0.7; P.gaze = lookAt([x, 800], [760, 760]); P.sq = 1 + 0.03 * Math.sin((t - g0) * 32); } }
    if (t >= 65.86 && t < 67.3) { const ph = (t - 65.86 - 0.08) / 1.24 * Math.PI * 2 * 3, sh = Math.sin(ph) * (t < 67.1 ? 1 : 0); P.look = 0.9 * sh; P.gaze = [0.9 * sh, 0.1]; P.mouth = 'o'; }
    if (t >= 68.4 && t < 69.26) { P.gaze = [[1, -1, -1, -1][i], 0]; if (i === 1) P.gaze = [1, 0]; P.brow = -0.5; P.mouth = 'o'; }
    if ((i === 0 || i === 2) && t >= 81.84) { P.gaze = t < 82.4 ? lookAt([x, 800], [760, 760]) : lookAt([x, 800], [i === 0 ? 300 : 200, 790]); P.mouth = t >= 82.4 ? 'o' : 'closed'; P.talk = i === 2 && t >= 82.4 && t < 83.2 ? talk(t, [[82.4, 83.2]]) : 0;
      if (i === 2 && t >= 82.7) { R.tab.up = 1; R.tab.rot = Math.PI * ilE(t, 82.7, 0.5); } } }
  if (t >= 124.32 && t < 156.14) { const tennis = [[124.32, [200, 700]], [125.04, [620, 720]], [125.66, [620, 700]], [126.7, [740, 760]], [127.0, [600, 720]], [128.14, [740, 760]]];
    P.gaze = look(t - st, [x, 800], t < 129 ? tennis : [[129, [740, 720]]]); R.tab.bands = 3;
    if (t >= 124.32 && t < 125.0) { P.eyes = 'wide'; P.lid = null; }
    if (t >= 127.46 + st) { P.handL = PERSON_HANDS.folded.L; P.handR = PERSON_HANDS.folded.R; P.lid = Math.max(0.3, blink(t, 21 + i * 4)); R.tab.hide = true; }
    if (t >= 134.78) { P.gaze = lookAt([x, 800], [560, 330]); if (t >= 144.2) P.gaze = lookAt([x, 800], [760, 720]); }
    if (t >= 142.16 && t < 143.4 && (i === 0 || i === 3)) { P.gaze = lookAt([x, 800], [i === 0 ? 500 : 200, 800]); P.talk = talk(t, [[142.3, 142.9]]); P.handL = [-40, -110]; P.handR = [50, -110]; }
    if (i === 1 && t >= 147.42 && t < 148.6) { P.handR = PERSON_HANDS.headHold.R; P.lid = 0.6; P.drop = 4; }
    if (t >= 148.12) P.gaze = lookAt([x, 800], [600, 720]);
    if (t >= 149.2 + st) { P.tip = 0.08 * ilE(t, 149.2 + st, 0.3); P.brow = -0.5; P.gaze = lookAt([x, 800], [600, 710]); }
    if (t >= 152.1 + 0.12 * i) { P.mouth = 'o'; P.eyes = 'wide'; P.lid = null; P.drop = -2; if (i === 0 && t < 152.85) P.gaze = [0, 0.05]; if (t >= 153.3) P.gaze = lookAt([x, 800], [kfn(t, [[153.3, 540], [154.05, 160]]), 720]); }
    if (t >= 154.9) { P.eyes = null; P.lid = Math.max(0.2, blink(t, 21 + i * 4)); P.gaze = lookAt([x, 800], [760, 720]); P.tip = 0; } }
  if (t >= 156.14) { P.gaze = lookAt([x, 800], [x + 30, 860]); R.tab.bands = 2 + (i % 2) + (i === 1 ? 0 : K.clamp((t - 163.26 - st * 3) / 3) * 1.5); P.tip = 0;
    if (t >= 162.5) P.gaze = t % 2.2 < 1.1 ? lookAt([x, 800], [560, 720]) : lookAt([x, 800], [x + 30, 860]);
    if (i === 1 && t >= 162.5) { const xf = (u) => kfn(u, [[162.5, 400], [163.1, 560]]); Object.assign(P, walk(xf, t, { stride: 14 })); P.sit = 1 - ilE(t, 162.5, 0.3); P.y = 900; P.dir = t < 163.1 ? 1 : -1; P.handRW = null; P.handR = [36, -112]; P.handL = [-104, -150 + 6 * Math.sin(t * 5)]; P.talk = talk(t, [[163.3, 166.0], [166.4, 169.3], [170.2, 173]]); P.brow = 0.3; P.gaze = lookAt([P.x, 800], t % 2 < 1 ? [610, 760] : [300, 800]); R.tab.hide = true; if (t >= 167.9 && t < 168.9) { P.tilt = -0.45 * ilE(t, 167.9, 0.2); P.gaze = lookAt([P.x, 800], [600, 470]); }
      if (t >= 169.6 && t < 170.6) { P.gaze = lookAt([P.x, 800], [740, 760]); P.handL = [-60, -110]; P.talk = 0; } }
    if (i === 0 && t >= 167.9 && t < 169.2) { P.handR = [70, -196]; P.gaze = lookAt([x, 800], [600, 470]); P.mouth = 'o'; R.tab.hide = true; }
    if (i === 2 && t >= 167.95 && t < 168.9) { P.tilt = 0.5 * ilE(t, 167.95, 0.2); P.gaze = lookAt([x, 800], [600, 470]); P.mouth = 'o'; }
    if (i === 3 && t >= 167.66) { P.gaze = lookAt([x, 800], [600, 470]); P.mouth = 'o'; }
    if (i === 3 && t >= 168.0 && t < 169.6) { const u = ilE(t, 168.0, 0.3); P.sit = 1 - u; P.sq = t >= 168.3 ? 1.06 : 1; P.handR = null; P.handRW = [492, 735 - 12 * ilE(t, 168.3, 0.2)]; R.tab.hide = true; R.cane = true; P.mouth = 'open'; P.talk = 0.3;
      if (t >= 168.95) { P.mouth = 'smile'; P.talk = 0; P.drop = 5 * (pulse(t, 169.0, 0.2) + pulse(t, 169.25, 0.2)); P.handRW = [494, 760]; } }
    if (i === 3 && t >= 169.6) { const u = ilE(t, 169.6, 0.4); P.sit = u; P.mouth = 'smile'; }
    if (i === 2 && t >= 169.6) P.gaze = lookAt([x, 800], [560, 720]); }
  return R;
}

// ---------- the room world ----------
function ilRoomWorld(ctx, t, cam) {
  const W = {}, s3 = t < 21.3, s6 = t >= 43.32 && t < 56.36;
  const door = s3 ? (t < 14.5 ? 1 : 1 - ilE(t, 14.5, 0.4)) : s6 ? (t < 44.55 ? 0 : t < 46.4 ? settleTo(t, 44.55, 0, 1, 0.35) : 1 - ilE(t, 46.4, 0.5)) : (t >= 124.0 && t < 154.08) ? (t < 124.3 ? 1 : 1 - 0.12 * swing(t, 124.3, 1, 2.2, 3)) : (t >= 154.08 && t < 156.14) ? settleTo(t, 154.08, 1, 0, 0.45, 0.08) : 0;
  const Wm = ilWomanRoom(t);
  const behind = (c) => { if (Wm.P && !Wm.hidden && (Wm.behind || Wm.P.x < 205)) ilDrawWoman(c, t, Wm, W);
    if (t >= 152.6 && t < 156.14) for (let k = 0; k < 2; k++) { const P = ilWho(IL_KID[k], { x: 96 + 52 * k, y: 900, dir: 1, gaze: lookAt([96, 800], [400, 720]), mouth: 'smile' }); if (t >= 154.0) P.handL = [-50, -110]; person(c, P); } };
  ilRoomSet(ctx, t, { door, behind, empty: s3, stool: s3 });
  if (s3) { const T = ilTeacher(t); ilDrawTeacher(ctx, t, T, W); return W; }
  const L = [];
  for (let i = 0; i < 4; i++) { const p = ilPupil(i, t); L.push([p.P.y + (i === 1 && t >= 162.5 ? 30 : 0), () => ilDrawPupil(ctx, t, p, W, i)]); }
  L.push([896, () => ilStand(ctx, t)]);
  const T = ilTeacher(t); L.push([T.P.y + 1, () => ilDrawTeacher(ctx, t, T, W)]);
  if (Wm.P && !Wm.hidden && !(Wm.behind || Wm.P.x < 205)) L.push([Wm.P.y, () => ilDrawWoman(ctx, t, Wm, W)]);
  L.sort((a, b) => a[0] - b[0]); for (const [, f] of L) f();
  // the hand-over 56.36 (her hands to his) is drawn by the woman; tears and the wail
  if (W.wom && t >= 72.48 && t < 86.06) { teardrops(ctx, t, 72.48, 81.0, (u) => [W.wom.x - 10, W.wom.y], { groundY: 912, rate: 1.6 }); if (t >= 81.0) for (const sd of [-1, 1]) teardrops(ctx, t, 81.05, 86.0, (u) => [W.wom.x + sd * 12, W.wom.y - 4], { groundY: 912, rate: 4, vx: sd * 70 }); }
  if (W.wom && t >= 75.78 && t < 76.2) ilZig(ctx, W.wom.x, W.wom.y + 70, (t - 75.78) / 0.4, 1);
  if (W.wom && t >= 76.8 && t < 77.5) for (const d of [76.8, 77.2]) ilImpact(ctx, W.wom.x, W.wom.y + 6, t, d, 46);
  return W;
}
function ilDrawPupil(ctx, t, p, W, i) { const P = p.P; person(ctx, P); const h = ilHead(P); W['pup' + i] = h;
  if (!p.tab.hide) { const up = p.tab.up || 0, c = ilW({ ...P, sq: 1, tip: 0 }, [24, -100 - 40 * up]), off = [0, 51 * 0.62 * K.clamp(P.sit || 0)]; ilTablet(ctx, c[0] + off[0], c[1] + off[1], 0.62, { bands: p.tab.bands, rot: p.tab.rot + (up ? -0.1 : 0.15), glow: p.tab.glow }); }
  if (p.bulb > 0) ilBulb(ctx, h.x + 6, h.y - 48, p.bulb, t, { crook: 0.1 });
  if (p.notes) for (let k = 0; k < 3; k++) { const u = ((t * 1.3 + k / 3) % 1); ctx.save(); ctx.globalAlpha *= 1 - u; ctx.translate(h.x + 30 + u * 60, h.y + 10 - u * 50); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.beginPath(); for (let q = 0; q < 6; q++) ctx.lineTo(q * 4, 4 * Math.sin(q * 2 + k)); ctx.stroke(); ctx.restore(); }
  if (p.cane) { const hd = p.P.handRW || [492, 735], tip = t >= 168.95 ? [560, 640] : [598, 536]; seg(ctx, hd[0] - (tip[0] - hd[0]) * 0.12, hd[1] - (tip[1] - hd[1]) * 0.12, tip[0], tip[1], 6, IL_WOODL, 2.5); }
}
function ilDrawWoman(ctx, t, Wm, W) { const P = Wm.P; person(ctx, P); W.wom = ilHead(P); W.womP = P;
  if (Wm.letter) ilLetter(ctx, Wm.letter.w[0], Wm.letter.w[1], Wm.letter.s, { rot: Wm.letter.rot, fold: Wm.letter.fold || 0 });
  if (Wm.q && t < 78.3) { ctx.save(); ctx.font = K.font(56, BF, 400); ctx.textAlign = 'center'; ctx.lineWidth = 8; ctx.strokeStyle = C.black; ctx.strokeText('?', W.wom.x + 50, W.wom.y - 50); ctx.fillStyle = C.white; ctx.fillText('?', W.wom.x + 50, W.wom.y - 50); ctx.restore(); } }
function ilDrawTeacher(ctx, t, T, W) {
  const P = T.P; let h = ilHead(P);
  // the stack of tablets (S3), the paper roll under his arm
  if (T.lapTab && t < 56.36) { ilTablet(ctx, 712, 872, 0.8, { bands: 4, rot: Math.PI - 1.2 }); }
  if (T.jam) { // the window jam: clip the body out of the window opening; the turban stays stuck across the frame
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 1000, 1230); ctx.rect(IL_WIN.x0 + 4, IL_WIN.top + 4, IL_WIN.x1 - IL_WIN.x0 - 8, IL_WIN.bottom - IL_WIN.top - 8); ctx.clip('evenodd'); person(ctx, P); ctx.restore();
    const cx = (IL_WIN.x0 + IL_WIN.x1) / 2; ilTurban(ctx, cx + (t >= 54.18 ? tremble(t, 2, 13) : 0), IL_WIN.top + 118, { s: 1, squeeze: 0.6, rot: 0.04 * Math.sin(t * 3), feather: t >= 54.18 ? 0.3 * Math.sin(t * 25) : swing(t, 52.92, 0.4, 2, 2) });
    ilImpact(ctx, IL_WIN.x0 + 4, IL_WIN.top + 70, t, 52.92, 30); ilImpact(ctx, IL_WIN.x1 - 4, IL_WIN.top + 70, t, 52.92, 30); W.imp = { x: cx, y: IL_WIN.top + 60, r: 36, s: 1, rot: 0 }; return; }
  person(ctx, P); W.imp = h; W.impP = P;
  if (T.stack && T.stack.n > 0) { const c = ilW(P, [0, -124]); ctx.save(); ctx.translate(c[0], c[1]); ctx.rotate(T.stack.a); for (let k = 0; k < T.stack.n; k++) ilTablet(ctx, (k % 2 ? 4 : -4) * (1 + Math.abs(T.stack.a) * 8), -40 - k * 22, 0.75, { bands: 0, rot: 0.02 * (k % 2 ? 1 : -1) }); ctx.restore(); }
  if (T.roll != null) { const c = ilW(P, [44, -112 + T.roll]); ctx.save(); ctx.translate(c[0], c[1]); ctx.rotate(-0.5); shape(ctx, K.rectPts(-12, -40, 24, 80), IL_PAPER, { lw: 4, seed: 265 }); ctx.restore(); }
  if (T.loose) ilTurban(ctx, T.loose[0], T.loose[1], { s: 1, feather: swing(t, 18.7, 0.3, 2, 2) });
  if (T.screen) { const c = ilW(P, [0, (T.screen.local[1]) + 51 * K.clamp(P.sit || 0)]), cy = c[1] + (P.drop || 0) * 0.3; ilTablet(ctx, c[0], cy, 1.0, { bands: 4, rot: Math.PI });
    const pr = pulse(t, 41.2, 0.5) + pulse(t, 41.7, 0.5); if (pr > 0) { ctx.save(); ctx.globalAlpha *= pr; ctx.lineWidth = 6; ctx.strokeStyle = C.red; ctx.strokeRect(c[0] - 42, cy - 66, 84, 122); ctx.restore(); } }
  if (T.pointer) { const hd = T.pointer.lap ? ilW(P, [30, -40]) : ilHandW(P, 1); ilPointer(ctx, hd, T.pointer.a, T.pointer.L); }
  if (T.letter) ilLetter(ctx, T.letter.w[0], T.letter.w[1], T.letter.s, { rot: T.letter.rot, gaze: t >= 85.08 && t < 86.06 ? [0, 1] : [0, 0.1] });
  if (T.letterL) { const c = ilHandW(P, 0); ilLetter(ctx, c[0] - 4, c[1] + 18, 0.7, { rot: 0.1 }); }
  if (T.letterSide) { const c = ilW(P, [-10, -8]); ilLetter(ctx, c[0], c[1] - 30, 0.6, { rot: 1.4 }); }
  if (T.tb.on) { const tl = ilTeacher(t - 0.1), hl = ilHead(tl.P), wob = (hl.rot - h.rot) * 0.9 + (T.tb.wobKick || 0), fe = (hl.x - h.x) * 0.012 + 0.1 * Math.sin(t * 2.3);
    ilTurban(ctx, h.x, h.y, { s: h.s, rot: h.rot, wob: wob * (T.tb.wobGain || 1), tail: T.tb.tail || 0, slump: T.tb.slump, side: T.tb.side, even: T.tb.even, hopY: T.tb.hopY || 0, feather: fe, glint: T.tb.glint }); }
  if (T.snore) ilSnore(ctx, h.x - 62, h.y + 34, t);
  if (T.sweat > 0) ilSweat(ctx, h.x + 34, h.y - 20, K.clamp(T.sweat));
}
