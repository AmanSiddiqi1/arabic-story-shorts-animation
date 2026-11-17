// ===== AN-134 cast: costumes, the person drawer with extras (guard kit, held goblet, clip, loose crown), arm and gaze shorthands =====
const HK_DUR = 176.28;   // MP3 173.285 s + 3.0 s THE END hold (plan)
const HK_CAL = { costume: 'caliph' }, HK_VIZ = { costume: 'vizier' };
const HK_MER = { costume: 'merchant', pal: { robe: GREEN, dot: GREEND, hc: C.yellow, hd: C.red } };
const HK_SERV = [{}, { hc: C.blue }, { hc: GREEN, sash: C.yellow }, { hc: C.yellow, sash: C.blue }].map((pal, i) => ({ costume: 'servant', pal, seed: 11 + i * 7 }));
const HK_BOY = { costume: 'servant', child: true, pal: { hc: C.yellow, sash: C.blue }, seed: 41 };
// planned 'guard' preset: a servant body in mail grey with navy trousers, a helmet and a spear (Library proposal)
const HK_GRD = [0, 1, 2, 3].map((i) => ({ costume: 'servant', pal: { robe: '#9aa6b8', dot: '#5a6478', sash: i % 2 ? C.blue : C.red, pants: NAVY, sleeve: '#9aa6b8' }, guard: true, seed: 51 + i * 5, mouth: 'closed' }));
const HK_CAL_D = () => PEOPLE.dress({ costume: 'caliph' });
const hkP = (base, x, y, s, dir, extra = {}) => ({ ...base, pal: base.pal ? { ...base.pal } : undefined, x, y, s, dir, ...extra });
// arms by keyed targets (right side targets; the left side is mirrored automatically). targets: local [x, y], {w: [x, y]} world, {a: [a0, a1]}
function hkArms(t, P, R, L) { if (R) P.aR = hkArm(t, P, 1, R); if (L) P.aL = hkArm(t, P, -1, L.map(([t0, v, d]) => [t0, Array.isArray(v) ? hkMir(v) : v, d])); return P; }
const hkG = (P, pt) => lookAt(hkHead(P), pt);
// the caliph's headwear drawn on its own (for the crown hop); from AN-108 ksHat
function hkHat(ctx, P, slip) { const D = HK_CAL_D(), h = hkHeadL(P), c = hkW(P, h), s = P.s, dir = P.dir || 1, sq = P.sq ?? 1; ctx.save(); ctx.translate(c[0], c[1]); ctx.rotate((P.tip || 0) * dir + hkLean(P) * dir);
  ctx.scale(s * dir * (1 + (1 - sq) * 0.7), s * sq); ctx.rotate(P.tilt || 0); ctx.translate(slip[0], slip[1]); ctx.rotate(slip[2]); personHeadwear(ctx, 0, 0, D, P, 'front'); ctx.restore(); }
// draw a person with the story extras
function hkDraw(ctx, P) {
  if (!P || P.hidden) return; ctx.save();
  if (P.clipL != null || P.clipR != null) { ctx.beginPath(); ctx.rect(P.clipL ?? -5000, -3000, (P.clipR ?? 5000) - (P.clipL ?? -5000), 6000); ctx.clip(); }
  if (P.alpha != null) ctx.globalAlpha *= P.alpha;
  const Q = { ...P, alpha: undefined };
  if (P.hat) { person(ctx, { ...Q, pal: { ...(P.pal || {}), head: 'none' } }); hkHat(ctx, P, P.hat); } else person(ctx, Q);
  if (P.guard) { hkHelmet(ctx, P); const h = hkHandW(P, 'R'); hkSpear(ctx, h[0], P.y - 24 * P.s, 300 * P.s, P.spearRot || 0, { pennant: P.pennant }); }
  if (P.gob) { const h = hkHandW(P, P.gob.side || 'R'); hkGoblet(ctx, h[0], h[1] + 12 * P.s, 0.75 * P.s, P.gob); }
  if (P.after) P.after(ctx, P);
  ctx.restore();
}
// gaze shorthand with a plan of world points
const hkGP = (t, P, plan, e = 0.18) => hkLook(t, P, plan, e);
// sweat drop, notes and little "!" helpers
function hkBang(ctx, x, y, p, txt = '!') { if (p > 0) sfx(ctx, txt, x, y, 54, p, { fill: C.yellow }); }
function hkNote(ctx, x, y, t, t0, t1) { if (t < t0 || t > t1) return; for (let i = 0; i < 2; i++) { const u = ((t - t0) * 0.8 + i * 0.5) % 1; ctx.save(); ctx.globalAlpha = Math.sin(Math.PI * u); note(ctx, x + 20 * u + i * 18, y - 60 * u, 0.7); ctx.restore(); } }
// rider: the person seated on a mount (for hand positions and gaze); ignores the small saddle rotation
function hkRiderP(HP, ps, extra = {}) { const st = mountSeat('horse', HP), sg = Math.sign(HP.dir || 1); return { ...HK_CAL, x: st.x + 22 * sg * ps, y: st.y + 52 * ps, s: ps, dir: sg, sit: 1, seat: 'bench', ...extra }; }
// speech/thought-free picture balloon: centre (cx, cy), w x h, tail to (tx, ty), pop p, inside(c) drawn clipped at the centre
function hkBalloon(ctx, cx, cy, w, h, tail, p, inside, o = {}) {
  const k = K.ease.back(K.clamp(p)); if (k <= 0.01) return; ctx.save(); ctx.translate(cx, cy); ctx.scale(k * (o.sx || 1), k * (o.sy || 1)); ctx.rotate(o.rot || 0);
  const pts = ell(0, 0, w / 2, h / 2, 40), tx = (tail[0] - cx) / k, ty = (tail[1] - cy) / k;
  ctx.fillStyle = C.white; K.poly(ctx, pts, true); ctx.fill(); ctx.beginPath(); ctx.moveTo(-w * 0.08, h * 0.4); ctx.lineTo(tx, ty); ctx.lineTo(w * 0.1, h * 0.38); ctx.fill();
  ink(ctx, pts, 5, 790); ink(ctx, [[-w * 0.08, h * 0.44], [tx, ty], [w * 0.1, h * 0.42]], 4, 791);
  ctx.save(); K.poly(ctx, pts, true); ctx.clip(); if (inside) inside(ctx); ctx.restore(); ctx.restore();
}
