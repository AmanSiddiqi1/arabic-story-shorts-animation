// ===== HORSE-02: the roof terrace (S5-S12, 25.72 - 98.35; S16-S18, 126.7 - 151.49) =====
// World units on palaceRoof (floor y 900). Every pose channel on twos (tc), blinks and flames on threes, camera and light on t.
const H2_GY = 930;   // where people stand on the terrace (in front of the horse); 886 at the back parapet
const H2_ROOF_A = 25.72, H2_ROOF_B = 98.35, H2_ROOF_C = 126.7;

// ---------- the horse: landing, parked, the hover, the take-off ----------
const H2_LAND_X = H2_F([[25.72, 560], [26.8, 640], [30, 640]]);
const H2_LAND_L = [[25.72, 470], [26.8, 80], [26.82, 80], [26.9, 58], [27.0, 58], [27.08, 38], [27.2, 38], [27.28, 18], [27.4, 18], [27.46, 0]];
const H2_HOVER = H2_F([[83.52, 0], [84.8, 150], [86.6, 150], [87.24, 0], [88, 0]]);
const H2_TO = [[142.74, 640, 736, 0.9, 0], [143.4, 700, 590, 0.74, 0.35], [144.2, 880, 205, 0.34, 0.3], [145.3, 1040, 330, 0.15, 0.05], [146.4, 1180, 458, 0.06, 0], [147.3, 1240, 500, 0.03, 0]];
function h2RoofHorse(t) {
  const tc = EH_T2(t);
  if (t >= 142.74) { let i = 0; while (i < H2_TO.length - 2 && t >= H2_TO[i + 1][0]) i++; const A = H2_TO[i], B = H2_TO[i + 1], u = K.ease.inOut(K.clamp((t - A[0]) / (B[0] - A[0])));
    const [cx, cy, s, p] = A.slice(1).map((v, k) => K.lerp(v, B[k + 1], u)); const H = ehRigP(cx, cy + idleSway(tc, 5, 5, 2.6), s, 1, p, { lit: { neck: 0.3, chest: 0.3, joints: 0.3, hooves: 0.3 } }); H.air = true; H.lift = 900 - H.y; H.gone = t > 147.2; return H; }
  let x = 640, lift = 0, lit = {};
  if (t < 27.46) { x = H2_LAND_X(t); lift = kfn(tc, H2_LAND_L, 'lin'); lit = { neck: 0.25, chest: 0.25, joints: 0.25, hooves: 0.25 }; }
  else if (t < 27.9) { const f = Math.floor((t - 27.46) * 12) % 2 ? 0.5 : 0.1; lit = { neck: f, chest: f, joints: f, hooves: f }; }
  if (t >= 83.0 && t < 87.6) { lit = ehLitMax(ehPowerOn(t, 83.0, 0.1, 0.3)); lift = H2_HOVER(tc); if (lift > 1) lift += idleSway(tc, 3, 6, 2.6) * K.clamp(lift / 60); }
  if (t >= 141.96 && t < 142.74) lit = ehPowerOn(t, 142.36, 0.08, 0.35);
  const reveal = t >= 81.3 && t < 82.9 ? 1 : t >= 86.0 && t < 86.8 ? 0.8 : 0, knob = t >= 83.0 ? Math.PI / 4 : 0;
  return { x, y: EH_GR - lift, s: H2_HS, dir: 1, lit, reveal, knob, lever: t >= 86.3 && t < 87.3 ? 0.4 : 0, lift, air: lift > 1 };
}
const h2HP = (H, p) => ehHorsePt(H, p);

// ---------- Firuz ----------
const H2_FZX = H2_F([[29.75, 755], [32.6, 755], [33.4, 845], [34.76, 845], [36.9, 1110], [37.48, 1120], [38.42, 1120], [39.2, 1150], [42.24, 1150], [43.0, 1185], [50.84, 1185], [51.3, 1140], [63.3, 1140], [64.8, 840], [72.0, 840], [72.8, 930], [78.75, 930], [79.5, 790], [81.86, 790]]);
const H2_FZX2 = H2_F([[96.9, 765], [97.25, 790], [97.6, 790], [98.35, 900]]);
const H2_FZX3 = H2_F([[126.7, 1300], [127.6, 900], [140.64, 900], [140.95, 800], [141.0, 795]]);
const H2_BOW = [[60.83, 0], [60.97, -0.05], [61.3, 0.5], [61.5, 0.48], [61.64, 0.15], [62.0, 0]];
const H2_BOW2 = [[132.78, 0], [132.9, -0.03], [133.3, 0.3], [133.6, 0.28], [134.0, 0]];
function h2FzState(t) {
  if (t < 29.3) return 'ride'; if (t < 29.75) return 'down1'; if (t < 81.95) return 'ground'; if (t < 82.5) return 'vault1'; if (t < 96.46) return 'ride';
  if (t < 96.9) return 'down2'; if (t < H2_ROOF_B) return 'ground'; if (t < H2_ROOF_C) return null; if (t < 141.0) return 'ground'; if (t < 141.55) return 'vault2'; return 'ride';
}
function h2FzGround(t, H) {
  const tc = EH_T2(t), sd = 3, D = EH_FIRUZ, P = { x: 755, y: H2_GY, s: D.s, dir: 1, lid: ehLid(t, sd), sq: breathe(tc, sd, 0.014), tip: idleSway(tc, sd, 0.025, 2.9), mouth: 'closed', gaze: [0.6, 0.1] };
  const o = { vx: 0, swing: 0, cup: null, rope: null };
  const head = () => ehHeadOf(P), look = (p) => lookAt(head(), p), Pr = h2PrRoof(t), Pm = h2MaidRoof(t);
  if (t < H2_ROOF_B) {
    const xf = t >= 96.9 ? H2_FZX2 : H2_FZX; Object.assign(P, walk(xf, tc, { stride: 22 })); o.vx = speed(xf, tc);
    if (t >= 96.9) { P.dir = 1; P.gaze = [1, 0]; if (t < 97.25) { P.drop = 14; P.handRW = EH_ROOF.ring; P.gaze = look(EH_ROOF.ring); P.dir = 1; } if (t > 97.3) { P.mouth = 'smile'; P.gaze = Pr ? look(ehHeadOf(Pr)) : [1, 0]; } return [P, o]; }
    // S5: crouched landing, look left, right, up at the dark window; dust off, pat the chest plate
    if (t < 31.52) { P.dir = 1; const cr = t < 30.6 ? 1 : 1 - ehE(tc, 30.6, 0.6); P.drop = 14 * cr; P.sq *= landSquash(tc, 29.75, 0.1) * (1 - 0.05 * cr); P.tip = 0.06 * cr;
      P.gaze = t < 30.66 ? [-1, 0.1] : t < 31.1 ? [1, 0] : look([EH_ROOF.win[0] + 40, EH_ROOF.win[1] + 40]); P.lid = Math.max(P.lid, ehBlinkAt(tc, 29.78), ehBlinkAt(tc, 30.68), ehBlinkAt(tc, 31.12)); if (t > 30.9) P.handR = [26, -214]; P.handL = [-50, -96]; }
    else if (t < 32.4) { const k = t < 31.9; P.dir = k ? 1 : -1; if (k) { const b = Math.sin((tc - 31.52) * 30) * 10; P.handL = [-30 + b, -96]; P.handR = [30 - b, -100]; P.gaze = [0.2, 1]; P.mouth = 'smile'; } else { P.handRW = h2HP(H, [EH_EBG.chest[0] + 6, EH_EBG.chest[1] + 4 + 6 * Math.abs(Math.sin((tc - 31.9) * 14))]); P.gaze = look(P.handRW); P.mouth = 'smile'; P.lid = Math.max(P.lid, 0.3); } }
    // S6: the rope, the glance back, the knot, the tiptoe, the hush, the drink, the parapet, the CLACK
    else if (t < 34.12) { P.dir = 1; if (t < 32.6) { P.dir = -1; P.handRW = h2HP(H, [44, -204]); P.gaze = look(P.handRW); P.drop = 6; } else { P.handR = [60, -110]; o.rope = 'hand'; P.gaze = t >= 33.44 ? [-1, 0.05] : [1, 0.1]; if (t >= 33.44) { P.brow = 0.5; P.lid = Math.max(P.lid, ehBlinkAt(tc, 33.46)); P.tip = -0.04; } } if (t < 32.6) o.rope = 'hand'; }
    else if (t < 34.76) { P.dir = -1; P.drop = 18; P.tip = 0.06; const tug = Math.max(pulse(tc, 34.25, 0.18), pulse(tc, 34.5, 0.18)); P.handRW = [EH_ROOF.ring[0] + 22 * tug, EH_ROOF.ring[1] - 4]; o.taut = tug; P.gaze = look(EH_ROOF.ring); if (t > 34.6) { P.drop = 10; P.mouth = 'smile'; } }
    else if (t < 39.25) { P.amp = Math.min(1.35, (P.amp || 0) * 1.3); P.tip = -0.05 + idleSway(tc, sd, 0.02, 2.9); P.handL = [-86, -128]; P.handR = [84, -138]; P.mouth = 'closed'; P.gaze = gazePlan(tc, [[34.76, [0.4, 0.3]], [35.2, [-0.6, -0.4]], [35.6, [1, -0.2]]], 0.12); o.vx = o.vx * 0.4;
      if (t >= 35.78 && t < 36.5) { P.handR = PERSON_HANDS.hush.R; P.gaze = look([EH_ROOF.catSpot[0], EH_ROOF.catSpot[1] - 20]); P.eyes = t < 36.0 ? 'wide' : 'open'; }
      if (t >= 36.9 && t < 37.48) { P.amp = 0; if (t < 36.98) { P.handRW = EH_ROOF.hook; P.gaze = look(EH_ROOF.hook); } else { P.handR = [16, -170]; P.tip = -0.12; P.gaze = [0.2, -1]; P.sq *= 1 + 0.02 * Math.sin((tc - 36.98) * 30); P.lid = t > 37.1 && t < 37.3 ? 1 : P.lid; o.cup = { hand: 'R', tilt: -1.0 }; } P.handL = [-40, -100]; }
      if (t >= 37.48 && t < 38.42) { P.amp = 0; P.drop = 10; P.tip = 0.1; P.gaze = t < 37.95 ? [0.5, 0.95] : look([EH_ROOF.door.x0 + 60, 800]); P.handR = [50, -122]; P.handL = [-30, -110]; o.cup = { hand: 'R', tilt: 0 }; P.lid = Math.max(P.lid, ehBlinkAt(tc, 37.96)); }
      if (t >= 38.42) { P.handR = [56, -130]; o.cup = { hand: 'R', tilt: 0 }; P.gaze = look([EH_ROOF.door.x0 + 60, 800]); if (t < 38.6) P.tip = 0.04 * pulse(tc, 38.42, 0.18); }
      if (t >= 36.98 && t < 37.48) o.cup = { hand: 'R', tilt: -1.0 }; }
    else if (t < 44.24) { // frozen mid-stride after the CLACK; two more steps; caught in the window light
      P.ph = Math.PI / 2; P.amp = t < 42.24 ? 1.2 : P.amp; P.sq *= impactSquash(tc, 39.25, 0.92); P.eyes = 'wide'; P.mouth = 'o'; P.brow = -0.4; P.gaze = look([EH_ROOF.door.x0 + 50, 860]); P.handR = [62, -186]; P.handL = [-70, -150]; o.cup = { hand: 'R', tilt: 0.12 * Math.sin((tc - 39.25) * 20) * K.clamp(1 - (t - 39.25) / 1.0) };
      if (t >= 42.24 && t < 43.06) { Object.assign(P, walk(H2_FZX, tc, { stride: 22 })); P.amp *= 1.3; P.lid = Math.max(P.lid, t % 0.38 < 0.12 ? 0.8 : 0); }
      if (t >= 43.06) { P.ph = Math.PI / 2; P.amp = K.lerp(1.0, 0, ehE(tc, 43.4, 0.8)); P.gaze = look([EH_ROOF.win[0] + 40, EH_ROOF.win[1] + 40]); P.sq *= 1 - 0.03 * pulse(tc, 43.6, 0.3); P.handR = [-26, -96]; o.cup = null; P.mouth = 'closed'; P.eyes = 'open'; } }
    // S7-S8: in the lamp light; caught with the cup; the wave; sets the cup back; the question; points straight up
    else if (t < 60.83) { P.gaze = Pr ? look(ehHeadOf(Pr)) : [1, 0]; P.handR = [-26, -96]; P.handL = [-40, -100]; P.eyes = t < 50.84 ? 'wide' : 'open'; P.mouth = t < 50.84 ? 'o' : 'smile';
      if (t >= 50.84 && t < 51.46) { P.sq *= 1 + 0.05 * pulse(tc, 50.84, 0.3); P.handR = [56, -188]; o.cup = { hand: 'R', tilt: 0 }; P.brow = 0.6; P.tip = -0.04; o.sweat = true; }
      if (t >= 51.46 && t < 52.2) { P.handL = [-64 + 18 * Math.sin((tc - 51.46) * 26), -196]; if (t < 51.9) { P.handRW = [EH_ROOF.hook[0] + 4, EH_ROOF.hook[1] + 10]; o.cup = { hand: 'R', tilt: 0 }; } P.brow = 0.6; o.sweat = t < 51.9; }
      if (t >= 52.2) { P.handR = [30, -98]; P.handL = [-30, -98]; P.brow = t > 56.2 ? 0.4 : 0.2; P.mouth = t > 54.3 && t < 59.8 ? 'closed' : 'smile'; }
      if (t >= 59.8) { P.mouth = t < 60.1 ? 'o' : 'closed'; const up = ehE(tc, 60.15, 0.5); P.handR = [K.lerp(30, 44, up), K.lerp(-98, -212, up)]; P.gaze = t > 60.4 ? [0.1, -1] : P.gaze; P.lid = Math.max(P.lid, ehBlinkAt(tc, 60.42)); } }
    // S9: the bow, the explanation (backing toward the horse), the slap, the arc, the shrug
    else if (t < 71.68) { const bow = flow(tc, H2_BOW); P.tip = bow + lagged((u) => flow(u, H2_BOW), tc, 0.1, 0.4) + idleSway(tc, sd, 0.02, 2.9); P.drop = 22 * Math.max(0, bow); P.gaze = Pr ? look(ehHeadOf(Pr)) : [1, 0]; P.mouth = 'smile';
      if (t < 61.64) { P.handR = PERSON_HANDS.chest.R; P.handL = [-8, -232 + 8 * Math.max(0, bow)]; P.lid = 0.3; }
      else if (t < 63.3) { P.handR = [30, -100]; P.handL = [-30, -100]; P.lid = Math.max(P.lid, ehBlinkAt(tc, 61.7)); }
      else { P.talk = ehTalk(t, 63.3, 71.0, 7, 0.7); const g = Math.sin(tc * 5.3); P.handR = [70 + 14 * g, -150 - 10 * g]; P.handL = [-60 - 12 * g, -140];
        if (t < 64.8) { Object.assign(P, walk(H2_FZX, tc, { stride: 22 })); P.dir = 1; P.gaze = [0.9, -0.1]; }
        if (t >= 64.86 && t < 65.34) { P.handR = [10, -128 + 8 * Math.abs(Math.sin((tc - 64.86) * 20))]; P.gaze = [-0.4, -0.9]; }
        if (t >= 65.34 && t < 65.78) { const a = (tc - 65.34) * 14; P.handR = [18 + 22 * Math.cos(a), -248 + 8 * Math.sin(a)]; P.gaze = [0.4, -0.7]; P.mouth = 'smile'; P.brow = 0.4; }
        if (t >= 65.78 && t < 67.24) { P.handR = [104, -190]; P.gaze = [-0.4, -0.9]; }
        if (t >= 67.24 && t < 67.98) { if (t < 67.5) { P.handLW = [756, 752 + 6 * pulse(tc, 67.3, 0.15)]; P.gaze = look(P.handLW); } else { P.handL = [40, -150]; P.handR = [56, -164]; P.tip = 0.05; } }
        if (t >= 67.98 && t < 69.94) { const u = flow(tc, [[67.98, 0], [68.4, 0.6], [68.8, 1], [69.9, 1]]), a = K.lerp(-2.2, 0.3, u); P.handR = [30 + Math.cos(a) * 80, -150 + Math.sin(a) * 80]; P.gaze = [-0.5, -0.8]; }
        if (t >= 69.94 && t < 71.02) { P.handL = PERSON_HANDS.palmsUp.L; P.handR = PERSON_HANDS.palmsUp.R; P.drop = -6; P.mouth = 'frown'; P.brow = 0.5; P.talk = 0; }
        if (t >= 71.02) { const u = ehE(tc, 71.02, 0.35), l = ehE(tc, 71.14, 0.35); P.handL = [K.lerp(-60, -34, l), K.lerp(-100, -84, u)]; P.handR = [K.lerp(60, 34, l), K.lerp(-100, -84, u)]; P.gaze = [-1, -0.3]; P.mouth = 'closed'; P.lid = 0.25; P.talk = 0; } } }
    // S10: gives way, three nods, the finger, marches to the horse
    else if (t < 79.52) { Object.assign(P, walk(H2_FZX, tc, { stride: 22 })); P.dir = t >= 78.75 ? -1 : 1; P.gaze = Pr ? look(ehHeadOf(Pr)) : [-1, 0]; P.handR = [28, -98]; P.handL = [-28, -98]; P.mouth = 'smile'; if (t < 72.8 && t > 72.0) P.dir = 1;
      if (t >= 72.0 && t < 72.8) P.gaze = Pr ? look(ehHeadOf(Pr)) : [-1, 0];
      if (t >= 76.74 && t < 77.3) { P.tip = 0.08 * Math.abs(Math.sin((tc - 76.74) * Math.PI / 0.19)); P.handL = [-56, -112]; P.handR = [56, -112]; P.brow = 0.5; }
      if (t >= 77.4 && t < 78.7) { P.mouth = 'smile'; P.brow = 0.4; P.lid = 0.15; }
      if (t >= 78.7) { P.handR = t < 79.0 ? PERSON_HANDS.pointUp.R : [40, -110]; P.brow = -0.4; P.mouth = 'closed'; o.swing = 0.3; } }
    // S11: beckons, points at the knob and the lever, unties the rope
    else { P.x = 790; P.dir = t < 79.9 ? 1 : -1; P.mouth = 'closed'; const kb = h2HP(H, EH_EBG.knob), lv = h2HP(H, EH_EBG.lever);
      if (t < 79.9) { P.handR = [40 + 20 * Math.sin((tc - 79.52) * 22), -150]; P.gaze = Pr ? look(ehHeadOf(Pr)) : [1, 0]; P.mouth = 'smile'; }
      else if (t < 81.3) { P.handRW = [kb[0] + 14, kb[1]]; P.gaze = look(kb); }
      else if (t < 81.86) { P.handRW = [lv[0] + 30, lv[1] + 40]; P.gaze = look(lv); }
      else { P.handRW = EH_ROOF.ring; P.drop = 16; P.gaze = look(EH_ROOF.ring); } }
  } else {
    // S16-S18 at the back parapet
    Object.assign(P, walk(H2_FZX3, tc, { stride: 26 })); P.y = K.lerp(905, 886, ehE(t, 126.7, 0.9)); P.dir = t < 127.6 || t >= 140.64 ? -1 : 1; o.vx = speed(H2_FZX3, tc);
    const tw = [EH_ROOF.towers[0] + 60 + (cam0x(t) - 800) * 0.55, 560], dome = [EH_ROOF.dome[0] + (cam0x(t) - 800) * 0.2, 600];
    P.gaze = Pr ? look(ehHeadOf(Pr)) : [1, 0]; P.handR = [30, -100]; P.handL = [-30, -100];
    if (t < 127.6) { P.handR = [70, -140]; P.handL = [-60, -130]; P.mouth = 'o'; P.sq *= breathe(tc * 2, sd, 0.02); }
    else if (t < 132.78) { P.gaze = t < 129.3 ? look(tw) : t < 130.24 ? [0.6, -0.2] : look(dome); P.mouth = 'closed'; P.sq *= breathe(tc * 1.5, sd, 0.02);
      if (t >= 128.48 && t < 129.3) { P.handR = [36, -176 - 6 * (Math.floor((tc - 128.48) / 0.25) % 2)]; }
      if (t >= 131.18 && t < 132.05) { P.gaze = gazePlan(tc, [[131.18, lookAt(head(), tw)], [131.45, [0.6, -0.2]], [131.7, lookAt(head(), dome)]], 0.08); P.lid = Math.max(P.lid, ehBlinkAt(tc, 131.2), ehBlinkAt(tc, 131.47), ehBlinkAt(tc, 131.72)); P.handR = [24, -214]; P.talk = ehTalk(t, 131.2, 132.0, 4, 0.3); }
      if (t >= 132.05) P.gaze = look([EH_ROOF.door.x0 + 60, 760]); }
    else if (t < 140.64) { const bow = flow(tc, H2_BOW2); P.tip = bow + lagged((u) => flow(u, H2_BOW2), tc, 0.1, 0.4); P.drop = 14 * Math.max(0, bow); P.mouth = 'smile';
      if (t < 134.08) { P.handR = PERSON_HANDS.chest.R; P.gaze = [1, -0.4]; }
      else if (t < 140.0) { P.handL = [36, -124]; P.handR = t < 134.9 ? [K.lerp(-10, 58, ehE(tc, 134.1, 0.6)), -120] : [56 + 10 * Math.sin(tc * 9.1), -128 + 6 * Math.cos(tc * 7.3)]; o.scroll = K.clamp((t - 134.1) / 0.6); P.mouth = t > 135.7 ? 'o' : 'smile';
        P.gaze = [[135.0, [0.3, 0.8]], [136.0, [0.6, -0.6]], [136.3, [0.3, 0.8]], [136.9, [0.6, -0.6]], [137.2, [0.3, 0.8]], [139.4, [1, -0.3]]].reduce((g, [tt, v]) => (t >= tt ? v : g), [0.3, 0.8]); P.lid = Math.max(P.lid, ehBlinkAt(tc, 136.0), ehBlinkAt(tc, 136.9)); }
      else { P.handR = [4 + 4 * pulse(tc, 140.3, 0.2), -124]; P.handL = [-30, -100]; o.scroll = 1 - K.clamp((t - 140.0) / 0.25); P.gaze = Pr ? look(ehHeadOf(Pr)) : [1, 0]; } }
    else { P.handR = t < 140.95 && t > 140.82 ? null : [60, -150]; if (t > 140.82 && t < 140.95) P.handRW = EH_ROOF.ring; P.handL = [-70, -140]; P.gaze = [-1, 0.1]; P.mouth = 'closed'; P.brow = -0.3; o.swing = 0.3; }
  }
  return [P, o];
}
function cam0x(t) { return h2RoofCam(t).x; }
// the vaults (81.95 - 82.5 and 141.0 - 141.55): anticipation crouch, then the hop into the saddle
function h2FzVault(t, H, t0, x0) {
  const tc = EH_T2(t), seat = mountSeat('horse', H), D = EH_FIRUZ, sx = seat.x + 22 * D.s, sy = seat.y + 52 * D.s, ta = t0 + 0.14, [x, lift] = hop(tc, ta, 0.4, x0, sx, 110), e = ehE(tc, ta, 0.4);
  const y = K.lerp(H2_GY, sy, e) - lift; return { x, y, s: D.s, dir: -1, sq: tc < ta ? 0.9 : 1.05, tip: tc < ta ? 0.12 : -0.1, gaze: [-0.6, 0.2], mouth: 'smile', handL: [-60, -230], handR: [70, -220], drop: tc < ta ? 14 : 0, lift: H2_GY - y };
}
function h2FzDown(t, H, t0, x1) { const tc = EH_T2(t), seat = mountSeat('horse', H), D = EH_FIRUZ, sx = seat.x + 22 * D.s, sy = seat.y + 52 * D.s, [x, lift] = hop(tc, t0, 0.42, sx, x1, 40), e = ehE(tc, t0, 0.42, 'in');
  const y = K.lerp(sy, H2_GY, e) - lift; return { x, y, s: D.s, dir: 1, sq: 1, tip: 0.05, gaze: [0.4, 0.8], mouth: 'closed', handL: [-70, -170], handR: [60, -160], lift: H2_GY - y }; }
// Firuz in the saddle on the roof
function h2FzRide(t, H) {
  const tc = EH_T2(t), sd = 3, P = { lid: ehLid(t, sd), mouth: 'smile', handL: [70, -110], handR: [76, -100], sq: breathe(tc, sd, 0.016), lurch: 0.04 + idleSway(tc, 31, 0.025, 2.2), gaze: [0.7, 0.3], brow: 0 };
  const lv = h2Loc(EH_EBG.lever[0] + 10, EH_EBG.lever[1] + 4), kb = h2Loc(EH_EBG.knob[0], EH_EBG.knob[1]), mane = (j) => { const [mx, my] = EH_EBG.mane[j]; return h2Loc(mx - 6, my - 6); };
  if (t < 29.3) { P.handL = mane(4); P.handR = t > 26.82 && t < 27.46 ? lv : mane(2); P.gaze = [0.4, 1]; P.mouth = t > 26.82 && t < 27.46 ? 'o' : 'closed'; P.sq *= landSquash(tc, 27.46, 0.08) * (1 + 0.03 * pulse(tc, 27.6, 0.2)); P.lurch = 0.1 + lurch(tc, 27.46, 0.12);
    if (t > 28.0) { P.mouth = 'smile'; P.gaze = gazePlan(tc, [[28.0, [0.4, 1]], [28.5, [-0.9, -0.2]], [28.95, [0.9, -0.2]]], 0.1); P.lid = Math.max(P.lid, ehBlinkAt(tc, 28.52), ehBlinkAt(tc, 28.97)); } return P; }
  if (t < 96.46 && t >= 82.5) { P.sq *= landSquash(tc, 82.5, 0.1); P.lurch = 0.06 + lurch(tc, 82.5, 0.14);
    const Pr = h2PrRoof(t), head = [H.x + 10, H.y - 360 * H.s], toPr = Pr ? lookAt(head, ehHeadOf(Pr)) : [1, 0];
    if (t < 83.52) { P.handR = kb; P.gaze = [0.6, 0.8]; }
    else if (t < 84.98) { P.handL = mane(4); P.handR = mane(2); P.gaze = [0.3, 1]; P.mouth = 'smile'; }
    else if (t < 86.04) { P.handL = [-90, -160]; P.handR = mane(2); P.gaze = toPr; P.mouth = 'smile'; P.brow = 0.4; }
    else if (t < 86.66) { P.handR = lv; P.handL = mane(4); P.gaze = [0.9, -0.1]; P.mouth = 'o'; }
    else if (t < 87.9) { P.handL = mane(4); P.handR = mane(2); P.gaze = [0.3, 1]; if (t > 87.24) { P.sq *= landSquash(tc, 87.24, 0.03); if (t > 87.4) { P.handL = [-40, -110]; P.handR = [100, -110]; P.gaze = toPr; } } }
    else if (t < 91.9) { P.gaze = toPr; P.mouth = 'smile'; P.handL = mane(4); P.handR = [90, -120]; }
    else if (t < 92.9) { const b = flow(tc, [[91.9, 0], [92.2, 1], [92.5, 1], [92.9, 0]]); P.lurch = 0.4 * b; P.handR = b > 0.8 ? mane(1) : [100, -140]; P.handL = [-60, -170 + 40 * b]; P.talk = ehTalk(t, 91.9, 92.9, 5, 0.6); P.eyes = 'shut'; }
    else { P.gaze = Pm(t) ? lookAt(head, ehHeadOf(Pm(t))) : toPr; P.mouth = 'smile'; P.handL = mane(4); P.handR = [80, -110]; }
    return P; }
  // the take-off: looks back at her, a raised hand, the quarter turn
  P.sq *= landSquash(tc, 141.55, 0.1); P.lurch = 0.06 + lurch(tc, 141.55, 0.14);
  if (t < 141.96) { P.handL = mane(4); P.handR = mane(2); P.gaze = [-0.4, 0.4]; }
  else if (t < 142.74) { P.gaze = [1, -0.2]; P.mouth = 'smile'; P.handL = t < 142.3 ? [-60, -200 + 10 * Math.sin(tc * 20)] : mane(4); P.handR = t >= 142.3 ? kb : mane(2); P.lid = Math.max(P.lid, ehBlinkAt(tc, 141.98)); }
  else { P.handL = mane(4); P.handR = mane(2); P.lurch = -0.1 + 0.1 * ehE(tc, 144.0, 0.6); P.gaze = [1, -0.1]; P.mouth = 'smile'; }
  return P;
}
const Pm = (t) => h2MaidRoof(t);

// ---------- the princess ----------
const H2_PRX = H2_F([[44.6, 1395], [45.5, 1300], [48.84, 1300], [49.3, 1322], [54.32, 1322], [55.2, 1270], [55.48, 1270], [56.0, 1250], [71.68, 1250], [73.25, 800], [78.9, 800], [79.8, 900], [84.98, 900], [85.6, 800], [86.5, 800], [87.0, 885], [97.6, 885], [98.35, 990]]);
const H2_PRX3 = H2_F([[126.7, 1340], [127.6, 990], [141.0, 990], [141.4, 1060], [143.46, 1060], [144.3, 985], [152, 985]]);
const H2_PR_SWEEP = [[57.48, 0], [58.1, 0.5], [58.7, 1], [59.6, 1]];
function h2PrRoof(t) {
  if (t < 44.6 || (t >= H2_ROOF_B && t < H2_ROOF_C)) return null;
  const tc = EH_T2(t), sd = 11, D = EH_PRINCESS, P = { x: 1300, y: 935, s: D.s, dir: -1, lid: ehLid(t, sd), sq: breathe(tc, sd, 0.014), tip: idleSway(tc, sd, 0.022, 3.1), mouth: 'closed', gaze: [-1, 0] };
  const head = () => ehHeadOf(P), look = (p) => lookAt(head(), p), fz = () => { const s = h2FzState(t); if (s !== 'ground') return null; return h2FzGroundPos(t); }, fzHead = () => { const f = fz(); return f ? [f[0], f[1] - 190] : [700, 560]; };
  if (t < H2_ROOF_B) {
    Object.assign(P, walk(H2_PRX, tc, { stride: 24 })); P.y = t < 45.5 ? K.lerp(905, 935, ehE(t, 44.6, 0.9)) : 935; P.vx = speed(H2_PRX, tc);
    P.gaze = look(fzHead()); P.handL = [-26, -96]; P.handR = [26, -98];
    if (t < 45.5) { P.handLW = t < 44.9 ? [EH_ROOF.door.x0 + 6, 760] : null; P.mouth = 'closed'; P.brow = 0.3; P.lid = Math.max(P.lid, 0.15); P.tip = -0.03; }
    else if (t < 48.84) { P.brow = 0.3; P.lid = Math.max(P.lid, 0.1); }
    else if (t < 50.84) { P.eyes = 'wide'; P.mouth = 'o'; P.handR = PERSON_HANDS.chest.R; P.sq *= 1 + 0.04 * pulse(tc, 48.84, 0.35); P.tip = -0.05; P.swing = swing(tc, 48.84, 0.25); }
    else if (t < 52.26) { P.handR = PERSON_HANDS.chest.R; P.brow = 0.3; P.mouth = 'closed'; }
    else if (t < 53.38) { const k = ehE(tc, 52.26, 0.4); P.gaze = lookAt(head(), [K.lerp(EH_ROOF.ring[0], 700, k), K.lerp(850, 700, k)]); P.tip = -0.04 * k + lagged((u) => -0.04 * ehE(u, 52.26, 0.4), tc, 0.12, 0.6); P.brow = 0.4; }
    else if (t < 54.32) { P.gaze = look([700, 700]); P.tip = 0.05; P.brow = 0.4; P.handR = PERSON_HANDS.chin.R; }
    else if (t < 56.2) { P.lid = Math.max(P.lid, 0.25); P.brow = 0.3; P.handR = [84, -164]; P.tip = -0.03; }
    else if (t < 57.48) { P.talk = ehTalk(t, 56.2, 57.4, 21, 0.8); P.handR = PERSON_HANDS.pointFwd.R; P.tip = -0.04; P.brow = 0.3; P.lid = Math.max(P.lid, 0.2); }
    else if (t < 59.8) { P.talk = ehTalk(t, 57.48, 59.6, 21, 0.8); const u = flow(tc, H2_PR_SWEEP); P.handR = [K.lerp(100, 44, u), K.lerp(-150, -210, u)]; P.gaze = u > 0.8 && t < 59.2 ? [-0.3, -1] : look(fzHead()); P.lid = Math.max(P.lid, ehBlinkAt(tc, 59.22)); }
    else if (t < 60.83) { P.gaze = t > 60.4 ? [-0.1, -1] : look(fzHead()); P.handR = [60, -150]; }
    else if (t < 71.68) { P.handR = t < 62.44 ? [70, -150] : [K.lerp(70, 40, ehE(tc, 62.44, 0.5)), K.lerp(-150, -112, ehE(tc, 62.44, 0.5))]; P.tip += 0.06 * pulse(tc, 62.5, 0.4); P.brow = 0.2;
      if (t >= 63.3) P.gaze = t < 70.5 ? look([300, 300]) : look(fzHead()); if (t >= 67.24 && t < 67.6) P.gaze = look([760, 760]); if (t > 69.9) { P.mouth = 'smile'; P.brow = 0.4; } }
    else if (t < 75.66) { P.handL = [-24, -84]; P.handR = [24, -84]; P.gaze = t < 73.22 ? (Math.floor((tc - 71.68) / 0.6) % 2 ? look(fzHead()) : [-1, 0]) : look([760, 700]);
      if (t >= 73.22 && t < 73.88) { P.gaze = gazePlan(tc, [[73.22, [-0.6, -0.8]], [73.5, [-0.4, 0.9]]], 0.1); P.lid = Math.max(P.lid, ehBlinkAt(tc, 73.24), ehBlinkAt(tc, 73.52)); }
      if (t >= 73.88 && t < 74.9) { const nk = h2HP(h2RoofHorse(t), [112, -246]); P.handRW = [nk[0] + 8 * Math.max(pulse(tc, 74.0, 0.15), pulse(tc, 74.3, 0.15)), nk[1]]; P.gaze = look(nk); P.brow = 0.5 * K.clamp((t - 74.1) / 0.2); }
      if (t >= 74.9) { P.gaze = look([800, 650]); P.brow = 0.3; } }
    else if (t < 79.8) { P.dir = t < 79.0 ? 1 : 1; P.handR = PERSON_HANDS.hipsHands.R; P.lid = Math.max(P.lid, 0.35, flow(tc, [[75.9, 0.35], [76.1, 1], [76.3, 0.35]])); P.mouth = 'smile'; P.brow = 0.5; P.tip = 0.04;
      if (t >= 77.4 && t < 78.66) { P.talk = ehTalk(t, 77.4, 78.6, 17, 0.6); P.tip = 0.06 * Math.sin((tc - 77.4) * 14); }
      if (t >= 78.9) { P.handR = [26, -96]; P.lid = ehLid(t, sd); } }
    else if (t < 84.98) { P.dir = -1; P.gaze = t < 80.94 ? look(fzHead()) : t < 81.3 ? look(h2HP(h2RoofHorse(t), EH_EBG.knob)) : look(h2HP(h2RoofHorse(t), EH_EBG.lever)); P.tip = 0.08; P.brow = 0.4; P.lid = Math.max(P.lid, ehBlinkAt(tc, 81.32)); if (t >= 81.86) { P.gaze = look([700, 700]); P.tip = 0.02; P.eyes = t > 83.6 ? 'wide' : 'open'; } }
    else if (t < 87.9) { P.dir = -1; const H = h2RoofHorse(t); P.gaze = look(h2HP(H, [80, -40])); P.eyes = 'wide'; P.mouth = 'o'; if (t > 85.6 && t < 86.5) { P.handRW = [726 + 20 * Math.sin((tc - 85.6) * 7), 812]; P.tip = 0.1; } }
    else { P.dir = -1; P.gaze = look(h2HP(h2RoofHorse(t), [0, -200])); P.eyes = 'wide'; P.mouth = 'o';
      if (t >= 90.04 && t < 91.38) { P.handL = PERSON_HANDS.cheeks.L; P.handR = PERSON_HANDS.cheeks.R; P.sq *= 1 + 0.05 * pulse(tc, 90.04, 0.3); P.swing = swing(tc, 90.04, 0.3); }
      if (t >= 91.38 && t < 92.44) { P.eyes = 'shut'; P.mouth = 'open'; P.tip = -0.07; P.sq *= Math.floor(tc * 12) % 2 ? 0.97 : 1.02; P.handL = [-40, -150]; P.handR = [40, -150]; P.swing = 0.15 * Math.sin(tc * 20); }
      if (t >= 92.44 && t < 93.14) { P.dir = 1; P.eyes = 'open'; P.mouth = 'smile'; P.handR = t < 92.8 ? [18, -192] : null; P.sq *= 0.98; const m = h2MaidRoof(t); if (m) { P.gaze = look(ehHeadOf(m)); if (t >= 92.8) P.handRW = [m.x - 20, m.y - 150 * m.s]; } }
      if (t >= 93.14 && t < 97.28) { P.talk = ehTalk(t, 93.14, 97.8, 21, 0.8); P.mouth = 'smile'; const u = flow(tc, [[93.14, 0], [94.0, 1], [97.2, 1]]); P.dir = u < 0.5 ? 1 : -1; P.handR = [K.lerp(60, 104, u), K.lerp(-120, -170, u)]; P.gaze = u < 0.5 ? [1, 0] : look(h2HP(h2RoofHorse(t), [0, -150])); }
      if (t >= 97.28) { P.dir = 1; P.handR = [100, -130]; P.mouth = 'smile'; P.gaze = [1, 0]; P.talk = ehTalk(t, 93.14, 97.8, 21, 0.8); } }
    return P;
  }
  // S16-S18 at the parapet
  Object.assign(P, walk(H2_PRX3, tc, { stride: 26 })); P.vx = speed(H2_PRX3, tc); P.y = t < 141.0 ? K.lerp(905, 886, ehE(t, 126.7, 0.9)) : t < 143.46 ? K.lerp(886, 912, ehE(t, 141.0, 0.4)) : K.lerp(912, 886, ehE(t, 143.46, 0.8));
  P.dir = -1; P.handL = [-26, -96]; P.handR = [26, -98]; P.gaze = look(fzHead());
  const tw = [EH_ROOF.towers[0] + 60 + (cam0x(t) - 800) * 0.55, 560], dome = [EH_ROOF.dome[0] + (cam0x(t) - 800) * 0.2, 600];
  if (t < 127.6) { P.handL = [-60, -130]; P.handR = [60, -136]; P.sq *= breathe(tc * 2.5, sd, 0.025); P.mouth = 'o'; }
  else if (t < 130.24) { P.dir = 1; const u = flow(tc, [[127.54, 0], [128.2, 1], [130.2, 1]]); P.handR = [K.lerp(30, 100, u), K.lerp(-100, -206, u)]; P.gaze = t < 128.0 ? look(fzHead()) : look(tw); P.talk = ehTalk(t, 127.6, 130.2, 9, 0.6); P.sq *= breathe(tc * 1.5, sd, 0.02); P.lid = Math.max(P.lid, ehBlinkAt(tc, 128.02)); }
  else if (t < 131.18) { P.dir = -1; const u = flow(tc, [[130.24, 0], [130.7, 1], [131.1, 1]]); P.handR = [K.lerp(60, 104, u), K.lerp(-150, -200, u)]; P.gaze = look(dome); P.talk = ehTalk(t, 130.24, 131.0, 9, 0.6); }
  else if (t < 132.78) { P.gaze = look(fzHead()); P.mouth = 'smile'; if (t > 132.05) { P.gaze = look([EH_ROOF.door.x0 + 60, 760]); P.eyes = 'wide'; } }
  else if (t < 140.64) { P.mouth = 'smile'; P.gaze = t < 134.9 ? look(fzHead()) : [-0.6, 0.6]; P.lid = Math.max(P.lid, t > 134.9 ? 0.2 : 0);
    if (t >= 137.48 && t < 138.3) { P.handRW = [h2FzGroundPos(t)[0] + 44, 800 + 4 * pulse(tc, 137.8, 0.15)]; P.tip = 0.06; }
    if (t >= 139.38 && t < 140.0) { P.mouth = 'smile'; P.lid = 0.2; } if (t >= 139.96) { P.gaze = look([1100, 760]); P.handR = [60, -110]; } }
  else if (t < 143.46) { P.gaze = t < 141.96 ? [-1, 0.2] : look([700, 600]); P.handR = PERSON_HANDS.clasp.R; P.handL = PERSON_HANDS.clasp.L; P.brow = 0.3; if (t > 142.74) { P.swing = 0.5 * K.clamp(1 - (t - 142.74) / 1.2); P.eyes = 'wide'; } }
  else { const H = h2RoofHorse(t), hp = H.gone ? [1240, 480] : [H.x, H.y - 150 * H.s]; P.gaze = look(hp); P.handL = [-34, -98]; P.handR = [34, -98]; P.tip = -0.05; P.sq *= breathe(tc, sd, 0.02);
    if (t >= 144.64 && t < 145.74) { const u = flow(tc, [[144.64, 0], [145.1, 1], [145.7, 1]]); P.handR = [K.lerp(34, 56, u), K.lerp(-98, -168, u)]; P.lid = Math.max(P.lid, 0.2); P.brow = 0.3; }
    if (t >= 145.74) { const u = flow(tc, [[145.74, 0], [146.3, 1]]); P.handR = [K.lerp(56, 6, u), K.lerp(-168, -124, u)]; P.lid = Math.max(ehLid(t, sd, [146.4]), 0.2); P.brow = 0.3; } }
  return P;
}
// Firuz's ground position without his full pose (for gaze targets)
function h2FzGroundPos(t) { if (t < H2_ROOF_B) return [t >= 96.9 ? H2_FZX2(t) : H2_FZX(t), H2_GY]; return [H2_FZX3(t), 886]; }

// ---------- the maid ----------
const H2_MDX = H2_F([[45.56, 1432], [46.44, 1432], [47.2, 1392], [49.4, 1392], [49.8, 1368], [55.68, 1368], [56.2, 1338], [71.9, 1338], [73.5, 1150], [73.6, 1150], [74.4, 885], [74.9, 885], [75.15, 935], [75.6, 935], [76.4, 1050], [93.2, 1050], [94.7, 790], [95.4, 790], [96.3, 985], [97.5, 985], [98.35, 1110]]);
const H2_MDX3 = H2_F([[126.7, 1400], [139.96, 1400], [140.6, 1072], [141.2, 1072], [141.9, 1030], [152, 1030]]);
const H2_LAMPUP = [[47.2, 0], [47.7, 1], [48.0, 1]];
function h2MaidRoof(t) {
  if (t < 45.56 || (t >= H2_ROOF_B && t < H2_ROOF_C)) return null;
  const tc = EH_T2(t), sd = 17, D = EH_MAID, P = { x: 1400, y: 925, s: D.s, dir: -1, lid: ehLid(t, sd), sq: breathe(tc, sd, 0.016), tip: idleSway(tc, sd, 0.03, 2.4), mouth: 'closed', gaze: [-1, 0] };
  const head = () => ehHeadOf(P), look = (p) => lookAt(head(), p); let lamp = 'R', lampSwing = 0;
  if (t < H2_ROOF_B) {
    Object.assign(P, walk(H2_MDX, tc, { stride: 20 })); P.y = t < 47.2 ? K.lerp(900, 925, ehE(t, 46.44, 0.7)) : 925; P.handR = [40, -120]; P.handL = [10, -112];
    const fzp = h2FzGroundPos(t); P.gaze = look([fzp[0], fzp[1] - 180]);
    if (t < 46.44) { P.eyes = 'wide'; P.tip = 0.08; P.handL = [-50, -160]; P.handR = [20, -112]; }
    else if (t < 49.4) { const u = flow(tc, H2_LAMPUP); P.handR = [K.lerp(40, 36, u), K.lerp(-120, -214, u)]; P.handL = [K.lerp(10, 6, u), K.lerp(-112, -206, u)]; P.tip = -0.04; P.sq *= 0.97; P.drop = -4; lampSwing = swing(tc, 47.7, 0.25); P.eyes = 'wide'; }
    else if (t < 53.38) { P.drop = 18; P.tip = 0.06; P.handR = [36, -170 + tremble(tc, 3, 9)]; P.handL = [-10, -140]; lampSwing = tremble(tc, 0.06, 9); P.eyes = 'wide'; }
    else if (t < 54.32) { P.drop = 12; P.handL = [-70 + tremble(tc, 3, 11), -150]; P.handR = [10, -172]; P.talk = ehTalk(t, 53.6, 54.2, 31, 0.4); P.gaze = look([700, 720]); }
    else if (t < 71.9) { P.handR = t < 62.44 ? [38, -200] : [40, -170]; P.handL = [6, -190]; lampSwing = idleSway(tc, 19, 0.04, 1.7);
      if (t >= 59.8 && t < 61) P.gaze = [0, -1];
      if (t >= 68.78 && t < 69.9) { const k = flow(tc, [[68.78, 0], [69.2, 1], [69.6, 0.2], [69.9, 0]]); P.tip = -0.14 * k; P.gaze = [-0.4, -1]; P.handL = [-70, -150]; lampSwing = 0.3 * k; } }
    else if (t < 76.4) { P.handR = [40, -150]; P.handL = [10, -120];
      if (t >= 74.3 && t < 75.0) { const eye = h2HP(h2RoofHorse(t), EH_EBG.eye); P.handRW = [eye[0] + 36, eye[1] + 6]; P.handL = [-60 + 20 * Math.sin((tc - 74.5) * 24), -190]; P.gaze = look(eye); P.tip = 0.12; P.eyes = 'wide'; }
      if (t >= 75.0 && t < 75.6) { const [, l] = hop(tc, 75.0, 0.3, 0, 0, 20); P.y = 925 - l; P.eyes = 'wide'; P.mouth = 'o'; P.handL = [-60, -170]; } }
    else if (t < 94.7) { P.handR = [40, -150]; P.handL = [10, -120]; P.gaze = look([700, 650]);
      if (t >= 77.4 && t < 78.7) { P.handL = PERSON_HANDS.mouthCover.L; P.sq *= 1 + 0.02 * Math.sin(tc * 30); P.eyes = 'shut'; }
      if (t >= 84.28 && t < 91.6) { const c = t < 90.7 ? 1 : 1 - ehE(tc, 90.7, 0.9); P.sq *= 1 - 0.2 * c; P.drop = 30 * c; P.handR = [36, K.lerp(-150, -236, c)]; P.handL = [6, K.lerp(-120, -224, c)]; lampSwing = (t < 85 ? tremble(tc, 0.1, 7) : 0); P.eyes = 'wide'; if (t > 90.7) P.mouth = 'o'; }
      if (t >= 93.2) { P.handR = [40, -150]; P.gaze = look([721, 880]); } }
    else if (t < 96.3) { P.dir = -1; P.drop = 26; P.tip = 0.16; P.handR = [30, -150]; const hoof = [722, 884], touch = t >= 94.84 && t < 95.3; P.handLW = touch ? hoof : null; P.handL = touch ? undefined : [-40, -140]; P.gaze = look(hoof); P.mouth = t > 95.3 ? 'smile' : 'closed'; if (t > 95.3) { P.drop = 6; P.tip = -0.03; P.sq *= 1.03; } }
    else { P.handR = [40, -150]; P.handL = [10, -120]; P.mouth = 'smile'; P.gaze = look([700, 700]); if (t >= 97.28) { P.dir = 1; P.gaze = [1, 0]; } }
    return Object.assign(P, { lamp, lampSwing });
  }
  // S16-S18: at the door listening, waving, the tug, backing away, the curtsy
  Object.assign(P, walk(H2_MDX3, tc, { stride: 20 })); P.y = t < 139.96 ? 898 : K.lerp(898, 906, ehE(t, 139.96, 0.5)); P.dir = -1; P.handR = [40, -150]; P.handL = [10, -120]; P.gaze = [-1, 0];
  if (t < 132.05) { P.dir = 1; P.handL = PERSON_HANDS.cupEar.R ? [-42, -200] : P.handL; P.gaze = [0.6, 0.4]; P.tip = 0.06; P.drop = 8; }
  else if (t < 132.78) { P.handL = [-90 + 30 * Math.sin(tc * 24), -210]; P.handR = [36, -214]; lampSwing = 0.25 * Math.sin(tc * 24); P.eyes = 'wide'; P.mouth = 'open'; P.gaze = [-1, -0.1]; }
  else if (t < 139.96) { P.gaze = [-1, 0.2]; P.lid = Math.max(P.lid, 0.2); P.mouth = 'smile'; P.tip = 0.05; P.handL = PERSON_HANDS.clasp.L; }
  else if (t < 141.2) { const pr = h2PrRoof(t); if (pr && t > 140.6) { P.handLW = [pr.x + 26, pr.y - 120]; P.gaze = look(ehHeadOf(pr)); P.talk = ehTalk(t, 140.6, 141.2, 41, 0.5); } P.eyes = 'wide'; }
  else if (t < 145.2) { P.gaze = t < 141.9 ? [1, -0.1] : [-0.6, -0.8]; P.eyes = 'wide'; P.tip = -0.05; }
  else { P.dir = 1; P.gaze = [1, 0]; P.mouth = 'smile'; P.drop = 18 * pulse(tc, 145.9, 0.7); P.tip = 0.08 * pulse(tc, 145.9, 0.7); P.lid = Math.max(P.lid, t > 147 ? ehBlinkAt(tc, 147.4) : 0); if (t > 147) { P.dir = -1; P.gaze = [-0.4, -0.8]; } }
  return Object.assign(P, { lamp, lampSwing });
}
function h2LampPos(M) { const h = M.handRW || M.handR || [40, -150], w = M.handRW ? h : ehHandW(M, h); return [w[0], w[1] - 8]; }

// ---------- the cat ----------
function h2CatRoof(t) {
  const tc = EH_T2(t), P = { x: EH_ROOF.catSpot[0], y: EH_ROOF.catSpot[1], s: 0.62, pal: 2, dir: -1, crouch: 1, lid: 1, tailCurl: 0.6 + 0.2 * Math.sin(tc * 1.3), ears: 0.3 };
  if (t < H2_ROOF_B) {
    if (t >= 28.6 && t < 29.3) { P.lid = 0.45; P.tailCurl += 0.3 * Math.sin(tc * 14); }
    if (t >= 35.78 && t < 36.5) P.ears = 0.3 + 0.7 * pulse(tc, 35.85, 0.5);
    if (t >= 39.25 && t < 61) { P.crouch = 0.5; P.lid = ehLid(t, 41) * 0.8; P.gaze = t >= 59.8 ? [0, -1] : [1, 0.3]; P.dir = t >= 44 ? 1 : 1; P.ears = 0.8; }
    if (t >= 61 && t < 84.28) { P.crouch = 0.8; P.lid = 0.6; P.dir = 1; }
    if (t >= 84.28 && t < 87.6) { P.crouch = 0; P.arch = 1; P.puff = 1; P.lid = 0; P.mouth = 'open'; P.ears = -1; P.dir = -1; P.gaze = [-1, -0.3]; }
    if (t >= 87.6 && t < 95.0) { P.crouch = 0; P.sit = 1; P.lid = ehLid(t, 43); P.dir = -1; P.gaze = [-1, 0.2]; P.ears = 0.6; }
    if (t >= 95.0) { P.crouch = 0; P.dir = -1; P.lid = ehLid(t, 43);
      if (t < 95.4) { const [x, l] = hop(tc, 95.0, 0.4, 880, 850, 40); P.x = x; P.y = K.lerp(EH_ROOF.catSpot[1], 905, ehE(tc, 95.0, 0.4, 'in')) - l; }
      else if (t < 95.9) { const xf = H2_F([[95.4, 850], [95.9, 765]]); Object.assign(P, walk(xf, tc, { stride: GAIT.cat * 0.62 })); P.y = 905; P.tailUp = 1; }
      else if (t < 96.4) { P.x = 765 + 10 * Math.sin((tc - 95.9) * 12); P.y = 905; P.tailUp = 1; P.lid = 0.6; P.dir = -1; }
      else { P.x = 770; P.y = 905; P.sit = 1; P.gaze = [-0.6, -0.8]; } }
    return P;
  }
  P.x = 560; P.sit = 1; P.crouch = 0; P.lid = ehLid(t, 45); P.dir = 1; P.gaze = [1, 0.2]; P.ears = 0.6;
  if (t > 142.74) { P.gaze = [0.5, -0.9]; P.ears = 1; }
  if (t >= 148.5 && t < 148.9) { const [x, l] = hop(tc, 148.5, 0.4, 560, 520, 40); P.x = x; P.y = K.lerp(EH_ROOF.catSpot[1], 905, ehE(tc, 148.5, 0.4, 'in')) - l; P.sit = 0; }
  if (t >= 148.9) { P.x = 520; P.y = 905; P.sit = 1; P.lick = t > 149.4 ? Math.abs(Math.sin(tc * 5)) : 0; P.dir = 1; }
  return P;
}

// ---------- the guards on the roof (S18) ----------
function h2GuardsRoof(t) {
  if (t < 145.2) return []; const tc = EH_T2(t), xa = H2_F([[145.2, 1400], [146.0, 1330]]), xb = H2_F([[145.35, 1420], [146.3, 1250]]);
  const A = { ...walk(xa, tc, { stride: 22 }), y: 902, s: EH_GUARD_A.s, dir: -1, lid: ehLid(t, 51), sq: breathe(tc, 51, 0.012), tip: idleSway(tc, 51, 0.02, 2.7), gaze: [-1, 0], mouth: 'closed', handR: [60, -150], handL: [-30, -100], torch: true };
  const B = { ...walk(xb, tc, { stride: 22 }), y: 912, s: EH_GUARD_B.s, dir: -1, lid: ehLid(t, 53), sq: breathe(tc, 53, 0.012), tip: idleSway(tc, 53, 0.02, 3.3), gaze: [-1, 0.1], mouth: 'closed', handR: [50, -140], handL: [-30, -100], spear: true };
  if (t > 146.0) { A.gaze = [-1, -0.1]; B.dir = 1; B.gaze = [1, 0]; }
  if (t > 146.3 && t < 147.3) { const u = pulse(tc, 146.4, 0.8); A.handL = [K.lerp(-30, -64, u), K.lerp(-100, -104, u)]; B.handL = [K.lerp(-30, -60, u), -102]; B.drop = -6 * u; A.drop = -6 * pulse(tc, 146.55, 0.8); A.mouth = 'frown'; B.mouth = 'frown'; }
  if (t > 147.3 && t < 148.3) { A.handL = [-14 + 6 * Math.sin(tc * 30), -226]; }
  if (t > 148.3) { A.gaze = [-1, 0.3]; B.gaze = [1, 0.2]; }
  return [[EH_GUARD_A, A], [EH_GUARD_B, B]];
}
function h2Guard(ctx, D, P, t) { const t3 = EH_T3(t); h2Shadow(ctx, P.x, P.y, 90 * P.s); ehNeckCloth(ctx, P); person(ctx, ehDressP(D, P)); ehHelmet(ctx, P);
  if (P.torch) { const [hx, hy] = ehHandW(P, P.handR); ehTorch(ctx, hx, hy, t3, P.s); } if (P.spear) { const [hx, hy] = ehHandW(P, P.handR); ehSpear(ctx, hx, hy, P.s, 0.05 * (P.dir || 1)); } }

// ---------- drawing the roof world ----------
function h2Shadow(ctx, x, y, w, lift = 0, o = {}) { groundShadow(ctx, x, y, w, lift, { flat: true, color: '#2b1a3a', alpha: o.alpha ?? 0.2, fall: o.fall ?? 260 }); }
function h2RoofOpts(t) {
  const n = t >= H2_ROOF_C ? 1 : flow(t, [[28.2, 0], [31.0, 1]]), D = EH_ROOF.door;
  return { night: n, moon: [EH_ROOF.moon[0], t < 31 ? flow(t, [[25.72, 560], [28.2, 530], [29.8, 240], [31, 200]]) : 200, EH_ROOF.moon[2] * (t >= H2_ROOF_C ? 1.15 : 1)],
    door: t < 44.24 ? 0 : flow(t, [[44.24, 0], [44.74, 1]]), doorLine: t >= 39.9 && t < 44.5 ? K.clamp((t - 39.9) / 0.3) : 0,
    doorGlow: t >= 141.2 ? K.clamp((t - 141.2) / 0.7) * (t < 145.3 ? 1 : 0.6) : 0, inside: (c) => { if (t < 141.2 || t > 145.3) return; const g = K.clamp((t - 141.2) / 0.8); c.save(); c.globalAlpha = 0.5 * g; c.fillStyle = '#2a1a3a';
      for (const [dx, ph] of [[-20, 0], [24, 0.5]]) { const b = 6 * Math.sin((t * 4 + ph) * Math.PI), sc = 0.6 + 0.6 * g; c.beginPath(); c.moveTo(D.x0 + 60 + dx - 26 * sc, 800 + b); c.lineTo(D.x0 + 60 + dx, 700 - 60 * sc + b); c.lineTo(D.x0 + 60 + dx + 26 * sc, 800 + b); c.closePath(); c.fill(); } c.restore(); },
    win: t < 40.0 ? 0 : t < 44.6 ? K.clamp((t - 40.0) / 0.2) : 0.6, winInside: t >= 40.0 && t < 44.6 ? (c) => h2WindowBust(c, t) : null,
    lanterns: t >= H2_ROOF_C ? 1 : K.clamp((t - 28.6) / 0.15), path: t >= H2_ROOF_C ? flow(t, [[126.7, 0.8], [129.3, 1]]) : 0,
    towerFlash: [pulse(t, 128.48, 0.6), pulse(t, 128.73, 0.6)], domeHi: t > 130.24 && t < 131.4 ? (t - 130.24) / 1.16 : 0, cup: !(t >= 36.98 && t < 51.9), wind: t > 142.74 && t < 144 ? pulse(t, 142.74, 1.2) : 0 };
}
// the princess's bust in the lit window (40.22 - 44.6): book, listening, the turn
function h2WindowBust(c, t) {
  const tc = EH_T2(t), [wx, wy, ww, wh] = EH_ROOF.win, P = { x: wx + ww / 2, y: wy + wh / 2 + 120, s: 0.58, dir: -1, lid: ehLid(t, 11, [40.3, 40.96]), mouth: 'closed', gaze: [0, -1], tip: idleSway(tc, 11, 0.02, 3.1) };
  ehGlow(c, wx + ww / 2, wy + wh / 2, 80, 0.8, '#ffd27a');
  if (t < 40.94) { P.gaze = [0.2, -1]; P.tip += 0.06; P.handR = t > 40.6 ? PERSON_HANDS.cupEar.R : [40, -120]; P.handL = [-20, -120]; }
  else { P.gaze = [-1, 0.3]; P.brow = 0.4; P.handL = [-30, -100]; P.handR = [30, -100]; P.tip = -0.03; }
  person(c, ehDressP(EH_PRINCESS, P)); if (t < 40.94) shape(c, K.rectPts(wx + ww / 2 - 14, wy + wh - 22, 30, 18), '#e8364f', { lw: 2 });
}
function h2RoofWorld(ctx, t, cam) {
  const tc = EH_T2(t), t3 = EH_T3(t), o = h2RoofOpts(t); palaceRoof(ctx, t, cam, o);
  const H = h2RoofHorse(t), st = h2FzState(t), Pr = h2PrRoof(t), M = h2MaidRoof(t), C2 = h2CatRoof(t), lampW = M ? h2LampPos(M) : null;
  // background light on the floor: the window light, the lamp pool, the torch light
  if (o.win > 0 && t < 44.6) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.3 * o.win; ctx.fillStyle = '#ffd27a'; ctx.beginPath(); ctx.moveTo(1170, 900); ctx.lineTo(1290, 900); ctx.lineTo(1250, 980); ctx.lineTo(1110, 980); ctx.closePath(); ctx.fill(); ctx.restore(); }
  if (lampW) { const r = t < 48.06 ? 60 : t < 48.84 ? K.lerp(60, 420, ehE(t, 48.06, 0.78)) : 380 + 20 * Math.sin(t3 * 9); const wob = t > 49.4 && t < 53.4 ? tremble(t3, 18, 9) : t > 84.28 && t < 85.2 ? 40 * Math.sin(t * 30) : 0; lampGlow(ctx, lampW[0] + wob, 930, r, 1); }
  if (o.doorGlow > 0) lampGlow(ctx, (EH_ROOF.door.x0 + EH_ROOF.door.x1) / 2, 905, 220 * o.doorGlow, 0.9, '#ff9a3a');
  // the cat on the parapet (behind everyone) or on the floor
  const catDraw = () => { if (C2.y < 880) h2Shadow(ctx, C2.x, EH_ROOF.catSpot[1] + 2, 70 * C2.s); else h2Shadow(ctx, C2.x, C2.y, 90 * C2.s); cat(ctx, C2); };
  if (C2.y < 850) catDraw();
  // the cast in depth order
  const rows = [], rimOf = (x) => (lampW && Math.abs(lampW[0] - x) < 520 ? { rim: '#ffd27a', light: [Math.sign(lampW[0] - x) || 1, -0.4], rimW: 3 } : o.night > 0.5 ? { rim: '#bfd8ff', light: [1, -1], rimW: 2.5 } : { rim: '#ffb0a0', light: [1, -0.6], rimW: 2.5 });
  if (C2.y >= 850) rows.push([C2.y - 2, catDraw]);
  if (!H.gone) rows.push([900, () => {
    if (!(t >= 142.74)) h2Shadow(ctx, H.x + 10, 902, 300 * H2_HS, H.lift, { alpha: 0.34, fall: 420 }); else if (H.lift < 300) h2Shadow(ctx, 650, 902, 300 * H2_HS, H.lift, { alpha: 0.34, fall: 420 });
    if (H.lift > 20 && t < 142.74) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.35 * K.clamp(H.lift / 120); ehGlow(ctx, H.x, 900 - H.lift * 0.4, 160, 0.7, '#9ac0ff'); ctx.restore(); }
    const rideNow = st === 'ride', fzR = rideNow ? h2FzRide(t, H) : null;
    const drawH = (c) => { if (H.air) ehWindRibbons(c, H, tc, { ang: t > 142.74 ? Math.PI * 1.12 : Math.PI / 2 + 0.2, len: 220 }); if (rideNow) ehRide(c, H, 'firuz', fzR, t, { tc, stream: H.air ? 0.7 : 0, ang: H.air && t > 142.74 ? Math.PI * 1.08 : Math.PI / 2 - 0.4 }); else ebonyHorse(c, H); };
    castFinish(ctx, H.x + 20, H.y + 30, 640, 860, drawH, lampW && Math.abs(lampW[0] - H.x) < 600 ? { rim: '#ffd27a', light: [Math.sign(lampW[0] - H.x), -0.3], rimW: 3 } : { rim: '#bfd8ff', light: [1, -1], rimW: 3 });
    if (t > 27.46 && t < 28.3) dustBurst(ctx, H.x, 902, t - 27.46, 12, 8, 18, 150, 0.8, 7);
    if (t > 83.52 && t < 84.4) { dustBurst(ctx, H.x, 902, t - 83.52, 10, 7, 16, 140, 0.8, 9); for (let i = 0; i < 2; i++) { const u = (t - 83.52 - i * 0.1) / 0.9; if (u > 0 && u < 1) { ctx.fillStyle = '#3fae6a'; ctx.save(); ctx.translate(H.x + (i ? 1 : -1) * 120 * u, 880 - 90 * Math.sin(u * Math.PI)); ctx.rotate(u * 9); ctx.beginPath(); ctx.ellipse(0, 0, 9, 4, 0, 0, 7); ctx.fill(); ctx.restore(); } } }
    if (t > 87.24 && t < 87.8) dustBurst(ctx, H.x, 902, t - 87.24, 6, 5, 10, 70, 0.55, 11);
    if (t > 142.74 && t < 143.5) dustBurst(ctx, 640, 902, t - 142.74, 12, 8, 18, 160, 0.75, 13);
    // the brass answers the lamp: glints
    if (t > 48.4 && t < 49.2) { const [x, y] = h2HP(H, EH_EBG.chest); ehGlint(ctx, x, y, 30, (t - 48.4) / 0.8); }
    if (t > 52.78 && t < 53.5) { const [x, y] = h2HP(H, EH_EBG.mane[Math.min(6, Math.floor((t - 52.78) / 0.1))]); ehGlint(ctx, x, y, 22, ((t - 52.78) % 0.1) / 0.1); }
    if (t > 74.92 && t < 75.7) { const [x0, y0] = h2HP(H, [-200, -380]); ehBand(ctx, [x0 - 400, y0, 880, 420], 1 - (t - 74.92) / 0.78, { clip: (c) => h2HorseClip(c, H), w: 70, alpha: 0.55 }); }
    if (t > 80.94 && t < 81.8) { const [x, y] = h2HP(H, EH_EBG.knob); ehGlint(ctx, x, y, 26, (t - 80.94) / 0.86); ehGlow(ctx, x, y, 50, 0.6); }
    if (t > 81.3 && t < 82.2) { const [x, y] = h2HP(H, EH_EBG.lever); ehGlint(ctx, x, y, 24, (t - 81.3) / 0.9); }
    if (t > 95.66 && t < 96.3) { const [x, y] = h2HP(H, [90, -84]); ehGlint(ctx, x, y, 22, (t - 95.66) / 0.64); }
  }]);
  // the rope (tethered to the post, or in his hand, or coiled on the saddle)
  rows.push([901, () => { if (H.air || t >= 142.74) return; const neck = h2HP(H, [96, -220]); let b = null, taut = 0;
    if (t >= 32.4 && t < 34.3) { const f = h2FzGround(t, H); b = f ? ehHandW(f[0], f[0].handR || [60, -110]) : EH_ROOF.ring; if (f && f[0].handRW) b = f[0].handRW; }
    else if ((t >= 34.3 && t < 81.95) || (t >= 97.0 && t < 140.9)) { b = EH_ROOF.ring; if (t < 34.76) taut = h2FzGround(t, H)[1].taut || 0; }
    if (b) tetherRope(ctx, neck, b, 34, { taut }); else { const c = h2HP(H, [30, -196]); ehRopeCoil(ctx, c[0], c[1], 0.8); } }]);
  // Firuz on the ground (vaults and hops included)
  let fz = null, fo = {}; if (st === 'ground') [fz, fo] = h2FzGround(t, H); else if (st === 'vault1') fz = h2FzVault(t, H, 81.95, 790); else if (st === 'vault2') fz = h2FzVault(t, H, 141.0, 795); else if (st === 'down1') fz = h2FzDown(t, H, 29.3, 755); else if (st === 'down2') fz = h2FzDown(t, H, 96.46, 765);
  if (fz) rows.push([fz.y + (fz.lift || 0), () => { h2Shadow(ctx, fz.x, fz.y + (fz.lift || 0), 90 * fz.s, fz.lift || 0);
    castFinish(ctx, fz.x, fz.y + 10, 300, 320, (c) => { ehCapeStand(c, fz, tc, { vx: fo.vx || 0, swing: (fo.swing || 0) + swing(tc, 29.75, 0.3) + swing(tc, 96.9, 0.3) }); person(c, ehDressP(EH_FIRUZ, fz)); }, rimOf(fz.x));
    if (fo.cup) { const [cx, cy] = fz.handRW || ehHandW(fz, fz.handR); ehCup(ctx, cx, cy - 6, 1, fo.cup.tilt || 0, 1); }
    if (fo.scroll > 0) { const [sx, sy] = ehHandW(fz, [46, -126]); ehScroll(ctx, sx, sy, 1.1, fo.scroll, -0.1); }
    if (fo.sweat) { const [hx, hy] = ehHeadOf(fz), u = ((t - 50.84) % 0.9) / 0.9; shape(ctx, [[hx + 40, hy - 40 + 30 * u], [hx + 46, hy - 26 + 30 * u], [hx + 40, hy - 20 + 30 * u], [hx + 34, hy - 26 + 30 * u]], '#8fd0ff', { lw: 2 }); } }]);
  if (Pr) rows.push([Pr.y, () => { h2Shadow(ctx, Pr.x, Pr.y, 84 * Pr.s); castFinish(ctx, Pr.x, Pr.y + 10, 300, 320, (c) => { ehVeilRibbon(c, Pr, tc, { vx: Pr.vx || 0, swing: Pr.swing || 0, wave: t > 142.74 && t < 144 ? 12 : 0 }); person(c, ehDressP(EH_PRINCESS, Pr)); }, rimOf(Pr.x)); }]);
  if (M) rows.push([M.y - 1, () => { h2Shadow(ctx, M.x, M.y, 80 * M.s); person(ctx, ehDressP(EH_MAID, M)); const [lx, ly] = h2LampPos(M); oilLamp(ctx, lx, ly, t3, { swing: M.lampSwing || 0, s: 0.95, lit: t > 141.2 && t < 145.2 ? 0.6 : 1 }); }]);
  for (const [D, P] of h2GuardsRoof(t)) rows.push([P.y, () => h2Guard(ctx, D, P, t)]);
  rows.sort((a, b) => a[0] - b[0]).forEach((r) => r[1]());
  // sound rings on the tiles under his careful steps
  for (const tr of [42.42, 42.8]) { const u = (t - tr) / 0.5; if (u > 0 && u < 1) { const x = H2_FZX(tr) + 10; ctx.save(); ctx.globalAlpha = 1 - u; ctx.strokeStyle = '#fff6ea'; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(x, 934, 30 + 90 * u, 8 + 22 * u, 0, 0, 7); ctx.stroke(); ctx.restore(); } }
  palaceRoofFront(ctx, t, o);
}
function h2HorseClip(ctx, H) { const m = ctx.getTransform(); ctx.translate(H.x, H.y); if (H.rot) ctx.rotate(H.rot); ctx.scale((H.dir ?? 1) * H.s, H.s); ctx.beginPath();
  for (const poly of [EH_EBG.body, EH_EBG.neck, EH_EBG.head]) poly.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  for (const [hx, fx] of EH_EBG.legs) { ctx.moveTo(hx - 13, -152); ctx.lineTo(hx + 13, -152); ctx.lineTo(fx + 16, 0); ctx.lineTo(fx - 16, 0); } ctx.setTransform(m); ctx.clip('nonzero'); }

// ---------- the roof camera ----------
const H2_RCAM = [
  [25.72, 32.4, [[25.72, { x: 700, y: 520, zoom: 0.8 }], [29.3, { x: 700, y: 520, zoom: 0.8 }], [31.6, { x: 930, y: 540, zoom: 0.86 }], [32.4, { x: 820, y: 575, zoom: 1.0 }]]],
  [40.22, 48.84, [[40.22, { x: 1330, y: 560, zoom: 0.95 }], [41.8, { x: 1300, y: 560, zoom: 0.95 }], [46.4, { x: 950, y: 540, zoom: 0.8 }], [48.84, { x: 960, y: 545, zoom: 0.8 }]]],
  [48.84, 60.83, [[48.84, { x: 1010, y: 580, zoom: 0.95 }], [51.5, { x: 1020, y: 580, zoom: 0.95 }], [52.26, { x: 1020, y: 580, zoom: 0.95 }], [53.4, { x: 880, y: 580, zoom: 0.95 }], [55.4, { x: 900, y: 580, zoom: 0.95 }], [56.2, { x: 1010, y: 580, zoom: 0.95 }], [60.83, { x: 1020, y: 590, zoom: 0.98 }]]],
  [60.83, 71.68, [[60.83, { x: 1020, y: 600, zoom: 1.0 }], [63.3, { x: 1000, y: 600, zoom: 1.0 }], [65.0, { x: 920, y: 600, zoom: 1.0 }], [71.68, { x: 900, y: 600, zoom: 1.0 }]]],
  [71.68, 79.52, [[71.68, { x: 900, y: 600, zoom: 1.0 }], [74.3, { x: 760, y: 610, zoom: 1.05 }], [78.6, { x: 800, y: 610, zoom: 1.05 }], [79.52, { x: 790, y: 600, zoom: 1.0 }]]],
  [79.52, 87.9, [[79.52, { x: 760, y: 600, zoom: 0.95 }], [83.52, { x: 760, y: 580, zoom: 0.92 }], [84.8, { x: 760, y: 480, zoom: 0.8 }], [86.6, { x: 770, y: 480, zoom: 0.8 }], [87.9, { x: 780, y: 580, zoom: 0.9 }]]],
  [87.9, 88.3, [[87.9, { x: 820, y: 580, zoom: 0.92 }], [88.3, { x: 840, y: 580, zoom: 0.96 }]]],
  [90.04, 98.35, [[90.04, { x: 820, y: 570, zoom: 0.92 }], [93.2, { x: 840, y: 570, zoom: 0.92 }], [97.28, { x: 880, y: 570, zoom: 0.92 }], [98.35, { x: 920, y: 570, zoom: 0.92 }]]],
  [126.7, 132.78, [[126.7, { x: 820, y: 410, zoom: 0.75 }], [130.24, { x: 820, y: 410, zoom: 0.75 }], [131.1, { x: 680, y: 410, zoom: 0.75 }], [132.78, { x: 740, y: 410, zoom: 0.75 }]]],
  [132.78, 140.64, [[132.78, { x: 900, y: 580, zoom: 0.95 }], [140.64, { x: 940, y: 580, zoom: 0.95 }]]],
  [140.64, 160, [[140.64, { x: 800, y: 540, zoom: 0.85 }], [142.7, { x: 780, y: 540, zoom: 0.85 }], [144.2, { x: 800, y: 238, zoom: 0.62 }], [151.5, { x: 830, y: 238, zoom: 0.62 }]]],
];
function h2RoofClamp(c) { const z = c.zoom; return { x: K.clamp(c.x, 500 / z, EH_ROOF.w - 500 / z), y: K.clamp(c.y, EH_ROOF.top + 615 / z, 1230 - 615 / z), zoom: z }; }
function h2RoofCam(t) {
  if (t >= 32.4 && t < 40.22) { const x = H2_FZX(Math.max(32.4, t)) + 60, x0 = 820; return h2RoofClamp({ x: t < 33.2 ? K.lerp(x0, x, ehE(t, 32.4, 0.8)) : x, y: 575, zoom: 1.0 }); }
  for (const [a, b, keys] of H2_RCAM) if (t >= a && t < b) return h2RoofClamp(K.camAt(keys, t));
  return h2RoofClamp(K.camAt(H2_RCAM[H2_RCAM.length - 1][2], t));
}
