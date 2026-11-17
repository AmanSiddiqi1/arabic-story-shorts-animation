// ===== AN-105 cast: looks, the shared drawing of an actor (figure + helmet + bag + extras), and small acting helpers =====
const A105_LOOK = {
  soldier: { costume: 'servant', age: 0.3, s: 0.9, pal: { robe: C.red, dot: '#a8160f', len: 'knee', sash: C.yellow, pants: CREAM, head: 'helm' }, seed: 51, helm: true, helmCloth: C.yellow },
  chief: { costume: 'vizier', age: 0.35, s: 0.9, seed: 52 },
  sharper: { costume: 'merchant', s: 0.88, pal: { robe: A105_GREEN, dot: A105_GREEND, hc: C.yellow, hd: C.red, sash: C.yellow }, seed: 53 },
  guardA: { costume: 'servant', age: 0.35, s: 0.95, pal: { robe: C.blue, dot: NAVY, len: 'knee', sash: C.yellow, pants: CREAM, head: 'helm' }, seed: 54, helm: true },
  guardB: { costume: 'servant', age: 0, s: 0.78, pal: { robe: C.blue, dot: NAVY, len: 'knee', sash: C.yellow, pants: CREAM, head: 'helm', tache: false }, seed: 55, helm: true, big: true },
  gA: { costume: 'villager', age: 0.45, s: 0.78, pal: { head: 'ownerCap' }, seed: 56 },
  gB: { costume: 'bedouin', s: 0.8, seed: 57 },
  gC: { costume: 'merchant', age: 0.85, s: 0.76, pal: { robe: A105_BROWN, dot: A105_BROWND, hc: C.white, hd: C.red }, seed: 58 },
  gD: { costume: 'servant', age: 0, s: 0.74, seed: 59 },
  changer: { costume: 'merchant', age: 0.7, s: 0.85, pal: { robe: '#e8a04a', dot: '#a8741a', hc: C.white, hd: C.blue }, seed: 60 },
};
const a105Mk = (name, o) => ({ ...A105_LOOK[name], ...o });
const A105_GUESTS = ['gA', 'gB', 'gC', 'gD'];
const a105Lid = (P, t) => { if (!P.noBlink && (P.lid ?? 0) < 0.9) P.lid = Math.max(P.lid ?? 0, blink(t, P.seed || 1)); };
const a105Dir = (xf, t, d0) => { const v = speed(xf, t); return Math.abs(v) > 6 ? Math.sign(v) : d0; };
const a105Walk = (xf, t, stride = 24) => walk(xf, t, { stride });
// spin like a turnstile: returns {dir, sq} over [t0, t0 + d] with n half turns (never a sliver: squeeze >= 0.7)
function a105Spin(t, t0, d, n, dir0) { if (t < t0 || t > t0 + d) return null; const a = (t - t0) / d * n * Math.PI, c = Math.cos(a); return { dir: (c >= 0 ? 1 : -1) * dir0, sqx: Math.max(0.7, Math.abs(c)) }; }

// draw one actor: pre (behind), the figure, helmet, bag, post (in front). P.clipY: only the part above that y is drawn (peeks over cover)
function a105Draw(ctx, P) {
  if (!P || P.hidden) return; ctx.save(); if (P.alpha != null) ctx.globalAlpha *= P.alpha;
  if (P.clipY != null) { ctx.beginPath(); ctx.rect(-5000, -5000, 10000, P.clipY + 5000); ctx.clip(); }
  if (P.clipR) { ctx.beginPath(); ctx.rect(...P.clipR); ctx.clip(); }
  for (const f of P.pre || []) f(ctx);
  if (P.sqx) { ctx.translate(P.x, 0); ctx.scale(P.sqx, 1); ctx.translate(-P.x, 0); }
  person(ctx, P);
  if (P.helm) a105Helmet(ctx, P, { big: P.big, cloth: P.helmCloth, rot: P.helmRot || 0, lift: P.helmLift || 0 });
  if (P.bag) a105DrawBag(ctx, P);
  if (P.coinEyes) a105CoinEyes(ctx, P, P.coinEyes);
  if (P.flush) a105Flush(ctx, P, P.flush, 0);
  for (const f of P.post || []) f(ctx);
  ctx.restore();
}
// the saddlebag on its strap (P.bag: {bulge, slit, flap, hand: world point when held, rot, upside, purseIn})
function a105DrawBag(ctx, P) {
  const B = P.bag, s = P.s || 1, d = P.dir || 1;
  if (B.hand) { a105Bag(ctx, B.hand[0] - 2, B.hand[1] - 6, 0.55 * s, B); return; }
  const sh = a105Pt(P, -24, -146), hip = a105Pt(P, 30, -70), sw = B.swing || 0;
  const top = [hip[0] + d * 6 * s + sw * 30, hip[1] - 4];
  a105Strap(ctx, sh, top); a105Bag(ctx, top[0], top[1], 0.5 * s, { ...B, rot: sw * 0.6 + (B.rot || 0) });
}
// purse at a world point (bottom centre) with a slight hang from a hand
const a105PurseAt = (ctx, p, s = 0.8, o = {}) => a105Purse(ctx, p[0], p[1], s, o);

// talk helper: list of [a, b] spans
const a105Talk = (t, spans, k = 0.8) => talk(t, spans, 0.3) * k;
// shared group stagger: a reaction value for guest i (3-4 frames apart)
const a105St = (i) => i * 0.12;
