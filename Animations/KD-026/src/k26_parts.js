// ===== KD-026 The Thief and the Devil: parts (helpers, cow, devil, props, icon balloons, strips, sleep meter, inset) =====
// Story constants are prefixed K26_ / k26 so no engine or Library global is redefined.
const K26_DUR = 170.16, K26_GR = 900;
const k26B = (t, a, d, e = 'out') => K.ease[e](K.clamp((t - a) / d));
const k26Pop = (t, a, d = 0.3) => K.ease.back(K.clamp((t - a) / d));
const k26Fade = (t, a, b, f = 0.2) => Math.min(K.clamp((t - a) / f), K.clamp((b - t) / f));
const k26In = (t, a, b) => t >= a && t < b;
// keyed path: [[t, v, ease of the segment ending here], ...]; default ease inOut (stops at keys), 'lin' keeps the speed
function k26Path(t, keys) { if (t <= keys[0][0]) return keys[0][1]; for (let i = 1; i < keys.length; i++) if (t <= keys[i][0]) { const [t0, v0] = keys[i - 1], [t1, v1, e] = keys[i]; return K.lerp(v0, v1, K.ease[e || 'inOut'](K.clamp((t - t0) / (t1 - t0)))); } return keys[keys.length - 1][1]; }
const k26Fn = (keys) => (t) => k26Path(t, keys);
const k26Step = (t, keys) => { let v = keys[0][1]; for (const [a, x] of keys) if (t >= a) v = x; return v; };
// world head point of a standing person P (feet at P.y), for gaze targets and balloons
const k26Head = (P) => [P.x + (P.look || 0) * 4 * (P.dir || 1) * (P.s || 1), P.y + (-195 + (P.drop || 0)) * (P.s || 1) * (P.sq ?? 1)];
// world position of a person's hand i (0 left, 1 right) after it was drawn (P.hands is local, feet at 0,0)
const k26Hand = (P, i) => { const h = (P.hands || [[-40, -110], [40, -110]])[i], s = P.s || 1, d = P.dir || 1, sq = P.sq ?? 1; return [P.x + h[0] * s * d * (1 + (1 - sq) * 0.7), P.y + h[1] * s * sq]; };
const K26_STRIDE = 27;   // person world stride per radian of ph at s 1 (legs 76, swing 0.6)

// ---------- cow (new, side view, feet at (x, y), facing dir) ----------
// About 330 wide x 230 tall at s 1. P: {x, y, s, dir, ph, amp (walk: stride K26_COWSTRIDE * s), headDown 0..1, headA (radians, + = nose up),
//   chew 0..1 (cycle), talk 0..1 (moo), ears (-1 back .. 1 forward), tailSwish (-1..1), lie 0..1, bell (radians), eyes, brow, udder bounce}
const K26_COWSTRIDE = 30, K26_PINK = '#f7a1a1', K26_COWW = '#fffaf0';
function k26CowRaw(ctx, P) {
  const s = P.s || 1, dir = P.dir || 1, lie = K.clamp(P.lie || 0), amp = (P.amp || 0) * (1 - lie), q = (P.ph || 0) * Math.sign(dir || 1);
  const bob = Math.abs(Math.cos(q)) * 4 * amp, cy = -150 + 92 * lie + bob, hipY = cy + 35;
  ctx.save(); ctx.translate(P.x, P.y); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s);
  const leg = (hx, off, far, hind) => {
    const a = amp * 0.42 * Math.sin(q + off), lift = amp * 16 * Math.max(0, Math.cos(q + off)), L = -hipY;
    let foot = [hx + L * Math.sin(a), -lift], knee = [hx + (L * 0.5) * Math.sin(a) + (hind ? -9 : 7), hipY + L * 0.5 - lift * 0.3];
    if (lie > 0) { foot = PEOPLE.lp(foot, [hx + (hind ? 42 : -38), -6], lie); knee = PEOPLE.lp(knee, [hx + (hind ? -16 : 34), -16], lie); }
    const col = far ? '#d9d0bd' : K26_COWW;
    seg(ctx, hx, hipY, knee[0], knee[1], 26, col, 4.5); seg(ctx, knee[0], knee[1], foot[0], foot[1], 20, col, 4.5);
    shape(ctx, [[foot[0] - 11, foot[1] - 12], [foot[0] + 11, foot[1] - 12], [foot[0] + 12, foot[1]], [foot[0] - 12, foot[1]]], '#3a2a1a', { lw: 3, seed: 7 });
  };
  // tail (behind)
  { const sw = (P.tailSwish || 0) * 0.5, bx = -120, byy = cy - 32, tx = bx - 20 + Math.sin(sw) * 70, ty = byy + 92 * Math.cos(sw) * (1 - 0.5 * lie);
    ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(bx, byy); ctx.quadraticCurveTo(bx - 26, byy + 30, tx, ty); ctx.stroke(); ctx.strokeStyle = K26_COWW; ctx.lineWidth = 5; ctx.stroke(); ctx.restore();
    shape(ctx, ell(tx, ty + 6, 9, 15, 12), C.black, { lw: 3, seed: 8 }); }
  leg(-88, Math.PI, true, true); leg(78, 0, true, false);
  // udder
  if (lie < 0.7) { const ub = Math.sin(q * 2) * 2 * amp; shape(ctx, ell(-46, cy + 50 + ub, 26, 15, 18), K26_PINK, { lw: 4, seed: 9 }); for (const tx of [-58, -46, -34]) seg(ctx, tx, cy + 60 + ub, tx, cy + 72 + ub, 6, K26_PINK, 2.5); }
  // body with patches
  const body = ell(0, cy, 128, 54, 40);
  shape(ctx, body, K26_COWW, { lw: 6, seed: 10, dot: '#d8d2c8', pitch: 9, rad: 0.2, da: 0.4 });
  ctx.save(); K.poly(ctx, body, true); ctx.clip(); ctx.fillStyle = C.black;
  for (const [px, py, rx, ry, rot] of [[-70, cy - 26, 40, 30, 0.4], [20, cy + 6, 34, 26, -0.3], [88, cy - 40, 26, 20, 0.2]]) { ctx.beginPath(); ctx.ellipse(px, py, rx, ry, rot, 0, 7); ctx.fill(); }
  ctx.restore(); ink(ctx, body, 6, 10);
  leg(-66, 0, false, true); leg(98, Math.PI, false, false);
  // neck and head
  const hd = K.clamp(P.headDown || 0), nb = [96, cy - 20], hp = [154 + 10 * hd, cy - 38 + 112 * hd - (P.headUp || 0)], ha = (P.headA || 0) - 0.9 * hd + (P.talk || 0) * 0.25;
  shape(ctx, [[nb[0] - 30, nb[1] - 30], [hp[0] - 20, hp[1] - 26], [hp[0] - 4, hp[1] + 24], [nb[0] + 4, nb[1] + 46]], K26_COWW, { lw: 5, seed: 11 });
  // collar and bell
  { const cx = (nb[0] + hp[0]) / 2 + 4, cyy = (nb[1] + hp[1]) / 2 + 12; seg(ctx, cx - 18, cyy - 34, cx + 8, cyy + 26, 11, C.red, 3);
    ctx.save(); ctx.translate(cx + 6, cyy + 26); ctx.rotate(P.bell || 0); seg(ctx, 0, 0, 0, 12, 3, C.black, 0); shape(ctx, [[-10, 12], [10, 12], [14, 32], [-14, 32]], C.yellow, { lw: 3.5, seed: 12 }); shape(ctx, ell(0, 34, 4, 4, 8), C.black, { lw: 1 }); ctx.restore(); }
  ctx.save(); ctx.translate(hp[0], hp[1]); ctx.rotate(-ha);
  const ear = (sd) => { ctx.save(); ctx.translate(-22, -20 + sd * 4); ctx.rotate(-1.9 + sd * 0.35 + (P.ears || 0) * 0.5); shape(ctx, ell(0, 22, 11, 22, 14), K26_COWW, { lw: 4, seed: 13 }); shape(ctx, ell(0, 24, 5, 13, 10), K26_PINK, { lw: 0 }); ctx.restore(); };
  ear(-1);
  for (const sd of [-1, 1]) shape(ctx, [[-10 + sd * 10, -30], [-2 + sd * 16, -54], [6 + sd * 12, -28]], C.yellow, { lw: 3.5, seed: 14 });
  const chew = Math.sin((P.chew || 0) * Math.PI * 2) * 3, mo = K.clamp(P.talk || 0);
  shape(ctx, ell(0, 0, 42, 34, 28), K26_COWW, { lw: 5, seed: 15 });
  ctx.save(); K.poly(ctx, ell(0, 0, 42, 34, 28), true); ctx.clip(); ctx.fillStyle = C.black; ctx.beginPath(); ctx.ellipse(-26, -14, 22, 20, 0.4, 0, 7); ctx.fill(); ctx.restore();
  if (mo > 0.05) shape(ctx, ell(34 + chew, 34, 16, 6 + 12 * mo, 14), '#5a1010', { lw: 3.5, seed: 16 });
  shape(ctx, ell(34 + chew, 16 + mo * 4, 26, 21, 22), K26_PINK, { lw: 4.5, seed: 17 });
  for (const nx of [26, 44]) shape(ctx, ell(nx + chew, 12 + mo * 4, 3.5, 5, 8), C.black, { lw: 0 });
  ear(1);
  const lk = P.look || 0, md = P.eyes || 'open';
  eyeAt(ctx, -10, -8, md, lk); eyeAt(ctx, 12, -11, md, lk);
  if (P.brow) { ctx.save(); ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.strokeStyle = C.black; for (const [ex, sd] of [[-10, -1], [12, 1]]) { ctx.beginPath(); ctx.moveTo(ex - 8, -26 + P.brow * 5 * sd); ctx.lineTo(ex + 8, -26 - P.brow * 5 * sd); ctx.stroke(); } ctx.restore(); }
  ctx.restore();
  P.headW = [P.x + hp[0] * s * dir, P.y + hp[1] * s];
  ctx.restore();
}
const k26Cow = acting(k26CowRaw, () => K26_COWW);
const k26CowHead = (P) => [P.x + (154 + 10 * (P.headDown || 0)) * (P.s || 1) * (P.dir || 1), P.y + (-188 + 92 * (P.lie || 0) + 112 * (P.headDown || 0)) * (P.s || 1)];

// ---------- devil (new costume on the Library person): red skin, horns, pointed ears, goatee, cape with a lagging flap, arrow tail ----------
// k26Devil(ctx, P): every person field; extra: tailCurl 0..1, tailLash (radians), tailHold (tip in the left hand), capeLag (units), capeFlare 0..1,
//   steam 0..1, sack: {open, rot, flip} (held in the right hand). Lids: P.lid or seeded blinks (redrawn over the red face).
const K26_DEVIL_PAL = { robe: '#c81d14', dot: '#8a0f08', trim: C.yellow, cape: C.black, capeDot: '#3a3a3a', sash: C.black, head: 'none', len: 'knee', pants: '#8a0f08', shoes: C.black, jewel: C.yellow };
const K26_RED = '#ff5a48';
function k26Devil(ctx, P) {
  const s = P.s || 1, dir = P.dir || 1, sq = P.sq ?? 1, tip = P.tip || 0, t = LIFE.t ?? 0;
  const lid = Math.max(P.lid || 0, P.noBlink ? 0 : blink(t, P.seed || 11)), Q = { ...P, costume: 'vizier', pal: K26_DEVIL_PAL, age: 0, lid, sq: 1, tip: 0, alpha: null, gaze: P.gaze || [0.9, 0] };
  ctx.save(); if (P.alpha != null) ctx.globalAlpha *= P.alpha;
  ctx.translate(P.x, P.y); if (tip) ctx.rotate(tip * Math.sign(dir)); if (sq !== 1) ctx.scale(1 + (1 - sq) * 0.7, sq); ctx.translate(-P.x, -P.y);
  const legs = personPose(Q, -1, 0), off = [legs.hipC[0], legs.hipC[1] + 75], lean = Q.lean || 0, hipY = -75;
  const local = (fn) => { ctx.save(); ctx.translate(P.x, P.y); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s); ctx.translate(off[0], off[1]); ctx.translate(0, hipY); ctx.rotate(lean); ctx.translate(0, -hipY); fn(); ctx.restore(); };
  // cape flap and tail (behind)
  local(() => { const lag = P.capeLag || 0, fl = K.clamp(P.capeFlare || 0), wv = Math.sin(t * 5) * 4;
    const flap = [[-30, -142], [8, -146], [-26 - lag * 0.4, -20 + wv], [-70 - lag - 40 * fl, -34 - 50 * fl + wv]];
    shape(ctx, PEOPLE.close(flap), C.black, { lw: 5, seed: 71 }); if (fl > 0.05) shape(ctx, PEOPLE.close([[-30, -138], [-66 - lag - 40 * fl, -38 - 50 * fl + wv], [-40 - lag * 0.6, -60]]), C.yellow, { lw: 4, seed: 72 });
    if (!P.tailHold) k26DevilTail(ctx, [-24, -84], null, P.tailCurl || 0, P.tailLash || 0); });
  person(ctx, Q);
  local(() => {
    const hx0 = (P.look || 0) * 4, hdY = -195 + (P.drop || 0), lk = P.look || 0;
    ctx.save(); ctx.translate(hx0, hdY); ctx.rotate(P.tilt || 0); ctx.translate(-hx0, -hdY);
    for (const sd of [-1, 1]) shape(ctx, [[hx0 + sd * 32, hdY - 10], [hx0 + sd * 56, hdY - 30], [hx0 + sd * 36, hdY + 8]], K26_RED, { lw: 4, seed: 73 });
    ctx.save(); K.poly(ctx, ell(hx0, hdY, 36, 37, 36), true); ctx.clip(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = K26_RED; ctx.fillRect(hx0 - 40, hdY - 40, 80, 80); ctx.restore();
    const g = Q.gaze, lx = g[0] * Math.sign(dir), ly = g[1];
    for (const [sd, w] of [[-1, 'L'], [1, 'R']]) eye2(ctx, hx0 + sd * 13 + lk * 3, hdY - 4, P.wink === w ? 'shut' : (P.eyes || 'open'), lx, ly, lid, '#f0705f', !!P.wet);
    for (const sd of [-1, 1]) shape(ctx, [[hx0 + sd * 12, hdY - 30], [hx0 + sd * 30, hdY - 70], [hx0 + sd * 26, hdY - 64], [hx0 + sd * 26, hdY - 26]], C.yellow, { lw: 4, seed: 74 });
    ctx.restore();
    if (P.tailHold) k26DevilTail(ctx, [-24, -84], Q.hands[0], 0, 0);
    if (P.sack) { const h = Q.hands[1]; k26Sack(ctx, h[0], h[1] - 6, 0.8, P.sack); }
    if (P.steam > 0) { ctx.save(); ctx.globalAlpha = K.clamp(P.steam); for (const sd of [-1, 1]) { for (let i = 0; i < 2; i++) { const u = ((t * 1.8 + i * 0.5) % 1); shape(ctx, ell(hx0 + sd * (60 + u * 30), hdY - 20 - u * 40, 9 + u * 9, 8 + u * 7, 12), C.white, { lw: 3, seed: 75 + i }); } } ctx.restore(); }
  });
  ctx.restore();
  P.hands = Q.hands;
}
function k26DevilTail(ctx, b, hand, curl, lash) {
  let pts;
  if (hand) pts = K.bezier(b, [b[0] - 40, b[1] + 50], [hand[0] - 40, hand[1] + 40], [hand[0] - 2, hand[1] - 6], 20);
  else { const c = Math.cos(lash), sn = Math.sin(lash), r = (x, y) => [b[0] + x * c - y * sn, b[1] + x * sn + y * c];
    pts = K.bezier(b, r(-40, 50), r(-100 + 40 * curl, 20 - 40 * curl), r(-96 + 60 * curl, -40 - 10 * curl), 20); }
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; K.poly(ctx, pts); ctx.lineWidth = 11; ctx.strokeStyle = C.black; ctx.stroke(); ctx.lineWidth = 5; ctx.strokeStyle = '#c81d14'; ctx.stroke(); ctx.restore();
  const e = pts[pts.length - 1], p0 = pts[pts.length - 3], a = Math.atan2(e[1] - p0[1], e[0] - p0[0]);
  ctx.save(); ctx.translate(e[0], e[1]); ctx.rotate(a); shape(ctx, [[18, 0], [-6, -12], [0, 0], [-6, 12]], '#c81d14', { lw: 3.5, seed: 76 }); ctx.restore();
}

// ---------- props ----------
// rope from a to b; slack 0 taut .. 1 sagging
function k26Rope(ctx, a, b, slack = 1) { const d = Math.hypot(b[0] - a[0], b[1] - a[1]), sag = slack * Math.min(70, d * 0.25), m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + sag];
  ctx.save(); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.quadraticCurveTo(m[0], m[1] + sag * 0.3, b[0], b[1]); ctx.lineWidth = 9; ctx.strokeStyle = C.black; ctx.stroke(); ctx.lineWidth = 4.5; ctx.strokeStyle = '#d9a441'; ctx.stroke(); ctx.restore(); }
// oil lamp (handle left), flame 0..1
function k26Lamp(ctx, x, y, flame, t, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, [[-24, 0], [26, -4], [16, -18], [-18, -18]], '#e0a020', { lw: 4, seed: 81, dot: '#a8741a', pitch: 6, rad: 0.25, da: 0.5 });
  ctx.save(); ctx.lineWidth = 5; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(-26, -10, 8, 1.2, 5.0); ctx.stroke(); ctx.restore();
  if (flame > 0.02) { const fl = Math.sin(t * 15) * 2; ctx.save(); ctx.globalAlpha = K.clamp(flame); shape(ctx, [[18, -16], [14 + fl, -16 - 34 * flame], [30, -18]], C.yellow, { lw: 3, seed: 82 }); shape(ctx, [[20, -17], [19 + fl * 0.5, -17 - 16 * flame], [26, -18]], C.red, { lw: 0 }); ctx.restore(); }
  ctx.restore(); }
// warm lamp glow (radius r, strength a)
function k26Glow(ctx, x, y, r, a) { if (a <= 0.01) return; ctx.save(); const g = ctx.createRadialGradient(x, y, 10, x, y, r); g.addColorStop(0, `rgba(255,214,90,${0.42 * a})`); g.addColorStop(1, 'rgba(255,214,90,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
  ctx.globalAlpha = 0.16 * a; ctx.fillStyle = dotPat(ctx, C.yellow, 12, 0.34); ctx.beginPath(); ctx.arc(x, y, r * 0.7, 0, 7); ctx.fill(); ctx.restore(); }
// sack held at its mouth (x, y); 110 x 150 at s 1. o: {open 0..1, rot, flat 0..1 (lying on the floor), shake}
function k26Sack(ctx, x, y, s = 1, o = {}) { const op = K.clamp(o.open || 0), fl = K.clamp(o.flat || 0);
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  if (fl > 0) { ctx.scale(1 + 0.3 * fl, 1 - 0.78 * fl); }
  const body = [[-20, 0], [20, 0], [52, 60], [58, 120], [34, 150], [-34, 150], [-58, 120], [-52, 60]];
  shape(ctx, PEOPLE.close(body), '#b9722a', { lw: 5, seed: 83, dot: '#8a501a', pitch: 8, rad: 0.2, da: 0.45 });
  seg(ctx, -10, 40, 4, 120, 2.5, '#8a501a', 0); seg(ctx, 24, 50, 30, 110, 2.5, '#8a501a', 0);
  if (op > 0.02) { shape(ctx, ell(0, -2, 22 + 26 * op, 6 + 16 * op, 20), '#3a1f0c', { lw: 4.5, seed: 84 }); }
  else { seg(ctx, -22, 4, 22, 4, 7, C.red, 2.5); shape(ctx, [[-14, 0], [0, -24], [14, 0]], '#b9722a', { lw: 4, seed: 85 }); }
  ctx.restore(); }
function k26Bowl(ctx, x, y, s = 1, full = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); if (full > 0) shape(ctx, ell(0, -14, 16, 5, 12), CREAM, { lw: 2.5, seed: 86 }); shape(ctx, [[-18, -14], [18, -14], [12, 0], [-12, 0]], C.blue, { lw: 3.5, seed: 87, dot: C.white, pitch: 5, rad: 0.25, da: 0.5 }); ctx.restore(); }
function k26Bread(ctx, x, y, s = 1, bite = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, ell(0, 0, 20, 8, 16), C.yellow, { lw: 3.5, seed: 88, dot: '#c98a3a', pitch: 5, rad: 0.25, da: 0.5 }); if (bite > 0) { ctx.save(); ctx.fillStyle = C.paper; ctx.beginPath(); ctx.arc(20, -2, 9 * bite, 0, 7); ctx.fill(); ctx.restore(); } ctx.restore(); }
// 1ST rosette: yellow disc r 26, red scallops, '1', two ribbon tails; tear 0..1 splits it; half 'L' | 'R' draws one half only
function k26Badge(ctx, x, y, s = 1, o = {}) { const tr = K.clamp(o.tear || 0);
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  for (const sd of (o.half === 'L' ? [-1] : o.half === 'R' ? [1] : [-1, 1])) {
    ctx.save(); ctx.translate(sd * 14 * tr, sd * 4 * tr); ctx.rotate(sd * 0.25 * tr);
    ctx.save(); ctx.beginPath(); if (tr > 0.01 || o.half) { ctx.rect(sd < 0 ? -60 : 0, -60, 60, 140); } else ctx.rect(-60, -60, 120, 140); ctx.clip();
    for (const tx of [-1, 1]) shape(ctx, [[tx * 6, 18], [tx * 22, 18], [tx * 26, 62], [tx * 15, 54], [tx * 6, 62]], C.red, { lw: 3.5, seed: 89 + tx });
    const sc = []; for (let i = 0; i <= 48; i++) { const a = i / 48 * Math.PI * 2; sc.push([Math.cos(a) * (34 + 4 * Math.cos(a * 12)), Math.sin(a) * (34 + 4 * Math.cos(a * 12))]); }
    shape(ctx, sc, C.red, { lw: 4, seed: 91 }); shape(ctx, ell(0, 0, 26, 26, 30), C.yellow, { lw: 4, seed: 92 });
    ctx.font = K.font(34, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = C.black; ctx.fillText('1ST', 0, 2);
    ctx.restore();
    if (tr > 0.01 || o.half) { ctx.save(); ctx.lineWidth = 3.5; ctx.strokeStyle = C.black; ctx.beginPath(); for (let k = 0; k <= 8; k++) { const yy = -38 + k * 12; ctx.lineTo(k % 2 ? 4 * sd : 0, yy); } ctx.stroke(); ctx.restore(); }
    ctx.restore(); }
  ctx.restore(); }
function k26Ladle(ctx, a, b) { seg(ctx, a[0], a[1], b[0], b[1], 7, WOOD, 3); shape(ctx, ell(b[0], b[1] + 6, 13, 9, 12), '#b9b4c6', { lw: 3.5, seed: 93 }); }

// ---------- lettering and balloons ----------
// speech/icon balloon centred at (cx, cy), w x h, tail to tail [x, y]; inside(c) draws in balloon units (origin at the centre), clipped
function k26Balloon(ctx, cx, cy, w, h, tail, p, inside, o = {}) {
  const k = K.ease.back(K.clamp(p)); if (k <= 0) return;
  ctx.save(); ctx.translate(cx, cy); ctx.scale(k, k);
  const pts = ell(0, 0, w / 2, h / 2, 48), lw = o.lw || 6;
  if (tail) { const a = Math.atan2(tail[1] - cy, tail[0] - cx), tp = [[Math.cos(a - 0.3) * w * 0.4, Math.sin(a - 0.3) * h * 0.4], [tail[0] - cx, tail[1] - cy], [Math.cos(a + 0.3) * w * 0.4, Math.sin(a + 0.3) * h * 0.4]];
    shape(ctx, tp, o.fill || C.white, { lw: lw * 0.9, seed: 95 }); }
  shape(ctx, pts, o.fill || C.white, { lw, seed: 96 });
  if (inside) { ctx.save(); K.poly(ctx, ell(0, 0, w / 2 - 4, h / 2 - 4, 48), true); ctx.clip(); inside(ctx); ctx.restore(); }
  ctx.restore();
}
// a picture frame of a wordless strip: x, y top-left, w x h, border col; pops in with p; inside(c) in frame units (origin top-left)
function k26Frame(ctx, x, y, w, h, p, col, inside) { const k = K.ease.back(K.clamp(p)); if (k <= 0) return;
  ctx.save(); ctx.translate(x + w / 2, y + h / 2); ctx.scale(k, k); ctx.translate(-w / 2, -h / 2);
  ctx.fillStyle = 'rgba(20,20,20,0.85)'; ctx.fillRect(8, 8, w, h); ctx.fillStyle = C.white; ctx.fillRect(0, 0, w, h);
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, w, h); ctx.clip(); inside && inside(ctx); ctx.restore();
  ctx.lineWidth = 11; ctx.strokeStyle = col; ctx.strokeRect(5, 5, w - 10, h - 10); ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.strokeRect(0, 0, w, h); ctx.restore(); }
function k26X(ctx, x, y, r, p) { const k = K.ease.back(K.clamp(p)); if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.rotate(0.08); for (const a of [0.78, -0.78]) { ctx.save(); ctx.rotate(a); shape(ctx, K.rectPts(-r, -r * 0.16, 2 * r, r * 0.32), C.red, { lw: 4, seed: 97 }); ctx.restore(); } ctx.restore(); }
function k26Zs(ctx, x, y, n, size = 30, fill = C.white) { for (let i = 0; i < n; i++) sfx(ctx, 'Z', x + i * size * 0.7, y - i * size * 0.6, size * (1 + i * 0.2), 1, { fill, rot: -0.15 }); }
// icon figures (small real characters) used inside balloons and strip frames
const k26IconMan = (c, x, y, s, o = {}) => person(c, { x, y, s, costume: 'ascetic', mouth: o.mouth || 'smile', lid: o.lid, eyes: o.eyes, sit: o.sit, seat: o.sit ? 'floor' : undefined, lie: o.lie, handR: o.handR, handL: o.handL, noBlink: true, talk: o.talk });
const k26IconCow = (c, x, y, s, o = {}) => k26Cow(c, { x, y, s, dir: o.dir || 1, eyes: o.eyes, lid: o.lid ?? 0.3, talk: o.talk, noBlink: true, lie: o.lie, ph: o.ph, amp: o.amp, headA: o.headA });
const k26IconThief = (c, x, y, s, o = {}) => person(c, { kind: 'thief', x, y, s, dir: o.dir || 1, mouth: o.mouth || 'smile', handR: o.handR, handL: o.handL, noBlink: true, ph: o.ph, amp: o.amp, aL: o.aL, aR: o.aR });
const k26IconDevil = (c, x, y, s, o = {}) => k26Devil(c, { x, y, s, dir: o.dir || 1, mouth: o.mouth || 'smile', handR: o.handR, handL: o.handL, noBlink: true, lid: 0.3, sack: o.sack, gaze: o.gaze || [0.8, 0.2] });

// ---------- SLEEP meter (panel space): vertical 10-cell bar; v 0..10 (float), flicker, AWAKE at 0 ----------
function k26Meter(ctx, x, y, v, t, k) { if (k <= 0) return; const n = Math.round(v), cw = 50, ch = 26, gap = 5;
  ctx.save(); ctx.translate(x, y); ctx.scale(K.ease.back(K.clamp(k)), K.ease.back(K.clamp(k)));
  const H = 10 * (ch + gap) + 14; ctx.fillStyle = 'rgba(20,20,20,0.85)'; ctx.fillRect(-cw / 2 - 8 + 6, -6 + 6, cw + 16, H); ctx.fillStyle = C.white; ctx.fillRect(-cw / 2 - 8, -6, cw + 16, H); ctx.lineWidth = 5; ctx.strokeStyle = C.black; ctx.strokeRect(-cw / 2 - 8, -6, cw + 16, H);
  for (let i = 0; i < 10; i++) { const yy = (9 - i) * (ch + gap) + 2, on = i < n; ctx.fillStyle = on ? (n <= 3 ? C.red : n <= 6 ? C.yellow : C.blue) : '#e8e0c8'; ctx.fillRect(-cw / 2, yy, cw, ch); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.strokeRect(-cw / 2, yy, cw, ch); }
  ctx.font = K.font(34, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
  const lab = n <= 0 ? 'AWAKE!' : 'SLEEP'; ctx.lineWidth = 7; ctx.strokeStyle = C.black; ctx.strokeText(lab, 0, -30); ctx.fillStyle = n <= 0 ? C.red : C.yellow; ctx.fillText(lab, 0, -30);
  ctx.font = K.font(40, BF, 400); ctx.strokeText(String(Math.max(0, n)), 0, H + 18); ctx.fillStyle = C.white; ctx.fillText(String(Math.max(0, n)), 0, H + 18);
  ctx.restore(); }

// ---------- inset circle (panel space): draw(c) in world units centred on world point at, zoom z ----------
function k26Inset(ctx, cx, cy, r, at, z, draw, o = {}) { if (r < 2) return;
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.clip(); ctx.fillStyle = NAVY2; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r); ctx.translate(cx, cy); ctx.scale(z, z); ctx.translate(-at[0], -at[1]); draw(ctx); ctx.restore();
  ctx.save(); ctx.lineWidth = 12; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke(); ctx.lineWidth = 5; ctx.strokeStyle = o.col || C.yellow; ctx.beginPath(); ctx.arc(cx, cy, Math.max(0, r - 8), 0, 7); ctx.stroke(); ctx.restore(); }
// dashed sight/gap line
function k26Dash(ctx, a, b, p = 1, col = C.white, w = 5) { if (p <= 0) return; ctx.save(); ctx.setLineDash([14, 12]); ctx.lineCap = 'round'; ctx.lineWidth = w + 4; ctx.strokeStyle = C.black; const e = [K.lerp(a[0], b[0], p), K.lerp(a[1], b[1], p)]; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(e[0], e[1]); ctx.stroke(); ctx.lineWidth = w; ctx.strokeStyle = col; ctx.stroke(); ctx.restore(); }
function k26Leaf(ctx, x, y, rot) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); shape(ctx, ell(0, 0, 11, 5, 10), GREEN, { lw: 3, seed: 98 }); ctx.restore(); }
