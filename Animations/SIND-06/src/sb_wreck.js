// ===== SIND-06 new effects: currentStreaks, the rock coast and its teeth, the dhow wreck states, debris, and the eyelid point of view =====

// ---------- currentStreaks: long pale ribbons running through the near sea toward screen right (the ship is carried) ----------
// across [x0, x1] x [y0, y1] (world), k = strength 0..1 (alpha and speed), v units/s. Ribbons taper (10 -> 4) and wave a little.
function sbCurrentStreaks(ctx, t, x0, x1, y0, y1, k, o = {}) {
  if (k <= 0) return; const R = K.rng(o.seed || 141), n = o.n || 6, v = (o.v || 520) * (0.4 + 0.6 * k), span = x1 - x0 + 1000;
  ctx.save(); ctx.lineCap = 'round';
  for (let i = 0; i < n; i++) { const len = 500 + R() * 400, yy = y0 + (y1 - y0) * (i + 0.5 + (R() - 0.5) * 0.5) / n, x = x0 - 500 + ((((t * v * (0.8 + R() * 0.4) + R() * span) % span) + span) % span);
    for (let j = 0; j < 8; j++) { const u0 = j / 8, u1 = (j + 1) / 8, w = K.lerp(10, 4, u0) * (0.6 + 0.4 * (yy - y0) / (y1 - y0 + 1));
      ctx.globalAlpha = (o.a ?? 0.75) * k * (j === 0 ? 0.5 : j === 7 ? 0.4 : 1); ctx.strokeStyle = i % 2 ? (o.col || '#bff6f0') : (o.col2 || '#e8fffb'); ctx.lineWidth = w;
      ctx.beginPath(); ctx.moveTo(x + len * u0, yy + 6 * Math.sin(u0 * 7 + t * 2 + i)); ctx.lineTo(x + len * u1, yy + 6 * Math.sin(u1 * 7 + t * 2 + i)); ctx.stroke(); }
    // foam dashes racing ahead of the ribbon (on threes)
    const tc = SB_T3(t); ctx.globalAlpha = 0.8 * k; ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 3; for (let q = 0; q < 3; q++) { const fx = x + len + 30 + q * 46 + ((tc * 90) % 46); ctx.beginPath(); ctx.moveTo(fx, yy - 3); ctx.lineTo(fx + 20, yy - 4); ctx.stroke(); } }
  ctx.restore();
}

// ---------- rockCoast: bare crags in rose, ochre and slate violet with a surf line (the SIND-02 skyFlight crag layer recoloured) ----------
// baked 1600 x 760 (base at y 700 of the plate); drawn with its base at (x, by), scale s (1 = 620 high crags), rise 0..1 lifts it
// out of the haze (alpha + scale from 0.3)
function sbRockCoastPlate() {
  return sbBakeAt('rockCoast', 1600, 760, (c) => { const R = K.rng(606), cols = ['#d88a7a', '#e0b060', '#7a7fa8'], pk = [];
    for (let k = 0; k <= 14; k++) pk.push([k * 1600 / 14 + (R() - 0.5) * 40, 700 - (k % 14 === 0 ? 160 : 260 + R() * 360)]);
    // three strata bands clipped to the crag outline
    c.beginPath(); c.moveTo(0, 760); for (const [x, y] of pk) c.lineTo(x, y); c.lineTo(1600, 760); c.closePath(); c.save(); c.clip();
    for (let k = 0; k < 18; k++) { c.fillStyle = cols[k % 3]; const y0 = 60 + k * 40; c.beginPath(); c.moveTo(0, y0); for (let x = 0; x <= 1600; x += 80) c.lineTo(x, y0 + 14 * Math.sin(x * 0.006 + k)); c.lineTo(1600, 760); c.lineTo(0, 760); c.closePath(); c.fill(); }
    // hard cel shade on the right faces
    c.fillStyle = 'rgba(60,40,90,0.28)'; for (let k = 0; k < pk.length - 1; k++) { const [x, y] = pk[k], [x2, y2] = pk[k + 1]; if (y < y2) { c.beginPath(); c.moveTo(x, y); c.lineTo(x + 50, 760); c.lineTo(x2 + 220, 760); c.lineTo(x2, y2); c.closePath(); c.fill(); } }
    // ledges and cracks
    c.strokeStyle = 'rgba(70,40,80,0.45)'; c.lineWidth = 3; for (let k = 0; k < 26; k++) { const x = R() * 1600, y = 300 + R() * 380; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 20 + R() * 50, y + 30 + R() * 40); c.stroke(); }
    c.fillStyle = 'rgba(255,240,220,0.5)'; for (let k = 0; k < 20; k++) { const x = R() * 1600, y = 260 + R() * 400; c.fillRect(x, y, 40 + R() * 60, 5); }
    for (let k = 0; k < 12; k++) { const x = R() * 1600, y = 400 + R() * 260; celShade(c, [[x - 14, y + 30], [x, y], [x + 14, y + 30]], '#4fae7a', '#2f7a54', { light: [-1, -1], off: 4, lw: 1.5 }); }
    c.restore(); c.strokeStyle = '#5a3a6a'; c.lineWidth = 3; c.beginPath(); pk.forEach(([x, y], k) => (k ? c.lineTo(x, y) : c.moveTo(x, y))); c.stroke();
    sbGrad(c, 0, 600, 1600, 160, [[0, 'rgba(255,255,255,0)'], [1, 'rgba(255,255,255,0.85)']]);   // surf haze at the foot
  });
}
function sbRockCoast(ctx, x, by, s = 1, rise = 1, t = 0) { if (rise <= 0) return; const k = 0.3 + 0.7 * K.ease.out(K.clamp(rise)), w = 1600 * s * k, h = 760 * s * k;
  ctx.save(); ctx.globalAlpha *= K.clamp(rise * 1.6); ctx.drawImage(sbRockCoastPlate(), x - w / 2, by - h * (700 / 760), w, h); ctx.restore();
  // surf at the foot (on threes)
  const tc = SB_T3(t); ctx.save(); ctx.globalAlpha *= 0.9 * rise; ctx.fillStyle = '#ffffff'; for (let i = 0; i < 16; i++) { const px = x - w / 2 + (i + 0.5) * w / 16, r = (8 + 6 * Math.abs(Math.sin(tc * 3 + i))) * s * 1.6; ctx.beginPath(); ctx.ellipse(px, by - 2, r * 2.2, r * 0.7, 0, 0, 7); ctx.fill(); } ctx.restore();
}
// sea birds wheeling off the ledges (small gulls on circles)
function sbLedgeBirds(ctx, t, cx, cy, n = 4, r = 120, s = 0.22) { for (let i = 0; i < n; i++) { const a = t * (0.6 + i * 0.1) + i * 1.7; sbGull(ctx, cx + Math.cos(a) * r * (1 + i * 0.2), cy + Math.sin(a) * r * 0.35, t, { s, dir: Math.sin(a) > 0 ? -1 : 1, seed: i + 30 }); } }
// rock teeth: 9 dark violet rocks (40..110 high) standing in the surf from x0 to x1 at the water line y; foam rings on threes
function sbRockTeeth(ctx, x0, x1, y, t, o = {}) { const R = K.rng(o.seed || 77), tc = SB_T3(t);
  for (let i = 0; i < (o.n || 9); i++) { const x = x0 + (x1 - x0) * (i + 0.5) / (o.n || 9) + (R() - 0.5) * 20, h = (40 + R() * 70) * (o.s || 1), w = (22 + R() * 20) * (o.s || 1);
    celShade(ctx, [[x - w, y + 6], [x - w * 0.6, y - h * 0.6], [x - w * 0.1, y - h], [x + w * 0.5, y - h * 0.7], [x + w, y + 6]], '#4a3a6a', '#2e2448', { light: [-1, -1], off: w * 0.4, hi: '#7a6a9a', lw: 2.5, line: '#1e1430' });
    ctx.save(); ctx.fillStyle = '#ffffff'; ctx.globalAlpha = 0.9; for (let k = -1; k <= 1; k++) { const r = 6 + 4 * Math.abs(Math.sin(tc * 4 + i + k)); ctx.beginPath(); ctx.ellipse(x + k * w * 0.8, y + 2, r * 1.8, r * 0.7, 0, 0, 7); ctx.fill(); } ctx.restore(); }
}

// ---------- the dhow wreck ----------
// sbDhowWreck(ctx, o): the SIND-01 dhow (o: all sbDhow fields) with wreck 0..1. wreck >= 0.5: the mast breaks at one third (mastFall
// 0..1 the top falls over to +x local with the sail draped), drawn by clipping the dhow below the break and drawing the broken top.
// wreck = 1: the hull as two halves split by a jagged line at x 0.45 of the length (local x ~ -20); each half o.halves[i] = {dx, dy, rot}.
const SB_SPLIT = [[-20, -260], [6, -190], [-34, -120], [10, -60], [-24, 0], [8, 60]];
function sbDhowWreck(ctx, o = {}) {
  const s = o.s || 1, dir = o.dir || 1, w = o.wreck || 0, mf = K.clamp(o.mastFall ?? (w >= 0.5 ? 1 : 0));
  const body = (half) => { ctx.save(); ctx.translate(o.x, o.y); ctx.rotate((o.pitch || 0) * dir); ctx.scale(dir * s, s);
    if (half != null) { const H = (o.halves || [])[half] || { dx: 0, dy: 0, rot: 0 }; ctx.translate(H.dx / s, H.dy / s); ctx.translate(half ? 60 : -100, 0); ctx.rotate(H.rot * dir); ctx.translate(half ? -60 : 100, 0);
      ctx.beginPath(); if (half === 0) { ctx.moveTo(-400, -700); for (const p of SB_SPLIT) ctx.lineTo(...p); ctx.lineTo(-400, 100); } else { ctx.moveTo(400, -700); for (const p of SB_SPLIT) ctx.lineTo(...p); ctx.lineTo(400, 100); } ctx.closePath(); ctx.clip(); }
    if (w >= 0.5) { ctx.beginPath(); ctx.rect(-400, -330, 800, 500); ctx.clip(); }
    sbDhow(ctx, { ...o, x: 0, y: 0, s: 1, dir: 1, pitch: 0, sail: w >= 0.5 ? 0.02 : o.sail });
    if (half != null) { ctx.strokeStyle = '#3a1e10'; ctx.lineWidth = 5; ctx.beginPath(); SB_SPLIT.forEach((p, i) => (i ? ctx.lineTo(...p) : ctx.moveTo(...p))); ctx.stroke(); for (let i = 0; i < 5; i++) seg(ctx, SB_SPLIT[i][0], SB_SPLIT[i][1] + 40, SB_SPLIT[i][0] + (half ? 16 : -16), SB_SPLIT[i][1] + 50, 5, '#c8925a', 1.5); }
    ctx.restore(); };
  if (w < 1) body(null); else { body(0); body(1); }
  if (w >= 0.5) { // the broken top: mast from the break with the yard and the draped striped sail, falling over the bow side
    const bx = SB_DHOW.mastX, by = -330, a = mf * 1.25 + (o.mastSettle || 0), H = w >= 1 ? ((o.halves || [])[1] || { dx: 0, dy: 0 }) : { dx: 0, dy: 0 };
    ctx.save(); ctx.translate(o.x + H.dx, o.y + H.dy); ctx.rotate((o.pitch || 0) * dir); ctx.scale(dir * s, s); ctx.translate(bx, by); ctx.rotate(a);
    const L = 210; seg(ctx, 0, 0, 0, -L, 13, '#8a5430', 3); seg(ctx, -140, -L + 10, 120, -L + 60, 8, '#7a4a28', 2.5);
    const sw = Math.sin(SB_T2(o.t || 0) * 2.3) * 6 * (1 - mf * 0.5), SP = [[-140, -L + 10], [120, -L + 60], [100 + sw, -L + 200 + 40 * mf], [-20 + sw, -L + 230 + 50 * mf], [-130, -L + 170 + 30 * mf]];
    ctx.save(); K.poly(ctx, SP, true); ctx.fillStyle = SB_CREAM; ctx.fill(); ctx.clip(); ctx.fillStyle = o.stripe || SB_CRIM; ctx.fillRect(-200, -L + 70, 400, 26); ctx.fillRect(-200, -L + 140, 400, 26); ctx.fillStyle = 'rgba(150,110,120,0.3)'; ctx.fillRect(-40, -L, 200, 300); ctx.restore(); ink(ctx, SP, 4, 3, '#5a3a3a');
    ctx.strokeStyle = '#efe2c2'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(0, 0); for (let i = 0; i < 4; i++) ctx.lineTo((i % 2 ? 8 : -8), 10 + i * 6); ctx.stroke();
    ctx.restore(); }
}
// debris floating out of the wreck: kind 'plank' | 'barrel' | 'bale' | 'crate' at (x, y on the water), rot
function sbDebris(ctx, kind, x, y, rot = 0, s = 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  if (kind === 'plank') { celShade(ctx, [[-60, -6], [58, -8], [62, 4], [-58, 6]], '#c8925a', '#8a5a30', { light: [0, -1], off: 4, lw: 2.5, line: '#4a2a14' }); }
  else if (kind === 'barrel') { celShade(ctx, [[-22, -30], [22, -30], [27, -10], [22, 10], [-22, 10], [-27, -10]], '#a86a3a', '#6a3a1e', { light: [-1, -1], off: 7, lw: 2.5, line: '#3a1e10' }); for (const yy of [-22, 2]) seg(ctx, -25, yy, 25, yy, 4, '#7a7a8a', 1); }
  else if (kind === 'bale') { celShade(ctx, [[-30, -26], [30, -28], [32, 8], [-30, 10]], '#e8d0a0', '#b89a68', { light: [-1, -1], off: 7, lw: 2.5, line: '#6a5030' }); seg(ctx, 0, -28, 0, 9, 4, '#a86a3a', 0); }
  else { celShade(ctx, [[-30, -40], [30, -40], [30, 8], [-30, 8]], '#b07a48', '#7a4a26', { light: [-1, -1], off: 7, lw: 2.5, line: '#3a1e10' }); ctx.fillStyle = SB_ACC; ctx.fillRect(-30, -24, 60, 12); ctx.fillStyle = '#ffffff'; ctx.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 3.5 : 8; ctx.lineTo(Math.cos(a) * r, -18 + Math.sin(a) * r); } ctx.closePath(); ctx.fill(); }
  ctx.restore(); }

// ---------- the eyelid point of view (the only first-person shot of the series) ----------
// in panel units (1000 x 1230): draw(c) paints what he sees; blur (px) softens it (focus arriving); open 0..1 parts two lids (upper and
// lower, skin shade with a lash line). o: {skin, lash}
function sbLidPOV(ctx, open, blur, draw, o = {}) {
  const L = K.cached('sb:povLayer', () => K.layer(1000, 1230)), c = L.getContext('2d');
  c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, 1000, 1230); draw(c);
  ctx.save(); if (blur > 0.3) ctx.filter = `blur(${blur.toFixed(1)}px)`; ctx.drawImage(L, 0, 0, 1000, 1230); ctx.restore();
  const op = K.clamp(open), gap = 640 * op, cy = 600, skin = o.skin || '#e8a888', lash = o.lash || '#3a1a2a';
  ctx.save(); ctx.fillStyle = skin;
  // upper lid: a filled arc whose lower edge rises with the opening
  ctx.beginPath(); ctx.moveTo(-50, -50); ctx.lineTo(1050, -50); ctx.lineTo(1050, cy - gap * 0.55 + 140 * (1 - op)); ctx.quadraticCurveTo(500, cy - gap * 1.05 - 40 * op, -50, cy - gap * 0.55 + 140 * (1 - op)); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-50, 1290); ctx.lineTo(1050, 1290); ctx.lineTo(1050, cy + gap * 0.5 + 60 * (1 - op)); ctx.quadraticCurveTo(500, cy + gap * 0.95, -50, cy + gap * 0.5 + 60 * (1 - op)); ctx.closePath(); ctx.fill();
  // the soft inner shadow of the lids and the lash lines
  ctx.strokeStyle = sbDark(skin, 0.35); ctx.lineWidth = 26; ctx.globalAlpha = 0.5; ctx.beginPath(); ctx.moveTo(-50, cy - gap * 0.55 + 140 * (1 - op) + 10); ctx.quadraticCurveTo(500, cy - gap * 1.05 - 40 * op + 10, 1050, cy - gap * 0.55 + 140 * (1 - op) + 10); ctx.stroke();
  ctx.globalAlpha = 1; ctx.strokeStyle = lash; ctx.lineWidth = 10 * (0.4 + 0.6 * op); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-50, cy - gap * 0.55 + 140 * (1 - op)); ctx.quadraticCurveTo(500, cy - gap * 1.05 - 40 * op, 1050, cy - gap * 0.55 + 140 * (1 - op)); ctx.stroke();
  for (let i = 0; i < 14; i++) { const u = (i + 0.5) / 14, x = -50 + 1100 * u, y = (1 - u) * (1 - u) * (cy - gap * 0.55 + 140 * (1 - op)) + 2 * u * (1 - u) * (cy - gap * 1.05 - 40 * op) + u * u * (cy - gap * 0.55 + 140 * (1 - op)); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + (u - 0.5) * 30, y + 26 * op); ctx.stroke(); }
  ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-50, cy + gap * 0.5 + 60 * (1 - op)); ctx.quadraticCurveTo(500, cy + gap * 0.95, 1050, cy + gap * 0.5 + 60 * (1 - op)); ctx.stroke();
  ctx.restore();
}
