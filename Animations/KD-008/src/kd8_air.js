// ===== KD-008 the air (world 1000 x 2600): S7 lift-off and flight (109.6-125.98), S8 air inserts (136-137, 141.25-148.66), S9 the fall (to 162.58) =====
const KD8_AIR_H = 2600;
const kd8Land = (t) => kfn(t, [[111.9, 0], [116.6, 1750]], 'in');                 // the pond land sinks away as they climb
const kd8Dist = (t) => t < 111.2 ? 0 : (t - 111.2) * 150;                          // flight distance (left to right): drives clouds and the ground below
const kd8Lift = (t) => K.ease.inOut(K.clamp((t - 110.4) / 1.6));                    // ground -> flight height
function kd8AirRig(t) {
  const L = kd8Lift(t), dip = 34 * pulse(t, 111.74, 0.8), grounded = t < 110.4;
  // ducks: from the S6 stance to flight; out-of-rhythm beats when they plead (151.4-153.1)
  const fr = t < 112.6 ? 11 : 7.5;
  const R = kd8RigFly(t, { flapRate: fr, bob: L,
    A: kd8Pose(t, { neck: 1, brow: 0, headRot: 0, lid: 0 }, [[110.4, { lid: 0.6, brow: 0.5 }], [112.6, { lid: 0, brow: 0 }], [122.12, { eyes: 'wide', brow: -0.6 }, 0.1], [123.6, { eyes: 'open', brow: 0 }],
      [136.06, { headRot: 0.3 }], [136.6, { headRot: 0.05 }], [142.84, { eyes: 'wide', brow: -0.7, headRot: 0.25 }], [146.0, { eyes: 'open', brow: -0.5 }], [151.44, { eyes: 'wide', brow: -0.9 }],
      [154.6, { eyes: 'wide', headRot: 0.35 }], [159.24, { neck: 1.25 }, 0.4], [160.4, { neck: 1 }]]),
    B: kd8Pose(t, { neck: 1, brow: 0, headRot: 0 }, [[110.4, { lid: 0.6, brow: 0.5 }], [112.6, { lid: 0, brow: 0 }], [122.25, { eyes: 'wide', brow: -0.6 }, 0.1], [123.7, { eyes: 'open', brow: 0 }],
      [136.0, { headRot: 0.3 }], [136.5, { headRot: 0.05 }], [142.95, { eyes: 'wide', brow: -0.7, headRot: 0.3 }], [144.2, { wet: true, brow: -0.9, eyes: 'open' }], [152.1, { lid: 1 }, 0.15], [153.1, { lid: 0, eyes: 'wide' }],
      [159.35, { neck: 1.25 }, 0.4], [160.5, { neck: 1 }]]),
  });
  for (const [D, k, x0, y0] of [[R.A, 0, 130, 900], [R.B, 1, 640, 900]]) {
    if (grounded || L < 1) { D.x = K.lerp(x0, D.x, L); D.y = K.lerp(y0, D.y, L) + dip; D.neck = K.lerp(0.12, D.neck, L); if (L < 0.02) { D.fly = false; D.wing = 1.6 + 0.9 * Math.sin((t - 107.82) * 13 + k * 2.1); D.wingF = D.wing + 0.15; } }
    else D.y += dip;
    if (t > 151.4 && t < 153.2) D.flap = Math.sin(t * (k ? 11 : 6.5) + k);                                   // out of rhythm
    if (t > 154.4) D.y -= 30 * K.ease.out(K.clamp((t - 154.5) / 0.6)) - 6 * swing(t, 155.1, 1, 1.6, 2.5);       // suddenly light
    const shake = (t > 143.9 && t < 145.2) || (t > 151.4 && t < 153.1) ? Math.sin(t * (k ? 21 : 26)) * 0.22 : 0;
    D.headRot = (D.headRot || 0) + shake + (t > 122.3 && t < 122.9 && !k ? 0.15 * Math.sin(t * 30) : 0);
  }
  R.A = { ...R.A }; R.B = { ...R.B };
  const st = kd8Grips(kd8Grip(R.A), kd8Grip(R.B)); R.stick = st;
  const loaded = t < 154.26;
  R.sag = loaded ? 14 + 10 * pulse(t, 111.74, 0.8) + (t > 142.84 && t < 143.9 ? Math.sin(t * 40) * 3 : 0) : 14 * Math.exp(-(t - 154.26) * 6) * Math.cos((t - 154.26) * 18);
  if (grounded) R.sag = 8;
  const mid = kd8StickPt(st[0], st[1], R.sag, 0.5);
  // tortoise
  const ground = 900 + kd8Land(t);
  const flush = kfn(t, [[141.9, 0], [142.9, 1], [157.9, 1], [158.6, 0]]);
  const TP = kd8Pose(t, { s: 1.3, dir: 1, mouth: 'closed', brow: 0, lid: 0, puff: 0, eyes: 'open' }, [
    [110.4, { brow: 0.3, lid: 0.3 }], [112.68, { lid: 1, brow: -0.7 }, 0.2], [116.4, { lid: 0.55 }, 0.4], [117.07, { lid: 0, brow: -0.3 }, 0.6],
    [121.16, { eyes: 'wide', wet: true, brow: -0.7, puff: 0.6 }, 0.4], [122.12, { mouth: 'open', open: 0.18, puff: 0.2 }, 0.2], [122.92, { mouth: 'tight', brow: 0.45, sq: 0.94, eyes: 'open' }, 0.1], [123.2, { sq: 1 }, 0.3],
    [124.74, { puff: 1, brow: 0, wet: true }, 0.3], [125.6, { puff: 0.5 }],
    [136.06, { wet: false }], [141.9, { brow: 1.05, lid: 0.3, puff: 0, eyes: 'open', wet: false }, 0.25], [144.2, { mouth: 'tight' }], [146.72, { brow: 1.1 }],
    [153.79, { sq: 1.05, brow: 1.1, lid: 0.15 }, 0.4], [154.26, { mouth: 'open', open: 1, eyes: 'shut', sq: 1 }, 0.15], [155.06, { eyes: 'open', lid: 0.2 }],
    [157.86, { brow: -0.9, lid: 0, eyes: 'wide', open: 0.7 }, 0.3], [159.24, { reach: 1, sq: 1.06 }, 0.35], [160.82, { reach: 0, sq: 1 }, 0.4]]);
  TP.flush = flush;
  if (t > 144.2 && t < 146.7) TP.puff = 0.5 + 0.5 * Math.abs(Math.sin(t * 7));            // MMPH! the jaw works
  if (t > 146.7 && t < 148.6) TP.shake = t;                                                 // corners quiver
  let gap = 0; if (!loaded) gap = 8 * K.clamp((t - 154.26) / 0.2) + 10 * K.clamp((t - 155.0) / 1.8);
  else if (t > 147.2 && t < 154.26) gap = 1.5;                                               // a hairline of daylight
  let T;
  const hangP = { ...KD8_HANG, ...TP, rot: KD8_HANG.rot + 0.06 * Math.sin(t * 1.8), legSw: t * (t > 112.68 && t < 113.5 ? 9 : 2.3) + swing(t, 121.4, 1.2, 1.2, 1.5), dangle: 1 };
  if (L < 1 || grounded) {
    const S = kd8TortToMouth({ ...TP, nAng: -1.15, headRot: -0.15 }, [mid[0], mid[1]], ground, 1.3);
    if (S.y < ground - 0.5) { const hf = K.clamp((ground - S.y) / 70); const H = { ...S, rot: -0.42 * hf, neck: K.lerp(1.3, KD8_HANG.neck, hf), nAng: K.lerp(-1.15, KD8_HANG.nAng, hf), headRot: K.lerp(-0.15, KD8_HANG.headRot, hf), dangle: hf, legSw: hangP.legSw };
      T = kd8TortHang(H, [mid[0], mid[1]]); if (T.y > ground) T = S; } else T = S;
  } else T = kd8TortHang(hangP, [mid[0], mid[1] + gap]);
  // the hang after the release (Coyote beat), then the fall
  if (!loaded) { const hold = kd8TortHang(hangP, [mid[0], 422 + gap]); T = hold; }
  if (t >= 160.82) { const u = K.clamp((t - 160.82) / 1.24); T = { ...T, y: T.y + fallY(t, 160.82, 162.06, 0, 1750), rot: T.rot + u * 1.2, legUp: 1, dangle: 0, s: 1.3 * (1 - 0.45 * u), mouth: 'open', open: 0.6, eyes: 'wide' }; }
  const hd = kd8TortGeo(T).head;
  T.gaze = kd8Gaze(t, hd, [[0, [mid[0], mid[1] - 200]], [112.68, [hd[0] + 40, hd[1] + 200]], [117.07, [hd[0] + 60, hd[1] + 400]], [121.16, [hd[0] + 300, hd[1] + 200]], [122.92, () => kd8DuckGeo(R.A).head],
    [123.3, () => kd8DuckGeo(R.B).head], [123.7, [hd[0] + 300, hd[1] + 300]], [136.3, [hd[0] + 60, hd[1] + 400]], [141.9, [hd[0] + 40, hd[1] + 400]], [157.86, [mid[0] - 10, mid[1] - 200]], [158.5, [hd[0], hd[1] + 1]],
    [159.0, [mid[0], mid[1] - 200]]], 0.15);
  if (t > 158.5 && t < 159.0) T.gaze = [0, 0.05];          // one look to the lens
  T.noBlink = (t > 157 && t < 159.2) || t > 160.8;
  // ducks look at her / down at the crowd
  for (const [D, k] of [[R.A, 0], [R.B, 1]]) { const dh = kd8DuckGeo(D).head;
    D.gaze = kd8Gaze(t, dh, [[0, [dh[0] + 300, dh[1]]], [122.12 + k * 0.15, hd], [123.8, [dh[0] + 300, dh[1]]], [136.06 - k * 0.06, [dh[0], dh[1] + 400]], [136.5, hd], [137.0, [dh[0] + 300, dh[1] + 40]],
      [142.84 + k * 0.1, hd], [151.4, hd], [154.4, [hd[0], hd[1] + 200]], [160.9, (u) => kd8TortGeo(T).head]], 0.1); }
  R.T = T; R.bite = loaded || t < 154.3; R.mid = mid; R.ground = ground;
  return R;
}
function kd8Clouds(ctx, t, top, bottom) {
  const d = kd8Dist(t); for (let i = 0; i < 9; i++) { const y = top + (i * 397) % (bottom - top), sp = 0.35 + (i % 3) * 0.25, x = ((i * 271 - d * sp) % 1400 + 1400) % 1400 - 200; cloudFlat(ctx, x, y, 0.6 + (i % 3) * 0.2); }
}
const KD8_AIR_CAM = [[109.6, { x: 420, y: 760, zoom: 1.4 }], [110.4, { x: 420, y: 760, zoom: 1.4 }], [112.2, { x: 460, y: 560, zoom: 1.15 }], [118.7, { x: 460, y: 560, zoom: 1.15 }],
  [119.8, { x: 500, y: 1150, zoom: 1.0 }], [120.45, { x: 500, y: 1150, zoom: 1.0 }], [120.46, { x: 520, y: 470, zoom: 1.75 }], [124.1, { x: 520, y: 470, zoom: 1.75 }], [124.9, { x: 460, y: 560, zoom: 1.15 }],
  [126.0, { x: 460, y: 560, zoom: 1.15 }], [136.0, { x: 480, y: 540, zoom: 1.35 }], [137.0, { x: 470, y: 530, zoom: 1.4 }],
  [141.25, { x: 520, y: 470, zoom: 1.75 }], [147.9, { x: 530, y: 440, zoom: 2.5 }], [148.66, { x: 530, y: 440, zoom: 2.5 }], [149.4, { x: 520, y: 470, zoom: 1.85 }], [153.4, { x: 520, y: 470, zoom: 1.85 }],
  [154.6, { x: 480, y: 520, zoom: 1.3 }], [161.22, { x: 480, y: 520, zoom: 1.3 }], [161.8, { x: 500, y: 1985, zoom: 1.0 }], [162.6, { x: 500, y: 1985, zoom: 1.0 }]];
const KD8_SC_AIR = { ww: KD8_VW, wh: KD8_AIR_H, cam: KD8_AIR_CAM,
  draw(ctx, t) {
    const hot = t < 125.98, d = kd8Dist(t);
    ctx.fillStyle = hot ? C.yellow : C.blue; ctx.fillRect(0, 0, KD8_VW, KD8_AIR_H); ctx.fillStyle = dotPat(ctx, hot ? '#ff9a2a' : SKYDOT, 13, 0.3); ctx.fillRect(0, 0, KD8_VW, KD8_AIR_H);
    // the far ground below: patchwork (S7) or the village (S8/S9)
    if (hot) { const img = kd8Patchwork(), ox = -((d * 0.25) % 1000); ctx.drawImage(img, ox, 1250, 1000, 1100); ctx.drawImage(img, ox + 1000, 1250, 1000, 1100);
      for (let i = 0; i < 3; i++) halftoneShadow(ctx, ((i * 400 - d * 0.4) % 1300 + 1300) % 1300 - 150, 1450 + i * 220, 120, 0.35); }
    kd8Clouds(ctx, t, hot ? 120 : 80, hot ? 1400 : 1700);
    if (hot) { if (t > 115.5) { const sp = [880, 160]; sun(ctx, sp[0], sp[1], t); } }
    // the pond land sinking away during the climb
    const L = kd8Land(t);
    if (hot && L < 1300) { ctx.save(); ctx.translate(-Math.min(d, 300) * 0.5, L);
      ctx.drawImage(kd8PondBack(true, true), 0, 0, KD8_VW, KD8_VH); kd8Reeds(ctx, t, 1); kd8Pond(ctx, t, 0.14, 1, true);
      // a tall tree with the songbird's double take
      seg(ctx, 900, 900, 900, 420, 40, WOOD, 6); for (const [dx, dy, r] of [[0, -40, 90], [-60, 10, 60], [60, 10, 60]]) shape(ctx, ell(900 + dx, 420 + dy, r, r, 24), GREEND, { lw: 7, seed: 140 + dx });
      const look = K.clamp((t - 114.24) / 0.25); songbird(ctx, { x: 900, y: 330, s: 1.0, dir: look > 0.5 ? -1 : 1, col: C.red, eyes: t > 114.5 ? 'wide' : 'open' });
      ctx.restore(); }
    // roofs scroll underneath (115.0 - 116.4)
    if (hot && t > 114.6 && t < 116.8) { const x0 = 1150 - (t - 114.6) * 700; for (const [dx, w, top, ch] of [[0, 220, 1060, 1], [250, 200, 1090, 0], [480, 240, 1050, 1]]) { kd8House(ctx, x0 + dx, x0 + dx + w, top, 1300, { seed: 150 + dx, chimney: ch ? x0 + dx + w * 0.7 : 0 }); if (ch) kd8Smoke(ctx, x0 + dx + w * 0.7, top - 46, t); } }
    const R = kd8AirRig(t);
    if (t > 110.4 && t < 112.5) for (const [x0, t0] of [[230, 110.6], [520, 111.0], [700, 110.8]]) dustBurst(ctx, x0, 900 + kd8Land(t), t - t0, 6, 8, 18, 46, 0.8, Math.round(t0 * 10));
    if (t >= 160.82) { kd8DrawRig(ctx, { ...R, T: null }); kd8Tort(ctx, R.T); }
    else kd8DrawRig(ctx, R);
    if (t > 111.8 && t < 112.8) { const h = kd8DuckGeo(R.B).head; kd8Sweat(ctx, h[0] - 20, h[1] - 30, t - 111.9); }
    if (t > 142.84 && t < 144.0) { const m = kd8TortGeo(R.T).mouth; kd8Steam(ctx, m[0] + 6, m[1] - 10, t - 142.95, 1); kd8Steam(ctx, m[0] + 6, m[1] - 10, t - 143.4, 1); }
    // the village far below (S9): she passes behind the roofs; dust rises behind the houses
    if (!hot) { ctx.drawImage(kd8VillageFar(), 0, 1900, 1000, 700); ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 1000, 2150); ctx.clip(); if (t > 162.0) for (let i = 0; i < 5; i++) { const u = K.clamp((t - 162.06 - i * 0.07) / 1.6); if (u <= 0) continue; const r = 26 + u * 60; ctx.save(); ctx.globalAlpha = 0.9 * (1 - u * 0.7); shape(ctx, ell(500 + (i - 2) * 34 + Math.sin(i * 2) * 10, 2160 - u * (140 + i * 30), r, r * 0.8, 18), SANDL, { lw: 5, seed: 300 + i }); ctx.restore(); }
      ctx.restore(); }
    KD8_LAST_RIG = R;
  },
};
let KD8_LAST_RIG = null;   // set by the draw above in the same frame (overlays read it); never carried between frames
