#!/bin/bash
# Builds a story's player into scratch, renders a few seconds, and checks narration and subtitle sync against the approved film.
# Never touches the approved player or MP4.     tools/setup/smoke_test.sh [story-folder] [from_s] [to_s]
#   e.g. tools/setup/smoke_test.sh lion-and-the-hare 20 24
set -euo pipefail
REPO="$(cd "$(dirname "$0")/../.." && pwd)"; STORY="${1:-lion-and-the-hare}"; FROM="${2:-20}"; TO="${3:-24}"
D="$REPO/Animations/$STORY"; [ -f "$D/story.json" ] || { echo "no story $D"; exit 1; }
M="$(python3 "$REPO/Library/media.py")"; S="$M/scratch/$USER/smoke-$STORY"
[ -d "$M/scratch" ] && mkdir -p "$S" || { S="$REPO/scratch/smoke-$STORY"; mkdir -p "$S"; }
TITLE="$(python3 -c "import json;print(json.load(open('$D/story.json'))['title'])")"; NAME="$TITLE - Halftone Pop 9x16 - Noto Naskh Arabic"
FINAL="$(python3 "$REPO/Library/media.py" "MP4s/$NAME.mp4")"; [ -f "$FINAL" ] || { echo "approved film not found: $FINAL"; exit 1; }
echo "== build into $S"; (cd "$D" && BUILD_OUT_DIR="$S" python3 build.py)
OUT="$S/smoke-$FROM-$TO.mp4"; [ -f "$OUT" ] && mv "$OUT" "$OUT.prev"
echo "== render $FROM-$TO s"; LOG="$S/render.log"
(cd "$D" && node render.mjs --html "$S/$NAME.html" --from "$FROM" --to "$TO" --workers 3 --frames "$S/frames" --out "$OUT") | tee "$LOG"
grep -q "ffmpeg exit 0" "$LOG" || { echo "render failed: ffmpeg did not exit 0 (frames kept in $S/frames)"; exit 1; }
rm -rf "${S:?}/frames"   # only after ffmpeg printed 'ffmpeg exit 0'
echo "== compare with $FINAL"; python3 "$REPO/tools/setup/sync_check.py" "$OUT" "$FINAL" "$FROM"
