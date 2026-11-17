// ===== KD-019 main: sets per time, effects, thought clouds, camera, lettering, counters, sound =====
const K19FISHN = (t) => t < 72.9 ? 12 : t < 86.66 ? 10 : t < 87.4 ? 8 : t < 88.1 ? 6 : 4;
const K19DAY = (t) => t < 86.66 ? 1 : t < 87.4 ? 2 : t < 88.1 ? 3 : t < 89.25 ? 4 : t < 168.02 ? 5 : 6;
// bones on the ledge: [landing time, index]; the first pair is flicked from the beak, the others drop on days 2-4
const K19BONET = [86.0, 86.15, 86.95, 87.05, 87.65, 87.75, 88.35, 88.45];
function k19bonesDraw(ctx, t, o = {}) {
  for (let k = 0; k < 8; k++) { const [bx, by, kind, rot, dir] = K19BONES[k], tl = K19BONET[k]; if (t < 110 && t < tl - 0.5) continue;
    let x = bx, y = by - 6, r = rot;
    if (t < 110 && t < tl) { const u = K.clamp((t - (tl - 0.5)) / 0.5); if (k < 2) { const A = [650, 585]; x = K.lerp(A[0], bx, u); y = K.lerp(A[1], by - 6, u) - 140 * Math.sin(Math.PI * u); r = rot + 6 * u; } else { x = bx; y = fallY(t, tl - 0.5, tl, 260, by - 6); r = rot + 3 * u; } }
    if (t < 110) y -= rebound(t, tl, 14, 0.2);
    if (o.rattle) { x += o.rattle * Math.sin(t * 40 + k); r += o.rattle * 0.02 * Math.sin(t * 33 + k * 2); }
    const rim = o.count != null && k < o.count ? Math.max(0, 1 - (t - o.countT[k]) / 0.12) : 0;
    k19bones(ctx, x, y, { kind, rot: r, dir, s: 0.82, rim });
    if (o.ghost && k < 2) { const a = o.ghost * (Math.floor(t * 15) % 2 ? 0.8 : 0.35); k19fish(ctx, { x, y: y - 4, s: k ? 0.62 : 0.4, pal: k ? 2 : 0, dir, alpha: a, eyes: 'shut', noBlink: true }); }
  }
}

// ---------------------------------------------------------------- thought-cloud insides (world units)
function k19fisherman(ctx, x, y, s, o = {}) { person(ctx, { x, y, s, costume: 'villager', pal: o.pal, talk: o.talk || 0, handR: o.handR, handL: o.handL, gaze: o.gaze || [0, 0.3], alpha: o.alpha, ...o.extra }); }
function k19pondIcon(ctx, x, y, rx, ry, o = {}) { shape(ctx, ell(x, y, rx + 18, ry + 12, 30), K19GRASS, { lw: 6, seed: 120 }); shape(ctx, ell(x, y, rx, ry, 30), K19WATER, { lw: 6, seed: 121, dot: '#1d5bd0', pitch: 10, rad: 0.3, da: 0.6 }); }
function k19insideNet(ctx, t) {   // S5: the fishermen and their net
  const pop = (t0) => K.ease.back(K.clamp((t - t0) / 0.35)), pondY = 860;
  const emptyAt = 41.5; k19pondIcon(ctx, 500, pondY, 300, 80);
  const caught = t > 37.4;
  if (!caught) for (let k = 0; k < 6; k++) { const fx = 330 + k * 66 + 20 * Math.sin(t * 2 + k), fy = pondY - 10 + 22 * Math.sin(t * 1.5 + k * 2); k19fish(ctx, { x: fx, y: fy, s: 0.42, pal: k % 3, dir: Math.cos(t * 2 + k) > 0 ? 1 : -1, ph: t * 8 + k, eyes: t > 36.98 ? 'wide' : 'open', noBlink: true }); }
  if (t > emptyAt) { k19bubble(ctx, 520, pondY - 10 - ((t - emptyAt) * 30 % 60), 14, 1); seg(ctx, 420, pondY + 40, 400, pondY - 10, 6, GREEN2, 3); seg(ctx, 400, pondY - 10, 380, pondY + 10, 6, GREEN2, 3); }
  const out = k19E(t, 40.6, 0.6); if (out >= 1) return;
  ctx.save(); ctx.globalAlpha *= 1 - out;
  let ax = 230, bx = 770; const a1 = pop(32.56), b1 = pop(32.76);
  if (t > 35.32) { const u = k19E(t, 35.32, 0.4); ax = K.lerp(230, -150, u); bx = K.lerp(770, 1150, u); }
  if (t > 35.72) { const u = k19E(t, 35.72, 0.4, 'out'); ax = K.lerp(-200, 200, u); bx = K.lerp(-60, 440, u); }
  if (t > 36.98) { const u = k19E(t, 36.98, 0.85); ax = K.lerp(200, 520, u); bx = K.lerp(440, 800, u); }
  const tk = (k) => talk(t, k ? [[33.86, 34.3]] : [[33.46, 33.86]], k), big = t > 35.72;
  const hA = big ? [60, -120] : (k19in(t, 33.46, 34.3) ? PERSON_HANDS.pointDown.R : [70, -130]);
  ctx.save(); ctx.translate(ax, 790); ctx.scale(a1, a1); k19fisherman(ctx, 0, 0, 1.3, { talk: tk(0), handR: hA, gaze: [0.6, 0.3] }); ctx.restore();
  ctx.save(); ctx.translate(bx, 800); ctx.scale(b1, b1); k19fisherman(ctx, 0, 0, 1.1, { talk: tk(1), handL: big ? [-60, -120] : [-60, -125], gaze: [-0.6, 0.3], pal: { robe: '#e0b46a', hc: C.red } }); ctx.restore();
  if (!big && a1 > 0.5) { seg(ctx, ax + 78, 636, ax + 150, 600, 5, WOOD, 3); k19net(ctx, [[ax + 130, 590], [ax + 175, 590], [ax + 168, 650], [ax + 137, 650]], { nu: 3, nv: 3, lw: 2.5 }); }
  if (!big && b1 > 0.5) { seg(ctx, bx - 66, 668, bx - 130, 620, 5, WOOD, 3); k19net(ctx, [[bx - 155, 610], [bx - 112, 610], [bx - 118, 666], [bx - 150, 666]], { nu: 3, nv: 3, lw: 2.5 }); }
  if (big) { const L = [ax + 78, 636], R = [bx - 66, 668], dip = t > 36.98 && t < 37.8 ? 150 * k19P(t, 36.98, 0.82) : caught ? 120 : 40; const bul = caught ? [(L[0] + R[0]) / 2, (L[1] + R[1]) / 2 + 60, 0, 70, 40] : null;
    k19net(ctx, [L, R, [R[0] - 10, R[1] + dip], [L[0] + 10, L[1] + dip]], { nu: 6, nv: 4, lw: 3, bulge: bul });
    if (caught) for (let k = 0; k < 6; k++) k19fish(ctx, { x: (L[0] + R[0]) / 2 - 70 + (k % 3) * 60, y: (L[1] + R[1]) / 2 + 70 + Math.floor(k / 3) * 34, s: 0.32, pal: k % 3, dir: k % 2 ? 1 : -1, eyes: 'wide', ph: t * 12 + k, mouth: 'o', noBlink: true }); }
  if (k19in(t, 35.32, 36.6)) { ctx.save(); ctx.globalAlpha *= 1 - k19E(t, 36.3, 0.3); S0.arrow(ctx, [800, 560], [220, 560], k19E(t, 35.32, 0.6, 'out'), { bend: -0.35, width: 26 }); ctx.restore(); }
  ctx.restore();
}
function k19insideDream(ctx, t, o = {}) {   // S7 / S16: here-pond, dotted path, the dream pond, the fisherman crossed out
  const fade = o.fade || 0, brk = o.brk || 0, palmA = 1 - fade;
  k19pondIcon(ctx, 170, 880, 110, 34);
  if (fade < 1) { ctx.save(); ctx.globalAlpha *= 1 - fade; sun(ctx, 860, 520, t); palmTree(ctx, 960, 820, { h: 300, s: 0.6, t }); const brim = 1 + (o.brim || 0) * 0.08 * Math.sin(t * 6); k19pondIcon(ctx, 690, 830, 250 * brim, 80 * brim);
    for (let k = 0; k < 3; k++) if (o.brim) { const L = k19leap((t * 0.9 + k / 3) % 1, 0, 1, [560 + k * 110, 830], [620 + k * 110, 830], 90); k19fish(ctx, { x: L[0], y: L[1], s: 0.3, pal: k, rot: L[2], ph: t * 10, noBlink: true }); star(ctx, L[0] + 30, L[1] - 30, 14, C.white, t * 3 + k); }
    ctx.restore(); }
  if (fade > 0) { ctx.save(); ctx.setLineDash([16, 14]); ctx.lineWidth = 6; ctx.strokeStyle = C.black; ctx.globalAlpha *= Math.min(1, fade * 2) * (o.popOut ? 1 - o.popOut : 1); ctx.beginPath(); ctx.ellipse(690, 830, 250, 80, 0, 0, 7); ctx.stroke(); ctx.restore(); }
  const path = o.path ?? 1; if (path > 0) { const pts = K.arcPts([200, 850], [600, 790], -0.45, 18); const n = Math.floor(pts.length * path);
    for (let k = 0; k < n; k++) { let [px, py] = pts[k]; if (brk && k > 8) { const u = K.clamp(brk * 1.4 - (k - 8) * 0.05); py += 600 * u * u; } shape(ctx, ell(px, py, 9, 9, 10), C.red, { lw: 3, seed: 130 + k }); } }
  if (o.man) { const u = K.clamp(o.man); ctx.save(); ctx.globalAlpha *= Math.min(1, u * 3); k19fisherman(ctx, K.lerp(300, 470, u), 780, 1.2, { handR: [70, -130], gaze: [0.8, 0.2] }); ctx.restore(); }
  if (o.cross) k19cross(ctx, 470, 690, 110, o.cross);
}
function k19insideCrab(ctx, t) {   // S13: what the crab understands
  if (t < 127.86) {
    const fly = t > 124.3 ? k19E(t, 124.3, 1.4) : 0, bx = K.lerp(330, 560, fly), by = K.lerp(720, 640, fly);
    if (t > 124.3) { k19insideDream(ctx, t, { path: k19E(t, 124.3, 0.8), cross: t > 125.76 ? K.clamp((t - 125.76) / 0.3) : 0 }); }
    if (t < 126.38) { const o = k19flyAt(bx, by, 0.75, 1, 0); k19bird(ctx, { x: o[0], y: o[1], s: 0.75, fly: true, flap: Math.sin(t * 10), feet: 0, hold: [{ pal: 0, ph: t * 14 }, { pal: 2, ph: t * 12 }], beak: 0.2, lid: 0.4, brow: -0.6, gaze: [1, 0] }); }
    else for (const [k, x] of [[0, 380], [1, 640]]) k19fish(ctx, { x, y: 720 + 10 * Math.sin(t * 4 + k), s: k ? 1.1 : 0.85, pal: k ? 2 : 0, dir: k ? -1 : 1, mouth: 'smile', fin: 0.5 + 0.5 * Math.sin(t * 10 + k), noBlink: true });
  } else if (t < 128.54) {
    const o = k19flyAt(760, 700, 0.8, -1, 0); k19bird(ctx, { x: o[0] + 60, y: o[1] + 150, s: 0.8, dir: -1, belly: 1, brow: 1, lid: 0.4, sit: 0, neck: 0.6 });
    k19bones(ctx, 300, 720, { kind: 'small', s: 2.4 }); k19bones(ctx, 520, 760, { kind: 'round', s: 2.4 });
  } else { for (let k = 0; k < 8; k++) k19bones(ctx, 230 + (k % 4) * 180, 640 + Math.floor(k / 4) * 170, { kind: K19BONES[k][2], s: 1.8 * K.ease.back(K.clamp((t - 128.54 - k * 0.06) / 0.25)), dir: K19BONES[k][4] }); }
}
function k19insideLedge(ctx, t) { shape(ctx, [[60, 760], [940, 760], [920, 900], [80, 900]], K19ROCK, { lw: 6, seed: 140, dot: K19ROCKD, pitch: 10, rad: 0.3, da: 0.5 }); for (let k = 0; k < 8; k++) k19bones(ctx, 140 + k * 100, 740 + (k % 2) * 10, { kind: K19BONES[k][2], s: 1.1, dir: K19BONES[k][4] }); }

// ---------------------------------------------------------------- per-set drawing
function k19drawCrab(ctx, C, t, b) {
  if (!C || C.alpha === 0) return;
  if (C.neckHang && b) { const N = k19BirdPt(b, 'neck', 0.7); ctx.save(); ctx.translate(N[0], N[1]); ctx.rotate(C.hang || 0); k19crab(ctx, { ...C, x: 0, y: 150 * C.s }); ctx.restore(); return; }
  if (C.dangle && C.hang != null) { ctx.save(); ctx.translate(C.x, C.y - 92); ctx.rotate(C.hang); k19crab(ctx, { ...C, x: 0, y: 92 }); ctx.restore(); return; }
  k19crab(ctx, C);
}
const K19SPL = [[5.15, 600, 642, 0.5], [5.6, 720, 642, 0.8], [8.12, 352, 646, 0.8], [10.1, 352, 646, 0.6], [12.57, 352, 646, 0.4], [20.35, 470, 646, 0.4], [43.55, 420, 642, 1.0], [72.62, 420, 646, 0.5], [73.02, 466, 646, 0.5], [157.0, 372, 642, 0.7], [173.95, 520, 642, 0.6], [174.4, 660, 642, 0.8]];
function k19pondWorld(ctx, t) {
  // sky + sun
  if (k19in(t, 5.78, 10.4)) k19pondSky(ctx, 'dawn'); else if (t >= 168.02) k19pondSky(ctx, 'night', 'dawn', k19E(t, 168.02, 0.8)); else k19pondSky(ctx, 'day');
  if (k19in(t, 6.46, 8.0)) { const u = ((t - 6.46) / 0.77) % 1; sun(ctx, K.lerp(40, 960, u), 470 - 330 * Math.sin(Math.PI * u), t * 3); }
  else if (k19in(t, 5.78, 10.4)) sun(ctx, 820, 330, t);
  else if (t >= 168.02) sun(ctx, 860, kfn(t, [[168.02, 640], [171.6, 470]]), t * 0.4);
  else sun(ctx, 860, 150, t);
  if (t < 168.02 && !k19in(t, 5.78, 10.4)) { cloudFlat(ctx, 150 + ((t * 6) % 1300) - 200, 120, 0.8); cloudFlat(ctx, 700 + ((t * 4) % 1300) - 300, 240, 0.6); }
  ctx.drawImage(k19pondLand(), 0, 0, K19W, K19H);
  if (t >= 168.02) { ctx.save(); ctx.globalAlpha *= 0.45 * (1 - k19E(t, 168.02, 0.8)); ctx.fillStyle = NAVY2; ctx.fillRect(0, 0, K19W, K19H); ctx.restore(); }
  k19waterLive(ctx, t);
  k19weed(ctx, 540, t, 3, 6, 70); k19weed(ctx, 830, t, 5, 8, 110); k19weed(ctx, 950, t, 4, 9, 90);
  const b = k19birdPose(t), C = k19crabPose(t), crabUnder = C.y > 612;
  // under the surface
  if (crabUnder) k19drawCrab(ctx, C, t, b);
  for (let i = 0; i < 12; i++) { const F = k19fishPose(i, t); if (F) k19fish(ctx, F); }
  // bubbles
  k19bubbles(ctx, t, 22.0, 22.75, (te) => { const u = (te - 22.0) / 0.75; return [K.lerp(560, 380, u), k19bedY(K.lerp(560, 380, u)) - 20]; }, { rate: 6, vy: 160, life: 1.6 });
  k19bubbles(ctx, t, 43.55, 44.9, (te) => { const c = k19crabPose(te); return [c.x, c.y - 60]; }, { rate: 8, vy: 140, life: 1.2 });
  k19bubbles(ctx, t, 48.8, 49.9, [760, 860], { rate: 10, vy: 160, life: 1.4, r: 9 });
  k19bubbles(ctx, t, 172.56, 173.3, [500, 700], { rate: 6, vy: 80, life: 0.8 });
  if (k19in(t, 165.9, 168.0)) k19bubbles(ctx, t, 166.0, 166.2, [560, 900], { rate: 5, vy: 70, life: 2.0, r: 6 });
  k19waterTint(ctx, 0.35); k19surface(ctx, t);
  // S3 reflection
  if (k19in(t, 16.3, 22.8)) k19reflect(ctx, t, (c) => k19bird(c, b), 0.22 * k19E(t, 16.3, 0.4));
  // wing shadow and flight shadow
  if (k19in(t, 64.64, 65.95)) { const a = K.clamp(b.spread || 0); halftoneShadow(ctx, 520, 700, 300 * a, 0.45 * a); }
  if (k19in(t, 75.2, 76.6)) { const u = (t - 75.2) / 1.4; halftoneShadow(ctx, K.lerp(380, 1000, u), 648, 60 * (1 - u * 0.6), 0.4); }
  // on the bank
  const carried = C.dangle > 0.5;
  if (!crabUnder && !carried) k19drawCrab(ctx, C, t, b);
  k19bird(ctx, b);
  if (!crabUnder && carried) k19drawCrab(ctx, C, t, b);
  if (crabUnder && C.y < 680) { /* crab straddling the surface: redraw the stalks above water already handled by the tint clip */ }
  // splashes, rings, dust, drops
  for (const [ts, x, y, sz] of K19SPL) k19splash(ctx, x, y, t - ts, sz);
  ripple(ctx, 360, 642, 13.85, t, 0.8); ripple(ctx, 432, 642, 21.55, t, 0.6); ripple(ctx, 455, 642, 19.25, t, 0.4);
  dustBurst(ctx, K19BX, 598, t - 15.75, 6, 8, 16, 40, 0.5, 3); dustBurst(ctx, 220, 598, t - 74.74, 8, 10, 20, 60, 0.6, 5);
  dustBurst(ctx, 175, 592, t - 151.98, 12, 14, 40, 150, 0.8, 7); dustBurst(ctx, 330, 600, t - 152.4, 6, 8, 16, 40, 0.5, 9);
  if (k19in(t, 12.57, 13.85)) { const tip = k19BirdPt(b, 'tip'), u = t < 13.6 ? 0 : (t - 13.6) / 0.25, x0 = t < 13.6 ? tip[0] : K.lerp(tip[0], 360, u), y0 = t < 13.6 ? tip[1] : K.lerp(tip[1], 640, u * u); const pts = []; for (let k = 0; k <= 6; k++) pts.push([x0 + 8 * Math.sin(t * 6 + k), y0 + k * 9]); ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 10; K.poly(ctx, pts, false); ctx.stroke(); ctx.strokeStyle = GREEN2; ctx.lineWidth = 5; K.poly(ctx, pts, false); ctx.stroke(); ctx.restore(); }
  if (k19in(t, 17.45, 18.1)) { const tip = k19BirdPt(b, 'tip'), u = (t - 17.45) / 0.65; ctx.save(); ctx.globalAlpha *= 1 - u; shape(ctx, ell(tip[0] + 20 + 30 * u, tip[1] - 10 - 20 * u, 14 + 12 * u, 10 + 8 * u, 14), C.white, { lw: 3.5, seed: 150 }); ctx.restore(); }
  if (k19in(t, 18.5, 19.25)) { const tip = k19BirdPt(b, 'tip'), u = (t - 18.5) / 0.7; k19bubble(ctx, K.lerp(450, tip[0], u) + 6 * Math.sin(t * 9), K.lerp(690, tip[1] + 6, K.ease.inOut(u)), 12, 1); }
  if (k19in(t, 19.2, 19.4)) { const tip = k19BirdPt(b, 'tip'); star(ctx, tip[0], tip[1], 18 * (1 - (t - 19.2) / 0.2), C.white, 0); }
  if (k19in(t, 20.9, 21.55)) { const e = k19BirdPt(b, 'eye'), tip = k19BirdPt(b, 'tip'), u = K.clamp((t - 20.9) / 0.4), v = K.clamp((t - 21.3) / 0.25); const x = v > 0 ? tip[0] : K.lerp(e[0] + 8, tip[0], u), y = v > 0 ? K.lerp(tip[1] + 8, 640, v * v) : K.lerp(e[1] + 12, tip[1] + 8, u); shape(ctx, [[x, y - 10], [x + 6, y + 1], [x, y + 7], [x - 6, y + 1]], TEAR, { lw: 2.5, seed: 151 }); }
  if (k19in(t, 90.95, 91.6)) { const tip = k19BirdPt(b, 'tip'), u = (t - 90.95) / 0.65; ctx.save(); ctx.globalAlpha *= 1 - u; shape(ctx, ell(tip[0] + 10, tip[1] - 30 - 20 * u, 10 + 8 * u, 8 + 6 * u, 12), C.white, { lw: 3, seed: 152 }); ctx.restore(); }
  // feathers
  k19featherFall(ctx, t, 11.5, 13.2, [150, 470], [250, 597], 1);
  if (t < 77) k19featherFall(ctx, t, 74.8, 76.6, [220, 520], [260, 597], 1);
  if (t >= 168.02) { const st = 0.12 * Math.sin(t * 2.2) * (t < 170 ? 1 : 0.4); k19feather(ctx, 178, 596, 0.08 + st, 1.1); }
  // S17: the dashed outline where he stood
  if (k19in(t, 169.32, 170.5)) { const a = (t < 169.94 ? (Math.floor(t * 12) % 2 ? 0.9 : 0.4) : 1 - k19E(t, 169.94, 0.5)); ctx.save(); ctx.globalAlpha *= a; ctx.setLineDash([12, 10]); ctx.lineWidth = 6; ctx.strokeStyle = C.white; ctx.beginPath(); ctx.ellipse(166, 456, 90, 52, -0.08, 0, 7); ctx.moveTo(278, 362); ctx.arc(248, 362, 30, 0, 7); ctx.moveTo(214, 438); ctx.quadraticCurveTo(222, 392, 240, 386); ctx.moveTo(172, 505); ctx.lineTo(172, 598); ctx.moveTo(190, 505); ctx.lineTo(190, 598); ctx.stroke(); ctx.restore(); }
  // thought clouds and balloons on the pond
  if (k19in(t, 31.64, 43.5)) { const hd = k19BirdPt(b, 'eye'), p = t < 43.2 ? K.clamp((t - 31.64) / 0.7) : 1 - K.clamp((t - 43.2) / 0.25); thoughtCloud(ctx, 640, 215, 420, 300, t, { p, tail: [hd[0] + 20, hd[1] - 30], inside: k19insideNet, scale: 0.4, at: [500, 740] }); }
  if (k19in(t, 46.6, 48.0)) { const p = t < 47.7 ? K.clamp((t - 46.6) / 0.3) : 1 - K.clamp((t - 47.7) / 0.3); thoughtCloud(ctx, 760, 860, 240, 150, t, { p, tail: [C.x + 30, C.y - 130], scale: 0.17, at: [500, 760], inside: (c, tt) => { k19fisherman(c, 280, 820, 1, {}); k19fisherman(c, 720, 820, 1, { pal: { robe: '#e0b46a' } }); k19net(c, [[330, 690], [670, 700], [660, 820], [340, 810]], { nu: 6, nv: 3, lw: 4 }); } }); }
  if (k19in(t, 56.92, 66.6)) { const hd = k19BirdPt(b, 'eye'), p = t < 66.2 ? K.clamp((t - 56.92) / 0.6) : 1 - K.clamp((t - 66.2) / 0.4); thoughtCloud(ctx, 640, 225, 400, 290, t, { p, tail: [hd[0] + 30, hd[1] - 40], scale: 0.4, at: [560, 740], inside: (c, tt) => k19insideDream(c, tt, { path: tt < 58.4 ? 0 : k19E(tt, 58.4, 0.9), brim: tt > 60.44 ? 1 : 0, man: tt > 61.7 ? K.clamp((tt - 61.7) / 1.0) : 0, cross: tt > 63.26 ? K.clamp((tt - 63.26) / 0.3) : 0 }) }); }
  if (k19in(t, 95.58, 97.0)) { const p = t < 96.7 ? K.clamp((t - 95.58) / 0.35) : 1 - K.clamp((t - 96.7) / 0.3); thoughtCloud(ctx, 430, 400, 180, 130, t, { p, tail: [C.x + 20, C.y - 130], scale: 0.17, at: [690, 760], inside: (c, tt) => { k19pondIcon(c, 690, 830, 250, 80); palmTree(c, 940, 820, { h: 300, s: 0.6, t: tt }); } }); }
  if (k19in(t, 160.76, 167.8)) { const p = t < 167.46 ? K.clamp((t - 160.76) / 0.5) : 1 - K.clamp((t - 167.46) / 0.3); thoughtCloud(ctx, 720, 760, 330, 170, t, { p, tail: [C.x + 20, C.y - 120], scale: 0.3, at: [520, 790], inside: (c, tt) => {
    if (tt < 163.4) k19insideLedge(c, tt);
    else if (tt < 164.92) for (const [k, x] of [[0, 330], [1, 680]]) k19fish(c, { x, y: 790 + 10 * Math.sin(tt * 4 + k), s: k ? 1.3 : 1.0, pal: k ? 2 : 0, dir: k ? -1 : 1, mouth: 'smile', fin: 0.5 + 0.5 * Math.sin(tt * 10 + k), noBlink: true });
    else k19insideDream(c, tt, { brk: tt > 164.92 ? k19E(tt, 164.92, 0.9) : 0, fade: tt > 165.9 ? k19E(tt, 165.9, 1.2) : 0, popOut: tt > 167.3 ? 1 : 0 }); } }); }
  // reeds in front
  k19reeds(ctx, 372, 3, t, 3); k19reeds(ctx, 930, 5, t, 5);
}
function k19hillWorld(ctx, t) {
  ctx.save(); ctx.translate(0, -180); sky(ctx, { preset: 'dusk' }); ctx.restore();
  sun(ctx, 160, 560, t * 0.3);
  ctx.drawImage(k19hillLand(), 0, 0, K19W, K19H);
  if (t < 82) k19shimmer(ctx, t, 1);
  if (k19in(t, 77.22, 78.4)) { const u = (t - 77.22) / 1.18; shape(ctx, ell(K.lerp(300, 180, u), K19LEDGE + 4 + Math.pow(u, 2) * 120 - 10 * Math.abs(Math.sin(u * 14)), 9, 8, 10), '#8d9198', { lw: 3, seed: 160 }); }
  const b = k19birdPose(t), C = t > 110.94 ? k19crabPose(t) : null;
  // shadow of the flyer on the rock
  if (b.fly && b.alpha !== 0 && t > 110.94 && t < 151.1) halftoneShadow(ctx, b.x, K19LEDGE + 8, 120 * K.clamp(1 - (K19LEDGE - b.y) / 700), 0.4);
  k19bonesDraw(ctx, t, { rattle: k19in(t, 133.94, 134.9) ? 2.5 : 0, count: t > 117.32 && t < 122.04 ? k19bonesCount(t) : null, countT: K19BCT, ghost: k19in(t, 118.98, 120.1) ? 1 : 0 });
  if (t > 120.16) k19feather(ctx, 476, K19LEDGE - 4, 0.3, 1.1);
  // ledge dust on downbeats
  for (const td of [113.9, 114.45, 115.0, 134.0, 134.3, 134.6]) dustBurst(ctx, 535, K19LEDGE - 2, t - td, 6, 8, 18, 60, 0.6, Math.round(td * 3));
  if (t < 89.25) dustBurst(ctx, 520, K19LEDGE - 2, t - 82.0, 10, 10, 24, 90, 0.6, 4);
  // the pair (with the fight's loop around the body centre)
  ctx.save(); if (b.loop) { const bc = k19W(b)([-10, -144]); ctx.translate(bc[0], bc[1]); ctx.rotate(-b.loop); ctx.translate(-bc[0], -bc[1]); }
  if (b.alpha !== 0) k19bird(ctx, b);
  if (C && !C.neckHang && !C.letGo) k19drawCrab(ctx, C, t, b);
  if (C && C.neckHang) k19drawCrab(ctx, C, t, b);
  ctx.restore();
  if (C && C.letGo) { const N = k19BirdPt(b, 'neck', 0.7), d = t - 151.5; k19crab(ctx, { ...C, x: N[0] + 30 * d, y: N[1] + 150 * C.s + 500 * d * d, rot: 0.3 * d }); }
  // three feathers at the snap, one at the stall
  if (t > 140.56 && t < 146) { const N0 = k19BirdPt(k19birdPose(140.56), 'neck', 0.7); for (let k = 0; k < 3; k++) { const d = t - 140.56; k19feather(ctx, N0[0] + (k - 1) * 70 * d * 2.2, N0[1] - 60 * d + 40 * d * d + k * 10, d * (3 + k), 1.0, K.clamp(1 - (d - 2.5) / 1.5)); } }
  if (t > 150.2 && t < 154) k19featherFall(ctx, t, 150.2, 153.5, [560, 300], [600, K19LEDGE - 4], 1.1);
  // S9: the gulp, S11-13 clouds
  if (k19in(t, 122.04, 129.7)) { const p = t < 129.44 ? K.clamp((t - 122.04) / 0.45) : 1 - K.clamp((t - 129.44) / 0.25); thoughtCloud(ctx, 715, 480, 240, 215, t, { p, tail: [C.x + 40, C.y - 110], scale: 0.24, at: [540, 770], inside: k19insideCrab }); }
  k19boulders(ctx);
}
const K19BCT = [117.32, 117.55, 117.78, 118.1, 118.3, 118.5, 118.7, 118.9];
const k19bonesCount = (t) => K19BCT.filter((x) => t >= x).length;
function k19flightWorld(ctx, t) {
  const T = t - 101.56; k19flightSet(ctx, t, { scroll: T * 260, dusk: k19E(t, 109, 3.8), pond: T < 4 ? 260 - T * 300 : null });
  const b = k19birdPose(t), C = k19crabPose(t);
  k19bird(ctx, b); k19drawCrab(ctx, C, t, b);
  // speed streaks
  ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,0.7)'; ctx.lineWidth = 4; for (let k = 0; k < 6; k++) { const x = 1000 - ((T * 900 + k * 190) % 1200), y = 200 + k * 130; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 90, y); ctx.stroke(); } ctx.restore();
  if (k19in(t, 108.3, 110.5)) { const p = t < 110.22 ? K.clamp((t - 108.3) / 0.35) : 1 - K.clamp((t - 110.22) / 0.25), wob = 6 * Math.sin(t * 7); thoughtCloud(ctx, 700 + wob, 560, 190, 140, t, { p, tail: [C.x + 50, C.y - 120], scale: 0.2, at: [500, 760], inside: (c) => { k19pondIcon(c, 420, 800, 220, 70); c.save(); c.font = K.font(220, BF, 400); c.textAlign = 'center'; c.lineWidth = 16; c.strokeStyle = C.black; c.strokeText('?', 780, 850); c.fillStyle = C.red; c.fillText('?', 780, 850); c.restore(); } }); }
  if (k19in(t, 110.22, 110.94)) { const tip = k19BirdPt(b, 'tip'), u = (t - 110.22) / 0.72; const x = tip[0] - 10 * u, y = tip[1] + 700 * u * u + 20 * u; shape(ctx, [[x, y - 12], [x + 7, y + 1], [x, y + 8], [x - 7, y + 1]], '#cfe4ff', { lw: 2.5, seed: 170 }); }
}

// ---------------------------------------------------------------- camera
const k19c = (x, y, zoom) => ({ x, y, zoom });
const K19CAM = [
  [0, k19c(450, 560, 1.3)], [0.3, k19c(450, 560, 1.3)], [3.4, k19c(500, 615, 1.0)], [5.77, k19c(500, 615, 1.0)],
  [5.78, k19c(400, 560, 1.6)], [14.23, k19c(400, 560, 1.6)],
  [14.24, k19c(330, 520, 1.6)], [17.0, k19c(320, 520, 1.85)], [22.79, k19c(320, 520, 1.85)],
  [22.8, k19c(420, 700, 1.5)], [24.6, k19c(400, 640, 1.5)], [26.0, k19c(400, 620, 1.5)], [27.4, k19c(300, 450, 1.9)], [30.9, k19c(300, 450, 1.9)],
  [32.4, k19c(480, 420, 1.35)], [39.3, k19c(480, 420, 1.35)], [40.2, k19c(440, 440, 1.45)], [43.87, k19c(440, 440, 1.45)],
  [43.88, k19c(600, 845, 1.6)], [45.0, k19c(660, 845, 1.6)], [50.7, k19c(660, 845, 1.6)], [52.1, k19c(400, 620, 1.5)], [55.5, k19c(400, 620, 1.5)],
  [57.0, k19c(440, 480, 1.4)], [64.0, k19c(440, 480, 1.4)], [64.6, k19c(400, 620, 1.5)], [74.3, k19c(400, 620, 1.5)], [75.4, k19c(560, 420, 1.0)], [77.21, k19c(560, 420, 1.0)],
  [77.22, k19c(500, 615, 1.0)], [81.2, k19c(500, 615, 1.0)], [82.2, k19c(520, 640, 1.5)], [86.6, k19c(520, 640, 1.5)], [87.3, k19c(520, 640, 1.15)], [89.24, k19c(520, 640, 1.15)],
  [89.25, k19c(500, 615, 1.0)], [91.2, k19c(500, 615, 1.0)], [91.9, k19c(300, 450, 1.9)], [99.3, k19c(300, 450, 1.9)], [100.2, k19c(320, 400, 1.5)], [101.55, k19c(320, 400, 1.5)],
  [101.56, k19c(480, 600, 1.4)], [105.76, k19c(480, 600, 1.4)], [106.6, k19c(500, 700, 1.15)], [109.28, k19c(500, 700, 1.15)], [109.9, k19c(480, 560, 1.7)], [110.93, k19c(480, 560, 1.7)],
  [110.94, k19c(500, 615, 1.0)], [112.86, k19c(500, 615, 1.0)], [114.8, k19c(520, 520, 1.6)], [115.23, k19c(520, 520, 1.6)],
  [115.24, k19c(535, 540, 3.0)], [116.71, k19c(535, 540, 3.0)], [116.72, k19c(380, 740, 2.0)], [120.1, k19c(680, 740, 2.0)], [120.77, k19c(680, 740, 2.0)],
  [120.78, k19c(535, 550, 2.6)], [122.03, k19c(535, 550, 2.6)],
  [122.04, k19c(600, 560, 2.3)], [129.44, k19c(600, 560, 2.3)], [130.2, k19c(560, 510, 1.9)], [133.93, k19c(560, 510, 1.9)],
  [133.94, k19c(540, 500, 1.6)], [137.76, k19c(540, 500, 1.6)], [139.4, k19c(550, 500, 2.2)], [142.37, k19c(550, 500, 2.2)],
  [142.38, k19c(525, 430, 1.2)], [145.4, k19c(525, 430, 1.2)], [145.92, k19c(560, 460, 2.4)], [148.9, k19c(560, 460, 2.4)], [149.6, k19c(525, 470, 1.4)], [151.1, k19c(525, 470, 1.4)], [151.89, k19c(525, 900, 1.2)],
  [151.9, k19c(500, 615, 1.0)], [153.0, k19c(500, 615, 1.0)], [154.42, k19c(300, 470, 1.8)], [156.9, k19c(300, 470, 1.8)], [158.4, k19c(660, 845, 1.6)], [159.2, k19c(660, 845, 1.6)], [161.8, k19c(640, 880, 1.9)], [168.01, k19c(640, 880, 1.9)],
  [168.02, k19c(300, 480, 1.6)], [170.8, k19c(300, 480, 1.6)], [171.6, k19c(500, 615, 1.0)], [K19DUR, k19c(500, 615, 1.0)],
];
const k19cam = (t) => { const c = K.camAt(K19CAM, t), z = c.zoom; return { x: K.clamp(c.x, 500 / z, K19W - 500 / z), y: K.clamp(c.y, 615 / z, K19H - 615 / z), zoom: z }; };
const k19toP = (cam, x, y) => [500 + (x - cam.x) * cam.zoom, 615 + (y - cam.y) * cam.zoom];

// ---------------------------------------------------------------- lettering, counters, cards (panel space)
function k19word(ctx, text, p, t, t0, t1, size, o = {}) { if (!k19in(t, t0, t1)) return; ctx.save(); ctx.globalAlpha *= 1 - k19E(t, t1 - 0.2, 0.2); sfx(ctx, text, K.clamp(p[0], 170, 830), K.clamp(p[1], 110, 1130), size, K.clamp((t - t0) / 0.25), o); ctx.restore(); }
function k19lbl(ctx, S, text, p, t, t0, t1, o = {}) { if (!k19in(t, t0, t1)) return; ctx.save(); ctx.globalAlpha *= 1 - k19E(t, t1 - 0.25, 0.25); S.label(ctx, text, K.clamp(p[0], 150, 850), K.clamp(p[1], 110, 1150), K.clamp((t - t0) / 0.35), { size: 44, align: 'center', ...o }); ctx.restore(); }
function k19counter(ctx, S, n, label, t, t0, dips, o = {}) {
  let bump = 0; for (const d of dips) bump += 0.18 * k19P(t, d, 0.25) - 0.1 * k19P(t, d - 0.12, 0.12);
  const x = o.x ?? 860, y = o.y ?? 170; ctx.save(); if (o.alpha != null) ctx.globalAlpha *= o.alpha; if (o.grey) ctx.filter = 'grayscale(1)';
  ctx.translate(x, y); ctx.scale(1 + bump, 1 + bump); S.counter(ctx, n, 0, 0, K.clamp((t - t0) / 0.3), { size: o.size || 66 }); S.label(ctx, label, 0, 64, K.clamp((t - t0 - 0.1) / 0.3), { size: 34, align: 'center', fill: C.yellow }); ctx.restore();
}
function k19dayTag(ctx, S, t, t0, a = 1) { const d = K19DAY(t), last = [86.66, 87.4, 88.1, 168.02].filter((x) => t >= x).pop() || t0, flip = Math.abs(Math.cos(Math.PI * K.clamp((t - last) / 0.3) / 2 + (t - last < 0.3 ? Math.PI / 2 : 0)));
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(150, 120); ctx.scale(1, t - last < 0.3 ? Math.max(0.1, Math.abs(Math.cos(Math.PI * (t - last) / 0.3))) : 1); S.label(ctx, 'DAY ' + d, 0, 0, K.clamp((t - t0) / 0.35), { size: 50, align: 'center', fill: C.yellow }); ctx.restore(); }
function k19overlays(ctx, t, cam, S) {
  const P = (x, y) => k19toP(cam, x, y);
  if (t < 3.4) { ctx.save(); ctx.globalAlpha *= 1 - k19E(t, 3.1, 0.3); S.title(ctx, 'THE SEAGULL AND THE CRAB', 600, 210, K.beat(t, 0.2, 0.9, 'lin'), { size: 50, align: 'center' }); ctx.restore(); }
  k19lbl(ctx, S, 'YEARS AGO', [190, 130], t, 5.9, 10.4, { size: 46, fill: C.yellow }); k19lbl(ctx, S, 'NOW', [150, 130], t, 10.45, 12.6, { size: 50, fill: C.white });
  // counters
  if (k19in(t, 4.32, 5.78)) k19counter(ctx, S, 12, 'FISH', t, 4.32, [4.42]);
  if (k19in(t, 70.5, 77.22)) { k19counter(ctx, S, K19FISHN(t), 'FISH', t, 70.5, [72.9]); k19dayTag(ctx, S, t, 70.5); }
  if (k19in(t, 77.22, 89.25)) { k19counter(ctx, S, K19FISHN(t), 'FISH', t, 77.22, [86.66, 87.4, 88.1]); k19dayTag(ctx, S, t, 77.22); }
  if (k19in(t, 89.8, 101.56)) { k19counter(ctx, S, 4, 'FISH', t, 89.8, []); k19dayTag(ctx, S, t, 89.8); }
  if (k19in(t, 117.32, 122.04)) k19counter(ctx, S, k19bonesCount(t), 'BONES', t, 117.32, K19BCT.slice(1).concat([118.9]), { size: 72 });
  if (k19in(t, 159.94, 168.02)) k19counter(ctx, S, 4, 'FISH', t, 159.94, [], { grey: true, size: 52, alpha: 0.85 });
  if (t >= 168.02) { k19counter(ctx, S, 4, 'FISH', t, 168.3, [171.75, 172.6]); k19dayTag(ctx, S, t, 168.3); }
  // lettering
  k19word(ctx, 'EEK!', P(760, 700), t, 49.2, 50.4, 110, { fill: C.yellow, rot: -0.08 });
  k19word(ctx, 'YES! YES!', P(600, 560), t, 68.0, 69.4, 88, { fill: C.yellow, rot: 0.06 });
  if (k19in(t, 78.42, 81.0)) { const q = P(330, 540); S.arrow(ctx, [q[0], q[1] + 30], P(392, 760), k19E(t, 78.42, 0.35, 'out'), { width: 20, bend: -0.15 + 0.05 * Math.sin(t * 9) }); }
  k19lbl(ctx, S, 'NEW POND?', P(330, 520), t, 78.42, 79.42, { size: 50 });
  if (k19in(t, 79.4, 81.0)) { const q = P(330, 520); ctx.save(); ctx.globalAlpha *= 1 - k19E(t, 80.75, 0.25); ctx.translate(K.clamp(q[0], 200, 800), K.clamp(q[1], 120, 1100)); ctx.rotate(-0.08); const k = 1 + 0.6 * (1 - K.clamp((t - 79.4) / 0.12)); ctx.scale(k, k); S.label(ctx, 'NO POND!', 0, 0, 1, { size: 62, align: 'center', fill: C.red, color: C.white }); ctx.restore(); }
  { const b = k19birdPose(84.2), hd = k19BirdPt(b, 'eye'), q = P(hd[0] + 170, hd[1] - 40); k19word(ctx, 'GULP!', q, t, 84.2, 85.1, 84, { fill: C.yellow, rot: 0.1 }); }
  if (k19in(t, 100.58, 101.4)) { const b = k19birdPose(100.8), g = k19grip(b); const q = P(g[0] + 140, g[1] - 60); ctx.save(); ctx.globalAlpha *= 1 - k19E(t, 101.15, 0.25); S.arrow(ctx, q, P(g[0] + 20, g[1] + 10), k19E(t, 100.58, 0.3, 'out'), { width: 18, bend: 0.2 }); ctx.restore(); }
  k19word(ctx, 'BONES!', [300, 560], t, 116.9, 118.2, 104, { fill: C.white, rot: -0.06 });
  if (k19in(t, 131.6, 133.6)) { ctx.save(); ctx.globalAlpha *= 1 - k19E(t, 133.3, 0.3); const c = P(535, 540); S.arrow(ctx, [c[0] - 330, c[1] - 200], [c[0] - 90, c[1] - 30], k19E(t, 131.6, 0.35, 'back'), { width: 24, bend: 0.25, color: C.red }); ctx.restore(); }
  k19word(ctx, 'NEXT!', [K.clamp(k19toP(cam, 535, 540)[0] - 330, 180, 800), K.clamp(k19toP(cam, 535, 540)[1] - 250, 130, 900)], t, 131.65, 133.4, 96, { fill: C.red, rot: -0.1 });
  k19word(ctx, 'SNAP!', [250, 240], t, 140.6, 141.8, 120, { fill: C.yellow, rot: -0.12 });
  k19word(ctx, 'THUD!', [760, 260], t, 152.3, 153.4, 110, { fill: C.yellow, rot: 0.1 });
  // speed lines of the fall
  if (k19in(t, 151.1, 151.98)) { ctx.save(); ctx.strokeStyle = C.white; ctx.lineWidth = 7; ctx.globalAlpha = 0.85; const r = K.rng(7); for (let k = 0; k < 14; k++) { const x = 60 + r() * 880, y = ((r() * 1230 - (t - 151.1) * 2400) % 1230 + 1230) % 1230; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 140); ctx.stroke(); } ctx.restore(); }
  if (t >= 174.6) S.title(ctx, 'THE END', 500, 230, K.beat(t, 174.6, 0.8, 'lin'), { size: 84, align: 'center' });
  // white flashes
  for (const [a, d] of [[79.4, 0.07], [127.86, 0.07], [140.56, 0.07]]) if (k19in(t, a, a + d)) { ctx.save(); ctx.globalAlpha = 0.8; ctx.fillStyle = C.white; ctx.fillRect(0, 0, K19W, K19H); ctx.restore(); }
}

// ---------------------------------------------------------------- panel
const K19SHAKE = (t) => K.spring(t, 140.56, 9, 9, 6) + K.spring(t, 151.98, 8, 9, 6) + K.spring(t, 79.4, 3, 10, 8) + K.spring(t, 82.0, 2, 11, 9);
const SCENE = {
  duration: K19DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196, sh = K19SHAKE(t);
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh * 0.8, py - sh * 0.5); ctx.scale(pw / K19W, ph / K19H);
    const cam = k19cam(t), set = k19set(t);
    ctx.save(); K.camera(ctx, K19W, K19H, cam); if (set === 'pond') k19pondWorld(ctx, t); else if (set === 'hill') k19hillWorld(ctx, t); else k19flightWorld(ctx, t); ctx.restore();
    k19overlays(ctx, t, cam, S);
    if (k19in(t, 88.9, 89.6)) S.transition(ctx, K19W, K19H, (t - 88.9) / 0.7, { caption: 'DAYS LATER...' });
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // quiet effects only in the narration pauses (master 0.6 at render)
    k.play('pop', 5.4, { gain: 0.3 });                 // plop: the leap (5.12-5.78)
    k.play('pop', 13.85, { gain: 0.25 });              // plop: the weed (13.47-14.24)
    k.play('pop', 22.2, { gain: 0.22 });               // the first bubble (21.80-22.80)
    k.play('pop', 26.7, { gain: 0.22 });               // the crab stops (26.46-27.02)
    k.play('whoosh', 43.5, { dur: 0.3, gain: 0.3 });   // the dive (43.14-43.88)
    k.play('whoosh', 77.0, { dur: 0.25, gain: 0.3 });  // gone over the hills (76.86-77.22)
    k.play('whoosh', 89.2, { dur: 0.35, gain: 0.3 });  // the card (88.72-89.80)
    k.play('chime', 97.4, { note: 'E6', gain: 0.25 }); // the glint (96.90-97.94)
    k.play('thud', 127.25, { gain: 0.25 });            // (127.08-127.48)
    k.play('chime', 133.6, { note: 'A5', gain: 0.25 });// resolve (133.26-133.94)
    k.play('pop', 158.0, { gain: 0.22 });              // gather (157.60-158.42)
    k.play('chime', 174.1, { note: 'C6', gain: 0.35 });// the leap at the end
    k.play('thud', 174.8, { gain: 0.35 });             // THE END
  },
};
window.SCENE = SCENE;
