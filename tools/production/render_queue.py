#!/usr/bin/env python3
"""Deferred renders: build, render and QC stories whose implementation is complete. No model (Opus/Fable) calls.
  python3 tools/production/render_queue.py --awaiting            every story in "Implementation complete - Awaiting render"
  python3 tools/production/render_queue.py KD-008 KD-010 ...     these stories (must have a passing implcheck)
  options: --limit N (stop after N stories)  --workers 3 (Chromium pages per render)  --dry (list only)
Run from Terminal (or any automation with local file access) in the repository root. One heavy render at a time:
render.mjs holds production/render.lock and waits if another render holds it. For each story: skip if a passing v1 is
recorded; python3 build.py; node render.mjs → Animations/<ID>/renders/<ID>_v1.mp4 (never MP4s/); delete the frames only
after "ffmpeg exit 0"; tools/production/qc.py --record v1; record the result in production.db (tasks stage 'render').
Same engine and settings as the agents' direct renders (render.mjs: player, narration + offline SND mix, subtitles,
H.264 crf 20 + AAC 48 kHz, loudnorm) and the same post-render QC (qc.py: full decode, format, duration/end hold, loudness,
narration sync, black/frozen frames). Only a QC PASS makes the story "Rendered - Awaiting creative review"; implcheck.py is
a pre-render check only. A failure is recorded (story shows "Blocked or interrupted ... technical correction required";
source code untouched) and the queue continues. Ctrl-C marks the current story interrupted; rerunning resumes (completed
stories are skipped, an incomplete MP4 is moved aside to renders/_partial/ and rendered again)."""
import json, pathlib, shutil, subprocess, sys, time
sys.path.insert(0, str(pathlib.Path(__file__).parent))
import db, prod
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[2] / 'Library')); import media   # media folder resolver (Library/media.py)

REPO = db.REPO

def awaiting(c):
    return [r['id'] for r in c.execute('SELECT id FROM stories ORDER BY CASE WHEN id LIKE "KD-%" THEN 0 ELSE 1 END, id')
            if prod.story_stage(c, r['id'])[0] == 'Implementation complete - Awaiting render']

def task(c, sid, status, notes=None, pid=None, tid=None):
    if tid is None:
        cur = c.execute("INSERT INTO tasks (story_id, stage, status, model, started, pid) VALUES (?,?,?,?,?,?)", (sid, 'render', status, 'none', db.now(), pid))
        c.commit(); return cur.lastrowid
    c.execute('UPDATE tasks SET status=?, finished=?, notes=?, pid=? WHERE id=?', (status, db.now(), notes, pid, tid)); c.commit(); db.log(c, sid, 'render-' + status, notes or ''); return tid

def one(c, sid, workers):
    d = REPO / 'Animations' / sid
    if c.execute("SELECT 1 FROM renders WHERE story_id=? AND version='v1' AND status='PASS'", (sid,)).fetchone(): return 'skip', 'v1 already passed QC'
    ic = d / 'qc' / 'implcheck.json'
    if not ic.exists() or json.loads(ic.read_text())['status'] != 'PASS': return 'skip', 'no passing implcheck (run tools/production/implcheck.py)'
    if c.execute("SELECT 1 FROM tasks WHERE story_id=? AND stage IN ('implement','animate') AND status='running'", (sid,)).fetchone(): return 'skip', 'an agent is still working on it'
    work = REPO / 'scratch' / 'render-queue' / sid; work.mkdir(parents=True, exist_ok=True)
    out = media.out(d / 'renders' / f'{sid}_v1.mp4'); log = work / 'render.log'; frames = work / 'frames'
    if out.exists():   # an MP4 without a passing record: superseded (old subtitles), unfinished or unchecked; keep it aside and render again
        sup = c.execute("SELECT 1 FROM renders WHERE story_id=? AND version='v1' AND status='SUPERSEDED'", (sid,)).fetchone()
        p = out.parent / ('_superseded' if sup else '_partial'); p.mkdir(exist_ok=True); shutil.move(str(out), str(p / f'{sid}_v1.{int(time.time())}.mp4'))
    tid = task(c, sid, 'running')
    try:
        b = subprocess.run([sys.executable, 'build.py'], cwd=d, capture_output=True, text=True)
        if b.returncode: task(c, sid, 'failed', 'build.py failed: ' + (b.stderr or b.stdout)[-300:], tid=tid); return 'failed', 'build failed'
        with open(log, 'w') as L:
            r = subprocess.Popen(['node', 'render.mjs', '--workers', str(workers), '--crf', '20', '--frames', str(frames), '--out', str(out)], cwd=d, stdout=L, stderr=subprocess.STDOUT)
            c.execute('UPDATE tasks SET pid=? WHERE id=?', (r.pid, tid)); c.commit(); r.wait()
        txt = log.read_text(errors='replace')
        if 'ffmpeg exit 0' not in txt or r.returncode:
            task(c, sid, 'failed', f'render did not finish (exit {r.returncode}): ' + txt[-300:].replace('\n', ' '), tid=tid); return 'failed', 'render failed (frames kept in scratch)'
        shutil.rmtree(frames, ignore_errors=True)
        q = subprocess.run([sys.executable, str(REPO / 'tools' / 'production' / 'qc.py'), sid, str(out), '--record', 'v1'], cwd=REPO, capture_output=True, text=True)
        res = (q.stdout + q.stderr).strip().splitlines()[-1:] or ['']
        if q.returncode: task(c, sid, 'failed', 'QC failed: ' + res[0][:300], tid=tid); return 'failed', 'QC failed: ' + res[0][:120]
        task(c, sid, 'done', 'v1 rendered, QC PASS', tid=tid); return 'done', media.logical(out)
    except KeyboardInterrupt:
        task(c, sid, 'interrupted', 'stopped by the operator', tid=tid); raise

def main():
    a = sys.argv[1:]; opt = lambda k, d: a[a.index(k) + 1] if k in a else d
    c = db.connect(); ids = awaiting(c) if '--awaiting' in a else [x for x in a if x.startswith(('KD-', 'AN-'))]
    ids = ids[:int(opt('--limit', len(ids)))]
    print(f'{len(ids)} stories: {" ".join(ids)}')
    if '--dry' in a or not ids: return
    tally = {}
    try:
        for sid in ids:
            print(f'[{time.strftime("%H:%M:%S")}] {sid} ...', flush=True); st, msg = one(c, sid, int(opt('--workers', 3)))
            tally[st] = tally.get(st, 0) + 1; print(f'[{time.strftime("%H:%M:%S")}] {sid} {st.upper()}: {msg}', flush=True)
    except KeyboardInterrupt: print('interrupted; rerun the same command to resume')
    db.export(c); print('summary', tally)

if __name__ == '__main__': main()
