# Updating the skill

- **A new improvement to a film** (helper, effect, camera move): add it to `engine/enhanced/helpers.js` (or `stage.js`/`subtitle.js`) as a small, named, documented function; use it from a scene to prove it; run `node $HP/tests/selftest.mjs`; add one line to `references/ORIGINAL-VS-ENHANCED.md`.
- **A new character** that is useful beyond one story: add a file to `examples/characters/` (own colour constants only, no duplicate global names) and list it in `examples/README.md`.
- **A new preset** (another language or typography): add `presets/<name>.json` with `fonts`, `unicodeRange`, `fontSampleText` and `subtitle`, put licensed fonts in `assets/fonts/` with their OFL, and extend the tests.
- **Never edit `engine/original/`.** If the style should change, change `enhanced` or a preset. If the original must be replaced by a newer official version, keep the old copy and update `PROVENANCE.md`.
- **New layouts:** add to `HP.LAYOUTS` in `stage.js` as `experimental`; mark `tested` only after a full film has been checked in it.
- Keep `SKILL.md` short; detail goes in `references/`.
- The four Kalila wa Dimna films are approved reference implementations; read from them but never modify them from this skill.
