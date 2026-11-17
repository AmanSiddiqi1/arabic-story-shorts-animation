// ===== AN-104 cast looks and shared character helpers =====
const A104_POORPAL = { robe: '#a8741a', dot: '#7a4a12', sash: C.red, shoes: 'bare', hc: C.paper, hd: '#c9bfa6' };
const A104_RICHPAL = { robe: A104_GREEN, dot: A104_GREEND, sash: C.red, trim: C.yellow, hc: C.yellow, hd: C.red };
const A104_LOOK = {
  poor: { costume: 'villager', age: 0.15, s: 0.85, pal: A104_POORPAL, seed: 11 },
  mid: { costume: 'villager', age: 0.3, s: 0.85, pal: { robe: A104_GREEN, dot: A104_GREEND, sash: C.red, hc: C.white, hd: C.blue }, seed: 11 },
  rich: { costume: 'merchant', age: 0.45, s: 0.85, pal: A104_RICHPAL, seed: 11 },
  old: { costume: 'merchant', age: 0.6, s: 0.85, pal: A104_RICHPAL, seed: 11 },
  lord: { costume: 'merchant', age: 0.45, s: 0.62, seed: 21 },
  poorLord: { costume: 'ascetic', age: 0.85, s: 0.85, pal: { hc: '#8fa3c4', hd: '#6f84a8' }, seed: 21 },
  guestA: { costume: 'merchant', age: 0.4, s: 0.62, pal: { robe: C.red, dot: '#a8160f' }, seed: 31 },
  guestB: { costume: 'lady', s: 0.62, seed: 32 },
  guestC: { costume: 'vizier', age: 0.8, s: 0.64, seed: 33 },
  servantA: { costume: 'servant', s: 0.8, seed: 41 },
  servantB: { costume: 'servant', s: 0.78, pal: { hc: C.blue }, seed: 42 },
  keeper: { costume: 'beanSeller', s: 0.82, seed: 51 },
  buyer: { costume: 'merchant', age: 0.6, s: 0.82, pal: { robe: '#7a3a5a', dot: '#4a1a3a', hc: C.yellow, hd: C.red }, seed: 52 },
  porter: { costume: 'servant', child: true, s: 0.85, seed: 61 },
  neighbour: { costume: 'oldWoman', hold: 'stick', s: 0.8, seed: 71 },
};
const a104Mk = (name, o) => ({ ...A104_LOOK[name], ...o, pal: { ...(A104_LOOK[name].pal || {}), ...((o && o.pal) || {}) } });
// hand blinks on top of an explicit lid
const a104Lid = (P, t) => { if (P.lid != null && P.lid < 0.9 && !P.noBlink) P.lid = Math.max(P.lid, blink(t, P.seed || 1)); return P; };
const a104Walk = (P, xf, t, k = 1, stride = 26) => { const w = walk(xf, t, { stride }); P.x = w.x; P.ph = w.ph; P.amp = w.amp * k; return P; };
// the stranger's look over the film (age and costume swaps hidden on the S9 night passes and under the YEARS LATER card)
function a104StrangerLook(t) {
  if (t < 98.9) return 'poor'; if (t < 99.75) return 'mid'; if (t < 110.95) return 'rich'; return 'old';
}
// two paper patches on the poor robe
function a104Patches(ctx, P) {
  if ((P.pal || {}).robe !== A104_POORPAL.robe) return;
  a104OnBody(ctx, P, (c) => { for (const [x, y, w, h] of [[-26, -128, 18, 15], [8, -96, 16, 14]]) { shape(c, K.rectPts(x, y, w, h), '#efdcae', { lw: 3, seed: 440 + x }); c.save(); c.setLineDash([3, 3]); c.lineWidth = 1.5; c.strokeStyle = C.black; c.strokeRect(x + 3, y + 3, w - 6, h - 6); c.restore(); } });
}
// the debt scrolls riding on his back (behind the figure; peeking over the shoulders). n scrolls, bob lag, pop-in per scroll
function a104BackScrolls(ctx, P, t, n, popT) {
  const spots = [[-44, -232, -0.3], [-16, -252, 0.1], [-62, -262, -0.5]];
  for (let i = 0; i < Math.min(3, n); i++) {
    const t0 = popT ? popT[i] : -10, k = K.ease.back(K.clamp((t - t0) / 0.25)); if (k <= 0) continue;
    const bob = 3 * Math.sin(t * 6 + i) * (P.amp || 0) + 4 * Math.sin(((P.ph || 0) - 0.6) * 2) * (P.amp || 0), q = a104Pt(P, spots[i][0], spots[i][1] + bob - (1 - k) * 40);
    a104Scroll(ctx, q[0], q[1], 0.75 * (P.s || 1) * k, { rot: spots[i][2] + 0.05 * Math.sin(t * 3 + i) });
  }
}
// draw a person with the shared extras
function a104Person(ctx, P) { person(ctx, P); a104Patches(ctx, P); }
// a ladle in the hand (world): from the hand down-left to the bowl
function a104Ladle(ctx, hand, tipA) { const e = [hand[0] - 60 * Math.cos(tipA), hand[1] + 60 * Math.sin(tipA)]; seg(ctx, hand[0], hand[1], e[0], e[1], 6, A104_BROWN, 2.5); shape(ctx, ell(e[0], e[1] + 6, 14, 9, 12), A104_SILVERD, { lw: 3.5, seed: 441 }); }
// cooking pot carried in two hands
function a104Pot(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, [[-46, -50], [-40, 0], [40, 0], [46, -50]], '#5a5a6a', { lw: 5, seed: 442, dot: C.black, pitch: 7, rad: 0.18, da: 0.3 }); shape(ctx, ell(0, -50, 46, 10, 18), '#9a5a22', { lw: 4, seed: 443 }); ctx.restore(); }
