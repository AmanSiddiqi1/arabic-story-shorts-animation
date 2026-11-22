// ===== HORSE-05: home, S14 - S16 (104.87 - 125.0): the landing, the welcome, the thanks and the promise, the story on the bench.
// World units on princessGardenDay (strip 1600, ground 900; front lane y 915..950). The horse lands at 1140 facing the palace (left).
const H5_HMCAM = [h5K(104.87, 1150, 0.8, 1000), h5K(105.6, 1020, 0.85, 1000), h5K(106.84, 900, 0.9, 1010), h5K(108.4, 620, 1.05, 1040), h5K(110.84, 660, 1.1, 1040),
  h5K(111.3, 690, 1.25, 1050), h5K(116.84, 700, 1.25, 1050), h5K(118.0, 730, 1.2, 1050), h5K(121.68, 730, 1.2, 1050), h5K(122.8, 800, 0.95, 1010), h5K(125.0, 810, 0.95, 1010)];
function h5HmCam(t) { return h5Cam(H5_HMCAM, t, EH_PGARDEN.w, EH_PGARDEN.top, 1230); }
const H5_HMHX = H5_F([[104.87, 1720], [105.2, 1390], [105.5, 1140]]), H5_HMHL = H5_F([[104.87, 520], [105.2, 210], [105.5, 0]]);
function h5HmHorse(t) { const l = t < 105.5 ? H5_HMHL(t) : 0, bob = t < 105.5 ? 4 * Math.sin(EH_T2(t) * 3) : 0; return { x: H5_HMHX(t), y: 915 - l + bob, s: H5_HS, dir: -1, lift: l }; }
// walk tables
const H5_HPRX = H5_F([[107.6, 1110], [107.9, 1080], [108.46, 590], [110.4, 590], [110.95, 640], [121.68, 640], [122.2, 862]]);
const H5_HFZX = H5_F([[108.2, 1180], [108.5, 1150], [109.8, 765], [121.68, 765], [122.25, 948]]);
const H5_HQX = H5_F([[106.84, 140], [108.3, 540], [121.8, 540], [122.4, 700]]);
const H5_HKX = H5_F([[107.0, 140], [108.6, 500], [109.8, 500], [110.2, 700], [110.84, 700], [111.4, 862], [121.9, 862], [122.5, 780]]);
const H5_HMX = H5_F([[107.2, 140], [108.6, 420], [119.8, 420], [120.16, 700], [121.4, 700], [122.0, 600]]);
const H5_HGX = [H5_F([[107.5, 140], [108.9, 330]]), H5_F([[107.75, 140], [109.2, 280]])];
const H5_HCX = H5_F([[106.08, 900], [106.9, 1060], [108.6, 1060], [109.9, 800], [121.68, 800], [122.4, 905]]);
function h5HmHead(P, cam) { return h5Head(P, cam); }
function h5HmPeople(t) { const tc = EH_T2(t), out = {}, look = (P, w) => lookAt(ehHeadOf(P), w);
  // the princess on her feet (107.85 -)
  if (t >= 107.85) { const sd = 11, P = { ...walk(H5_HPRX, tc, { stride: 24 }), y: 935, s: EH_PRINCESS.s, dir: -1, lid: ehLid(t, sd, [110.84, 118.64]), mouth: 'smile', gaze: [-1, 0.1], handL: [14, -96], handR: [30, -98], sq: breathe(tc, sd, 0.016), tip: idleSway(tc, sd, 0.02, 3.1) };
    if (t < 108.0) { P.sq = landSquash(tc, 107.9, 0.12); }
    if (t < 108.46) { P.tip = 0.12; P.handL = [60, -150]; P.handR = [70, -140]; }
    else if (t < 110.4) { P.handRW = [520, 790]; P.handLW = [500, 800]; P.lid = 1; P.wet = 1; P.tip = 0.08; P.mouth = 'smile'; }
    else if (t < 112.96) { P.dir = 1; P.gaze = look(P, [765, 760]); P.lid = Math.max(0.1, P.lid); }
    else if (t < 114.06) { P.dir = 1; P.handR = [50, -150 + 14 * Math.sin(tc * 12)]; P.lid = t < 113.5 ? 0.3 : 0.1; P.gaze = t < 113.5 ? [0.6, 0.7] : look(P, [765, 760]); }
    else if (t < 118.64) { P.dir = 1; P.gaze = look(P, [765, 760]); }
    else if (t < 121.68) { P.dir = 1; P.gaze = look(P, [862, 760]); if (t < 119.3) P.tip = 0.08 * pulse(tc, 118.9, 0.4); }
    else { P.dir = 1; P.gaze = look(P, [500, 300]); if (t >= 122.2) { P.sit = ehE(tc, 122.2, 0.3); P.seat = 'bench'; P.amp = 0; P.y = 900; } if (t >= 123.2) { P.handR = [40, -60 - 30 * pulse(tc, 123.3, 0.5)]; P.talk = ehTalk(t, 123.2, 123.9, 41, 0.5); } }
    if (t >= 115.98 && t < 116.84) { P.handL = [-40, -84]; P.handR = [-36, -82]; }
    out.pr = P; }
  // Firuz on his feet (108.4 -)
  if (t >= 108.4) { const sd = 3, P = { ...walk(H5_HFZX, tc, { stride: 22 }), y: 938, s: EH_FIRUZ.s, dir: -1, lid: ehLid(t, sd, [110.84, 116.84]), mouth: 'smile', gaze: [-1, 0.1], handL: [-30, -100], handR: [30, -100], sq: breathe(tc, sd, 0.014), tip: idleSway(tc, sd, 0.02, 2.6) }, o = { crown: { on: 1 } };
    if (t < 108.6) P.sq = landSquash(tc, 108.5, 0.12);
    if (t >= 110.04 && t < 110.84) { P.handR = [70, -110 + 12 * Math.sin(tc * 14)]; o.crown = { on: 1, slip: -0.5 * ehE(tc, 110.3, 0.25), lift: -10 * ehE(tc, 110.3, 0.25) }; P.gaze = look(P, [700, 760]); }
    if (t >= 110.84 && t < 116.84) { P.dir = -1; P.gaze = look(P, [640, 760]);
      if (t < 111.6) { P.handR = [10, -138]; o.crown = { on: 1, slip: -0.5, lift: -10 }; }
      else if (t < 112.3) { P.tip = 0.22 * pulse(tc, 111.6, 0.7); P.handL = [0, -232]; o.crown = { on: 1, slip: -0.5 * (1 - ehE(tc, 111.7, 0.4)), lift: -10 * (1 - ehE(tc, 111.7, 0.4)) }; }
      else { P.handL = [60, -130]; P.handR = [70, -126]; P.talk = ehTalk(t, 112.3, 116.6, 5, 0.6); } }
    if (t >= 116.84 && t < 121.68) { P.dir = 1; P.gaze = look(P, [862, 740]); P.handR = t < 118.6 ? [20, -236] : [30, -100]; P.mouth = 'closed'; P.brow = 0.2; P.tip = 0;
      if (t >= 119.36) P.mouth = 'smile';
      if (t >= 120.58 && t < 121.68) { P.dir = -1; P.handLW = [712, 760]; P.handRW = [728, 762]; P.eyes = 'wide'; P.gaze = look(P, [720, 760]); } }
    if (t >= 121.68) { P.dir = -1; P.gaze = look(P, [500, 300]); if (t >= 122.25) { P.sit = ehE(tc, 122.25, 0.3); P.seat = 'bench'; P.amp = 0; P.y = 900; }
      if (t >= 122.78) { const a = (tc - 122.78) * 7; P.handR = [60 + 50 * Math.cos(a), -200 + 50 * Math.sin(a)]; P.talk = ehTalk(t, 122.78, 123.2, 9, 0.5); }
      if (t >= 123.2) { P.handR = [30, -90]; P.gaze = look(P, [862, 760]); } }
    out.fz = [P, o]; }
  // the queen
  if (t >= 106.84) { const sd = 61, P = { ...walk(H5_HQX, tc, { stride: 26 }), y: 925, s: EH_QUEEN.s, dir: 1, lid: ehLid(t, sd, [115.22]), mouth: 'smile', gaze: [1, 0.1], handL: [40, -60], handR: [50, -64], sq: breathe(tc, sd, 0.016), tip: 0.1 + idleSway(tc, sd, 0.02, 3) };
    if (t >= 108.3 && t < 110.4) { P.handRW = [610, 790]; P.handLW = [620, 800]; P.lid = 1; P.wet = 1; P.tip = 0.06; }
    if (t >= 110.4) { P.tip = idleSway(tc, sd, 0.02, 3); P.handL = [-20, -96]; P.handR = [24, -96]; P.gaze = look(P, [700, 760]); }
    if (t >= 115.22 && t < 117.5) { P.handR = [26, -176]; P.wet = t < 115.62 ? 1 : 0; }
    if (t >= 121.8) { P.gaze = look(P, [500, 300]); if (t >= 122.4) { P.sit = ehE(tc, 122.4, 0.3); P.seat = 'floor'; P.amp = 0; } if (t >= 123.74) { P.handR = [24, -170]; P.mouth = 'o'; } }
    out.q = P; }
  // the father
  if (t >= 107.0) { const sd = 63, P = { ...walk(H5_HKX, tc, { stride: 24 }), y: 918, s: EH_FKING.s, dir: 1, lid: ehLid(t, sd, [118.64]), mouth: 'closed', brow: 0.4, gaze: [1, 0.1], handL: [-30, -200], handR: [-20, -206], sq: breathe(tc, sd, 0.016), tip: idleSway(tc, sd, 0.02, 3.2) };
    if (t >= 108.6 && t < 109.4) { P.handL = [90, -150]; P.handR = [100, -140]; P.mouth = 'smile'; P.brow = 0; }
    if (t >= 109.4 && t < 109.8) { P.handR = [26, -196]; P.lid = 0.5; P.mouth = 'smile'; }
    if (t >= 110.2 && t < 110.84) { P.handR = [62, -110 + 12 * Math.sin(tc * 14)]; P.handL = [56, -104 + 12 * Math.sin(tc * 14)]; P.mouth = 'smile'; P.brow = 0; }
    if (t >= 110.84) { P.dir = -1; P.gaze = look(P, [700, 760]); P.handL = [-24, -96]; P.handR = [30, -96]; P.brow = 0.3;
      if (t >= 115.98 && t < 116.8) { P.handR = [30, -206 + 6 * Math.sin(tc * 16)]; P.mouth = 'smile'; }
      if (t >= 118.64) P.gaze = look(P, [640, 760]); if (t >= 119.36) { P.mouth = 'smile'; P.brow = -0.2; P.tip = 0.06 * pulse(tc, 119.4, 0.5); P.handRW = [770, 795]; }
      if (t >= 121.0) P.handRW = null; }
    if (t >= 121.9) { P.gaze = look(P, [500, 300]); if (t >= 122.5) { P.sit = ehE(tc, 122.5, 0.3); P.seat = 'floor'; P.amp = 0; P.handRW = null; } if (t >= 123.74) { P.handR = [40, -40 + 30 * pulse(tc, 123.8, 0.3)]; P.mouth = 'open'; } }
    out.k = P; }
  // the maid (petals, then the trunks)
  if (t >= 107.2) { const sd = 67, P = { ...walk(H5_HMX, tc, { stride: 26 }), y: 948, s: EH_MAID.s, dir: 1, lid: ehLid(t, sd), mouth: 'smile', gaze: [1, 0.1], handL: [20, -100], handR: [26, -100], sq: breathe(tc, sd, 0.016), tip: idleSway(tc, sd, 0.02, 2.9) }, o = {};
    if (t >= 109.0 && t < 109.6) { const u = ehE(tc, 109.1, 0.3); P.handL = [K.lerp(20, 40, u), K.lerp(-100, -230, u)]; P.handR = [K.lerp(26, 60, u), K.lerp(-100, -220, u)]; }
    if (t >= 110.84) P.gaze = look(P, [700, 760]);
    if (t >= 120.0 && t < 121.68) { o.trunks = true; P.handL = [40, -110]; P.handR = [44, -112]; P.tip = 0.06 * Math.sin(tc * 12); if (t >= 120.16) P.dir = 1; }
    if (t >= 122.0) { P.sit = ehE(tc, 122.0, 0.3); P.seat = 'bench'; P.amp = 0; P.y = 930; P.gaze = look(P, [500, 300]); if (t >= 123.74) P.mouth = 'o'; }
    out.m = [P, o]; }
  // the two blue guards (never in step)
  out.g = [0, 1].map((i) => { const xf = H5_HGX[i]; if (t < [107.5, 107.75][i]) return null; const D = i ? EH_GUARD_B : EH_GUARD_A, sd = 71 + i * 4;
    const P = { ...walk(xf, tc, { stride: 24 + i * 4 }), y: 905 + i * 6, s: D.s, dir: 1, lid: ehLid(t, sd), mouth: 'closed', gaze: [1, 0.1], handL: [-26, -100], handR: [40, -110], sq: breathe(tc, sd, 0.012), tip: idleSway(tc, sd, 0.02, 3 + i * 0.4) }, o = { spear: 0, thump: 0 };
    if (t >= 109.22 && t < 110.0) o.thump = 8 * pulse(tc, 109.3 + i * 0.3, 0.2);
    if (t >= 120.58 + i * 0.3 && t < 121.4 + i * 0.3) P.handL = [20, -200];
    if (t >= 121.68) P.gaze = look(P, [500, 300]); if (t >= 123.74) { P.tip = 0.12; P.mouth = 'o'; }
    return [P, o, D]; });
  // the cat
  if (t >= 106.0) { const x = H5_HCX(t), sp = speed(H5_HCX, t), up = t >= 122.0 ? ehE(tc, 122.0, 0.35) : 0;
    out.cat = { x, y: K.lerp(938, 852, up) - 40 * Math.sin(Math.PI * up) * (up < 1 ? 1 : 0), s: 0.55, dir: sp < -5 ? -1 : 1, pal: 2, ph: x / 12, amp: Math.abs(sp) > 10 ? 1 : 0, sit: (t > 110.4 && t < 121.68) || t > 122.4 ? 1 : 0 }; }
  return out; }
function h5HmWorld(ctx, t, cam) {
  const tc = EH_T2(t), t3 = EH_T3(t), gold = K.clamp((t - 123.0) / 1.3);
  princessGardenDay(ctx, t, cam, { plate: gold >= 1 ? 'golden' : 'day', butterflies: true });
  if (gold > 0 && gold < 1) { ctx.save(); ctx.globalAlpha *= gold; princessGardenDay(ctx, t, cam, { plate: 'golden', butterflies: false }); ctx.restore(); }
  const lt = ehE(t, 123.96, 0.4); if (lt > 0) for (const px of EH_PGARDEN.poles) ehLantern(ctx, px, 650, t3, lt);
  const W = h5HmPeople(t), items = [];
  // cushions and the maid's trunk for S16
  if (t >= 121.68) items.push([926, () => { for (const x of [700, 780]) celShade(ctx, ell(x, 926, 46, 14, 18), x === 700 ? '#e8364f' : '#3a74ea', x === 700 ? '#a8203a' : '#1a4ab0', { off: 4, lw: 2.5, line: '#4a2a3a' }); }]);
  if (t >= 121.4) items.push([931, () => packLoad(ctx, [{ kind: 'chest', col: '#c8703a' }], 600, 931, 0.7)]);
  // the horse: landing with the pair, then empty on the lawn
  { const H = h5HmHorse(t); items.push([915, () => { h5Shadow(ctx, H.x, 915, 260 * H.s, H.lift); if (t >= 105.5 && t < 106.4) dustBurst(ctx, H.x, 915, t - 105.5, 12, 10, 22, 160, 0.9, 7);
    const PF = t < 107.85 ? { lid: ehLid(t, 11), mouth: 'smile', gaze: [-1, 0.3], handL: [50, -110], handR: [40, -112], sq: landSquash(EH_T2(t), 105.5, 0.07), lurch: idleSway(tc, 31, 0.015, 2.2) } : null;
    const PR = t < 108.4 ? { lid: ehLid(t, 3), mouth: 'smile', gaze: [-1, 0.2], handL: [50, -110], handR: [60, -112], sq: landSquash(EH_T2(t), 105.5, 0.1), lurch: idleSway(tc, 37, 0.015, 2.3) } : null;
    if (PF && t >= 106.08) { PF.handL = [10, -140]; PF.gaze = [-1, 0.1]; } if (PF && t >= 107.6) { PF.lurch = -0.12; PF.handR = [-60, -60]; }
    if (PR && t >= 106.08) { PR.mouth = 'smile'; PR.handL = [10, -140]; } if (PR && t >= 108.2) PR.lurch = -0.12;
    const air = H.lift > 0, rig = (c) => { if (air) ehWindRibbons(c, H, tc, { ang: 0.4, len: 180 }); h5Pair(c, H, PF, PR, t, { veil: { stream: air ? 0.7 : 0 }, cape: { stream: air ? 0.6 : 0, ang: Math.PI * 0.06 } }); };
    if (air) castFinish(ctx, H.x, H.y + 60 * H.s, 760 * H.s, 1000 * H.s, rig, { rim: '#fff2c0', light: [-1, -1], rimW: 2.5 }); else rig(ctx); }]); }
  if (W.pr) items.push([W.pr.y, () => h5Fig(ctx, EH_PRINCESS, W.pr, t, { veil: true, vx: speed(H5_HPRX, t) })]);
  if (W.fz) { const [P, o] = W.fz; items.push([P.y, () => h5Fig(ctx, EH_FIRUZ, P, t, { cape: true, vx: speed(H5_HFZX, t), crown: o.crown })]); }
  if (W.q) items.push([W.q.y, () => h5Fig(ctx, EH_QUEEN, W.q, t, { veil: true, vx: speed(H5_HQX, t) })]);
  if (W.k) items.push([W.k.y, () => h5Fig(ctx, EH_FKING, W.k, t)]);
  if (W.m) { const [P, o] = W.m; items.push([P.y, () => { h5Fig(ctx, EH_MAID, P, t); if (o.trunks) { const [x, y] = ehHandW(P, P.handR), lag = Math.sin(tc * 12 - 0.6) * 4, sl = t >= 120.58 ? ehE(tc, 120.58, 0.3) : 0;
    packLoad(ctx, [{ kind: 'chest', col: '#c8703a' }, { kind: 'chest', col: '#3a74ea' }], x + lag, y + 40, 0.5); if (sl < 1) packLoad(ctx, [{ kind: 'chest', col: '#e8364f' }], x + lag + 40 * sl, y - 30 - 10 * sl, 0.5); } }]); }
  if (W.m && t >= 120.88 && t < 121.68 && W.fz) { const [P] = W.fz, [x, y] = ehHandW(P, [20, -100]); items.push([P.y + 1, () => packLoad(ctx, [{ kind: 'chest', col: '#e8364f' }], 720, 790, 0.5)]); }
  for (const g of W.g) if (g) { const [P, o, D] = g; items.push([P.y, () => { h5Fig(ctx, D, { ...P, y: P.y }, t); const [hx, hy] = ehHandW(P, P.handR); ehSpear(ctx, hx, hy - o.thump, D.s, 0.02); }]); }
  if (W.cat) items.push([W.cat.y, () => cat(ctx, W.cat)]);
  items.sort((a, b) => a[0] - b[0]); for (const [, f] of items) f();
  // petals (109.22 - 111.8)
  if (t >= 109.22 && t < 111.8) for (let i = 0; i < 26; i++) { const R = K.rng(800 + i), u = t - 109.22 - R() * 0.2; if (u < 0) continue; const x = 430 + (R() - 0.3) * 260 * Math.min(1, u * 2) + 14 * Math.sin(u * 4 + i), y = 760 - 260 * Math.sin(Math.min(1, u * 1.6) * Math.PI / 2) + 120 * u * u;
    ctx.save(); ctx.globalAlpha *= 1 - K.clamp((u - 2.0) / 0.5); ctx.fillStyle = i % 3 ? '#ff7aa8' : '#ffd0dc'; ctx.beginPath(); ctx.ellipse(x, y, 7, 4, u * 4 + i, 0, 7); ctx.fill(); ctx.restore(); }
  princessGardenDayFront(ctx, t);
}
function h5HmOver(ctx, t, cam, S) {
  const W = h5HmPeople(t);
  if (W.m && t >= 109.22 && t < 110.9) h5Say(ctx, S, [[109.22, 'WELCOME HOME!']], t, h5Head(W.m[0], cam), { gone: 110.6, size: 50, up: 160 });
  if (W.fz && t >= 114.06 && t < 116.9) h5Say(ctx, S, [[114.06, 'YOU WERE BRAVE\nAND CLEVER.']], t, h5Head(W.fz[0], cam), { gone: 116.6, size: 44, up: 170 });
  if (t >= 114.06 && t < 117.2) { const k1 = K.clamp((t - 114.06) / 0.25), k2 = K.clamp((t - 115.98) / 0.25), out = ehE(t, 116.84, 0.35);
    memoryCard(ctx, 260 - 500 * out, 220, k1, t, { s: 0.68, rot: -0.04, draw: (c, w, h) => h5HmCard1(c, w, h, t) });
    memoryCard(ctx, 740 + 500 * out, 220, k2, t, { s: 0.68, rot: 0.03, draw: (c, w, h) => h5HmCard2(c, w, h, t) }); }
  if (W.fz && t >= 118.12 && t < 120.0) { const h = h5Head(W.fz[0], cam), p = K.clamp((t - 118.12) / 0.25) * K.clamp((120.0 - t) / 0.25);
    iconBalloon(ctx, K.clamp(h[0] + 60, 200, 800), 240, 340, 220, p, [h[0], h[1] - 60], (c, w, hh) => { ehGrad(c, 0, 0, w, hh, [[0, '#8ac8ff'], [1, '#e6f6ff']]); c.fillStyle = '#e8d08a'; c.fillRect(0, hh * 0.78, w, hh);
      princessPalace(c, w * 0.18, hh * 0.86, 0.1, {}); c.drawImage(ehPalacePlate(), w * 0.52, hh * 0.86 - 0.3 * w * 0.75, 0.44 * w, 0.33 * w);
      c.save(); c.strokeStyle = '#a8703a'; c.lineWidth = 4; c.setLineDash([8, 8]); c.beginPath(); c.moveTo(w * 0.22, hh * 0.92); c.quadraticCurveTo(w * 0.5, hh * 0.98, w * 0.76 * Math.min(1, 0.3 + (t - 118.12) / 0.8), hh * 0.9); c.stroke(); c.restore(); }); }
  // the story cloud above the bench (122.78 - 124.4)
  if (t >= 122.78 && t < 124.6) { const p = K.clamp((t - 122.78) / 0.5) * K.clamp((124.6 - t) / 0.3), fz = W.fz ? h5Head(W.fz[0], cam) : [600, 600];
    thoughtCloud(ctx, 470, 270, 560, 330, t, { p, tail: [fz[0] - 10, fz[1] - 40], seed: 12, bg: '#bfe6ff', scale: 0.42, at: [500, 560], inside: (c) => { farPalaceToy(c, 500, 760, 0.42, 'morning');
      const a = (t - 122.78) * 3.2, x = 500 + Math.cos(a) * 340, y = 420 + Math.sin(a) * 60, dn = t >= 123.2 ? ehE(t, 123.2, 0.4) : 0; ehHorseSil(c, x, y + 220 * dn, 0.55, { riders: 2, rear: 'firuz', dir: Math.sin(a) > 0 ? -1 : 1, rot: dn * 0.25 * (Math.sin(a) > 0 ? -1 : 1) }); } }); }
}
// the two cards of S15
function h5HmCard1(c, w, h, t) { ehGrad(c, 0, 0, w, h, [[0, '#7ab0f0'], [1, '#ffe6cc']]); c.fillStyle = '#f8ece0'; c.fillRect(0, h * 0.78, w, h);
  person(c, ehDressP(EH_PRINCESS, { x: w * 0.3, y: h * 0.95, s: 0.85, dir: 1, mouth: 'closed', brow: 0.3, handR: [120, -150], handL: [14, -96], gaze: [1, 0] }));
  person(c, ehDressP(EH_FARKING, { x: w * 0.62, y: h * 0.95, s: 0.85, dir: -1, mouth: 'o', handL: [-26, -96], handR: [26, -96], gaze: [-1, 0] }));
  person(c, ehDressP(EH_INVENTOR, { x: w * 0.9, y: h * 0.95, s: 0.8, dir: -1, eyes: 'wide', mouth: 'grit', sq: 0.92, handL: [-6, -190], handR: [8, -186], gaze: [-1, 0.2] })); }
function h5HmCard2(c, w, h, t) { ehGrad(c, 0, 0, w, h, [[0, '#fbf1e0'], [1, '#e8c4a0']]); c.fillStyle = '#a8703a'; c.fillRect(w * 0.6, h * 0.12, w * 0.34, h * 0.88); c.fillStyle = '#2a1a2a'; c.fillRect(w * 0.7, h * 0.3, w * 0.14, h * 0.12);
  celShade(c, K.rectPts(w * 0.58, h * 0.58, w * 0.38, h * 0.07), '#b8783a', '#7a4a2a', { off: 3, lw: 3, line: '#4a2a14' });
  person(c, ehDressP(EH_PRINCESS, { x: w * 0.3, y: h * 0.95, s: 0.85, dir: 1, mouth: 'closed', handL: [-40, -84], handR: [-36, -82], gaze: [1, -0.2] }));
  ehCallout(c, w * 0.18, h * 0.24, 46, 1, (cc) => { cc.fillStyle = '#3a3448'; cc.fillRect(w * 0.18 - 50, h * 0.24 - 50, 100, 100); const g = 0.6 + 0.4 * Math.sin(t * 6); ehGlow(cc, w * 0.18, h * 0.24, 40, g, '#ffd36a'); seg(cc, w * 0.18 - 16, h * 0.24 + 14, w * 0.18 + 12, h * 0.24 - 14, 6, '#e0b038', 1); ehBrassDisc(cc, w * 0.18 + 14, h * 0.24 - 16, 7, 1); }); }
