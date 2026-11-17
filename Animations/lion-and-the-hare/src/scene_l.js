// ===== the story: the lion and the hare =====
// Every cue is taken from the narration's word times (TIMING.words): w(p, n) = start of word n of paragraph p.
const WW = 1000, WH = 1230, GR = 900, WG = 520;
const WP = [0, 1, 2, 3, 4, 5, 6, 7].map((p) => TIMING.words.filter((x) => x.p === p));
const w = (p, n) => WP[p][n].a, we = (p, n) => WP[p][n].b, pe = (p) => WP[p][WP[p].length - 1].b;
const END = pe(7), DUR = Math.round((END + 2.9) * 10) / 10;
const TL0 = pe(1) + 0.1, TL = TL0 + 0.8, T_DEN = w(3, 0) - 0.45, T_WELL = w(5, 0) - 0.45, T_HOME = w(7, 0) - 0.45;
const setAt = (t) => (t < TL ? 0 : t < T_DEN ? 1 : t < T_WELL ? 2 : t < T_HOME ? 3 : 4);
const arc = (t, t0, d, h) => (t > t0 && t < t0 + d ? Math.sin(Math.PI * (t - t0) / d) * h : 0);
const hopY = (u, h) => Math.abs(Math.sin(u * Math.PI)) * h;
const vel = (keys, t) => (kfn(t + 0.05, keys) - kfn(t - 0.05, keys)) / 0.1;
const B = (t, a, d) => K.beat(t, a, d, 'lin');
const between = (t, a, b) => t >= a && t < b;
const toPanel = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];
const fx = (ctx, t, a, b, text, x, y, size, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha = K.clamp((b - t) / 0.3); sfx(ctx, text, x, y, size, B(t, a, 0.15), o); ctx.restore(); };
const say = (ctx, t, a, b, cx, cy, wd, ht, tx, ty, text, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha = K.clamp((b - t) / 0.2); bubble(ctx, cx, cy, wd, ht, tx, ty, B(t, a, 0.25), text, o); ctx.restore(); };
function layer1(key, wd, ht, draw) { return K.cached(key, () => { const c = K.layer(wd * 2, ht * 2), x = c.getContext('2d'); x.scale(2, 2); draw(x); return c; }); }

// ---------- sets ----------
const skyL = (key, base, dot, hills) => layer1('sky' + key, WW, 920, (x) => { x.fillStyle = base; x.fillRect(0, 0, WW, 920); x.fillStyle = dotPat(x, dot, 13, 0.3); x.fillRect(0, 0, WW, 920); for (const [bx, by, br, col] of hills) { x.beginPath(); x.ellipse(bx, by, br, br * 0.5, 0, Math.PI, 0); x.fillStyle = col; x.fill(); x.lineWidth = 6; x.strokeStyle = C.black; x.stroke(); } });
const skyDay = () => skyL('day', C.blue, '#3f7be6', [[150, 880, 260, '#2a62c9'], [560, 900, 300, '#2457b8'], [940, 880, 250, '#2a62c9']]);
const skyDawn = () => skyL('dawn', C.yellow, '#ff9a2a', [[150, 880, 260, '#f08a1a'], [560, 900, 300, '#e2701a'], [940, 880, 250, '#f08a1a']]);
const groundL = () => layer1('ground', WW, WH, (x) => { shape(x, [[-10, GR], [1010, GR], [1010, WH], [-10, WH]], '#d9a441', { lw: 8, seed: 20, dot: C.red, pitch: 11, rad: 0.2, da: 0.5 }); shape(x, [[-10, GR - 8], [1010, GR - 8], [1010, GR + 22], [-10, GR + 22]], GREEN, { lw: 6, seed: 21, dot: GREEND, pitch: 8, rad: 0.2 }); for (let px = 4; px < 1010; px += 26) seg(x, px, GR - 8, px + 4, GR - 22, 5, GREEN2, 2.5); });
const treeBack = () => layer1('trees', WW, GR + 10, (x) => { const r = K.rng(8); for (let i = 0; i < 9; i++) { const tx = 20 + i * 118 + r() * 30, h = 380 + r() * 140; x.fillStyle = WOOD; x.fillRect(tx - 18, GR - h, 36, h); x.lineWidth = 6; x.strokeStyle = C.black; x.strokeRect(tx - 18, GR - h, 36, h); for (const [dx, dy, cr] of [[0, 0, 70], [-46, 40, 52], [46, 40, 52]]) { x.beginPath(); x.arc(tx + dx, GR - h + dy, cr, 0, 7); x.fillStyle = GREEND; x.fill(); x.lineWidth = 7; x.strokeStyle = C.black; x.stroke(); } } });
const BUSH = [{ x: 190, w: 300, h: 170, seed: 3 }, { x: 520, w: 270, h: 150, seed: 7 }];
const bushL = (i) => layer1('bush' + i, WW, GR + 30, (x) => {
  const b = BUSH[i], r = K.rng(b.seed), cs = [];
  for (let k = 0; k < 8; k++) { const u = (k + 0.5) / 8; cs.push([b.x - b.w / 2 + u * b.w, GR - b.h * (0.5 + 0.42 * Math.sin(Math.PI * u)) + r() * 12, b.w / 8 * 1.15 + r() * 10]); }
  for (let k = 0; k < 6; k++) { const u = (k + 0.5) / 6; cs.push([b.x - b.w / 2 + 24 + u * (b.w - 48), GR - 44 - r() * 16, 52]); }
  x.lineWidth = 16; x.strokeStyle = C.black; for (const [cx, cy, cr] of cs) { x.beginPath(); x.arc(cx, cy, cr, 0, 7); x.stroke(); }
  for (const f of [GREEN, dotPat(x, GREEND, 11, 0.28)]) { x.fillStyle = f; for (const [cx, cy, cr] of cs) { x.beginPath(); x.arc(cx, cy, cr, 0, 7); x.fill(); } x.fillRect(b.x - b.w / 2 + 10, GR - b.h * 0.5, b.w - 20, b.h * 0.5 - 10); }
  x.lineWidth = 5; x.strokeStyle = C.black; x.lineCap = 'round'; for (let k = 0; k < 5; k++) { const cx = b.x - b.w / 2 + 40 + r() * (b.w - 80), cy = GR - 50 - r() * (b.h * 0.6); x.beginPath(); x.arc(cx, cy, 20, 3.5, 5.2); x.stroke(); }
});
const denL = () => layer1('den', WW, WH, (x) => {
  shape(x, [[400, GR + 6], [450, 560], [560, 370], [700, 280], [860, 300], [1010, 220], [1010, GR + 6], [400, GR + 6]], STONE, { lw: 10, seed: 60, dot: STONED, pitch: 12, rad: 0.22, da: 0.7 });
  const cm = []; for (let i = 0; i <= 24; i++) { const a = Math.PI + i / 24 * Math.PI; cm.push([770 + Math.cos(a) * 240, GR + 6 + Math.sin(a) * 440]); } cm.push(cm[0]);
  shape(x, cm, NAVY2, { lw: 9, seed: 61, dot: '#1b3a8f', pitch: 12, rad: 0.25 });
  x.lineWidth = 6; x.strokeStyle = C.black; x.lineCap = 'round'; for (const [ax, ay, bx, by] of [[470, 600, 500, 520], [600, 380, 640, 330], [900, 330, 950, 290], [440, 760, 460, 700]]) { x.beginPath(); x.moveTo(ax, ay); x.lineTo(bx, by); x.stroke(); }
  for (const [bx, by, a] of [[120, GR + 90, -0.2], [300, GR + 150, 0.3], [560, GR + 120, -0.1], [820, GR + 170, 0.2]]) { const dx = Math.cos(a) * 34, dy = Math.sin(a) * 34; seg(x, bx - dx, by - dy, bx + dx, by + dy, 9, C.white, 4); for (const sd of [-1, 1]) { shape(x, ell(bx + sd * dx - 5, by + sd * dy - 6, 8, 8, 10), C.white, { lw: 3.5, seed: 4 }); shape(x, ell(bx + sd * dx + 5, by + sd * dy + 6, 8, 8, 10), C.white, { lw: 3.5, seed: 4 }); } }
  seg(x, 150, GR + 4, 160, 560, 30, WOOD, 5); seg(x, 158, 640, 80, 520, 16, WOOD, 4.5); seg(x, 160, 590, 240, 490, 16, WOOD, 4.5); seg(x, 110, 566, 96, 480, 10, WOOD, 4); seg(x, 214, 522, 262, 500, 9, WOOD, 4);
});
const SH = { x0: 560, x1: 800, cx: 680, wat: 1010, rim: WG - 66 };
const earthL = () => layer1('earth', WW, WH, (x) => {
  shape(x, [[-10, WG], [1010, WG], [1010, WH + 10], [-10, WH + 10], [-10, WG]], EARTH, { lw: 0, dot: EARTHD, pitch: 12, rad: 0.22, da: 0.7 });
  const r = K.rng(5); for (let i = 0; i < 22; i++) { const sx = r() * 1000, sy = WG + 90 + r() * 600; if (sx > 490 && sx < 870) continue; shape(x, ell(sx, sy, 20 + r() * 26, 12 + r() * 12, 12), STONE, { lw: 4, seed: 70 + i, dot: STONED, pitch: 9, rad: 0.2, da: 0.5 }); }
  x.fillStyle = NAVY2; x.fillRect(SH.x0, WG, SH.x1 - SH.x0, WH); x.fillStyle = dotPat(x, '#1b3a8f', 12, 0.25); x.fillRect(SH.x0, WG, SH.x1 - SH.x0, WH);
  for (const bx of [SH.x0 - 36, SH.x1]) for (let by = SH.rim, k = 0; by < WH; by += 46, k++) shape(x, K.rectPts(bx + (k % 2 ? 2 : -2), by, 36, 46), k % 2 ? STONE : STONE2, { lw: 4, seed: 80 + k, dot: STONED, pitch: 9, rad: 0.2, da: 0.5 });
  for (const [a, b] of [[-10, SH.x0 - 38], [SH.x1 + 38, 1010]]) { shape(x, [[a, WG - 8], [b, WG - 8], [b, WG + 20], [a, WG + 20], [a, WG - 8]], GREEN, { lw: 5, seed: 21, dot: GREEND, pitch: 8, rad: 0.2 }); for (let px = a + 6; px < b - 4; px += 26) seg(x, px, WG - 8, px + 4, WG - 22, 5, GREEN2, 2.5); }
  // bucket and rope beside the well
  shape(x, [[880, WG - 56], [940, WG - 56], [932, WG - 4], [888, WG - 4], [880, WG - 56]], WOOD, { lw: 5, seed: 90, dot: C.black, pitch: 8, rad: 0.16, da: 0.4 });
  x.lineWidth = 6; x.strokeStyle = C.black; x.beginPath(); x.arc(910, WG - 56, 30, Math.PI, 0); x.stroke();
});
function drawSun(ctx, x, y, t) { for (let i = 0; i < 14; i++) { const a = i * Math.PI / 7 + t * 0.25; seg(ctx, x + Math.cos(a) * 88, y + Math.sin(a) * 88, x + Math.cos(a) * 118, y + Math.sin(a) * 118, 9, C.yellow, 4); } shape(ctx, ell(x, y, 70, 70, 40), C.yellow, { lw: 8, seed: 40, dot: C.red, pitch: 9, rad: 0.2, da: 0.55 }); }
function cloudFlat(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const cs = [[-60, 6, 38], [-18, -16, 46], [30, -8, 40], [66, 8, 30]]; ctx.lineWidth = 8; ctx.strokeStyle = C.black; for (const [cx, cy, r] of cs) { ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke(); } ctx.fillStyle = C.white; for (const [cx, cy, r] of cs) { ctx.beginPath(); ctx.arc(cx, cy, r - 3, 0, 7); ctx.fill(); } ctx.fillRect(-60, 6, 126, 32); ctx.restore(); }
const skyTop = (ctx, L) => ctx.drawImage(L, 0, 0, WW * 2, 520, 0, -260, WW, 260);
function forestBase(ctx, t, o = {}) {
  ctx.drawImage(skyDay(), 0, 0, WW, 920); skyTop(ctx, skyDay());
  if (o.dawnY != null && o.dawnY < 920) { ctx.save(); ctx.beginPath(); ctx.rect(0, o.dawnY, WW, 1200); ctx.clip(); ctx.drawImage(skyDawn(), 0, 0, WW, 920); skyTop(ctx, skyDawn()); ctx.restore(); if (o.dawnY > -260) { ctx.fillStyle = C.black; ctx.fillRect(0, o.dawnY - 4, WW, 8); } }
  drawSun(ctx, o.sunX ?? 850, o.sunY ?? 180, t); cloudFlat(ctx, 320 + ((t * 4) % 1100), 250, 0.9); cloudFlat(ctx, ((t * 2.5 + 700) % 1300) - 150, 370, 0.7);
  ctx.drawImage(treeBack(), 0, 0, WW, GR + 10); ctx.drawImage(groundL(), 0, 0, WW, WH);
}
const bushes = (ctx, sh) => BUSH.forEach((b, i) => ctx.drawImage(bushL(i), sh[i] || 0, 0, WW, GR + 30));

// ---------- set 0: the forest (paragraphs 1 and 2) ----------
const F0 = { roar: w(0, 5), flee: w(0, 13), hid: w(0, 17) + 0.4, prowl: w(0, 18), turn: w(0, 23) + 0.4, out: w(1, 0) - 0.15, lion: w(1, 3), say: w(1, 8), iff: w(1, 16), ok: w(1, 22), calm: w(1, 24) };
const LK0 = [[0, 1340], [Math.max(0.6, w(0, 3) - 0.6), 1340], [F0.roar, 850], [w(0, 8), 850], [F0.flee - 0.25, 850], [F0.flee + 0.35, 780], [F0.prowl, 700], [17.7, 620], [18.3, 620], [w(0, 22), 450], [F0.turn, 450], [pe(0) + 0.9, 1350], [F0.lion, 1350], [w(1, 6), 860], [F0.calm + 0.3, 860], [pe(1) + 0.4, 1350]];
function lion0(t) {
  const x = kfn(t, LK0), v = vel(LK0, t), P = { x, y: GR + 2, s: 1.15, dir: turnFlip(t, [[0, -1], [F0.turn - 0.35, 1], [F0.lion - 1.35, -1], [F0.calm, 1]], 0.7).dir, ph: x / 26, amp: K.clamp(Math.abs(v) / 60), tw: t * 3, brow: 0.8, tailUp: 0.4 };
  if (t >= F0.roar && t < F0.flee) { P.roar = K.env(t, F0.roar, we(0, 7) + 0.6, 0.15, 0.3); P.puff = 1 + 0.12 * P.roar; P.nod = -0.25 * P.roar; P.shake = P.roar > 0.5 ? t : 0; }
  // stalk (crouched, slow, tail still, eyes on the deer), anticipation, pounce on "فتجري" and snap on air
  if (t >= w(0, 8) && t < F0.flee) { P.crouch = 0.5 + 0.3 * K.beat(t, F0.flee - 0.3, 0.25); P.tailUp = 0.2; P.tw = 0; P.gaze = [-1, 0.2]; P.mouth = 'frown'; }
  if (t >= F0.flee && t < F0.flee + 0.7) { P.crouch = 0; P.y -= arc(t, F0.flee, 0.35, 40); P.roar = pulse(t, F0.flee + 0.15, 0.4); P.reach = 30 * pulse(t, F0.flee, 0.5); }
  if (t >= F0.flee + 0.7 && t < F0.prowl) P.mouth = 'frown';
  if (t >= F0.prowl && t < F0.turn) { P.nod = 0.3 + 0.08 * Math.sin(t * 6) + 0.1 * Math.max(0, Math.sin(t * 9)); P.drop = 20; P.mouth = 'frown'; P.tailUp = 0.2; }
  if (t >= F0.turn && t < F0.lion - 1) { P.mouth = 'smile'; P.brow = 0.4; P.tailUp = 0.8; }
  if (t >= F0.lion - 1 && t < F0.iff) { P.brow = 0.6; P.mouth = 'frown'; }
  if (t >= F0.iff && t < F0.ok) { P.raise = K.beat(t, F0.iff + 0.5, 0.5); P.brow = 0.2; P.eyes = 'squint'; P.nod = -0.1; }
  if (t >= F0.ok && t < F0.calm + 0.3) { P.talk = talk(t, [[F0.ok, we(1, 23)]]); P.mouth = 'smile'; P.brow = 0; P.nod = t < F0.ok + 1.5 ? 0.25 * Math.max(0, Math.sin((t - F0.ok) * 7)) : 0; }
  if (t >= F0.calm + 0.3) { P.mouth = 'smile'; P.brow = 0; P.tailUp = 0.7; }
  return P;
}
function draw0(ctx, t, cam) {
  forestBase(ctx, t);
  const L = lion0(t), back = [], front = [], st = t >= F0.roar && t < F0.flee, hidden = t >= F0.flee && t < F0.out + 1.2, calm = t >= F0.calm, huddle = t >= F0.out + 1.2 && t < F0.lion;
  const face = st || hidden ? 'wide' : 'open', jump = st ? arc(t, F0.roar + 0.05, 0.35, 40) : 0, lhx = L.x + L.dir * 138;
  { // deer
    const KD = [[0, 360], [F0.roar + 0.3, 360], [F0.roar + 2.3, 290], [F0.flee, 290], [F0.flee + 1.1, 185], [F0.out, 185], [F0.out + 1.3, 250]], x = kfn(t, KD), v = vel(KD, t), sink = kfn(t, [[F0.flee + 0.7, 0], [F0.flee + 1.2, 110], [F0.out, 110], [F0.out + 0.5, 0]]), beh = t >= F0.flee + 0.3 && t < F0.out + 0.5;
    const P = { x, y: GR + 2 + sink - jump - (calm ? hopY(t / 0.5 + 0.3, 22) : 0), s: 0.95, dir: t >= F0.flee && t < F0.out ? -1 : 1, ph: x / 14, amp: K.clamp(Math.abs(v) / 50), graze: 1 - K.beat(t, F0.roar - 0.6, 0.25), tip: st ? -0.1 * K.beat(t, F0.roar, 0.3) : 0, eyes: face, shake: beh && t > F0.hid ? t : 0, talk: talk(t, [[w(1, 10), we(1, 15)], [F0.iff, we(1, 21)]]), mouth: calm ? 'smile' : 'closed' };
    (beh ? back : front).push(() => deer(ctx, P));
  }
  const hareAct = (pal, home, hideX, outX, td, tj, s, o = {}) => {
    const x = kfn(t, [[F0.roar + 0.3, home], [F0.roar + 2.4, home - 70], [td, home - 70], [td + 0.6, hideX], [tj, hideX], [tj + 0.6, outX]]), beh = t >= td + 0.3 && t < tj + 0.3;
    const y = GR + 2 - arc(t, td, 0.6, 120) - arc(t, tj, 0.6, 170) - jump - (t < F0.roar - 0.3 && Math.sin(t * 1.3 + pal * 2) > 0 ? hopY(t / 0.6 + pal * 0.3, 16) : 0) - (calm ? hopY(t / 0.45 + pal * 0.37, 34) : 0);
    const P = { x, y, s, pal, dir: 1, ears: st || hidden ? -0.3 : 1, eyes: face, mouth: calm ? 'smile' : st ? 'o' : 'closed', shake: (st && !jump) || (beh && t > F0.hid) ? t : 0, ...o };
    (beh ? back : front).push(() => hare(ctx, P));
  };
  hareAct(1, 250, 265, 415, F0.flee + 0.3, F0.out + 0.2, 0.85);
  hareAct(0, 470, 480, 505, F0.flee + 0.75, F0.out, 0.72, { dir: huddle ? -1 : 1, raise: t >= F0.say && t < F0.ok ? 0.7 : 0, talk: talk(t, [[F0.say, we(1, 9)]]) });
  hareAct(2, 600, 585, 595, F0.flee + 0.45, F0.out + 0.4, 0.85, { dir: huddle ? -1 : 1 });
  { // fox bolts first
    const KF = [[0, 740], [Math.max(0.5, w(0, 3) - 0.8), 740], [F0.roar + 0.5, -240]], x = kfn(t, KF), v = vel(KF, t);
    if (x > -230) front.push(() => fox(ctx, { x, y: GR + 2, s: 0.9, dir: v < -5 ? -1 : 1, ph: x / 16, amp: K.clamp(Math.abs(v) / 60), eyes: v < -5 ? 'wide' : 'open', ears: v < -5 ? 0.6 : 0, tailUp: v < -5 ? 0.9 : 0.2 }));
  }
  { // bird
    const bx = kfn(t, [[F0.flee, 545], [F0.flee + 1.3, 250], [F0.calm, -80], [F0.calm + 1.6, 470]]), by = kfn(t, [[F0.flee, GR - 222], [F0.flee + 1.3, -110], [F0.calm, 300], [F0.calm + 1.6, 420]]), fly = t > F0.flee;
    front.push(() => songbird(ctx, { x: bx + (t > F0.calm + 1.6 ? Math.cos(t * 1.2) * 70 : 0), y: by + (t > F0.calm + 1.6 ? Math.sin(t * 2.4) * 30 : 0) - jump, dir: t > F0.calm ? 1 : -1, fly, flap: t * 22, eyes: st ? 'wide' : 'open' }));
    if (t > F0.calm + 1.8) for (let i = 0; i < 2; i++) { const u = ((t * 0.5 + i / 2) % 1); front.push(() => { ctx.save(); ctx.globalAlpha = Math.sin(Math.PI * u); note(ctx, bx + 60 + u * 80 + i * 20, by - 40 - u * 90, 1); ctx.restore(); }); }
  }
  front.push(() => tortoise(ctx, { x: 125, y: GR + 8, s: 0.9, dir: 1, hide: kfn(t, [[F0.roar + 0.1, 0], [F0.roar + 0.4, 1], [F0.out + 0.8, 1], [F0.out + 1.3, 0]]), mouth: calm ? 'smile' : 'closed', shake: hidden && t > F0.prowl ? t : 0, ph: t * 3, amp: t < F0.roar ? 0.6 : 0 }));
  ctx.save(); ctx.beginPath(); ctx.rect(0, -300, WW, GR + 292); ctx.clip(); back.forEach((f) => f()); ctx.restore();
  const near = (bx) => (t > F0.hid && t < F0.out && Math.abs(lhx - bx) < 260 ? 1 : 0.35);
  bushes(ctx, t > F0.hid && t < F0.out ? [Math.sin(t * 38) * 3 * near(190), Math.sin(t * 41 + 1) * 3 * near(520)] : []);
  if (t > F0.hid && t < F0.out) [[110, GR - 78], [265, GR - 88], [486, GR - 86], [585, GR - 76]].forEach(([ex, ey], i) => peekEyes(ctx, ex, ey, Math.sign(lhx - ex) * 0.9, ((t * 0.6 + i * 0.31) % 1) < 0.07));
  front.forEach((f) => f());
  lion(ctx, L);
  // lettering
  if (t >= F0.flee && t < w(0, 12)) for (let i = 0; i < 5; i++) { ctx.save(); ctx.globalAlpha = 0.8; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.strokeStyle = C.white; ctx.beginPath(); ctx.moveTo(L.x + 180 + i * 16, GR - 60 - i * 44); ctx.lineTo(L.x + 300 + i * 30, GR - 60 - i * 44); ctx.stroke(); ctx.restore(); }
  if (t > F0.prowl && t < F0.out) { drops(ctx, 190, GR - 250, t, 3); drops(ctx, 520, GR - 235, t + 0.4, 3); }
  if (t >= w(1, 3) && t < w(1, 5)) bulb(ctx, 520, 650, B(t, w(1, 3), 0.3));
  say(ctx, t, w(1, 10), F0.iff - 0.1, 300, 500, 400, 150, 342, 664, 'ONE A DAY!', { size: 60 });
  say(ctx, t, F0.iff, F0.ok - 0.15, 320, 500, 470, 150, 342, 664, 'NO MORE CHASING!', { size: 46, fill: C.yellow });
  say(ctx, t, F0.ok, F0.calm + 0.7, 690, 470, 250, 130, L.x - 170, GR - 290, 'DEAL!', { size: 66, fill: C.yellow });
}

// ---------- set 1: a new morning (paragraph 3) ----------
const M = { turn: w(2, 3), gulp: w(2, 5), fear: w(2, 7), clever: w(2, 10), think: w(2, 13), walk: w(2, 15), stop: w(2, 22), idea: w(2, 24) + 0.2 };
const HK1 = [[TL, 490], [M.walk, 490], [w(2, 19) + 0.7, 640], [M.stop, 760]];
function hero1(t) {
  const x = kfn(t, HK1), v = vel(HK1, t), mv = K.clamp(Math.abs(v) / 20), P = { x, y: GR + 2 - hopY(x / 42, 24) * mv, s: 0.72, pal: 0, dir: 1, ears: 1, eyes: 'open', mouth: 'closed', seed: 3 };
  if (t >= M.turn && t < M.clever) { P.eyes = 'wide'; P.ears = kfn(t, [[M.turn, 1], [M.turn + 0.3, -0.2]]); P.mouth = t < M.fear ? 'o' : 'frown'; P.shake = t >= M.gulp && t < M.gulp + 0.7 ? t : 0; }
  if (t >= M.clever && t < M.walk) { P.mouth = 'smile'; P.raise = K.beat(t, M.clever + 0.2, 0.3) * (0.88 + 0.12 * Math.sin(t * 12)); P.eyes = t >= M.think ? 'squint' : 'open'; P.earWig = Math.sin(t * 9) * 0.08; P.brow = t >= M.think ? 0.5 : 0; }
  if (t >= M.walk && t < M.idea) { P.eyes = 'squint'; P.brow = 0.5; P.nod = 0.12; P.ears = 0.7; }
  // the puddle: he sees "another hare", leans, waggles an ear, looks toward the den, back; then the idea
  if (t >= M.stop + 0.2 && t < M.idea) { P.eyes = t < M.stop + 1.0 ? 'wide' : 'open'; P.ears = 1; P.brow = 0; P.nod = 0.25; P.tip = 0.12 * K.beat(t, M.stop + 1.0, 0.4); P.earWig = between(t, M.stop + 1.4, M.stop + 1.9) ? Math.sin(t * 24) * 0.4 : 0; P.gaze = between(t, M.stop + 2.0, M.stop + 2.5) ? [1, -0.2] : [0.5, 0.9]; }
  if (t >= M.idea) { P.eyes = t < M.idea + 0.7 ? 'wide' : 'squint'; P.mouth = 'smile'; P.earWig = Math.sin(t * 14) * 0.12; P.raise = 0.9 * K.beat(t, M.idea + 0.4, 0.3); P.y -= arc(t, M.idea, 0.4, 46); }
  return P;
}
function draw1(ctx, t, cam) {
  forestBase(ctx, t, { dawnY: kfn(t, [[M.clever - 0.3, -270], [M.clever + 1.1, 930]]), sunY: kfn(t, [[TL - 0.5, 720], [M.fear, 180]]) });
  bushes(ctx, []);
  const Hh = hero1(t), fear = t >= M.fear && t < M.clever, wave = t >= M.walk && t < M.stop + 1 ? 0.65 + 0.35 * Math.sin(t * 9) : 0, wide = t >= M.turn && t < M.clever;
  deer(ctx, { x: 110, y: GR + 2, s: 0.95, dir: 1, eyes: wide ? 'wide' : 'open', nod: fear ? 0.25 : 0, shake: fear ? t : 0 });
  hare(ctx, { x: 270, y: GR + 2, s: 0.85, pal: 1, dir: 1, eyes: wide ? 'wide' : 'open', ears: fear ? -0.6 : wide ? 0.2 : 1, mouth: fear ? 'frown' : 'closed', shake: fear ? t : 0, raise: wave });
  hare(ctx, { x: 380, y: GR + 2, s: 0.85, pal: 2, dir: t >= M.walk + 1.2 ? 1 : -1, eyes: wide ? 'wide' : 'open', ears: fear ? -0.6 : wide ? 0.2 : 1, mouth: fear ? 'frown' : 'closed', shake: fear ? t + 1 : 0, raise: wave ? 1.3 - wave : 0 });
  tortoise(ctx, { x: 40, y: GR + 8, s: 0.9, dir: 1, hide: fear ? 0.7 : 0, eyes: wide ? 'wide' : 'open' });
  // the puddle in the path and the hero's reflection in it
  { const pc = [870, GR + 22], k = 0.5, ry = 44; shape(ctx, ell(pc[0], pc[1], 135, ry, 30), C.blue, { lw: 5, seed: 31, dot: C.white, pitch: 8, rad: 0.15, da: 0.6 });
    const ra = K.clamp((t - (M.stop - 0.4)) / 0.4); if (ra > 0) { const R = hero1(t), ay = pc[1] - ry + 10; ctx.save(); K.poly(ctx, ell(pc[0], pc[1], 131, ry - 4, 30), true); ctx.clip(); ctx.globalAlpha = 0.72 * ra; ctx.translate(0, ay * (1 + k)); ctx.scale(1, -k); hare(ctx, { ...R, x: pc[0] - 30, y: ay, dir: R.dir, tip: R.tip || 0, shake: 0 }); ctx.restore(); ctx.save(); K.poly(ctx, ell(pc[0], pc[1], 131, ry - 4, 30), true); ctx.clip(); ctx.fillStyle = 'rgba(142,192,255,0.3)'; ctx.fillRect(pc[0] - 140, pc[1] - ry, 280, 2 * ry); ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(255,250,240,0.8)'; for (let i = 0; i < 2; i++) { ctx.beginPath(); ctx.moveTo(pc[0] - 90 + i * 70, pc[1] - 6 + i * 14 + Math.sin(t * 2 + i) * 2); ctx.lineTo(pc[0] - 40 + i * 70, pc[1] - 6 + i * 14 + Math.sin(t * 2 + i) * 2); ctx.stroke(); } ctx.restore(); } }
  songbird(ctx, { x: 215, y: GR - 246, dir: 1, eyes: wide ? 'wide' : 'open' });
  hare(ctx, Hh);
  const hx = Hh.x + 16, hy = Hh.y - 126;
  if (fear) { drops(ctx, 285, GR - 190, t, 2); drops(ctx, 575, GR - 190, t + 0.3, 2); }
  if (t >= M.think && t < M.walk + 0.4) for (let i = 0; i < 3; i++) { const p = B(t, M.think + i * 0.28, 0.2); if (p > 0) shape(ctx, ell(hx + 50 + i * 34, hy - 100 - i * 26, (9 + i * 5) * K.ease.back(p), (9 + i * 5) * K.ease.back(p), 14), C.white, { lw: 4, seed: 3 }); }
  if (t >= M.idea && t < T_DEN) bulb(ctx, hx + 6, hy - 170 - arc(t, M.idea, 0.4, 46), B(t, M.idea, 0.3));
}

// ---------- set 2: the lion's den (paragraphs 4 and 5) ----------
const D = { hungry: w(3, 5), angry: w(3, 6), arrive: w(3, 7), roar: w(3, 10), q1: w(3, 12), q2: w(3, 14), shiver: w(3, 16), then: w(3, 19), say: w(3, 21), trouble: w(3, 24), s0: w(4, 2), lion2: w(4, 7), stop: w(4, 10), grab: w(4, 11), king: w(4, 13), rage: w(4, 19), shout: w(4, 23), now: w(4, 26) };
const LK2 = [[T_DEN, 770], [w(3, 0) + 1.3, 640], [w(3, 3), 800], [D.hungry, 700], [D.q1, 700], [D.q1 + 0.45, 650], [D.q2, 650], [D.q2 + 0.45, 600], [D.rage, 600], [D.rage + 0.7, 670], [D.rage + 1.4, 600]];
const HK2 = [[D.arrive - 0.2, -90], [w(3, 9) + 0.5, 290], [D.roar + 0.1, 290], [D.roar + 0.5, 235]];
function lion2(t) {
  const x = kfn(t, LK2), v = vel(LK2, t), P = { x, y: GR + 2, s: 1.15, dir: turnFlip(t, [[0, -1], [w(3, 0) + 1.15, 1], [w(3, 3) - 0.15, -1], [D.rage - 0.05, 1], [D.rage + 0.6, -1]], 0.5).dir, ph: x / 26, amp: K.clamp(Math.abs(v) / 60), tw: t * 4, brow: 0.6, mouth: 'frown', tailUp: 0.5 };
  if (t >= D.hungry && t < D.angry) { P.eyes = 'shut'; P.nod = 0.2; P.brow = 0; P.crouch = 0.8 * K.beat(t, D.hungry, 0.3); P.gaze = [0.2, 1]; }
  if (t >= D.angry && t < D.roar) { P.raise = pulse(t, D.angry + 0.1, 0.35); P.tw = t * 9; P.brow = 1; P.flush = 0.5 * K.beat(t, D.angry, 0.6); P.puff = 1.08; }
  if (t >= D.roar && t < D.q1 - 0.1) { P.roar = K.env(t, D.roar, D.q1 - 0.1, 0.12, 0.25); P.puff = 1 + 0.2 * P.roar; P.nod = -0.2 * P.roar; P.shake = t; P.brow = 1; P.flush = 0.5; }
  if (t >= D.q1 - 0.1 && t < D.shiver) { P.talk = talk(t, [[D.q1, we(3, 13)], [D.q2, we(3, 15)]]); P.brow = 1; P.flush = 0.4; P.nod = 0.1; }
  if (t >= D.shiver && t < D.trouble) { P.brow = 1; P.raise = t < D.say ? 0.25 + 0.2 * Math.max(0, Math.sin(t * 9)) : 0; }
  if (t >= D.trouble && t < D.lion2) { P.eyes = 'wide'; P.brow = 0; P.mouth = 'closed'; }
  if (t >= D.lion2 && t < D.rage) { P.brow = K.beat(t, D.lion2, 2); P.flush = kfn(t, [[D.lion2, 0], [D.king, 0.45], [D.rage, 0.8]]); P.eyes = t < D.stop ? 'wide' : 'open'; }
  if (t >= D.rage) { P.brow = 1; P.flush = 0.9; P.puff = 1.18 + 0.03 * Math.sin(t * 20); P.raise = pulse(t, 103.3, 0.3) + pulse(t, 103.9, 0.3); P.tailUp = 1; P.tw = t * 8; if (t >= w(4, 22) && t < D.shout + 0.05) { P.nod = -0.2; P.sq = 1.05; } if (t >= w(4, 23)) { P.roar = 0.55 + 0.45 * Math.abs(Math.sin(t * 9)) * K.clamp((pe(4) + 0.2 - t) / 0.2); P.nod = 0.2; P.reach = 60 * K.beat(t, w(4, 23), 0.25, 'out'); P.raise = Math.max(P.raise, 1.2 * pulse(t, w(4, 26), 0.4)); } }
  denLion(P, t);
  return P;
}
function hare2(t) {
  const x = kfn(t, HK2), v = vel(HK2, t), mv = K.clamp(Math.abs(v) / 40), P = { x, y: GR + 2 - hopY(x / 62, 46) * mv, s: 1, pal: 0, dir: 1, ears: 1, eyes: 'open', mouth: 'closed' };
  if (t >= D.roar && t < D.q1) { P.ears = -0.8; P.eyes = 'shut'; P.squash = 0.5; P.mouth = 'o'; }
  if (t >= D.q1 && t < D.shiver) { P.ears = -0.4; P.eyes = 'wide'; P.mouth = 'frown'; P.shake = t * 0.5; }
  if (t >= D.shiver && t < D.then) { P.ears = -0.5; P.eyes = 'wide'; P.mouth = 'frown'; P.shake = t; }
  if (t >= D.then && t < D.say) { P.ears = 0.2; P.eyes = 'open'; P.raise = 0.5 * K.beat(t, D.then, 0.4); }
  if (t >= D.say && t < D.s0) { P.ears = 0.6; P.raise = 0.8; P.talk = talk(t, [[D.say, we(3, 23)], [D.trouble, pe(3)]]); P.eyes = t >= D.trouble ? 'wide' : 'open'; }
  if (t >= D.s0 && t < D.rage) { P.ears = 0.8; P.raise = 0.85 + 0.1 * Math.sin(t * 5); P.talk = talk(t, [[D.s0, we(4, 6)], [D.lion2, we(4, 12)], [D.king, we(4, 18)]]); P.eyes = t >= D.lion2 ? 'wide' : 'open'; P.nod = -0.15; }
  if (t >= D.rage) { P.eyes = 'wide'; P.mouth = 'o'; P.brow = 0; P.ears = -0.6; P.raise = 0; }
  denHare(P, t);
  return P;
}
// ---- den acting (upgrade): cues are the narrated words of paragraphs 4 and 5 ----
function denLion(P, t) {
  const hh = [kfn(t, HK2) + 16, GR - 124]; P.gaze = lookAt([P.x + Math.sign(P.dir) * 159, P.y - 246], hh);
  if (between(t, w(3, 22), w(3, 24))) { P.nod = -0.1; P.drop = -6; P.brow = 0.6; }                            // "يا ملك": he likes it
  if (between(t, D.trouble, D.s0)) { P.nod = -0.1; P.brow = 0.3; P.lid = 0.25; P.eyes = 'open'; P.mouth = 'closed'; if (t > 86.0) P.gaze = [-1, 0.1]; }
  if (between(t, w(4, 5), w(4, 7))) { P.lid = 0.3; P.mouth = 'smile'; P.brow = 0.2; }                         // "أرنب آخر": two hares, a bigger meal
  if (between(t, w(4, 7) + 0.6, w(4, 11))) { P.nod = -0.15 * K.beat(t, w(4, 7) + 0.6, 0.3); P.brow = 1; P.eyes = 'open'; P.lid = 0; }
  if (between(t, w(4, 11), w(4, 13))) { P.gaze = [-0.6, 0.8]; P.raise = pulse(t, 95.9, 0.4); P.tw = t * 9; P.brow = 1; }      // looks at the empty spot, scrapes the ground
  if (between(t, w(4, 16), D.rage)) { const fr = t < w(4, 16) + 0.3, u = K.beat(t, w(4, 16) + 0.3, 0.6); P.eyes = fr ? 'wide' : 'open'; P.lid = 0; if (!fr) { P.puff = settleTo(t, w(4, 16) + 0.3, 1, 1.3, 0.5, 0.1); P.drop = -14 * u; P.flush = 0.8 * u; P.tailUp = 1; P.tw = t * 14; P.brow = 1; } }
}
function denHare(P, t) {
  P.gaze = lookAt([P.x + 16, P.y - 126], [kfn(t, LK2) - 159, GR - 244]);
  if (between(t, D.shiver, D.then)) { P.shake = 0; P.x += tremble(t, 2.5 * (1 - K.clamp((t - D.shiver) / 2))); P.ears = -0.6; P.eyes = 'wide'; }
  if (between(t, D.then, D.say)) { P.drop = 4 * pulse(t, D.then, 0.3); P.eyes = t < D.then + 0.25 ? 'shut' : 'open'; P.sq = 1 + 0.05 * K.beat(t, D.then + 0.2, 0.4); P.ears = 0.3; }
  if (between(t, w(3, 22), w(3, 22) + 1.0)) { P.nod = 0.5 * pulse(t, w(3, 22), 1.0); P.drop = 10 * pulse(t, w(3, 22), 1.0); P.ears = 0.9; }      // the bow on "ملك"
  if (between(t, D.trouble, D.s0)) { P.raise = 0.6; P.eyes = 'wide'; if (between(t, 85.8, 86.4)) P.gaze = [-1, 0]; }
  if (between(t, D.s0, w(4, 7))) { P.raise = -0.6; P.gaze = [-1, 0.1]; }                                     // gestures back along the path
  if (between(t, w(4, 7), w(4, 7) + 0.7)) { P.sq = 1.1; P.ears = 1; P.raise = 1; } else if (between(t, w(4, 7) + 0.7, w(4, 11))) { P.sq = 0.95; P.ears = 0.2; }
  if (between(t, w(4, 11), w(4, 13))) { P.gaze = [-0.7, 0.7]; P.ears = -0.5; P.wet = true; P.mouth = 'frown'; }   // the empty spot where his friend was
  if (between(t, w(4, 13), w(4, 15))) { P.tip = 0.12; P.nod = -0.1; }
  if (between(t, w(4, 15), D.rage)) { P.tip = -0.1; P.ears = -0.6; }
  if (t >= w(4, 23)) { P.x -= 30 * K.beat(t, w(4, 23), 0.3, 'out'); P.ears = -1; P.earWig = Math.sin(t * 30) * 0.2; }
  if (t >= w(4, 26) + 0.4) { P.dir = -1; P.ears = 0.8; P.earWig = 0; P.eyes = 'open'; P.mouth = 'smile'; P.lid = 0.3; P.gaze = [-1, 0]; }  // back to the lion: the mask comes off
}
function storyCloud(c, t) { // local coords, origin at the cloud centre
  c.fillStyle = GREEN; c.fillRect(-320, 118, 640, 120); c.fillStyle = C.black; c.fillRect(-320, 114, 640, 6);
  if (t < D.king) {
    const scared = t >= D.stop - 0.3, walkU = t < D.lion2 ? t : D.lion2, lx = kfn(t, [[D.lion2 + 0.3, 420], [D.stop, 160]]), g = K.beat(t, D.grab, 0.5);
    hare(c, { x: -130, y: 116 - (scared ? 0 : hopY(walkU / 0.5, 18)), s: 0.72, pal: 0, dir: 1, ears: scared ? -0.6 : 1, eyes: scared ? 'wide' : 'open', shake: scared ? t : 0 });
    hare(c, { x: K.lerp(-30, 52, K.ease.inOut(g)), y: K.lerp(116 - (scared ? 0 : hopY(walkU / 0.5 + 0.5, 18)), 58, K.ease.inOut(g)), s: 0.72, pal: 1, dir: g > 0.5 ? -1 : 1, ears: scared ? -0.6 : 1, eyes: scared ? 'wide' : 'open', mouth: g > 0 ? 'o' : 'closed', rot: g * 0.3, shake: scared ? t + 1 : 0 });
    if (t >= D.lion2 + 0.3) lion(c, { x: lx, y: 118, s: 0.6, dir: -1, pal: 1, ph: lx / 16, amp: t < D.stop ? 1 : 0, brow: 1, roar: t >= D.stop - 0.2 && t < D.grab ? K.env(t, D.stop - 0.2, D.grab, 0.1, 0.2) : 0, raise: g, mouth: 'smile', tw: t * 4 });
  } else {
    hare(c, { x: -130, y: 116, s: 0.6, pal: 0, dir: 1, ears: -0.7, eyes: 'wide', shake: t });
    lion(c, { x: 80, y: 118, s: 0.72, dir: -1, pal: 1, brow: 1, crown: 1, talk: talk(t, [[D.king, we(4, 18)]]), mouth: 'smile', tailUp: 1, tw: t * 4, puff: 1.05 });
    fx(c, t, w(4, 15), D.rage + 1, 'I AM KING!', 30, -80, 52, { rot: -0.06, fill: C.yellow });
  }
}
function draw2(ctx, t, cam) {
  ctx.drawImage(skyDay(), 0, 0, WW, 920); skyTop(ctx, skyDay()); cloudFlat(ctx, 320 + ((t * 4) % 1100), 60, 0.9); cloudFlat(ctx, ((t * 2.5 + 500) % 1300) - 150, -90, 0.7);
  ctx.drawImage(groundL(), 0, 0, WW, WH); ctx.drawImage(denL(), 0, 0, WW, WH);
  const L = lion2(t), Hh = hare2(t), lhx = L.x + L.dir * 138, lhy = L.y - 214, hx = Hh.x + 16, hy = Hh.y - 126;
  if (t >= D.roar && t < D.q1) for (let i = 0; i < 4; i++) { const u = ((t * 1.8 + i / 4) % 1); ctx.save(); ctx.globalAlpha = (1 - u) * 0.9; ctx.lineWidth = 9; ctx.strokeStyle = C.white; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(lhx - 40, lhy + 40, 70 + u * 230, Math.PI - 0.6, Math.PI + 0.6); ctx.stroke(); ctx.restore(); }
  lion(ctx, L); hare(ctx, Hh);
  if (t >= D.angry && t < D.roar) steam(ctx, lhx, lhy - 120, t);
  if (t >= D.rage) steam(ctx, lhx, lhy - 130, t * 1.5);
  say(ctx, t, D.q1, D.q2 - 0.1, 400, 430, 470, 140, lhx - 60, lhy + 20, 'WHERE WERE YOU?!', { size: 46 });
  say(ctx, t, D.q2, D.shiver, 400, 430, 420, 140, lhx - 60, lhy + 20, 'WHY SO LATE?!', { size: 50 });
  say(ctx, t, D.say, D.trouble - 0.1, 300, 560, 270, 120, hx + 10, hy - 40, 'O KING!', { size: 54 });
  say(ctx, t, D.trouble, D.s0 - 0.2, 320, 560, 360, 120, hx + 10, hy - 40, 'BIG TROUBLE!', { size: 50, fill: C.yellow });
  if (t >= D.s0 && t < D.rage + 0.4) { const p = Math.min(B(t, D.s0, 0.4), K.clamp((D.rage + 0.4 - t) / 0.3)); cloud(ctx, 300, 320, 300, 200, C.white, p, { tail: [hx - 300 + 20, hy - 320 - 30], inside: (c) => { c.scale(1.25, 1.25); c.translate(0, -20); storyCloud(c, t); } }); }
  say(ctx, t, D.shout, T_WELL, 380, 400, 420, 170, lhx - 60, lhy + 20, 'SHOW ME!', { size: 84, fill: C.yellow });
}

// ---------- set 3: the well (paragraphs 6 and 7) ----------
const E = { well: w(5, 3), deep: w(5, 5), clear: w(5, 7), jump: w(5, 9) - 0.1, say: w(5, 13), look: w(5, 17), creep: w(5, 19), peer: w(5, 22), see: w(6, 0), enemy: w(6, 5), roar: w(6, 9), echo: w(6, 11) + 0.25, leap: w(6, 16), fall: w(6, 18), splash: w(6, 18) + 0.65, stuck: w(6, 22) };
const HK3 = [[T_WELL, 60], [E.well, 430], [E.jump, 430], [E.jump + 0.5, 818]];
const LK3 = [[T_WELL, -290], [w(5, 4) + 0.4, 90], [E.jump + 0.2, 90], [E.jump + 1.3, 270], [E.creep, 270], [w(5, 21) + 0.5, 392]];
function lion3(t) {
  const x = kfn(t, LK3), v = vel(LK3, t), P = { x, y: WG + 2, s: 1, dir: 1, ph: x / 24, amp: K.clamp(Math.abs(v) / 50), tw: t * 3, brow: 1, mouth: 'frown', tailUp: 0.5, flush: 0.5 };
  if (t >= E.well + 1 && t < E.creep) { P.brow = 0.6; P.flush = 0.3; P.nod = t >= E.say ? -0.12 : 0; }
  if (t >= E.creep) { P.crouch = 0.55; P.flush = 0.2; P.brow = 0.5; P.amp *= 0.8; P.tailUp = 0.2; }
  if (between(t, w(5, 17), E.creep)) { P.lid = 0.3; P.gaze = t < 122.6 ? [1, -0.2] : t < 123.3 ? [0.6, 0.8] : [1, -0.2]; }        // suspicion: the hare, the hole, the hare
  if (between(t, E.creep, E.peer)) { P.tw = 0; if (between(t, 125.1, 125.6)) P.nod = 0.15 * Math.sin((t - 125.1) * 25); }
  if (t >= E.peer) { const k = K.beat(t, E.peer, 0.6); P.reach = 56 * k; P.nod = 0.6 * k; P.tw = 0; P.raise = 0.5 * k; P.eyes = t < E.enemy ? 'wide' : 'open'; P.brow = t < E.enemy ? 0 : 1; P.flush = t < E.enemy ? 0 : 0.5; P.mouth = t < E.enemy ? 'closed' : 'frown'; }
  wellLion(P, t);
  if (t >= E.roar && t < E.echo) { P.roar = K.env(t, E.roar, E.echo, 0.12, 0.25); P.nod = 0.7; P.reach = 64; P.puff = 1 + 0.18 * P.roar; P.shake = t; P.flush = 0.7; }
  if (t >= E.echo && t < E.leap) { P.eyes = 'wide'; P.flush = 0.9; P.puff = 1.12; P.shake = t; P.crouch = 0.55 + 0.45 * K.beat(t, E.leap - 0.6, 0.5); P.tailUp = 1; }
  if (t >= E.leap) { // the leap and the fall: body centre path, then feet origin from it
    const tm = (E.leap + E.fall) / 2; let bx, by, rot;
    if (t < tm) { const u = (t - E.leap) / (tm - E.leap); bx = K.lerp(348, 505, u); by = K.lerp(392, 200, K.ease.out(u)); rot = 0.75 * u - 0.2 * Math.sin(Math.PI * u); P.sq = 1.12; }
    else if (t < E.fall) { const u = (t - tm) / (E.fall - tm); bx = K.lerp(505, 672, u); by = K.lerp(200, 380, K.ease.in(u)); rot = K.lerp(0.75, 1.57, Math.sqrt(u)); }
    else { bx = 680; by = fallY(t, E.fall, E.splash, 380, 900); rot = 1.57; }
    P.x = bx - (-4 * Math.cos(rot) + 130 * Math.sin(rot)); P.y = by - (-4 * Math.sin(rot) - 130 * Math.cos(rot)); P.rot = rot; P.crouch = 0; P.reach = 20; P.nod = 0; P.roar = t < E.fall ? 0.8 : 0; P.eyes = 'wide'; P.mouth = 'o'; P.brow = t < 143.1 ? 1 : -0.6; if (t > 143.1) { P.roar = 0; P.raise = 0.6 + 0.5 * Math.sin(t * 22); } P.flush = t < E.fall ? 0.8 : 0; P.amp = 0; P.raise = 0.8; P.tailUp = 1; P.shake = 0; P.puff = 1;
  }
  return P;
}
function hare3(t) {
  const x = t < E.jump ? Math.max(kfn(t, HK3), kfn(t, LK3) + 340) : kfn(t, HK3), v = vel(HK3, t), mv = t < E.jump ? K.clamp(Math.abs(v) / 40) : 0, on = K.clamp((t - E.jump) / 0.5);
  const P = { x, y: K.lerp(WG + 2, SH.rim, K.ease.inOut(on)) - hopY(x / 62, 40) * mv - arc(t, E.jump, 0.5, 170), s: 0.72, sq: landSquash(t, E.jump + 0.5, 0.18) * anticipate(t, E.jump - 0.15, 0.15, 0.12), pal: 0, dir: t > E.jump + 0.75 ? -1 : 1, ears: 1, eyes: 'open', mouth: 'closed' };
  if (t >= E.well && t < E.jump) { P.raise = 0.7; P.mouth = 'smile'; }
  if (t >= E.say && t < E.creep) { P.raise = -0.55; P.talk = talk(t, [[E.say, we(5, 16)], [E.look, we(5, 18)]]); P.nod = 0.15; }
  if (t >= E.creep && t < E.roar) { P.eyes = 'open'; P.mouth = 'closed'; P.brow = 0; P.raise = t < E.see ? -0.5 : 0; P.gaze = [-1, 0.3]; P.tip = -0.06;
    if (between(t, 134.3, 134.8)) { P.eyes = 'wide'; P.nod = 0.15 * Math.abs(Math.sin((t - 134.3) * 12)); P.raise = -0.7; } if (between(t, 134.8, 135.3)) { P.lid = 0.3; P.mouth = 'smile'; P.gaze = [-0.5, 0.5]; } }
  if (t >= E.roar && t < E.leap) { P.ears = t < 136.9 ? -0.7 : -0.4; P.earWig = t < 136.9 ? Math.sin(t * 30) * 0.2 : 0; P.eyes = t < 136.9 ? 'shut' : 'wide'; P.tip = -0.12; P.x += t > 140.5 ? 8 + 34 * K.beat(t, 141.3, 0.4) : 0; }
  if (t >= E.leap && t < E.splash) { P.eyes = 'wide'; P.mouth = 'o'; P.ears = -0.6; P.sq = 1 - 0.18 * pulse(t, 141.9, 0.7); P.x += 8 + 34 * K.beat(t, 141.3, 0.4); P.gaze = [-0.6, 0.8]; }
  if (t >= E.splash) { P.nod = 0.45; P.mouth = 'closed'; P.eyes = 'wide'; P.x += 8 + 34 * (1 - K.beat(t, 144.6, 0.5)); P.gaze = [-0.5, 0.9]; P.ears = 0.2 + 0.8 * K.beat(t, 145.0, 0.4); if (t > 147.4) { P.nod = 0.1; P.mouth = 'smile'; P.eyes = 'open'; P.sq = K.lerp(0.94, 1, K.beat(t, 147.5, 0.8)); P.ears = t < 147.9 ? -0.3 : 0.9; P.x += tremble(t, 1.5) * (t < 147.9 ? 1 : 0); } }
  return P;
}
// ---- well acting (upgrade): the lion's face fields that his reflection copies, his climb attempts, the POV down the well ----
function wellLion(P, t) {
  if (between(t, 127.8, E.see)) { P.lid = t < 128.6 ? 0.4 : 0; P.gaze = t < 128.6 ? [Math.sin((t - 127.8) * 8), 0.9] : [0.5, 0.9]; if (t >= 128.6) { P.eyes = 'wide'; P.reach = 56 - 10 * pulse(t, 128.6, 0.4); } }
  if (between(t, E.see, w(6, 8) + 0.05)) { P.eyes = 'wide'; P.brow = 0; P.mouth = 'closed'; P.nod = 0.6 + (t > 130.3 ? 0.12 * K.beat(t, 130.3, 0.3) : 0); P.lid = pulse(t, 130.9, 0.18);
    if (t > 132.0) { P.brow = K.beat(t, 132.0, 0.5); P.eyes = 'open'; } if (t > 132.5) P.roar = 0.15; if (t > w(6, 7)) P.puff = 1.2; }
  if (between(t, w(6, 8), E.roar)) { P.flush = 0.6; P.tw = t * 12; P.brow = 1; P.puff = 1.15; P.gaze = between(t, 134.3, 134.8) ? [1, -0.3] : [0.5, 0.9]; if (t > 135.1) { P.nod = -0.35; P.reach = 20; P.sq = 1.06; } }
  if (between(t, w(6, 11), E.leap)) { P.roar = between(t, w(6, 14), w(6, 14) + 0.5) ? 0.9 : t < 138.0 ? 0.2 : 0; P.reach = t < 138.0 ? 56 : 40 + 16 * K.beat(t, w(6, 13), 0.3); P.eyes = between(t, 138.0, 138.4) ? 'wide' : 'open'; P.brow = t < 138.0 || t > w(6, 13) ? 1 : 0.3; P.puff = t > w(6, 13) ? 1.3 : 1.15; P.flush = 0.8; }
  if (between(t, 140.5, E.leap)) { P.tw = t * 14; P.gaze = [0.5, 0.9]; }
}
function mirrorFields(t) { const L = lion3(Math.max(t, 0)); return { roar: L.roar || 0, brow: L.brow || 0, eyes: L.eyes === 'squint' ? 'open' : L.eyes || 'open', mouth: L.mouth || 'closed', puff: L.puff || 1, rot: -(L.nod ? (L.nod - 0.6) * 0.5 : 0) }; }
function climbY(t) { return 60 * pulse(t, 146.02, 0.5) + 30 * pulse(t, 146.72, 0.4) - 18 * K.beat(t, 147.2, 0.4); }
const inPOV = (t) => between(t, E.see, w(6, 8)) || between(t, w(6, 11) + 0.12, 140.5);
// a view straight down the well over the lion's head: rim stones, the dark shaft, the water disc holding his face (copying him 2 frames late)
function wellPOV(ctx, t) {
  const cx = 500, cy = 600, L = lion3(t), m = mirrorFields(t - 0.066), back = between(t, 138.0, 138.6) ? 40 * pulse(t, 138.0, 0.6) : 0, mx = t > 130.3 && t < 133.9 ? -30 * K.beat(t, 130.3, 0.4) : 0, lean = t > 131.2 && t < 133.9 ? K.beat(t, 131.2, 0.6) : 0;
  ctx.fillStyle = EARTH; ctx.fillRect(-20, -20, 1040, 1270); ctx.fillStyle = dotPat(ctx, EARTHD, 12, 0.22); ctx.fillRect(-20, -20, 1040, 1270);
  shape(ctx, ell(cx, cy, 470, 470, 64), STONE, { lw: 9, seed: 91, dot: STONED, pitch: 10, rad: 0.2, da: 0.55 });
  ctx.save(); ctx.lineWidth = 5; ctx.strokeStyle = C.black; for (let i = 0; i < 20; i++) { const a = i / 20 * Math.PI * 2 + 0.1; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * 360, cy + Math.sin(a) * 360); ctx.lineTo(cx + Math.cos(a) * 470, cy + Math.sin(a) * 470); ctx.stroke(); } ctx.restore();
  for (const [r, col] of [[360, NAVY], [335, NAVY2], [312, '#0a1a4a']]) shape(ctx, ell(cx, cy, r, r, 56), col, { lw: 6, seed: 92, dot: '#1b3a8f', pitch: 12, rad: 0.2, da: 0.5 });
  const wr = 290, rip = between(t, w(6, 11) + 0.12, 140.5) ? 1 : 0.15; shape(ctx, ell(cx, cy, wr, wr, 48), C.blue, { lw: 6, seed: 93, dot: '#5f95f0', pitch: 10, rad: 0.3, da: 0.6 });
  ctx.save(); K.poly(ctx, ell(cx, cy, wr - 3, wr - 3, 48), true); ctx.clip();
  const sc = 2.0 + 0.2 * lean, bands = 6;
  for (let i = 0; i < bands; i++) { const y0 = cy - wr + i * (2 * wr / bands); ctx.save(); ctx.beginPath(); ctx.rect(cx - wr, y0, 2 * wr, 2 * wr / bands + 1); ctx.clip(); const off = rip * 10 * Math.sin(t * 9 + i * 1.3);
    lionFace(ctx, cx - mx * 0.6 + off, cy + 10 - back * 0.3, sc, { ...m, roar: rip > 0.5 ? Math.max(m.roar, 0.6 + 0.4 * Math.abs(Math.sin(t * 7))) : m.roar, eyes: between(t, 138.0, 138.4) ? 'wide' : m.eyes, mph: t * 2 }); ctx.restore(); }
  ctx.fillStyle = 'rgba(29,91,208,0.28)'; ctx.fillRect(cx - wr, cy - wr, 2 * wr, 2 * wr);
  for (let i = 0; i < 3; i++) { const u = ((t * (0.5 + rip) + i / 3) % 1); ctx.save(); ctx.globalAlpha = (1 - u) * (0.4 + 0.6 * rip); ctx.lineWidth = 5; ctx.strokeStyle = C.white; ctx.beginPath(); ctx.ellipse(cx, cy, 20 + u * (wr - 20), 20 + u * (wr - 20), 0, 0, 7); ctx.stroke(); ctx.restore(); }
  ctx.restore();
  // the hare peeking over the rim at two o'clock
  ctx.save(); ctx.translate(830, 250); ctx.rotate(0.5); for (const ex of [-14, 12]) shape(ctx, ell(ex, -40, 13, 46, 18), C.white, { lw: 5, seed: 7 }); shape(ctx, ell(0, 10, 36, 26, 20), C.white, { lw: 5, seed: 8 }); eyeAt(ctx, 6, 6, 'wide', -0.8); ctx.restore();
  // the back of the real lion's head and mane at the bottom edge
  ctx.save(); ctx.translate(cx + mx, 1320 + back - 30 * lean); shape(ctx, ell(0, 250, 560, 190, 30), C.yellow, { lw: 8, seed: 5, dot: C.red, pitch: 11, rad: 0.18, da: 0.5 }); for (const ex of [-150, 150]) shape(ctx, ell(ex, -300, 44, 44, 16), C.yellow, { lw: 6, seed: 7 }); shape(ctx, manePts(0, 0, 330 * (L.puff || 1), 15, t * 2), MANE, { lw: 9, seed: 6, dot: MANED, pitch: 12, rad: 0.2, da: 0.55 }); ctx.restore();
}
function draw3(ctx, t, cam) {
  ctx.drawImage(skyDay(), 0, 0, WW, 920); drawSun(ctx, 170, 170, t); cloudFlat(ctx, 320 + ((t * 4) % 1100), 110, 0.9); cloudFlat(ctx, ((t * 2.5 + 700) % 1300) - 150, 230, 0.7);
  ctx.drawImage(treeBack(), 0, WG - GR, WW, GR + 10); ctx.drawImage(earthL(), 0, 0, WW, WH);
  const L = lion3(t), Hh = hare3(t), inWater = t >= E.splash, y0 = SH.wat, rip = (t >= E.echo && t < E.leap ? 1.2 : 0) + (inWater ? 2.2 * Math.exp(-(t - E.splash) * 1.2) + 0.6 : 0);
  ctx.fillStyle = C.blue; ctx.fillRect(SH.x0, y0, 240, WH - y0); ctx.fillStyle = dotPat(ctx, '#5f95f0', 10, 0.3); ctx.fillRect(SH.x0, y0, 240, WH - y0);
  // the reflection
  const ra = Math.min(K.clamp((t - E.peer - 0.4) / 0.6), K.clamp((E.fall + 0.2 - t) / 0.3));
  if (ra > 0) { ctx.save(); ctx.beginPath(); ctx.rect(SH.x0, y0, 240, WH - y0); ctx.clip(); ctx.globalAlpha = ra; const er = t >= E.echo && t < E.leap - 0.2 ? K.env(t, E.echo, we(6, 15) + 0.2, 0.15, 0.3) : t >= E.roar && t < E.echo ? 0.25 : 0; { const m = mirrorFields(t - 0.066); lionFace(ctx, SH.cx + Math.sin(t * 3) * (3 + rip * 3), y0 + 108 + Math.sin(t * 2.2) * 3, 0.8, { ...m, mph: t * 2 }); } ctx.restore(); }
  if (!inWater && t >= E.fall - 0.2) { ctx.save(); ctx.beginPath(); ctx.rect(SH.x0, 0, 240, WH); ctx.rect(0, 0, WW, WG + 30); ctx.clip(); lion(ctx, L); ctx.restore(); }
  if (inWater && t >= E.splash + 0.4) { const d = t - E.splash - 0.4, bob = Math.sin(t * 3.2) * 6 - 30 * Math.exp(-d * 5) * Math.cos(d * 12) + 80 * (1 - K.clamp(d / 0.15)), cl = climbY(t), sc = 0;
    const shk = between(t, 144.4, 145.0) ? 0.15 * Math.sin((t - 144.4) * 21) * (1 - (t - 144.4) / 0.6) : 0, lk = t < 144.62 ? null : t < 144.9 ? [-1, 0] : t < 145.2 ? [1, 0] : t < 147.2 ? [0, -1] : [0, -1];
    const keepE = { ...EYE }; if (lk) { EYE.on = true; EYE.gaze = lk; EYE.lid = 0; EYE.lidColor = LPAL[0].body; }
    lionFace(ctx, SH.cx, y0 - 8 + bob - cl, 0.95, { wet: true, rot: shk, eyes: t < 144.62 ? 'shut' : 'open', brow: -0.8, mouth: t < 144.62 ? 'o' : 'frown', roar: between(t, 144.0, 144.4) ? 0.3 * Math.abs(Math.sin(t * 20)) : 0 }); Object.assign(EYE, keepE);
    for (const sd of [-1, 1]) { const py = y0 - 70 - cl * 1.3 + bob * 0.5, px = SH.cx + sd * 98; if (cl > 2 && between(t, 146.2, 146.6) || between(t, 146.85, 147.1)) { ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = STONE2; ctx.lineCap = 'round'; for (let i = 0; i < 2; i++) { ctx.beginPath(); ctx.moveTo(px - 6 + i * 12, py - 40); ctx.lineTo(px - 6 + i * 12, py + 20); ctx.stroke(); } ctx.restore(); } shape(ctx, ell(px, py, 22, 28, 14), C.yellow, { lw: 5, seed: 3 }); if (sc) { ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = STONE2; ctx.lineCap = 'round'; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(px - 10 + i * 10, y0 - 190); ctx.lineTo(px - 10 + i * 10, y0 - 120); ctx.stroke(); } ctx.restore(); } }
  }
  // water in front + surface
  ctx.save(); ctx.globalAlpha = 0.32; ctx.fillStyle = C.blue; ctx.fillRect(SH.x0, y0, 240, WH - y0); ctx.restore();
  ctx.save(); ctx.lineWidth = 7; ctx.strokeStyle = C.white; ctx.lineCap = 'round'; ctx.beginPath(); for (let x = SH.x0 + 4; x <= SH.x1 - 4; x += 8) { const yy = y0 + Math.sin(x * 0.07 + t * 3) * 3 * (1 + rip * 2); x === SH.x0 + 4 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); } ctx.stroke(); ctx.restore();
  if (rip > 0.5) for (let i = 0; i < 3; i++) { const u = ((t * 1.1 + i / 3) % 1); ctx.save(); ctx.globalAlpha = (1 - u) * 0.9; ctx.lineWidth = 5; ctx.strokeStyle = C.white; ctx.beginPath(); ctx.ellipse(SH.cx, y0 + 30 + i * 4, 20 + u * 90, 6 + u * 14, 0, 0, 7); ctx.stroke(); ctx.restore(); }
  if (t >= E.clear && t < E.jump + 0.4) for (let i = 0; i < 4; i++) { const tw = Math.max(0, Math.sin(t * 6 + i * 1.7)); star(ctx, SH.x0 + 40 + i * 54, y0 + 40 + (i % 2) * 50, 6 + 14 * tw, C.white, t + i); }
  // splash
  if (t >= E.splash && t < E.splash + 1.3) { const u = t - E.splash; for (let i = 0; i < 14; i++) { const a = -Math.PI * (0.12 + 0.76 * i / 13), sp = 300 + (i * 97 % 160), px = SH.cx + Math.cos(a) * sp * u * 0.5, py = y0 + Math.sin(a) * sp * u + 520 * u * u; if (py < y0 + 10) { ctx.save(); ctx.globalAlpha = K.clamp(1.3 - u); shape(ctx, [[px, py - 20], [px + 11, py], [px, py + 11], [px - 11, py], [px, py - 20]], '#8ec0ff', { lw: 3.5, seed: 2 }); ctx.restore(); } }
    const k = Math.sin(Math.PI * K.clamp(u / 0.7)); if (k > 0) { const cr = []; for (let i = 0; i <= 12; i++) cr.push([SH.x0 + 10 + i * 220 / 12, y0 - (i % 2 ? 150 : 50) * k * (0.6 + 0.4 * Math.sin(i * 2.1))]); cr.push([SH.x1 - 10, y0 + 6], [SH.x0 + 10, y0 + 6], cr[0]); shape(ctx, cr, C.white, { lw: 5, seed: 7, dot: '#8ec0ff', pitch: 8, rad: 0.3 }); } }
  // sight line
  if (between(t, E.roar + 0.05, w(6, 11) + 0.1)) { const u0 = (t - E.roar) / (w(6, 11) - E.roar); for (let i = 0; i < 3; i++) { const u = K.clamp(u0 - i * 0.12); if (u <= 0 || u >= 1) continue; const yy = K.lerp(WG - 20, SH.wat, u); ctx.save(); ctx.globalAlpha = 1 - u * 0.5; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.strokeStyle = C.white; ctx.beginPath(); ctx.ellipse(SH.cx, yy, 100 - u * 10, 16, 0, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke(); ctx.restore(); } }
  if (t < E.fall - 0.2) lion(ctx, L);
  hare(ctx, Hh);
  const hx = Hh.x + Hh.dir * 14, hy = Hh.y - 113;
  say(ctx, t, E.say, E.look - 0.1, 730, 190, 350, 120, hx - 10, hy - 50, 'DOWN THERE!', { size: 52 });
  if (t >= E.fall && t < E.splash) for (let i = 0; i < 5; i++) { ctx.save(); ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.strokeStyle = C.white; ctx.globalAlpha = 0.85; const lx = SH.x0 + 24 + i * 48, ly = L.y - 260 - (i % 2) * 60; ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(lx, ly - 120); ctx.stroke(); ctx.restore(); }
}

// ---------- set 4: home again (paragraph 8) ----------
const Hm = { back: w(7, 3) + 0.3, gather: w(7, 5), ask: w(7, 8), tell: w(7, 12), cheer: w(7, 16), walk: w(7, 18), fear: w(7, 25) };
const HK4 = [[T_HOME, 1110], [Hm.back, 560], [Hm.walk + 1, 560], [END + 1.5, 500]];
function draw4(ctx, t, cam) {
  forestBase(ctx, t);
  const back = [], front = [], G = Hm.gather, hid = t < G + 0.3, cheer = t >= Hm.cheer && t < Hm.walk + 0.4, stroll = t >= Hm.walk + 0.4, ask = t >= Hm.ask && t < Hm.tell, happy = t >= Hm.cheer;
  const cy = (i) => (cheer ? hopY((t - Hm.cheer) / 0.5 + i * 0.23, 62) : 0), eyes = cheer ? 'shut' : ask ? 'wide' : 'open', mth = happy ? 'smile' : 'closed';
  { const KD = [[G, 185], [G + 1.2, 310], [Hm.walk + 0.4, 310], [END + 2, 720]], x = kfn(t, KD), v = vel(KD, t), sink = kfn(t, [[G, 110], [G + 0.5, 0]]);
    const P = { x, y: GR + 2 + sink - cy(0), s: 0.95, dir: 1, ph: x / 14, amp: K.clamp(Math.abs(v) / 30), eyes, mouth: mth, talk: talk(t, [[Hm.ask, we(7, 11)]]), shake: hid ? t : 0 }; (t < G + 0.4 ? back : front).push(() => deer(ctx, P)); }
  const hareAct = (pal, hideX, outX, tj, s, endX, i) => { const x = kfn(t, [[tj, hideX], [tj + 0.6, outX], [Hm.walk + 0.6, outX], [END + 2, endX]]), beh = t < tj + 0.3, mv = stroll ? 1 : 0;
    const P = { x, y: GR + 2 - arc(t, tj, 0.6, 170) - cy(i) - mv * hopY(t / 0.5 + i * 0.3, 30), s, pal, dir: stroll ? Math.sign(endX - outX) : outX < 560 ? 1 : -1, ears: hid ? -0.3 : 1, eyes: hid ? 'wide' : eyes, mouth: mth, shake: beh ? t : 0, raise: cheer ? 1 : 0 }; (beh ? back : front).push(() => hare(ctx, P)); };
  hareAct(1, 265, 420, G + 0.2, 0.85, 380, 1); hareAct(2, 585, 730, G + 0.45, 0.85, 850, 2);
  { const KF = [[G + 0.3, -240], [G + 1.8, 140], [Hm.walk + 0.4, 140], [END + 2, 20]], x = kfn(t, KF), v = vel(KF, t); if (t > G + 0.3) front.push(() => fox(ctx, { x, y: GR + 2 - cy(3), s: 0.9, dir: stroll ? -1 : 1, ph: x / 16, amp: K.clamp(Math.abs(v) / 40), eyes, mouth: happy ? 'smile' : 'closed', tailUp: happy ? 0.9 : 0.2 })); }
  { const KT = [[Hm.walk + 0.4, 890], [END + 2, 800]], x = kfn(t, KT); front.push(() => tortoise(ctx, { x, y: GR + 8 - cy(4) * 0.5, s: 0.9, dir: -1, hide: kfn(t, [[G + 0.2, 1], [G + 0.8, 0]]), eyes, mouth: mth, ph: t * 4, amp: stroll ? 1 : 0 })); }
  { const bx = kfn(t, [[G, 1080], [G + 1.4, 700]]), by = kfn(t, [[G, 200], [G + 1.4, 430]]); if (t > G) { const ox = stroll ? Math.cos(t * 1.1) * 220 - 180 : Math.cos(t * 1.4) * 30, oy = Math.sin(t * 2.3) * 34 - (stroll ? 40 : 0); front.push(() => songbird(ctx, { x: bx + ox, y: by + oy, dir: stroll ? (Math.sin(t * 1.1) > 0 ? -1 : 1) : -1, fly: true, flap: t * 22, eyes })); if (happy) for (let i = 0; i < 2; i++) { const u = ((t * 0.5 + i / 2) % 1); front.push(() => { ctx.save(); ctx.globalAlpha = Math.sin(Math.PI * u); note(ctx, bx + ox + 40 + u * 60, by + oy - 50 - u * 80, 1); ctx.restore(); }); } } }
  ctx.save(); ctx.beginPath(); ctx.rect(0, -300, WW, GR + 292); ctx.clip(); back.forEach((f) => f()); ctx.restore();
  bushes(ctx, hid ? [Math.sin(t * 38) * 2, Math.sin(t * 41 + 1) * 2] : []);
  const x = kfn(t, HK4), v = vel(HK4, t), mv = K.clamp(Math.abs(v) / 40);
  if (t < G) [[110, GR - 78], [265, GR - 88], [585, GR - 76]].forEach(([ex, ey], i) => peekEyes(ctx, ex, ey, Math.sign(x - ex) * 0.9, ((t * 0.6 + i * 0.31) % 1) < 0.07));
  front.forEach((f) => f());
  const Hh = { x, y: GR + 2 - hopY(x / 70, 50) * mv - cy(5), s: 0.72, pal: 0, seed: 3, dir: t < Hm.tell ? -1 : stroll ? -1 : Math.sin(t * 2.2) > 0 ? -1 : 1, ears: 1, eyes: cheer ? 'shut' : 'open', mouth: t > Hm.back ? 'smile' : 'closed', talk: talk(t, [[Hm.tell, we(7, 15)]]), raise: t >= Hm.tell && t < Hm.cheer ? 0.85 + 0.1 * Math.sin(t * 6) : cheer ? 1 : 0, earWig: happy ? Math.sin(t * 10) * 0.1 : 0 };
  hare(ctx, Hh);
  say(ctx, t, Hm.ask + 0.5, Hm.tell - 0.1, 300, 430, 440, 130, 396, 660, 'WHAT HAPPENED?', { size: 48 });
  if (t >= Hm.tell && t < Hm.cheer) { const p = B(t, Hm.tell, 0.25), bx = 600, by = 440; ctx.save(); ctx.globalAlpha = K.clamp((Hm.cheer - t) / 0.2); bubble(ctx, bx, by, 330, 250, x - 16, GR - 150, p, '', {});
    if (p >= 1) { shape(ctx, K.rectPts(bx - 60, by + 10, 120, 70), STONE, { lw: 5, seed: 81, dot: STONED, pitch: 9, rad: 0.2, da: 0.5 }); const k = 0.75 + 0.25 * Math.abs(Math.sin(t * 6)), cr = []; for (let i = 0; i <= 10; i++) cr.push([bx - 56 + i * 11.2, by + 10 - (i % 2 ? 70 : 24) * k]); cr.push([bx + 56, by + 14], [bx - 56, by + 14], cr[0]); shape(ctx, cr, '#8ec0ff', { lw: 4, seed: 7 }); sfx(ctx, 'SPLASH!', bx, by - 78, 46, 1, { fill: C.yellow, rot: -0.05 }); } ctx.restore(); }
  fx(ctx, t, Hm.cheer, Hm.walk + 0.5, 'HOORAY!', 500, 400, 110, { rot: -0.05 });
}

// ---------- camera ----------
// the forest and den sets show only a strip of ground (world bottom 1090) and extra sky above; the well set shows the whole cutaway
const BOT = [1090, 1090, 1090, WH, 1090], TOP = [-240, -240, -240, 0, -240];
const CAM = [
  [[0, { x: 470, y: 700, zoom: 1.3 }], [2.2, { x: 560, y: 690, zoom: 1.2 }], [F0.flee, { x: 560, y: 690, zoom: 1.2 }], [w(0, 12), { x: 470, y: 690, zoom: 1.2 }], [F0.prowl, { x: 440, y: 710, zoom: 1.3 }], [F0.turn + 1.2, { x: 480, y: 690, zoom: 1.2 }], [F0.out + 0.6, { x: 400, y: 720, zoom: 1.4 }], [F0.lion, { x: 400, y: 720, zoom: 1.4 }], [w(1, 6), { x: 560, y: 690, zoom: 1.2 }], [F0.calm, { x: 560, y: 690, zoom: 1.2 }], [TL, { x: 500, y: 690, zoom: 1.2 }]],
  [[TL, { x: 430, y: 700, zoom: 1.25 }], [M.turn + 0.5, { x: 430, y: 730, zoom: 1.5 }], [M.fear, { x: 430, y: 730, zoom: 1.5 }], [M.fear + 0.8, { x: 430, y: 700, zoom: 1.25 }], [M.clever, { x: 430, y: 700, zoom: 1.25 }], [M.clever + 1, { x: 440, y: 740, zoom: 1.7 }], [M.walk, { x: 440, y: 740, zoom: 1.6 }], [M.stop, { x: 700, y: 740, zoom: 1.5 }], [M.idea + 0.8, { x: 720, y: 760, zoom: 1.8 }], [T_DEN, { x: 720, y: 760, zoom: 1.85 }]],
  [[T_DEN, { x: 640, y: 700, zoom: 1.3 }], [D.arrive, { x: 650, y: 700, zoom: 1.35 }], [w(3, 9), { x: 500, y: 690, zoom: 1.2 }], [D.shiver, { x: 500, y: 690, zoom: 1.2 }], [D.shiver + 1, { x: 330, y: 740, zoom: 1.6 }], [D.say - 0.3, { x: 330, y: 740, zoom: 1.6 }], [D.say + 0.9, { x: 480, y: 700, zoom: 1.2 }], [D.s0 - 0.5, { x: 480, y: 700, zoom: 1.2 }], [D.s0 + 0.5, { x: 480, y: 640, zoom: 1.08 }], [D.rage, { x: 480, y: 640, zoom: 1.08 }], [D.rage + 0.8, { x: 560, y: 690, zoom: 1.3 }], [D.shout, { x: 520, y: 660, zoom: 1.2 }], [T_WELL, { x: 520, y: 660, zoom: 1.2 }]],
  [[T_WELL, { x: 400, y: 440, zoom: 1.4 }], [E.well, { x: 540, y: 440, zoom: 1.4 }], [E.deep, { x: 640, y: 480, zoom: 1.35 }], [w(5, 6), { x: 680, y: 840, zoom: 1.5 }], [w(5, 8) + 0.6, { x: 680, y: 840, zoom: 1.5 }], [E.jump + 0.6, { x: 560, y: 440, zoom: 1.2 }], [E.creep, { x: 560, y: 440, zoom: 1.2 }], [E.peer, { x: 600, y: 470, zoom: 1.45 }], [E.see, { x: 600, y: 470, zoom: 1.45 }], [w(6, 8), { x: 600, y: 470, zoom: 1.45 }], [135.3, { x: 600, y: 470, zoom: 1.45 }], [135.9, { x: 560, y: 615, zoom: 1.0 }], [E.fall, { x: 560, y: 615, zoom: 1.0 }], [E.splash, { x: 660, y: 760, zoom: 1.25 }], [145.0, { x: 680, y: 840, zoom: 1.45 }], [145.7, { x: 640, y: 640, zoom: 1.15 }], [E.stuck, { x: 680, y: 800, zoom: 1.45 }], [w(6, 23) + 0.5, { x: 680, y: 800, zoom: 1.45 }], [pe(6) - 0.2, { x: 600, y: 615, zoom: 1.0 }], [T_HOME, { x: 600, y: 615, zoom: 1.0 }]],
  [[T_HOME, { x: 600, y: 700, zoom: 1.25 }], [Hm.back, { x: 560, y: 710, zoom: 1.35 }], [Hm.gather, { x: 560, y: 710, zoom: 1.35 }], [Hm.gather + 1.6, { x: 480, y: 690, zoom: 1.2 }], [Hm.tell - 0.3, { x: 480, y: 690, zoom: 1.2 }], [Hm.tell + 0.8, { x: 540, y: 650, zoom: 1.3 }], [Hm.cheer - 0.2, { x: 540, y: 650, zoom: 1.3 }], [Hm.cheer + 0.5, { x: 500, y: 680, zoom: 1.2 }], [DUR, { x: 500, y: 690, zoom: 1.2 }]],
];
const camAt = (t) => { const set = setAt(t), c = K.camAt(CAM[set], t), cut = [0, TL, T_DEN, T_WELL, T_HOME][set], z = c.zoom * (set > 1 ? 1 + 0.07 * (1 - K.beat(t, cut, 0.45)) : 1); return { x: K.clamp(c.x, 500 / z, WW - 500 / z), y: K.clamp(c.y, TOP[set] + 615 / z, BOT[set] - 615 / z), zoom: z }; };
const SHAKES = [[F0.roar, 5], [D.roar, 7], [D.rage, 3], [D.rage + 0.5, 3], [D.rage + 1, 3], [D.shout, 5], [E.roar, 5], [E.echo, 3], [E.splash, 9], [Hm.cheer, 3]];
const shakeAt = (t) => SHAKES.reduce((a, [h, amp]) => a + K.spring(t, h, amp, 11, 8), 0);

// ---------- overlays (panel coordinates: style primitives) ----------
function overlays(ctx, t, cam, S, set) {
  const tp = (x, y) => toPanel(x, y, cam), lab = (text, x, y, a, b, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha = K.env(t, a, b, 0.05, 0.3); S.label(ctx, text, x, y, B(t, a, 0.3), { size: 38, ...o }); ctx.restore(); };
  const emph = (wx, wy, r, a, b, word, o = {}) => { if (t < a || t >= b) return; const [cx, cy] = tp(wx, wy); ctx.save(); ctx.globalAlpha = K.clamp((b - t) / 0.5); S.emphasis(ctx, cx, cy, r * cam.zoom, B(t, a, 0.45), { word, ry: 0.8, ...o }); ctx.restore(); };
  const arrow = (a, b, from, to, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha = K.env(t, a, b, 0.05, 0.4); S.arrow(ctx, from, to, B(t, a, 0.6), { width: 24, ...o }); ctx.restore(); };
  if (set === 0) {
    if (t < 3.4) { const ex = K.beat(t, 2.7, 0.6, 'lin'); ctx.save(); ctx.globalAlpha = 1 - ex; ctx.translate(0, -ex * 60); S.title(ctx, 'The Lion and', 500, 200, K.beat(t, 0.15, 0.9, 'lin'), { size: 64, align: 'center' }); S.title(ctx, 'the Hare', 500, 320, K.beat(t, 0.8, 0.9, 'lin'), { size: 64, align: 'center' }); ctx.restore(); }
    const L = lion0(t); emph(L.x - 150, GR - 240, 150, F0.roar, F0.roar + 2.6, 'ROAR!', { wx: -0.9, wy: 0.75 });
    arrow(w(0, 24), pe(0) + 0.9, [500, 400], [tp(850, 180)[0] - 150, tp(850, 180)[1] + 40], { bend: -0.15 });
    lab('broad daylight!', 270, 450, w(0, 24) + 0.3, pe(0) + 0.9, { fill: C.yellow });
    if (t >= w(1, 12) && t < F0.iff - 0.1) { ctx.save(); ctx.globalAlpha = K.env(t, w(1, 12), F0.iff - 0.1, 0.05, 0.3); S.counter(ctx, 1, 560, 250, B(t, w(1, 12), 0.4), { size: 110 }); S.label(ctx, 'animal a day', 560, 375, B(t, w(1, 14), 0.3), { align: 'center', size: 38, fill: C.yellow }); ctx.restore(); }
    if (t >= w(1, 28) && t < TL) { clockFace(ctx, 160, 360, 70, t, B(t, w(1, 28), 0.3)); S.label(ctx, 'for a while', 260, 380, B(t, w(1, 28) + 0.2, 0.3), { size: 38, fill: C.yellow }); }
  }
  if (set === 1) {
    lab('a new morning', 70, 190, TL + 0.75, M.turn + 0.2, { fill: C.yellow });
    const Hh = hero1(t), [hx, hy] = tp(Hh.x + 16, Hh.y - 126);
    arrow(M.turn, M.fear, [hx + 250, hy - 330], [hx + 40, hy - 110], { bend: -0.2, width: 28 });
    lab('his turn!', hx + 150, hy - 330, M.turn + 0.3, M.fear, { fill: C.yellow, size: 44 });
    lab('clever!', hx + 110, hy - 40, w(2, 12), M.walk, { fill: C.yellow, size: 44 });
  }
  if (set === 2) {
    if (t < D.arrive) { ctx.save(); ctx.globalAlpha = K.env(t, T_DEN + 0.2, D.arrive, 0.1, 0.3); clockFace(ctx, 170, 250, 84, t * 1.6, B(t, T_DEN + 0.2, 0.3)); S.label(ctx, 'waiting...', 170, 400, B(t, T_DEN + 0.6, 0.3), { align: 'center', size: 38 }); ctx.restore(); }
    lab('hungry!', 60, 500, D.hungry, D.arrive, { fill: C.yellow });
    const L = lion2(t); emph(L.x + L.dir * 150, L.y - 250, 165, D.roar, D.q1 + 0.3, 'ROAR!', { wx: -0.9, wy: 0.8 });
  }
  if (set === 3) {
    arrow(E.well + 0.1, E.deep + 0.3, tp(520, 250), tp(650, 420), { bend: -0.15 }); lab('the well', tp(380, 250)[0], tp(380, 250)[1], E.well + 0.3, E.deep + 0.3, { fill: C.yellow, size: 44 });
    arrow(E.deep + 0.5, E.jump, tp(SH.cx - 60, 580), tp(SH.cx - 60, 960), { bend: 0 }); lab('so deep!', tp(840, 760)[0] - 60, tp(840, 760)[1], E.deep + 0.7, E.jump, { fill: C.yellow, size: 44 });
    lab('clear water', tp(840, 1060)[0] - 110, tp(840, 1060)[1], E.clear + 0.2, E.jump, {});
    const L = lion3(t); if (t < E.leap) emph(L.x + 190, WG - 200, 150, E.roar, E.roar + 1.3, 'ROAR!', { wx: -0.9, wy: 0.9 });
    emph(SH.cx, SH.wat - 30, 150, E.splash, E.stuck, 'SPLASH!', { wx: 0.75, wy: 0.9 });
    lab('no way out!', tp(516, 1080)[0], tp(516, 1080)[1], 146.9, T_HOME, { align: 'right', fill: C.red, color: C.white });
  }
  if (set === 4) {
    lab('home again!', 70, 190, T_HOME + 0.5, Hm.gather, { fill: C.yellow });
    lab('from that day on...', 70, 190, Hm.walk + 0.3, Hm.fear, {});
    lab('no more fear!', 500, 560, Hm.fear, END + 0.4, { align: 'center', fill: C.yellow, size: 52 });
    if (t >= END + 0.45) S.title(ctx, 'THE END', 500, 320, K.beat(t, END + 0.45, 0.8, 'lin'), { size: 84, align: 'center' });
  }
}

// ---------- scene ----------
const inWord = (t) => TIMING.words.some((x) => t >= x.a - 0.03 && t < x.b - 0.05);
const SCENE = {
  duration: DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t; const sh = shakeAt(t);
    ctx.save(); ctx.translate(sh * 0.8, -sh * 0.5);
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196;
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip();
    ctx.translate(px, py); ctx.scale(pw / WW, ph / WH);
    const set = setAt(t), cam = camAt(t);
    if (set === 3 && inPOV(t)) wellPOV(ctx, t);
    else { ctx.save(); K.camera(ctx, WW, WH, cam); [draw0, draw1, draw2, draw3, draw4][set](ctx, t, cam); ctx.restore(); overlays(ctx, t, cam, S, set); }
    if (t > TL0 && t < TL0 + 1.6) S.transition(ctx, WW, WH, K.clamp((t - TL0) / 1.6), { caption: 'ONE MORNING...' });
    ctx.restore(); subtitle(ctx, W, H, t, 1); ctx.restore();
    S.finish(ctx, W, H, t);
  },
  // sparse, quiet effects; anything that lands on a spoken word is played much softer
  score(k, S) {
    const P = (name, t, o = {}) => k.play(name, t, { ...o, gain: (o.gain ?? 0.5) * (inWord(t) ? 0.4 : 1) });
    k.bed(S.sfx.bed, 0, DUR, 0.5);
    [0.2, 0.85].forEach((h, i) => P('pop', h, { pitch: 0.8 + i * 0.1, gain: 0.35 }));
    P('thud', F0.roar, { gain: 0.6 }); P('stamp', F0.roar + 0.05, { gain: 0.4 }); P('whoosh', F0.flee + 0.3, { dur: 0.6, gain: 0.35 }); P('pop', w(0, 13), { gain: 0.4 }); P('tick', w(0, 20), { gain: 0.5 }); P('pop', w(0, 24) + 0.3, { pitch: 1.2, gain: 0.4 });
    P('pop', F0.out + 0.3, { pitch: 1.1, gain: 0.4 }); P('pop', F0.out + 0.55, { pitch: 1.3, gain: 0.4 }); P('ding', w(1, 3), { gain: 0.35 }); P('pop', w(1, 10), { gain: 0.45 }); P('stamp', w(1, 12), { gain: 0.35 }); P('pop', F0.iff, { pitch: 0.9, gain: 0.45 }); P('pop', F0.ok, { pitch: 1.3, gain: 0.5 }); P('chime', w(1, 25), { note: 'E6', gain: 0.5 });
    P('whoosh', TL0, { dur: 0.9, gain: 0.55 });
    P('pop', M.turn + 0.3, { gain: 0.45 }); P('wrong', M.fear + 0.2, { gain: 0.3 }); P('chime', w(2, 12), { note: 'A5', gain: 0.4 }); [0, 0.28, 0.56].forEach((d, i) => P('pop', M.think + d, { pitch: 1 + i * 0.15, gain: 0.3 })); for (let i = 0; i < 5; i++) P('tick', M.walk + 0.5 + i * 0.75, { gain: 0.45 }); P('ding', M.idea, { gain: 0.6 }); P('stamp', w(2, 25) + 0.2, { gain: 0.3 });
    for (let i = 0; i < 4; i++) P('tick', T_DEN + 0.5 + i * 0.8, { gain: 0.4, pitch: 0.8 }); P('thud', D.hungry, { gain: 0.3 }); for (let i = 0; i < 3; i++) P('pop', D.arrive + 0.1 + i * 0.42, { pitch: 1.1, gain: 0.3 });
    P('thud', D.roar, { gain: 0.7 }); P('stamp', D.roar + 0.05, { gain: 0.5 }); P('pop', D.q1, { gain: 0.4 }); P('pop', D.q2, { gain: 0.4 }); P('pop', D.say, { pitch: 1.3, gain: 0.4 }); P('wrong', D.trouble, { gain: 0.3 });
    P('pop', D.s0, { pitch: 0.9, gain: 0.45 }); P('stamp', D.stop, { gain: 0.35 }); P('whoosh', D.grab, { dur: 0.3, gain: 0.3 }); P('chime', D.king + 0.3, { note: 'C5', gain: 0.35 }); [0, 0.5, 1].forEach((d) => P('thud', D.rage + d, { gain: 0.4 })); P('stamp', D.shout, { gain: 0.5 }); P('stamp', D.now, { gain: 0.45 });
    for (let i = 0; i < 3; i++) P('pop', T_WELL + 0.4 + i * 0.42, { pitch: 1.1, gain: 0.3 }); P('scribble', E.well + 0.1, { medium: 'brush', dur: 0.6, gain: 0.35 }); P('riser', E.deep + 0.6, { dur: 0.9, gain: 0.25 }); P('chime', E.clear + 0.2, { note: 'E6', gain: 0.4 }); P('whoosh', E.jump, { dur: 0.6, gain: 0.3 }); P('pop', E.jump + 0.8, { gain: 0.45 }); P('pop', E.say, { gain: 0.4 }); P('pop', E.look, { pitch: 1.3, gain: 0.45 });
    for (let i = 0; i < 4; i++) P('tick', E.creep + 0.2 + i * 0.5, { gain: 0.4, pitch: 0.7 }); P('chime', E.see + 0.6, { note: 'A5', gain: 0.35 }); P('wrong', E.enemy + 0.1, { gain: 0.3 });
    P('thud', E.roar, { gain: 0.7 }); P('stamp', E.roar + 0.05, { gain: 0.45 }); P('thud', E.echo + 0.1, { gain: 0.4 }); P('whoosh', E.leap, { dur: 0.7, gain: 0.5 }); P('whoosh', E.fall, { dur: 0.6, gain: 0.45, up: false });
    k.noise({ t: E.splash, dur: 0.9, gain: 0.3 * (inWord(E.splash) ? 0.5 : 1), type: 'bandpass', f: 2600, f2: 500, q: 0.6, send: 0.3 }); P('thud', E.splash, { gain: 0.7 }); [0.5, 0.8, 1.2].forEach((d, i) => P('pop', E.splash + d, { pitch: 1.4 + i * 0.2, gain: 0.25 })); P('wrong', E.stuck + 0.2, { gain: 0.3 }); P('pop', pe(6) - 0.8, { gain: 0.4 });
    for (let i = 0; i < 4; i++) P('pop', T_HOME + 0.5 + i * 0.45, { pitch: 1.1, gain: 0.3 }); [0.2, 0.45, 0.75].forEach((d, i) => P('pop', Hm.gather + d, { pitch: 0.9 + i * 0.2, gain: 0.4 })); P('pop', Hm.ask + 0.5, { gain: 0.4 }); P('pop', Hm.tell, { pitch: 1.2, gain: 0.4 });
    P('stamp', Hm.cheer, { gain: 0.45 }); ['C5', 'E5', 'G5'].forEach((n, i) => P('pluck', Hm.cheer + 0.1 + i * 0.12, { note: n, gain: 0.5 })); P('chime', Hm.walk + 0.3, { note: 'E6', gain: 0.4 }); P('pop', Hm.fear, { gain: 0.4 });
    P('stamp', END + 0.55, { gain: 0.7 }); P('chime', END + 0.95, { note: 'C6', gain: 0.9 });
  },
};
window.SCENE = SCENE;
