# Lessons and corrections from the four films (keep these)

- **Don't delete the render frames before ffmpeg finishes.** A first render was cut to 102 s of 195 because the frames folder was removed while ffmpeg was still reading it. `hp-render.mjs` deletes frames only after a successful exit.
- **Audio sample rate:** `loudnorm` upsamples; AAC then came out at 96 kHz. Always append `aresample=48000` after it.
- **Player loop bug:** `seek()` already restarts sound while playing; calling `startSound()` again doubled every effect after a loop and Pause could not stop the old context.
- **Camera framing:** clamp the camera inside the drawn world (otherwise empty panel colour shows); place the ground about 70 to 78% down the panel; extend floors/earth below the ground when the camera dips into a pit.
- **Arabic text:** never use `S.title`/`S.label` for Arabic (they split words, lay out left to right and uppercase). Draw it with `ctx.direction = 'rtl'` and Arabic-capable fonts; load fonts with Arabic sample text; use line height >= 1.7.
- **A recording that lacks a paragraph:** report it instead of inventing narration; the Thief audio first ended before its last paragraph.
- **Changed audio:** re-transcribe and re-time; a revised recording shifts every later scene (the Thief film used a warp table to remap its timeline).
- **Duplicated `const` declarations across files** break a single-scope page: shared constants (greens, soundArcs, layer cache) live in `helpers.js` only.
- **Static art:** cache at 2x (`layer1`); keep per-frame work to characters and effects.
- **Quality:** JPEG frames at 0.93, 30 fps, libx264 crf 20 (about 200 to 280 MB for 3 minutes); BT.709 flags; 3 workers.
- **Don't treat every experiment as approved:** the Thief film's Cairo and Scheherazade versions are alternatives, not replacements.
