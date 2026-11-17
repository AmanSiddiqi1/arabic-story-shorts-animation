// ===== KD-014 The Mouse Marries Only a Mouse: scene router, transitions, rank strip, panel, subtitles, sound =====
const K14_DUR = 168.0;   // narration 165.015 s + 3.0 s THE END hold (creative plan: duration 165.01 + end_hold 3.0)
const K14_SCENES = [K14_RIVER, typeof K14_YARD !== 'undefined' ? K14_YARD : null, typeof K14_SKY !== 'undefined' ? K14_SKY : null, typeof K14_MOUNT !== 'undefined' ? K14_MOUNT : null].filter(Boolean);
const k14CamFor = (sc, t) => { const c = K.camAt(sc.cam, t), z = c.zoom, [x0, x1, y0, y1] = sc.bounds; return { x: K.clamp(c.x, x0 + 500 / z, x1 - 500 / z), y: K.clamp(c.y, y0 + 615 / z, y1 - 615 / z), zoom: z }; };
const k14SceneAt = (t) => { let s = K14_SCENES[0]; for (const x of K14_SCENES) if (t >= x.a) s = x; return s; };
function k14Render(ctx, sc, t, S) { const cam = k14CamFor(sc, t); ctx.save(); K.camera(ctx, K14_VW, K14_VH, cam); sc.draw(ctx, t, cam); ctx.restore(); sc.over(ctx, t, cam, S); return cam; }
// transitions: diagonal wipe into the yard (27.30), upward wipe into the sky (65.50); YEARS LATER card 34.6-37.1 hides the yard's early->later cut
const K14_WIPES = [[27.3, 27.75, 'diag'], [65.5, 65.95, 'up']];
// panel-only shake (rumble, shoves, bursts, BONK)
const k14Shake = (t) => K.spring(t, 23.2, 4, 12, 9) + K.spring(t, 80.7, 3, 12, 10) + K.spring(t, 82.66, 3, 12, 10) + K.spring(t, 98.04, 5, 12, 8)
  + (t > 106.32 && t < 106.9 ? 2 * Math.sin(t * 90) : 0) + K.spring(t, 120.5, 2, 12, 9) + K.spring(t, 156.32, 2, 12, 9);
// rank strip state (sun, cloud, wind, mountain, mouse) and when it hides (close shots, faces near the top)
function k14Rank(t) {
  const tag = t < 69.74 ? 0 : t < 70.3 ? (t - 69.74) / 0.56 : t < 78.6 ? 1 : t < 79.2 ? 1 + (t - 78.6) / 0.6 : t < 90.78 ? 2 : t < 91.4 ? 2 + (t - 90.78) / 0.62 : t < 113.34 ? 3 : t < 113.9 ? 3 + (t - 113.34) / 0.56 : 4;
  const hide = [[0, 56.54], [65.5, 66.0], [100.32, 101.4], [108.0, 109.6], [114.2, 122.4], [126.74, 163.9]];
  let alpha = 1; for (const [a, b] of hide) if (t >= a - 0.25 && t < b + 0.25) alpha = Math.min(alpha, t < a ? (a - t) / 0.25 : t > b ? (t - b) / 0.25 : 0);
  return { n: 5, times: [56.54, 69.74, 78.6, 90.78, 113.34], q5T: 110.42, tag: t >= 164.7 ? -1 : tag, tagT: 61.88, star4: 101.44, heart: 162.98, alpha };
}
const SCENE = {
  duration: K14_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196, sh = k14Shake(t);
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh * 0.8, py - sh * 0.5); ctx.scale(pw / K14_VW, ph / K14_VH);
    const wp = K14_WIPES.find(([a, b]) => t >= a && t < b), sc = k14SceneAt(t);
    if (wp) { const [a, b, kind] = wp, i = K14_SCENES.indexOf(sc), prev = K14_SCENES[Math.max(0, i - 1)], u = K.ease.inOut((t - a) / (b - a));
      k14Render(ctx, prev, t, S); ctx.save(); ctx.beginPath();
      if (kind === 'diag') { const e = K.lerp(1350, -350, u); ctx.moveTo(e + 250, -20); ctx.lineTo(1100, -20); ctx.lineTo(1100, 1260); ctx.lineTo(e - 250, 1260); ctx.closePath(); }
      else { const e = K.lerp(1300, -80, u); ctx.rect(-20, e, 1040, 1300); }
      ctx.clip(); k14Render(ctx, sc, t, S); ctx.restore();
      ctx.save(); ctx.lineWidth = 16; ctx.strokeStyle = C.black; ctx.beginPath(); if (kind === 'diag') { const e = K.lerp(1350, -350, u); ctx.moveTo(e + 250, -20); ctx.lineTo(e - 250, 1260); } else { const e = K.lerp(1300, -80, u); ctx.moveTo(-20, e); ctx.lineTo(1020, e); } ctx.stroke(); ctx.restore(); }
    else k14Render(ctx, sc, t, S);
    // whip pan into S9 (85.84): speed streaks for 0.25 s
    if (t >= 85.84 && t < 86.1) { const u = (t - 85.84) / 0.26; ctx.save(); ctx.globalAlpha = 0.8 * (1 - u); ctx.fillStyle = C.white; const r = K.rng(9); for (let i = 0; i < 26; i++) ctx.fillRect(-100 + r() * 1100 - u * 400, r() * 1230, 200 + r() * 300, 6 + r() * 8); ctx.restore(); }
    // flashes on the bursts
    k14Flash(ctx, t, 23.2);   // v2: the second POOF (156.32) uses the same burst without a full-panel flash
    if (t >= 34.6 && t < 37.1) { S.transition(ctx, K14_VW, K14_VH, (t - 34.6) / 2.5, { caption: 'YEARS LATER...' });
      if (t >= 35.9 && t < 36.95) { const n = Math.min(15, 1 + Math.floor((t - 35.9) / 0.07)); ctx.save(); ctx.globalAlpha = K.clamp((36.95 - t) / 0.15); S.counter(ctx, n, 500, 860, K14B(t, 35.9, 0.3), { size: 110 }); S.label(ctx, 'YEARS', 500, 990, 1, { size: 40, align: 'center' }); ctx.restore(); } }
    rankStrip(ctx, t, k14Rank(t));
    if (t >= 165.0) S.title(ctx, 'THE END', 500, 1090, K14B(t, 165.0, 0.9), { size: 84, align: 'center' });   // v2: in the empty ground band under the mountain
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // seven quiet effects, all in narration pauses or after the last word (plan); master 0.6 at render
    k.bed(S.sfx.bed, 0, K14_DUR, 0.5);
    k.play('whoosh', 3.2, { dur: 0.45, gain: 0.3 });
    k.play('chime', 22.6, { note: 'E6', gain: 0.45 });
    k.play('pop', 50.95, { gain: 0.4 });
    k.play('pop', 63.2, { pitch: 1.2, gain: 0.35 });
    k.play('chime', 65.9, { note: 'G5', gain: 0.45 });
    k.play('chime', 144.6, { note: 'A5', gain: 0.4 });
    k.play('chime', 165.3, { note: 'C6', gain: 0.6 });
  },
};
window.SCENE = SCENE;
