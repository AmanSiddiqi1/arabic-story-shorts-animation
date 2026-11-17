#!/bin/bash
# Checks that this checkout can build, render and back up Arabic Story Shorts on this macOS account. Changes nothing.
#   tools/setup/check_env.sh
REPO="$(cd "$(dirname "$0")/../.." && pwd)"; cd "$REPO"; bad=0
ok() { printf 'OK       %-34s %s\n' "$1" "$2"; }; no() { printf 'MISSING  %-34s %s\n         -> %s\n' "$1" "$2" "$3"; bad=$((bad+1)); }
command -v git >/dev/null && ok git "$(git --version)" || no git "" "xcode-select --install"
command -v node >/dev/null && [ "$(node -p 'parseInt(process.versions.node)')" -ge 20 ] && ok "node >= 20" "$(node -v)" || no "node >= 20" "$(node -v 2>/dev/null)" "install Node 20+ (nodejs.org or Homebrew: brew install node)"
command -v python3 >/dev/null && ok python3 "$(python3 --version 2>&1)" || no python3 "" "xcode-select --install (or python.org)"
command -v ffmpeg >/dev/null && command -v ffprobe >/dev/null && ok "ffmpeg + ffprobe" "$(ffmpeg -version | head -1 | cut -c1-40)" || no "ffmpeg + ffprobe" "" "brew install ffmpeg (or MacPorts: sudo port install ffmpeg)"
gh auth status >/dev/null 2>&1 && ok "gh (GitHub CLI) signed in" "$(gh api user --jq .login 2>/dev/null)" || no "gh signed in" "" "brew install gh && gh auth login (only needed to clone/push)"
# Lemo-Opuscar (playwright-core + Chromium launch flags) is found from $LIB or a lemo-opuscar folder beside/above the repo
L="$LIB"; d="$REPO"; while [ -z "$L" ] && [ "$d" != "/" ]; do [ -f "$d/lemo-opuscar/core/render/page.mjs" ] && L="$d/lemo-opuscar"; d="$(dirname "$d")"; done
if [ -n "$L" ] && [ -d "$L/node_modules/playwright-core" ]; then ok "Lemo-Opuscar (renderer)" "$L"
# Creator OS engine (kit.js, sound.js, halftone-pop.js) from claude-motion-faceless-skills (not stored in this repo)
if M=$(python3 "$REPO/Library/engine.py" 2>/dev/null); then ok "Creator OS engine" "$M"; else no "Creator OS engine" "" "git clone https://github.com/kevinbadi/claude-motion-faceless-skills.git next to this repo (or set MOTION_STYLES)"; fi
  node --input-type=module -e "import {createRequire} from 'module'; import {pathToFileURL} from 'url'; const L=process.argv[1]; const {chromium}=createRequire(L+'/package.json')('playwright-core'); const {ARGS,EXE}=await import(pathToFileURL(L+'/core/render/browser.mjs').href); const b=await chromium.launch({executablePath:EXE,args:ARGS}); await b.close(); console.log('ok')" "$L" >/dev/null 2>&1 && ok "headless Chromium launches" "" || no "headless Chromium" "" "cd $L && npx playwright-core install chromium-headless-shell (see DEVELOPMENT_SETUP.md)"
else no "Lemo-Opuscar (renderer)" "" "git clone https://github.com/lemomo-ai/lemo-opuscar.git next to this repo, then npm ci in it (or set LIB=/path)"; fi
# media (local mode by default: the repository's own folders; shared mode when ARABIC_STORY_MEDIA or .media-root is set)
M="$(python3 Library/media.py)"
if python3 -c "import sys;sys.path.insert(0,'Library');import media;sys.exit(0 if media.is_local() else 1)"; then ok "media: local folders" "$M"
  [ -d MP4s ] && [ -w MP4s ] && ok "MP4s/ writable" "finished films" || no "MP4s/ writable" "$REPO/MP4s" "mkdir MP4s"
elif [ -d "$M" ] && [ -r "$M" ]; then ok "shared media folder readable" "$M"
  t="$M/scratch/.write-test-$USER-$$"; (echo x > "$t" && rm "$t") 2>/dev/null && ok "shared media folder writable" "scratch/" || no "shared media writable" "$M" "ask the owner to grant this account access (DEVELOPMENT_SETUP.md, 'Shared media')"
else no "media folder" "$M" "remove .media-root / unset ARABIC_STORY_MEDIA for local mode, or fix the path; see DEVELOPMENT_SETUP.md"; fi
for s in Animations/*/story.json; do d="$(dirname "$s")"; [ -f "$d/build.py" ] || continue
  n="$(cd "$d" && python3 -c "import json,sys,pathlib;sys.path.insert(0,'../../Library');import media;print(media.resolve(pathlib.Path('.').resolve()/json.load(open('story.json')).get('narration','narration.mp3')))")"
  [ -f "$n" ] && ok "narration $(basename "$d")" "${n#$M/}" || no "narration $(basename "$d")" "$n" "the narration file is missing (local mode: restore it into the story folder; shared mode: tools/media/sync_media.py copy)"; done
[ "$(ls Library/fonts/*.woff2 2>/dev/null | wc -l)" -gt 0 ] && ok "embedded fonts (Noto Naskh etc.)" "Library/fonts/*.woff2" || no "embedded fonts" "" "Library/fonts is missing: re-clone"
[ -f .claude/skills/halftone-pop/SKILL.md ] && ok "project skill" "/halftone-pop-shorts" || no "project skill" "" "re-clone (.claude/skills/halftone-pop)"
[ "$(git config core.hooksPath)" = tools/git/hooks ] && ok "git guard hooks" "core.hooksPath=tools/git/hooks" || no "git guard hooks" "" "git config core.hooksPath tools/git/hooks   (this repository only)"
echo; [ $bad = 0 ] && echo "All checks passed." || echo "$bad check(s) need attention."; exit $bad
