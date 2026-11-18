// ===== KD-026 hut (S7-S15, 63.41-170.16): supper and sleep, the double reach, the quarrel, the wake-up, the neighbours, the calm =====
// Geography (measured on hutRoom): walls 110..890, floor 900, door in the left wall (opening y 640..900), stool + lamp x 240 (moved from the
// plan's 430 so the argument spot is free), mat 440..700, sleeper hips x 580 (head x ~464, y ~854), cow lying at x 700 facing left, peg (860, 700),
// window 480..580 x 420..520, argument spot devil 300 / thief 390. See notes.md.
const K26_HUT = { palette: 'night', window: [480, 420, 100, 100], peg: [770, 730], mat: [350, 610], stool: 240, lampAt: [240, 852], niche: false, hook: false, jug: 160, shelf: [640, 800, 600] };
const K26_KNOT = [776, 734], K26_STOOLLAMP = [244, 852], K26_HOOK = [300, 700];
const K26_MID = 242;   // v2: the quarrel spot moved left (devil ~205, thief ~320) so the sleeper's head (x 444) has clear floor
const K26_REACHX = 682;   // v3: the double reach: thief just left of the cow's head (she is drawn in front of him); peg moved to (770, 730) so his arm can come about 20 short of the knot
const K26_SHOUTX = 515, K26_DLANDX = 700;   // v3: the thief kneels on the floor behind the sleeper's hips; the devil lands on the cow side
const K26_AX2 = 705, K26_TEND = 430, K26_DEND = 545;   // after the waking: neighbours at the door, intruders in the middle, the ascetic on the right
// ---------- positions ----------
const K26_HTX = k26Fn([[63.41, -120], [73.92, 30], [75.6, 450, 'lin'], [76.42, 450], [77.6, K26_REACHX, 'inOut'], [79.54, K26_REACHX], [80.5, 300, 'inOut'], [86.5, 300], [87.0, 312, 'out'], [105.8, 312], [106.35, 286, 'out'], [116.6, 290], [119.7, 296], [121.94, 290], [122.4, 306, 'out'],
  [125.94, 306], [126.3, K26_SHOUTX, 'lin'], [143.7, K26_SHOUTX], [144.3, K26_TEND, 'out'], [149.98, K26_TEND], [150.2, K26_TEND + 40, 'in'], [150.35, K26_TEND + 18, 'out'], [150.74, K26_TEND + 18]]);
const K26_HDX = (t) => (t < 76.42 ? Math.min(300, K26_HTX(t - 0.4)) : k26Path(t, [[76.42, 300], [77.4, 310, 'out'], [79.54, 310], [80.5, 185, 'inOut'], [86.5, 185], [87.0, 205, 'out'], [104.9, 205], [106.35, 180, 'out'], [118.7, 180], [118.96, 188, 'out'], [121.94, 188], [122.4, 175, 'out'],
  [133.64, 175], [134.49, K26_DLANDX, 'lin'], [143.7, K26_DLANDX], [144.2, K26_DEND, 'out'], [149.98, K26_DEND], [150.2, K26_DEND - 40, 'in'], [150.35, K26_DEND - 18, 'out'], [151.34, K26_DEND - 18]]));
const K26_HAX = k26Fn([[63.41, -40], [63.84, -40], [64.9, 222, 'out'], [65.3, 222], [66.1, 222], [66.9, 690, 'inOut'], [68.0, 696], [68.6, 620, 'inOut'], [69.0, 620], [69.6, 490, 'inOut']]);
const K26_HCX = k26Fn([[63.41, -180], [64.76, -180], [65.6, 150, 'out'], [66.2, 150], [66.95, 727, 'inOut'], [67.4, 832, 'out'], [157.18, 832], [158.0, 812, 'inOut']]);   // v3: cow s 0.72, rump past the corner post
const K26_HCOWTURN = [[0, 1], [66.95, -1]], K26_HCOWS = 0.72;   // v3: back from 0.55 (dog sized) to 0.72
const K26_HTFALLS = footfalls(K26_HTX, 73.92, 80.5, K26_STRIDE * 0.95), K26_HAFALLS = footfalls(K26_HAX, 63.84, 69.6, K26_STRIDE);
// sleep meter keys (value 0..10) and visibility
const K26_SLEEP = [[72.14, 0], [72.6, 10], [75.64, 10], [75.7, 9], [76.2, 10], [97.54, 10], [97.6, 8], [98.4, 9], [107.66, 9], [107.7, 8], [112.36, 8], [112.4, 7], [116.76, 7], [116.8, 6], [118.96, 6], [119.0, 5], [119.66, 5], [119.7, 4], [122.66, 4], [122.7, 3],
  [128.16, 3], [128.2, 2], [134.96, 2], [135.0, 1], [141.22, 1], [141.3, 0]];
const k26SleepV = (t) => { let v = K26_SLEEP[0][1]; for (const [a, x] of K26_SLEEP) if (t >= a) v = x; if (t < 72.6 && t >= 72.14) v = 10 * K.clamp((t - 72.14) / 0.45); return v; };
// door, lamp, darkness
const k26HDoor = (t) => (t < 66.3 ? (t < 63.84 ? 1 : 1 - k26B(t, 65.6, 0.6, 'inOut')) : t < 72.66 ? 0 : t < 73.9 ? 0.15 * k26B(t, 72.66, 0.3) : t < 75.9 ? k26Path(t, [[73.9, 0.15], [74.1, 0.65]]) : t < 146.4 ? 0.65 * (1 - k26B(t, 75.9, 0.4, 'inOut')) : t < 168.6 ? settleTo(t, 146.4, 0, 1, 0.45, 0.15) : 1 - k26B(t, 169.4, 0.5));
const k26HDark = (t) => (t < 71.95 ? 0.72 : t < 148.34 ? K.lerp(0.72, 1, k26B(t, 71.95, 0.15, 'lin')) : t < 156.54 ? K.lerp(1, 0.4, k26B(t, 148.34, 0.5)) : K.lerp(0.4, 0.22, k26B(t, 156.54, 0.6)));
function k26HutDark(ctx, dk, L, clip) {
  if (dk <= 0.01) return; ctx.save();
  if (clip) { ctx.beginPath(); for (const r of clip) ctx.rect(...r); ctx.clip(); }
  if (L && L.on > 0) { const R = L.R; const g = ctx.createRadialGradient(L.x, L.y, 20, L.x, L.y, R); g.addColorStop(0, `rgba(13,34,96,${(1 - L.on) * 0.62 * dk})`); g.addColorStop(0.7, `rgba(13,34,96,${(1 - 0.6 * L.on) * 0.62 * dk})`); g.addColorStop(1, `rgba(13,34,96,${0.62 * dk})`); ctx.fillStyle = g; }
  else { ctx.fillStyle = `rgba(13,34,96,${0.62 * dk})`; }
  ctx.fillRect(-200, 0, 1400, 1230); ctx.restore();
}
// ---------- cast ----------
function k26HutAscetic(t, W) {
  const P = { y: K26_GR, s: 1, dir: 1, costume: 'ascetic', mouth: 'smile', seed: 6 };
  if (t < 69.6) { Object.assign(P, walk(K26_HAX, t, { stride: K26_STRIDE, amp: 55 })); P.dir = t < 66.95 || t >= 69.0 ? 1 : -1; if (t >= 68.0 && t < 69.0) P.dir = -1; if (t >= 69.0) P.dir = -1;
    P.gaze = [P.dir, 0.1];
    if (t < 64.9) { P.handR = [56, -120]; P.drop = P.x < 160 && P.x > 40 ? 12 : 0; P.lid = 0.3; }
    if (k26In(t, 64.9, 65.3)) { P.handRW = [K26_STOOLLAMP[0] + 16, K26_STOOLLAMP[1] - 14]; P.tip = 0.18 * pulse(t, 64.9, 0.6); }
    if (k26In(t, 65.3, 66.1)) { P.gaze = [-1, 0.2]; P.mouth = 'smile'; }
    if (k26In(t, 66.1, 66.9)) { P.handL = [-52, -116]; }
    if (k26In(t, 66.4, 68.0)) { P.handRW = [K26_KNOT[0] + 8 * Math.cos(t * 12), K26_KNOT[1] + 8 * Math.sin(t * 12)]; P.dir = 1; P.mouth = 'o'; P.gaze = lookAt([P.x, 700], K26_KNOT); if (t > 67.1) { P.handRW = [K26_KNOT[0] - 10 - 14 * pulse(t, 67.1, 0.3), K26_KNOT[1] + 4]; P.mouth = 'smile'; P.gaze = lookAt([P.x, 700], W.cowHead); } }
    if (k26In(t, 68.6, 69.0)) { P.handR = [70, -60]; P.dir = -1; }
    if (k26In(t, 68.16, 68.6)) P.handRW = [W.cowHead[0] + 10, W.cowHead[1] - 30 + 6 * Math.sin(t * 20)];
  } else if (t < 72.14) { P.x = 490; P.y = 888; P.sit = k26B(t, 69.6, 0.3, 'inOut'); P.seat = 'floor'; P.dir = -1; P.gaze = [-0.3, 0.4];
    const sp = [69.95, 70.35, 70.75]; let near = 0; for (const a of sp) near = Math.max(near, pulse(t, a, 0.35));
    P.handL = [18, -118]; P.handR = [K.lerp(26, 10, near), K.lerp(-122, -168, near)]; P.mouth = near > 0.5 ? 'o' : 'closed'; P.talk = t > 71.0 && t < 71.4 ? 0.4 * Math.abs(Math.sin(t * 20)) : 0;
    if (k26In(t, 71.05, 71.45)) { P.handR = [14, -166]; P.mouth = 'o'; }
    if (k26In(t, 71.5, 71.85)) { P.aL = [-2.6, -2.9]; P.aR = [2.6, 2.9]; P.handL = null; P.handR = null; P.mouth = 'open'; P.lid = 1; P.sq = 1.03; }
    if (k26In(t, 71.85, 72.14)) { P.mouth = 'o'; P.sq = anticipate(t, 71.8, 0.1, 0.05); P.tip = 0.12; P.gaze = [-1, 0.3]; P.handL = [20, -110]; P.handR = [28, -112]; }
  } else if (t < 143.7) { // asleep
    const u = k26B(t, 72.14, 0.45, 'inOut'); P.x = K.lerp(490, 510, u); P.y = 888; P.sit = 1 - u; P.seat = 'floor'; P.lie = u; P.dir = 1; P.lid = 1; P.mouth = 'o'; P.noBlink = true;
    P.tilt = 0.06 * Math.sin(t * 1.9) + 0.15 * pulse(t, 75.64, 0.8); P.sq = 1 + 0.02 * Math.sin(t * 2.2);
    P.handL = [16, -100]; P.handR = [24, -96];
    if (k26In(t, 97.54, 98.6)) { P.handR = [26 + 4 * Math.sin(t * 30), -172]; P.brow = 0.5; P.mouth = t < 97.9 ? 'open' : 'closed'; }
    if (t >= 111.9 && t < 141) { const r = k26B(t, 111.9, 0.35); P.x -= 6 * r;   /* v3: 6 (was 26) so the head stays where it was in v2 now that he lies 20 further left */ P.tilt += 0.18 * r; P.aR = t < 112.4 ? [K.lerp(0.4, -2.5, k26B(t, 112.05, 0.3)), K.lerp(0.3, -2.3, k26B(t, 112.05, 0.3))] : t < 113.0 ? [K.lerp(-2.5, -2.0, k26B(t, 112.4, 0.6)), -2.1] : [-2.0, -2.1]; P.handR = null; }
    if (t >= 119.7) P.brow = 0.6; if (k26In(t, 127.34, 128.8)) { P.x += tremble(t, 4, 10); P.tilt += tremble(t, 0.08, 7); }
    if (t >= 139.52) { P.brow = t < 139.9 ? 0.2 : t < 140.54 ? 0.8 : 1; P.mouth = t >= 140.54 ? 'frown' : 'o'; P.tilt += 0.06 * pulse(t, 139.6, 0.3);
      if (t >= 142.0) { P.lid = 0; P.wink = t < 142.4 ? 'R' : null; P.mouth = 'o'; P.brow = t < 142.9 ? 0.3 : -0.9; P.eyes = t >= 142.9 ? 'wide' : 'open';
        P.gaze = t < 142.9 ? [0, 0] : gazePlan(t, [[142.9, [-1, 0]], [143.2, [1, 0]], [143.45, [0, 0.05]]], 0.07); } }
  } else { // awake, standing guard, then the calm
    const up = k26B(t, 143.75, 0.25, 'out'); P.x = k26Path(t, [[143.75, 515], [144.25, K26_AX2, 'out']]); P.lie = 1 - up; P.y = t < 144.25 ? K.lerp(888, K26_GR, K.clamp((t - 143.75) / 0.5)) - 70 * Math.sin(Math.PI * K.clamp((t - 143.75) / 0.5)) : K26_GR; P.sq = t < 144.25 ? 1.12 : landSquash(t, 144.25, 0.14); P.tilt = 0.22 * (1 - k26B(t, 146.0, 1.0));
    P.dir = 1; P.eyes = t < 154.88 ? 'wide' : 'open'; P.brow = 1; P.mouth = 'frown'; P.gaze = lookAt([P.x, 700], [K26_TEND + 50, 700]);
    if (t >= 144.44 && t < 154.88) { P.hold = 'stick'; P.handR = [40, -140]; P.handL = [20, -120]; }
    if (k26In(t, 145.14, 148.8)) P.gaze = lookAt([P.x, 700], [140, 760]);
    if (k26In(t, 148.8, 150.7)) P.gaze = lookAt([P.x, 700], [K26_TEND + 50, 700]);
    if (k26In(t, 150.7, 152.4)) P.gaze = lookAt([P.x, 700], [530, 470]);
    if (k26In(t, 152.4, 154.88)) { P.gaze = lookAt([P.x, 700], [K26_DEND, 890]); P.brow = -0.4; P.mouth = 'o'; P.handR = [-24, -118]; }   // v3: stick held across his body, clear of the knot (STILL TIED)
    if (t >= 154.88) { const s = k26B(t, 155.5, 0.7, 'inOut'); P.y = K.lerp(K26_GR, 888, s); P.sit = s; P.seat = 'floor'; P.brow = -0.2; P.mouth = 'smile'; P.handR = t < 156.4 ? PERSON_HANDS.chest.R : [50, -110]; P.lid = k26In(t, 155.6, 156.0) ? 1 : 0.15;
      P.gaze = lookAt([P.x, 700], W.cowHead); P.drop = 4 * pulse(t, 155.0, 1.2); }
    if (k26In(t, 158.68, 159.8)) { P.handRW = [W.cowHead[0] - 10, W.cowHead[1] + 10]; P.lid = 1; P.mouth = 'open'; P.talk = 0.5 + 0.4 * Math.abs(Math.sin(t * 12)); P.tilt = 0.12; P.wet = true; }
    if (k26In(t, 165.08, 166.6)) { P.handLW = t < 165.5 ? [K.lerp(P.x - 40, 610, k26B(t, 165.08, 0.3)), K.lerp(800, 880, k26B(t, 165.08, 0.3))] : null; if (t >= 165.5) P.handL = [-30, -170]; P.brow = -0.6; P.mouth = 'o'; P.gaze = t < 165.9 ? lookAt([P.x, 700], [600, 870]) : lookAt([P.x, 700], W.cowHead);
      if (t >= 165.9) { P.handL = PERSON_HANDS.palmsUp.L; P.handR = PERSON_HANDS.palmsUp.R; P.mouth = 'smile'; P.brow = 0; } }
    if (k26In(t, 166.66, 168.2)) { P.handL = [-64, -196 + 8 * Math.sin(t * 12)]; P.gaze = lookAt([P.x, 700], [140, 700]); P.mouth = 'smile'; }
    if (t >= 168.2) { P.lid = k26B(t, 168.4, 0.8); P.noBlink = true; P.mouth = 'smile'; }
  }
  return P;
}
function k26HutCow(t, W) {
  const tf = turnFlip(t, K26_HCOWTURN, 0.5);
  const P = { y: K26_GR, s: K26_HCOWS, ...walk(K26_HCX, t, { stride: K26_COWSTRIDE * K26_HCOWS, amp: 50 }), dir: tf.dir, lid: 0.3, seed: 4 };
  P.tailSwish = Math.sin(t * 2.1) * 0.5; P.bell = Math.sin(t * 6) * 0.25 * P.amp;
  P.lie = t < 67.4 ? 0 : t < 157.18 ? settleTo(t, 67.4, 0, 1, 0.6, 0.06) : t < 158.1 ? 1 - k26B(t, 157.18, 0.4) : k26B(t, 158.1, 0.45, 'inOut');
  if (k26In(t, 65.2, 66.0)) P.sq = t < 65.5 ? 0.86 : settleTo(t, 65.5, 0.86, 1, 0.45, 0.2);
  P.gaze = [P.dir, 0.1];
  if (k26In(t, 65.6, 66.1)) P.gaze = look(t, [150, 740], [[65.6, [400, 600]], [65.85, [260, 700]]], 0.1);
  if (k26In(t, 68.16, 69.0)) { P.ears = -0.3; P.lid = 0.7; }
  if (k26In(t, 69.84, 71.5)) P.chew = (t - 69.84) * 2.5;
  const T = W.T, D = W.D;
  if (t >= 72.14) { P.lid = 0.85; P.gaze = lookAt(W.cowHead, [W.lastX, 700]); }
  if (k26In(t, 78.0, 80.2)) P.lid = 0.25;   // v3: eyes open on the thief from 78.0
  if (k26In(t, 94.26, 95.0)) { P.ears = 0.8 * Math.sin((t - 94.26) * 30); P.lid = 0.85; }
  if (t >= 117.86 && t < 145.14) { P.lid = 0.05; P.headUp = 22; const turn = Math.floor((t - 117.86) / 0.45) % 2 === 0; const tgt = turn ? [D.x, 690] : [T.x, 712]; P.gaze = lookAt(W.cowHead, tgt); P.headA = turn ? 0.08 : -0.08; P.ears = 0.6; }
  if (k26In(t, 122.74, 123.66)) { P.lid = 1; P.ears = 1; P.headDown = 0.25; P.noBlink = true; }
  if (k26In(t, 123.66, 139.52)) { P.gaze = lookAt(W.cowHead, t < 133.64 ? [T.x, 712] : [D.x, 690]); P.headA = 0; }
  if (k26In(t, 138.54, 139.6)) { P.headA = -0.25 * (pulse(t, 138.54, 0.33) + pulse(t, 138.87, 0.33) + pulse(t, 139.2, 0.33)); P.bell = swing(t, 138.6, 0.6); P.gaze = lookAt(W.cowHead, [D.x, 690]); }
  if (k26In(t, 139.52, 145.14)) { P.eyes = 'wide'; P.lid = 0; P.gaze = lookAt(W.cowHead, [K26_AX2, 700]); }
  if (k26In(t, 145.14, 152.4)) { P.lid = 0; P.gaze = lookAt(W.cowHead, t < 148.8 ? [140, 760] : t < 150.7 ? [K26_TEND + 50, 700] : [530, 470]); }
  if (k26In(t, 152.4, 154.88)) { P.gaze = t < 153.9 ? lookAt(W.cowHead, K26_KNOT) : [0, 0.05]; P.chew = t * 2; P.lid = 0.3; }
  if (t >= 154.88) { P.gaze = lookAt(W.cowHead, [K26_AX2, 690]); P.lid = 0.3; }
  if (k26In(t, 158.68, 159.6)) { P.headUp = 40; P.headA = 0.45 * pulse(t, 158.68, 0.9); P.talk = 0.35 * pulse(t, 158.7, 0.8); P.lid = 0.6; }
  if (k26In(t, 165.08, 166.4)) { P.talk = 0.4 * pulse(t, 165.9, 0.5); P.headUp = 10; }
  if (t >= 168.2) { P.lid = Math.max(0.3, k26B(t, 168.6, 0.8)); P.noBlink = true; }
  return P;
}
function k26HutThief(t, W) {
  const sneak = t < 77.6 && !k26In(t, 75.6, 76.42);
  const P = { kind: 'thief', y: K26_GR, s: 0.95, dir: 1, ...walk(K26_HTX, t, { stride: K26_STRIDE * 0.95, amp: 40 }), mouth: 'closed', seed: 8 };
  const myH = [P.x, 712], dH = [W.D.x, 690], sleepH = [394, 854];
  P.gaze = lookAt(myH, sleepH);
  if (t < 75.6) { P.handR = PERSON_HANDS.hush.R; P.tip = 0.12; }
  if (sneak) { P.tip = 0.12; P.y -= Math.abs(Math.sin(P.ph)) * 6 * P.amp; if (t >= 76.42) { P.handL = [22, -132]; P.handR = [30, -122]; P.gaze = lookAt(myH, K26_KNOT); } }
  if (k26In(t, 75.6, 76.42)) { const fr = walk(K26_HTX, 75.45, { stride: K26_STRIDE * 0.95, amp: 40 }); P.ph = fr.ph; P.amp = 1; P.tip = 0.12; P.gaze = [0, 0.05]; P.eyes = 'wide'; P.noBlink = true; P.handR = PERSON_HANDS.hush.R; if (t > 76.1) { P.amp = 0; P.mouth = 'o'; P.eyes = 'open'; } }
  if (k26In(t, 77.6, 79.54)) { P.tip = 0.2; P.handRW = [K26_KNOT[0] - 20, K26_KNOT[1] + 4]; P.tip = 0.26; P.mouth = 'open'; P.gaze = lookAt(myH, K26_KNOT); P.noBlink = true; if (t >= 78.82) { P.gaze = gazePlan(t, [[78.82, lookAt(myH, dH)]], 0.07); P.eyes = 'wide'; P.mouth = 'o'; } }
  if (k26In(t, 79.54, 80.5)) { P.dir = -1; P.handL = [-60 + 20 * Math.sin(t * 30), -170]; P.handR = [60 - 20 * Math.sin(t * 30), -170]; P.mouth = 'o'; P.gaze = lookAt(myH, dH); }
  if (t >= 80.5) { P.dir = -1; P.gaze = lookAt(myH, dH); P.look = 0.6; }   // v2: turned in toward the devil
  if (k26In(t, 86.5, 100.0)) { P.sq = 0.94; P.tip = -0.05; }   // the devil looms, the thief shrinks
  if (k26In(t, 80.56, 82.1)) { P.tip = 0.08; P.talk = Math.floor((t - 80.56) / 0.35) % 2 === 0 ? 0.4 : 0; if (P.talk) P.handR = [70, -125]; }
  if (k26In(t, 82.18, 83.5)) { P.handR = PERSON_HANDS.chest.R; P.talk = talk(t, [[82.18, 83.0]]) * 0.5; P.tip = 0.06; }
  if (k26In(t, 83.58, 85.18)) { P.handR = [(P.x - K26_MID) / 0.95, (765 - 900) / 0.95]; P.tip = 0.06; P.mouth = 'frown'; P.gaze = lookAt(myH, [K26_MID, 770]); }
  // S9 listens to the devil
  if (k26In(t, 85.18, 86.7)) { P.tip = -0.1 * pulse(t, 85.6, 1.1); }
  if (k26In(t, 88.0, 91.5)) { P.handL = PERSON_HANDS.folded.L; P.handR = PERSON_HANDS.folded.R; P.drop = -4; P.mouth = 'frown'; if (k26In(t, 89.86, 90.5)) P.look = 0.6 * Math.sin((t - 89.86) * 20); }
  if (k26In(t, 91.52, 93.6)) { P.gaze = lookAt(myH, [W.D.x + 20, 600]); P.mouth = 'frown'; }
  if (k26In(t, 93.66, 95.1)) { P.gaze = lookAt(myH, W.cowHead); P.eyes = 'wide'; P.noBlink = true; P.mouth = 'o'; }
  if (k26In(t, 95.22, 96.5)) { const f = Math.sin(t * 28) * 14; P.handL = [-50, -150 + f]; P.handR = [50, -150 - f]; P.eyes = 'wide'; P.mouth = 'open'; P.gaze = lookAt(myH, dH); }
  if (k26In(t, 96.6, 97.5)) P.gaze = lookAt(myH, sleepH);
  if (k26In(t, 97.54, 98.6)) { P.eyes = 'wide'; P.noBlink = true; P.gaze = lookAt(myH, sleepH); P.mouth = 'o'; P.look = -0.7; P.tip = 0; }
  if (k26In(t, 98.64, 99.9)) P.gaze = lookAt(myH, [W.D.x + 40, 720]);
  if (k26In(t, 100.0, 101.6)) { P.handL = PERSON_HANDS.folded.L; P.handR = PERSON_HANDS.folded.R; P.lid = 1; P.noBlink = true; P.drop = -6; P.look = 0.8; P.mouth = 'frown'; }
  if (k26In(t, 101.7, 102.7)) { P.look = 0.7 * Math.sin((t - 101.7) * 14) * (t < 102.2 ? 1 : 0); P.handL = PERSON_HANDS.folded.L; P.handR = PERSON_HANDS.folded.R; P.mouth = 'frown';
    const lift = t < 102.2 ? k26B(t, 101.9, 0.2) : 1 - k26B(t, 102.25, 0.4, 'inOut'); P.ph = Math.PI / 2; P.amp = 0.9 * lift; P.sq = anticipate(t, 101.75, 0.15, 0.05); if (t > 102.2) P.gaze = lookAt(myH, sleepH); }
  if (k26In(t, 102.76, 103.52)) { P.handL = [24, -120]; P.handR = [16 + 6 * Math.sin(t * 25), -128]; P.mouth = 'frown'; P.gaze = lookAt(myH, dH); }
  // S10: the thief's case
  if (k26In(t, 103.52, 105.2)) { P.handR = t < 104.0 ? [60, -230 + 60 * k26B(t, 103.52, 0.3)] : PERSON_HANDS.pointUp.R; P.tip = 0.1; P.drop = -6; P.talk = talk(t, [[104.9, 105.2]]) * 0.6; }
  if (k26In(t, 105.8, 107.0)) { P.handR = t < 106.2 ? [(P.x - W.D.x - 40) / 0.95, -120] : PERSON_HANDS.chest.R; P.mouth = 'smile'; P.talk = talk(t, [[106.3, 107.0]]) * 0.6; }
  if (k26In(t, 107.06, 108.9)) { P.handL = [-104, -150]; P.handR = PERSON_HANDS.pointUp.R; P.talk = talk(t, [[107.06, 108.4]], 2) * 0.8; P.gaze = t < 107.6 ? lookAt(myH, W.cowHead) : lookAt(myH, dH); P.tip = 0.08; if (t >= 108.3) { P.handR = [118, -150]; P.handL = [-30, -120]; P.tip = 0.12 + 0.06 * pulse(t, 108.3, 0.3); } }
  if (k26In(t, 109.0, 109.64)) { P.handR = [44 + 10 * Math.sin(t * 30), -215]; }
  if (k26In(t, 109.64, 111.4)) { P.handL = [-22, -238 + 6 * Math.sin(t * 16)]; P.handR = [22, -238 - 6 * Math.sin(t * 16)]; P.mouth = 'open'; P.talk = 0.3; P.lid = 0.3; }
  if (k26In(t, 111.44, 113.06)) { P.eyes = 'wide'; P.noBlink = true; P.gaze = lookAt(myH, [390, 880]); P.mouth = 'o'; P.look = -0.7; if (t > 112.4) { P.tip = -0.2; P.handL = [-(70 - 30 * k26B(t, 112.5, 0.4)), -60]; } }
  if (k26In(t, 113.06, 115.2)) { P.handL = PERSON_HANDS.palmsUp.L; P.handR = PERSON_HANDS.palmsUp.R; P.talk = talk(t, [[113.4, 115.1]], 1) * 0.7; P.gaze = lookAt(myH, dH); }
  if (k26In(t, 115.22, 115.78)) { const h = Math.sin((t - 115.22) * 17); P.tip = -0.15; P.handL = [-50 - 14 * h, -130]; P.handR = [-30 - 14 * h, -140]; P.mouth = 'closed'; }
  // S11 louder
  if (k26In(t, 116.6, 120.76)) { P.tip = 0.06; P.talk = talk(t, [[116.6, 117.8], [119.66, 120.6]]) * 0.9; P.handR = [70, -150]; if (t >= 119.7) { const [, l] = hop(t, 119.7, 0.35, 0, 0, 22); P.y -= l; P.handR = PERSON_HANDS.pointUp.R; } }
  if (k26In(t, 120.76, 121.94)) { P.tip = -0.12; P.handR = [(P.x - (K26_MID + 6 * Math.sin(t * 9))) / 0.95, -128]; P.handL = [(P.x - K26_MID - 20) / 0.95 - 20, -126]; P.x += tremble(t, 2, 12); P.mouth = 'closed'; P.tilt = -0.1; }
  if (k26In(t, 121.94, 123.66)) { P.handR = [40, -150]; P.eyes = t < 122.74 ? 'wide' : 'open'; P.gaze = t < 122.74 ? lookAt(myH, [P.x - 40, 760]) : lookAt(myH, dH); P.brow = 1; P.mouth = t < 122.74 ? 'o' : 'frown'; P.sq = t >= 122.74 ? 1 + 0.025 * Math.sin(t * 16) : 1; }
  // S12 the idea, the shout
  if (k26In(t, 123.66, 125.0)) { P.gaze = gazePlan(t, [[123.66, lookAt(myH, dH)], [123.9, lookAt(myH, sleepH)], [124.3, lookAt(myH, dH)], [124.6, lookAt(myH, sleepH)]], 0.07); P.mouth = 'smile'; P.handR = [40, -150]; }
  if (k26In(t, 125.0, 125.94)) { P.tip = -0.15; P.sq = K.lerp(1, 0.92, k26B(t, 125.0, 0.7)); P.drop = -10; P.mouth = 'o'; P.handL = [-40, -110]; P.handR = [40, -110]; }
  if (t >= 125.94 && t < 143.7) { P.dir = t < 134.0 ? -1 : 1; P.look = 0.5; P.gaze = lookAt([P.x, 740], sleepH); const [, l] = hop(t, 125.94, 0.36, 0, 0, 50); P.y -= l; P.sq = landSquash(t, 126.3, 0.15);
    // v3: lands kneeling on the floor behind the sleeper's hips (window side of the head), leaning over the head; only a hand touches him
    P.kneel = t < 126.3 ? 0 : k26B(t, 126.3, 0.2); P.tip = t < 134.0 ? 0.12 : 0.04;
    if (t < 127.72) { P.handL = [-40, -150]; P.handR = [60, -175]; P.talk = talk(t, [[126.86, 127.32]]) * 0.6; P.eyes = 'wide'; P.noBlink = true; }
    else if (t < 128.12) { P.sq = settleTo(t, 127.72, 1, 1.1, 0.35); P.handR = PERSON_HANDS.cupMouth.R; P.handL = [-34, -178]; P.talk = talk(t, [[127.72, 128.1]]) * 0.8; }
    else if (t < 128.8) { const A = W.A; P.handRW = [A.x - 70 + 6 * Math.sin(t * 40), 862 + 4 * Math.cos(t * 40)]; P.handL = [-34, -178]; P.talk = talk(t, [[128.12, 128.7]]) * 0.8; P.gaze = lookAt([P.x, 740], sleepH); }   // shakes his shoulder
    else if (t < 129.88) { P.handR = PERSON_HANDS.cupMouth.R; P.handL = [-34, -178]; P.tip = 0.2; P.talk = 1; P.sq = 1.06; P.eyes = 'wide'; }
    else if (t < 131.7) { P.handR = [118, -158]; P.handL = [-30, -110]; P.talk = t < 130.56 ? 0.5 : 0.9; P.gaze = lookAt(myH, dH); P.tip = 0.08 + 0.05 * pulse(t, 130.56, 0.3); P.brow = 1; }
    else if (t < 132.42) { const d = k26B(t, 131.7, 0.5, 'inOut'); P.handL = [-K.lerp(80, 42, d), K.lerp(-262, -176, d)]; P.handR = [K.lerp(80, 42, d), K.lerp(-262, -176, d)]; P.talk = 0.6; P.gaze = lookAt(myH, dH); P.tip = 0.04;   // the sack over a head
      if (t >= 132.25) { P.handL = [-40, -110]; P.handR = [40, -110]; } }
    else if (t < 133.64) { P.gaze = lookAt(myH, dH); P.mouth = 'smile'; P.handL = PERSON_HANDS.folded.L; P.handR = PERSON_HANDS.folded.R; P.tip = 0; }
    else if (t < 134.96) { P.gaze = lookAt(myH, dH); P.mouth = 'o'; P.handR = [40, -120]; P.eyes = 'wide'; }
    else if (t < 136.26) { P.mouth = 'open'; P.eyes = 'wide'; P.noBlink = true; P.drop = 6; P.gaze = lookAt(myH, dH); }
    else if (t < 138.54) { P.handR = PERSON_HANDS.chest.R; P.handL = [-40, -110]; P.mouth = 'o'; P.brow = -0.6; P.look = 0.6 * Math.sin((t - 136.4) * 9); P.gaze = [0, 0.05]; P.drop = -2; }   // his own "who, me?"
    else { P.handR = [96, -172]; P.gaze = lookAt(myH, dH); P.mouth = 'frown'; P.brow = 1; P.sq = 1 + 0.02 * Math.sin(t * 14); }   // crossed pointing, short of the devil
    if (t >= 139.52) { P.handR = [96, -172]; if (t >= 142.9) { P.eyes = 'wide'; P.gaze = lookAt(myH, [560, 800]); P.mouth = 'o'; } } }
  if (t >= 143.7 && t < 149.98) { P.dir = 1; P.handLW = null; P.handR = [70, -170]; P.handL = [60, -150]; P.eyes = 'wide'; P.mouth = 'open'; P.noBlink = true; P.x += tremble(t, 2.5, 11); P.gaze = lookAt([P.x, 712], [K26_AX2, 700]);
    if (t >= 145.14) P.gaze = lookAt([P.x, 712], [140, 760]);
    if (t >= 148.86) { P.handL = [-40, -96]; P.handR = [-34, -100]; P.mouth = 'o'; P.gaze = [0.3, -1]; P.x = K26_HTX(t); P.eyes = 'open'; P.lid = 0.3; P.noBlink = true; P.tilt = 0.1 * Math.sin(t * 6); } }
  if (t >= 149.98 && t < 150.74) { P.ph = t * 40; P.amp = 1; P.eyes = 'wide'; P.mouth = 'open'; P.tip = 0.15; P.handL = [-40, -150]; P.handR = [40, -150]; if (t > 150.35) { P.dir = -1; P.sq = 0.9; } }
  if (t >= 150.74) { const u = K.clamp((t - 150.74) / 0.7), x0 = K26_TEND + 18; P.x = K.lerp(x0, 530, u); P.y = K.lerp(K26_GR, 500, u) - 150 * Math.sin(Math.PI * u); P.rot = -1.3 * u; P.sq = 1.1; P.dir = 1; P.handL = PERSON_HANDS.reachBoth.L; P.handR = PERSON_HANDS.reachBoth.R; P.ph = t * 30; P.amp = 1; P.s = 0.95 * (1 - 0.4 * u); P.eyes = 'wide'; P.mouth = 'open'; }
  return P;
}
function k26HutDevil(t, W) {
  const sneak = t < 77.4 && !k26In(t, 75.6, 76.42);
  const P = { x: K26_HDX(t), y: K26_GR, s: 1.08, dir: 1, mouth: 'smile', lid: 0.4, seed: 12, ...walk(K26_HDX, t, { stride: K26_STRIDE * 1.08, amp: 45 }) };
  const myH = [P.x, 690], tH = [W.T.x, 712], sleepH = [394, 854];
  P.gaze = lookAt(myH, sleepH);
  if (sneak && t >= 74.3) { P.tailHold = true; P.tip = 0.08; P.capeLag = 30 * P.amp; P.sack = { open: 0, rot: -2.6 }; P.handR = [30, -200]; P.y -= Math.abs(Math.sin(P.ph)) * 5 * P.amp; }
  if (k26In(t, 75.6, 76.42)) { const fr = walk(K26_HDX, 75.45, { stride: K26_STRIDE * 1.08, amp: 45 }); P.ph = fr.ph; P.amp = 1; P.tailHold = true; P.sack = { open: 0, rot: -2.6 }; P.handR = [30, -200]; P.gaze = [0, 0.05]; P.eyes = 'wide'; P.lid = 0; P.noBlink = true; if (t > 76.1) { P.amp = 0; P.eyes = 'open'; P.mouth = 'o'; } }
  if (k26In(t, 76.42, 77.78)) { P.sack = { open: k26B(t, 77.0, 0.5), rot: Math.PI }; P.handR = [60, -170]; P.gaze = lookAt(myH, sleepH); P.lid = 0.5; }
  if (k26In(t, 77.78, 79.54)) { const d = k26B(t, 77.78, 1.0, 'inOut'); P.sack = { open: 1, rot: Math.PI }; P.handRW = [386, K.lerp(740, 776, d)]; P.tip = 0.12; P.mouth = 'open'; P.lid = 0.3; P.noBlink = true; if (t >= 78.82) { P.gaze = gazePlan(t, [[78.82, lookAt(myH, tH)]], 0.07); P.eyes = 'wide'; P.lid = 0; P.mouth = 'o'; } }
  if (k26In(t, 79.54, 80.5)) { P.handL = [-60 + 20 * Math.sin(t * 30 + 1), -170]; P.handR = [60 - 20 * Math.sin(t * 30 + 1), -170]; P.mouth = 'o'; P.gaze = lookAt(myH, tH); P.sack = null; }
  if (t >= 80.5) { P.gaze = lookAt(myH, tH); P.look = 0.6; }
  if (k26In(t, 86.5, 100.0)) { P.sq = 1.05; P.tip = 0.08; }   // v2: he looms during his case
  if (k26In(t, 80.56, 82.1)) { P.tip = 0.08; P.talk = Math.floor((t - 80.56) / 0.35) % 2 === 1 ? 0.4 : 0; if (P.talk) P.handR = [70, -125]; P.lid = 0.3; }
  if (k26In(t, 83.58, 85.18)) { P.handRW = [K26_MID, 765]; P.talk = talk(t, [[83.58, 84.4]], 1) * 0.5; P.mouth = 'frown'; P.gaze = lookAt(myH, [K26_MID, 770]); }
  // S9 his case
  if (k26In(t, 85.18, 86.7)) { P.handRW = null; P.handR = [40, -150]; P.handL = [-30, -230]; P.lid = 0.45; P.talk = talk(t, [[86.5, 86.7]]) * 0.4; P.drop = -4; }
  if (k26In(t, 86.7, 87.64)) { P.handR = PERSON_HANDS.cupMouth.R; P.talk = 0.4; }
  if (k26In(t, 87.64, 88.78)) { P.handR = t < 88.1 ? PERSON_HANDS.chest.R : [60 + 40 * k26B(t, 88.1, 0.6), -170 + 80 * k26B(t, 88.1, 0.6)]; P.talk = talk(t, [[88.2, 88.7]]) * 0.5; P.mouth = 'smile'; }
  if (k26In(t, 88.78, 91.52)) { P.handR = t < 89.86 ? [40, -140] : [60, -200]; P.talk = talk(t, [[88.78, 90.5]], 2) * 0.5; P.lid = 0.4; P.mouth = 'smile'; P.gaze = lookAt(myH, [300, 400]); }
  if (k26In(t, 91.52, 93.66)) { P.handR = [44 + 14 * Math.sin(t * 16), -215]; P.brow = 0.8; P.talk = talk(t, [[91.52, 93.5]], 1) * 0.5; P.gaze = lookAt(myH, tH); }
  if (k26In(t, 93.66, 95.1)) { P.gaze = lookAt(myH, W.cowHead); P.eyes = 'wide'; P.lid = 0; P.noBlink = true; P.mouth = 'o'; }
  if (k26In(t, 95.22, 96.5)) { P.handL = [-30, -182]; P.handR = PERSON_HANDS.cupMouth.R; P.drop = -10; P.mouth = 'o'; P.lid = 0.6; }
  if (k26In(t, 96.6, 97.5)) { P.handR = PERSON_HANDS.pointDown.R; P.drop = 6 * pulse(t, 96.9, 0.4); P.gaze = lookAt(myH, sleepH); P.mouth = 'closed'; }
  if (k26In(t, 97.54, 98.6)) { P.eyes = 'wide'; P.lid = 0; P.noBlink = true; P.gaze = lookAt(myH, sleepH); P.mouth = 'o'; P.tip = 0; P.sq = 1; }
  if (k26In(t, 98.64, 99.9)) { P.sack = { open: 1, rot: Math.PI + 0.3 * Math.sin(t * 22) }; P.handR = [60, -210]; P.wet = true; P.mouth = 'frown'; P.brow = -0.7; P.lid = 0.2; P.gaze = [0.2, 0.05]; }
  if (k26In(t, 100.0, 103.52)) { P.lid = 0.6; P.mouth = 'closed'; P.handL = PERSON_HANDS.folded.L; P.handR = PERSON_HANDS.folded.R; }
  if (k26In(t, 102.76, 103.52)) { P.tailLash = 0.6 * Math.sin(t * 16); P.steam = 1; P.brow = 1; }
  // S10 listens
  if (k26In(t, 103.52, 105.2)) { P.tip = -0.1; P.lid = 0.3; P.mouth = 'o'; }
  if (k26In(t, 105.2, 105.8)) { P.handR = [60, -140]; }
  if (k26In(t, 105.8, 107.0)) { P.handR = [60, -140]; P.gaze = lookAt(myH, [P.x + 60, 760]); P.mouth = 'o'; P.eyes = 'wide'; }
  if (k26In(t, 107.0, 116.6)) { P.lid = 0.5; P.mouth = 'closed'; P.handL = PERSON_HANDS.folded.L; P.handR = PERSON_HANDS.folded.R; P.tailLash = 0.15 * Math.sin(t * 4); P.tip = -0.06 - 0.06 * pulse(t, 108.3, 0.5); }
  if (k26In(t, 103.52, 116.6)) P.tip = Math.min(P.tip || 0, -0.06);   // v2: the listener leans back
  if (k26In(t, 109.64, 111.4)) { P.brow = 1; P.mouth = 'frown'; }
  if (k26In(t, 111.44, 113.06)) { P.eyes = 'wide'; P.lid = 0; P.noBlink = true; P.gaze = lookAt(myH, [390, 880]); }
  if (k26In(t, 115.78, 116.6)) { P.lid = 1 - Math.abs(1 - 2 * K.clamp((t - 115.78) / 0.6)); P.noBlink = true; }
  // S11
  if (k26In(t, 116.6, 120.76)) { P.tip = 0.06; P.talk = talk(t, [[117.9, 119.6]], 1) * 0.9; P.handR = [70, -150]; P.brow = 1; P.lid = 0.2; if (t >= 118.96) { P.sq = 1.06; P.capeFlare = 1; } }
  if (k26In(t, 120.76, 121.94)) { P.tip = -0.12; P.handRW = [K26_MID + 6 * Math.sin(t * 9) - 18, 772]; P.handL = [40, -130]; P.x += tremble(t, 2, 12); P.mouth = 'closed'; P.tilt = 0.1; P.brow = 1; }
  if (k26In(t, 121.94, 123.66)) { P.handR = [50, -150]; P.eyes = t < 122.74 ? 'wide' : 'open'; P.brow = 1; P.mouth = t < 122.74 ? 'o' : 'frown'; P.sq = t >= 122.74 ? 1 + 0.025 * Math.sin(t * 15 + 1) : 1; P.lid = 0.2; }
  // S12
  if (k26In(t, 125.0, 126.3)) { P.eyes = 'wide'; P.lid = 0; P.handR = PERSON_HANDS.reach.R; P.mouth = 'o'; }
  if (k26In(t, 126.3, 128.8)) { P.eyes = 'wide'; P.lid = 0; P.mouth = 'o'; P.gaze = lookAt(myH, tH); }
  if (k26In(t, 128.8, 129.88)) { P.handL = PERSON_HANDS.headHold.L; P.handR = PERSON_HANDS.headHold.R; P.eyes = 'wide'; P.lid = 0; P.mouth = 'o'; P.tip = -0.12; P.gaze = lookAt(myH, sleepH); }
  if (k26In(t, 129.88, 130.56)) { P.handL = [-50, -200]; P.handR = [50, -200]; P.eyes = 'wide'; P.lid = 0; P.mouth = 'o'; P.sack = null; P.gaze = lookAt(myH, tH); }
  if (k26In(t, 130.56, 132.42)) { P.handR = PERSON_HANDS.chest.R; P.handL = [-50, -110]; P.brow = -0.6; P.mouth = 'o'; P.look = 0.6 * Math.sin((t - 130.56) * 9); P.lid = 0.1; P.drop = -4; P.gaze = [0, 0.05]; }   // "who, me?"
  if (k26In(t, 132.42, 133.64)) { P.sq = K.lerp(1, 0.92, k26B(t, 132.42, 0.9)); P.tip = -0.12; P.capeFlare = 1; P.steam = 1; P.brow = 1; P.mouth = 'frown'; P.lid = 0.3; }
  if (t >= 133.64 && t < 143.75) { const [, l] = hop(t, 133.64, 0.85, 0, 0, 170); P.y -= l; P.sq = t < 134.49 ? 1.08 : landSquash(t, 134.49, 0.16); P.capeLag = t < 134.49 ? 60 : 0; P.capeFlare = t < 134.49 ? 1 : 0; P.dir = t < 134.0 ? 1 : -1; P.gaze = lookAt(myH, tH); P.brow = 1;
    if (t >= 134.96 && t < 136.26) { P.handL = [-34, -178]; P.handR = PERSON_HANDS.cupMouth.R; P.talk = 1; }
    if (t >= 136.26) { P.handR = [100, -106]; P.handL = [-34, -100]; P.talk = t < 137.38 ? 0.8 : 0; P.mouth = 'frown'; }   // v3: stops short of the thief, below his chin; badge half down by his side
    if (t >= 137.38) { P.sq = 1 + 0.02 * Math.sin(t * 14 + 2); }
    if (t >= 142.9) { P.eyes = 'wide'; P.lid = 0; P.gaze = lookAt(myH, [560, 800]); P.mouth = 'o'; } }
  if (t >= 143.75 && t < 149.98) { const [, l] = hop(t, 143.9, 0.55, 0, 0, 90); P.y -= l; P.dir = -1; P.handR = [70, -160]; P.handL = [60, -140]; P.eyes = 'wide'; P.lid = 0; P.mouth = 'open'; P.noBlink = true; P.x += tremble(t, 2.5, 10);
    if (t >= 148.86) { P.handL = [-40, -96]; P.handR = [-34, -100]; P.mouth = 'o'; P.gaze = [-0.3, -1]; P.x = K26_HDX(t); P.eyes = 'open'; P.lid = 0.3; P.dir = -1; P.tilt = -0.1 * Math.sin(t * 6 + 1); } }
  if (t >= 149.98 && t < 151.34) { P.ph = t * 40 + 1; P.amp = 1; P.eyes = 'wide'; P.lid = 0; P.mouth = 'open'; P.tip = 0.15; P.dir = -1; P.sack = { open: 0.5, rot: -1.2 }; if (t > 150.35) { P.dir = 1; P.sq = 0.9; P.amp = 0; P.tip = 0; } }
  if (t >= 151.34) { const u = k26B(t, 151.34, 0.3); P.sq = 1 + 0.1 * u; P.capeFlare = 1; P.alpha = 1 - K.clamp((t - 151.5) / 0.1); P.amp = 0; P.lid = 1; }
  return P;
}
// neighbours: tall man with the lamp, short one with a stick, a woman with a ladle (staggered entrances)
function k26Neighbours(t) {
  const out = [];
  [{ x: 228, s: 1.05, costume: 'villager', i: 0 }, { x: 170, s: 0.85, costume: 'servant', i: 1, hold: 'stick' }, { x: 290, s: 0.92, costume: 'villageWoman', i: 2 }].forEach((N) => {
    const t0 = 146.86 + stagger(N.i, 0.14), xf = k26Fn([[t0, -120 - N.i * 30], [t0 + 0.6, N.x, 'out'], [157.1 + stagger(N.i, 0.2), N.x], [158.5 + stagger(N.i, 0.2), -160, 'in']]);   // v3: they wave and leave after the lamp is hung
    if (t < t0) return;
    const P = { y: K26_GR, s: N.s, dir: 1, costume: N.costume, ...walk(xf, t, { stride: K26_STRIDE * N.s, amp: 55 }), seed: 20 + N.i, mouth: 'o', eyes: 'wide', hold: N.hold };
    if (N.i === 1) P.pal = { robe: '#3f9d4a', dot: '#2b7a38' };
    const h = [P.x, 700]; P.gaze = t < 147.6 + stagger(N.i) ? [1, 0] : look(t, h, [[147.6 + stagger(N.i, 0.2), [K26_AX2, 700]], [148.2 + stagger(N.i, 0.2), [K26_TEND + 50, 700]], [150.74, [530, 470]], [152.4, [K26_DEND, 890]], [154.88, [K26_AX2, 760]]], 0.15);
    if (N.i === 0) { P.handR = t < 156.54 ? [56, -150] : t < 157.0 ? null : [40, -110]; if (k26In(t, 156.54, 157.0)) P.handRW = [K26_HOOK[0] + 4, K26_HOOK[1] + 20]; }
    if (N.i === 1) P.handR = t < 154.88 ? [40, -170] : [40, -110];
    if (N.i === 2) { P.handR = t >= 147.9 && t < 154.88 ? [44, -176] : [50, -120]; }   // v3: ladle raised, not reaching toward the thief
    if (t >= 154.88) { P.eyes = 'open'; P.mouth = 'smile'; }
    if (k26In(t, 156.6, 157.2) && N.i > 0) { P.handL = PERSON_HANDS.palmsUp.L; P.handR = PERSON_HANDS.palmsUp.R; }
    if (k26In(t, 157.0, 158.6) && !(N.i === 0 && t < 157.0)) { P.handR = [64, -196 + 8 * Math.sin(t * 12 + N.i)]; P.mouth = 'smile'; }   // small wave
    if (t > 157.1 + stagger(N.i, 0.2) + 0.1) P.dir = -1;
    out.push(P); });
  return out;
}
// v3: the sleeper's Z's rising up-LEFT (toward the empty wall), count from the sleep meter: 3 at 10-7, 2 at 6-3, 1 small at 2, one faint shrinking Z at 1
function k26ZLeft(ctx, x, y, t, v) {
  const n = v >= 7 ? 3 : v >= 3 ? 2 : 1, small = v <= 2 ? 0.75 : 1, fade = v <= 1 ? 0.7 * (1 - K.clamp((t - 135.0) / 4.5)) : 0.6, shrink = v <= 1 ? 1 - 0.5 * K.clamp((t - 135.0) / 4.5) : 1;
  for (let i = 0; i < n; i++) { const u = ((t * 0.33 + i / n) % 1), sz = (30 + u * 30) * small * shrink; ctx.save(); ctx.globalAlpha = fade * Math.min(1, u * 5) * (1 - Math.pow(u, 3)); sfx(ctx, 'Z', x - u * 70 + Math.sin(u * 6 + i) * 8, y - u * 140, sz, 1, { rot: 0.2 - u * 0.4, fill: C.white }); ctx.restore(); }
}
// ---------- the world ----------
function k26HutWorld(ctx, t, o = {}) {
  const door = k26HDoor(t), dk = k26HDark(t);
  // light source
  let L = null; const NB = t >= 146.86 ? k26Neighbours(t) : [];
  // sky, moon, the far road through the window (drawn first, the wall has a hole there)
  townSky(ctx, 1000, { preset: 'night' }, 'night'); moon(ctx, 552, 452, 24);
  ctx.save(); ctx.fillStyle = '#16337f'; ctx.fillRect(470, 498, 120, 30); ctx.restore();
  if (t >= 166.9 || o.ending) { ctx.save(); ctx.beginPath(); ctx.rect(480, 420, 100, 100); ctx.clip(); const u = K.clamp((t - 166.9) / 3.2), bx = 498 + 20 * u;   // v2: bigger silhouettes still arguing outside
    for (const [k, dx] of [[0, 0], [1, 46]]) { const jab = Math.floor(t * 2 + k) % 2 === 0, x = bx + dx; person(ctx, { kind: 'thief', x, y: 522, s: 0.3, dir: k ? -1 : 1, ph: t * 8 + k, amp: 1, handR: jab ? [100, -150] : [40, -110], noBlink: true }); if (k) { for (const sd of [-1, 1]) shape(ctx, [[x + sd * 7, 522 - 70], [x + sd * 13, 522 - 86], [x + sd * 3, 522 - 72]], C.yellow, { lw: 1.5 }); } }
    const who = Math.floor((t - 166.9) / 0.6) % 2; if (t >= 167.3) sfx(ctx, who ? 'NO, ME!' : 'ME!', who ? bx + 52 : bx + 4, 442, 15, 1, { fill: who ? C.yellow : C.white }); ctx.restore(); }
  hutRoom(ctx, { ...K26_HUT, sky: false, layer: 'back', door, t });
  // lamp: carried, on the stool, blown out; the neighbours' lamp; hung on the hook
  const W = { T: { x: K26_HTX(t) }, D: { x: K26_HDX(t) } };
  const cow0 = k26HutCow(t, { ...W, cowHead: [K26_HCX(t) - 120, 760], lastX: 400 }); W.cowHead = k26CowHead(cow0);
  W.lastX = t < 79.54 ? (t < 77.6 ? K26_HTX(t) : K26_REACHX) : (Math.floor(t / 2) % 2 ? K26_HTX(t) : K26_HDX(t));
  const cow = k26HutCow(t, W), A = k26HutAscetic(t, W); W.A = A;
  const T = k26HutThief(t, W); W.T = T; const D = k26HutDevil(t, W); W.D = D;
  let lampPos = null, lampOn = 0;
  if (t >= 65.0 && t < 146.86) { lampPos = K26_STOOLLAMP; lampOn = t < 71.95 ? 1 : 1 - k26B(t, 71.95, 0.1, 'lin'); }
  if (lampOn > 0) L = { x: lampPos[0], y: lampPos[1] - 20, R: 330, on: lampOn };
  if (t >= 145.14 && t < 146.86) L = { x: 100, y: 860, R: 160, on: 0.8 * k26B(t, 145.14, 0.4) };
  // darkness behind the cast (the cast stays in full colour)
  k26HutDark(ctx, dk, L);
  if (dk > 0.5) { const Wd = { x0: 480, x1: 580, y1: 520 }; ctx.save(); K.poly(ctx, [[Wd.x0, Wd.y1], [Wd.x1, Wd.y1], [Wd.x1 - 120, 930], [Wd.x0 - 220, 930]], true); ctx.globalAlpha = 0.2 * dk; ctx.fillStyle = '#9ec2ff'; ctx.fill(); ctx.restore(); }
  if (t >= 145.14 && t < 147.2) { ctx.save(); ctx.globalAlpha = 0.85 * k26B(t, 145.14, 0.3) * (1 - k26B(t, 146.4, 0.6)); ctx.fillStyle = C.yellow; ctx.fillRect(110, 893, 150, 10); for (let i = 0; i < 3; i++) { const u = ((t - 145.3 - i * 0.35) / 0.9); if (u > 0 && u < 1) { ctx.fillStyle = C.black; ctx.beginPath(); ctx.ellipse(110 + u * 150, 898, 22, 6, 0, 0, 7); ctx.fill(); } } ctx.restore(); }
  // the lamp on the stool
  if (t >= 65.0 && t < 146.86) k26Lamp(ctx, K26_STOOLLAMP[0], K26_STOOLLAMP[1], lampOn, t);
  // blanket, supper things
  const drawSleeper = () => {
    person(ctx, A);
    if (A.lie > 0.6) { ctx.save(); ctx.globalAlpha = K.clamp((A.lie - 0.6) / 0.3); shape(ctx, [[A.x - 20, 892], [A.x - 26, 852], [A.x + 30, 840], [A.x + 110, 856], [A.x + 118, 892]], C.blue, { lw: 5, seed: 300, dot: '#3f7be6', pitch: 8, rad: 0.25, da: 0.5 }); ctx.restore(); }
    if (t >= 69.6 && t < 72.3) { const hL = k26Hand(A, 0), hR = k26Hand(A, 1); k26Bowl(ctx, hL[0] - 4, hL[1] + 6, 1, 1); seg(ctx, hR[0], hR[1], hR[0] + 10, hR[1] + 16, 4, '#b9b4c6', 2); if (t < 71.6) k26Bread(ctx, 440, 886, 1, t > 71.2 ? 1 : 0); }
    if (A.hold !== 'stick' && t >= 154.88) { seg(ctx, 600, 892, 780, 880, 12, '#c58a18', 4); }
    if (t >= 64.0 && t < 65.0) { const h = k26Hand(A, 1); k26Lamp(ctx, h[0] + 6, h[1] + 8, 1, t); }
  };
  // cast order: intruders behind the sleeper and the cow (they stand deeper in the room)
  const thiefFront = false;   // v3: the cow is drawn in front of the thief at the knot (she stays fully visible)
  const intr = () => { if (t >= 74.32 && t < 151.6) k26Devil(ctx, D);
    if (t >= 73.92 && t < 151.44 && !thiefFront) person(ctx, T);
    else if (t >= 151.44 && t < 151.84) { ctx.save(); ctx.beginPath(); ctx.rect(480, 420, 100, 100); ctx.clip(); person(ctx, { kind: 'thief', x: 530, y: 436, s: 0.66, rot: Math.PI, dir: 1, ph: t * 36, amp: 1, noBlink: true, sq: 1 }); ctx.restore(); }
    for (const f of K26_HTFALLS) if (t >= f.t && t < f.t + 0.4) dustBurst(ctx, f.x, K26_GR - 2, t - f.t, 3, 4, 8, 14, 0.4, Math.round(f.t * 10)); };
  // the door crack eyes (72.66-73.9)
  if (k26In(t, 72.66, 74.0)) { const a = k26Fade(t, 72.7, 74.0, 0.2); ctx.save(); ctx.globalAlpha = a; for (const [y, sd, dart] of [[690, 1, false], [742, 2, true]]) { const lk = dart ? Math.sin(t * 9) : 0.6; for (const ex of [-11, 11]) eye2(ctx, 152 + ex, y, 'open', lk, 0, dart ? 0 : blink(t, sd + 30) * 1.5 > 1 ? 1 : blink(t, sd + 30), C.black, false); } ctx.restore(); }
  const awake = t >= 143.7;
  const cu = k26In(t, 139.52, 143.7) && !o.inset;
  if (cu) drawSleeper(); else if (!awake) { intr(); drawSleeper(); } else { drawSleeper(); intr(); }
  if (!cu) k26Cow(ctx, cow);
  if (thiefFront && !cu) person(ctx, T);
  // rope: from his hand to her collar while leading, then from the peg (a knot with two loops)
  const collar = [W.cowHead[0] + 26 * cow.dir * 0.8 * -1 + (cow.dir > 0 ? -20 : 20), W.cowHead[1] + 30];
  if (t >= 64.76 && t < 66.9) k26Rope(ctx, k26Hand(A, 0), collar, 0.8);
  else if (t >= 66.9) { const tie = k26B(t, 66.6, 0.5); k26Rope(ctx, K26_KNOT, collar, 0.7); if (tie > 0) { ctx.save(); ctx.lineWidth = 5; ctx.strokeStyle = C.black; for (let k = 0; k < 2; k++) { ctx.beginPath(); ctx.ellipse(K26_KNOT[0] - 4 + k * 8, K26_KNOT[1] + 2, 8 * tie, 10 * tie, 0, 0, 7); ctx.stroke(); } ctx.restore(); } }
  // the badge
  if (!cu) k26BadgeWorld(ctx, t, T, D);
  // neighbours and their lamp
  if (NB[0] && t < 156.54) L = { x: NB[0].x + 56 * NB[0].s * NB[0].dir, y: NB[0].y - 150 * NB[0].s, R: 260, on: 1 };   // v3: the neighbours are drawn after the front layer (below)
  if (t >= 156.54) { const hx = K26_HOOK; const u = k26B(t, 156.54, 0.4); const p = t < 157.0 ? [K.lerp(310, hx[0], u), K.lerp(740, hx[1] + 44, u)] : [hx[0], hx[1] + 44]; seg(ctx, hx[0] - 10, hx[1], hx[0] + 4, hx[1], 6, WOOD, 2); if (t >= 157.0) seg(ctx, hx[0], hx[1], p[0], p[1] - 20, 2, C.black, 0); k26Lamp(ctx, p[0], p[1], 1, t); }
  hutRoom(ctx, { ...K26_HUT, sky: false, layer: 'front', door, dark: 0, t });
  // darkness over the walls and roof (the front layer)
  k26HutDark(ctx, dk, L, [[96, 190, 816, 64], [100, 250, 40, 652], [858, 250, 40, 652]]);
  // v3: neighbours stand in front of the open door leaf (clipped at the wall's inner face, so they still come in through the doorway)
  if (NB.length) { ctx.save(); ctx.beginPath(); ctx.rect(140, 0, 900, 1230); ctx.clip();
    for (const N of NB) { person(ctx, N); if (N === NB[0] && t < 156.54) { const h = k26Hand(N, 1); k26Lamp(ctx, h[0] + 6, h[1] + 4, 1, t); } if (N.costume === 'villageWoman') { const h = k26Hand(N, 1); k26Ladle(ctx, [h[0] - 8, h[1] + 14], [h[0] + 14, h[1] - 44]); } }
    ctx.restore(); }
  // v3: the cow's rump is drawn again over the corner post (she lies in front of it)
  if (!cu && t >= 66.9) { ctx.save(); ctx.beginPath(); ctx.rect(852, 720, 120, 200); ctx.clip(); k26Cow(ctx, cow); ctx.restore(); }
  // light glows
  if (lampOn > 0) k26Glow(ctx, K26_STOOLLAMP[0] + 18, K26_STOOLLAMP[1] - 40, 190, lampOn * 0.8);
  if (t >= 64.0 && t < 65.0) { const h = k26Hand(A, 1); k26Glow(ctx, h[0], h[1] - 20, 200, 0.8); }
  if (t >= 146.86 && t < 156.54 && NB[0]) { const h = k26Hand(NB[0], 1); k26Glow(ctx, h[0], h[1] - 20, 200 + 260 * k26B(t, 148.34, 0.5), 0.9); }
  if (t >= 156.54) k26Glow(ctx, K26_HOOK[0] + 10, K26_HOOK[1] + 20, 420, 0.6);
  // sleeper's Z Z Z, sweat, poof, sack, puff of breath
  if (t >= 72.3 && t < 125.94 && !k26In(t, 75.64, 76.6) && !k26In(t, 97.54, 98.8) && !k26In(t, 111.9, 113.2)) { ctx.save(); ctx.globalAlpha = t >= 119.7 ? 0.55 : 0.9; zzz(ctx, 430, 800, t * (t >= 119.7 ? 0.6 : 1)); ctx.restore(); }
  if (t >= 125.94 && t < 139.5 && !k26In(t, 127.34, 129.9)) k26ZLeft(ctx, 350, 812, t, k26SleepV(t));   // v3: up and to the LEFT, away from the thief; thinned with the meter
  if (k26In(t, 140.54, 140.9)) { ctx.save(); ctx.globalAlpha = 1 - (t - 140.54) / 0.36; star(ctx, 490, 760, 40 * k26B(t, 140.54, 0.15), C.white, 0.3); ctx.restore(); }
  if (k26In(t, 71.85, 72.2)) { ctx.save(); ctx.lineWidth = 5; ctx.strokeStyle = C.white; ctx.lineCap = 'round'; for (let i = 0; i < 3; i++) { const u = K.clamp((t - 71.85) / 0.3); ctx.beginPath(); ctx.moveTo(450 - u * 200, 700 + i * 14); ctx.lineTo(420 - u * 200, 700 + i * 14 + 6); ctx.stroke(); } ctx.restore(); }
  for (const [a, b, P] of [[75.64, 76.42, T], [75.64, 76.42, D], [148.86, 149.9, T], [148.86, 149.9, D], [97.54, 98.6, T]]) if (k26In(t, a, b)) { const h = k26Head(P); drops(ctx, h[0] + 40, h[1] - 30, t, 1, '#9ec2ff'); }
  if (k26In(t, 150.35, 150.8)) { for (let i = 0; i < 4; i++) star(ctx, 492 + Math.cos(t * 9 + i * 1.6) * 50, 640 + Math.sin(t * 9 + i * 1.6) * 16, 16, C.yellow, t * 5); dustBurst(ctx, 492, 896, t - 150.0, 6, 6, 12, 40, 0.5, 4); }
  if (k26In(t, 149.98, 150.4)) for (const x of [K26_TEND, K26_DEND]) dustBurst(ctx, x, 896, (t - 149.98) % 0.2, 3, 5, 10, 24, 0.2, Math.floor(t * 10));
  if (k26In(t, 151.34, 152.4)) { dustBurst(ctx, K26_DEND - 18, 820, t - 151.34, 10, 16, 38, 120, 0.9, 6); dustBurst(ctx, K26_DEND - 18, 700, t - 151.4, 8, 12, 30, 90, 0.8, 9); if (k26In(t, 151.6, 151.73)) k26DevilTail(ctx, [K26_DEND - 18, 820], null, 0.4, 0); if (k26In(t, 151.73, 152.0)) { const u = (t - 151.73) / 0.27; k26DevilTail(ctx, [K.lerp(K26_DEND - 18, 640, u), K.lerp(820, 600, u)], null, 0.2, -1); } }
  // empty sack: the devil dropped it (151.34), floats down, lies flat
  if (t >= 151.34) { const u = K.clamp((t - 152.4) / 0.8), y = t < 152.4 ? 700 : K.lerp(700, 890, u * u), x = K26_DEND - 10 + 26 * Math.sin(u * Math.PI * 2) * (1 - u); k26Sack(ctx, x, u >= 1 ? 864 : y - 60 * (1 - u), 0.85, { flat: u >= 1 ? 1 : 0.2 * u, rot: u < 1 ? 0.5 * Math.sin(u * Math.PI * 3) : 0 }); }
  if (k26In(t, 143.7, 145.2)) { const u = K.clamp((t - 143.75) / 1.2); ctx.save(); ctx.translate(K.lerp(570, 720, u), K.lerp(860, 893, u) - 140 * Math.sin(Math.PI * u)); ctx.rotate(u * 5); shape(ctx, K.rectPts(-50, -14, 100, 28), C.blue, { lw: 5, seed: 300, dot: '#3f7be6', pitch: 8, rad: 0.25, da: 0.5 }); ctx.restore(); }
  if (t >= 145.2) shape(ctx, [[660, 896], [668, 884], [790, 880], [800, 896]], C.blue, { lw: 5, seed: 301, dot: '#3f7be6', pitch: 8, rad: 0.25, da: 0.5 });
  if (k26In(t, 158.8, 160.6)) heart(ctx, (A.x + W.cowHead[0]) / 2, 640 - 60 * k26B(t, 158.8, 1.6), 22 * k26Pop(t, 158.8, 0.3), { alpha: k26Fade(t, 158.8, 160.6, 0.3) });
  return { A, T, D, cow, NB, W };
}
// badge: appears between them (83.58), the devil takes it (85.18), the thief snatches it onto his shirt (105.8), the tug and the tear (120.76-121.94),
// the halves are dropped (149.98) and one is picked up by the ascetic (165.08)
function k26BadgeWorld(ctx, t, T, D) {
  if (t < 83.58) return;
  const hT = T.hands ? k26Hand(T, 1) : [T.x, 780], hD = D.hands ? k26Hand(D, 1) : [D.x, 780];
  if (t < 85.18) { k26Badge(ctx, K26_MID, 765 - 6 * Math.sin(t * 8), 0.9 * k26Pop(t, 83.58, 0.3)); return; }
  if (t < 88.78) { k26Badge(ctx, hD[0], hD[1] - 14, 0.75); return; }
  if (t < 90.7) return;   // pinned in the balloon
  if (t < 105.9) { k26Badge(ctx, hD[0] + 10, hD[1] - 10, 0.7); return; }
  if (t < 106.3) { k26Badge(ctx, hT[0], hT[1] - 10, 0.7); return; }
  if (t < 120.76) { k26Badge(ctx, T.x - 2, T.y - 128 * 0.95, 0.55); return; }
  if (t < 121.94) { k26Badge(ctx, K26_MID + 6 * Math.sin(t * 9), 768, 0.9); return; }
  const tr = k26B(t, 121.94, 0.25, 'back');
  if (t < 122.1) { k26Badge(ctx, K26_MID, 768, 0.9, { tear: tr }); return; }
  if (t < 149.98) {   // v3: during the shouting (125.94-143.7) both halves are tucked in the belts, so no badge crosses a face; the devil's half goes to his low left hand on «هذا»
    const sh = t >= 125.94 && t < 143.7, hD2 = sh ? (t >= 136.26 && D.hands ? k26Hand(D, 0) : [D.x - 8 * (D.dir || 1), D.y - 92 * 1.08]) : hD, hT2 = sh ? [T.x + 14 * (T.dir || 1), T.y - (T.kneel ? 100 : 110) * 0.95] : hT;
    if (D.alpha !== 0) k26Badge(ctx, hD2[0], hD2[1] - 6, sh ? 0.6 : 0.75, { half: 'L', tear: 1, rot: -0.3 }); k26Badge(ctx, hT2[0], hT2[1] - 6, sh ? 0.6 : 0.75, { half: 'R', tear: 1, rot: 0.3 }); return; }
  const u = K.clamp((t - 149.98) / 0.6), y1 = K.lerp(760, 884, u * u);
  if (t < 165.3) k26Badge(ctx, K.lerp(K26_DEND - 20, 610, u), y1, 0.75, { half: 'L', tear: 1, rot: u * 1.4 }); k26Badge(ctx, K.lerp(K26_TEND + 30, 400, u), y1, 0.75, { half: 'R', tear: 1, rot: -u * 1.2 });
  if (t >= 165.3) { const h = [K26_AX2 - 30, 700]; k26Badge(ctx, h[0], h[1], 0.75, { half: 'L', tear: 1, rot: Math.sin((t - 165.3) * 4) }); }
}
const k26HC = (x, zoom, o = {}) => ({ x, y: 640, zoom, rot: 0, fy: 0, ...o });
const K26_HCAM = [[63.41, k26HC(420, 1.4)], [65.6, k26HC(420, 1.4)], [66.6, k26HC(540, 1.4)], [69.0, k26HC(540, 1.4)], [69.8, k26HC(500, 1.45)], [72.5, k26HC(500, 1.45)], [72.9, k26HC(440, 1.4)], [74.0, k26HC(440, 1.4)],
  [75.0, k26HC(540, 1.4)], [79.5, k26HC(540, 1.4)], [80.6, k26HC(310, 1.9)], [94.2, k26HC(310, 1.9)], [94.45, k26HC(720, 1.9)], [94.8, k26HC(720, 1.9)], [95.05, k26HC(310, 1.9)], [116.6, k26HC(300, 1.9)],
  [122.7, k26HC(250, 2.0)], [125.9, k26HC(260, 2.0)], [126.15, k26HC(360, 1.5)], [133.4, k26HC(370, 1.5)], [134.2, k26HC(450, 1.5)], [139.51, k26HC(450, 1.5)],
  [139.52, { x: 389, y: 865, zoom: 4.6, rot: 1.7, fy: 0 }], [143.69, { x: 389, y: 865, zoom: 4.3, rot: 1.7, fy: 0 }], [143.7, k26HC(500, 1.5)], [145.14, k26HC(500, 1.5)], [145.6, k26HC(420, 1.45)], [152.4, k26HC(420, 1.45)],
  [153.0, k26HC(640, 1.8)], [154.88, k26HC(640, 1.8)], [157.2, k26HC(600, 1.45)], [166.66, k26HC(600, 1.45)], [167.86, k26HC(640, 1.9, { y: 618, fy: 1 })], [K26_DUR, k26HC(640, 1.9, { y: 618, fy: 1 })]];
// ---------- panel-space lettering, strips, meter, insets ----------
function k26HutOver(ctx, t, cam, S, W) {
  const P = (x, y) => k26P(x, y, cam), close = cam.rot > 0.5;
  const tH = close ? [0, 0] : P(W.T.x, W.T.y - 190), dH = close ? [0, 0] : P(W.D.x, W.D.y - 205);
  // S7
  { const p = P(K26_KNOT[0], K26_KNOT[1]); k26Lab(ctx, S, t, 'TIED', p[0] - 120, p[1] - 150, 68.16, 69.6); k26Arr(ctx, S, t, [p[0] - 110, p[1] - 130], [p[0] - 6, p[1] - 10], 68.16, 69.6, { bend: -0.2 }); }
  // S8 whispered balloons
  const wb = (txt, at, a, b, size, side) => { if (!k26In(t, a, b)) return; k26Balloon(ctx, at[0] + side * 60, at[1] - 150, txt.length * size * 0.5 + 60, size * 2.1, [at[0] + side * 10, at[1] - 40], k26B(t, a, 0.3, 'lin') * k26Fade(t, a, b, 0.15), (c) => sfx(c, txt, 0, 4, size, 1, { fill: C.white })); };
  wb('ME FIRST!', tH, 82.18, 83.6, 36, 1); wb('NO, ME!', dH, 83.58, 85.1, 36, -1);
  // the double reach: gap arrows (77.78-79.5)
  if (k26In(t, 77.9, 79.54)) { ctx.save(); ctx.globalAlpha = k26Fade(t, 77.9, 79.54, 0.15); const h = P(K26_KNOT[0] - 22, K26_KNOT[1] + 4), k = P(K26_KNOT[0], K26_KNOT[1]); k26Dash(ctx, [h[0], h[1] - 30], [k[0], k[1] - 30], 1, C.yellow); const s0 = P(388, 790), s1 = P(388, 826); k26Dash(ctx, [s0[0] - 50, s0[1]], [s1[0] - 50, s1[1]], 1, C.yellow); ctx.restore(); }
  // S9 the devil's balloon, then his strip (blue); S10 the thief's strip (red)
  if (k26In(t, 88.78, 90.9)) { const f = t < 90.7 ? 1 : 1 - (t - 90.7) / 0.2; k26Balloon(ctx, 260, 240, 300, 220, [dH[0] - 10, dH[1] - 40], k26B(t, 88.78, 0.3, 'lin') * f, (c) => { const d = k26B(t, 88.9, 0.7, 'inOut'); k26Sack(c, 40, -10, 0.75, { open: 1 }); c.save(); c.beginPath(); c.rect(-200, -200, 400, 190 + 80 * (1 - d)); c.clip(); k26IconMan(c, 40 - 60 * (1 - d), 30 + 60 * (1 - d), 0.42, { mouth: 'o', lid: 1 }); c.restore(); if (t >= 89.86) k26Badge(c, -70, -30, 0.8 * k26Pop(t, 89.86, 0.25)); }); }
  const strip = (a, b, col, frames) => { if (!k26In(t, a, b)) return; const out = b - t < 0.3 ? (b - t) / 0.3 : 1; ctx.save(); ctx.globalAlpha = out;
    frames.forEach((F, i) => { const x = 34 + i * 318; ctx.save(); ctx.translate(x, 74); ctx.scale(1.2, 1.2); k26Frame(ctx, 0, 0, 252, 196, k26B(t, a + i * 0.18, 0.3, 'lin'), col, (c) => { if (t >= F.t) { c.save(); c.globalAlpha = K.clamp((t - F.t) / 0.2); F.draw(c); c.restore(); } }); ctx.restore(); });
    ctx.restore(); };
  strip(90.7, 103.7, C.blue, [   // v2: figures fill ~80 % of each frame
    { t: 91.52, draw: (c) => { const ph = t * 6; k26IconCow(c, 104, 186, 0.45, { ph, amp: 1, lid: 0.4 }); k26IconThief(c, 212, 188, 0.66, { ph, amp: 1, handL: [-60, -110] }); k26Rope(c, [174, 116], [172, 112], 0.3); } },
    { t: 93.66, draw: (c) => { k26IconCow(c, 120, 188, 0.62, { eyes: 'wide', lid: 0, talk: t >= 95.22 ? 1 : 0, headA: t >= 95.22 ? 0.35 : 0 }); if (t >= 95.22) sfx(c, 'MOO!', 84, 44, 54, k26Pop(t, 95.22, 0.25), { fill: C.yellow, rot: -0.12 }); } },
    { t: 96.6, draw: (c) => { k26IconMan(c, 120, 190, 0.8, { sit: 1, eyes: 'wide', lid: 0, mouth: 'o', handL: [-60, -190], handR: [60, -190] }); sfx(c, '!', 215, 56, 70, 1, { fill: C.red }); } }]);
  if (k26In(t, 103.52, 103.9)) { ctx.save(); ctx.globalAlpha = 1 - (t - 103.52) / 0.38; star(ctx, 500, 170, 160 * k26B(t, 103.52, 0.2), C.white, 0.2); ctx.restore(); }
  strip(109.0, 116.4, C.red, [
    { t: 109.64, draw: (c) => { k26IconMan(c, 172, 192, 0.6, { mouth: 'o', lid: 1, lie: 0 }); k26IconDevil(c, 66, 192, 0.66, { handR: [80, -205], mouth: 'smile' }); k26Sack(c, 168, 58 + 6 * Math.sin(t * 3), 0.4, { open: 1, rot: Math.PI }); } },
    { t: 111.44, draw: (c) => { k26IconMan(c, 126, 192, 0.76, { eyes: 'wide', lid: 0, talk: 0.6 + 0.4 * Math.abs(Math.sin(t * 14)), handL: [-70, -200], handR: [70, -200] }); } },
    { t: 113.06, draw: (c) => { shape(c, K.rectPts(30, 30, 22, 170), WOOD, { lw: 4 }); shape(c, K.rectPts(200, 30, 22, 170), WOOD, { lw: 4 }); k26IconCow(c, 160, 190, 0.5, { eyes: 'wide', lid: 0 }); k26IconThief(c, 100, 190, 0.66, { mouth: 'o', handL: [-60, -150], handR: [60, -150] }); k26X(c, 126, 104, 92, k26B(t, 113.3, 0.25, 'lin')); } }]);
  // S11-S12 growing lettering
  k26Word(ctx, t, 'ME FIRST!', tH[0] + 70, tH[1] - 110, 116.7, 118.4, 48, { fill: C.white });
  k26Word(ctx, t, 'NO, ME!', dH[0] - 60, dH[1] - 120, 118.96, 120.4, 64, { fill: C.yellow });
  k26Word(ctx, t, 'ME!!', tH[0] + 80, tH[1] - 150, 119.7, 121.0, 84, { fill: C.red });
  if (k26In(t, 118.96, 120.6)) { soundArcs(ctx, dH[0] + 50, dH[1] + 30, 1, t); soundArcs(ctx, tH[0] - 50, tH[1] + 30, -1, t); }
  if (k26In(t, 124.4, 125.9)) S.emphasis(ctx, tH[0], tH[1], 150, k26B(t, 124.4, 0.4) * k26Fade(t, 124.4, 125.9, 0.15), { word: 'AHA!', wx: 0.7, wy: 0.9 });
  const burst = (txt, x, y, a, b, fill, stroke) => { if (!k26In(t, a, b)) return; ctx.save(); ctx.globalAlpha = k26Fade(t, a, b, 0.12); const k = k26Pop(t, a, 0.25); ctx.translate(x, y); ctx.scale(k, k); ctx.rotate(-0.06); const pts = []; for (let i = 0; i < 28; i++) { const r = i % 2 ? 150 : 200, an = i / 28 * Math.PI * 2; pts.push([Math.cos(an) * r * 1.5, Math.sin(an) * r * 0.62]); } shape(ctx, pts, fill, { lw: 7, seed: 77 }); sfx(ctx, txt, 0, 6, 110, 1, { fill: stroke }); ctx.restore(); };
  burst('WAKE UP!', Math.max(330, tH[0] + 30), Math.max(200, tH[1] - 170), 128.8, 130.0, C.red, C.yellow);
  burst('WAKE UP!', Math.min(670, dH[0] - 30), Math.max(200, dH[1] - 170), 135.3, 136.5, C.yellow, C.red);
  { const d = P(W.D.x, 640); k26Lab(ctx, S, t, 'DEVIL!', Math.max(200, d[0] - 20), d[1] - 210, 129.88, 131.4, { size: 48 }); k26Arr(ctx, S, t, [Math.max(200, d[0] - 20) + 30, d[1] - 190], [d[0] + 10, d[1] - 60], 129.88, 131.4, { bend: 0.2 }); }
  { const h = P(W.T.x, 660); k26Lab(ctx, S, t, 'THIEF!', Math.min(860, h[0] + 30), h[1] - 210, 136.26, 137.8, { size: 48 }); k26Arr(ctx, S, t, [Math.min(860, h[0] + 30) - 20, h[1] - 190], [h[0] + 10, h[1] - 60], 136.26, 137.8, { bend: -0.2 }); }
  // S13 close-up: sound arcs from both sides
  if (close && k26In(t, 139.52, 141.0)) { soundArcs(ctx, 190, 560, 1, t); soundArcs(ctx, 810, 560, -1, t); }
  if (k26In(t, 144.44, 145.6)) { const m = P(420, 600); k26Word(ctx, t, 'AAH!', m[0], m[1] - 40, 144.44, 145.6, 90, { fill: C.yellow }); }
  { const m = P(K26_DEND + 40, 600); k26Word(ctx, t, 'POOF!', m[0], m[1], 151.34, 152.4, 90, { fill: C.white }); }
  // S14 labels
  { const s = P(K26_DEND - 10, 870), k = P(K26_KNOT[0], K26_KNOT[1]); k26Lab(ctx, S, t, 'EMPTY', s[0], s[1] - 140, 153.28, 154.9); k26Arr(ctx, S, t, [s[0], s[1] - 120], [s[0], s[1] - 30], 153.28, 154.9, { bend: 0.1 });
    k26Lab(ctx, S, t, 'STILL TIED', Math.min(820, k[0] + 70), k[1] - 170, 153.5, 154.9); k26Arr(ctx, S, t, [Math.min(820, k[0] + 70), k[1] - 150], [k[0] + 8, k[1] - 12], 153.5, 154.9, { bend: 0.2 });   // v3: from the right, clear of his face
    if (k26In(t, 153.82, 154.9)) { ctx.save(); ctx.globalAlpha = k26Fade(t, 153.82, 154.9, 0.15); S.label(ctx, 'STOLEN:', 360, 250, k26B(t, 153.82, 0.35), { size: 52, align: 'center' }); S.counter(ctx, 0, 640, 270, k26B(t, 153.95, 0.35), { size: 80 }); ctx.restore(); } }
  // sleep meter (right edge of the panel)
  if (t >= 72.14 && t < 145.6) { const v = k26SleepV(t), fl = (k26In(t, 75.64, 76.2) && Math.floor(t * 12) % 2) || (k26In(t, 122.7, 123.6) && Math.floor(t * 8) % 2) ? 0.5 : 1; ctx.save(); ctx.globalAlpha = fl * K.clamp((145.6 - t) / 0.4); ctx.translate(80, 360); ctx.scale(0.75, 0.75); k26Meter(ctx, 0, 0, v, t, k26B(t, 72.14, 0.3)); ctx.restore(); }
  k26Lab(ctx, S, t, 'AWAKE!', 230, 330, 141.22, 143.7, { size: 48 });
  // S15 insets: how close each one came, then the quarrel that undid them
  if (t >= 159.64 && t < 165.3) { const open = k26B(t, 159.64, 0.4, 'back'), close2 = t > 164.9 ? 1 - k26B(t, 164.9, 0.4) : 1, merge = k26B(t, 163.08, 0.6, 'inOut');
    const r = 150 * open * close2, xl = K.lerp(240, 500, merge), xr = K.lerp(760, 500, merge), cy = 250;
    if (merge < 1) { k26Inset(ctx, xl, cy, r, [720, 770], 1.0, (c) => k26HutWorld(c, 78.4, { inset: true })); k26Inset(ctx, xr, cy, r, [390, 800], 1.2, (c) => k26HutWorld(c, 78.4, { inset: true }), { col: C.red }); }
    if (merge > 0.6) k26Inset(ctx, 500, cy, r * (1 + 0.15 * merge) * K.clamp((merge - 0.6) / 0.2), [K26_MID, 740], 1.4, (c) => k26HutWorld(c, t < 164.2 ? 121.4 : 122.2, { inset: true }));
    if (k26In(t, 161.32, 163.08)) { ctx.save(); ctx.globalAlpha = k26Fade(t, 161.32, 163.08, 0.15) * (0.75 + 0.25 * Math.sin(t * 10)); k26Dash(ctx, [xl + 20, cy - 70], [xl + 50, cy - 70], 1, C.yellow); k26Dash(ctx, [xr - 10, cy + 10], [xr - 10, cy + 50], 1, C.yellow); ctx.restore();
      k26Lab(ctx, S, t, 'SO CLOSE', xl, cy + r + 50, 161.32, 163.08, { size: 40 }); k26Lab(ctx, S, t, 'SO CLOSE', xr, cy + r + 50, 161.5, 163.08, { size: 40 }); } }
}
