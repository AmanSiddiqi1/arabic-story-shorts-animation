// ===== SIND-06 shots S9-S11 (60.46 - 80.92 s): building the raft, the parting, into the mountain =====
// the raft's state through the film (build, pole, flag, lantern, cargo)
function sbRaftState(t) { return { build: t < 61.6 ? 0 : t < 62.6 ? 0.6 * (t - 61.6) : t < 63.4 ? 0.6 : Math.min(1, 0.6 + 0.4 * (t - 63.4) / 0.8), pole: t < 64.9 ? -1 : K.ease.out(K.clamp((t - 64.9) / 0.3)), flag: K.clamp((t - 65.2) / 0.4), lamp: t < 66.4 ? null : t < 67.9 ? 0 : Math.min(0.8, (t - 67.9) * 2), cargo: { food: t > 66.1, skin: t > 66.3, gems: t < 67.0 ? 0 : Math.min(9, Math.floor((t - 67.0) / 0.1)), glow: K.clamp((t - 67.9) / 0.5) * 0.6 } }; }
// the camp at the sea end: the shelter, the signal oar (hoisted 72.6-73.2), the fire (lit 73.0), the tally marks
function sbCamp(ctx, t, o = {}) { sbShelter(ctx, SB_COVE.shelter, 902, t);
  const sig = o.sig ?? K.clamp((t - 72.6) / 0.6); if (t > 72.0 || o.sig != null) sbSignal(ctx, SB_COVE.pole, 902, sig, t);
  const fk = o.fire ?? K.clamp((t - 73.0) / 0.6); if (fk > 0) { sbFire(ctx, SB_COVE.fire, 902, t, { fire: fk }); for (let k = 0; k < 4; k++) { const u = ((t * 0.3 + k / 4) % 1); ctx.save(); ctx.globalAlpha = 0.5 * (1 - u) * fk; ctx.fillStyle = '#e8e0f0'; ctx.beginPath(); ctx.arc(SB_COVE.fire + 40 * Math.sin(u * 4 + k), 800 - u * 900, 18 + u * 40, 0, 7); ctx.fill(); ctx.restore(); } }
  const n = o.tally ?? (t > 73.5 ? 1 : 0); if (n > 0) sbTally(ctx, SB_COVE.tally[0], SB_COVE.tally[2], n, { fresh: true, perRow: 20 }); }
// ---------- S9 (60.46 - 68.72): the raft from the wreck ----------
const SB6_SX9 = (t) => kfn(t, [[60.46, 1440], [61.8, 1700], [63.3, 1700], [63.45, 1760], [64.15, 1760], [64.3, 1850], [64.9, 1850], [65.1, 1760], [66.95, 1760], [67.1, 1980], [68.72, 1980]], 'inOut');
const SB6_CAM9 = (t) => { const w = t < 62.3 ? 0 : t < 62.6 ? K.ease.inOut((t - 62.3) / 0.3) : t < 63.1 ? 1 : 1 - K.ease.inOut(K.clamp((t - 63.1) / 0.3)); return { x: K.lerp(1740 + 70 * K.clamp((t - 63.4) / 5.3), 700, w), y: K.lerp(770, 615, w), zoom: K.lerp(1.3, 1, w) }; };
function sbS9World(ctx, t, cam) { const tc = SB_T2(t), st = sbRaftState(t), RX = 1850, RY = sbCoveRiverY(RX) + 2 + 2 * Math.sin(tc * 2);
  sbCoveBack(ctx, t, cam, { lit: 1, clear: [1690, 2010] });
  for (let i = 0; i < 4; i++) sbDebris(ctx, 'plank', 1550 + (i % 2) * 20, 900 - i * 8, 0.05 * i, 0.9);   // the plank pile
  // teal and leaf pull planks off the wreck (seen on the whip pan) and teal waves one overhead
  if (cam.x < 1500) [[0, 560], [3, 640]].forEach(([i, x]) => { const P = sbLive(t, 60 + i, { x, y: 900, dir: -1, gaze: [-1, -0.2], mouth: 'smile' }); P.handLW = [x - 60, 860 - 20 * osc(tc + i * 0.3, 0.4)]; P.tip = 0.25; if (i === 0) { P.handR = [10, -250]; P.handL = [-10, -240]; P.handLW = null; P.tip = 0; } const Q = sbSailor(ctx, i, P); if (i === 0) { const h = sbHandW(Q, 1); sbDebris(ctx, 'plank', h[0], h[1] - 6, 0.1 * Math.sin(tc * 6), 0.9); } });
  // mustard hands the planks over (61.6 - 62.6), overdoing it
  const M = sbLive(t, 61, { x: 1625, y: 896, dir: 1, mouth: 'smile', gaze: [1, 0.4] }); if (t > 61.5 && t < 62.7) { const h = osc(tc, 0.33); M.handLW = [1700 + 40 * h, 870]; M.handRW = [1730 + 40 * h, 860]; M.tip = 0.2 + 0.1 * h; } if (t > 64.3 && t < 65.2) { M.mouth = 'open'; M.talk = sbTalk(t, 64.4, 65.0, 7); }
  sbSailor(ctx, 1, M);
  // rose giggles at the measuring (64.2 - 65.2); the captain brings sack, skin and lantern (65.9 - 66.9)
  const Rr = sbLive(t, 62, { x: 1530, y: 884, s: 0.88, dir: 1, gaze: [1, 0.3], mouth: 'smile' }); if (t > 64.3 && t < 65.3) { Rr.handR = PERSON_HANDS.mouthCover.R; Rr.tip = 0.06 * osc(tc, 0.2); Rr.lid = 0.6; } sbSailor(ctx, 2, Rr);
  const CX = (u) => kfn(u, [[65.3, 1440], [65.95, 1660], [68.72, 1660]], 'inOut'), Cp = sbLive(t, 51, { ...walk(CX, tc, { stride: 22 }), y: 892, dir: 1, gaze: [1, 0.2] });
  if (t > 65.95 && t < 66.9) { Cp.handRW = [K.lerp(1700, RX - 112, K.clamp((t - 66.0) / 0.4)), K.lerp(840, RY - 160 + 46, K.clamp((t - 66.0) / 0.4))]; Cp.tip = 0.12; Cp.lid = 0.35; Cp.gaze = [1, 0.1]; }
  const CQ = sbCaptain(ctx, Cp); if (t > 65.2 && t < 66.1) { const h = sbHandW(CQ, 0); sbSack(ctx, h[0] - 20, h[1] - 10, 0.5, 0.1); } if (t > 65.2 && t < 66.4) { const h = sbHandW(CQ, 1); sbLantern(ctx, h[0], h[1] - 8, { flame: 0, t }); }
  // the raft
  sbRaft(ctx, { x: RX, y: RY, rot: 0.01 * Math.sin(tc * 1.7), dip: 4 * pulse(t, 64.25, 0.4) + 3 * pulse(t, 63.95, 0.25), ...st, t, rider: t > 64.2 && t < 64.95 ? (c) => { const P = sbLive(t, 11, { x: 10, y: -12, lie: 1, dir: 1, gaze: [0, -1], mouth: 'smile', handR: [10, -230] }); sbSin6(c, P); } : null });
  // Sinbad: drags planks (60.46 - 61.8), lays and lashes (63.4 - 64.2), measures lying down, the star rag, pats the pole, the pebbles
  if (!(t > 64.2 && t < 64.95)) { const x = SB6_SX9(t), P = sbLive(t, 11, { ...walk(SB6_SX9, tc, { stride: 24 }), y: 892, dir: 1, mouth: 'closed', gaze: [1, 0.2], wind: -0.4 }, [61.9, 66.95]);
    if (t < 61.8) { P.tip = 0.35; P.handLW = [x - 20, 760]; P.handRW = [x - 6, 770]; P.brow = 0.4; P.mouth = 'smile'; P.gaze = [1, 0]; }
    else if (t < 63.4) { P.gaze = [0.6, 0.6]; P.handR = PERSON_HANDS.hipsHands.R; P.handL = PERSON_HANDS.hipsHands.L; }
    else if (t < 64.2) { const pull = sbF(t, [[63.4, 0], [63.8, 0.6], [64.0, 1], [64.2, 1]]); P.handLW = [1800 - 30 * pull, 860 - 20 * pull]; P.handRW = [1790 - 30 * pull, 850 - 20 * pull]; P.tip = -0.25 * pull; P.tongue = true; P.gaze = [0.5, 0.8];
      if (t > 64.0) { P.sit = K.clamp((t - 64.0) / 0.12); P.seat = 'floor'; P.sq *= impactSquash(tc, 64.12, 0.88); P.eyes = 'wide'; P.tongue = false; P.mouth = 'o'; } }
    else if (t < 65.9) { P.handRW = [RX - 128, RY - 140]; P.handLW = [RX - 140, RY - 120]; P.gaze = [1, -0.6]; P.mouth = 'smile'; if (t > 65.5) { P.handLW = null; P.handRW = [RX - 128, RY - 100 - 10 * Math.abs(osc(tc, 0.25))]; P.brow = 0.4; } }
    else if (t < 67.0) { P.gaze = [-0.3, 0.2]; P.mouth = 'smile'; P.handL = PERSON_HANDS.chest.R; }
    else { const ph = K.clamp((t - 67.1) / 0.8); P.handLW = [RX + 120, RY - 40 - 20 * Math.sin(ph * 9)]; P.handRW = [RX + 140, RY - 40 - 20 * Math.sin(ph * 9 + 1)]; P.tip = 0.2; P.gaze = [0.5, 0.8]; if (t > 67.9) { P.handLW = null; P.handRW = null; P.handR = PERSON_HANDS.chest.R; P.gaze = [0.6, 0.5]; P.brow = 0.4; P.mouth = 'smile'; } }
    const Q = sbSin6(ctx, P);
    if (t < 61.8) { const sh = sbPt(Q, [-10, -170], false); ctx.save(); ctx.strokeStyle = '#d8b878'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(...sh); ctx.lineTo(x - 120, 880); ctx.stroke(); ctx.restore(); sbDebris(ctx, 'plank', x - 160, 892, 0.15, 0.9); sbDebris(ctx, 'plank', x - 190, 900, -0.1, 0.9); }
    if (t > 66.95 && t < 67.9) { const h = sbHandW(Q, 1); for (let k = 0; k < 3; k++) sbPebble(ctx, h[0] + 6 * k, h[1] + 10 + 30 * (((t * 3 + k * 0.3) % 1)), 7, k + 1, {}); } }
  if (t > 67.9) sbGlow(ctx, RX + 108, RY - 20, 120, 0.4 * K.clamp((t - 67.9) / 0.5), '#ffd8f0');
  sbCoveFront(ctx, t, cam);
}
function sbS9Over(ctx, t, cam, S) {
  if (t > 61.6 && t < 63.0) { const n = Math.min(6, Math.floor((t - 61.6) / 0.17) + 1); S.counter(ctx, n, 780, 240, K.clamp((t - 61.6 - (n - 1) * 0.17) / 0.15), { size: 90 }); }
  if (t > 62.3 && t < 63.4) sbSpeed(ctx, [0, 0, 1000, 1230], t, { dir: -1, alpha: 0.35 * Math.sin(Math.PI * (t - 62.3) / 1.1) });
  if (t > 64.3 && t < 65.2) { const p = sbP(1860, 720, cam); sbTag(ctx, S, 'PERFECT FIT!', p[0], p[1] - 200, t, 64.4, 65.1, { size: 40 }); }
}
SB_SHOTS.push({ a: 60.46, b: 68.72, cam: SB6_CAM9, world: sbS9World, over: sbS9Over });

// ---------- S10 (68.72 - 75.79): COME WITH ME!, four refusals, the captain's oar, the signal, the fire, the first tally, the grip ----------
const SB6_CAM10 = [[68.72, { x: 1720, y: 640, zoom: 1.05 }], [71.3, { x: 1720, y: 640, zoom: 1.05 }], [72.4, { x: 1150, y: 545, zoom: 0.9 }], [73.9, { x: 1160, y: 545, zoom: 0.9 }], [74.5, { x: 1780, y: 640, zoom: 1.05 }], [75.79, { x: 1790, y: 640, zoom: 1.05 }]];
// the four sailors: [index, x at the raft, camp x, their job]
const SB6_CREW10 = [[1, 1480, 1200, 'pole'], [0, 1560, 1240, 'pole'], [3, 1400, 1060, 'fire'], [2, 1620, 1380, 'tally']];
function sbS10World(ctx, t, cam) { const tc = SB_T2(t), st = sbRaftState(t), RX = 1850, RY = sbCoveRiverY(RX) + 2 + 2 * Math.sin(tc * 2);
  sbCoveBack(ctx, t, cam, { lit: 1 });
  sbCamp(ctx, t);
  sbRaft(ctx, { x: RX, y: RY, rot: 0.01 * Math.sin(tc * 1.7), ...st, t });
  // the sailors: heads turn to the arch, to each other, then shake no one after another; they walk back to the camp (71.3 - 72.4)
  for (const [i, x0, x1, job] of SB6_CREW10) { const t0 = 71.3 + stagger(i, 0.12), xf = (u) => kfn(u, [[t0, x0], [t0 + 1.0, x1]], 'inOut'), x = xf(t), P = sbLive(t, 60 + i, { ...walk(xf, tc, { stride: 26 }), y: 900 - (x > 1560 ? 8 : 0), dir: t > t0 && t < t0 + 1.0 ? -1 : 1, gaze: [1, -0.1] });
    if (t < 71.3) { P.gaze = t < 70.0 ? [1, 0] : gazePlan(SB_T3(t), [[70.0 + stagger(i, 0.1), [1, -0.2]], [70.4 + stagger(i, 0.1), [-1, 0]], [70.7, [1, 0]]], 0.12); if (t > 70.6 + stagger(i, 0.15)) { P.look = 0.8 * osc(tc + i * 0.2, 0.4); P.mouth = 'frown'; } }
    if (i === 2 && t > 70.3 && t < 71.3) { P.x = 1500; P.tip = -0.15; P.eyes = 'wide'; P.mouth = 'o'; }
    if (i === 0 && t > 70.4 && t < 71.4) { P.handL = PERSON_HANDS.folded.L; P.handR = PERSON_HANDS.folded.R; }
    if (i === 3 && t > 70.4 && t < 71.4) { P.gaze = [0.2, 1]; P.drop = 6; }
    if (t > t0 + 1.0) { P.dir = job === 'tally' ? 1 : -1; if (job === 'pole') { const h = sbF(t, [[72.5, 0], [72.9, 1], [73.2, 0.6], [73.6, 1]]); P.handLW = [SB_COVE.pole + (i ? 6 : -6), 900 - 120 - 80 * h]; P.handRW = [SB_COVE.pole + (i ? 6 : -6), 900 - 160 - 60 * h]; P.dir = i ? -1 : 1; P.gaze = [0, -1]; }
      if (job === 'fire') { P.kneel = 1; P.handLW = [SB_COVE.fire - 20, 890]; P.handRW = [SB_COVE.fire - 10, 880 - 10 * osc(tc, 0.2)]; P.gaze = [1, 0.6]; P.dir = 1; }
      if (job === 'tally') { P.handRW = [SB_COVE.tally[0] + 4, SB_COVE.tally[2] + 20 + 12 * osc(tc, 0.25)]; P.gaze = [0.6, -0.8]; P.tip = -0.05; P.y = 900; } }
    sbSailor(ctx, i, P); }
  // the captain: plants an oar in the sand (71.2 - 72.0) "we stay", spyglass to the empty sea (74.0 - 74.9), then the forearm grip
  const Cp = sbLive(t, 51, { x: 1720, y: 892, dir: 1, gaze: [1, -0.1] }, [74.0]);
  if (t > 71.2 && t < 74.0) { const pl = sbF(t, [[71.2, 0], [71.5, 1], [74.0, 1]]); Cp.handRW = [1760, 892 - 200 + 40 * pl]; Cp.look = 0.5 * Math.sin(Math.PI * K.clamp((t - 71.6) / 0.4)) * (t < 72.0 ? 1 : 0); Cp.mouth = 'closed'; }
  if (t > 74.0 && t < 74.9) { const r = sbF(t, [[74.0, 0], [74.3, 1], [74.9, 1]]); Cp.dir = -1; Cp.handR = [30 + 20 * r, -150 - 40 * r]; Cp.handL = [20 + 20 * r, -140 - 30 * r]; Cp.gaze = [1, -0.2]; }
  if (t > 74.9) { const gx = kfn(t, [[74.9, 1720], [75.3, 1800]], 'inOut'); Cp.x = gx; Cp.handRW = [1880, 770]; Cp.gaze = [1, -0.15]; Cp.lid = 0.25; Cp.wet = true; }
  if (t > 71.2) { seg(ctx, 1760, 896, 1764, 660, 6, '#c89a5a', 2); celShade(ctx, [[1752, 652], [1776, 652], [1778, 700], [1750, 700]], '#c89a5a', '#8a6030', { light: [-1, -1], off: 3, lw: 2 }); }
  const CQ = sbCaptain(ctx, Cp); if (t > 74.0 && t < 74.9) { const h = sbHandW(CQ, 1); sbSpyglass(ctx, h[0], h[1], Math.PI + 0.15, 0.9, 1, 0); }
  // Sinbad: sweeps an arm from the crew to the raft to the cave (68.72 - 70.0); nods once at the grip
  const P = sbLive(t, 11, { x: 1920, y: 892, dir: -1, mouth: 'smile', gaze: [-1, -0.1], wind: 0.4 }, [70.0, 75.2]);
  if (t < 70.2) { const sw = sbF(t, [[68.72, 0], [69.2, 0.3], [69.6, 0.7], [70.0, 1], [70.2, 1]]), ang = K.lerp(-0.2, 2.6, sw); P.handRW = [1920 - 110 * Math.cos(ang) + 30 * sw, 760 - 60 * Math.sin(ang)]; P.brow = 0.6; P.tip = -0.08 + 0.1 * sw; P.talk = sbTalk(t, 68.9, 69.9, 2); P.mouth = 'open'; P.gaze = sw > 0.7 ? [1, -0.1] : [-1, -0.1]; if (sw > 0.7) P.dir = 1; }
  else if (t < 74.9) { P.mouth = 'closed'; P.brow = 0.3; P.gaze = t > 71.2 ? [-1, 0] : [-1, -0.1]; }
  else { P.gaze = [-1, -0.15]; P.handLW = [1860, 778]; P.drop = 8 * pulse(t, 75.25, 0.35); P.wet = true; }
  sbSin6(ctx, P);
  sbCoveFront(ctx, t, cam);
}
function sbS10Over(ctx, t, cam, S) {
  if (t > 68.85 && t < 70.4) { const p = sbP(1920, 620, cam); sbSay(ctx, S, [[68.9, 'COME WITH ME!']], t, Math.max(260, p[0] - 40), p[1] - 250, [p[0], p[1] - 20], { gone: 70.2 }); }
  if (t > 70.6 && t < 71.6) { const p = sbP(1500, 640, cam); sbSay(ctx, S, [[70.65, 'NO, NO!']], t, p[0], p[1] - 230, [p[0], p[1]], { gone: 71.4, size: 44 }); }
  if (t > 71.25 && t < 72.1) { const p = sbP(1720, 620, cam); sbSay(ctx, S, [[71.3, 'WE STAY.']], t, p[0], p[1] - 230, [p[0], p[1]], { gone: 71.95, size: 44 }); }
  if (t > 74.3 && t < 74.95) sbTag(ctx, S, 'WAITING FOR RESCUE', 500, 170, t, 74.3, 74.8, { size: 44 });
  if (t > 74.95) { const p = sbP(1760, 640, cam); sbSay(ctx, S, [[75.0, 'SEND HELP, SINBAD.']], t, 470, p[1] - 240, [p[0], p[1]], { gone: 75.65, size: 46 }); }
}
SB_SHOTS.push({ a: 68.72, b: 75.79, cam: sbKeys(SB6_CAM10), world: sbS10World, over: sbS10Over });

// ---------- S11 (75.79 - 80.92): aboard, the push, the current takes it, five waves, under the arch ----------
const SB6_RX11 = (t) => kfn(t, [[75.79, 1850], [77.9, 1850], [78.6, 1900], [80.92, 2560]], 'in');
function sbS11World(ctx, t, cam) { const tc = SB_T2(t), st = sbRaftState(t), RX = SB6_RX11(t), RY = sbCoveRiverY(RX) + 2 + 2 * Math.sin(tc * 2.4), rot = 0.01 * Math.sin(tc * 1.7) + 0.05 * lurch(t, 78.08, 0.3) - 0.04 * pulse(t, 76.0, 0.6);
  sbCoveBack(ctx, t, cam, { lit: 1, draught: 0.3 * Math.sin(tc) });
  sbCamp(ctx, t, { sig: 1, fire: 1, tally: 1 });
  frog(ctx, { x: 2140, y: 896, s: 0.5, dir: 1, croak: 0, eyes: 'open' });
  // the crew wave (79.0 - 79.9): five waves, none in time; mustard's push with the oar (77.4 - 78.1)
  [[1, 1700], [0, 1640], [2, 1580], [3, 1520]].forEach(([i, x], k) => { const P = sbLive(t, 60 + i, { x, y: 892, dir: 1, gaze: lookAt([x, 700], [RX, 840]), mouth: 'smile' });
    if (i === 1 && t > 77.4 && t < 78.3) { const pu = sbF(t, [[77.4, 0], [77.7, 0.2], [77.95, 1], [78.3, 0.8]]); P.x = x + 30 * pu; P.tip = 0.35 * pu; P.handLW = [x + 80 + 60 * pu, 880]; P.handRW = [x + 100 + 60 * pu, 860]; if (pu > 0.8) { P.eyes = 'wide'; P.mouth = 'o'; P.aL = [2.0, 2.2]; P.handLW = null; } }
    if (i === 2 && t > 79.0) { P.x = kfn(t, [[79.0, x], [79.9, x + 120]], 'inOut'); Object.assign(P, walk((u) => kfn(u, [[79.0, x], [79.9, x + 120]], 'inOut'), tc, { stride: 24 })); }
    if (t > 79.0 + stagger(k, 0.11)) { const w = osc(tc + k * 0.23, [0.4, 0.55, 0.32, 0.7][k]); if (i === 1) { P.aL = [2.6 + 0.3 * w, 2.8]; P.aR = [2.6 - 0.3 * w, 2.8]; } else if (i === 0) { P.handR = [50 + 10 * w, -230]; } else if (i === 3) { P.handR = [30 + 4 * w, -170]; } else P.handR = PERSON_HANDS.wave.R; }
    const Q = sbSailor(ctx, i, P); if (i === 1 && t > 77.3 && t < 78.4) { const h = sbHandW(Q, 0); seg(ctx, h[0] - 30, h[1] - 20, RX - 150, RY - 10, 6, '#c89a5a', 2); } });
  const Cp = sbLive(t, 51, { x: 1460, y: 892, dir: 1, gaze: lookAt([1460, 700], [RX, 840]) }); if (t > 79.3) { Cp.handR = PERSON_HANDS.headHold.R; Cp.wet = true; } sbCaptain(ctx, Cp);
  // the raft and Sinbad (clipped at the right wall of the mouth as it slides in)
  ctx.save(); ctx.beginPath(); ctx.rect(0, -800, SB_COVE.arch[1] + 20, 3000); ctx.clip();
  if (t > 79.9) sbGlow(ctx, RX - 108, RY - 120, 200, 0.5, '#ffc870');
  const on = t > 76.2;
  sbRaft(ctx, { x: RX, y: RY, rot, dip: 10 * pulse(t, 76.15, 0.5), ...st, swing: 0.2 * swing(t, 78.08, 1, 1.2, 1.5), t, rider: on ? (c) => { const kn = K.clamp((t - 76.6) / 0.3), P = sbLive(t, 11, { x: 0, y: -10, dir: 1, kneel: kn, gaze: [1, -0.1], mouth: 'closed', wind: t > 78.2 ? -1 : -0.3, tip: 0.3 * lurch(t, 78.08, 0.5) }, [77.2, 77.5]);
    if (t < 76.7) { P.aL = [1.6, 1.4]; P.aR = [1.6, 1.4]; } else { P.handLW = [-90, -14 + 6 * pulse(t, 77.0, 0.15)]; P.handRW = [90, -14 + 6 * pulse(t, 77.15, 0.15)]; }
    if (t > 77.2 && t < 77.7) P.gaze = [-1, -0.2]; if (t > 79.9) { P.drop = 10; P.tilt = 0.15; } sbSin6(c, P); } : null });
  ctx.restore();
  if (!on) { const [hx, lift] = hop(t, 75.79, 0.4, 1760, 1850, 30), P = sbLive(t, 11, { x: hx, y: (t < 75.79 ? 892 : K.lerp(892, RY - 10, K.clamp((t - 75.79) / 0.4))) - lift, dir: 1, gaze: [1, 0.4], aL: [1.6, 1.4], aR: [1.6, 1.4] }); groundShadow(ctx, hx, 900, 70, lift, { flat: true }); sbSin6(ctx, P); }
  if (t > 76.15 && t < 77.2) for (let k = 0; k < 2; k++) sbRing(ctx, RX, RY + 10, (t - 76.15 - k * 0.25) / 0.8, 180);
  sbCoveFront(ctx, t, cam);
}
SB_SHOTS.push({ a: 75.79, b: 80.92, cam: sbKeys([[75.79, { x: 1850, y: 615, zoom: 1 }], [78.0, { x: 1870, y: 615, zoom: 1 }], [80.2, { x: 2100, y: 615, zoom: 1 }], [80.92, { x: 2100, y: 615, zoom: 1 }]]), world: sbS11World });
