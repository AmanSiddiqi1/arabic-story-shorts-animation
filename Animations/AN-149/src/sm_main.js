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
// ---------- S13 insert: THE SONG: GONE / HIS GUESS: DEAD? (panel space) ----------
function smInsert(ctx, t, S) {
  ctx.save(); ctx.fillStyle = 'rgba(13,34,96,0.5)'; ctx.fillRect(0, 0, 1000, 1230); ctx.restore();
  const L = settleTo(t, 146.58, -260, 270, 0.45, 0.08), R = settleTo(t, 146.7, 1260, 730, 0.45, 0.08);
  smBalloon(ctx, L, 500, 410, 330, 1, [L + 120, 720], (c) => { c.save(); c.scale(0.98, 1.1); const tt = t < 147.46 ? 134.6 : 134.4 + ((t - 147.46) % 2.0); smSongPic(c, t, tt); c.restore(); });
  ctx.save(); ctx.translate(R, 500); ctx.rotate(swing(t, 148.82, 0.07, 1.6, 2)); ctx.translate(-R, -500);
  thoughtCloud(ctx, R, 500, 410, 330, t, { p: 1, tail: [R - 120, 720], scale: 0.42, at: [500, 820], bg: '#d6d2e0', inside: (c) => {
    shape(c, [[60, 900], [940, 880], [940, 1100], [60, 1100]], SANDL, { lw: 5, seed: 994, dot: C.red, pitch: 10, rad: 0.15 }); desertMilestone(c, 800, 890); smGrave(c, 500, 895, 1.5, {});
    if (t >= 148.82) { const k = settleTo(t, 148.82, 0, 1, 0.3, 0.25); smQ(c, 500, 700, 260 * k, 1, C.red, -0.1); } } });
  ctx.restore();
  if (t >= 148.82) { const q = pulse(t, 148.82, 0.4); if (q > 0) smImpact(ctx, R, 470, 120, q, 9, -Math.PI); }
  if (t >= 146.8) S.label(ctx, 'THE SONG: GONE', 270, 735, smB(t, 146.8, 0.35), { size: 44, align: 'center' });
  if (t >= 147.2) S.label(ctx, 'HIS GUESS: DEAD?', 730, 735, smB(t, 147.2, 0.35), { size: 44, align: 'center', color: C.red });
}
function smInsertBack(ctx, t) {   // the street behind the insert: the singer strolls away far down the street
  smStreetSet(ctx, t, { palette: 'dusk', u: 0.42, doors: [0, 0, 0], shut: 1, board: 1, swing: 0 }); smTeachWin(ctx, t, { tw: 1 }, null, null); smStreetBook(ctx, t);
  const xf = (q) => 1600 + (q - 146.58) * 70, w = smWalk(xf, t, 0.8), P = { ...w, y: 900, s: 0.8, costume: 'villager', pal: SM_SINGER, eyes: 'shut', dir: 1, talk: 0.5 + 0.4 * Math.abs(Math.sin(t * 5)), hL: [-58, -168], hR: [12 + 12 * Math.sin(t * 37), -112], seed: 61 };
  smSingerDraw(ctx, P); smNotes(ctx, P.x + 10, 700, t, { t0: 149.4, t1: 149.8, gap: 0.4, life: 1.2, seed: 9 });
}
// ---------- S15: the moral in the scholar's thought cloud (panel space) ----------
function smMoralInside(t) { return (c) => {
  const slide = smB(t, 162.27, 0.6), stX = K.lerp(400, 200, slide), mtX = K.lerp(550, 340, slide);
  shape(c, [[90, 900], [910, 900], [910, 990], [90, 990]], '#e2d6b8', { lw: 4, seed: 1201, dot: '#c9b48a', pitch: 9, rad: 0.15 });
  const nb = [0, 1, 2, 3, 4, 5].reduce((s, k) => s + K.clamp((t - 159.6 - k * 0.26) / 0.2), 0);
  if (nb > 0) smBookStack(c, stX, 900, nb, { s: 1.4, seed: 5 });
  if (t >= 160.9) smTick(c, stX + 10, 900 - nb * 26 * 1.4 - 50, 46, (t - 160.9) / 0.25);
  if (smIn(t, 160.9, 162.6)) { const a = smFade(t, 160.9, 162.6, 0.25); c.save(); c.globalAlpha = a; smGlow(c, stX - 10, 470, 90, 0.7, t); smBook(c, stX - 10, 470, 1.4, { col: C.red, open: 1 }); smLampIcon(c, stX + 220, 500, 1.0, 0, t); c.restore(); }
  // the mini teacher builds
  const heave = smB(t, 162.98, 0.3), P = { x: mtX, y: 900, s: 1.0, costume: 'merchant', pal: SM_GREEN, age: 0.2, seed: 24, mouth: 'smile', noBlink: false, dir: 1 };
  P.sq = anticipate(t, 162.98, 0.15, 0.08) * anticipate(t, 163.62, 0.15, 0.08);
  const lifting = smIn(t, 163.05, 163.32) || smIn(t, 163.7, 164.02); P.hR = lifting ? [40, -232] : t < 165.4 ? PERSON_HANDS.hipsHands.R : SM_H.chin; P.hL = lifting ? [-40, -232] : t < 165.4 ? PERSON_HANDS.hipsHands.L : SM_H.restL;
  P.gaze = t < 162.98 ? [0, 0.1] : lookAt([mtX, 700], [640, 760]); if (t >= 171.6) { P.hR = SM_H.head; P.hL = SM_H.headL; P.eyes = 'wide'; P.mouth = 'o'; }
  if (t >= 158.22) smPerson(c, P);
  // the tower: two song notes, a heart block, a grave block
  const pv = [640, 885], sway = 0.06 * Math.sin((t - 165.4) * 2.4) * smB(t, 165.4, 1.5) * (t < 171.6 ? 1 : 0), fall = t >= 171.6;
  note(c, 612, 886, 1.4, C.black); note(c, 668, 886, 1.4, C.red);
  const hHand = smHead(P), heartPos = t < 163.32 ? [hHand[0], hHand[1] - 60] : [K.lerp(mtX, 640, smB(t, 163.32, 0.12)), K.lerp(640, 764, smB(t, 163.32, 0.12)) - 80 * Math.sin(Math.PI * K.clamp((t - 163.32) / 0.12))];
  const gravePos = t < 164.02 ? [hHand[0], hHand[1] - 40] : [K.lerp(mtX, 640, smB(t, 164.02, 0.14)), K.lerp(560, 745, smB(t, 164.02, 0.14)) - 80 * Math.sin(Math.PI * K.clamp((t - 164.02) / 0.14))];
  c.save(); c.translate(pv[0], pv[1]); c.rotate(sway); c.translate(-pv[0], -pv[1]);
  if (!fall) {
    if (t >= 163.05) { const sq = landSquash(t, 163.44, 0.15); c.save(); c.translate(heartPos[0], heartPos[1] + 60); c.scale(2 - sq, sq); heart(c, 0, -60, 55); c.restore(); }
    if (t >= 163.7) { const sq = landSquash(t, 164.16, 0.15); c.save(); c.translate(gravePos[0], gravePos[1]); c.scale(2 - sq, sq); smGrave(c, 0, 0, 1.0, { dark: true }); c.restore(); }
  }
  c.restore();
  if (fall) { const u = (q) => K.clamp((t - 171.6 - q) / 0.35);
    const hx = K.lerp(640, 500, u(0)), hy = fallY(t, 171.6, 171.95, 764, 846) - rebound(t, 171.95, 20, 0.25), ga = K.lerp(0, 1.45, u(0.05)), gx = K.lerp(640, 790, u(0.05)), gy = fallY(t, 171.65, 172.0, 745, 892) - rebound(t, 172.0, 14, 0.22);
    c.save(); c.translate(hx, hy); c.rotate(-1.1 * u(0)); heart(c, 0, 0, 55); c.restore(); c.save(); c.translate(gx, gy); c.rotate(ga); smGrave(c, 0, 0, 1.0, { dark: true }); c.restore();
    dustBurst(c, 640, 890, t - 171.95, 10, 10, 22, 120, 0.8, 4); }
  // the mist that hides the foundation until 2 SONGS
  const mist = 1 - smB(t, 165.4, 0.6); if (mist > 0) { c.save(); c.globalAlpha = mist; for (let k = 0; k < 6; k++) shape(c, ell(570 + k * 30 + (k % 2 ? -1 : 1) * 30 * (1 - mist), 870 - (k % 2) * 16, 44, 30, 16), C.white, { lw: 0 }); c.restore(); }
  if (t >= 165.4) { sfx(c, '2 SONGS', 480, 960, 64, (t - 165.6) / 0.3, { fill: C.yellow }); if (t < 171.6) { c.save(); c.lineWidth = 7; c.strokeStyle = C.black; c.beginPath(); c.moveTo(550, 935); c.quadraticCurveTo(585, 915, 604, 895); c.stroke(); c.restore(); } }
  // her truth and her fate: unknown
  if (t >= 168.94) { const a = smB(t, 168.94, 0.5); c.save(); c.globalAlpha = a; smMiniLady(c, 800, 760, 0.55, t); c.restore(); }
  if (t >= 170.84) { const a = smB(t, 170.84, 0.4); c.save(); c.globalAlpha = a;  donkey(c, { x: 790 + 20 * Math.min(1, t - 170.84), y: 900, s: 0.3, dir: 1, silhouette: true, ph: t * 8, amp: t < 171.84 ? 1 : 0 }); smQ(c, 880, 850, 80, 1, C.red); c.restore(); }
}; }
function smMoralCloud(ctx, t, cam, P) {
  if (t < 158.22) return; const top = smTop(P), tp = smPan(top[0], top[1], cam), p = K.clamp((t - 158.22) / 0.7), at = [520, 745 + 35 * smB(t, 165.4, 0.8)];
  thoughtCloud(ctx, 520, 410, 700, 500, t, { p, tail: [tp[0] + 6, tp[1] - 26], scale: 0.85, at, bg: '#f4f1ea', inside: smMoralInside(t) });
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
    arr([940, 1060], P(T.x + 30, 850), 66.9, 69.6, { bend: 0.2 }); arr([880, 560], P(h[0] + 18, h[1] + 4), 67.4, 69.6, { bend: -0.2, width: 14 }); arr([140, 1000], P(548, 880), 68.3, 69.6, { bend: -0.2, width: 14 });
    const q1 = P(330, 410); word('NO!', q1[0] + 150, q1[1] - 150, 79.62, 81.3, 90, { rot: -0.08, fill: C.red });
    const q2 = P(340, 400); word('MANY!', q2[0] + 160, q2[1] - 150, 92.0, 93.7, 76, { rot: 0.06 });
    const sh = smHead(st.S), sp = P(sh[0], sh[1]); word('WHAT?!', K.clamp(sp[0] + 40, 200, 800), sp[1] - 300, 99.95, 101.05, 110, { rot: -0.08 });
    word('HOW?', 500, 200, 103.51, 104.9, 96, { rot: 0.05, fill: C.white });
  }
  if (seg === 'fb' && st) {
    if (st.sg && smIn(t, 112.82, 114.6)) { const a = P(smHead(st.sg)[0] + 40, smHead(st.sg)[1] - 70), b = P(1500, 610); arr(a, b, 112.82, 114.6, { bend: -0.25 }); }
    if (smIn(t, 116.84, 119.2)) { const n = smNamePos(t), q = P(n[0], n[1]); word('UMM AMR', q[0], q[1], 116.84, 119.2, 70, { fill: C.red, rot: -0.05 }); }
    if (smIn(t, 128.3, 131.2)) { lab('2 DAYS LATER', 500, 190, 128.3, 131.2, { size: 54 }); const n = t < 128.8 ? 0 : t < 129.5 ? 1 : 2; if (n) { ctx.save(); ctx.globalAlpha = smFade(t, 128.8, 131.2, 0.2); S.counter(ctx, n, 860, 330, smB(t, n === 1 ? 128.8 : 129.5, 0.25), { size: 80 }); ctx.restore(); } }
    if (st.T && smIn(t, 141.9, 142.35)) { const h = smHead(st.T), q = P(h[0] - 120, h[1] - 40); word('SOB!', q[0], q[1], 141.9, 142.35, 90, { rot: -0.1, fill: '#9ec3ff' }); }
    smSpeed(ctx, pulse(t, 142.3, 0.36) * 1.2, 7);
  }
  if (seg === 'pres' && st && st.P) { smMoralCloud(ctx, t, cam, st.P); if (t >= 172.5) S.title(ctx, 'THE END', 500, 720, smB(t, 172.5, 0.8), { size: 88, align: 'center' }); }
}
function smDrawSeg(ctx, seg, t, S) {
  const cam = smCam(seg, t); let st = null;
  ctx.save(); K.camera(ctx, 1000, 1230, cam);
  if (seg === 'st1') { smS1(ctx, t); smSignPop(ctx, t); }
  else if (seg === 'school') st = smSchool(ctx, t, cam);
  else if (seg === 'st2') st = smS5(ctx, t);
  else if (seg === 'room') st = smRoom(ctx, t, cam);
  else if (seg === 'fb') st = smFb(ctx, t, cam);
  else if (seg === 'ins') smInsertBack(ctx, t);
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
    smDreamWash(ctx, 0.35 * smFade(t, 107.66, 150.2, 0.5));
    if (t >= 43.16 && t < 44.7) S.transition(ctx, 1000, 1230, (t - 43.16) / 1.54, { caption: 'LATER...' });
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
