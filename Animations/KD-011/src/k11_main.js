// ===== KD-011 The Rats and the Iron: worlds, picture clouds, camera, lettering, panel, sound =====
const K11VW = 1000, K11VH = 1230;

// ---------- the falling top bar (S1) ----------
function k11FallingBar(t) {   // world [x, y, rot] of the top ingot while it is off the stack, else null
  if (!k11in(t, 6.44, 7.45)) return null;
  if (t < 6.72) { const u = K11B(t, 6.44, 0.28, 'in'); return [K.lerp(160, 265, u), K.lerp(690, 746, u) - 30 * Math.sin(Math.PI * u), 0.9 * u]; }
  if (t < 7.3) return [265 + 2 * Math.sin(t * 30) * K.clamp(7.0 - t), 745, 0.15 * Math.sin((t - 6.72) * 22) * K.clamp(7.1 - t)];
  const u = K11B(t, 7.3, 0.15, 'in'); return [K.lerp(265, 160, u), K.lerp(746, 690, u) - 30 * Math.sin(Math.PI * u), 0];
}
function k11cartDraw(ctx, t) {
  const sc = k11sc(t); if (![1, 2, 4].includes(sc)) return;
  const x = K11CARTX(t), inn = K11CARTIN(t), hd = sc === 4 ? -1 : 1;
  const lift = sc === 1 ? (t < 3.8 ? 0 : -blend(t, 3.8, 4.1, 0, 62)) : sc === 2 ? (k11in(t, 14.2, 15.3) ? 0 : -62) : (k11in(t, 29.9, 31.72) ? -62 : 0);
  const hop = kick(t, [7.5], 3, 12, 8) + (sc === 1 && t > 3.8 ? (1 - landSquash(t, 4.1, 1, 12)) * -4 : 0);
  const sag = sc === 1 && t > 4.44 ? 6 * K11B(t, 4.44, 1.4, 'out') : 0;
  const draw = (c) => k11Cart(c, x, 900 + 30 * inn * 0 - inn * 26 - hop, { s: 1 - 0.18 * inn, ang: x / 42, handles: hd, lift, load: (cc, bx, by) => {
    const sold = sc === 4 && t > 29.9 && t < 31.6, gl = sc === 1 && k11in(t, 4.44, 5.9) ? Math.floor((t - 4.44) / 0.1) % 15 : -1, off = k11FallingBar(t);
    k11Stack(cc, bx, by + sag, { n: off ? 14 : 15, glint: gl, gv: 1 - ((t - 4.44) / 0.1) % 1 });
    if (sold) { cc.save(); cc.translate(bx, by - 60); cc.rotate(-0.2); const k = K.ease.back(K11B(t, 29.9, 0.2)); cc.scale(k, k); shape(cc, K.rectPts(-80, -26, 160, 52), C.paper, { lw: 0 }); cc.strokeStyle = C.red; cc.lineWidth = 7; cc.strokeRect(-78, -24, 156, 48);
      cc.font = K.font(46, BF, 400); cc.textAlign = 'center'; cc.textBaseline = 'middle'; cc.fillStyle = C.red; cc.fillText('SOLD!', 0, 2); cc.restore(); } } });
  if (inn > 0.02) { ctx.save(); ctx.beginPath(); ctx.rect(K11SD.x0, K11SD.top, K11SD.x1 - K11SD.x0, K11SD.bottom - K11SD.top + 2); ctx.clip(); draw(ctx); ctx.restore(); }
  else draw(ctx);
  const fb = k11FallingBar(t); if (fb) { ctx.save(); ctx.translate(fb[0], fb[1]); ctx.rotate(fb[2]); k11Ingot(ctx, -22, 11, 44, 22, {}); ctx.restore(); }
}
// ---------- the storeroom door state on the street ----------
function k11storeState(t) {
  const sc = k11sc(t); let open = 0, bar = 1, lock = 1, inside = 'bare', sw = 0, glint = 0;
  if (sc === 1) { inside = 'bare'; }
  if (sc === 2) { bar = 1 - K11B(t, 13.84, 0.2) + K11B(t, 17.0, 0.2); lock = t < 13.9 || t > 17.15 ? 1 : 0; open = K11B(t, 13.95, 0.6, 'out') - K11B(t, 16.7, 0.25, 'in'); inside = 'bare'; sw = swing(t, 17.15, 0.5, 1.6, 2.5);
    if (t > 20.7) glint = 0; }
  if (sc >= 3 && sc <= 4) { inside = t < 29.44 ? 'full' : 'empty'; if (sc === 4) { bar = 1 - K11B(t, 28.4, 0.2) + K11B(t, 32.3, 0.2); lock = t < 28.4 || t > 32.3 ? 1 : 0; open = K11B(t, 28.6, 0.5, 'out') - K11B(t, 31.9, 0.35, 'in'); glint = pulse(t, 27.5, 0.4); } }
  if (sc >= 5) { inside = 'empty'; if (sc === 7) sw = swing(t, 56.2, 0.35, 1.8, 3) + swing(t, 56.42, 0.25, 1.8, 3); }
  return { open: K.clamp(open), bar: K.clamp(bar), lock, lockSw: sw, lockGlint: glint, inside: (c) => { if (inside !== 'bare') k11StoreInside(c, inside); else { c.save(); c.fillStyle = 'rgba(255,220,140,0.12)'; c.fillRect(K11SD.x0, K11SD.top, 190, 260); c.restore(); } } };
}

// ---------- picture clouds ----------
// the lie: the stack in the storeroom, the door locked, five rats in bibs eat it all. mode 'lie' (S6), 'loop' (S14), 'confess' (S16)
const K11RATS = [[300, 0], [390, 1], [470, 2], [560, 0], [640, 1]];
function k11LieInside(c, t, mode) {
  shape(c, [[-100, 300], [1100, 300], [1100, 905], [-100, 905]], CREAM, { lw: 0, dot: '#e2c68a', pitch: 14, rad: 0.2, da: 0.4 });
  shape(c, [[-100, 900], [1100, 900], [1100, 1200], [-100, 1200]], '#c98a3a', { lw: 6, seed: 140 });
  const doorShut = mode !== 'lie' || t > 49.7 ? 1 : K11B(t, 49.56, 0.15);
  shape(c, K.rectPts(820, 560, 150, 340), '#8a5a14', { lw: 6, seed: 141, dot: EARTHD, pitch: 10, rad: 0.18, da: 0.4 }); if (doorShut > 0.5) k11Lock(c, 840, 700, 0, {});
  const tl = mode === 'loop' ? 52.44 + ((t - 110.4) % 1.0) : mode === 'confess' ? 52.6 : t;
  let n = 15; const bites = {};
  if (tl > 52.44) { const k = Math.floor((tl - 52.44) / 0.2); n = mode === 'loop' ? 15 - Math.min(4, k) : Math.max(0, 15 - [0, 5, 9, 12, 14, 15][Math.min(5, k)]); for (let i = Math.max(0, n - 3); i < n; i++) bites[i] = 0.6 + 0.4 * Math.sin(tl * 9 + i); }
  const stackOn = mode !== 'lie' || t > 47.9;
  if (stackOn) { const pk = mode === 'lie' ? K.ease.back(K11B(t, 47.9, 0.35)) : 1; c.save(); c.translate(450, 900); c.scale(pk, pk); k11Stack(c, 0, 0, { s: 1.6, n, bites }); c.restore(); }
  if (mode === 'confess' && t > 126.54) return;
  // rats
  K11RATS.forEach(([x0, pal], i) => {
    const t0 = 50.92 + stagger(i, 0.12) + (i === 4 ? 0.12 : 0); let x, y = 900, P = { s: 0.75, pal: 0, bib: true, dir: -1, tailUp: 0.3 };
    if (mode === 'lie') { if (t < t0) return; const u = K11B(t, t0, 0.65, 'out'); x = K.lerp(980, x0, u); Object.assign(P, walk((tt) => K.lerp(980, x0, K11B(tt, t0, 0.65, 'out')), t, { stride: GAIT.rat * 0.75 }));
      if (i === 0) P.sniff = 0.5 + 0.5 * Math.sin(t * 10);
      if (t > 51.7) { const th = 51.7 + stagger(i, 0.1), top = 900 - 22 * 1.6 * Math.max(1, Math.ceil(n / 5)) - 4, [, lift] = hop(t, th, 0.35, 0, 0, 70); const f = K11B(t, th, 0.35); x = x0 + (450 - x0) * 0.45 * f; y = K.lerp(900, top, f) - lift; P.x = x; P.amp = 0; P.sq = landSquash(t, th + 0.35, 0.15); }
      if (t > 52.44) { const top = 900 - 22 * 1.6 * Math.max(0, Math.ceil(n / 5)); y = Math.min(900, top + (n ? 0 : 0)); P.sit = 1; P.chew = (t * 4 + i * 0.3) % 1; }
      if (t > 53.34) { P.roll = K11B(t, 53.34 + stagger(i, 0.06), 0.3); P.sit = 0; P.chew = 0; P.eyes = 'shut'; y = 900; P.sq = 0.85; }
      if (i === 2 && k11in(t, 54.1, 54.5)) { P.mouth = 'open'; P.talk = 1; } }
    else if (mode === 'loop') { x = x0 + (450 - x0) * 0.45; y = 900 - 22 * 1.6 * 3; P.sit = 1; P.chew = (t * 4 + i * 0.3) % 1; }
    else { x = x0 + (450 - x0) * 0.45; y = 900 - 22 * 1.6 * 3; P.sit = 1; P.gaze = [0, 0.1];
      if (t > 125.6) { P.sit = 0; P.shrug = 1; const u = K11B(t, 125.9 + stagger(i, 0.08), 0.6, 'in'); x = K.lerp(x, 1200, u); y = K.lerp(y, 900, K.clamp(u * 3)); Object.assign(P, walk((tt) => K.lerp(x0 + (450 - x0) * 0.45, 1200, K11B(tt, 125.9 + stagger(i, 0.08), 0.6, 'in')), t, { stride: GAIT.rat * 0.75 })); P.dir = 1; } }
    P.x = x; P.y = y; rat(c, P);
  });
}
// the true picture (S16): the cart rolls to the buyer, SOLD, coins to the friend (a replay of S4 with the same drawings)
function k11TrueInside(c, t) {
  shape(c, [[-100, 300], [1100, 300], [1100, 905], [-100, 905]], '#efdcae', { lw: 0, dot: '#e2c68a', pitch: 14, rad: 0.2, da: 0.4 }); shape(c, [[-100, 900], [1100, 900], [1100, 1200], [-100, 1200]], '#f2d27a', { lw: 6, seed: 142 });
  const u = K11B(t, 128.64, 0.7, 'out'), cx = K.lerp(760, 520, u);
  k11Cart(c, cx, 900, { ang: cx / 42, handles: -1, load: (cc, bx, by) => { k11Stack(cc, bx, by, {}); if (t > 129.2) { cc.save(); cc.translate(bx, by - 60); cc.rotate(-0.2); const k = K.ease.back(K11B(t, 129.2, 0.2)); cc.scale(k, k); cc.strokeStyle = C.red; cc.lineWidth = 7; cc.strokeRect(-78, -24, 156, 48); cc.font = K.font(46, BF, 400); cc.textAlign = 'center'; cc.textBaseline = 'middle'; cc.fillStyle = C.red; cc.fillText('SOLD!', 0, 2); cc.restore(); } } });
  person(c, { x: 260, y: 900, s: 1, costume: 'physician', pal: K11BUYPAL, age: 0.6, dir: 1, mouth: 'smile', handR: t > 129.4 ? [96, -128] : [10, -120], lid: 0 });
  person(c, { x: 830, y: 900, s: K11FS, costume: 'villager', pal: K11FPAL, dir: -1, mouth: 'smile', handR: [96, -122], lid: 0 });
  for (let i = 0; i < 3; i++) { const a = 129.5 + i * 0.2, v = K11B(t, a, 0.2, 'inOut'); if (t > a) k11Coin(c, K.lerp(360, 720, v), 770 - 60 * Math.sin(Math.PI * v), 13, t * 8); }
}
// the hawk tale: the boy on the road with his ball, a huge hawk, carried off (enjoys it). mode 'tale' (S12) or 'loop' (S14)
function k11HawkInside(c, t, mode) {
  shape(c, [[-100, 0], [1100, 0], [1100, 905], [-100, 905]], '#a9cfff', { lw: 0, dot: C.white, pitch: 14, rad: 0.18, da: 0.4 }); sun(c, 180, 470, t); cloudFlat(c, 760, 420, 0.8);
  shape(c, [[-100, 900], [1100, 900], [1100, 1200], [-100, 1200]], SANDL, { lw: 6, seed: 143, dot: '#d9a441', pitch: 12, rad: 0.18, da: 0.4 });
  townFarCity(c, 820, 900, 1.2);
  const boyAt = [380, 900], bs = 1.5;
  if (mode === 'loop') { const fl = Math.sin(t * 9); const hs = 1.5; bird(c, { x: 520, y: 560 + 10 * fl, s: hs, kind: 'hawk', fly: true, flap: fl, dir: 1, brow: 0.7, grip: 1, carry: (cc) => k11carriedBoy(cc, hs, t, 0.2 * Math.sin(t * 5)) }); return; }
  // boy waits, waves, is grabbed
  const grab = 95.86, hw = (tt) => {   // hawk path [x, y (feet), s]
    if (tt < 93.46) return null;
    if (tt < 94.22) { const u = K11B(tt, 93.46, 0.7, 'out'); return [K.lerp(760, 640, u), K.lerp(420, 690, u), 0.9]; }
    if (tt < 95.1) { const u = K11B(tt, 94.22, 0.6, 'out'); return [640, 690, K.lerp(0.9, 2.6, K.ease.back(u))]; }
    if (tt < 95.45) { return [640, 690 - 30 * K11B(tt, 95.1, 0.3, 'out'), 2.6]; }
    if (tt < grab) { const u = K11B(tt, 95.45, grab - 95.45, 'in'); return [K.lerp(640, 400, u), K.lerp(660, 760, u) - 50 * Math.sin(Math.PI * u), K.lerp(2.6, 1.6, u)]; }
    if (tt < 96.62) return [400, 760 - 20 * K11B(tt, grab, 0.5), 1.6];
    if (tt < 97.56) { const u = (tt - 96.62) / 0.94, st = Math.floor(u * 4) / 4 + K.ease.out((u * 4) % 1) / 4; return [K.lerp(400, 720, u), K.lerp(740, 560, st), 1.6]; }
    const u = K11B(tt, 97.56, 0.8, 'in'); return [K.lerp(720, 1000, u), K.lerp(560, 430, u), K.lerp(1.6, 0.15, u)];
  };
  const H = hw(t);
  if (t < grab) {
    const sh = H && t < 94.3 ? K11B(t, 93.46, 0.8) : 0; if (sh > 0) halftoneShadow(c, K.lerp(700, boyAt[0], sh), 905, 90, 0.4);
    const P = { x: boyAt[0], y: 900, s: bs, child: true, costume: 'villager', pal: K11BPAL, dir: 1, mouth: 'smile', gaze: [0.3, 0.2] };
    if (k11in(t, 92.08, 93.0)) P.aR = [2.4, 2.8 + 0.3 * Math.sin(t * 18)];
    if (t > 93.46) { P.gaze = [0.4, -1]; P.mouth = 'o'; P.eyes = 'wide'; }
    if (t < 93.46) { const u = ((t - 90.8) / 0.45) % 1; k11Ball(c, boyAt[0] + 60, 900 - 16 - 120 * 4 * u * (1 - u), 20, t * 5); P.handR = [70, -70 - 40 * Math.abs(Math.sin(u * Math.PI))]; }
    else k11Ball(c, boyAt[0] + 60, 884, 20, 0);
    person(c, P);
  } else {   // the ball drops and bounces where the boy stood
    const d = t - grab, bx = boyAt[0] + 60 + 50 * Math.min(d, 1.4); k11Ball(c, bx, 884 - 70 * Math.abs(Math.sin(d * 5)) * Math.exp(-d * 2), 20, d * 6);
  }
  if (H) { const fl = t < 95.1 ? Math.sin(t * 10) : t < grab ? -0.8 : t < 96.62 ? Math.sin(t * 8) : Math.sin((t - 96.62) / 0.94 * 4 * Math.PI * 2);
    bird(c, { x: H[0], y: H[1], s: H[2], kind: 'hawk', fly: true, flap: fl, dir: t < 97.0 && t > 95.45 && t < grab ? -1 : 1, brow: 0.8, beak: t > 94.22 && t < 95.1 ? 1 : 0, grip: t > grab ? 1 : 0,
      carry: t > grab ? (cc) => k11carriedBoy(cc, H[2], t, swing(t, grab, 0.45, 1.6, 1.4)) : undefined }); }
}
function k11carriedBoy(cc, hs, t, sw) { const k = 1.5 / hs; cc.save(); cc.rotate(sw || 0); person(cc, { x: 0, y: 150 * 0.62 * 1.5 / hs + 10, s: k, child: true, costume: 'villager', pal: K11BPAL, dir: 1, mouth: 'open', eyes: 'wide', aL: [-2.4, -2.8], aR: [2.4, 2.8 + 0.3 * Math.sin(t * 18)], gaze: [0.5, 0.4], ph: t * 9, amp: 0.8 }); cc.restore(); }
// a cloud with a pop-in p, a pop-out at tOut (3-frame shrink), drawn in world units of the current set
function k11cloud(ctx, t, x, y, w, h, tIn, tOut, tail, inside, o = {}) {
  if (t < tIn || t > tOut + 0.12) return; const pin = K11B(t, tIn, 0.5), pout = t > tOut ? 1 - (t - tOut) / 0.12 : 1;
  ctx.save(); if (pout < 1) { ctx.translate(x, y); ctx.scale(pout, pout); ctx.translate(-x, -y); } if (o.alpha != null) ctx.globalAlpha *= o.alpha;
  thoughtCloud(ctx, x, y, w, h, t, { p: pin, tail, inside, scale: o.scale ?? 0.5, at: o.at || [520, 760], bg: o.bg, seed: o.seed ?? 3 }); ctx.restore();
  if (t > tOut) dustBurst(ctx, x, y + 40, t - tOut, 8, 14, 30, 120, 0.5, 9);
}

// ---------- world draw ----------
function k11person(ctx, P) { if (P.on === false) return; person(ctx, P);
  if (P.blush) { const [hx, hy] = k11head(P); k11Blush(ctx, hx, hy + 6 * (P.s || 1), P.blush); }
  if (P.wetSweat) { const [hx, hy] = k11head(P); k11Sweat(ctx, hx - 40 * Math.sign(P.dir || 1), hy - 20 + ((P.wetSweat * 0) + 0), 1.1); } }
function k11drawStreet(ctx, t) {
  const sc = k11sc(t), st = k11storeState(t);
  let u = null; if (sc === 3 && t > 23.02) u = 0.25 + 3 * K.ease.inOut(K11B(t, 23.02, 1.08));
  const houseDoor = sc === 2 ? K11B(t, 11.15, 0.2) - K11B(t, 12.2, 0.4) : sc === 4 ? K11B(t, 24.05, 0.15) - K11B(t, 24.7, 0.3) : sc === 5 ? K11B(t, 34.95, 0.15) - K11B(t, 35.8, 0.3) : (sc >= 10 && sc <= 11) ? 0.75 : 0;
  const mDoor = sc === 9 && t < 69.9 ? K11B(t, 69.0, 0.3) : sc === 10 ? K11B(t, 76.95, 0.2) - K11B(t, 78.2, 0.4) : 0;
  k11Street(ctx, { palette: sc === 18 ? 'dusk' : 'clear', u, t, houseDoor: K.clamp(houseDoor), mDoor: K.clamp(mDoor), store: st, bench: sc === 18 });
  if (u != null) { const d = dayCycle(u % 1); townDim(ctx, -1000, 300, 2000, 930, d.night); }
  // mouse hole at the wall foot
  shape(ctx, townArchPts(612, 640, 884, 901, 'round', 8), C.black, { lw: 0 });
  if (sc === 11) k11Sandals(ctx, 760, 902);
  if (sc === 18) k11Nail(ctx, 795, 906, 0.15);
  if (sc === 5 && t < 34.56) { /* bundle on the staff while walking */ }
  // back lane
  const pass = k11passers(t); pass.filter((p) => p.lane === 0).forEach((p) => person(ctx, p));
  // the real rat (behind the people)
  const R = k11realRat(t); if (R) { ctx.save(); if (sc === 5) { ctx.beginPath(); ctx.rect(626, 0, 600, 1230); ctx.clip(); } rat(ctx, R); ctx.restore();
    if (sc === 18 && k11in(t, 157.8, 158.3)) star(ctx, R.x - 30, R.y - 50, 18, C.yellow, t * 6); }
  k11cartDraw(ctx, t);
  // bundle dropped on arrival (S5) / on the staff (S2 from 8.94, S3, S5 walk)
  const M = k11merchant(t), F = k11friend(t), B = k11boy(t), BY = k11buyer(t);
  if (sc === 2 && k11in(t, 13.3, 21.3)) k11BundleGround(ctx, 300, 902, landSquash(t, 13.45, 0.3));
  if (sc === 5 && t >= 34.56) k11BundleGround(ctx, K11MX(t) - 60, 902, landSquash(t, 34.75, 0.3));
  const mOn = !(sc === 4 || (sc === 3 && t > 23.75) || sc === 6 || (sc === 9 && t > 69.75) || (sc === 10 && t < 77.0));
  if (sc === 3) M.alpha = K.clamp((23.75 - t) / 0.3); if (sc === 9) { M.alpha = K.clamp((69.75 - t) / 0.25); B.alpha = M.alpha; } if (sc === 10) M.alpha = K.clamp((t - 77.0) / 0.2);
  const hug = sc === 17 && k11in(t, 141.44, 143.3), order = [];
  if (BY.on) order.push([BY.x, () => person(ctx, BY)]);
  if (F.on) order.push([F.x + 1, () => k11person(ctx, F)]);
  if (B.on && !hug) order.push([B.x, () => k11person(ctx, B)]);
  if (mOn) order.push([M.x - 0.5, () => { k11person(ctx, M); const [hx, hy] = k11hand(M, 1);
    if (k11bundleOn(t)) { const [lx, ly] = k11hand(M, 0); k11Bundle(ctx, lx, ly, M.dir, swing(t, sc === 3 ? 21.8 : sc === 5 ? 32.7 : 9.0, 0.5, 1.3, 1.2) + 0.12 * Math.sin(t * 7) * (M.amp || 0)); }
    if (sc === 8) k11Basket(ctx, k11hand(M, 0)[0], k11hand(M, 0)[1] + 18, 0.9); }]);
  order.sort((p, q) => p[0] - q[0]);
  for (const [, f] of order) f();
  if (hug) k11person(ctx, B);
  // props in hands
  if (sc === 2 && k11in(t, 20.7, 21.7)) { const [hx, hy] = k11hand(F, 1); k11Key(ctx, hx, hy - 30, 0.2, 1, pulse(t, 21.0, 0.5)); }
  if (sc === 4) k11purseS4(ctx, t, F, BY);
  if (sc === 8 || (sc === 9 && t < 69.9)) { const b = K11BALL(t); k11Ball(ctx, b[0], b[1], 16, b[2]); }
  if (sc === 17) k11purseS17(ctx, t, F, M, B);
  // front lane
  pass.filter((p) => p.lane > 0).forEach((p) => person(ctx, p));
  // dust from the merchant's feet in S1
}
function k11hand(P, i) { const h = P.hands ? P.hands[i] : [0, -120], s = (P.s || 1) * (P.child ? 0.62 : 1); return [P.x + h[0] * s * Math.sign(P.dir || 1), P.y + h[1] * s]; }
function k11purseS4(ctx, t, F, BY) {
  if (k11in(t, 24.12, 25.62)) { const [hx, hy] = k11hand(F, 1); k11Purse(ctx, hx, hy + 6, { fill: 0.15, tilt: Math.PI * K11B(t, 24.3, 0.3), s: 1 });
    if (t > 24.6) { const d = t - 24.6; if (d < 0.5) k11Coin(ctx, hx, hy + 30 + 260 * d * d, 11, t * 10); else k11Coin(ctx, hx - 10, 892, 11, 1.5); }
    if (t > 24.95) { const d = t - 24.95; k11Moth(ctx, hx + 30 * d + 10 * Math.sin(t * 7), hy + 10 - 150 * d, t, 1); } }
  if (k11in(t, 25.62, 26.6)) { const d = t - 24.95; k11Moth(ctx, k11hand(F, 1)[0] + 30 * d + 10 * Math.sin(t * 7), k11hand(F, 1)[1] + 10 - 150 * d, t, 1); }
  if (k11in(t, 30.24, 31.02)) for (let i = 0; i < 3; i++) { const a = 30.32 + i * 0.22, v = K11B(t, a, 0.16, 'inOut'); if (t > a) { const [bx, by] = k11hand(BY, 1), [fx, fy] = k11hand(F, 1); k11Coin(ctx, K.lerp(bx, fx, v), K.lerp(by, fy, v) - 30 * Math.sin(Math.PI * v) - (v >= 1 ? 6 + i * 4 : 0), 10, t * 9); } }
  if (k11in(t, 31.02, 31.95)) { const [hx, hy] = k11hand(F, 1), b = 1 + 0.15 * Math.sin((t - 31.02) * 18) * K.clamp(31.6 - t); k11Purse(ctx, hx, hy - 4, { fill: 1, sx: b }); }
}
function k11purseS17(ctx, t, F, M, B) {
  if (k11in(t, 141.44, 143.3)) { const [hx, hy] = k11hand(B, 1); if (t > 142.6) shape(ctx, ell(hx + 8, hy - 4, 18, 9, 12), '#e8b25a', { lw: 3, seed: 75 }); }
  if (k11in(t, 136.74, 139.0)) { const [hx, hy] = k11hand(B, 1); shape(ctx, ell(hx + 6, hy - 6, 18, 9, 12), '#e8b25a', { lw: 3, seed: 75 }); }
  if (k11in(t, 143.8, 146.4)) { const [hx, hy] = k11hand(F, 0); k11Purse(ctx, hx, hy + 2, { fill: 1, s: 1 }); }
  if (k11in(t, 144.84, 146.34)) for (let i = 0; i < 4; i++) { const a = 144.9 + i * 0.32, v = K11B(t, a, 0.2, 'inOut'); if (t > a) { const [fx, fy] = k11hand(F, 1), [mx, my] = k11hand(M, 1); k11Coin(ctx, K.lerp(fx, mx, v), K.lerp(fy, my, v) - 30 * Math.sin(Math.PI * v) - (v >= 1 ? 4 + i * 4 : 0), 10, t * 9); } }
  if (t >= 146.34 && t < 148.24) { const v = K11B(t, 146.34, 0.3, 'inOut'), [fx, fy] = k11hand(F, 1), [mx, my] = k11hand(M, 1); k11Purse(ctx, K.lerp(fx, mx, v), K.lerp(fy, my, v) + 4 - 8 * pulse(t, 146.8, 0.3), { fill: 1 }); }
}
function k11drawStore(ctx, t) {
  k11Storeroom(ctx, { t });
  const M = k11merchant(t), F = k11friend(t);
  k11person(ctx, M); k11person(ctx, F);
  k11cloud(ctx, t, 560, 395, 620, 420, 47.86, 54.4, k11head(F), (c, tt) => k11LieInside(c, tt, 'lie'), { scale: 0.7, at: [500, 800] });
}
function k11drawHouse(ctx, t) {
  k11Interior(ctx, { t, door: K11B(t, 69.9, 0.1) - K11B(t, 70.4, 0.5) });
  const M = k11merchant(t), B = k11boy(t);
  if (t > 71.25) { const u = K11B(t, 71.5, 0.9, 'inOut'); k11Tray(ctx, 540, K.lerp(780, 856, u) - (t < 71.5 ? 0 : 0), { bread: t < 72.58 ? 1 : K.clamp(1 - (t - 72.58) / 3), dates: t < 73 ? 4 : 2 }); }
  k11person(ctx, B); k11person(ctx, M);
  if (k11in(t, 72.58, 73.6)) for (let i = 0; i < 3; i++) { const d = ((t * 2.2 + i / 3) % 1); ctx.fillStyle = '#e8b25a'; ctx.beginPath(); ctx.arc(640 + 20 * (i - 1) + 10 * d, 790 + 100 * d * d, 4, 0, 7); ctx.fill(); }
  if (k11in(t, 72.58, 75.8)) { const c = Math.sin(t * 14), [hx, hy] = k11head(B); for (const sd of [-1, 1]) if (c * sd > 0.2 || t > 73.36) shape(ctx, ell(hx + sd * 20, hy + 14, 8 + 3 * Math.abs(c), 7, 10), C.skin, { lw: 2.5, seed: 77 }); }
}
function k11drawWorld(ctx, t) {
  const w = k11world(t);
  if (w === 'store') k11drawStore(ctx, t); else if (w === 'house') k11drawHouse(ctx, t); else {
    k11drawStreet(ctx, t);
    const sc = k11sc(t), M = k11merchant(t), F = k11friend(t);
    // S12: the hawk cloud (same box, tilt and pop as the lie cloud); tail to the merchant
    if (sc === 12) k11cloud(ctx, t, 480, 395, 620, 420, 90.8, 98.5, k11head(M), (c, tt) => k11HawkInside(c, tt, 'tale'), { bg: '#7fb0ff', scale: 0.6, at: [500, 700] });
    if (sc === 14) { const fade = t > 117.0 ? 1 : 1;
      k11cloud(ctx, t, 265, 300, 410, 300, 110.4, 117.5, [K11FX(t) - 60, 640], (c, tt) => k11LieInside(c, tt, 'loop'), { scale: 0.4, alpha: fade });
      k11cloud(ctx, t, 735, 300, 410, 300, 114.58, 117.5, [K11MX(t) + 60, 640], (c, tt) => k11HawkInside(c, tt, 'loop'), { scale: 0.4, bg: '#7fb0ff' });
      if (t > 115.56) sfx(ctx, '=', 500, 300, 150, K11B(t, 115.56, 0.25), { fill: C.yellow }); }
    if (sc === 15 && t < 118.2) { ctx.save(); ctx.globalAlpha *= K.clamp((118.2 - t) / 0.9); ctx.translate(0, 40 * K11B(t, 117.24, 0.9)); k11cloud(ctx, 110.5, 265, 300, 410, 300, 110.4, 999, null, (c) => k11LieInside(c, 110.6, 'loop'), { scale: 0.4 }); k11cloud(ctx, 115.2, 735, 300, 410, 300, 114.58, 999, null, (c) => k11HawkInside(c, 115.2, 'loop'), { scale: 0.4, bg: '#7fb0ff' }); sfx(ctx, '=', 500, 300, 150, 1, { fill: C.yellow }); ctx.restore(); }
    if (sc === 16 && k11in(t, 124.66, 131.4)) { ctx.save(); ctx.globalAlpha *= K.clamp((131.4 - t) / 0.5); const flip = k11in(t, 127.6, 127.95) ? Math.abs(Math.cos(Math.PI * (t - 127.6) / 0.35)) : 1;
      ctx.translate(500, 0); ctx.scale(flip, 1); ctx.translate(-500, 0);
      k11cloud(ctx, t, 500, 310, 420, 300, 124.66, 999, k11head(F), t < 127.78 ? (c, tt) => k11LieInside(c, tt, 'confess') : (c, tt) => k11TrueInside(c, tt), { scale: 0.4, bg: t < 127.78 ? undefined : '#efdcae' });
      if (k11in(t, 125.6, 127.6)) { const k = K.ease.back(K11B(t, 125.6, 0.25)); ctx.save(); ctx.translate(500, 310); ctx.scale(k, k); seg(ctx, -110, -90, 110, 90, 22, C.red, 5); seg(ctx, -110, 90, 110, -90, 22, C.red, 5); ctx.restore(); }
      ctx.restore(); }
    if (sc === 16 && k11in(t, 133.18, 136.74)) { const a = K.clamp((136.6 - t) / 0.3);
      ctx.save(); ctx.globalAlpha *= a; const k1 = K.ease.back(K11B(t, 133.18, 0.3)); ctx.save(); ctx.translate(380, 330); ctx.scale(k1, k1); k11Stack(ctx, 0, 0, { rows: [3, 2, 1], n: 6, s: 1.2 }); ctx.restore();
      if (t > 134.0) sfx(ctx, 'OR', 500, 290, 70, K11B(t, 134.0, 0.25), { fill: C.white });
      if (t > 134.26) { const n = Math.round(6 + 15 * K11B(t, 134.94, 0.6)); const k2 = K.ease.back(K11B(t, 134.26, 0.3)); ctx.save(); ctx.translate(620, 330); ctx.scale(k2 * 1.4, k2 * 1.4); k11Coins(ctx, 0, 0, n, 11); ctx.restore(); }
      ctx.restore(); }
    if (sc === 18 && k11in(t, 155.0, 156.8)) { const u = K11B(t, 155.0, 1.8); bird(ctx, { x: K.lerp(1050, 150, u), y: 260 + 30 * Math.sin(u * 3), s: 0.4, kind: 'hawk', fly: true, flap: Math.sin(t * 7), dir: -1 }); }
  }
}

// ---------- camera ----------
const K11CAM = [
  [0, { x: 500, y: 420, zoom: 2.0 }], [0.3, { x: 500, y: 420, zoom: 2.0 }], [1.4, { x: 420, y: 685, zoom: 1.2 }], [4.3, { x: 400, y: 685, zoom: 1.3 }], [5.3, { x: 260, y: 725, zoom: 1.7 }], [8.0, { x: 270, y: 725, zoom: 1.7 }],
  [8.02, { x: 480, y: 705, zoom: 1.45 }], [10.3, { x: 480, y: 705, zoom: 1.45 }], [11.0, { x: 520, y: 705, zoom: 1.45 }], [13.6, { x: 520, y: 705, zoom: 1.45 }], [14.6, { x: 560, y: 715, zoom: 1.35 }], [16.6, { x: 560, y: 715, zoom: 1.35 }], [17.6, { x: 470, y: 705, zoom: 1.45 }], [19.85, { x: 480, y: 705, zoom: 1.45 }], [20.4, { x: 485, y: 705, zoom: 1.6 }], [21.7, { x: 485, y: 705, zoom: 1.6 }],
  [22.8, { x: 500, y: 640, zoom: 1.0 }], [24.11, { x: 500, y: 640, zoom: 1.0 }],
  [24.12, { x: 560, y: 705, zoom: 1.55 }], [28.0, { x: 560, y: 705, zoom: 1.55 }], [28.8, { x: 440, y: 705, zoom: 1.3 }], [31.0, { x: 450, y: 705, zoom: 1.3 }], [31.5, { x: 540, y: 695, zoom: 1.8 }], [32.59, { x: 540, y: 695, zoom: 1.8 }],
  [32.6, { x: 420, y: 700, zoom: 1.15 }], [34.6, { x: 420, y: 700, zoom: 1.15 }], [35.4, { x: 470, y: 705, zoom: 1.45 }], [41.5, { x: 470, y: 705, zoom: 1.45 }], [43.6, { x: 600, y: 695, zoom: 2.0 }], [44.0, { x: 600, y: 695, zoom: 2.0 }], [44.4, { x: 470, y: 705, zoom: 1.45 }], [45.81, { x: 470, y: 705, zoom: 1.45 }],
  [45.82, { x: 560, y: 690, zoom: 1.25 }], [47.6, { x: 560, y: 690, zoom: 1.25 }], [48.2, { x: 560, y: 600, zoom: 1.2 }], [53.6, { x: 560, y: 600, zoom: 1.2 }], [54.3, { x: 560, y: 680, zoom: 1.25 }], [54.71, { x: 560, y: 680, zoom: 1.25 }],
  [54.72, { x: 330, y: 685, zoom: 1.8 }], [56.8, { x: 330, y: 685, zoom: 1.8 }], [57.4, { x: 380, y: 705, zoom: 1.25 }], [59.5, { x: 380, y: 705, zoom: 1.25 }], [61.0, { x: 340, y: 710, zoom: 1.6 }], [62.39, { x: 320, y: 710, zoom: 1.6 }],
  [62.4, { x: -600, y: 705, zoom: 1.2 }], [64.6, { x: -600, y: 705, zoom: 1.2 }], [65.6, { x: -600, y: 755, zoom: 1.6 }], [67.77, { x: -600, y: 755, zoom: 1.6 }],
  [67.78, { x: -560, y: 745, zoom: 1.5 }], [69.6, { x: -380, y: 745, zoom: 1.5 }], [69.89, { x: -380, y: 745, zoom: 1.5 }], [69.9, { x: 480, y: 740, zoom: 1.8 }], [76.99, { x: 500, y: 760, zoom: 1.8 }],
];
const K11CAM2 = [
  [81.28, { x: 380, y: 705, zoom: 1.6 }], [88.91, { x: 400, y: 700, zoom: 1.7 }],
  [88.92, { x: 450, y: 705, zoom: 1.45 }], [90.6, { x: 450, y: 705, zoom: 1.45 }], [91.2, { x: 470, y: 600, zoom: 1.2 }], [98.0, { x: 470, y: 600, zoom: 1.2 }], [98.8, { x: 450, y: 705, zoom: 1.45 }], [98.97, { x: 450, y: 705, zoom: 1.45 }],
  [98.98, { x: 450, y: 705, zoom: 1.45 }], [106.11, { x: 450, y: 705, zoom: 1.45 }],
  [106.12, { x: 450, y: 705, zoom: 1.45 }], [108.2, { x: 330, y: 710, zoom: 1.9 }], [109.6, { x: 330, y: 710, zoom: 1.9 }], [110.4, { x: 500, y: 590, zoom: 1.1 }], [116.5, { x: 500, y: 590, zoom: 1.1 }], [117.23, { x: 530, y: 650, zoom: 1.45 }],
  [117.24, { x: 470, y: 690, zoom: 2.1 }], [122.75, { x: 455, y: 690, zoom: 2.4 }],
  [122.76, { x: 450, y: 690, zoom: 1.4 }], [124.4, { x: 450, y: 690, zoom: 1.4 }], [125.0, { x: 470, y: 560, zoom: 1.15 }], [131.0, { x: 470, y: 560, zoom: 1.15 }], [131.6, { x: 450, y: 680, zoom: 1.55 }], [132.6, { x: 450, y: 680, zoom: 1.55 }], [133.2, { x: 470, y: 560, zoom: 1.15 }], [135.5, { x: 470, y: 560, zoom: 1.15 }], [136.1, { x: 450, y: 690, zoom: 1.6 }], [136.73, { x: 450, y: 690, zoom: 1.6 }],
  [136.74, { x: 300, y: 705, zoom: 1.25 }], [138.4, { x: 420, y: 705, zoom: 1.25 }], [140.6, { x: 450, y: 705, zoom: 1.25 }], [141.4, { x: 570, y: 725, zoom: 1.8 }], [143.0, { x: 570, y: 725, zoom: 1.8 }], [143.8, { x: 470, y: 705, zoom: 1.45 }], [148.23, { x: 480, y: 705, zoom: 1.45 }],
  [148.24, { x: 530, y: 735, zoom: 1.5 }], [151.0, { x: 530, y: 735, zoom: 1.5 }], [156.5, { x: 520, y: 640, zoom: 1.05 }], [161.0, { x: 520, y: 640, zoom: 1.05 }],
];
function k11camAt(t) {
  let c;
  if (t < 77.0) c = K.camAt(K11CAM, t);
  else if (t < 81.28) {   // S10: track with the merchant, then lead to the friend's house front
    const mx = K11MX(t); c = { x: K.lerp(mx + 120, 470, K11B(t, 79.4, 1.5, 'inOut')), y: 705, zoom: 1.3 + 0.1 * K11B(t, 79.4, 1.5, 'inOut') };
  } else c = K.camAt(K11CAM2, t);
  const z = c.zoom, wx = k11world(t) === 'street' ? 1000 : 500;
  return { x: K.clamp(c.x, (wx === 1000 ? -1000 : 0) + 500 / z, (wx === 1000 ? 1000 : 1000) - 500 / z), y: K.clamp(c.y, 615 / z, K11VH - 615 / z), zoom: z };
}
const k11toP = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];

// ---------- lettering, labels, arrows, counters (panel coordinates) ----------
function k11lbl(ctx, S, text, x, y, t, a, b, o = {}) { if (!k11in(t, a, b)) return; ctx.save(); ctx.globalAlpha *= k11fo(t, b, 0.3); S.label(ctx, text, x, y, K11B(t, a, 0.35), { align: 'center', size: 44, fill: C.yellow, ...o }); ctx.restore(); }
function k11word(ctx, text, x, y, t, a, b, size = 84, o = {}) { if (!k11in(t, a, b)) return; ctx.save(); ctx.globalAlpha *= k11fo(t, b, 0.25); sfx(ctx, text, x, y, size, K11B(t, a, 0.15), { rot: -0.08, fill: C.yellow, ...o }); ctx.restore(); }
function k11arrow(ctx, S, from, to, t, a, b, o = {}) { if (!k11in(t, a, b)) return; ctx.save(); ctx.globalAlpha *= k11fo(t, b, 0.3); S.arrow(ctx, from, to, K11B(t, a, 0.35, 'out'), { width: 14, bend: 0.15, ...o }); ctx.restore(); }
function k11overlays(ctx, t, cam, S) {
  const P = (x, y) => k11toP(x, y, cam), M = k11merchant(t), F = k11friend(t), B = k11boy(t), mh = k11head(M), fh = k11head(F), bh = k11head(B);
  // S1
  if (t < 3.0) { const [x, y] = P(mh[0], mh[1] - 120); k11lbl(ctx, S, 'THE MERCHANT', Math.max(250, Math.min(750, x + 120)), Math.max(140, y - 60), t, 1.5, 3.0, { size: 46 }); k11arrow(ctx, S, [Math.max(250, Math.min(750, x + 120)), Math.max(170, y - 30)], [x, y + 50], t, 1.6, 3.0); }
  if (k11in(t, 4.44, 6.4)) { const [x, y] = P(160, 600); ctx.save(); ctx.globalAlpha *= k11fo(t, 6.4, 0.3); S.counter(ctx, Math.round(100 * K11B(t, 4.44, 1.4, 'out')), x, y - 40, K11B(t, 4.44, 0.3), { size: 70 }); ctx.restore(); }
  if (k11in(t, 5.1, 6.4)) { const [x, y] = P(330, 560); k11lbl(ctx, S, 'IRON', x + 120, y - 40, t, 5.1, 6.4, { size: 52 }); k11arrow(ctx, S, [x + 90, y - 10], P(220, 690), t, 5.2, 6.4); }
  if (k11in(t, 7.5, 8.02)) { const [x, y] = P(160, 640); k11word(ctx, 'CLANK!', x, y, t, 7.5, 8.02, 80); }
  // S2
  if (k11in(t, 8.02, 8.94)) { const [x, y] = P(mh[0], mh[1]); ctx.save(); ctx.globalAlpha *= k11fo(t, 8.94, 0.2); thoughtCloud(ctx, x + 170, y - 190, 200, 150, t, { p: K11B(t, 8.05, 0.4), tail: [x + 30, y - 40], inside: (c) => { seg(c, -50, 40, 40, -45, 6, '#8a5a14', 2.5); shape(c, ell(-40, 10, 26, 22, 16), C.red, { lw: 4, seed: 80, dot: C.yellow, pitch: 7, rad: 0.2, da: 0.4 }); }, at: [0, 0], scale: 1 }); ctx.restore(); }
  if (k11in(t, 8.94, 10.4)) { const [x, y] = P(mh[0] + 140, mh[1] - 40); k11lbl(ctx, S, 'TRAVEL', Math.min(820, x + 60), y - 70, t, 9.2, 10.4, { size: 46 }); k11arrow(ctx, S, [Math.min(820, x + 60), y - 40], [960, y - 10], t, 9.3, 10.4, { bend: -0.1 }); }
  if (k11in(t, 11.58, 13.2)) { const [x, y] = P(fh[0], fh[1] - 80); k11lbl(ctx, S, 'OLD FRIEND', Math.min(800, x + 40), y - 70, t, 11.58, 13.2); k11arrow(ctx, S, [Math.min(800, x + 40), y - 40], [x, y + 20], t, 11.7, 13.2, { bend: 0.1 }); }
  if (k11in(t, 16.9, 17.5)) { const [x, y] = P(515, 640); k11word(ctx, 'CLUNK!', x, y - 50, t, 16.9, 17.5, 80); }
  // S3: the months
  if (k11in(t, 23.02, 24.3)) { const m = Math.min(3, 1 + Math.floor((t - 23.02) / 0.36)), d = ((t - 23.02) / 0.36) % 1; ctx.save(); ctx.globalAlpha *= k11fo(t, 24.3, 0.25);
    S.counter(ctx, m, 560, 200 - 6 * Math.exp(-d * 8), K11B(t, 23.02, 0.25), { size: 72 }); S.label(ctx, 'MONTHS', 360, 210, K11B(t, 23.1, 0.3), { align: 'center', size: 46, fill: C.white }); shape(ctx, [...K.circlePts(680, 190, 26, 26, 20, -1.2, 2.4)], C.yellow, { lw: 4, seed: 9 }); ctx.restore(); }
  // S4
  if (k11in(t, 27.38, 28.0)) { const [x, y] = P(fh[0], fh[1] - 95); ctx.save(); ctx.globalAlpha *= k11fo(t, 28.0, 0.2); const k = K.ease.back(K11B(t, 27.38, 0.2)); ctx.translate(x, y); ctx.scale(k, k); k11Coin(ctx, -20, 0, 22, 0); sfx(ctx, '?', 26, -4, 60, 1, { fill: C.white }); ctx.restore(); }
  // S5: the merchant's question balloon
  if (k11in(t, 35.64, 36.7)) { const [x, y] = P(mh[0], mh[1]); ctx.save(); ctx.globalAlpha *= k11fo(t, 36.7, 0.2); bubble(ctx, x - 20, y - 190, 210, 130, x + 10, y - 50, K11B(t, 35.64, 0.3), ''); if (t > 35.8) { k11Ingot(ctx, x - 80, y - 170, 60, 30, {}); sfx(ctx, '?', x + 40, y - 190, 70, K11B(t, 35.8, 0.2), { fill: C.red }); } ctx.restore(); }
  // S6
  if (k11in(t, 48.7, 49.6)) { const [x, y] = P(420, 330); k11lbl(ctx, S, 'IRON', x, y, t, 48.7, 49.6, { size: 44 }); k11arrow(ctx, S, [x + 30, y + 25], P(510, 440), t, 48.8, 49.6, { bend: -0.2 }); }
  if (k11in(t, 52.6, 53.4)) { const [x, y] = P(600, 270); k11word(ctx, 'CRUNCH!', x, y, t, 52.6, 53.4, 80); }
  if (k11in(t, 54.1, 54.7)) { const [x, y] = P(700, 300); k11word(ctx, 'BURP!', x, y, t, 54.1, 54.7, 78, { fill: GREEN2 }); }
  // S8
  if (k11in(t, 65.62, 67.1)) { const [x, y] = P(bh[0], bh[1] - 60); k11lbl(ctx, S, "THE FRIEND'S SON", Math.min(720, Math.max(280, x)), y - 110, t, 65.62, 67.1, { size: 42 }); k11arrow(ctx, S, [Math.min(720, Math.max(280, x)), y - 80], [x, y + 10], t, 65.7, 67.1, { bend: 0.1 }); }
  // S9
  if (k11in(t, 70.3, 71.6)) { const [x, y] = P(640, 800); k11lbl(ctx, S, 'SAFE PLACE', x - 80, y - 330, t, 70.3, 71.6); k11arrow(ctx, S, [x - 80, y - 300], [x, y - 30], t, 70.4, 71.6, { bend: 0.15 }); }
  if (k11in(t, 72.8, 73.6)) { const [x, y] = P(bh[0], bh[1]); k11word(ctx, 'YUM!', x + 110, y - 100, t, 72.8, 73.6, 76); }
  // S10: ALONE and the dotted outline
  if (k11in(t, 78.96, 80.2)) { const gx = K11MX(t) - 80, a = K.clamp((t - 78.96) / 0.2) * K.clamp((79.9 - t) / 0.4), [x, y] = P(gx, 900); ctx.save(); ctx.translate(0, 0);
    const c2 = cam; ctx.save(); ctx.translate(500, 615); ctx.scale(c2.zoom, c2.zoom); ctx.translate(-c2.x, -c2.y); k11Ghost(ctx, gx, 900, 1, a, K11MX(t) / 12); ctx.restore(); ctx.restore();
    k11lbl(ctx, S, 'ALONE', x, y - 300 * cam.zoom, t, 78.96, 80.2); k11arrow(ctx, S, [x, y - 270 * cam.zoom], [x, y - 170 * cam.zoom], t, 79.05, 80.2, { bend: 0 }); }
  // S11: the father's balloon (the boy's face and a question mark), sweat drops
  if (k11in(t, 84.44, 85.6)) { const [x, y] = P(fh[0], fh[1]); ctx.save(); ctx.globalAlpha *= k11fo(t, 85.6, 0.2); bubble(ctx, x + 40, y - 210, 230, 160, x + 10, y - 60, K11B(t, 84.44, 0.3), '');
    if (t > 84.6) { ctx.save(); ctx.translate(x - 10, y - 160); const k = K11B(t, 84.6, 0.2); ctx.scale(k, k); person(ctx, { x: 0, y: 90, s: 0.9, child: true, costume: 'villager', pal: K11BPAL, mouth: 'smile', gaze: [0, 0.1], lid: 0 }); ctx.restore(); sfx(ctx, '?', x + 110, y - 215, 74, K11B(t, 84.7, 0.2), { fill: C.red }); } ctx.restore(); }
  if (k11in(t, 83.7, 88.9)) { const [x, y] = P(fh[0], fh[1]); for (let i = 0; i < 2; i++) { const d = ((t * 0.9 + i * 0.5) % 1); ctx.save(); ctx.globalAlpha *= 1 - d; k11Sweat(ctx, x + (i ? 40 : -44) * cam.zoom, y - 30 * cam.zoom + 60 * d, cam.zoom); ctx.restore(); } }
  // S12
  if (k11in(t, 94.22, 95.2)) { const [x, y] = P(480, 200); k11lbl(ctx, S, 'BIG HAWK', 820, Math.max(110, y - 20), t, 94.22, 95.2, { size: 44 }); k11arrow(ctx, S, [780, Math.max(140, y + 10)], P(600, 330), t, 94.3, 95.2); }
  if (k11in(t, 96.9, 97.9)) { const [x, y] = P(620, 250); k11word(ctx, 'WHEEE!', x, y, t, 96.9, 97.9, 70, { fill: C.white }); }
  // S13
  if (k11in(t, 101.6, 103.2)) { ctx.save(); ctx.globalAlpha *= k11fo(t, 103.2, 0.3); S.emphasis(ctx, 720, 250, 190, K11B(t, 101.6, 0.4), { word: '!!', wx: 0.9, wy: 0.6 }); sfx(ctx, 'IMPOSSIBLE!', 720, 250, 92, K11B(t, 101.6, 0.15), { rot: -0.06, fill: C.yellow }); ctx.restore(); }
  // S14
  if (k11in(t, 112.24, 117.3)) { const [x, y] = P(265, 470); k11lbl(ctx, S, 'RATS EAT IRON', Math.max(220, x), y, t, 112.24, 117.3, { size: 42 }); }
  if (k11in(t, 114.58, 117.3)) { const [x, y] = P(735, 470); k11lbl(ctx, S, 'HAWKS CARRY BOYS', Math.min(780, x), y + 0, t, 114.6, 117.3, { size: 40 }); }
  // S15
  if (k11in(t, 121.1, 122.76)) { const [x, y] = P(fh[0], fh[1] - 110); k11lbl(ctx, S, 'HE KNOWS!', Math.min(760, x + 30), Math.max(130, y - 50), t, 121.1, 122.76, { size: 48, fill: C.red, color: C.white }); }
  // S17
  if (k11in(t, 139.02, 140.4)) { const [x, y] = P(bh[0], bh[1] - 60); k11lbl(ctx, S, 'SAFE!', x - 40, y - 120, t, 139.02, 140.4, { size: 54, fill: C.white }); k11arrow(ctx, S, [x - 40, y - 90], [x, y], t, 139.1, 140.4, { bend: 0.15 }); }
  if (k11in(t, 141.44, 143.0)) { const [x, y] = P(K11FX(t) - 20, 640); const u = (t - 141.44) / 1.56; heart(ctx, x, y - 160 * u, 34 + 10 * Math.sin(t * 8), { alpha: 1 - u * u }); }
  if (k11in(t, 147.8, 148.6)) { const [x, y] = P(450, 600); ctx.save(); ctx.translate(x, y - 40); ctx.rotate(-0.12); const k = K.ease.back(K11B(t, 147.8, 0.15)); ctx.scale(k, k); ctx.globalAlpha *= k11fo(t, 148.6, 0.2); shape(ctx, K.rectPts(-200, -46, 400, 92), C.paper, { lw: 0 }); ctx.strokeStyle = C.red; ctx.lineWidth = 9; ctx.strokeRect(-196, -42, 392, 84); ctx.font = K.font(64, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = C.red; ctx.fillText('PAID IN FULL!', 0, 4); ctx.restore(); }
  // S18
  if (k11in(t, 157.8, 158.5)) { const R = k11realRat(t); if (R) { const [x, y] = P(R.x, R.y - 60); k11word(ctx, 'TINK!', x - 60, y - 40, t, 157.8, 158.5, 56, { fill: C.white }); } }
  if (k11in(t, 158.25, 159.3)) { const R = k11realRat(t); const [x, y] = P(R ? R.x : 900, 820); k11word(ctx, 'OW!', Math.min(900, x + 40), y - 110, t, 158.25, 159.3, 60, { fill: C.red }); }
  if (t >= 158.6) S.title(ctx, 'THE END', 500, 230, K11B(t, 158.6, 0.8), { size: 84, align: 'center' });
}

// panel-only shake: IMPOSSIBLE! (and a tiny one on the door slam)
const K11SHAKE = (t) => K.spring(t, 101.6, 7, 9, 6) + K.spring(t, 16.95, 2.5, 10, 8);
function k11render(ctx, t, cam) { ctx.save(); K.camera(ctx, K11VW, K11VH, cam); k11drawWorld(ctx, t); ctx.restore(); }
const SCENE = {
  duration: K11DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196, sh = K11SHAKE(t);
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh * 0.8, py - sh * 0.5); ctx.scale(pw / K11VW, ph / K11VH);
    const cam = k11camAt(t);
    if (k11in(t, 24.12, 24.6)) { k11render(ctx, t, k11camAt(24.11)); ctx.save(); ctx.globalAlpha = K.ease.inOut((t - 24.12) / 0.48); k11render(ctx, t, cam); ctx.restore(); }   // dissolve out of the months
    else if (k11in(t, 32.6, 33.05)) { const e = K.ease.inOut((t - 32.6) / 0.45) * 1100 - 50; k11render(ctx, 32.59, k11camAt(32.59)); ctx.save(); ctx.beginPath(); ctx.rect(-10, -10, e + 10, K11VH + 20); ctx.clip(); k11render(ctx, t, cam); ctx.restore(); ctx.save(); ctx.fillStyle = C.black; ctx.fillRect(e - 6, -10, 12, K11VH + 20); ctx.restore(); }   // wipe to the return
    else k11render(ctx, t, cam);
    k11overlays(ctx, t, cam, S);
    if (k11in(t, 61.62, 63.2)) S.transition(ctx, K11VW, K11VH, (t - 61.62) / 1.58, { caption: 'A FEW DAYS LATER...' });
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // only in narration pauses, quiet (master 0.6 at render)
    k.bed(S.sfx.bed, 0, K11DUR, 0.5);
    k.play('thud', 7.5, { gain: 0.4 }); k.play('stamp', 7.55, { gain: 0.25 });          // CLANK (gap 7.30-8.28)
    k.play('thud', 16.95, { gain: 0.45 }); k.play('tick', 17.2, { gain: 0.3 });         // CLUNK, padlock (gap 16.64-17.71)
    k.play('chime', 21.05, { note: 'E6', gain: 0.35 });                                  // key glint (gap 20.64-21.93)
    k.play('chime', 23.75, { note: 'A5', gain: 0.35 });                                  // months (gap 23.68-24.21)
    k.play('pop', 54.3, { pitch: 0.6, gain: 0.45 });                                     // burp, cloud pops (gap 54.04-54.84)
    k.play('whoosh', 98.55, { dur: 0.35, gain: 0.3 });                                   // hawk away, cloud pops (gap 98.40-99.75)
    k.play('paper', 127.6, { gain: 0.25 });                                              // the cloud page flips (gap 127.40-128.29)
    k.play('chime', 136.35, { note: 'C6', gain: 0.4 });                                  // forgiven (gap 135.92-137.14)
    k.play('tick', 157.8, { gain: 0.45 }); k.play('pop', 158.3, { pitch: 1.4, gain: 0.3 });   // TINK! OW! (after the last word)
    k.play('stamp', 158.6, { gain: 0.45 }); k.play('chime', 158.75, { note: 'C6', gain: 0.55 });
  },
};
window.SCENE = SCENE;
