// ===== HORSE-04: the locked court. S6 the gate and the secret (46.6 - 57.0), S12 the craftsman inspects (94.76 - 105.16),
// S13 tomorrow in the square (105.16 - 112.77), S14-S16 the password under the lattice (112.77 - 132.4). World units on lockedCourt.
const H4_CCAM = [[46.6, { x: 640, y: h4GY(0.9, 945), zoom: 0.9 }], [47.6, { x: 620, y: h4GY(0.9, 945), zoom: 0.9 }], [48.6, { x: 880, y: h4GY(1.2), zoom: 1.2 }], [50.8, { x: 880, y: h4GY(1.2), zoom: 1.2 }],
  [51.6, { x: 900, y: h4GY(1.25), zoom: 1.25 }], [54.9, { x: 880, y: h4GY(1.2), zoom: 1.2 }], [55.6, { x: 620, y: h4GY(1.0, 945), zoom: 1.0 }], [57.0, { x: 600, y: h4GY(1.0, 945), zoom: 1.0 }],
  [94.76, { x: 520, y: h4GY(1.05), zoom: 1.05 }], [96.4, { x: 520, y: h4GY(1.05), zoom: 1.05 }], [98.0, { x: 820, y: h4GY(1.1), zoom: 1.1 }], [100.7, { x: 860, y: h4GY(1.2), zoom: 1.2 }],
  [102.3, { x: 860, y: h4GY(1.2), zoom: 1.2 }], [105.2, { x: 840, y: h4GY(1.2), zoom: 1.2 }], [110.3, { x: 820, y: h4GY(1.15) - 40, zoom: 1.15 }], [110.9, { x: 820, y: h4GY(1.15) - 40, zoom: 1.15 }],
  [111.45, { x: 560, y: h4GY(1.1), zoom: 1.1 }], [112.6, { x: 560, y: h4GY(1.1), zoom: 1.1 }], [114.0, { x: 1060, y: 520, zoom: 1.0 }], [132.4, { x: 1060, y: 520, zoom: 1.0 }]];
function h4CCam(t) { const c = h4Cam(H4_CCAM, t, EH_LC.w, -600, 1330); if (t >= 114) { c.x += 6 * Math.sin(t * 0.4); c.y += 4 * Math.sin(t * 0.31); } return c; }
const H4_DUSK = (t) => (t < 110.28 ? 0 : K.clamp((t - 110.28) / 2.42));
// ---------- the horse on the cart ----------
const H4_CCART = H4_F([[46.6, 60], [46.82, 120], [47.5, 800]]);
function h4CCartX(t) { return t < 57 ? H4_CCART(t) : 800; }
function h4CHorse(t) { const x = h4CCartX(t), H = { x, y: 842, s: H4_HS, dir: 1 };
  if (t >= 51.44 && t < 54.4) H.reveal = ehE(t, 51.44, 0.3) * (1 - ehE(t, 54.1, 0.3));
  if (t >= 101.42 && t < 103.2) H.reveal = 1 - ehE(t, 102.6, 0.5);
  if (t >= 128.5 && t < 129.1) H.lit = { neck: 0.3 * pulse(t, 128.55, 0.2) + 0.3 * pulse(t, 128.85, 0.2) };
  return H; }
// ---------- the inventor at the grille (outside the gate) ----------
function h4CInvFace(t) { const tc = EH_T2(t); let on = 0, x = 240, dy = 0;
  if (t >= 47.9 && t < 56.3) { on = 1; dy = 60 * (1 - ehE(tc, 47.9, 0.25)); if (t >= 55.68) dy = 130 * ehE(tc, 55.68, 0.3, 'in'); }
  if (t >= 98.5 && t < 112.0) { on = 1; dy = 60 * (1 - ehE(tc, 98.5, 0.3)); }
  if (!on) return null;
  const P = { x: x + 6 * Math.sin(tc * 1.3), y: 860 + dy, s: EH_INVENTOR.s, dir: 1, lid: 0.3 + 0.7 * ehLid(t, 7) * 0.5, brow: 0.5, mouth: 'closed', gaze: [1, 0.2], handL: [-20, -100], handR: [20, -100], tip: idleSway(tc, 7, 0.03, 2.4) };
  if (t >= 51.44 && t < 55.08) { P.gaze = [1, 0.4]; P.lid = 0.15; P.eyes = 'wide'; }
  if (t >= 55.08) { P.eyes = 'wide'; P.lid = 0; P.mouth = 'o'; }
  if (t >= 104.6 && t < 111.52) { P.lid = 0.55; P.brow = 0.8; P.gaze = [1, 0.3]; }
  if (t >= 111.52) { P.x += 10 * Math.sin((tc - 111.52) * 18); P.mouth = 'open'; P.brow = 0.6; P.lid = 0.2; }
  return P; }
function h4CGate(t) { const g = { open: 0, bar: 1, lock: 1, shutter: 0, barBounce: 0, lockSwing: 0, dusk: H4_DUSK(t) > 0.5 };
  if (t < 57) { g.open = 1 - ehE(t, 47.3, 0.2); g.bar = t < 47.5 ? 0 : ehE(t, 47.5, 0.12, 'in'); g.barBounce = rebound(t, 47.62, 10, 0.14); g.lock = t >= 47.72 ? 1 : 0; g.lockSwing = swing(t, 47.72, 0.4, 2.5); }
  else if (t < 99) { g.bar = 1 - ehE(t, 94.6, 0.15); g.open = ehE(t, 94.76, 0.35) * (1 - ehE(t, 98.5, 0.25)); g.bar = t < 98.75 ? g.bar : ehE(t, 98.75, 0.12, 'in'); g.lock = t >= 98.9 ? 1 : 0; }
  if (t >= 111.52) g.shutter = ehE(t, 111.6, 0.3);
  return g; }
// ---------- the princess (S6) ----------
const H4_CPRX = H4_F([[46.6, -60], [47.7, 900], [48.0, 930], [50.78, 930], [51.3, 960], [52.68, 960], [53.0, 940], [57, 940]]);
function h4CPrincess(t) { if (t >= 57 || t < 46.6) return null; const tc = EH_T2(t), sd = 11, H = h4CHorse(t);
  const P = { ...walk(H4_CPRX, tc, { stride: 22 }), y: 912, s: EH_PRINCESS.s, dir: 1, lid: ehLid(t, sd, [48.26, 55.68]), mouth: 'closed', brow: -0.1, gaze: [1, 0.1], handL: [14, -96], handR: [30, -98], sq: breathe(tc, sd, 0.016), tip: idleSway(tc, sd, 0.02, 3.1) };
  const look = (w) => lookAt(ehHeadOf(P), w);
  if (t >= 48.26 && t < 50.78) { P.gaze = look([1060, 700]); const u = ehE(tc, 48.26, 0.25); P.handR = [K.lerp(30, 50, u), K.lerp(-98, -214, u)]; if (t >= 49.2) P.handR = [30, -98]; P.talk = ehTalk(t, 48.26, 50.7, 3, 0.6); }
  if (t >= 50.22 && t < 50.78) { P.handR = [36, -214 + 8 * Math.abs(Math.sin((tc - 50.22) * Math.PI / 0.14))]; P.talk = 0; }
  if (t >= 50.78 && t < 52.68) { P.dir = 1; P.gaze = look(ehHorsePt(H, EH_EBG.lever)); if (t >= 51.2) P.handRW = ehHorsePt(H, [EH_EBG.lever[0] - 4, EH_EBG.lever[1] + 14]); P.talk = ehTalk(t, 51.44, 52.6, 5, 0.5); }
  if (t >= 52.68) { P.handL = [-30, -96]; P.handR = [-26, -94]; P.gaze = look([1060, 700]); P.tip = -0.02; }
  if (t >= 53.7 && t < 54.5) { P.gaze = [osc(tc - 53.7, 0.4), 0.1]; P.dir = osc(tc - 53.7, 0.4) > 0 ? 1 : 0.6; }
  if (t >= 55.08) { P.handL = [-110, -150]; P.gaze = look([1060, 700]); P.dir = 1; }
  return P; }
// ---------- the captain ----------
const H4_CCAPX = H4_F([[46.6, -150], [48.0, 1060], [57, 1060], [94.0, 380], [111.2, 380], [111.4, 300], [112.0, 300], [113.4, 1040], [140, 1040]]);
function h4CCaptain(t) { const tc = EH_T2(t), sd = 17; if (t < 46.6) return null;
  const P = { ...walk(H4_CCAPX, tc, { stride: 26 }), y: 898, s: EH_CAPTAIN.s, dir: -1, lid: ehLid(t, sd), sq: breathe(tc, sd, 0.012), tip: idleSway(tc, sd, 0.02, 3.4), mouth: 'closed', brow: 0.3, gaze: [-1, 0.1], handL: [-26, -100], handR: [40, -110] }, o = { helmet: {}, neck: true, spear: { lean: 0.03 } };
  if (P.amp > 0.2) P.dir = Math.sign(speed(H4_CCAPX, t)) || -1;
  if (t < 57) { if (t >= 48.26) { P.dir = -1; P.gaze = lookAt(ehHeadOf(P), [930, 700]); }
    if (t >= 49.2 && t < 50.0) { P.handL = [-10, -80 + 6 * Math.abs(Math.sin(tc * 20))]; P.mouth = 'smile'; }
    if (t >= 52.2 && t < 53.0) P.sq *= 1 + 0.02 * Math.sin(tc * 20);
    if (t >= 55.68) { P.gaze = [-1, 0.1]; P.dir = -1; } }
  else if (t < 111.2) { P.dir = 1; P.gaze = lookAt(ehHeadOf(P), t < 98 ? [520, 700] : [900, 700]); }
  else if (t < 112.0) { P.dir = -1; o.spear = { lean: 0.03, hand: [-26, -100] }; P.handRW = [K.lerp(330, 200, ehE(tc, 111.6, 0.3)), 650]; }
  else if (t < 113.4) { P.dir = 1; }
  else { P.dir = -1; P.x = 1040; P.y = 856; P.sit = 1; P.seat = 'bench'; P.amp = 0; o.spear = { lean: -0.5, hand: [40, -110] }; P.gaze = [-0.6, 0.4]; P.lid = Math.max(0.3, P.lid);
    if (t >= 120.1 && t < 121.2) { P.gaze = [0.3, -1]; P.handL = [-60, -150 - 20 * pulse(tc, 120.6, 0.5)]; P.tip = -0.04; } }
  return [P, o]; }
// key ring on the captain's belt (49.2 -)
function h4KeyRing(ctx, P, t) { const s = P.s || 1, [x, y] = ehHandW(P, [-28, -76]); ctx.save(); ctx.strokeStyle = '#e0b038'; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.arc(x, y + 14 * s, 12 * s, 0, 7); ctx.stroke();
  for (let i = 0; i < 3; i++) { const a = Math.PI / 2 + (i - 1) * 0.4 + 0.15 * Math.sin(t * 3 + i); seg(ctx, x + Math.cos(a) * 12 * s, y + 14 * s + Math.sin(a) * 12 * s, x + Math.cos(a) * 34 * s, y + 14 * s + Math.sin(a) * 34 * s, 3 * s, '#e0b038', 0.8); } ctx.restore(); }
// ---------- the guards ----------
// S6: C and D push the cart in, then stand at 1110 and 1010; S12-S13: the ring (A 700, B 1000, C 1120, D 620); S14-S16: D dozes at 620, C yawns at 1120
function h4CGuardX(i) {
  if (i === 2) return H4_F([[46.6, -240], [47.5, 590], [47.9, 1110], [57, 1110], [95, 1120], [140, 1120]]);
  if (i === 3) return H4_F([[46.6, -300], [47.5, 520], [47.9, 1010], [57, 1010], [95, 620], [140, 620]]);
  if (i === 0) return H4_F([[96.9, -120], [98.06, 700], [112.0, 700], [112.9, -160]]);
  return H4_F([[97.1, -100], [98.3, 1000], [112.0, 1000], [113.0, -100]]); }
const H4_CGX = [0, 1, 2, 3].map(h4CGuardX);
function h4CGuard(t, i) { const tc = EH_T2(t), sd = 61 + i * 5, D = EH_FARGUARDS[i];
  if (t < 57 && i < 2) return null; if (t >= 57 && t < 96.9 && i < 2) return null; if (i < 2 && t > 113.0) return null;
  const P = { ...walk(H4_CGX[i], tc, { stride: 24 }), y: 890 + (i % 2) * 6, s: D.s, dir: -1, lid: ehLid(t, sd), sq: breathe(tc, sd, 0.012), tip: idleSway(tc, sd, 0.022, 2.8 + i * 0.3), mouth: 'closed', gaze: [-1, 0.1], handL: [-26, -100], handR: [40, -110] }, o = { helmet: { tilt: 0 }, neck: true, spear: { lean: 0.03 * Math.sin(tc + i) } };
  const look = (w) => lookAt(ehHeadOf(P), w), sp = speed(H4_CGX[i], t); if (Math.abs(sp) > 20) P.dir = Math.sign(sp);
  if (t < 57) { if (t < 47.9) { P.dir = 1; P.handL = [60, -110]; P.handR = [70, -120]; P.tip = 0.12; o.spear = null; P.mouth = 'grit'; }
    else { P.gaze = look(t < 51 ? [930, 700] : [990, 600]); P.dir = -1;
      if (t >= 52.2 && t < 53.0) { const u = ehE(tc, 52.2, 0.18) * (1 - ehE(tc, 52.6, 0.3)); P.tip = (i === 2 ? 0.2 : 0.16) * u; if (t > 52.38 && t < 52.7) o.helmet.tilt = (i === 2 ? 0.25 : -0.25) * Math.sin((tc - 52.38) * 20); P.eyes = t > 52.38 ? 'wide' : 'open'; }
      if (t >= 55.68) { P.gaze = [-1, 0]; P.dir = -1; } } }
  else if (t < 112.77) { const C = h4CCraft(t); P.gaze = C ? look(ehHeadOf(C)) : [-1, 0.1]; P.dir = C && C.x > P.x ? 1 : -1;
    if (C && t >= 99.32 && t < 100.2) { const ty = 99.32 + Math.floor((t - 99.32) / 0.22) * 0.22 + stagger(i, 0.08); P.gaze = look([K.lerp(700, 940, (ty - 99.32) / 0.9), 690]); P.tip = 0.06 * P.dir; }
    if (i === 1 && t >= 98.06) { o.helmet = null; P.handL = [-34, -150]; }
    if (t >= 98.06 && t < 99.32) { o.spear = { lean: 0.35 * (C && C.x > P.x ? 1 : -1) * ehE(tc, 98.06 + stagger(i, 0.1), 0.3) }; }
    if (i === 1 && t >= 108.7 && t < 109.3) { o.helmet = { tilt: 0.3 * Math.sin((tc - 108.75) * 16) * Math.exp(-(tc - 108.75) * 4) }; P.eyes = 'wide'; } }
  else { P.dir = i === 3 ? 1 : -1;
    if (i === 3) { const nod = flow(tc, [[112.77, 0], [115.2, 0.15], [115.44, 0.3], [115.56, 0], [117, 0.1], [121, 0.22], [128, 0.18], [131.22, 0.25], [131.4, 0]]); P.drop = 18 * nod; P.tip = 0.08 * nod; P.lid = K.clamp(0.4 + nod * 3); o.spear = { lean: -0.25, hand: [26, -110] }; P.handL = [20, -112];
      if (t >= 130.2 && t < 130.74) { P.dir = 1; P.lid = 0.55; P.gaze = [1, -0.2]; P.drop = 4; }   // the half turn: both of them freeze
      if (t >= 131.22) { P.lid = 0; P.eyes = 'wide'; P.dir = 1; P.gaze = [1, -0.4]; } }
    if (i === 2) { P.gaze = [-0.6, 0.3]; if (t >= 115.44 && t < 116.8) { P.handL = PERSON_HANDS.mouthCover.R; P.mouth = 'o'; P.lid = 0.6; P.tip = -0.05; }
      if (t >= 126.72 && t < 128.4) { P.gaze = [0.5, -1]; P.tip = -0.05; P.lid = 0; } if (t >= 128.4) P.gaze = [-0.6, 0.4]; } }
  return [P, o, D]; }
// ---------- the king (S12-S13) ----------
const H4_CKX = H4_F([[94.76, 250], [95.7, 250], [96.5, 440], [99.0, 440], [100.0, 620], [112.0, 620], [112.8, 120]]);
function h4CKing(t) { if (t < 94.76 || t >= 112.8) return null; const tc = EH_T2(t), sd = 13;
  const P = { ...walk(H4_CKX, tc, { stride: 24 }), y: 900, s: EH_FARKING.s, dir: -1, lid: ehLid(t, sd, [95.7, 107.78]), mouth: 'closed', brow: 0.2, gaze: [-1, 0.1], handL: [-26, -96], handR: [26, -96], sq: breathe(tc, sd, 0.016), tip: idleSway(tc, sd, 0.025, 3.3) };
  const C = h4CCraft(t), look = (w) => lookAt(ehHeadOf(P), w), sp = speed(H4_CKX, t); if (Math.abs(sp) > 20) P.dir = Math.sign(sp);
  if (t < 95.7) { P.dir = -1; P.gaze = gazePlan(tc, [[94.76, [-1, 0.5]], [95.1, [-1, -0.3]], [95.4, [-1, 0.4]]], 0.12); }
  else if (t < 96.5) { P.handR = [60 + 14 * Math.sin(tc * 16), -160]; P.gaze = [-1, 0.1]; }
  else { if (Math.abs(sp) < 20) P.dir = 1; if (C) P.gaze = look(ehHeadOf(C)); }
  if (t >= 104.24 && t < 107.78) P.mouth = 'smile';
  if (t >= 107.78 && t < 108.7) { const r = Math.sin(tc * 18); P.handL = [10 + 6 * r, -120]; P.handR = [24 - 6 * r, -118]; P.mouth = 'smile'; P.eyes = 'wide'; }
  if (t >= 111.04 && t < 112.0) { P.handR = PERSON_HANDS.chin.R; P.tip = 0.05 * Math.max(0, Math.sin((tc - 111.04) * Math.PI / 0.3)); P.mouth = 'smile'; }
  return P; }
// ---------- the craftsman (S12 - S16) ----------
const H4_CRX = H4_F([[96.56, 120], [98.3, 860], [99.32, 860], [99.5, 760], [100.2, 760], [100.5, 900], [102.38, 900], [102.6, 860], [105.16, 860], [106.38, 860], [106.6, 760], [107.1, 760], [107.4, 860], [116.06, 860], [116.4, 870], [128.0, 870], [128.42, 790], [129.4, 790], [129.8, 870], [140, 870]]);
function h4CCraft(t) { if (t < 96.4) return null; const tc = EH_T2(t), sd = 3, H = h4CHorse(t);
  const P = { ...walk(H4_CRX, tc, { stride: 20 }), y: 918, s: EH_CRAFT.s, dir: 1, lid: Math.max(0.3, ehLid(t, sd, [97.32, 125.68])), mouth: 'closed', brow: 0.3, gaze: [1, 0.1], handL: [-30, -100], handR: [30, -100], sq: breathe(tc, sd, 0.014), tip: 0.07 + idleSway(tc, sd, 0.02, 2.6) };
  const look = (w) => lookAt(ehHeadOf(P), w), sp = speed(H4_CRX, t); if (Math.abs(sp) > 20) P.dir = Math.sign(sp);
  P.o = { box: { open: 0 }, corner: 1 };
  if (t < 97.32) P.gaze = look(ehHorsePt(H, [100, -250]));
  if (t >= 97.32 && t < 97.95) { P.lid = 0; P.tip = 0; P.mouth = 'smile'; P.brow = -0.2; P.handR = [K.lerp(30, 110, ehE(tc, 97.32, 0.3)), -160]; P.gaze = look(ehHorsePt(H, EH_EBG.eye)); }
  if (t >= 97.95 && t < 98.4) { P.handR = [10, -170]; P.lid = 0.4; P.tip = 0.1; P.mouth = 'o'; }
  if (t >= 98.4 && t < 99.32) P.gaze = look([700, 690]);
  if (t >= 99.32) P.o.box = null;
  if (t >= 99.32 && t < 100.2) { const tap = Math.abs(Math.sin((tc - 99.32) * Math.PI / 0.22)); P.o.tool = 'hammer'; P.handRW = [K.lerp(700, 900, (t - 99.32) / 0.9), 760 + 10 * tap]; P.tip = 0.14; P.gaze = [1, 0.6]; P.dir = 1; }
  if (t >= 100.2 && t < 102.38) { P.o.tool = 'glass'; P.handRW = ehHorsePt(H, [EH_EBG.knob[0] - 20, EH_EBG.knob[1] + 20]); P.gaze = look(ehHorsePt(H, EH_EBG.knob)); P.tip = 0.08; }
  if (t >= 102.38 && t < 105.16) { P.dir = -1; P.gaze = look([620, 690]); P.mouth = t < 103.0 ? 'smile' : 'closed'; P.tip = 0.05 + 0.06 * pulse(tc, 102.7, 0.4); P.handL = [10, -150]; if (t >= 104.24) { P.talk = ehTalk(t, 104.24, 105.1, 7, 0.7); P.handR = [70, -150]; } }
  if (t >= 105.16 && t < 106.38) { P.dir = -1; P.o.box = { open: 1 - ehE(tc, 105.6, 0.3), ground: true }; P.handR = [60, -60]; P.tip = 0.2; }
  if (t >= 106.38 && t < 112.77) { P.dir = -1; P.gaze = look([620, 690]); P.o.box = { open: 0, ground: true };
    if (t < 107.1) { P.handLW = ehHorsePt(H, [-60, -200]); P.sq *= 1 - 0.05 * pulse(tc, 106.5, 0.4); }
    if (t >= 107.1 && t < 108.7) { P.handR = [60, -150]; P.handR = [60 + 8 * Math.sin(tc * 12), -150]; P.talk = ehTalk(t, 107.1, 108.6, 7, 0.6); }
    if (t >= 108.7 && t < 109.36) { P.handL = [-110, -150]; P.handR = [110, -150]; P.talk = ehTalk(t, 108.8, 109.3, 7, 0.7); P.tip = 0; }
    if (t >= 109.36 && t < 110.28) { P.handR = [60, -220]; P.gaze = [-0.6, -1]; P.talk = ehTalk(t, 109.36, 110.2, 7, 0.7); }
    if (t >= 110.28 && t < 111.04) { const a = Math.PI * ehE(tc, 110.6, 0.4); P.handR = t < 110.6 ? [80, -230] : [Math.cos(Math.PI - a) * 90, -200 - Math.sin(a) * 50]; P.gaze = [0.4, -1]; P.dir = 1; } }
  if (t >= 112.77) { P.dir = 1; P.o.box = { open: 0, ground: true }; P.gaze = look(ehHorsePt(H, EH_EBG.knob)); P.tip = 0.1;
    if (t < 116.06) { P.o.tool = 'oil'; P.handRW = ehHorsePt(H, [EH_EBG.knob[0] - 36, EH_EBG.knob[1] + 34]); }
    if (t >= 116.06 && t < 116.72) { P.o.tool = 'oil'; P.handR = [60, -110]; P.handLW = ehHorsePt(H, [EH_EBG.knob[0] - 10, EH_EBG.knob[1] + 6 * Math.sin(tc * 20)]); }
    if (t >= 116.72 && t < 120.44) { P.tip = -0.06; P.gaze = look(EH_LC.moon); P.lid = 0.1; P.o.tool = 'oil'; P.handR = [40, -110]; P.handL = [-50, -150]; P.mouth = 'smile'; P.talk = ehTalk(t, 117.36, 119.85, 7, 0.6); }
    if (t >= 124.5 && t < 125.68) { P.handR = [30, -100]; P.handL = [-20, -100]; P.gaze = look(ehHorsePt(H, EH_EBG.knob)); P.o.tool = 'oil'; }
    if (t >= 125.68 && t < 126.9) { P.tip = -0.07; P.lid = 0; P.brow = -0.2; P.gaze = look([1300, 470]); P.handR = [30, -222]; P.mouth = 'smile'; }
    if (t >= 126.9 && t < 128.5) { P.o.tool = 'oil'; P.handR = [40, -110]; P.handLW = ehHorsePt(H, [60 + 30 * Math.sin(tc * 6), -190]); }
    if (t >= 128.5 && t < 129.3) { P.o.tool = null; const tap = 1 - pulse(tc, 128.52, 0.16) - pulse(tc, 128.87, 0.16); P.handRW = ehHorsePt(H, [EH_EBG.knob[0] - 4, EH_EBG.knob[1] - 4 - 14 * (1 - tap)]); P.gaze = look(ehHorsePt(H, EH_EBG.knob)); P.tip = 0.12; }
    if (t >= 129.3 && t < 130.4) { P.handR = [24, -228]; P.gaze = look([1300, 470]); P.lid = 0.15; }
    if (t >= 130.4 && t < 131.22) { P.gaze = look([1300, 470]); P.mouth = 'smile'; }
    if (t >= 131.22) { P.o.tool = 'oil'; P.handR = [40, -110]; P.handL = [-20, -100 + 8 * Math.sin(tc * 14)]; P.mouth = 'o'; P.gaze = [1, 0.5]; } }
  return P; }
// ---------- the princess behind the lattice (S14 - S16, wide) ----------
function h4CBust(t) { if (t < 112.9) return null; const tc = EH_T2(t), B = { x: 1297, y: 625 + 60 * (1 - ehE(tc, 113.56, 0.5)), lid: ehLid(t, 11, [119.88]), mouth: 'closed', gaze: [-0.4, 0.8], handL: [20, -110], handR: [30, -112], tilt: 0, dir: -1 };
  if (t >= 114.66 && t < 116.72) { B.tilt = 0.35; B.x = 1310; B.gaze = [-1, 0.2]; B.lid = 0.3; }
  if (t >= 116.72 && t < 119.88) B.gaze = [-0.5, 0.9];
  if (t >= 119.88 && t < 124.5) { B.eyes = 'wide'; B.y -= 10; B.gaze = [-0.4, 0.8]; }
  if (t >= 126.22 && t < 126.72) { B.handR = PERSON_HANDS.chest.R; B.mouth = 'smile'; }
  if (t >= 126.72 && t < 127.3) { B.wet = true; B.mouth = 'smile'; B.handR = [30, -200]; }
  if (t >= 127.3 && t < 128.4) B.y += 70 * ehE(tc, 127.0, 0.3) * (1 - ehE(tc, 128.0, 0.4));
  return B; }
// ---------- the world ----------
function h4CourtWorld(ctx, t, cam) {
  const tc = EH_T2(t), dk = H4_DUSK(t), H = h4CHorse(t), g = h4CGate(t), lit = [0, 1, 2].map((i) => ehE(t, 112.3 + i * 0.2, 0.15));
  lockedCourt(ctx, t, cam, { dusk: dk, lit, moonRise: ehE(t, 110.28, 3), sun: t >= 105.16 && t < 112.7 ? [1250, K.lerp(330, 470, ehE(t, 109.5, 3.2))] : null });
  // the lattice bay (glow from 112.3), the dove on its cap (127.75)
  const rib = t >= 129.74 && t < 131.22 ? ehE(tc, 129.74, 0.25) : t >= 131.22 && t < 131.6 ? 1 - ehE(tc, 131.22, 0.3) : 0;
  h4Bay(ctx, t, tc, h4Sil(t), rib, ehE(t, 112.3, 0.5));   // review 1 note 1: silhouette, one listening window, dim openings
  if (t >= 127.5) { const u = ehE(tc, 127.5, 0.4), x = K.lerp(1700, 1420, u), y = K.lerp(150, 268, u); bird(ctx, { kind: 'dove', x, y, s: 0.3, dir: -1, fly: u < 1, flap: u < 1 ? Math.sin(tc * 19) : 0, pal: 0 }); }
  if (t < 57) bird(ctx, { kind: 'dove', x: 640, y: 338, s: 0.28, dir: 1, flap: 0, pal: 0, peck: Math.max(0, Math.sin(tc * 2)) });
  // the moon path on the rill (118.62 -)
  if (t >= 112.77) { const [r0, r1, ry] = EH_LC.rill; moonPath(ctx, [[r1, ry], [r0, ry]], t, ehE(t, 118.62, 1.3), { w: 3, w1: 10, scatter: 160, a: 0.4 + 0.6 * ehE(t, 112.77, 1) }); }
  // the gate and the face behind its grille
  const inv = h4CInvFace(t); gateBar(ctx, t, { ...g, outside: inv ? (c) => { ehInvTail(c, inv, tc, { torn: true }); person(c, ehDressP(EH_INVENTOR, inv)); } : null });
  if (t >= 47.6 && t < 48.2) h4Click(ctx, 240, 740, t);
  const items = [];
  items.push([880, () => { const cx = H.x; platformCart(ctx, cx, 900, { dir: 1, wheel: (cx - 800) / 24, sag: 6 }); h4Shadow(ctx, H.x, 845, 240 * H.s); ebonyHorse(ctx, H); ehRosettes(ctx, H, { missing: 3, t: tc });
    if (t >= 46.82 && t < 47.5) for (let k = 0; k < 2; k++) { const u = ((t - 46.82) * 1.6 + k * 0.5) % 1; ehGlint(ctx, H.x - 100 + 200 * u, H.y - 200 + 40 * k, 18, u); } }]);
  const pr = h4CPrincess(t); if (pr) items.push([pr.y, () => h4Fig(ctx, EH_PRINCESS, pr, t, { veil: true, vx: pr.amp > 0.2 ? 200 : 0 })]);
  const cap = h4CCaptain(t); if (cap) items.push([cap[0].y, () => { h4Fig(ctx, EH_CAPTAIN, cap[0], t, cap[1]); if (t >= 49.2) h4KeyRing(ctx, cap[0], tc); }]);
  for (let i = 0; i < 4; i++) { const gd = h4CGuard(t, i); if (gd) items.push([gd[0].y, () => h4Fig(ctx, gd[2], gd[0], t, gd[1])]); }
  const kg = h4CKing(t); if (kg) items.push([kg.y + 2, () => h4Fig(ctx, EH_FARKING, kg, t)]);
  const CR = h4CCraft(t); if (CR) items.push([CR.y, () => { const o = CR.o; if (o.box && o.box.ground) toolbox(ctx, 760, 930, { s: 0.95, open: o.box.open, crown: 0 }); ehCraftsman(ctx, h4W(CR), t, { ...o, box: o.box && !o.box.ground ? o.box : null, toolRot: o.tool === 'hammer' ? -0.6 : 0 }); h4BigCorner(ctx, CR, o.corner ?? 1); }]);
  items.sort((a, b) => a[0] - b[0]); for (const [, f] of items) f();
  // the light band that stops on the crimson corner (125.0)
  if (CR && t >= 125.0 && t < 126.2) { const [x, y] = ehHandW(CR, [-20, -86]); ehBand(ctx, [x - 160, y - 200, 320, 400], K.clamp((t - 125.0) / 1.2) * 0.5 + 0.02, { w: 60, alpha: 0.7, col: '#fff2c0' }); ehGlint(ctx, x, y, 24, (t - 125.3) / 0.6); }
  // ticks beside the knob and the lever (103.4 - 105.2)
  if (t >= 103.4 && t < 105.4) { const a = ehHorsePt(H, EH_EBG.knob), b = ehHorsePt(H, EH_EBG.lever); ctx.save(); ctx.globalAlpha *= K.clamp((105.4 - t) / 0.3); ehTick(ctx, a[0] + 50, a[1] - 10, (t - 103.4) / 0.25, 1.2); ehTick(ctx, b[0] + 50, b[1] - 20, (t - 103.7) / 0.25, 1.2); ctx.restore(); }
}
function h4Click(ctx, x, y, t) { const u = (t - 47.6) / 0.5; if (u > 0 && u < 1) { ctx.save(); ctx.globalAlpha = 1 - u; ctx.strokeStyle = '#fff6c8'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(x, y, 30 + 160 * u, 0, 7); ctx.stroke(); ctx.restore(); } }
function h4CourtOver(ctx, t, cam, S) {
  const H = h4CHorse(t), pr = h4CPrincess(t), C = h4CCraft(t), kg = h4CKing(t);
  h4Word(ctx, S, 'CLANK!', 300, 300, t, 47.6, 48.6, { size: 74, glow: '#ff7ad9' });
  // the lever callout (51.44 - 55.0): the first mane block and the lever, large
  if (t >= 51.44 && t < 55.0) { const p = ehE(EH_T2(t), 51.44, 0.25) * (1 - ehE(EH_T2(t), 54.1, 0.3)), cx = 230, cy = 270;
    ehCallout(ctx, cx, cy, 150, p, (c) => { ehGrad(c, cx - 160, cy - 160, 320, 320, [[0, '#a8c8f0'], [1, '#ffe0a8']]); const s = 3, Hc = { x: cx - EH_EBG.lever[0] * s, y: cy - EH_EBG.lever[1] * s + 40, s, dir: 1, close: true, reveal: H.reveal || 0 };
      ebonyHorse(c, Hc); handInsert(c, cx - 70, cy + 70, { s: 0.45, point: 1, rot: -0.6, sleeve: '#6fded6', cuff: '#f2c040' }); if (t > 51.6) ehGlint(c, cx + 10, cy - 10, 40, ((t - 51.6) / 0.6) % 1); });
    if (t >= 51.98 && t < 54.4) { ctx.save(); ctx.globalAlpha *= K.clamp((54.4 - t) / 0.3); S.label(ctx, 'DOWN', 470, 200, K.clamp((t - 51.98) / 0.3), { size: 46 }); S.arrow(ctx, [430, 220], [300, 270], K.clamp((t - 52.0) / 0.4), { width: 8, bend: 0.2 }); ctx.restore(); } }
  if (pr) { const ph = h4Head(pr, cam); h4Say(ctx, S, [[48.26, 'LISTEN.']], t, ph, { gone: 49.4, size: 44, up: 170, dx: 60 });
    h4Say(ctx, S, [[52.68, 'NOT WHILE\nHE IS NEAR.']], t, ph, { gone: 55.0, size: 42, up: 170, dx: 80 }); }
  if (t >= 98.1 && t < 99.6) { const [x, y] = h4P(860, 560, cam); ehTag(ctx, S, 'UNDER GUARD!', x, Math.max(130, y - 120), t, 98.1, 99.6, { size: 46 }); }
  if (C) { const ch = h4Head(C, cam);
    h4Say(ctx, S, [[104.24, 'BOTH WORK!']], t, ch, { gone: 105.6, size: 46, up: 330, dx: -120 });
    if (t >= 107.1 && t < 108.7) iconBalloon(ctx, Math.min(760, ch[0] + 140), Math.max(220, ch[1] - 260), 300, 210, K.clamp((t - 107.1) / 0.3) * K.clamp((108.7 - t) / 0.2), [ch[0] + 20, ch[1] - 60], (c, w, h) => {
      ehGrad(c, 0, 0, w, h, [[0, '#a8d0f8'], [1, '#ffe8c0']]); c.fillStyle = '#c8b890'; c.fillRect(0, h - 40, w, 40); h4Shadow(c, w / 2, h - 30, 90, 30); ehHorseSil(c, w / 2 - 20, h - 50 - 8 * Math.sin(t * 6), 0.42, {});
      for (const sx of [-1, 1]) { c.save(); c.strokeStyle = '#e8264f'; c.lineWidth = 5; c.beginPath(); c.moveTo(w / 2 + sx * 90, h - 30); c.lineTo(w / 2 + sx * 90, h - 80); c.lineTo(w / 2 + sx * 90 - 10, h - 68); c.moveTo(w / 2 + sx * 90, h - 80); c.lineTo(w / 2 + sx * 90 + 10, h - 68); c.stroke(); c.restore(); } });
    h4Say(ctx, S, [[108.8, 'TOMORROW,\nIN THE OPEN SQUARE.']], t, ch, { gone: 110.9, size: 42, up: 200, dx: 0 });
    h4Say(ctx, S, [[117.36, "THE MOON KNOWS\nTHE RIVER'S PATH"]], t, ch, { gone: 120.44, size: 42, up: 220, dx: -60 });
    if (t >= 130.78 && t < 131.58) { const [x, y] = h4P(1080, 300, cam); iconBalloon(ctx, x, y, 280, 200, K.clamp((t - 130.78) / 0.25) * K.clamp((131.58 - t) / 0.12), [ch[0] + 30, ch[1] - 60], (c, w, h) => {
      ehGrad(c, 0, 0, w, h, [[0, '#8ab8f0'], [1, '#ffd6a0']]); ehGlow(c, w / 2, h - 30, 120, 0.8, '#ffd890'); celShade(c, ell(w / 2, h - 20, 46, 46, 24), '#fff2b8', '#ffc060', { off: 6, lw: 2, line: '#ff8a4a' }); ehHorseSil(c, w / 2 - 10, h - 40, 0.32, { riders: 2, rear: 'firuz', rot: -0.25 }); }); } }
  // review 1 note 1: name her once
  if (t >= 115.44 && t < 117.0) { const [wx, wy] = h4P(1320, 380, cam), p = K.clamp((t - 115.44) / 0.3); ctx.save(); ctx.globalAlpha *= K.clamp((117.0 - t) / 0.25);
    S.label(ctx, 'THE PRINCESS', wx - 60, wy - 230, p, { size: 40 }); S.arrow(ctx, [wx - 40, wy - 200], [wx - 4, wy - 26], K.clamp((t - 115.6) / 0.35), { width: 7, bend: -0.2 }); ctx.restore(); }
  // review 1 note 3: the signal. TAP TAP on the knob (128.5 - 129.6), then the ribbon through the window (129.7 - 130.7)
  if (t >= 128.5 && t < 129.75) { const tc = EH_T2(t), p = ehE(tc, 128.5, 0.2) * (1 - ehE(tc, 129.45, 0.25)), cx = 230, cy = 290, s = 3;
    ehCallout(ctx, cx, cy, 150, p, (c) => { ehGrad(c, cx - 160, cy - 160, 320, 320, [[0, '#9a88d8'], [1, '#ffc8a0']]); const Hc = { x: cx - EH_EBG.knob[0] * s - 10, y: cy - EH_EBG.knob[1] * s + 30, s, dir: 1, close: true, lit: { neck: 0.35 * (pulse(tc, 128.6, 0.2) + pulse(tc, 128.95, 0.2)) } };
      ebonyHorse(c, Hc); const k = ehHorsePt(Hc, EH_EBG.knob), up = 1 - pulse(tc, 128.52, 0.16) - pulse(tc, 128.87, 0.16);
      handInsert(c, k[0] - 70, k[1] + 30 - 40 * (1 - up), { s: 0.5, point: 1, rot: -0.5, sleeve: '#c89a6a', cuff: '#f6efe0' });
      h4Ring(c, k[0], k[1], tc, 128.6, 20, 110); h4Ring(c, k[0], k[1], tc, 128.95, 20, 110); });
    if (t >= 128.6) { ctx.save(); ctx.globalAlpha *= K.clamp((129.75 - t) / 0.25); S.label(ctx, t < 128.95 ? 'TAP' : 'TAP TAP', 470, 175, K.clamp((t - 128.6) / 0.15), { size: 46 }); ctx.restore(); } }
  if (t >= 129.7 && t < 130.85) { const tc = EH_T2(t), p = ehE(tc, 129.7, 0.2) * (1 - ehE(tc, 130.6, 0.25)), [wx, wy] = h4P(1320, 430, cam), cx = 300, cy = 330, z = 2.6;
    ctx.save(); ctx.globalAlpha *= p; ctx.setLineDash([10, 10]); ctx.strokeStyle = '#fff6ea'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(wx - 50, wy); ctx.lineTo(cx + 140, cy + 30); ctx.stroke(); ctx.restore();
    ehCallout(ctx, cx, cy, 145, p, (c) => { c.fillStyle = '#e8c8b8'; c.fillRect(cx - 160, cy - 160, 320, 320); c.save(); c.translate(cx, cy); c.scale(z, z); c.translate(-1320, -440);
      h4Bay(c, t, tc, h4Sil(t), t >= 129.74 ? ehE(tc, 129.74, 0.25) : 0, 1); c.restore(); }); }
  if (kg && t >= 95.7 && t < 96.5) { const kh = h4Head(kg, cam); h4Say(ctx, S, [[95.7, 'COME IN.']], t, kh, { gone: 96.4, size: 40, up: 160, dx: 40 }); }
}
// ===== review 1 (notes 1-3): the princess behind the lattice as a flat silhouette, one listening window with whole eyes =====
const H4_SKIN = '#eeae88', H4_SIL = '#8a3a5e';
// h4Eye(ctx, x, y, w, o): a whole anime eye (centre x, y, width w). o {side 1 | -1 (outer corner), lid 0..1, gaze [x, y] -1..1, pupil scale, wide, shine 0..1, tear 0..1, skin}
function h4Eye(ctx, x, y, w, o = {}) {
  const sd = o.side || 1, h = w * 0.6 * (o.wide ? 1.12 : 1), lid = K.clamp(o.lid || 0), g = o.gaze || [0, 0], ps = o.pupil ?? 1;
  ctx.save(); ctx.translate(x, y); ctx.scale(sd, 1);
  const alm = () => { ctx.beginPath(); ctx.moveTo(-w / 2, h * 0.08); ctx.bezierCurveTo(-w * 0.32, -h * 0.66, w * 0.34, -h * 0.66, w / 2, -h * 0.1); ctx.bezierCurveTo(w * 0.3, h * 0.6, -w * 0.3, h * 0.6, -w / 2, h * 0.08); ctx.closePath(); };
  const ly = K.lerp(-h * 0.86, h * 0.5, lid);   // the control point of the lid edge
  alm(); ctx.fillStyle = '#fffaf4'; ctx.fill();
  ctx.save(); alm(); ctx.clip();
  const ix = g[0] * sd * w * 0.16, iy = h * 0.04 + g[1] * h * 0.14, ir = h * 0.5;
  const gr = ctx.createLinearGradient(0, iy - ir, 0, iy + ir); gr.addColorStop(0, '#2a1440'); gr.addColorStop(0.55, '#6a3aa0'); gr.addColorStop(1, '#c890e0');
  ctx.fillStyle = gr; ctx.beginPath(); ctx.ellipse(ix, iy, ir * 0.8, ir, 0, 0, 7); ctx.fill(); ctx.strokeStyle = '#1a0a24'; ctx.lineWidth = Math.max(1, w * 0.02); ctx.stroke();
  ctx.fillStyle = '#120818'; ctx.beginPath(); ctx.ellipse(ix, iy, ir * 0.34 * ps, ir * 0.48 * ps, 0, 0, 7); ctx.fill();
  ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.ellipse(ix - sd * ir * 0.32, iy - ir * 0.42, ir * 0.26, ir * 0.22, -0.4, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.arc(ix + sd * ir * 0.3, iy + ir * 0.36, ir * 0.11, 0, 7); ctx.fill();
  if (o.shine > 0) { ctx.globalAlpha = K.clamp(o.shine); ctx.beginPath(); ctx.ellipse(ix, iy + ir * 0.62, ir * 0.62, ir * 0.16, 0, 0, 7); ctx.fillStyle = '#e8f4ff'; ctx.fill(); ctx.globalAlpha = 1; }
  // the upper lid (skin above the lid edge) and its shadow
  ctx.fillStyle = o.skin || H4_SKIN; ctx.beginPath(); ctx.moveTo(-w, -h * 2); ctx.lineTo(w, -h * 2); ctx.lineTo(w / 2, -h * 0.1); ctx.quadraticCurveTo(0, ly, -w / 2, h * 0.08); ctx.closePath(); ctx.fill();
  ctx.restore();
  // lashes: thick upper line along the lid edge with the outer flick, thin lower line
  ctx.lineCap = 'round'; ctx.strokeStyle = '#24101e'; ctx.lineWidth = Math.max(1.6, w * 0.075); ctx.beginPath(); ctx.moveTo(-w / 2, h * 0.08); ctx.quadraticCurveTo(0, ly, w / 2, -h * 0.1); ctx.stroke();
  ctx.fillStyle = '#24101e'; ctx.beginPath(); ctx.moveTo(w * 0.42, -h * 0.2 + lid * h * 0.2); ctx.lineTo(w * 0.62, -h * 0.34 + lid * h * 0.3); ctx.lineTo(w * 0.5, -h * 0.02); ctx.closePath(); ctx.fill();
  ctx.lineWidth = Math.max(1, w * 0.025); ctx.beginPath(); ctx.moveTo(w * 0.05, h * 0.4); ctx.quadraticCurveTo(w * 0.3, h * 0.36, w * 0.48, h * 0.02); ctx.stroke();
  if (o.tear > 0) { const k = K.clamp(o.tear), tx = -w * 0.3, ty = h * 0.34 + k * h * 0.1; ctx.fillStyle = 'rgba(200,232,255,0.92)'; ctx.strokeStyle = '#5a8ac8'; ctx.lineWidth = Math.max(1, w * 0.015);
    ctx.beginPath(); ctx.ellipse(tx, ty, w * 0.07 * k + 0.5, w * 0.09 * k + 0.5, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(tx - w * 0.02 * k, ty - w * 0.03 * k, w * 0.02 * k + 0.3, 0, 7); ctx.fill(); }
  ctx.restore();
}
// the bay in the court: window cells (cols 2-3 of row 1) replaced by one arched listening window
const H4_WIN = [1266, 1374, 382, 444];   // x0, x1, y0, y1 (world)
function h4WinPath(c) { const [x0, x1, y0, y1] = H4_WIN, m = (x0 + x1) / 2; c.beginPath(); c.moveTo(x0, y1); c.lineTo(x0, y0 + 22); c.quadraticCurveTo(x0, y0 - 6, m, y0 - 10); c.quadraticCurveTo(x1, y0 - 6, x1, y0 + 22); c.lineTo(x1, y1); c.closePath(); }
// her state behind the bay (world head centre, eyes, lids)
function h4Sil(t) { if (t < 113.56) return null; const tc = EH_T2(t), B = { x: 1320, y: 418 + 120 * (1 - ehE(tc, 113.56, 0.4)) - rebound(tc, 113.9, 6, 0.2), tilt: 0, lid: ehLid(t, 11, [119.88]) * 0.9, gaze: [-0.7, 0.6], wide: false, pupil: 1, tear: 0, fingers: t >= 113.94 && t < 119.88 };
  if (t >= 113.94 && t < 114.66) { B.lid = Math.max(B.lid, 0.25); B.gaze = [-0.2, 0.2]; }
  if (t >= 114.66 && t < 116.06) { B.tilt = 0.14; B.x = 1326; B.gaze = [-1, 0.1]; B.lid = Math.max(B.lid, 0.45); }
  if (t >= 116.06 && t < 119.88) { B.gaze = [-0.8, 0.7]; B.lid = Math.max(B.lid, 0.15); }
  if (t >= 119.88) { B.wide = true; B.lid = t < 120.0 ? 0.6 : 0; B.pupil = 0.7; B.y -= 6; B.gaze = [-0.6, 0.5]; }
  if (t >= 124.5) { B.wide = false; B.pupil = 1; B.lid = ehLid(t, 11) * 0.9; B.gaze = [-0.7, 0.6]; B.tear = ehE(tc, 124.5, 0.4) * (1 - ehE(tc, 128.0, 0.3)); }
  if (t >= 126.72 && t < 127.3) { B.lid = 0.35; B.tilt = -0.08; }
  if (t >= 127.3 && t < 128.4) B.y += 80 * ehE(tc, 127.3, 0.3) * (1 - ehE(tc, 128.0, 0.4));
  if (t >= 129.1 && t < 131.6) { B.gaze = [-0.8, 0.7]; B.lid = Math.min(B.lid, 0.1); }
  return B; }
function h4SilShape(c, B) { const { x, y } = B; c.save(); c.translate(x, y + 60); c.rotate(B.tilt); c.translate(-x, -(y + 60));
  shape(c, [[x - 120, y + 220], [x - 104, y + 110], [x - 60, y + 78], [x - 24, y + 62], [x + 24, y + 62], [x + 60, y + 78], [x + 104, y + 110], [x + 120, y + 220]], H4_SIL, { lw: 3, line: '#4a1830' });
  c.fillStyle = H4_SIL; c.strokeStyle = '#4a1830'; c.lineWidth = 3; c.beginPath(); c.moveTo(x - 54, y + 20); c.quadraticCurveTo(x - 60, y - 84, x, y - 82); c.quadraticCurveTo(x + 60, y - 84, x + 54, y + 20); c.lineTo(x + 78, y + 130); c.lineTo(x - 78, y + 130); c.closePath(); c.fill(); c.stroke();
  c.restore(); }
function h4SilFace(c, B) { const { x, y } = B; c.save(); c.translate(x, y + 60); c.rotate(B.tilt); c.translate(-x, -(y + 60));
  shape(c, ell(x, y + 6, 40, 48, 24), H4_SKIN, { lw: 2.5, line: '#8a4a3a' });
  c.fillStyle = '#fffaf0'; c.strokeStyle = '#8a7aa0'; c.lineWidth = 2; c.beginPath(); c.moveTo(x - 56, y + 20); c.quadraticCurveTo(x - 58, y - 84, x, y - 82); c.quadraticCurveTo(x + 58, y - 84, x + 56, y + 20); c.lineTo(x + 42, y + 12); c.quadraticCurveTo(x + 40, y - 26, x, y - 28); c.quadraticCurveTo(x - 40, y - 26, x - 42, y + 12); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#f2c040'; c.fillRect(x - 40, y - 30, 80, 5);
  for (const sx of [-1, 1]) { const ex = x + sx * 18; c.strokeStyle = '#2a1420'; c.lineWidth = 2.4; c.beginPath(); c.moveTo(ex - 9, y - 14 - (B.wide ? 4 : 0)); c.quadraticCurveTo(ex, y - 19 - (B.wide ? 4 : 0), ex + 9, y - 14 - (B.wide ? 4 : 0)); c.stroke();
    h4Eye(c, ex, y, 26 * (B.wide ? 1.08 : 1), { side: sx, lid: B.lid, gaze: B.gaze, wide: B.wide, pupil: B.pupil, tear: sx < 0 ? B.tear : 0 }); }
  c.restore(); }
// draw the whole bay at time t (world units); rib = ribbon 0..1 out through the window
function h4Bay(ctx, t, tc, B, rib, glow) {
  const [s0, s1, sy0, sy1] = EH_LC.screen;
  latticeScreen(ctx, { x0: s0, x1: s1, y0: sy0, y1: sy1, glow: glow * 0.5, ribbon: 0, t: tc, behind: (c) => { if (B) h4SilShape(c, B); } });
  if (glow > 0.05 || B) { ctx.save(); h4WinPath(ctx); ctx.clip(); ehGrad(ctx, H4_WIN[0], H4_WIN[2] - 12, 110, 70, [[0, ehMix('#8a5a4a', '#fff0b0', glow)], [1, ehMix('#5a3a3a', '#ffc070', glow)]]); if (B) h4SilFace(ctx, B); ctx.restore();
    ctx.save(); h4WinPath(ctx); ctx.lineWidth = 6; ctx.strokeStyle = '#4a2a14'; ctx.stroke(); ctx.lineWidth = 2.5; ctx.strokeStyle = '#e8c088'; ctx.stroke(); ctx.restore(); }
  if (B && B.fingers) for (const fx of [1296, 1312, 1330, 1346]) shape(ctx, ell(fx, H4_WIN[3] + 2 + 1.5 * Math.sin(tc * 2 + fx), 6.5, 8, 10), H4_SKIN, { lw: 1.8, line: '#8a4a3a' });
  if (rib > 0) { const fl = 0.75 * (pulse(tc, 129.8, 0.24) - pulse(tc, 130.15, 0.24)) + 0.12 * Math.sin(tc * 5);
    ehRibbon(ctx, 1300, H4_WIN[3] - 4, Math.PI / 2 + 0.25 + fl, 84 * K.clamp(rib), 11, tc, EH_ROSESASH, { wave: 6, hz: 2.4, tip: 0.6, shade: '#d8507a', lw: 2.5 }); }
}
// a ring flash (panel units)
function h4Ring(ctx, x, y, t, t0, r0 = 20, r1 = 90) { const u = (t - t0) / 0.35; if (u <= 0 || u >= 1) return; ctx.save(); ctx.globalAlpha *= 1 - u; ctx.strokeStyle = '#fff6c8'; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(x, y, K.lerp(r0, r1, u), 0, 7); ctx.stroke(); ctx.restore(); }
// the enlarged crimson sash corner with the saffron knot (review 1 note 4), drawn over a craftsman at his left hip (o.corner 0..1)
function h4BigCorner(ctx, P, k = 1, lit = 0) { if (!P || k <= 0.05) return; const s = P.s || 1, d = Math.sign(P.dir || 1);
  ctx.save(); ctx.translate(P.x, P.y - (P.lift || 0)); ctx.rotate((P.tip || 0) * d); ctx.scale(d * s, s); ctx.translate(-26, -84); ctx.scale(k * 1.15, k * 1.15);
  shape(ctx, [[-6, -16], [22, -12], [14, 10], [2, 30], [-10, 6]], EH_CRIMSON, { lw: 2.5, line: '#5a0818' }); shape(ctx, [[2, -6], [14, -2], [4, 20]], '#b0183a', { lw: 0 });
  shape(ctx, ell(4, -12, 8, 7, 12), EH_SAFFRON, { lw: 2, line: '#8a5a10' }); seg(ctx, 2, -6, -4, 10, 3, EH_SAFFRON, 1); seg(ctx, 6, -6, 10, 12, 3, EH_SAFFRON, 1);
  if (lit > 0) { ctx.globalAlpha *= lit; shape(ctx, ell(4, 4, 22, 30, 16), 'rgba(255,246,200,0.35)', { lw: 0 }); }
  ctx.restore(); }
