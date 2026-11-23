// ===== HORSE-05: the morning square of the far palace, S1 - S10 (0 - 86.88; the knob insert 74.32 - 76.36 is a panel) =====
// World units on farPalace (model morning). Horse on the star (1900) facing right; the king's bench at 2230; the court gate 2400..2540.
const H5_H0 = { x: 1900, y: 900, s: H5_HS, dir: 1 };
const H5_KNOB = ehHorsePt(H5_H0, EH_EBG.knob), H5_LEVER = ehHorsePt(H5_H0, EH_EBG.lever), H5_NECK = ehHorsePt(H5_H0, [126, -250]), H5_HOOF = ehHorsePt(H5_H0, [68, -40]);
const H5_BENCH = 2230, H5_STOOL = 1870, H5_BOX = [2068, 944], H5_BOX0 = [2108, 944];   // the box stands at 2108 (HORSE-04's last frame) until the reveal cut
const h5Box = (t) => (t < 37.32 ? H5_BOX0 : H5_BOX);
// ---------- camera ----------
const H5_SQCAM = [h5K(0, 1975, 1.1), h5K(0.3, 1975, 1.1), h5K(2.5, 1960, 0.8, 975), h5K(3.5, 1960, 0.82, 975), h5K(4.4, 2050, 1.7, 1050), h5K(6.7, 2040, 1.7, 1050), h5K(7.7, 1880, 1.3, 1030),
  h5K(10.17, 1850, 1.3, 1030), h5K(11.76, 1790, 1.45, 1040), h5K(14.3, 1960, 1.55, 1050), h5K(15.24, 1990, 1.55, 1050), h5K(16.6, 2200, 1.55, 1040), h5K(21.2, 2210, 1.55, 1040), h5K(21.9, 2010, 1.7, 1050),
  h5K(24.6, 2000, 1.7, 1050), h5K(24.88, 1945, 2.0, 1070), h5K(34.8, 1955, 2.0, 1070), h5K(35.3, 2080, 1.5, 1040), h5K(36.4, 1975, 1.9, 1070), h5K(37.31, 1975, 1.9, 1070),
  h5K(37.32, 2000, 1.3, 1050), h5K(39.12, 2010, 1.3, 1050), h5K(40.32, 2200, 1.3, 1050), h5K(42.6, 2190, 1.3, 1050), h5K(43.6, 2170, 1.45, 1050), h5K(46.51, 2160, 1.45, 1050),
  h5K(47.6, 2160, 1.2, 1040), h5K(55.3, 2170, 1.2, 1040), h5K(56.74, 2140, 1.55, 1050), h5K(62.6, 2110, 1.55, 1050), h5K(63.6, 2420, 1.25, 1040), h5K(67.41, 2420, 1.25, 1040),
  h5K(67.42, 1930, 1.5, 1050), h5K(74.3, 1945, 1.5, 1050), h5K(76.35, 1945, 1.5, 1050), h5K(76.36, 1900, 0.9, 1000), h5K(77.18, 1900, 0.9, 1000), h5K(81.3, 1900, 0.85, 1040), h5K(81.77, 1900, 0.85, 1040),
  h5K(81.78, 1700, 0.62, 1000), h5K(86.9, 1700, 0.62, 1080)];
// hard cuts: a key 0.01 s before each cut holds the previous framing
function h5SqCam(t) { const c = K.camAt(H5_SQCAM, t), z = c.zoom, d = 8 * Math.sin(t * 0.37); return { x: K.clamp(c.x + d, 500 / z, EH_FP.w - 500 / z), y: K.clamp(c.y, -700 + 615 / z, 1430 - 615 / z), zoom: z }; }
// ---------- the horse (lift-off and the dome circle) ----------
const H5_LIFT = H5_F([[77.18, 0], [78.84, 190], [81.3, 330]]);
const H5_DX = H5_F([[81.78, 1900], [82.34, 1760], [82.8, 1600], [83.3, 1400], [83.7, 1600], [84.3, 1900], [86.4, 2500], [87, 2560]]);
const H5_DY = H5_F([[81.78, 520], [82.34, 330], [82.8, 300], [83.3, 260], [83.7, 210], [84.3, 180], [86.4, 40], [87, 20]]);
function h5SqHorse(t) { const tc = EH_T2(t);
  if (t < 77.18) return { ...H5_H0 };
  if (t < 81.78) { const l = H5_LIFT(t), bob = t > 78.84 ? 6 * Math.sin(tc * 2.6) : 0; let dir = 1; if (t >= 81.3) { const k = Math.floor((tc - 81.3) / (1 / 12 * 2)); dir = [1, 0.45, -0.45, -1][Math.min(3, k)]; }
    return { ...H5_H0, y: 900 - l + bob, dir, air: true }; }
  const tt = tc, cx = H5_DX(tt), cy = H5_DY(tt), s = K.lerp(0.5, 0.3, ehE(t, 84.3, 2.2)); let dir = -1;
  if (t >= 83.3) { const k = Math.floor((tc - 83.3) / (1 / 6)); dir = [-1, -0.45, 0.45, 1][Math.min(3, k)]; }
  const pitch = t < 83.3 ? 0.14 : t < 84.3 ? 0.04 : 0.3;
  return { ...ehRigP(cx, cy, s, dir, pitch + idleSway(tc, 6, 0.012, 3.0)), air: true }; }
// ---------- Firuz (standing, 0 - 67.95): the craftsman to 37.32, then the prince ----------
const H5_FZX = H5_F([[0, 2060], [0.9, 2060], [1.5, 2030], [21.3, 2030], [21.8, 1995], [43.24, 1995], [43.8, 1960], [53.4, 1960], [53.86, 1985], [54.5, 1960], [67.42, 1960]]);
function h5Fz(t) { const tc = EH_T2(t), sd = 3, craft = t < 37.32;
  const P = { ...walk(H5_FZX, tc, { stride: 20 }), y: 935, s: craft ? EH_CRAFT.s : EH_FIRUZ.s, dir: -1, lid: ehLid(t, sd, [2.66, 6.3, 31.92, 41.1, 58.5]), mouth: 'closed', brow: 0.1, gaze: [-1, 0.1],
    handL: [-30, -100], handR: [30, -100], sq: breathe(tc, sd, 0.014), tip: idleSway(tc, sd, 0.02, 2.6) };
  const o = { mode: craft ? 'craft' : 'prince', corner: 1 }, look = (w) => lookAt(ehHeadOf(P), w);
  if (craft) { P.tip += 0.07; P.lid = Math.max(0.3, P.lid); }
  if (t < 0.58) { P.handRW = [H5_KNOB[0] + 16 + 2 * Math.sin(EH_T3(t) * 9), H5_KNOB[1] + 4]; P.gaze = look(H5_KNOB); P.tip = 0.05; P.lid = 0.25; P.brow = 0.5; }
  else if (t < 2.66) { const u = ehE(tc, 0.58, 0.4); P.handRW = [K.lerp(H5_KNOB[0] + 16, 1958, u), K.lerp(H5_KNOB[1] + 4, 692, u)]; P.sq *= 1 - 0.02 * pulse(tc, 0.7, 0.6); P.gaze = t > 1.0 && t < 1.5 ? [1, 0.1] : look([1960, 760]); }
  else if (t < 4.1) { P.dir = 1; P.gaze = look([H5_BENCH, 700]); P.tip = 0.07 + 0.23 * pulse(tc, 2.9, 0.8); if (t > 3.2 && t < 3.7) P.handL = [10, -205]; }
  else if (t < 6.1) { P.dir = 1; P.tip = -0.03; P.lid = 0.25; P.talk = ehTalk(t, 4.1, 5.6, 3); P.gaze = look([H5_BENCH, 700]);
    if (t < 5.2) { const r = Math.max(pulse(tc, 4.3, 0.2), pulse(tc, 4.62, 0.2)); P.handRW = [H5_NECK[0] - 10 - 8 * r, H5_NECK[1] + 30]; }
    else { const r = pulse(tc, 5.3, 0.25) + pulse(tc, 5.6, 0.25); P.handRW = [H5_KNOB[0] + 6, H5_KNOB[1] - 4 - 6 * r]; P.gaze = look(H5_KNOB); } }
  else if (t < 6.72) { P.dir = t < 6.35 ? 1 : -1; P.handR = [30, -205]; P.gaze = t < 6.3 ? [1, -0.3] : [-1, 0]; }
  else if (t < 10.17) { const u = ehE(tc, 6.72, 0.25); P.handR = [K.lerp(30, 96, u), K.lerp(-205, -140, u)]; P.gaze = look([1680, 760]); P.talk = ehTalk(t, 6.72, 8.4, 5); if (t > 8.6) P.handR = [30, -100]; }
  // S2: drumming on the saddle, the escaping smile
  if (t >= 10.17 && t < 15.24) { P.gaze = look([1680 + 170 * ehE(t, 11.76, 2.5), 760]);
    if (t >= 12.6) { P.handRW = [1958 + 4 * Math.sin(tc * 30), 690 - 4 * Math.abs(Math.sin(EH_T3(t) * 20))]; P.gaze = look(H5_HOOF); P.mouth = 'grit'; }
    if (t >= 14.3 && t < 14.48) { P.mouth = 'smile'; P.sq *= 1.03; } if (t >= 14.48) { P.gaze = [1, -0.4]; P.dir = 1; P.mouth = 'closed'; P.handRW = null; P.handR = [30, -96]; } }
  // S3: watching; walks to the hoof, kneels and taps with the hammer
  if (t >= 15.24 && t < 24.88) { P.dir = -1; P.gaze = look([2080, 720]);
    if (t >= 21.3) { P.kneel = ehE(tc, 21.8, 0.3) * 0.6; o.tool = 'hammer'; P.gaze = look(H5_HOOF); const r = Math.abs(Math.sin((EH_T3(t) - 21.9) * Math.PI / 0.3)); P.handRW = t > 21.9 ? [H5_HOOF[0] + 8, H5_HOOF[1] - 10 * r] : null;
      if (t >= 22.44 && t < 22.6) P.gaze = look([1880, 760]); if (t >= 24.2) { P.handRW = [H5_HOOF[0] + 8, H5_HOOF[1]]; P.tip = -0.02 + 0.04 * pulse(tc, 24.3, 0.5); } } }
  // S4: the whisper at the hoof
  if (t >= 24.88 && t < 37.32) { P.kneel = 0.6 * (1 - ehE(tc, 36.6, 0.5)); P.lid = 0.05; P.brow = 0; P.gaze = look([1880, 740]); P.tip = 0.03 + idleSway(tc, sd, 0.02, 2.6); o.tool = t < 26.4 ? 'hammer' : null;
    P.talk = ehTalk(t, 24.9, 31.0, 7, 0.6);
    if (t < 26.4) P.handR = [24, -168]; else if (t < 27.42) P.handR = [40, -120]; else if (t < 29.02) P.handR = [44, -186]; else if (t < 30.22) P.handR = [50, -190 + 4 * Math.sin(tc * 9)];
    else if (t < 31.24) { P.handR = [12, -136 - 6 * pulse(tc, 30.3, 0.25)]; P.mouth = 'smile'; } else if (t < 33.0) { P.handR = [8, -140]; P.mouth = 'smile'; } else P.handR = [30, -100];
    if (t >= 35.6) { P.handL = [-20, -88]; P.gaze = t < 36.2 ? [0.2, 1] : look([1880, 740]); P.sq *= t < 36.2 ? 0.97 : 1; P.mouth = 'closed'; P.brow = 0.4; }
    if (t >= 36.6) { P.sq *= anticipate(tc, 36.7, 0.6, 0.06); } }
  // S5: the reveal
  if (t >= 37.32 && t < 46.51) { P.dir = 1; P.tip = 0; P.lid = ehLid(t, sd, [41.1]); P.brow = 0.1; P.gaze = look([H5_BENCH, 700]);
    if (t < 37.9) { P.sq = 1 + 0.06 * pulse(tc, 37.32, 0.4); P.handR = [60, -230]; P.handL = [-70, -200]; o.cape = { swing: swing(tc, 37.4, 0.5, 1.4, 2) }; o.crown = { on: 0 }; }
    else if (t < 38.54) { const dn = pulse(tc, 37.9, 0.5); P.tip = 0.12 * dn; P.handLW = t < 38.15 ? [H5_BOX[0], H5_BOX[1] - 40] : null; if (t >= 38.15) P.handL = [-20, -250]; P.handL = [-20, -250]; P.handR = [20, -250]; o.crown = { on: 1, at: t < 38.15 ? [H5_BOX[0], H5_BOX[1] - 52] : null, lift: 30 * (1 - ehE(tc, 38.15, 0.25)) }; if (t >= 38.15 && t < 38.4) o.crown = { on: 1, lift: 40 * (1 - ehE(tc, 38.15, 0.25)) }; }
    else if (t < 39.12) { P.handR = [10, -140]; P.mouth = 'open'; P.talk = ehTalk(t, 38.54, 39.1, 2); P.lid = 0; }
    else { const u = ehE(tc, 39.12, 0.25); P.handR = [K.lerp(10, 110, u), K.lerp(-140, -150, u)]; P.gaze = look([2340, 720]); P.brow = 0.3; if (t >= 41.1) { P.handR = [30, -100]; P.gaze = look([H5_BENCH, 700]); } }
    if (t >= 40.06 && t < 46.51) { P.handL = t < 41.1 ? [40, -232 + 6 * Math.sin(tc * 5)] : [-10, -110]; o.scrap = true; }
    if (t >= 43.24) P.gaze = gazePlan(tc, [[43.24, [1, -0.2]], [43.9, [0.6, -0.4]], [44.6, [1, -0.2]], [45.3, [-0.4, 0.1]], [45.9, [1, -0.2]]]); }
  // S6: a step behind her; the scrap to the captain
  if (t >= 46.51 && t < 56.74) { P.dir = 1; P.tip = 0; P.gaze = look([2160, 700]); o.scrap = t < 53.86; P.handL = [-10, -110]; P.brow = 0.2;
    if (t >= 53.4 && t < 54.4) { P.handR = [70, -130]; P.tip = 0.08 * pulse(tc, 53.9, 0.5); P.gaze = look([2010, 720]); }
    if (t >= 55.98) P.gaze = look([2300, 720]); }
  // S7: the whole bow, the first open look
  if (t >= 56.74 && t < 67.42) { P.dir = 1; P.tip = idleSway(tc, sd, 0.015, 2.6); P.gaze = look([2140, 700]); P.mouth = 'smile';
    if (t >= 58.5 && t < 59.0) { P.gaze = look([2060, 740]); } if (t >= 59.02 && t < 60.4) { P.tip = 0.32 * pulse(tc, 59.02, 1.3); P.handR = [20, -120]; P.handL = [-30, -110]; o.capeSwing = 0.3 * pulse(tc, 59.1, 1.3); }
    if (t >= 60.62) P.gaze = look([2060, 760]); }
  // S8: the vault (anticipation crouch, hop over to the rear seat)
  if (t >= 67.42) { P.dir = -1; P.gaze = look([1840, 640]); P.sq = anticipate(tc, 67.42, 0.25, 0.1); if (t >= 67.62) { const u = ehE(tc, 67.62, 0.33); P.x = K.lerp(1960, 1846, u); P.lift = 260 * Math.sin(Math.PI * u * 0.5) + 0 * u; P.handL = [-40, -200]; P.handR = [40, -210]; P.ph = 0; P.amp = 0; } }
  return [P, o]; }
function h5DrawFz(ctx, t) { if (t >= 67.95) return; const [P, o] = h5Fz(t), tc = EH_T2(t);
  if (o.mode === 'craft') { const Q = h5W({ ...P, y: P.y - (P.lift || 0) }); ehCraftsman(ctx, Q, t, { corner: 1, tool: o.tool }); h5BigCorner(ctx, Q, 1); return; }
  const vx = speed(H5_FZX, t) * 0.5;
  h5Fig(ctx, EH_FIRUZ, P, t, { cape: true, vx: t >= 67.62 ? 300 : vx, swing: (o.cape ? o.cape.swing : 0) + (o.capeSwing || 0), crown: o.crown && o.crown.at ? { on: 0 } : o.crown });
  if (o.crown && o.crown.at) h5HairCrown(ctx, { ...P, alpha: 0 }, { on: 1, at: o.crown.at });
  if (o.scrap) { const [x, y] = ehHandW(P, P.handL); turbanScrap(ctx, x + 10, y - 8, 0.9, 0.3 + 0.2 * Math.sin(tc * 6), {}); } }
// ---------- the princess (standing, 0 - 69.4) ----------
const H5_PRX = H5_F([[0, 1680], [11.76, 1680], [14.3, 1880], [42.16, 1880], [43.2, 2040], [67.42, 2040], [68.5, 1880]]);
function h5Pr(t) { const tc = EH_T2(t), sd = 11, x = H5_PRX(t);
  const P = { ...walk(H5_PRX, tc, { stride: 22 }), y: t < 10.98 ? 870 : t < 13.0 ? K.lerp(870, 932, ehE(t, 10.98, 2.0)) : 932, s: EH_PRINCESS.s, dir: 1, lid: Math.max(0.2, ehLid(t, sd, [7.6, 31.92, 41.1, 58.5])), mouth: 'closed', brow: 0, gaze: [1, 0.2],
    handL: [14, -96], handR: [30, -98], sq: breathe(tc, sd, 0.016), tip: idleSway(tc, sd, 0.02, 3.1) };
  const o = { ribbon: 'finger' }, look = (w) => lookAt(ehHeadOf(P), w);
  if (t < 8.24) { P.gaze = look(t < 7.44 ? [1900, 760] : [2030, 760]); }
  else if (t < 10.17) { P.gaze = look([H5_BENCH, 700]); o.ribbon = 'still'; if (t < 8.74) P.sq *= 1.02; }
  else if (t < 11.76) { P.gaze = look([H5_BENCH, 700]); P.handR = [16, -150]; P.tip = 0.06 * pulse(tc, 10.2, 0.6); o.ribbon = 'still'; }
  else if (t < 14.3) { P.gaze = look([H5_BENCH, 700]); P.lid = 0.2; if (t >= 13.72) { o.ribbon = 'back'; P.handL = [-40, -84]; P.handR = [-36, -82]; } }
  else if (t < 15.24) { o.ribbon = 'back'; P.handL = [-40, -84]; P.handR = [-36, -82]; if (t < 14.48) { P.mouth = 'smile'; P.sq *= 1.04; P.lift = 4; } else P.gaze = [-1, -0.3]; }
  else if (t < 24.88) { P.gaze = look([2080, 720]); o.ribbon = 'back'; P.handL = [-40, -84]; P.handR = [-36, -82];
    if (t >= 21.72) { P.gaze = look(H5_HOOF); o.ribbon = 'still'; }
    if (t >= 22.44) { P.handR = [70, -96]; o.glass = true; P.tip = 0.12; if (t < 22.6) P.gaze = look([2000, 780]); } }
  else if (t < 37.32) { P.tip = 0.14 + idleSway(tc, sd, 0.02, 3.1); P.gaze = look([1990, 830]); o.ribbon = t < 28.42 ? 'wind' : 'still';
    if (t < 26.4) { o.glass = true; P.handR = [60, -100]; }
    if (t >= 28.42 && t < 28.92) { P.wet = 1; P.lid = 0.1; P.sq *= 1.02; }
    if (t >= 31.24 && t < 32.4) { P.handR = [10, -138]; }
    if (t >= 31.92 && t < 33.12) { P.gaze = [-1, -0.2]; P.lid = 0.25; P.dir = t < 32.1 ? 1 : 1; P.gaze = look([H5_BENCH, 650]); }
    if (t >= 33.12 && t < 34.0) { P.tip = 0.14 + 0.08 * pulse(tc, 33.15, 0.45); }
    if (t >= 34.02 && t < 35.6) { P.brow = 0.3; P.talk = ehTalk(t, 34.02, 35.5, 9, 0.6); P.handR = [60, -66]; } }
  else if (t < 46.51) { P.gaze = look(t < 41.1 ? [2100, 720] : [H5_BENCH, 680]); P.handL = [14, -90]; P.handR = [24, -92]; if (t >= 38.9 && t < 39.4) P.sq *= 1.03;
    if (t >= 42.16) { P.handL = [20, -80]; P.handR = [24, -82]; } }
  else if (t < 56.74) { P.gaze = look([2190, 700]); P.talk = ehTalk(t, 46.6, 50.3, 13, 0.6);
    if (t < 48.0) P.handR = [10, -138];
    else if (t < 49.5) P.handR = [70, -120];
    else if (t < 50.44) { const u = ehE(tc, 49.5, 0.25); P.dir = 1; P.handR = [K.lerp(30, 120, u), -150]; P.brow = 0.3; P.gaze = look([2340, 720]); }
    if (t >= 50.44) P.handR = [24, -92];
    if (t >= 55.98) P.gaze = look([2300, 720]); }
  else if (t < 67.42) { P.gaze = look([2140, 700]); if (t >= 58.5 && t < 59.0) P.gaze = look([1960, 740]);
    if (t >= 60.62 && t < 62.0) { const [, h] = hop(tc, 60.7, 0.36, 0, 0, 16); P.lift = h; P.sq = landSquash(tc, 61.06, 0.1); P.handL = [30, -150]; P.handR = [36, -152]; P.mouth = 'smile'; o.ribbon = 'up'; }
    if (t >= 61.96 && t < 62.46) { P.wet = 1; P.mouth = 'smile'; }
    if (t >= 62.0) P.mouth = 'smile'; }
  else { P.dir = -1; P.gaze = look([1900, 700]); P.mouth = 'smile';
    if (t >= 68.5) { const u = ehE(tc, 68.88, 0.5); P.x = K.lerp(1880, 1925, u); P.lift = t < 69.1 ? 30 * ehE(tc, 68.88, 0.2) : 30 + 180 * ehE(tc, 69.1, 0.3); P.dir = 1; P.handR = [60, -170]; P.ph = 0; P.amp = 0; } }
  return [P, o]; }
function h5DrawPr(ctx, t) { if (t >= 69.4) return; const [P, o] = h5Pr(t), tc = EH_T2(t); h5Fig(ctx, EH_PRINCESS, P, t, { veil: true, vx: speed(H5_PRX, t), swing: o.ribbon === 'up' ? -0.6 : 0 });
  const Q = { ...P, y: P.y - (P.lift || 0) };
  if (o.glass) { const [x, y] = ehHandW(Q, P.handR); ehTool(ctx, 'glass', x, y, 0.95, 0); }
  // the rose sash end: wound round a finger, still, wound behind her back, streaming up in the hop
  const [hx, hy] = ehHandW(Q, P.handR), fl = o.ribbon === 'finger' ? Math.sin(tc * 5) : o.ribbon === 'wind' ? Math.sin(tc * 7) : o.ribbon === 'back' ? Math.sin(tc * 9) : 0;
  ehRibbon(ctx, hx, hy, o.ribbon === 'up' ? -Math.PI / 2 - 0.4 : Math.PI / 2 + 0.3 + 0.6 * fl, o.ribbon === 'back' ? 40 : 50, 12, tc, EH_ROSESASH, { wave: 4, hz: 1.5, tip: 0.6, shade: '#d8507a', lw: 2 }); }
// ---------- the inventor ----------
const H5_IVX = H5_F([[0, 2375], [16.88, 2375], [18.6, 2305], [20.92, 2305], [21.7, 2370], [55.98, 2370], [62.82, 2370], [63.98, 2470], [64.3, 2470]]);
function h5Iv(t) { if (t >= 64.25) return null; const tc = EH_T2(t), sd = 7;
  const P = { ...walk(H5_IVX, tc, { stride: t < 21 ? 12 : 22 }), y: t < 55.98 ? 904 : K.lerp(912, 892, ehE(t, 62.6, 1.3)), s: EH_INVENTOR.s, dir: -1, lid: ehLid(t, sd, [7.44, 41.1], 0.15), mouth: 'smile', brow: -0.1, gaze: [-1, 0.3],
    handL: [10, -104], handR: [20, -100], sq: breathe(tc, sd, 0.014), tip: idleSway(tc, sd, 0.03, 2.4) };
  const o = { swing: 0 }, look = (w) => lookAt(ehHeadOf(P), w);
  if (t < 1.3) { P.gaze = look([2010, 840]); P.lid = 0; P.eyes = 'wide'; P.mouth = 'o'; P.handR = [-14, -176]; }
  else if (t < 1.55) { P.mouth = 'o'; P.eyes = 'wide'; P.lid = 0; P.handL = [30, -170]; }
  else if (t < 9.2) { P.gaze = look(t < 7.44 ? [1980, 760] : [1700, 760]); P.lid = 0.15; }
  else if (t < 10.17) { P.handL = [26, -196]; P.lid = K.lerp(0.15, 0.4, pulse(tc, 9.3, 0.8)); P.gaze = look([2050, 700]); }
  else if (t < 15.24) { P.gaze = look([1850, 760]); if (t >= 13.06 && t < 13.7) { P.tip = -0.15 * pulse(tc, 13.06, 0.6); P.dir = -1; } }
  else if (t < 24.88) { P.gaze = look(H5_KNOB);
    if (t < 16.88) { if (t >= 16.0) { P.tip = 0.1 * pulse(tc, 16.0, 0.7); P.handL = [30, -110 + 6 * Math.sin(tc * 14)]; P.handR = [36, -104 - 6 * Math.sin(tc * 14)]; } }
    else if (t < 18.64) { P.drop = -6; P.tip = 0.06; P.handL = [20, -150]; if (t >= 17.64) { P.handRW = [K.lerp(2030, 1995, ehE(tc, 17.64, 0.5)), H5_KNOB[1] + 10 + 4 * Math.sin(tc * 20)]; P.lid = 0.45; P.mouth = 'closed'; } }
    else if (t < 20.58) { P.eyes = 'wide'; P.lid = 0; P.mouth = 'o'; P.tip = -0.06; o.swing = swing(tc, 18.64, 0.6, 1.6, 2.5); P.handL = [30, -140]; P.handR = [20, -150]; }
    else if (t < 21.72) { P.handL = [24, -128]; P.handR = [20, -126]; P.brow = -0.5; P.lid = 0.1; P.tip = 0.03 * Math.sin(tc * 14); }
    else { P.gaze = look(H5_HOOF); P.lid = 0.45; P.brow = 0.4; P.mouth = 'closed';
      if (t >= 23.12 && t < 23.6) { const [, h] = hop(tc, 23.12, 0.3, 0, 0, 22); P.lift = h; P.sq = landSquash(tc, 23.42, 0.12); }
      if (t >= 23.6) { P.handL = [-4, -172]; P.mouth = 'grit'; } } }
  else if (t < 37.32) { P.gaze = look([1940, 840]); P.lid = 0.4; P.brow = 0.4; P.mouth = 'closed'; P.tip = 0.08; P.handL = [-4, -172 + 4 * Math.sin(tc * 6)]; }
  else if (t < 40.32) { P.gaze = look([2000, 740]); P.lid = 0; P.eyes = 'wide'; P.mouth = 'o'; P.tip = -0.05; }
  else if (t < 46.51) { P.gaze = look(t < 43.24 ? [1995, 740] : [2190, 700]); P.eyes = 'wide'; P.lid = 0; P.mouth = 'grit'; P.sq = 0.92; P.x += tremble(tc, 1.5); P.handL = [-10, -186]; P.brow = 0.8; }
  else if (t < 55.98) { P.gaze = look([2190, 700]); P.eyes = 'wide'; P.lid = 0; P.mouth = 'grit'; P.sq = 0.93; P.brow = 0.7;
    if (t >= 50.0 && t < 51.0) { P.x += 24 * ehE(tc, 50.0, 0.4) - 24 * ehE(tc, 50.5, 0.3); P.mouth = t % 0.3 < 0.15 ? 'smile' : 'grit'; }
    if (t >= 53.04) { P.kneel = 0.4; P.tip = 0.1; P.handL = [-6, -196]; P.handR = [8, -190]; if (t >= 54.0) { P.handL = [30, -130]; P.handR = [36, -126]; P.gaze = [-0.5, -0.8]; } }
    if (t >= 55.3) { P.gaze = [-0.3, -1]; P.lid = 0.4; P.sq = 0.9; P.kneel = 0; } }
  else { P.dir = -1; P.gaze = look([2140, 720]); P.lid = 0.4; P.mouth = 'closed'; P.brow = 0.8; P.sq = 0.95; P.tip = 0.08;
    if (t >= 62.82) { P.dir = 1; P.gaze = [1, 0.1]; P.tip = 0.12; P.handL = [-30, -96]; P.handR = [-36, -92]; }   // walks in, hands behind his back, profile
    if (t >= 63.98) { P.dir = -1; P.gaze = look([1900, 760]); P.lid = 0.4; } }
  return [P, o]; }
// ---------- the far king ----------
const H5_KGX = H5_F([[0, H5_BENCH], [43.24, H5_BENCH], [43.9, 2180], [57.4, 2180], [57.9, 2140], [59.4, 2140], [59.8, 2100], [60.2, 2100], [60.7, 2140], [64.0, 2140], [66.6, H5_BENCH], [86, H5_BENCH]]);
function h5Kg(t) { const tc = EH_T2(t), sd = 13, x = H5_KGX(t), sitting = (t < 43.24) || (t >= 47.36 && t < 50.44) || (t >= 66.9 && t < 79.4);
  const P = { ...walk(H5_KGX, tc, { stride: 22 }), y: t < 43.6 || t >= 66.6 ? 850 : t < 43.9 ? K.lerp(850, 900, ehE(tc, 43.6, 0.3)) : t >= 66.2 ? K.lerp(900, 850, ehE(tc, 66.2, 0.4)) : 900, s: EH_FARKING.s, dir: -1,
    lid: ehLid(t, sd, [7.6, 41.1, 56.74]), mouth: 'closed', brow: 0.2, gaze: [-1, 0.2], handL: [-26, -96], handR: [26, -96], sq: breathe(tc, sd, 0.016), tip: idleSway(tc, sd, 0.02, 3.3) };
  const look = (w) => lookAt(ehHeadOf(P), w);
  if (sitting) { P.sit = 1; P.seat = 'bench'; P.amp = 0; }
  if (t < 3.42) { P.handR = PERSON_HANDS.chin.R; P.handL = [20, -60]; P.tip = 0.12; P.gaze = look([2010, 760]); }
  else if (t < 10.17) { P.tip = 0.16; P.brow = 0.6; P.gaze = gazePlan(tc, [[3.42, [-1, 0.3]], [7.6, [-1, 0.05]]], 0.15); P.handL = [20, -80]; P.handR = [30, -90];
    if (t >= 8.24) { P.handR = [70, -150 + 10 * Math.sin(tc * 12)]; P.mouth = 'smile'; } }
  else if (t < 24.88) { P.tip = 0.08; P.gaze = look(t < 14.8 ? [1800, 760] : t < 16 ? [1900, 760] : [2080, 720]); P.handL = [20, -80]; P.handR = [24, -84];
    if (t >= 14.8 && t < 15.6) { P.tip = 0.08 - 0.1 * pulse(tc, 14.8, 0.8); P.brow = 0.6; } }
  else if (t < 37.32) { P.tip = 0.14; P.gaze = look([1940, 820]); P.handR = PERSON_HANDS.chin.R; P.handL = [20, -60];
    if (t >= 35.08 && t < 36.4) { const r = pulse(tc, 35.08, 1.1); P.tip = 0.14 + 0.25 * r; P.x -= 30 * r; P.handL = [-60, -150]; P.handR = [60, -40]; P.eyes = 'wide'; } }
  else if (t < 43.24) { P.gaze = look([2000, 740]); P.eyes = t < 39.5 ? 'wide' : 'open'; P.mouth = t < 39.5 ? 'o' : 'closed'; if (t >= 38.9 && t < 40.4) { P.sit = 0.55; } P.handL = [20, -90]; P.handR = [26, -96]; P.brow = 0.6; }
  else if (t < 47.36) { P.gaze = gazePlan(tc, [[43.24, [-1, 0.2]], [43.9, [-0.6, 0.2]], [44.5, [-1, 0.35]], [45.8, [-1, 0.3]]]); P.brow = 0.4;
    if (t >= 43.9 && t < 44.9) { P.handR = PERSON_HANDS.chin.R; }
    if (t >= 44.9 && t < 45.8) { const w = 10 * Math.sin(tc * 6); P.handL = [-50, -130 + w]; P.handR = [50, -130 - w]; }
    if (t >= 45.8) { P.handL = [-50, -130]; P.handR = [80, -140]; P.tip = 0.04 * pulse(tc, 46.0, 0.4); } }
  else if (t < 56.74) { P.gaze = look([2070, 740]); P.brow = 0.3;
    if (t < 50.44) { P.handR = PERSON_HANDS.chin.R; P.handL = [20, -60]; P.tip = 0.14; }
    else if (t < 52.42) { const u = ehE(tc, 50.44, 0.9); P.handR = [K.lerp(26, 70, u), K.lerp(-96, -200, u)]; if (t >= 51.4) { P.dir = 1; P.handR = [K.lerp(70, 110, ehE(tc, 51.4, 0.3)), K.lerp(-200, -150, ehE(tc, 51.4, 0.3))]; } P.gaze = look([2340, 720]); P.talk = ehTalk(t, 52.42, 54.2, 17, 0.6); }
    else { P.dir = t < 54.6 ? 1 : -1; P.handR = [30, -96]; P.talk = ehTalk(t, 52.42, 54.2, 17, 0.6); P.gaze = look(t < 54.6 ? [2355, 760] : [2050, 740]); } }
  else if (t < 67.42) { P.mouth = 'smile'; P.brow = -0.2; P.lid = Math.max(0.1, P.lid); P.gaze = look([2040, 740]);
    if (t >= 58.06 && t < 59.4) { const u = ehE(tc, 58.06, 1.0); P.handR = [K.lerp(40, 60, u), K.lerp(-110, -230, u)]; P.handL = [-30, -100]; P.talk = ehTalk(t, 58.06, 59.0, 19, 0.6); }
    if (t >= 59.84 && t < 60.2) { P.handRW = [H5_NECK[0] + 14 - 8 * pulse(tc, 59.9, 0.18), H5_NECK[1] + 30]; P.gaze = [1, 0.1]; }
    if (t >= 60.2 && t < 61.2) { P.handR = [-40, -86]; P.gaze = [1, -0.6]; P.lid = 0.3; }
    if (t >= 62.82) P.gaze = look([2470, 720]); }
  else { P.gaze = look([1900, 700]); P.mouth = 'smile'; P.brow = 0.5;
    if (t >= 73.6 && t < 79.4) { P.tip = 0.2; P.handL = [20, -70]; P.handR = [30, -70]; P.lift = 0; P.footSwing = Math.sin(tc * 9); }
    if (t >= 76.36) P.gaze = look([1900, 900 - H5_LIFT(t) - 200]);
    if (t >= 79.4) { const [, h] = hop(tc, 79.4, 0.34, 0, 0, 24); P.lift = h; P.sq = landSquash(tc, 79.74, 0.14); P.handL = [-12, -220]; P.handR = [12, -222]; P.eyes = 'wide'; P.mouth = 'o'; P.x = H5_BENCH - 40; P.y = 850; }
    if (t >= 81.78) { const w = Math.sin(tc * 14); P.handL = [-60 - 20 * w, -230]; P.handR = [60 + 20 * w, -232]; P.mouth = 'open'; P.lift = 0; P.sq = 1; } }
  return P; }
// ---------- the guards: A, B, E (extra), F (extra) in the line; C and D with the inventor; the captain ----------
const H5_GE = [{ ...EH_FARGUARDS[0], s: 1.0, pal: { ...EH_FARGUARDS[0].pal, beard: 'short' } }, { ...EH_FARGUARDS[2], s: 0.96, pal: { ...EH_FARGUARDS[2].pal, tache: false } }];
const H5_GLX = [H5_F([[0, 1600], [73.6, 1600], [74.2, 1560]]), H5_F([[0, 1660], [11.9, 1660], [12.3, 1632], [13.0, 1632], [13.4, 1660], [67.42, 1660], [68.3, 1832], [68.5, 1832], [69.2, 1700], [73.6, 1700], [74.2, 1660]]),
  H5_F([[0, 1730], [12.0, 1730], [12.4, 1768], [13.1, 1768], [13.5, 1730], [73.6, 1730], [74.2, 1720]]), H5_F([[0, 1785], [73.6, 1785], [74.2, 1790]])];
function h5GuardLine(t, i) { const tc = EH_T2(t), sd = 201 + i * 7, D = [EH_FARGUARDS[0], EH_FARGUARDS[1], H5_GE[0], H5_GE[1]][i], xf = H5_GLX[i];
  const P = { ...walk(xf, tc, { stride: 24 }), y: 876 + i * 2, s: D.s, dir: 1, lid: ehLid(t, sd, [7.44 + stagger(i, 0.12)]), mouth: 'closed', gaze: [1, 0.1], handL: [-26, -100], handR: [40, -110], sq: breathe(tc, sd, 0.012), tip: idleSway(tc, sd, 0.022, 2.8 + i * 0.3) };
  const o = { helmet: { tilt: 0 }, neck: true, spear: { lean: 0.03 * Math.sin(tc + i) } }, look = (w) => lookAt(ehHeadOf(P), w), sp = speed(xf, t); if (Math.abs(sp) > 20) P.dir = Math.sign(sp);
  P.gaze = look([1990, 760]);
  if (t >= 5.2 && t < 6.4) { const r = pulse(tc, 5.2 + stagger(i, 0.16) + (i === 1 ? 0.2 : 0), 0.5); P.tip += 0.12 * r; }
  if (t >= 7.44 && t < 11.76) P.gaze = look([1680, 760]);
  if (t >= 11.76 && t < 15.24) P.gaze = look([H5_PRX(t), 760]);
  if (t >= 37.32 && t < 46.51) { P.gaze = look([1995, 760]); const j = 38.9 + stagger(i, 0.1); if (t >= j && t < j + 0.3) P.lift = 10 * pulse(tc, j, 0.3); P.eyes = t < 40 ? 'wide' : 'open'; }
  if (t >= 43.8 && t < 46.51) P.gaze = look(Math.sin(EH_T3(t) * 2.4 + i * 1.7) > 0 ? [2190, 700] : [1995, 740]);
  if (i === 1 && t >= 37.6 && t < 39.3) { P.handL = [-10, -210 + 10 * Math.sin(tc * 20)]; P.handR = [10, -214 - 10 * Math.sin(tc * 20)]; o.spear = null; P.tip = 0.1 * Math.sin(tc * 8); o.cloak = K.clamp(1 - (t - 38.9) / 0.4); }
  if (i === 1 && t >= 67.42 && t < 68.5) { o.spear = null; P.handL = [30, -90]; P.handR = [40, -92]; o.stool = true; }
  if (t >= 76.36) P.gaze = look([1900, 900 - H5_LIFT(t) - 150]);
  if (t >= 79.94) { const j = 79.94 + stagger(i, 0.09); P.tip = -0.1 * ehE(tc, j, 0.2); o.helmet.tilt = -0.25 * ehE(tc, j, 0.2); }
  if (t >= 84.72) { o.spear = { lean: 0.3 * Math.sin(tc * 8 + i) }; }
  return [P, o, D]; }
// C (i 0) and D (i 1) beside the inventor; to the gate with him; back by the ring
const H5_GCX = [H5_F([[0, 2330], [18.3, 2330], [18.64, 2272], [20.92, 2272], [21.7, 2330], [55.98, 2330], [62.9, 2330], [63.9, 2405], [64.4, 2405], [65.0, 2290], [66.8, 2160], [86, 2160]]), H5_F([[0, 2420], [18.3, 2420], [18.64, 2345], [20.92, 2345], [21.7, 2420], [55.98, 2420], [57.9, 2565], [64.4, 2565], [67.2, 2310], [86, 2310]])];
function h5GuardCD(t, i) { const tc = EH_T2(t), sd = 231 + i * 5, D = EH_FARGUARDS[2 + i], xf = H5_GCX[i];
  const P = { ...walk(xf, tc, { stride: 24 + i * 3 }), y: 898 + i * 6, s: D.s, dir: i ? -1 : 1, lid: ehLid(t, sd, [7.44 + 0.1 * i], i ? 0.35 : 0), mouth: 'closed', gaze: [1, 0.1], handL: [-26, -100], handR: [40, -110], sq: breathe(tc, sd, 0.012), tip: idleSway(tc, sd, 0.022, 2.6 + i * 0.5) };
  const o = { helmet: { tilt: 0 }, neck: true, spear: { lean: 0.02 } }, look = (w) => lookAt(ehHeadOf(P), w), sp = speed(xf, t);
  if (Math.abs(sp) > 20) P.dir = Math.sign(sp); else P.gaze = look([2100, 700]);
  if (t < 1.6 && i === 0) { P.dir = 1; o.spear = { lean: 0.25 * pulse(tc, 1.2, 0.4) }; P.gaze = look([2100, 720]); }
  if (t >= 7.44 && t < 10.17) P.gaze = look([1680, 760]);
  if (i === 1 && t >= 13.06 && t < 13.8) { o.spear = { lean: -0.2 * pulse(tc, 13.06, 0.7) }; }
  if (t >= 18.64 && t < 21.72) { P.dir = i ? -1 : 1; o.spear = { lean: i ? -0.55 : 0.55, hand: i ? [-30, -120] : [30, -120] }; P.mouth = 'grit'; if (i === 1) P.lid = Math.max(P.lid, 0.45); }
  if (t >= 43.8 && t < 46.51) { P.dir = -1; P.gaze = look(Math.sin(EH_T3(t) * 2.1 + i * 2.3) > 0 ? [2190, 700] : [1995, 740]); }
  if (t >= 52.42 && t < 55.98) { P.dir = i ? -1 : 1; o.spear = { lean: i ? -0.3 : 0.3 }; P.mouth = 'grit'; }
  if (t >= 55.98 && t < 64.0) o.spear = { lean: 0.05 };
  if (t >= (i ? 62.82 : 63.9) && t < 64.2) { P.dir = i ? -1 : 1; P.handRW = [i ? 2530 : 2410, 780]; }
  if (t >= 71.86 && t < 73.0) { P.dir = i ? -1 : 1; P.tip = 0.14 * pulse(tc, 71.9, 0.5); if (t > 72.1 && t < 72.5) { o.helmet.tilt = (i ? -1 : 1) * 0.2; P.eyes = 'wide'; } if (t > 72.4) { P.handL = [-10, -200]; } }
  if (t >= 76.36) P.gaze = look([1900, 900 - H5_LIFT(t) - 150]);
  if (t >= 79.94) { const j = 79.94 + 0.12 + i * 0.25; o.helmet.tilt = -0.3 * ehE(tc, j, 0.2); P.tip = -0.1 * ehE(tc, j, 0.2);
    if (i === 1) { const k = ehE(tc, 80.2, 0.15); P.sit = k; P.seat = 'floor'; P.sq = impactSquash(tc, 80.35, 0.85); P.lid = 0.3 + 0.6 * pulse(tc, 80.6, 0.6); o.spear = k > 0.5 ? null : o.spear; o.dropSpear = k; } }
  if (t >= 84.72) o.spear = { lean: 0.3 * Math.sin(tc * 7 + i) };
  return [P, o, D]; }
const H5_CPX = H5_F([[0, 2282], [19.14, 2282], [19.9, 2262], [23.0, 2262], [24.5, 2282], [52.6, 2282], [53.7, 2030], [54.3, 2030], [55.4, 2282], [56.6, 2282], [57.6, 2300], [63.98, 2300], [64.5, 2440], [65.4, 2440], [66.0, 2325], [86, 2325]]);
function h5Captain(t) { const tc = EH_T2(t), sd = 17;
  const P = { ...walk(H5_CPX, tc, { stride: 26 }), y: t < 19.2 || (t > 24.4 && t < 53.0) ? 872 : t < 56 ? 924 : 896, s: EH_CAPTAIN.s, dir: -1, lid: ehLid(t, sd, [7.6]), sq: breathe(tc, sd, 0.012), tip: idleSway(tc, sd, 0.02, 3.4), mouth: 'closed', brow: 0.3, gaze: [-1, 0.1], handL: [-26, -100], handR: [40, -110] };
  const o = { helmet: {}, neck: true, spear: { lean: 0.03 }, keys: true }, look = (w) => lookAt(ehHeadOf(P), w), sp = speed(H5_CPX, t);
  if (Math.abs(sp) > 20) P.dir = Math.sign(sp); else P.gaze = look([2000, 740]);
  if (t >= 19.92 && t < 21.0) { P.dir = 1; P.y = 924; const u = ehE(tc, 19.92, 0.25); P.handL = [K.lerp(-26, 90, u), K.lerp(-100, -150, u)]; P.gaze = look([2080, 720]); P.mouth = 'open'; P.talk = ehTalk(t, 19.92, 20.6, 23); }
  if (t >= 21.0 && t < 23.0) { P.dir = 1; P.gaze = look([2300, 720]); }
  if (t >= 53.7 && t < 54.4) { P.dir = -1; P.handL = [60, -120]; P.tip = 0.08 * pulse(tc, 53.86, 0.5); o.scrap = t >= 53.95; }
  if (t >= 54.4 && t < 64.66) o.scrapBelt = true;
  if (t >= 64.66 && t < 65.6) { P.dir = 1; P.handRW = [2470, 790]; o.spear = { lean: 0.03, hand: [-26, -100] }; P.mouth = 'smile'; o.scrapBelt = t < 65.1; }
  if (t >= 65.6 && t < 67.4) { P.dir = 1; P.gaze = look([2470, 700]); }
  return [P, o]; }
// ---------- the crowd (from episode 4) ----------
const H5_CROWD = [[1440, 868, 0], [1495, 872, 3]];
function h5Crowd(t, items, ctx) { const tc = EH_T2(t);
  H5_CROWD.forEach(([x, y, ci], i) => { const D = EH_GUESTS[ci], sd = 301 + i * 3, P = { x: x + 5 * Math.sin(tc * 0.7 + i), y, s: D.s || 1, dir: x > 1900 ? -1 : 1, lid: ehLid(t, sd, [7.44 + stagger(i, 0.1)]), mouth: 'closed', gaze: [x > 1900 ? -1 : 1, 0.2], handL: [-24, -100], handR: [26, -100], sq: breathe(tc, sd, 0.016), tip: idleSway(tc, sd, 0.025, 2.7 + i * 0.2) };
    const look = (w) => lookAt(ehHeadOf(P), w); P.gaze = look([1990, 740]);
    if (t >= 7.44 && t < 12) P.gaze = look([1700, 760]);
    if (t >= 38.9 && t < 41) { const j = 38.95 + stagger(i, 0.08); P.lift = 10 * pulse(tc, j, 0.3); P.mouth = 'o'; P.handL = [-30, -170]; }
    if (t >= 60.62 && t < 62) P.mouth = 'smile';
    if (t >= 62.82 && t < 67.42) P.gaze = look([2470, 740]);
    if (t >= 76.36) { P.gaze = look([1900, 900 - H5_LIFT(t) - 150]); P.mouth = 'o'; }
    if (t >= 80.84) { P.handL = [-20, -210]; P.handR = [30, -150 - 40 * Math.abs(Math.sin(tc * 8 + i))]; P.mouth = 'open'; }
    items.push([y, () => h5Fig(ctx, D, P, t)]); }); }
// ---------- the court gate: grille, eyes from inside, the bar ----------
function h5CourtGateOver(ctx, t, open) { if (open > 0.1) return; const tc = EH_T2(t), [x0, x1] = EH_FP.courtGate, mx = (x0 + x1) / 2, gx = mx - 30, gy = 690, w = 60, h = 44;
  ctx.fillStyle = '#2a1a2a'; ctx.fillRect(gx, gy, w, h);
  if (t >= 65.4) { const up = ehE(tc, 65.4, 0.3) * (1 - 0.3 * pulse(tc, 66.5, 0.4)), [lx] = [Math.sin(tc * 1.6) * 6];
    if (up > 0) { ctx.save(); ctx.beginPath(); ctx.rect(gx, gy, w, h); ctx.clip(); const ey = gy + h + 30 - up * 46;
      celShade(ctx, ell(mx, ey + 40, 34, 40, 20), C.skin, '#d99a80', { off: 6, lw: 2, line: '#6a3a2a' }); celShade(ctx, ell(mx, ey + 4, 40, 18, 18), EH_SAFFRON, '#c07a10', { off: 4, lw: 2, line: '#7a4a10' });
      const gzx = t < 66.0 ? Math.sin(tc * 5) * 4 : t > 82 ? Math.cos(tc * 4) * 5 : 0; for (const sd of [-1, 1]) { ctx.fillStyle = '#fffaf0'; ctx.beginPath(); ctx.ellipse(mx + sd * 13 + lx * 0.3, ey + 30, 9, 8, 0, 0, 7); ctx.fill(); ctx.strokeStyle = '#1a1420'; ctx.lineWidth = 2; ctx.stroke(); ctx.fillStyle = '#1a1420'; ctx.beginPath(); ctx.arc(mx + sd * 13 + gzx, ey + 31, 4, 0, 7); ctx.fill(); }
      ctx.restore(); } }
  ctx.save(); ctx.strokeStyle = '#3a3448'; ctx.lineWidth = 4; for (let k = 1; k < 5; k++) { ctx.beginPath(); ctx.moveTo(gx + k * w / 5, gy); ctx.lineTo(gx + k * w / 5, gy + h); ctx.stroke(); } ctx.lineWidth = 5; ctx.strokeRect(gx, gy, w, h); ctx.restore();
  // brackets and the bar (drops at 66.45 with one bounce)
  for (const bx of [x0 + 20, x1 - 30]) celShade(ctx, K.rectPts(bx, 770, 10, 30), '#5a5a6a', '#3a3a4a', { off: 3, lw: 2, line: '#2a2a3a' });
  const by = t < 66.45 ? 660 : t < 66.62 ? fallY(t, 66.45, 66.62, 660, 776) : 776 - rebound(t, 66.62, 10, 0.16);
  ctx.save(); ctx.translate(mx, by); ctx.rotate(t < 66.45 ? -1.2 : t < 66.62 ? -1.2 * (1 - (t - 66.45) / 0.17) : 0); celShade(ctx, K.rectPts(-80, -12, 160, 24), '#b8783a', '#7a4a2a', { light: [-1, -1], off: 8, lw: 3, line: '#4a2a14' }); ctx.restore();
  if (t > 64.66 && t < 100) { const sw = Math.sin(tc * 3) * 0.1; ctx.save(); ctx.translate(x1 - 26, 640); ctx.rotate(sw); turbanScrap(ctx, 0, 24, 0.8, 1.4); ctx.restore(); seg(ctx, x1 - 26, 636, x1 - 26, 646, 4, '#3a3448', 0); } }
// the court gate leaves (open 0..1): guards A and B in S7 swing them; o.court of farPalace
function h5CourtOpen(t) { return t < 62.9 ? 0 : t < 63.98 ? ehE(t, 62.9, 0.5) : 1 - ehE(t, 63.98, 0.2); }
// ---------- the world ----------
function h5SqWorld(ctx, t, cam) {
  const tc = EH_T2(t), H = h5SqHorse(t), open = h5CourtOpen(t);
  farPalace(ctx, t, cam, { model: 'morning', court: open, sky: (c, dx, dy) => { ehGlow(c, 760 + dx, 300 + dy, 520, 0.7, '#ffe0b8'); celShade(c, ell(760 + dx, 300 + dy, 70, 70, 30), '#fff4d8', '#ffd6a0', { off: 8, lw: 0 }); } });
  h5Doves(ctx, t, [[1.0, 1500, 260, 1, 170], [6.0, 2500, 240, -1, 160], [27.0, 1300, 280, 1, 140], [44.0, 2400, 300, -1, 150], [58.0, 1500, 300, 1, 150], [77.4, 1720, 380, -1, 220], [77.5, 2080, 380, 1, 230]]);
  ctx.save(); ctx.globalCompositeOperation = 'screen'; ehGlints(ctx, [1600, 960, 900, 300], t, 8, 17, 12); ctx.restore();
  h5CourtGateOver(ctx, t, open);
  const items = [];
  // horse (on the ground and lifting): drawn in the sort as the depth of the star
  const air = t >= 77.18, lit = t >= 76.36 ? ehLitMax(ehPowerOn(t, 76.36, 0.2, 0.3), {}) : t >= 1.94 && t < 2.5 ? { chest: 0.4 * pulse(t, 1.94, 0.5) } : t >= 24.2 && t < 24.5 ? { hooves: 0.6 * pulse(t, 24.2, 0.3) } : {};
  const HH = { ...H, lit, knob: t >= 75.16 ? Math.PI / 2 : 0, reveal: t >= 71.86 && t < 73.0 ? ehE(t, 71.86, 0.2) * (1 - ehE(t, 72.7, 0.3)) : 0 };
  if (t < 81.78) items.push([air ? 860 : 900, () => h5SqHorseDraw(ctx, t, HH)]);
  if (t < 81.78) { // ground shadow and the dust ring at the lift-off
    if (air) { const l = 900 - H.y; h5Shadow(ctx, 1900, 900, 260 * 0.9, l); dustBurst(ctx, 1900, 900, t - 77.18, 12, 10, 22, 160, 0.9, 5); } }
  if (t < 67.95) items.push([935, () => h5DrawFz(ctx, t)]);
  if (t < 69.4) { const [Pp] = h5Pr(t); items.push([Pp.y, () => h5DrawPr(ctx, t)]); }
  { const r = h5Iv(t); if (r) { const [P, o] = r; items.push([P.y + 24, () => h5Fig(ctx, EH_INVENTOR, P, t, { tail: true, vx: speed(H5_IVX, t), swing: o.swing })]); } }
  { const P = h5Kg(t); items.push([t < 76.36 ? 922 : P.y - 2, () => { h5Fig(ctx, EH_FARKING, P, t); }]); }   // review 1: in front of every guard
  for (let i = 0; i < 2; i++) { const [P, o, D] = h5GuardLine(t, i); items.push([P.y, () => { h5Fig(ctx, D, P, t, o); const [hx, hy] = ehHeadOf({ ...P, y: P.y - (P.lift || 0) });
    if (o.cloak != null) h5CloakOnHead(ctx, hx, hy, P.s, tc, o.cloak);
    if (o.stool) { const [sx, sy] = ehHandW(P, P.handR); seatStool(ctx, sx, sy + 40, 0.8); } }]); }
  for (let i = 0; i < 2; i++) { const [P, o, D] = h5GuardCD(t, i); if (t >= 64.25 && t < 64.4) continue; const xsp = t >= 18.64 && t < 21.72 ? o.spear : null; if (xsp) { o.spear = null; items.push([990, () => { const Q = { ...P }; const [hx, hy] = ehHandW(Q, xsp.hand); ehFarSpear(ctx, hx, hy, Q.s || 1, xsp.lean, tc); }]); }
    items.push([P.y, () => { h5Fig(ctx, D, P, t, o); if (o.dropSpear > 0.5) { ehFarSpear(ctx, P.x + 70, P.y - 6, P.s, 1.45, tc); } }]); }
  { const [P, o] = h5Captain(t); items.push([P.y, () => { h5Fig(ctx, EH_CAPTAIN, P, t, o); const [bx, by] = ehHandW(P, [-28, -76]);
    if (o.scrap) { const [x, y] = ehHandW(P, P.handL); turbanScrap(ctx, x, y, 0.8, 0.4); } if (o.scrapBelt) turbanScrap(ctx, bx + 6, by + 10, 0.6, 1.3);
    ctx.save(); ctx.strokeStyle = '#e0b038'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(bx, by + 14, 10, 0, 7); ctx.stroke(); ctx.restore(); }]); }
  h5Crowd(t, items, ctx);
  // peacocks: one by the arcade, one near the court gate
  items.push([905, () => { const fan = t >= 38.9 && t < 41.5 ? ehE(tc, 39.1, 0.3) * (1 - ehE(tc, 41.0, 0.4)) : t >= 80.84 ? ehE(tc, 80.9, 0.3) : 0.1 + 0.05 * Math.sin(tc);
    peacock(ctx, { x: 1530 + 30 * Math.sin(t * 0.15), y: 905, s: 0.5, dir: 1, fan, tilt: t >= 14.8 && t < 16 ? -0.4 * pulse(tc, 14.95, 0.9) : idleSway(tc, 51, 0.2, 2), ph: tc * 5, amp: 0, peck: t > 20 && t < 34 ? Math.max(0, Math.sin(tc * 3)) : 0 }); }]);
  if (t >= 62) items.push([902, () => { const x = K.lerp(2240, 2150, ehE(t, 62.0, 2.6)); peacock(ctx, { x, y: 902, s: 0.48, dir: -1, fan: t >= 65.4 ? ehE(tc, 65.5, 0.3) * (t > 66.45 && t < 67.2 ? 0.4 : 1) : 0, tilt: idleSway(tc, 53, 0.2, 2.2), ph: tc * 6, amp: t < 65.4 ? 0.5 : 0 }); }]);
  // the gardener's boy runs in pointing (80.8 -)
  if (t >= 80.6) { const x = K.lerp(1350, 1660, ehE(t, 80.6, 1.0)), P = { x, y: 908, s: 1, child: true, ph: x / 14, amp: t < 81.6 ? 1 : 0, dir: 1, lid: ehLid(t, 441), mouth: 'open', gaze: [0.6, -0.8], handL: [-20, -110], handR: [70, -190], sq: 1, tip: -0.05 };
    items.push([908, () => h5Fig(ctx, EH_CHILD, P, t)]); }
  // the toolbox on the paving
  if (t >= 21.3 && t < 67.42) items.push([944, () => toolbox(ctx, h5Box(t)[0], h5Box(t)[1], { s: 0.9, open: t < 21.6 ? 0 : 1, crown: t < 37.9 ? 1 : t < 38.15 ? 1 - ehE(t, 37.9, 0.25) : 0 })]);
  else if (t < 21.3) items.push([944, () => toolbox(ctx, H5_BOX0[0], H5_BOX0[1], { s: 0.95, open: 0, crown: 1 })]);
  // the footstool
  if (t >= 68.5 && t < 77.18) items.push([931, () => seatStool(ctx, H5_STOOL, 931, 0.8)]);
  items.sort((a, b) => a[0] - b[0]); for (const [, f] of items) f();
  // the cap and the cloak in the air (37.32 - 38.0), the cloak over guard B's helmet until 38.9
  if (t >= 37.32 && t < 37.9) { const u = ehE(t, 37.32, 0.55, 'out'), [hx, hy] = [1995, 760]; h5ThrownCloak(ctx, [hx, hy], [1662, 700], u, t, 0.9); h5Cap(ctx, hx + 160 * u, hy - 30 - 200 * Math.sin(Math.PI * u), u * 6, 0.9); }
  if (t >= 37.9 && t < 39.0) { const u = ehE(t, 37.9, 0.8), x = 2155 + 80 * u, y = K.lerp(530, 900, u * u); h5Cap(ctx, x, y, 6 + u * 3, 0.9); }
  // the dome circle (S10) is drawn by h5SqWorldAir
  if (t >= 81.78) h5DomeCircle(ctx, t);
}
// the horse on the ground or rising, with riders from 67.95 / 69.4
function h5SqHorseDraw(ctx, t, H) { const tc = EH_T2(t);
  if (t < 67.95) { ebonyHorse(ctx, H); ehRosettes(ctx, H, { missing: 3, t: tc }); return; }
  const PF = t >= 69.4 ? h5SqPF(t, H) : null, PR = h5SqPR(t, H), air = t >= 77.18;
  const rig = (c) => { if (air) ehWindRibbons(c, H, tc, { ang: Math.PI / 2, len: 120 + 60 * ehE(t, 77.18, 1) });
    h5Pair(c, H, PF, PR, t, { veil: { stream: air ? 0.6 : 0, vx: 0 }, cape: { stream: air ? 0.5 : 0, ang: Math.PI * 0.5 }, armOver: t >= 71.0 && t < 71.6 ? null : null });
    ehRosettes(c, H, { missing: 3, t: tc }); if (t >= 72.72) saddleRope(c, H, t, { taut: ehE(t, 72.9, 0.15), tTaut: 73.05, lf: PF ? PF.lurch : 0, lr: PR.lurch }); };
  if (air) castFinish(ctx, H.x, H.y + 60 * H.s, 760 * H.s, 1000 * H.s, rig, { rim: '#fff2c0', light: [-1, -1], rimW: 2.5 }); else rig(ctx);
  if (t >= 71.2 && t < 74.0) { const k = ehHorsePt(H, EH_EBG.knob); ehGlint(ctx, k[0], k[1], 20, (t - 71.2) / 0.5); ehTick(ctx, k[0] + 30, k[1] - 40, K.clamp((t - 71.3) / 0.3), 0.9); }
  if (t >= 71.86 && t < 74.0) { const k = ehHorsePt(H, EH_EBG.lever); ehGlint(ctx, k[0], k[1], 20, (t - 71.86) / 0.5); ehTick(ctx, k[0] + 34, k[1] - 46, K.clamp((t - 71.96) / 0.3), 0.9); } }
function h5SqPF(t, H) { const tc = EH_T2(t), ps = h5PsF(H), P = { lid: ehLid(t, 11, [69.66]), mouth: 'smile', gaze: [1, 0.2], handL: h5Loc(H, ps, EH_EBG.mane[5], EH_SEAT2.front), handR: [40, -112], lurch: idleSway(tc, 31, 0.015, 2.2), sq: landSquash(tc, 69.4, 0.07) };
  if (t < 70.46) { P.gaze = [-1, 0.1]; P.dir = t < 69.7 ? -1 : 1; if (t >= 69.66 && t < 70.0) { P.lurch = 0.06 * pulse(tc, 69.66, 0.3); } }
  else if (t < 72.72) { P.handR = t < 71.2 ? [60, -150] : t < 71.86 ? h5Loc(H, ps, [EH_EBG.knob[0] + 6, EH_EBG.knob[1] - 6 + 6 * Math.abs(Math.sin(EH_T3(t) * 12))], EH_SEAT2.front) : h5Loc(H, ps, [EH_EBG.lever[0] - 6, EH_EBG.lever[1] + 10], EH_SEAT2.front);
    P.gaze = t < 71.2 ? [1, 0.3] : [0.7, 0.7]; P.talk = ehTalk(t, 70.46, 71.8, 29, 0.5); P.mouth = 'closed'; }
  else if (t < 74.32) { P.handR = [-10, -60 + 8 * pulse(tc, 72.8, 0.2) + 8 * pulse(tc, 73.0, 0.2)]; P.gaze = [-1, 0.6]; }
  if (t >= 76.36) { P.gaze = [0.6, 0.6]; P.handR = [-10, -64]; }
  if (t >= 78.14 && t < 78.5) { P.eyes = 'wide'; P.mouth = 'o'; } if (t >= 78.5) { P.mouth = 'smile'; P.gaze = [0.4, 0.8]; }
  if (t >= 81.3) P.gaze = [1, -0.2];
  return P; }
function h5SqPR(t, H) { const tc = EH_T2(t), ps = h5PsR(H), P = { lid: ehLid(t, 3, [69.66]), mouth: 'smile', gaze: [1, 0.2], handL: [50, -110], handR: [60, -112], lurch: idleSway(tc, 37, 0.015, 2.3), sq: landSquash(tc, 67.95, 0.1) };
  if (t < 68.88) { P.handR = [70, -150]; P.handL = [30, -96]; P.gaze = [1, 0.5]; if (t >= 68.12) { P.handR = [90, -80]; P.lurch = 0.1; } }
  else if (t < 69.4) { P.handR = [90, -90]; P.lurch = 0.08; P.gaze = [1, 0.6]; }
  else if (t < 70.46) { P.gaze = [1, 0]; if (t >= 69.66 && t < 70.0) P.lurch = -0.04; }
  else if (t < 72.72) { P.gaze = [1, 0.3]; P.mouth = 'closed'; P.talk = ehTalk(t, 70.7, 71.8, 31, 0.5); P.tip = 0.05 * Math.sin(tc * 3); }
  else if (t < 74.32) { P.handR = [-10, -60]; if (t >= 73.2) { P.handL = [40, -170]; P.mouth = 'smile'; } }
  if (t >= 74.32) { P.handR = h5Loc(H, ps, EH_EBG.knob, EH_SEAT2.rear, EH_SEAT2.rearDy); P.gaze = [1, 0.4]; }
  if (t >= 78.5) { P.gaze = [0.5, 0.8]; P.mouth = 'open'; }
  return P; }
// ---------- S10: the circle round the great dome ----------
function h5DomeCircle(ctx, t) { const tc = EH_T2(t), H = h5SqHorse(t), [dcx, dbase, dr] = EH_FP.domes[1], behind = t >= 82.34 && t < 83.3;
  const ring = t >= 83.94 ? 1 - K.clamp((t - 84.4) / 2.0) : 0, rp = K.clamp((t - 83.94) / 0.4), rcy = dbase - dr * 0.45, rx = dr * 1.45, ry = dr * 0.32;
  const ringArc = (a0, a1) => { if (ring <= 0) return; ctx.save(); ctx.globalAlpha *= ring; ctx.lineCap = 'round'; ctx.shadowColor = '#ffd36a'; ctx.shadowBlur = 16; ctx.strokeStyle = '#ffe08a'; ctx.lineWidth = 10; ctx.beginPath(); ctx.ellipse(dcx, rcy, rx, ry, -0.06, a0, a0 + (a1 - a0) * rp); ctx.stroke(); ctx.shadowBlur = 0; ctx.strokeStyle = '#fff6d8'; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); };
  ringArc(Math.PI, Math.PI * 2);
  const PF = { lid: ehLid(t, 11), mouth: 'smile', gaze: [1, 0.3], handL: [50, -110], handR: [40, -112] }, PR = { lid: ehLid(t, 3), mouth: 'smile', gaze: [1, 0.3], handL: [50, -110], handR: [60, -112] };
  if (t >= 85.42) { const w = Math.sin(tc * 12); PF.handR = [30, -200 + 20 * w]; PR.handL = [30, -210 - 20 * w]; PF.gaze = [0.3, 1]; PR.gaze = [0.3, 1]; }
  const draw = () => castFinish(ctx, H.x, H.y + 60 * H.s, 760 * H.s, 1000 * H.s, (c) => { ehWindRibbons(c, H, tc, { ang: Math.sign(H.dir) > 0 ? Math.PI : 0, len: 260 }); h5Pair(c, H, PF, PR, t, { veil: { stream: 1 }, cape: { stream: 1 } }); }, { rim: '#fff2c0', light: [-1, -1], rimW: 2 });
  draw();
  if (behind) { // the dome front pass over the rig
    celShade(ctx, K.rectPts(dcx - dr * 0.95, dbase, dr * 1.9, 440 - dbase), EH_FPM.morning.wall, EH_FPM.morning.wallS, { light: [-1, -1], off: dr * 0.25, lw: 3, line: EH_FP_LINE }); ehDome(ctx, dcx, dbase, dr, EH_TANGERINE, '#d8661a'); }
  ringArc(0, Math.PI);
  // doves off the dome (82.76)
  for (let i = 0; i < 7; i++) { const t0 = 82.76 + stagger(i, 0.09), u = t - t0; if (u < 0 || u > 4) continue; const R = K.rng(700 + i), x0 = dcx - 100 + R() * 200;
    bird(ctx, { kind: 'dove', x: x0 + (R() < 0.5 ? -1 : 1) * 160 * u, y: dbase - dr * 0.9 - 120 * u - 30 * Math.sin(u * 3), s: 0.22, dir: R() < 0.5 ? -1 : 1, fly: true, flap: Math.sin(tc * 20 + i * 1.3), pal: 0 }); } }
function h5SqWorldAir(ctx, t, cam) { h5SqWorld(ctx, t, cam); }
function h5SqOver(ctx, t, cam, S) {
  const tc = EH_T2(t);
  // title (0.3 - 2.9)
  if (t >= 0.3 && t < 2.9) { ctx.save(); ctx.globalAlpha *= 1 - K.clamp((t - 2.6) / 0.3); S.title(ctx, 'THE RESCUE', 500, 170, K.clamp((t - 0.3) / 0.8), { size: 80, align: 'center' });
    S.title(ctx, 'IN THE SKY', 500, 262, K.clamp((t - 0.5) / 0.8), { size: 80, align: 'center' });
    if (t > 0.7) S.title(ctx, SCRIPT_TITLE_AR, 500, 372, K.clamp((t - 0.7) / 0.8), { size: 66, align: 'center', font: 'Lalezar', glow: '#8a5cff' }); ctx.restore(); }
  if (t >= 76.36) return h5SqOverAir(ctx, t, cam, S);
  const fz = h5Fz(t)[0], head = (P) => h5Head({ ...P, y: P.y - (P.lift || 0) }, cam);
  if (t < 37.32) { h5Say(ctx, S, [[4.1, 'I CAN TEST IT.']], t, head(fz), { gone: 6.4, size: 46, up: 150 }); h5Say(ctx, S, [[6.72, 'SHE KNOWS ITS STORY.']], t, head(fz), { gone: 9.3, size: 46, up: 150, dx: -60 }); }
  if (t >= 19.92 && t < 21.4) { const [P] = h5Captain(t); h5Say(ctx, S, [[19.92, 'WAIT!']], t, head(P), { gone: 21.1, size: 56, up: 140 }); }
  // S4 picture balloons and her line
  if (t >= 26.48 && t < 34.3) { const h = head(fz), p = K.clamp((t - 26.48) / 0.25) * (1 - K.clamp((t - 34.02) / 0.25)), sl = ehE(t, 29.02, 0.33);
    iconBalloon(ctx, K.lerp(330, 300, sl), 230, 300, 210, p * (1 - sl), [h[0] - 40, h[1] - 60], (c, w, hh) => h5IconRose(c, w, hh));
    iconBalloon(ctx, K.lerp(820, 640, sl), 230, 300, 210, p * sl, [h[0] - 10, h[1] - 60], (c, w, hh) => h5IconCream(c, w, hh)); }
  if (t >= 34.02 && t < 37.32) { const [P] = h5Pr(t); h5Say(ctx, S, [[34.02, 'TELL THE KING\nTHE WHOLE TRUTH.']], t, head(P), { gone: 37.0, size: 44, up: 300, dx: -40 }); }
  // S5: impact flash, PRINCE FIRUZ, the pointing streak, the dotted match line
  if (t >= 37.32 && t < 37.9) S.emphasis(ctx, ...h5P(1995, 760, cam), 260, K.clamp((t - 37.32) / 0.55), { rect: [0, 0, 1000, 1230], seed: 5, word: '' });
  if (t >= 38.54 && t < 40.3) h5Say(ctx, S, [[38.54, 'I AM PRINCE FIRUZ!']], t, head(fz), { gone: 40.0, size: 50, up: 170 });
  if (t >= 39.12 && t < 40.9) { const [P] = h5Fz(t), a = h5P(...ehHandW(P, P.handR), cam), iv = h5Iv(t), b = h5Head(iv[0], cam); ctx.save(); ctx.globalAlpha *= K.clamp((40.9 - t) / 0.3); S.arrow(ctx, a, [b[0] - 20, b[1] + 30], K.clamp((t - 39.12) / 0.4), { width: 8, bend: 0.1 }); ctx.restore(); }
  if (t >= 40.32 && t < 43.0) { const [P] = h5Fz(t), a = h5P(...ehHandW(P, P.handL), cam), iv = h5Iv(t)[0], b = h5P(...ehHeadOf(iv), cam); h5DashLine(ctx, a, [b[0] + 30 * cam.zoom, b[1] - 20 * cam.zoom], K.clamp((t - 40.32) / 0.4) * K.clamp((43.0 - t) / 0.3)); }
  // S6: three cards, the king's order, the scales
  if (t >= 48.0 && t < 52.4) { const cards = [[48.0, 190, h5Card1], [48.6, 500, h5Card2], [49.1, 810, h5Card3]], tilt = 0.12 * ehE(t, 49.5, 0.3);
    cards.forEach(([a, x, f], i) => { const drop = t > 51.6 + i * 0.2 ? ehE(t, 51.6 + i * 0.2, 0.4, 'in') : 0; memoryCard(ctx, x, 210 + drop * 1200, K.clamp((t - a) / 0.25), t, { s: 0.62, rot: -0.03 + tilt + drop * 0.6, draw: (c, w, h) => f(c, w, h, t) }); }); }
  if (t >= 52.42 && t < 55.0) { const P = h5Kg(t); h5Say(ctx, S, [[52.42, 'HOLD HIM\nFOR THE JUDGE.']], t, head(P), { gone: 54.6, size: 44, up: 190, dx: -60 }); }
  if (t >= 54.66 && t < 56.5) { const P = h5Kg(t), h = head(P); iconBalloon(ctx, K.clamp(h[0] - 120, 160, 840), 230, 200, 160, K.clamp((t - 54.66) / 0.25) * K.clamp((56.5 - t) / 0.25), [h[0] - 20, h[1] - 60], (c, w, hh) => h5IconScales(c, w, hh, t)); }
  // S7
  if (t >= 58.06 && t < 60.4) { const P = h5Kg(t); h5Say(ctx, S, [[58.06, 'GO. TAKE HER HOME.']], t, head(P), { gone: 60.1, size: 46, up: 180, dx: -80 }); }
  if (t >= 61.96 && t < 63.4) { const [P] = h5Pr(t), h = head(P); iconBalloon(ctx, K.clamp(h[0] - 60, 170, 830), 220, 280, 190, K.clamp((t - 61.96) / 0.25) * K.clamp((63.4 - t) / 0.25), [h[0], h[1] - 60], (c, w, hh) => h5IconRose(c, w, hh)); }
  if (t >= 66.45 && t < 67.42) { const [x, y] = h5P(2470, 640, cam); h5Word(ctx, S, 'CLANK!', Math.min(x - 120, 720), Math.max(160, y - 110), t, 66.5, 67.4, { size: 70 }); }
}
function h5SqOverAir(ctx, t, cam, S) { const tc = EH_T2(t);
  if (t >= 80.84 && t < 81.78) { h5Word(ctx, S, 'OOOH!', 500, 1030, t, 80.84, 81.78, { size: 78 }); }
}
function h5DashLine(ctx, a, b, p) { if (p <= 0) return; const pts = [a, [K.lerp(a[0], b[0], p), K.lerp(a[1], b[1], p)]]; ctx.save(); ctx.lineCap = 'round'; ctx.setLineDash([14, 12]); ctx.shadowColor = '#ffd36a'; ctx.shadowBlur = 12; ctx.strokeStyle = '#ffd36a'; ctx.lineWidth = 7; K.poly(ctx, pts); ctx.stroke(); ctx.restore(); }
// the three testimony cards (box units)
function h5Card1(c, w, h, t) { const P = EH_GDAY.day; ehGrad(c, 0, 0, w, h, [[0, '#6ab0f8'], [1, '#cfeeff']]); c.fillStyle = '#6ab85a'; c.fillRect(0, h * 0.7, w, h);
  ebonyHorse(c, { x: w * 0.35, y: h * 0.9, s: 0.5, dir: 1 }); person(c, ehDressP(EH_INVENTOR, { x: w * 0.75, y: h * 0.92, s: 0.6, dir: -1, tip: 0.2, mouth: 'smile', handL: [30, -110], handR: [36, -104] })); }
function h5Card2(c, w, h, t) { ehGrad(c, 0, 0, w, h, [[0, '#3a6ad8'], [1, '#a8d0f8']]); h4S1RangeLite(c, h * 0.86, w); ehHorseSil(c, w * 0.5, h * 0.62, 0.42, { riders: 2 });
  c.save(); c.strokeStyle = '#ff7ad9'; c.lineWidth = 6; c.setLineDash([10, 8]); c.beginPath(); c.moveTo(w * 0.36, h * 0.38); c.lineTo(w * 0.08, h * 0.2); c.stroke(); c.restore(); }
function h5Card3(c, w, h, t) { ehGrad(c, 0, 0, w, h, [[0, '#fbf1e0'], [1, '#e8c4a0']]); c.fillStyle = '#a8703a'; c.fillRect(w * 0.2, h * 0.15, w * 0.6, h * 0.85); c.strokeStyle = '#4a2a14'; c.lineWidth = 5; c.strokeRect(w * 0.2, h * 0.15, w * 0.6, h * 0.85);
  c.fillStyle = '#2a1a2a'; c.fillRect(w * 0.4, h * 0.3, w * 0.2, h * 0.16); celShade(c, ell(w * 0.5, h * 0.36, w * 0.07, h * 0.05, 12), EH_SAFFRON, '#c07a10', { off: 3, lw: 2 });
  c.strokeStyle = '#3a3448'; c.lineWidth = 3; for (let k = 1; k < 4; k++) { c.beginPath(); c.moveTo(w * (0.4 + k * 0.05), h * 0.3); c.lineTo(w * (0.4 + k * 0.05), h * 0.46); c.stroke(); }
  celShade(c, K.rectPts(w * 0.16, h * 0.6, w * 0.68, h * 0.08), '#b8783a', '#7a4a2a', { off: 4, lw: 3, line: '#4a2a14' }); }
function h4S1RangeLite(c, y, w) { for (let i = 0; i < 5; i++) { const bx = i * w / 4, hh = 70 + (i % 2) * 40; celShade(c, [[bx - 90, y], [bx, y - hh], [bx + 90, y]], '#9aa8e0', '#7480c0', { off: 30, lw: 2, line: '#5a60a0' }); shape(c, [[bx - 26, y - hh * 0.7], [bx, y - hh], [bx + 26, y - hh * 0.7]], '#f6f8ff', { lw: 1.5 }); } }
