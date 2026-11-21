> **About this public repository.** Source code, story plans, subtitle timings and production tools for *Arabic Story Shorts*
> (animated Kalila wa Dimna and One Thousand and One Nights fables, 9:16, Arabic narration with Arabic and English subtitles).
> Not included: narration audio, rendered videos, built players and the scripts workbook. Rendering needs two external
> repositories cloned next to this folder: the Creator OS engine,
> [kevinbadi/claude-motion-faceless-skills](https://github.com/kevinbadi/claude-motion-faceless-skills) (MIT), and the renderer,
> [lemomo-ai/lemo-opuscar](https://github.com/lemomo-ai/lemo-opuscar) (MIT). Fonts are under the SIL Open Font License (see the font folders).

# Kalila wa Dimna: animated stories (Halftone Pop Panel series)

Vertical 9:16 animated retellings of stories from *Kalila wa Dimna*, each with the narrator's recording as the soundtrack and the Arabic script burned in as subtitles (English smaller, below). Everything is drawn in code (canvas 2D) in the "Halftone Pop Panel" style (Creator OS Motion Style Atlas), played as one self-contained HTML player per story and rendered to MP4 in headless Chrome.

This is an independent project, **Arabic Story Shorts** (GitHub repository `AmanSiddiqi1/arabic-story-shorts-animation`; on the original account the folder `~/Downloads/Claude Code/Kalila wa Dimna/`). Large media (MP3, MP4, players) are not in Git: they stay in this folder's local media folders (`media.config.json` local mode); a shared media folder is optional, for another account. Setup on another account, media locations, tests and the backup command (`tools/backup.sh`): [DEVELOPMENT_SETUP.md](DEVELOPMENT_SETUP.md). Series rules: [CLAUDE.md](CLAUDE.md). Transcription recipe: [tools/transcription/README.md](tools/transcription/README.md).

## Layout
```
Kalila wa Dimna/
  source/Kalila wa Dimna.pdf          the source book
  <story>/                            supplied material for each story, kept as it was
    *.mp3, Audio/, Original Longer version/   original narration recordings (as supplied)
    *.txt                              Arabic, English and pause-marked scripts (as supplied)
  Animations/<story>/                 the animation project: src/, build.py, align.py, render.mjs, stills.mjs, fonts/,
                                       narration.mp3 (the copy the video was built on), timing.json, whisper.json,
                                       the player .html, stills/
  Animations/lark-and-the-elephant-fable-experiment/   Fable 5.2 director experiment (20.2-46.5 s re-staged; see its README)
  (media)                            since 2026-11-21 in ../Arabic Story Media/ (Audio/Final, Audio/Earlier versions, Renders, Final MP4s, Working files); see CLAUDE.md
  .claude/skills/halftone-pop/        project Halftone Pop skill (/halftone-pop-shorts), authoritative for this project
  media.config.json, tools/media/      the media setting (local by default), shared-folder copy/verify and timing checks
  tools/backup.sh, tools/git/          guarded GitHub backup, staged-file guard and hooks
  tools/setup/                         environment check, smoke render with sync check
  Library/                            shared cast and set library, engine, new-story template, catalogue, regression test
  tools/transcription/                 how to recreate the transcription environment (+ tx.py)
  tools/ptest.mjs                      headless player test (Play, scrub, loop, Pause)
  checksums/                           SHA-256 records of the migration and of the 2026-11-15 MP4 move
```
**New stories** start from `Library/template/` (copied to `Animations/<story>/`) and take their characters, props and sets from `Library/` (see [Library/README.md](Library/README.md) and the catalogue `Library/catalogue/cast.png`, `sets.png`).
**The five finished stories** were upgraded on 2026-11-16 and load the shared `Library/` (their pre-upgrade sources are in `Animations/<story>/_pre_upgrade/`). The approved players embed the Library as it was when each was built; a rebuild today includes later backward-compatible Library additions, so its bytes differ while the pictures stay the same (`node Library/tests/regression.mjs`: all identical; `tools/setup/smoke_test.sh`: same frames and narration sync as the approved film).
Reorganised on 2026-11-15: `<story>/Halftone Pop/` moved to `Animations/<story>/`, and the final MP4s moved to `MP4s/` (checksums verified: `checksums/mp4s-before-move-2026-11-15.txt`).

## Inventory (5 stories, all with a finished video)
| Story | Folder (supplied material; animation in `Animations/<folder>/`, video in `MP4s/`) | Narration used for the current video | Main source | Videos (1080x1920, 30 fps, H.264 + AAC) | Status |
|---|---|---|---|---|---|
| The Thief and the Moonbeam | `thief-and-the-moonbeam/` | `Audio/Combined_and slowed.mp3` (164.6 s; the build reads `../../thief-and-the-moonbeam/Audio/`) | `src/scene_a.js`, `scene_b.js`, `warp.js` | Noto Naskh Arabic, 166 s (Cairo and Scheherazade New players kept; their MP4s were removed by the owner on 2026-11-16) | Finished; the Arabic font is the only difference between versions |
| The Monkey and the Turtle | `monkey-and-the-turtle/` | `The_Monkey_and_the_Turtle_9_Paragraphs_15_Percent_Slower_Pauses_Preserved.mp3` (180.9 s; byte-identical to `Animations/monkey-and-the-turtle/narration.mp3`) | `src/scene_a.js`, `animals.js`, `scene_c.js` | Noto Naskh Arabic, 182 s | Finished |
| The Lark and the Elephant | `lark-and-the-elephant/` | **Probably the longer recording** (see below) | `src/scene_a.js`, `birds.js`, `subtitle.js`, `scene_d.js` | Noto Naskh Arabic, 195 s | Finished on the longer narration; **a shorter recording now exists: decision pending** |
| The Fox and the Drum | `fox-and-the-drum/` | `Animations/fox-and-the-drum/narration.mp3` (161.9 s; see below) | `src/fox.js`, `scene_a.js`, `scene_e.js`, `subtitle.js` | Noto Naskh Arabic, 163.5 s, plus `Fox_and_the_Drum_Reverb_Free_Audio.mp4` | Finished; **audio and alternate video versions to be reviewed** |
| The Lion and the Hare (KD-006) | `lion-and-the-hare/` | `KD-006_The_Lion_and_the_Hare_full_slowed.mp3` (169.6 s; byte-identical to `Animations/lion-and-the-hare/narration.mp3`; copied from `Audio Files/Complete_Stories_20pct/`) | `src/animals.js`, `scene_l.js` (plus the copied `scene_a.js`, `subtitle.js`) | Noto Naskh Arabic, 172.2 s | Finished (2026-11-14). Scripts exported from `Spreadsheets/Scripts.xlsx` (rows KD-006, 8 paragraphs); cues are read from `timing.json` word times, so re-running `tx.py` + `align.py` re-times the scenes |

This table is the inventory of animated stories. Scripts and narration for further stories are in `Audio Files/` (`Scripts.xlsx`, `Complete_Stories_20pct/`).

### Unresolved audio and video versions (do not treat either as obsolete)
**Lark.** Recordings present: `The Lark and the Elephant.mp3` (172.27 s, shorter "Shorts" version with its own `_Shorts_` scripts), `Original Longer version/The Lark and the Elephant original.mp3` (192.20 s, with the longer scripts), and `Animations/lark-and-the-elephant/narration.mp3` (193.34 s). Evidence for the current video: it was built from `Animations/lark-and-the-elephant/narration.mp3` (193.34 s), whose recognised speech ends at 192.86 s and matches the *longer* script (the script files in `Original Longer version/`). `narration.mp3` is not byte-identical to the 192.20 s "original" file (different length and checksum), so it was probably an earlier export of the longer recording; this cannot be proved from the files alone. The 172 s recording was not used. The video was not re-timed or re-rendered.

**Fox.** Recordings present: `The Fox and the Drum.mp3` (160.80 s) and `Animations/fox-and-the-drum/narration.mp3` (161.89 s); the checksums differ. Evidence: the current video's timings come from `narration.mp3` (recognised speech ends at 161.54 s; the video is 163.5 s). The newer-looking `The Fox and the Drum.mp3` is 1.1 s shorter and was not used. Videos present: the animation render (`MP4s/The Fox and the Drum - Halftone Pop 9x16 - Noto Naskh Arabic.mp4`, 211,778,160 bytes) and `Fox_and_the_Drum_Reverb_Free_Audio.mp4` (211,720,037 bytes). Both are 1080x1920, 30 fps, 163.5 s, H.264 + AAC 48 kHz. They are not byte-identical; the second is presumably the same animation with a different audio mix, but its origin is not documented in the files. Neither was modified.

## Rebuilding (needs the sibling Lemo-Opuscar library; see CLAUDE.md)
From a story's `Animations/<story>/`: `python3 build.py` builds the player HTML; `node stills.mjs <seconds...>` makes stills; `node render.mjs --workers 3 --crf 20 --frames <scratch dir>` renders the MP4 into `MP4s/` (it refuses to overwrite an existing file; `--force` only after a backup). Narration is read through `Library/media.py` (local files by default; a shared media folder only if `ARABIC_STORY_MEDIA` or `.media-root` is set). Use `--out` and a scratch frames folder for tests.
