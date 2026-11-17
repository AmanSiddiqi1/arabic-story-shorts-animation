// ===== AN-149 school room (S2-S4, 4.88-43.93): the kuttab dressing of palaceHall 'merchant', the drill, the test, the visits, the assumption =====
const SM_SCH = { mats: [190, 310, 430], matY: 925, guest: 560, seat: 780, stand: 875, door: [60, 200] };
const smTalk = (t, list, amp = 0.8, hz = 9.3) => { for (const [a, b] of list) if (t >= a && t < b) return amp * (0.35 + 0.65 * Math.abs(Math.sin((t - a) * hz))) * Math.min(1, (t - a) / 0.08, (b - t) / 0.08); return 0; };
function smSchoolU(t) { return t >= 25.0 && t < 26.4 ? 0.28 + 3 * smB(t, 25.0, 1.4, 'inOut') : 0.28; }
function smSchoolDressing(ctx, t) {
  townBake(ctx, 'sm-school-dress', 0, 380, 1000, 600, (c) => {
    seg(c, 760, 480, 950, 480, 10, BARKY, 3.5); for (const bx of [780, 930]) seg(c, bx, 486, bx - 10, 510, 6, BARKY, 2.5);
    [0, 1, 2, 3, 4].forEach((i) => smTablet(c, 790 + i * 36, 440, 0.62, { rot: -0.12 + i * 0.05, n: 3, seed: 11 + i }));
    shape(c, ell(712, 896, 14, 8, 12), C.black, { lw: 3, seed: 931 }); shape(c, [[700, 896], [702, 872], [722, 872], [724, 896]], NAVY, { lw: 3.5, seed: 932 }); seg(c, 716, 872, 730, 846, 3, C.white, 1.5);
  });
  smStand(ctx, SM_SCH.stand, 900, 0.9);
  for (const x of SM_SCH.mats) smMat(ctx, x, SM_SCH.matY + 6, 150);
}
// ---------- the teacher (green, proud) ----------
function smSchTeacher(t, sc) {
  const P = { x: SM_SCH.seat, y: 900, s: 1.15, costume: 'merchant', pal: SM_GREEN, age: 0.2, sit: 1, seat: 'floor', dir: -1, seed: 21, tip: -0.03, mouth: 'smile' };
  const kids = SM_SCH.mats.map((x) => [x, 810]), scH = sc ? smHead(sc) : [560, 740];
  if (t < 9.72) {   // the drill: points at the lesson board, beats time, sweeps the pupils
    P.hL = { w: [SM_SCH.stand - 6, 720 + 6 * Math.sin(t * 4)] }; P.hR = [70 + 8 * Math.sin(t * 2 * Math.PI * 1.6), -150 + 14 * Math.abs(Math.sin(t * Math.PI * 1.6))];
    P.talk = smTalk(t, [[4.88, 9.6]], 0.7, 7); P.brow = 0.2; P.mouth = 'closed';
    P.gaze = smGaze(t, P, [[4.88, kids[2]], [5.6, kids[1]], [6.4, kids[0]], [7.2, kids[1]], [7.9, kids[2]], [8.6, kids[1]], [9.3, [150, 720]]], 0.25);
  } else if (t < 22.62) {
    const inv = smB(t, 9.72, 0.25);
    P.gaze = t < 12.4 ? smLookAt(P, sc ? smHead(sc) : [150, 720]) : smLookAt(P, scH);
    P.brow = -0.4 * pulse(t, 9.72, 1.4); P.tip = -0.03 + 0.1 * pulse(t, 10.0, 0.7);
    P.hR = smTr(t, [[9.72, SM_H.wave, 0.2], [9.72, [64, -196], 0.2], [10.6, SM_H.fwd, 0.3], [11.9, SM_H.rest, 0.4], [16.9, [80, -186], 0.2], [17.0, [92, -192], 0.12], [17.25, [70, -170], 0.12], [17.4, [96, -196], 0.12], [17.65, [70, -170], 0.12], [17.8, [100, -186], 0.12], [18.2, SM_H.rest, 0.5]]);
    if (smIn(t, 10.0, 10.6)) P.hR = [64 + 18 * Math.sin((t - 10.0) * 20), -190];
    P.hL = smHT(t, P, [[9.72, { w: [SM_SCH.stand - 6, 720] }], [9.75, SM_H.restL, 0.4], [19.0, SM_H.chinL, 0.5], [21.6, SM_H.restL, 0.5]]);
    P.talk = smTalk(t, [[16.9, 18.1]], 0.75, 11) + smTalk(t, [[10.0, 10.9]], 0.5);
    P.tip = (P.tip || 0) - 0.04 * smB(t, 16.9, 0.3) * (1 - smB(t, 19.5, 0.6));
    P.y += smNods(t, [19.3, 20.4], 0.35, 3);
    if (inv > 0 && t < 9.95) { P.hR = SM_H.wave; }
  } else if (t < 32.6) {   // S3: the visits
    P.gaze = smLookAt(P, scH); const vis = t < 26.4 ? Math.floor(K.clamp((t - 25.0) / 0.467, 0, 2.99)) : -1;
    P.hR = vis === 0 ? SM_H.chin : vis === 1 ? SM_H.palmR : vis === 2 ? SM_H.up : smTr(t, [[22.62, SM_H.rest], [28.9, [44, -205], 0.25], [29.1, [44, -216], 0.12], [29.3, [44, -200], 0.12], [29.5, [48, -216], 0.12], [29.7, [44, -200], 0.12], [29.9, [50, -216], 0.12], [30.3, SM_H.palmR, 0.4], [31.0, SM_H.rest, 0.6]]);
    P.talk = smTalk(t, [[28.9, 30.3]], 0.75, 10); P.sq = breathe(t, 3, 0.02);
    P.x += 3 * Math.sin(t * 1.9);
  } else {   // S4: busy with a pupil's tablet (soft, at the right edge)
    P.hR = [70, -128]; P.hL = [-20, -128]; P.gaze = [0.3, 0.8]; P.lid = 0.3; P.mouth = 'closed';
    if (t > 42.7) { P.gaze = smLookAt(P, scH); P.lid = null; P.mouth = 'smile'; }
  }
  return P;
}
// ---------- the scholar (visitor) ----------
function smSchScholar(t) {
  const P = { y: 900, s: 1.15, costume: 'physician', age: 0.6, seed: 31, dir: 1, brow: -0.4, mouth: 'smile' }, T = [SM_SCH.seat, 736];
  if (t < 10.88) {   // at the doorway, half hidden by the frame (drawn behind the wall)
    P.behind = true; P.x = K.lerp(-60, 150, smB(t, 4.95, 0.55)); P.tip = 0.08 * smB(t, 5.54, 0.4); const w = smWalk((tt) => K.lerp(-60, 150, smB(tt, 4.95, 0.55)), t); P.ph = w.ph; P.amp = w.amp;
    P.gaze = smLookAt(P, T); P.hL = { w: [205, 760] };
    if (t > 10.0) { P.mouth = 'smile'; P.brow = -0.6; P.y += smNods(t, [10.1], 0.4, 5); }
    return P;
  }
  if (t < 22.62) {
    const xf = smX([[10.88, 150], [11.9, SM_SCH.guest]]), w = smWalk(xf, t); P.x = w.x; P.ph = w.ph; P.amp = w.amp * (t < 11.9 ? 1 : 0);
    P.y = t < 11.9 ? 885 : K.lerp(885, 900, smB(t, 11.9, 0.4)); P.sit = smB(t, 11.9, 0.5); P.seat = 'floor'; P.sq = landSquash(t, 12.4, 0.06);
    P.gaze = t < 11.3 ? smLookAt(P, [300, 840]) : smLookAt(P, T); P.y += t < 11.9 ? smNods(t, [11.1], 0.35, 4) : 0;
    P.hR = smTr(t, [[10.88, SM_H.rest], [15.02, SM_H.up, 0.2], [17.0, SM_H.rest, 0.4], [17.82, SM_H.chin, 0.4]]);
    P.hL = smTr(t, [[10.88, SM_H.restL], [12.8, SM_H.palmL, 0.4], [14.9, SM_H.restL, 0.4]]);
    P.talk = smTalk(t, [[12.8, 14.6], [15.02, 16.9]], 0.6);
    P.tip = 0.04 * smB(t, 15.64, 0.3) * (1 - smB(t, 17.0, 0.3)) + settleTo(t, 17.82, 0, -0.05, 0.5, 0.25);
    if (t >= 16.58) P.mouth = 'smile';
    if (t >= 17.82) { P.brow = -0.75; P.lid = Math.max(0.2, blink(t, 31)); P.sq = settleTo(t, 17.82, 1, 1.03, 0.35, 0.2) - 0.03 * smB(t, 18.4, 0.5); P.y += smNods(t, [18.4, 19.2, 20.1], 0.45, 4);
      if (smIn(t, 17.82, 22.62)) P.hR = [16 + 4 * Math.sin(t * 6), -160 + 8 * Math.sin(t * 3)]; }
    return P;
  }
  if (t < 32.6) {   // S3: back again, and again
    const xf = smX([[22.62, 130], [23.2, 130], [24.4, SM_SCH.guest]]), w = smWalk(xf, t), vis = t < 26.4 ? Math.floor(K.clamp((t - 25.0) / 0.467, 0, 2.99)) : -1;
    P.x = w.x; P.ph = w.ph; P.amp = w.amp; P.y = t < 24.4 ? 885 : K.lerp(885, 900, smB(t, 24.4, 0.4)); P.sit = smB(t, 24.4, 0.5); P.seat = 'floor';
    P.sq = landSquash(t, 24.9, 0.06) * (t >= 25.0 && t < 26.6 ? 1 - 0.08 * Math.max(pulse(t, 25.46, 0.2), pulse(t, 25.93, 0.2), pulse(t, 26.4, 0.2)) : 1);
    P.hL = t < 24.4 ? (smIn(t, 22.85, 23.6) ? [-64 - 16 * Math.sin((t - 22.85) * 18), -196] : SM_H.restL) : SM_H.restL;
    P.gaze = t < 23.6 ? smLookAt(P, [300, 820]) : smLookAt(P, T);
    P.hR = vis === 0 ? SM_H.palmR : vis === 1 ? SM_H.chin : vis === 2 ? SM_H.up : smTr(t, [[22.62, SM_H.rest], [27.58, SM_H.palmR, 0.35], [28.9, SM_H.rest, 0.4], [31.82, SM_H.rest], [31.85, [44, -212], 0.35]]);
    P.talk = smTalk(t, [[27.58, 28.9]], 0.55) + (vis >= 0 ? 0.4 * Math.abs(Math.sin(t * 12)) : 0);
    P.brow = t < 30.35 ? -0.4 : t < 31.02 ? -0.6 : -0.9; P.mouth = t >= 31.02 && t < 31.82 ? 'o' : 'smile';
    if (t >= 30.35) P.gaze = smLookAt(P, [790, 400]);
    P.tip = settleTo(t, 31.82, 0, -0.06, 0.45, 0.2);
    return P;
  }
  // S4: the private thought
  P.x = SM_SCH.guest; P.sit = 1; P.seat = 'floor'; P.lid = 0.25; P.mouth = 'smile';
  P.hR = [16 + 5 * Math.sin(t * 5), -158 + 6 * Math.sin(t * 2.5)];
  P.gaze = smGaze(t, P, [[32.6, T], [33.3, [420, 500]], [34.2, [300, 520]], [34.9, [380, 420]], [35.5, [430, 430]], [37.3, [470, 440]], [41.0, [360, 420]], [42.4, [500, 420]], [42.7, T]], 0.08);
  if (t >= 42.7) { P.lid = null; P.brow = -0.5; P.hR = smTr(t, [[42.7, P.hR], [42.75, [50, -104], 0.25]]); P.hL = smTr(t, [[42.7, SM_H.restL], [42.75, [-50, -104], 0.25]]); P.y -= 3 * pulse(t, 42.9, 0.4); }
  return P;
}
// ---------- the three pupils ----------
const SM_KIDS = [{ costume: 'servant', s: 1.25, seed: 41 }, { costume: 'maiden', s: 1.2, seed: 42 }, { costume: 'villager', pal: { robe: C.blue, dot: '#0d2f80', sleeve: C.blue }, s: 1.08, seed: 43 }];
function smSchKid(t, i, sc, T) {
  const K0 = SM_KIDS[i], d = stagger(i, 0.12) + (i === 2 ? 0.1 : 0), P = { ...K0, x: SM_SCH.mats[i], y: SM_SCH.matY, child: true, sit: 1, seat: 'floor', dir: 1, mouth: 'smile' };
  const tH = T ? smHead(T) : [780, 736], sH = sc ? smHead(sc) : [560, 740];
  let up = 0;
  if (t < 9.72) { const tt = t - d; P.talk = 0.4 + 0.5 * Math.abs(Math.sin(tt * Math.PI * 1.6)); up = Math.abs(Math.sin(tt * Math.PI * 1.6)); P.gaze = smLookAt(P, [SM_SCH.stand, 700]);
    if (i === 2 && smIn(t, 5.9, 7.6)) { P.gaze = smLookAt(P, [140, 720]); P.talk *= 0.3; } }
  else if (t < 12.77) P.gaze = smLookAt(P, t > 10.88 + d && sc && !sc.behind ? sH : t < 10.88 ? tH : [140, 720]);
  else if (t < 19.0) P.gaze = smLookAt(P, smIn(t, 14.9 + d, 16.9 + d) ? sH : tH);
  else if (t < 22.62) { const k = Math.floor((t - 19.0 - d) / 0.42); P.gaze = smLookAt(P, k % 2 ? sH : tH); if (i === 2 && smIn(t, 20.62, 21.0)) { P.hR = [10, -128]; P.hL = [-10, -128]; P.mouth = 'open'; } }
  else if (t < 32.6) { const vis = t < 26.4 && t >= 25.0 ? Math.floor((t - 25.0) / 0.467) : -1; P.gaze = smLookAt(P, t < 24.4 ? sH : (t > 28.9 && t < 30.3 ? tH : sH));
    if (smIn(t, 23.0 + d * 1.6, 23.8 + d * 1.6)) P.hR = [64 + 14 * Math.sin((t - 23) * 18), -196];
    if (vis >= 0) { up = (vis + i) % 2; P.mouth = (vis + i) % 3 === 0 ? 'open' : 'smile'; } }
  else { P.gaze = [0.2, 0.9]; P.lid = 0.35; up = 0; }
  if (!P.hR) { P.hR = [24, -92 - 22 * up]; P.hL = [-24, -92 - 22 * up]; P.tab = true; }
  return P;
}
function smSchoolActors(ctx, t) {
  const sc = smSchScholar(t), T = smSchTeacher(t, sc.behind ? null : sc), kids = [0, 1, 2].map((i) => smSchKid(t, i, sc, T));
  return { sc, T, kids };
}
// ---------- tokens of the test (S2) and medallions (S3) ----------
const SM_TOK = [{ at: 15.02, to: [690, 540], flip: 17.0 }, { at: 15.64, to: [790, 500], flip: 17.4 }, { at: 16.58, to: [890, 540], flip: 17.8 }];
function smToken(ctx, kind, x, y) { shape(ctx, ell(x, y, 42, 42, 28), C.white, { lw: 5, seed: 941 });
  if (kind === 0) smTablet(ctx, x, y + 4, 0.55, { n: 3, seed: 2 });
  else if (kind === 1) { ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(x, y - 22); ctx.lineTo(x - 20, y + 4); ctx.moveTo(x, y - 22); ctx.lineTo(x + 20, y + 4); ctx.moveTo(x - 20, y + 4); ctx.lineTo(x - 28, y + 24); ctx.moveTo(x - 20, y + 4); ctx.lineTo(x - 8, y + 24); ctx.stroke(); ctx.restore(); for (const [a, b] of [[0, -22], [-20, 4], [20, 4], [-28, 24], [-8, 24]]) shape(ctx, ell(x + a, y + b, 6, 6, 10), C.red, { lw: 2.5, seed: 942 }); }
  else { ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = C.blue; ctx.lineCap = 'round'; for (let k = 0; k < 3; k++) { ctx.beginPath(); for (let j = 0; j <= 10; j++) ctx.lineTo(x - 26 + j * 5.2, y - 16 + k * 15 + Math.sin(j * 1.3 + k) * 3); ctx.stroke(); } ctx.restore(); } }
function smTokens(ctx, t, sc) {
  if (!smIn(t, 15.0, 22.62)) return; const hand = sc.HR || smHead(sc);
  SM_TOK.forEach((k, i) => { if (t < k.at) return; const u = smB(t, k.at, 0.55, 'out'), x = K.lerp(hand[0], k.to[0], u), y = K.lerp(hand[1] - 30, k.to[1], u) - 120 * Math.sin(Math.PI * u);
    const f = t < k.flip ? 1 : Math.abs(Math.cos(Math.PI * K.clamp((t - k.flip) / 0.3))), done = t >= k.flip + 0.15;
    ctx.save(); ctx.translate(x, y + Math.sin(t * 3 + i) * 4); ctx.scale(f * K.ease.back(K.clamp((t - k.at) / 0.25)), 1);
    if (!done) smToken(ctx, i, 0, 0); else { shape(ctx, ell(0, 0, 42, 42, 28), C.white, { lw: 5, seed: 943 }); smTick(ctx, 0, 0, 30, K.clamp((t - k.flip - 0.15) / 0.2), C.red); } ctx.restore();
    if (t >= 20.62) { const q = pulse(t, 20.62 + i * 0.08, 0.5); if (q > 0) star(ctx, k.to[0] + 34, k.to[1] - 34, 18 * q, C.yellow); } });
}
function smMedallions(ctx, t) { if (!smIn(t, 30.3, 32.6)) return; [[30.35, 700, 420, 'stars'], [31.02, 790, 370, 'abacus'], [31.82, 880, 420, 'book']].forEach(([a, x, y, k]) => { if (t >= a) smMedallion(ctx, x, y + 3 * Math.sin(t * 2.4 + x), 46, k, (t - a) / 0.35, t); }); }
// ---------- the assumption cloud (S4) ----------
function smAssumeCloud(ctx, t, sc) {
  if (!smIn(t, 35.27, 43.3)) return; const top = smTop(sc), p = Math.min(K.clamp((t - 35.27) / 0.7), K.clamp((43.25 - t) / 0.35));
  thoughtCloud(ctx, 445, 450, 400, 290, t, { p, tail: [top[0] - 10, top[1] - 10], scale: 0.6, at: [500, 760], bg: '#eeeae0', inside: (c) => {
    const g = smB(t, 37.24, 0.4), gp = { robe: SM_GREY, dot: SM_GREYD, sleeve: SM_GREY, hc: '#d6d2e0', hd: SM_GREYD, sash: SM_GREYD, band: SM_GREYD, pants: '#c9c6d2' };
    if (g > 0) { c.save(); c.globalAlpha = g; for (const [x, s] of [[360, 1], [640, 0.95]]) smPerson(c, { x, y: 900, s, child: true, costume: 'servant', pal: gp, mouth: 'open', noBlink: true, gaze: [x < 500 ? 1 : -1, -0.3], hR: [24, -150], hL: [-24, -150] });
      smPerson(c, { x: 500, y: 900 + 30 * (1 - g), s: 1, costume: 'villager', pal: gp, age: 0.5, noBlink: true, mouth: 'closed', gaze: [0, 0.2], hR: SM_H.palmR, hL: SM_H.palmL }); c.restore(); }
    if (t >= 40.98) { const k = K.ease.back(K.clamp((t - 40.98) / 0.35)); c.save(); c.translate(270, 660); c.scale(k * 1.6, k * 1.6); smBook(c, 0, 0, 1, { col: C.red, open: 1 }); c.restore(); smTick(c, 300, 560, 50, (t - 41.3) / 0.3); }
    if (t >= 42.0 || (t >= 41.6)) { const k = K.ease.back(K.clamp((t - 41.6) / 0.35)), lit = t < 42.4 ? 1 : t < 42.7 ? 0.6 * (1 - (t - 42.4) / 0.3) * (0.5 + 0.5 * Math.sin(t * 60)) : 0;
      c.save(); c.translate(730, 650); c.scale(k * 1.5, k * 1.5); smLampIcon(c, 0, 0, 1, lit, t, t >= 42.6 ? (t - 42.6) / 0.7 : 0); c.restore(); smCross(c, 760, 610, 70, (t - 42.75) / 0.3); }
  } });
}
// ---------- draw the school ----------
function smSchool(ctx, t, cam) {
  const st = smSchoolActors(ctx, t), sc = st.sc;
  const room = palaceHall(ctx, { variant: 'merchant', wall: 'paper', desk: false, shelves: [], treasure: false, u: smSchoolU(t), t, doorOpen: 0.85,
    behind: (c) => { if (sc.behind) smPerson(c, sc); } });
  smSchoolDressing(ctx, t);
  smCushion(ctx, SM_SCH.guest, 906, 130, C.blue, C.white); smCushion(ctx, SM_SCH.seat, 906, 140, C.red, C.yellow);
  if (t >= 6.42 && t < 7.6) { const h = smHead(st.T), q = pulse(t, 6.42, 0.6), q2 = pulse(t, 6.8, 0.6); star(ctx, h[0] + 2, h[1] - 52, 16 * q, C.white); star(ctx, h[0] + 10, h[1] + 120, 14 * q2, C.white); }
  smPerson(ctx, st.T);
  if (t >= 32.6) { const h = st.T.HR, hl = st.T.HL; smTablet(ctx, (h[0] + hl[0]) / 2, (h[1] + hl[1]) / 2 - 20, 0.8, { rot: 0.3, n: 3, seed: 5 }); }
  if (!sc.behind) smPerson(ctx, sc);
  st.kids.forEach((P, i) => { smPerson(ctx, P); if (P.tab) { const a = P.HR, b = P.HL; smTablet(ctx, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + 10, 0.52, { rot: -0.1 + i * 0.1, n: 2 + i, seed: 20 + i }); } });
  if (smIn(t, 4.88, 9.72)) for (let k = 0; k < 3; k++) { const h = smHead(st.kids[k]); if (pulse(t, 5 + k * 0.12, 0.6) || true) { const q = Math.abs(Math.sin((t - k * 0.12) * Math.PI * 1.6)); if (q > 0.6) seg(ctx, h[0] + 30, h[1] - 40, h[0] + 46, h[1] - 58, 3, C.black, 0); } }
  smTokens(ctx, t, sc); smMedallions(ctx, t); smAssumeCloud(ctx, t, sc);
  return st;
}
const SM_SCHOOL_CAM = [[4.88, 480, 700, 1.2], [12.77, 480, 700, 1.2], [13.7, 670, 700, 1.5], [22.61, 670, 700, 1.5], [22.62, 560, 700, 1.1], [32.6, 590, 700, 1.1], [33.5, 500, 650, 1.7], [43.93, 500, 650, 1.7]];
