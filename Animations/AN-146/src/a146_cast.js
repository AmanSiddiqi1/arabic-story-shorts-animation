// ===== AN-146 cast builders and the two shop sets (street front, interior) =====
// people at s 1.2..1.25 (faces near y 650), ground y 900. The impostor is the merchant costume with a red cloak and a reddish beard.
const A146_IMP_PAL = { cape: C.red, capeDot: '#8a1410', beard: '#a8431a' };
const A146_WAT_PAL = { robe: C.yellow, dot: '#e8742a', sash: C.blue, head: 'none', pants: CREAM };
const a146Mer = (x, o = {}) => ({ x, y: 900, s: 1.25, dir: 1, costume: 'merchant', seed: 3, ...o });
const a146Imp = (x, o = {}) => ({ x, y: 900, s: 1.25, dir: 1, costume: 'merchant', pal: { ...A146_IMP_PAL }, cloak: 1, seed: 7, ...o });
const a146Thf = (x, o = {}) => ({ x, y: 900, s: 1.25, dir: 1, costume: 'thief', seed: 7, ...o });
const a146Wat = (x, o = {}) => ({ x, y: 900, s: 1.2, dir: -1, costume: 'servant', pal: { ...A146_WAT_PAL }, seed: 11, ...o });
const a146Drv = (x, o = {}) => ({ x, y: 900, s: 1.2, dir: -1, costume: 'bedouin', seed: 13, ...o });
const a146Cus = (x, o = {}) => ({ x, y: 900, s: 1.15, dir: 1, costume: 'villageWoman', seed: 17, ...o });
// the watchman: person + pointed helmet (+ lantern in the left hand when o.lantern, + staff via P.hold = 'stick')
function a146DrawWat(ctx, P, o = {}) {
  if (P.hidden) return; a146Person(ctx, P); const hd = a146Head(P), s = a146S(P) * (P.sq ?? 1);
  a146Helmet(ctx, [hd[0], hd[1] + 6 * s], s, { lag: o.lag || 0, tilt: (P.tip || 0) * Math.sign(P.dir || 1) + (P.tilt || 0) * Math.sign(P.dir || 1) });
  if (o.lantern) a146Lantern(ctx, P.HL[0], P.HL[1], 1.1, o.t || 0, o.lantern);
  return hd;
}
// walking: P from a position function (person stride 24 * s)
const a146Step = (xf, t, s = 1.25) => a146Walk(xf, t, s);
// stepped footfall dust for a walker
function a146Feet(ctx, t, falls, n = 3, seed = 1) { for (const f of falls) if (t >= f.t && t < f.t + 0.6) dustBurst(ctx, f.x, 902, t - f.t, n, 5, 11, 26, 0.5, seed + Math.round(f.t * 10)); }

// ---------- the shop street (marketShop): one street, five lightings ----------
const A146_HOUSES = [
  { x0: -10, x1: 410, top: 500, col: 0, windows: [[70, 580, 90, 100], [250, 580, 90, 100]] },
  { x0: 418, x1: 870, top: 450, col: 1, door: [580, 680, 640, 'flat'], windows: [[712, 610, 130, 112]] },
  { x0: 878, x1: 1010, top: 520, col: 2, windows: [[900, 590, 80, 96]] }];
const A146_WINS = A146_HOUSES.flatMap((h) => h.windows);
const A146_DOOR = { x0: 580, x1: 680, top: 640, cx: 630, lock: [662, 790] };
const A146_STALL = { x0: 40, w: 250, kind: 'cloth', cols: [C.red, C.white] };
// o: {u (time of day), pal ('clear' | 'cold' | 'dusk'), door 0..1, shut 0..1 (shop shutters open), stall 'open' | 'closed', sign 0..1 (dropped in) + signSw,
//     bolts [3 pop values], lit [per window 0..1], lamp 0..1, lock 0..1 (padlock shown), lockShake, dark 0..1 (night overlay), holes, glint}
function a146Street(ctx, t, o = {}) {
  const pal = o.pal || 'clear', shake = o.doorShake || 0;
  ctx.save(); ctx.translate(shake, 0);
  marketStreet(ctx, { w: 1000, palace: false, houses: A146_HOUSES, u: o.u ?? 0.25, palette: pal, doors: [o.door || 0], shutters: [1, o.shut ?? 1, 1], windowsLit: 0, t,
    stalls: [{ ...A146_STALL, state: o.stall || 'closed' }], props: [['barrel', 336, {}], ['crate', 940, { w: 110 }]] });
  ctx.restore();
  // lit windows (stagger by the scene)
  if (o.lit) A146_WINS.forEach((wd, i) => { const a = o.lit[i] || 0; if (a > 0) { ctx.save(); ctx.globalAlpha = 0.85 * a; ctx.fillStyle = '#ffd98a'; ctx.fillRect(wd[0] + 4, wd[1] + 4, wd[2] - 8, wd[3] - 8); ctx.restore(); } });
  // shop sign on a bracket above the door: three cloth stripes, swinging
  const sg = o.sign ?? 1; if (sg > 0) { seg(ctx, 600, 560, 700, 560, 8, '#4a5878', 3); const dy = (1 - K.ease.out(K.clamp(sg))) * -160;
    ctx.save(); ctx.translate(630, 560 + dy); ctx.rotate(o.signSw || 0); seg(ctx, -50, 0, -50, 22, 3, C.black, 0); seg(ctx, 50, 0, 50, 22, 3, C.black, 0);
    shape(ctx, K.rectPts(-80, 22, 160, 50), '#fff3d6', { lw: 5, seed: 600 }); [C.red, C.blue, C.yellow].forEach((c, i) => shape(ctx, K.rectPts(-62 + i * 44, 32, 36, 30), c, { lw: 3, seed: 601 + i })); ctx.restore(); }
  // padlock on the shop door
  if ((o.lock ?? 0) > 0 && (o.door || 0) < 0.2) { const [lx, ly] = A146_DOOR.lock, lk = o.lockShake || 0; ctx.save(); ctx.translate(lx + shake + lk, ly); ctx.save(); ctx.lineWidth = 7; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(0, -12 - (o.hasp || 0) * 10, 11, Math.PI, 0); ctx.stroke(); ctx.lineWidth = 3.5; ctx.strokeStyle = '#b9bfcf'; ctx.stroke(); ctx.restore();
    shape(ctx, K.rectPts(-16, -14, 32, 28), '#d9a441', { lw: 4, seed: 605 }); shape(ctx, ell(0, -2, 4, 5, 8), C.black, { lw: 0 }); ctx.restore(); if (o.glint > 0) star(ctx, lx + 12, ly - 14, 22 * o.glint, C.white); }
  // three cloth bolts on the display window ledge
  if (o.bolts) o.bolts.forEach((p, i) => { const k = K.ease.back(K.clamp(p)); if (k <= 0) return; ctx.save(); ctx.translate(735 + i * 42, 722); ctx.scale(k, k); packLoad(ctx, [{ kind: 'bolt', col: [C.red, C.blue, C.yellow][i] }], 0, 0, 0.9); ctx.restore(); });
  // street lamp on a bracket at the right house
  seg(ctx, 990, 520, 930, 520, 7, '#4a5878', 2.5); hangingLamp(ctx, 940, 590, t, { lit: o.lamp || 0, chain: 520 });
  return { door: A146_DOOR };
}
// the stall front again (occluder), with an optional shake
function a146StallFront(ctx, state = 'closed', dx = 0) { ctx.save(); ctx.translate(dx, 0); townBake(ctx, 'a146stallF' + state, 0, 300, 1000, 630, (c) => marketStall(c, { ...A146_STALL, state })); ctx.restore(); }
// night overlay over the street with light holes; a = 0..1 (the plan's 0.45 at night)
const a146Night = (ctx, a, holes) => a146Dark(ctx, a, [-60, -60, 1120, 1360], holes);

// ---------- the shop interior (palaceHall merchant variant): door left, shelves, desk, window pane, bale alcove right ----------
const A146_HALL = { door: MERCHANT.door, desk: MERCHANT.desk, win: MERCHANT.window, stack: 820 };
// o: {u, door 0..1, light, lamps, doorShake}
function a146Hall(ctx, t, o = {}) {
  palaceHall(ctx, { variant: 'merchant', u: o.u ?? 0.25, doorOpen: o.door || 0, t, treasure: false, lampsLit: o.lamps ?? 0, light: o.light, carpet: false });
  return MERCHANT;
}
