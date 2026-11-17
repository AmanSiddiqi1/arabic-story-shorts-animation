// ===== AN-014 palace scenes: S17 wedding and vizier (129.7-138.68), S18 king (138.68-149.5), S19 the envier in court (149.5-162.18),
// S20 the open hand (162.18-173.0). palaceHall: dais 580..960 (top 860), throne x 800 (seat 800, sitY 848, right arm top ~ (885, 750)), cushion 660 =====
const K14_HALL = { dais: [580, 960, 860], throne: 800, cushions: [660] };
const K14_DAIS = 860;
function k14Hall(ctx, t, o = {}) { return palaceHall(ctx, { ...K14_HALL, t, ...o }); }
// the kind man at court: turban, then the vizier's tall turban (136.56), then the crown (143.1) and a red cape
function k14GMPal(t, o = {}) { const P = k14GM(t, o); P.pal.head = t < 136.56 ? 'turban' : t < 143.1 ? 'tallTurban' : 'crownTurban'; if (t >= 143.1) { P.pal.cape = C.red; P.pal.jewel = C.blue; } return P; }
function k14Sultan(t, o = {}) { return { ...K14_SULTAN, pal: { ...K14_SULTAN.pal }, y: 885, s: 0.92, dir: 1, mouth: 'smile', ...o }; }
function k14Pr(t, o = {}) { return { ...K14_PRINCESS, pal: { ...K14_PRINCESS.pal }, y: 900, s: 0.84, dir: -1, mouth: 'smile', ...o }; }
const K14_VTURB = PEOPLE.dress({ costume: 'vizier' });
function k14VizierTurban(ctx, x, y, s = 0.9) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); personHeadwear(ctx, 0, 0, K14_VTURB, { costume: 'vizier' }, 'front'); ctx.restore(); }

// ---------- S17 ----------
const K14_S17G = [[135.2, 380], [135.8, 540], [137.9, 540], [138.5, 680]], K14_S17S = [[134.9, 430], [135.5, 615]];
function k14S17(ctx, t) {
  const flame = kfn(t, [[134.0, 1], [134.6, 0], [138.1, 0], [138.4, 1]]);
  k14Hall(ctx, t, { u: 0.3, lampsLit: 1 });
  k14StandLamp(ctx, 612, K14_DAIS, t, flame);
  // old vizier on his cushion, then only his turban
  const va = K.clamp((134.0 - t) / 0.25);
  if (va > 0) { ctx.save(); ctx.globalAlpha = va; k14Act(ctx, { costume: 'vizier', age: 0.95, x: 660, y: 852, s: 0.86, sit: 1, seat: 'floor', dir: -1, mouth: 'smile', drop: 5 * pulse(t, 133.0, 0.6), lid: kfn(t, [[133.15, 0], [133.35, 0.95], [133.6, 0.95], [133.8, 0]]) }, t, 81, [430, 720]); ctx.restore(); }
  const S1 = k14Sultan(t, { x: kfn(t, K14_S17S) }); k14Walk(S1, k14X(K14_S17S), t, 28); S1.y = 885;
  let turb = t >= 133.85 ? [660, 852] : null;
  if (t >= 135.5 && t < 136.56) { const u = K.clamp((t - 135.5) / 0.3), v = K.clamp((t - 136.0) / 0.56); S1.dir = v > 0 ? -1 : 1; turb = [K.lerp(K.lerp(660, 618, u), 552, v), K.lerp(K.lerp(852, 790, u), 724 - 6, K.ease.inOut(v))]; S1.handLW = [turb[0] - 26, turb[1] - 20]; S1.handRW = [turb[0] + 26, turb[1] - 20]; S1.mouth = 'closed'; }
  if (t >= 136.56) { turb = null; S1.dir = -1; S1.mouth = 'smile'; }
  if (t >= 130.58 && t < 131.2) { S1.handLW = [418, 784]; S1.handRW = [444, 786]; }
  if (t >= 133.78 && t < 135.0) { S1.drop = 5; S1.mouth = 'closed'; S1.wet = true; }
  // couple
  const P = k14W(k14GMPal(t, { x: 380, dir: 1 }), K14_S17G, t);
  const Pr = k14Pr(t, { x: 480 });
  let pg = [480, 724], prg = [380, 724];
  if (t >= 130.58 && t < 131.84) { P.handRW = [428, 800]; Pr.handRW = [432, 800]; }
  if (t >= 130.9 && t < 131.4) { pg = k14Head(Pr); prg = k14Head(P); }
  if (t >= 131.4 && t < 132.0) { pg = [200, 600]; prg = [700, 600]; P.mouth = Pr.mouth = 'smile'; }
  if (t >= 132.58) { pg = prg = [660, 790]; }
  if (t >= 133.78 && t < 135.0) { P.drop = Pr.drop = 6; P.wet = Pr.wet = true; P.mouth = Pr.mouth = 'closed'; }
  if (t >= 135.0) { pg = k14Head(S1); prg = k14Head(P); }
  if (t >= 136.0 && t < 136.56) P.drop = 8 * K.clamp((t - 136.0) / 0.3);
  if (t >= 136.56) { P.drop = 8 * Math.max(0, settleTo(t, 136.56, 1, 0, 0.5)); P.mouth = 'closed'; }
  if (t >= 137.86) { P.handR = PERSON_HANDS.chest.R; pg = [500, 724]; }
  if (P.x > 580) P.y = K14_DAIS;
  k14Act(ctx, S1, t, 61, t < 135.0 ? k14Head(P) : k14Head(P)); k14SultanCrown(ctx, S1, S1);
  k14Act(ctx, Pr, t, 62, prg); k14Act(ctx, P, t, 1, pg);
  if (turb) k14VizierTurban(ctx, turb[0], turb[1], 0.86);
  k14Heart(ctx, t, 131.0, 430, 640, 24, 1.2); k14Heart(ctx, t, 131.25, 470, 620, 18, 1.0);
  k14Petals(ctx, t, 131.84, 133.4, [[...k14Head(P), 50], [...k14Head(Pr), 50], [...k14Head(S1), 50]]);
}

// ---------- S18 ----------
const K14_S18G = [[141.9, 640], [142.4, 712], [143.8, 712], [144.25, 800]], K14_S18P = [[141.3, 925], [141.7, 862]];
function k14S18(ctx, t) {
  const u = kfn(t, [[138.68, 0.3], [139.6, 0.46], [142.6, 0.46], [143.4, 0.3]]), lit = kfn(t, [[139.76, 1], [139.95, 0], [142.6, 0], [142.9, 1]]);
  k14Hall(ctx, t, { u, lampsLit: lit, light: lit });
  k14StandLamp(ctx, 612, K14_DAIS, t, 1);
  // old sultan on the throne, then an empty throne with the crown on the seat
  const oa = K.clamp((139.95 - t) / 0.2);
  if (oa > 0) { ctx.save(); ctx.globalAlpha = oa; const S1 = k14Sultan(t, { age: 1, x: 800, y: 848, sit: 1, seat: 'bench', dir: -1, lid: kfn(t, [[138.9, 0], [139.1, 0.9], [139.5, 0.9], [139.7, 0]]) }); k14Act(ctx, S1, t, 61, [700, 724]); k14SultanCrown(ctx, S1, S1); ctx.restore(); }
  const P = k14W(k14GMPal(t, { x: 640, y: K14_DAIS, dir: 1, mouth: 'smile' }), K14_S18G, t), Pr = k14W(k14Pr(t, { x: 925, y: K14_DAIS }), K14_S18P, t);
  let crown = t >= 139.76 && t < 143.1 ? [800, 798] : null, pg = [800, 724], prg = [800, 724];
  if (t >= 139.76 && t < 141.3) { P.drop = Pr.drop = 6; P.wet = Pr.wet = true; P.mouth = Pr.mouth = 'closed'; pg = prg = [800, 800]; }
  if (t >= 141.3) { prg = k14Head(P); pg = t < 141.9 ? [800, 790] : k14Head(Pr); }
  if (t >= 141.7 && t < 143.1) { const a = K.clamp((t - 141.7) / 0.3), b = K.clamp((t - 141.95) / 0.45), c = K.clamp((t - 142.6) / 0.5); const hd = k14Head(P);
    crown = [K.lerp(K.lerp(800, 790, a), 750, b), K.lerp(K.lerp(798, 760, a), 770, b)]; if (c > 0) crown = [K.lerp(750, hd[0], c), K.lerp(770, hd[1] - 40, K.ease.inOut(c))];
    Pr.handLW = [crown[0] - 24, crown[1] - 10]; Pr.handRW = [crown[0] + 24, crown[1] - 10]; Pr.mouth = 'smile'; Pr.drop = 4 * pulse(t, 142.0, 0.4); }
  if (t >= 141.5 && t < 142.4) P.handR = PERSON_HANDS.chest.R;
  if (t >= 142.45 && t < 143.6) { P.kneel = 0.45 * Math.sin(Math.PI * K.clamp((t - 142.45) / 1.1)); P.mouth = 'closed'; }
  if (t >= 143.1) { P.drop = 6 * pulse(t, 143.1, 0.3); P.mouth = 'smile'; }
  if (t >= 144.25) { P.sit = K.clamp((t - 144.25) / 0.3); P.seat = 'bench'; P.y = K.lerp(K14_DAIS, 848, P.sit); P.dir = -1; P.sq = landSquash(t, 144.55, 0.08); }
  if (t >= 145.92) pg = t < 147.92 ? [500, 600] : [150, 300];
  if (t >= 147.92) { P.handR = PERSON_HANDS.chest.R; P.lid = kfn(t, [[148.3, 0], [148.45, 0.95], [148.75, 0.95], [148.9, 0]]); }
  k14Act(ctx, Pr, t, 62, prg); k14Act(ctx, P, t, 1, pg);
  if (crown) k14Crown(ctx, crown[0], crown[1], 0.62, 0, { glow: t > 141.7 && t < 143.1 ? 1 : 0 });
  // the cat jumps onto the throne arm
  if (t >= 143.6) { const [x, l] = hop(t, 143.9, 0.4, 960, 885, 60), y = K.lerp(900, 750, K.clamp((t - 143.9) / 0.4)) - l; cat(ctx, { pal: 0, x: t < 143.9 ? 960 : x, y: t < 143.9 ? 900 : y, s: 0.5, dir: -1, sit: t > 144.3 ? 1 : 0, tailUp: 1, tailHairs: 5, sq: landSquash(t, 144.3, 0.15) }); }
}

// ---------- S19 ----------
const K14_Q = [['villager', { pal: { robe: '#3f9d4a', dot: '#2b7a38', sash: C.red } }, [[149.5, 130]], 91], ['villageWoman', {}, [[153.5, 200], [153.85, 150]], 92], ['villager', { pal: { robe: C.blue, dot: NAVY } }, [[153.38, 290], [153.75, 205]], 93], ['oldWoman', {}, [[154.1, 400], [154.45, 480]], 94]];
const K14_ENX = [[153.8, 312], [154.1, 380]];
function k14Thought19(c, t) {
  k14Yard(c, t, { u: 0.3, door: 1 });
  const tt = 60.55 + (t - 158.74);
  const P = k14GM(100, { x: 680, dir: 1, mouth: 'smile', tip: 0.15, handLW: [712, 828], handRW: [744, 826], noBlink: true });
  const E = k14EN(100, { x: 600, dir: 1, mouth: 'closed', brow: 1, noBlink: true });
  if (tt >= 60.55) { const u = K.clamp((tt - 60.55) / 0.08); E.x = K.lerp(600, 636, u); E.tip = K.lerp(-0.12, 0.18, u); E.aL = K14_SHOVE.aL; E.aR = K14_SHOVE.aR; E.mouth = 'o';
    const th = kfn(tt, [[60.55, 0.15], [60.75, 0.9], [60.95, 1.9], [61.12, 2.7]]), hip = [kfn(tt, [[60.55, 690], [61.12, 772]]), tt < 61.12 ? kfn(tt, [[60.55, 832], [61.12, 826]]) : fallY(tt, 61.12, 61.45, 826, 1200)];
    P.x = hip[0] - 68 * Math.sin(th); P.y = hip[1] + 68 * Math.cos(th); P.rot = th; P.tip = 0; P.handLW = P.handRW = undefined; P.eyes = 'wide'; P.mouth = 'o'; P.aL = [-2, -2.4]; P.aR = [2, 2.4];
    k14ClipOut(c, [700, 834, 170, 420], () => k14Person(c, P)); k14WellFront(c); }
  else { E.handL = [24, -152]; E.handR = [34, -150]; E.tip = -0.1; k14WellFront(c); k14Person(c, P); }
  k14Person(c, E);
}
function k14KingP(t) {
  const K1 = k14GMPal(t, { x: 800, y: 848, sit: 1, seat: 'bench', dir: -1, mouth: 'closed', brow: 0 });
  if (t >= 161.38) { const u = K.clamp((t - 161.38) / 0.3); K1.sit = 1 - u; K1.y = K.lerp(848, K14_DAIS, u); K1.sq = anticipate(t, 161.38, 0.15, 0.06); const r = K.ease.out(K.clamp((t - 161.6) / 0.35)); K1.aR = [K.lerp(0.12, 2.6, r), K.lerp(0.05, 2.95, r)]; }
  return K1;
}
function k14S19(ctx, t) {
  k14Hall(ctx, t, { u: 0.3, lampsLit: 1 });
  k14StandLamp(ctx, 612, K14_DAIS, t, 1);
  cat(ctx, { pal: 0, x: 885, y: 750, s: 0.5, dir: -1, sit: 1, tailUp: 1, tailHairs: 7, gaze: [-1, 0.3] });
  const K1 = k14KingP(t);
  const EN = k14W(k14EN(t, { x: 312, dir: 1, mouth: 'closed', brow: 0.4, flush: 0.35 }), K14_ENX, t, 20);
  const eh = k14Head(EN);
  // king: eyes along the line, stop, lean in
  let kg = [300, 724];
  if (t >= 150.98 && t < 151.6) kg = gazePlan(t, [[150.98, [130, 724]], [151.1, [200, 724]], [151.25, [290, 724]], [151.42, [312, 700]]], 0.07);
  else if (t >= 151.6) kg = eh;
  K1.lid = t < 151.4 ? 0.3 : 0; if (t >= 152.68 && t < 161.38) { K1.tip = 0.06; K1.brow = -0.4; K1.lid = kfn(t, [[152.9, 0], [153.05, 0.9], [153.3, 0.9], [153.45, 0]]); }
  if (t >= 161.38) { K1.brow = 0.1; K1.noBlink = true; }
  k14Act(ctx, K1, t, 1, kg);
  // shadow of the standing king over the envier
  if (t >= 161.5) halftoneShadow(ctx, 380, 905, 90 * K.clamp((t - 161.5) / 0.5), 0.5);
  // the envier behind the petitioners
  let eg = [EN.x + 10, 1000];
  EN.drop = 6;
  if (t >= 154.64) { eg = gazePlan(t, [[154.64, [800, 900]], [155.0, [800, 820]], [155.4, [800, 710]]], 0.12); EN.drop = kfn(t, [[154.7, 6], [155.6, 0]]); }
  if (t >= 155.9 && t < 156.25) eg = [0, 700];
  if (t >= 156.25) { eg = k14Head(K1); EN.eyes = 'wide'; EN.mouth = 'o'; EN.drop = -8 * pulse(t, 156.25, 0.25); EN.noBlink = true; EN.flush = 0.6; }
  if (t >= 159.88) { EN.sq = 0.94; eg = [200, 760]; EN.tip = -0.05; }
  if (t >= 160.46) { EN.x += tremble(t, 3); EN.kneel = K.clamp((t - 160.6) / 0.3); EN.handL = PERSON_HANDS.headHold.L; EN.handR = PERSON_HANDS.headHold.R; EN.mouth = 'frown'; EN.eyes = 'wide'; EN.flush = 0.8; eg = k14Head(K1); }
  k14Act(ctx, EN, t, 3, eg);
  // petitioners (B stands in front of the envier until he steps aside)
  K14_Q.forEach(([cos, ex, keys, seed], i) => {
    const Q = k14W({ costume: cos, ...ex, y: 900, s: 0.84, dir: 1, mouth: 'closed' }, keys, t, 24);
    Q.tip = 0.03 * Math.sin(t * (1.3 + i * 0.4) + i); if (i === 3) Q.handR = PERSON_HANDS.chin.R;
    k14Act(ctx, Q, t, seed, t > 153.38 ? eh : k14Head(K1));
  });
  // servant at the door
  k14Act(ctx, { costume: 'servant', x: 70, y: 900, s: 0.8, dir: 1, mouth: 'closed', handL: PERSON_HANDS.clasp.L, handR: PERSON_HANDS.clasp.R }, t, 95, k14Head(K1));
  // thought cloud: the shove, exactly as it was
  const cp = t < 157.26 ? 0 : t < 160.4 ? K14B(t, 157.26, 0.6) : 0;
  if (cp > 0) thoughtCloud(ctx, 590, 520, 420, 290, t, { p: cp, tail: [eh[0] + 20, eh[1] - 50], bg: C.blue, scale: 0.62, at: [700, 790], inside: (c) => k14Thought19(c, t) });
  k14Burst(ctx, t, 160.4, 590, 520, 150);
}

// ---------- S20 ----------
const K14_SVX = [[164.4, 1080], [165.6, 470], [166.45, 470], [167.4, 1100]], K14_ENX20 = [[168.36, 380], [169.6, 150]], K14_PRX20 = [[169.0, 1080], [170.0, 880]];
function k14Palm(ctx, h, open, dir = 1) { if (open <= 0.02) return; ctx.save(); for (let i = 0; i < 4; i++) { const a = -Math.PI / 2 + (i - 1.5) * 0.32 * dir; seg(ctx, h[0], h[1], h[0] + Math.cos(a) * 18 * open, h[1] + Math.sin(a) * 18 * open, 7, C.white, 2.5); } seg(ctx, h[0], h[1], h[0] - 16 * dir * open, h[1] + 2, 7, C.white, 2.5); shape(ctx, ell(h[0], h[1], 12, 12, 12), C.white, { lw: 3.5, seed: 5, dot: C.skin, pitch: 5, rad: 0.3 }); ctx.restore(); }
function k14S20(ctx, t) {
  k14Hall(ctx, t, { u: 0.3, lampsLit: 1 });
  k14StandLamp(ctx, 612, K14_DAIS, t, 1);
  cat(ctx, { pal: 0, x: 885, y: 750, s: 0.5, dir: -1, sit: 1, tailUp: 1, tailHairs: 7, tailCurl: 0.5 * K.clamp((t - 169.4) / 0.5) + 0.6 * pulse(t, 171.6, 0.35), lid: t > 170.5 ? 0.4 : 0, gaze: [-1, 0.3] });
  const K1 = k14GMPal(t, { x: 800, y: K14_DAIS, dir: -1, mouth: 'closed' });
  const op = K.ease.inOut(K.clamp((t - 163.0) / 0.6));
  K1.aR = [K.lerp(2.6, 1.95, op), K.lerp(2.95, 1.7, op)]; if (t >= 163.3) { K1.mouth = 'smile'; K1.brow = -0.2; }
  let kg = [380, 760];
  if (t >= 164.22 && t < 164.8) { K1.handL = [-50 + 12 * Math.sin(t * 18), -150]; kg = [1000, 724]; }
  if (t >= 167.28) { K1.aR = undefined; K1.handR = PERSON_HANDS.armsOut.R; K1.drop = 4 * pulse(t, 167.6, 0.4); kg = [150, 724]; }
  if (t >= 169.3) { K1.handR = K.clamp((t - 169.3) / 0.4) > 0.5 ? undefined : PERSON_HANDS.armsOut.R; kg = [500, 760]; }
  if (t >= 170.2) { K1.mouth = 'smile'; K1.lid = kfn(t, [[171.0, 0], [171.25, 0.95], [171.6, 0.95], [171.85, 0]]); kg = [500, 800]; }
  k14Act(ctx, K1, t, 1, kg);
  if (t < 167.28) { const h = k14L2W(K1, K1.hands[1][0], K1.hands[1][1]); k14Palm(ctx, h, op, -1); }
  // princess comes to stand beside him
  if (t >= 169.0) { const Pr = k14W(k14Pr(t, { y: K14_DAIS }), K14_PRX20, t, 22); k14Act(ctx, Pr, t, 62, k14Head(K1)); }
  // the envier: kneeling, peeking, standing with the gifts, leaving
  const E = k14W(k14EN(t, { x: 380, dir: 1, mouth: 'frown', brow: 0.4, flush: 0.6 }), K14_ENX20, t, 20);
  if (t < 168.36) { E.x = 380; E.amp = 0; }
  E.kneel = t < 165.8 ? 1 : 1 - K.clamp((t - 165.8) / 0.6);
  let eg = k14Head(K1), pile = 0;
  if (t < 163.52) { E.handL = PERSON_HANDS.headHold.L; E.handR = PERSON_HANDS.headHold.R; E.eyes = 'shut'; E.x += tremble(t, 2); }
  else if (t < 165.8) { E.handL = PERSON_HANDS.cheeks.L; E.handR = PERSON_HANDS.cheeks.R; E.wink = 'L'; E.brow = -0.6; E.flush = 0.4; }
  if (t >= 165.8) { pile = t < 166.3 ? 1 : t < 166.6 ? 2 : 3; E.handLW = [E.x - 24, 826 + 6 * K.clamp((t - 165.8) / 0.2)]; E.handRW = [E.x + 24, 826 + 6 * K.clamp((t - 165.8) / 0.2)]; E.mouth = 'o'; E.wet = true; E.brow = -0.5; E.flush = K.clamp(0.4 - (t - 165.8) * 0.3); eg = [E.x, 780]; }
  if (t >= 166.8) eg = k14Head(K1);
  if (t >= 168.36) { E.mouth = 'closed'; eg = t < 168.5 ? [150, 724] : t < 168.85 ? k14Head(K1) : [100, 1000]; E.drop = t > 168.85 ? 8 : 0; E.flush = 0; }
  const ea = K.clamp((170.0 - t) / 0.5);
  if (ea > 0) { ctx.save(); ctx.globalAlpha = ea; k14Act(ctx, E, t, 3, eg);
    if (pile >= 1) { k14Purse(ctx, E.x, 836, 0.75); if (t < 166.3) for (let i = 0; i < 3; i++) { const d = t - 165.85 - i * 0.08; if (d > 0 && d < 0.4) shape(ctx, ell(E.x - 10 + i * 10, 790 - 60 * d + 200 * d * d, 6, 4, 8), C.yellow, { lw: 2, seed: 600 + i }); } }
    if (pile >= 2) k14Robe(ctx, E.x, 798, 0.6); if (pile >= 3) k14Chest(ctx, E.x, 786, 0.5);
    ctx.restore(); }
  // the servant with the tray
  if (t >= 164.4 && t < 167.4) { const Sv = k14W({ costume: 'servant', y: 900, s: 0.8, dir: t < 166.45 ? -1 : 1, mouth: 'smile' }, K14_SVX, t, 20); Sv.handLW = [Sv.x - 26, 806]; Sv.handRW = [Sv.x + 26, 806]; if (t >= 166.45) Sv.handLW = Sv.handRW = undefined; k14Act(ctx, Sv, t, 95, t < 165.6 ? k14Head(K1) : k14Head(E));
    if (t < 166.45) { shape(ctx, K.rectPts(Sv.x - 46, 800, 92, 10), '#c98a3a', { lw: 4, seed: 610 }); if (t < 165.8) k14Purse(ctx, Sv.x - 14, 800, 0.6); if (t < 166.3) { k14Robe(ctx, Sv.x + 22, 800, 0.45); k14Chest(ctx, Sv.x + 22, 790, 0.4); } } }
}
function k14PalaceOver(ctx, t, cam, S) {
  k14Label(ctx, S, t, 'VIZIER', 540, 540, cam, 137.12, 138.5);
  k14Label(ctx, S, t, 'KING', 800, 540, cam, 143.8, 145.0); k14Arrow(ctx, S, t, [800, 570], [800, 640], cam, 143.85, 145.0, { bend: 0.05 });
  if (t >= 145.92 && t < 149.3) k14Inset(ctx, 250, 330, 185, K.clamp((t - 145.92) / 0.4) * K.clamp((149.2 - t) / 0.25), (c) => {
    c.save(); c.translate(-(600 + (t - 145.92) * 120), 0); countryRoad(c, { w: 3000, u: 0.25, camX: 600 + (t - 145.92) * 120 });
    const P = k14GM(10, { x: 1100 + (t - 145.92) * 120, y: 900, dir: 1, mouth: 'closed', drop: 4, noBlink: true }); k14Walk(P, (tt) => 1100 + (tt - 145.92) * 120, t, 24); P.amp = 1; P.handR = [20, -150];
    k14Person(c, P); const h = k14L2W(P, P.hands[1][0], P.hands[1][1]); k14Bindle(c, h[0], h[1], -2.0, 0.8, 0.25 * Math.sin(P.ph)); dustBurst(c, P.x - 30, 900, (t * 2) % 0.5, 3, 4, 8, 16, 0.5, 3); c.restore();
  }, { scale: 0.75, at: [500, 780] });
  k14Arrow(ctx, S, t, [250, 520], [305, 640], cam, 151.94, 153.0, { bend: -0.15 });
  k14Word(ctx, S, t, 'GULP!', 480, 760, cam, 160.5, 161.5, 80);
}
