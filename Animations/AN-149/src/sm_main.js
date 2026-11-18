// ===== AN-149 main: set segments, cameras, the S13 insert, the S15 moral cloud, lettering, transitions, sound =====
// segments: [id, start, end]; scenes S1..S15 of the plan map onto them (S2-S4 school, S5-S6 street, S7-S8 room, S9-S12 flashback, S14-S15 present)
const SM_SEG = [['st1', 0, 4.88], ['school', 4.88, 43.93], ['st2', 43.93, 64.22], ['room', 64.22, 107.66], ['fb', 107.66, 146.58], ['ins', 146.58, 150.2], ['pres', 150.2, SM_DUR + 1]];
const smSegAt = (t) => SM_SEG.find((s) => t < s[2]) || SM_SEG[SM_SEG.length - 1];
function smCam(seg, t) {
  if (seg === 'st1') return smCamK([[0, 350, 615, 1.0], [1.0, 350, 615, 1.0], [3.6, 480, 640, 1.2]], t, 2000);
  if (seg === 'school') return smCamK(SM_SCHOOL_CAM, t, 1000);
  if (seg === 'st2') return smS5Cam(t);
  if (seg === 'room') return smCamK(SM_ROOM_CAM, t, 1000);
  if (seg === 'fb') return smCamK(SM_FB_CAM, t, 2000);
  if (seg === 'ins') return smCamK([[0, 1450, 615, 1.0]], t, 2000);
  return smPresentCam(t);
}
// the school sign pops on its word (S1)
function smSignPop(ctx, t) { const k = 1 + 0.18 * pulse(t, 1.98, 0.45); if (k === 1) return; ctx.save(); ctx.translate(500, 640); ctx.scale(k, k); shape(ctx, K.rectPts(-108, -36, 216, 72), C.yellow, { lw: 6, seed: 951, dot: C.red, pitch: 8, rad: 0.2, da: 0.4 });
  ctx.font = K.font(54, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = C.black; ctx.fillText('SCHOOL', 0, 2); ctx.restore(); }
// v2 (Fable note 4): a flat insert on a plain blue Ben-Day field, two pictures stacked (about 780 x 380 px each), no singer or street behind.
function smInsert(ctx, t, S) {
  ctx.save(); ctx.fillStyle = C.blue; ctx.fillRect(0, 0, 1000, 1230); ctx.fillStyle = dotPat(ctx, '#0d2f80', 14, 0.3); ctx.fillRect(0, 0, 1000, 1230); ctx.restore();
  const L = settleTo(t, 146.58, -500, 0, 0.45, 0.08), R = settleTo(t, 146.7, 1000, 0, 0.45, 0.08);
  const frame = (dx, y0, h, bg, inside) => { const pts = K.rectPts(100 + dx, y0, 800, h); ctx.save(); ctx.fillStyle = 'rgba(20,20,20,0.9)'; ctx.fillRect(110 + dx, y0 + 10, 800, h);
    ctx.fillStyle = bg; ctx.fillRect(100 + dx, y0, 800, h); K.poly(ctx, pts, true); ctx.clip(); inside(); ctx.restore(); shape(ctx, pts, 'rgba(0,0,0,0)', { lw: 8, seed: 1301 }); };
  // THE SONG: GONE (the lady on the donkey trots off the end of the road; dust; empty road)
  frame(L, 90, 380, '#ffe9b0', () => { ctx.translate(500 + L, 280 - 25 * 1.85); ctx.scale(1.85, 1.85); const tt = t < 147.46 ? 134.6 : 134.4 + ((t - 147.46) % 2.0); smSongPic(ctx, t, tt); });
  // HIS GUESS: DEAD? (the marker he invented; a red question mark stamped on تؤكد 148.82)
  frame(R, 600, 390, '#d6d2e0', () => { shape(ctx, [[90 + R, 930], [910 + R, 922], [910 + R, 1000], [90 + R, 1000]], SANDL, { lw: 5, seed: 994, dot: C.red, pitch: 10, rad: 0.15 });
    smGrave(ctx, 420 + R, 935, 1.3, {});
    if (t >= 148.82) { const k = settleTo(t, 148.82, 0, 1, 0.3, 0.25), q = landSquash(t, 149.1, 0.2); ctx.save(); ctx.translate(680 + R, 900); ctx.scale(2 - q, q); smQ(ctx, 0, -130, 240 * k, 1, C.red, -0.1); ctx.restore(); } });
  if (t >= 148.82) { const q = pulse(t, 148.82, 0.4); if (q > 0) smImpact(ctx, 680, 770, 130, q, 9, -Math.PI); }
  // the mini teacher (green, heart on his turban) under the GUESS, thought bubbles up into it
  const mk = K.ease.back(K.clamp((t - 147.0) / 0.35));
  if (mk > 0) { ctx.save(); ctx.translate(850, 1230); ctx.scale(mk, mk); ctx.translate(-850, -1230);
    const P = { x: 860, y: 1345, s: 1.0, costume: 'merchant', pal: SM_GREEN, age: 0.2, seed: 22, dir: -1, mouth: 'closed', brow: -0.5, gaze: [-0.4, -0.9], hR: SM_H.chin, hL: SM_H.restL }; smPerson(ctx, P);
    const tp = smTop(P); heart(ctx, tp[0] + 4, tp[1] - 24, 18);
    [[800, 1062, 10], [772, 1036, 15], [740, 1008, 20]].forEach(([x, y, r], i) => { if (t < 147.2 + i * 0.1) return; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fillStyle = '#d6d2e0'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.black; ctx.stroke(); });
    ctx.restore(); }
  if (t >= 146.8) S.label(ctx, 'THE SONG: GONE', 330, 535, smB(t, 146.8, 0.35), { size: 44, align: 'center' });
  if (t >= 147.2) S.label(ctx, 'HIS GUESS: DEAD?', 340, 1065, smB(t, 147.2, 0.35), { size: 44, align: 'center', color: C.red });
}
function smInsertBack(ctx, t) {   // the street behind the insert: the singer strolls away far down the street
  smStreetSet(ctx, t, { palette: 'dusk', u: 0.42, doors: [0, 0, 0], shut: 1, board: 1, swing: 0 }); smTeachWin(ctx, t, { tw: 1 }, null, null); smStreetBook(ctx, t);
  const xf = (q) => 1600 + (q - 146.58) * 70, w = smWalk(xf, t, 0.8), P = { ...w, y: 900, s: 0.8, costume: 'villager', pal: SM_SINGER, eyes: 'shut', dir: 1, talk: 0.5 + 0.4 * Math.abs(Math.sin(t * 5)), hL: [-58, -168], hR: [12 + 12 * Math.sin(t * 37), -112], seed: 61 };
  smSingerDraw(ctx, P); smNotes(ctx, P.x + 10, 700, t, { t0: 149.4, t1: 149.8, gap: 0.4, life: 1.2, seed: 9 });
}
// ---------- S15: the moral in the scholar's thought cloud (panel space) ----------
// v2 (Fable note 1): no cover patch. The tower stands in the ground line of the cloud and is clipped there; until بيتين 165.40 it is sunk 135 units,
// so the heart seems to sit on the ground; then it rises with an overshoot and the two song notes appear under it. Teacher and books in the left third.
const SM_MC = { x: 500, y: 400, w: 900, h: 600, sc: 0.9, at: [500, 689], GY: 900, TX: 650, stX: 165, mtX: 315 };
const smMcP = (x, y) => [SM_MC.x + (x - SM_MC.at[0]) * SM_MC.sc, SM_MC.y + (y - SM_MC.at[1]) * SM_MC.sc];   // cloud-inner -> panel
const smMcOff = (t) => settleTo(t, 165.4, 135, 0, 0.45, 0.12);
function smMoralInside(t) { return (c) => {
  const { GY, TX, stX, mtX } = SM_MC;
  shape(c, [[-20, GY], [1020, GY], [1020, 1100], [-20, 1100]], '#e2d6b8', { lw: 4, seed: 1201, dot: '#c9b48a', pitch: 9, rad: 0.15 });
  const nb = [0, 1, 2, 3, 4, 5].reduce((s, k) => s + K.clamp((t - 159.6 - k * 0.26) / 0.2), 0);
  if (nb > 0) smBookStack(c, stX, GY, nb, { s: 1.1, seed: 5 });
  // BOOK (learning: tick) and LAMP (judgment: out, red cross), the payoff of the 40.98 / 42.40 setup
  if (smIn(t, 160.9, 162.9)) { const a = smFade(t, 160.9, 162.9, 0.25), kb = K.ease.back(K.clamp((t - 160.9) / 0.3)), kl = K.ease.back(K.clamp((t - 161.0) / 0.3)); c.save(); c.globalAlpha = a;
    smGlow(c, 175, 575, 80, 0.6, t); c.save(); c.translate(175, 590); c.scale(kb, kb); smBook(c, 0, 0, 1.0, { col: C.red, open: 1 }); c.restore(); smTick(c, 205, 545, 40, (t - 161.0) / 0.25);
    c.save(); c.translate(390, 600); c.scale(kl, kl); smLampIcon(c, 0, 0, 0.72, t < 161.4 ? 1 : 0, t, t >= 161.4 ? (t - 161.4) / 0.8 : 0); c.restore(); smCross(c, 400, 575, 58, (t - 161.4) / 0.25);
    if (t >= 161.4) dustBurst(c, 445, 575, t - 161.4, 6, 4, 9, 40, 0.5, 6); c.restore(); }
  // the mini teacher builds his tower
  const P = { x: mtX, y: GY, s: 0.85, costume: 'merchant', pal: SM_GREEN, age: 0.2, seed: 24, mouth: 'smile', dir: 1 };
  P.sq = anticipate(t, 162.98, 0.15, 0.08) * anticipate(t, 163.62, 0.15, 0.08);
  const lifting = smIn(t, 163.05, 163.32) || smIn(t, 163.7, 164.02); P.hR = lifting ? [40, -232] : t < 165.4 ? PERSON_HANDS.hipsHands.R : SM_H.chin; P.hL = lifting ? [-40, -232] : t < 165.4 ? PERSON_HANDS.hipsHands.L : SM_H.restL;
  P.gaze = t < 162.98 ? [0, 0.1] : lookAt([mtX, 700], [TX, 650]); if (t >= 171.6) { P.hR = SM_H.head; P.hL = SM_H.headL; P.eyes = 'wide'; P.mouth = 'o'; P.gaze = [1, -0.2]; }
  if (t >= 158.22) smPerson(c, P);
  // the tower (unshifted geometry): two notes on the ground, the heart on the notes, the grave block on the heart
  const off = smMcOff(t), fall = t >= 171.6, hr = 66, hy = 694, gy = 656, hx = TX - 6;
  const sway = 0.05 * Math.sin((t - 165.4) * 2.4) * smB(t, 165.4, 1.5) * (fall ? 0 : 1);
  const hH = smHead(P), fly = (t0, d, from, to) => { const u = smB(t0 <= t ? t : t0, t0, d); return [K.lerp(from[0], to[0], u), K.lerp(from[1], to[1], u) - 110 * Math.sin(Math.PI * K.clamp((t - t0) / d))]; };
  const heartPos = t < 163.32 ? [hH[0], hH[1] - 70] : fly(163.32, 0.12, [hH[0], hH[1] - 70], [hx, hy + off]);
  const gravePos = t < 164.02 ? [hH[0], hH[1] - 50] : fly(164.02, 0.14, [hH[0], hH[1] - 50], [TX, gy + off]);
  c.save(); c.beginPath(); c.rect(-100, -100, 1200, GY + 102); c.clip();
  c.save(); c.translate(TX, GY + off); c.rotate(sway); c.translate(-TX, -(GY + off));
  note(c, TX - 80, GY - 22 + off, 2.7, C.black); note(c, TX + 20, GY - 22 + off, 2.7, C.red);
  if (!fall) {
    if (t >= 163.05) { const sq = landSquash(t, 163.44, 0.18); c.save(); c.translate(heartPos[0], heartPos[1] + 1.19 * hr); c.scale(2 - sq, sq); heart(c, 0, -1.19 * hr, hr); c.restore(); }
    if (t >= 163.7) { const sq = landSquash(t, 164.16, 0.18); c.save(); c.translate(gravePos[0], gravePos[1]); c.scale(2 - sq, sq); smGrave(c, 0, 0, 1.25, { dark: true, noMound: true }); c.restore(); }
  }
  c.restore();
  if (fall) { const u = (q, d = 0.4) => K.clamp((t - 171.6 - q) / d);   // both fall to the right, away from the teacher
    const hx2 = K.lerp(hx, 800, u(0.05)), hy2 = t < 171.65 ? hy : fallY(t, 171.65, 172.0, hy, GY - 205) - rebound(t, 172.0, 18, 0.25);
    c.save(); c.translate(hx2, hy2); c.rotate(0.9 * u(0.05)); heart(c, 0, 0, hr); c.restore();
    const ga = K.lerp(0, 1.57, u(0, 0.42)), gx = K.lerp(TX, 715, u(0, 0.42)), gy2 = t < 171.6 ? gy : fallY(t, 171.6, 172.02, gy, GY - 66) - rebound(t, 172.02, 12, 0.22);
    c.save(); c.translate(gx, gy2); c.rotate(ga); smGrave(c, 0, 0, 1.25, { dark: true, noMound: true }); c.restore();
    dustBurst(c, 780, GY - 6, t - 172.0, 10, 10, 22, 130, 0.8, 4); }
  c.restore();
  // her truth and her fate: unknown (upper right, clear of the falling pieces)
  if (t >= 168.94) { const a = smB(t, 168.94, 0.5); c.save(); c.globalAlpha = a; smMiniLady(c, 840, 600, 0.5, t); c.restore(); }
  if (t >= 170.84) { const a = smB(t, 170.84, 0.4); c.save(); c.globalAlpha = a; donkey(c, { x: 760 + 20 * Math.min(1, t - 170.84), y: 600, s: 0.26, dir: 1, silhouette: true, ph: t * 8, amp: t < 171.84 ? 1 : 0 }); smQ(c, 905, 520, 80, 1, C.red); c.restore(); }
}; }
function smMoralCloud(ctx, t, cam, P, S) {
  if (t < 158.22) return; const top = smTop(P), tp = smPan(top[0], top[1], cam), p = K.clamp((t - 158.22) / 0.7);
  thoughtCloud(ctx, SM_MC.x, SM_MC.y, SM_MC.w, SM_MC.h, t, { p, tail: [tp[0] + 6, tp[1] - 26], scale: SM_MC.sc, at: SM_MC.at, bg: '#f4f1ea', inside: smMoralInside(t) });
  // 2 SONGS: white label with black text beside the notes, short arrow to them (165.6 .. 172.3)
  if (smIn(t, 165.6, 172.3)) { const a = smFade(t, 165.6, 172.3, 0.2), n = smMcP(SM_MC.TX - 70, SM_MC.GY - 60), lp = [356, 318];
    ctx.save(); ctx.globalAlpha = a; S.label(ctx, '2 SONGS', lp[0], lp[1], smB(t, 165.6, 0.35), { size: 50, align: 'center' });
    S.arrow(ctx, [lp[0] + 70, lp[1] + 20], [n[0] - 14, n[1] - 4], smB(t, 165.75, 0.35), { width: 16, bend: 0.25 }); ctx.restore(); }
}
// ---------- lettering, labels, arrows (panel space) ----------
function smOver(ctx, t, cam, S, seg, st) {
  const P = (x, y) => smPan(x, y, cam);
  const lab = (txt, x, y, a, b, o = {}) => { if (!smIn(t, a, b)) return; ctx.save(); ctx.globalAlpha = smFade(t, a, b, 0.2); S.label(ctx, txt, x, y, smB(t, a, 0.35), { size: 46, align: 'center', ...o }); ctx.restore(); };
  const arr = (a0, a1, a, b, o = {}) => { if (!smIn(t, a, b)) return; ctx.save(); ctx.globalAlpha = smFade(t, a, b, 0.2); S.arrow(ctx, a0, a1, smB(t, a, 0.4), { width: 18, ...o }); ctx.restore(); };
  const word = (txt, x, y, a, b, size = 84, o = {}) => { if (!smIn(t, a, b)) return; ctx.save(); ctx.globalAlpha = smFade(t, a, b, 0.15); sfx(ctx, txt, x, y, size, K.clamp((t - a) / 0.25), o); ctx.restore(); };
  if (seg === 'st1') { const d = P(500, 690); arr([d[0] - 260, d[1] - 330], [d[0] - 40, d[1] - 6], 1.98, 4.88, { bend: -0.25 }); }
  if (seg === 'school') {
    if (smIn(t, 17.0, 22.62)) { const n = t < 17.4 ? 1 : t < 17.8 ? 2 : 3; lab(n + ' / 3', 500, 170, 17.0, 22.62, { size: 70 }); if (pulse(t, 20.62, 0.5) > 0) { ctx.save(); ctx.globalAlpha = 0.9; star(ctx, 640, 120, 30 * pulse(t, 20.62, 0.5), C.yellow); ctx.restore(); } }
    if (smIn(t, 22.9, 28.6)) { const n = t < 25.46 ? 1 : t < 25.93 ? 2 : t < 26.4 ? 3 : 4; ctx.save(); ctx.globalAlpha = smFade(t, 22.9, 28.6, 0.25); S.counter(ctx, n, 170, 230, smB(t, 22.9, 0.3), { size: 96 }); S.label(ctx, 'VISIT', 170, 330, smB(t, 23.0, 0.3), { size: 40, align: 'center' }); ctx.restore(); }
  }
  if (seg === 'st2') {
    if (smIn(t, 48.5, 50.0)) { const b = P(500, 770); ctx.save(); ctx.globalAlpha = smFade(t, 48.5, 50.0, 0.2); smImpact(ctx, b[0], b[1], 150, smB(t, 48.5, 0.3), 9, -Math.PI); ctx.restore(); }
    if (smIn(t, 55.6, 57.6) && st && st.C2) { const h = st.C2.HR, a = P(h[0], h[1]); arr([a[0] + 20, a[1] + 40], [985, a[1] + 60], 55.6, 57.6, { bend: 0.08 }); }
  }
  if (seg === 'room' && st) {
    const T = st.T, h = smHead(T);
    // v2 (note 9): three short labelled arrows, one at a time: tears, black robe, tissues
    { const e = P(h[0] + 24, h[1] + 8), ch = P(T.x - 10, 800), pile = P(745, 880);
      lab('TEARS', e[0] + 210, e[1] - 150, 67.0, 69.6, { size: 40 }); arr([e[0] + 190, e[1] - 130], [e[0] + 30, e[1] - 10], 67.0, 69.6, { width: 14, bend: 0.15 });
      lab('BLACK ROBE', ch[0] + 210, ch[1] - 60, 67.6, 69.6, { size: 40 }); arr([ch[0] + 160, ch[1] - 40], [ch[0] + 50, ch[1] + 10], 67.6, 69.6, { width: 14, bend: -0.15 });
      lab('TISSUES', pile[0] + 30, pile[1] + 170, 68.3, 69.6, { size: 40 }); arr([pile[0] + 10, pile[1] + 130], [pile[0], pile[1] + 30], 68.3, 69.6, { width: 14, bend: 0.1 }); }
    const q1 = P(330, 410); word('NO!', q1[0] + 150, q1[1] - 150, 79.62, 81.3, 90, { rot: -0.08, fill: C.red });
    const q2 = P(340, 400); word('MANY!', q2[0] + 160, q2[1] - 150, 92.0, 93.7, 76, { rot: 0.06 });
    const sh = smHead(st.S), sp = P(sh[0], sh[1]); word('WHAT?!', K.clamp(sp[0] + 60, 260, 740), K.clamp(sp[1] - 195, 150, 900), 99.9, 101.1, 185, { rot: -0.08 });
    word('HOW?', 500, 200, 103.51, 104.9, 96, { rot: 0.05, fill: C.white });
  }
  if (seg === 'fb' && st) {
    lab('EARLIER...', 270, 150, 107.9, 110.6, { size: 54 });   // v2 (note 5)
    if (st.sg && smIn(t, 112.82, 114.6)) { const a = P(smHead(st.sg)[0] + 40, smHead(st.sg)[1] - 70), b = P(1500, 610); arr(a, b, 112.82, 114.6, { bend: -0.25 }); }
    if (smIn(t, 116.84, 119.4)) { const n = smNamePos(t), q = P(n[0], n[1]); word('UMM AMR', q[0], q[1], 116.84, 119.4, 140, { fill: C.yellow, rot: -0.05 }); }
    if (smIn(t, 128.3, 131.2)) { lab('2 DAYS LATER', 500, 190, 128.3, 131.2, { size: 54 }); const n = t < 128.8 ? 0 : t < 129.5 ? 1 : 2; if (n) { ctx.save(); ctx.globalAlpha = smFade(t, 128.8, 131.2, 0.2); S.counter(ctx, n, 860, 330, smB(t, n === 1 ? 128.8 : 129.5, 0.25), { size: 80 }); ctx.restore(); } }
    if (st.T && smIn(t, 141.6, 142.45)) { const h = smHead(st.T), q = P(h[0] - 120, h[1] - 40); word('SOB!', q[0], q[1], 141.6, 142.45, 90, { rot: -0.1, fill: '#9ec3ff' }); }
    smSpeed(ctx, pulse(t, 142.45, 0.36) * 1.2, 7);
  }
  if (seg === 'pres' && st && st.P) { smMoralCloud(ctx, t, cam, st.P, S); if (t >= 172.5) S.title(ctx, 'THE END', 470, 300, smB(t, 172.5, 0.8), { size: 88, align: 'center' }); }
}
function smDrawSeg(ctx, seg, t, S) {
  const cam = smCam(seg, t); let st = null;
  SM_PTF = ctx.getTransform(); ctx.save(); K.camera(ctx, 1000, 1230, cam);
  if (seg === 'st1') { smS1(ctx, t); smSignPop(ctx, t); }
  else if (seg === 'school') st = smSchool(ctx, t, cam);
  else if (seg === 'st2') st = smS5(ctx, t);
  else if (seg === 'room') st = smRoom(ctx, t, cam);
  else if (seg === 'fb') st = smFb(ctx, t, cam);
  else if (seg === 'ins') { /* v2: the insert covers the panel (smInsert) */ }
  else st = smPresent(ctx, t, cam);
  ctx.restore();
  if (seg === 'ins') smInsert(ctx, t, S);
  smOver(ctx, t, cam, S, seg, st);
}
const SCENE = {
  duration: SM_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196, sh = K.spring(t, 99.82, 6, 14, 10) + K.spring(t, 171.8, 4, 14, 10);
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh * 0.8, py - sh * 0.5); ctx.scale(pw / 1000, ph / 1230);
    const sg = smSegAt(t); smDrawSeg(ctx, sg[0], t, S);
    if (t >= 43.3 && t < 44.7) S.transition(ctx, 1000, 1230, (t - 43.3) / 1.4, { caption: 'LATER...' });
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // the plan's seven quiet effects, only in real narration gaps or after the last word (master 0.6 at render)
    k.play('pop', 4.3, { gain: 0.3 });
    k.play('thud', 12.3, { gain: 0.3 });
    k.play('chime', 22.0, { note: 'E6', gain: 0.4 });
    k.play('pop', 85.1, { gain: 0.3 });
    k.play('thud', 127.35, { gain: 0.35 });
    k.play('thud', 171.8, { gain: 0.4 });
    k.play('chime', 172.7, { note: 'C6', gain: 0.5 });
  },
};
window.SCENE = SCENE;
