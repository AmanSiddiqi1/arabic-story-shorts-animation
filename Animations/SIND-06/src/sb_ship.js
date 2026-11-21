// ===== SIND-01 vessels (SIND-02: o.stripe = the sail stripe colour option, emerald #1f9a6a for the ship home) and props (shared by the Sinbad episodes): dhow + skiff, plank, chest (band + star seal), campfire + cookPot,
// spyglass, waterskin, foodTray =====
// dhow (series bible): teak hull #a8643a with a turquoise band #2ab0b0 and a cream strake, 520 x 120, mast 440, cream lateen sail with
// two crimson #d0285a stripes, cobalt pennant. Side view, bow toward +x (dir), origin = the waterline at mid hull, deck 80 above it.
const SB_TEAK = '#a8643a', SB_TEAKD = '#7a4426', SB_TURQ = '#2ab0b0', SB_CREAM = '#fbf3df', SB_CRIM = '#d0285a', SB_COBALT = '#2a4ad8';
const SB_DHOW = { deck: -80, rail: -128, mastX: 30, mastTop: -540, bow: 292, stern: -258 };
// gunwale line (rail top) from stern to bow, and the hull outline
const SB_HULL = [[-258, -150], [-236, -132], [-150, -126], [0, -124], [150, -126], [236, -140], [292, -178], [300, -168], [262, -92], [222, -20], [150, 26], [0, 40], [-160, 36], [-232, 6], [-262, -60]];
// sbDhow(ctx, o): o {x, y, s, dir, pitch (rad), sail 0..1 (0 furled on the yard), billow, t, patch, crew(ctx) drawn on deck in local
// units (deck y -80, people's feet there; the bulwark hides their legs), cargo(ctx), far (no detail: a horizon dhow), wake 0..1}
function sbDhow(ctx, o = {}) {
  const s = o.s || 1, dir = o.dir || 1, t = o.t || 0, sail = K.clamp(o.sail ?? 1), bil = o.billow ?? 0.5, tc = SB_T2(t);
  ctx.save(); ctx.translate(o.x || 0, o.y || 0); ctx.rotate((o.pitch || 0) * dir); ctx.scale(dir * s, s);
  const lwk = o.far ? 2.5 : 4;
  // mast, yard, sail (behind the crew)
  const M = SB_DHOW, yardA = [-230, -560], yardB = [250, -150], clew = [-176, -150];
  seg(ctx, M.mastX, M.rail, M.mastX, M.mastTop, o.far ? 10 : 14, '#8a5430', o.far ? 2 : 3.5);
  for (const [ax, ay] of [[M.bow - 6, -170], [M.stern + 10, -150]]) { ctx.save(); ctx.strokeStyle = '#4a2a1a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(M.mastX, M.mastTop + 10); ctx.lineTo(ax, ay); ctx.stroke(); ctx.restore(); }
  if (sail > 0.02) {
    // furl: the foot rises to the yard (rolled), the belly bows out with billow (on twos)
    const f = sail, bw = (34 + 20 * Math.sin(tc * 2.2)) * bil * f, cl = [K.lerp(K.lerp(yardA[0], yardB[0], 0.35), clew[0], f), K.lerp(K.lerp(yardA[1], yardB[1], 0.35), clew[1], f)];
    const leech = K.bezier(yardA, [K.lerp(yardA[0], cl[0], 0.5) - bw * 1.6, K.lerp(yardA[1], cl[1], 0.5)], [K.lerp(yardA[0], cl[0], 0.8) - bw, K.lerp(yardA[1], cl[1], 0.8)], cl, 10);
    const foot = K.bezier(cl, [K.lerp(cl[0], yardB[0], 0.4), K.lerp(cl[1], yardB[1], 0.4) + bw * 0.6], [K.lerp(cl[0], yardB[0], 0.75), K.lerp(cl[1], yardB[1], 0.75) + bw * 0.4], yardB, 10);
    const SP = [...leech, ...foot.slice(1)];
    ctx.save(); K.poly(ctx, SP, true); ctx.fillStyle = SB_CREAM; ctx.fill(); ctx.clip();
    for (const k of [0.32, 0.62]) { ctx.fillStyle = o.stripe || SB_CRIM; ctx.save(); ctx.translate(K.lerp(cl[0], yardA[0], k), K.lerp(cl[1], yardA[1], k)); ctx.rotate(Math.atan2(yardB[1] - cl[1], yardB[0] - cl[0])); ctx.fillRect(-60, -16, 700, 32); ctx.restore(); }
    ctx.fillStyle = 'rgba(160,120,110,0.28)'; ctx.beginPath(); ctx.moveTo(yardA[0], yardA[1]); ctx.lineTo(cl[0] - bw, (cl[1] + yardA[1]) / 2); ctx.lineTo(cl[0], cl[1]); ctx.lineTo(K.lerp(cl[0], yardB[0], 0.3), K.lerp(cl[1], yardB[1], 0.3)); ctx.closePath(); ctx.fill();   // hard shade on the belly
    if (o.patch) { ctx.fillStyle = '#e8d8b0'; ctx.fillRect(-60, -330, 54, 46); ctx.strokeStyle = '#a08050'; ctx.lineWidth = 2; ctx.setLineDash([6, 5]); ctx.strokeRect(-60, -330, 54, 46); ctx.setLineDash([]); }
    if (o.light) o.light(ctx, SP);
    ctx.restore(); ink(ctx, SP, lwk, 3, '#5a3a3a');
  }
  if (sail < 0.98) { ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = '#efe2c2'; ctx.lineWidth = 14 + 10 * (1 - sail); ctx.beginPath(); ctx.moveTo(yardA[0], yardA[1] + 8); ctx.lineTo(yardB[0], yardB[1] + 8); ctx.stroke(); ctx.restore(); }
  seg(ctx, yardA[0], yardA[1], yardB[0], yardB[1], o.far ? 6 : 9, '#7a4a28', o.far ? 1.5 : 2.5);
  // pennant at the masthead (cobalt ribbon)
  if (!o.far) sbRibbon(ctx, M.mastX, M.mastTop + 6, Math.PI + 0.12, 90, 22, t, { col: SB_COBALT, shade: '#1a2a9a', amp: 8, freq: 11 });
  // stern cabin
  celShade(ctx, [[-252, -150], [-252, -232], [-150, -232], [-150, -128]], '#c07a48', SB_TEAKD, { light: [1, -1], off: 10, lw: lwk * 0.8, line: '#3a1e10' });
  if (!o.far) { ctx.fillStyle = '#ffd98a'; ctx.fillRect(-222, -206, 26, 26); ctx.strokeStyle = '#3a1e10'; ctx.lineWidth = 2.5; ctx.strokeRect(-222, -206, 26, 26); seg(ctx, -262, -240, -140, -240, 6, '#e0b070', 1.5); for (let x = -250; x <= -150; x += 25) seg(ctx, x, -240, x, -262, 3, '#8a5430', 1); seg(ctx, -262, -262, -140, -262, 4, '#8a5430', 1); }
  // the deck crew and cargo stand here (behind the bulwark)
  if (o.cargo) o.cargo(ctx); if (o.crew) o.crew(ctx);
  // hull: teak, cream strake at the rail, turquoise band, planks
  celShade(ctx, SB_HULL, SB_TEAK, SB_TEAKD, { light: [-0.3, -1], off: 26, lw: lwk, line: '#3a1e10' });
  ctx.save(); K.poly(ctx, SB_HULL, true); ctx.clip();
  const rail = (x) => (x < -150 ? K.lerp(-150, -126, (x + 258) / 108) : x < 150 ? -126 + 2 * Math.abs(x) / 150 * 0 : K.lerp(-126, -178, (x - 150) / 150));
  ctx.lineCap = 'butt';
  for (const [dy, w, col] of [[6, 10, SB_CREAM], [26, 16, SB_TURQ]]) { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); for (let x = -270; x <= 300; x += 15) { const y = rail(x) + dy; x === -270 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke(); }
  if (!o.far) { ctx.strokeStyle = sbDark(SB_TEAK, 0.25); ctx.lineWidth = 2; for (const dy of [62, 92, 122]) { ctx.beginPath(); for (let x = -270; x <= 300; x += 15) { const y = rail(x) + dy; x === -270 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke(); }
    for (let x = -200; x <= 200; x += 80) { ctx.fillStyle = '#ffd36a'; ctx.beginPath(); ctx.arc(x, -96, 4, 0, 7); ctx.fill(); } }
  ctx.restore(); ink(ctx, SB_HULL, lwk, 5, '#3a1e10');
  if (o.front) o.front(ctx);
  ctx.restore();
  return { deck: M.deck };
}
// world point of a dhow-local point (for balloons, ropes, the gangplank end)
function sbDhowPt(o, lx, ly) { const s = o.s || 1, dir = o.dir || 1, a = (o.pitch || 0) * dir, c = Math.cos(a), n = Math.sin(a), x = lx * dir * s, y = ly * s; return [(o.x || 0) + x * c - y * n, (o.y || 0) + x * n + y * c]; }
// bow wave and wake for a moving hull (u units/s)
function sbWake(ctx, x, y, s, dir, t, k = 1) { if (k <= 0) return; const tc = SB_T3(t); ctx.save(); ctx.globalAlpha = 0.9 * k; ctx.strokeStyle = '#ffffff'; ctx.lineCap = 'round';
  for (let i = 0; i < 5; i++) { const u = ((tc * 0.9 + i / 5) % 1), wx = x - dir * (260 + u * 420) * s, wy = y + 6 + u * 10; ctx.lineWidth = (6 - u * 4) * s; ctx.globalAlpha = 0.9 * k * (1 - u); ctx.beginPath(); ctx.moveTo(wx, wy); ctx.lineTo(wx - dir * 60 * s, wy + 2); ctx.stroke(); }
  ctx.globalAlpha = 0.95 * k; const bx = x + dir * 280 * s; celShade(ctx, [[bx - dir * 30 * s, y + 4], [bx + dir * (6 + 6 * Math.sin(tc * 6)) * s, y - 16 * s], [bx + dir * 36 * s, y + 6]], '#ffffff', '#bfe8f8', { light: [0, -1], off: 4, lw: 2 }); ctx.restore(); }

// skiff: 230 x 52 rowing boat, same teak and turquoise band. origin waterline centre, gunwale -36. o: {x, y, s, dir, pitch, oar (phase,
// radians), row 0..1 (stroke amplitude), crew(ctx) people drawn before the hull (feet at y -14), oarOff (the loose oar gone)}
function sbSkiff(ctx, o = {}) {
  const s = o.s || 1, dir = o.dir || 1, ph = o.oar || 0, rw = o.row ?? 1;
  ctx.save(); ctx.translate(o.x || 0, o.y || 0); ctx.rotate((o.pitch || 0) * dir); ctx.scale(dir * s, s);
  const oar = (side) => { const a = -0.5 + rw * 0.55 * Math.sin(ph + side * 0.3), lift = rw * 10 * Math.cos(ph); const px = 10 * side, py = -38; ctx.save(); ctx.translate(px, py); ctx.rotate(a);
    seg(ctx, 0, 0, -150, 60 - lift, 6, '#c89a5a', 2); celShade(ctx, [[-130, 50 - lift], [-180, 58 - lift], [-182, 76 - lift], [-128, 64 - lift]], '#c89a5a', '#8a6030', { light: [0, -1], off: 4, lw: 2.5 }); ctx.restore(); };
  if (o.oars !== false) oar(-1);
  if (o.crew) o.crew(ctx);
  const H = [[-122, -46], [-100, -36], [0, -34], [100, -36], [124, -50], [128, -42], [100, 0], [40, 14], [-60, 14], [-110, 0], [-126, -40]];
  celShade(ctx, H, SB_TEAK, SB_TEAKD, { light: [-0.3, -1], off: 12, lw: 3.5, line: '#3a1e10' });
  ctx.save(); K.poly(ctx, H, true); ctx.clip(); ctx.fillStyle = SB_CREAM; ctx.fillRect(-140, -40, 280, 6); ctx.fillStyle = SB_TURQ; ctx.fillRect(-140, -30, 280, 10); ctx.restore(); ink(ctx, H, 3.5, 5, '#3a1e10');
  if (o.oars !== false && !o.oarOff) oar(1);
  ctx.restore();
}

// the floating plank: 240 x 34, 12 thick edge, two nail heads, a frayed rope tail (ribbon). origin centre top surface. o {rot, t, wet}
function sbPlank(ctx, x, y, o = {}) {
  const s = o.s || 1; ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  sbRibbon(ctx, -120, 10, Math.PI - 0.3, 70, 9, o.t || 0, { col: '#d8b878', shade: '#9a7840', amp: 8, freq: 7, droop: 10 });
  celShade(ctx, [[-122, -6], [118, -10], [124, 8], [118, 24], [-118, 26], [-126, 10]], '#c8925a', '#8a5a30', { light: [-0.3, -1], off: 10, lw: 3.5, line: '#4a2a14' });
  ctx.strokeStyle = '#9a6a3a'; ctx.lineWidth = 2; for (const dy of [4, 14]) { ctx.beginPath(); ctx.moveTo(-110, dy); ctx.bezierCurveTo(-40, dy - 3, 40, dy + 3, 110, dy - 1); ctx.stroke(); }
  for (const nx of [-90, 84]) { ctx.fillStyle = '#5a5a6a'; ctx.beginPath(); ctx.arc(nx, 2, 4, 0, 7); ctx.fill(); }
  if (o.wet) { ctx.globalAlpha = 0.8; ctx.strokeStyle = '#fff6dc'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-100, -5); ctx.lineTo(100, -9); ctx.stroke(); }
  ctx.restore();
}

// chest: 110 x 80 wooden chest with brass corners (feet at x, y). o {lid 0..1, band (colour), seal 'star' | 'crown', sq, glow 0..1, s, rot}
function sbChest(ctx, x, y, o = {}) {
  const s = o.s || 1, sq = o.sq || 1, lid = K.clamp(o.lid || 0);
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s * (1 + (1 - sq) * 0.6), s * sq);
  if (lid > 0.02) { ctx.save(); ctx.translate(-55, -80); ctx.rotate(-lid * 1.9); celShade(ctx, [[0, 0], [110, 0], [106, -24], [55, -34], [4, -24]], '#a8602e', '#6a3418', { light: [-1, -1], off: 8, lw: 3.5, line: '#3a160c' }); ctx.restore();
    ctx.save(); ctx.fillStyle = '#5a2a1a'; ctx.fillRect(-52, -84, 104, 10); for (const [cx, col] of [[-30, '#d0285a'], [-4, '#2a8ad0'], [22, '#3fae6a']]) { celShade(ctx, K.rectPts(cx - 12, -98, 22, 20), col, sbDark(col, 0.3), { light: [-1, -1], off: 4, lw: 2 }); } ctx.restore(); if (o.glow) sbGlow(ctx, 0, -90, 90, o.glow, '#ffd890'); }
  celShade(ctx, K.rectPts(-55, -80, 110, 80), '#b06a34', '#6e3a1c', { light: [-1, -1], off: 12, lw: 3.5, line: '#3a160c' });
  if (lid <= 0.02) celShade(ctx, [[-58, -80], [-56, -100], [0, -110], [56, -100], [58, -80]], '#a8602e', '#6a3418', { light: [-1, -1], off: 6, lw: 3.5, line: '#3a160c' });
  for (const [cx, cy] of [[-55, -80], [55, -80], [-55, 0], [55, 0]]) shape(ctx, K.rectPts(cx - 8, cy - 8, 16, 16), '#e8b84a', { lw: 2 });
  if (o.band) { ctx.fillStyle = o.band; ctx.fillRect(-8, -80, 16, 80); ctx.fillRect(-55, -48, 110, 14); ctx.strokeStyle = sbDark(o.band, 0.4); ctx.lineWidth = 2; ctx.strokeRect(-8, -80, 16, 80); ctx.strokeRect(-55, -48, 110, 14); }
  if (o.seal) { const P = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 7 : 17; P.push([Math.cos(a) * r, -41 + Math.sin(a) * r]); }
    shape(ctx, ell(0, -41, 22, 22, 20), o.seal === 'crown' ? '#7a4ab8' : SB_ACC, { lw: 2.5 }); celShade(ctx, P, o.seal === 'crown' ? '#ffd36a' : '#ffffff', '#e0d8c8', { light: [-1, -1], off: 2, lw: 2 }); }
  ctx.restore();
}

// campfire: crossed sticks, flame 0..1 (4-drawing cycle on threes), embers, smoke; steam 0..1 when doused; pot on a 3-stick tripod
function sbFire(ctx, x, y, t, o = {}) {
  const tc = SB_T3(t), f = K.clamp(o.fire ?? 1), s = o.s || 1; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (f > 0.02) sbGlow(ctx, 0, -30, 220 * f, 0.6 * f, '#ffb050');
  for (let i = 0; i < 5; i++) { const a = -0.5 + i * 0.25; ctx.save(); ctx.rotate(a); seg(ctx, -40, -6, 40, -6, 9, i % 2 ? '#7a4a2a' : '#5a3420', 2); ctx.restore(); }
  if (f > 0.02) { const fr = Math.floor(tc * 8) % 4, h = 90 * f;
    for (const [dx, hh, w, col] of [[0, 1, 30, '#ff7a1a'], [-12, 0.7, 20, '#ffb02a'], [12, 0.75, 18, '#ffb02a'], [0, 0.5, 14, '#fff0a0']]) { const k = [1, 0.85, 1.08, 0.92][(fr + Math.round(dx)) & 3] * hh, lean = (o.lean || 0) * 40 + [0, 6, -6, 3][fr];
      celShade(ctx, [[dx - w, -6], [dx - w * 0.6, -h * k * 0.5], [dx + lean, -h * k], [dx + w * 0.6, -h * k * 0.45], [dx + w, -6]], col, sbDark(col, 0.2), { light: [-1, -1], off: 4, lw: dx === 0 && hh === 1 ? 2.5 : 0, line: '#a8300a' }); }
    for (let i = 0; i < 4; i++) { const u = ((tc * 0.8 + i / 4) % 1); ctx.globalAlpha = 1 - u; ctx.fillStyle = '#ffd36a'; ctx.fillRect(-20 + i * 12 + Math.sin(u * 8 + i) * 10, -40 - u * 110 * f, 4, 4); } ctx.globalAlpha = 1;
    if (o.smoke !== false) for (let i = 0; i < 4; i++) { const u = ((t * 0.35 + i / 4) % 1); ctx.save(); ctx.globalAlpha = 0.45 * (1 - u) * f; sbBlob(ctx, Math.sin(u * 5 + i) * 26 + u * 40, -110 - u * 260, 18 + u * 30, 14 + u * 24, '#e8e0f0', '#b8a8d0', { lw: 0, off: 5 }); ctx.restore(); } }
  if (o.steam > 0) for (let i = 0; i < 6; i++) { const u = ((t * 0.7 + i / 6) % 1); ctx.save(); ctx.globalAlpha = 0.8 * (1 - u) * o.steam; sbBlob(ctx, Math.sin(u * 4 + i * 2) * 30 * (0.5 + u), -30 - u * 300 * o.steam, 22 + u * 50, 18 + u * 40, '#ffffff', '#d8e0f0', { lw: 2, off: 6, line: '#8a9ac0' }); ctx.restore(); }
  ctx.restore();
}
// cookPot on a tripod (feet around x, ground y): o {stir (angle), swing (rad), off (pot gone), lidRattle, t}
function sbCookPot(ctx, x, y, o = {}) {
  ctx.save(); ctx.translate(x, y);
  for (const lx of [-56, 4, 56]) seg(ctx, lx, 0, 0, -150, 6, '#8a5a32', 1.5);
  if (!o.off) { ctx.save(); ctx.translate(0, -146); ctx.rotate(o.swing || 0); seg(ctx, 0, 0, 0, 40, 2, '#4a4a5a', 0.5);
    celShade(ctx, [[-42, 44], [42, 44], [46, 70], [32, 100], [-32, 100], [-46, 70]], '#5a5a72', '#363648', { light: [-1, -1], off: 10, hi: '#8a8aa8', lw: 3, line: '#1a1a2a' });
    const lr = o.lidRattle ? Math.sin((o.t || 0) * 60) * 3 : 0; shape(ctx, ell(0, 44 + lr, 44, 9, 18), '#6a6a84', { lw: 2.5 }); shape(ctx, ell(0, 36 + lr, 8, 6, 12), '#4a4a5a', { lw: 2 });
    if (o.stir != null) seg(ctx, 10 + Math.cos(o.stir) * 14, 44, 30 + Math.cos(o.stir) * 20, -10 + Math.sin(o.stir) * 6, 4, '#c89a5a', 1);
    ctx.restore(); }
  ctx.restore();
}
// brass spyglass along angle a (rad) from the hand (x, y), ext 0..1 (telescoped out), s scale; glint p
function sbSpyglass(ctx, x, y, a, s = 1, ext = 1, glint = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.scale(s, s);
  const L = [34, 28 * ext, 24 * ext]; let px = -20;
  for (let i = 0; i < 3; i++) { const r = 11 - i * 2.5; celShade(ctx, K.rectPts(px, -r, L[i] + 4, r * 2), '#e0b040', '#a87818', { light: [0, -1], off: 4, hi: '#fff0a0', lw: 2.5, line: '#5a3a08' }); px += L[i]; }
  shape(ctx, ell(px + 4, 0, 4, 7, 10), '#bfe8ff', { lw: 2 }); if (glint > 0) sbGlint(ctx, px + 4, -2, 26, glint);
  ctx.restore();
}
// waterskin (goatskin bag 90 x 50), tilt rad, squeeze 0..1
function sbWaterskin(ctx, x, y, tilt = 0, sq = 0, s = 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(tilt); ctx.scale(s, s * (1 - sq * 0.25));
  celShade(ctx, [[-45, 0], [-40, -22], [-10, -30], [30, -24], [46, -8], [56, -14], [62, -4], [44, 8], [10, 22], [-30, 20]], '#a8743e', '#6e4420', { light: [-1, -1], off: 8, lw: 3, line: '#3a200c' });
  seg(ctx, 52, -10, 60, -8, 4, '#e8d2a0', 1); ctx.restore(); }
// brass tray 120 wide with bread and dates (n dates left)
function sbFoodTray(ctx, x, y, n = 5, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, ell(0, 0, 62, 14, 24), '#e8b84a', { lw: 3 }); shape(ctx, ell(0, -2, 52, 10, 24), '#f6d27a', { lw: 0 });
  sbBlob(ctx, -22, -10, 26, 12, '#e8b878', '#b07a40', { lw: 2.5, off: 5 }); for (let i = 0; i < n; i++) sbBlob(ctx, 14 + (i % 3) * 13, -8 - Math.floor(i / 3) * 8, 7, 5, '#7a2a1a', '#4a1408', { lw: 1.5, off: 2, hi: '#b8604a' });
  ctx.restore(); }
// a gold-edged gift chest with a crown seal (the king's)
function sbGiftChest(ctx, x, y, s = 0.55, o = {}) { sbChest(ctx, x, y, { s, band: '#ffd36a', seal: 'crown', ...o }); }
