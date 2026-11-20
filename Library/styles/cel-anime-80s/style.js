// 80s Cel Anime (after Lemo-Opuscar's 80s Cel Anime, adapted to 2D canvas for Arabic Story Shorts). Hand-painted cels over
// airbrushed plates, backlit chrome titles, impact frames and tape glitches, played back as a late-80s videotape on a CRT:
// chroma bleed, halation, scanlines, darkened corners, faint noise. Same primitives and signatures as every Creator OS style.
(function () {
  const P = { line: '#1a0f2a', cream: '#fff1b8', cyan: '#7fe3ff', pink: '#ff5fa8', violet: '#8a5cff', gold: '#ffd36a', sky: '#7fd0ff', house: '#17121d', screen: '#14122a' };
  const SANS = 'Barlow Semi Condensed';
  const S = (W, H) => K.layout(W, H).s;
  const sOf = (ctx) => S(ctx.canvas.width, ctx.canvas.height);
  const LAY = {}; const lay = (k, w, h) => { const L = LAY[k]; if (L && L.width === w && L.height === h) return L; return (LAY[k] = K.layer(w, h)); };
  const rr = (ctx, x, y, w, h, r) => { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); };
  function chrome(ctx, y0, y1) { const g = ctx.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, P.sky); g.addColorStop(0.46, '#ffffff'); g.addColorStop(0.5, P.violet); g.addColorStop(0.72, P.pink); g.addColorStop(1, P.gold); return g; }
  // chrome lettering: dark outline, neon outer glow, gradient fill (italic Barlow 800 for Latin; o.font for Arabic, e.g. Lalezar)
  function chromeText(ctx, text, x, y, size, o = {}) {
    const font = o.font ? `400 ${size}px "${o.font}"` : `italic 800 ${size}px "${SANS}"`;
    ctx.save(); ctx.font = font; ctx.textAlign = o.align || 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
    ctx.shadowColor = o.glow || P.pink; ctx.shadowBlur = size * 0.35; ctx.lineWidth = size * 0.2; ctx.strokeStyle = o.glow || P.pink; ctx.strokeText(text, x, y);
    ctx.shadowBlur = 0; ctx.lineWidth = size * 0.12; ctx.strokeStyle = P.line; ctx.strokeText(text, x, y);
    ctx.fillStyle = chrome(ctx, y - size * 0.5, y + size * 0.5); ctx.fillText(text, x, y); ctx.restore();
  }
  function star(ctx, x, y, r, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.fillStyle = '#ffffff'; ctx.shadowColor = '#ffffff'; ctx.shadowBlur = r; ctx.beginPath(); for (let i = 0; i < 8; i++) { const an = i / 8 * Math.PI * 2, rr2 = i % 2 ? r * 0.12 : r; ctx.lineTo(Math.cos(an) * rr2, Math.sin(an) * rr2); } ctx.closePath(); ctx.fill(); ctx.restore(); }

  const style = {
    id: 'cel-anime-80s', name: '80s Cel Anime', family: 'Animation',
    fonts: [], palette: { bg: P.screen, ink: P.line, accent: P.pink, cyan: P.cyan, gold: P.gold },
    sfx: { draw: null, land: 'blip', emphasis: 'stamp', transition: 'glitch', bed: 'tape' },

    // the CRT housing around the picture (dark plastic, a faint sheen)
    background(ctx, W, H, t, o = {}) {
      const bg = K.cached(`cel-house:${W}x${H}`, () => { const c = K.layer(W, H), x = c.getContext('2d'); const g = x.createLinearGradient(0, 0, W, H); g.addColorStop(0, '#2a2133'); g.addColorStop(0.5, P.house); g.addColorStop(1, '#0b080f'); x.fillStyle = g; x.fillRect(0, 0, W, H);
        const r = K.rng(4); for (let i = 0; i < 1600; i++) { x.fillStyle = `rgba(255,255,255,${r() * 0.025})`; x.fillRect(r() * W, r() * H, 2, 2); } return c; });
      ctx.drawImage(bg, 0, 0, W, H);
    },

    // o.screen: the picture tube (bezel, dark glass) around the story rect; o.tape: a dark tape-caption panel;
    // otherwise a flat cel card (o.fill) with a coloured line
    box(ctx, x, y, w, h, p, o = {}) {
      const s = sOf(ctx), k = (o.screen || o.tape) ? 1 : K.ease.out(K.clamp(p * 1.5)); if (k <= 0) return;
      ctx.save(); ctx.translate(x + w / 2, y + h / 2); ctx.scale(k, k); ctx.translate(-(x + w / 2), -(y + h / 2));
      if (o.screen || o.tape) {
        const m = 14 * s; rr(ctx, x - m, y - m, w + 2 * m, h + 2 * m, 34 * s); ctx.fillStyle = '#050307'; ctx.fill();
        const g = ctx.createLinearGradient(x, y - m, x, y + h + m); g.addColorStop(0, 'rgba(255,255,255,0.10)'); g.addColorStop(0.1, 'rgba(255,255,255,0)'); ctx.strokeStyle = g; ctx.lineWidth = 3 * s; ctx.stroke();
        rr(ctx, x, y, w, h, 26 * s); ctx.fillStyle = o.tape ? '#0e0b16' : (o.fill || P.screen); ctx.fill();
      } else {
        ctx.fillStyle = o.fill || P.cream; ctx.fillRect(x, y, w, h); ctx.strokeStyle = o.line || P.line; ctx.lineWidth = (o.lw ? o.lw * 0.4 : 3) * s; ctx.strokeRect(x, y, w, h);
      }
      ctx.restore();
    },

    // videotape on a CRT: halation, chroma bleed (red shifted right), scanlines, darkened corners, faint noise
    finish(ctx, W, H, t) {
      const cv = ctx.canvas;
      const q = lay('q', Math.round(W / 4), Math.round(H / 4)), qx = q.getContext('2d'), q2 = lay('q2', q.width, q.height), q2x = q2.getContext('2d');
      qx.globalCompositeOperation = 'copy'; qx.drawImage(cv, 0, 0, q.width, q.height);
      q2x.globalCompositeOperation = 'copy'; q2x.filter = 'blur(5px)'; q2x.drawImage(q, 0, 0); q2x.filter = 'none';
      q2x.globalCompositeOperation = 'multiply'; q2x.fillStyle = '#ffb08a'; q2x.fillRect(0, 0, q.width, q.height);   // halation is warm
      ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = 0.28; ctx.drawImage(q2, 0, 0, W, H); ctx.restore();
      const r = lay('red', W, H), rx = r.getContext('2d');
      rx.globalCompositeOperation = 'copy'; rx.drawImage(cv, 0, 0); rx.globalCompositeOperation = 'multiply'; rx.fillStyle = '#ff1010'; rx.fillRect(0, 0, W, H);
      ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = 0.16; ctx.drawImage(r, 3, 0); ctx.restore();
      const sl = K.cached(`cel-scan:${W}`, () => { const c = K.layer(8, 4), x = c.getContext('2d'); x.fillStyle = 'rgba(0,0,0,0.20)'; x.fillRect(0, 3, 8, 1); x.fillStyle = 'rgba(0,0,0,0.07)'; x.fillRect(0, 0, 8, 1); return c; });
      ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = ctx.createPattern(sl, 'repeat'); ctx.globalCompositeOperation = 'multiply'; ctx.fillRect(0, 0, W, H); ctx.restore();
      K.vignette(ctx, W, H, 0.32, '#000000');
      K.grain(ctx, W, H, t, 0.045, 10, 'overlay');
    },

    // a backlit chrome title flickering on at 12 fps, a star glint sweeping across (o.font: 'Lalezar' for Arabic)
    title(ctx, text, x, y, p, o = {}) {
      const s = sOf(ctx), size = (o.size || 64) * s; if (p <= 0) return { w: 0, h: 0 };
      if (p < 0.3 && Math.floor(p * 40) % 3 === 1) return { w: 0, h: 0 };   // flicker on
      ctx.save(); ctx.font = o.font ? `400 ${size}px "${o.font}"` : `italic 800 ${size}px "${SANS}"`; const w = ctx.measureText(text).width; ctx.restore();
      const cx = o.align === 'left' ? x + w / 2 : o.align === 'right' ? x - w / 2 : x;
      ctx.save(); ctx.globalAlpha *= K.clamp(p * 3); chromeText(ctx, text, cx, y - size * 0.35, size, o); ctx.restore();
      if (p > 0.45 && p < 0.9) star(ctx, cx - w / 2 + w * K.clamp((p - 0.45) / 0.4), y - size * 0.7, size * 0.55, Math.sin(Math.PI * K.clamp((p - 0.45) / 0.45)));
      return { w, h: size };
    },

    // a boxed tag: dark translucent box, thin cyan rule, cream semi-condensed text (o.balloon: rounded, tail toward o.to)
    label(ctx, text, x, y, p, o = {}) {
      const s = sOf(ctx), size = (o.size || 34) * s, k = K.clamp(p * 3); if (k <= 0) return { w: 0, h: 0 };
      if (p < 0.12 && Math.floor(p * 60) % 2) return { w: 0, h: 0 };
      ctx.save(); ctx.font = `600 ${size}px "${SANS}"`; const tw = ctx.measureText(text).width; ctx.restore();
      const w = tw + size * 0.9, h = size * 1.45, x0 = o.align === 'left' ? x : o.align === 'right' ? x - w : x - w / 2, y0 = y - size * 0.3 - h / 2;
      ctx.save(); ctx.globalAlpha *= k;
      if (o.balloon && o.to) { ctx.fillStyle = 'rgba(14,10,24,0.86)'; ctx.beginPath(); ctx.moveTo(x0 + w * 0.4, y0 + h); ctx.lineTo(o.to[0], o.to[1]); ctx.lineTo(x0 + w * 0.6, y0 + h); ctx.fill(); }
      rr(ctx, x0, y0, w, h, o.balloon ? h / 2 : 6 * s); ctx.fillStyle = o.fill || 'rgba(14,10,24,0.86)'; ctx.fill(); ctx.strokeStyle = o.rule || P.cyan; ctx.lineWidth = 2.5 * s; ctx.stroke();
      ctx.font = `600 ${size}px "${SANS}"`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = o.color || P.cream; ctx.fillText(text, x0 + w / 2, y0 + h / 2 + size * 0.04);
      ctx.restore(); return { w, h };
    },

    // a neon light streak drawn on, white core over a coloured glow
    arrow(ctx, from, to, p, o = {}) {
      const s = sOf(ctx), all = K.arcPts(from, to, o.bend ?? 0.1, 36), q = K.trim(all, K.clamp(p)); if (q.length < 2) return null;
      const end = q[q.length - 1], pre = q[Math.max(0, q.length - 4)], a = Math.atan2(end[1] - pre[1], end[0] - pre[0]), hd = 26 * s, col = o.color || P.cyan;
      const path = () => { ctx.beginPath(); K.poly(ctx, q); ctx.moveTo(end[0] + Math.cos(a + 2.6) * hd, end[1] + Math.sin(a + 2.6) * hd); ctx.lineTo(end[0], end[1]); ctx.lineTo(end[0] + Math.cos(a - 2.6) * hd, end[1] + Math.sin(a - 2.6) * hd); };
      ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.shadowColor = col; ctx.shadowBlur = 18 * s; ctx.strokeStyle = col; ctx.lineWidth = (o.width || 12) * s; path(); ctx.stroke();
      ctx.shadowBlur = 0; ctx.strokeStyle = '#ffffff'; ctx.lineWidth = (o.width || 12) * 0.35 * s; path(); ctx.stroke(); ctx.restore();
      return end;
    },

    counter(ctx, value, x, y, p, o = {}) {
      const s = sOf(ctx), size = (o.size || 120) * s, txt = K.fmt(value); if (p <= 0) return { w: 0, h: 0 };
      ctx.save(); ctx.globalAlpha *= K.clamp(p * 3); chromeText(ctx, txt, x, y - size * 0.3, size, { glow: o.color || P.cyan }); ctx.restore();
      return { w: size * txt.length * 0.5, h: size };
    },

    // impact frame: radial speed lines (dark and white wedges) around the hit, a 2-frame inverted flash at the start (o.rect),
    // then the word in chrome (o.word)
    emphasis(ctx, x, y, r, p, o = {}) {
      const s = sOf(ctx); if (p <= 0) return;
      if (o.rect && p < 0.07) { const [rx, ry, rw, rh] = o.rect; ctx.save(); ctx.globalCompositeOperation = 'difference'; ctx.fillStyle = '#ffffff'; ctx.fillRect(rx, ry, rw, rh); ctx.restore(); }
      const k = K.clamp(p * 2.5), rng = K.rng(o.seed || 21), n = 36;
      ctx.save(); ctx.globalAlpha *= (1 - K.clamp((p - 0.7) / 0.3)) * 0.85;
      for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2 + rng() * 0.08, w2 = 0.02 + rng() * 0.03, r0 = r * (0.55 + rng() * 0.25) * (2 - k), r1 = r * 3;
        ctx.fillStyle = i % 2 ? 'rgba(255,255,255,0.85)' : 'rgba(26,15,42,0.85)'; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r0, y + Math.sin(a) * r0); ctx.lineTo(x + Math.cos(a - w2) * r1, y + Math.sin(a - w2) * r1); ctx.lineTo(x + Math.cos(a + w2) * r1, y + Math.sin(a + w2) * r1); ctx.fill(); }
      ctx.restore();
      if (o.word !== '' && p > 0.12) chromeText(ctx, o.word || 'WOW!', x + r * (o.wx ?? 0), y - r * (o.wy ?? 0.9), 86 * s, { glow: P.pink, font: o.font });
    },

    // a white flash with a few frames of tape tracking noise (tearing bands) around the cut (p = 0.5 fully white)
    transition(ctx, W, H, p, o = {}) {
      const cv = ctx.canvas, rng = K.rng(1 + Math.floor(p * 24));
      if (p > 0.2 && p < 0.8) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); for (let i = 0; i < 5; i++) { const by = rng() * H, bh = 12 + rng() * 60, dx = (rng() - 0.5) * 90; ctx.drawImage(cv, 0, by, W, bh, dx, by, W, bh); ctx.fillStyle = 'rgba(255,255,255,0.18)'; ctx.fillRect(0, by + bh * 0.4, W, 3); } ctx.restore(); }
      const a = Math.max(0, 1 - Math.abs(p - 0.5) / 0.22);
      if (a > 0) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = a; ctx.fillStyle = '#fffaf2'; const [x, y, w, h] = o.rect || [0, 0, W, H]; ctx.fillRect(x, y, w, h); ctx.restore(); }
      if (o.caption && a > 0.6) { const s = S(W, H); ctx.save(); ctx.globalAlpha = (a - 0.6) / 0.4; chromeText(ctx, o.caption, W / 2, (o.rect ? o.rect[1] + o.rect[3] / 2 : H / 2), 70 * s, { glow: P.violet }); ctx.restore(); }
    },
  };
  MS.register(style);
})();
