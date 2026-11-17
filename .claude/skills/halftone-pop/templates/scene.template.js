// ===== starter scene: replace the world, camera, overlays and score with your own story =====
// Runs as-is: `node scripts/new-project.mjs <dir>` then `python3 scripts/hp-build.py <dir>`.
// World units are 1000 wide x HP.world.h tall (1230 for 9:16); draw anything in them, the camera maps them into the panel.
// Available from the engine: K.*, the style S (title, label, arrow, box, counter, emphasis, transition), and the enhanced helpers
// (ink/shape/seg/ell/star/sfx/bubble/cloud/bulb/clockFace/dizzy/person, drawSun/cloudFlat/layer1, hitPulse/shakeAt, kfn/talk).
const GR = 900, DUR = 10;
const skyL = () => layer1('sky', 1000, 920, (x) => { x.fillStyle = C.blue; x.fillRect(0, 0, 1000, 920); x.fillStyle = dotPat(x, '#3f7be6', 13, 0.3); x.fillRect(0, 0, 1000, 920); });
const groundL = () => layer1('ground', 1000, HP.world.h, (x) => { shape(x, [[-10, GR], [1010, GR], [1010, HP.world.h], [-10, HP.world.h]], '#d9a441', { lw: 8, seed: 20, dot: C.red, pitch: 11, rad: 0.2, da: 0.5 }); shape(x, [[-10, GR - 8], [1010, GR - 8], [1010, GR + 22], [-10, GR + 22]], GREEN, { lw: 6, seed: 21, dot: GREEND, pitch: 8, rad: 0.2 }); });
const CAM = [[0, { x: 500, y: 640, zoom: 1.0 }], [3.4, { x: 500, y: 640, zoom: 1.0 }], [5.5, { x: 420, y: 760, zoom: 1.7 }], [DUR, { x: 420, y: 760, zoom: 1.7 }]];
HP.stage({
  duration: DUR, cameraKeys: CAM,
  shake: (t) => shakeAt(t, [6.0]),
  drawWorld(ctx, t, cam) {
    ctx.drawImage(skyL(), 0, 0, 1000, 920); drawSun(ctx, 760, 130); cloudFlat(ctx, 120 + ((t * 3) % 1100), 110, 1.0);
    ctx.drawImage(groundL(), 0, 0, 1000, HP.world.h);
    const x = kfn(t, [[3, -80], [6, 380]], 'inOut'), moving = t > 3 && t < 6;
    person(ctx, { x, y: GR + 2, s: 1.0, dir: 1, kind: 'thief', v: 0, ph: x / 21, amp: moving ? 0.9 : 0, eyes: 'open', mouth: t > 6.2 ? 'open' : 'smile', talk: talk(t, [[6.4, 9]], 0) });
    if (t >= 6.4 && t < 9.6) bubble(ctx, x + 190, GR - 300, 280, 110, x + 40, GR - 190, K.beat(t, 6.4, 0.3, 'lin'), 'HELLO!', { size: 60 });
  },
  overlays(ctx, t, cam, S) {
    if (t < 3.8) { const ex = K.beat(t, 3.0, 0.7, 'lin'); ctx.save(); ctx.globalAlpha = 1 - ex; ctx.translate(0, ex * 60);
      S.title(ctx, 'My Film', 500, 1060, K.beat(t, 0.15, 1.0, 'lin'), { size: 64, align: 'center' }); ctx.restore(); }
    if (t >= 8.2) S.title(ctx, 'THE END', 500, 190, K.beat(t, 8.2, 0.8, 'lin'), { size: 80, align: 'center' });
  },
  score(k, S) {
    k.bed(S.sfx.bed, 0, DUR, 0.5); [0.3, 0.75].forEach((h, i) => k.play('pop', h, { pitch: 0.8 + i * 0.1, gain: 0.4 }));
    k.play('pop', 6.4, { pitch: 1.2, gain: 0.5 }); k.play('stamp', 8.2, { gain: 0.7 }); k.play('chime', 8.5, { note: 'C6', gain: 0.9 });
  },
});
