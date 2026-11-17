(async function () {
  const S = MS.styles['halftone-pop'], cv = document.getElementById('c'), ctx = cv.getContext('2d'), W = 1080, H = 1920, D = SCENE.duration;
  const $ = (i) => document.getElementById(i), nar = $('nar');
  const specs = [['400 60px "Bangers"', 'Abc'], [`${window.ARABIC_WEIGHT} 60px "${window.ARABIC_FONT}"`, 'لُصوص «شُولَمْ»،']];
  await Promise.all(specs.map(([f, s]) => document.fonts.load(f, s)));
  let t = 0, playing = false, stopFx = null, t0 = 0, from = 0;
  const fmt = (x) => Math.floor(x / 60) + ':' + String(Math.floor(x % 60)).padStart(2, '0');
  const draw = () => { SCENE.draw(ctx, W, H, t, S); $('sc').value = (t / D) * 1000; $('tm').textContent = fmt(t) + ' / ' + fmt(D); };
  const stopSound = () => { try { nar.pause(); } catch (e) {} if (stopFx) { try { stopFx(); } catch (e) {} stopFx = null; } };
  const startSound = () => { if (!$('snd').checked) return; try { nar.currentTime = Math.min(t, nar.duration || t); nar.play(); } catch (e) {} stopFx = SND.live((k) => SCENE.score(k, S), t, { master: 0.6 }); };
  const tick = () => { if (!playing) return; t = from + (performance.now() - t0) / 1000; if (t >= D) { if ($('lp').checked) { seek(0); return requestAnimationFrame(tick); } t = D; setPlay(false); } draw(); requestAnimationFrame(tick); };
  function setPlay(on) { playing = on; $('pp').textContent = on ? 'Pause' : 'Play'; stopSound(); if (on) { from = t; t0 = performance.now(); startSound(); requestAnimationFrame(tick); } }
  function seek(x) { t = Math.max(0, Math.min(D, x)); draw(); if (playing) { stopSound(); from = t; t0 = performance.now(); startSound(); } }
  $('pp').onclick = () => setPlay(!playing);
  $('sc').oninput = (e) => seek((e.target.value / 1000) * D);
  $('snd').onchange = () => { if (playing) { stopSound(); if ($('snd').checked) startSound(); } };
  window.seek = (x) => { t = x; draw(); };
  window.DURATION = D; window.scoreSound = (k) => SCENE.score(k, S);
  draw(); window.__ready = true;
})();
