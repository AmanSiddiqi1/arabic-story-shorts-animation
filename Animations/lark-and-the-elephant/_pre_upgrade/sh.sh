#!/bin/sh
# usage: sh.sh out.jpg t1 t2 ...   (renders those times, then a contact sheet)
cd "$(dirname "$0")"; out=$1; shift
TAG="Noto Naskh Arabic" node stills.mjs "$@" 2>&1 | grep -iE "err|PAGE"
files=""; for t in "$@"; do f="stills/t$(printf '%s' "$t" | tr . _ | awk '{printf "%7s",$0}' | tr ' ' 0).jpg"; files="$files $f"; done
# Python with PIL comes from the Lemo-Opuscar venv: $LEMO_PY, or the nearest parent directory holding lemo-opuscar/.venv
PY="$LEMO_PY"; d=$(pwd); while [ -z "$PY" ] && [ "$d" != "/" ]; do [ -x "$d/lemo-opuscar/.venv/bin/python" ] && PY="$d/lemo-opuscar/.venv/bin/python"; d=$(dirname "$d"); done
"$PY" sheet.py "stills/$out" $files
