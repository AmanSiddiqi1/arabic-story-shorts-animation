// ===== HP.subtitle: caption box with a primary line and an optional secondary line =====
// Taken from the subtitle() function that was identical (after whitespace normalisation) in all four Kalila wa Dimna films.
// The component is colour- and language-neutral: fonts, colours, sizes and the field names come from HP.config.subtitle.
// The Arabic preset (presets/arabic.json) supplies the approved Kalila values; with no preset it draws Bangers, black on white.
window.HP = window.HP || {};
HP.defaults = {
  subtitle: {
    fields: { primary: 'text', secondary: 'text2' },          // keys read from each TIMING.chunks entry {a, b, <primary>, <secondary>}
    box: { fill: '#fffaf0', lw: 9, seed: 13 },                 // the caption box (S.box); fill defaults to the palette white
    pad: 90,                                                    // box width minus this = text width
    gap: 22,                                                    // between the primary and secondary blocks
    primary: { font: 'Bangers', weight: 400, color: '#141414', dir: 'ltr', max: 70, min: 44, step: 2, lineHeight: 1.25, maxBlock: 340, letterSpacing: '0px' },
    secondary: { font: 'Bangers', weight: 400, color: '#141414', dir: 'ltr', max: 44, min: 30, step: 2, lineHeight: 1.25, maxBlock: 150, letterSpacing: '1px' },
    timing: { fadeIn: 0.14, lead: 0.12, holdGap: 1.4, tail: 0.6 },   // chunk shows from a-lead; held to the next chunk if the gap is < holdGap, else b+tail
  },
};
HP.merge = (a, b) => { const o = Array.isArray(a) ? a.slice() : Object.assign({}, a); for (const k of Object.keys(b || {})) o[k] = b[k] && typeof b[k] === 'object' && !Array.isArray(b[k]) && a && typeof a[k] === 'object' ? HP.merge(a[k], b[k]) : b[k]; return o; };
HP.config = HP.merge(HP.defaults, window.HP_CONFIG || {});
HP.debug = HP.debug || {};
HP.subtitle = function (ctx, W, H, t, S) {
  const cfg = HP.config.subtitle, box = HP.layout.caption;
  if (!box || !cfg || typeof TIMING === 'undefined' || !TIMING.chunks) return;
  const f = cfg.fields, tm = cfg.timing, ch = TIMING.chunks; let cur = null;
  for (let i = 0; i < ch.length; i++) { const e = ch[i], nx = ch[i + 1], endAt = nx && nx.a - e.b < tm.holdGap ? nx.a - 0.1 : e.b + tm.tail; if (t >= e.a - tm.lead && t < endAt) { cur = e; break; } }
  S.box(ctx, box.x, box.y, box.w, box.h, 1, { fill: cfg.box.fill, lw: cfg.box.lw, seed: cfg.box.seed });
  if (!cur) return;
  const p = cfg.primary, q = cfg.secondary, text1 = cur[f.primary] || '', text2 = f.secondary ? cur[f.secondary] : '';
  const a = K.clamp((t - cur.a + tm.lead) / tm.fadeIn), maxW = box.w - cfg.pad; ctx.save(); ctx.globalAlpha = a;
  let fs = p.max, lines = [], lh = 0; ctx.direction = p.dir; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  for (; fs >= p.min; fs -= p.step) { ctx.font = K.font(fs, p.font, p.weight); lines = K.wrap(ctx, text1, maxW); lh = fs * p.lineHeight; if (lines.length * lh <= p.maxBlock) break; }
  let es = q ? q.max : 0, enL = [], elh = 0; ctx.direction = q ? q.dir : 'ltr';
  if (q && text2) for (; es >= q.min; es -= q.step) { ctx.font = K.font(es, q.font, q.weight); enL = K.wrap(ctx, text2, maxW); elh = es * q.lineHeight; if (enL.length * elh <= q.maxBlock) break; }
  const total = lines.length * lh + (enL.length ? cfg.gap + enL.length * elh : 0), y0 = box.y + (box.h - total) / 2;
  ctx.direction = p.dir; ctx.font = K.font(fs, p.font, p.weight); ctx.fillStyle = p.color; if (p.letterSpacing) ctx.letterSpacing = p.letterSpacing;
  lines.forEach((ln, i) => ctx.fillText(ln, box.x + box.w / 2, y0 + (i + 0.5) * lh)); ctx.letterSpacing = '0px';
  if (enL.length) { ctx.direction = q.dir; ctx.font = K.font(es, q.font, q.weight); ctx.fillStyle = q.color; ctx.letterSpacing = q.letterSpacing || '0px'; enL.forEach((ln, i) => ctx.fillText(ln, box.x + box.w / 2, y0 + lines.length * lh + cfg.gap + (i + 0.5) * elh)); ctx.letterSpacing = '0px'; }
  ctx.restore();
  HP.debug.subtitle = { chunk: cur, primaryLines: lines, primarySize: fs, secondaryLines: enL, secondarySize: es, primaryDirection: p.dir, primaryFont: K.font(fs, p.font, p.weight), alpha: a };
};
