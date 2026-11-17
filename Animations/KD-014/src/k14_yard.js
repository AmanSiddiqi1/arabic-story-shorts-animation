// ===== KD-014 S4-S6 (27.30-65.50): the yard. A family; YEARS LATER; the marriage question; the sun. =====
// Cottage moved left so the door (660..740) sits at the plan's x 700; doorpost marks at x 645; bench at x 470 (anchor sitY 900).
const K14Y_COT = { x0: 600, x1: 900, top: 560, door: [660, 740, 760], win: [790, 870, 624, 716], chimney: [820, 855, 420] };
const K14Y_POST = 645, K14Y_MARK0 = 748, K14Y_STEP = 6.6, K14Y_SUN = [800, 170];
const K14Y_MARKT = [32.5, 34.2, 34.5, 35.0, 35.0, 35.0, 35.0, 35.0, 35.0, 35.0, 35.0, 35.0];
// walkers
const K14Y_FX = (t) => t < 35.9 ? kfn(t, [[27.3, -80], [29.6, 470], [32.3, 470], [32.84, 545]]) : kfn(t, [[37.9, 180], [39.7, 440], [63.6, 440], [65.5, 1010]], 'inOut');
const K14Y_CX = (t) => kfn(t, [[27.3, -20], [29.6, 540], [29.75, 540], [30.1, 495]]);
const K14Y_MX = (t) => kfn(t, [[39.55, 615], [40.0, 528], [45.5, 528], [46.3, 588], [63.6, 588], [65.5, 1120]]);   // v2: steps half a body width away from her father at 45.5
function k14yFather(t) {
  const early = t < 35.9, x = K14Y_FX(t), P = { ...walk(K14Y_FX, t, { stride: 20 }), y: K14Y_GR(), s: 0.95, dir: 1, costume: 'ascetic', age: early ? 0.75 : 1, mouth: 'smile', seed: 11 };
  P.lid = blink(t, 11); const head = [x, 660];
  if (early) {
    P.handRW = t < 30.4 ? [(x + K14Y_CX(t)) / 2 + 4, 815] : null; P.gaze = t < 29.6 ? [0.6, 0.3] : lookAt(head, [720, 690]);
    if (t >= 29.7 && t < 30.4) P.gaze = lookAt(head, [K14Y_CX(t), 760]);
    if (t >= 31.0 && t < 32.0) { P.handR = PERSON_HANDS.chest.R; P.lid = Math.max(pulse(t, 31.2, 0.6), blink(t, 11)); }
    if (t >= 32.0) P.gaze = lookAt(head, [630, 760]);
    if (t >= 32.84) { P.handRW = [575, 812]; P.gaze = t < 33.4 ? lookAt(head, [700, 670]) : lookAt(head, [610, 770]); }
    return P;
  }
  P.hold = 'stick'; P.amp *= 0.7;
  if (t >= 39.7) { P.sit = settleTo(t, 39.7, 0, 1, 0.4, 0.06) * (1 - blend(t, 62.9, 63.4, 0, 1)); P.seat = 'bench'; P.hold = t < 39.9 || t > 63.3 ? 'stick' : null; }
  const mh = [K14Y_MX(t), 690];
  P.gaze = lookAt(head, mh);
  if (t >= 40.2 && t < 41.2) { P.talk = 0.4 + 0.3 * Math.abs(Math.sin(t * 9)); P.handR = PERSON_HANDS.pointUp.R; P.brow = -0.4; }
  if (t >= 42.2 && t < 43.8) P.gaze = lookAt(head, [480, 420]);
  if (t >= 47.56 && t < 50.0) P.tip = 0.06;
  if (t >= 50.0 && t < 51.3) { P.tip = -0.1 * settleTo(t, 50.0, 0, 1, 0.3); P.brow = -1; P.mouth = 'o'; }
  if (t >= 51.3 && t < 54.18) { P.handR = PERSON_HANDS.chin.R; P.lid = Math.max(0.4, blink(t, 11)); P.mouth = 'closed';
    if (t >= 53.02) { P.gaze = lookAt(head, gazePlan(t, [[53.02, [100, 350]], [53.3, [750, 450]], [53.6, K14Y_SUN]], 0.07)); if (t >= 53.7) P.lid = 0.55; } }
  if (t >= 54.18 && t < 60.7) { const k = settleTo(t, 54.18, 0, 1, 0.3, 0.15); P.aR = [K.lerp(0.4, 2.95, k), K.lerp(0.5, 3.1, k)]; P.handR = null; P.mouth = 'open'; P.brow = -0.8; P.gaze = lookAt(head, K14Y_SUN); if (t > 55.0) { P.mouth = 'smile'; P.talk = 0; } if (t > 59.2) P.aR = [K.lerp(2.95, 0.3, blend(t, 59.2, 59.7, 0, 1)), K.lerp(3.1, 0.3, blend(t, 59.2, 59.7, 0, 1))]; }
  if (t >= 60.7 && t < 61.8) { P.handL = PERSON_HANDS.palmsUp.L; P.handR = PERSON_HANDS.palmsUp.R; P.tilt = 0.08; P.talk = 0.3 + 0.3 * Math.abs(Math.sin(t * 8)); }
  if (t >= 61.8) P.gaze = lookAt(head, mh);
  if (t >= 63.6) { P.gaze = [1, 0]; P.y = 900 + 12 * blend(t, 63.6, 64.0, 0, 1); }   // v2: passes in front of the mother (nearer the camera)
  return P;
}
function K14Y_GR() { return 900; }
function k14yChild(t) {
  const x = K14Y_CX(t), P = { ...walk(K14Y_CX, t, { stride: 11 }), y: 900, s: 0.95, dir: 1, costume: 'maiden', child: true, mouth: 'smile', seed: 31 };
  P.lid = blink(t, 31); const head = [x, 760];
  P.handLW = t < 30.4 ? [(K14Y_FX(t) + x) / 2 + 4, 815] : null;
  P.gaze = lookAt(head, gazePlan(t, [[27.3, [300, 400]], [27.9, [700, 600]], [28.4, [100, 300]], [28.9, [800, 420]], [29.3, [720, 700]]], 0.07));
  if (t >= 29.7 && t < 30.6) { P.gaze = lookAt(head, [720, 680]); P.mouth = 'o'; P.tilt = 0.1; }
  if (t >= 30.6) {   // hop into the hug
    const [hx, hy] = hop(t, 30.9, 0.5, 495, 668, 40); P.x = hx; P.y = 900 - hy; P.sq = anticipate(t, 30.6, 0.3, 0.12) * landSquash(t, 31.4); P.ph = 0; P.amp = 0;
    P.handL = PERSON_HANDS.armsOut.L; P.handR = PERSON_HANDS.armsOut.R; P.gaze = lookAt(head, [720, 700]); P.dir = 1;
    if (t >= 31.4) { P.handL = [40, -150]; P.handR = [60, -140]; P.lid = 0.6; }
  }
  if (t >= 32.06) { const k = blend(t, 32.06, 32.4, 0, 1); P.x = K.lerp(668, 622, k); P.y = 900; P.dir = -1; P.sq = 1 + 0.06 * blend(t, 32.3, 32.5, 0, 1) * (1 - blend(t, 32.7, 32.84, 0, 1)); P.handL = P.handR = null; P.gaze = [0, -1]; P.lid = 0; P.mouth = 'smile'; }
  if (t >= 32.84) { P.x = 612; P.dir = 1; P.handLW = [575, 812]; P.handRW = [652, 812]; P.y = 900 - 26 * (pulse(t, 33.0, 0.4) + pulse(t, 33.5, 0.4)); P.gaze = lookAt(head, t < 33.4 ? [545, 660] : [690, 670]); P.mouth = 'open'; }
  return P;
}
function k14yWife(t, early) {
  const P = { x: 720, y: 900, s: 0.95, dir: -1, costume: 'villageWoman', pal: { hc: C.white, hd: C.blue }, age: early ? 0.25 : 0.55, mouth: 'smile', seed: 41 };
  P.lid = blink(t, 41); const head = [720, 680];
  if (early) {
    P.x = K.lerp(700, 724, blend(t, 28.62, 29.3, 0, 1)); P.handL = [-20, -86]; P.handR = [24, -90]; P.gaze = lookAt(head, [K14Y_FX(t), 670]);
    if (t >= 29.3) P.gaze = lookAt(head, [K14Y_CX(t), 770]);
    if (t >= 29.64) { const k = settleTo(t, 29.64, 0, 1, 0.3); P.handL = PERSON_HANDS.cheeks.L; P.handR = PERSON_HANDS.cheeks.R; P.eyes = k > 0.5 ? 'wide' : 'open'; P.sq = 1 + 0.04 * pulse(t, 29.64, 0.4); P.mouth = 'o'; if (t > 30.0) { P.eyes = 'open'; P.wet = true; P.mouth = 'smile'; } }
    if (t >= 30.44) { P.kneel = blend(t, 30.44, 30.8, 0, 1) * (1 - blend(t, 32.06, 32.4, 0, 1)); P.handL = PERSON_HANDS.armsOut.L; P.handR = PERSON_HANDS.armsOut.R; P.gaze = lookAt([720, 760], [K14Y_CX(t), 790]);
      if (t >= 31.4) { P.handLW = [650, 790]; P.handRW = [690, 780]; P.handL = P.handR = null; P.tip = -0.09 * Math.exp(-(t - 31.4) * 4) * Math.cos((t - 31.4) * 9); P.lid = 0.7; } }
    if (t >= 32.06) { P.handLW = null; P.handRW = [K14Y_POST + 2, K14Y_MARK0 - 4]; P.handL = null; P.gaze = lookAt(head, [K14Y_POST, K14Y_MARK0]); P.lid = 0; P.wet = false; if (t > 32.5) P.handRW = [K14Y_POST + 4, K14Y_MARK0 + 30]; }
    if (t >= 32.84) { P.x = 690; P.handRW = null; P.handL = [-40, -98]; P.gaze = t < 33.4 ? lookAt(head, [545, 660]) : lookAt(head, [612, 770]); if (t > 34.1) { P.handRW = [K14Y_POST + 4, K14Y_MARK0 - 12 - 8 * Math.sin(t * 6)]; P.handL = null; } }
    return P;
  }
  return P;
}
function k14yMaiden(t) {
  const x = K14Y_MX(t), P = { ...walk(K14Y_MX, t, { stride: 18 }), y: 900, s: 0.95, dir: -1, costume: 'maiden', mouth: 'smile', seed: 51 };
  P.lid = blink(t, 51); const head = [x, 680], fh = [K14Y_FX(t), 700];
  if (t < 39.55) { P.handRW = [x + 6, 664]; P.gaze = [0, 0.05]; P.tilt = 0.06 * Math.sin(Math.PI * K.clamp((t - 37.72) / 0.3)) * (t > 37.72 && t < 38.0 ? 1 : 0); if (t > 38.6) P.gaze = lookAt(head, fh); }
  if (t >= 39.55 && t < 63.6) { P.dir = -1; P.gaze = lookAt(head, fh); }
  if (t >= 40.0 && t < 63.6) { P.sit = settleTo(t, 40.0, 0, 1, 0.35, 0.06) * (1 - settleTo(t, 45.5, 0, 1, 0.4, 0.1)); P.seat = 'bench'; P.sq = anticipate(t, 45.36, 0.25, 0.06) * (1 + 0.06 * pulse(t, 45.6, 0.4)); }
  if (t >= 40.3 && t < 45.36) { P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; P.tilt = -0.08; if (t >= 41.22) P.drop = 4 * pulse(t, 41.5, 0.35); if (t >= 42.2 && t < 43.84) P.gaze = lookAt(head, [480, 400]); if (t >= 44.2 && t < 45.2) { P.handR = PERSON_HANDS.mouthCover.R; P.gaze = lookAt(head, [830, 680]); } }
  if (t >= 46.76 && t < 48.86) { P.handL = PERSON_HANDS.hipsHands.L; P.handR = PERSON_HANDS.hipsHands.R; P.gaze = [-0.8, -0.3]; P.drop = -4; }
  if (t >= 47.56 && t < 48.86) { P.handR = PERSON_HANDS.pointUp.R; P.talk = 0.4 + 0.4 * Math.abs(Math.sin(t * 10)); P.gaze = lookAt(head, fh); }
  if (t >= 48.86 && t < 49.98) { const k = settleTo(t, 48.86, 0, 1, 0.3, 0.15); P.aR = [K.lerp(0.3, 1.6, k), K.lerp(0.3, 2.9, k)]; P.aL = [K.lerp(-0.3, -1.6, k), K.lerp(-0.3, -2.9, k)]; P.handL = P.handR = null; P.mouth = 'smile'; P.drop = -6; P.gaze = [0, 0.05]; P.sq = 1 + 0.04 * pulse(t, 48.9, 0.4); }   // v2: clear two-arm flex
  if (t >= 49.98 && t < 51.3) { P.handL = PERSON_HANDS.armsOut.L; P.handR = PERSON_HANDS.armsOut.R; P.tip = -0.05; P.mouth = 'open'; }
  if (t >= 51.3 && t < 54.6) { P.handL = PERSON_HANDS.folded.L; P.handR = PERSON_HANDS.folded.R; P.drop = 2 * Math.abs(Math.sin(t * 10.5)) * (t > 52.48 ? 1 : 0); }
  if (t >= 54.6 && t < 61.88) P.gaze = lookAt(head, t < 55.0 ? fh : K14Y_SUN);
  if (t >= 61.88 && t < 63.6) { P.handR = [30, -205]; P.gaze = lookAt(head, K14Y_SUN); P.lid = 0.3; P.drop = 5 * (pulse(t, 62.3, 0.25) + pulse(t, 62.6, 0.25)); }
  if (t >= 63.6) { P.dir = 1; P.gaze = [1, -0.2]; P.y = 900 + 12 * blend(t, 63.6, 64.0, 0, 1); }
  return P;
}
const K14_YARD = {
  a: 27.3, b: 65.5, bounds: [0, 1300, 0, 1230],
  cam: [[27.3, { x: 330, y: 720, zoom: 1.5 }], [28.4, { x: 400, y: 720, zoom: 1.5 }], [29.6, { x: 520, y: 740, zoom: 1.6 }], [30.4, { x: 610, y: 760, zoom: 2.0 }], [35.89, { x: 600, y: 760, zoom: 2.0 }],
    [35.9, { x: 640, y: 830, zoom: 2.3 }], [37.1, { x: 640, y: 830, zoom: 2.3 }], [38.1, { x: 630, y: 700, zoom: 2.3 }], [38.6, { x: 630, y: 700, zoom: 2.3 }], [39.6, { x: 500, y: 750, zoom: 1.85 }],
    [45.36, { x: 500, y: 750, zoom: 1.85 }], [46.8, { x: 510, y: 730, zoom: 2.0 }], [50.0, { x: 510, y: 730, zoom: 2.0 }], [51.3, { x: 470, y: 740, zoom: 2.2 }], [54.6, { x: 470, y: 740, zoom: 2.2 }],
    [56.4, { x: 680, y: 400, zoom: 1.2 }], [58.1, { x: 680, y: 400, zoom: 1.2 }], [59.2, { x: 500, y: 615, zoom: 1.0 }], [60.4, { x: 500, y: 615, zoom: 1.0 }], [60.9, { x: 500, y: 740, zoom: 1.7 }],
    [63.6, { x: 520, y: 740, zoom: 1.7 }], [64.76, { x: 800, y: 700, zoom: 1.5 }], [65.5, { x: 860, y: 560, zoom: 1.4 }]],
  draw(ctx, t) {
    const early = t < 35.9;
    villageYard(ctx, { w: 1300, sun: false, cottage: K14Y_COT, door: early ? blend(t, 28.62, 29.0, 0, 0.85) : blend(t, 62.6, 63.0, 0, 0.85), bench: early ? undefined : 470, forest: [0, 330], t,
      winInside: early ? undefined : (c) => { if (t < 43.6 || t > 51.6) return; const lean = blend(t, 43.6, 44.0, 0, 1) * (1 - blend(t, 51.0, 51.6, 0, 1));
        person(c, { x: 834, y: 920 - 40 * lean, s: 0.95, dir: -1, costume: 'villageWoman', pal: { hc: C.white, hd: C.blue }, age: 0.55, handR: t < 50.0 ? PERSON_HANDS.cupEar.R : PERSON_HANDS.cheeks.R, handL: t < 50.0 ? null : PERSON_HANDS.cheeks.L, gaze: [1, 0], mouth: t > 50 ? 'o' : 'closed', lid: blink(t, 41) }); } });
    if (!early) { for (const [cx, cy, r] of [[110, 230, 120], [230, 260, 90], [20, 300, 80]]) shape(ctx, ell(cx, cy, r, r * 0.9, 24), GREEN, { lw: 7, seed: 500 + cx, dot: GREEND, pitch: 10, rad: 0.25, da: 0.5 }); }
    // the sun (plain: it gets its face on the hill)
    ctx.save(); ctx.translate(K14Y_SUN[0], K14Y_SUN[1]); const sp = 1 + 0.06 * pulse(t, 56.54, 0.6); ctx.scale(sp, sp); sun(ctx, 0, 0, t); ctx.restore();
    // chalk marks on the doorpost
    heightMarks(ctx, K14Y_POST, K14Y_MARK0, 12, K14Y_STEP, t, early ? K14Y_MARKT.map((x, i) => (i < 3 ? x : 1e9)) : K14Y_MARKT.map(() => 0));
    if (early) {
      if (t >= 28.62) person(ctx, k14yWife(t, true));
      const C0 = k14yChild(t), F = k14yFather(t), behind = t >= 29.7 && t < 30.6;
      if (behind) { person(ctx, C0); person(ctx, F); } else { person(ctx, F); person(ctx, C0); }
      if (t >= 33.1 && t < 34.5) heart(ctx, 612, 630 - 20 * K14B(t, 33.1, 1.2), 26 * K.ease.back(K14B(t, 33.1, 0.35)));
    } else {
      // the cloth the mother drops (50.0)
      if (t >= 50.0 && t < 63.6) { const y = Math.min(895, fallY(t, 50.0, 50.7, 720, 895)); scarfCloth(ctx, 836, y, 0.7, 0, (t - 50) * 2 * (y < 895 ? 1 : 0), Math.sin(t * 12) * (y < 895 ? 1 : 0)); }
      if (t >= 62.6 && t < 65.5) person(ctx, { x: 700, y: 900 - 14 * blend(t, 63.3, 63.8, 0, 1), s: 0.95 - 0.08 * blend(t, 63.3, 63.8, 0, 1), dir: 1, costume: 'villageWoman', pal: { hc: C.white, hd: C.blue }, age: 0.55, handR: [64 + 10 * Math.sin(t * 12), -196], mouth: 'smile', gaze: [1, -0.1], lid: blink(t, 41) });
      person(ctx, k14yFather(t)); person(ctx, k14yMaiden(t));
      // thought dots and the glint
      if (t >= 51.3 && t < 53.0) for (let i = 0; i < 3; i++) { const k = K14B(t, 51.4 + i * 0.25, 0.25, 'back'); if (k > 0) shape(ctx, ell(470 + i * 22, 630 - i * 26, 7 + i * 3, 7 + i * 3, 12), C.white, { lw: 3.5, seed: 520 + i }); }
      if (t >= 53.7 && t < 54.6) { ctx.save(); ctx.globalAlpha = 0.55 * pulse(t, 53.7, 0.9); ctx.fillStyle = dotPat(ctx, C.yellow, 6, 0.4); ctx.beginPath(); ctx.arc(K.lerp(560, 450, K14B(t, 53.7, 0.3)), 660, 44, 0, 7); ctx.fill(); ctx.restore(); }
      // light wash (58.08-59.1) and the brighter world after it
      if (t >= 58.08 && t < 65.6) { const fr = K.lerp(-200, 1500, K.clamp((t - 58.08) / 1.0)); ctx.save(); ctx.fillStyle = 'rgba(255,226,120,0.13)'; ctx.fillRect(-10, -10, fr + 10, 1250); ctx.globalAlpha = 0.5 * (1 - K.clamp((t - 59.08) / 0.4)); ctx.fillStyle = dotPat(ctx, C.yellow, 12, 0.35); ctx.fillRect(fr - 160, -10, 160, 1250); ctx.restore(); }
      if (t >= 59.2 && t < 60.6) bird(ctx, { x: kfn(t, [[59.2, -80], [60.6, 1150]], 'lin'), y: 330 + 20 * Math.sin(t * 6), s: 0.6, kind: 'sparrow', fly: true, flap: Math.sin(t * 18), dir: 1 });
      // the groom thought cloud (42.2-50.6)
      const p = K14B(t, 42.2, 0.5) * (1 - K14B(t, 50.2, 0.3));
      if (p > 0) { const sw = t >= 48.86 ? settleTo(t, 48.86, 1, 1.9, 0.4, 0.12) : 1;
        thoughtCloud(ctx, 385, 540, 250, 180, t, { p, tail: [440, 640], bg: C.white, lw: 9, scale: 0.24, at: [500, 780], inside: (c) => {   // v2: whole cloud inside the panel, left of the roof
          const swl = Math.min(sw, 1.4); c.save(); c.filter = 'brightness(0)'; c.translate(500, 1070); c.scale(swl * (1 + 0.6 * (swl - 1)), swl); person(c, { x: 0, y: 0, s: 2.0, costume: 'villager', handL: sw > 1.3 ? null : null, aL: sw > 1.3 ? [-1.6, -2.9] : null, aR: sw > 1.3 ? [1.6, 2.9] : null }); c.restore();
          if (t < 48.86) sfx(c, '?', 500, 800, 200, K14B(t, 42.6, 0.4), { fill: C.white });
          if (t >= 43.84 && t < 48.86) for (const [rx, i] of [[250, 0], [330, 1]]) { const k = K14B(t, 43.84 + i * 0.2, 0.3, 'back'); c.save(); c.translate(rx - 30, 640); c.scale(k, k); c.lineWidth = 34; c.strokeStyle = C.black; c.beginPath(); c.arc(0, 0, 60, 0, 7); c.stroke(); c.lineWidth = 18; c.strokeStyle = C.yellow; c.stroke(); c.restore(); }
        } }); }
    }
  },
  over(ctx, t, cam, S) {
    k14Label(ctx, S, cam, 612, 560, 'OUR DAUGHTER', t, 33.0, 34.6);
    k14Label(ctx, S, cam, 760, 610, 'ALL GROWN UP', t, 37.72, 39.4);
    k14Sfx(ctx, cam, 560, 540, 'THE STRONGEST!', t, 48.9, 1.6, 74, { rot: -0.06 });
    if (t >= 50.66 && t < 51.6) k14Sfx(ctx, cam, 440, 600, '?', t, 50.66, 0.9, 110, { fill: C.white });
    k14Label(ctx, S, cam, 640, 380, 'THE SUN', t, 56.54, 58.4); k14Arrow(ctx, S, cam, [670, 340], [730, 230], t, 56.6, 58.4, { width: 18 });
  },
};
