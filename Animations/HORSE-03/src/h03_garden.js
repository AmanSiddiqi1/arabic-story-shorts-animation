// ===== HORSE-03: the princess's garden by day. S6 hiding the horse (34.39 - 40.46), S8-S12 the peek and the plan (48.92 - 82.53),
// S13-S15 the trick (82.53 - 110.36), S16 the launch (110.36 - 114.42). World units on princessGarden (ground y 900, people at 905-935).
const H3_HX0 = EH_PG3.hide, H3_BENCH = 900, H3_PRSEAT = 880, H3_CATB = [790, 852], H3_STOOL = [1160, 935];
// ---------- the horse: flies in (34.39), hidden under the cloth, launched at 110.36 ----------
const H3_LIFT = [[110.36, 0], [110.5, 8], [111.4, 480], [112.2, 720], [113.6, 1100], [114.42, 1400]];
function h3GHorse(t) {
  const tc = EH_T2(t), H = { x: H3_HX0, y: 900, s: H3_HS, dir: 1, lift: 0, rot: 0 };
  if (t < 35.2) { const u = ehE(t, 34.39, 0.81, 'out'); H.x = K.lerp(760, H3_HX0, u); H.y = K.lerp(380, 900, u); H.lift = 900 - H.y; return H; }
  if (t >= 108.92) H.lit = ehLitMax(ehPowerOn(t, 108.92, 0.08, 0.5), {});
  if (t >= 110.36) { const lift = kfn(t, H3_LIFT, 'lin'), pitch = flow(t, [[111.4, 0], [112.2, 0.7], [114.42, 0.75]]), dx = flow(t, [[111.4, 0], [113.6, 290], [114.42, 520]]);
    const R = ehRigP(H3_HX0 + dx, 900 - 182 * H3_HS - lift, H3_HS, 1, pitch); Object.assign(H, R); H.lift = lift; H.air = true; }
  return H;
}
// the cloth: in his hands (35.76), drapes by 36.5; snags at 90.8, comes free 91.2; over his arm; heap at 100.5; on the bower at 111.56
function h3Cloth(t, H, inv, fz) {
  const tc = EH_T2(t);
  if (t < 35.76) return null;
  if (t < 36.5) { const u = ehE(tc, 35.76, 0.74), hd = fz ? ehHandW(fz, fz.handR || [40, -200]) : [1100, 700], sp = ehClothSpread(K.lerp(hd[0] + 60, H.x + 20, u), K.lerp(hd[1] - 40, H.y - 200, u), 380, 200, K.lerp(-0.3, 0.1, u), t, 1 - u);
    return u > 0.55 ? ehClothMix(sp, ehClothDraped(H, t), (u - 0.55) / 0.45) : sp; }
  if (t < 90.8) return ehClothDraped(H, t);
  if (t < 91.4) { const tug = flow(tc, [[90.8, 0], [90.95, 0.3], [91.05, 0.1], [91.2, 0.45], [91.4, 1]]), hd = inv ? ehHandW(inv, inv.handR) : [1100, 760];
    return ehClothMix(ehClothDraped(H, t), ehClothSpread(hd[0] + 60, hd[1] - 20, 300, 160, 0.4, t, 0.6), tug); }
  if (t < 100.5) { const a = inv ? ehHandW(inv, [-20, -112]) : [1100, 800]; return ehClothSpread(a[0], a[1] + 40, 70, 110, 0.05, t, 0.1); }
  if (t < 110.36) return ehClothHeap(1040, 908);
  // v2 (note 1): the launch draught flips the heap once along the path (1040 -> 960) and it settles as a heap by 111.6; it stays there
  const x = K.lerp(1040, 960, ehE(t, 110.36, 1.1)), b = Math.sin(Math.PI * K.clamp((t - 110.36) / 1.1));
  return b > 0.01 ? ehClothMix(ehClothHeap(x, 908), ehClothSpread(x, 880, 120, 60, -0.15 + 0.3 * b, t, 0.5), b) : ehClothHeap(x, 908);
}
// ---------- Firuz in S6 ----------
const H3_FZG_X = H3_F([[35.55, 1060], [36.6, 1060], [36.75, 1000], [37.0, 1000], [37.38, 1000], [37.6, 1110], [38.08, 1110], [38.6, 960], [39.3, 960], [39.9, 1440], [41, 1440]]);
function h3FzG(t) {
  const tc = EH_T2(t), sd = 3; if (t < 35.2 || t >= 40.46) return null;
  const P = { ...walk(H3_FZG_X, tc, { stride: 24 }), y: 925, s: EH_FIRUZ.s, dir: 1, lid: ehLid(t, sd, [35.6, 35.68]), sq: breathe(tc, sd, 0.014), tip: idleSway(tc, sd, 0.025, 2.9), mouth: 'smile', gaze: [1, 0], brow: 0.3, handL: [-26, -98], handR: [26, -98] };
  if (t < 35.55) { const H = h3GHorse(t), seat = mountSeat('horse', H), [x, l] = hop(tc, 35.2, 0.35, seat.x - 20, 1060, 36); P.x = x; P.y = K.lerp(seat.y + 52 * P.s, 925, ehE(tc, 35.2, 0.35, 'in')) - l; P.amp = 0; P.dir = -1; return P; }
  P.sq *= landSquash(tc, 35.55, 0.12);
  if (t < 35.76) { P.gaze = gazePlan(tc, [[35.55, [-1, 0]], [35.66, [1, 0]]], 0.05); P.mouth = 'closed'; P.brow = -0.1; P.handL = [-20, -110]; P.handR = [20, -112]; }
  else if (t < 36.6) { const u = ehE(tc, 35.76, 0.3); P.handL = [K.lerp(-20, 40, u), K.lerp(-110, -220, u)]; P.handR = [K.lerp(20, 90, u), K.lerp(-110, -210, u)]; P.tip = 0.08 * u; P.gaze = [1, -0.3]; P.mouth = 'open'; }
  else if (t < 37.38) { if (t < 37.0) { P.handRW = ehRoseBranchTip(t, h3BranchAside(t)); P.dir = 1; } else { P.handR = PERSON_HANDS.chin.R; P.gaze = lookAt([P.x, P.y - 190], [1150, 870]); P.mouth = 'closed'; P.brow = 0.4; P.lid = Math.max(P.lid, 0.25); } }
  else if (t < 38.08) { P.gaze = lookAt([P.x, P.y - 190], [1150, 880]); if (t > 37.6) { P.ph = Math.PI / 2 + 0.6 * Math.sin((tc - 37.6) * 18) * (t < 37.75 ? 1 : 0); P.amp = 0.5 * (t < 37.75 ? 1 : 0); }
    if (t > 37.75) { const pat = Math.abs(Math.sin((tc - 37.75) * Math.PI / 0.14)); P.handRW = [1160, 700 + 14 * pat]; } P.mouth = 'smile'; }
  else if (t < 39.3) { P.dir = -1; P.gaze = lookAt([P.x, P.y - 190], [H3_PRSEAT, 760]); P.talk = ehTalk(t, 38.6, 39.3, 3, 0.6);
    if (t > 38.6 && t < 38.9) { P.handR = [20, -80 + 6 * Math.abs(Math.sin(tc * 30))]; } if (t >= 38.9) { P.handL = [-104, -170]; P.dir = 1; P.gaze = [1, -0.1]; } }
  else if (t < 39.92) { P.dir = 1; P.mouth = 'smile'; }
  else { P.dir = -1; P.handR = PERSON_HANDS.wave.R; P.handR = [P.handR[0] + 10 * Math.sin(tc * 14), P.handR[1]]; P.gaze = lookAt([P.x, P.y - 190], [H3_PRSEAT, 760]); P.amp = 0;
    if (t > 40.25) { const u = ehE(tc, 40.25, 0.21); P.y = K.lerp(925, 860, u); P.s *= 1 - 0.1 * u; P.dir = 1; P.amp = 0.5; P.ph = tc * 9; } }
  return P;
}
function h3BranchAside(t) { if (t < 36.7) return 1; if (t < 90.52) return 1 - ehE(EH_T2(t), 36.7, 0.3); if (t < 120) return ehE(EH_T2(t), 90.52, 0.3); if (t < 124.22) return 0; return ehE(EH_T2(t), 124.22, 0.3); }
// v2 (note 2): once pulled aside the branch joins the depth-sorted rows behind the actors; in front only while it hides the horse
const h3BranchBack = (t) => h3BranchAside(t) > 0.5;
function ehRoseBranchTip(t, aside) { const [bx, by] = EH_PG3.branch, ang = K.lerp(-0.32, -1.25, aside); return [bx + Math.cos(ang) * 230, by + Math.sin(ang) * 230]; }
// ---------- the princess (bench, the trick, the mount) ----------
const H3_PRG_X = H3_F([[84.66, 880], [84.9, 880], [85.25, 840], [85.5, 840], [85.9, 800], [90.9, 800], [91.4, 940], [100.9, 940], [101.43, H3_STOOL[0]], [110, H3_STOOL[0]]]);
function h3PrG(t) {
  const tc = EH_T2(t), sd = 11; if (t >= 102.58 || t < 34.39) return null;
  const P = { ...walk(H3_PRG_X, tc, { stride: 22 }), y: 905, s: EH_PRINCESS.s, dir: 1, lid: ehLid(t, sd), sq: breathe(tc, sd, 0.014), tip: idleSway(tc, sd, 0.022, 3.1), mouth: 'smile', gaze: [0.3, 0.6], handL: [14, -96], handR: [30, -98] };
  const inv = (tt) => (tt >= 82.53 ? [H3_INVG_X(tt), 731] : [EH_PG3.peek[0], 720]), look = (p) => lookAt(ehHeadOf(P), p);
  if (t < 84.66) { P.sit = 1; P.seat = 'bench'; P.amp = 0; P.book = 1; P.lid = Math.max(P.lid, 0.25); P.gaze = [0.25 + 0.2 * Math.sin(EH_T3(t) * 1.3), 0.7];
    if (t >= 35.2 && t < 40.46) { const fz = h3FzG(t); if (fz) P.gaze = look(ehHeadOf(fz)); P.lid = ehLid(t, sd); P.dir = fz && fz.x < 850 ? -1 : 1; if (t > 39.14 && t < 39.9) { P.handR = [40, -150]; P.drop = 6 * pulse(tc, 39.2, 0.4); } }
    if (t >= 67.3 && t < 67.67) { P.gaze = [1, 0]; P.lid = Math.max(P.lid, ehBlinkAt(tc, 67.3)); }
    if (t >= 74.3 && t < 82.53) { P.book = 0.3; P.gaze = [0.2, -1]; P.lid = 0.1; P.handR = [24, -112]; P.mouth = 'smile'; }
    if (t >= 82.53) { P.gaze = look(inv(t)); P.lid = ehLid(t, sd); P.mouth = 'closed'; }
    return P; }
  P.book = t < 101.0 ? 0.5 : 0; P.mouth = 'closed'; P.dir = 1; P.gaze = look(inv(t));
  if (t < 85.1) { const u = ehE(tc, 84.66, 0.25); P.sit = 1 - u; P.seat = 'bench'; P.handR = [70, -170]; P.handL = [10, -120]; P.eyes = 'wide'; P.brow = 0.4; P.sq *= 1 + 0.03 * pulse(tc, 84.7, 0.3); }
  else if (t < 90.9) { P.handL = [10, -122]; P.handR = t < 86.1 ? [70, -160] : [18, -118]; P.lid = 0.28; P.brow = 0.3;
    if (t >= 87.36 && t < 88.0) { P.gaze = [1, -0.05]; P.lid = Math.max(P.lid, ehBlinkAt(tc, 87.36), ehBlinkAt(tc, 87.82)); P.gaze = t < 87.8 ? look([1440, 820]) : look(inv(t)); } }
  else if (t < 92.3) { P.eyes = 'wide'; P.handL = [10, -122]; P.handR = [60, -150]; P.mouth = 'o'; }
  else if (t < 96.9) { P.handL = PERSON_HANDS.folded.L; P.handR = PERSON_HANDS.folded.R; P.lid = 0.3; P.brow = 0.35; P.book = 0;
    if (t < 93.9) { const v = Math.sin((tc - 92.3) * 3.3); P.gaze = look([inv(t)[0], inv(t)[1] + 120 * v]); }
    if (t >= 93.94 && t < 94.6) { P.gaze = look([1440, 820]); P.dir = 1; P.lid = Math.max(P.lid, ehBlinkAt(tc, 93.94)); }
    if (t >= 95.7) P.gaze = look(ehHorsePt(h3GHorse(t), EH_EBG.knob)); }
  else if (t < 99.04) { const u = ehE(tc, 96.9, 0.4); P.handL = [K.lerp(22, -24, u), K.lerp(-105, -96, u)]; P.handR = [K.lerp(-18, 30, u), K.lerp(-112, -98, u)]; P.eyes = t < 97.6 ? 'wide' : 'open'; P.brow = K.lerp(0.35, 0.5, u); P.lid = 0.1; P.gaze = look(ehHorsePt(h3GHorse(t), t < 97.18 ? EH_EBG.lever : EH_EBG.knob)); if (t > 98.42) P.gaze = look(inv(t)); }
  else if (t < 99.94) { const u = ehE(tc, 99.04, 0.25); P.y -= 10 * u; P.sq *= 1 + 0.04 * u; P.gaze = look([1500, 700]); P.lid = Math.max(P.lid, ehBlinkAt(tc, 99.06)); P.handL = [-20, -100]; P.handR = [20, -112]; P.tip = 0.04; }
  else if (t < 101.43) { P.sq *= 1 - 0.03 * pulse(tc, 100.0, 0.5); P.drop = 8 * pulse(tc, 100.2, 0.4); P.mouth = 'smile'; P.lid = 0.2; P.handL = [-24, -96]; P.handR = [30, -98];
    if (t > 100.7) P.gaze = look([H3_STOOL[0], 930]); }
  else { const u = ehE(tc, 101.43, 0.3); P.y = K.lerp(905, H3_STOOL[1] - 48, u); P.amp = 0; P.handRW = ehHorsePt(h3GHorse(t), [-8, -238]); P.gaze = look(ehHorsePt(h3GHorse(t), [40, -250])); P.sq *= landSquash(tc, 101.73, 0.08);
    if (t > 102.3) { const v = ehE(tc, 102.3, 0.28); P.y -= 80 * v; P.x += 30 * v; } }
  return P;
}
// ---------- the cat ----------
function h3CatG(t) {
  const tc = EH_T2(t), P = { x: H3_CATB[0], y: H3_CATB[1], s: 0.62, pal: 2, dir: -1, sit: 1, lid: ehLid(t, 45) * 0.8 + 0.15, tailCurl: 0.6 + 0.2 * Math.sin(tc * 1.3), ears: 0.4, gaze: [-1, 0.2] };
  if (t >= 35.2 && t < 40.46) { const fz = h3FzG(t); if (fz) { P.gaze = lookAt([P.x, P.y - 70], ehHeadOf(fz)); P.dir = fz.x > P.x ? 1 : -1; } P.lid = Math.min(P.lid, 0.4); }
  if (t >= 51.0 && t < 66.9) { P.ears = t < 51.3 ? 0.4 - pulse(tc, 51.0, 0.3) : -0.2; P.lid = 0.5; P.dir = -1; P.gaze = [1, 0.3]; if (t > 58.0) { P.dir = 1; P.gaze = [0.6, 0.6]; } }
  if (t >= 66.9 && t < 82.53) { P.dir = 1; P.gaze = [0.5, 0.8]; P.lid = 0.15; P.ears = 1; P.tailCurl = 0.3 + 0.3 * Math.sin(tc * 5); }
  if (t >= 82.53 && t < 93.0) { const inv = h3InvG(t); P.dir = 1; if (inv) P.gaze = lookAt([P.x, P.y - 60], ehHeadOf(inv)); P.lid = 0.2; P.ears = 0.6;
    if (t >= 83.58 && t < 89.98) { P.sit = 0; P.arch = 1; P.puff = 1; P.mouth = t < 85.0 ? 'open' : 'closed'; P.ears = -1; P.lid = 0; }
    if (t >= 89.98) { P.tailCurl = 0.5 + 0.5 * Math.sin(tc * 9); P.lid = 0.3; } }
  if (t >= 93.0 && t < 107.3) { if (t < 93.4) { const [x, l] = hop(tc, 93.0, 0.4, H3_CATB[0], 930, 50); P.x = x; P.y = K.lerp(H3_CATB[1], 905, ehE(tc, 93.0, 0.4, 'in')) - l; P.sit = 0; }
    else if (t < 106.8) { P.x = 930; P.y = 905; P.sit = 1; P.sq = landSquash(tc, 93.4, 0.1); const inv = h3InvG(t); if (inv) P.gaze = lookAt([P.x, P.y - 60], ehHeadOf(inv)); P.dir = 1; P.lid = 0.25; P.tailCurl = 0.5 + 0.4 * Math.sin(tc * 6); }
    else { Object.assign(P, walk(H3_F([[106.8, 930], [107.3, 1080]]), tc, { stride: GAIT.cat * 0.62 })); P.y = 905; P.sit = 0; P.dir = 1; } }
  if (t >= 107.3 && t < 109.62) { P.x = 1080; P.y = 905; P.sit = 0; P.arch = 1; P.puff = 1; P.mouth = 'open'; P.ears = -1; P.gaze = [0.6, -0.8]; P.dir = 1; }
  if (t >= 109.62 && t < 111.3) { const te = h3TailEnd(t); if (t < 110.0) { const u = ehE(tc, 109.62, 0.38, 'out'); P.x = K.lerp(1080, te[0] - 30, u); P.y = K.lerp(905, te[1] + 50, u) - 60 * Math.sin(Math.PI * u); P.crouch = t < 109.7 ? 1 : 0; P.rot = -0.6 * u; }
    else if (t < 110.9) { P.x = te[0] - 26; P.y = te[1] + 60; P.rot = -1.1 + 0.2 * Math.sin(tc * 20); P.mouth = 'open'; }
    else { const u = ehE(t, 110.9, 0.4, 'in'), s0 = h3TailEnd(110.9); P.x = K.lerp(s0[0] - 26, 1120, u); P.y = K.lerp(s0[1] + 60, 905, u); P.rot = -1.1 * (1 - u); }
    P.sit = 0; P.arch = 0; P.puff = 0.6; P.ears = -0.5; P.gaze = [0.5, -0.8]; P.tailUp = 1; P.scrap = t >= 110.9; P.dir = 1; }
  if (t >= 111.3 && t < 120) { const xf = H3_F([[112.6, 1120], [113.5, 1170]]); Object.assign(P, walk(xf, tc, { stride: GAIT.cat * 0.62 })); P.y = 905; P.sit = t > 113.6 ? 1 : 0; P.scrap = t < 114.0; P.sq = landSquash(tc, 111.3, 0.14); P.gaze = t < 112.6 ? [0.4, -1] : [1, 0.2]; P.dir = 1; P.lid = 0.2; }
  return P;
}
// the turban tail's end (rear rider): the cat springs at it
function h3TailEnd(t) { const H = h3GHorse(Math.max(t, 106.4)), F = ehRiderFrame(H, EH_SEAT2.rear, EH_SEAT2.rearDy, 0, 0, EH_INVENTOR.s), [hx, hy] = ehRiderPt(F, -14, -170), ang = Math.PI / 2 + 0.5;
  const [ex, ey] = ehRibbonEnd(hx, hy, ang, 110 * EH_INVENTOR.s, EH_T2(t), { wave: 6, hz: 1.3 }); return [ex, ey]; }
// ---------- the inventor: behind the hedge (48.92 - 82.53), the walk in, the trick, the scramble ----------
// peek: head-centre height over the hedge (0 hidden, 1 eyes over the hedge)
const H3_PEEK = [[49.4, 0], [49.94, 0.25], [50.2, 0.6], [50.4, 1], [66.9, 1], [67.3, 0.3], [68.7, 0.3], [69.0, 1], [82.53, 1]];
function h3InvHedge(t) {
  if (t < 49.4 || t >= 82.53) return null; const tc = EH_T2(t), pk = flow(tc, H3_PEEK), [px] = EH_PG3.peek;
  const P = { x: px, y: 1020 - 110 * pk, s: EH_INVENTOR.s, dir: -1, lid: 0.45, brow: 0.4, mouth: 'closed', sq: breathe(tc, 41, 0.014), tip: idleSway(tc, 41, 0.02, 3.0), gaze: [-0.6, 0.4], handL: [-20, -100], handR: [20, -100] };
  P.gaze = gazePlan(tc, [[49.4, [-0.5, 0.5]], [50.6, [1, 0.5]], [51.6, [-0.2, -1]]], 0.07); if (t > 50.6 && t < 51.0) P.brow = 0.6 * (1 - (t - 50.6) / 0.4) - 0.1;
  if (t >= 51.6 && t < 54.0) { P.handR = PERSON_HANDS.moustache.R; P.handR = [P.handR[0] - 4, P.handR[1] + 12 + 8 * Math.sin(tc * 6)]; P.gaze = [0.1, -1]; P.mouth = 'smirk'; }
  if (t >= 54.0 && t < 58.78) { P.talk = ehTalk(t, 54.0, 56.0, 41, 0.55); const f = flow(tc, [[54.0, 0], [54.5, 1], [55.0, 0.4], [55.7, 1], [56.3, 0.3]]); P.handR = [K.lerp(40, 90, f), K.lerp(-190, -240, f)]; P.gaze = [0.2, -1]; P.mouth = t > 56 ? 'smirk' : P.mouth; }
  if (t >= 58.78 && t < 60.3) { P.brow = 0.7; P.mouth = 'frown'; P.handR = [30, -214 + 6 * Math.abs(Math.sin(tc * 16))]; P.gaze = [0.2, -1]; }
  if (t >= 60.3 && t < 65.98) { P.handR = [44, -236]; P.brow = -0.1; P.mouth = 'smirk'; P.gaze = [0.1, -1]; P.lid = 0.3; if (t > 62) P.handR = [24, -170]; }
  if (t >= 65.98 && t < 66.9) { const r = Math.sin(tc * 22); P.handL = [-10 + 8 * r, -176]; P.handR = [12 - 8 * r, -172]; P.sq *= 1.04; P.mouth = 'smirk'; P.lid = 0.35; P.gaze = [0.2, -0.8]; }
  if (t >= 66.9 && t < 68.7) { P.handL = [-10, -176]; P.handR = [12, -172]; P.eyes = 'wide'; P.mouth = 'o'; P.gaze = [-0.6, 0.6]; }
  if (t >= 68.7 && t < 70.9) { P.gaze = [0.1, -1]; P.handL = [-30, -100]; P.handR = [30, -100]; P.mouth = 'smile'; }
  if (t >= 70.9 && t < 72.0) { const u = flow(tc, [[70.9, 0], [71.2, 1], [71.4, 1], [71.5, 0]]); P.sq *= 1 + 0.06 * u; P.mouth = t < 71.4 ? 'smile' : 'grit'; P.eyes = t > 71.4 ? 'shut' : 'open'; P.tip = t > 71.4 ? 0.1 : 0; P.handR = t > 71.4 ? [-40, -90] : [30, -100]; }
  if (t >= 72.0 && t < 81.3) { P.gaze = [0.1, -1]; P.mouth = 'smirk'; P.lid = 0.3; }
  if (t >= 81.1 && t < 82.2) { P.handR = PERSON_HANDS.mouthCover.R; P.handL = PERSON_HANDS.mouthCover.L; P.lid = 0.8; P.y += 4 * Math.sin(tc * 30); P.sq *= 1 + 0.02 * Math.sin(tc * 30); }
  if (t >= 82.2) { P.handL = PERSON_HANDS.headHold.L; P.handR = PERSON_HANDS.headHold.R; P.lid = 0.15; P.brow = -0.25; P.mouth = 'smile'; P.gaze = [-0.4, 0.3]; }
  return P;
}
const H3_INVG_X = H3_F([[82.53, 1440], [83.1, 1440], [83.58, 1250], [83.7, 1250], [83.85, 1300], [84.1, 1300], [84.9, 1120], [85.25, 1090], [90.3, 1090], [90.8, 1150], [95.4, 1150], [95.7, 1210], [100.5, 1210], [100.9, 1090], [101.2, 1060], [104.9, 1060], [105.36, 1060], [105.7, H3_STOOL[0]], [120, H3_STOOL[0]]]);
const H3_BOW = [[85.3, 0], [85.42, -0.04], [85.75, 0.45], [86.0, 0.42], [86.3, 0]];
function h3InvG(t) {
  const tc = EH_T2(t), sd = 41; if (t < 82.53 || t >= 106.3) return null;
  const P = { ...walk(H3_INVG_X, tc, { stride: 22 }), y: 930, s: EH_INVENTOR.s, dir: -1, lid: 0.15, brow: -0.25, mouth: 'smile', sq: breathe(tc, sd, 0.014), tip: idleSway(tc, sd, 0.02, 3.0), gaze: [-1, 0], handL: PERSON_HANDS.clasp.L, handR: PERSON_HANDS.clasp.R };
  const pr = h3PrG(t), prH = pr ? ehHeadOf(pr) : [900, 760], look = (p) => lookAt(ehHeadOf(P), p), H = h3GHorse(t), mask = (on) => { if (on) { P.lid = 0.15; P.brow = -0.25; P.mouth = 'smile'; } else { P.lid = 0.45; P.brow = 0.4; P.mouth = 'closed'; } };
  if (t < 83.1) { const u = ehE(tc, 82.53, 0.57); P.y = K.lerp(840, 930, u); P.s *= K.lerp(0.9, 1, u); P.amp = 0.5; P.ph = tc * 8; P.gaze = look(prH); return P; }
  P.gaze = look(prH); P.dir = P.x > prH[0] ? -1 : 1;
  if (t >= 83.58 && t < 84.3) { P.eyes = 'wide'; P.mouth = 'o'; P.handL = [-50, -150]; P.handR = [50, -150]; P.dir = -1; P.tip = 0.06 * pulse(tc, 83.7, 0.5); P.gaze = look([H3_CATB[0], 800]); mask(true); P.mouth = 'o'; P.brow = 0.6; }
  if (t >= 85.3 && t < 86.3) { const b = flow(tc, H3_BOW); P.drop = 16 * b; P.tip = 0.45 * b; P.handR = PERSON_HANDS.chest.R; P.handL = b > 0.3 ? PERSON_HANDS.headHold.L : [-30, -100]; }
  if (t >= 86.12 && t < 87.6) P.talk = ehTalk(t, 86.12, 87.5, 41, 0.7);
  if (t >= 87.4 && t < 88.1) { mask(false); P.lid = 0.5; P.gaze = look(t < 87.7 || t > 87.9 ? ehHorsePt(H, [60, -200]) : prH); P.lid = Math.max(P.lid, ehBlinkAt(tc, 88.0)); }
  if (t >= 88.0 && t < 90.3) { mask(true); P.talk = ehTalk(t, 88.0, 90.2, 41, 0.6); P.handL = [40, -120]; P.handR = [56, -118]; P.y -= 6 * Math.abs(Math.sin(tc * 7)); }
  if (t >= 90.3 && t < 91.72) { P.dir = 1; P.gaze = look(ehHorsePt(H, [100, -300])); if (t < 90.8) { P.handR = [60, -150]; } else { P.handRW = ehHorsePt(H, [140, -300]); P.handLW = ehHorsePt(H, [60, -240]); P.handRW[0] += t < 91.4 ? -20 * flow(tc, [[90.8, 0], [91.2, 1], [91.4, 1.2]]) : 0; P.tip = 0.06 * Math.sin(tc * 20) * (t < 91.2 ? 1 : 0); P.mouth = t < 91.2 ? 'grit' : 'smile'; } }
  if (t >= 91.72 && t < 92.3) { P.dir = -1; P.handL = [-24, -112]; P.handR = PERSON_HANDS.chest.R; P.drop = 8 * pulse(tc, 91.8, 0.5); P.gaze = [-1, 0.4]; }
  if (t >= 92.3 && t < 95.4) { P.dir = -1; P.handL = [-24, -112]; P.handR = [30, -100]; if (t >= 94.66) { const u = ehE(tc, 94.66, 0.3); P.handL = [-60, -130 - 20 * u]; P.handR = [60, -130 - 20 * u]; P.lid = 0.2; } }
  if (t >= 95.4 && t < 100.5) { P.dir = 1; const kn = ehHorsePt(H, EH_EBG.knob), lv = ehHorsePt(H, EH_EBG.lever); P.handL = [-24, -112];
    if (t >= 95.7 && t < 96.7) P.handRW = [kn[0] - 24, kn[1] + 16];
    if (t >= 96.7 && t < 97.18) { P.handRW = [lv[0] - 10, lv[1] + 10]; P.tip = 0.06; }
    if (t >= 97.18 && t < 98.42) { P.handR = PERSON_HANDS.chest.R; P.handL = [-50, -230]; P.dir = -1; P.gaze = look(prH); }
    if (t >= 98.42 && t < 99.3) { P.dir = -1; P.handR = [100, -230]; P.handL = [-24, -112]; P.talk = ehTalk(t, 98.42, 99.2, 41, 0.6); P.gaze = [-0.8, -0.6]; }
    if (t >= 99.1 && t < 99.94) { P.dir = 1; P.handRW = [kn[0] - 24, kn[1] + 14 - 6 * Math.abs(Math.sin(tc * 24))]; mask(false); P.gaze = [0, 0]; P.lid = 0.45; P.mouth = 'smirk'; P.brow = 0.5; }
    if (t >= 99.94) { mask(true); P.dir = -1; P.gaze = look(prH); } }
  if (t >= 100.5 && t < 101.43) { P.dir = -1; const st = h3StoolPos(Math.max(t, 100.6)); P.handRW = [st[0] + 10, st[1] - 60]; P.handLW = [st[0] - 30, st[1] - 56]; P.gaze = look([st[0], st[1] - 30]); if (t > 101.2) { P.handR = [100, -200]; P.handRW = null; P.handLW = null; P.dir = 1; P.drop = 6; } }
  if (t >= 101.43 && t < 105.0) { P.dir = 1; P.gaze = look(prH); P.handL = [-24, -112];
    if (t >= 104.38) { const a = (tc - 104.38) * 6; P.handR = [70 + 14 * Math.cos(a), -170 + 14 * Math.sin(a)]; P.drop = 6 * Math.abs(Math.sin(tc * 5)); P.talk = ehTalk(t, 104.38, 105.0, 41, 0.5); } }
  if (t >= 105.0 && t < 105.36) { mask(false); P.gaze = gazePlan(tc, [[105.0, [-1, 0]], [105.1, [1, 0]], [105.22, [1, -0.2]]], 0.05); P.sq *= 0.95; P.drop = 8; P.lid = Math.max(P.lid, ehBlinkAt(tc, 105.1)); }
  if (t >= 105.36) { mask(false); P.mouth = 'grit'; const st = H3_STOOL, u = ehE(tc, 105.36, 0.34); P.y = K.lerp(930, st[1] - 48, u) + tremble(tc, 2, 9); P.amp = 0; P.handLW = ehHorsePt(H, [-60, -238]); P.handRW = ehHorsePt(H, [20, -238]); P.dir = 1; P.gaze = [1, 0.2];
    if (t >= 105.7) { const v = ehE(tc, 105.7, 0.6), F = ehRiderFrame(H, EH_SEAT2.rear, EH_SEAT2.rearDy, 0, 0, P.s); P.x = K.lerp(st[0], F.x - 22 * P.s, v); P.y = K.lerp(st[1] - 48, F.y + 52 * P.s, v) - 40 * Math.sin(Math.PI * v) + tremble(tc, 3, 9); P.ph = tc * 10; P.amp = 0.6 * (1 - v); P.tip = 0.2 * Math.sin(Math.PI * v); } }
  return P;
}
function h3StoolPos(t) {   // stool: behind the bower until 100.6, in his hands, set at 101.2; kicked over at 105.9
  if (t < 100.6) return null; if (t < 101.2) { const u = ehE(t, 100.6, 0.6); return [K.lerp(1050, H3_STOOL[0], u), K.lerp(860, H3_STOOL[1], u) - 50 * Math.sin(Math.PI * u), 0]; }
  if (t < 105.9) return [H3_STOOL[0], H3_STOOL[1], 0]; const u = ehE(t, 105.9, 0.35, 'out'); return [H3_STOOL[0] + 70 * u, H3_STOOL[1], -Math.PI / 2 * u + (t > 111.3 && t < 112.2 ? 0.15 * Math.sin((t - 111.3) * 20) * (1 - (t - 111.3) / 0.9) : 0)]; }
function h3Stool(ctx, x, y, rot) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); seatStool(ctx, 0, 0, 1); ctx.restore(); }
// ---------- riders on the horse (102.58 - 114.42) ----------
function h3RiderPr(t) {
  const tc = EH_T2(t), P = { s: EH_PRINCESS.s, lid: ehLid(t, 11, [106.42]), sq: breathe(tc, 11, 0.014), mouth: 'smile', gaze: [1, 0.3], brow: 0.3, handL: [60, -110], handR: [70, -104], lurch: idleSway(tc, 31, 0.02, 2.4) };
  const H = h3GHorse(t), ps = P.s, mane = (j) => { const [mx, my] = EH_EBG.mane[j]; return h3Loc(H, ps, [mx - 4, my - 4], EH_SEAT2.front); }, knob = h3Loc(H, ps, EH_EBG.knob, EH_SEAT2.front);
  if (t < 103.68) { P.lurch = 0.2 * (1 - ehE(tc, 102.58, 0.3)) - 0.1; P.handL = [20, -110]; P.handR = [40, -110]; P.gaze = [1, 0.2]; P.sq *= landSquash(tc, 102.7, 0.08); }
  else if (t < 106.42) { P.handL = mane(5); P.handR = mane(6); P.gaze = lookAt([0, -170], knob); P.lurch = 0.12; P.brow = 0.5; P.mouth = 'o'; if (t > 104.38) { P.gaze = [-1, 0.2]; P.mouth = 'smile'; } }
  else if (t < 109.62) { P.eyes = 'wide'; P.mouth = 'o'; P.gaze = [-1, -0.2]; P.handL = mane(5); P.handR = [-60, -120]; P.lurch = -0.08; P.brow = 0.7; if (t >= 107.18) { P.mouth = 'open'; P.handR = [80, -150]; } }
  else if (t < 110.36) { P.lurch = -0.2; P.eyes = 'wide'; P.mouth = 'open'; P.handL = [-40, -150]; P.handR = [60, -110]; P.gaze = [-0.4, 0.9]; P.bob = 6; }
  else if (t < 112.9) { P.eyes = 'shut'; P.mouth = 'open'; P.handL = mane(4); P.handR = mane(6); P.lurch = 0.25; }
  else if (t < 113.76) { P.eyes = 'wide'; P.mouth = 'o'; P.gaze = [0.2, 1]; P.handL = mane(4); P.handR = [40, -110]; P.lurch = 0.05; }
  else { P.eyes = 'wide'; P.mouth = 'frown'; P.brow = -0.4; P.handL = mane(4); P.handR = mane(6); P.lurch = 0.18; P.gaze = [1, 0.1]; }
  return P;
}
function h3RiderInv(t) {
  const tc = EH_T2(t), P = { s: EH_INVENTOR.s, lid: 0.45, brow: 0.4, sq: breathe(tc, 41, 0.014), mouth: 'closed', gaze: [1, 0.1], handL: [60, -110], handR: [70, -104], lurch: 0.1 + idleSway(tc, 37, 0.02, 2.2) };
  const H = h3GHorse(t), knob = h3Loc(H, P.s, EH_EBG.knob, EH_SEAT2.rear, EH_SEAT2.rearDy);
  if (t < 107.18) { P.lurch = 0.2 * Math.sin(tc * 9) * (1 - ehE(tc, 106.3, 0.6)); P.mouth = 'grit'; P.handL = [40, -100]; P.handR = [60, -100]; P.sq *= landSquash(tc, 106.3, 0.12); P.drop = 10; }
  else if (t < 110.36) { const u = ehE(tc, 107.18, 0.5); P.handR = [K.lerp(60, knob[0], u), K.lerp(-110, knob[1], u)]; P.lurch = 0.25 * u; P.gaze = lookAt([0, -170], knob); P.mouth = 'smirk'; }
  else { P.handR = [60, -110]; P.handL = [40, -110]; P.lurch = 0.3; P.mouth = 'smirk'; P.gaze = [1, -0.2]; P.lid = 0.35; }
  return P;
}
// ---------- the book in her lap ----------
function h3Book(ctx, P, t) { const s = P.s || 1, [x, y] = ehHandW(P, [24, P.sit ? -86 : -116]), turn = (EH_T3(t) * 0.33) % 1, op = P.book; if (!op) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); celShade(ctx, [[-34, 0], [34, 0], [30, -8 * op], [-30, -8 * op]], '#e8364f', '#a8183a', { off: 3, lw: 2.5, line: '#5a1a2a' });
  shape(ctx, [[-30, -6], [0, -2], [0, -18 * op], [-28, -22 * op]], '#fff6ea', { lw: 2, line: '#8a7aa8' }); shape(ctx, [[30, -6], [0, -2], [0, -18 * op], [28, -22 * op]], '#fff6ea', { lw: 2, line: '#8a7aa8' });
  if (op > 0.8 && turn < 0.12) { const a = turn / 0.12; shape(ctx, [[0, -2], [0, -18], [28 * Math.cos(a * Math.PI), -22 - 10 * Math.sin(a * Math.PI)], [30 * Math.cos(a * Math.PI), -6]], '#ffffff', { lw: 2, line: '#8a7aa8' }); }
  ctx.restore(); }
// ---------- the garden world (S6, S8-S16) ----------
function h3GardenWorld(ctx, t, cam) {
  const tc = EH_T2(t), H = h3GHorse(t), fz = h3FzG(t), pr = h3PrG(t), ct = h3CatG(t), ih = h3InvHedge(t), inv = h3InvG(t), riding = t >= 102.58, invRiding = t >= 106.3;
  princessGardenDay(ctx, t, cam, { plate: 'day', gate: t < 39.9 ? 0 : t < 40.46 ? 1 - ehE(t, 40.2, 0.26) : t < 82.53 ? 0 : t < 83.3 ? ehE(t, 82.53, 0.3) : 1 - ehE(t, 83.4, 0.5), shiver: t > 49.4 && t < 49.94 ? 1 : 0,
    behind: (c) => { if (ih) { ehInvTail(c, ih, tc, {}); person(c, ehDressP(EH_INVENTOR, ih)); } if (fz && fz.y < 880) h3Person(c, EH_FIRUZ, fz, t, { cape: true }); if (inv && t < 82.9) h3Person(c, EH_INVENTOR, inv, t, { tail: true }); } });
  // dents in the lawn where the hooves stand; the cloth heap; the stool lying on its side
  const rows = [], cloth = h3Cloth(t, H, inv, fz), st = h3StoolPos(t);
  // the horse and its riders
  rows.push([902, () => {
    h3Shadow(ctx, H.air ? H3_HX0 + (H.x - H3_HX0) * 0.3 : H.x + 10, 904, 300 * H3_HS, H.lift || 0, { alpha: 0.3, fall: 700 });
    if (t >= 110.36 && t < 111.4) { const u = (t - 110.36) / 1.04; for (let i = 0; i < 16; i++) { const R = K.rng(500 + i), a = -Math.PI / 2 + (R() - 0.5) * 2.4; ctx.save(); ctx.globalAlpha = 1 - u; ctx.fillStyle = i % 3 ? '#4fb070' : '#ff6a8a'; ctx.translate(H3_HX0 + Math.cos(a) * 260 * u + 30 * Math.sin(u * 8 + i), 900 + Math.sin(a) * 300 * u); ctx.rotate(u * 9 + i); ctx.beginPath(); ctx.ellipse(0, 0, 8, 4, 0, 0, 7); ctx.fill(); ctx.restore(); } }
    if (t > 35.2 && t < 35.9) dustBurst(ctx, H.x, 902, t - 35.2, 8, 6, 12, 110, 0.6, 7);
    const drawRig = (c) => {
      if (H.air) ehWindRibbons(c, H, tc, { ang: H.rot ? Math.PI * 0.75 : Math.PI / 2, len: 260 });
      if (t < 35.2) { ehRide(c, H, 'firuz', { s: EH_FIRUZ.s, lid: ehLid(t, 3), mouth: 'smile', gaze: [0.6, 0.6], handL: [70, -110], handR: [76, -100], lurch: 0.1 }, t, { tc, stream: 0.3, ang: Math.PI / 2 - 0.5 }); return; }
      if (!riding) { ebonyHorse(c, { ...H, reveal: t >= 96.7 && t < 98.4 ? 0.8 : 0 }); return; }
      const knobW = ehHorsePt(H, EH_EBG.knob);
      twoRiders(c, { ...H, reveal: t > 118 ? 0 : 0, knob: t >= 107.94 ? Math.PI : 0 }, { who: 'princess', D: EH_PRINCESS, P: h3RiderPr(t) }, invRiding ? { who: 'inventor', D: EH_INVENTOR, P: h3RiderInv(t) } : null, t,
        { tc, tail: { stream: H.air ? 0.9 : 0, torn: t >= 110.9, ang: H.air ? Math.PI * 0.75 : Math.PI / 2 + 0.5 }, veil: { stream: H.air ? 0.9 : 0 }, armOver: invRiding && t >= 107.18 && t < 110.36 ? [knobW[0] - 4, knobW[1] + 2] : null }); };
    drawRig(ctx);
    if (cloth && t < 91.4) coverCloth(ctx, cloth, {});
    // the brass hoof that will not stay hidden (37.0 and 50.6), the knob and lever glints
    if ((t > 36.9 && t < 37.6) || (t > 50.4 && t < 51.3)) { const [x, y] = ehHorsePt(H, [90, -8]); ehGlint(ctx, x, y, 24, ((t - 36.9) % 0.7) / 0.7); }
    if (t >= 96.26 && t < 97.0) { const [x, y] = ehHorsePt(H, EH_EBG.knob); ehGlint(ctx, x, y, 30, (t - 96.26) / 0.74); ehGlow(ctx, x, y, 50, 0.6); }
    if (t >= 96.7 && t < 97.6) { const [x, y] = ehHorsePt(H, EH_EBG.lever); ehGlint(ctx, x, y, 28, (t - 96.7) / 0.9); }
  }]);
  if (st) rows.push([st[1] - 1, () => h3Stool(ctx, st[0], st[1], st[2])]);
  if (cloth && t >= 91.4 && t < 100.5) rows.push([931, () => coverCloth(ctx, cloth, { ang: 1.2 })]);
  if (cloth && t >= 100.5) rows.push([906, () => coverCloth(ctx, cloth, { ang: 0.6 })]);
  if (fz && fz.y >= 880) rows.push([fz.y, () => h3Person(ctx, EH_FIRUZ, fz, t, { cape: true, vx: t > 39.3 && t < 39.9 ? 300 : t > 38.08 && t < 38.6 ? -200 : 0, swing: swing(tc, 35.55, 0.3) + swing(tc, 39.9, 0.35) })]);
  if (pr) rows.push([pr.y + (pr.sit ? 0 : 1), () => { h3Person(ctx, EH_PRINCESS, pr, t, { veil: true, vx: t > 90.9 && t < 91.4 ? 200 : 0 }); h3Book(ctx, pr, t); }]);
  if (inv && t >= 82.9) rows.push([inv.y + 2, () => { h3Person(ctx, EH_INVENTOR, inv, t, { tail: true, vx: inv.amp > 0.2 ? -120 : 0 }); }]);
  rows.push([t >= 109.62 && t < 111.3 ? 950 : ct.y < 880 ? 853 : ct.y + 0.5, () => { if (ct.y > 880) h3Shadow(ctx, ct.x, 906, 80 * ct.s, Math.max(0, 905 - ct.y)); cat(ctx, ct); if (ct.scrap) turbanScrap(ctx, ct.x + 58 * ct.s, ct.y - 92 * ct.s, 0.8, 0.3); }]);
  if ((t < 110.36 || t > 111.4) && h3BranchBack(t)) rows.push([880, () => ehRoseBranch(ctx, t, h3BranchAside(t))]);
  rows.sort((a, b) => a[0] - b[0]).forEach((r) => r[1]());
  if (t >= 114.0 && t < 120) turbanScrap(ctx, H3_SCRAP[0], H3_SCRAP[1], 1, 0.4);
  if ((t < 110.36 || t > 111.4) && !h3BranchBack(t)) ehRoseBranch(ctx, t, h3BranchAside(t));
  if (t > 83.58 && t < 84.6) { ctx.save(); ctx.globalAlpha = 1 - (t - 83.58) / 1.02; ctx.strokeStyle = '#fff6ea'; ctx.lineWidth = 3; for (let i = 0; i < 4; i++) { const a = -0.6 + i * 0.35; ctx.beginPath(); ctx.moveTo(H3_CATB[0] + 60 + Math.cos(a) * 30, 800 + Math.sin(a) * 30); ctx.lineTo(H3_CATB[0] + 60 + Math.cos(a) * 70, 800 + Math.sin(a) * 70); ctx.stroke(); } ctx.restore(); }
  princessGardenDayFront(ctx, t);
}
// ---------- the garden camera (S6, S8-S16) ----------
const H3_GCAM = [
  [34.39, 40.46, [[34.39, { x: 900, y: 420, zoom: 0.72 }], [34.9, { x: 900, y: 420, zoom: 0.72 }], [36.0, { x: 1012, y: 540, zoom: 0.85 }], [40.46, { x: 1012, y: 540, zoom: 0.85 }]]],
  [48.92, 67.67, [[48.92, { x: 1000, y: 520, zoom: 0.9 }], [58.78, { x: 1000, y: 520, zoom: 0.92 }], [62.5, { x: 1010, y: 490, zoom: 0.92 }], [66.6, { x: 1000, y: 520, zoom: 0.9 }], [67.67, { x: 1000, y: 520, zoom: 0.9 }]]],
  [67.67, 82.53, [[67.67, { x: 1040, y: 560, zoom: 1.0 }], [74.76, { x: 1030, y: 560, zoom: 1.0 }], [76.2, { x: 1030, y: 500, zoom: 1.0 }], [81.2, { x: 1020, y: 500, zoom: 1.0 }], [82.0, { x: 1012, y: 560, zoom: 1.0 }], [82.53, { x: 1012, y: 560, zoom: 1.0 }]]],
  [82.53, 92.3, [[82.53, { x: 1012, y: 540, zoom: 0.85 }], [84.0, { x: 1012, y: 540, zoom: 0.85 }], [85.3, { x: 980, y: 540, zoom: 0.85 }], [90.0, { x: 980, y: 540, zoom: 0.85 }], [90.6, { x: 1012, y: 540, zoom: 0.85 }], [92.3, { x: 1012, y: 540, zoom: 0.85 }]]],
  [92.3, 101.43, [[92.3, { x: 1012, y: 540, zoom: 0.85 }], [100.9, { x: 1012, y: 540, zoom: 0.85 }], [101.43, { x: 1090, y: 530, zoom: 0.88 }]]],
  [101.43, 110.36, [[101.43, { x: 1100, y: 520, zoom: 0.9 }], [110.36, { x: 1100, y: 515, zoom: 0.9 }]]],
  [110.36, 114.42, [[110.36, { x: 1100, y: 515, zoom: 0.9 }], [110.5, { x: 1100, y: 470, zoom: 0.88 }], [111.4, { x: 1120, y: 250, zoom: 0.78 }], [112.2, { x: 1040, y: 292, zoom: 0.62 }], [114.42, { x: 1060, y: 292, zoom: 0.62 }]]],
];
function h3GClamp(c) { const z = c.zoom; return { x: K.clamp(c.x, 500 / z, EH_PGARDEN.w - 500 / z), y: K.clamp(c.y, EH_PGARDEN.top + 615 / z, 1230 - 615 / z), zoom: z }; }
// v2 pushes (notes 5, 9, 12): the hoof that will not hide, the turban rising, the real trick, the mount (scaled about the path line)
const H3_GPF = [[36.4, 1], [36.9, 1.7], [39.7, 1.7], [40.1, 1], [49.5, 1], [50.0, 1.6], [51.3, 1.6], [51.8, 1], [84.4, 1], [85.6, 1.75], [101.43, 1.75], [101.8, 1.6], [107.6, 1.6], [107.94, 1]];
const H3_GPX = [[36.4, 1100], [39.7, 1100], [49.5, 1040], [51.8, 1040], [84.4, 960], [90.5, 960], [91.3, 1080], [94.8, 1080], [95.6, 1150], [98.4, 1150], [99.0, 1080], [101.43, 1080], [101.9, 1170], [107.94, 1170]];
function h3GardenCam(t) { let c = null; for (const [a, b, keys] of H3_GCAM) if (t >= a && t < b) { c = K.camAt(keys, t); break; } if (!c) c = K.camAt(H3_GCAM[H3_GCAM.length - 1][2], t); return h3GClamp(h3Push(c, t, H3_GPF, H3_GPX, 930)); }
