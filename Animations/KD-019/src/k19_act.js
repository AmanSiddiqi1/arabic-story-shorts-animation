// ===== KD-019 acting: the bird, the crab and the twelve fish as pure functions of t (all cue times are word starts on the final MP3) =====
const K19DUR = 177.44;
const k19in = (t, a, b) => t >= a && t < b;
const k19E = (t, a, d, e = 'inOut') => K.ease[e](K.clamp((t - a) / d));
const k19P = (t, a, d) => pulse(t, a, d);
// set by time: pond 0-77.22, hill 77.22-89.25 (card midpoint), pond 89.25-101.56, flight 101.56-110.94, hill 110.94-151.9, pond 151.9-end
const k19set = (t) => t < 77.22 ? 'pond' : t < 89.25 ? 'hill' : t < 101.56 ? 'pond' : t < 110.94 ? 'flight' : t < 151.9 ? 'hill' : 'pond';
const K19BX = 86;                                    // the bird's spot on the bank (v2: 60 further left, clear of the crab)
const K19CS = 0.8;                                   // crab scale
// head keys: [t, x | 'D' (default head), y, headRot, ease]; outside the key span the default head is used
function k19hk(t, P, keys) {
  if (t < keys[0][0] || t > keys[keys.length - 1][0]) return;
  const dh = k19BirdGeo({ ...P, head: null }).hd, dr = P.headRot ?? 0.12, val = (k) => k[1] === 'D' ? [dh[0], dh[1], dr] : [k[1], k[2], k[3]];
  let i = 1; while (i < keys.length - 1 && t > keys[i][0]) i++;
  const a = keys[i - 1], b = keys[i], u = K.ease[b[4] || 'inOut'](K.clamp((t - a[0]) / ((b[0] - a[0]) || 1))), A = val(a), B = val(b);
  P.head = [K.lerp(A[0], B[0], u), K.lerp(A[1], B[1], u)]; P.headRot = K.lerp(A[2], B[2], u); P.headAmt = 1;
}
// bird origin for a body centre (flying)
function k19flyAt(cx, cy, s = 1, dir = 1, rot = 0) { const v = k19rot([-10 * dir * s, -144 * s], rot * Math.sign(dir)); return [cx - v[0], cy - v[1]]; }
// the grip point under a flying bird (where the crab shell is held), world
const k19grip = (P) => k19W(P)([4, -10 + (P.legExt || 0)]);
// a leap arc: [x, y, rot] from A to B with height h
function k19leap(t, t0, d, A, B, h) { const u = K.clamp((t - t0) / d); return [K.lerp(A[0], B[0], u), K.lerp(A[1], B[1], u) - h * Math.sin(Math.PI * u), K.lerp(-0.9, 0.9, u)]; }

// ---------------------------------------------------------------- the bird
const K19BLEG = (xf) => (t) => walk(xf, t, { stride: 9, amp: 40 });
const k19bx3 = (t) => kfn(t, [[14.4, 60], [15.2, K19BX]]);            // S3 shuffle
const k19bx8 = (t) => kfn(t, [[71.2, K19BX], [71.8, 220]]);           // S8 step to the edge
function k19birdPose(t) {
  const P = { x: K19BX, y: 600, s: 1, dir: 1, age: 1, neck: 0.45, brow: -0.6, lid: 0.42, headRot: 0.15, sq: breathe(t, 2, 0.015) };
  let gt = [430, 700];
  const set = k19set(t);
  if (t < 5.78) {                                                                 // S1 establishing
    P.x = 200; P.lid = 0.35; P.gaze = null;
    if (k19in(t, 0.28, 0.86)) { P.gaze = [-0.15, 0.1]; P.headRot = 0.15 - 0.2 * k19P(t, 0.28, 0.58); }
    P.neck = 0.45 + 0.42 * k19P(t, 0.86, 0.9); P.sq = t > 0.86 && t < 1.76 ? 1 + 0.06 * k19P(t, 0.86, 0.9) : settleTo(t, 1.76, 1.0, 0.98, 0.4) * breathe(t, 2, 0.015);
    P.tailQ = swing(t, 1.5, 0.18, 3, 3);
    if (t > 3.38) gt = [720, 860]; if (k19in(t, 4.32, 4.6)) gt = [640, 760];
    if (t > 5.1) { const q = k19leap(t - 0.1, 5.15, 0.45, [600, 650], [720, 650], 120); gt = [q[0], q[1]]; }
  } else if (t < 14.24) {                                                         // S2 years ago / now
    const young = t < 11.22 ? 1 : 1 - k19E(t, 11.22, 0.6);
    P.age = 1 - young; P.neck = K.lerp(0.45, 0.9, young); P.lid = K.lerp(0.35, 0.08, young); P.brow = K.lerp(-0.6, 0.3, young); P.x = 200;
    gt = [kfn(t, [[6.46, 360], [8.0, 600]]), 690];
    // strike 1 and the catch
    k19hk(t, P, [[7.8, 'D', 0, 0], [8.05, 40, -268, -0.2, 'out'], [8.12, 102, -48, 1.1, 'in'], [8.42, 102, -48, 1.1], [8.68, 82, -300, 0.05, 'out'], [9.5, 82, -300, 0.05], [9.62, 70, -300, -0.6], [10.0, 70, -300, -0.4], [10.05, 50, -270, -0.1], [10.1, 102, -48, 1.1, 'in'], [10.3, 82, -300, 0.05, 'out'], [10.4, 'D', 0, 0]]);
    if (k19in(t, 8.42, 9.3)) P.hold = [{ pal: 1, ph: t * 28 }];
    if (k19in(t, 9.62, 9.64)) P.beak = 1; P.beak = Math.max(P.beak || 0, 0.9 * k19P(t, 9.45, 0.25));
    if (k19in(t, 9.6, 10.0)) P.gulp = (t - 9.6) / 0.4;
    if (k19in(t, 10.3, 10.4)) P.hold = [{ pal: 0, ph: t * 28 }];
    if (k19in(t, 8.68, 10.4)) P.lid = 0.5;
    if (k19in(t, 9.9, 10.4)) P.gaze = [-0.1, 0.05];
    // now: aging, the tired strike, the weed
    if (t > 11.22) { P.sq = (1 - 0.03 * k19E(t, 11.22, 0.6)) * breathe(t, 2, 0.015); }
    k19hk(t, P, [[11.9, 'D', 0, 0], [12.3, 44, -228, -0.15], [12.57, 100, -62, 1.0, 'inOut'], [12.62, 100, -62, 1.0], [12.85, 92, -170, 0.5, 'out'], [13.6, 92, -170, 0.5], [14.1, 95, -150, 0.7]]);
    if (k19in(t, 11.9, 12.3)) { P.x += tremble(t, 2, 11); }
    if (t > 11.9 && t < 12.6) gt = [380, 700];
    if (k19in(t, 12.82, 13.6)) { P.wingTo = [-40, -205]; P.wingAmt = k19E(t, 12.82, 0.25) * (1 - k19E(t, 13.4, 0.2)); P.beak = 0.25 + 0.15 * Math.abs(Math.sin(t * 9)); P.brow = -0.6; gt = [300, 610]; P.sq = (0.97 + 0.012 * Math.sin(t * 13)) * (1 + 0.03 * Math.sin(t * 6)); }
    if (t > 13.6) gt = [360, 660];
  } else if (t < 30.48) {                                                         // S3 sits; S4 crab arrives
    if (t < 15.3) Object.assign(P, K19BLEG(k19bx3)(t)); else P.x = K19BX;
    if (t < 15.3) { P.neck = 0.35; P.headRot = 0.3 + 0.1 * Math.sin(t * 9); gt = [330, 620]; }
    P.sit = t < 15.3 ? 0 : settleTo(t, 15.3, 0, 1, 0.5, 0.06); if (t > 15.3) P.sq = landSquash(t, 15.75, 0.1) * breathe(t, 2, 0.015);
    if (t > 15.6) P.tailQ = swing(t, 15.85, 0.2, 2.5, 3);
    if (t > 16.5) gt = [430, 690];
    const sink = k19E(t, 17.02, 0.8); P.neck = t < 15.3 ? 0.35 : K.lerp(0.45, 0.2, sink); P.lid = K.lerp(0.42, 0.55, sink); P.brow = K.lerp(-0.6, -0.8, sink); P.wet = t > 17.2;
    if (k19in(t, 17.86, 19.6)) gt = [k19teaseFish(t)[0], 690];
    if (k19in(t, 19.2, 19.4)) { P.lid = 1; P.headRot = (P.headRot || 0.15) - 0.15; }
    k19hk(t, P, [[19.58, 'D', 0, 0], [20.2, 52, -168, -0.05], [20.3, 203, -62, 1.0, 'in'], [20.55, 203, -62, 1.0], [20.82, 'D', 0, 0, 'out']]);
    if (k19in(t, 19.58, 20.2)) { P.x += tremble(t, 1.6, 12); P.lid = 0.2; }
    if (t > 20.82) { const sl = k19E(t, 20.82, 0.6); P.neck = K.lerp(0.2, 0.12, sl); P.lid = K.lerp(0.55, 0.7, sl); P.tip = 0.08 * sl; P.wet = true; }
    if (t > 22.8) { P.lid = 0.62; }
    if (k19in(t, 27.88, 28.9)) { P.sq = 1 + 0.035 * k19P(t, 27.88, 1.0); }
    if (t > 24.4) P.headRot = 0.15 + 0.2 * k19E(t, 24.4, 0.6);   // v2: the sad head droops so the beak stays clear of the crab
    if (t > 30.12) { gt = [k19crabX(t), 470]; P.headRot = 0.35 + 0.05 * k19E(t, 30.12, 0.36); P.lid = 0.55; }
  } else if (t < 43.88) {                                                         // S5 the lie
    P.sit = 1; P.neck = 0.42; P.lid = 0.5; P.brow = -0.8; P.wet = true; P.headRot = 0.35;
    P.talk = talk(t, [[32.11, 34.16], [34.68, 39.74], [40.3, 43.06]]);
    gt = [k19crabX(t), 480]; if (k19in(t, 30.94, 31.64)) gt = K.lerp(0, 1, 1) && [900, 300];
    if (k19in(t, 30.94, 31.6)) { P.wingTo = [70, -110]; P.wingAmt = k19P(t, 30.94, 0.66) > 0 ? K.clamp(k19P(t, 30.94, 0.66) * 1.6) : 0; }
    if (k19in(t, 31.64, 32.6)) { const g = k19BirdGeo({ ...P }); P.wingTo = [g.hd[0] - 50, g.hd[1] + 5]; P.wingAmt = K.clamp(k19P(t, 31.64, 0.96) * 1.6); P.neck = 0.4; gt = [700, 250]; }
    if (k19in(t, 32.6, 39.2)) gt = Math.floor((t - 32.6) / 1.7) % 2 ? [k19crabX(t), 480] : [620, 220];
    if (k19in(t, 39.26, 39.75)) { P.wingTo = [250, 10]; P.wingAmt = K.clamp(k19P(t, 39.26, 0.5) * 1.6); gt = t < 39.5 ? [480, 680] : [k19crabX(t), 480]; }
    if (k19in(t, 39.74, 40.7)) { P.x += tremble(t, 3, 10); P.neck = 0.2; P.brow = -1; }
    if (k19in(t, 43.3, 43.88)) { P.lid = 0.4; P.wet = false; P.brow = 1; P.smirk = 1; P.talk = 0; gt = [430, 700]; }   // the mask slips once the crab has dived
  } else if (t < 77.22) {                                                         // S6 gather, S7 the offer, S8 two a day
    P.sit = 1 - k19E(t, 44.2, 0.8); P.neck = K.lerp(0.3, 0.6, k19E(t, 44.2, 0.8)); P.lid = 0.45; P.brow = -0.5; gt = [520, 680];
    if (k19in(t, 53.58, 54.5)) { P.wingTo = [110, -330]; P.wingAmt = K.clamp(k19P(t, 53.58, 0.95) * 1.5); if (k19in(t, 54.0, 54.3)) P.lid = 1; }
    if (k19in(t, 54.5, 64.64)) { const L = k19E(t, 54.5, 0.6); P.tip = 0.1 * L; P.neck = K.lerp(0.6, 0.9, L); gt = [K.lerp(400, 700, K.clamp((t - 54.5) / 1.2)), 670]; }
    if (t >= 54.5) P.talk = talk(t, [[56.42, 59.1], [59.93, 64.31], [64.74, 66.24], [66.6, 67.3]]) * 0.6;
    if (k19in(t, 55.82, 56.8)) { P.wingTo = [95, -150]; P.wingAmt = K.clamp(k19P(t, 55.82, 0.98) * 1.6); P.headRot = 0.15 + 0.3 * k19P(t, 56.0, 0.5); P.lid = 0.4; P.brow = 0; }
    if (k19in(t, 56.9, 58.4)) gt = [650, 230];
    if (k19in(t, 58.4, 59.4)) { P.wingTo = [340, -260]; P.wingAmt = K.clamp(k19P(t, 58.4, 1.0) * 1.6); gt = [800, 250]; }
    if (k19in(t, 59.4, 64.6)) gt = Math.floor(t / 1.3) % 2 ? [520, 670] : [680, 240];
    if (k19in(t, 64.64, 65.9)) { P.spread = settleTo(t, 64.64, 0, 1, 0.4, 0.15) * (1 - k19E(t, 65.76, 0.3)); P.tip = 0; P.neck = 0.85; P.brow = 0.1; gt = [520, 690]; }
    if (k19in(t, 65.76, 67.44)) { P.beak = k19E(t, 65.76, 0.2) * (1 - k19E(t, 67.1, 0.3)); P.wingTo = [150, -235]; P.wingAmt = K.clamp(k19P(t, 65.76, 1.4) * 1.5); P.lid = 0.5; P.brow = -0.2; gt = [500, 680]; }
    if (t >= 67.44) { P.neck = 0.7; P.lid = 0.45; P.brow = -0.3; gt = [460, 680]; }
    if (t >= 71.2 && t < 74.44) Object.assign(P, K19BLEG(k19bx8)(t));
    if (t >= 74.44) P.x = 220;
    k19hk(t, P, [[71.86, 'D', 0, 0], [72.0, 70, -260, 0.0], [72.4, 81, -57, 1.0, 'inOut'], [73.3, 81, -57, 1.0], [73.7, 'D', 0, 0]]);
    if (k19in(t, 71.86, 73.3)) { P.beak = k19E(t, 71.9, 0.3); gt = [420, 680]; }
    const hold = []; if (t > 72.8) hold.push({ pal: 0, ph: t * 16, s: 0.31 }); if (t > 72.93) hold.push({ pal: 2, ph: t * 14 + 1, s: 0.31 }); if (hold.length) P.hold = hold;
    if (t > 73.25 && t < 73.4) P.beak = 0.25; if (t >= 73.4) P.beak = 0.2;
    if (t >= 74.44) {                                                             // take-off
      const crouch = anticipate(t, 74.44, 0.3, 0.12); P.sq = t < 74.74 ? crouch : 1 + 0.12 * k19P(t, 74.74, 0.3);
      if (t > 74.74) {
        const u = K.clamp((t - 74.74) / (77.0 - 74.74)), path = (v) => v < 0.3 ? k19mix([210, 456], [440, 320], K.ease.out(v / 0.3)) : v < 0.6 ? k19mix([440, 320], [860, 230], (v - 0.3) / 0.3) : k19mix([860, 230], [985, 170], (v - 0.6) / 0.4);
        const c = path(u), s = u < 0.3 ? 1 : u < 0.6 ? K.lerp(1, 0.4, (u - 0.3) / 0.3) : K.lerp(0.4, 0.12, (u - 0.6) / 0.4), rot = -0.25 * (1 - u);
        const o = k19flyAt(c[0], c[1], s, 1, rot); Object.assign(P, { x: o[0], y: o[1], s, rot, fly: true, flap: Math.sin((t - 74.74) * 15), feet: 0, sq: 1, neck: 0.6, tip: 0, headRot: 0.05 });
      }
    }
  } else if (set === 'hill' && t < 89.25) {                                       // S9 the hill
    P.x = 520; P.y = 780; P.neck = 0.6; P.lid = 0.5; P.brow = -0.3;
    const hold = []; if (t < 84.0) hold.push({ pal: 0, ph: t < 83.04 ? t * 14 : 0, amp: t < 83.04 ? 0.9 : 0 }); if (t < 85.05) hold.push({ pal: 2, ph: t < 83.04 ? t * 12 + 1 : 0, amp: t < 83.04 ? 0.9 : 0 }); if (hold.length) P.hold = hold;
    if (t < 82.0) {
      const u = K.clamp((t - 80.76) / (82.0 - 80.76)), c = [K.lerp(-150, 512, K.ease.out(u)), K.lerp(420, 640, u)], s = K.lerp(0.6, 1, u), rot = -0.35 * k19E(t, 81.5, 0.3);
      const o = k19flyAt(c[0], c[1], s, 1, rot); Object.assign(P, { x: o[0], y: o[1], s, rot, fly: true, flap: t < 81.62 ? Math.sin(t * 14) : Math.sin(t * 22), feet: k19E(t, 81.3, 0.4), headRot: 0.1 });
      if (t < 80.76) P.alpha = 0;
    } else { P.sq = landSquash(t, 82.0, 0.12) * breathe(t, 2, 0.015); P.tailQ = swing(t, 82.1, 0.2, 2.5, 3); P.spread = 0.6 * (1 - k19E(t, 82.0, 0.4)); }
    if (k19in(t, 83.04, 86.0)) { P.brow = 1; P.lid = 0.4; P.gaze = [0.8, 0.6]; P.neck = 0.7; }
    k19hk(t, P, [[83.82, 'D', 0, 0], [84.0, 40, -300, -0.9, 'out'], [84.45, 40, -300, -0.9], [84.7, 'D', 0, 0], [85.0, 40, -300, -0.9, 'out'], [85.45, 40, -300, -0.9], [85.7, 'D', 0, 0]]);
    if (k19in(t, 83.9, 84.05) || k19in(t, 84.95, 85.1)) P.beak = 0.7;
    if (k19in(t, 84.0, 84.45)) P.gulp = (t - 84.0) / 0.45; if (k19in(t, 85.05, 85.5)) P.gulp = (t - 85.05) / 0.45;
    if (k19in(t, 85.45, 85.75)) P.beak = 0.5 * k19P(t, 85.45, 0.3);
    if (t > 84.5 && t < 85.95) P.belly = 0.15 * k19E(t, 84.5, 1);
    if (k19in(t, 85.1, 85.95)) { P.wingTo = [20, -112 + 8 * Math.abs(Math.sin(t * 14))]; P.wingAmt = K.clamp(k19P(t, 85.1, 0.85) * 1.6); }
    if (k19in(t, 86.0, 86.66)) { const u = k19E(t, 86.0, 0.6); P.brow = K.lerp(1, -0.8, u); P.lid = K.lerp(0.4, 0.6, u); P.sq = 1 - 0.03 * u; P.wingTo = [135, -232]; P.wingAmt = K.clamp(k19P(t, 86.0, 0.45) * 1.6); }
    if (t >= 86.66) {                                                             // off to the left, then the day fly-bys
      if (t < 87.2) { const u = K.clamp((t - 86.75) / 0.45), c = [K.lerp(510, -200, K.ease.in(u)), K.lerp(636, 380, u)]; P.dir = -1; P.brow = -0.8; P.lid = 0.6;
        if (t > 86.75) { const o = k19flyAt(c[0], c[1], 1, -1, -0.2); Object.assign(P, { x: o[0], y: o[1], fly: true, flap: Math.sin(t * 18), feet: 0, rot: -0.2, sq: 1 }); } else P.sq = anticipate(t, 86.66, 0.09, 0.1); }
      else { const pass = t < 87.75 ? [87.25, 87.75] : t < 88.45 ? [87.95, 88.45] : [88.6, 89.1], u = K.clamp((t - pass[0]) / (pass[1] - pass[0])), c = [K.lerp(1100, -100, u), 300 - 60 * Math.sin(Math.PI * u)];
        const o = k19flyAt(c[0], c[1], 0.35, -1, 0); Object.assign(P, { x: o[0], y: o[1], s: 0.35, dir: -1, fly: true, flap: Math.sin(t * 20), feet: 0, sq: 1, alpha: u > 0 && u < 1 ? 1 : 0 }); }
    }
  } else if (set === 'pond' && t < 101.56) {                                      // S10 the crab asks
    P.belly = 1; P.neck = 0.55; P.lid = 0.5; P.brow = -0.3; gt = [t < 92.6 ? kfn(t, [[91.28, 420], [92.6, 322]]) : 322, 520];
    k19hk(t, P, [[90.46, 'D', 0, 0], [90.7, 52, -150, 1.4], [90.95, 60, -146, 1.3], [91.2, 'D', 0, 0]]);
    if (k19in(t, 90.95, 91.45)) { P.wingTo = [128, -228]; P.wingAmt = K.clamp(k19P(t, 90.95, 0.5) * 1.6); }
    if (k19in(t, 96.95, 97.94)) { P.lid = 0.5; P.gaze = null; gt = gazePlan(t, [[96.95, [330, 470]], [97.15, [330, 600]], [97.4, [335, 470]], [97.6, [330, 590]], [97.8, [330, 480]]], 0.07); P.beak = 0.15 * k19P(t, 97.3, 0.12); P.glint = k19P(t, 97.3, 0.5); P.brow = 1; P.lid = 0.4; P.smirk = 1; }
    if (k19in(t, 97.94, 99.3)) { P.headRot = 0.15 + 0.45 * k19P(t, 97.94, 0.7); P.lid = 0.35; P.brow = -0.3; P.wingTo = [200, -140]; P.wingAmt = K.clamp(k19P(t, 98.4, 0.8) * 1.4); }
    if (t >= 99.3) {
      const crab = { x: 322, y: 602 }, hov = [crab.x - 4, crab.y - 82];
      if (t < 99.5) P.sq = anticipate(t, 99.3, 0.2, 0.1);
      else { const up = t < 99.8 ? k19mix([K19BX, 600], [300, 460], K.ease.out((t - 99.5) / 0.3)) : t < 100.1 ? k19mix([300, 460], hov, K.ease.inOut((t - 99.8) / 0.3)) : t < 100.58 ? hov : k19mix(hov, [hov[0] + 20, hov[1] - 120], k19E(t, 100.58, 0.98));
        Object.assign(P, { x: up[0], y: up[1], fly: true, flap: Math.sin((t - 99.5) * 13), feet: k19E(t, 99.6, 0.4), grip: k19E(t, 100.0, 0.15), sq: 1, neck: 0.6, rot: 0 }); gt = [crab.x, crab.y]; }
    }
  } else if (set === 'flight') {                                                  // S11 the flight
    const climb = k19E(t, 101.56, 1.2), c = [K.lerp(420, 470, climb), K.lerp(520, 390, climb) + 8 * Math.sin((t - 101.56) * 6.5)], rot = -0.18 * (1 - climb);
    const o = k19flyAt(c[0], c[1], 1, 1, rot); Object.assign(P, { x: o[0], y: o[1], rot, fly: true, flap: Math.sin((t - 101.56) * 6.5 * 2) * 0.9, feet: 1, grip: 1, neck: 0.55, lid: 0.4, brow: -0.1, belly: 1, sq: 1 });
    gt = [900, 360]; P.gaze = [1, 0];
    if (k19in(t, 109.28, 110.94)) { P.gaze = [1, 0]; P.lid = 0.45; }
  } else if (t < 151.9) {                                                         // S12-S15 the hill and the fight
    k19hillBird(t, P); gt = P._gt || gt;
  } else {                                                                        // S15 end, S16: on his back by the pond
    Object.assign(P, { x: -20, y: 446, rot: Math.PI - 0.32, limp: 1, eyes: 'x', belly: 1, sit: 0, neck: 0.3, noBlink: true, feet: 0 });
    P.sq = impactSquash(t, 151.98, 0.75); P.y += rebound(t, 151.98, 14, 0.25);
    P.legKick = k19P(t, 152.5, 0.25);
    if (t >= 168.02) P.alpha = 0;
  }
  if (P.gaze === undefined) P.gaze = null;
  if (P.gaze === null && !P.limp) { P.gaze = lookAt(k19BirdPt(P, 'eye'), gt); }
  if (!P.noBlink && P.eyes !== 'x') P.lid = Math.max(P.lid || 0, blink(t, 4));
  return P;
}

// S12 - S15 on the hill: descent, hover, the threat, the grip, the fight, the fall (v2: no leg stretch, the pair climbs into open sky from 133.94)
const K19HOV = [531, 468];                       // hover origin; the crab hangs under the feet at about (535, 550)
const K19LIFT = (t) => -160 * k19E(t, 133.94, 1.3);   // the bird pulls up before landing: grip and fight are framed against plain sky
const K19SQ = [146.96, 147.74, 148.34];          // the three squeezes (ضغط, بكل, قوته)
const K19CHOKE = 0.55;                           // neck point the pincers hold
const K19HANGL = 222;                             // crab feet below the held neck point (crab units)
const K19HFIGHT = [200, -172];                   // head while choking (local): neck stretched straight forward, crab hangs from its middle
function k19hillBird(t, P) {
  Object.assign(P, { fly: true, feet: 1, grip: 1, neck: 0.55, lid: 0.45, brow: -0.2, belly: 1, sq: 1, gaze: null });
  P._gt = [535, 700]; P.legExt = 0;
  if (t < 115.24) {
    const u = k19E(t, 110.94, 3.9, 'out'), c0 = k19add(K19HOV, [-10, -144]), c = k19mix([90, 140], c0, u), rot = K.lerp(0.25, 0, u);
    const o = k19flyAt(c[0], c[1], 1, 1, rot); P.x = o[0]; P.y = o[1]; P.rot = rot;
    P.flap = t < 113.78 ? 0.35 + 0.65 * (k19P(t, 111.8, 0.4) + k19P(t, 112.3, 0.4)) * Math.sin((t - 111.8) * 15) : Math.sin((t - 113.78) * 5.5);
  } else if (t < 133.94) {
    P.x = K19HOV[0]; P.y = K19HOV[1] + 6 * Math.sin(t * 5.5); P.flap = Math.sin(t * 5.5);
    if (t > 129.44) { P.brow = 1; P.lid = 0.5; P.beak = 0.3 * k19E(t, 129.44, 0.6); P._gt = [535, 520]; }
    k19hk(t, P, [[129.44, 'D', 0, 0], [130.2, 165, -60, 2.0], [133.94, 165, -60, 2.0]]);
  } else if (t < 142.38) {                                                        // S14 the threat and the grip
    const rear = k19E(t, 133.94, 0.4) * (1 - k19E(t, 134.9, 0.5)); P.rot = -0.25 * rear; P.x = K19HOV[0]; P.y = K19HOV[1] + K19LIFT(t) + 6 * Math.sin(t * 5.5) * (t < 140.56 ? 1 : 0.3);
    P.flap = t < 135.2 ? 0.45 + 0.55 * Math.sin(t * 16) : Math.sin(t * 5.5); P.brow = 1; P.lid = 0.4; P.beak = 0.3;
    // wing held up on the far side while the pincers rise and close
    if (t > 138.4) P.flap = K.lerp(Math.sin(t * 5.5), 0.95 + 0.05 * Math.sin(t * 9), k19E(t, 138.4, 0.25));
    k19hk(t, P, [[133.94, 165, -60, 2.0], [135.68, 165, -60, 2.0], [136.3, 175, -60, 2.05], [140.25, 175, -60, 2.05], [140.56, 172, -48, 2.2, 'in'], [141.52, 172, -48, 2.2], [141.95, K19HFIGHT[0], K19HFIGHT[1], -0.25, 'out'], [142.38, K19HFIGHT[0], K19HFIGHT[1], -0.25]]);
    if (t > 135.68) { P.beak = K.lerp(0.3, 0.6, k19E(t, 135.68, 0.4)); P.drool = K.clamp((t - 136.0) / 1.5); P.lid = 0.4; P.brow = 1; P._gt = k19add(k19grip(P), [0, 40]); }
    if (k19in(t, 139.46, 140.56)) { P.eyes = 'wide'; P.pupil = 5; P.lid = 0; P.noBlink = true; P.brow = -0.6; const N = k19BirdPt(P, 'neck', K19CHOKE); P._gt = t < 139.75 ? [N[0] + 20, N[1] + 30] : [N[0] - 30, N[1] + 20]; if (t > 139.85) { P.gaze = [0, 0.05]; } }
    if (k19in(t, 140.25, 140.56)) P.beak = K.lerp(0.6, 1, k19E(t, 140.25, 0.3));
    if (t >= 140.56) { P.beak = 0.9; P.drool = 0; P.eyes = 'wide'; P.pupil = 2.4; P.noBlink = true; P.choke = 0.35 * k19E(t, 140.56, 0.07); P.chokeAt = K19CHOKE; P.brow = -1; P._gt = [700, 100]; P.flap = Math.sin(t * 19); }
    if (t >= 140.56) { P.grip = 1 - k19E(t, 140.56, 0.1); P.feet = K.lerp(1, 0.4, k19E(t, 140.6, 0.3)); }
  } else {                                                                        // S15 the fight
    const T = t - 142.38, w8 = Math.PI * 2 / 2.6;
    let c = [525 + 150 * Math.sin(w8 * T), 290 + 40 * Math.sin(2 * w8 * T) - 120 * (1 - k19E(t, 142.38, 0.8))];
    const calm = k19E(t, 145.0, 0.6); c = k19mix(c, [520, 240], calm);
    if (t > 151.1) c[1] += fallY(t, 151.1, 151.9, 0, 900);
    const n = countedBeats(t, K19SQ, { decay: 9 }), amp = t < K19SQ[0] ? 1 : [1, 0.6, 0.35, 0.2][n.n], fade = 1 - k19E(t, 149.22, 0.7);
    P.rot = (0.2 * Math.cos(w8 * T) * (1 - calm)) + (t < 149.96 ? 0.04 * n.accent : 0); const o = k19flyAt(c[0], c[1], 1, 1, P.rot); P.x = o[0]; P.y = o[1];
    P.loop = k19E(t, 144.56, 0.64) * Math.PI * 2;
    P.flap = t < 149.96 ? Math.sin(t * 17 + 0.6 * Math.sin(t * 5)) * amp * fade : 0;
    P.eyes = 'wide'; P.pupil = 2.4; P.noBlink = true; P.brow = -1; P.beak = 0.7; P.chokeAt = K19CHOKE; P.grip = 0; P.feet = 0.4; P._gt = [700, 100];
    P.head = [...K19HFIGHT]; P.headAmt = 1; P.headRot = -0.25;
    if (k19in(t, 143.7, 144.5)) { const sh = Math.sin((t - 143.7) * 2 * Math.PI * 5); P.head = [K19HFIGHT[0] + 10 * sh, K19HFIGHT[1] - 40 * sh]; P.headRot = -0.25 - 0.5 * sh; }
    // the three squeezes: neck pinches deeper each time, head jolts, beak snaps open, eyes pop
    P.choke = [0.3, 0.4, 0.7, 1.0][n.n] * (1 - 0.25 * Math.exp(-n.since * 14)) + 0.25 * n.accent;
    if (n.n > 0 && t < 149.96) { P.headRot = -0.25 - 0.55 * n.accent; P.head = [K19HFIGHT[0] + 12 * n.accent, K19HFIGHT[1] - 26 * n.accent]; P.beak = 0.7 + 0.3 * n.accent; P.pupil = 2.4 - 0.8 * n.accent; P.sq = 1 + 0.05 * n.accent; }
    if (t > 149.22) { P.lid = K.lerp(0, 0.6, k19E(t, 149.22, 0.7)); P.eyes = 'open'; P.pupil = null; P.beak = K.lerp(P.beak, 0.4, k19E(t, 149.22, 0.6)); }
    if (t > 149.96) { const u = k19E(t, 149.96, 0.35); P.limp = u; P.limpHead = [228, -80]; P.limpRot = 1.7; P.eyes = 'x'; P.lid = 0; P.beak = K.lerp(0.4, 0.8, u); P.choke = 1.0; }
  }
}

// ---------------------------------------------------------------- the crab
const k19crabX = (t) => k19crabPose(t).x;
// S4 path up the slope: [t, x]
const K19C4 = [[22.8, 520], [23.7, 400], [24.5, 366], [25.6, 366], [25.78, 366], [26.4, 360], [26.5, 360], [27.0, 345]];
const k19cx4 = (t) => kfn(t, K19C4, 'lin');
const K19C6 = [[43.88, 430], [44.8, 640], [46.6, 640]];
const k19cx6 = (t) => kfn(t, [[43.88, 430], [44.8, 640]], 'out');
const k19crabY = (x) => x <= 330 ? 602 : Math.max(602, k19bedY(x));
function k19crabPose(t) {
  const P = { x: 322, y: 602, s: K19CS, stalk: 1, mouth: 'smile', brow: -0.2, gazeT: null, openL: 0.25, openR: 0.25 };
  if (t < 22.8) { P.alpha = 0; P.x = 520; P.y = k19crabY(520); }
  else if (t < 30.48) {                                                           // S4 arrival
    const W = walk(k19cx4, t, { stride: 7, amp: 50 }); P.x = W.x; P.ph = W.ph; P.amp = W.amp; P.y = k19crabY(P.x);
    P.stalk = t < 23.6 ? 0.8 : settleTo(t, 23.6, 0.8, 1.3, 0.5); P.gazeT = [300, 380];
    if (k19in(t, 24.6, 25.6)) { P.pinR = [110, -120 + 20 * Math.sin(t * 16)]; P.gazeT = [520, 760]; P.mouth = 'smile'; }
    if (k19in(t, 25.78, 26.4)) { P.stalkL = t > 25.9 ? -0.3 : 0; P.stalkR = t > 26.05 ? -0.3 : 0; P.gazeT = [300, 430]; }
    if (k19in(t, 26.4, 26.6)) P.rot = -0.12 * k19P(t, 26.4, 0.2);
    if (t > 26.5) { P.stalkL = -0.3; P.stalkR = -0.25; P.brow = -0.5; P.gazeT = [306, 432]; P.rot = -0.08; P.stalk = 1.2; }
    if (t > 27.02) { P.pinR = [110, -150]; P.openR = 1; P.talk = talk(t, [[28.39, 30.12]]) * 0.8; }
    if (t > 29.42) { const u = k19E(t, 29.42, 0.5); P.rot = K.lerp(-0.08, 0.12, u); P.mouth = 'frown'; P.stalk = K.lerp(1.2, 0.8, u); P.pinR = k19mix([110, -150], K19_PIN_REST.R, u); }
    if (t > 23.0) P.drip = t < 25.5;
  } else if (t < 43.88) {                                                         // S5 listens; the cloud; the dive
    P.x = 345; P.y = k19crabY(345); P.stalk = 0.9; P.rot = 0.05; P.mouth = 'frown'; P.gazeT = [306, 432]; P.brow = -0.4;
    if (k19in(t, 32.6, 37.84)) P.gazeT = Math.floor((t - 32.0) / 1.5) % 2 ? [306, 432] : [620, 230];
    if (t > 37.84) { P.stalk = settleTo(t, 37.84, 0.9, 1.3, 0.4, 0.15); P.eyes = 'wide'; P.pinL = [-40, -132]; P.pinR = [40, -132]; P.openL = P.openR = 0.6; P.mouth = 'o'; P.sq = t < 38.1 ? 0.9 : settleTo(t, 38.1, 0.9, 1.0, 0.3); P.gazeT = [620, 230]; }
    if (t > 39.0) { P.pinL = k19mix([-40, -132], K19_PIN_REST.L, k19E(t, 39.0, 0.5)); P.pinR = k19mix([40, -132], K19_PIN_REST.R, k19E(t, 39.0, 0.5)); P.eyes = 'open'; P.gazeT = t < 39.8 ? [480, 680] : [306, 432]; }
    if (t > 42.24) { const xf = (tt) => kfn(tt, [[42.24, 345], [43.1, 372]]); const W = walk(xf, t, { stride: 7, amp: 40 }); Object.assign(P, { x: W.x, ph: W.ph, amp: W.amp }); P.gazeT = Math.floor(t * 7.5) % 2 ? [620, 230] : [520, 760]; P.pinL = [-80, -80]; P.pinR = [80, -80]; P.stalk = 1.2; }
    if (t > 43.2) { const crouch = t < 43.3 ? anticipate(t, 43.2, 0.1, 0.15) : 1; P.sq = crouch; if (t > 43.3) { const q = k19leap(t, 43.3, 0.28, [350, 602], [420, 700], 70); P.x = q[0]; P.y = q[1]; P.rot = q[2] * 0.6; } }
  } else if (t < 77.22) {                                                         // S6 under water, S7, S8
    if (t < 50.7) {
      const W = walk(k19cx6, t, { stride: 7, amp: 40 }); P.x = W.x; P.ph = W.ph; P.amp = Math.min(1.4, W.amp * 1.4); P.y = k19crabY(P.x); P.stalk = 1.1; P.brow = -0.6; P.mouth = 'o';
      if (k19in(t, 46.6, 47.8)) { const sh = t < 47.25; P.pinL = sh ? [-150, -70] : [-34, -70]; P.pinR = sh ? [150, -70] : [34, -70]; P.openL = P.openR = sh ? 1 : 0; P.talk = talk(t, [[46.6, 47.8]]) * 0.9; }
      if (k19in(t, 48.26, 48.8)) { P.pinR = [60, -180]; P.openR = 0.2; P.gazeT = [200, 300]; P.stalkL = -0.35; P.stalkR = -0.35; }
      if (t < 46.6) P.gazeT = [760, 860];
      if (t > 48.78) { P.eyes = 'wide'; P.gazeT = [760, 860]; }
    } else {
      const xf = (tt) => kfn(tt, [[50.7, 640], [52.3, 372]]); const W = walk(xf, t, { stride: 7, amp: 40 }); P.x = W.x; P.ph = W.ph; P.amp = W.amp; P.y = k19crabY(P.x); P.gazeT = [300, 380];
      if (t > 52.3) { P.x = 372; P.y = k19crabY(372); }
      if (t > 66.6 && t < 67.44) { P.rot = 0.08 * Math.sin((t - 66.6) * 18); P.pinR = [100, -150 + 25 * Math.sin(t * 14)]; P.openR = 0.7; P.mouth = 'smile'; P.gazeT = [460, 680]; }
      if (t >= 67.44) { const xf2 = (tt) => kfn(tt, [[67.6, 372], [69.8, 50]]); const W2 = walk(xf2, t, { stride: 7, amp: 40 }); P.x = W2.x; P.ph = W2.ph; P.amp = W2.amp; P.y = k19crabY(P.x); P.gazeT = [460, 700]; }
      if (k19in(t, 73.38, 77.22)) { const slow = 1 - k19E(t, 76.2, 1.0); P.pinR = [110, -150 + 30 * Math.sin(t * 12) * slow]; P.openR = 0.8; P.gazeT = k19BirdPt(k19birdPose(t), 'eye'); P.mouth = 'smile'; }
    }
  } else if (t < 89.25) { P.alpha = 0; }
  else if (t < 101.56) {                                                          // S10
    const xf = (tt) => kfn(tt, [[91.28, 420], [92.6, 322]]); const W = walk(xf, t, { stride: 7, amp: 50 }); P.x = W.x; P.ph = W.ph; P.amp = W.amp; P.y = k19crabY(P.x); P.stalk = 1.3; P.brow = -0.4; P.gazeT = [306, 400];
    if (t < 91.28) P.alpha = 0;
    if (t > 92.6) { P.x = 322; P.y = 602; }
    P.talk = talk(t, [[93.34, 94.2], [94.2, 96.9]]) * 0.8;
    if (k19in(t, 92.76, 93.56)) { P.pinR = [20, -70]; P.openR = 0; P.brow = -0.6; }
    if (k19in(t, 93.56, 94.1)) { const hp = hop(t, 93.56, 0.4, 0, 0, 26); P.y -= hp[1]; P.sq = landSquash(t, 93.96, 0.14); }
    if (k19in(t, 94.2, 95.5)) { const f = Math.sin((t - 94.2) * 16); P.pinL = [-140, -90 - 40 * f]; P.pinR = [140, -90 - 40 * f]; P.openL = P.openR = 0.6; }
    if (k19in(t, 95.5, 96.24)) { P.pinR = [170, -130]; P.openR = 0.1; P.gazeT = [900, 380]; }
    if (k19in(t, 96.24, 99.3)) { P.pinL = [-92, -22]; P.pinR = [92, -22]; P.openL = P.openR = 0.15; P.stalkL = -0.2; P.stalkR = -0.25; P.stalk = 1.3; P.mouth = 'smile'; }
    if (t >= 99.3) P.gazeT = [300, 300];
    if (t > 100.1) { const b = k19birdPose(t), g = k19grip(b); P.x = g[0]; P.y = g[1] + 92; P.dangle = k19E(t, 100.3, 0.3); P.legSwing = swing(t, 100.58, 0.35, 1.6, 2); P.mouth = 'smile';
      if (t > 100.58) { P.pinL = [-60, 20]; P.pinR = [90, -120 + 30 * Math.sin(t * 12)]; P.openR = 0.6; P.gazeT = [520, 760]; } }
  } else if (t < 110.94) {                                                        // S11 carried
    const b = k19birdPose(t), g = k19grip(b); P.x = g[0]; P.y = g[1] + 92; P.dangle = 1; P.hang = -0.12 * Math.cos((t - 101.56) * 13 - 0.6); P.legSwing = 0.25 * Math.sin((t - 101.56) * 13 - 0.4);
    P.pinL = [-56, 30]; P.pinR = [56, 30]; P.openL = P.openR = 0.2; P.gazeT = [480, 1100]; P.stalk = 1.1;
    if (k19in(t, 103.62, 104.94)) { P.stalk = 1.25; P.pinL = [-150, -50]; P.pinR = [150, -50]; P.openL = P.openR = 0.7; P.gazeT = Math.floor(t * 1.6) % 2 ? [200, 600] : [800, 600]; P.mouth = 'smile'; P.stalkL = -0.15 * Math.sin(t * 13 - 0.4); P.stalkR = -0.15 * Math.sin(t * 13 - 0.6); }
    if (k19in(t, 104.94, 105.76)) { P.mouth = 'smile'; P.gazeT = [480, 1100]; }
    if (t >= 105.76) { P.stalkL = -0.6; P.stalkR = 0.6; P.gaze = [0, 1]; P.pinR = [0, -150]; P.openR = 0.1; P.mouth = 'closed'; }
    if (k19in(t, 106.68, 107.24)) P.gaze = [t < 106.86 ? -1 : t < 107.04 ? 1 : -1, 0.8];
    if (t >= 107.24) { P.stalk = 1.3; P.rot = 0.15; P.brow = -0.4 - 0.3 * k19E(t, 107.3, 0.6); P.mouth = 'frown'; }
    if (t >= 109.28) { P.gaze = [0.15, -1]; P.stalkL = -0.1; P.stalkR = 0.1; P.pinR = [56, 30]; P.rot = 0; }
    if (t >= 110.22) { const d = K.clamp((t - 110.22) / 0.6); P.gaze = [0.2, -1 + 2 * d]; }
  } else if (t < 151.9) { k19hillCrab(t, P); }
  else {                                                                          // S15 end, S16, S17 at the pond
    if (t < 154.42) {
      // lands in the open on the bank, right of the bird and clear of the reeds: squash, bounce up, two tired breaths
      const q = t < 152.4 ? k19leap(t, 151.98, 0.42, [70, 540], [262, 602], 110) : [262, 602, 0]; P.x = q[0]; P.y = q[1]; P.rot = t < 152.4 ? q[2] * 0.5 : 0; P.sq = impactSquash(t, 152.4, 0.6);
      if (t < 151.98) P.alpha = 0;
      if (k19in(t, 152.75, 153.15)) P.y -= hop(t, 152.75, 0.4, 0, 0, 30)[1];
      P.pinL = [-110, -150]; P.pinR = [110, -150]; P.openL = P.openR = 0.6; P.eyes = 'wide'; P.mouth = 'pant'; P.brow = 0.6; P.stalk = 1.1; P.gazeT = [500, 560];
      if (t > 153.15) { const u = k19E(t, 153.15, 0.5); P.sq = landSquash(t, 153.15, 0.1) * (1 - 0.06 * Math.max(0, Math.sin((t - 153.15) * 2 * Math.PI / 0.62))); P.pinL = k19mix([-110, -150], [-100, -8], u); P.pinR = k19mix([110, -150], [100, -8], u); P.openL = P.openR = 0.3; P.stalk = K.lerp(1.1, 0.7, u); P.eyes = 'open'; P.lid = 0.35; P.brow = -0.3; }
    } else if (t < 168.02) {
      // one look back at the bird (عاد 154.42), then a slow scuttle into the water (الماء 156.98)
      const xf = (tt) => kfn(tt, [[155.5, 262], [156.98, 372], [158.4, 600]], 'lin'); const W = walk(xf, t, { stride: 7, amp: 50 }); P.x = W.x; P.ph = W.ph; P.amp = W.amp * 0.6; P.y = k19crabY(P.x);
      P.stalk = 0.7; P.brow = -0.6; P.mouth = 'frown'; P.gazeT = [40, 470]; P.pinL = [-100, -8]; P.pinR = [100, -8]; P.openL = P.openR = 0.3;
      if (t < 154.92) { const u = k19E(t, 154.42, 0.2); P.stalkL = -0.3 * u; P.stalkR = -0.3 * u; P.rot = -0.06 * u; }
      if (k19in(t, 154.92, 155.25)) P.lid = 1;
      if (t < 155.5) P.sq = 1 - 0.06 * k19P(t, 155.25, 0.5);
      if (t > 155.3) P.gazeT = [600, 1000];
      if (t > 158.4) { P.x = 600; P.y = k19crabY(600); P.gazeT = [560, 980]; }
      if (k19in(t, 159.18, 160.76)) { P.pinR = [40, -170]; P.openR = 0.1; P.talk = talk(t, [[159.18, 160.7]]) * 0.6; P.gazeT = [300, 600]; }
      if (t > 160.76) { const u = k19E(t, 160.76, 0.9); P.pinL = k19mix([-120, -110], [-110, -10], u); P.pinR = k19mix([120, -110], [110, -10], u); P.openL = P.openR = K.lerp(1, 0.6, u); P.gazeT = [600, 1100]; P.stalk = 0.7; P.wet = true; }
      if (t > 167.46) { P.pinR = [128, -30]; P.openR = 0; P.gazeT = [690, 1000]; }
    } else {
      const xf = (tt) => kfn(tt, [[172.3, 440], [173.3, 352], [173.8, 248]], 'inOut'); const W = walk(xf, t, { stride: 7, amp: 60 }); P.x = W.x; P.ph = W.ph; P.amp = W.amp; P.y = k19crabY(P.x);
      P.stalk = 1.0; P.gazeT = [300, 300]; P.brow = 0.2; P.mouth = 'set';
      if (t > 173.8) { P.pinL = [-110, -90]; P.pinR = [110, -90]; P.openL = P.openR = 0.5; P.gazeT = [K.lerp(100, 900, 0.5 + 0.5 * Math.sin((t - 173.8) * 1.6)), 200]; P.stalkL = 0.15 * Math.sin(t * 1.6); P.stalkR = 0.15 * Math.sin(t * 1.6 + 0.3); }
    }
  }
  if (!P.gaze && P.gazeT) { const e = k19W({ ...P, dir: 1 })([0, -150]); P.gaze = lookAt(e, P.gazeT); }
  return P;
}
// S12-S15 crab
function k19crabHang(t, b) { const g = k19grip(b); return { x: g[0], y: g[1] + 92 }; }
function k19crabWorldTips(t) { const C = k19crabPose(t); return { L: k19CrabPt(C, 'tipL'), R: k19CrabPt(C, 'tipR') }; }
// hand targets (crab local) so the pincer tips land on world points a (left) and b (right)
function k19aimTips(C, a, b) {
  const toL = (w) => [(w[0] - C.x) / C.s, (w[1] - C.y) / C.s];
  let L = toL(a), R = toL(b); C.pinL = L; C.pinR = R;
  for (let k = 0; k < 3; k++) { const g = k19CrabGeo(C); L = [L[0] + (toL(a)[0] - g.armL.tip[0]), L[1] + (toL(a)[1] - g.armL.tip[1])]; R = [R[0] + (toL(b)[0] - g.armR.tip[0]), R[1] + (toL(b)[1] - g.armR.tip[1])]; C.pinL = L; C.pinR = R; }
}
function k19hillCrab(t, P) {
  const b = k19birdPose(t), h = k19crabHang(t, b); P.x = h.x; P.y = h.y; P.dangle = 1; P.legSwing = 0.12 * Math.sin(t * 5.5 - 0.5); P.pinL = [-56, 30]; P.pinR = [56, 30]; P.openL = P.openR = 0.2;
  P.gazeT = [530, 900]; P.stalk = 1.1; P.mouth = 'closed';
  if (t < 115.24) { P.stalkL = -0.4; P.stalkR = 0.4; P.gaze = [0, 1]; }
  else if (t < 122.04) {
    P.stalk = settleTo(t, 115.24, 1.1, 1.3, 0.4); P.eyes = 'wide'; P.pin = true; P.mouth = 'o'; P.noBlink = true; P.gaze = [0.05, 1];
    if (t > 115.92) { P.stalkL = -0.12 * k19E(t, 115.92, 0.7); P.stalkR = 0.12 * k19E(t, 115.92, 0.7); P.gaze = [gazePlan(t, [[115.92, [0, 0]], [116.2, [-0.3, 0]], [116.45, [0.25, 0]]], 0.07)[0], 1]; }
    if (t > 120.78) { P.shake = tremble(t, 2, 11); P.stalk = K.lerp(1.3, 0.6, k19E(t, 120.78, 0.5)); P.brow = -1; P.eyes = 'open'; P.noBlink = false; P.mouth = 'frown'; P.sq = 1 - 0.05 * k19P(t, 121.4, 0.4); }
  } else if (t < 133.94) {
    P.stalk = 0.7; P.brow = -0.8; P.mouth = 'frown'; P.gazeT = [680, 470];
    if (k19in(t, 122.04, 122.3)) P.lid = 1;
    if (t > 122.56) P.brow = -0.5;
    if (k19in(t, 123.42, 124.3)) P.gazeT = Math.floor((t - 123.42) / 0.25) % 2 ? [680, 470] : [540, 790];
    if (k19in(t, 125.76, 126.0)) P.sq = 0.9;
    if (k19in(t, 126.38, 127.86)) P.mouth = 'smile';
    if (t > 128.54) { const u = k19E(t, 128.54, 0.8); P.stalk = K.lerp(0.7, 0.5, u); P.wet = true; P.tear = K.clamp((t - 128.7) / 0.8); P.gazeT = [535, 800]; }
    if (t > 129.44) { P.gazeT = [640, 440]; P.tear = 0; P.wet = true; P.eyes = 'wide'; P.stalk = 0.8; }
    if (k19in(t, 130.96, 131.5)) { P.gazeT = Math.floor((t - 130.96) / 0.18) % 2 ? [540, 800] : [640, 440]; P.sq = 0.95; }
    if (k19in(t, 132.34, 132.7)) P.lid = 1;
    if (t > 132.7) { P.eyes = 'open'; P.wet = false; P.stalk = settleTo(t, 132.7, 0.8, 1.0, 0.4); P.brow = 1; P.mouth = 'set'; P.gazeT = [640, 440]; P.sq = 1 + 0.03 * k19P(t, 132.8, 0.5); }
    if (t > 133.3) { const u = k19E(t, 133.3, 0.6); P.pinL = k19mix([-56, 30], [-110, -10], u); P.pinR = k19mix([56, 30], [110, -10], u); P.openL = P.openR = K.lerp(0.2, 1, u); }
  } else if (t < 140.5) {                                                         // S14 the rise (the crab lunges onto the neck at 140.5)
    P.stalk = 1.0; P.brow = 1; P.mouth = 'set'; P.pinL = [-110, -10]; P.pinR = [110, -10]; P.openL = P.openR = 1; P.legSwing = 0.35 * Math.sin((t - 133.94) * 8) * (1 - k19E(t, 134.9, 0.6)) + 0.1 * Math.sin(t * 5.5 - 0.6);
    const N = k19BirdPt(b, 'neck', K19CHOKE); P.gazeT = N;
    if (t > 136.42) { P.sq = t < 136.8 ? anticipate(t, 136.42, 0.38, 0.12) : 1; const u = k19E(t, 136.8, 1.78, 'inOut'); const C2 = { ...P }; k19aimTips(C2, [N[0] - 60, N[1] - 40], [N[0] + 50, N[1] - 50]); P.pinL = k19mix([-110, -10], C2.pinL, u); P.pinR = k19mix([110, -10], C2.pinR, u); }
    if (t > 138.58) { P.glintL = k19P(t, 138.7, 0.6); P.glintR = k19P(t, 138.85, 0.6); }
    if (k19in(t, 139.46, 140.4)) { P.openL = P.openR = t < 139.75 ? 1 - k19E(t, 139.46, 0.12) : k19E(t, 139.85, 0.15); }
    if (t >= 140.5) { const C2 = { ...P }; k19aimTips(C2, [N[0] - 8, N[1] + 4], [N[0] + 8, N[1] - 4]); const u = k19E(t, 140.5, 0.06, 'in'); P.pinL = k19mix(P.pinL, C2.pinL, u); P.pinR = k19mix(P.pinR, C2.pinR, u); P.openL = P.openR = 1 - u; P.eyes = 'open'; P.sq = 1 - 0.08 * k19P(t, 140.56, 0.2); P.brow = 1; }
  } else {                                                                        // hanging from the neck (141.52 on); drawn in the neck frame
    P.neckHang = true; P.pinL = [-34, -175]; P.pinR = [34, -175]; P.openL = P.openR = 0; P.dangle = 1; P.stalk = 1.0; P.brow = 1; P.mouth = 'set';
    // swung out from the feet to under the neck: the body hangs to the left of the grip, clear of the head
    P.hangIn = k19E(t, 140.5, 0.1, 'out'); P.openL = P.openR = 1 - k19E(t, 140.52, 0.06, 'in'); P.sq = 1 - 0.1 * k19P(t, 140.56, 0.2);
    P.hang = K.lerp(0.25, 0.1, k19E(t, 141.9, 0.5)) + swing(t, 140.6, 0.3, 1.3, 1.6) + swing(t, 141.6, 0.25, 1.3, 1.6); P.legSwing = swing(t, 140.62, 0.6, 2.0, 1.5) + swing(t, 141.6, 0.4, 2.0, 1.5);
    if (t > 142.38 && t < 145.24) { const T = t - 142.38; P.hang = 0.1 + 0.3 * Math.sin(T * 5.2 - 0.6); P.legSwing = 0.45 * Math.sin(T * 5.2 - 1.6); }
    if (k19in(t, 143.7, 144.5)) P.hang = 0.1 + 0.45 * Math.sin((t - 143.77) * 2 * Math.PI * 5);
    if (t >= 145.24) { P.hang = 0.1 + swing(t, 145.24, 0.3, 1.2, 2.2); P.legSwing = swing(t, 145.3, 0.4, 1.2, 2.2) + 0.12 * Math.sin(t * 6 - 0.4); }
    if (t > 145.92 && t < 149.3) { const n = countedBeats(t, K19SQ, { decay: 9 }); P.eyes = n.n ? 'shut' : 'open'; P.brow = 1.2; P.mouth = 'set';
      P.openL = P.openR = 0.45 * n.dip + (n.n === 0 ? 0.25 * k19E(t, 146.3, 0.5) : 0) * (t < K19SQ[0] - 0.12 ? 1 : 0);
      P.sq = 1 - 0.12 * n.accent; P.stalk = 1 - 0.3 * n.accent + 0.12 * n.dip; P.shake = tremble(t, 1 + 2 * n.n * Math.max(0.3, n.accent), 13);
      P.legSwing += 0.35 * n.accent * Math.sin(t * 30); P.lift = 10 * n.accent; }
    if (t > 149.3) { P.eyes = 'open'; P.shake = 0; P.brow = 0.2; P.stalk = settleTo(t, 149.3, 1.0, 1.15, 0.4); }
    if (t > 149.96 && t < 151.1) { P.hang = 0.1; P.legSwing = 0.1 * Math.sin(t * 6); P.gazeT = k19BirdPt(b, 'eye'); }
    if (t > 151.5) { P.neckHang = false; P.letGo = true; P.pinL = [-120, -60]; P.pinR = [120, -60]; P.openL = P.openR = 0.8; P.eyes = 'wide'; P.dangle = 0.3; }
  }
}

// ---------------------------------------------------------------- the fish
const K19F = [{ pal: 0, s: 0.52 }, { pal: 0, s: 0.66 }, { pal: 0, s: 0.68 }, { pal: 0, s: 0.64 }, { pal: 1, s: 0.66 }, { pal: 1, s: 0.7 }, { pal: 1, s: 0.56 }, { pal: 1, s: 0.68 }, { pal: 2, s: 0.8 }, { pal: 2, s: 0.74 }, { pal: 2, s: 0.78 }, { pal: 2, s: 0.74 }];
const K19GONE = { 0: 72.8, 8: 72.93, 1: 86.66, 5: 86.66, 2: 87.4, 9: 87.4, 4: 88.1, 10: 88.1 };
const K19SURV = [3, 6, 7, 11];
const k19home = (i) => [505 + (i % 4) * 128 + ((i >> 2) % 2) * 44, 735 + (i >> 2) * 98];
const k19idle = (i, t, c, ax = 55, ay = 14, sp = 0.55) => [c[0] + ax * Math.sin(sp * t + i * 1.7), c[1] + ay * Math.sin(sp * 1.6 * t + i * 2.3)];
const K19SURFH = [[400, 652], [458, 668], [528, 650], [592, 676], [650, 655], [716, 684], [776, 658], [436, 742], [508, 716], [566, 768], [690, 724], [752, 760]];
// v2: independent bobbing and a small tilt per fish so the gathered audience does not read as two strips
const k19bob = (i, t) => (3 + (i * 7) % 5) * Math.sin(t * (1.6 + 0.23 * (i % 4)) + i * 1.9);
const K19TILT = [0.08, -0.1, 0.14, -0.04, 0.1, -0.14, 0.05, -0.12, 0.12, -0.06, 0.15, -0.1];
const k19teaseFish = (t) => [K.lerp(560, 420, k19E(t, 17.86, 0.8)) + 20 * Math.sin(t * 3), 690];
const k19school6 = (i, t) => { const a = i / 12 * Math.PI * 2 + 0.3 * Math.sin(t * 0.7); return [760 + 130 * Math.cos(a) + 10 * Math.sin(t * 1.3 + i), 870 + 85 * Math.sin(a) + 6 * Math.sin(t * 1.7 + i)]; };
const k19panic = (i) => { const a = i / 12 * Math.PI * 2 + 0.4; return [Math.cos(a), Math.sin(a)]; };
const k19wash = (A, B, u) => k19mix(A, B, K.ease.inOut(K.clamp(u)));
// position (and facing hint) of fish i at time t; null when not in the pond
function k19fishXY(i, t) {
  if (K19GONE[i] != null && t >= K19GONE[i] && !(t >= 72.6 && t < 77.22 && false)) return null;
  const st = stagger(i, 0.07), H = k19home(i);
  if (t < 5.78) { const p = k19idle(i, t, H); const enter = k19E(t, 3.38 + st * 0.6, 1.3, 'out'); let q = k19wash([1150 + i * 30, H[1] - 40], p, enter);
    if (i === 0) { if (t > 4.6 && t < 5.15) q = k19wash(q, [600, 668], (t - 4.6) / 0.5); if (t >= 5.15 && t < 5.6) { const L = k19leap(t, 5.15, 0.45, [600, 650], [720, 650], 120); return { x: L[0], y: L[1], rot: L[2], leap: true }; } if (t >= 5.6) q = k19wash([720, 680], p, (t - 5.6) / 0.5); }
    return { x: q[0], y: q[1] }; }
  if (t < 14.24) { if (i < 6) { const ph = t * 0.8 + i * 1.05; let q = [500 + 180 * Math.sin(ph), 690 + i * 13 + 8 * Math.sin(2 * t + i)];
      if (i === 0 && t > 12.1 && t < 12.95) { const u = (t - 12.1) / 0.85, a = u * Math.PI * 2; q = [392 + 60 * Math.sin(a), 700 - 34 * Math.cos(a) + 34]; }
      return { x: q[0], y: q[1] }; } return { x: k19idle(i, t, H)[0], y: k19idle(i, t, H)[1] }; }
  if (t < 22.8) { const p = k19idle(i, t, H); if (i === 0 || i === 4 || i === 8) { const k = i === 0 ? 0 : i === 4 ? 1 : 2, base = [400 + k * 55, 680 + k * 22], tease = k19in(t, 17.86, 21.0) ? k19E(t, 17.86 + k * 0.15, 0.8) : t >= 21 ? 1 - k19E(t, 21.2, 1.0) : 0;
      let q = k19wash(p, [base[0] + 18 * Math.sin(t * 2 + k), base[1] + 6 * Math.sin(t * 3 + k)], tease); if (i === 4 && k19in(t, 18.3, 19.4)) q = [base[0], base[1]];
      if (k19in(t, 20.3, 20.9)) { const sc = k19P(t, 20.3, 0.6); q = [q[0] + (k - 1) * 60 * sc, q[1] + 60 * sc]; } if (t > 20.9 && t < 21.4) q = [q[0], q[1] + 40];
      return { x: q[0], y: q[1], face: t > 17.86 && t < 21.4 ? -1 : null }; } return { x: p[0], y: p[1] }; }
  if (t < 43.88) { const p = k19idle(i, t, H); if (i === 3 && k19in(t, 24.4, 25.8)) { const q = k19wash(p, [480, 790], k19P(t, 24.4, 1.4) * 1.5); return { x: q[0], y: q[1], face: -1 }; } return { x: p[0], y: p[1] }; }
  if (t < 54.5) { const sc = k19school6(i, t); let q = k19wash(k19idle(i, t, H), sc, (t - 43.88) / 1.2);
    if (t > 48.78) { const d = k19panic(i), u = k19E(t, 48.78 + st, 0.6, 'out'); q = [sc[0] + d[0] * 230 * u, Math.min(1040, Math.max(680, sc[1] + d[1] * 150 * u))]; }
    if (i === 2 && t > 50.0) q = k19wash(q, [828, 1010], (t - 50.0) / 0.4);
    if (t > 50.7) { const u = k19E(t, 50.7 + st * 1.5, 1.3); const from = (() => { const d = k19panic(i), s2 = k19school6(i, 50.7); return [s2[0] + d[0] * 230, Math.min(1040, Math.max(680, s2[1] + d[1] * 150))]; })(); q = k19wash(from, K19SURFH[i], u); if (i === 2) q = k19wash([828, 1010], K19SURFH[i], u); if (u >= 1) return { x: K19SURFH[i][0], y: K19SURFH[i][1] + k19bob(i, t), face: -1, surf: 1 }; return { x: q[0], y: q[1], surf: u > 0.85 ? (u - 0.85) / 0.15 : 0 }; }
    return { x: q[0], y: q[1], face: t > 45.96 + st && t < 48.78 ? -1 : null }; }
  if (t < 77.22) { let [x, y] = K19SURFH[i]; y += k19bob(i, t);
    if (k19in(t, 61.7, 63.3)) y += (4 + (i % 4) * 4) * k19P(t, 61.7 + st * 0.3, 1.2);
    if (i === 0 && t > 69.36) { [x, y] = k19wash([x, y], [440, 664], (t - 69.36) / 0.6); }
    if (i === 8 && t > 69.36) { [x, y] = k19wash([x, y], [505, 676], (t - 69.5) / 0.6); }
    if (i === 0 && t > 72.48) { const L = k19leap(t, 72.48, 0.32, [440, 664], [348, 618], 150); return { x: L[0], y: L[1], rot: L[2], leap: true }; }
    if (i === 8 && t > 72.61) { const L = k19leap(t, 72.61, 0.32, [505, 676], [352, 622], 170); return { x: L[0], y: L[1], rot: L[2], leap: true }; }
    return { x, y, face: t > 58.4 + st * 0.5 && t < 60.3 + st * 0.5 ? 1 : -1, surf: 1 }; }
  if (t < 89.25) return null;
  if (t < 101.56) { if (!K19SURV.includes(i)) return null; const k = K19SURV.indexOf(i), c = [600 + k * 50, 820 + (k % 2) * 40]; let q = k19idle(i, t, c, 40, 10, 0.4);
    if (t > 99.3) q = k19wash(q, [440 + k * 46, 690 + (k % 2) * 20], (t - 99.3) / 0.9); return { x: q[0], y: q[1], face: t > 100.2 ? -1 : null }; }
  if (t < 151.9) return null;
  if (!K19SURV.includes(i)) return null;
  const k = K19SURV.indexOf(i);
  if (t < 154.42) { const s0 = [520 + k * 60, 820], s1 = [430 + k * 60, 655]; const q = k19wash(s0, s1, (t - 153.3 - k * 0.15) / 0.6); return { x: q[0], y: q[1] + 3 * Math.sin(t * 2 + k), face: -1, surf: t > 153.6 + k * 0.15 ? 1 : 0 }; }
  if (t < 168.02) { const ring = [[775, 958], [738, 1016], [858, 930], [892, 1000]], from = [[420 + k * 60, 700], [480 + k * 60, 740]][k % 2], tgt = ring[k];
    let q = k19wash(from, tgt, (t - 158.42 - k * 0.2) / 0.8); q = [q[0] + 4 * Math.sin(t * 1.5 + k), q[1] + 3 * Math.sin(t * 2 + k)];
    q[1] += 16 * k19E(t, 161.82 + k * 0.12, 0.5);   // staggered grief: each sinks a little, one after another
    return { x: q[0], y: q[1], face: tgt[0] < 600 ? 1 : -1, turn: i === 7 && t > 162.0 && t < 165.0 }; }
  const c = [520 + k * 55, 860 + (k % 2) * 40]; let q = k19idle(i, t, c, 30, 10, 0.5);
  if (t > 170.84) q = k19wash(q, [420 + k * 60, 655], (t - 170.84 - k * 0.15) / 0.6);
  if (t > 174.6) q = k19wash([420 + k * 60, 655], k19idle(i, t, c, 40, 10, 0.4), (t - 174.6) / 1.2);
  if (i === 6 && t > 173.6) { if (t < 173.9) q = k19wash([480, 655], [520, 668], (t - 173.6) / 0.3); else if (t < 174.4) { const L = k19leap(t, 173.9, 0.5, [520, 650], [660, 650], 130); return { x: L[0], y: L[1], rot: L[2], leap: true }; } else q = k19wash([660, 690], k19idle(i, t, c, 40, 10, 0.4), (t - 174.4) / 0.8); }
  return { x: q[0], y: q[1], face: t > 170.84 && t < 174.6 ? -1 : null, surf: t > 171.0 && t < 174.8 ? 1 : 0 };
}
function k19fishPose(i, t) {
  const p = k19fishXY(i, t); if (!p) return null; const F = K19F[i];
  const a = k19fishXY(i, t - 0.05), b = k19fishXY(i, t + 0.05), vx = a && b ? (b.x - a.x) / 0.1 : 0, vy = a && b ? (b.y - a.y) / 0.1 : 0, v = Math.hypot(vx, vy);
  let dir = p.face ?? (Math.abs(vx) > 15 ? Math.sign(vx) : (k19fishXY(i, t - 0.6) && p.x - k19fishXY(i, t - 0.6).x < 0 ? -1 : 1));
  if (p.leap) dir = 1;
  const P = { x: p.x, y: p.y, s: F.s, pal: F.pal, dir, ph: t * 7 + i * 1.3 + v * 0.02, amp: K.clamp(0.25 + v / 300, 0.25, 0.9), seed: i * 3, rot: p.rot ?? (v > 30 && !p.surf ? K.clamp(Math.atan2(vy, Math.abs(vx)) * 0.5, -0.4, 0.4) : 0) };
  if (p.surf) { P.rot = K.lerp(P.rot, -0.75 + (t < 77.22 ? K19TILT[i] : 0), p.surf); }
  if (p.leap) { P.sq = 1.12; P.eyes = 'wide'; P.mouth = 'o'; }
  const st = stagger(i, 0.07), head = [P.x + dir * 40 * F.s, P.y - 10];
  if (p.surf) P.gaze = lookAt(head, t < 89 ? [290, 380] : [190, 560]);
  if (k19in(t, 20.3, 21.4) && (i === 0 || i === 4 || i === 8)) { P.y += tremble(t, 2, 10); P.mouth = 'smile'; if (i === 4) P.fin = Math.sin(t * 14); }
  if (i === 4 && k19in(t, 18.3, 19.0)) { P.puff = k19P(t, 18.3, 0.5); P.mouth = 'o'; }
  if (i === 3 && k19in(t, 24.6, 25.6)) P.fin = Math.sin(t * 16);
  if (k19in(t, 45.96, 48.78)) P.eyes = 'wide';
  if (k19in(t, 48.78 + st, 50.7)) { P.eyes = 'wide'; P.mouth = 'o'; P.amp = 0.9; }
  if (i === 8 && k19in(t, 49.92, 50.6)) { P.roll = t < 50.35 ? k19E(t, 49.92, 0.12) : 1 - k19E(t, 50.35, 0.2); P.eyes = t < 50.35 ? 'x' : 'open'; P.rot = Math.sin(t * 20) * 0.1; }
  if (k19in(t, 52.86, 53.58)) { P.talk = talk(t, [[52.86, 53.5]], i * 1.7); if (i === 5) P.fin = 1; }
  if (k19in(t, 53.58, 54.5)) { P.talk = 0; P.mouth = 'closed'; }
  if (k19in(t, 60.44, 61.7)) { P.wet = true; P.mouth = 'o'; if (i === 0) P.y -= Math.abs(Math.sin((t - 60.44) * 9)) * 12; }
  if (k19in(t, 61.7, 63.26)) { P.eyes = 'wide'; P.mouth = 'o'; }
  if (k19in(t, 63.26, 64.64)) { P.mouth = 'smile'; if (i === 1 || i === 2) P.fin = 0.8; }
  if (k19in(t, 64.64, 65.76)) { P.eyes = 'wide'; P.gaze = [0, -1]; }
  if (k19in(t, 67.44, 68.8)) { P.rot += 0.18 * Math.sin((t - 67.44 - st) * 14) * (t > 67.44 + st ? 1 : 0); P.mouth = 'smile'; }
  if (k19in(t, 68.8, 72.48)) P.mouth = 'smile';
  if (k19in(t, 69.36, 70.6) && i !== 0 && i !== 8) P.fin = 0.6 + 0.4 * Math.sin(t * 12 + i);
  if (k19in(t, 73.38, 77.22)) { const slow = 1 - k19E(t, 75.6, 1.2); P.fin = (0.5 + 0.5 * Math.sin((t - st) * 13)) * slow; const b = k19birdPose(t); P.gaze = lookAt(head, k19BirdPt(b, 'eye')); P.mouth = 'smile'; }
  if (k19in(t, 100.58, 101.56)) P.fin = 0.5 + 0.5 * Math.sin(t * 13 + i);
  if (k19in(t, 153.3, 154.42)) { P.eyes = 'wide'; P.mouth = 'o'; P.gaze = lookAt(head, [262, 560]); }
  if (k19in(t, 158.42, 168.02)) P.gaze = lookAt(head, [600, 980]);
  if (t > 161.82 && t < 168.02) { const g = k19E(t, 161.82 + K19SURV.indexOf(i) * 0.12, 0.4); if (g > 0) { P.wet = true; P.rot = 0.32 * g; P.lid = 0.6 * g; P.mouth = 'frown'; } if (i === 7 && p.turn) P.dir = -P.dir; if (i === 6 && k19in(t, 163.4, 164.6)) { P.finPt = 1; P.rot = 0; P.lid = 0.2; P.gaze = lookAt(head, [640, 760]); } }
  if (k19in(t, 171.6, 172.4)) { P.y += 6 * k19P(t, 171.6, 0.4); P.eyes = 'wide'; }
  if (k19in(t, 170.84, 174.6) && !p.leap) P.gaze = lookAt(head, [200, 560]);
  return P;
}
