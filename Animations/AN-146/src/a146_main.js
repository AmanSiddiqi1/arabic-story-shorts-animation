// ===== AN-146 main: scene table, cameras, lettering (panel space), transitions, sound =====
// scenes: [id, start, end, draw, world width, camera keys [t, x, y, zoom] (eased between keys; equal keys hold)]
const A146_SC = [
  ['S1', 0, 9.2, a146S1, 1000, [[0, 500, 700, 1.15], [0.9, 500, 700, 1.15], [1.3, 500, 720, 1.6], [4.4, 500, 720, 1.6], [4.9, 600, 700, 1.3], [8.3, 600, 700, 1.3], [8.9, 500, 700, 1.15]]],
  ['S2', 9.2, 15.5, a146S2, 1000, [[9.2, 400, 720, 1.35], [12.2, 400, 720, 1.35], [12.9, 720, 740, 1.6], [13.6, 720, 740, 1.6], [14.2, 800, 745, 2.0]]],
  ['S3', 15.5, 21.9, a146S3, 1000, [[15.5, 560, 700, 1.2], [20.3, 560, 700, 1.2], [21.4, 630, 740, 1.7]]],
  ['S4', 21.9, 51.6, a146Nite, 1000, [[21.9, 420, 700, 1.2], [26.5, 420, 700, 1.2], [26.9, 300, 720, 1.6], [31.6, 300, 720, 1.6], [31.9, 330, 700, 1.9], [34.0, 330, 700, 1.9], [34.4, 400, 700, 1.7], [35.2, 400, 700, 1.7],
    [36.6, 580, 700, 1.3], [38.0, 580, 700, 1.3], [38.6, 590, 700, 1.5], [39.5, 590, 700, 1.5], [40.0, 580, 700, 1.3], [47.2, 580, 700, 1.3], [47.8, 630, 740, 2.0], [50.0, 630, 740, 2.0], [50.4, 630, 720, 1.6]]],
  ['S7', 51.6, 66.08, a146S7, 1000, [[51.6, 480, 740, 1.5], [53.3, 480, 740, 1.5], [53.9, 720, 740, 1.6], [54.9, 720, 740, 1.6], [55.3, 480, 740, 1.5], [56.1, 480, 740, 1.5], [56.5, 340, 740, 1.45], [64.9, 340, 740, 1.45], [65.4, 470, 780, 2.0]]],
  ['S8', 66.08, 70.7, a146S8, 1000, [[66.08, 500, 720, 1.2]]],
  ['S9', 70.7, 87.2, a146S9, 1000, [[70.7, 650, 700, 1.4], [74.5, 650, 700, 1.4], [74.9, 560, 680, 1.15], [81.2, 560, 680, 1.15], [83.0, 460, 680, 1.15], [83.6, 700, 700, 1.7]]],
  ['S10', 87.2, 101.2, a146S10, 1000, [[87.2, 600, 700, 1.2], [91.0, 600, 700, 1.2], [91.4, 620, 700, 1.5], [94.4, 620, 700, 1.5], [94.6, 630, 750, 2.1], [96.6, 630, 750, 2.1], [96.84, 560, 620, 1.3], [98.5, 560, 620, 1.3], [98.7, 700, 700, 1.8]]],
  ['S11', 101.2, 111.0, a146S11, 1000, [[101.2, 300, 740, 1.4], [103.4, 300, 740, 1.4], [106.6, 520, 780, 1.6], [107.62, 520, 780, 1.6], [107.82, 780, 740, 1.6], [108.3, 780, 740, 1.6], [108.9, 560, 720, 1.25]]],
  ['S12', 111.0, 123.6, a146S12, 1000, [[111.0, 640, 700, 1.6], [118.2, 640, 700, 1.6], [118.7, 560, 680, 1.15], [120.2, 560, 680, 1.15], [121.1, 590, 700, 1.5], [123.6, 560, 700, 1.5]]],
  ['S13', 123.6, 132.6, a146S13, 1800, [[123.6, 420, 700, 1.2], [124.6, 420, 700, 1.2], [125.4, 560, 700, 1.2], [126.4, 560, 700, 1.2], [127.6, 1380, 660, 1.1], [130.2, 1380, 660, 1.1], [131.0, 420, 720, 1.5], [131.5, 420, 720, 1.5], [132.4, 420, 740, 1.8]]],
  ['S14', 132.6, 146.9, a146S14, 1000, [[132.6, 480, 720, 1.2], [135.5, 480, 720, 1.2], [135.9, 680, 740, 1.6], [137.5, 680, 740, 1.6], [137.75, 800, 720, 2.6], [139.8, 800, 720, 2.6], [140.2, 600, 700, 1.7], [143.3, 600, 700, 1.7], [144.0, 480, 700, 1.3]]],
  ['S15', 146.9, A146_DUR + 1, a146Quay2, 1800, [[146.9, 520, 700, 1.3], [150.0, 520, 700, 1.3], [154.0, 900, 690, 1.15], [156.2, 900, 690, 1.15], [156.7, 990, 660, 1.3], [160.2, 990, 660, 1.3], [160.8, 960, 660, 1.3], [164.8, 960, 660, 1.3],
    [165.4, 880, 700, 1.8], [168.3, 880, 700, 1.8], [168.6, 880, 700, 1.7], [173.4, 880, 700, 1.7], [176.6, 900, 615, 1.0]]]];
function a146Cam(i, t) {
  const sc = A146_SC[i], K2 = sc[5], w = sc[4]; let c;
  const j = K2.findIndex((q) => t < q[0]); if (j === 0) c = K2[0]; else if (j < 0) c = K2[K2.length - 1];
  else { const a = K2[j - 1], b = K2[j], u = K.ease.inOut(K.clamp((t - a[0]) / (b[0] - a[0]))); c = [0, K.lerp(a[1], b[1], u), K.lerp(a[2], b[2], u), K.lerp(a[3], b[3], u)]; }
  const z = c[3]; return { x: K.clamp(c[1], 500 / z, w - 500 / z), y: K.clamp(c[2], 615 / z, 1230 - 615 / z), zoom: z };
}
const a146Pan = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];
const a146SceneAt = (t) => { let i = A146_SC.findIndex((s) => t < s[2]); if (i < 0) i = A146_SC.length - 1; return i; };

// ---------- lettering, labels, counters (panel space, 1000 x 1230) ----------
function a146Over(ctx, t, cam, S, id, st) {
  const P = (x, y) => a146Pan(x, y, cam), F = a146Fade;
  const lab = (txt, x, y, a, b, o = {}) => { if (!a146In(t, a, b)) return; ctx.save(); ctx.globalAlpha = F(t, a, b, 0.2); S.label(ctx, txt, x, y, a146B(t, a, 0.35), { size: 46, align: 'center', ...o }); ctx.restore(); };
  const arr = (a0, a1, a, b, o = {}) => { if (!a146In(t, a, b)) return; ctx.save(); ctx.globalAlpha = F(t, a, b, 0.2); S.arrow(ctx, a0, a1, a146B(t, a, 0.4), { width: 18, ...o }); ctx.restore(); };
  const word = (txt, x, y, a, b, size = 84, o = {}) => { if (!a146In(t, a, b)) return; ctx.save(); ctx.globalAlpha = F(t, a, b, 0.15); sfx(ctx, txt, x, y, size, K.clamp((t - a) / 0.25), o); ctx.restore(); };
  const count = (v, x, y, a, b, w2) => { if (!a146In(t, a, b)) return; ctx.save(); ctx.globalAlpha = F(t, a, b, 0.25); S.counter(ctx, v, x, y, a146B(t, a, 0.3), { size: 84 }); if (w2) S.label(ctx, w2, x, y + 90, a146B(t, a + 0.1, 0.3), { size: 36, align: 'center' }); ctx.restore(); };
  const head = (Q) => P(...a146Head(Q));
  if (id === 'S1') { const h = head(st.P); lab('EX THIEF', 300, 230, 1.75, 4.3, { size: 52 }); arr([330, 270], [h[0] - 40, h[1] - 90], 1.85, 4.3, { bend: -0.2 }); lab('CLOTH SHOP', 640, 230, 5.6, 7.4, { size: 46 }); }
  if (id === 'S2') { const cb = countedBeats(t, A146_PATS); if (cb.n) count(cb.n, 820, 250, 13.04, 15.45, t > 14.6 ? 'BALES' : null); }
  if (id === 'S4') { const h = head(st.P);
    lab('ANOTHER THIEF', 430, 230, 24.56, 26.5, { size: 50 }); arr([430, 270], [h[0] + 10, h[1] - 90], 24.66, 26.5, { bend: 0.2 });
    lab('SAME CLOTHES!', 560, 230, 29.16, 31.5, { size: 50 });
    if (a146In(t, 60.8, 63.0)) {}
  }
  if (id === 'S7') { const hd = st.P.HL ? P(st.P.HL[0], st.P.HL[1]) : [500, 500];
    [60.8, 61.3, 61.92].forEach((a, k) => word(String(k + 1), hd[0] + 60 + k * 50, hd[1] - 90 - k * 16, a, 62.7, 60, { rot: -0.05 }));
    if (!st.W.hidden || t < 65.8) { const w = head(st.W); lab('ALL IS WELL', Math.max(200, w[0] + 40), 240, 64.56, 65.9, { size: 46 }); } }
  if (id === 'S9') { const s = P(st.seat.x, st.seat.y); const n = A146_LAND.filter((a) => t >= a).length; if (n) count(n, s[0], Math.max(240, s[1] - 230), 79.2, 81.2, t > 79.96 ? 'BALES' : null);
    const w = head(st.W); lab('2 DIRHAMS', 640, 240, 85.46, 86.75, { size: 50 }); arr([660, 280], [w[0] + 20, w[1] - 110], 85.56, 86.75, { bend: -0.2 }); }
  if (id === 'S10') { const h = head(st.M); lab('THE REAL MERCHANT', 520, 230, 88.9, 91.0, { size: 48 }); arr([600, 270], [h[0] + 10, h[1] - 100], 89.0, 91.0, { bend: 0.2 });
    const w = head(st.W); word('WELCOME!', w[0], Math.max(220, w[1] - 210), 92.94, 94.2, 90, { rot: -0.06 }); }
  if (id === 'S11') { const d = P(A146_CAND1[0] - 30, A146_CAND1[1] - 30); lab('WAX', 360, 240, 104.06, 105.2, { size: 46 }); arr([380, 280], [d[0], d[1] - 30], 104.1, 105.2, { bend: -0.25 });
    if (t >= 109.02) { const c = P(780, 600); word('4 BALES GONE!', c[0] - 80, 250, 109.02, 110.9, 80, { rot: -0.05 }); count(t < 109.4 ? 4 : 0, Math.min(860, c[0] + 60), 420, 109.02, 110.9); } }
  if (id === 'S13') { const d = P(410, 560); lab('STOREROOM', d[0], 240, 125.72, 127.2, { size: 50 }); arr([d[0], 280], [d[0], d[1] + 10], 125.82, 127.2, { bend: 0.15 }); }
  if (id === 'S14') { const cb = countedBeats(t, A146_TAPS); if (cb.n) { const p = P(710, 560); count(cb.n, p[0], Math.max(250, p[1]), 136.92, 137.75); }
    const k = P(...st.knot); lab('MY KNOT!', 420, 240, 137.75, 139.7, { size: 54 }); arr([440, 285], [k[0] - 30, k[1] - 40], 137.85, 139.7, { bend: -0.25 });
    if (a146In(t, 141.3, 143.3) && st.M.HR) { const c = P(st.M.HR[0], st.M.HR[1] + 80); lab("THIEF'S CLOAK", 520, 240, 141.3, 143.3, { size: 48 }); arr([560, 280], [c[0] + 30, c[1] - 30], 141.4, 143.3, { bend: 0.2 }); } }
  if (id === 'S15') { const s = P(st.load[0], st.load[1]); const n = A146_QLAND.filter((a) => t >= a).length; if (n && t < 150.3) count(n, s[0], Math.max(250, s[1] - 230), 148.2, 150.3, t > 149.1 ? 'BALES' : null);
    lab('ALL BACK', Math.min(820, Math.max(180, s[0])), 240, 164.6, 165.9, { size: 54 });
    const m = head(st.M); word('HA HA HA!', Math.min(800, m[0] + 60), Math.max(230, m[1] - 230), 168.52, 170.3, 90, { rot: 0.05 });
    if (t >= 177.4) S.title(ctx, 'THE END', 500, 300, a146B(t, 177.4, 0.8), { size: 110, align: 'center' }); }
}

function a146DrawScene(ctx, i, t, S) {
  const sc = A146_SC[i], cam = a146Cam(i, t);
  ctx.save(); K.camera(ctx, 1000, 1230, cam); const st = sc[3](ctx, t) || {}; ctx.restore();
  a146Over(ctx, t, cam, S, sc[0], st);
}
const A146_KICKS = [...A146_LAND, ...A146_QLAND, 101.3, 101.62, 56.4];
const SCENE = {
  duration: A146_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196, sh = kick(t, A146_KICKS, 2.5, 13, 10);
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh, py - sh * 0.4); ctx.scale(pw / 1000, ph / 1230);
    const i = a146SceneAt(t);
    // sunrise wipe S9 -> S10 at 87.2 (a slanted band following the sun); cuts elsewhere
    const tb = 87.2, wipe = t > tb - 0.25 && t < tb + 0.25;
    if (wipe) { const a = A146_SC.findIndex((s) => s[0] === 'S9'), p = K.ease.inOut(K.clamp((t - tb + 0.25) / 0.5)), X = K.lerp(-260, 1260, p);
      a146DrawScene(ctx, a, Math.min(t, tb - 0.001), S); ctx.save(); ctx.beginPath(); ctx.moveTo(-400, -10); ctx.lineTo(X + 160, -10); ctx.lineTo(X - 160, 1240); ctx.lineTo(-400, 1240); ctx.closePath(); ctx.clip(); a146DrawScene(ctx, a + 1, Math.max(t, tb), S); ctx.restore();
      ctx.save(); ctx.lineWidth = 18; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(X + 160, -10); ctx.lineTo(X - 160, 1240); ctx.stroke(); ctx.lineWidth = 6; ctx.strokeStyle = C.yellow; ctx.stroke(); ctx.restore(); }
    else a146DrawScene(ctx, i, t, S);
    if (t >= 21.4 && t < 22.4) S.transition(ctx, 1000, 1230, (t - 21.4) / 1.0, { caption: 'ONE NIGHT...' });
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // the plan's seven quiet effects, only in the narration gaps or after the last word (master 0.6 at render)
    k.play('pop', 4.35, { gain: 0.3 });
    k.play('pop', 9.2, { gain: 0.25 });
    k.play('whoosh', 21.7, { gain: 0.25 });
    k.play('chime', 86.95, { note: 'E6', gain: 0.35 });
    k.play('pop', 91.0, { gain: 0.3 });
    k.play('thud', 110.7, { gain: 0.35 });
    k.play('chime', 177.9, { note: 'C6', gain: 0.5 });
  },
};
window.SCENE = SCENE;
