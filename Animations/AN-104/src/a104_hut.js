// ===== AN-104 the poor owner's hut (S13 hut part to S16, 131.84-172.09) =====
const A104_OWNX = 640, A104_VISX = 460, A104_ODOGX = 575, A104_MAT = [540, 790];
const A104_HUT = { palette: 'day', doorSide: 'left', mat: A104_MAT, jug: 845, shelf: [700, 860, 460], jar: false, hook: false };
const a104HutDoor = (t) => kfn(t, [[133.2, 0.5], [133.8, 1], [167.6, 1], [168.5, 0.5]]);
// visitor's x over the hut scenes
const a104VX = (t) => kfn(t, [[133.2, 120], [134.0, 175], [135.0, 175], [136.4, 270], [137.92, 270], [138.7, A104_VISX], [162.8, A104_VISX], [164.3, 205], [167.6, 205], [168.4, 40]], 'lin');
// the sandal he mends: in his hands (body-local hand points)
function a104Sandal(ctx, x, y, s = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); shape(ctx, ell(0, 0, 26, 9, 18), '#8a501a', { lw: 4, seed: 460, dot: A104_BROWND, pitch: 6, rad: 0.2, da: 0.4 }); seg(ctx, -8, -2, 4, -14, 4, '#5b3010', 2); seg(ctx, 4, -14, 12, -2, 4, '#5b3010', 2); ctx.restore(); }

function a104Owner(t) {
  const P = a104Mk('poorLord', { x: A104_OWNX, y: 900, dir: -1, sit: 1, seat: 'floor', lid: 0.45, mouth: 'closed', brow: 0 });
  const vis = a104Visitor(t), vh = a104Head(vis), dogH = a104DogHead(a104OldDog(t));
  const mend = (k) => { P.handL = [-16, -88]; P.handR = [18 + 6 * Math.sin(t * 5) * k, -92 - 12 * Math.abs(Math.sin(t * 2.5)) * k]; P.gaze = [0.1, 0.9]; };
  const straight = a104E(t, 152.12, 1.0); P.lean = -0.1 * straight; P.drop = 4 * (1 - straight) - 4 * straight; P.sq = 1 + 0.03 * straight;
  P.drop += 4;
  if (t < 137.26) mend(1);
  else if (t < 139.18) { P.gaze = lookAt(a104Head(P), vh); P.brow = -0.3; P.mouth = 'smile'; P.lid = 0.25; P.handL = [-18, -78]; P.handR = [18, -78]; }
  else if (t < 143.54) { // follows the balloon frames, then nods
    P.gaze = lookAt(a104Head(P), gazePlan(t, [[0, vh], [139.96, [330, 520]], [140.5, [470, 520]], [141.0, [610, 520]], [141.4, dogH], [141.9, [470, 520]], [142.6, vh]], 0.15));
    P.handL = [-18, -78]; P.handR = [18, -78]; P.mouth = 'smile'; P.lid = 0.3; if (t > 142.48) P.drop += 8 * pulse(t, 142.6, 0.8); }
  else if (t < 147.7) { P.gaze = lookAt(a104Head(P), vh); P.mouth = 'smile'; P.lid = 0.3; P.handL = [-18, -78]; P.handR = [18, -78]; }
  else if (t < 152.12) { // v2: a readable "no": a shield palm between his chest and the purse, two slow head shakes, then both hands push the purse home
    P.gaze = lookAt(a104Head(P), vh); P.mouth = 'smile'; P.lid = 0.3; P.noBlink = true;
    const sh = a104Env(t, 148.0, 149.2, 0.12), ph = Math.sin(2 * Math.PI * (t - 148.0) / 0.6);
    P.look = 0.4 * ph * sh; P.tip = 0.04 * ph * sh;
    const kR = K.ease.inOut(a104Env(t, 147.96, 150.75, 0.3)), kP = a104E(t, 150.55, 0.35), kW = a104E(t, 151.9, 0.4), pu = a104PurseAt(t);
    P.tip += 0.1 * kP * (1 - kW);
    const restL = a104Pt(P, -18, -78), restR = a104Pt(P, 18, -78);
    let hR = a104L2(restR, [566, 798], kR), hL = restL;
    if (t >= 150.55) { hR = a104L2(hR, [pu[0] + 30, pu[1] + 28], kP); hL = a104L2(hL, [pu[0] + 34, pu[1] + 56], kP); hR = a104L2(hR, restR, kW); hL = a104L2(hL, restL, kW); }
    P.handRW = hR; P.handLW = hL; }
  else { P.gaze = lookAt(a104Head(P), vh); P.mouth = 'smile'; P.lid = 0.3; P.handL = [-18, -78]; P.handR = [18, -78];
    const sp = t < 162.13; if (sp) { P.talk = 0.45 + 0.25 * Math.sin(t * 7); }
    if (t >= 153.5 && t < 155.0) { P.handR = t < 154.2 ? PERSON_HANDS.chest.R : [78, -140 + 8 * Math.sin((t - 154.2) * 16)]; }   // v2: palm out, "not me" (was a hand at the head)
    if (t >= 156.1 && t < 157.6) { const k = a104Env(t, 156.1, 157.7, 0.3); P.handRW = a104L2(a104Pt(P, 18, -78), [dogH[0] + 10, dogH[1] + 10], k); P.gaze = lookAt(a104Head(P), dogH); }
    if (t >= 157.4 && t < 158.44) P.gaze = lookAt(a104Head(P), dogH);
    if (t >= 158.44 && t < 160.44) { P.look = 0.3 * Math.sin((t - 158.5) * 8) * a104Env(t, 158.5, 159.3, 0.1); P.handL = PERSON_HANDS.folded.L; P.handR = PERSON_HANDS.folded.R; P.lid = 0.4; }
    if (t >= 160.44 && t < 162.6) { const back = a104Pt(a104OldDog(t), 0, 0); P.handRW = [K.lerp(back[0], back[0] + 30, 0.5), 840]; }
    if (t >= 164.95 && t < 167.4) { P.handR = PERSON_HANDS.wave.R; P.mouth = 'smile'; }
    if (t >= 167.51) { P.gaze = t < 168.6 ? lookAt(a104Head(P), [140, 720]) : [0.1, 0.9]; P.handRW = t < 168.8 ? [a104DogHead(a104OldDog(t))[0] + 6, a104DogHead(a104OldDog(t))[1] - 16] : undefined; if (t >= 168.8) mend(0.6); } }
  return a104Lid(P, t);
}
function a104Visitor(t) {
  const P = a104Mk('old', { y: 900, dir: 1, mouth: 'o', brow: -0.6, lid: 0.1 }); a104Walk(P, a104VX, t, 0.8);
  const own = [A104_OWNX, 760];
  P.gaze = gazePlan(t, [[0, [0.9, -0.2]], [133.6, [0.9, -0.5]], [134.1, [0.95, 0.1]], [134.5, lookAt([175, 700], own)]], 0.25);
  if (t < 134.9) { P.drop = 10 * a104Env(t, 133.2, 134.0, 0.2); P.handR = [40, -64]; }
  else if (t < 137.92) { P.gaze = lookAt(a104Head(P), a104Head(a104OwnerLite(t))); P.brow = -0.8; P.handR = a104Tr(t, [[135.2, 137.6, [70, -150]]], [40, -64]); P.eyes = t > 136.6 && t < 137.3 ? 'wide' : undefined; P.lid = P.eyes ? null : 0.1; }
  if (t >= 137.92) { P.kneel = settleTo(t, 138.6, 0, 1, 0.45, 0.06); if (t < 138.6) P.kneel = 0; P.dir = 1; P.gaze = lookAt(a104Head(P), a104Head(a104OwnerLite(t))); P.brow = -0.3; P.mouth = 'closed'; }
  if (t >= 138.8 && t < 143.54) { P.talk = 0.4 + 0.3 * Math.sin(t * 6); const g = Math.floor((t - 138.8) / 0.7) % 3; P.handR = [[64, -120], [46, -150], [70, -104]][g]; P.handL = [[-40, -110], [-60, -100], [-30, -130]][g];
    if (t >= 141.12 && t < 141.9) { P.gaze = t < 141.35 ? lookAt(a104Head(P), a104DogHead(a104OldDog(t))) : t < 141.5 ? lookAt(a104Head(P), a104Head(a104OwnerLite(t))) : lookAt(a104Head(P), a104DogHead(a104OldDog(t))); P.mouth = t > 141.5 ? 'smile' : 'o'; P.eyes = t > 141.35 && t < 141.6 ? 'wide' : undefined; } }
  if (t >= 143.54 && t < 162.6) { const pu = a104PurseAt(t); P.handLW = [pu[0] - 18, pu[1] + 34]; P.handRW = [pu[0] + 18, pu[1] + 34]; P.talk = 0; P.mouth = 'closed'; P.drop = 6 * a104E(t, 143.6, 0.4);
    if (t >= 145.34 && t < 146.2) { P.handLW = undefined; P.handL = [-4, -120]; P.drop = 6 + 10 * pulse(t, 145.4, 0.7); P.wet = true; }
    if (t >= 146.2 && t < 147.9) { P.drop = 16 * a104Env(t, 146.2, 147.9, 0.3); P.lid = 0.8; P.gaze = [0.3, 0.9]; }
    if (t >= 149.34 && t < 150.6) { P.brow = -0.8; P.mouth = 'o'; P.gaze = lookAt(a104Head(P), t < 149.8 ? pu : a104Head(a104OwnerLite(t))); P.drop = 0; }
    if (t >= 150.6 && t < 152.12) { const pl = a104PurseAt(t - 0.12); P.handLW = [pl[0] - 18, pl[1] + 34]; P.handRW = [pl[0] + 18, pl[1] + 34]; P.brow = 0.4 * a104E(t, 150.95, 0.3); P.wet = t > 151.0; P.mouth = 'o'; P.lid = 0; P.noBlink = true; P.gaze = lookAt(a104Head(P), a104Head(a104OwnerLite(t))); P.drop = 4 * pulse(t, 151.5, 0.4); }
    if (t >= 152.12) { P.gaze = lookAt(a104Head(P), a104Head(a104OwnerLite(t))); P.mouth = 'o'; P.brow = -0.5; }
    if (t >= 157.6 && t < 160.4) { P.gaze = lookAt(a104Head(P), [470, 860]); P.mouth = 'open'; P.wet = true; P.lid = 0.2; P.brow = -0.3; if (t >= 157.9) { const dh = a104DogHead(a104OldDog(t)); P.handRW = a104L2([pu[0] + 18, pu[1] + 34], [dh[0] + 42, dh[1] + 4], a104Env(t, 157.9, 160.2, 0.3)); } }
    if (t >= 160.4) { P.gaze = lookAt(a104Head(P), a104Head(a104OwnerLite(t))); P.mouth = 'closed'; P.wet = true; }
    if (t >= 161.48) { P.drop = 12 * a104E(t, 161.6, 0.6); P.lid = Math.max(0.3, pulse(t, 161.8, 0.6)); } }
  if (t >= 162.6) { P.kneel = 1 - a104E(t, 162.6, 0.4); P.handR = PERSON_HANDS.chest.R; P.handLW = undefined; P.handRW = undefined; P.dir = t >= 162.95 && t < 163.85 ? -1 : 1; P.gaze = lookAt(a104Head(P), [A104_OWNX, 760]); P.mouth = 'closed'; P.brow = -0.4;
    if (t >= 163.91 && t < 165.2) { P.look = 0.3 * Math.sin((t - 164.0) * 9) * a104Env(t, 164.0, 165.0, 0.15); P.brow = -0.9; P.mouth = t < 164.5 ? 'o' : 'smile'; }
    if (t >= 165.2) { P.mouth = 'smile'; P.wet = true; }
    if (t >= 167.51) { P.drop = 12 * pulse(t, 167.55, 0.7); P.dir = t > 168.0 ? -1 : 1; P.alpha = 1 - K.clamp((t - 168.1) / 0.4); } }
  // the purse: between the hands until 161.5, then tucked into his sash (161.6-162.3) and drawn there to the exit
  if (t >= 143.54) { const sash = a104Pt(P, 30, -64);
    if (t < 161.5) P.purse = a104PurseAt(t);
    else { const k = a104E(t, 161.6, 0.7); P.purse = a104L2(a104PurseAt(161.5), sash, k); if (t < 162.6) { P.handLW = [P.purse[0] - 18, P.purse[1] + 34]; P.handRW = [P.purse[0] + 18, P.purse[1] + 34]; } } }
  return a104Lid(P, t);
}
// light owner pose for gaze targets (no recursion)
const a104OwnerLite = (t) => a104Mk('poorLord', { x: A104_OWNX, y: 900, dir: -1, sit: 1, seat: 'floor', drop: 4 });
// the purse between them: from his sash (143.54) to held out, offered higher, pushed back, lowered to his lap, tucked away
function a104PurseAt(t) {
  const out = [532, 806], hi = [538, 790], chest = [484, 812];
  let p = a104L2([470, 840], out, a104E(t, 143.54, 0.6));
  if (t >= 149.34) p = a104L2(p, hi, a104E(t, 149.4, 0.5));
  if (t >= 150.6) p = a104L2(p, chest, a104E(t, 150.9, 0.6));
  p = [p[0] + tremble(t, 1.2) * a104Env(t, 146.2, 147.9), p[1]];
  return p;
}
function a104OldDog(t) {
  const P = { x: A104_ODOGX, y: 945, s: 0.72, dir: -1, pal: 1, age: 1, collar: 'rope', seed: 81, lie: 1, lid: 1, tailWag: 0, wagAmp: 0.3, tailUp: 0.2, ears: -0.3 };
  P.sq = breathe(t, 7, 0.02);
  if (t >= 133.2) { P.ears = 1 * a104Env(t, 133.2, 135.2, 0.2); P.drop = -12 * a104Env(t, 133.3, 135.0, 0.3); P.earFlick = pulse(t, 133.25, 0.5) * 2; P.lid = t < 133.9 ? 1 : K.lerp(1, 0.5, a104E(t, 133.9, 0.4)); }
  if (t >= 134.9) { P.lid = 0.5; P.gaze = lookAt(a104DogHead(P), [300, 720]); }
  if (t >= 140.5 && t < 142.0) { P.drop = -16 * a104Env(t, 140.5, 142.0, 0.3); P.gaze = [0, -1]; P.lid = 0.3; }
  if (t >= 141.12 && t < 142.0) { P.tailWag = 1.6 * (pulse(t, 141.15, 0.3) + pulse(t, 141.5, 0.3)) * 2; P.wagAmp = 0.5; }
  if (t >= 155.6 && t < 157.26) { P.ears = 0.7 * a104E(t, 155.6, 0.25); P.earFlick = pulse(t, 155.65, 0.4); P.lid = t < 155.9 ? 1 : K.lerp(1, 0.35, a104E(t, 155.9, 0.3)); P.gaze = lookAt(a104DogHead(P), t < 156.3 ? [A104_OWNX, 760] : [A104_VISX, 760]); }
  if (t >= 156.1 && t < 169.5) { const up = settleTo(t, 156.1, 0, 1, 1.1, 0.05), dn = a104E(t, 158.6, 0.5); P.lie = 1 - K.clamp(up); P.sit = K.clamp(up); P.x = A104_ODOGX - 28 * K.clamp(up) * (1 - a104E(t, 168.0, 1.2)); P.lid = t < 157.0 ? P.lid : 0.25; P.tailWag = t * 4; P.wagAmp = 0.45 * (1 - dn * 0.5); P.tongue = 0.7 * a104E(t, 157.26, 0.2) * (1 - dn);
    P.raise = a104E(t, 156.75, 0.5) * (1 - a104E(t, 158.6, 0.35)); P.pawW = [A104_VISX + 4, 876]; P.sq = (P.sq || 1) * landSquash(t, 157.26, 0.07, 12); P.gaze = lookAt(a104DogHead(P), [A104_VISX, 700]); P.ears = 0.3; }
  if (t >= 160.44 && t < 169.5) { P.gaze = lookAt(a104DogHead(P), a104Head(a104Visitor(Math.min(t, 166)))); }
  if (t >= 167.6 && t < 169.5) P.gaze = lookAt(a104DogHead(P), a104Head(a104OwnerLite(t)));
  if (t >= 169.5) { P.lie = a104E(t, 169.5, 0.6); P.sit = 1 - P.lie; P.lid = K.lerp(0.25, 0.7, P.lie); P.tailWag = 1.6 * pulse(t, 170.0, 0.35) * 2; P.wagAmp = 0.5; }
  return P;
}
function a104Porter13(t) {
  const P = a104Mk('porter', { y: 900, dir: 1, mouth: 'o', lid: 0.1 });
  const xf = (tt) => kfn(tt, [[133.2, 60], [134.2, 100], [143.54, 100], [144.6, 150], [162.8, 150], [163.6, 110], [166.6, 110], [167.4, 30]], 'lin'); a104Walk(P, xf, t, 1, 18);
  P.gaze = lookAt(a104Head(P), [A104_OWNX, 760]); P.kneel = t >= 143.4 && t < 162.9 ? a104E(t, 143.4, 0.3) : 0;
  if (t >= 143.54 && t < 144.8) { P.handLW = [P.x + 50, 860]; P.handRW = [P.x + 60, 850]; P.gaze = [0.6, 0.6]; }
  if (t >= 157.3 && t < 158.6) P.mouth = 'smile';
  return a104Lid(P, t);
}
const a104ChestX13 = (t) => kfn(t, [[143.54, 160], [144.8, 250]]);

// ---------- the hut world ----------
function a104HutWorld(ctx, t) {
  const door = a104HutDoor(t);
  hutRoom(ctx, { ...A104_HUT, door, t, layer: 'back' });
  // cracked wall
  ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; ctx.beginPath(); [[300, 330], [318, 400], [304, 450], [324, 520]].forEach((p, i) => ctx[i ? 'lineTo' : 'moveTo'](p[0], p[1])); ctx.stroke(); ctx.restore();
  // the light shaft from the window onto the owner and the dog (164.95 on)
  const sh = 0.6 * a104E(t, 164.95, 1.2); if (sh > 0) { ctx.save(); ctx.globalAlpha = sh; ctx.fillStyle = '#fff3b0'; ctx.beginPath(); ctx.moveTo(690, 400); ctx.lineTo(830, 400); ctx.lineTo(800, 905); ctx.lineTo(500, 905); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.ellipse(650, 910, 190, 26, 0, 0, 7); ctx.fill(); ctx.restore(); }
  a104Bowl(ctx, 780, 915, 0.6, -1);
  const O = a104Owner(t), D = a104OldDog(t), V = a104Visitor(t), Pt = a104Porter13(t);
  person(ctx, O); a104Sandal(ctx, ...(t < 137.6 || t >= 168.8 ? a104Pt(O, 0, -92) : [O.x + 50, 896]), 0.75, t < 137.6 || t >= 168.8 ? -0.3 : 0);
  const dogFront = t >= 156.1 && t < 161.6;   // v2: while it greets the visitor the dog is drawn over his lap, so its face stays clear
  if (!dogFront) a104Dog(ctx, D);
  hutRoom(ctx, { ...A104_HUT, door, t, layer: 'front' });
  // the porter, the gift chest and the visitor stand inside the room, in front of the open door leaf
  if (t >= 133.4 && Pt.x > 20) { const cx = t < 143.54 ? 70 : t < 162.9 ? a104ChestX13(t) : kfn(t, [[162.9, 250], [163.6, 160]]); if (t < 163.6) a104Chest(ctx, cx, 900, 0.55, {}); person(ctx, Pt); if (t >= 163.6) { const hd = a104Head(Pt); a104Chest(ctx, hd[0] + 4, hd[1] - 30, 0.55, {}); } }
  if (t >= 133.2) person(ctx, V);
  if (V.purse && (V.alpha ?? 1) > 0.01) { ctx.save(); ctx.globalAlpha *= V.alpha ?? 1; const p = V.purse, sc = t < 161.5 ? 0.55 : K.lerp(0.55, 0.42, a104E(t, 161.6, 0.7)); a104Purse(ctx, p[0], p[1], sc, { glint: t >= 144.86 && t < 145.6 ? pulse(t, 144.86, 0.7) : undefined }); ctx.restore(); }
  if (dogFront) a104Dog(ctx, D);
  return { O, D, V, P: Pt };
}
