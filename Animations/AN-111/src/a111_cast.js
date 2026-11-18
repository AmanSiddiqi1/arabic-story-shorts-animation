// ===== AN-111 cast: base looks (Library person presets + palettes) and shared acting pieces =====
const A111_PATCH = '#c9a46a';
const A111_HERO = { costume: 'villager', age: 0.4, s: 0.9, seed: 3, brow: -0.2, pal: { patches: A111_PATCH, sash: '#7a4212' } };
const A111_HERO_RICH = { ...A111_HERO, pal: { sash: C.red, trim: C.yellow } };
const A111_WIFE = { costume: 'villageWoman', s: 0.86, seed: 7 };
const A111_CHILD = { costume: 'maiden', child: true, s: 0.95, seed: 11 };
const A111_FRIEND = { costume: 'villager', age: 0.3, s: 0.88, seed: 5, pal: { robe: '#6f86b8', dot: '#4a5f94', sash: '#7a4212', patches: A111_PATCH, hc: '#e8dcc0', hd: '#9a8a6a', band: '#7a4212' } };
const A111_SELLER = { costume: 'beanSeller', s: 0.92, seed: 13, pal: { robe: C.blue, dot: NAVY } };
const A111_JEWEL = { costume: 'physician', age: 0.7, s: 0.88, seed: 17, pal: { robe: NAVY, dot: '#2a4fae', sash: C.yellow } };
const A111_MERCH = { costume: 'merchant', s: 0.95, seed: 19, pal: { robe: GREEN, dot: GREEND, hc: C.yellow, hd: C.red } };
const A111_BEGGAR = { costume: 'ascetic', age: 0.8, s: 0.88, seed: 23, hold: 'stick', pal: { robe: '#9a6a3a', dot: '#6a4420', patches: A111_PATCH, hc: '#e8dcc0', hd: '#9a8a6a' } };
const A111_BEGGAR_WHITE = { ...A111_BEGGAR, pal: { robe: C.white, dot: '#efe4c0', patches: null, hc: C.white, hd: '#f3e6c0', beard: C.white } };
const A111_LADY = { costume: 'lady', s: 0.86, seed: 29 };
const A111_SERVANT = { costume: 'servant', s: 0.86, seed: 31 };
const A111_PASSER = { costume: 'villager', s: 0.88, seed: 37, age: 0.2, pal: { robe: C.red, dot: '#a8160f', sash: C.yellow } };
const a111P = (base, o) => ({ ...base, ...o, pal: o.pal ? { ...(base.pal || {}), ...o.pal } : base.pal });

// the giving gesture (setup and payoff: 32.86, 146.52, 175.18): the hand travels to the receiver's palm with a 10-unit draw-back,
// eyes stay on the receiver's face. Returns {h (world hand target), gaze point}. side: +1 hero on the left, -1 on the right
function a111Give(t, t0, from, palm, face, side = 1) {
  const back = [from[0] - 10 * side, from[1] + 6], u = a111B(t, t0, 0.35, 'out');
  const h = t < t0 - 0.3 ? from : t < t0 ? a111Mix(from, back, a111B(t, t0 - 0.3, 0.3)) : a111Mix(back, palm, u);
  return { h, look: face };
}
// sheepish neck rub: hand behind the head, small oscillation
const a111NeckRub = (t, t0) => [26 + 4 * Math.sin((t - t0) * 14), -200 + 4 * Math.cos((t - t0) * 14)];
// talking mouth: 0..amp, a pure function of t
const a111Talk = (t, amp = 0.7, seed = 0) => amp * Math.max(0, Math.sin(t * 13 + seed) * 0.6 + Math.sin(t * 7.3 + seed * 2) * 0.4);
// dust motes in a light shaft
function a111Motes(ctx, x0, y0, t, n = 8) { ctx.save(); ctx.fillStyle = C.white; for (let i = 0; i < n; i++) { const r = K.rng(400 + i), u = ((t * 0.05 + r()) % 1); ctx.globalAlpha = 0.5 * Math.sin(Math.PI * u); ctx.beginPath(); ctx.arc(x0 + r() * 220 - 120 * u, y0 + u * 320, 3, 0, 7); ctx.fill(); } ctx.restore(); }
// a cloth tied over the nose (the wife cutting the fish)
function a111NoseCloth(ctx, P, dn = 0) { const y = 26 * dn, a = a111W(P, [-36, -187 + y]), b = a111W(P, [36, -187 + y]), c = a111W(P, [33, -166 + y]), d = a111W(P, [-33, -166 + y]); shape(ctx, [a, b, c, d, a], C.white, { lw: 3.5, seed: 720, dot: C.blue, pitch: 6, rad: 0.2, da: 0.3 }); }
// a face lit from below (coin light, pearl glow)
function a111FaceLight(ctx, P, k, col = '#ffe680') { if (k <= 0.01) return; const h = a111Head(P), s = a111S(P) * (P.child ? 1.25 : 1); ctx.save(); ctx.globalAlpha = 0.35 * k; ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(h[0], h[1] + 14 * s, 34 * s, 26 * s, 0, 0, 7); ctx.fill(); ctx.restore(); }
// a lens screwed into one eye (the jewel expert): side 1 = the figure's right eye
function a111Loupe(ctx, P, side = 1) { const hl = a111HeadL(P), e = a111W(P, [hl[0] + side * 13, hl[1] - 4]), s = a111S(P); ctx.save(); ctx.lineWidth = 7 * s; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(e[0], e[1], 15 * s, 0, 7); ctx.stroke(); ctx.lineWidth = 3.5 * s; ctx.strokeStyle = A111_GOLD; ctx.stroke();
  ctx.globalAlpha = 0.3; ctx.fillStyle = '#cfe0ff'; ctx.fill(); ctx.globalAlpha = 1; ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(e[0], e[1], 6.5 * s, 0, 7); ctx.fill(); ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(e[0] - 2 * s, e[1] - 3 * s, 2.2 * s, 0, 7); ctx.fill(); ctx.restore(); }
// a small puff of breath or a sigh from the mouth
function a111Sigh(ctx, P, t, t0, dirx = 1) { if (t < t0 || t > t0 + 0.9) return; const m = a111Mouth(P), u = (t - t0) / 0.9; ctx.save(); ctx.globalAlpha = 1 - u; shape(ctx, ell(m[0] + dirx * (14 + 40 * u), m[1] - 6 * u, 10 + 10 * u, 7 + 6 * u, 14), C.white, { lw: 3, seed: 721 }); ctx.restore(); }
