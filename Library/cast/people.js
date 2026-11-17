// ===== people: costume layer and extra poses for the Library person figure (added 2026-11-16) =====
// All opt-in. person(ctx, P) (core/helpers.js) draws exactly as before unless P has one of these fields:
//   costume: preset name (COSTUME below): villager, villageWoman, carpenter, merchant, vizier, caliph (= king), prince, lady, maiden,
//            oldWoman, servant, bedouin, ascetic, physician, beanSeller (+ owner, wife, thief: the Thief film's people with the new poses)
//   age:     0..1   beard and hair black -> grey -> white, stoop, eye lines (each preset has its own default age)
//   pal:     { robe, dot, sleeve, sash, trim, cape, pants, shoes ('bare' = bare feet), head, headDot, band, jewel, beard, hair } colour overrides
//   sit:     0..1   blend to seated. seat: 'stool' (draws a stool under the hips, see seatStool) | 'bench' (same height, the scene draws
//            the seat) | 'floor' (cross-legged on the ground). The hips move back and down; the feet stay (nearly) planted.
//   kneel:   0..1   both knees down, body upright (prayer, pleading, at a stone).
//   lie:     0..1   lying on the back, head toward -x (behind), feet toward +x. The origin (P.x, P.y) is then the bed surface under the hips.
//   child:   true   scale 0.62, head 1.25x, no beard.
//   handLW / handRW: hand targets in WORLD coordinates (for reaching a prop). handL / handR stay body-local as in PERSON_HANDS and follow
//            the torso when seated or kneeling, so every gesture works in every pose.
// Every original field still works: ph, amp, lean, drop, tilt, look, aL/aR, handL/handR, eyes, mouth, talk, brow, wink, rot, hold ('stick').
// Sources: the KD-009 carpenter (sit and kneel blends, turban, chin beard), the Thief film person, production/planned_assets.md.

// one record per preset. len: 'long' (ankle), 'knee', 'short' (thigh). head: headwear style (personHeadwear). beard: none|short|full|long|pointed
const COSTUME = {
  villager: { robe: '#3f9d4a', dot: '#2b7a38', len: 'knee', sash: C.red, pants: CREAM, head: 'turban', hc: C.white, hd: C.blue, band: C.red, beard: 'short', tache: true, age: 0.2 },
  villageWoman: { robe: C.red, dot: '#a8160f', len: 'long', head: 'scarf', hc: C.yellow, hd: C.red, woman: true, age: 0.25 },
  carpenter: { robe: C.yellow, dot: C.red, len: 'knee', pants: '#5b3a1e', sleeveLen: 'short', apron: EARTH, head: 'turban', hc: C.white, hd: C.blue, band: C.red, beard: 'short', tache: true, age: 0.25 },
  merchant: { robe: C.blue, dot: '#0d2f80', len: 'long', sash: C.yellow, trim: C.yellow, belly: 1, head: 'bigTurban', hc: C.white, hd: C.blue, jewel: C.red, beard: 'full', tache: true, age: 0.35 },
  vizier: { robe: NAVY, dot: '#2a4fae', len: 'long', trim: C.yellow, cape: C.red, sash: C.yellow, head: 'tallTurban', hc: C.white, hd: C.blue, jewel: C.red, beard: 'pointed', tache: true, age: 0.4 },
  caliph: { robe: C.red, dot: '#a8160f', len: 'long', trim: C.yellow, cape: C.blue, sash: C.yellow, belly: 0.6, head: 'crownTurban', hc: C.white, hd: C.blue, jewel: C.blue, beard: 'full', tache: true, age: 0.45 },
  prince: { robe: C.blue, dot: NAVY, len: 'knee', sash: C.yellow, trim: C.yellow, pants: C.white, head: 'crown', hair: C.black, beard: 'none', age: 0 },
  lady: { robe: C.blue, dot: '#3f7be6', len: 'long', trim: C.yellow, head: 'veil', hc: C.white, hd: C.blue, jewel: C.red, woman: true, age: 0.2 },
  maiden: { robe: C.yellow, dot: C.red, len: 'long', sash: C.red, head: 'buns', hair: C.black, band: C.red, woman: true, age: 0 },
  oldWoman: { robe: '#7a4212', dot: '#5b3010', len: 'long', head: 'shawl', hc: '#3a3a4a', hd: '#5a5a6a', woman: true, age: 0.9 },
  servant: { robe: C.white, dot: '#b9b4c6', len: 'short', sash: C.red, pants: CREAM, sleeveLen: 'short', head: 'cap', hc: C.red, beard: 'none', tache: true, age: 0.15 },
  bedouin: { robe: CREAM, dot: SAND, len: 'long', cape: '#8a501a', capeDot: '#5b3010', head: 'keffiyeh', hc: C.white, hd: C.red, beard: 'short', tache: true, age: 0.35 },
  ascetic: { robe: '#f4ecd8', dot: '#c9bfa6', len: 'long', patches: C.blue, shoes: 'bare', beads: true, head: 'smallTurban', hc: C.white, hd: '#b9b4c6', beard: 'long', tache: true, age: 0.75 },
  physician: { robe: C.white, dot: C.blue, len: 'long', sash: C.yellow, head: 'smallTurban', hc: C.white, hd: C.blue, beard: 'long', tache: true, age: 0.5 },
  beanSeller: { robe: '#c9702a', dot: '#8a4a12', len: 'knee', pants: CREAM, sleeveLen: 'short', apron: C.white, head: 'cap', hc: C.white, hd: '#b9b4c6', beard: 'none', tache: true, age: 0.3 },
  // the Thief film's three people, for the new poses (approximations of their plain-person look)
  owner: { robe: C.white, dot: C.blue, len: 'long', head: 'ownerCap', beard: 'none', tache: true, age: 0.3 },
  wife: { robe: C.yellow, dot: C.red, len: 'long', head: 'bun', hair: C.black, woman: true, age: 0.25 },
  thief: { robe: C.white, stripes: C.black, len: 'short', pants: C.black, head: 'mask', beard: 'none', age: 0.2 },
};
// small shared maths for the people layer (namespaced so story scenes cannot collide with it)
const PEOPLE = {
  lp: (a, b, f) => [K.lerp(a[0], b[0], f), K.lerp(a[1], b[1], f)],
  lpa: (A, B, f) => A.map((p, i) => PEOPLE.lp(p, B[i], f)),
  close: (pts) => [...pts, pts[0]],
  grey: (age) => age < 0.4 ? C.black : age < 0.7 ? '#8c8a94' : C.white,
  hemF: { long: 1, knee: 0.55, short: 0.3 },
  // resolved costume: preset + kind fallback + pal overrides + age
  dress(P) {
    const name = P.costume || (P.kind === 'owner' ? 'owner' : P.kind === 'wife' ? 'wife' : 'thief');
    const D = { ...(COSTUME[name] || COSTUME.villager), ...(P.pal && typeof P.pal === 'object' ? P.pal : {}) };
    D.name = name; D.age = P.age ?? D.age ?? 0.3; if (P.child) { D.age = 0; D.beard = 'none'; D.tache = false; }
    const g = PEOPLE.grey(D.age), pal = P.pal && typeof P.pal === 'object' ? P.pal : {}; D.beardCol = pal.beard || g; D.hairCol = pal.hair || (D.age < 0.4 ? D.hair || C.black : g);
    D.sleeve = D.sleeve || D.robe; return D;
  },
};

// seatStool(ctx, x, y, s): the three-legged stool a person sits on (seat top 48 above y, the person's sitting height)
function seatStool(ctx, x, y, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (const lx of [-24, 0, 24]) seg(ctx, lx * 0.75, -40, lx, 0, 7, EARTHD, 3);
  shape(ctx, [[-32, -50], [32, -50], [32, -38], [-32, -38], [-32, -50]], WOOD, { lw: 4.5, seed: 55 }); ctx.restore();
}

// leg key points for one leg (sd -1 far, +1 near) in feet-local coordinates, blended stand -> sit -> kneel. Returns {hip, knee, foot, hipC}
function personPose(P, sd, sw) {
  const sit = K.clamp(P.sit || 0), kn = K.clamp(P.kneel || 0), seat = P.seat || 'stool', hx = sd * 13, a = sw * sd, L = PEOPLE.lp, lpa = PEOPLE.lpa;
  let pts = [[0, -75], [hx, -75], [hx + Math.sin(a) * 38, -75 + Math.cos(a) * 38], [hx + Math.sin(a) * 76, -75 + Math.cos(a) * 76]];
  if (sit > 0) {
    const S = seat === 'floor' ? [[0, -24], [hx, -24], [sd * 46, -22], [-sd * 14, -8]] : [[-22, -52], [hx - 22, -52], [hx + 18, -56], [hx + 4, 0]];
    pts = lpa(pts, S, sit);
  }
  if (kn > 0) pts = lpa(pts, [[-4, -48], [hx - 4, -48], [hx + 12, -8], [hx - 30, -3]], kn);
  return { hipC: pts[0], hip: pts[1], knee: pts[2], foot: pts[3] };
}
// personSkirt points: the robe below the waist, 6 vertices blended across poses; lf = hem length (1 ankle .. 0.3 thigh)
function personSkirt(P, D, sw) {
  const sit = K.clamp(P.sit || 0), kn = K.clamp(P.kneel || 0), seat = P.seat || 'stool', lf = PEOPLE.hemF[D.len] ?? 1, F = 38 + (D.belly || 0) * 6, H = -6 - (1 - lf) * 70, sx = sw * 9;
  let S = [[-31, -88], [31, -88], [F + sx, H], [F * 0.3 + sx * 1.3, H + 2], [-F * 0.3 + sx * 1.3, H + 2], [-F + sx, H]];
  const ll = K.clamp((lf - 0.5) / 0.5);
  if (sit > 0) S = PEOPLE.lpa(S, seat === 'floor'
    ? [[-31, -38], [31, -38], [K.lerp(42, 58, ll), K.lerp(-28, -30, ll)], [K.lerp(34, 50, ll), K.lerp(-16, -3, ll)], [K.lerp(-34, -50, ll), K.lerp(-16, -3, ll)], [K.lerp(-42, -58, ll), K.lerp(-28, -30, ll)]]
    : [[-53, -64], [9, -64], [48, -68], [K.lerp(46, 48, ll), K.lerp(-44, -4, ll)], [K.lerp(10, -4, ll), K.lerp(-44, -4, ll)], [-58, K.lerp(-42, -30, ll)]], sit);
  if (kn > 0) S = PEOPLE.lpa(S, [[-35, -60], [27, -60], [36, -30], [K.lerp(28, 38, ll), K.lerp(-26, -2, ll)], [K.lerp(-30, -44, ll), K.lerp(-28, -2, ll)], [-40, -32]], kn);
  return S;
}
// personHeadwear(ctx, hx, hy, D, P, layer): headwear, hair and head cloth. layer 'back' (behind the face) or 'front'
function personHeadwear(ctx, hx, hy, D, P, layer) {
  const st = D.head, hc = D.hc || C.white, hd = D.hd, o = (seed) => ({ lw: 5, seed, dot: hd, pitch: 7, rad: 0.2, da: 0.4 }), hair = D.hairCol;
  if (layer === 'back') {
    if (st === 'smallTurban') seg(ctx, hx - 26, hy - 30, hx - 44, hy + 24, 12, hc, 4);   // turban tail
    if (st === 'keffiyeh' || st === 'scarf' || st === 'veil' || st === 'shawl') {
      const low = st === 'veil' ? 130 : st === 'shawl' ? 70 : 52, wd = st === 'veil' ? 54 : 48;
      shape(ctx, PEOPLE.close([[hx - 40, hy - 30], [hx + 40, hy - 30], [hx + wd, hy + low], [hx + 18, hy + low - 10], [hx - 18, hy + low - 10], [hx - wd, hy + low]]), st === 'veil' ? C.white : hc, st === 'veil' ? { lw: 5, seed: 61, dot: C.blue, pitch: 7, rad: 0.15, da: 0.3 } : o(61));
    }
    if (st === 'buns') for (const sd of [-1, 1]) shape(ctx, ell(hx + sd * 26, hy - 36, 14, 13, 16), hair, { lw: 4, seed: 62 });
    if (st === 'bun') shape(ctx, ell(hx, hy - 48, 17, 15, 16), hair, { lw: 4, seed: 34 });
    return;
  }
  if (st === 'turban') { shape(ctx, ell(hx + 2, hy - 30, 40, 17, 24), hc, o(16)); shape(ctx, ell(hx + 2, hy - 46, 30, 15, 22), hc, o(17)); seg(ctx, hx - 30, hy - 32, hx + 34, hy - 40, 2, D.band || C.red, 1.5); }
  else if (st === 'smallTurban') { shape(ctx, ell(hx, hy - 31, 38, 14, 24), hc, o(16)); shape(ctx, ell(hx + 4, hy - 44, 24, 11, 20), hc, o(17)); }
  else if (st === 'bigTurban' || st === 'crownTurban') {
    shape(ctx, ell(hx + 2, hy - 40, 50, 31, 32), hc, o(18));
    ctx.save(); ctx.lineWidth = 3.5; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; for (const k of [0, 1]) { ctx.beginPath(); ctx.ellipse(hx + 2, hy - 30 - k * 16, 44 - k * 8, 12, -0.12, 0.1, Math.PI - 0.4); ctx.stroke(); } ctx.restore();
    if (st === 'crownTurban') { const b = hy - 60, pts = [[hx - 34, b], [hx - 30, b - 30], [hx - 16, b - 14], [hx, b - 40], [hx + 16, b - 14], [hx + 30, b - 30], [hx + 34, b], [hx - 34, b]];
      shape(ctx, pts, C.yellow, { lw: 5, seed: 19, dot: C.red, pitch: 7, rad: 0.2, da: 0.5 }); for (const [jx, jy, jc] of [[0, -40, D.jewel || C.blue], [-30, -30, C.red], [30, -30, C.red]]) shape(ctx, ell(hx + jx, b + jy, 6, 6, 10), jc, { lw: 2.5, seed: 20 }); }
    shape(ctx, ell(hx + 14, hy - 34, 8, 9, 12), D.jewel || C.red, { lw: 3, seed: 20 });
    if (st === 'bigTurban') shape(ctx, PEOPLE.close([[hx + 12, hy - 42], [hx + 26, hy - 86], [hx + 20, hy - 42]]), C.white, { lw: 3, seed: 22 });
  } else if (st === 'tallTurban') {
    shape(ctx, ell(hx, hy - 34, 42, 16, 24), hc, o(16)); shape(ctx, ell(hx, hy - 60, 33, 28, 26), hc, o(18));
    seg(ctx, hx, hy - 88, hx, hy - 104, 5, C.yellow, 3); shape(ctx, ell(hx + 10, hy - 50, 8, 9, 12), D.jewel || C.red, { lw: 3, seed: 20 });
    shape(ctx, PEOPLE.close([[hx + 8, hy - 56], [hx + 34, hy - 110], [hx + 16, hy - 56]]), C.white, { lw: 3, seed: 22 });
  } else if (st === 'crown') {
    const hairPts = [[hx - 38, hy + 2], [hx - 36, hy - 22], [hx - 16, hy - 40], [hx + 16, hy - 40], [hx + 36, hy - 22], [hx + 38, hy + 2], [hx + 28, hy - 16], [hx + 10, hy - 24], [hx - 12, hy - 24], [hx - 28, hy - 16], [hx - 38, hy + 2]];
    shape(ctx, hairPts, D.hairCol, { lw: 4, seed: 33 });
    const b = hy - 32; shape(ctx, [[hx - 28, b], [hx - 26, b - 26], [hx - 13, b - 12], [hx, b - 30], [hx + 13, b - 12], [hx + 26, b - 26], [hx + 28, b], [hx - 28, b]], C.yellow, { lw: 4.5, seed: 19, dot: C.red, pitch: 6, rad: 0.2, da: 0.5 });
    shape(ctx, ell(hx, b - 8, 5, 5, 10), C.red, { lw: 2.5, seed: 20 });
  } else if (st === 'cap') {
    const cp = [...K.circlePts(hx, hy - 20, 37, 26, 20, Math.PI, Math.PI), [hx - 37, hy - 20]]; shape(ctx, cp, hc, hd ? o(23) : { lw: 5, seed: 23 });
    seg(ctx, hx - 35, hy - 22, hx + 35, hy - 22, 4, D.band || hc, 2);
  } else if (st === 'keffiyeh' || st === 'scarf' || st === 'veil' || st === 'shawl') {
    const col = st === 'veil' ? C.white : hc, oo = st === 'veil' ? { lw: 5, seed: 63, dot: C.blue, pitch: 7, rad: 0.15, da: 0.3 } : o(63);
    // hood over the crown and both cheeks, face left open
    const outer = K.circlePts(hx, hy - 2, 46, 48, 24, Math.PI * 0.62, Math.PI * 1.76), inner = K.circlePts(hx, hy + 2, 34, 33, 24, Math.PI * 2.38, -Math.PI * 1.76);
    shape(ctx, [...outer, ...inner, outer[0]], col, oo);
    if (st === 'keffiyeh') { ctx.save(); ctx.lineWidth = 6; ctx.strokeStyle = C.black; for (const k of [0, 1]) { ctx.beginPath(); ctx.ellipse(hx, hy - 30 - k * 8, 40, 9, 0, Math.PI, 0); ctx.stroke(); } ctx.restore(); }
    if (st === 'veil') { ctx.save(); ctx.lineWidth = 5; ctx.strokeStyle = C.yellow; ctx.beginPath(); ctx.ellipse(hx, hy - 26, 38, 9, 0, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke(); ctx.restore(); shape(ctx, ell(hx, hy - 33, 5, 6, 10), D.jewel || C.red, { lw: 2.5, seed: 20 }); }
    if (st === 'shawl') shape(ctx, PEOPLE.close([[hx - 22, hy + 30], [hx + 22, hy + 30], [hx, hy + 52]]), col, o(64));
  } else if (st === 'buns' || st === 'bun' || st === 'hair') {
    const hairPts = [[hx - 38, hy + 6], [hx - 36, hy - 22], [hx - 16, hy - 40], [hx + 16, hy - 40], [hx + 36, hy - 22], [hx + 38, hy + 6], [hx + 28, hy - 14], [hx + 10, hy - 24], [hx - 12, hy - 24], [hx - 28, hy - 14], [hx - 38, hy + 6]];
    shape(ctx, hairPts, D.hairCol, { lw: 4, seed: 33 });
    if (st === 'buns') seg(ctx, hx - 30, hy - 30, hx + 30, hy - 30, 4, D.band || C.red, 2);
    if (st === 'bun') shape(ctx, [[hx - 10, hy - 38], [hx + 10, hy - 38], [hx + 6, hy - 30], [hx - 6, hy - 30], [hx - 10, hy - 38]], C.yellow, { lw: 3, seed: 35 });
  } else if (st === 'ownerCap') {
    const cap = [[hx - 37, hy - 12], [hx - 28, hy - 36], [hx - 6, hy - 52], [hx + 26, hy - 40], [hx + 58, hy - 4 - (P.capDroop ?? 0)], [hx + 62, hy + 18], [hx + 40, hy - 10], [hx + 26, hy - 22], [hx - 2, hy - 24], [hx - 37, hy - 12]];
    shape(ctx, cap, C.yellow, { dot: C.red, pitch: 8, rad: 0.3, lw: 5, seed: 31 }); shape(ctx, ell(hx + 63, hy + 22, 11, 11, 12), C.white, { lw: 4 });
  } else if (st === 'mask') {
    const V = FIG.thief[P.v || 0], hp = ell(hx, hy, 36, 37, 36);
    ctx.save(); K.poly(ctx, hp, true); ctx.clip(); ctx.fillStyle = C.black; ctx.fillRect(hx - 40, hy - 19, 80, 30); ctx.fillStyle = V.hat; ctx.fillRect(hx - 40, hy - 50, 80, 30); ctx.fillStyle = V.band; ctx.fillRect(hx - 40, hy - 22, 80, 7); ctx.restore();
    ink(ctx, hp, 6, 21); shape(ctx, ell(hx, hy - 40, 9, 9, 12), V.band, { lw: 4 });
  }
}
// personBeard(ctx, hx, hy, D): beard (short, full, long, pointed) and moustache in the age colour
function personBeard(ctx, hx, hy, D) {
  const col = D.beardCol, o = { lw: 3, seed: 15 }, b = D.beard;
  if (b === 'short') shape(ctx, [[hx - 30, hy + 16], [hx - 16, hy + 30], [hx, hy + 33], [hx + 16, hy + 30], [hx + 30, hy + 16], [hx + 24, hy + 34], [hx + 8, hy + 46], [hx - 8, hy + 46], [hx - 24, hy + 34], [hx - 30, hy + 16]], col, o);
  else if (b === 'full') shape(ctx, [[hx - 36, hy + 2], [hx - 22, hy + 24], [hx, hy + 32], [hx + 22, hy + 24], [hx + 36, hy + 2], [hx + 38, hy + 30], [hx + 22, hy + 54], [hx, hy + 62], [hx - 22, hy + 54], [hx - 38, hy + 30], [hx - 36, hy + 2]], col, o);
  else if (b === 'long') shape(ctx, [[hx - 32, hy + 8], [hx - 18, hy + 26], [hx, hy + 31], [hx + 18, hy + 26], [hx + 32, hy + 8], [hx + 28, hy + 42], [hx + 10, hy + 80], [hx, hy + 94], [hx - 10, hy + 80], [hx - 28, hy + 42], [hx - 32, hy + 8]], col, o);
  else if (b === 'pointed') shape(ctx, [[hx - 13, hy + 27], [hx + 13, hy + 27], [hx + 6, hy + 56], [hx, hy + 66], [hx - 6, hy + 56], [hx - 13, hy + 27]], col, o);
  if (D.tache) shape(ctx, [[hx - 24, hy + 10], [hx - 10, hy + 6], [hx, hy + 11], [hx + 10, hy + 6], [hx + 24, hy + 10], [hx + 17, hy + 20], [hx + 4, hy + 15], [hx - 4, hy + 15], [hx - 17, hy + 20], [hx - 24, hy + 10]], col, { lw: 3, seed: 14 });
}
// personTorso(ctx, D, shY, hipY): bodice with sash, trim, apron, patches and prayer beads (upper-body coordinates)
function personTorso(ctx, D, shY, hipY) {
  const w = 33 + (D.belly || 0) * 9, tp = [[-30, shY + 8], [30, shY + 8], [w, hipY + 12], [-w, hipY + 12], [-30, shY + 8]];
  if (D.stripes) { ctx.save(); K.poly(ctx, tp, true); ctx.fillStyle = D.robe; ctx.fill(); ctx.clip(); ctx.fillStyle = D.stripes; for (let y = shY; y < hipY + 12; y += 20) ctx.fillRect(-48, y + 2, 96, 9); ctx.restore(); ink(ctx, tp, 5, 11); }
  else shape(ctx, tp, D.robe, D.dot ? { dot: D.dot, pitch: 9, rad: 0.3, lw: 5, seed: 12 } : { lw: 5, seed: 12 });
  if (D.trim) { shape(ctx, [[-12, shY + 8], [12, shY + 8], [0, shY + 30], [-12, shY + 8]], D.trim, { lw: 3.5, seed: 24 }); if (!D.sash) seg(ctx, 0, shY + 30, 0, hipY + 10, 6, D.trim, 2.5); }
  if (D.patches) { shape(ctx, [[-22, shY + 40], [-8, shY + 40], [-8, shY + 54], [-22, shY + 54], [-22, shY + 40]], D.patches, { lw: 3, seed: 25 }); shape(ctx, [[10, hipY - 10], [24, hipY - 10], [24, hipY + 4], [10, hipY + 4], [10, hipY - 10]], D.patches, { lw: 3, seed: 26 }); }
  if (D.apron) { shape(ctx, [[-8, shY + 34], [28, shY + 34], [32, hipY + 34], [-14, hipY + 34], [-8, shY + 34]], D.apron, { lw: 4.5, seed: 13, dot: EARTHD, pitch: 8, rad: 0.2, da: 0.4 }); seg(ctx, -26, shY + 34, 30, shY + 34, 3, EARTHD, 1.5); }
  if (D.sash) { shape(ctx, [[-w - 1, hipY - 6], [w + 1, hipY - 6], [w + 1, hipY + 8], [-w - 1, hipY + 8], [-w - 1, hipY - 6]], D.sash, { lw: 4, seed: 27 }); shape(ctx, [[w - 12, hipY + 4], [w - 2, hipY + 4], [w + 2, hipY + 30], [w - 14, hipY + 26], [w - 12, hipY + 4]], D.sash, { lw: 3.5, seed: 28 }); }
  if (D.beads) for (let i = 0; i <= 10; i++) { const a = Math.PI * (0.1 + 0.8 * i / 10); ctx.fillStyle = EARTHD; ctx.beginPath(); ctx.arc(Math.cos(a) * 20, shY + 10 + Math.sin(a) * 34, 3.6, 0, 7); ctx.fill(); }
}
// personCostumed(ctx, P): the full figure with costume and poses. Called by person() whenever an opt-in field is present.
function personCostumed(ctx, P) {
  const D = PEOPLE.dress(P), s = (P.s || 1) * (P.child ? 0.62 : 1), dir = P.dir || 1, lie = K.clamp(P.lie || 0), age = D.age;
  const sw = (P.amp || 0) * Math.sin(P.ph || 0) * 0.6 * (1 - K.clamp((P.sit || 0) + (P.kneel || 0) + lie));
  const hipY = -75, shY = hipY - 75, hdY = shY - 45 + (P.drop || 0) + age * 6 - (P.child ? 9 : 0), lean = (P.lean || 0) + age * 0.12 * (1 - lie);
  ctx.save(); ctx.translate(P.x, P.y); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s);
  if (lie > 0) { ctx.translate(0, 41 * lie); ctx.translate(0, hipY); ctx.rotate(-Math.PI / 2 * lie); ctx.translate(0, -hipY); }
  const legs = [-1, 1].map((sd) => personPose(P, sd, sw)), hipC = legs[0].hipC, off = [hipC[0], hipC[1] - hipY];
  if (P.seat === 'stool') seatStool(ctx, -22, 0);
  // cape behind everything (upper-body coordinates, never below the ground)
  if (D.cape) { const cb = Math.min(hipY + 62, -8 - off[1]); ctx.save(); ctx.translate(off[0], off[1]); ctx.translate(0, hipY); ctx.rotate(lean * 0.6); ctx.translate(0, -hipY);
    shape(ctx, PEOPLE.close([[-34, shY + 6], [34, shY + 6], [52, cb], [-52, cb]]), D.cape, D.capeDot ? { lw: 5, seed: 29, dot: D.capeDot, pitch: 9, rad: 0.25, da: 0.5 } : { lw: 5, seed: 29 }); ctx.restore(); }
  // legs (far, then near) and feet
  const pants = D.pants || D.robe;
  for (const g of legs) { seg(ctx, g.hip[0], g.hip[1], g.knee[0], g.knee[1], 22, pants, 4.5); seg(ctx, g.knee[0], g.knee[1], g.foot[0], g.foot[1], 20, pants, 4.5);
    if (D.shoes === 'bare') shape(ctx, ell(g.foot[0] + 6, g.foot[1] - 2, 16, 9, 12), C.white, { lw: 3, seed: 3, dot: C.skin, pitch: 5, rad: 0.3 });
    else shape(ctx, ell(g.foot[0] + 6, g.foot[1] - 3, 17, 10, 12), D.shoes || C.black, { lw: 3, seed: 3 }); }
  // skirt of the robe (dress, tunic)
  const sk = personSkirt(P, D, sw), so = D.dot ? { dot: D.dot, pitch: 9, rad: 0.3, lw: 5, seed: 30 } : { lw: 5, seed: 30 };
  if (D.stripes) { ctx.save(); K.poly(ctx, sk, true); ctx.fillStyle = D.robe; ctx.fill(); ctx.clip(); ctx.fillStyle = D.stripes; for (let y = -100; y < 10; y += 20) ctx.fillRect(-80, y, 160, 9); ctx.restore(); ink(ctx, PEOPLE.close(sk), 5, 30); }
  else shape(ctx, PEOPLE.close(sk), D.robe, so);
  if (D.trim) { ctx.save(); K.poly(ctx, sk, true); ctx.clip(); ctx.lineWidth = 16; ctx.strokeStyle = D.trim; ctx.lineJoin = 'round'; K.poly(ctx, [sk[5], sk[4], sk[3], sk[2]]); ctx.stroke(); ctx.restore(); ink(ctx, PEOPLE.close(sk), 5, 30); }
  // upper body: torso, arms, head (body-local, shifted to the blended hips, lean about the hips)
  ctx.save(); ctx.translate(off[0], off[1]); ctx.translate(0, hipY); ctx.rotate(lean); ctx.translate(0, -hipY);
  const hx0 = (P.look || 0) * 4, hs = P.child ? 1.25 : 1, headXf = () => { ctx.translate(hx0, hdY); ctx.rotate((P.tilt || 0) + 0.35 * lie); ctx.scale(hs, hs); ctx.translate(-hx0, -hdY); };
  ctx.save(); headXf(); personHeadwear(ctx, hx0, hdY, D, P, 'back'); ctx.restore();   // drapes, veil, tail, buns: behind the body
  personTorso(ctx, D, shY, hipY);
  const sy0 = shY + 18, toLocal = (w) => { if (!w) return null; let lx = (w[0] - P.x) / (s * dir) - off[0], ly = (w[1] - P.y) / s - off[1]; if (lean) { const c = Math.cos(-lean), n = Math.sin(-lean), y0 = ly - hipY; [lx, ly] = [lx * c - y0 * n, lx * n + y0 * c + hipY]; } return [lx, ly]; };
  const forearm = D.sleeveLen === 'short' ? C.white : D.sleeve;
  const arm = (sd, ang) => { if (!ang) ang = [0.12, 0.05]; const sx = sd * 31, e1 = [sx + Math.sin(ang[0]) * 38, sy0 + Math.cos(ang[0]) * 38], e2 = [e1[0] + Math.sin(ang[1]) * 36, e1[1] + Math.cos(ang[1]) * 36];
    seg(ctx, sx, sy0, e1[0], e1[1], 20, D.sleeve, 4.5); seg(ctx, e1[0], e1[1], e2[0], e2[1], D.sleeveLen === 'short' ? 16 : 18, forearm, 4.5); shape(ctx, ell(e2[0], e2[1], 12, 12, 12), C.white, { lw: 3.5, seed: 5, dot: C.skin, pitch: 5, rad: 0.3 }); return e2; };
  const tL = P.handL || toLocal(P.handLW), tR = P.handR || toLocal(P.handRW);
  const hL = arm(-1, P.aL || (tL && armTo(-1, sy0, tL))), hR = arm(1, P.aR || (tR && armTo(1, sy0, tR)));
  P.hands = [hL, hR];
  if (P.hold === 'stick') { seg(ctx, hR[0] - 4, hR[1] + 24, hR[0] + 26, hR[1] - 112, 13, '#c58a18', 4.5); shape(ctx, ell(hR[0] + 28, hR[1] - 116, 14, 14, 10), '#c58a18', { lw: 4 }); shape(ctx, ell(hR[0], hR[1], 12, 12, 12), C.white, { lw: 3.5, seed: 5, dot: C.skin, pitch: 5, rad: 0.3 }); }
  // head
  ctx.save(); headXf();
  const hp = ell(hx0, hdY, 36, 37, 36); shape(ctx, hp, C.white, { dot: C.skin, pitch: 6, rad: 0.3, lw: 6, seed: 21 });
  const ey = hdY - 4, ex = 13, lk = P.look || 0;
  if (D.head !== 'mask') personBeard(ctx, hx0, hdY, D);
  personHeadwear(ctx, hx0, hdY, D, P, 'front');
  eyeAt(ctx, hx0 - ex + lk * 3, ey, P.wink === 'L' ? 'shut' : P.eyes || 'open', lk); eyeAt(ctx, hx0 + ex + lk * 3, ey, P.wink === 'R' ? 'shut' : P.eyes || 'open', lk);
  ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black;
  if (!D.woman && D.head !== 'mask') for (const sd of [-1, 1]) { const bx = hx0 + sd * ex + lk * 3, br = P.brow || 0; ctx.lineWidth = 6; ctx.strokeStyle = age >= 0.7 ? '#8c8a94' : C.black; ctx.beginPath(); ctx.moveTo(bx - sd * 9, ey - 19 + br * 8); ctx.lineTo(bx + sd * 9, ey - 19 - br * 4); ctx.stroke(); }
  if (D.woman) { ctx.lineWidth = 4; ctx.strokeStyle = C.black; for (const sd of [-1, 1]) { const bx = hx0 + sd * ex + lk * 3; ctx.beginPath(); ctx.moveTo(bx + sd * 8, ey - 6); ctx.lineTo(bx + sd * 15, ey - 11); ctx.moveTo(bx + sd * 9, ey - 1); ctx.lineTo(bx + sd * 16, ey - 3); ctx.stroke(); } }
  if (age > 0.55) { ctx.lineWidth = 2.5; ctx.strokeStyle = C.black; for (const sd of [-1, 1]) { const bx = hx0 + sd * (ex + 16) + lk * 3; ctx.beginPath(); ctx.moveTo(bx, ey - 2); ctx.lineTo(bx + sd * 6, ey - 5); ctx.moveTo(bx, ey + 4); ctx.lineTo(bx + sd * 6, ey + 6); ctx.stroke(); } }
  ctx.restore();
  // mouth (light stroke when it sits on a dark beard)
  const covered = D.beard === 'full' || D.beard === 'long', my = hdY + (D.tache ? 24 : 20), tk = P.talk || 0, m = P.mouth || 'closed';
  ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = covered && D.beardCol === C.black ? C.white : C.black; ctx.lineWidth = 5;
  if (tk > 0 || m === 'open') { const o = Math.max(tk, m === 'open' ? 1 : 0); shape(ctx, ell(hx0, my + 3, 10, 3 + 8 * o, 14), C.black, { lw: 3, seed: 3 }); ctx.fillStyle = C.red; ctx.beginPath(); ctx.ellipse(hx0, my + 3 + 3 * o, 6, 2 + 3 * o, 0, 0, Math.PI * 2); ctx.fill(); }
  else if (m === 'o') shape(ctx, ell(hx0, my + 4, 7, 9, 12), C.black, { lw: 3, seed: 3 });
  else if (m === 'frown') { ctx.beginPath(); ctx.arc(hx0, my + 10, 10, 1.15 * Math.PI, 1.85 * Math.PI); ctx.stroke(); }
  else if (m === 'smile') { ctx.beginPath(); ctx.arc(hx0, my - 4, 11, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke(); }
  else { ctx.beginPath(); ctx.moveTo(hx0 - 8, my + 2); ctx.lineTo(hx0 + 8, my + 2); ctx.stroke(); }
  ctx.restore();
  ctx.restore(); ctx.restore(); ctx.restore();
}
// person(): dispatch. The plain figure is untouched; any opt-in field routes to personCostumed. (registry.js then wraps person with acting())
const PERSON_PLAIN = person;
person = function (ctx, P) {
  return (P.costume != null || P.sit || P.kneel || P.lie || P.child || P.age != null || P.seat || P.handLW || P.handRW || (P.pal && typeof P.pal === 'object')) ? personCostumed(ctx, P) : PERSON_PLAIN(ctx, P);
};
