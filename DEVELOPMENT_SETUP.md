# Arabic Story Shorts: development setup

This file lets a fresh Claude Code conversation, or a person, restore and understand the project without any earlier chat history. Read it together with [CLAUDE.md](CLAUDE.md) (series production rules), [README.md](README.md) (stories and inventory) and [Library/Animation_Capabilities_Guide.md](Library/Animation_Capabilities_Guide.md) (what the animation system can do).

## 1. What lives where

| What | Where | In Git? |
|---|---|---|
| Source code, shared library, template, tests, docs, scripts, timings | GitHub, private: `AmanSiddiqi1/arabic-story-shorts-animation` (branch `main`) | yes |
| Narration MP3s, final MP4s, original-video backups, built HTML players, review renders | **local folders of this checkout** (default since 2026-11-16: `MP4s/`, `Originals/`, `Audio Files/`, `Animations/<story>/`, `<story>/`); a shared media folder only if one is configured (section 2) | **no** |
| Renderer (Playwright + Chromium launch flags) | Lemo-Opuscar checkout beside the repository (public GitHub repo) | no (separate repo, never modified) |

Known checkouts:
- main account `<user>`: `<project folder>` (this folder). **Arabic Story Shorts runs here, in local mode, as of 2026-11-16.**
- The `<second-account>` account is reserved for another project and has no Arabic Story Shorts checkout. Section 3 stays as the recipe for a future second account.

### Repository layout
```
CLAUDE.md, README.md, DEVELOPMENT_SETUP.md, MIGRATION.md
media.config.json                 the one media setting (env var, default root "." = local, path map for a shared folder)
.claude/skills/halftone-pop/      project copy of the Halftone Pop skill (/halftone-pop-shorts), authoritative here
Animations/<story>/               the five upgraded films + the Lark Fable experiment: src/, build.py, render.mjs,
                                  stills.mjs, align.py, tx.py, story.json, timing.json, whisper.json, fonts/, review/*.md, _pre_upgrade/
Library/                          shared engine (core/), cast/, sets/, props/, fx/, motion.js, registry.js, template/,
                                  catalogue/, tests/regression.mjs, Animation_Capabilities_Guide.md, media.py, media.mjs
<story>/                          supplied scripts (*.txt) for the five stories (recordings are in the media folder)
Audio Files/                      Scripts.xlsx and other spreadsheets/CSVs, production scripts (*.py), Transcriptions/,
                                  *.mp3.words.json word timings (MP3s are in the media folder)
source/Kalila wa Dimna.pdf        the source book
checksums/                        SHA-256 records (migrations, media inventory and copy)
tools/backup.sh                   guarded commit + push (section 7)
tools/git/                        staged-file guard, pre-commit and pre-push hooks
tools/media/                      sync_media.py (copy/verify media), check_timings.py (timings vs MP3s)
tools/setup/                      check_env.sh, smoke_test.sh, sync_check.py
tools/review/, tools/transcription/   QC, review packs, Whisper recipe
```
Excluded by `.gitignore`: all audio/video and `.zip`, `MP4s/`, `Originals/`, built players (`* - Halftone Pop 9x16 - *.html`, which embed the narration), `renders/`, `compare/`, `stills/`, review JPGs, frames, `node_modules`, venvs, caches, logs, `.media-root`, `.env`, keys and `settings.local.json`. Everything excluded is either local media on the main account or regenerable.

## 2. Media: local mode (default) and shared mode

**One setting.** The media root is `$ARABIC_STORY_MEDIA`, else the one-line file `.media-root` at the repository root (untracked, per machine), else `defaultRoot` in `media.config.json`, which is `"."`.

- **Local mode (default, used on `<user>`).** The root is the repository folder itself, and `Library/media.py` / `Library/media.mjs` use every path exactly as written. Narration is `Animations/<story>/narration.mp3` (the Thief: `thief-and-the-moonbeam/Audio/Combined_and slowed.mp3`, from its `story.json`), and `render.mjs` writes finished films to `MP4s/` (and refuses to overwrite one). The prefix map is not used. `tools/media/sync_media.py` refuses to run in this mode.
- **Shared mode (optional, for a second macOS account).** Set `ARABIC_STORY_MEDIA` or `.media-root` to a folder outside the repository (`sharedRootExample`: `/Users/Shared/ArabicStoryShorts`). Repository paths then map through the prefix table in `media.config.json`; narration comes from the shared copy when present (local file as fallback), and finished films go to `<root>/final-mp4s/`. Check which mode is active with `python3 Library/media.py` (prints the root) or `tools/setup/check_env.sh`.

The shared layout prepared on 2026-11-16 (a complete, checksum-verified copy of the local media at that date; not used since 2026-11-16):
```
/Users/Shared/ArabicStoryShorts/
  final-mp4s/            <- MP4s/                     finished films
  originals/             <- Originals/                pre-upgrade films; read-only, delete-protected
  narration/final-done/  <- Audio Files/Final Done/   final narration MP3s for the next stories (+ .words.json in Git)
  audio-archive/         <- Audio Files/...           every other recording (candidates, originals, pilots, rejects)
  animations/<story>/    <- Animations/<story>/       narration.mp3 the film was built on, HTML players, review renders
  story-sources/<story>/ <- <story>/                  recordings as supplied (e.g. the Thief's Audio/)
  scratch/<user>/        temporary render frames and test renders (safe to empty)
  manifests/             SHA-256 inventories written by tools/media/sync_media.py
  README.md
```
Files keep their names, so `MP4s/X.mp4` is `final-mp4s/X.mp4`. Switching modes never changes a build: on 2026-11-16 all five players built byte-identically in both modes.

**Permissions** (set 2026-11-16, no system settings changed): the root is mode `700` owned by `<user>`, with inherited ACL entries giving `<user>` and `<second-account>` read/write on everything below it. No other account can enter. `originals/` is read-only for `<second-account>`; for everyone its files deny write/delete and the folder denies removing entries. Check them with `ls -le /Users/Shared/ArabicStoryShorts`. To give another account the same access (for example a future `<second-user>`), run as `<user>`:
```bash
R=/Users/Shared/ArabicStoryShorts; U=<second-user>
find "$R" -path "$R/originals" -prune -o -type d -print0 | xargs -0 chmod +a "user:$U allow list,add_file,search,delete,add_subdirectory,delete_child,readattr,writeattr,readextattr,writeextattr,readsecurity,file_inherit,directory_inherit"
find "$R" -path "$R/originals" -prune -o -type f -print0 | xargs -0 chmod +a "user:$U allow read,write,append,execute,delete,readattr,writeattr,readextattr,writeextattr,readsecurity"
chmod +a "user:$U allow list,search,readattr,readextattr,readsecurity,file_inherit,directory_inherit" "$R/originals"
find "$R/originals" -type f -print0 | xargs -0 chmod +a "user:$U allow read,readattr,readextattr,readsecurity"
```

**Adding or checking media (shared mode only).** On the account that has the files, with the shared root set (e.g. `ARABIC_STORY_MEDIA=/Users/Shared/ArabicStoryShorts`): `python3 tools/media/sync_media.py copy` copies anything missing (APFS clones, no extra disk space) and verifies it by SHA-256; it never overwrites or deletes, and reports a different file with the same name as a CONFLICT. `python3 tools/media/sync_media.py verify` re-hashes both sides. A new story's narration goes to `animations/<story>/narration.mp3` in the media folder (or a local `Animations/<story>/narration.mp3` that you then sync).

## 3. Set up a checkout on another macOS account (e.g. `<second-account>`)
Log in to that account yourself. Nothing here switches accounts or touches other projects (another project included).
1. **Tools.** Xcode command line tools (`xcode-select --install`: git, python3), Node 20+, ffmpeg, GitHub CLI. With Homebrew: `brew install node ffmpeg gh`.
2. **GitHub.** `gh auth login` (HTTPS), then:
   ```bash
   mkdir -p ~/Developer && cd ~/Developer
   gh repo clone AmanSiddiqi1/arabic-story-shorts-animation
   git clone https://github.com/lemomo-ai/lemo-opuscar.git
   ```
   git clone https://github.com/kevinbadi/claude-motion-faceless-skills.git   # Creator OS engine (kit.js, sound.js, halftone-pop.js), MIT; not stored in this repo
   Lemo-Opuscar and claude-motion-faceless-skills must sit beside the repository (`~/Developer/lemo-opuscar`); the scripts find it by walking up from the story folder, or from `$LIB`. Never modify it.
3. **Renderer.** `cd ~/Developer/lemo-opuscar && sh plugin/skills/lemo-opuscar/scripts/setup.sh deps` (Lemo-Opuscar's own installer: `npm install`, Playwright's `chromium-headless-shell`, and its `.venv` with numpy/scipy/pillow; it needs Python 3.11+ or `uv`). The venv is only used for contact sheets (`sh.sh`, or set `LEMO_PY`) and `tools/review/qc.py`. On macOS the renderer uses Metal (`LEMO_ANGLE` overrides).
4. **Repository hooks** (this repository only): `cd ~/Developer/arabic-story-shorts-animation && git config core.hooksPath tools/git/hooks`. `tools/backup.sh` also sets this.
5. **Fonts.** Nothing to install. Noto Naskh Arabic, Bangers, Cairo and Scheherazade New are embedded as woff2 in `Library/fonts/` and each story's `fonts/` (SIL OFL), so builds and renders work offline. Installing Noto Naskh Arabic system-wide is optional, only for viewing scripts.
6. **Media.** A fresh clone has no media (Git never holds it). Either copy the media into the same local folders (local mode, nothing to configure), or point the checkout at a shared folder: `echo /Users/Shared/ArabicStoryShorts > .media-root` (the account needs the ACL above; on the main account run `ARABIC_STORY_MEDIA=/Users/Shared/ArabicStoryShorts python3 tools/media/sync_media.py copy` first to bring the shared copy up to date).
7. **Check.** `tools/setup/check_env.sh` (tools, renderer, Chromium, media read/write, every story's narration, fonts, skill, hooks).
8. **Regression test.** `node Library/tests/regression.mjs` must end with `all identical`.
9. **Short test render with sync check.** `tools/setup/smoke_test.sh lion-and-the-hare 20 24` builds the player into `scratch/<user>/`, renders 4 s, and compares it with the approved film: narration lag 0 ms (correlation > 0.9) and picture PSNR > 35 dB. It never touches the approved player or MP4. On 2026-11-16 on `<user>` it gave lag 0 ms, correlation 0.978, PSNR 42 dB.
10. **Timings.** `python3 tools/media/check_timings.py` checks every `.words.json` and `timing.json` against its MP3 (124 files matched on 2026-11-16).
11. **Transcription** (only to re-time a story): see `tools/transcription/README.md` (a `faster-whisper` venv at `~/venvs/fw`).

## 4. The project Halftone Pop skill
- Project copy: `.claude/skills/halftone-pop/` (copied unchanged from `~/.claude/skills/halftone-pop` on 2026-11-16, then: `name: halftone-pop-shorts`, a section on this repository's Library and media, and `$HP`-relative paths in `ARCHITECTURE.md`/`UPDATING.md`). `references/the original brief (removed 2026-11-17; see engine/original/PROVENANCE.md)` keeps its historical absolute paths on purpose (it is a verbatim record).
- **Authoritative for Arabic Story Shorts: the project copy.** Invoke it as `/halftone-pop-shorts` (it is explicit-use only: `disable-model-invocation: true`). Claude Code discovers project skills in `.claude/skills/` automatically when a session starts in the repository.
- Name conflict: Claude Code gives a personal skill priority over a project skill of the same name, so on `<user>` `/halftone-pop` still runs the personal copy (`~/.claude/skills/halftone-pop`, kept unchanged until the project copy is validated). The project copy's own name avoids that ambiguity. On an account without the personal copy, `/halftone-pop` also reaches the project copy. Once you are satisfied, you may retire the personal copy yourself; nothing here deletes it.
- How it fits the library: the skill's `engine/original/` (`kit.js`, `sound.js`, `halftone-pop.js`) is byte-identical to `Library/core/`. Stories in this repository are built from `Library/template/` with the Library cast, sets and motion helpers (see the guide); the skill's own scripts and examples are for stand-alone experiments. Selftest: `node .claude/skills/halftone-pop/tests/selftest.mjs`.

## 5. Building and rendering a story
From `Animations/<story>/`:
- `python3 build.py`: the self-contained HTML player (engine + Library + scenes + fonts + narration). `BUILD_OUT_DIR=<dir>` writes it elsewhere (tests).
- `node stills.mjs 5 12.5 30`: stills; `sh.sh`: contact sheet.
- `node render.mjs --workers 3 --crf 20 --frames <scratch>/frames --out <scratch>/test.mp4 [--from s --to s] [--html <player>]`: test render. Without `--out` it writes the final film to `MP4s/` (local mode; `final-mp4s/` in shared mode) and refuses to overwrite. **Do not delete the frames folder before it prints `ffmpeg exit 0`.**
- Players embed the Library at build time. A rebuild today includes later, backward-compatible Library additions (for example the fox `reach`/`plant` fields), so its bytes differ from the approved players while drawing the same pictures (regression test; smoke test PSNR 42 dB). Do not replace an approved player or MP4 without a backup (CLAUDE.md).

## 6. Tests
- `node Library/tests/regression.mjs`: every library drawing pixel-identical to its original story drawing; must say `all identical`. Run after any Library change.
- `node .claude/skills/halftone-pop/tests/selftest.mjs`: the project skill.
- `tools/setup/smoke_test.sh`, `tools/media/check_timings.py`, `tools/setup/check_env.sh`: see section 3.

## 7. Backing up to GitHub
```bash
tools/backup.sh "what changed"
```
It checks that `origin` is `AmanSiddiqi1/arabic-story-shorts-animation` and the branch is `main` (no rebase or merge in progress), refuses to go on if GitHub has commits you do not have, runs the regression test (`--full` adds the skill selftest), stages everything, refuses media, files over 10 MB and anything that looks like a credential (`tools/git/check_staged.py`), commits, pushes without force, and reports whether local and GitHub match. `tools/backup.sh --status` only compares. It rejects `--force`, `--amend` and similar options; the `pre-push` hook also refuses non-fast-forward pushes and branch deletion. Each failure message says what to do next.

## 8. Moving work between accounts safely
1. On the account you are leaving: `tools/backup.sh "..."` and wait for `BACKUP OK`. Media changes: bring the shared folder up to date first (`ARABIC_STORY_MEDIA=/Users/Shared/ArabicStoryShorts python3 tools/media/sync_media.py copy`).
2. On the other account: `git pull --ff-only`, then `tools/setup/check_env.sh`.
3. Work in only one checkout at a time, and back up before switching. In shared mode, renders from either account go to the same `final-mp4s/` and refuse to overwrite, so two accounts never silently replace each other's film.
4. Never copy `~/.claude` settings between accounts. The project skill and rules travel with the repository; per-account Claude Code settings stay per account.

## 9. Open items (2026-11-16)
- Arabic Story Shorts runs only on `<user>`, in local mode; `<second-account>` is reserved for another project. `/Users/Shared/ArabicStoryShorts` (with its ACL for `<second-account>`) is an unused copy of the media as of 2026-11-16 and can be deleted by the owner; nothing in the repository depends on it. There is no macOS account called `<second-user>`; grant one later with the commands in section 2 if needed.
- The Thief's Cairo and Scheherazade New MP4s were removed from `MP4s/` by the owner on 2026-11-16 (intentional). Their players remain in the media folder (`animations/thief-and-the-moonbeam/`), and their SHA-256 values are in `checksums/mp4s-before-move-2026-11-15.txt`.
- The local media in this folder (`MP4s/`, `Originals/`, `Audio Files/` MP3s, `Animations/*/narration.mp3`, players, renders) are the working copies again; they were never deleted.
