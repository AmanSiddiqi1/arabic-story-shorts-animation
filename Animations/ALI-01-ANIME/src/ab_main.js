// ===== ALI-01-ANIME: shot list dispatch, panel framing, lettering helpers, sound =====
// Each shot: { a, b, ww (world width), cam(t), world(ctx, t, cam), over(ctx, t, cam, S) } drawn in the 1000 x 1230 panel
// through the camera, or { panel(ctx, t, S) } drawn straight in panel units (close-ups, inserts). Shots are pushed by ab_s*.js.

function abShot(t) { for (const s of AB_SHOTS) if (t >= s.a && t < s.b) return s; return AB_SHOTS[AB_SHOTS.length - 1]; }
function abCamClamp(c, ww) { const z = c.zoom; return { x: K.clamp(c.x, 500 / z, ww - 500 / z), y: K.clamp(c.y, 615 / z, 1230 - 615 / z), zoom: z }; }
// panel-only shake (rock grinding), amplitude 3 units on ones
function abShake(t) { let a = 0; for (const [t0, t1] of [[45.9, 47.3], [85.95, 87.4], [53.4, 54.9], [66.4, 67.4]]) if (t >= t0 && t < t1) a = 3 * Math.min(1, (t - t0) / 0.2, (t1 - t) / 0.2); return a ? [a * Math.sin(t * 61), a * 0.7 * Math.cos(t * 47)] : [0, 0]; }
// Arabic display words, one per spoken word (RTL: the first word on the right), chrome in Lalezar; o: {size, glow, gone, wobble}
function abWords(ctx, S, words, times, x, y, t, o = {}) {
  const size = o.size || 76, gap = size * 0.32; if (t < times[0] || (o.gone && t > o.gone + 0.3)) return;
  ctx.save(); ctx.font = `400 ${size * (K.layout(1080, 1920).s || 1)}px "Lalezar"`; const ws = words.map((w) => ctx.measureText(w).width); ctx.restore();
  const total = ws.reduce((a, b) => a + b, 0) + gap * (words.length - 1); x = K.clamp(x, 70 + total / 2, 930 - total / 2); let cx = x + total / 2;
  ctx.save(); if (o.gone && t > o.gone) ctx.globalAlpha *= 1 - K.clamp((t - o.gone) / 0.3);
  words.forEach((w, i) => { const wx = cx - ws[i] / 2; cx -= ws[i] + gap; if (t < times[i]) return;
    const wb = o.wobble ? Math.sin(AB_T3(t) * 17 + i * 2) * o.wobble : 0;
    S.title(ctx, w, wx, y + wb, K.clamp((t - times[i]) / 0.5), { font: 'Lalezar', size, align: 'center', glow: o.glow }); });
  ctx.restore();
}
// tape tracking noise band (a roll of torn lines), in canvas pixels inside the story panel
function abTracking(ctx, t, t0, dur = 0.5) {
  const u = (t - t0) / dur; if (u < 0 || u > 1) return; const [x, y, w, h] = AB_PANEL, cv = ctx.canvas, R = K.rng(1 + Math.floor(t * 30)), by = y + h * u;
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  for (let i = 0; i < 4; i++) { const yy = by + (R() - 0.5) * 90, bh = 6 + R() * 26, dx = (R() - 0.5) * 70; ctx.drawImage(cv, x, yy, w, bh, x + dx, yy, w, bh); ctx.fillStyle = 'rgba(255,255,255,0.22)'; ctx.fillRect(x, yy + bh * 0.5, w, 2); }
  ctx.restore();
}

const SCENE = {
  duration: AB_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = null;
    S.background(ctx, W, H, t, THEME.page);
    const [px, py, pw, ph] = AB_PANEL; S.box(ctx, px, py, pw, ph, 1, THEME.panel);
    const sh = abShake(t), sc = abShot(t);
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh[0], py + sh[1]); ctx.scale(pw / 1000, ph / 1230);
    if (sc.panel) sc.panel(ctx, t, S);
    else { const cam = abCamClamp(sc.cam(t), sc.ww || 1000); if (sc.under) sc.under(ctx, t, cam, S); ctx.save(); K.camera(ctx, 1000, 1230, cam); sc.world(ctx, t, cam, S); ctx.restore(); if (sc.over) sc.over(ctx, t, cam, S); }
    if (t >= 56.2 && t < 57.03) {} // the tape transition is drawn over the panel below
    ctx.restore();
    if (t >= 56.2 && t < 57.03) S.transition(ctx, W, H, K.clamp((t - 56.2) / 0.83), { rect: AB_PANEL, caption: 'MUCH LATER...' });
    abTracking(ctx, t, 141.6, 0.55); abTracking(ctx, t, 81.76, 0.2); abTracking(ctx, t, 82.3, 0.2);
    subtitle(ctx, W, H, t, 1);
    S.finish(ctx, W, H, t);   // the CRT pass, always last
  },
  score(k, S) {   // 14 quiet effects, each inside a measured narration pause (silencedetect -35 dB); master 0.6 at render
    k.bed('tape', 0, AB_DUR, 0.6);
    k.play('blip', 15.75, { gain: 0.5 });             // pause 15.29-16.52: the bundle settles
    k.play('thud', 22.05, { gain: 0.4 });             // 21.73-22.66: the donkey stamps
    k.play('riser', 33.45, { dur: 0.9, gain: 0.45 }); // 33.31-34.56: into the riders
    k.play('chime', 49.2, { note: 'E6', gain: 0.45 });// 49.14-50.35: the gold door
    k.play('glitch', 56.3, { gain: 0.6 });            // 56.00-57.23: the tape transition
    k.play('whoosh', 62.0, { gain: 0.5 });            // 61.75-62.80: the leader swings up
    k.play('stamp', 65.85, { gain: 0.35 });           // 65.71-66.74: the gold light flickers
    k.play('thud', 69.7, { gain: 0.35 });             // 69.32-70.54: hooves leave
    k.play('blip', 77.3, { gain: 0.5 });              // 76.92-78.08: the donkey's ears
    k.play('riser', 88.4, { dur: 0.9, gain: 0.45 });  // 88.33-89.54: into the cave
    k.play('chime', 94.55, { note: 'A5', gain: 0.45 });// 94.49-95.57: the treasure
    k.play('whoosh', 104.9, { gain: 0.45 });          // 104.37-105.62: the ride home
    k.play('stamp', 123.0, { gain: 0.35 });           // 122.63-123.87: Cassim's coin eyes
    k.play('chime', 139.1, { note: 'C6', gain: 0.55 });// after the last word: THE END
  },
};
window.SCENE = SCENE;
