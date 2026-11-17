// ===== AN-014 main: scene table, camera, transitions, lettering, sound =====
const K14_SCENES = [
  [0, 9.88, 'k14S1'], [9.88, 19.2, 'k14S2'], [19.2, 28.1, 'k14S3'], [28.1, 30.42, 'k14S4'], [30.42, 33.98, 'k14S5'], [33.98, 42.7, 'k14S6'],
  [42.7, 47.6, 'k14S7'], [47.6, 57.2, 'k14S8'], [57.2, 64.0, 'k14S9'], [64.0, 73.78, 'k14S10'], [73.78, 85.8, 'k14S11'], [85.8, 98.14, 'k14S12'],
  [98.14, 107.13, 'k14S13'], [107.13, 112.44, 'k14S14'], [112.44, 125.88, 'k14S15'], [125.88, 129.7, 'k14S16'], [129.7, 138.68, 'k14S17'],
  [138.68, 149.5, 'k14S18'], [149.5, 162.18, 'k14S19'], [162.18, K14_DUR + 1, 'k14S20'],
];
const c_ = (x, y, zoom) => ({ x, y, zoom });
// camera keys per scene (absolute film times); a scene's first key is a cut
const K14_CAMS = {
  k14S1: [[0, c_(500, 690, 1.1)], [3.58, c_(500, 690, 1.1)], [4.2, c_(400, 700, 1.45)]],
  k14S2: [[9.88, c_(560, 740, 1.75)], [10.4, c_(560, 750, 1.8)], [11.9, c_(560, 760, 1.95)], [15.2, c_(560, 760, 1.95)], [15.9, c_(500, 600, 1.45)]],
  k14S3: [[19.2, c_(560, 680, 1.35)], [26.55, c_(560, 680, 1.35)], [26.95, c_(500, 680, 1.1)]],
  k14S4: [[28.1, c_(435, 660, 1.15)], [29.3, c_(435, 660, 1.15)], [30.4, c_(565, 660, 1.15)]],
  k14S5: [[30.42, c_(500, 760, 1.45)]],
  k14S6: [[33.98, c_(480, 650, 1.05)], [37.2, c_(480, 650, 1.05)], [38.4, c_(360, 720, 1.5)]],
  k14S7: [[42.7, c_(720, 650, 1.7)], [46.5, c_(750, 640, 2.0)]],
  k14S8: [[47.6, c_(640, 680, 1.3)], [49.9, c_(640, 680, 1.3)], [50.4, c_(360, 740, 1.6)], [54.5, c_(360, 740, 1.6)], [55.9, c_(700, 700, 1.65)]],
  k14S9: [[57.2, c_(722, 700, 1.8)], [63.0, c_(722, 700, 1.8)], [63.8, c_(700, 700, 1.5)]],
  k14S10: [[64.0, c_(680, 384, 1.6)], [65.4, c_(680, 846, 1.6)], [70.0, c_(680, 846, 1.6)], [71.0, c_(500, 846, 1.6)], [72.8, c_(500, 846, 1.6)], [73.7, c_(560, 846, 1.6)]],
  // v2: the cavern is framed 1.6x closer, floor at ~70% of the panel, the listening man inside the right edge the whole time
  k14S11: [[73.78, c_(560, 846, 1.6)], [74.6, c_(445, 1075, 2.25)], [84.38, c_(445, 1075, 2.25)], [85.2, c_(600, 974, 2.0)]],
  k14S12: [[85.8, c_(445, 1075, 2.25)], [94.71, c_(445, 1075, 2.25)], [94.72, c_(610, 974, 2.4)]],
  k14S13: [[98.14, c_(500, 640, 1.1)], [102.6, c_(500, 640, 1.1)], [103.4, c_(687, 700, 1.6)]],
  k14S14: [[107.13, c_(520, 690, 1.2)], [108.5, c_(520, 690, 1.2)], [109.5, c_(520, 690, 1.5)]],
  k14S15: [[112.44, c_(330, 780, 2.0)], [118.88, c_(330, 780, 2.0)], [118.9, c_(560, 660, 1.5)], [120.1, c_(560, 660, 1.5)], [120.45, c_(590, 600, 1.5)], [121.3, c_(560, 660, 1.5)]],
  k14S16: [[125.88, c_(560, 680, 1.6)]],
  k14S17: [[129.7, c_(400, 690, 1.3)], [132.4, c_(400, 690, 1.3)], [133.2, c_(600, 690, 1.5)], [134.7, c_(600, 690, 1.5)], [135.5, c_(500, 690, 1.4)], [138.68, c_(500, 690, 1.4)]],
  k14S18: [[138.68, c_(780, 660, 1.8)], [144.6, c_(780, 660, 1.8)], [145.5, c_(700, 680, 1.5)]],
  k14S19: [[149.5, c_(500, 615, 1.2)], [150.9, c_(500, 615, 1.2)], [151.5, c_(780, 640, 1.9)], [151.93, c_(780, 640, 1.9)], [151.94, c_(300, 700, 1.8)], [154.5, c_(330, 700, 1.8)], [155.2, c_(630, 740, 1.45)], [161.38, c_(630, 740, 1.45)], [161.63, c_(625, 770, 2.2)]],
  // v2: tight two-shot for the open hand, the present wide on أمر, a medium on the envier leaving, then the king's group for THE END
  k14S20: [[162.18, c_(625, 770, 2.2)], [164.22, c_(625, 770, 2.2)], [164.7, c_(620, 760, 1.5)], [167.28, c_(620, 760, 1.5)], [167.29, c_(340, 760, 1.9)], [169.5, c_(300, 760, 1.9)], [170.15, c_(780, 730, 1.8)]],
};
const k14SceneAt = (t) => K14_SCENES.find((s) => t >= s[0] && t < s[1]) || K14_SCENES[K14_SCENES.length - 1];
const K14_DEEP = { k14S11: 1470, k14S12: 1470 };   // v2: scenes whose world extends below 1230 (the closer cavern frame)
function k14CamFor(name, t) { const c = K.camAt(K14_CAMS[name], t), z = c.zoom, vh = K14_DEEP[name] || K14_VH; return { x: K.clamp(c.x, 500 / z, K14_VW - 500 / z), y: K.clamp(c.y, 615 / z, vh - 615 / z), zoom: z }; }
function k14DrawScene(ctx, name, t) { const cam = k14CamFor(name, t); ctx.save(); K.camera(ctx, K14_VW, K14_VH, cam); const f = window[name] || (typeof globalThis[name] === 'function' ? globalThis[name] : null); if (f) f(ctx, t); ctx.restore(); return cam; }
const k14Layer = () => K.cached('k14:layer', () => K.layer(K14_VW, K14_VH));
// dissolve (98.14, 138.68) and wipe (129.7): the incoming scene is drawn into a layer and blended over the outgoing one
const K14_BLEND = [[98.14, 0.6, 'k14S12', 'k14S13', 'dissolve'], [129.7, 0.45, 'k14S16', 'k14S17', 'wipe'], [138.68, 0.6, 'k14S17', 'k14S18', 'dissolve']];
function k14World(ctx, t) {
  const bl = K14_BLEND.find(([a, d]) => t >= a && t < a + d);
  if (!bl) return k14DrawScene(ctx, k14SceneAt(t)[2], t);
  const [a, d, from, to, kind] = bl, u = K.ease.inOut((t - a) / d);
  k14DrawScene(ctx, from, t);
  const L = k14Layer(), lx = L.getContext('2d'); lx.setTransform(1, 0, 0, 1, 0, 0); lx.clearRect(0, 0, K14_VW, K14_VH); const cam = k14DrawScene(lx, to, t);
  ctx.save(); if (kind === 'wipe') { ctx.beginPath(); ctx.rect(0, 0, K14_VW * u, K14_VH); ctx.clip(); } else ctx.globalAlpha = u; ctx.drawImage(L, 0, 0, K14_VW, K14_VH); ctx.restore();
  if (kind === 'wipe') { ctx.save(); ctx.fillStyle = C.black; ctx.fillRect(K14_VW * u - 6, 0, 12, K14_VH); ctx.restore(); }
  return cam;
}
// ---------- lettering helpers (panel units) ----------
function k14Label(ctx, S, t, text, wx, wy, cam, t0, t1, o = {}) {
  if (t < t0 || t >= t1) return; const [x, y] = o.panel ? [wx, wy] : k14P(wx, wy, cam);
  ctx.save(); ctx.globalAlpha = K.clamp((t1 - t) / 0.25); S.label(ctx, text, x, y, K14B(t, t0, 0.35), { size: o.size || 50, align: 'center', fill: o.fill, color: o.color }); ctx.restore();
}
function k14Arrow(ctx, S, t, from, to, cam, t0, t1, o = {}) {
  if (t < t0 || t >= t1) return; ctx.save(); ctx.globalAlpha = K.clamp((t1 - t) / 0.25); S.arrow(ctx, o.panel ? from : k14P(...from, cam), o.panel ? to : k14P(...to, cam), K14B(t, t0, 0.4), { color: o.color || C.red, width: o.width || 20, bend: o.bend ?? 0.15 }); ctx.restore();
}
function k14Word(ctx, S, t, word, wx, wy, cam, t0, t1, r = 110) {
  if (t < t0 || t >= t1) return; const [x, y] = k14P(wx, wy, cam); ctx.save(); ctx.globalAlpha = K.clamp((t1 - t) / 0.25); S.emphasis(ctx, x, y, r, K14B(t, t0, 0.4), { word, wx: 0.2, wy: 0.1 }); ctx.restore();
}
function k14Over(ctx, t, cam, S) {
  const L = (...a) => k14Label(ctx, S, t, ...a), A = (...a) => k14Arrow(ctx, S, t, ...a), Wd = (...a) => k14Word(ctx, S, t, ...a);
  // S1
  L('NEIGHBOURS', 500, 590, cam, 1.5, 2.9, { size: 46 });
  A([270, 520], [300, 640], cam, 4.28, 5.3, { bend: 0.1 });
  L('LOVED BY ALL', 200, 560, cam, 5.6, 7.6);
  // S2
  L('ENVY', 660, 610, cam, 12.3, 15.3); A([660, 630], [600, 700], cam, 12.4, 15.3, { width: 16 });
  if (t >= 12.6 && t < 15.3) sfx(ctx, 'GRRR', ...k14P(470, 700, cam), 40, K14B(t, 12.6, 0.3), { rot: -0.1 });
  // S5
  if (typeof k14S5Over === 'function') k14S5Over(ctx, t, cam, S);
  // yard / well / palace overlays live with their scenes
  for (const f of ['k14YardOver', 'k14WellOver', 'k14PalaceOver']) if (typeof window[f] === 'function') window[f](ctx, t, cam, S);
}
function k14Shake(t) { return K.spring(t, 60.6, 7, 11, 7) + K.spring(t, 120.72, 5, 11, 7) + K.spring(t, 160.6, 3, 10, 8); }
const SCENE = {
  duration: K14_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196, sh = k14Shake(t);
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh * 0.8, py - sh * 0.5); ctx.scale(pw / K14_VW, ph / K14_VH);
    const cam = k14World(ctx, t);
    // whip pans (9.88, 30.42): speed streaks across the cut
    for (const [a, b] of [[9.72, 10.05], [30.28, 30.58]]) if (t >= a && t < b) { const u = (t - a) / (b - a); ctx.save(); ctx.globalAlpha = 0.8 * Math.sin(Math.PI * u); ctx.fillStyle = C.white; const r = K.rng(9 + a); for (let i = 0; i < 26; i++) ctx.fillRect(-200 + r() * 1200 - u * 300, r() * K14_VH, 160 + r() * 260, 6 + r() * 10); ctx.restore(); }
    k14Over(ctx, t, cam, S);
    if (t >= 106.4 && t < 107.86) S.transition(ctx, K14_VW, K14_VH, (t - 106.4) / 1.46, { caption: 'LATER...' });
    if (t >= 170.2) S.title(ctx, 'THE END', 500, 230, K14B(t, 170.2, 0.9), { size: 84, align: 'center' });
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // quiet effects only in narration pauses (timing.json); master 0.6 at render
    k.bed(S.sfx.bed, 0, K14_DUR, 0.5);
    k.play('pop', 3.1, { gain: 0.4 });            // hearts / the dashed lane
    k.play('whoosh', 9.6, { dur: 0.4, gain: 0.3 }); // whip to the envier
    k.play('pop', 15.0, { gain: 0.45 });          // the swatted heart
    k.play('pop', 19.2, { gain: 0.35, pitch: 0.8 });
    k.play('thud', 24.05, { gain: 0.35 });        // the door shut on him
    k.play('chime', 42.5, { note: 'E6', gain: 0.45 });
    k.play('whoosh', 47.45, { dur: 0.4, gain: 0.3 });
    k.play('thud', 64.5, { gain: 0.5 });          // the fall, heard at the bottom of the shaft
    k.play('whoosh', 106.7, { dur: 0.5, gain: 0.3 }); // LATER...
    k.play('thud', 126.62, { gain: 0.3 });        // the sultan lands
    k.play('chime', 149.3, { note: 'C6', gain: 0.5 });
    k.play('pop', 160.55, { gain: 0.3, pitch: 0.6 }); // gulp
    k.play('chime', 170.4, { note: 'C6', gain: 0.6 });
  },
};
window.SCENE = SCENE;
