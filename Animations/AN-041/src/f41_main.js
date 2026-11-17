// ===== AN-041 The Fox and the Crow: timelines (fox, crow, hearts, clouds), world draw, camera, lettering, sound =====
const F41_DUR = 167.81;   // narration 164.81 + 3.0 s THE END hold
const F41B = (t, a, d, e = 'inOut') => K.ease[e](K.clamp((t - a) / d));
const f41In = (t, a, b) => t >= a && t < b;
const f41Fade = (t, a, b, f = 0.2) => K.clamp(Math.min((t - a) / f, (b - t) / f));
const f41Pop = (t, a, d = 0.3) => K.clamp((t - a) / d);
const f41Lid = (P, t, seed) => { if (P.lid != null && !P.noBlink && P.lid < 0.9 && P.eyes !== 'wide') P.lid = Math.max(P.lid, blink(t, seed)); return P; };
const F41_FOX_TALK = [[27.1, 30.95], [31.35, 36.3], [64.6, 66.1], [66.95, 68.3], [72.45, 73.7], [81.5, 82.3], [157.5, 159.1], [159.8, 160.9]];
const F41_CROW_TALK = [[45.24, 46.0], [46.7, 50.1], [50.3, 53.5], [54.16, 55.85], [56.9, 57.3], [58.9, 61.2], [88.68, 89.7], [92.0, 93.9], [100.6, 101.4], [102.2, 103.3], [104.0, 105.0], [116.66, 119.1], [120.2, 120.9],
  [122.48, 124.2], [132.9, 134.4], [136.0, 137.2], [138.7, 139.5], [140.4, 141.3], [152.84, 153.9]];
// sky: morning until the wipe (the dawn-to-day cross-fade is hidden under it), then plain day; the warmth comes from F41_WARM (a multiply tint), dusk under the LATER card
const F41_U = (t) => kfn(t, [[0, 0.25], [160.9, 0.25], [161.2, 0.47], [F41_DUR, 0.48]], 'lin');
const F41_WARM = (t) => kfn(t, [[0, 0], [61, 0.05], [100, 0.12], [144, 0.32], [160.9, 0.42], [161.2, 0.7], [F41_DUR, 0.75]], 'lin');

// ---------- fox: position functions ----------
const F41_ST = 26 * 0.8;   // fox stride at s 0.8
const F41_FX1 = (t) => kfn(t, [[0.3, 250], [1.9, 520]], 'out');
const F41_FX2 = (t) => kfn(t, [[20.95, 540], [21.54, 1060]], 'in');
const F41_FX3 = (t) => kfn(t, [[21.54, -170], [23.2, 440]], 'out');
const F41_FX4 = (t) => kfn(t, [[63.72, 440], [64.4, 500]]);
const F41_FX5 = (t) => kfn(t, [[102.3, 500], [102.7, 482]]);
const F41_FXW = (t) => kfn(t, [[148.95, 392], [152.04, 340], [152.3, 334], [153.94, 305]], 'lin');
const F41_FX12 = (t) => (t < 163.2 ? kfn(t, [[161.15, 1020], [162.74, 540]], 'out') : kfn(t, [[163.2, 540], [164.3, 250]], 'in'));
const F41_FALLS = [...footfalls(F41_FX3, 21.6, 23.2, F41_ST), ...footfalls(F41_FX2, 20.95, 21.54, F41_ST)];
const F41_FALLS12 = footfalls(F41_FX12, 161.15, 164.3, F41_ST);

// crow anchors
const F41_NEST = [790, 610], F41_CY = 592;
const F41_CXF = (t) => kfn(t, [[35.6, 838], [35.9, 848], [44.54, 848], [44.8, 858], [63, 858], [64, 848], [117.4, 848], [117.6, 856], [133.0, 856], [133.4, 846]]);
const f41CrowHead = (P) => [P.x + (P.dir ?? 1) * (P.s || 1) * 38, P.y + (P.s || 1) * (-70 + (P.drop || 0))];

// ---------- the fox ----------
function f41FoxFoot(t) {   // S1, S2, S12 at the foot of the mountain
  const P = { y: F41_GF, s: 0.8, dir: 1, seed: 21, tailUp: 0, mouth: 'closed' };
  if (t < 12.38) {   // S1 out of the cave, yawn, belly, bone, sits, hears the crow
    const W = walk(F41_FX1, t, { stride: F41_ST }); Object.assign(P, W); P.amp = W.amp * 0.6;
    P.tip = 0.05; P.ears = f41Ears(-0.4); P.lid = 0.35; P.gaze = [1, 0.3];
    if (t < 0.3) P.lid = t < 0.15 ? 1 : 0.5;
    if (f41In(t, 1.94, 2.6)) { const k = pulse(t, 1.94, 0.66); P.sq = 1 + 0.06 * k; P.headUp = -0.3 * k; if (f41In(t, 2.0, 2.45)) { P.mouth = 'open'; P.lid = 1; } }
    if (f41In(t, 3.55, 4.24)) { P.sq = 1 + 0.035 * Math.sin((t - 3.55) * 2 * Math.PI * 3); P.gaze = [0.2, 1]; P.ears = f41Ears(-0.8); }
    if (t >= 4.24 && t < 5.56) { P.raise = t < 4.75 ? 0.6 * F41B(t, 4.24, 0.2) : 0; P.brow = -0.5; P.mouth = 'frown'; if (t >= 4.7) { P.headUp = 0.35 * F41B(t, 4.7, 0.3); P.drop = 10 * F41B(t, 4.7, 0.3); P.gaze = [0.6, 1]; } }
    if (t >= 5.56) { P.sit = 0.6 * F41B(t, 5.56, 0.5); P.plant = true; P.sq = (t < 6.1 ? anticipate(t, 5.56, 0.5, 0.06) : 1) * breathe(t, 3, 0.02); P.lid = 0.5; P.ears = f41Ears(-1); P.brow = -0.4; P.headUp = 0.2 * (1 - F41B(t, 6.8, 0.4)); }
    if (t >= 6.8) { P.ears = f41Ears(K.lerp(-1, 1, F41B(t, 6.8, 0.2))); }
    if (t >= 7.0) { P.gaze = [0.3, -1]; P.lid = 0; P.headUp = -0.3 * F41B(t, 7.0, 0.4); P.brow = 0; }
    return f41Lid(P, t, 21);
  }
  if (t < 21.54) {   // S2 the idea
    P.x = 540; P.sit = 0.6; P.plant = true; P.gaze = [0.5, -1]; P.headUp = -0.15; P.lid = 0; P.ears = f41Ears(0.3); P.tailUp = 0.2;
    if (t < 13.2) { P.plant = false; P.raise = 0.5 * F41B(t, 12.4, 0.3); P.lid = Math.max(0, 0.9 * pulse(t, 12.8, 0.4)); }
    else if (t < 18.58) { P.gaze = lookAt(f41FoxEye(P), t < 16.5 ? [520 + (t - 13.2) * 30, 1500] : [680, 1480]); if (f41In(t, 16.52, 17.2)) { P.eyes = 'wide'; P.sq = 1 - 0.03 * pulse(t, 16.7, 0.3); } if (t >= 17.7) P.ears = f41Ears(-0.3); }
    else if (t < 19.62) { P.plant = false; P.raise = 1 * F41B(t, 18.58, 0.25); P.ears = f41Ears(-0.6); P.mouth = 'frown'; P.brow = -0.3; P.gaze = [0.2, 0.6]; P.headUp = 0.1; }
    else { P.lid = 0.45; P.brow = 0.5; P.mouth = 'smile'; P.ears = f41Ears(t < 19.8 ? 0 : 0.6); P.tailUp = 0.5 + 0.2 * Math.sin((t - 19.62) * 18); P.gaze = lookAt(f41FoxEye(P), [680, 1480]); }
    if (t >= 20.9) { P.sq = anticipate(t, 20.9, 0.12, 0.08); P.sit = 0.6 * (1 - F41B(t, 20.95, 0.15)); P.plant = true; if (t >= 20.97) { Object.assign(P, walk(F41_FX2, t, { stride: F41_ST })); P.tailUp = 0.9; P.mouth = 'smile'; P.gaze = [1, -0.3]; } }
    return f41Lid(P, t, 21);
  }
  // S12 home at dusk
  const W = walk(F41_FX12, t, { stride: F41_ST }); Object.assign(P, W); P.amp = W.amp * 0.6; P.dir = -1; P.ears = f41Ears(-0.6); P.headUp = 0.15; P.lid = 0.4; P.tip = 0.04;
  if (f41In(t, 162.74, 163.3)) { P.ears = f41Ears(K.lerp(-0.6, 0.6, F41B(t, 162.74, 0.12))); const k = F41B(t, 162.9, 0.25) * (1 - F41B(t, 163.15, 0.2)); P.headUp = K.lerp(0.15, -0.6, k); P.gaze = [1, -1]; P.lid = 0.15; P.tip = 0; P.drop = -6 * k; }
  if (t >= 163.2) P.tailUp = 0.1 + 0.4 * pulse(t, 164.0, 0.3);
  return f41Lid(P, t, 21);
}

function f41FoxTop(t) {   // S3-S11 on the terrace
  const P = { y: F41_GT, s: 0.8, dir: 1, seed: 21, x: 440, ears: f41Ears(0.8), tailUp: 0.5, mouth: 'smile', brow: -0.4, lid: 0.3 };
  if (t < 23.2) { Object.assign(P, walk(F41_FX3, t, { stride: F41_ST })); P.tailUp = 0.9; P.ears = f41Ears(1); P.lid = 0; P.brow = 0; }
  else if (t < 63.72) P.x = 440; else if (t < 64.4) Object.assign(P, walk(F41_FX4, t, { stride: F41_ST })); else if (t < 102.3) { P.x = 500; if (f41In(t, 90.1, 93.7)) { const W = walk(F41_FXH, t, { stride: F41_ST }); P.x = W.x; P.ph = W.ph; P.amp = W.amp; } } else if (t < 137.28) P.x = F41_FX5(t);
  else if (t < 148.95) { const [hx, lift] = hop(t, 137.45, 0.35, 482, 392, 34); P.x = hx; P.y -= lift; }
  const crowH = f41CrowHead({ x: F41_CXF(t), y: F41_CY, s: 1.2, dir: -1 }), eye = () => f41FoxEye(P), toCrow = () => lookAt(eye(), crowH);
  P.gaze = toCrow(); P.talk = talk(t, F41_FOX_TALK);
  const wag = (a, hz = 4) => 0.65 + a * Math.sin(t * 2 * Math.PI * hz);
  if (t < 23.9) { if (t >= 23.2) { P.sq = landSquash(t, 23.2, 0.07); if (t < 23.6) P.gaze = [0.6, 1]; P.mouth = 'closed'; } }
  else if (t < 27.04) {   // bow, wave, wag
    P.tip = 0.12 * (F41B(t, 23.96, 0.3) - F41B(t, 24.55, 0.3)); if (t < 24.6) P.lid = 0.6;
    if (t >= 24.6 && t < 25.34) P.raise = F41B(t, 24.6, 0.2) * (0.75 + 0.25 * Math.sin((t - 24.6) * 17));
    if (t >= 25.34) { P.tailUp = wag(0.25 * (t < 26.3 ? 1 : 0.5)); P.headUp = -0.1; }
  }
  else if (t < 31.28) {   // sits, 'we are neighbours'
    P.sit = 0.4 * F41B(t, 27.04, 0.35); P.plant = true;
    if (t >= 27.5 && t < 28.52) { P.plant = false; P.raise = 0.45; }
    else if (t >= 28.52 && t < 29.22) { P.plant = false; P.reach = 0.7 * F41B(t, 28.52, 0.25); }
    else if (t >= 29.22 && t < 30.9) { P.plant = false; const u = (t - 29.22) / 1.68; P.reach = 0.5 + 0.5 * Math.abs(Math.cos(Math.PI * u)); P.headUp = 0.35 * Math.sin(Math.PI * u); P.gaze = lookAt(eye(), u < 0.5 ? [100, 1250] : crowH); }
  }
  else if (t < 36.7) {   // hope, the heart, the mimed help
    P.sit = 0.4 * (1 - F41B(t, 31.28, 0.3)); P.tip = 0.08 * F41B(t, 31.28, 0.3) * (1 - F41B(t, 34.2, 0.3)); P.ears = f41Ears(1); P.brow = -0.5;
    if (t >= 32.66 && t < 33.7) P.gaze = lookAt(eye(), f41Heart(t).p);
    if (t >= 34.28) { const k = (Math.sin((t - 34.28) * 5) + 1) / 2; P.raise = K.lerp(1, 0.6, k); P.headUp = 0.14 * (pulse(t, 34.94, 0.3) + pulse(t, 35.6, 0.3)); }
  }
  else if (t < 41.3) {   // mask off
    P.gaze = [-0.5, 0.15]; P.lid = 0.5; P.mouth = 'closed'; P.brow = 0.4; P.ears = f41Ears(0); P.headUp = 0.12 * F41B(t, 36.7, 0.3); P.tailUp = 0.3; P.talk = 0;
  }
  else if (t < 42.7) {   // the belly growls: caught, grin back on
    P.sq = 1 + 0.04 * Math.sin((t - 41.3) * 2 * Math.PI * 3) * (1 - F41B(t, 41.8, 0.3)); P.eyes = t < 41.65 ? 'wide' : 'open'; P.lid = t < 41.65 ? 0 : 0.2; P.brow = -0.6; P.raise = 0.35 * F41B(t, 41.35, 0.15);
    if (t < 41.65) P.gaze = [0.2, 1];
  }
  else if (t < 50) {   // inspected; the shadow behind him (he sees nothing)
    P.sit = 0.4 * F41B(t, 43.0, 0.4); P.plant = true; P.tailUp = wag(0.12, 2);
    if (f41In(t, 48.95, 49.95)) { const k = F41B(t, 48.95, 0.15) * (1 - F41B(t, 49.7, 0.25)); P.gaze = [-1, -0.5]; P.eyes = k > 0.5 ? 'wide' : 'open'; P.lid = 0; P.tailUp = K.lerp(P.tailUp, 1.3, k); P.puff = 1 + 0.45 * k; P.ears = f41Ears(-0.6 * k); P.mouth = 'closed'; P.headUp = -0.1 * k; }
  }
  else if (t < 57.54) {   // 'and I am a bird': the tongue; the innocent look
    P.sit = 0.4; P.plant = true;
    if (t >= 52.44 && t < 54.0) { P.mouth = 'smile'; P.lid = t < 52.79 ? 0.5 : 0; P.brow = -0.5; if (t >= 52.79) { const k = F41B(t, 52.79, 0.1) * (1 - F41B(t, 53.75, 0.25)); P.plant = false; P.raise = 0.6 * k; P.reach = 0; P.eyes = 'wide'; P.brow = -0.8; P.ears = f41Ears(-1); P.mouth = 'closed'; P.headUp = 0.38 * k; P.sq = 1 - 0.04 * pulse(t, 52.79, 0.3); } }
    if (t >= 55.2) { P.sit = 0.5; P.plant = false; P.raise = 0.7 * F41B(t, 55.2, 0.25); P.brow = -0.7; P.lid = 0; P.headUp = -0.08; }
  }
  else if (t < 62.78) {   // the heart bursts; he watches the dots fall
    P.sit = 0.5 * (1 - F41B(t, 58.4, 0.5)); P.plant = true; P.mouth = 'closed'; P.brow = -0.2;
    if (f41In(t, 57.85, 58.3)) { P.sq = 0.93; P.eyes = 'wide'; P.ears = f41Ears(-0.8); P.tip = -0.06; }
    if (t >= 58.3) { P.gaze = lookAt(eye(), [650, 900 + (t - 58.3) * 120]); P.ears = f41Ears(-0.5); P.lid = 0.2; }
  }
  else if (t < 64.5) {   // shakes it off, steps to the edge
    if (t < 63.72) { const u = t - 62.78; P.tip = 0.06 * Math.sin(u * 2 * Math.PI * 3.3) * (1 - u / 0.94); P.ears = f41Ears(K.lerp(-0.5, 1, F41B(t, 62.9, 0.4))); P.tailUp = 0.8; P.mouth = 'closed'; }
    else { P.sq = landSquash(t, 64.4, 0.06); P.tailUp = 0.8; }
  }
  else if (t < 72.1) {   // the speech, the vow, the peek
    if (t < 66.88) { P.raise = F41B(t, 64.5, 0.25); P.sq = 1 + 0.04 * F41B(t, 64.5, 0.3); P.lid = 0.3; }
    else if (t < 68.36) { const u = (t - 66.88) / 1.42; P.reach = F41B(t, 66.88, 0.2); P.headUp = K.lerp(-0.25, 0.2, u); P.gaze = lookAt(eye(), [K.lerp(100, 1000, u), 600]); }
    else { P.sit = 0.6 * F41B(t, 68.36, 0.35); P.raise = 0.7; P.lid = 1; P.headUp = -0.15; P.noBlink = true;
      if (f41In(t, 70.35, 70.9)) { P.lid = 0; P.gaze = toCrow(); P.brow = -0.6; }
      if (t >= 71.0 && t < 71.5) P.lid = 1;
      if (t >= 71.5) { P.lid = 0; P.eyes = 'wide'; P.raise = 0.7 * (1 - F41B(t, 71.6, 0.3)); P.brow = -0.7; }
    }
  }
  else if (t < 85.76) {   // tells his tale; waits, grinning
    P.sit = 0.4; P.brow = -0.3; P.raise = 0.8; P.gaze = t < 74 || t > 81.4 ? toCrow() : lookAt(eye(), [400, 330]);
    if (t >= 81.52) { P.raise = 0; P.reach = 0.8 * F41B(t, 81.52, 0.3); P.brow = -0.6; P.tailUp = wag(0.2); }
    if (t >= 82.34) { P.reach = 0; P.plant = false; P.reach = 0.75 * F41B(t, 82.5, 0.3); P.headUp = -0.12; P.mouth = 'smile'; P.brow = -0.6; P.ears = f41Ears(1); P.lid = 0.15; P.tip = 0.05 * F41B(t, 84.14, 0.4); P.tailUp = 0.65 + 0.25 * Math.sin((t - 82.34) * 2 * Math.PI * 3); P.gaze = toCrow(); }
  }
  else if (t < 92.6) {   // the flat look; the cloud swept away; nods
    P.sit = 0.4; P.plant = true; P.brow = -0.5; P.mouth = 'smile'; P.tip = 0.05 * (1 - F41B(t, 87.0, 0.6)); P.ears = f41Ears(K.lerp(1, 0.2, F41B(t, 87.3, 0.4)));
    { const ph = (t - 82.34) * 2 * Math.PI * 3, am = 0.25 * (1 - K.clamp((t - 85.76) / 2.08)); P.tailUp = 0.65 + am * Math.sin(ph); }   // the wag slows to a stop by 87.84
    if (t < 87.2) { P.plant = false; P.reach = 0.75 * (1 - F41B(t, 86.7, 0.45)); P.gaze = toCrow(); }
    if (f41In(t, 87.7, 88.2)) { P.eyes = 'wide'; P.lid = 0; P.sq = 0.96; P.mouth = 'closed'; }
    if (f41In(t, 87.84, 89.9)) P.mouth = 'closed';
    if (t >= 89.9) { const k = F41B(t, 90.1, 0.3); P.sit = 0.4 * (1 - k); P.plant = k < 0.5; P.ears = f41Ears(K.lerp(0.2, 1, k)); P.tailUp = K.lerp(0.65, 0.95, k) + 0.1 * k * Math.sin(t * 2 * Math.PI * 3); P.brow = -0.7; P.headUp = -0.12 * k; P.lid = 0; P.mouth = 'smile'; P.sq = 1 + 0.03 * pulse(t, 90.1, 0.4); }
  }
  else if (t < 103.32) {   // 'but you': the wolf; caught again
    P.sit = 0.4 * F41B(t, 93.7, 0.5); P.plant = true; P.headUp = 0.1 * (1 - F41B(t, 93.6, 0.5)); P.mouth = 'smile';
    if (t < 93.28) { P.ears = f41Ears(1); P.tailUp = 0.95 + 0.1 * Math.sin(t * 2 * Math.PI * 3); P.brow = -0.7; P.lid = 0; P.headUp = -0.12; }
    else if (t < 93.9) { P.eyes = 'wide'; P.lid = 0; P.brow = 0; P.ears = f41Ears(-0.3); P.tailUp = 0.95; P.headUp = 0; P.sq = 1 - 0.04 * pulse(t, 93.28, 0.25); }   // freezes
    if (t >= 93.9 && t < 97.08) P.gaze = lookAt(eye(), [400, 330]);
    if (t >= 97.08 && t < 99.6) { P.ears = f41Ears(-1); P.brow = -0.8; P.sq = 0.95; P.lid = 0; P.eyes = 'wide';
      P.gaze = look(t, eye(), [[97.08, [300, 760]], [97.4, [800, 760]], [97.75, [300, 700]], [98.1, [820, 600]], [98.5, [250, 820]], [98.9, crowH], [99.25, [300, 760]]], 0.07); }
    if (t >= 99.6) { P.ears = f41Ears(-0.4); P.brow = -0.5; P.mouth = 'closed'; P.lid = 0.2; }
    if (t >= 101.5 && t < 102.14) P.gaze = toCrow();
    if (t >= 102.14) { P.gaze = t < 102.7 ? [0.4, 1] : toCrow(); P.sit = 0.4 * (1 - F41B(t, 102.14, 0.3)); }
  }
  else if (t < 122.48) {   // her falcon tale: he wears the same polite smile, until he sees it
    P.sit = 0.4 * F41B(t, 103.5, 0.4); P.plant = true; P.mouth = 'smile'; P.brow = -0.4; P.lid = 0.3; P.gaze = t < 115.8 ? lookAt(eye(), [400, 330]) : toCrow();
    if (t >= 119.14 && t < 120.18) P.gaze = lookAt(eye(), f41Heart(t).p);
    if (f41In(t, 120.62, 120.84)) { P.lid = 1; P.noBlink = true; }
    if (t >= 120.0 && t < 121.76) { P.gaze = lookAt(eye(), F41_MEDAL); P.lid = 0.3; P.brow = -0.4; }
    if (t >= 121.76) { P.gaze = lookAt(eye(), F41_MEDAL); P.eyes = 'wide'; P.lid = 0; P.mouth = 'closed'; P.ears = f41Ears(-1); P.brow = -0.5; P.sq = 1 - 0.03 * pulse(t, 121.76, 0.3); }
  }
  else if (t < 137.28) {   // the sparrow; the limit
    P.sit = 0.4; P.plant = true; P.mouth = 'closed'; P.brow = -0.3; P.lid = 0.3; P.ears = f41Ears(-0.2); P.gaze = t < 132.3 ? lookAt(eye(), [400, 330]) : toCrow();
    if (t >= 131.6 && t < 132.6) { P.gaze = [0.3, 1]; P.ears = f41Ears(-0.5); P.sq = 1 - 0.03 * pulse(t, 131.7, 0.3); }
    if (t >= 136.6) { P.sit = 0.4 * (1 - F41B(t, 136.6, 0.4)); }
  }
  else if (t < 143.94) {   // tests the edge, springs back; the last try; the heart sinks
    if (t < 137.45) { P.reach = 0.5; P.headUp = 0.3; P.gaze = [0.5, 1]; P.mouth = 'closed'; }
    else if (t < 138.2) { P.sq = t < 137.8 ? 1.1 : landSquash(t, 137.8, 0.12); P.ears = f41Ears(-1); P.eyes = 'wide'; P.lid = 0; P.puff = 1.35; P.mouth = 'o'; P.tailUp = 0.7; }
    else { P.ears = f41Ears(-0.8); P.mouth = 'closed'; P.brow = -0.6; P.puff = K.lerp(1.35, 1, F41B(t, 138.2, 1)); }
    if (t >= 140.52 && t < 141.34) { P.reach = 0.6 * F41B(t, 140.52, 0.25); P.brow = -0.8; P.mouth = 'smile'; P.ears = f41Ears(0); P.gaze = lookAt(eye(), f41Heart(t).p); }
    if (t >= 142.44) { P.gaze = lookAt(eye(), f41Heart(t).p); P.ears = f41Ears(-0.4); P.headUp = 0.25 * F41B(t, 142.6, 1); P.plant = false; P.reach = 0.55 * F41B(t, 142.44, 0.3); P.mouth = 'o'; }
  }
  else {   // S11 lets go, walks away, sad then angry; stops; turns back; the admission
    // the collapse in steps: paw down (143.94), ears (145.21), tail, head and wet eyes (146.38), one look up at her (147.76), the turn (148.58)
    P.mouth = 'closed'; P.brow = -0.2 - 0.3 * F41B(t, 146.38, 0.5); P.lid = K.lerp(0.2, 0.55, F41B(t, 146.38, 0.6)); P.headUp = 0.25 + 0.1 * F41B(t, 146.38, 0.6);
    P.plant = false; P.reach = 0.55 * (1 - F41B(t, 143.94, 0.45));
    P.ears = f41Ears(K.lerp(-0.4, -1, F41B(t, 145.21, 0.25)));
    P.tailUp = 0.5 * (1 - F41B(t, 146.38, 0.35)) + swing(t, 146.73, 0.12, 1.6, 2.5); P.tip = 0.08 * F41B(t, 146.38, 0.6);
    P.sq = K.lerp(1, 0.94, F41B(t, 146.38, 0.6)); P.gaze = [0.4, 1];
    if (t >= 146.38) P.wet = true;
    if (f41In(t, 147.76, 148.4)) { P.gaze = toCrow(); P.lid = 0.25; }
    const TR = turnFlip(t, [[0, 1], [148.58, -1], [155.94, 1], [160.62, -1]], 0.7); P.dir = TR.dir; P.y += 10 * TR.sink;
    if (t >= 148.58 && t < 155.94) { P.x = t < 148.95 ? 392 : F41_FX(t); if (t >= 148.95) { const W = walk(F41_FXW, t, { stride: F41_ST }); P.ph = W.ph; P.amp = Math.min(0.6, W.amp); }
      P.headUp = 0.3; P.tip = 0.06; P.lid = 0.5; P.gaze = [0.2, 0.8];
      if (t < 152.04) P.wet = true;
      if (t >= 152.04 && t < 153.94) { P.brow = 1; P.ears = f41Ears(1); P.mouth = t < 152.9 ? 'open' : 'closed'; P.sq = 1 - 0.06 * pulse(t, 152.04, 0.25); P.headUp = 0; P.tip = 0.02; P.lid = 0.2; P.gaze = [1, 0]; }
      if (t >= 153.94) { P.amp = 0; P.plant = false; P.raise = 0.5 * F41B(t, 153.94, 0.2); P.brow = K.lerp(1, 0.3, F41B(t, 154.3, 1)); P.ears = f41Ears(t < 154.84 ? 0.4 : 1); P.headUp = 0; P.gaze = t < 155.2 ? [1, 0] : [1, -0.6]; P.tip = 0; }
    } else if (t >= 155.94) {
      P.x = 305; P.sit = 0.5 * F41B(t, 156.4, 0.5); P.plant = true; P.brow = K.lerp(0.3, 0, F41B(t, 155.94, 0.8)); P.ears = f41Ears(0); P.gaze = toCrow(); P.lid = 0.3; P.headUp = -0.1;
      if (t >= 157.46 && t < 159.8) { P.plant = false; P.reach = 0.8 * F41B(t, 157.46, 0.3); P.mouth = 'smile'; P.brow = -0.3; }
      if (t >= 159.8) { P.plant = false; P.raise = 0.45 * F41B(t, 159.85, 0.2); P.mouth = 'smile'; P.brow = -0.3; }
      if (t >= 160.4) { P.headUp = -0.1 + 0.15 * pulse(t, 160.4, 0.3); P.sit = 0.5 * (1 - F41B(t, 160.45, 0.2)); }
    } else P.x = 392;
  }
  return f41Lid(P, t, 21);
}
const F41_FX = (t) => (t < 148.95 ? 392 : F41_FXW(t));
const F41_FXH = (t) => kfn(t, [[90.2, 500], [90.55, 516], [93.3, 516], [93.62, 500]]);

// ---------- the crow ----------
const F41_CROW_FLY = [[120, 330], [520, 230], [760, 420], [838, 592]];
function f41CrowBase(t) {
  const P = { kind: 'crow', x: F41_CXF(t), y: F41_CY, s: 1.2, dir: -1, seed: 9, lid: 0.35, sq: 1 };
  if (t < 9.3) {   // S1 flies in and lands
    const u = K.ease.inOut(K.clamp((t - 8.3) / 1.0));
    const b = (k) => { const [a0, a1, a2, a3] = F41_CROW_FLY, m = 1 - k; return [m * m * m * a0[0] + 3 * m * m * k * a1[0] + 3 * m * k * k * a2[0] + k * k * k * a3[0], m * m * m * a0[1] + 3 * m * m * k * a1[1] + 3 * m * k * k * a2[1] + k * k * k * a3[1]]; };
    const p = b(u); P.x = p[0]; P.y = p[1]; P.dir = 1; P.fly = true; P.flap = Math.sin(t * 15) * (t > 9.0 ? 0.4 : 0.9); P.sag = t > 9.0 ? -0.6 : 0; P.lid = 0; P.gaze = [1, 0.3];
    return P;
  }
  const TF = turnFlip(t, [[0, 1], [10.3, -1]], 0.4); P.dir = TF.dir;
  const fp = t >= 21.54 && t < 161.15 ? f41FoxTop(Math.min(t, 161.1)) : null, head = () => f41CrowHead(P), toFox = () => (fp ? lookAt(head(), f41FoxEye(fp)) : [-0.8, 0.5]);
  P.gaze = toFox(); P.beak = 1.1 * talk(t, F41_CROW_TALK, 1);
  if (t < 12.38) {
    P.sq = landSquash(t, 9.3, 0.12); P.lid = 0.1;
    if (f41In(t, 9.88, 10.44)) { P.headRot = 0.35 * F41B(t, 9.88, 0.2); P.gaze = [0.3, 1]; P.beak = 0.5 * pulse(t, 10.1, 0.25); }
    if (t >= 10.44 && t < 11.85) P.gaze = gazePlan(t, [[10.44, [-1, 0.2]], [10.9, [1, 0.3]], [11.3, [-0.8, 0.4]], [11.6, [-1, 0.5]]], 0.07);
    if (t >= 11.85) { P.sq = 1 + 0.05 * Math.sin((t - 11.85) * 20) * (1 - F41B(t, 11.85, 0.5)); P.x += tremble(t, 2) * (1 - F41B(t, 11.85, 0.35)); }
    return f41Lid(P, t, 9);
  }
  if (t < 42.7) {
    P.sq = 0.94; P.drop = 4;
    if (t < 22.2) P.gaze = [-1, 0.4];
    if (f41In(t, 22.2, 23.2)) { P.eyes = t < 22.5 ? 'wide' : 'open'; P.sq = 0.92; P.sag = -0.4 * F41B(t, 22.2, 0.2); P.lid = 0; }
    if (f41In(t, 25.4, 26.6)) { P.headRot = -0.2; P.lid = 0.35; P.noBlink = t < 26.3; if (t >= 26.3) P.lid = Math.max(0.35, pulse(t, 26.3, 0.3)); }
    if (f41In(t, 32.66, 33.8)) P.gaze = lookAt(head(), f41Heart(t).p);
    if (f41In(t, 35.6, 42.0)) { P.headRot = 0.25 * F41B(t, 35.6, 0.3); P.lid = 0.4; }
    if (t >= 42.0) { P.lid = 0.55; P.headRot = 0.15; P.drop = 8; }
    return f41Lid(P, t, 9);
  }
  if (t < 61.22) {   // 'you hunt birds'; the shrink; the shake; the peck
    P.sq = 0.97;
    if (t < 44.54) { P.tip = 0.12 * F41B(t, 42.7, 0.3); P.lid = 0.4; const fe = fp ? f41FoxEye(fp) : [520, 800];
      P.gaze = look(t, head(), [[42.7, fe], [43.05, [fe[0] + 30, fe[1] + 30]], [43.4, [fe[0] - 40, 890]], [43.7, fe]], 0.07); }
    else if (t < 46.04) { P.sag = -0.3; P.headRot = -0.05; }
    else if (t < 50.14) { P.headRot = -0.15; }
    else if (t < 54.12) {   // 'and I am a bird': pulls back and down over the eggs, wing spread over the nest; one slow blink at his clap
      const k = F41B(t, 50.34, 0.3) * (1 - F41B(t, 53.7, 0.4)); P.sq = K.lerp(0.97, 0.88, k); P.x -= 15 * k; P.drop = 6 * k; P.headRot = -0.1 * k; P.wingK = k; P.wingAng = 0.62; P.crestUp = k;
      P.eyes = f41In(t, 50.34, 53.0) ? 'wide' : 'open'; P.lid = 0; if (t < 52.6) P.x += tremble(t, 1.2) * k;
      if (t >= 53.0) { P.lid = Math.max(0.3, pulse(t, 53.05, 0.75)); P.noBlink = true; } }
    else if (t < 56.34) { P.headRot = 0.4 * F41B(t, 54.12, 0.3); P.sag = -0.4; P.lid = 0; }
    else if (t < 57.34) { P.headRot = kfn(t, [[56.34, 0], [56.6, -0.25], [56.85, 0.25], [57.1, -0.15], [57.34, 0]]); if (t < 56.6) { P.eyes = 'shut'; } }
    else if (t < 59.06) { const back = F41B(t, 57.34, 0.2) * (1 - F41B(t, 57.54, 0.08)), jab = F41B(t, 57.54, 0.1) * (1 - F41B(t, 57.9, 0.4));
      P.headRot = -0.3 * back + 0.45 * jab; P.drop = -6 * back + 8 * jab; P.tip = 0.22 * jab; P.beak = t > 57.7 && t < 57.85 ? 0.8 : 0; }
    else if (t < 60.42) { P.sag = 0; P.headRot = -0.2; P.lid = 0.5; }
    else { P.headRot = -0.35; P.lid = 0.45; }
    return f41Lid(P, t, 9);
  }
  if (t < 103.32) {
    P.lid = 0.4;
    if (f41In(t, 67.0, 71.1)) { P.headRot = 0.5 + 0.05 * Math.sin(t * 9) - 0.15 * F41B(t, 70.45, 0.08); P.lid = 0.5; P.sag = 0.3; }
    if (f41In(t, 71.1, 72.1)) { P.lid = 0.3; P.noBlink = true; }
    if (f41In(t, 72.1, 82.34)) { P.headRot = 0.1; P.gaze = t > 74 && t < 81 ? lookAt(head(), [400, 330]) : toFox(); }
    if (f41In(t, 82.34, 87.46)) { P.headRot = 0.25 * F41B(t, 83.5, 2.0); P.gaze = t < 83.5 ? lookAt(head(), [400, 330]) : toFox(); if (f41In(t, 85.8, 86.6)) { P.lid = Math.max(0.4, pulse(t, 85.8, 0.8)); P.noBlink = true; } }
    if (f41In(t, 87.46, 88.6)) { const k = F41B(t, 87.46, 0.15) * (1 - F41B(t, 87.61, 0.1)), sw = F41B(t, 87.61, 0.25) * (1 - F41B(t, 88.0, 0.5)); P.sag = 0.3 * k - 0.9 * sw; P.tip = -0.1 * sw; }
    if (f41In(t, 89.7, 92.6)) { const n = pulse(t, 90.0, 0.32) + pulse(t, 90.42, 0.32); P.headRot = 0.3 * n; P.drop = 8 * n; P.sag = -0.2; P.lid = 0.25; }
    if (f41In(t, 92.6, 100.58)) { P.tip = 0.06; P.drop = 4; }
    if (t >= 100.58) { P.sag = 0.4; P.sq = 0.93; P.drop = 8; if (t >= 101.48 && t < 101.8) P.gaze = [-0.4, 1]; }
    return f41Lid(P, t, 9);
  }
  if (t < 132.3) {
    P.lid = 0.4; P.gaze = t < 115.8 && !f41In(t, 109, 111) ? lookAt(head(), [400, 330]) : toFox();
    if (t < 104.9) { P.sq = settleTo(t, 103.32, 0.93, 1.04, 0.5); P.sag = -0.3 * F41B(t, 103.4, 0.3); }
    if (f41In(t, 119.14, 120.1)) { P.headRot = -0.1; }
    if (f41In(t, 122.48, 124.1)) { P.sag = -0.5 * F41B(t, 122.48, 0.2); P.headRot = 0.2; }
    return f41Lid(P, t, 9);
  }
  if (t < 143.94) {
    P.sq = K.lerp(1, 1.08, F41B(t, 133.22, 0.4)); P.lid = 0.3; P.sag = -0.2;
    P.drop = -4 * (pulse(t, 134.46, 0.2) + pulse(t, 135.16, 0.2)); P.tip = 0.05 * (pulse(t, 134.46, 0.2) + pulse(t, 135.16, 0.2));
    if (f41In(t, 138.22, 139.56)) { P.headRot = -0.2; P.beak = Math.max(P.beak, 1.0); }
    if (f41In(t, 139.56, 141.34)) { P.sag = -0.5; P.tip = 0.15 * F41B(t, 139.56, 0.2); P.sq = 0.92; }
    if (f41In(t, 141.34, 142.44)) { P.lid = 1; P.noBlink = true; P.headRot = kfn(t, [[141.34, 0.25], [141.7, -0.25], [142.1, 0]]); }
    if (t >= 142.44) P.gaze = lookAt(head(), f41Heart(t).p);
    return f41Lid(P, t, 9);
  }
  // S11, S12
  P.lid = 0.35;
  if (f41In(t, 147.76, 152.84)) P.noBlink = true;
  if (t >= 152.84) { const [hx, lift] = hop(t, 152.84, 0.3, P.x, 826, 18); P.x = hx; P.y -= lift; P.sq = landSquash(t, 153.14, 0.1); P.headRot = 0.35 * F41B(t, 152.9, 0.2) * (1 - F41B(t, 154.2, 0.4)); }
  if (f41In(t, 159.8, 160.95)) { P.sq = 1.05; P.headRot = 0.3 * pulse(t, 159.95, 0.8); P.lid = 0.4; P.sag = 0.2; }
  if (t >= 161.15) { P.gaze = [-0.6, 0.6]; P.sag = 0.3 * pulse(t, 162.9, 0.7); }
  return f41Lid(P, t, 9);
}

// v2: the crow's gestures on top of the base timeline: a pointing wing on the four accusations, the crest, a head bob while she talks
const F41_POINTS = [[46.04, 2.2], [93.28, 1.0], [119.14, 1.0], [138.22, 1.2]];
const F41_CRESTS = [[47.78, 50.14], [93.28, 95.0], [120.68, 121.9], [138.98, 141.3]];
function f41Crow(t) { const P = f41CrowBase(t); if (t < 21.54) return P;
  for (const [t0, hold] of F41_POINTS) { const pt = f41Point(t, t0, hold); if (pt.back) P.sag = (P.sag || 0) + 0.5 * pt.back; if (pt.k > (P.wingK || 0)) { P.wingK = pt.k; const fe = f41FoxEye(f41FoxTop(t)), sc = P.s || 1; P.wingAng = K.clamp(Math.atan2(fe[1] - (P.y - 48 * sc), (fe[0] - P.x) * (P.dir ?? 1)), 0.15, 0.9); } }
  for (const [a, b] of F41_CRESTS) if (f41In(t, a, b + 0.3)) P.crestUp = Math.max(P.crestUp || 0, F41B(t, a, 0.12) * (1 - F41B(t, b, 0.3)));
  if (talk(t, F41_CROW_TALK) > 0) { const b = Math.max(0, Math.sin(t * 2 * Math.PI * 2.4)); P.drop = (P.drop || 0) + 5 * b; P.headRot = (P.headRot || 0) - 0.05 * b; }
  return P; }

// ---------- hearts ----------
function f41Heart(t) {   // {p: [x, y], r, a, show}
  if (t >= 32.66 && t < 57.75) {   // the first heart
    const from = [500, 830], to = [645, 650], u = F41B(t, 32.66, 1.0, 'out');
    let p = [K.lerp(from[0], to[0], u), K.lerp(from[1], to[1], u) + 6 * Math.sin(t * 2)];
    p[1] += 12 * F41B(t, 42.0, 0.6); if (t >= 56.6) { const k = F41B(t, 56.6, 0.9); p = [K.lerp(p[0], 728, k), K.lerp(p[1], 590, k)]; }
    let r = 34 * settleTo(t, 32.66, 0.2, 1, 0.5, 0.2); if (t >= 57.6) r *= 0.85;
    return { p, r, show: true, which: 1 };
  }
  if (t >= 66.18 && t < 143.94) {   // the second, bigger heart
    let p = [645, 640 + 7 * Math.sin(t * 1.8)], r = 44 * settleTo(t, 66.18, 0.2, 1, 0.5, 0.2) * (1 + 0.15 * (pulse(t, 66.18, 0.3) + pulse(t, 66.88, 0.3)));
    p[1] += 14 * F41B(t, 71.1, 0.8) - 20 * F41B(t, 90.1, 0.35) * (1 - F41B(t, 93.28, 0.3)); if (f41In(t, 119.14, 120.4)) p[0] += tremble(t, 3, 14);
    { const k = F41B(t, 115.9, 0.6) * (1 - F41B(t, 122.3, 0.6)); p[1] -= 150 * k; p[0] += 30 * k; }
    if (t >= 140.52) p = [K.lerp(p[0], 655, F41B(t, 140.52, 0.6)), p[1] - 40 * F41B(t, 140.52, 0.6) * (1 - F41B(t, 141.4, 0.8))];
    let a = 1; if (t >= 142.44) { const u = K.clamp((t - 142.44) / 1.5); r *= K.lerp(1, 0.35, u); p = [p[0] + 14 * Math.sin(u * Math.PI * 3), K.lerp(p[1], 1150, u * u)]; a = 1 - K.clamp((u - 0.8) / 0.2); }
    return { p, r, a, show: true, which: 2 };
  }
  return { p: [645, 650], r: 0, show: false };
}
// the burst: red halftone dots, then they fall into the chasm
function f41Burst(ctx, t) { const t0 = 57.75; if (t < t0 || t > 62.2) return; const c = [728, 590], d = t - t0;
  for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2 + 0.3, R = 70 * K.ease.out(K.clamp(d / 0.3)) * (0.6 + 0.4 * BRNG[i]), f = Math.max(0, d - 0.3);
    const x = K.lerp(c[0] + Math.cos(a) * R, 645 + (BRNG[i + 10] - 0.5) * 50, K.clamp(f / 1.2)), y = c[1] + Math.sin(a) * R * 0.8 + 260 * f * f;
    ctx.save(); ctx.globalAlpha = 1 - K.clamp((d - 3.6) / 0.8); shape(ctx, ell(x, y, 8 - 2 * BRNG[i], 8 - 2 * BRNG[i], 10), C.red, { lw: 3, seed: i }); ctx.restore(); } }

// ---------- pebbles ----------
const F41_PEBBLES = [[23.25, 596, 895, 30], [23.38, 586, 897, 18], [64.3, 598, 896, 26], [137.3, 596, 896, 22], [137.34, 586, 902, 36], [137.4, 578, 898, 10]];
function f41Pebbles(ctx, t) {
  F41_PEBBLES.forEach(([t0, x0, y0, vx], i) => { const d = t - t0; if (d < 0 || d > 1.2) return; f41Pebble(ctx, x0 + vx * d, y0 + 700 * d * d, 7 - (i % 3), i + 3); });
  { const d = t - 152.1; if (d > 0 && d < 1.0) f41Pebble(ctx, 290 - 330 * d, 893 - 260 * d + 600 * d * d, 7, 9); }   // the kicked pebble
}

// ---------- story clouds (world space) ----------
const F41_PAPER = '#fff6dc';
function f41InsideFig(c, t) {   // S2 the fox's thought: the crow reaches the figs, the fox cannot
  c.fillStyle = '#9fd0ff'; c.fillRect(-200, 200, 1400, 700); shape(c, [[-200, 900], [1300, 900], [1300, 1300], [-200, 1300]], GREEN, { lw: 7, seed: 31 });
  shape(c, [[640, 905], [650, 600], [672, 470], [720, 430], [770, 470], [790, 640], [800, 905]], STONE, { lw: 7, seed: 32, dot: STONED, pitch: 11, rad: 0.2, da: 0.6 });
  seg(c, 760, 450, 900, 400, 10, WOOD, 4); shape(c, ell(905, 395, 40, 26, 14), GREEN, { lw: 4, seed: 33 });
  const taken = t >= 16.52; [[820, 440], [850, 430], [880, 422]].forEach(([x, y], i) => { if (!(taken && i === 0)) fig(c, x, y + 16, 16); });
  // the small crow's flight (with a dotted trail), then she holds the fig
  const path = (k) => [K.lerp(-60, 700, k), 640 - 260 * Math.sin(Math.PI * K.clamp(k * 0.75)) * 0.9 - 120 * k * k];
  const u = K.ease.inOut(K.clamp((t - 14.08) / 2.1)), cp = path(u);
  if (t >= 14.6) { const pts = []; for (let k = 0; k <= u; k += 0.02) pts.push(path(k)); f41Dotted(c, pts, 1, C.black, 6, 16); }
  if (t >= 14.08) { const landed = t >= 16.18, P = { kind: 'crow', x: landed ? 700 : cp[0], y: landed ? 432 : cp[1], s: 1.25, dir: landed && t < 19.9 ? -1 : 1, fly: !landed, flap: Math.sin(t * 12) * 0.7, sq: landed ? landSquash(t, 16.18, 0.1) : 1, beak: 0 };
    if (t >= 16.52) { P.headRot = 0.2; } bird(c, P);
    if (t >= 16.52 && t < 19.95) { const g = 1 + 0.2 * pulse(t, 16.52, 0.5); fig(c, P.x + P.dir * 72, P.y - 70, 18 * g); if (t < 17.1) star(c, P.x + P.dir * 92, P.y - 96, 18 * pulse(t, 16.52, 0.6), C.white); } }
  // the small fox jumps twice and falls short
  const FP = { x: 420, y: 900, s: 0.85, dir: 1, ears: f41Ears(0.6), tailUp: 0.6, gaze: [0.7, -1], mouth: 'open' };
  const j1 = hop(t, 17.24, 0.5, 420, 450, 170), j2 = hop(t, 17.92, 0.42, 450, 470, 100);
  if (t >= 17.24) FP.x = t < 17.92 ? j1[0] : j2[0]; FP.y -= j1[1] + j2[1];
  FP.sq = anticipate(t, 17.04, 0.2, 0.12) * anticipate(t, 17.74, 0.18, 0.1) * landSquash(t, 17.74, 0.14) * landSquash(t, 18.34, 0.14);
  if (t >= 18.34) { FP.mouth = 'frown'; FP.ears = f41Ears(-0.8); FP.tailUp = 0.1; }
  if (t >= 19.9) { FP.mouth = 'open'; FP.ears = f41Ears(1); FP.tailUp = 0.8; FP.gaze = [0.3, -1]; }
  fox(c, FP);
  if (t >= 19.95) { const e = f41FoxPt(FP, 50, 14); fig(c, K.lerp(752, e[0], K.clamp((t - 19.95) / 0.4)), fallY(t, 19.95, 20.35, 382, e[1]), 16); }
}
function f41InsidePrivate(c, t) {   // S3 his private thought: food outweighs the heart
  if (t < 39.5) { const a = K.ease.back(f41Pop(t, 38.84, 0.25)), b = K.ease.back(f41Pop(t, 39.0, 0.25)); if (a > 0) fig(c, 380, 720, 70 * a); if (b > 0) f41Bone(c, 640, 740, 180 * b, -0.3, { meat: true });
    if (t > 38.9) star(c, 430, 640, 26 * pulse(t, 38.9, 0.5), C.white); return; }
  c.translate(500, 680); c.scale(1.45, 1.45); c.translate(-500, -680);
  const tilt = settleTo(t, 39.6, 0, 0.32, 0.6, 0.25), hw = 1 + 0.25 * Math.sin(t * 13) * K.clamp((t - 39.7) / 0.3);
  f41Scales(c, 500, 640, tilt, (k, x, y) => { fig(k, x - 18, y - 22, 26); f41Bone(k, x + 18, y - 14, 60, 0.2, { meat: true }); }, (k, x, y) => heart(k, x, y - 14 - 10 * Math.sin(t * 9), 12 * hw));
}
function f41InsideFlea(c, t) {   // S6 his tale: the flea and the mouse
  c.fillStyle = '#f2e3c0'; c.fillRect(-300, 200, 1800, 700); shape(c, [[-300, 900], [1600, 900], [1600, 1300], [-300, 1300]], '#c9952a', { lw: 7, seed: 41, dot: '#6e4a0a', pitch: 10, rad: 0.18, da: 0.5 });
  const hole = []; for (let i = 0; i <= 16; i++) { const a = Math.PI + i / 16 * Math.PI; hole.push([230 + Math.cos(a) * 70, 902 + Math.sin(a) * 110]); } shape(c, hole, NAVY2, { lw: 6, seed: 42 });
  // merchant and coins
  const mx = t < 79.34 ? 880 : 880 + 520 * K.clamp((t - 79.5) / 0.6), mUp = t >= 79.34, hopY = mUp ? Math.abs(Math.sin((t - 79.4) * 14)) * 40 : 0;
  f41Coins(c, 720, 900, 12, t >= 80.62 ? 1 : 0);
  if (t < 80.3) person(c, { x: mx, y: 900 - hopY, s: 1.0, costume: 'merchant', sit: mUp ? 1 - K.clamp((t - 79.34) / 0.13) : 1, seat: 'floor', lid: mUp ? 0 : 1, eyes: mUp ? 'wide' : 'open', sq: mUp ? 1.08 : breathe(t, 2, 0.02),
    handL: mUp ? PERSON_HANDS.armsOut.L : [-60, -60], handR: mUp ? PERSON_HANDS.mouthCover.R : [-90, -40], mouth: mUp ? 'o' : 'closed' });
  if (t >= 77.5 && t < 79.34) zzz(c, 950, 640, t, 77.5);
  // flea
  const F = { x: -80, y: 900, s: 1.9, dir: 1, ant: 0.2, bundle: t < 75.58, sq: 1 };
  const hops = [[73.8, 0.24, -80, 40, 50], [74.04, 0.24, 40, 160, 50], [74.28, 0.24, 160, 330, 50], [75.58, 0.45, 330, 235, 70], [76.26, 0.3, 235, 330, 40], [78.35, 0.6, 330, 875, 230], [79.4, 0.5, 875, 640, 120], [80.9, 0.3, 700, 620, 70]];
  let fx = -80, lift = 0, last = null; for (const h of hops) { if (t >= h[0]) { const r = hop(t, h[0], h[1], h[2], h[3], h[4]); fx = r[0]; lift = r[1]; last = h; } }
  F.x = fx; F.y = 900 - lift; if (last) F.sq = landSquash(t, last[0] + last[1], 0.18);
  if (t >= 78.95 && t < 79.4) { F.x = mx - 6; F.y = 740; }
  if (t >= 74.5 && t < 75.58) { F.x += tremble(t, 2, 12); F.ant = 0.1; }
  if (t >= 76.26 && t < 78.14) { F.raise = F41B(t, 76.5, 0.2); F.ant = 1; F.sq = Math.max(F.sq, 1.06); F.mouth = 'smile'; }
  if (t >= 78.14 && t < 78.35) F.sq = anticipate(t, 78.14, 0.21, 0.2);
  if (t >= 80.78) { F.mouth = 'smile'; F.ant = 1; F.y -= 10 * Math.abs(Math.sin((t - 80.78) * 6)); }
  if (t >= 81.2) { F.x = 600; F.y = 900 - 44 - 8 * Math.abs(Math.sin((t - 81.2) * 6)); }
  const inHole = t >= 75.95 && t < 76.3;
  // mouse
  const mox = t < 80.2 ? 235 : t < 80.7 ? K.lerp(235, 660, K.ease.inOut((t - 80.2) / 0.5)) : t < 81.2 ? K.lerp(660, 560, K.ease.inOut((t - 80.7) / 0.5)) : 560;
  if (t >= 74.6) { const M = { kind: 'mouse', x: mox, y: 900, s: 1.15, dir: t >= 80.7 && t < 81.2 ? -1 : 1, ears: 1, gaze: [1, -0.2] }, out = K.clamp((t - 74.6) / 0.3);
    if (t < 80.2) { M.x = K.lerp(170, 255, out); M.sit = t < 75.58 ? 1 : 0; M.sniff = t < 75.0 ? pulse(t, 74.6, 0.4) : 0; M.chew = f41In(t, 75.0, 75.58) ? 0.5 + 0.5 * Math.sin(t * 16) : 0; if (t >= 78.14) { M.sit = 0; M.x = 170; M.gaze = [1, -0.4]; } }
    else { Object.assign(M, walk(() => mox, t)); M.x = mox; M.amp = t < 81.2 ? 1 : 0; M.ph = mox / 18; }
    if (t >= 80.9) { M.mouth = 'smile'; M.y -= 8 * Math.abs(Math.sin((t - 80.9) * 6 + 1.5)); M.sit = 1; }
    rat(c, M); if (t >= 80.62) f41Coin(c, M.x + M.dir * 60, M.y - 44, 18, pulse(t, 80.62, 0.5)); }
  if (!inHole && t >= 73.8) f41Flea(c, F);
  if (t >= 75.75 && t < 76.6) heart(c, 235, 760 - 40 * (t - 75.75), 18 * K.ease.back(f41Pop(t, 75.75, 0.2)));
  c.save(); c.globalAlpha = 0; c.restore();
}
function f41InsideWolf(c, t) {   // S7 her memory: he tricked the wolf who lived with him
  c.fillStyle = '#6f6a86'; c.fillRect(-300, 200, 1600, 700); for (const [x, y, r] of [[120, 420, 120], [880, 380, 150], [500, 300, 160]]) shape(c, ell(x, y, r, r * 0.7, 16), '#585470', { lw: 0 });
  shape(c, [[-300, 900], [1300, 900], [1300, 1300], [-300, 1300]], SAND, { lw: 7, seed: 51, dot: '#a8741a', pitch: 10, rad: 0.2, da: 0.5 });
  const W = { x: 700, y: 900, s: 1.15, dir: -1, sit: 1, plant: true, ears: f41Ears(0.3), mouth: 'smile', tailUp: 0.3, gaze: [-1, 0.3], brow: 0.3 };
  if (t >= 95.26) { W.mouth = t < 95.8 ? 'open' : 'closed'; W.headUp = t < 95.8 ? -0.3 * pulse(t, 95.26, 0.54) : 0.35 * F41B(t, 95.8, 0.4); W.drop = 26 * F41B(t, 95.8, 0.4); W.lid = t < 95.8 ? 0.8 : 1; W.sq = breathe(t, 4, 0.025); W.sit = 1; }
  if (t >= 98.12) { W.lid = K.lerp(1, 0, F41B(t, 98.12, 0.3)); W.headUp = 0.35 * (1 - F41B(t, 98.12, 0.4)); W.drop = 26 * (1 - F41B(t, 98.12, 0.4)); W.ears = f41Ears(-0.8); W.mouth = 'frown';
    W.gaze = gazePlan(t, [[98.12, [-1, 0.3]], [98.4, [1, 0.2]], [98.7, [-1, 0.2]], [99.0, [-0.6, 0.6]]], 0.07); if (t >= 98.62) W.wet = true; }
  const boneTaken = t >= 96.85;
  if (!boneTaken) f41Bone(c, 545, 896, 120, 0.05, { meat: true });
  f41Wolf(c, W);
  const FX = (tt) => kfn(tt, [[96.54, 380], [98.0, -220]], 'in');
  const Fx = { x: 380, y: 900, s: 0.9, dir: 1, sit: 1, plant: true, ears: f41Ears(0.3), mouth: 'smile', tailUp: 0.3, gaze: [1, 0.3] };
  if (t >= 95.26 && t < 96.54) { Fx.lid = 0.8; Fx.gaze = [1, 0.6]; Fx.mouth = 'closed'; Fx.noBlink = true; }
  if (t >= 96.54) { Fx.sit = 1 - F41B(t, 96.54, 0.3); Fx.ears = f41Ears(-1); Fx.mouth = 'closed'; Fx.lid = 0.2;
    if (t < 96.85) { Fx.headUp = 0.4 * F41B(t, 96.54, 0.3); Fx.gaze = [1, 1]; }
    else { const Wk = walk(FX, t, { stride: 0.9 * 26 }); Fx.x = Wk.x; Fx.ph = Wk.ph; Fx.amp = Math.min(0.5, Wk.amp); Fx.dir = t < 97.0 ? 1 : -1; Fx.gaze = f41In(t, 97.3, 97.7) ? [1, 0] : [-1, 0.2]; Fx.tip = -0.04; Fx.drop = -6 * Math.abs(Math.sin(Fx.ph)); } }
  fox(c, Fx);
  if (boneTaken) { const m = f41FoxPt(Fx, 56, 18); f41Bone(c, m[0], m[1], 120, 0.05, { meat: true }); }
  if (t >= 98.85) sfx(c, '?', 640, 600, 110, f41Pop(t, 98.85, 0.25), { fill: C.yellow });
  c.save(); c.globalAlpha = 0.22; c.fillStyle = dotPat(c, C.blue, 12, 0.36); c.fillRect(-300, 200, 1600, 1100); c.restore();
}
// the falcon tale
const F41_SB = [['y', 140], ['b', 230], ['r', 320]];
function f41Falcon(t) {
  const P = { kind: 'hawk', pal: 0, x: 720, y: 769, s: 1.5, dir: -1, seed: 31, brow: 0.6, sq: 1 };
  if (t < 106.16) { const u = K.ease.out(K.clamp((t - 105.4) / 0.76)); P.x = K.lerp(1150, 720, u); P.y = K.lerp(380, 769, u); P.fly = true; P.flap = Math.sin(t * 13); }
  else { P.sq = landSquash(t, 106.16, 0.14); P.sag = -0.7 * (1 - F41B(t, 106.2, 0.4)); }
  if (t >= 107.18) { const k = Math.floor(K.clamp((t - 107.18) / 0.6) * 3 - 0.001), f = ((t - 107.18) / 0.2) % 1; P.x = t < 107.8 ? 720 - 66 * k - 66 * K.ease.inOut(f) : 522; P.y -= t < 107.8 ? 10 * Math.sin(Math.PI * f) : 0; }
  if (f41In(t, 107.86, 108.3)) { P.tip = 0.22 * pulse(t, 107.86, 0.3); P.beak = 0.6; }
  if (f41In(t, 108.5, 109.56)) { P.headRot = -0.45 * pulse(t, 108.5, 0.45); P.sag = -1 * F41B(t, 108.7, 0.2); P.sq = 1.08; }
  const age = F41B(t, 110.88, 0.5); P.age = age;
  if (age > 0) { P.sq *= 1 - 0.08 * age; P.drop = 10 * age; P.lid = 0.5 * age; P.brow = K.lerp(0.6, -0.2, age); P.tip = -0.05 * age; }
  if (f41In(t, 111.42, 112.26)) { const k = (t - 111.42) / 0.84; P.sag = (k < 0.55 ? -0.5 * F41B(t, 111.42, 0.25) : K.lerp(-0.5, 0.6, F41B(t, 111.88, 0.3))) + 0.08 * Math.sin(t * 50) * (k < 0.6 ? 1 : 0); }
  if (t >= 112.26) { P.sag = 0.4; P.lid = 0.3; P.brow = -0.4; P.headRot = 0.1; P.smile = true; }
  if (f41In(t, 113.0, 113.92)) { const k = F41B(t, 113.0, 0.15); P.sag = 0.4 + 1.2 * k; P.headRot = 0.1 - 0.25 * k; P.look = k; }   // 'look over there!'
  if (f41In(t, 113.92, 114.9)) { const k = F41B(t, 113.92, 0.12) * (1 - F41B(t, 114.35, 0.3)); P.x -= 70 * k; P.tip = 0.35 * k; P.headRot = 0.35 * k; P.smile = false; }
  if (t >= 114.9) { P.lid = 1; P.noBlink = true; P.beak = 0.3 * (Math.sin(t * 14) + 1); P.smile = false; }
  return P;
}
const F41_WORMX = 395;
function f41DrawFalcon(c, P) { c.save(); if (P.age) c.filter = `grayscale(${0.85 * P.age})`; bird(c, P); c.restore(); if (P.smile) f41HawkSmile(c, P); }
function f41InsideFalcon(c, t, medal) {
  const tp = K.clamp((t - 109.56) / 1.24), bgc = tp <= 0 || tp >= 1 ? F41_PAPER : tp < 0.35 ? mixHex(F41_PAPER, '#f0883a', tp / 0.35) : tp < 0.65 ? mixHex('#f0883a', '#1d2a60', (tp - 0.35) / 0.3) : mixHex('#1d2a60', '#e9f0ff', (tp - 0.65) / 0.35);
  c.fillStyle = bgc; c.fillRect(-300, 200, 1600, 1100);
  const dip = t >= 106.16 ? K.spring(t, 106.16, 16, 7, 4) : 0, by = 780 + dip;
  seg(c, -200, by, 1200, by + 10, 24, WOOD, 5); seg(c, 980, by + 6, 1060, by - 70, 12, WOOD, 4); if (t >= 110.2) seg(c, 640, by, 700, by - 60 * K.clamp((t - 110.2) / 0.4), 7, '#7a5a3a', 3);
  const FP = f41Falcon(t); FP.y = FP.fly ? FP.y : by - 11 + (FP.y - 769); f41Lid(FP, t, 31);
  // the three small birds: own reactions, never in unison (except the trick at 113.92)
  F41_SB.forEach(([k, x0], i) => { const d = stagger(i, 0.1), P = { kind: k, x: x0, y: by - 11, s: 0.95, dir: 1, seed: 40 + i, gaze: lookAt([x0, by - 80], [FP.x, FP.y - 120]) };
    if (t >= 106.16) P.y += 0; if (f41In(t, 106.16, 106.8)) P.y -= 10 * pulse(t, 106.16 + d, 0.3);
    if (t >= 107.4 + d) { P.x -= 18 * F41B(t, 107.4 + d, 0.2); P.tip = -0.12 * pulse(t, 107.4 + d, 0.5); }
    if (t >= 108.5 + d) { P.x -= 40 * F41B(t, 108.5 + d, 0.3); P.tip = (P.tip || 0) - 0.18 * pulse(t, 108.5 + d, 0.8); P.eyes = t < 109.3 ? 'wide' : 'open'; }
    if (t >= 111.5 + d * 1.5) { P.sq = 1.05; P.gaze = i === 1 ? [-1, 0] : [1, 0]; P.x += 22 * F41B(t, 111.8 + d * 1.5, 0.25); }
    if (t >= 112.26) { P.gaze = lookAt([P.x, by - 80], [F41_WORMX, by - 20]); P.sq = 1; }   // the worm in front of them
    if (f41In(t, 113.0, 114.9)) { P.dir = -1; P.gaze = [-1, -0.6]; P.headRot = 0.15; }   // all three look where he points (the one unison)
    if (t >= 114.9) { const back = t >= 114.9 + stagger(i, 0.15); P.dir = back ? 1 : -1; if (back) { P.eyes = 'wide'; P.lid = 0; P.gaze = [0.6, 0.7]; if (i === 0) P.beak = 1.2; if (i === 1) P.sag = -0.8; if (i === 2) P.headRot = 0.3; } }
    if (k === 'r' && f41In(t, 107.2, 107.95)) { P.beak = 0.3; worm(c, P.x + 44, P.y - 70, t); }

    if (t >= 108.5 + d && t < 109.3) P.x += tremble(t, 1.5, 10);
    bird(c, f41Lid(P, t, 40 + i)); });
  if (f41In(t, 107.95, 108.6)) worm(c, FP.x - 80, FP.y - 100 + FP.drop, t);
  // the worm on the branch in front of the small birds (112.26), taken at 113.92 (bigger: at least 20 px on screen)
  if (f41In(t, 112.26, 114.1)) { c.save(); c.translate(F41_WORMX, by - 18); c.scale(2.4, 2.4); worm(c, 12, 0, t); c.restore(); }
  else if (f41In(t, 114.1, 114.9)) { c.save(); c.translate(FP.x - 70, FP.y - 160 + (FP.drop || 0)); c.scale(1.6, 1.6); worm(c, 10, 0, t); c.restore(); }
  f41DrawFalcon(c, FP);
  if (FP.look) { c.save(); c.globalAlpha = FP.look; sfx(c, 'LOOK!', FP.x - 330, FP.y - 330, 80, f41Pop(t, 113.0, 0.25), { rot: -0.1, fill: C.yellow }); S0.arrow(c, [FP.x - 200, FP.y - 260], [FP.x - 470, FP.y - 230], F41B(t, 113.05, 0.3), { width: 14, bend: 0.1 }); c.restore(); }
  feather(c, t, { t0: 111.65, t1: 112.9, a: [FP.x - 10, by - 60], b: [FP.x - 60, 1000], col: '#c8c0b0' });
  if (medal) return FP;
}
function f41InsideSparrow(c, t) {   // S9 the sparrow who copied the eagle
  c.fillStyle = '#cfe8ff'; c.fillRect(-300, 200, 1600, 1100);
  shape(c, [[-300, 905], [100, 880], [500, 900], [900, 870], [1300, 895], [1300, 1300], [-300, 1300]], GREEN, { lw: 7, seed: 61, dot: GREEND, pitch: 10, rad: 0.2, da: 0.5 });
  shape(c, ell(140, 885, 80, 36, 14), STONE, { lw: 6, seed: 62, dot: STONED, pitch: 9, rad: 0.2, da: 0.5 });
  const sh = { x: 560, y: 900, s: 1.1, dir: 1, kind: 'ewe', chew: 0.5 + 0.5 * Math.sin(t * 7), headDown: t < 131.6 ? 0.5 : 0.1, tip: -0.05 * pulse(t, 127.1, 0.6) };
  if (t >= 131.6) sh.gaze = [-1, -0.5];
  sheep(c, sh);
  // the eagle swoops and takes the lamb
  const tk = 127.05, egl = { kind: 'hawk', pal: 1, s: 1.1, dir: -1, fly: true, flap: Math.sin(t * 10), seed: 33 };
  if (t < tk) sheep(c, { x: 820, y: 900, s: 1.0, dir: -1, kind: 'lamb', headDown: 0.6, chew: 0.3 });
  if (f41In(t, 126.38, 127.95)) { const u1 = K.clamp((t - 126.38) / (tk - 126.38)), u2 = K.clamp((t - tk) / 0.9);
    egl.x = t < tk ? K.lerp(1250, 820, K.ease.in(u1)) : K.lerp(820, -300, K.ease.in(u2)); egl.y = t < tk ? K.lerp(320, 790, Math.sin(Math.PI / 2 * u1)) : K.lerp(790, 330, Math.sin(Math.PI / 2 * u2));
    if (t >= tk) { egl.carry = (k) => sheep(k, { x: 0, y: 140, s: 1.0, dir: -1, kind: 'lamb', mouth: 'o', eyes: 'wide' }); egl.swing = swing(t, tk, 0.4); }
    c.save(); c.globalAlpha = 0.7; c.lineWidth = 6; c.strokeStyle = C.white; c.lineCap = 'round'; for (let i = 0; i < 3; i++) { c.beginPath(); c.moveTo(egl.x + 120 + i * 40, egl.y - 60 + i * 30); c.lineTo(egl.x + 260 + i * 60, egl.y - 70 + i * 30); c.stroke(); } c.restore();
    bird(c, egl); }
  // the sparrow
  const S = { kind: 'sparrow', x: 140, y: 852, s: 1.4, dir: 1, seed: 44 };
  if (t >= 125.46) { S.headRot = -0.4 * F41B(t, 125.46, 0.2) * (1 - F41B(t, 127.98, 0.2)); S.eyes = t < 127.98 ? 'wide' : 'open'; S.gaze = t < 126.38 ? [0.2, -1] : lookAt([140, 760], [egl.x || 600, egl.y || 400]); }
  if (t >= 127.98) { S.sq = K.lerp(1, 1.18, F41B(t, 127.98, 0.3)) * anticipate(t, 128.4, 0.2, 0.15); S.sag = -0.4; }
  const backP = [520, 772];
  if (t >= 128.6) { const u = K.ease.inOut(K.clamp((t - 128.6) / 0.6)); S.x = K.lerp(140, backP[0], u); S.y = K.lerp(852, backP[1], u) - 140 * Math.sin(Math.PI * u); S.fly = u < 1; S.flap = Math.sin(t * 22); S.sq = 1.1; }
  if (t >= 129.2) { S.x = backP[0]; S.y = backP[1]; S.fly = false; const h = Math.sin((t - 129.2) * 2 * Math.PI * 2.7); S.sq = 1.02 + 0.08 * h; S.tip = -0.2; S.sag = -0.6 + 0.2 * h; S.beak = 0.6; }
  if (t >= 130.42) { S.fly = true; S.flap = Math.sin(t * 34) * 1.6; S.sq = 1 + 0.15 * Math.abs(Math.sin((t - 130.42) * 7)); S.tip = 0; S.eyes = 'wide'; }
  if (t >= 131.54) { const sw = swing(t, 131.54, 0.5); S.rot = Math.PI * F41B(t, 131.54, 0.3) + sw; S.fly = false; S.flap = 0; S.sq = 1; S.lid = 0.6; S.eyes = 'open'; S.sag = 0.7; }
  bird(c, f41Lid(S, t, 44));
  if (t >= 130.42) for (const dx of [-8, 10]) shape(c, ell(backP[0] + dx, backP[1] + 2, 14, 10, 10), C.white, { lw: 3, seed: 7 });
  if (t >= 131.8) dizzy(c, backP[0], backP[1] + 110, t, 40);
}

// all clouds, in world space
function f41Clouds(ctx, t, fox) {
  const fh = fox ? f41FoxPt(fox, 30, -10) : [500, 800], fm = fox ? f41FoxPt(fox, 70, 14) : [520, 800], cb = [790, 525];
  // S2 his idea (yellow)
  if (f41In(t, 13.2, 20.6)) thoughtCloud(ctx, 590, 1535, 560, 380, t, { p: K.clamp((t - 13.2) / 0.8) * (1 - K.clamp((t - 20.45) / 0.12)), tail: fh, inside: f41InsideFig, scale: 0.45, at: [520, 700], bg: C.yellow, seed: 5 });
  // S3 private thought (yellow, on the side she cannot see)
  if (f41In(t, 37.86, 41.4)) thoughtCloud(ctx, 330, 625, 280, 200, t, { p: K.clamp((t - 37.86) / 0.6) * (1 - K.clamp((t - 41.25) / 0.12)), tail: fh, inside: f41InsidePrivate, scale: 0.58, at: [500, 700], bg: C.yellow, seed: 8 });
  // S6 his tale (paper); swept away by her wing at 87.84
  if (f41In(t, 72.1, 88.2)) { const slide = kfn(t, [[77.3, 0], [77.9, 100]]), gone = K.clamp((t - 87.84) / 0.3);
    ctx.save(); if (gone > 0) { ctx.translate(478, 300); ctx.rotate(-0.15 * gone); ctx.translate(-478 - 160 * gone, -300); ctx.globalAlpha = 1 - gone; }
    thoughtCloud(ctx, 478, 300, 515, 380, t, { p: K.clamp((t - 72.1) / 0.9), tail: gone > 0 ? null : fm, inside: f41InsideFlea, scale: 0.5, at: [500 + slide, 700], bg: F41_PAPER, seed: 12 }); ctx.restore();
    if (gone > 0) for (let i = 0; i < 8; i++) { const a = i * 0.8, r = 40 + 260 * gone; ctx.save(); ctx.globalAlpha = 1 - gone; ctx.beginPath(); ctx.arc(400 + Math.cos(a) * r, 300 + Math.sin(a) * r * 0.6, 22 * (1 - gone) + 4, 0, 7); ctx.fillStyle = C.white; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.black; ctx.stroke(); ctx.restore(); } }
  // S7 her memory (blue)
  if (f41In(t, 93.96, 100.1)) thoughtCloud(ctx, 462, 300, 497, 370, t, { p: K.clamp((t - 93.96) / 0.8) * (1 - K.clamp((t - 99.64) / 0.4)), tail: cb, inside: f41InsideWolf, scale: 0.5, at: [500, 700], bg: '#cfe0ff', seed: 17 });
  // S8 her falcon tale (paper), then the medallion
  if (f41In(t, 104.94, 116.0)) thoughtCloud(ctx, 462, 300, 497, 370, t, { p: K.clamp((t - 104.94) / 0.8) * (1 - K.clamp((t - 115.72) / 0.28)), tail: cb, inside: (c, tt) => f41InsideFalcon(c, tt), scale: 0.5, at: [430, 700], bg: F41_PAPER, seed: 21 });
  // S9 the sparrow (paper)
  if (f41In(t, 124.22, 132.6)) thoughtCloud(ctx, 462, 300, 497, 370, t, { p: K.clamp((t - 124.22) / 0.8) * (1 - K.clamp((t - 132.3) / 0.25)), tail: cb, inside: f41InsideSparrow, scale: 0.5, at: [500, 720], bg: F41_PAPER, seed: 26 });
  if (f41In(t, 132.3, 134.2)) { const u = (t - 132.3) / 1.9; ctx.save(); ctx.globalAlpha = 1 - u; shape(ctx, ell(470 + 40 * Math.sin(u * 9), 320 + 520 * u, 12, 9, 10), C.white, { lw: 3, seed: 4 }); ctx.restore(); }
}
const F41_MEDAL = [740, 720];
// a sweet smile at the hawk's gape (head frame of cast/birds2.js birdHawk)
function f41HawkSmile(ctx, P) { const s = P.s || 1, dir = P.dir ?? 1, hy = -124 + (P.drop || 0); ctx.save(); ctx.translate(P.x, P.y); ctx.scale(dir * s, s); if (P.headRot) { ctx.translate(10, hy + 18); ctx.rotate(P.headRot); ctx.translate(-10, -(hy + 18)); }
  ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(30, hy + 6); ctx.quadraticCurveTo(38, hy + 16, 52, hy + 8); ctx.stroke(); ctx.beginPath(); ctx.moveTo(27, hy + 3); ctx.lineTo(31, hy + 9); ctx.stroke(); ctx.restore(); }
// the falcon medallion (115.72-122.48): the old smiling falcon parked beside the fox's face
function f41Medal(ctx, t) {
  if (t < 115.8 || t >= 122.48) return; const g = K.ease.back(f41Pop(t, 115.8, 0.35)) * (1 - K.clamp((t - 122.2) / 0.2)), m = F41B(t, 116.6, 1.4);
  const cx = K.lerp(462, F41_MEDAL[0], m), cy = K.lerp(300, F41_MEDAL[1], m), r = 78 * g; if (r < 2) return;
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.clip(); ctx.fillStyle = F41_PAPER; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  const FP = f41Falcon(Math.min(t, 112.5)); FP.x = 600; FP.y = 790; FP.lid = f41In(t, 120.62, 120.84) ? 1 : 0.3; FP.brow = -0.4; FP.headRot = 0.08; FP.sag = 0.2; FP.noBlink = true; FP.gaze = [-0.8, 0.3]; FP.dir = -1;
  ctx.translate(cx, cy); ctx.scale(0.8, 0.8); ctx.translate(-586, -650); seg(ctx, 300, 780, 900, 790, 24, WOOD, 5); FP.smile = true; f41DrawFalcon(ctx, FP); ctx.restore();
  ctx.save(); ctx.lineWidth = 10; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke(); ctx.restore();
}

// a fleeing bird silhouette: a flapping gull-wing V with a small body (s 1: about 90 units wide)
function f41FleeBird(ctx, x, y, s, f) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = C.black; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 11;
  ctx.beginPath(); ctx.moveTo(-46, -18 * f); ctx.quadraticCurveTo(-22, -26 * f - 10, 0, 0); ctx.quadraticCurveTo(22, -26 * f - 10, 46, -18 * f); ctx.stroke(); ctx.beginPath(); ctx.ellipse(-4, 4, 16, 9, -0.2, 0, 7); ctx.fill(); ctx.beginPath(); ctx.moveTo(-18, 6); ctx.lineTo(-34, 0); ctx.lineTo(-32, 14); ctx.fill(); ctx.restore(); }
// how much a story cloud covers the summit sky (the sun fades out under it)
const F41_CLOUDS = [[72.1, 88.2], [93.96, 100.1], [104.94, 116.0], [124.22, 132.6]];
const f41CloudUp = (t) => F41_CLOUDS.reduce((m, [a, b]) => Math.max(m, K.clamp(Math.min((t - a) / 0.3, (b - t) / 0.3))), 0);

// ---------- the world ----------
function f41World(ctx, t, cam) {
  f41Hill(ctx);
  // the crumbled lip (after 137.28)
  if (t >= 137.28) { shape(ctx, [[566, 899], [601, 899], [601, 940], [588, 918]], NAVY2, { lw: 4, seed: 7 }); const d = t - 137.28; if (d < 1.2) shape(ctx, [[570 + 10 * d, 900 + 600 * d * d], [600 + 10 * d, 900 + 600 * d * d], [592 + 10 * d, 930 + 600 * d * d]], STONE, { lw: 4, seed: 8 }); }
  // nest and crow (from the landing on; the nest is always there)
  const top = t >= 21.54 && t < 161.15, foot = !top;
  nestDraw(ctx, F41_NEST[0], F41_NEST[1], { nb: 1, t, eggs: 3, rock: t >= 9.3 && t < 10 ? 0.04 * K.spring(t, 9.3, 1, 9, 6) : 0 });
  if (t >= 8.3) f41DrawCrow(ctx, f41Crow(t));
  if (t >= 9.3 && t < 10.2) for (let i = 0; i < 2; i++) { const d = t - 9.3 - i * 0.05; seg(ctx, 760 + i * 50, 560 - 40 * Math.sin(Math.PI * K.clamp(d / 0.5)), 776 + i * 50, 566 - 40 * Math.sin(Math.PI * K.clamp(d / 0.5)), 3, '#f2d27a', 1.5); }
  // the fox
  const fxP = top ? f41FoxTop(t) : f41FoxFoot(t);
  // the hunter shadow on the wall (47.04-50.0), 2 frames late
  if (f41In(t, 47.04, 50.3)) { const g = K.lerp(1.6, 1.85, F41B(t, 47.04, 0.74)) * K.lerp(1, 0.75, F41B(t, 49.5, 0.7)), sx = 95, sy = 845;
    const SP = { x: sx, y: sy, s: 0.8 * g, dir: 1, mouth: 'open', brow: 1, ears: f41Ears(1), raise: 1, reach: 0.6, plant: false, sit: 0.35, headUp: -0.25 - 0.1 * pulse(t, 48.54, 0.4), lid: 0, talk: 0, eyes: 'open', tailUp: 0.3, ph: 0, amp: 0 };
    f41FlatShadow(ctx, F41_WALL, 0.55 * f41Fade(t, 47.04, 50.3, 0.4), 790, 860, (c) => { c.translate(sx, sy); c.transform(1, 0, -0.3, 1, 0, 0); c.translate(-sx, -sy); fox(c, SP);
      // claws on the raised paws, a row of teeth in the open jaws
      const pw = f41FoxPt({ ...SP, headUp: 0 }, 70, 70); for (let i = 0; i < 3; i++) shape(c, [[pw[0] + 20 + i * 12, pw[1] - 30 + i * 8], [pw[0] + 46 + i * 12, pw[1] - 24 + i * 8], [pw[0] + 26 + i * 12, pw[1] - 18 + i * 8]], C.black, { lw: 2 }); });
    if (t >= 48.54) for (let i = 0; i < 3; i++) { const u = K.clamp((t - 48.54 - stagger(i, 0.12)) / 1.3); if (u <= 0 || u >= 1) continue; ctx.save(); ctx.filter = 'brightness(0)'; ctx.globalAlpha = 0.85 * (1 - K.clamp((u - 0.8) / 0.2));
      f41FleeBird(ctx, K.lerp(300 - i * 70, -60 - i * 40, u), K.lerp(640 - i * 70, 260 - i * 60, u) + 20 * Math.sin(u * 9 + i), 1.6 - 0.2 * i, Math.sin(t * 22 + i * 2)); ctx.restore(); } }
  // the tail drag line (149.9-152.0)
  if (f41In(t, 149.9, 154.5)) { ctx.save(); ctx.globalAlpha = 0.6 * (1 - K.clamp((t - 153.5) / 1)); ctx.lineWidth = 4; ctx.strokeStyle = STONED; ctx.beginPath(); ctx.moveTo(F41_FX(149.9) + 110, 897); ctx.lineTo(F41_FX(Math.min(t, 152.0)) + 110, 897); ctx.stroke(); ctx.restore(); }
  // footfall dust
  for (const f of t < 30 ? F41_FALLS : F41_FALLS12) { const gy = f.t > 21.54 && f.t < 30 ? F41_GT : F41_GF; dustBurst(ctx, f.x + (f.odd ? 50 : -40) * (t > 160 ? -1 : 1), gy - 4, t - f.t, 4, 5, 10, 24, 0.45, Math.round(f.t * 10)); }
  if (top) fox(ctx, fxP); else { ctx.save(); ctx.beginPath(); K.poly(ctx, F41_CAVE, true); ctx.rect(460, 0, 2000, 2400); ctx.rect(-1000, F41_GF, 3000, 400); ctx.clip(); fox(ctx, fxP); ctx.restore(); }
  const fe = f41FoxEye(fxP);
  // small fox props: tongue, sweat, flush, steam, tear, bone, belly arcs
  if (top) {
    if (f41In(t, 38.84, 39.04)) { const m = f41FoxPt(fxP, 52, 22); f41Tongue(ctx, m[0], m[1], 1, 0.8); }
    if (f41In(t, 52.44, 52.74)) f41Lick(ctx, fxP, (t - 52.44) / 0.3);
    if (f41In(t, 52.79, 54.0)) f41PawsOverMouth(ctx, fxP, F41B(t, 52.79, 0.1) * (1 - F41B(t, 53.75, 0.25)));
    if (f41In(t, 52.6, 53.8)) { const m = f41FoxPt(f41FoxTop(52.6), 60, 26), u = K.clamp((t - 52.7) / 0.9); f41Drop(ctx, m[0] + 60 * u, t < 52.7 ? m[1] + 10 * (t - 52.6) / 0.1 : fallY(t, 52.7, 53.6, m[1] + 10, 1250), 5); }
    if (f41In(t, 41.5, 42.6)) f41Sweat(ctx, fe[0] - 30, fe[1] - 30 + 30 * (t - 41.5), f41Fade(t, 41.5, 42.6, 0.15), 0.9);
    if (f41In(t, 97.3, 99.6)) f41Sweat(ctx, fe[0] - 34, fe[1] - 34 + 22 * ((t - 97.3) % 1.1), f41Fade(t, 97.3, 99.6, 0.15), 0.9);
    if (f41In(t, 41.3, 42.2)) { soundArcs(ctx, fxP.x + 14, fxP.y - 58, -1, t, C.red); soundArcs(ctx, fxP.x + 30, fxP.y - 52, 1, t, C.red); }
    if (f41In(t, 152.04, 156.8)) { const hc = f41FoxPt(fxP, 14, 4); f41Flush(ctx, hc[0], hc[1], 30, F41B(t, 152.04, 0.3) * (1 - F41B(t, 155.94, 0.8))); }
    if (f41In(t, 152.1, 153.2)) { ctx.save(); ctx.globalAlpha = f41Fade(t, 152.1, 153.2, 0.2); const ea = f41FoxPt(fxP, -6, -40); steam(ctx, ea[0], ea[1], t); ctx.restore(); }
    if (f41In(t, 150.78, 152.2)) { const e = f41FoxEye(f41FoxTop(150.78)), x0 = e[0] - 4, y = fallY(t, 150.9, 151.42, e[1] + 6, 896); if (t < 150.9) f41Drop(ctx, x0, e[1] + 6, 8 * F41B(t, 150.78, 0.12)); else if (t < 151.42) f41Drop(ctx, x0 - 10 * (t - 150.9), y, 8); else f41Drop(ctx, x0 - 5, 896, 8, K.clamp((t - 151.42) / 0.35)); }
    if (f41In(t, 152.84, 153.9)) soundArcs(ctx, 770, 520, -1, t, C.white);
  } else if (t < 12.38) {
    f41Bone(ctx, 650 + 8 * F41B(t, 4.98, 0.4), 2094, 70, K.lerp(0.1, -0.45, F41B(t, 4.98, 0.4)) + swing(t, 5.38, 0.08, 2));
    if (f41In(t, 3.55, 4.24)) soundArcs(ctx, fxP.x + 10, fxP.y - 60, -1, t, C.red);
    if (f41In(t, 6.8, 7.8)) soundArcs(ctx, 700, 1500, -1, t, C.white);
  } else if (t >= 161.15 && f41In(t, 164.6, 165.6)) soundArcs(ctx, 330, 2040, 1, t, C.red);
  // hearts, burst, pebbles
  const H = f41Heart(t); if (H.show && H.r > 1) heart(ctx, H.p[0], H.p[1], H.r, { alpha: H.a ?? 1 });
  f41Burst(ctx, t); f41Pebbles(ctx, t);
  // the darkness of the cave over anything inside it, and the eyes that look out
  if (foot && (t < 2.4 || t > 163.3)) { ctx.save(); K.poly(ctx, F41_CAVE, true); ctx.clip(); ctx.globalAlpha = 0.97; ctx.fillStyle = NAVY2; ctx.fillRect(190, 1860, 280, 250); ctx.restore();
  }
  if (foot) { const eyeIn = (e) => e[0] > 205 && e[0] < 455 && e[1] > 1880;
    if (t < 12.38 && eyeIn(fe)) f41CaveEyes(ctx, fe[0], fe[1], t < 0.15 ? [1, 1] : t < 0.3 ? [0, 1] : [0, 0], t < 0.5 ? [-0.8, 0] : [0.8, 0]);
    if (t >= 164.55) { const op = F41B(t, 164.6, 0.15), wide = pulse(t, 164.7, 0.3), sh = F41B(t, 165.25, 0.6), l = Math.max(1 - op, sh); f41CaveEyes(ctx, 330, 2010, [l, Math.min(1, l + 0.1)], [0.6, 0.1], 1 + 0.25 * wide); } }
  // the clouds
  f41Clouds(ctx, t, top ? fxP : null); f41Medal(ctx, t);
  // the limit line (136.12-140.5)
  if (f41In(t, 136.12, 140.6)) { ctx.save(); ctx.globalAlpha = f41Fade(t, 136.12, 140.6, 0.3); f41Dotted(ctx, [[598, 905], [598, 700]], F41B(t, 136.12, 0.8), C.red, 9, 20); ctx.restore(); }
  // the 'neighbours' dotted arc (29.22-31.2)
  if (f41In(t, 29.22, 31.4)) { ctx.save(); ctx.globalAlpha = f41Fade(t, 29.22, 31.4, 0.3); f41Dotted(ctx, K.arcPts([60, 1180], [770, 540], -0.35, 40), F41B(t, 29.4, 1.3), C.white, 12, 24); ctx.restore(); }
  return fxP;
}
function f41CaveEyes(ctx, x, y, lids, look, sc = 1) {
  [-14, 14].forEach((dx, i) => { const l = K.clamp(lids[i]); if (l >= 1) return; ctx.save(); ctx.translate(x + dx * sc, y); ctx.scale(sc, sc * (1 - l)); ctx.beginPath(); ctx.ellipse(0, 0, 10, 12, 0, 0, 7); ctx.fillStyle = C.yellow; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.stroke();
    ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(look[0] * 4, look[1] * 4, 4.5, 0, 7); ctx.fill(); ctx.restore(); });
}

// ---------- camera ----------
const F41_CLD = { x: 572, y: 470, zoom: 1.24 };   // v2 cloud framing: the crow whole on the right, the cloud's left lobe inside
const F41_CAM = [[0, { x: 430, y: 1930, zoom: 1.35 }], [2.4, { x: 430, y: 1930, zoom: 1.35 }], [3.4, { x: 500, y: 1700, zoom: 1.0 }], [6.9, { x: 500, y: 1700, zoom: 1.0 }], [9.4, { x: 600, y: 640, zoom: 1.25 }], [12.37, { x: 600, y: 640, zoom: 1.25 }],
  [12.38, { x: 560, y: 1790, zoom: 1.15 }], [18.6, { x: 560, y: 1790, zoom: 1.15 }], [20.3, { x: 650, y: 1900, zoom: 1.45 }], [20.9, { x: 650, y: 1900, zoom: 1.45 }], [21.53, { x: 720, y: 1900, zoom: 1.35 }],
  [21.54, { x: 480, y: 760, zoom: 1.05 }], [23.4, { x: 480, y: 760, zoom: 1.05 }], [23.9, { x: 560, y: 700, zoom: 1.2 }], [36.4, { x: 560, y: 700, zoom: 1.2 }], [37.4, { x: 420, y: 760, zoom: 1.7 }], [41.2, { x: 420, y: 760, zoom: 1.7 }],
  [42.5, { x: 560, y: 700, zoom: 1.2 }], [45.7, { x: 575, y: 700, zoom: 1.2 }], [46.3, { x: 735, y: 620, zoom: 1.5 }], [47.0, { x: 735, y: 620, zoom: 1.5 }], [47.7, { x: 470, y: 690, zoom: 1.0 }], [49.9, { x: 470, y: 690, zoom: 1.0 }],
  [50.6, { x: 650, y: 700, zoom: 1.45 }], [53.6, { x: 650, y: 700, zoom: 1.45 }], [54.4, { x: 580, y: 700, zoom: 1.2 }], [64.5, { x: 580, y: 700, zoom: 1.2 }],
  [67.6, { x: 600, y: 720, zoom: 1.35 }], [71.4, { x: 600, y: 720, zoom: 1.35 }], [72.6, F41_CLD], [82.0, F41_CLD], [82.8, { x: 580, y: 700, zoom: 1.2 }],
  [92.5, { x: 580, y: 700, zoom: 1.2 }], [93.0, { x: 735, y: 620, zoom: 1.5 }], [93.9, { x: 735, y: 620, zoom: 1.5 }], [94.6, F41_CLD], [99.4, F41_CLD], [100.4, { x: 620, y: 760, zoom: 1.35 }], [103.3, { x: 620, y: 760, zoom: 1.35 }], [104.9, F41_CLD],
  [115.7, F41_CLD], [116.6, { x: 580, y: 700, zoom: 1.2 }], [120.3, { x: 580, y: 700, zoom: 1.2 }], [121.2, { x: 625, y: 690, zoom: 1.4 }], [122.3, { x: 625, y: 690, zoom: 1.4 }], [123.2, F41_CLD],
  [132.3, F41_CLD], [133.0, { x: 570, y: 720, zoom: 1.2 }], [138.2, { x: 570, y: 720, zoom: 1.2 }], [139.6, { x: 720, y: 640, zoom: 1.6 }], [140.5, { x: 570, y: 720, zoom: 1.2 }], [145.2, { x: 570, y: 720, zoom: 1.2 }],
  [147.6, { x: 520, y: 760, zoom: 1.42 }], [148.5, { x: 520, y: 760, zoom: 1.42 }], [149.6, { x: 520, y: 720, zoom: 1.2 }], [152.8, { x: 500, y: 720, zoom: 1.15 }], [155.9, { x: 550, y: 700, zoom: 0.97 }], [159.8, { x: 550, y: 700, zoom: 0.97 }],
  [160.7, { x: 585, y: 680, zoom: 1.07 }], [161.14, { x: 585, y: 680, zoom: 1.07 }],
  [161.15, { x: 520, y: 1300, zoom: 0.62 }], [162.8, { x: 520, y: 1300, zoom: 0.62 }], [163.8, { x: 380, y: 1800, zoom: 1.3 }], [F41_DUR, { x: 380, y: 1800, zoom: 1.3 }]];
function f41Cam(t) { const c = K.camAt(F41_CAM, t), z = c.zoom; return { x: K.clamp(c.x, F41_X0 + 500 / z, F41_X1 - 500 / z), y: K.clamp(c.y, 615 / z, F41_WH - 615 / z), zoom: z }; }
const f41P = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];
const f41Shake = (t) => K.spring(t, 137.28, 3, 16, 9) + K.spring(t, 152.04, 3, 16, 9);

// ---------- panel-space lettering ----------
function f41Over(ctx, t, cam, S, fox) {
  const P = (x, y) => f41P(x, y, cam);
  const lab = (txt, x, y, a, b, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha = f41Fade(t, a, b, 0.2); S.label(ctx, txt, x, y, F41B(t, a, 0.35), { size: 46, align: 'center', ...o }); ctx.restore(); };
  const arr = (a0, a1, a, b, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha = f41Fade(t, a, b, 0.2); S.arrow(ctx, a0, a1, F41B(t, a, 0.4), o); ctx.restore(); };
  const word = (txt, x, y, a, b, size = 80, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha = f41Fade(t, a, b, 0.15); sfx(ctx, txt, x, y, size, f41Pop(t, a, 0.25), o); ctx.restore(); };
  if (f41In(t, 3.6, 4.6)) { const p = P(fox.x + 70, fox.y - 200); word('GRRR...', p[0], p[1], 3.6, 4.6, 72, { rot: -0.08, fill: C.red }); }
  if (f41In(t, 9.88, 11.8)) { const n = P(790, 585); lab('NEST', n[0] - 260, n[1] - 220, 9.88, 11.8); arr([n[0] - 200, n[1] - 180], [n[0] - 60, n[1] - 30], 9.95, 11.8, { width: 18, bend: 0.15 }); }
  word('TOO HIGH!', 640, 200, 17.6, 18.7, 78, { rot: -0.06, fill: C.red });
  if (f41In(t, 41.4, 42.4)) { const p = P(fox.x - 40, fox.y + 12); word('GRRR!', p[0], p[1], 41.4, 42.4, 72, { rot: 0.06, fill: C.red }); }   // at the belly, like every belly growl
  if (f41In(t, 54.12, 55.8)) { const p = P(645, 560); word('?', p[0], p[1], 54.12, 55.8, 130, { fill: C.yellow }); }
  if (f41In(t, 57.75, 58.9)) { const p = P(690, 470); word('POP!', p[0] - 50, p[1] - 30, 57.75, 58.9, 84, { rot: -0.1, fill: C.red }); }
  if (f41In(t, 70.5, 71.6)) { const p = P(fox.x + 40, fox.y - 330); lab('TRUST ME!', p[0], p[1], 70.5, 71.6, { size: 50 }); }
  word('OUCH!', 700, 300, 79.5, 80.5, 84, { rot: 0.1, fill: C.red });
  if (f41In(t, 87.9, 88.7)) { const p = P(470, 330); word('SWISH!', p[0], p[1], 87.9, 88.7, 80, { rot: -0.1 }); }
  if (f41In(t, 102.14, 103.32)) { const a = P(560, 870), b = P(735, 870), m = [(a[0] + b[0]) / 2, a[1]]; arr(m, [a[0] - 10, a[1]], 102.14, 103.32, { width: 16, bend: 0 }); arr(m, [b[0] + 10, b[1]], 102.14, 103.32, { width: 16, bend: 0 }); lab('SAFE HERE', b[0] + 20, b[1] + 110, 102.3, 103.32, { size: 44 }); }
  word('MINE!', 540, 300, 108.6, 109.5, 84, { rot: -0.08, fill: C.red });
  if (f41In(t, 120.68, 122.4)) { const m = P(...F41_MEDAL), f = fox ? P(...f41FoxPt(fox, 40, 0)) : P(560, 790), mr = 78 * cam.zoom, ex = (m[0] - mr + f[0]) / 2 + 6, ey = (m[1] + f[1]) / 2;
    lab('SAME TRICK', f[0] - 60, m[1] - mr - 30, 120.68, 122.4, { size: 50 }); word('=', ex, ey, 120.68, 122.4, 110, { fill: C.yellow }); }
  word('STUCK!', 590, 330, 130.8, 132.2, 84, { rot: 0.08, fill: C.red });
  if (f41In(t, 136.9, 138.3)) { const p = P(560, 1010); lab('YOUR LIMIT', p[0], p[1], 136.9, 138.3, { size: 44 }); }
  if (f41In(t, 139.9, 141.0)) { const p = P(640, 520); word('KEEP OUT!', p[0] - 40, p[1], 139.9, 141.0, 70, { rot: -0.06, fill: C.red }); }
  if (f41In(t, 152.2, 153.1) && fox) { const p = P(fox.x + 40, fox.y - 260); word('HMPH!', p[0], p[1], 152.2, 153.1, 80, { rot: -0.08, fill: C.white }); }   // anger: not the belly's GRRR
  if (f41In(t, 153.2, 154.4)) { const p = P(700, 420); word('WHY?', p[0] - 30, p[1], 153.2, 154.4, 80, { rot: 0.06, fill: C.yellow }); }
  if (f41In(t, 159.14, 161.0) && fox) { const a = P(...f41FoxPt(fox, 120, -10)), b = P(760, 570); arr(a, b, 159.14, 161.0, { width: 18, bend: -0.15 }); lab('CRAFTIER!', (a[0] + b[0]) / 2, Math.min(a[1], b[1]) - 150, 159.78, 161.0, { size: 50 }); }
  if (f41In(t, 164.7, 165.7)) { const p = P(330, 1960); word('GRRR...', p[0] + 150, p[1] - 70, 164.7, 165.7, 66, { rot: -0.06, fill: C.red }); }
}
// the cave-to-summit wipe (21.38-21.70): a slanted halftone band crosses the panel, the cut is under it
function f41Wipe(ctx, t) { if (!f41In(t, 21.38, 21.72)) return; const u = (t - 21.38) / 0.34, x = K.lerp(-700, 1500, u);
  shape(ctx, [[x, -20], [x + 520, -20], [x + 260, 1250], [x - 260, 1250]], C.yellow, { lw: 12, seed: 3, dot: C.red, pitch: 12, rad: 0.22, da: 0.5 }); }

const SCENE = {
  duration: F41_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196, sh = f41Shake(t);
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh * 0.8, py - sh * 0.5); ctx.scale(pw / F41_WW, ph / 1230);
    const u = F41_U(t), sd = skyCycle(ctx, u, { t, hills: false, sun: false }), sa = 1 - f41CloudUp(t);
    if (sd.sun && sa > 0) { ctx.save(); ctx.globalAlpha *= sa; ctx.beginPath(); ctx.rect(0, 0, 1000, 920); ctx.clip(); sun(ctx, sd.sun[0], sd.sun[1], t); ctx.restore(); }
    const cam = f41Cam(t); ctx.save(); K.camera(ctx, F41_WW, 1230, cam); const fxP = f41World(ctx, t, cam); ctx.restore();
    const dusk = F41_WARM(t); if (dusk > 0) { ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = 0.6 * dusk; ctx.fillStyle = '#ffc890'; ctx.fillRect(0, 0, F41_WW, 1230); ctx.restore(); }
    f41Over(ctx, t, cam, S, fxP);
    f41Wipe(ctx, t);
    if (t >= 160.75 && t < 161.55) S.transition(ctx, F41_WW, 1230, (t - 160.75) / 0.8, { caption: 'LATER...' });
    if (t >= 165.0) S.title(ctx, 'THE END', 500, 260, F41B(t, 165.0, 0.9), { size: 84, align: 'center' });
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // the plan's effects, all in narration pauses or after the last word; master 0.6 at render
    k.bed(S.sfx.bed, 0, F41_DUR, 0.5);
    const rumble = (t0, d) => { k.tone({ t: t0, f: 62, f2: 44, dur: d, type: 'triangle', gain: 0.22, a: 0.06 }); k.tone({ t: t0 + 0.12, f: 70, f2: 50, dur: d * 0.7, type: 'triangle', gain: 0.16, a: 0.05 }); };
    rumble(3.62, 0.5);
    k.play('paper', 11.9, { dur: 0.3, gain: 0.6 });
    k.play('pop', 20.45, { gain: 0.45 });
    [21.1, 21.24, 21.38].forEach((tt) => k.play('tick', tt, { gain: 0.5, pitch: 0.6 }));
    rumble(41.4, 0.7);
    k.play('tick', 42.2, { gain: 0.5 });
    k.play('tick', 56.0, { gain: 0.5 });
    rumble(164.7, 0.8);
    k.play('chime', 165.05, { note: 'C6', gain: 0.6 });
  },
};
window.SCENE = SCENE;
