# Kalila wa Dimna: series production rules

These rules apply **only to this series** (this repository: Arabic Story Shorts, GitHub `AmanSiddiqi1/arabic-story-shorts-animation`; on the original account the folder `Kalila wa Dimna/`). It is an independent project and is not part of another project or another project; their rules and films (for example The Train) do not apply here. Read [README.md](README.md) first, and [DEVELOPMENT_SETUP.md](DEVELOPMENT_SETUP.md) for Git, media locations, other accounts and backups.

## Format
- **9:16, 1080x1920, 30 fps**, H.264 (`libx264`, `-crf 20`, preset slow) + AAC 192 kbps at **48 kHz**. Final loudness about **-15 LUFS** (`loudnorm I=-15 TP=-1.5`, then `aresample=48000`).
- **A finished film is at most 3 minutes (180.0 s), THE END hold included.** The end hold is normally 1.5-6 s; when the narration is longer than 178.5 s the hold shrinks so the total is 180.0 s (THE END may appear under the last word). Checked by `tools/production/plancheck.py` and `tools/production/qc.py`.
- One self-contained HTML player per story (fonts, narration and library code embedded), with Play/Pause, scrub, sound and loop controls, plus an MP4 rendered by headless Chrome frame by frame. Every frame is a pure function of time `t` (randomness only from the seeded `K.rng`/`K.noise`).

## Folders
- **Not in Git:** spreadsheets (`Spreadsheets/`, incl. `Script_Updated.xlsx`, read by `tools/production/importer.py`), narration-production logs and transcripts in `Audio Files/` (only `Audio Files/Final Done/` word timings and the timing manifest are tracked).
- **Git vs media.** Git holds code, scripts, timings and docs. Audio, video, built players and `.zip` files never go into Git (`.gitignore`, `tools/git/check_staged.py`); they stay in this folder's **local media folders** (`MP4s/`, `Originals/`, `Audio Files/`, `Animations/<story>/`, `<story>/`): `media.config.json` default root `"."` (local mode, since 2026-11-16). A shared media folder (for example `/Users/Shared/ArabicStoryShorts`) is used only when `$ARABIC_STORY_MEDIA` or `.media-root` is set, for a future second account. Code reaches media only through `Library/media.py` / `Library/media.mjs`, never through an account-specific path.
- `<story>/` (for example `lion-and-the-hare/`): the supplied material only (scripts, narration recordings), kept as it was, recordings included (not in Git).
- `Animations/<story>/`: the animation project for that story. It holds `build.py`, `render.mjs`, `src/`, `timing.json`, the HTML player and stills. Animation folders made for a story always go here (an experiment gets its own folder, for example `Animations/lark-and-the-elephant-fable-experiment/`).
- Final MP4s: `MP4s/` (not in Git). Renders write there by default and refuse to overwrite an existing file. Test renders go elsewhere with `--out` (for example `scratch/<user>/`, or a temporary folder).
- `Originals/`: the pre-upgrade films; read-only (not in Git).
- `Library/`: the shared cast and set library, engine, new-story template and catalogue (see [Library/README.md](Library/README.md)).

## Look: "Halftone Pop Panel" (Print family, Creator OS Motion Style Atlas)
- Blown-up Lichtenstein comic panel: paper gutter, fat tapering black brush borders, blue Ben-Day dots, flat process yellow, red dot shading, Bangers lettering, aged-newsprint finish with a slipped cyan plate.
- Palette: paper `#fbf2da`, black `#141414`, yellow `#ffd21f`, red `#e2231a`, blue `#1d5bd0`, skin `#f05a5a`, white `#fffaf0` (plus a few derived tones such as greens and browns).
- `kit.js`, `sound.js` and `halftone-pop.js` are the Creator OS engine and style module, **kept unchanged** and **not stored in this repository**: they come from https://github.com/kevinbadi/claude-motion-faceless-skills (MIT), cloned beside this folder (`~/Downloads/Claude Code/claude-motion-faceless-skills`) and found by `Library/engine.py` (or `$MOTION_STYLES`). Never copy them back in (`.gitignore` blocks them). New stories take characters, props, effects and sets from `Library/`. A story's own code is its scene file(s): staging, acting, camera, timing and sound. Use the style's own primitives (title, label, arrow, box, counter, emphasis, transition, finish) and call `finish` last every frame.
- Phone legibility: headlines >= 44 px, labels >= 28 px at 1280x720 scale; no em or en dashes in on-screen text.

## Cloud rendering (default for production renders)
Normal renders run on **GitHub Actions** (free standard `ubuntu-24.04` runners, 4 cores) in the **public render repository** `AmanSiddiqi1/arabic-story-shorts-animation` (named in `tools/cloud/target.json`), not on this Mac. **Development stays in the private repository** (`origin`, `arabic-story-shorts-animation`); the public one only holds neutralised snapshots of it. Full guide: [tools/cloud/README.md](tools/cloud/README.md). The runner executes the same `build.py` -> `render.mjs` -> `tools/production/qc.py`; the animation engine is unchanged.
1. Develop locally (stills, contact sheet, `implcheck.py`; short test clips only). 2. Commit and **push to the private `main`**.
3. `python3 tools/git/sync_public.py --push` publishes the snapshot to the public repo (dry run without `--push`). It scans for personal data, secrets and media and refuses on any finding. `cloud.py submit` refuses unless the public snapshot is exactly the private HEAD (`cloud.py sync-check`).
4. `python3 tools/cloud/cloud.py inputs <ID>` (once per story: the final narration MP3 from `Audio Files/Final Done/` goes to the PRIVATE repo's `narration-inputs` Release; the public runner reads it with the secrets `NARRATION_REPO` / `NARRATION_TOKEN`, a read-only token that expires and must be renewed), then `python3 tools/cloud/cloud.py submit <ID> [<ID>...] [--version vN]`.
5. `python3 tools/cloud/cloud.py status <run> --watch`, then `fetch <run>`: MP4 -> `Animations/<ID>/renders/<ID>_<version>.mp4`, QC json -> `qc/`, result recorded in production.db (an existing file is never overwritten without `--force`). `cloud.py list` re-finds runs after an interrupted session. `purge` removes leftover artifacts.
6. If a film FAILS (the fetch prints the report and log path): fix the source, push, sync, submit again with the next version. Automated QC is technical only; the Fable visual review is still required.
7. Only after the owner approves a film: `cloud.py publish <ID> --run <run> --version vN --approved` creates the Release asset `<ID>-vN` in the render repository (not in Git history). That makes the film, with its narration, public.
- **Never upload narration MP3s to the public repository** (`inputs --to-render-repo` needs `--confirm-public-rights`, which only the owner may decide: AI-voice terms and text sources are not cleared). In a public repo, run artifacts (full MP4s) are downloadable by any signed-in GitHub user for 3 days, so unreleased films are not private while they are test artifacts.
- Limits: one run at a time, max 10 films render at once, 60 min per film, <= 8 films per submit, <= 100 submissions per rolling 24 h (local backstop); **more than 3 films needs the owner's OK first** (`--yes`); a same-source failure twice is refused; never use `--force/--override` without the owner's say-so.
- Only the 42 stories with `build.py` + `render.mjs` and a passing implcheck can render. KD-001..004 and KD-006 (older films) have no narration row and are local only; KD-005 and 74 AN stories have narration but no animation yet.
- Never commit MP4s, frames or narration recordings (`.gitignore`, `check_staged.py`).
- **Private fallback:** `python3 tools/cloud/cloud.py --private submit ...` runs the same workflow on the private repository (2-core runners, 2000 free minutes a month, artifact quota 500 MB; narration read from its own release). The local `render_queue.py` / `render.mjs` path is the last-resort fallback for troubleshooting.

## Layout
- Animation in the **top two-thirds** (panel at x 54..1026, y 54..1250). The **bottom third is a plain caption panel** (x 54..1026, y 1296..1862) holding only the subtitles.
- Subtitles: the **Arabic script verbatim** (diacritics included), large, right-to-left, centred; the **English translation below it, smaller, in blue (Bangers)**. Default Arabic font: **Noto Naskh Arabic 700**. (The Thief story also exists in Cairo and Scheherazade New.) Embed fonts as base64 so renders work offline.
- Subtitle chunks are 2-4 per paragraph, hand-marked with `|` (in `chunks_ar.txt` / `chunks_en.txt` for new stories; inside `align.py` for the finished ones); the chunk text is rebuilt from the original script words, so it is verbatim. Check both languages against the supplied text files by program.
- Use the supplied script files for the story you are working on. If narration is missing a paragraph, say so; never invent narration or timings.

## Sound
- **The narrator's recording is the soundtrack.** Add only sparse, quiet synthesized effects (pops, thuds, whooshes, chimes) via `SND` with `master: 0.6`, placed in gaps; they must never cover a word.
- Effects are rendered offline (`SND.renderOffline`) and mixed with the narration using `amix normalize=0`.

## Story and animation standards
- Tell the story in order with something changing every 1-2 s; arrows, labels and counters on the key beats; one `transition` (for example "LATER...") when time passes; a short held ending ("THE END") after the last word.
- Characters are blocky comic figures drawn in code. Short English comic words (HA HA!, PECK!, BOING!) may be added as visual lettering; they are not part of the script.
- Time every scene to the spoken words (see the transcription workflow). When the narration is replaced, re-transcribe and re-time everything (the Thief story used a time-warp table, `src/warp.js`, to remap an existing timeline).

## Working rules
- **Protect approved outputs.** Never render over a story's MP4/HTML without a backup; use `--out` and a scratch frames folder for tests. **Do not delete the frames folder until ffmpeg has printed "ffmpeg exit"** (the first Lark render was truncated that way).
- Check changes with stills and a contact sheet (`sh.sh`) before submitting a full render to the cloud (locally a full render is about 6-7 minutes with 3 workers; local full renders are now the fallback only).
- Rendering uses the shared **Lemo-Opuscar** library (Playwright, Chromium and the Python venv for PIL), a sibling of the repository folder (on this account `~/Downloads/Claude Code/lemo-opuscar`; on another account, for example `~/Developer/lemo-opuscar`). The scripts find it from their own location (or `$LIB` / `$LEMO_PY`). Never modify it or `git pull` it.
- No dependency outside this project folder: not `other project folders`, not other projects, not temporary folders. The only shared dependencies are `Library/` (inside this project), Lemo-Opuscar for rendering and the claude-motion-faceless-skills engine. The project does not use `/Users/Shared/ArabicStoryShorts` (the `<second-account>` account is reserved for another project).
- **Back up with `tools/backup.sh "what changed"`** (checks remote and branch, runs the regression test, refuses media and credentials, never force-pushes, reports whether local and GitHub match). Never force-push or rewrite history.
- **Halftone Pop skill:** the project copy `.claude/skills/halftone-pop/` (`/halftone-pop-shorts`) is authoritative for this project; a personal `~/.claude/skills/halftone-pop` is a separate copy and is not edited from here.

## Shared library (cast and sets)
- **Before staging any story, read [Library/Animation_Capabilities_Guide.md](Library/Animation_Capabilities_Guide.md)** (what the system can do, when to use it, and examples) and look at the catalogue. Update the guide whenever a capability is added or learned.
- **Production workflow for new stories:** Opus creates, a Fable 5.2 subagent reviews the rendered film (review pack: `python3 tools/review/make_pack.py <mp4> <timing.json> <out>`), Opus improves, an optional Fable comparison review, then the final render.
- **Shared code across stories is allowed and goes in `Library/`.** Start a new story by copying `Library/template/` to `Animations/<story>/`. Reuse the library's drawings, and spend the effort on staging, acting and motion.
- **Look first.** Before drawing anything new, check the catalogue (`Library/catalogue/cast.png`, `sets.png`) for an existing character, prop or set.
- **Grow the library with each story.** When a story needs a new character, prop, set or a new pose field, draw it in the story. Once it is approved, move it into `Library/` (one function per drawing, header comment, `registry.js` entry).
- **Backward compatible only.** Never change an existing drawing's default look. After any library change, run `node Library/tests/regression.mjs` (must report "all identical") and rebuild the catalogue.
- **Finished stories are protected by the regression test.** In the 2026-11 five-film upgrade (at the user's request) the five finished stories were rebuilt on the library; their pre-upgrade sources are in each story's `_pre_upgrade/` and the pre-upgrade MP4s in `Originals/`. Because they now load `Library/`, any library change must keep `node Library/tests/regression.mjs` at "all identical" and must not change how they render.
- **Shared acting fields.** Use them on every character: `gaze`, `lid` (with `blink`), `wet`, `sq`, `tip`. Use the motion helpers (`walk`, `footfalls`, `hop`, `landSquash`, `anticipate`...) so that legs never slide and every frame stays a pure function of `t`.

## Memory
This folder is its own Claude project, so its automatic memory belongs to Kalila wa Dimna only. Keep detailed standards in this file and `README.md`, and put only short pointers in memory.
