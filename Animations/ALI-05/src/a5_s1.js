// ===== ALI-05 shots S1-S4 (0 - 35 s): the market: the new shop, the light band, I AM A NEW MERCHANT!, the three smiles, the
// thought of Ali Baba's house, the nephew and his crates, the gift, COME TO DINNER!, the real grin =====
const A5_DAY = 'morning';
// ---------- the merchant in the market (one pose function for S1-S4: continuity) ----------
const A5_MX1 = (u) => kfn(u, [[0, 1120], [1.5, 1120], [1.75, 1040], [2.5, 1040], [3.0, 1090], [6.3, 1090], [6.7, 1030], [7.6, 1030], [8.2, 1080], [17.7, 1080], [18.0, 1272], [18.9, 1272], [19.5, 1360], [24.04, 1360], [24.6, 1450], [26.1, 1450], [26.9, 1560], [27.2, 1560], [27.7, 1470]]);
function a5Merchant1(t) {
  const tc = AB_T2(t), x = A5_MX1(tc), P = { ...a5Base(t, 401), x, y: tc < 17.7 ? 890 : 925, dir: -1, mouth: 'smile', brow: 0.6, lid: Math.max(0.3, abLid(t, 401)), gaze: [-1, 0], handL: [-26, -106], handR: [24, -110] }, o = { cuffR: a5RingShown(t) ? 0 : 1, ring: 0 };
  let lamp = null, box = null, crates = 0, glint = 0;
  const W = walk(A5_MX1, tc, { stride: 30 }); if (W.amp > 0.05) Object.assign(P, W);
  if (tc < 1.5) { const f = flow(tc, [[0, 0.2], [0.45, 1.1], [0.75, 0.95], [1.1, 1]]); P.handL = [-45, K.lerp(-150, -238, f)]; P.handR = [45, K.lerp(-150, -238, f)]; P.sq *= flow(tc, [[0, 0.94], [0.45, 1.06], [0.75, 0.98], [1.0, 1]]); P.gaze = [0, -1]; P.mouth = 'grin';
    if (tc > 1.1) { const d = beatIn(tc, 1.1, 1.45); P.handL = [-45, K.lerp(-238, -110, d)]; P.handR = [45, K.lerp(-238, -112, d)]; } }
  else if (tc < 2.5) { P.handLW = [935 + 6 * Math.sin(tc * 9) * (tc < 2.1 ? 1 : 0), 640]; P.sq *= 1.03; P.gaze = [-0.6, -0.8]; if (tc > 2.1) { P.handLW = null; P.handL = PERSON_HANDS.hipsHands.L; P.handR = PERSON_HANDS.hipsHands.R; P.gaze = [-1, -0.6]; P.tip = -0.03; } }
  else if (tc < 3.46) { lamp = 'hand'; P.handL = [40, -136]; P.handR = [52 + 10 * Math.sin(tc * 22), -142]; P.gaze = [-0.2, 0.3]; P.lid = 0.5; }
  else if (tc < 4.6) { P.gaze = gazePlan(tc, [[3.46, [-1, 0]], [3.9, [-1, -0.1]]]); P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; }
  else if (tc < 5.56) { const lean = Math.sin(Math.PI * beatIn(tc, 4.6, 5.56)); P.handL = [K.lerp(-26, 66, lean), K.lerp(-106, -112, lean)]; P.handR = [K.lerp(24, 84, lean), K.lerp(-110, -108, lean)]; P.tip = 0.22 * lean; P.drop = 8 * lean; P.brow = -0.4; P.lid = 0; P.mouth = 'grin'; o.feather = lagged((u) => -0.4 * Math.sin(Math.PI * beatIn(u, 4.6, 5.56)), tc, 0.15, 1); }   // revision 1: leans out over the counter on both forearms for the bow
  else if (tc < 6.8) { const f = flow(tc, [[5.56, 0], [5.8, 1.1], [6.0, 1]]); P.handL = [K.lerp(-26, -98, f), K.lerp(-106, -158, f)]; P.handR = [K.lerp(24, 98, f), K.lerp(-110, -158, f)]; P.gaze = gazePlan(tc, [[5.56, [-1, 0]], [6.0, [-0.3, 0]], [6.4, [-1, 0]]]); P.lid = 0.2; P.talk = abTalk(t, 6.2, 7.3, 1); if (P.talk) P.mouth = 'open'; P.sq *= 1.02; }
  else if (tc < 7.42) { P.handRW = [945, 800]; lamp = tc < 7.1 ? 'hand' : null; P.gaze = [-1, 0.3]; P.talk = abTalk(t, 6.2, 7.3, 1); if (P.talk) P.mouth = 'open'; }
  else if (tc < 8.78) { P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; P.gaze = [-1, 0]; P.mouth = 'grin'; }
  // S2: the three smiles (the same keys), the drop, the drumming, the ring, the thought
  if (tc >= 8.78 && tc < 17.7) { P.mouth = 'closed'; P.brow = 0.7; P.lid = 0.35; P.gaze = [-1, 0];
    for (const s0 of A5_SMILE_T) { const S = a5Smile(tc, s0); if (S && tc < (s0 === 17.0 ? 18.0 : s0 === 10.76 ? 11.9 : s0 + 0.62)) { Object.assign(P, { mouth: S.mouth, lid: S.lid, brow: S.brow, tip: S.tip }); glint = S.glint; P.handR = PERSON_HANDS.chest.R; } }
    if (tc >= 10.76 && tc < 11.3) { P.handRW = [985, 790]; }
    if (tc >= 11.9 && tc < 13.04) { P.mouth = 'closed'; P.brow = 0.85; P.lid = 0.4; P.drop = 6; P.gaze = gazePlan(tc, [[11.9, [-1, 0]], [12.4, [-1, 0.1]]]); P.sq = 1; P.tip = 0; }
    if (tc >= 13.04 && tc < 13.7) { o.ring = K.clamp((tc - 13.1) / 0.5); o.ringR = 11; }
    if (tc >= 13.04 && tc < 17.0) { P.dir = 1; P.tip = -0.04; P.handLW = [1050, 772]; P.handRW = [1130 + 3 * (Math.floor(tc * 12) % 2), 772 - 4 * (Math.floor(tc * 6) % 2)]; P.gaze = [0.9, 0]; P.brow = 0.85; P.lid = 0.35; P.mouth = 'closed';
      if (tc >= 13.7) { P.handRW = null; P.handR = [-6, -100]; } if (tc >= 16.2) { P.handR = [10, -112]; P.lid = abBlinkAt(AB_T3(t), 16.6) > 0 ? 1 : 0.35; } } }
  // S3: peeking round the post, the smile put on, watching
  if (tc >= 17.7 && tc < 24.04) { P.dir = 1; P.gaze = [1, 0];
    if (tc < 18.9) { P.tip = tc < 18.32 ? 0.02 : 0.16; P.handRW = [1300, 700]; P.handL = [-20, -100]; P.mouth = 'closed'; P.brow = 0.85; P.lid = 0.35; P.gaze = tc < 18.32 ? [1, 0] : [1, 0.05]; }
    else if (tc < 19.9) { const S = a5Smile(tc, 19.2); if (S) { P.mouth = S.mouth; P.lid = S.lid; P.brow = S.brow; glint = S.glint; } P.handR = tc < 19.2 ? [10, -214] : [30, -100 + 8 * Math.sin(tc * 16)]; P.handL = [-30, -100]; }
    else { P.mouth = 'smile'; P.lid = 0.45; P.brow = 0.5; P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R;
      P.gaze = gazePlan(tc, [[19.9, [1, 0]], [21.74, [1, 0.05]], [22.14, [1, -0.1]], [22.54, [1, 0.05]]], 0.06); P.look = tc > 22.6 ? 0.2 * Math.sin((tc - 22.6) * 5) : 0; if (tc > 22.0 && tc < 22.4) P.brow = -0.3; } }
  // S4: the catch, the effortless lift, the fake strain, the carry, the sleeve, the gift, the low bow and the real grin
  if (tc >= 24.04 && tc < 35) { P.dir = 1; P.gaze = [1, 0]; P.mouth = 'smile'; P.lid = 0.4; P.brow = 0.4;
    if (tc < 25.0) { if (tc > 24.45) { P.handRW = [1530, 650]; crates = 1; } P.sq *= landSquash(tc, 24.6, 0.06); P.mouth = 'o'; }
    else if (tc < 26.1) { crates = 2; P.handR = [72, -186]; P.handL = [-30, -110]; if (tc > 25.45) { P.sq *= 0.94 + 0.02 * Math.sin(tc * 20); P.mouth = 'grin'; P.lid = 0.8; P.brow = -0.4; P.x += tremble(tc, 1.5); } else { P.lid = 0.3; P.brow = 0.8; P.mouth = 'closed'; } }
    else if (tc < 26.92) { crates = 2; P.handR = [72, -186]; P.handL = [-30, -110]; P.sq *= 0.95; }
    else if (tc < 27.82) { P.handL = [-20, -104]; P.handR = [20, -106]; P.sq *= landSquash(tc, 27.0, 0.05); if (tc > 27.2) P.dir = -1; P.gaze = [1, 0]; if (tc > 27.7) P.dir = 1; }
    else if (tc < 29.02) { const f = flow(tc, [[27.82, 0], [28.2, 1], [28.6, 0.9], [28.9, 1]]); P.handL = [-60, -175]; P.handR = [K.lerp(20, -30, f), K.lerp(-106, -128, f)]; P.brow = -0.6; P.mouth = 'grin'; P.sq *= anticipate(tc, 27.82, 0.3, 0.04); }
    else if (tc < 30.5) { P.handR = [70, -142]; P.handL = [-30, -108]; box = tc < 29.75 ? 'palm' : null; P.mouth = 'grin'; P.lid = 0.5; P.brow = -0.3; }
    else if (tc < 33.72) { P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; P.lid = 0.45; P.gaze = tc > 31.4 ? [1, -0.3] : [1, 0]; }
    else if (tc < 34.2) { P.tip = 0.26 * flow(tc, [[33.72, 0], [33.9, 1.05], [34.1, 1]]); P.handR = PERSON_HANDS.chest.R; P.mouth = 'grin'; P.lid = 0.3; P.brow = 0.9; P.gaze = [-0.2, 0.2]; P.look = -0.8; }
    else { P.tip = 0.26 * (1 - beatIn(tc, 34.2, 34.5)); P.gaze = [1, -0.1]; P.mouth = 'closed'; P.brow = 0.8; P.lid = 0.3; P.handL = [-24, -104]; P.handR = [40, -110]; o.ring = tc > 34.3 && tc < 34.6 ? (tc - 34.3) / 0.3 : 0; } }
  if (tc > 13.15 && tc < 13.6) o.ring = (tc - 13.15) / 0.45;
  return { P, o, lamp, box, crates, glint };
}
// ---------- the nephew in the market ----------
const A5_NX1 = (u) => kfn(u, [[17.7, 1520], [19.92, 1520], [20.5, 1610], [21.7, 1610], [22.2, 1520], [22.3, 1520], [22.8, 1610], [22.95, 1610], [23.35, 1510], [24.6, 1510], [26.1, 1510], [26.9, 1640], [34.2, 1640], [34.8, 2080]]);
function a5Nephew1(t) {
  const tc = AB_T2(t), W = walk(A5_NX1, tc, { stride: tc > 34.2 ? 34 : 20 }), P = { ...a5Base(t, 411), y: 920, dir: 1, ...W, mouth: 'smile', gaze: [1, 0], handL: [-22, -104], handR: [22, -106] }, o = {};
  let carry = 0, wob = 0;
  if (tc < 19.92) { P.handR = tc > 19.0 ? [30, -200] : [22, -106]; P.dir = -1; P.gaze = [-1, 0]; }
  if (tc >= 19.92 && tc < 21.7) { carry = 1; P.handL = [18, -140]; P.handR = [24, -142]; P.dir = 1; if (tc > 20.66 && tc < 21.4) { P.handR = [50, -200 + 10 * Math.sin(tc * 16)]; P.mouth = 'grin'; P.gaze = [1, -0.1]; wob = tc > 20.9 ? 0.35 * Math.sin(Math.PI * beatIn(tc, 20.9, 21.4)) : 0; } }
  if (tc >= 21.7 && tc < 22.3) { P.dir = -1; P.gaze = [-1, 0]; }
  if (tc >= 22.3 && tc < 22.9) { carry = 1; P.handL = [18, -140]; P.handR = [24, -142]; P.dir = 1; }
  if (tc >= 22.9 && tc < 23.42) { P.dir = -1; P.handR = [24, -196]; P.gaze = [-1, 0]; }
  if (tc >= 23.42 && tc < 24.6) { carry = 3; P.dir = 1; P.handL = [18, -150]; P.handR = [24, -152]; P.sq *= 0.95; wob = 0.07 * Math.sin((tc - 23.42) * 7) * K.clamp((tc - 23.42) / 0.6) + (tc > 24.0 ? 0.25 * beatIn(tc, 24.0, 24.45) : 0); P.gaze = [1, -0.6]; P.mouth = 'o'; }
  if (tc >= 24.6 && tc < 25.0) { carry = 2; P.dir = 1; P.handL = [18, -150]; P.handR = [24, -152]; wob = 0.05 * Math.sin((tc - 24.6) * 20) * (1 - beatIn(tc, 24.6, 25)); }
  if (tc >= 25.0 && tc < 26.92) { carry = 1; P.dir = 1; P.handL = [18, -140]; P.handR = [24, -142]; if (tc < 25.5) { P.mouth = 'o'; P.gaze = [-1, -0.3]; P.dir = -1; } }
  if (tc >= 26.92 && tc < 27.82) { P.dir = -1; P.handL = [-20, -120 + 10 * Math.sin(tc * 30)]; P.handR = [20, -120 - 10 * Math.sin(tc * 30)]; P.gaze = [-1, 0]; }
  if (tc >= 27.82 && tc < 34.2) { P.dir = -1; P.gaze = [-1, 0];
    if (tc >= 29.02 && tc < 29.72) { P.lid = 0; P.mouth = 'o'; P.gaze = [-1, 0.3]; }
    if (tc >= 29.72 && tc < 30.5) { o.box = 1.5; P.handL = [20, -130]; P.handR = [30, -132]; const h = hop(tc, 30.0, 0.34, 0, 0, 24); P.y -= h[1]; o.lift = h[1]; P.sq *= landSquash(tc, 30.34, 0.12); P.tip = tc < 29.95 ? 0.15 : 0; o.blush = K.clamp((tc - 29.8) / 0.3); P.mouth = 'grin'; P.lid = 0.5; }
    if (tc >= 30.5 && tc < 31.38) { o.box = 1.5; o.blush = 0.6; P.handL = [20, -130]; P.handR = tc < 30.95 ? [30, -212] : PERSON_HANDS.pointUp.R; P.gaze = tc < 30.95 ? [-0.7, -0.8] : [-1, 0]; P.mouth = tc < 30.95 ? 'closed' : 'o'; P.tilt = tc < 30.95 ? 0.1 : 0; }
    if (tc >= 31.38 && tc < 33.72) { o.box = 1.5; o.boxL = tc < 32.6 ? 1 : 0; P.dir = 1; const f = flow(tc, [[31.38, 0], [31.6, 1.15], [31.8, 1]]); P.handR = [K.lerp(24, 112, f), K.lerp(-110, -170, f)]; P.handL = [-10, -120]; P.tip = 0.06 * f; P.mouth = 'grin'; P.gaze = [1, -0.2]; P.talk = abTalk(t, 31.38, 32.6, 2); if (P.talk) P.mouth = 'open'; if (tc > 32.6) { P.dir = -1; P.gaze = [-1, 0]; P.handR = [24, -112]; } }
    if (tc >= 33.72) { o.box = 1.5; P.handL = [20, -130]; P.handR = [30, -132]; P.mouth = 'grin'; } }
  if (tc >= 34.2) { o.box = 1.5; P.dir = 1; P.tip = 0.12; P.handR = [40, -200 + 14 * Math.sin(tc * 18)]; P.handL = [-30, -120]; P.gaze = [1, 0]; P.mouth = 'grin'; o.boxHand = 1; }
  return { P, o, carry, wob };
}
// the crate counts over S3-S4 (the stack by the storehouse, the cart bed)
const a5StackN = (t) => 5 - (t >= 19.92) - (t >= 22.3) - 3 * (t >= 23.42);
const a5CartN = (t) => (t >= 21.6) + (t >= 22.9) + 3 * (t >= 26.92);
// ---------- townsfolk ----------
const A5_FOLKW = { costume: 'villageWoman', s: 0.9, pal: { robe: '#e86a9a', dot: '#b8486a', sleeve: '#f29ab8', hc: '#ffd36a', hd: '#c89a2a' } };
const A5_FOLKC = { costume: 'villageWoman', s: 0.92, pal: { robe: '#2f9a8e', dot: '#1f6e66', sleeve: '#5ac0b4', hc: '#ffffff', hd: '#c8d0e0' } };
function a5Folk(ctx, F, P, m = A5_DAY) { a3Shadow(ctx, P.x, P.y, 96); return abPerson(ctx, { s: F.s, ...P }, m, { ...F, ...P, pal: abPal(F.pal, m) }); }
function a5MarketFolk(ctx, t) { const tc = AB_T2(t);
  // the cloth seller (S1: she weighs his lamp), the fruit seller
  const C1 = { ...a5Base(t, 421), x: 830, y: 915, dir: 1, mouth: 'smile', gaze: tc > 3.6 ? [1, 0] : [-1, 0.2], handL: [-24, -104], handR: [24, -106] };
  if (tc > 6.8 && tc < 8.0) { C1.handRW = tc < 7.4 ? [945, 800] : [880, 812 - 10 * Math.abs(Math.sin((tc - 7.4) * 10))]; C1.gaze = [1, 0.4]; if (tc > 7.4) C1.mouth = 'grin'; }
  if (tc > 7.6 && tc < 8.5) C1.handL = [-60, -190 + 10 * Math.sin(tc * 14)];
  a5Folk(ctx, A5_FOLKC, C1); if (tc > 7.1 && tc < 8.5) { const [hx, hy] = a2Hand(C1, 1, { s: 0.92, age: 0.25 }); brassLamp(ctx, hx, hy, 1.2, { glint: tc > 7.5 && tc < 8.0 ? (tc - 7.5) / 0.5 : 0 }); }
  const F1 = { ...a5Base(t, 431), x: 470, y: 912, dir: 1, mouth: 'smile', gaze: tc > 3.5 ? [1, 0] : [-0.6, 0.5], handL: [-24, -104], handR: tc > 3.5 && tc < 4.6 ? [30, -150] : [24, -106], lid: abLid(t, 431, [3.5]) };
  if (tc > 7.9 && tc < 8.6) F1.handR = [60, -196 + 8 * Math.sin(tc * 15)]; a3Folk(ctx, 'fruit', F1, A5_DAY);
  // S2: three customers queue and leave (the woman with the basket, the old woman with her stick, a child with a coin)
  if (tc >= 8.5 && tc < 12.6) {
    const cx = [kfn(tc, [[8.5, 640], [9.3, 930], [10.0, 930], [10.6, 560]]), kfn(tc, [[8.5, 520], [9.3, 820], [10.0, 820], [10.3, 920], [10.7, 920], [11.4, 600]]), kfn(tc, [[8.5, 430], [9.3, 730], [10.3, 730], [10.6, 900], [11.3, 900], [11.9, 620]])];
    const cxf = [(u) => kfn(u, [[8.5, 640], [9.3, 930], [10.0, 930], [10.6, 560]]), (u) => kfn(u, [[8.5, 520], [9.3, 820], [10.0, 820], [10.3, 920], [10.7, 920], [11.4, 600]]), (u) => kfn(u, [[8.5, 430], [9.3, 730], [10.3, 730], [10.6, 900], [11.3, 900], [11.9, 620]])];
    const out = [tc > 10.0, tc > 10.7, tc > 11.3];
    const P0 = { ...a5Base(t, 441), y: 920, ...walk(cxf[0], tc, { stride: 20 }), dir: out[0] ? -1 : 1, gaze: [1, 0], mouth: 'smile', handL: [-40, -96], handR: [24, -106] }; P0.x = cx[0];
    a3Folk(ctx, 'granny', { ...a5Base(t, 451), y: 922, ...walk(cxf[1], tc, { stride: 18 }), x: cx[1], dir: out[1] ? -1 : 1, gaze: [1, 0], mouth: 'smile' }, A5_DAY);
    const kid = { ...a5Base(t, 461), y: 922, ...walk(cxf[2], tc, { stride: 16 }), x: cx[2], dir: out[2] ? -1 : 1, gaze: tc > 10.9 && tc < 11.3 ? [1, -0.8] : [1, -0.3], mouth: tc > 10.9 ? 'o' : 'smile', handR: tc < 11.0 ? [40, -150] : [24, -100], handL: [-20, -100] };
    if (out[2]) { const h = hop(tc, 11.4, 0.3, 0, 0, 16); kid.y -= h[1]; }
    a3Shadow(ctx, kid.x, 922, 70); abKid(ctx, kid, A5_DAY);
    a5Folk(ctx, A5_FOLKW, P0); a3Basket(ctx, ...a2Hand(P0, 0, { s: 0.9, age: 0.25 }).map((v, i) => v + (i ? 24 : 0)), 0.8);
    if (tc > 10.76 && tc < 11.0) abGlint(ctx, kid.x + 20, 760, 20, (tc - 10.76) / 0.24); }
  if (tc >= 16.8 && tc < 17.7) { const nx = kfn(tc, [[16.8, 700], [17.3, 900]]); a3Folk(ctx, 'jar', { ...a5Base(t, 471), y: 920, ...walk((u) => kfn(u, [[16.8, 700], [17.3, 900]]), tc, { stride: 20 }), x: nx, dir: 1, gaze: [1, 0], mouth: 'smile' }, A5_DAY); }
}
// ---------- the market world (S1-S4) ----------
function a5S1World(ctx, t, cam) {
  const tc = AB_T2(t), aw = kfn(tc, [[0.35, 0.05], [0.9, 1]]), bo = a5Wob(tc, 0.9, 14, 2.5, 4);
  a5Market(ctx, t, cam, { awning: aw, bounce: bo, sign: tc < 1.76 ? null : swing(tc, 1.9, 0.5, 1.2, 1.6) + 0.03 * Math.sin(tc * 2.3) });
  if (t < 12.6) a5MarketFolk(ctx, t);
  const M = a5Merchant1(t);
  // the storehouse corner: the crate stack, the handcart and its crates
  if (cam.x > 1150) { const n = a5StackN(tc); a3Shadow(ctx, 1470, 902, 200); a5CrateStack(ctx, 1430, 902, Math.min(3, n), 1); a5CrateStack(ctx, 1520, 902, Math.max(0, n - 3), 1); abCart(ctx, 1700, 900, { bounce: 4 * a5Wob(tc, 26.95, 1, 3, 5) }); const cn = a5CartN(tc);
    for (let i = 0; i < cn; i++) a5Crate(ctx, 1640 + (i % 3) * 56, 900 - 145 - Math.floor(i / 3) * 62, 0.85, 0, ['#ff9a2a', '#e8364f', '#7ae08a'][i % 3]);
    if (t > 26.92 && t < 27.6) abDust(ctx, 1700, 900, 300, 90, t, 0.7 * (1 - (t - 26.92) / 0.7)); }
  // Ali Baba through the lane arch (S3)
  if (tc >= 20.4 && tc < 24) { const ax = (u) => kfn(u, [[20.4, 1960], [21.0, 1830], [22.98, 1830], [23.8, 2120]]), A = { ...a5Base(t, 481), y: 915, ...walk(ax, tc, { stride: 22 }), dir: tc < 22.98 ? -1 : 1, mouth: 'smile', gaze: [-1, 0], handL: [-30, -100], handR: [26, -104] };
    if (tc > 20.66 && tc < 21.6) { A.handR = [60, -196 + 12 * Math.sin(tc * 18)]; } if (tc > 22.98 && tc < 23.4) A.gaze = [-1, 0]; else if (tc > 22.98) A.gaze = [1, 0];
    a3Basket(ctx, ...a2Hand(A, 0, A2_ALI).map((v, i) => v + (i ? 26 : 0)), 0.85); a2Ali(ctx, A, A5_DAY, { shc: A5_DSH }); }
  const N = a5Nephew1(t);
  const drawNeph = () => { if (tc < 17.7) return; abNephew(ctx, t, N.P, A5_DAY, { shc: A5_DSH, blush: N.o.blush, box: N.o.box && !N.o.boxHand && !N.o.boxL ? N.o.box : 0, lift: N.o.lift });
    if (N.carry) { const [ax2, ay2] = a2Hand(N.P, 0, A5_NEPH), [bx2, by2] = a2Hand(N.P, 1, A5_NEPH); a5CrateStack(ctx, (ax2 + bx2) / 2, (ay2 + by2) / 2 + 30, N.carry, 0.85, N.wob); }
    if (N.o.boxHand) { const [hx, hy] = a2Hand(N.P, 1, A5_NEPH); giftBox(ctx, hx, hy - 4, 1.5); } if (N.o.boxL) { const [hx, hy] = a2Hand(N.P, 0, A5_NEPH); giftBox(ctx, hx, hy - 2, 1.5); } };
  // the merchant: through the light band in S1 (the leader underneath), behind the post in S3
  const drawM = () => { const band = tc >= 0.5 && tc < 1.75 ? { x: kfn(t, [[0.5, 880], [1.7, 1380]], 'lin'), y: 700, w: 150, ang: 0.21, k: 1 } : null;
    disguiseWipe(ctx, band, (c) => abNewMerchant(c, t, M.P, A5_DAY, { ...M.o, shc: A5_DSH }), (c) => a5LeaderAs(c, t, { ...M.P, mouth: 'closed', brow: 0.9, lid: 0.3 }, A5_DAY), t);
    const [hx, hy] = a2Hand(M.P, 1, A5_NM), [lx, ly] = a2Hand(M.P, 0, A5_NM);
    if (M.lamp) brassLamp(ctx, lx - 8, ly + 4, 1.3, { glint: (t * 1.6) % 1 });
    if (M.box) giftBox(ctx, hx, hy - 6, 1.7, { glint: K.clamp((t - 29.02) / 0.5) });
    if (M.crates === 1) a5Crate(ctx, hx, hy + 10, 0.85); else if (M.crates === 2) { a5CrateStack(ctx, hx - 10, hy + 8, 2, 0.85); }
    if (M.glint) { const [gx, gy] = a2HeadPt(M.P, 0, 16, A5_NM); abGlint(ctx, gx, gy, 26, M.glint); } };
  if (tc < 17.7) { drawM(); shopCounter(ctx, t); }
  else { shopCounter(ctx, t); if (tc < 24.04 && M.P.x > 1310) { drawM(); a5Post(ctx); drawNeph(); } else if (tc < 18.9) { drawM(); a5Post(ctx); drawNeph(); } else { a5Post(ctx); const L = [{ y: M.P.y, d: drawM }, { y: N.P.y + 0.5, d: drawNeph }]; for (const q of abByY(L)) q.d(); } }
  // the cat on the awning (hisses at 7.42), back in a doze later
  if (tc < 17.7) { const ar = a5Win(tc, 7.42, 8.4, 0.12, 0.3); a5Cat(ctx, t, { x: 1010, y: SF.top + bo - 2, gy: SF.top + bo - 2, dir: 1, arch: ar, puff: ar, mouth: ar > 0.3 ? 'open' : 'closed', ears: ar > 0.3 ? -1 : 0.4, gaze: [1, 0.8] }, 'rgba(43,26,58,0.3)'); }
}
function a5S1Over(ctx, t, cam, S) {
  if (t > 0.3 && t < 3.0) { const off = t > 2.7 ? [1, 0, 1, 0, 0, 0][Math.min(5, Math.floor((t - 2.7) * 15))] : 1;
    if (off) { S.title(ctx, 'THE UNEXPECTED GUEST', 500, 170, K.clamp((t - 0.3) / 0.9), { size: 58, align: 'center' }); if (t > 0.7) S.title(ctx, 'الضيف غير المتوقع', 500, 290, K.clamp((t - 0.7) / 0.9), { size: 70, align: 'center', font: 'Lalezar', glow: '#8a5cff' }); if (t > 0.9 && t < 1.5) abGlint(ctx, 760, 130, 40, (t - 0.9) / 0.6); } }
  // the neon bracket: the tiny shop between the big stalls (2.58 - 3.4)
  if (t > 2.58 && t < 3.6) { const [ax, ay] = abP(SF.x0, 470, cam), [bx] = abP(SF.x1, 470, cam), mx = (ax + bx) / 2, p = K.clamp((t - 2.58) / 0.3); ctx.save(); ctx.globalAlpha *= 1 - K.clamp((t - 3.3) / 0.3); S.arrow(ctx, [mx, ay], [ax, ay], p, { color: '#7fe3ff' }); S.arrow(ctx, [mx, ay], [bx, ay], p, { color: '#7fe3ff' }); ctx.restore(); }
  if (t > 6.1 && t < 8.3) { const [hx, hy] = abP(1060, 700, cam); a5Say(ctx, S, [[6.2, 'I AM A NEW MERCHANT!']], t, hx - 80, hy - 210, [hx, hy - 30], { size: 52, gone: 8.0 }); }
  if (t > 7.42 && t < 8.4) { const [cx, cy] = abP(1010, SF.top - 60, cam); a2Tag(ctx, S, 'HSSS!', cx + 30, cy - 110, t, 7.45, 8.2, { size: 40, rot: -0.1 }); }
  if (t > 14.5 && t < 17.25) { const [hx, hy] = abP(1075, 690, cam), [cx, cy] = abP(1470, 380, cam), p = K.clamp((t - 14.5) / 0.4) * (1 - K.clamp((t - 17.0) / 0.2)), z = cam.zoom;
    thoughtCloud(ctx, cx, cy, 440, 320, t, { p, tail: [hx + 30, hy - 40], at: [985, 760], scale: 0.42, inside: (c, tt) => { if (t < 15.76) return; const k = K.clamp((t - 15.76) / 0.3); c.save(); c.globalAlpha *= k; tsPlates(c, { x: 1000, y: 615, zoom: 1 }, 'day', null, 0, (cc) => tsSun(cc, 1700, 160)); a3Door(c, tsDoor(3), t > 16.18 ? 1 : 0, 'day', {}); a3Window(c, t, 'day', { sh: 1 });
      if (t > 16.18) { const ax = kfn(t, [[16.18, 930], [16.9, 1010]]); a2Ali(c, { ...a5Base(t, 491), x: ax, y: 905, dir: 1, ...walk((u) => kfn(u, [[16.18, 930], [16.9, 1010]]), t), mouth: 'smile', gaze: [1, 0] }, 'morning', { shc: A5_DSH }); } c.restore(); } }); }
  if (t > 19.92 && t < 21.4) { const [nx, ny] = abP(1610, 640, cam); a2Tag(ctx, S, 'THE NEPHEW', nx, ny - 150, t, 19.92, 21.2, { size: 44 }); a4StreakLite(ctx, S, [nx, ny - 120], [nx, ny - 30], t, 20.0, 21.2); }
  if (t > 31.3 && t < 33.0) { const [nx, ny] = abP(1640, 680, cam); a5Say(ctx, S, [[31.38, 'COME TO DINNER!']], t, nx - 60, ny - 230, [nx, ny - 40], { size: 52, gone: 32.7 }); }
  if (t > 32.74 && t < 34.6) { const [nx, ny] = abP(1640, 680, cam), p = K.clamp((t - 32.74) / 0.3) * (1 - K.clamp((t - 34.3) / 0.25));
    a3PicBalloon(ctx, nx - 150, ny - 250, 250, 180, [nx - 20, ny - 60], p, (c) => { const x0 = nx - 150, y0 = ny - 250; abBlob(c, x0, y0 + 40, 80, 22, '#ffcf3a', '#c08a1a', { lw: 3 }); abBlob(c, x0, y0 + 22, 50, 30, '#fff6dc', '#e8d29a', { lw: 3 }); a5Steam(c, x0, y0 - 10, t, 1, 3);
      if (t > 33.72) { const k = K.clamp((t - 33.72) / 0.3); c.save(); c.globalAlpha *= k; for (const [dx, col, band] of [[-85, '#f6efe0', AB_ACC], [85, '#f3e2c0', null], [0, '#e8902a', null]]) { abBlob(c, x0 + dx, y0 - 34 + (dx ? 10 : -6), 20, 20, '#f7c6a3', '#e0a080', { lw: 2.5 }); abBlob(c, x0 + dx, y0 - 52 + (dx ? 10 : -6), 22, 12, col, abDark(col, 0.25), { lw: 2.5 }); if (band) seg(c, x0 + dx - 20, y0 - 46 + 10, x0 + dx + 20, y0 - 46 + 10, 5, band, 0); } c.restore(); } }); }
  if (t > 17.7 && t < 17.86) abSpeed(ctx, [0, 0, 1000, 1230], t, { dir: 1, alpha: 0.6 });
}
// a light streak to a point (the style's arrow), panel units
function a4StreakLite(ctx, S, from, to, t, a, b) { if (t < a || t > b + 0.3) return; ctx.save(); ctx.globalAlpha *= 1 - K.clamp((t - b) / 0.3); S.arrow(ctx, from, to, K.clamp((t - a) / 0.35), { color: '#7fe3ff', bend: -0.2 }); ctx.restore(); }
AB_SHOTS.push({ a: 0, b: 8.5, ww: 2000, cam: a5Cam([[0, { x: 1080, y: 470, zoom: 1.3 }], [1.6, a5CX(610)], [4.0, a5CX(610)], [4.6, a5CX(600, 1.45, 678)], [8.5, a5CX(590, 1.45, 678)]]), world: a5S1World, over: a5S1Over });
AB_SHOTS.push({ a: 8.5, b: 17.7, ww: 2000, cam: a5Cam([[8.5, a5CX(590, 1.45, 678)], [13.78, a5CX(600, 1.45, 678)], [15.4, a5CX(960, 1.3, 600)], [17.7, a5CX(980, 1.3, 600)]]), world: a5S1World, over: a5S1Over });
AB_SHOTS.push({ a: 17.7, b: 24.0, ww: 2000, cam: a5Cam([[17.7, a5CX(1060, 1.25, 568)], [24.0, a5CX(1090, 1.25, 568)]]), world: a5S1World, over: a5S1Over });
AB_SHOTS.push({ a: 24.0, b: 35.0, ww: 2000, cam: a5Cam([[24.0, a5CX(1130, 1.3, 590)], [35.0, a5CX(1190, 1.3, 590)]]), world: a5S1World, over: a5S1Over });
