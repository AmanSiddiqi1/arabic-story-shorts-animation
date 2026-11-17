// ===== KD-013 The Ascetic and the Thieves: scene router, wipes, whip, LATER card, panel, subtitles, sound =====
const KD_DUR = 166.0;   // narration 162.544 s + 3.5 s THE END hold (creative plan), rounded to the frame
const KD_SCENES = [KS1, KS3, KS4, KS5, KS6, KS7, KS8, KS9, KS10, KS11, KS12, KS15, KS16, KS17, KS18, KS19];
const kdCamFor = (sc, t) => { const c = K.camAt(sc.cam, t), z = c.zoom; return { x: K.clamp(c.x, 500 / z, sc.ww - 500 / z), y: K.clamp(c.y, 615 / z, KD_VH - 615 / z), zoom: z }; };
const kdSceneAt = (t) => { let s = KD_SCENES[0]; for (const x of KD_SCENES) if (t >= x.a) s = x; return s; };
// wipes (place changes) and the whip pan (41.4): [t0, t1, from, to, kind]
const KD_WIPES = [[11.8, 12.25, KS1, KS3, 'wipe'], [153.6, 154.05, KS18, KS19, 'wipe'], [41.28, 41.56, KS5, KS6, 'whip']];
function kdRender(ctx, sc, t, S) { const cam = kdCamFor(sc, t); ctx.save(); K.camera(ctx, KD_VW, KD_VH, cam); sc.draw(ctx, t, cam); ctx.restore(); sc.over(ctx, t, cam, S); }
const SCENE = {
  duration: KD_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196;
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px, py); ctx.scale(pw / KD_VW, ph / KD_VH);
    const wp = KD_WIPES.find(([a, b]) => t >= a && t < b);
    if (wp && wp[4] === 'wipe') { const [a, b, s0, s1] = wp, e = K.lerp(1350, -350, K.ease.inOut((t - a) / (b - a))); kdRender(ctx, s0, t, S);
      ctx.save(); ctx.beginPath(); ctx.moveTo(e + 250, -20); ctx.lineTo(1100, -20); ctx.lineTo(1100, 1260); ctx.lineTo(e - 250, 1260); ctx.closePath(); ctx.clip(); kdRender(ctx, s1, t, S); ctx.restore();
      ctx.save(); ctx.lineWidth = 16; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(e + 250, -20); ctx.lineTo(e - 250, 1260); ctx.stroke(); ctx.restore(); }
    else if (wp) { const [a, b, s0, s1] = wp, u = (t - a) / (b - a), first = u < 0.5, sc = first ? s0 : s1, dx = first ? -K.ease.in(u / 0.5) * 900 : K.lerp(900, 0, K.ease.out((u - 0.5) / 0.5));
      ctx.save(); ctx.translate(dx, 0); kdRender(ctx, sc, t, S); ctx.restore();
      ctx.save(); ctx.globalAlpha = 0.85 * Math.sin(Math.PI * u); ctx.fillStyle = C.paper; const r = K.rng(77); for (let i = 0; i < 26; i++) { const y = r() * KD_VH, h = 6 + r() * 22, x = r() * 600 - 200; ctx.fillRect(x, y, 600 + r() * 500, h); } ctx.restore(); }
    else kdRender(ctx, kdSceneAt(t), t, S);
    if (t >= 62.6 && t < 63.9) S.transition(ctx, KD_VW, KD_VH, (t - 62.6) / 1.3, { caption: 'A LITTLE LATER...' });
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // the plan's four effects only, all in narration pauses (master 0.6 at render)
    k.play('pop', 20.5, { pitch: 1.2, gain: 0.4 });
    k.play('whoosh', 41.4, { dur: 0.3, gain: 0.3 });
    k.play('whoosh', 62.6, { dur: 0.45, gain: 0.3 });
    k.play('chime', 162.9, { note: 'C6', gain: 0.6 });
  },
};
window.SCENE = SCENE;
