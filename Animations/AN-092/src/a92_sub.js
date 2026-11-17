// ===== AN-092 subtitles (story copy of Library core/subtitle.js; story.json "subtitle": "scene") =====
// Same layout, fonts, sizes and timing as the library caption; v2 adds balanced line breaks only (no orphan word on the last line).
// Text is unchanged: the chunks still come verbatim from timing.json.
function a92WrapBalanced(ctx, text, maxW) {
  const lines = K.wrap(ctx, text, maxW); if (lines.length < 2) return lines;
  let lo = maxW * 0.45, hi = maxW, best = lines;
  for (let i = 0; i < 14; i++) { const mid = (lo + hi) / 2, l = K.wrap(ctx, text, mid); if (l.length <= lines.length) { best = l; hi = mid; } else lo = mid; }
  return best;
}
function subtitle(ctx, W, H, t, s) {
  const ch = TIMING.chunks; let cur = null;
  for (let i = 0; i < ch.length; i++) { const e = ch[i], nx = ch[i + 1], endAt = nx && nx.a - e.b < 1.4 ? nx.a - 0.1 : e.b + 0.6; if (t >= e.a - 0.12 && t < endAt) { cur = e; break; } }
  const bx = 54, by = 1296, bw = 972, bh = 566;
  S0.box(ctx, bx, by, bw, bh, 1, { fill: C.white, lw: 9, seed: 13 });
  if (!cur) return;
  const a = K.clamp((t - cur.a + 0.12) / 0.14), maxW = bw - 90; ctx.save(); ctx.globalAlpha = a;
  let fs = 70, lines, lh; ctx.direction = 'rtl'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  for (; fs >= 44; fs -= 2) { ctx.font = K.font(fs, AF, AW); lines = K.wrap(ctx, cur.ar, maxW); lh = fs * 1.72; if (lines.length * lh <= 340) break; }
  ctx.font = K.font(fs, AF, AW); lines = a92WrapBalanced(ctx, cur.ar, maxW);
  let es = 44, enL, elh; ctx.direction = 'ltr';
  for (; es >= 30; es -= 2) { ctx.font = K.font(es, BF, 400); enL = K.wrap(ctx, cur.en, maxW); elh = es * 1.25; if (enL.length * elh <= 150) break; }
  ctx.font = K.font(es, BF, 400); enL = a92WrapBalanced(ctx, cur.en, maxW);
  const total = lines.length * lh + 22 + enL.length * elh, y0 = by + (bh - total) / 2;
  ctx.direction = 'rtl'; ctx.font = K.font(fs, AF, AW); ctx.fillStyle = C.black; lines.forEach((ln, i) => ctx.fillText(ln, bx + bw / 2, y0 + (i + 0.5) * lh));
  ctx.direction = 'ltr'; ctx.font = K.font(es, BF, 400); ctx.fillStyle = C.blue; ctx.letterSpacing = '1px'; enL.forEach((ln, i) => ctx.fillText(ln, bx + bw / 2, y0 + lines.length * lh + 22 + (i + 0.5) * elh)); ctx.letterSpacing = '0px';
  ctx.restore();
}
let S0 = null;
