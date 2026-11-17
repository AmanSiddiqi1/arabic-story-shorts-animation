// ===== AN-138 sets (street = Yahya's house, guest room, reception hall), the window clock and the cast builders =====
const YP_GR = 900;
// guest room furniture (measured on stills; see notes.md)
const YP_ROOM = { diwan: [600, 880, 836], table: [330, 450, 822], heap: 520, door: [60, 200, 580], lamp: [730, 240], rug: [560, 900, 900] };
const YP_HOUSE = marketStreetAnchors({ palace: 'lit' }).palace;   // door x 680..820, top 560, step 872

// ---------- the window clock: one time of day for every guest-room scene (dayCycle u) ----------
function ypDays(t) {   // number of turned days in S8 (fractional)
  if (t < 63.82) return 0; if (t < 64.32) return 0.75 * ypE(t, 63.82, 0.5, 'in');
  if (t < 66.2) return 0.75 + (t - 64.32) / 0.27; return 0.75 + (66.2 - 64.32) / 0.27 + (t - 66.2) / 0.2;
}
function ypU(t) {
  if (t < 61.28) return 0.25;
  if (t < 72.24) return 0.25 + ypDays(t);
  if (t < 84.13) return kfn(t, [[72.24, 0.9], [73.42, 1.02]], 'out');
  if (t < 127.24) return 0.75;
  if (t < 150) return 1.05;
  return 1.05 + (t >= 155 ? (Math.min(t, 160.6) - 155) / 0.15 : 0);   // the S16 vision spins again
}
// room dimming from the time of day; strobing kept soft while time spins
const ypRoomNight = (t, u) => dayCycle(u).night * (ypIn(t, 63.9, 72.24) || ypIn(t, 155, 160.7) ? 0.35 : 1);

// ---------- street: Yahya's house is the marketStreet palace facade ----------
function ypStreet(ctx, t, o = {}) {
  const A = marketStreet(ctx, { palette: o.palette || 'clear', palace: 'lit', palaceDoor: o.door || 0, u: o.u, t, props: [['mat', 170, {}], ['pots', 250, {}]], shutters: 1 });
  const D = A.palace.door, lw = o.light ?? 0;
  if (lw > 0) { ctx.save(); ctx.globalAlpha = 0.45 * lw; ctx.fillStyle = dotPat(ctx, C.yellow, 11, 0.4); ctx.beginPath(); ctx.moveTo(D.x0 + 6, D.bottom); ctx.lineTo(D.x1 - 6, D.bottom); ctx.lineTo(D.x1 + 70, 1000); ctx.lineTo(D.x0 - 70, 1000); ctx.closePath(); ctx.fill(); ctx.restore(); }
  return A;
}
// warm lit interior seen through the open house door (drawn over the door's dark inside, under the leaf)
function ypDoorGlow(ctx, a, open = 1) { if (a <= 0 || open <= 0.01) return; const D = YP_HOUSE.door; ctx.save(); K.poly(ctx, townArchPts(D.x0, D.x1, D.top, D.bottom, 'pointed'), true); ctx.clip(); ctx.beginPath(); ctx.rect(D.x0 + (D.x1 - D.x0) * (1 - open) + 3, D.top - 20, D.x1 - D.x0, D.bottom - D.top + 30); ctx.clip(); ctx.globalAlpha = a; ctx.fillStyle = '#ffd98a'; ctx.fillRect(D.x0, D.top, D.x1 - D.x0, D.bottom - D.top); ctx.fillStyle = dotPat(ctx, C.yellow, 10, 0.36); ctx.fillRect(D.x0, D.top, D.x1 - D.x0, D.bottom - D.top); ctx.restore(); }
// night wash over a whole street or room with an optional warm pool (world units)
function ypNight(ctx, a, pools = []) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha = 0.5 * a; ctx.fillStyle = NAVY2; ctx.beginPath(); ctx.rect(-50, -50, 2100, 1400);
  for (const [x, y, r] of pools) { ctx.moveTo(x + r, y); ctx.arc(x, y, r, 0, Math.PI * 2, true); } ctx.fill('nonzero'); ctx.restore();
  for (const [x, y, r] of pools) { ctx.save(); const g = ctx.createRadialGradient(x, y, r * 0.5, x, y, r); g.addColorStop(0, 'rgba(13,34,96,0)'); g.addColorStop(1, `rgba(13,34,96,${0.5 * a})`); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.restore(); }
}

// ---------- guest room: palaceHall merchant variant dressed as a bedroom ----------
function ypRoomOutside(u) { return (c) => { skyCycle(c, u, { hills: false, moonR: 30 }); shape(c, [[-10, 700], [320, 650], [320, 930], [-10, 930]], TOWN_WALLS.clear[0], { lw: 5, seed: 801, dot: C.red, pitch: 12, rad: 0.15, da: 0.3 }); }; }
function ypRoom(ctx, t, o = {}) {
  const u = o.u ?? ypU(t), R = YP_ROOM;
  const A = palaceHall(ctx, { variant: 'merchant', wall: 'ochre', desk: false, shelves: [{ x0: 240, x1: 440, y: 440, goods: 'jars' }], u, t, doorOpen: o.doorOpen ?? 0, outside: ypRoomOutside(u), lampsLit: o.lamp ?? 1, light: o.light });
  ypRug(ctx, R.rug[0], R.rug[1], R.rug[2], o.rug ?? 1, o.rugSkew || 0);
  if (o.table !== false) ypTable(ctx, R.table[0], R.table[1], R.table[2]);
  ypDiwan(ctx, R.diwan[0], R.diwan[1], R.diwan[2], { dent: o.dent || 0, dx: o.dentX ?? 720, cushion: o.cushion ?? 1 });
  return A;
}

// ---------- reception hall ----------
function ypHallOutside(u) { return (c) => { skyCycle(c, u, { hills: false, moonR: 30 }); shape(c, [[-10, 860], [310, 860], [310, 930], [-10, 930]], '#e8c690', { lw: 5, seed: 802, dot: C.red, pitch: 11, rad: 0.18, da: 0.4 }); }; }
function ypHall(ctx, t, o = {}) { return palaceHall(ctx, { variant: 'palace', wall: 'paper', throne: false, cushions: [730], t, outside: ypHallOutside(o.u ?? 0.3) }); }
const YP_YSEAT = [730, 832];   // Yahya cross-legged on the dais cushion

// ---------- cast builders (shared acting fields; LIFE.t gives everyone auto blinks) ----------
const YP_GUEST_PAL = { robe: YP_FADED, dot: YP_FADEDD, shoes: 'bare', sash: C.red, patches: C.blue, hc: '#e9dcc0', hd: YP_FADEDD };
const YP_GUEST_PAL2 = { ...YP_GUEST_PAL, sash: C.yellow };
const ypYahya = (o) => ({ costume: 'vizier', age: 0.55, s: 1.3, seed: 5, y: YP_GR, dir: 1, mouth: 'closed', ...o });
const ypGuest = (o, t) => ({ costume: 'villager', age: 0.3, s: 1.2, seed: 11, y: YP_GR, dir: -1, pal: t != null && t >= 61 ? YP_GUEST_PAL2 : YP_GUEST_PAL, mouth: 'closed', ...o });
const ypTreas = (o) => ({ costume: 'merchant', s: 1.1, seed: 7, y: YP_GR, dir: 1, pal: { robe: YP_GREEN, dot: YP_GREEND, hc: C.yellow, hd: C.red }, mouth: 'closed', ...o });
const ypServA = (o) => ({ costume: 'servant', s: 1.05, seed: 13, y: YP_GR, dir: 1, mouth: 'smile', ...o });
const ypServB = (o) => ({ costume: 'servant', s: 1.05, seed: 17, y: YP_GR, dir: 1, age: 0, pal: { hc: C.blue, sash: C.blue }, mouth: 'smile', ...o });
// walking person: position function -> x, ph, amp (legs never slide)
const ypWalk = (xf, t, s = 1) => walk(xf, t, { stride: 26 * s });
// sneak gait (story motion, proposed for walk()): high-kneed steps that hold on each toe; returns x, ph, amp, bob
function ypSneak(x0, x1, t0, t1, t, steps) {
  const u = K.clamp((t - t0) / (t1 - t0)), n = steps, k = u * n, i = Math.floor(k), f = k - i, e = i >= n ? 1 : K.ease.inOut(K.clamp((f - 0.15) / 0.55));
  const x = K.lerp(x0, x1, (Math.min(i, n) + (i >= n ? 0 : e)) / n), moving = t > t0 && t < t1;
  return { x, ph: (Math.min(i, n) + e) * Math.PI, amp: moving ? 0.55 * Math.sin(Math.PI * e) + 0.1 : 0, bob: moving ? 8 * Math.sin(Math.PI * e) : 0 };
}
