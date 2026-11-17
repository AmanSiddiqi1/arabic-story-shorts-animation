// ===== more bird kinds on the Library bird (added 2026-11-16, round 3): hawk, dove, sparrow. =====
// Opt-in: bird(ctx, P) with kind 'hawk' | 'dove' | 'sparrow' draws the new kinds; every other kind (lark, crow, y, r, b) goes to the
// original lark rig unchanged (regression test). Same conventions: feet at (x, y), facing dir, body about y -40, head forward.
// Fields shared by the three kinds (plus the acting fields): {x,y,s,dir,kind,pal, fly, flap (-1 down .. 1 up), rot, eyes, brow, beak (0..1.7 open),
//   drop (head), headRot, sag (wing droop; < 0 flung up), tailDrop, shake, ph,amp (walk; stride GAIT.bird * s), silhouette (all black)}
// hawk:    pal 0 falcon (brown, cream barred chest, black moustache, pointed wings), 1 eagle (dark brown, white head, broad fingered wings),
//          2 vulture (dark, bare pink head, white ruff). Upright perch; hooked beak; heavy brow (default 0.6);
//          talons with grip 0..1 (claws curl); carry: 'mouse' | 'lamb' | 'fish' | 'sack' | function(ctx) (drawn hanging from the talons, origin at the grip),
//          swing (radians, use swing(t, tGrab, 0.4)), carryS (scale of the carried thing, default 1). Flying with carry: legs hang down.
// dove:    pal 0 white dove, 1 wood pigeon male (blue-grey, darker head, white neck patch with a green edge, pink chest), 2 female (8 % smaller, paler, no green).
//          puff (-1 sleek .. 1 feathers out in fear), chest 0..1 (chest out: pride, courage).
// sparrow: pal 0 hero (chestnut cap, grey cheek, black bib, cream belly, streaked brown wing), 1 paler with a grey cap, 2 redder with a larger bib.
//          badge: true (a small medal on the chest).
const BIRD_CLASSIC = bird;
const HAWK_PAL = [
  { body: '#8a5a22', dot: '#5b3a1e', wing: '#6e4418', tip: '#3a2410', chest: CREAM, bars: '#8a501a', head: '#8a5a22', beak: '#3a3a4a', cere: C.yellow, legs: C.yellow, tail: '#6e4418', stache: true },
  { body: '#4a2e14', dot: '#2a1a0a', wing: '#3a2410', tip: '#1d120a', chest: '#5b3a1e', bars: null, head: C.white, beak: C.yellow, cere: C.yellow, legs: C.yellow, tail: C.white, fingers: true },
  { body: '#2e2a30', dot: '#141414', wing: '#241f26', tip: '#141414', chest: '#3a343c', bars: null, head: '#f0a0a0', beak: '#b9b4c6', cere: '#f0a0a0', legs: '#b9b4c6', tail: '#241f26', fingers: true, ruff: C.white, bare: true },
];
const DOVE_PAL = [
  { body: C.white, dot: '#b9b4c6', head: C.white, wing: '#e6e2ee', tip: '#b9b4c6', chest: C.white, beak: '#f07a8a', cere: C.white, legs: '#f05a5a', bars: null, tail: '#d6d2e0' },
  { body: '#8a94b0', dot: '#5f6a8a', head: '#6a7494', wing: '#7a84a2', tip: '#2e3244', chest: '#e8a0a8', beak: '#f0b030', cere: C.white, legs: '#f05a5a', bars: '#2e3244', tail: '#6a7494', patch: C.white, edge: '#3f9d4a' },
  { body: '#a8b0c6', dot: '#7d86a2', head: '#949cb6', wing: '#9aa2bc', tip: '#4a5068', chest: '#efc0c4', beak: '#f0b030', cere: C.white, legs: '#f05a5a', bars: '#4a5068', tail: '#949cb6', patch: '#f4f0f8', small: 0.92 },
];
const SPARROW_PAL = [
  { body: '#a0682a', dot: '#6e3a12', cap: '#8a4a1a', cheek: '#c9c4d4', bib: C.black, bibS: 1, belly: CREAM, wing: '#8a501a', streak: '#3a2410', beak: '#3a3a4a', legs: '#c98a6a' },
  { body: '#b08a5a', dot: '#7a5a32', cap: '#9a94a8', cheek: '#e0dce8', bib: '#3a3a4a', bibS: 0.7, belly: '#fff6e4', wing: '#a07a4a', streak: '#5b3a1e', beak: '#4a4a5a', legs: '#c98a6a' },
  { body: '#b5501a', dot: '#7a2408', cap: '#a8400f', cheek: '#d6c8c0', bib: C.black, bibS: 1.4, belly: '#ffe6c8', wing: '#a8400f', streak: '#4a1a08', beak: '#2a2a33', legs: '#c98a6a' },
];
Object.assign(BIRD, { hawk: { body: HAWK_PAL[0].body }, dove: { body: DOVE_PAL[0].body }, sparrow: { body: SPARROW_PAL[0].body } });

// shared bird parts for the new kinds
const BIRDK = {
  // legs + feet. hips: [[x, y], [x, y]] (far, near). talon: true for hawk feet (thick toes, black claws, grip curls them)
  legs(ctx, P, hips, col, o = {}) { const ph = (P.ph || 0) * Math.sign(P.dir ?? 1), amp = P.amp ?? 0, g = K.clamp(P.grip || 0);
    hips.forEach(([hx, hy], i) => { const [dx, lift] = BEAST.gait(ph, i ? 0 : Math.PI, 9, 8, amp), fx = hx + 2 + dx, fy = -lift;
      seg(ctx, hx, hy, fx, fy - 2, o.w || 4, col, o.ol ?? 2.5);
      const toe = (a, l) => { const ex = fx + Math.cos(a) * l, ey = fy + Math.sin(a) * l * 0.25; seg(ctx, fx, fy, ex, ey, o.toeW || 3, col, 2);
        if (o.talon) { const ca = a + (a > Math.PI / 2 ? -1 : 1) * (0.9 + 1.2 * g); BEAST.line(ctx, [[ex, ey], [ex + Math.cos(ca) * 8, ey + Math.abs(Math.sin(ca)) * 8]], 3.5); } };
      const L = o.toeL || 10; toe(-0.1, L); toe(0.25, L * 0.9); toe(Math.PI + 0.15, L * 0.7); }); },
  // spread flying wing, polygon along +x, rotated so it points back (-x) and up/down with flap
  wing(ctx, pts, flap, col, tip, o = {}) { const a = Math.PI + 1.27 * flap + (o.da || 0); ctx.save(); ctx.translate(o.x, o.y); ctx.rotate(a);
    shape(ctx, pts, col, { lw: o.lw || 4.5, seed: o.seed || 4 }); if (tip) { ctx.save(); K.poly(ctx, pts, true); ctx.clip(); ctx.fillStyle = tip; ctx.fillRect(o.len * 0.62, -60, 200, 120); ctx.restore(); ink(ctx, pts, o.lw || 4.5, o.seed || 4); }
    ctx.restore(); },
  beakOpen(P) { return P.beak ?? P.talk ?? 0; },
  // the thing a hawk carries, hanging from its talons (origin at the grip point, hangs toward +y)
  carry(ctx, what, sc) { ctx.save(); ctx.scale(sc, sc);
    if (typeof what === 'function') what(ctx);
    else if (what === 'mouse') rat(ctx, { x: -6, y: 40, s: 0.55, kind: 'mouse', rot: 0.5, eyes: 'wide', tailCurl: -0.6 });
    else if (what === 'lamb') sheep(ctx, { x: -10, y: 74, s: 0.75, kind: 'lamb', hop: 1, eyes: 'wide', mouth: 'o' });
    else if (what === 'fish') { shape(ctx, [[-30, 18], [0, 6], [30, 18], [44, 8], [42, 34], [30, 24], [0, 34], [-30, 22], [-30, 18]], '#8ab0e0', { lw: 4, seed: 9, dot: C.blue, pitch: 6, rad: 0.25, da: 0.5 }); eyeAt(ctx, -18, 20, 'open', 0); }
    else if (what === 'sack') packLoad(ctx, ['sack'], 0, 70, 0.8);
    ctx.restore(); },
};

// ===== hawk (falcon, eagle, vulture). Bird of prey kind (planned_assets.md "hawk (bird kind)", "bird carry"). =====
function birdHawk(ctx, P) {
  const s = P.s || 1, dir = P.dir ?? 1, pal = HAWK_PAL[P.pal || 0] || HAWK_PAL[0], sil = !!P.silhouette, col = (c) => (sil ? C.black : c), fl = P.flap ?? 0;
  ctx.save(); ctx.translate(P.x + (P.shake || 0), P.y); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s);
  const pitch = P.fly ? 1.05 : 0, pv = [0, -62], legsDown = !P.fly || P.carry || (P.grip || 0) > 0.01;
  // talons/legs and the carried thing are drawn in the upright frame
  const hips = [[-6, -22], [6, -20]].map((h) => BEAST.rot(h, pitch, pv)), grip = BEAST.rot([4, 0], pitch, pv);
  const footY = P.fly ? Math.max(hips[0][1], hips[1][1]) + 34 : 0;
  ctx.save(); ctx.translate(pv[0], pv[1]); ctx.rotate(pitch); ctx.translate(-pv[0], -pv[1]);
  const wingPts = pal.fingers ? [[0, -14], [60, -24], [118, -28], [146, -24], [168, -16], [150, -8], [170, -2], [150, 4], [166, 10], [146, 14], [158, 22], [134, 24], [70, 26], [0, 16]] : [[0, -12], [60, -22], [130, -18], [182, -2], [130, 8], [70, 18], [0, 14]];
  if (P.fly) BIRDK.wing(ctx, wingPts, fl * 0.85, col(pal.tip), null, { x: -2, y: -96, da: 0.18, seed: 2, len: 170 });
  // tail
  { const td = P.tailDrop || 0; ctx.save(); ctx.translate(-22, -28); ctx.rotate(-0.4 * td); ctx.translate(22, 28); shape(ctx, [[-14, -34], [-56, 14], [-40, 22], [-2, -18]], col(pal.tail), { lw: 4, seed: 3 }); if (!sil) for (const k of [0.5, 0.75]) BEAST.line(ctx, [[K.lerp(-14, -56, k) + 2, K.lerp(-34, 14, k)], [K.lerp(-2, -40, k), K.lerp(-18, 22, k)]], 3, pal.tip); ctx.restore(); }
  if (!P.fly && legsDown) BIRDK.legs(ctx, P, [[-6, -22], [6, -20]], col(pal.legs), { w: 7, toeW: 4.5, toeL: 13, talon: true });
  // body
  const body = [[-24, -22], [-34, -60], [-24, -96], [0, -114], [24, -108], [36, -80], [32, -44], [16, -20], [-6, -12], [-24, -22]];
  shape(ctx, body, col(pal.body), sil ? { lw: 5.5 } : { lw: 5.5, seed: 5, dot: pal.dot, pitch: 8, rad: 0.15, da: 0.45 });
  if (!sil) { ctx.save(); K.poly(ctx, body, true); ctx.clip(); shape(ctx, ell(18, -60, 20, 40, 20), pal.chest, { lw: 0 }); if (pal.bars) for (let y = -86; y < -24; y += 11) BEAST.line(ctx, [[6, y], [12, y + 4], [18, y], [24, y + 4], [30, y]], 3, pal.bars); ctx.restore(); ink(ctx, body, 5.5, 5); }
  // wing: folded along the back, or the near spread wing when flying
  if (P.fly) BIRDK.wing(ctx, wingPts, fl, col(pal.wing), sil ? null : pal.tip, { x: -4, y: -92, seed: 4, len: 170 });
  else { ctx.save(); ctx.translate(-8, -96); ctx.rotate((P.sag || 0) * 0.6); ctx.translate(8, 96); const w = [[-6, -102], [-28, -86], [-44, -44], [-58, 0], [-36, -22], [-14, -56], [6, -86], [-6, -102]]; shape(ctx, w, col(pal.wing), { lw: 4.5, seed: 6 });
    if (!sil) { ctx.save(); K.poly(ctx, w, true); ctx.clip(); ctx.fillStyle = pal.tip; ctx.fillRect(-70, -30, 50, 40); ctx.restore(); ink(ctx, w, 4.5, 6); } ctx.restore(); }
  // head
  const hx = 20, hy = -124 + (P.drop || 0), hr = P.headRot || 0;
  ctx.save(); if (hr) { ctx.translate(hx - 10, hy + 18); ctx.rotate(hr); ctx.translate(-(hx - 10), -(hy + 18)); }
  if (pal.ruff && !sil) { for (let i = 0; i < 9; i++) { const a = Math.PI * (0.15 + 0.9 * i / 8); shape(ctx, ell(hx - 4 + Math.cos(a) * 24, hy + 26 - Math.sin(a) * 6, 11, 9, 10), pal.ruff, { lw: 3, seed: 10 + i }); } }
  const hrad = pal.bare ? 17 : 22; shape(ctx, ell(hx, hy, hrad + 2, hrad, 20), col(pal.head), sil ? { lw: 5 } : { lw: 5, seed: 7, dot: pal.bare ? '#c87070' : pal.dot, pitch: 7, rad: 0.12, da: pal.head === C.white ? 0.15 : 0.4 });
  if (pal.stache && !sil) shape(ctx, [[hx + 2, hy - 2], [hx + 12, hy + 2], [hx + 6, hy + 22], [hx - 2, hy + 18], [hx + 2, hy - 2]], C.black, { lw: 0 });
  // hooked beak: cere, upper mandible with the hook, lower mandible when open
  const ob = BIRDK.beakOpen(P), bx = hx + hrad - 2;
  if (ob > 0.1) shape(ctx, [[bx, hy + 6], [bx + 20, hy + 6 + ob * 10], [bx + 2, hy + 12]], col(pal.beak), { lw: 3, seed: 8 });
  shape(ctx, [[bx, hy - 10], [bx + 14, hy - 12], [bx + 26, hy - 4], [bx + 28, hy + 10], [bx + 22, hy + 6], [bx + 14, hy + 2], [bx, hy + 6], [bx, hy - 10]], col(pal.beak), { lw: 3.5, seed: 9 });
  if (!sil) { shape(ctx, [[bx - 1, hy - 10], [bx + 8, hy - 11], [bx + 8, hy + 4], [bx - 1, hy + 6]], pal.cere, { lw: 2.5, seed: 11 }); shape(ctx, ell(bx + 4, hy - 4, 2, 2, 8), C.black, { lw: 0 }); }
  if (!sil) { eyeAt(ctx, hx + 6, hy - 6, P.eyes || 'open', 0.8); const br = P.brow ?? 0.6; ctx.save(); ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(hx - 8, hy - 20 - br * 2); ctx.lineTo(hx + 18, hy - 16 + br * 6); ctx.stroke(); ctx.restore(); }
  ctx.restore();
  ctx.restore();
  // flying legs: hang under the body (carry, strike) or tuck back
  if (P.fly) { const hp2 = hips; if (legsDown) { ctx.save(); ctx.translate(0, footY); BIRDK.legs(ctx, { ...P, ph: 0, amp: 0 }, hp2.map(([x, y]) => [x, y - footY]), col(pal.legs), { w: 7, toeW: 4.5, toeL: 13, talon: true }); ctx.restore(); }
    else for (const [x, y] of hp2) seg(ctx, x, y, x - 30, y + 6, 7, col(pal.legs), 2.5); }
  if (P.carry) { ctx.save(); ctx.translate(P.fly ? grip[0] : 4, P.fly ? footY + 2 : 0); ctx.rotate(P.swing || 0); BIRDK.carry(ctx, P.carry, P.carryS ?? 1); ctx.restore(); }
  ctx.restore();
}

// ===== dove (white dove, wood pigeon male / female). Pigeon kind (planned_assets.md "dove (bird kind)"). =====
function birdDove(ctx, P) {
  const pal = DOVE_PAL[P.pal || 0] || DOVE_PAL[0], s = (P.s || 1) * (pal.small || 1), dir = P.dir ?? 1, sil = !!P.silhouette, col = (c) => (sil ? C.black : c), fl = P.flap ?? 0;
  const pf = K.clamp(P.puff || 0, -1, 1), chest = K.clamp(P.chest || 0), bs = 1 + 0.16 * Math.max(0, pf) - 0.06 * Math.max(0, -pf);
  ctx.save(); ctx.translate(P.x + (P.shake || 0), P.y); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s);
  const wingPts = [[0, -12], [50, -18], [96, -12], [116, 0], [96, 12], [50, 18], [0, 12]];
  if (P.fly) BIRDK.wing(ctx, wingPts, fl * 0.85, col(pal.tip), null, { x: -2, y: -54, da: 0.18, seed: 2, len: 116 });
  if (!P.fly) BIRDK.legs(ctx, P, [[-6, -14], [6, -14]], col(pal.legs), { w: 4, toeL: 9 });
  { const td = P.tailDrop || 0; ctx.save(); ctx.translate(-30, -40); ctx.rotate(-0.5 * td); ctx.translate(30, 40); const tl = [[-28, -46], [-70, -54 - fl * 4], [-72, -36], [-28, -32]]; shape(ctx, tl, col(pal.tail), { lw: 4, seed: 3 }); if (pal.bars && !sil) seg(ctx, -64, -54, -66, -36, 6, pal.tip, 0); ctx.restore(); }
  const body = []; for (let i = 0; i <= 32; i++) { const a = i / 32 * Math.PI * 2, j = pf > 0 ? pf * (i % 2 ? 5 : -1) : 0; body.push([Math.cos(a) * (40 * bs + j), -40 + Math.sin(a) * (30 * bs + j)]); }
  shape(ctx, body, col(pal.body), sil ? { lw: 5 } : { lw: 5, seed: 5, dot: pal.dot, pitch: 8, rad: 0.14, da: 0.4 });
  if (!sil) shape(ctx, ell(18 + chest * 8, -36 - chest * 4, 22 + chest * 6, 20 + chest * 4, 18), pal.chest, { lw: 0 });
  if (P.fly) BIRDK.wing(ctx, wingPts, fl, col(pal.wing), sil ? null : pal.tip, { x: -4, y: -50, seed: 4, len: 116 });
  else { ctx.save(); ctx.translate(-4, -50); ctx.rotate(-0.15 + (P.sag || 0) * 0.9); const w = ell(-8, 6, 32 * bs, 14 * bs, 18); shape(ctx, w, col(pal.wing), { lw: 4.5, seed: 6 }); if (pal.bars && !sil) for (const bx of [-14, -2]) seg(ctx, bx, 0, bx - 4, 14, 4, pal.bars, 0); ctx.restore(); }
  const hx = 34 + chest * 6, hy = -70 + (P.drop || 0) - chest * 4, hr = P.headRot || 0;
  ctx.save(); if (hr) { ctx.translate(hx - 12, hy + 14); ctx.rotate(hr); ctx.translate(-(hx - 12), -(hy + 14)); }
  if (pal.patch && !sil) { if (pal.edge) shape(ctx, ell(hx - 10, hy + 18, 13, 7, 12), pal.edge, { lw: 0 }); shape(ctx, ell(hx - 10, hy + 16, 10, 5, 12), pal.patch, { lw: 0 }); }
  shape(ctx, ell(hx, hy, 18, 17, 18), col(pal.head), sil ? { lw: 4.5 } : { lw: 4.5, seed: 7, dot: pal.dot, pitch: 7, rad: 0.12, da: 0.35 });
  const ob = BIRDK.beakOpen(P);
  shape(ctx, [[hx + 15, hy - 4], [hx + 31, hy - 1 - ob * 3], [hx + 15, hy + 3]], col(pal.beak), { lw: 3, seed: 8 });
  if (ob > 0.1) shape(ctx, [[hx + 15, hy + 3], [hx + 28, hy + 4 + ob * 7], [hx + 15, hy + 8]], col(pal.beak), { lw: 3, seed: 9 });
  if (!sil) { shape(ctx, ell(hx + 17, hy - 4, 4, 3, 8), pal.cere, { lw: 2 }); eyeAt(ctx, hx + 4, hy - 4, P.eyes || 'open', 0.8);
    if (P.brow) { ctx.save(); ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(hx - 6, hy - 18 - P.brow * 2); ctx.lineTo(hx + 12, hy - 13 + P.brow * 5); ctx.stroke(); ctx.restore(); } }
  ctx.restore();
  ctx.restore();
}

// ===== sparrow (hero, pale, red). Small brown bird kind (planned_assets.md "sparrow (bird kind)"). No crest. =====
function birdSparrow(ctx, P) {
  const pal = SPARROW_PAL[P.pal || 0] || SPARROW_PAL[0], s = P.s || 1, dir = P.dir ?? 1, sil = !!P.silhouette, col = (c) => (sil ? C.black : c), fl = P.flap ?? 0;
  ctx.save(); ctx.translate(P.x + (P.shake || 0), P.y); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s);
  const wingPts = [[0, -10], [40, -16], [74, -10], [88, 0], [74, 10], [40, 14], [0, 10]];
  if (P.fly) BIRDK.wing(ctx, wingPts, fl * 0.85, col(pal.streak), null, { x: -2, y: -42, da: 0.18, seed: 2, len: 88 });
  if (!P.fly) BIRDK.legs(ctx, P, [[-5, -12], [5, -12]], col(pal.legs), { w: 3.5, toeL: 8 });
  { const td = P.tailDrop || 0; ctx.save(); ctx.translate(-24, -32); ctx.rotate(-0.5 * td); ctx.translate(24, 32); shape(ctx, [[-22, -38], [-52, -58], [-56, -46], [-24, -28]], col(pal.wing), { lw: 4, seed: 3 }); ctx.restore(); }
  const body = ell(0, -32, 31, 24, 22);
  shape(ctx, body, col(pal.body), sil ? { lw: 5 } : { lw: 5, seed: 5, dot: pal.dot, pitch: 7, rad: 0.14, da: 0.4 });
  if (!sil) { shape(ctx, ell(8, -24, 20, 13, 16), pal.belly, { lw: 0 }); const bS = pal.bibS; shape(ctx, [[26, -46], [32, -38], [26, -40 + 14 * bS], [16, -36 + 10 * bS], [18, -46]], pal.bib, { lw: 0 }); }
  if (P.badge && !sil) { seg(ctx, 10, -48, 6, -34, 6, C.red, 1.5); shape(ctx, ell(6, -30, 7, 7, 12), C.yellow, { lw: 2.5, seed: 12 }); star(ctx, 6, -30, 4, C.red); }
  if (P.fly) BIRDK.wing(ctx, wingPts, fl, col(pal.wing), sil ? null : pal.streak, { x: -4, y: -40, seed: 4, len: 88 });
  else { ctx.save(); ctx.translate(-4, -40); ctx.rotate(-0.2 + (P.sag || 0) * 0.9); const w = ell(-6, 4, 24, 11, 16); shape(ctx, w, col(pal.wing), { lw: 4, seed: 6 });
    if (!sil) { for (const sx of [-18, -8, 2]) BEAST.line(ctx, [[sx, -2], [sx - 6, 8]], 3, pal.streak); seg(ctx, -24, 6, 6, 4, 3, C.white, 0); } ctx.restore(); }
  const hx = 24, hy = -54 + (P.drop || 0), hr = P.headRot || 0;
  ctx.save(); if (hr) { ctx.translate(hx - 10, hy + 12); ctx.rotate(hr); ctx.translate(-(hx - 10), -(hy + 12)); }
  const hp = ell(hx, hy, 18, 17, 18);
  shape(ctx, hp, col(pal.body), sil ? { lw: 4.5 } : { lw: 0 });
  if (!sil) { ctx.save(); K.poly(ctx, hp, true); ctx.clip(); ctx.fillStyle = pal.cap; ctx.fillRect(hx - 24, hy - 24, 48, 18); shape(ctx, ell(hx + 4, hy + 6, 13, 9, 14), pal.cheek, { lw: 0 }); ctx.restore(); ink(ctx, hp, 4.5, 7); }
  const ob = BIRDK.beakOpen(P);
  shape(ctx, [[hx + 14, hy - 6], [hx + 28, hy - 1 - ob * 3], [hx + 14, hy + 3]], col(pal.beak), { lw: 3, seed: 8 });
  if (ob > 0.1) shape(ctx, [[hx + 14, hy + 3], [hx + 25, hy + 4 + ob * 7], [hx + 14, hy + 8]], col(pal.beak), { lw: 3, seed: 9 });
  if (!sil) { eyeAt(ctx, hx + 4, hy - 4, P.eyes || 'open', 0.8);
    if (P.brow) { ctx.save(); ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(hx - 6, hy - 18 - P.brow * 2); ctx.lineTo(hx + 12, hy - 13 + P.brow * 5); ctx.stroke(); ctx.restore(); } }
  ctx.restore();
  ctx.restore();
}
// dispatch: new kinds to their drawings, every original kind to the original lark rig (unchanged)
bird = function (ctx, P) { const k = P.kind; if (k === 'hawk') return birdHawk(ctx, P); if (k === 'dove') return birdDove(ctx, P); if (k === 'sparrow') return birdSparrow(ctx, P); return BIRD_CLASSIC(ctx, P); };
