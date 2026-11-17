// ===== KD-005 The Raven and the Snake: scene router, transitions, panel, subtitles, sound =====
const K5_DUR = 163.3;   // narration 159.304 s + 4.0 s held ending (creative plan); limit 180 s
const K5_SCENES = [K5S1, K5S2, K5S3, K5S4, K5S5, K5S6, K5S7, K5S8, K5S9, K5S10, K5S11, K5S12, K5S13, K5S14, K5S15];
const k5Cam = (sc, t) => { const c = (sc.camFn && sc.camFn(t)) || K.camAt(sc.cam, t), z = c.zoom, ww = sc.wwAt ? sc.wwAt(t) : sc.ww;
  return { x: K.clamp(c.x, 500 / z, ww - 500 / z), y: K.clamp(c.y, sc.ymin != null ? sc.ymin : 615 / z, K5_VH - 615 / z), zoom: z }; };
const k5SceneAt = (t) => { let s = K5_SCENES[0]; for (const x of K5_SCENES) if (t >= x.a) s = x; return s; };
function k5Render(ctx, sc, t, S) { const cam = k5Cam(sc, t); ctx.save(); K.camera(ctx, K5_VW, K5_VH, cam); sc.draw(ctx, t); ctx.restore(); sc.over(ctx, t, cam, S); }
const K5_SHAKE = (t) => K.spring(t, 134.6, 5, 9, 6) + K.spring(t, 134.95, 5, 9, 6) + K.spring(t, 135.3, 5, 9, 6) + K.spring(t, 125.17, 1.5, 9, 8);
const SCENE = {
  duration: K5_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196, sh = K5_SHAKE(t);
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh * 0.8, py - sh * 0.5); ctx.scale(pw / K5_VW, ph / K5_VH);
    if (t >= 23.1 && t < 23.6) {   // wipe: "one day"
      const e = K.lerp(1350, -350, K.ease.inOut((t - 23.1) / 0.5)); k5Render(ctx, K5S3, t, S);
      ctx.save(); ctx.beginPath(); ctx.moveTo(e + 250, -20); ctx.lineTo(1100, -20); ctx.lineTo(1100, 1260); ctx.lineTo(e - 250, 1260); ctx.closePath(); ctx.clip(); k5Render(ctx, K5S4, Math.max(t, 23.3), S); ctx.restore();
      ctx.save(); ctx.lineWidth = 16; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(e + 250, -20); ctx.lineTo(e - 250, 1260); ctx.stroke(); ctx.restore();
    } else if (t >= 81.4 && t < 82.0) {   // dissolve to morning
      k5Render(ctx, K5S8, t, S); ctx.save(); ctx.globalAlpha = K.ease.inOut((t - 81.4) / 0.6); k5Render(ctx, K5S9, t, S); ctx.restore();
    } else if (t >= 150.4 && t < 151.15) k5Render(ctx, K5S14, t, S);
    else k5Render(ctx, k5SceneAt(t), t, S);
    // zoom into the whisper: paper fills the frame, then the plan cloud opens
    if (t >= 62.85 && t < 63.85) { ctx.save(); ctx.globalAlpha = t < 63.4 ? K.ease.in((t - 62.85) / 0.55) : 1 - K.ease.out((t - 63.4) / 0.45); ctx.fillStyle = C.paper; ctx.fillRect(-20, -20, 1040, 1270); ctx.fillStyle = dotPat(ctx, C.yellow, 12, 0.3); ctx.fillRect(-20, -20, 1040, 1270); ctx.restore(); }
    if (t >= 120.32 && t < 120.5) { ctx.save(); ctx.globalAlpha = 0.75; ctx.strokeStyle = C.white; ctx.lineWidth = 12; for (let i = 0; i < 10; i++) { const y = 60 + i * 120; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1000, y + 20); ctx.stroke(); } ctx.restore(); }
    if (t >= 150.4 && t < 151.9) S.transition(ctx, K5_VW, K5_VH, (t - 150.4) / 1.5, { caption: 'LATER...' });
    if (t >= 159.6) S.title(ctx, 'THE END', 500, 150, K5_B(t, 159.6, 0.8), { size: 80, align: 'center' });
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // the nine planned effects, all inside narration pauses, quiet (master 0.6 at render)
    k.bed(S.sfx.bed, 0, K5_DUR, 0.5);
    k.play('chime', 6.75, { note: 'E6', gain: 0.5 }); k.play('thud', 17.75, { gain: 0.45 }); k.play('whoosh', 23.1, { dur: 0.4, gain: 0.3 });
    k.play('chime', 63.1, { note: 'A5', gain: 0.5 }); k.play('pop', 71.3, { gain: 0.4 }); k.play('thud', 78.4, { gain: 0.4 });
    k.play('whoosh', 120.1, { dur: 0.35, gain: 0.3 }); k.play('chime', 127.25, { note: 'C6', gain: 0.4 }); k.play('chime', 159.5, { note: 'C6', gain: 0.6 });
  },
};
window.SCENE = SCENE;
