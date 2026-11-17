// ===== KD-008 the village (S8 ground 125.98-133.8 and 137-141.25; S10 162.58-166), the low-angle shot (133.8-136), the lake (S11) =====
const kd8RigX = (t) => t < 150 ? kfn(t, [[125.98, 340], [141.25, 640]], 'lin') : kfn(t, [[162.58, 600], [166.0, 760]], 'lin');
const KD8_RIGY = 370, KD8_RIGS = 0.36;
// the flying rig drawn small in a ground shot: rig centre (500, 520) of the air world lands on (x, y)
function kd8RigSmall(ctx, t, x, y, sc, empty) { const R = kd8AirRig(t); ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); ctx.translate(-500, -520); kd8DrawRig(ctx, empty ? { ...R, T: null, bite: false } : R); ctx.restore(); return R; }
function kd8Villagers(t) {
  const s10 = t >= 162.58, rx = kd8RigX(t), rig = [rx, KD8_RIGY + 40];
  const C0 = kd8Pose(t, { x: 400, y: 900, s: 1.3, costume: 'servant', child: true, mouth: 'smile', look: 0, tilt: 0 }, [
    [127.92, { mouth: 'closed', look: 0.3, drop: 6 }], [128.6, { mouth: 'o', tilt: -0.2, drop: 0, eyes: 'wide' }], [129.72, { handRW: [520, 780], eyes: 'open' }, 0.3], [130.3, { handRW: null, handR: PERSON_HANDS.pointUp.R }],
    [131.0, { handR: null }], [137.04, { mouth: 'open', handR: PERSON_HANDS.pointUp.R, eyes: 'squint', tilt: -0.22 }], [139.48, { mouth: 'open' }],
    [162.58, { x: 640, mouth: 'o', handR: null, eyes: 'wide', tilt: 0 }], [163.2, { x: 660 }, 0.6], [163.86, { x: 688, lean: 0.14, tilt: 0.32, eyes: 'shut', mouth: 'frown', handL: PERSON_HANDS.cheeks.L, handR: PERSON_HANDS.cheeks.R }, 0.45]]);
  const M = kd8Pose(t, { x: 560, y: 900, s: 1.3, costume: 'villager', hold: 'stick', mouth: 'closed', lean: 0, look: 0, tilt: 0 }, [
    [130.26, { look: -0.5, tilt: 0.1 }, 0.25], [130.6, { look: 0, tilt: -0.15, hold: null }], [131.69, { lean: -0.09, handR: PERSON_HANDS.cupMouth.R, brow: -0.5 }, 0.4],
    [133.02, { handR: null, aR: [2.45, 2.85], mouth: 'open', lean: -0.04 }, 0.15], [137.04, { mouth: 'open', aR: null, handR: PERSON_HANDS.pointUp.R, brow: 0 }], [139.48, { tilt: -0.18 }],
    [162.58, { mouth: 'o', handR: null, aR: null, tilt: 0, look: 0.6, eyes: 'wide', lean: 0, hold: null }], [163.65, { drop: 16, lid: 0.6, eyes: 'open', mouth: 'frown', look: 0, handR: PERSON_HANDS.chest.R }, 0.8]]);
  const W = kd8Pose(t, { x: 730, y: 900, s: 1.3, costume: 'villageWoman', mouth: 'closed', look: 0, tilt: 0 }, [
    [130.45, { look: -0.5 }, 0.25], [130.9, { look: 0, tilt: -0.12 }], [137.04, { handR: PERSON_HANDS.mouthCover.R, mouth: 'smile', eyes: 'squint', tilt: -0.2 }], [139.48, { handR: PERSON_HANDS.mouthCover.R, tilt: -0.26, mouth: 'smile' }],
    [162.58, { handR: null, tilt: 0, look: 0.6, mouth: 'o', eyes: 'wide' }], [163.86, { handR: PERSON_HANDS.mouthCover.R, handL: PERSON_HANDS.mouthCover.L, look: 0.2, drop: 8 }, 0.5]]);
  // sweeping, the ball, laughing shoulders
  if (t < 130.6) M.lean = 0.06 * Math.sin(t * 5);
  if (t > 137.04 && t < 141.3) { W.drop = 6 * Math.abs(Math.sin(t * 13)); W.tilt += 0.06 * Math.sin(t * 13); M.drop = 3 * Math.abs(Math.sin(t * 11 + 1)); C0.y = 900 - 16 * Math.abs(Math.sin(t * 8)); C0.tilt += 0.08 * Math.sin(t * 8 + 1); }
  for (const P of [C0, M, W]) P.noBlink = s10 && t < 163.6;
  if (s10 && t > 162.9 && t < 163.1) for (const P of [C0, M, W]) P.lid = 1;   // one blink each in the stillness
  // gaze: the shadow, the rig, the place behind the houses
  const gz = (P) => { const hd = [P.x, P.y - 210 * (P.child ? 0.7 : 1) * (P.s || 1)];
    if (s10) return t > 163.65 && P === M ? [0.2, 1] : lookAt(hd, [900, 560]);
    if (P === C0 && t > 127.92 && t < 128.6) return lookAt(hd, [kd8ShadowX(t), 960]);
    if (t > (P === C0 ? 128.6 : P === M ? 130.6 : 130.9)) return lookAt(hd, rig);
    return P === C0 ? [0.4, 0.6] : P === M ? [0, 0.8] : [-0.6, 0.2]; };
  C0.gaze = gz(C0); M.gaze = gz(M); W.gaze = gz(W);
  return [C0, M, W];
}
function kd8Onlookers(t) {
  const X1 = (u) => kfn(u, [[138.5, -60], [139.4, 215]], 'out'), X2 = (u) => kfn(u, [[138.8, 1080], [139.7, 860]], 'out'), rig = [kd8RigX(t), KD8_RIGY + 40];
  const O1 = { ...walk(X1, t, { stride: 12, amp: 60 }), y: 1060, s: 1.5, costume: 'carpenter', mouth: 'open', eyes: 'squint', handL: PERSON_HANDS.hipsHands.L, handR: PERSON_HANDS.hipsHands.R };
  const O2 = { ...walk(X2, t, { stride: 12, amp: 60 }), y: 1075, s: 1.45, dir: -1, costume: 'oldWoman', mouth: 'open', eyes: 'squint', handR: PERSON_HANDS.pointUp.R };
  for (const [P, t0, f] of [[O1, 139.4, 10], [O2, 139.7, 12.5]]) { const k = K.clamp((t - t0 + 0.6) / 0.5); P.tilt = -0.28 * k + 0.07 * Math.sin(t * f); P.drop = 6 * k * Math.abs(Math.sin(t * f)); P.y -= 5 * k * Math.abs(Math.sin(t * f + 1)); P.gaze = lookAt([P.x, P.y - 300], rig); }
  return [O1, O2];
}
const kd8ShadowX = (t) => kfn(t, [[126.6, -150], [127.92, 420], [129.6, 900], [131.0, 1250]], 'lin');
const KD8_VIL_CAM = [[125.98, { x: 500, y: 720, zoom: 1.2 }], [128.4, { x: 500, y: 720, zoom: 1.2 }], [129.6, { x: 500, y: 760, zoom: 1.5 }], [131.0, { x: 560, y: 740, zoom: 1.6 }], [133.8, { x: 560, y: 740, zoom: 1.6 }],
  [137.0, { x: 550, y: 720, zoom: 1.2 }], [139.6, { x: 550, y: 720, zoom: 1.2 }], [141.2, { x: 600, y: 390, zoom: 1.9 }],
  [162.58, { x: 580, y: 760, zoom: 1.3 }], [164.3, { x: 580, y: 760, zoom: 1.3 }], [165.6, { x: 600, y: 540, zoom: 1.15 }], [166.0, { x: 600, y: 540, zoom: 1.15 }]];
const KD8_SC_VIL = { ww: KD8_VW, wh: KD8_VH, cam: KD8_VIL_CAM,
  draw(ctx, t) {
    ctx.drawImage(kd8VillageBack(), 0, 0, KD8_VW, KD8_VH); cloudFlat(ctx, 200 + ((t * 6) % 1100), 200, 0.7);
    const s10 = t >= 162.58;
    // dust over the roof of the last house, after the fall (rising, then settling)
    if (s10) { for (let i = 0; i < 5; i++) { const u = K.clamp((t - 162.06 - i * 0.18) / 3.4), r = 46 + u * 95; ctx.save(); ctx.globalAlpha = 0.92 * (1 - u * 0.85); shape(ctx, ell(820 + (i - 2) * 38, 660 - u * (210 + i * 25), r, r * 0.8, 18), SANDL, { lw: 5, seed: 160 + i, dot: SAND, pitch: 9, rad: 0.25, da: 0.5 }); ctx.restore(); }
      const [a, b, top, o] = KD8_VHOUSES[2]; kd8House(ctx, a, b, top, 904, o); }
    // the rig crossing the sky, its shadow on the lane
    if (!s10) { kd8RigSmall(ctx, t, kd8RigX(t), KD8_RIGY, KD8_RIGS); if (t < 131.2) { const sx = kd8ShadowX(t); ctx.save(); ctx.globalAlpha = 0.22; ctx.fillStyle = C.black; ctx.beginPath(); ctx.ellipse(sx, 965, 150, 60, 0, 0, 7); ctx.fill(); ctx.restore(); halftoneShadow(ctx, sx, 965, 150, 1); } }
    else { const R = kd8RigSmall(ctx, t, kd8RigX(t), 220, 0.4, true);
      if (t > 164.3) { const mid = [kd8RigX(t), 220 + 4]; ctx.save(); ctx.globalAlpha = 0.6 * (1 - K.clamp((t - 165.0) / 1.0)); ctx.setLineDash([8, 14]); ctx.lineWidth = 4; ctx.strokeStyle = C.white; ctx.beginPath(); ctx.moveTo(mid[0], mid[1]); ctx.lineTo(mid[0], mid[1] + 160 * K.clamp((t - 164.3) / 0.8)); ctx.stroke(); ctx.restore(); } }
    const [C0, M, W] = kd8Villagers(t);
    if (s10) person(ctx, C0);
    person(ctx, M); person(ctx, W); if (!s10) person(ctx, C0);
    if (!s10 && t > 138.5) for (const O of kd8Onlookers(t)) person(ctx, O);
    // jar on her head (not after the fall) and the ball
    if (!s10 && t < 137.0) shape(ctx, [[714, 582], [746, 582], [756, 550], [742, 528], [718, 528], [704, 550]], KD8_MUD, { lw: 4, seed: 170, dot: KD8_MUDD, pitch: 6, rad: 0.25, da: 0.4 });
    if (!s10) { let bx = 460, by = 900 - 12 - Math.abs(Math.sin(t * 6)) * 50; if (t > 127.92) { by = 888 - Math.abs(Math.sin(t * 9)) * 30 * Math.exp(-(t - 127.92) * 2); } if (t > 128.6) bx = 460 + (t - 128.6) * 160; if (bx < 1100) shape(ctx, ell(bx, by, 12, 12, 14), C.red, { lw: 3.5, seed: 171, dot: C.yellow, pitch: 5, rad: 0.3 }); }
  },
};
// ---------- low angle (133.8 - 136): past the rooftops up at the three; the man's arm points from the corner ----------
const KD8_SC_UP = { ww: KD8_VW, wh: KD8_VH, cam: [[133.8, { x: 500, y: 615, zoom: 1.0 }], [136.0, { x: 500, y: 600, zoom: 1.04 }]],
  draw(ctx, t) {
    ctx.fillStyle = C.blue; ctx.fillRect(0, 0, KD8_VW, KD8_VH); ctx.fillStyle = dotPat(ctx, SKYDOT, 13, 0.3); ctx.fillRect(0, 0, KD8_VW, KD8_VH);
    cloudFlat(ctx, 760 - (t - 133.8) * 40, 220, 0.8); cloudFlat(ctx, 160 - (t - 133.8) * 30, 520, 0.6);
    const u = (t - 133.8) / 2.2; ctx.save(); ctx.translate(K.lerp(470, 560, u), K.lerp(470, 440, u)); ctx.scale(0.78, 0.78); ctx.translate(-500, -520); kd8DrawRig(ctx, kd8AirRig(t)); ctx.restore();
    // rooftops, seen from below (tilted toward the centre)
    for (const [x0, x1, top, a, sd] of [[-60, 300, 1010, 0.12, 181], [300, 640, 1080, 0, 182], [640, 1060, 990, -0.12, 183]]) { ctx.save(); ctx.translate((x0 + x1) / 2, top); ctx.rotate(a); ctx.translate(-(x0 + x1) / 2, -top); kd8House(ctx, x0, x1, top, 1400, { seed: sd, win: [[x0 + 80, top + 80, 60, 70]] }); ctx.restore(); }
    // the man's raised arm from the lower left
    const k = K.ease.out(K.clamp((t - 133.8) / 0.25)); ctx.save(); ctx.translate(120, 1260); ctx.rotate(-0.5);
    seg(ctx, 0, 60, 0, -260 * k, 46, '#3f9d4a', 6); shape(ctx, ell(0, -280 * k, 30, 34, 14), C.white, { lw: 5, seed: 184, dot: C.skin, pitch: 5, rad: 0.3 }); seg(ctx, 0, -300 * k, 0, -350 * k, 16, C.white, 5); ctx.restore();
  },
};
// ---------- S11: the lake at dusk ----------
const KD8_LAKE_CAM = [[166.0, { x: 470, y: 600, zoom: 1.15 }], [167.3, { x: 520, y: 760, zoom: 1.3 }], [169.1, { x: 520, y: 800, zoom: 1.45 }], [170.6, { x: 520, y: 800, zoom: 1.45 }], [174.45, { x: 510, y: 700, zoom: 1.12 }]];
function kd8LakeDucks(t) {
  const out = [], land = [167.24, 167.42], fin = [[400, 908], [660, 918]];
  for (const k of [0, 1]) {
    const tl = land[k], P = kd8Pose(t, { s: 1.25, pal: k, dir: 1, neck: 0.6, clamp: true, brow: -0.3, headRot: 0.15 }, [[tl, { neck: 0.25 }, 0.5], [169.1, { clamp: false, neck: 0, headRot: 0.2 }, 0.4], [169.6, { headRot: 0.35, lid: k ? 0.2 : 0.5, wet: !!k }], [170.6, { headRot: 0.5, lid: 0.55 }, 1.2], [171.6, { lid: 1 }, 0.4], [172.3, { lid: 0.55 }, 0.5]]);
    if (t < tl) { const u = K.clamp((t - 166.0) / (tl - 166.0)), e = K.ease.out(u); Object.assign(P, { x: K.lerp(k ? -40 : -300, fin[k][0], e), y: K.lerp(k ? 320 : 300, fin[k][1] - 30, e), fly: true, flap: Math.sin(t * 5 + k * 2.1) * (1 - u * 0.6) }); }
    else { P.swim = true; P.x = fin[k][0] + (t - tl) * 4; P.y = fin[k][1] + Math.sin(t * 1.6 + k) * 2; P.sq = landSquash(t, tl, 0.12) * breathe(t, k + 4, 0.015); }
    if (k === 1) { const tf = turnFlip(t, [[0, 1], [169.5, -1]], 0.6); P.dir = tf.dir; }
    out.push(P);
  }
  return out;
}
const KD8_SC_LAKE = { ww: KD8_VW, wh: KD8_VH, cam: KD8_LAKE_CAM,
  draw(ctx, t) {
    ctx.drawImage(kd8LakeBack(), 0, 0, KD8_VW, KD8_VH);
    const WY = 790; ctx.fillStyle = WATERD; ctx.fillRect(0, WY, KD8_VW, KD8_VH - WY); ctx.fillStyle = dotPat(ctx, '#2a62c9', 12, 0.3); ctx.fillRect(0, WY, KD8_VW, KD8_VH - WY);
    ctx.save(); ctx.lineWidth = 7; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(0, WY); ctx.lineTo(KD8_VW, WY); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.strokeStyle = C.yellow; ctx.lineWidth = 5; ctx.lineCap = 'round'; for (let i = 0; i < 8; i++) { const gx = 80 + i * 120 + Math.sin(t * 0.8 + i) * 10, gy = 840 + (i % 3) * 90; ctx.globalAlpha = 0.5 + 0.5 * Math.sin(t * 3 + i * 2); ctx.beginPath(); ctx.moveTo(gx - 16, gy); ctx.lineTo(gx + 16, gy); ctx.stroke(); } ctx.restore();
    // the fish jumps, as in the promise; nobody looks
    if (t > 168.4 && t < 169.4) { const u = (t - 168.4) / 1.0; kd8Fish(ctx, 800 + u * 90, 860 - Math.sin(Math.PI * u) * 130, 0.9, -1.2 + u * 2.4); }
    ripple(ctx, 800, 860, 168.4, t, 0.8); ripple(ctx, 890, 860, 169.35, t, 0.8);
    const D = kd8LakeDucks(t);
    for (const [k, tl] of [[0, 167.24], [1, 167.42]]) { ripple(ctx, D[k].x, D[k].y - 26, tl, t, 1.1); ripple(ctx, D[k].x, D[k].y - 26, tl + 0.7, t, 1.0); }
    // the stick: held in the glide and the landing, then floating between them, turning slowly
    let st;
    if (t < 169.1) st = kd8Grips(kd8Grip(D[0]), kd8Grip(D[1]));
    else { const u = K.clamp((t - 169.1) / 0.5), a = 0.04 * Math.sin((t - 169.1) * 0.6) + (t - 169.1) * 0.012, c = [K.lerp(530, 535, u), K.lerp(860, 900, K.ease.in(u))]; st = [[c[0] - Math.cos(a) * 270, c[1] - Math.sin(a) * 270], [c[0] + Math.cos(a) * 270, c[1] + Math.sin(a) * 270]];
      ripple(ctx, 535, 900, 169.6, t, 1.4); }
    const mid = kd8StickPt(st[0], st[1], 0, 0.5);
    for (const [k, P] of D.entries()) { const hd = kd8DuckGeo(P).head; P.gaze = t > 169.1 ? lookAt(hd, mid) : [0.6, 0.6]; if (t > 168.4 && t < 169.1) P.gaze = lookAt(hd, [hd[0] + 200, hd[1] + 60]); }
    kd8Duck(ctx, D[0]); kd8Stick(ctx, st[0], st[1], 0); kd8Duck(ctx, D[1]);
    if (t > 170.0 && t < 171.6) { const h = kd8DuckGeo(D[1]).head; kd8Sweat(ctx, h[0] - 14, h[1] + 6, t - 170.2); }   // one tear
  },
};
