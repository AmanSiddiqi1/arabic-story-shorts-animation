// ===== shared helpers: brush ink, dot fills, shapes, lettering, balloons, comic figure (person), eyes =====
// Source: scene_a.js (identical in all five finished stories) + eye2/bake/EYE added for the library.
// ===== scene helpers: brush ink, dot patterns, comic figures, props =====
// The style's palette (C, NAVY...), lettering font BF, dot texture dotPat and outline brush ink come from the story's
// style theme (Library/styles/<style>/theme.js), loaded before this file.
const AF = window.ARABIC_FONT || 'Cairo', AW = window.ARABIC_WEIGHT || 800;
const kfn = (t, keys, ease = 'inOut') => {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) if (t <= keys[i][0]) { const [t0, v0] = keys[i - 1], [t1, v1] = keys[i]; return K.lerp(v0, v1, K.ease[ease](K.clamp((t - t0) / (t1 - t0)))); }
  return keys[keys.length - 1][1];
};
const inI = (t, list) => list.some(([a, b]) => t >= a && t < b);
const talk = (t, list, ph = 0) => inI(t, list) ? 0.45 + 0.55 * Math.abs(Math.sin(t * 11 + ph)) : 0;

const NZ = new Map();
const nz = (seed) => { if (!NZ.has(seed)) NZ.set(seed, K.noise(seed)); return NZ.get(seed); };
const densify = (pts, step) => { const out = []; for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i], n = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / step)); for (let k = 0; k < n; k++) out.push([K.lerp(a[0], b[0], k / n), K.lerp(a[1], b[1], k / n)]); } out.push(pts[pts.length - 1]); return out; };
const bbox = (pts) => { let a = 1e9, b = 1e9, c = -1e9, d = -1e9; for (const [x, y] of pts) { a = Math.min(a, x); b = Math.min(b, y); c = Math.max(c, x); d = Math.max(d, y); } return [a, b, c - a, d - b]; };
// fill + optional Ben-Day dots + brush outline
function shape(ctx, pts, fill, o = {}) {
  ctx.save(); K.poly(ctx, pts, true); ctx.fillStyle = fill; ctx.fill();
  if (o.dot) { ctx.save(); K.poly(ctx, pts, true); ctx.clip(); ctx.fillStyle = dotPat(ctx, o.dot, o.pitch || 8, o.rad || 0.3); if (o.da != null) ctx.globalAlpha = o.da; const [x, y, w, h] = bbox(pts); ctx.fillRect(x - 2, y - 2, w + 4, h + 4); ctx.restore(); }
  if (o.lw !== 0) ink(ctx, pts, o.lw || 5, o.seed || 1);
  ctx.restore();
}
const ell = (cx, cy, rx, ry, n = 28) => K.circlePts(cx, cy, rx, ry, n);
function seg(ctx, x0, y0, x1, y1, w, fill, ol = 5) {
  ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = w + ol * 2; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
  ctx.strokeStyle = fill; ctx.lineWidth = w; ctx.stroke(); ctx.restore();
}
function star(ctx, x, y, r, fill = C.yellow, rot = 0) {
  const pts = []; for (let i = 0; i < 10; i++) { const a = rot - Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; pts.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr]); } pts.push(pts[0]);
  shape(ctx, pts, fill, { lw: 3.5, seed: 8 });
}
// comic lettering: Bangers, black outline, popped in with a back-ease
function sfx(ctx, text, x, y, size, p, o = {}) {
  const k = K.ease.back(K.clamp(p)); if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(k * (o.sx || 1), k); ctx.font = K.font(size, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.lineJoin = 'round'; ctx.lineWidth = size * 0.2; ctx.strokeStyle = o.stroke || C.black; ctx.strokeText(text, 0, 0);
  ctx.fillStyle = o.fill || C.yellow; ctx.fillText(text, 0, 0); ctx.restore();
}
// speech balloon: rounded oval, tail to (tx, ty), word inside
function bubble(ctx, cx, cy, w, h, tx, ty, p, text, o = {}) {
  const k = K.ease.back(K.clamp(p * 1.5)); if (k <= 0) return;
  ctx.save(); ctx.translate(cx, cy); ctx.scale(k, k);
  const pts = ell(0, 0, w / 2, h / 2, 48), a = Math.atan2(ty - cy, tx - cx), bw = 0.28;
  const tail = [[Math.cos(a - bw) * w * 0.4, Math.sin(a - bw) * h * 0.4], [tx - cx, ty - cy], [Math.cos(a + bw) * w * 0.4, Math.sin(a + bw) * h * 0.4]];
  ctx.fillStyle = o.fill || C.white; K.poly(ctx, pts, true); ctx.fill(); K.poly(ctx, tail, true); ctx.fill();
  ink(ctx, pts, 6, 4); ctx.save(); ctx.lineWidth = 6; ctx.strokeStyle = C.black; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(...tail[0]); ctx.lineTo(...tail[1]); ctx.lineTo(...tail[2]); ctx.stroke(); ctx.restore();
  ctx.fillStyle = o.fill || C.white; ctx.beginPath(); ctx.moveTo(tail[0][0] * 0.86, tail[0][1] * 0.86); ctx.lineTo(tail[1][0] * 0.9, tail[1][1] * 0.9); ctx.lineTo(tail[2][0] * 0.86, tail[2][1] * 0.86); ctx.fill();
  if (text) { ctx.font = K.font(o.size || 44, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = o.color || C.black; ctx.fillText(text, 0, 3); }
  ctx.restore();
}
// simple bumpy thought cloud: union drawn as many circles around the ellipse
function cloud(ctx, cx, cy, rx, ry, fill, p, o = {}) {
  const k = K.ease.back(K.clamp(p)); if (k <= 0) return false;
  ctx.save(); ctx.translate(cx, cy); ctx.scale(k, k);
  const n = 10, bumps = []; for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; bumps.push([Math.cos(a) * rx * 0.72, Math.sin(a) * ry * 0.72, Math.min(rx, ry) * 0.36]); }
  const path = () => { ctx.beginPath(); ctx.ellipse(0, 0, rx * 0.78, ry * 0.78, 0, 0, Math.PI * 2); for (const [x, y, r] of bumps) { ctx.moveTo(x + r, y); ctx.arc(x, y, r, 0, Math.PI * 2); } };
  ctx.lineWidth = 12; ctx.strokeStyle = C.black; ctx.lineJoin = 'round'; path(); ctx.stroke(); ctx.fillStyle = fill; path(); ctx.fill();
  ctx.save(); path(); ctx.clip(); o.inside && o.inside(ctx); ctx.restore();
  // trail of small thought circles toward the thinker
  if (o.tail) for (let i = 0; i < 3; i++) { const q = o.tail, x = K.lerp(0, q[0], 0.55 + i * 0.2), y = K.lerp(ry * 0.7, q[1], 0.45 + i * 0.22), r = 22 - i * 6; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.lineWidth = 7; ctx.strokeStyle = C.black; ctx.stroke(); ctx.fillStyle = C.white; ctx.fill(); }
  ctx.restore(); return true;
}
function bulb(ctx, x, y, p) {
  const k = K.ease.back(K.clamp(p)); if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  for (let i = 0; i < 9; i++) { const a = -Math.PI * 0.95 + i * Math.PI * 0.9 / 8; seg(ctx, Math.cos(a) * 54, Math.sin(a) * 54, Math.cos(a) * 82, Math.sin(a) * 82, 7, C.yellow, 3); }
  shape(ctx, ell(0, 0, 34, 38), C.yellow, { lw: 6, seed: 3, dot: C.red, pitch: 6, rad: 0.25, da: 0.5 });
  shape(ctx, [[-14, 34], [14, 34], [14, 58], [-14, 58]], '#b9b9b9', { lw: 5, seed: 4 });
  ctx.restore();
}
function zzz(ctx, x, y, t, a0 = 0) {
  for (let i = 0; i < 3; i++) { const u = ((t * 0.55 + i / 3 + a0) % 1), sz = 34 + u * 38; ctx.save(); ctx.globalAlpha = Math.min(1, u * 5) * (1 - Math.pow(u, 3)); sfx(ctx, 'Z', x + u * 90 + Math.sin(u * 6 + i) * 10, y - u * 150, sz, 1, { rot: -0.2 + u * 0.4, fill: C.white }); ctx.restore(); }
}
function clockFace(ctx, x, y, r, t, p) {
  const k = K.ease.back(K.clamp(p)); if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  shape(ctx, ell(0, 0, r, r, 40), C.white, { lw: 9, seed: 6 });
  for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; seg(ctx, Math.cos(a) * r * 0.78, Math.sin(a) * r * 0.78, Math.cos(a) * r * 0.9, Math.sin(a) * r * 0.9, 3, C.black, 0); }
  const a = t * 7; seg(ctx, 0, 0, Math.sin(a) * r * 0.72, -Math.cos(a) * r * 0.72, 5, C.red, 2.5); seg(ctx, 0, 0, Math.sin(a / 12) * r * 0.45, -Math.cos(a / 12) * r * 0.45, 7, C.black, 1); ctx.restore();
}
function dizzy(ctx, x, y, t, r = 70) { for (let i = 0; i < 4; i++) { const a = t * 5 + i * Math.PI / 2; star(ctx, x + Math.cos(a) * r, y + Math.sin(a) * r * 0.35, 20, C.yellow, a); } }

// ===== comic figures (front view, local +x = facing side). kind: thief | owner | wife =====
const FIG = {
  thief: [{ a: '#ffffff', b: C.black, hat: C.black, band: C.red }, { a: C.yellow, b: C.black, hat: C.black, band: C.yellow }, { a: C.white, b: C.blue, hat: C.blue, band: C.white }],
};
function eyeAt(ctx, x, y, mode, look, ink2 = true) {
  if (EYE.on && mode !== 'shut' && mode !== 'squint') return eye2(ctx, x, y, EYE.lid >= 0.95 ? 'shut' : mode, EYE.gaze ? EYE.gaze[0] : (look || 0) / 1.25, EYE.gaze ? EYE.gaze[1] : 0, EYE.lid, EYE.lidColor || C.white, EYE.wet);
  if (mode === 'shut') { ctx.save(); ctx.lineWidth = 5; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(x, y - 3, 9, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke(); ctx.restore(); return; }
  const big = mode === 'wide', rx = big ? 12.5 : 9, ry = big ? 16 : 11.5 * (mode === 'squint' ? 0.45 : 1);
  shape(ctx, ell(x, y, rx, ry, 20), C.white, { lw: 3.5, seed: 2 });
  ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(x + look * 3.5, y + 1 + (big ? 0 : 0), big ? 3.8 : 4.6, 0, Math.PI * 2); ctx.fill();
}
// P: {x,y,s,dir,kind,v(variant),ph,amp,lean,legs,aL:[u,f],aR:[u,f],eyes,mouth,talk,look,drop,rot,hold,hat,gown}
function person(ctx, P) {
  const s = P.s || 1, dir = P.dir || 1, kind = P.kind || 'thief', V = FIG.thief[P.v || 0], lg = P.legs ?? 1;
  const hipY = -75 * lg, shY = hipY - 75, hdY = shY - 45 + (P.drop || 0);
  ctx.save(); ctx.translate(P.x, P.y); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s);
  const pants = kind === 'thief' ? C.black : kind === 'owner' ? C.skin : C.skin;
  const sw = (P.amp || 0) * Math.sin(P.ph || 0) * 0.6;
  // legs
  if (kind === 'thief' || P.legs != null || P.showLegs) for (const sd of [-1, 1]) {
    const a = sw * sd, L = 76 * lg, hx = sd * 14, fx = hx + Math.sin(a) * L, fy = hipY + Math.cos(a) * L * (lg < 0.6 ? 0.6 : 1);
    if (lg < 0.6) { seg(ctx, hx, hipY, hx + 40, hipY + 18, 22, pants); seg(ctx, hx + 40, hipY + 18, hx + 84, hipY + 18, 20, pants); shape(ctx, ell(hx + 92, hipY + 18, 14, 10, 12), C.black, { lw: 3 }); }
    else { seg(ctx, hx, hipY, fx, fy, 22, pants); shape(ctx, ell(fx + 6, fy + 3, 17, 10, 12), C.black, { lw: 3, seed: 3 }); }
  }
  ctx.save(); ctx.translate(0, hipY); ctx.rotate((P.lean || 0)); ctx.translate(0, -hipY);
  // torso
  if (kind === 'thief') {
    const tp = [[-31, shY + 8], [31, shY + 8], [27, hipY + 10], [-27, hipY + 10], [-31, shY + 8]];
    ctx.save(); K.poly(ctx, tp, true); ctx.fillStyle = V.a; ctx.fill(); ctx.clip(); ctx.fillStyle = V.b; for (let y = shY; y < hipY + 12; y += 20) ctx.fillRect(-40, y + 2, 80, 9); ctx.restore(); ink(ctx, tp, 5, 11);
    shape(ctx, [[-31, shY + 8], [31, shY + 8], [31, shY + 22], [-31, shY + 22]], P.v === 1 ? C.red : C.yellow, { lw: 0 });
  } else {
    const bot = hipY + (lg < 0.6 ? 20 : 66), tp = [[-30, shY + 8], [30, shY + 8], [P.gown ? 42 : 36, bot], [P.gown ? -42 : -36, bot], [-30, shY + 8]];
    shape(ctx, tp, kind === 'owner' ? C.white : C.yellow, { dot: kind === 'owner' ? C.blue : C.red, pitch: 9, rad: 0.3, lw: 5, seed: 12 });
  }
  const sleeve = kind === 'thief' ? V.a : kind === 'owner' ? C.white : C.yellow;
  // arms
  const arm = (sd, ang) => {
    if (!ang) ang = [0.12, 0.05]; const sx = sd * 31, sy = shY + 18, e1 = [sx + Math.sin(ang[0]) * 38 * (sd < 0 ? 1 : 1), sy + Math.cos(ang[0]) * 38], e2 = [e1[0] + Math.sin(ang[1]) * 36, e1[1] + Math.cos(ang[1]) * 36];
    seg(ctx, sx, sy, e1[0], e1[1], 20, sleeve, 4.5); seg(ctx, e1[0], e1[1], e2[0], e2[1], 18, sleeve, 4.5); shape(ctx, ell(e2[0], e2[1], 12, 12, 12), C.white, { lw: 3.5, seed: 5, dot: C.skin, pitch: 5, rad: 0.3 }); return e2;
  };
  // library: P.handL / P.handR = [x, y] hand targets (figure-local, feet at 0,0, +x = facing side) solved by armTo(); aL/aR win if given
  const sy0 = shY + 18, hL = arm(-1, P.aL || (P.handL && armTo(-1, sy0, P.handL))), hR = arm(1, P.aR || (P.handR && armTo(1, sy0, P.handR)));
  P.hands = [hL, hR];
  if (P.hold === 'stick') { seg(ctx, hR[0] - 4, hR[1] + 24, hR[0] + 26, hR[1] - 112, 13, '#c58a18', 4.5); shape(ctx, ell(hR[0] + 28, hR[1] - 116, 14, 14, 10), '#c58a18', { lw: 4 }); shape(ctx, ell(hR[0], hR[1], 12, 12, 12), C.white, { lw: 3.5, seed: 5, dot: C.skin, pitch: 5, rad: 0.3 }); }
  // head
  const hx0 = (P.look || 0) * 4;
  ctx.save(); ctx.translate(hx0, hdY); ctx.rotate(P.tilt || 0); ctx.translate(-hx0, -hdY);
  const hp = ell(hx0, hdY, 36, 37, 36); shape(ctx, hp, C.white, { dot: C.skin, pitch: 6, rad: 0.3, lw: 6, seed: 21 });
  const ey = hdY - 4, ex = 13, lk = P.look || 0;
  if (kind === 'thief') {
    ctx.save(); K.poly(ctx, hp, true); ctx.clip(); ctx.fillStyle = C.black; ctx.fillRect(hx0 - 40, ey - 15, 80, 30); ctx.fillStyle = V.hat; ctx.fillRect(hx0 - 40, hdY - 50, 80, 30);
    ctx.fillStyle = V.band; ctx.fillRect(hx0 - 40, hdY - 22, 80, 7); ctx.restore(); ink(ctx, hp, 6, 21);
    shape(ctx, ell(hx0, hdY - 40, 9, 9, 12), V.band, { lw: 4 });
  } else {
    if (kind === 'owner') {
      const cap = [[hx0 - 37, hdY - 12], [hx0 - 28, hdY - 36], [hx0 - 6, hdY - 52], [hx0 + 26, hdY - 40], [hx0 + 58, hdY - 4 - (P.capDroop ?? 0)], [hx0 + 62, hdY + 18], [hx0 + 40, hdY - 10], [hx0 + 26, hdY - 22], [hx0 - 2, hdY - 24], [hx0 - 37, hdY - 12]];
      shape(ctx, cap, C.yellow, { dot: C.red, pitch: 8, rad: 0.3, lw: 5, seed: 31 }); shape(ctx, ell(hx0 + 63, hdY + 22, 11, 11, 12), C.white, { lw: 4 });
      for (const sd of [-1, 1]) { const bx = hx0 + sd * ex + lk * 3, br = P.brow || 0; ctx.save(); ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(bx - sd * 10, ey - 21 + br * 9); ctx.lineTo(bx + sd * 10, ey - 21 - br * 5); ctx.stroke(); ctx.restore(); }
    } else {
      const hair = [[hx0 - 38, hdY + 6], [hx0 - 36, hdY - 22], [hx0 - 16, hdY - 40], [hx0 + 16, hdY - 40], [hx0 + 36, hdY - 22], [hx0 + 38, hdY + 6], [hx0 + 28, hdY - 14], [hx0 + 10, hdY - 24], [hx0 - 12, hdY - 24], [hx0 - 28, hdY - 14], [hx0 - 38, hdY + 6]];
      shape(ctx, hair, C.black, { lw: 4, seed: 33 }); shape(ctx, ell(hx0, hdY - 48, 17, 15, 16), C.black, { lw: 4, seed: 34 }); shape(ctx, [[hx0 - 10, hdY - 38], [hx0 + 10, hdY - 38], [hx0 + 6, hdY - 30], [hx0 - 6, hdY - 30]], C.yellow, { lw: 3, seed: 35 });
    }
  }
  eyeAt(ctx, hx0 - ex + lk * 3, ey, P.wink === 'L' ? 'shut' : P.eyes || 'open', lk); eyeAt(ctx, hx0 + ex + lk * 3, ey, P.wink === 'R' ? 'shut' : P.eyes || 'open', lk);
  if (kind === 'owner') { // mustache + nose
    shape(ctx, [[hx0 - 24, hdY + 10], [hx0 - 10, hdY + 6], [hx0, hdY + 11], [hx0 + 10, hdY + 6], [hx0 + 24, hdY + 10], [hx0 + 17, hdY + 20], [hx0 + 4, hdY + 15], [hx0 - 4, hdY + 15], [hx0 - 17, hdY + 20]], C.black, { lw: 3, seed: 14 });
  }
  const my = hdY + (kind === 'owner' ? 26 : 20), tk = P.talk || 0, m = P.mouth || 'closed';
  ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 5;
  if (tk > 0 || m === 'open') { const o = Math.max(tk, m === 'open' ? 1 : 0); shape(ctx, ell(hx0, my + 3, 11, 4 + 9 * o, 14), C.black, { lw: 3, seed: 3 }); ctx.fillStyle = C.red; ctx.beginPath(); ctx.ellipse(hx0, my + 3 + 4 * o, 7, 3 + 3 * o, 0, 0, Math.PI * 2); ctx.fill(); }
  else if (m === 'o') shape(ctx, ell(hx0, my + 4, 8, 10, 12), C.black, { lw: 3, seed: 3 });
  else if (m === 'frown') { ctx.beginPath(); ctx.arc(hx0, my + 12, 12, 1.15 * Math.PI, 1.85 * Math.PI); ctx.stroke(); }
  else if (m === 'smile') { ctx.beginPath(); ctx.arc(hx0, my - 4, 13, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke(); }
  else { ctx.beginPath(); ctx.moveTo(hx0 - 9, my + 3); ctx.lineTo(hx0 + 9, my + 3); ctx.stroke(); }
  ctx.restore();
  if (kind === 'wife') { ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; for (const sd of [-1, 1]) { const bx = hx0 + sd * ex + lk * 3; ctx.beginPath(); ctx.moveTo(bx + sd * 8, ey - 6); ctx.lineTo(bx + sd * 15, ey - 11); ctx.moveTo(bx + sd * 9, ey - 1); ctx.lineTo(bx + sd * 16, ey - 3); ctx.stroke(); } ctx.restore(); }
  ctx.restore(); ctx.restore(); ctx.restore();
}

// ===== library additions =====
// acting state read by eyeAt; set per character by the acting wrapper in registry.js
const EYE = { on: false, gaze: null, lid: 0, lidColor: null, wet: false };
// eye with a gaze direction (lx, ly in -1..1), an upper lid (0 open .. 1 shut) and an optional wet highlight
function eye2(ctx, x, y, mode, lx = 0.8, ly = 0, lid = 0, skin = C.white, wet = false) {
  if (mode === 'shut' || lid >= 0.95) { ctx.save(); ctx.lineWidth = 5; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(x, y - 3, 9, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke(); ctx.restore(); return; }
  const big = mode === 'wide', rx = big ? 12.5 : 9, ry = big ? 16 : 11.5, pts = ell(x, y, rx, ry, 20);
  shape(ctx, pts, C.white, { lw: 3.5, seed: 2 });
  const pr = big ? 3.8 : 4.6, px = x + lx * (rx - pr - 1.5), py = y + 1 + ly * (ry - pr - 2);
  ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(px, py, pr, 0, Math.PI * 2); ctx.fill();
  if (wet) { ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(px + 1.5, py - 1.6, 1.6, 0, 7); ctx.fill(); ctx.beginPath(); ctx.arc(x - rx * 0.35, y + ry * 0.55, 2.2, 0, 7); ctx.fillStyle = '#9cc4ff'; ctx.fill(); }
  if (lid > 0.02) { const ly0 = y - ry + 2 * ry * lid; ctx.save(); K.poly(ctx, pts, true); ctx.clip(); ctx.fillStyle = skin; ctx.fillRect(x - rx - 2, y - ry - 3, 2 * rx + 4, ly0 - (y - ry - 3)); ctx.restore();
    ctx.save(); ctx.lineWidth = 4.5; ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.beginPath(); const hw = rx * Math.sqrt(Math.max(0, 1 - Math.pow((ly0 - y) / ry, 2))); ctx.moveTo(x - hw - 1, ly0); ctx.lineTo(x + hw + 1, ly0); ctx.stroke(); ctx.restore(); }
}
// draw static artwork once at 2x into a cached layer: bake('trees', 1000, 910, (x) => { ... })
function bake(key, w, h, draw) { return K.cached('lib:' + key, () => { const c = K.layer(w * 2, h * 2), x = c.getContext('2d'); x.scale(2, 2); draw(x); return c; }); }

// two-bone arm IK for person(): shoulder at (sd * 31, sy), upper arm 38, forearm 36. Returns [a0, a1] in person's arm-angle convention
// (0 = straight down, +/-PI/2 = horizontal, PI = straight up; the direction vector is (sin a, cos a)). The elbow bends outward.
function armTo(sd, sy, target, shoulderX = 31) {
  const sx = sd * shoulderX, L1 = 38, L2 = 36, dx = target[0] - sx, dy = target[1] - sy, d = K.clamp(Math.hypot(dx, dy), Math.abs(L1 - L2) + 1, L1 + L2 - 0.5), phi = Math.atan2(dx, dy), al = Math.acos(K.clamp((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1));
  const sol = [phi + al, phi - al].map((a0) => { const ex = sx + Math.sin(a0) * L1, ey = sy + Math.cos(a0) * L1; return [a0, Math.atan2(target[0] - ex, target[1] - ey), ex * sd]; });
  const best = sol[0][2] >= sol[1][2] ? sol[0] : sol[1]; return [best[0], best[1]];
}
// hand targets for common gestures of person() (figure-local, legs at full length; add P.drop to y for a lowered head):
//   PERSON_HANDS.hush.R  -> finger to lips;  use P.handR = PERSON_HANDS.hush.R
const PERSON_HANDS = {
  hush: { R: [8, -170] }, cupMouth: { R: [34, -178] }, cupEar: { R: [42, -200] }, chin: { R: [16, -160] }, moustache: { R: [20, -172] },
  pointUp: { R: [44, -205] }, pointFwd: { R: [100, -150] }, pointDown: { R: [80, -70] }, wave: { R: [64, -196] },
  headHold: { L: [-44, -210], R: [44, -210] }, mouthCover: { L: [-6, -168], R: [10, -172] }, cheeks: { L: [-34, -180], R: [34, -180] },
  armsOut: { L: [-95, -150], R: [95, -150] }, shield: { L: [10, -210], R: [40, -190] }, chest: { R: [4, -120] }, folded: { L: [22, -105], R: [-18, -112] },
  palmsUp: { L: [-60, -100], R: [60, -100] }, grip: { L: [40, -168], R: [42, -204] }, reach: { R: [105, -175] }, reachBoth: { L: [92, -165], R: [104, -190] },
  clasp: { L: [24, -140], R: [30, -134] }, hipsHands: { L: [-40, -82], R: [40, -82] },
};
