// ===== birds. bird: the lark rig from The Lark and the Elephant (kinds lark, crow, y, r, b), with the acting additions from the Fable experiment.
// songbird: the small round bird from The Lion and the Hare. =====
// bird P: {x,y,s,dir,kind,fly,flap(-1..1),rot,eyes,brow,beak(0..1.7 open),drop,headRot,crest(0..1 flat; <0 raised),sag(wing droop; <0 flung up),tailDrop,shake}
// songbird P: {x,y,s,dir,flap,fly,col,eyes}
const BIRD = { lark: { body: '#a8741a', belly: '#f2d2a0', wing: '#7a4e12', beak: C.yellow }, crow: { body: '#2a2a33', belly: '#3d3d4a', wing: '#1a1a22', beak: '#d9a441' }, y: { body: C.yellow, belly: '#fff3b0', wing: '#e0a800', beak: C.red }, r: { body: C.red, belly: '#ff9a8a', wing: '#a8160f', beak: C.yellow }, b: { body: '#4a86f0', belly: '#bcd6ff', wing: '#1d4fb0', beak: C.yellow } };
function bird(ctx, P) {
  const s = P.s || 1, dir = P.dir ?? 1, c = BIRD[P.kind || 'lark'], fl = P.flap ?? 0;
  ctx.save(); ctx.translate(P.x + (P.shake || 0), P.y); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s);
  if (!P.fly) for (const sd of [-1, 1]) seg(ctx, sd * 8, -14, sd * 10 + 2, 0, 5, C.yellow, 3);

  { const td = P.tailDrop || 0; ctx.save(); ctx.translate(-30, -40); ctx.rotate(-0.55 * td); ctx.translate(30, 40); shape(ctx, [[-30, -44], [-70, -62 - fl * 6], [-72, -40], [-62, -28], [-30, -34]], c.wing, { lw: 4, seed: 2 }); ctx.restore(); }
  shape(ctx, ell(0, -40, 36, 28, 24), c.body, { lw: 5, seed: 3, dot: C.black, pitch: 8, rad: 0.14, da: 0.4 });
  shape(ctx, ell(8, -32, 22, 17, 18), c.belly, { lw: 0 });
  ctx.save(); ctx.translate(-4, -50); ctx.rotate(-0.9 * fl - 0.2 + (P.sag || 0) * 0.9); shape(ctx, ell(-6, 4, 28, 13, 16), c.wing, { lw: 4.5, seed: 4 }); ctx.restore();
  const hx = 32, hy = -64 + (P.drop || 0), hr = P.headRot || 0;
  ctx.save(); if (hr) { ctx.translate(hx - 14, hy + 16); ctx.rotate(hr); ctx.translate(-(hx - 14), -(hy + 16)); }
  const cd = P.crest || 0;
  if (P.kind === 'lark') for (const a of [-0.5, -0.1, 0.3]) { const tx = K.lerp(hx + Math.sin(a) * 30 - 18, hx - 42 + a * 10, cd), ty = K.lerp(hy - 40 + Math.cos(a) * 4, hy - 14 + a * 10, cd); shape(ctx, [[hx - 6, hy - 16], [tx, ty], [hx + 6, hy - 18]], c.wing, { lw: 3.5, seed: 5 }); }
  shape(ctx, ell(hx, hy, 21, 20, 20), c.body, { lw: 5, seed: 6, dot: C.black, pitch: 8, rad: 0.14, da: 0.4 });
  const ob = P.beak || 0, bl = P.kind === 'crow' ? 34 : 24;
  shape(ctx, [[hx + 16, hy - 8], [hx + 16 + bl, hy - 2 - ob * 4], [hx + 16, hy + 1]], c.beak, { lw: 3.5, seed: 7 });
  if (ob > 0.1) shape(ctx, [[hx + 16, hy + 1], [hx + 14 + bl * 0.8, hy + 3 + ob * 9], [hx + 16, hy + 8]], c.beak, { lw: 3.5, seed: 8 });
  eyeAt(ctx, hx + 6, hy - 6, P.eyes || 'open', 0.8);
  if (P.brow) { ctx.save(); ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(hx - 4, hy - 20 - P.brow * 2); ctx.lineTo(hx + 16, hy - 14 + P.brow * 5); ctx.stroke(); ctx.restore(); }
  ctx.restore();
  ctx.restore();
}
function songbird(ctx, P) {
  const s = P.s || 1, dir = P.dir ?? 1, fl = Math.sin(P.flap || 0), col = P.col || C.red;
  ctx.save(); ctx.translate(P.x, P.y); ctx.scale(dir * s, s);
  if (!P.fly) { ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(-6, 18); ctx.lineTo(-6, 32); ctx.moveTo(6, 18); ctx.lineTo(6, 32); ctx.stroke(); ctx.restore(); }
  shape(ctx, [[-20, 2], [-46, -8], [-44, 12], [-20, 2]], col, { lw: 4, seed: 2 });
  shape(ctx, ell(0, 0, 26, 22, 18), col, { lw: 5, seed: 3, dot: C.yellow, pitch: 7, rad: 0.2, da: 0.6 });
  shape(ctx, [[22, -5], [44, 2], [22, 9], [22, -5]], C.yellow, { lw: 3.5, seed: 4 });
  eyeAt(ctx, 10, -6, P.eyes || 'open', 0.8);
  if (P.fly) shape(ctx, [[-10, -4], [-30, -6 - 36 * fl], [10, -2], [-10, -4]], col, { lw: 4, seed: 5 }); else shape(ctx, ell(-6, 4, 14, 9, 12), col, { lw: 3.5, seed: 5 });
  ctx.restore();
}
