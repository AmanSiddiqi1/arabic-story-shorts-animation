// ===== AN-014 cast: one Library person figure in costumes; small acting helpers =====
// kind man: village green robe (to 33.98), plain white robe at the prayer house (to 129.7), fine blue robe at the palace; yellow sash throughout
const K14_GMV = { costume: 'villager', pal: { robe: '#3f9d4a', dot: '#2b7a38', sash: C.yellow }, age: 0.25 };
const K14_GMY = { costume: 'physician', pal: { robe: C.white, dot: '#b9b4c6', sash: C.yellow }, age: 0.3 };
const K14_GMP = { costume: 'merchant', pal: { robe: C.blue, dot: NAVY, sash: C.yellow, trim: C.yellow, belly: 0, head: 'turban', hc: C.white, hd: C.blue, band: C.yellow }, age: 0.3 };
// the envier: brown robe, red cap, tight brow; years later older with a patched robe
const K14_EN = { costume: 'villager', pal: { robe: '#8a501a', dot: '#5b3010', sash: '#3a3a4a', head: 'cap', hc: C.red, hd: null, band: '#a8160f' }, age: 0.3 };
const K14_ENO = { costume: 'villager', pal: { robe: '#6e4a10', dot: '#4a3010', sash: '#3a3a4a', head: 'cap', hc: '#a8160f', hd: null, band: '#5b3010', patches: C.blue }, age: 0.6 };
const K14_SULTAN = { costume: 'caliph', pal: { head: 'bigTurban' } };
const K14_PRINCESS = { costume: 'lady', pal: { robe: C.red, dot: '#a8160f' } };
const K14_JA = { costume: 'villager', child: true, pal: { robe: C.red, dot: '#a8160f', sash: C.yellow, pants: '#a8160f', head: 'none', belly: 1 }, horns: true, tint: ['#ff6a4a', 0.75] };
const K14_JB = { costume: 'villager', child: true, pal: { robe: C.blue, dot: NAVY, sash: C.yellow, pants: NAVY, head: 'none', belly: 1 }, horns: true, tint: ['#6aa0ff', 0.75] };
// the shove: one pair of arm angles, used at 60.6 and again in the S19 thought cloud (setup and payoff)
const K14_SHOVE = { aL: [1.55, 1.5], aR: [1.62, 1.55] };
const K14_UP = { aL: [-2.75, -2.95], aR: [2.75, 2.95] };   // both arms up (stretch, joy)

function k14GM(t, o = {}) {
  const base = t < 33.98 ? K14_GMV : t < 129.7 ? K14_GMY : K14_GMP;
  return { ...base, pal: { ...base.pal }, x: 300, y: 900, s: 0.9, dir: 1, mouth: 'smile', ...o };
}
function k14EN(t, o = {}) { const base = t >= 149.5 ? K14_ENO : K14_EN; return { ...base, pal: { ...base.pal }, x: 600, y: 900, s: 0.88, dir: -1, brow: 0.6, mouth: 'closed', ...o }; }
// vector keys: k14V(t, [[t0, [a, b]], ...]) eased per component
function k14V(t, keys, e = 'inOut') { const n = keys[0][1].length, out = []; for (let i = 0; i < n; i++) out.push(kfn(t, keys.map(([tt, v]) => [tt, v[i]]), e)); return out; }
// draw inside a clip rectangle (doorways, windows, the well mouth)
function k14Clip(ctx, r, fn) { ctx.save(); ctx.beginPath(); ctx.rect(r[0], r[1], r[2], r[3]); ctx.clip(); fn(); ctx.restore(); }
// clip everything except a box (the inside of the well below the rim)
function k14ClipOut(ctx, r, fn) { ctx.save(); ctx.beginPath(); ctx.rect(-50, -50, 1100, 1400); ctx.rect(r[0], r[1], r[2], r[3]); ctx.clip('evenodd'); fn(); ctx.restore(); }
// a person with gaze at a world point and a seeded blink on top of any set lid
function k14Act(ctx, P, t, seed, target) { if (target) P.gaze = lookAt(k14Head(P), target); if (P.lid != null && !P.noBlink) P.lid = Math.max(P.lid, blink(t, seed)); return k14Person(ctx, P); }
// a small heart that pops up and floats
function k14Heart(ctx, t, t0, x, y, r = 22, life = 1.4) { const d = t - t0; if (d < 0 || d > life) return; const k = K.ease.back(K.clamp(d / 0.25)); heart(ctx, x + Math.sin(d * 5) * 6, y - d * 40, r * k, { alpha: K.clamp((life - d) / 0.3) }); }
// a soap-bubble pop ring
function k14Burst(ctx, t, t0, x, y, r = 30) { const d = t - t0; if (d < 0 || d > 0.35) return; const u = d / 0.35; ctx.save(); ctx.globalAlpha = 1 - u; ctx.lineWidth = 6; ctx.strokeStyle = C.black; for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r * (0.5 + u), y + Math.sin(a) * r * (0.5 + u)); ctx.lineTo(x + Math.cos(a) * r * (0.9 + u * 1.2), y + Math.sin(a) * r * (0.9 + u * 1.2)); ctx.stroke(); } ctx.restore(); }
// small sparkle stars around a point
function k14Spark(ctx, t, t0, x, y, n = 3, r = 60, life = 0.9) { const d = t - t0; if (d < 0 || d > life) return; for (let i = 0; i < n; i++) { const a = i * 2 * Math.PI / n + d * 2; star(ctx, x + Math.cos(a) * r, y + Math.sin(a) * r * 0.7, 16 * Math.sin(Math.PI * d / life), C.yellow, a); } }
// a seeded walk track helper: legs from distance, never sliding
function k14W(P, keys, t, stride = 27) { return k14Walk(P, k14X(keys), t, stride); }
