// ===== KD-013 The Ascetic and the Thieves: scene router, wipes, whip, LATER card, panel, subtitles, sound =====
const KD_DUR = 166.0;   // narration 162.544 s + 3.5 s THE END hold (creative plan), rounded to the frame
const KD_SCENES = [KS1, KS3, KS4, KS5, KS6, KS7, KS8, KS9, KS10, KS11, KS12, KS15, KS16, KS17, KS18, KS19];
const kdCamFor = (sc, t) => { const c = K.camAt(sc.cam, t), z = c.zoom; return { x: K.clamp(c.x, 500 / z, sc.ww - 500 / z), y: K.clamp(c.y, 615 / z, KD_VH - 615 / z), zoom: z }; };
const kdSceneAt = (t) => { let s = KD_SCENES[0]; for (const x of KD_SCENES) if (t >= x.a) s = x; return s; };
// wipes (place changes) and the whip pan (41.4): [t0, t1, from, to, kind]
const KD_WIPES = [[11.8, 12.25, KS1, KS3, 'wipe'], [153.6, 154.05, KS18, KS19, 'wipe'], [41.28, 41.56, KS5, KS6, 'whip']];
function kdRender(ctx, sc, t, S) { const cam = kdCamFor(sc, t); ctx.save(); K.camera(ctx, KD_VW, KD_VH, cam); sc.draw(ctx, t, cam); ctx.restore(); sc.over(ctx, t, cam, S); }
// ---------- subtitles (story copy of Library core/subtitle.js, story.json "subtitle": "scene") ----------
// Same layout, fonts, sizes and timing as the library caption; v2 adds balanced line breaks only (no orphan word on the last line).
// Text is unchanged: the chunks still come verbatim from timing.json.
function kdWrapBalanced(ctx, text, maxW) {
  const lines = K.wrap(ctx, text, maxW); if (lines.length < 2) return lines;
  let lo = maxW * 0.45, hi = maxW, best = lines;
  for (let i = 0; i < 14; i++) { const mid = (lo + hi) / 2, l = K.wrap(ctx, text, mid); if (l.length <= lines.length) { best = l; hi = mid; } else lo = mid; }
  return best;
}
function subtitle(ctx, W, H, t, s) {
  const ch = TIMING.chunks; let cur = null;
  for (let i = 0; i < ch.length; i++) { const e = ch[i], nx = ch[i + 1], endAt = nx && nx.a - e.b < 1.4 ? nx.a - 0.1 : e.b + 0.6; if (t >= e.a - 0.12 && t < endAt) { cur = e; break; } }
  const bx = 54, by = 1296, bw = 972, bh = 566;
  S0.box(ctx, bx, by, bw, bh, 1, { fill: C.white, lw: 9, seed: 13 });
  if (!cur) return;
  const a = K.clamp((t - cur.a + 0.12) / 0.14), maxW = bw - 90; ctx.save(); ctx.globalAlpha = a;
  let fs = 70, lines, lh; ctx.direction = 'rtl'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  for (; fs >= 44; fs -= 2) { ctx.font = K.font(fs, AF, AW); lines = K.wrap(ctx, cur.ar, maxW); lh = fs * 1.72; if (lines.length * lh <= 340) break; }
  ctx.font = K.font(fs, AF, AW); lines = kdWrapBalanced(ctx, cur.ar, maxW);
  let es = 44, enL, elh; ctx.direction = 'ltr';
  for (; es >= 30; es -= 2) { ctx.font = K.font(es, BF, 400); enL = K.wrap(ctx, cur.en, maxW); elh = es * 1.25; if (enL.length * elh <= 150) break; }
  ctx.font = K.font(es, BF, 400); enL = kdWrapBalanced(ctx, cur.en, maxW);
  const total = lines.length * lh + 22 + enL.length * elh, y0 = by + (bh - total) / 2;
  ctx.direction = 'rtl'; ctx.font = K.font(fs, AF, AW); ctx.fillStyle = C.black; lines.forEach((ln, i) => ctx.fillText(ln, bx + bw / 2, y0 + (i + 0.5) * lh));
  ctx.direction = 'ltr'; ctx.font = K.font(es, BF, 400); ctx.fillStyle = C.blue; ctx.letterSpacing = '1px'; enL.forEach((ln, i) => ctx.fillText(ln, bx + bw / 2, y0 + lines.length * lh + 22 + (i + 0.5) * elh)); ctx.letterSpacing = '0px';
  ctx.restore();
}
let S0 = null;
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
