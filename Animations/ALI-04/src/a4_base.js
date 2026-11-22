// ===== ALI-04 "The Merchant of Oil": story machinery (prefixed a4 / A4_). The jar row as data over the whole film, the yard world,
// the folded thieves, the cat, glyph tags. Shots are pushed by a4_s1..a4_s6.js (AB_SHOTS, a3_base.js dispatch).
const A4_NSH = '#4a3a7a', A4_ESH = '#7a4a5a';           // ground shadows: night (blue-violet), evening (plum); never near-black
const A4_PR = [0, 1, 2, 3, 4].map((i) => ['thumb', 'yawn', 'fan', 'sleep', 'bite'][i]);   // the five cramped poses
const a4Wob = (t, t0, amp, f = 3, d = 5) => (t < t0 ? 0 : amp * Math.exp(-(t - t0) * d) * Math.sin(2 * Math.PI * f * (t - t0)));
const a4Win = (t, a, b, fa = 0.2, fb = 0.2) => K.clamp((t - a) / fa) * (1 - K.clamp((t - b) / fb));   // 0..1..0 over [a, b]
const a4Step = (t, a, d, n = 2) => Math.floor(K.clamp((t - a) / d) * n + 1e-6) / n;                 // held drawings (n steps)

// ---------- the jar row over the film (continuity cannot slip): lid, peek, cutaway, ghost, wobble ----------
const A4_PEEKS = [   // [jar, up, down, lift, gazePlan, close]
  [0, 41.26, 47.52, 0.75, [[41.26, [1, 0]], [43.74, [0.2, 0.2]], [44.1, [-1, 0.2]], [44.6, [-0.2, 0]]]],
  [0, 54.62, 56.6, 0.75, [[54.62, [0, 0.3]]]],
  [2, 61.56, 63.2, 0.75, [[61.56, [-0.3, 0.3]]], true], [3, 62.81, 63.35, 0.7, [[62.81, [-0.5, 0.2]]]], [4, 63.06, 63.5, 0.7, [[63.06, [-0.6, 0.2]]]],
  [1, 80.72, 81.15, 0.4, [[80.72, [0.4, 0.2]]]],
];
const A4_HEADS_T = 122.96;   // the five heads rise (S16)
function a4JarSt(i, t) {
  const tc = AB_T2(t), t3 = AB_T3(t), st = { t, wob: 0, sq: 1 };
  if (t < 24.84) return st;
  st.wob = a4Wob(tc, 25.04 + 0.26 * i + 0.16, 0.035) + a4Wob(tc, 25.17 + 0.26 * i + 0.16, 0.02);
  if (i < 5) { const o = a4Step(t, 26.42 + 0.2 * i, 0.2, 3) * (1 - a4Step(t, 28.32 + 0.08 * i, 0.25, 3)); if (o > 0) st.cut = { open: o, draw: (c) => jarMan(c, t, i, { pose: A4_PR[i], nod: pulse(tc, 28.4 + [0, 0.15, 0.3, 0.45, 0.85][i], 0.35) }) };
    const g = 94.82 + 0.08 * i, o2 = a4Step(t, g, 0.12, 2) * (1 - a4Step(t, 95.36, 0.12, 2)); if (o2 > 0) st.cut = { open: o2 * 0.9, draw: (c) => jarMan(c, t, i, { pose: i === 1 ? 'scratch' : A4_PR[i] }) };
    const gh = 48.8 + 0.3 * i; if (tc >= gh && tc < gh + 0.17) st.ghost = 1; }
  if (i === 5) st.oil = a4Step(t, 29.98, 0.2, 3) * (1 - a4Step(t, 30.8, 0.2, 2));
  if (i === 2 && tc > 28.4 && tc < 28.95) st.wob += 0.02;   // the crooked lid he presses flat
  for (const [j, up, down, lift, gp, close] of A4_PEEKS) if (j === i && tc >= up && tc < down + 0.3) {
    const l = lift * a4Step(tc, up, 0.25, 3) * (1 - a4Step(tc, down, 0.2, 2)); st.peek = { lift: l, eyes: 1, gaze: gazePlan(t3, gp, 0.15), close, blink: j === 0 && up < 50 ? abBlinkAt(t3, 44.9) : abBlinkAt(t3, up + 0.6) }; }
  if (t >= 108.42 && t < A4_HEADS_T && i < 5) { const b = i === 1 ? Math.max(pulse(tc, 109.16, 0.18), pulse(tc, 109.42, 0.18)) : 0; st.lid = Math.max(0.25 * a4Step(tc, 108.42 + 0.07 * i, 0.2, 2), 0.5 * b); }
  return st;
}
// the head-and-shoulders of thief i up through his jar mouth wearing the lid as a hat (rise 0..1); P extra pose fields
function a4JarHead(ctx, t, i, rise, P = {}) { const J = CY_JARS[i], s = 0.9, rim = CY.rimY, Q = { x: J.x, y: rim + (240 - 92 * rise) * s, s, dir: i % 2 ? -1 : 1, lid: abLid(t, 790 + i), mouth: 'closed', handL: [-14, -110], handR: [14, -112], ...P };
  ctx.save(); ctx.beginPath(); ctx.rect(J.x - 140, 0, 280, rim + 3); ctx.clip(); abMan(ctx, i, Q, 'night'); ctx.restore();
  ctx.save(); ctx.strokeStyle = '#4a2010'; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(J.x, rim + 2, 24, 7, 0, 0.15, Math.PI - 0.15); ctx.stroke(); ctx.restore();
  const [hx, hy] = a2HeadPt(Q, 0, -42, { s, age: 0.3 }); if (P.lidHat !== false) celShade(ctx, ell(hx, hy - 4, 32, 10, 16), '#a8643a', '#6a3a1e', { light: [-1, -1], off: 4, lw: 2.5, line: '#3a1a0c' });
  return Q; }
// all six jars (skips jars outside the camera); o.only, o.hide (indices), o.st(i) extra state, o.heads (rise per jar)
function a4Jars(ctx, t, cam, o = {}) { const half = 520 / cam.zoom + 90;
  for (let i = 0; i < 6; i++) { if (o.hide && o.hide.includes(i)) continue; const J = CY_JARS[i]; if (Math.abs(J.x - cam.x) > half) continue;
    const st = { ...a4JarSt(i, t), ...(o.st ? o.st(i) : {}), shc: o.shc };
    const hd = o.heads ? o.heads(i) : null; if (hd) { st.noLid = true; st.peek = null; st.lid = 0; }
    cyJar(ctx, t, i, st); if (hd) a4JarHead(ctx, t, i, hd.rise, hd.P || {}); } }

// ---------- the yard world for a scene (plates + live parts); returns nothing. o as courtyard() ----------
const A4_MOON = { early: [1500, 250], late: [1000, 170], watch: [1350, 230] };
function a4Yard(ctx, t, cam, o = {}) { courtyard(ctx, t, cam, { m: 'night', moon: A4_MOON.late, bwin: 0, ...o }); }

// ---------- the cat (Library cat pal 2, s 0.55, ALI-03 a3Cat) ----------
function a4Cat(ctx, t, P, shc = A4_NSH) { const tc = AB_T2(t); a3Shadow(ctx, P.x, (P.gy ?? P.y) + 2, 60, P.lift || 0, shc);
  cat(ctx, { s: 0.55, pal: 2, sit: 1, tailCurl: 0.6 + 0.3 * osc(tc, 2.3), ears: 0.4 + idleSway(tc, 91, 0.25, 1.7), lid: abLid(t, 93), tip: idleSway(tc, 92, 0.02, 3), ...P }); }

// ---------- glyph shapes (drawn, not lettering): question -> exclamation, a drop, a lock, a tick (panel or world units) ----------
function a4Glyph(ctx, kind, x, y, s = 1, p = 1) { if (p <= 0) return; const k = K.ease.back(K.clamp(p)); ctx.save(); ctx.translate(x, y); ctx.scale(s * k, s * k); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const out = (f) => { ctx.strokeStyle = '#2b1a3a'; ctx.lineWidth = 14; f(); ctx.stroke(); ctx.strokeStyle = kind === 'drop' ? '#ffd36a' : '#7fe3ff'; ctx.lineWidth = 8; f(); ctx.stroke(); };
  if (kind === 'q') { out(() => { ctx.beginPath(); ctx.arc(0, -22, 14, Math.PI * 1.1, Math.PI * 0.4); ctx.lineTo(0, 4); }); ctx.fillStyle = '#7fe3ff'; ctx.beginPath(); ctx.arc(0, 22, 6, 0, 7); ctx.fill(); }
  else if (kind === 'x') { out(() => { ctx.beginPath(); ctx.moveTo(0, -38); ctx.lineTo(0, 6); }); ctx.fillStyle = '#ffd36a'; ctx.beginPath(); ctx.arc(0, 22, 7, 0, 7); ctx.fill(); }
  else if (kind === 'drop') { celShade(ctx, [[0, -34], [14, -6], [12, 10], [0, 18], [-12, 10], [-14, -6]], '#ffd36a', '#d89a1a', { off: 4, lw: 3, line: '#6a4410' }); }
  else if (kind === 'lock') { celShade(ctx, K.rectPts(-20, -6, 40, 32), '#ffd36a', '#c08a1a', { off: 5, lw: 3, line: '#5a3a10' }); ctx.strokeStyle = '#ffd36a'; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(0, -8, 13, Math.PI, 0); ctx.stroke(); }
  ctx.restore(); }
// a light streak to a point (the style's arrow), panel units
function a4Streak(ctx, S, from, to, t, a, b) { if (t < a || t > b + 0.3) return; ctx.save(); ctx.globalAlpha *= 1 - K.clamp((t - b) / 0.3); S.arrow(ctx, from, to, K.clamp((t - a) / 0.35), { color: '#7fe3ff', bend: -0.2 }); ctx.restore(); }
// whisper lines leaking from a lid gap (world): three small wavy strokes drifting up
function a4Whisper(ctx, x, y, t, a, b) { if (t < a || t > b) return; const u = (t - a) / (b - a); ctx.save(); ctx.strokeStyle = '#e8f4ff'; ctx.lineWidth = 3; ctx.lineCap = 'round';
  for (let k = 0; k < 3; k++) { const ph = (u * 2 + k / 3) % 1; ctx.globalAlpha = 0.55 * Math.sin(Math.PI * ph); ctx.beginPath(); for (let j = 0; j <= 6; j++) ctx.lineTo(x - 30 + k * 30 + 6 * Math.sin(j * 1.4 + t * 9), y - ph * 70 - j * 5); ctx.stroke(); } ctx.restore(); }
// a speech balloon kept fully inside the panel (width estimated from the text): abSay with x clamped by half the balloon width
function a4Say(ctx, S, steps, t, x, y, to, o = {}) { const size = o.size || 50, len = Math.max(...steps.map((s) => s[1].length)), hw = (size * 0.5 * len + size * 0.9) / 2 + 24;
  abSay(ctx, S, steps, t, K.clamp(x, hw + 30, 970 - hw), K.clamp(y, 120, 1100), to, { thin: true, ...o }); }   // v2: thin tail (ALI-03 abSay)
