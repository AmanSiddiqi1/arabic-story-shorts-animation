// ===== KD-012 The Hare and the Elephants: scene router, transitions, panel, subtitles, sound =====
const DUR = 168.795;   // narration 164.795 s + 4.0 s held ending (creative plan)
const SCENES = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11];
const camFor = (sc, t) => { const c = K.camAt(sc.cam, t), z = c.zoom; return { x: K.clamp(c.x, 500 / z, sc.ww - 500 / z), y: K.clamp(c.y, 615 / z, VH - 615 / z), zoom: z }; };
const sceneAt = (t) => { let s = SCENES[0]; for (const x of SCENES) if (t >= x.a) s = x; return s; };
const WIPES = [[22.55, 23.0, S2, S3], [72.05, 72.5, S5, S6]];
function renderScene(ctx, sc, t, S) { const cam = camFor(sc, t); ctx.save(); K.camera(ctx, VW, VH, cam); sc.draw(ctx, t); ctx.restore(); sc.over(ctx, t, cam, S); }
// panel-only shake: the big footfalls and impacts
const SHAKE = (t) => K.spring(t, 42.7, 5, 9, 6) + K.spring(t, 46.45, 10, 9, 6) + K.spring(t, 76.65, 3, 9, 6) + K.spring(t, 95.0, 3, 9, 7)
  + (t > 36 && t < 46.3 ? kick(t, FALLS4, 1.0, 11, 9) : 0) + (t > 18.4 && t < 22.2 ? kick(t, FALLS_D, 0.8, 11, 9) : 0);
const SCENE = {
  duration: DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196, sh = SHAKE(t);
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh * 0.8, py - sh * 0.5); ctx.scale(pw / VW, ph / VH);
    const wp = WIPES.find(([a, b]) => t >= a && t < b);
    if (wp) { const [a, b, s0, s1] = wp, e = K.lerp(1350, -350, K.ease.inOut((t - a) / (b - a))); renderScene(ctx, s0, t, S);
      ctx.save(); ctx.beginPath(); ctx.moveTo(e + 250, -20); ctx.lineTo(1100, -20); ctx.lineTo(1100, 1260); ctx.lineTo(e - 250, 1260); ctx.closePath(); ctx.clip(); renderScene(ctx, s1, t, S); ctx.restore();
      ctx.save(); ctx.lineWidth = 16; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(e + 250, -20); ctx.lineTo(e - 250, 1260); ctx.stroke(); ctx.restore(); }
    else if (t >= 153.4 && t < 154.2) { renderScene(ctx, S10, t, S); ctx.save(); ctx.globalAlpha = K.ease.inOut((t - 153.4) / 0.8); renderScene(ctx, S11, t, S); ctx.restore(); }
    else renderScene(ctx, sceneAt(t), t, S);
    if (t >= 102.3 && t < 103.4) S.transition(ctx, VW, VH, (t - 102.3) / 1.1, { caption: 'THAT NIGHT...' });
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // only the planned effects, all inside narration pauses, quiet (master 0.6 at render)
    k.bed(S.sfx.bed, 0, DUR, 0.5);
    k.play('pop', 14.25, { pitch: 0.6, gain: 0.4 }); k.play('whoosh', 22.5, { dur: 0.4, gain: 0.3 }); k.play('thud', 35.8, { gain: 0.3 });
    k.play('thud', 42.7, { gain: 0.6 }); k.play('thud', 46.45, { gain: 0.8 }); k.play('stamp', 46.47, { gain: 0.35 });
    k.play('chime', 62.4, { note: 'E6', gain: 0.6 }); k.play('pop', 68.5, { gain: 0.4 }); k.play('whoosh', 72.2, { dur: 0.35, gain: 0.3 }); k.play('thud', 76.65, { gain: 0.4 });
    k.play('whoosh', 102.6, { dur: 0.45, gain: 0.3 }); k.play('chime', 121.0, { note: 'A5', gain: 0.45 }); k.play('pop', 129.8, { pitch: 1.3, gain: 0.3 });
    k.play('chime', 165.2, { note: 'C6', gain: 0.6 }); k.play('pop', 166.5, { pitch: 1.2, gain: 0.4 });
  },
};
window.SCENE = SCENE;
