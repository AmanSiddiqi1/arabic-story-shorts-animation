#!/bin/sh
# usage: sh.sh out.jpg t1 t2 ...   (renders those times, then a 3-column contact sheet stills/out.jpg)
cd "$(dirname "$0")"; out=$1; shift
files=$(node stills.mjs "$@" 2>&1 | tee /dev/stderr | grep '^stills/' | tr '\n' ' ')
# Python with PIL comes from the Lemo-Opuscar venv: $LEMO_PY, or the nearest parent directory holding lemo-opuscar/.venv
PY="$LEMO_PY"; d=$(pwd); while [ -z "$PY" ] && [ "$d" != "/" ]; do [ -x "$d/lemo-opuscar/.venv/bin/python" ] && PY="$d/lemo-opuscar/.venv/bin/python"; d=$(dirname "$d"); done
"$PY" sheet.py "stills/$out" $files
