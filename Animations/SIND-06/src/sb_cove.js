// ===== SIND-06 new set: mountainCove (the wreck beach ringed by cliffs, the waterfall, the stones field, the stream that runs
// away from the sea, the cave mouth under the mountain) =====
// World 2600 wide, ground (beach) y 900, the mountain above the cave rises to y -700. Left: the sea gap x < 760 (open sea layers,
// horizon y 600) with rock teeth x 200..520 where the wreck lies (x 330). Beach x 780..1550 under the cliff foot (y 760). Camp anchors:
// wreckage pile x 820..1000, fire x 1100, signal pole x 1220, shelter x 1300, tally wall x 1350..1480 (y 600..720), climb spot x 1380
// (ledges y 780, 700, 620). Waterfall thread x 1560 (y 200 -> pool y 880). Stones field x 1500..1900. The stream runs from the pool
// along the foreground band (y 900..960) to the cave mouth (arch x 2180..2440, top y 650, water y 905). Far bank (people) y 892 for
// x > 1560. Launch bank x 1850. Bright midday; the painted plate is baked once, only water, ferns, glints and the waterfall move.
// Draw: sbCoveBack(ctx, t, cam, o) then the cast, then sbCoveFront(ctx, t, cam) (near reeds and boulders over the cast).
const SB_COVE = { w: 2600, ground: 900, foot: 760, bank: 892, fall: 1560, pool: [1560, 884], arch: [2180, 2440, 650], water: 905, launch: 1850, fire: 1100, pole: 1220, shelter: 1300, tally: [1350, 1480, 600, 720], climb: [1380, [780, 700, 620]], wreck: 330 };
const SB_COVE_SEA = { hz: 600, y: [612, 690, 800, 880], amp: 6, pal: 'day' };
// the cliff top line (y) at x (the ring of walls; the mountain over the cave)
function sbCoveTop(x) { return kfn(x, [[-300, -120], [140, -80], [330, 560], [560, 620], [640, 260], [760, -60], [1000, -140], [1300, -90], [1560, -170], [1800, -260], [2000, -420], [2260, -690], [2480, -470], [2700, -200]], 'inOut'); }
// the stream centre line from the pool (u 0) to inside the cave (u 1), and its width
const SB_RIVER = [[1560, 888], [1620, 912], [1720, 928], [1850, 934], [2000, 930], [2150, 920], [2300, 908], [2460, 906]];
function sbCoveRiver(u) { const n = SB_RIVER.length - 1, k = Math.min(n - 1, Math.floor(K.clamp(u) * n)), f = K.clamp(u) * n - k, a = SB_RIVER[k], b = SB_RIVER[k + 1]; return [K.lerp(a[0], b[0], f), K.lerp(a[1], b[1], f)]; }
function sbCoveRiverY(x) { for (let k = 0; k < SB_RIVER.length - 1; k++) { const a = SB_RIVER[k], b = SB_RIVER[k + 1]; if (x <= b[0]) return K.lerp(a[1], b[1], K.clamp((x - a[0]) / (b[0] - a[0]))); } return 906; }
const sbRiverW = (x) => K.lerp(60, 110, K.clamp((x - 1560) / 700));
const SB_STRATA = ['#ec9f96', '#f0bd72', '#a596cc', '#e8a6b4', '#e6c48a', '#9a8cc4'];
const SB_GEMBANK = sbPebbleList(1690, 2180, 952, 1010, 34, 611, 9, 14).concat(sbPebbleList(1700, 2170, 884, 900, 26, 612, 7, 10));
// ---------- the back plate: sky, the ring of cliffs, the mountain, the cave interior (0.6 resolution, soft painting) ----------
function sbCoveBackPlate() {
  return sbBakeAt('coveBack', 1560, 960, (c) => { c.scale(0.6, 0.6); c.translate(0, 700); const R = K.rng(4401);
    sbGrad(c, 0, -700, 2600, 1300, [[0, '#3f86e6'], [0.45, '#86c2f6'], [0.85, '#d2ecfa'], [1, '#e8f6fa']]);
    for (let i = 0; i < 6; i++) sbCloud(c, R() * 2600, -560 + R() * 300, 300 + R() * 300, 50, 'rgba(255,255,255,0.7)', 'rgba(200,190,240,0.35)', 12);
    sbCumulus(c, 260, 606, 380, 330, { seed: 4 }); sbCumulus(c, 520, 606, 260, 220, { seed: 5 });
    // the cliffs: outline from the top line down to the foot, strata bands, hard shade on the faces turned away from the sun
    const top = []; for (let x = 120; x <= 2700; x += 20) top.push([x, sbCoveTop(x)]);
    c.save(); c.beginPath(); c.moveTo(120, 1000); for (const p of top) c.lineTo(...p); c.lineTo(2700, 1000); c.closePath(); c.clip();
    for (let k = 0; k < 44; k++) { const y0 = -720 + k * 40; c.fillStyle = SB_STRATA[k % 6]; c.beginPath(); c.moveTo(0, y0); for (let x = 0; x <= 2700; x += 60) c.lineTo(x, y0 + 16 * Math.sin(x * 0.004 + k * 1.3) + 8 * Math.sin(x * 0.013 + k)); c.lineTo(2700, 1100); c.lineTo(0, 1100); c.closePath(); c.fill(); }
    sbGrad(c, 0, 300, 2700, 500, [[0, 'rgba(255,240,220,0)'], [1, 'rgba(120,70,120,0.22)']]);   // the foot of the wall in shade
    c.fillStyle = 'rgba(80,50,110,0.1)'; for (let x = 700; x < 2600; x += 140 + R() * 120) { const w = 30 + R() * 60, y = sbCoveTop(x) + 30; c.beginPath(); c.moveTo(x, y); c.lineTo(x + w, y + 40); c.lineTo(x + w * 0.6 + 80, 780); c.lineTo(x + 40, 780); c.closePath(); c.fill(); }
    // ledges (lighter lips with a hard shadow under), cracks, hanging plants, gull nests
    for (let i = 0; i < 26; i++) { const x = 680 + R() * 1880, y = Math.max(sbCoveTop(x) + 60, -600) + R() * 520; if (x > 2140 && x < 2480 && y > 560) continue; const w = 50 + R() * 90;
      c.fillStyle = '#fbe6d0'; c.fillRect(x, y, w, 6); c.fillStyle = 'rgba(90,50,100,0.35)'; c.fillRect(x + 4, y + 6, w - 8, 9);
      if (R() < 0.45) for (let k = 0; k < 3; k++) sbBlob(c, x + 10 + k * w * 0.3, y + 16 + R() * 20, 10 + R() * 8, 16 + R() * 14, '#5fbf6a', '#2f8a4a', { lw: 2 });
      if (R() < 0.3) { sbBlob(c, x + w * 0.5, y - 6, 18, 8, '#c8a070', '#8a6a3a', { lw: 2 }); sbBlob(c, x + w * 0.5 + 6, y - 14, 7, 6, '#ffffff', '#c8c0e0', { lw: 1.5 }); } }
    c.strokeStyle = 'rgba(90,50,100,0.45)'; c.lineWidth = 3; for (let i = 0; i < 40; i++) { let x = 700 + R() * 1850, y = sbCoveTop(x) + 80 + R() * 600; c.beginPath(); c.moveTo(x, y); for (let k = 0; k < 4; k++) { x += (R() - 0.5) * 30; y += 20 + R() * 30; c.lineTo(x, y); } c.stroke(); }
    // shrubs on the mountain over the mouth
    for (let i = 0; i < 18; i++) { const x = 1900 + R() * 650, y = sbCoveTop(x) + 30 + R() * 500; sbBlob(c, x, y, 18 + R() * 14, 12 + R() * 8, '#4fae6a', '#2a7a4a', { lw: 2 }); }
    c.restore();
    c.strokeStyle = '#7a4a7a'; c.lineWidth = 4; c.beginPath(); top.forEach((p, i) => (i ? c.lineTo(...p) : c.moveTo(...p))); c.stroke();
    // the cave interior (never black): plum to teal, painted depth, the water going in, two gem glints deep inside
    const [a0, a1, at] = SB_COVE.arch, A = townArchPts(a0, a1, at, 960, 'round');
    c.save(); K.poly(c, A, true); c.clip(); const g = c.createRadialGradient((a0 + a1) / 2 + 30, 830, 10, (a0 + a1) / 2, 820, 220); g.addColorStop(0, '#2f5f6f'); g.addColorStop(0.5, '#4a3a6a'); g.addColorStop(1, '#6a4a8a'); c.fillStyle = g; c.fillRect(a0 - 20, at - 20, a1 - a0 + 40, 340);
    c.fillStyle = 'rgba(140,110,180,0.5)'; c.beginPath(); c.moveTo(a0, 760); c.quadraticCurveTo((a0 + a1) / 2, 700, a1, 790); c.lineTo(a1, 700); c.lineTo(a0, 700); c.closePath(); c.fill();
    for (const [gx, gy, col] of [[2290, 820, '#ff6a8a'], [2350, 840, '#6aff9a']]) { sbGlaze(c, gx, gy, 22, col, 0.6); c.fillStyle = col; c.beginPath(); c.arc(gx, gy, 4, 0, 7); c.fill(); }
    c.restore();
  });
}
// ---------- the front plate: wet sand, the beach, the stones field, the stream bed, the near bank (scale 1, y 700..1230) ----------
function sbCoveFrontPlate() {
  return sbBakeAt('coveFront', 2600, 530, (c) => { c.translate(0, -700); const R = K.rng(4402), G = SB_COVE.ground;
    // headland foot sloping into the sea, then the beach under the cliff foot
    const beach = [[700, 1230], [700, 905], [740, 880], [790, 820], [860, 770], [2180, 762], [2180, 1230]];
    c.save(); K.poly(c, beach, true); c.clip(); sbGrad(c, 600, 760, 2000, 470, [[0, '#f4d4a8'], [0.3, '#fbe6c4'], [1, '#f0cc98']]);
    c.fillStyle = '#e0b88a'; c.beginPath(); c.moveTo(700, 1230); c.lineTo(700, 905); c.quadraticCurveTo(780, 960, 820, 1230); c.closePath(); c.fill();   // wet sand
    c.restore(); ink(c, beach.slice(1, 5), 3, 2, '#a8784a');
    // the stones field (boulders with moss caps), the tide line of shells and driftwood
    sbDress(c, 820, 1540, 930, 1200, 4411, { stones: 8, tufts: 4, flowers: 0, shells: 22, stone: ['#d8c8d8', '#9a8aaa'], grass: ['#8ac86a', '#4a8a4a'] });
    for (let i = 0; i < 14; i++) { const x = 1500 + R() * 420, y = 790 + R() * 90, r = 20 + R() * 40; if (x > 1530 && x < 1600 && y > 840) continue; sbStone(c, x, y, r, ['#d8c8d8', '#c8b8d0', '#e0d0c8'][i % 3], '#8a7a9a'); sbBlob(c, x - r * 0.1, y - r * 0.62, r * 0.45, r * 0.14, '#6ac86a', '#3a8a4a', { lw: 1.5, off: 2 }); }
    sbFlotsam(c, 'wood', 1180, 1110, 0, { s: 0.8, rot: 0.1 });
    // the pool at the foot of the waterfall
    c.fillStyle = '#5ac8e0'; c.beginPath(); c.ellipse(1560, 886, 60, 16, 0, 0, 7); c.fill(); c.strokeStyle = '#2f88b0'; c.lineWidth = 3; c.stroke();
    // the near bank under the stream (green, ferns, flowers) from x 1520 to the end
    const nb = [[1500, 1230], [1520, 930], [1600, 935]]; for (let x = 1620; x <= 2620; x += 40) nb.push([x, sbCoveRiverY(x) + sbRiverW(x) * 0.5 + 6]); nb.push([2620, 1230]);
    c.save(); K.poly(c, nb, true); c.clip(); sbGrad(c, 1500, 900, 1120, 330, [[0, '#7ad07a'], [1, '#4aa060']]); c.restore(); ink(c, nb.slice(1, -1), 3, 3, '#2f7a44');
    sbDress(c, 1560, 2600, 1000, 1210, 4412, { stones: 6, tufts: 14, flowers: 12, shells: 0 });
    for (let i = 0; i < 7; i++) sbFern(c, 1580 + i * 150 + R() * 60, 1160 + R() * 50, 70 + R() * 40);
    // the far bank strip behind the stream (sand, small stones) up to the cave mouth
    const fb = [[1540, 870]]; for (let x = 1560; x <= 2200; x += 40) fb.push([x, sbCoveRiverY(x) - sbRiverW(x) * 0.5 - 2]); fb.push([2200, 760], [1540, 760]);
    c.save(); K.poly(c, fb, true); c.clip(); sbGrad(c, 1540, 760, 700, 180, [[0, '#f0d8b0'], [1, '#e8c898']]); c.restore();
    sbPebbles(c, SB_GEMBANK, {});   // the pebbles, dulled by a sand wash (they light up live in S7)
    c.save(); c.globalCompositeOperation = 'source-atop'; c.globalAlpha = 0.6; c.fillStyle = '#d8c0a0'; for (const [x, y, r] of SB_GEMBANK) { c.beginPath(); c.arc(x, y, r * 1.2, 0, 7); c.fill(); } c.restore();
    // the cave mouth rim: rock border round the arch with ferns
    const [a0, a1, at] = SB_COVE.arch, A = townArchPts(a0 - 26, a1 + 26, at - 26, 960, 'round'), Ai = townArchPts(a0, a1, at, 960, 'round');
    c.save(); c.beginPath(); K.poly(c, A, true); c.moveTo(Ai[0][0], Ai[0][1]); Ai.forEach((p) => c.lineTo(...p)); c.closePath(); c.fillStyle = '#b07ab0'; c.fill('evenodd'); c.restore(); ink(c, Ai, 4, 4, '#4a2a5a'); ink(c, A, 3, 5, '#6a3a6a');
    // the wall beside and right of the arch down to the water (so the plate closes round the mouth)
    celShade(c, [[2180, 760], [a0 - 26, 760], [a0 - 26, 930], [2180, 930]], '#e0a8a0', '#b07a8a', { light: [-1, -1], off: 0, lw: 0 });
    celShade(c, [[a1 + 26, 700], [2620, 700], [2620, 1000], [a1 + 26, 1000]], '#e6b0a0', '#b07a8a', { light: [-1, 0], off: 18, lw: 3, line: '#6a3a6a' });
  });
}
// live water of the stream (two tones, foam dashes moving on t toward the cave), the pool rings, the waterfall
function sbCoveStream(ctx, t, x0 = 1540, x1 = 2470) {
  const tc = SB_T3(t), top = [], bot = [];
  for (let x = x0; x <= x1; x += 20) { const y = sbCoveRiverY(x), w = sbRiverW(x) * 0.5; top.push([x, y - w + 2 * Math.sin(x * 0.03 + t * 3)]); bot.push([x, y + w]); }
  ctx.save(); K.poly(ctx, [...top, ...bot.reverse()], true); ctx.fillStyle = '#3ab8d8'; ctx.fill(); ctx.clip();
  ctx.fillStyle = '#7ae0f0'; for (const [x, y] of top) ctx.fillRect(x - 1, y, 22, 9);
  ctx.strokeStyle = '#ffffff'; ctx.lineCap = 'round'; const R = K.rng(4430);
  for (let i = 0; i < 36; i++) { const span = x1 - x0 + 100, x = x0 - 50 + (((R() * span + t * (110 + R() * 60)) % span) + span) % span, y = sbCoveRiverY(x) + (R() - 0.5) * sbRiverW(x) * 0.6; if (Math.floor(tc * 8 / 3 + i) % 4 === 0) continue; ctx.globalAlpha = 0.75; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 18 + R() * 16, y); ctx.stroke(); }
  ctx.restore(); ink(ctx, top, 3, 6, '#2a7aa0');
}
function sbWaterfall(ctx, t, x = SB_COVE.fall, y0 = -150, y1 = 884) {
  const tc = SB_T3(t); ctx.save(); ctx.fillStyle = 'rgba(230,250,255,0.92)'; ctx.fillRect(x - 13, y0, 26, y1 - y0); ctx.fillStyle = '#bfeaff'; ctx.fillRect(x + 4, y0, 7, y1 - y0);
  ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 3; for (let i = 0; i < 22; i++) { const yy = y0 + ((((tc * 420 + i * 53) % (y1 - y0)) + (y1 - y0)) % (y1 - y0)); ctx.beginPath(); ctx.moveTo(x - 8 + (i % 3) * 6, yy); ctx.lineTo(x - 8 + (i % 3) * 6, yy + 24); ctx.stroke(); }
  for (let k = 0; k < 3; k++) sbRing(ctx, x, y1, ((t * 0.9 + k / 3) % 1), 80, { lw: 2.5 });
  const R = K.rng(4440 + Math.floor(tc * 8)); ctx.fillStyle = '#ffffff'; for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.arc(x + (R() - 0.5) * 70, y1 - 6 - R() * 26, 3 + R() * 3, 0, 7); ctx.fill(); } ctx.restore();
}
// the sea gap (clipped left of the headland foot), rock teeth, and the wreck lying on them. o.sea (override), o.wreck(ctx) extra, o.mid
function sbCoveSea(ctx, t, cam, o = {}) { const sea = o.sea || SB_COVE_SEA;
  ctx.save(); ctx.beginPath(); ctx.moveTo(-600, 560); ctx.lineTo(640, 560); ctx.lineTo(700, 780); ctx.lineTo(760, 900); ctx.lineTo(820, 1230); ctx.lineTo(-600, 1230); ctx.closePath(); ctx.clip();
  sbSeaBack(ctx, t, sea, -600, 900); if (o.far) o.far(ctx);
  sbSeaLayer(ctx, 2, t, sea, -600, 900);
  if (o.wreck !== false) sbCoveWreck(ctx, t, o.wreckK ?? 1);
  sbRockTeeth(ctx, 200, 520, 812, t, { seed: 78 });
  if (o.mid) o.mid(ctx);
  sbSeaLayer(ctx, 3, t, sea, -600, 900);
  sbSeaStreaks(ctx, t, sea, -600, 820, 920, 1220, { n: 8, a: 0.7 });
  ctx.restore();
}
// the broken ship on the rocks (two halves, the fallen mast) in the cove; k fades the masts (the crew takes planks from it)
function sbCoveWreck(ctx, t, k = 1) { sbDhowWreck(ctx, { x: SB_COVE.wreck, y: 812, s: 0.5, dir: 1, wreck: 1, mastFall: 1, t, halves: [{ dx: -40, dy: 10, rot: -0.18 }, { dx: 40, dy: 4, rot: 0.14 }], pitch: 0.04 }); }
// sbCoveBack: sky, the cliffs and mountain, the sea gap, the waterfall, the plate, the stream and the live pebbles/glints.
// o: {sea, far(ctx) (things on the horizon), mid(ctx) (on the water), lit (0..1 the banks lit up), glints, wreck: false}
function sbCoveBack(ctx, t, cam, o = {}) {
  ctx.drawImage(sbCoveBackPlate(), 0, -700, 2600, 1600);
  sbCoveSea(ctx, t, cam, o);
  sbWaterfall(ctx, t);
  ctx.drawImage(sbCoveFrontPlate(), 0, 700);
  sbCoveStream(ctx, t);
  if (o.lit > 0) { const n = SB_GEMBANK.length, list = SB_GEMBANK.filter((p) => p[0] < 1690 + 520 * o.lit + 30); for (const p of list) sbGlow(ctx, p[0], p[1], p[2] * 2.6, 0.35, SB_GEMC[p[3]][0]); sbPebbles(ctx, list, { t: o.glints === false ? null : t });
    // coloured reflections wobbling on the water
    ctx.save(); for (const [x, y, r, ci] of list) { if (y > 940) continue; ctx.globalAlpha = 0.4; ctx.fillStyle = SB_GEMC[ci][0]; ctx.fillRect(x - r + 3 * Math.sin(SB_T3(t) * 5 + x), y + 26, r * 1.6, 4); } ctx.restore(); }
  // ferns on the rim of the cave mouth, swaying on twos (the draught lifts them in S6)
  const tc = SB_T2(t), dr = o.draught || 0; [[2170, 690], [2200, 650], [2450, 650], [2470, 700], [2310, 620]].forEach(([x, y], i) => { ctx.save(); ctx.translate(x, y); ctx.rotate(0.15 * Math.sin(tc * 1.6 + i) - dr * 0.4); sbFern(ctx, 0, 0, 46 + (i % 2) * 14, '#3faa5a'); ctx.restore(); });
}
// near boulders and reeds over the cast (front pass); o.x0 / o.x1 limit
function sbCoveFront(ctx, t, cam, o = {}) { const tc = SB_T2(t);
  for (const [x, y, r] of [[1640, 1222, 70], [2050, 1236, 90], [900, 1236, 60]]) sbStone(ctx, x, y, r, '#c8b8d0', '#8a7a9a');
  for (let i = 0; i < 9; i++) { const x = 1700 + i * 80, h = 90 + (i % 3) * 30; ctx.save(); ctx.translate(x, 1236); ctx.rotate(0.08 * Math.sin(tc * 1.4 + i * 0.7)); for (let k = -1; k <= 1; k++) celShade(ctx, [[k * 8 - 4, 0], [k * 14, -h], [k * 8 + 4, 0]], '#5aa85a', '#2f7a44', { light: [-1, 0], off: 2, lw: 1.5 }); ctx.restore(); }
}
