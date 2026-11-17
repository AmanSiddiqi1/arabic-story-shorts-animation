#!/bin/bash
# Guarded GitHub backup for Arabic Story Shorts.
#   tools/backup.sh "what changed"            run the library regression test, check what is staged, commit, push
#   tools/backup.sh "what changed" --full     also run the project skill's selftest
#   tools/backup.sh --status                  only report whether local and GitHub match
# It never force-pushes, rewrites history, changes remotes or touches global Git settings.
set -uo pipefail
EXPECTED_REMOTE_RE='github\.com[:/]AmanSiddiqi1/arabic-story-shorts-animation(\.git)?$'
BRANCH=main
REPO="$(cd "$(dirname "$0")/.." && pwd)"
fail() { echo; echo "BACKUP FAILED: $1"; [ -n "${2:-}" ] && echo "  What to do: $2"; exit 1; }
say() { echo "== $*"; }

MSG=""; FULL=0; STATUS=0
for a in "$@"; do
  case "$a" in
    --full) FULL=1 ;;
    --status) STATUS=1 ;;
    -f|--force|--force-with-lease*|--amend|--rebase*|--reset*|--no-verify|--mirror|--delete|-d|-D)
      fail "'$a' is a destructive option and is not supported." "This tool only makes ordinary commits and fast-forward pushes. Do history changes by hand, deliberately." ;;
    -*) fail "unknown option '$a'." "Usage: tools/backup.sh \"message\" [--full] | --status" ;;
    *) [ -z "$MSG" ] && MSG="$a" || fail "more than one message given." "Quote the message: tools/backup.sh \"what changed\"" ;;
  esac
done
cd "$REPO" || fail "cannot enter $REPO"

# 1. right repository and remote
[ "$(git rev-parse --show-toplevel 2>/dev/null)" = "$REPO" ] || fail "$REPO is not the top of a Git repository." "Clone it as described in DEVELOPMENT_SETUP.md."
URL="$(git remote get-url origin 2>/dev/null)" || fail "no 'origin' remote." "git remote add origin https://github.com/AmanSiddiqi1/arabic-story-shorts-animation.git"
echo "$URL" | grep -Eq "$EXPECTED_REMOTE_RE" || fail "origin is '$URL', not AmanSiddiqi1/arabic-story-shorts-animation." "Check you are in the right checkout; this tool will not change remotes."
# 2. branch and state
CUR="$(git symbolic-ref --short -q HEAD)" || fail "HEAD is detached." "git switch $BRANCH"
[ "$CUR" = "$BRANCH" ] || fail "current branch is '$CUR', expected '$BRANCH'." "git switch $BRANCH (or push your branch by hand: git push -u origin $CUR)"
G="$(git rev-parse --git-dir)"
for s in rebase-merge rebase-apply MERGE_HEAD CHERRY_PICK_HEAD REVERT_HEAD; do [ -e "$G/$s" ] && fail "a merge/rebase/cherry-pick is in progress ($s)." "Finish or abort it first."; done
[ "$(git config core.hooksPath)" = "tools/git/hooks" ] || { git config core.hooksPath tools/git/hooks; say "installed repository hooks (core.hooksPath=tools/git/hooks, this repository only)"; }

report() {
  git fetch -q origin "$BRANCH" 2>/dev/null
  L="$(git rev-parse HEAD)"; R="$(git ls-remote origin "refs/heads/$BRANCH" | cut -f1)"
  echo "local  $BRANCH: $L"; echo "GitHub $BRANCH: ${R:-<missing>}"
  if [ "$L" = "$R" ]; then echo "RESULT: local and GitHub match."; return 0; else echo "RESULT: local and GitHub DO NOT match."; return 1; fi
}
[ "$STATUS" = 1 ] && { report; exit $?; }

# 3. not behind or diverged from GitHub
say "checking GitHub"
git fetch -q origin || fail "could not reach GitHub (git fetch failed)." "Check the network and 'gh auth status'; nothing was committed."
if git rev-parse -q --verify "origin/$BRANCH" >/dev/null; then
  git merge-base --is-ancestor "origin/$BRANCH" HEAD || fail "GitHub has commits that this checkout does not (behind or diverged)." "git pull --ff-only origin $BRANCH, check the result, then run the backup again. Never force-push."
fi

# 4. tests
say "library regression test"
OUT="$(node Library/tests/regression.mjs 2>&1)"; echo "$OUT" | tail -3
echo "$OUT" | grep -q "all identical" || fail "the library regression test did not report 'all identical'." "Fix the library change (see the output above) before backing up. Needs Lemo-Opuscar beside the repo or LIB=... (DEVELOPMENT_SETUP.md)."
if [ "$FULL" = 1 ]; then
  say "project skill selftest"; node .claude/skills/halftone-pop/tests/selftest.mjs 2>&1 | tail -2 | grep -q "All checks passed" || fail "the halftone-pop skill selftest failed." "Run node .claude/skills/halftone-pop/tests/selftest.mjs to see why."
fi

# 5. stage and check
say "staging"
git add -A || fail "git add failed."
if ! python3 tools/git/check_staged.py; then git reset -q; fail "unsafe files were about to be committed (listed above); everything was unstaged again." "Add the pattern to .gitignore or keep the file in the local media folders."; fi

# 6. commit (only if something changed)
if git diff --cached --quiet; then say "nothing new to commit"
else
  [ -n "$MSG" ] || MSG="Backup $(date '+%Y-%m-%d %H:%M')"
  git commit -q -m "$MSG" || fail "git commit failed (see above)." "Fix the reported problem; nothing was pushed."
  say "committed $(git rev-parse --short HEAD): $MSG"
fi

# 7. push (fast-forward only) and verify
if [ -n "$(git rev-list "origin/$BRANCH..HEAD" 2>/dev/null)" ] || ! git rev-parse -q --verify "origin/$BRANCH" >/dev/null; then
  say "pushing to GitHub"
  git push origin "$BRANCH" || fail "git push was rejected or failed (see above). Your commit is safe locally." "Run tools/backup.sh --status; if GitHub moved on, git pull --ff-only and retry. Do not force-push."
fi
report || fail "after pushing, GitHub does not have the local commit." "Run tools/backup.sh --status and check https://github.com/AmanSiddiqi1/arabic-story-shorts-animation"
echo "BACKUP OK"
