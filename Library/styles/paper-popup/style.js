// Paper Pop-up Book (after Lemo-Opuscar style 41, adapted to 2D canvas for Arabic Story Shorts). A pop-up book open on a
// real wooden desk under a warm lamp: cut-paper cards with an off-white border, a grey cardboard edge and cut-out shadows;
// titles are cardboard signs on strings, words are paper tags and bubbles, the scene change is a page turn.
// Same primitives and signatures as every Creator OS style (STYLE_CONTRACT.md), so scenes can swap styles.
(function () {
  const P = { paper: '#f4ead5', ink: '#4a2c1a', yellow: '#f7c948', red: '#e4572e', blue: '#4a90d9', white: '#fffaf0', edge: '#9a8c78', cover: '#8e2f2b', coverD: '#5e1c1a', page: '#efe3c8' };
  const DISPLAY = 'Lilita One', SANS = 'Fredoka', SERIF = 'IM Fell English';
  const S = (W, H) => K.layout(W, H).s;
  const sOf = (ctx) => S(ctx.canvas.width, ctx.canvas.height);
  const grainPat = (ctx) => { const tile = K.cached('ppm-grain', () => { const n = 160, c = K.layer(n, n), x = c.getContext('2d'), r = K.rng(71); for (let i = 0; i < 900; i++) { const v = r(); x.fillStyle = v < 0.5 ? 'rgba(120,90,60,0.10)' : 'rgba(255,255,255,0.16)'; x.fillRect(r() * n, r() * n, 1 + r() * 2.2, 0.6 + r() * 0.9); } return c; }); return ctx.createPattern(tile, 'repeat'); };
  const wob = (pts, amp, seed) => { const g = K.noise(seed); return pts.map(([x, y], i) => [x + g.n2(i * 0.17, 1) * amp, y + g.n2(i * 0.17, 7) * amp]); };
  const dense = (pts, step) => { const out = []; for (let i = 1; i < pts.length; i++) { const [a, b] = [pts[i - 1], pts[i]], n = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / step)); for (let k = 0; k < n; k++) out.push([K.lerp(a[0], b[0], k / n), K.lerp(a[1], b[1], k / n)]); } out.push(pts[pts.length - 1]); return out; };
  const rr = (x, y, w, h, r) => { const q = []; const c = [[x + w - r, y + r, -Math.PI / 2], [x + w - r, y + h - r, 0], [x + r, y + h - r, Math.PI / 2], [x + r, y + r, Math.PI]]; for (const [cx, cy, a0] of c) for (let i = 0; i <= 5; i++) { const a = a0 + i / 5 * Math.PI / 2; q.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); } q.push(q[0]); return q; };
  // a paper card: cut-out shadow, cardboard edge, fill, grain, brown ink outline
  function card(ctx, pts, fill, s, o = {}) {
    const p = wob(dense(pts, 14 * s), (o.wob ?? 1.2) * s, o.seed || 3);
    ctx.save();
    if (o.shadow !== false) { ctx.fillStyle = 'rgba(42,26,14,0.22)'; ctx.translate(6 * s, 8 * s); K.poly(ctx, p, true); ctx.fill(); ctx.translate(-6 * s, -8 * s); }
    ctx.fillStyle = P.edge; ctx.translate(0, 4 * s); K.poly(ctx, p, true); ctx.fill(); ctx.translate(0, -4 * s);
    ctx.fillStyle = fill; K.poly(ctx, p, true); ctx.fill();
    ctx.save(); K.poly(ctx, p, true); ctx.clip(); ctx.globalAlpha = 0.55; ctx.fillStyle = grainPat(ctx); ctx.fillRect(-1e4, -1e4, 2e4, 2e4); ctx.restore();
    if (o.lw !== 0) { ctx.strokeStyle = o.ink || P.ink; ctx.lineWidth = (o.lw || 4) * s; ctx.lineJoin = 'round'; K.poly(ctx, p, true); ctx.stroke(); }
    ctx.restore();
  }
  function outlinedText(ctx, text, x, y, size, font, weight, fill, s, o = {}) {
    ctx.save(); ctx.font = `${o.italic ? 'italic ' : ''}${weight} ${size}px "${font}"`; ctx.textAlign = o.align || 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
    if (o.stroke2) { ctx.lineWidth = size * 0.3; ctx.strokeStyle = o.stroke2; ctx.strokeText(text, x, y); }
    if (o.stroke !== false) { ctx.lineWidth = size * (o.sw || 0.16); ctx.strokeStyle = o.stroke || P.ink; ctx.strokeText(text, x, y); }
    ctx.fillStyle = fill; ctx.fillText(text, x, y); ctx.restore();
  }

  const style = {
    id: 'paper-popup', name: 'Paper Pop-up Book', family: 'Materials & 3D',
    fonts: [], palette: { bg: P.paper, ink: P.ink, accent: P.red, yellow: P.yellow, blue: P.blue, red: P.red },
    sfx: { draw: null, land: 'paper', emphasis: 'pop', transition: 'paper', bed: 'room' },

    // the real world: a wooden desk under a warm lamp (painted once per size)
    background(ctx, W, H, t, o = {}) {
      const desk = K.cached(`ppm-desk:${W}x${H}`, () => {
        const c = K.layer(W, H), x = c.getContext('2d'), g = K.noise(5), r = K.rng(9);
        x.fillStyle = '#7a4a2a'; x.fillRect(0, 0, W, H);
        const pw = W / 5;
        for (let i = 0; i < 6; i++) {   // planks with grain
          const x0 = i * pw - pw * 0.3, base = ['#80502e', '#744627', '#86563a', '#7a4b2b', '#83533a', '#764829'][i];
          x.fillStyle = base; x.fillRect(x0, 0, pw, H);
          for (let k = 0; k < 26; k++) { const gx = x0 + r() * pw; x.strokeStyle = `rgba(${r() < 0.5 ? '40,20,8' : '150,100,60'},${0.08 + r() * 0.1})`; x.lineWidth = 1 + r() * 2.5; x.beginPath(); for (let y = 0; y <= H; y += 40) x.lineTo(gx + g.n2(y * 0.004 + k, i) * 18, y); x.stroke(); }
          x.fillStyle = 'rgba(30,14,4,0.45)'; x.fillRect(x0 + pw - 2, 0, 3, H);
        }
        const lamp = x.createRadialGradient(W * 0.25, H * 0.12, 20, W * 0.25, H * 0.12, H * 0.95); lamp.addColorStop(0, 'rgba(255,214,150,0.55)'); lamp.addColorStop(0.5, 'rgba(255,190,120,0.12)'); lamp.addColorStop(1, 'rgba(0,0,0,0.35)');
        x.fillStyle = lamp; x.fillRect(0, 0, W, H); return c;
      });
      ctx.drawImage(desk, 0, 0, W, H);
    },

    // o.book: the open pop-up book around the story rect (cloth cover, page block, gutter); o.card: a paper card (captions);
    // otherwise a coloured paper card. p = 0..1 pop-in.
    box(ctx, x, y, w, h, p, o = {}) {
      const s = sOf(ctx), k = o.book ? 1 : K.ease.back(K.clamp(p * 1.3)); if (k <= 0) return;
      ctx.save(); ctx.translate(x + w / 2, y + h / 2); ctx.scale(k, k); ctx.translate(-(x + w / 2), -(y + h / 2));
      if (o.book) {
        const m = 22 * s;
        ctx.fillStyle = 'rgba(20,10,4,0.45)'; ctx.fillRect(x - m + 14 * s, y - m + 22 * s, w + 2 * m, h + 2 * m);   // book shadow on the desk
        ctx.fillStyle = P.coverD; ctx.fillRect(x - m, y - m, w + 2 * m, h + 2 * m);
        ctx.fillStyle = P.cover; ctx.fillRect(x - m + 4 * s, y - m + 4 * s, w + 2 * m - 8 * s, h + 2 * m - 8 * s);
        ctx.save(); ctx.globalAlpha = 0.35; ctx.fillStyle = grainPat(ctx); ctx.fillRect(x - m, y - m, w + 2 * m, h + 2 * m); ctx.restore();
        for (let i = 0; i < 5; i++) { ctx.fillStyle = i % 2 ? '#e2d4b4' : '#f3e8cf'; ctx.fillRect(x - 6 * s + i * s, y - 6 * s + i * s, w + 12 * s - 2 * i * s, h + 12 * s - 2 * i * s); }   // page block edges
        ctx.fillStyle = o.fill || P.page; ctx.fillRect(x, y, w, h);
      } else {
        card(ctx, rr(x, y, w, h, Math.min(w, h) * 0.06), o.card ? (o.fill || P.white) : (o.fill || P.yellow), s, { seed: o.seed || 6, lw: o.lw ? o.lw * 0.45 : 4 });
      }
      ctx.restore();
    },

    finish(ctx, W, H, t) {
      // warm lamp grade, page grain, a soft vignette (the macro lens)
      ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = 0.10; ctx.fillStyle = '#ffd9a0'; ctx.fillRect(0, 0, W, H); ctx.restore();
      ctx.save(); ctx.globalCompositeOperation = 'soft-light'; ctx.globalAlpha = 0.35; ctx.fillStyle = grainPat(ctx); ctx.fillRect(0, 0, W, H); ctx.restore();
      K.vignette(ctx, W, H, 0.22, '#2a1406');
      K.grain(ctx, W, H, t, 0.035, 12, 'soft-light');
    },

    // a cardboard sign dropping on two strings and swinging to rest (o.size, o.fill, o.font)
    title(ctx, text, x, y, p, o = {}) {
      const s = sOf(ctx), size = (o.size || 60) * s; if (p <= 0) return { w: 0, h: 0 };
      ctx.save(); ctx.font = `400 ${size}px "${o.font || DISPLAY}"`; const tw = ctx.measureText(text).width; ctx.restore();
      const w = tw + size * 1.1, h = size * 1.55, drop = (1 - K.ease.back(K.clamp(p * 1.6))) * (y + h + 80 * s);
      const sw = 0.06 * Math.exp(-p * 5) * Math.sin(p * 16), x0 = o.align === 'left' ? x : o.align === 'right' ? x - w : x - w / 2, cy = y - drop;
      ctx.save(); ctx.translate(x0 + w / 2, cy - h * 0.5 - 140 * s); ctx.rotate(sw); ctx.translate(-(x0 + w / 2), -(cy - h * 0.5 - 140 * s));
      ctx.strokeStyle = '#6b5a48'; ctx.lineWidth = 2 * s; for (const sx of [x0 + w * 0.2, x0 + w * 0.8]) { ctx.beginPath(); ctx.moveTo(sx, cy - h - 400 * s); ctx.lineTo(sx, cy - h * 0.85); ctx.stroke(); }
      card(ctx, rr(x0, cy - h, w, h, size * 0.25), o.fill || P.yellow, s, { seed: 11, lw: 4.5 });
      outlinedText(ctx, text, x0 + w / 2, cy - h / 2 + size * 0.04, size, o.font || DISPLAY, 400, o.color || P.white, s, { stroke: P.ink, sw: 0.2 });
      ctx.restore(); return { w, h };
    },

    // a paper tag (or a speech bubble card with o.balloon, its tail toward o.to = [x, y]); the text types on with p
    label(ctx, text, x, y, p, o = {}) {
      const s = sOf(ctx), size = (o.size || 36) * s, k = K.ease.back(K.clamp(p * 2.2)); if (k <= 0.04) return { w: 0, h: 0 };   // (a tail divided by a tiny k would be huge)
      ctx.save(); ctx.font = `600 ${size}px "${o.font || SANS}"`; const tw = ctx.measureText(text).width; ctx.restore();
      const w = tw + size * 1.0, h = size * 1.5, x0 = o.align === 'left' ? x : o.align === 'right' ? x - w : x - w / 2, cy = y - size * 0.3;
      ctx.save(); ctx.translate(x0 + w / 2, cy); ctx.scale(k, k); ctx.rotate(o.tilt ?? -0.02);
      if (o.balloon) {
        let tx = o.to ? (o.to[0] - (x0 + w / 2)) / k : -w * 0.3, ty = o.to ? (o.to[1] - cy) / k : h * 1.4;
        const tl = Math.hypot(tx, ty), cap = 700 * s; if (tl > cap) { tx *= cap / tl; ty *= cap / tl; }   // keep the tail a sane length
        const pts = K.circlePts(0, 0, w * 0.6, h * 0.82, 44);
        const a = Math.atan2(ty, tx), tail = [[Math.cos(a - 0.3) * w * 0.45, Math.sin(a - 0.3) * h * 0.6], [tx, ty], [Math.cos(a + 0.3) * w * 0.45, Math.sin(a + 0.3) * h * 0.6]];
        card(ctx, tail.concat([tail[0]]), P.white, s, { seed: 5, lw: 3.5, shadow: false });
        card(ctx, pts, P.white, s, { seed: 4, lw: 4 });
      } else card(ctx, rr(-w / 2, -h / 2, w, h, h * 0.22), o.fill || P.white, s, { seed: o.seed || 4, lw: 3.5 });
      const n = Math.ceil(text.length * K.clamp((p - 0.15) / 0.6));
      ctx.font = `600 ${size}px "${o.font || SANS}"`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = o.color || P.ink;
      ctx.fillText(text.slice(0, n), 0, size * 0.05); ctx.restore(); return { w, h };
    },

    // a cut-paper arrow strip that grows on with p
    arrow(ctx, from, to, p, o = {}) {
      const s = sOf(ctx), all = K.arcPts(from, to, o.bend ?? 0.15, 36), q = K.trim(all, K.clamp(p)); if (q.length < 2) return null;
      const w = (o.width || 20) * s, end = q[q.length - 1], pre = q[Math.max(0, q.length - 4)], ang = Math.atan2(end[1] - pre[1], end[0] - pre[0]);
      const L = [], R = []; q.forEach((pt, i) => { const a2 = q[Math.max(0, i - 1)], b2 = q[Math.min(q.length - 1, i + 1)], dx = b2[0] - a2[0], dy = b2[1] - a2[1], l = Math.hypot(dx, dy) || 1, hw = w * 0.5; L.push([pt[0] - dy / l * hw, pt[1] + dx / l * hw]); R.push([pt[0] + dy / l * hw, pt[1] - dx / l * hw]); });
      const px = -Math.sin(ang), py = Math.cos(ang), hd = w * 1.3, tip = [end[0] + Math.cos(ang) * hd, end[1] + Math.sin(ang) * hd];
      card(ctx, [...L, [end[0] + px * w * 1.1, end[1] + py * w * 1.1], tip, [end[0] - px * w * 1.1, end[1] - py * w * 1.1], ...R.reverse(), L[0]], o.color || P.red, s, { seed: 8, lw: 3.5 });
      return end;
    },

    // a round paper badge with the number
    counter(ctx, value, x, y, p, o = {}) {
      const s = sOf(ctx), size = (o.size || 110) * s, txt = K.fmt(value), k = K.ease.back(K.clamp(p * 1.5)); if (k <= 0) return { w: 0, h: 0 };
      ctx.save(); ctx.font = `400 ${size}px "${DISPLAY}"`; const r = Math.max(ctx.measureText(txt).width * 0.62, size * 0.75); ctx.restore();
      ctx.save(); ctx.translate(x, y - size * 0.3); ctx.scale(k, k);
      const pts = []; for (let i = 0; i <= 32; i++) { const a = i / 32 * Math.PI * 2, rr2 = r * (i % 2 ? 0.94 : 1); pts.push([Math.cos(a) * rr2, Math.sin(a) * rr2]); }
      card(ctx, pts, o.fill || P.yellow, s, { seed: 12, lw: 4.5 });
      outlinedText(ctx, txt, 0, size * 0.05, size, DISPLAY, 400, o.color || P.white, s, { stroke: P.ink, sw: 0.18 });
      ctx.restore(); return { w: r * 2, h: size };
    },

    // an action word like a game rating: paper rays behind, italic display word with a double stroke (o.word)
    emphasis(ctx, x, y, r, p, o = {}) {
      const s = sOf(ctx), k = K.ease.back(K.clamp(p * 1.4)); if (k <= 0) return;
      ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
      const n = 12; for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2 + p * 0.4, a2 = a + Math.PI / n * 0.8; card(ctx, [[0, 0], [Math.cos(a) * r, Math.sin(a) * r * 0.8], [Math.cos(a2) * r, Math.sin(a2) * r * 0.8], [0, 0]], i % 2 ? P.yellow : '#fbe29a', s, { seed: 30 + i, lw: 2.5, shadow: false }); }
      if (o.word !== '') outlinedText(ctx, o.word || 'WOW!', 0, 0, 74 * s, DISPLAY, 400, P.red, s, { italic: true, stroke: P.white, sw: 0.16, stroke2: P.ink });
      ctx.restore();
    },

    // page turn: a leaf hinged at the spine (right edge of o.rect, the panel) falls flat over the story (p = 0.5 covered,
    // its paper back shows o.caption in storybook serif), then lifts back off the new spread.
    transition(ctx, W, H, p, o = {}) {
      const s = S(W, H), [x, y, w, h] = o.rect || [54, 54, 972, 1196], hx = x + w;
      const f = p < 0.5 ? K.ease.inOut(p / 0.5) : 1 - K.ease.inOut((p - 0.5) / 0.5), lw = w * f, curl = Math.sin(Math.PI * f) * 70 * s;
      if (lw < 2) return;
      ctx.save(); ctx.beginPath(); ctx.rect(x - 30 * s, y - 30 * s, w + 60 * s, h + 60 * s); ctx.clip();
      ctx.fillStyle = 'rgba(40,22,8,0.30)'; ctx.fillRect(hx - lw - 30 * s, y, 30 * s, h);   // the leaf's shadow on the page
      ctx.beginPath(); ctx.moveTo(hx, y); ctx.lineTo(hx - lw, y - curl * 0.25); ctx.quadraticCurveTo(hx - lw - curl, y + h / 2, hx - lw, y + h + curl * 0.25); ctx.lineTo(hx, y + h); ctx.closePath();
      const g = ctx.createLinearGradient(hx - lw - curl, 0, hx, 0); g.addColorStop(0, '#d8c8a6'); g.addColorStop(0.25, '#f6eddb'); g.addColorStop(0.85, '#efe3c8'); g.addColorStop(1, '#cdbb98');
      ctx.fillStyle = g; ctx.fill(); ctx.save(); ctx.clip(); ctx.globalAlpha = 0.5; ctx.fillStyle = grainPat(ctx); ctx.fillRect(x - 100, y - 100, w + 200, h + 200); ctx.restore();
      ctx.strokeStyle = 'rgba(74,44,26,0.5)'; ctx.lineWidth = 2 * s; ctx.stroke();
      if (o.caption && f > 0.75) { ctx.globalAlpha = K.clamp((f - 0.75) / 0.2); ctx.font = `italic 400 ${70 * s}px "${SERIF}"`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = P.ink; ctx.fillText(o.caption, hx - lw / 2, y + h * 0.45); }
      ctx.restore();
    },
  };
  MS.register(style);
})();
