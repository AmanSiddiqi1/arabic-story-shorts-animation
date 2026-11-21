#!/usr/bin/env python3
"""Runner-side render of ONE story, with QC, manifest and report. Uses the project's own scripts unchanged:
Animations/<ID>/build.py -> render.mjs (headless Chrome + ffmpeg, same settings as the Mac) -> tools/production/qc.py.
  render_one.py <ID> --version v1 --fp <fingerprint> --out <dir>
Writes <dir>/<ID>_<version>.mp4 (only when QC passes), <ID>_<version>.qc.json, manifest.json, report.md, render.log.
Exit 0 = PASS; 1 = deterministic failure (code/animation/QC: never retried); 75 = transient infrastructure failure.
One automatic retry, only for transient failures that happen in the first 20 minutes."""
import argparse, hashlib, json, os, pathlib, re, shutil, subprocess, sys, time
sys.path.insert(0, str(pathlib.Path(__file__).parent)); sys.path.insert(0, str(pathlib.Path(__file__).parents[1] / 'production'))
import common
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[2] / 'Library')); import media   # media folder resolver (Library/media.py)
REPO = common.REPO
TRANSIENT = re.compile(r'ECONNRESET|ETIMEDOUT|EAI_AGAIN|ENOTFOUND|Target (page, context or browser )?(has been )?closed|Browser has been closed|Protocol error|'
                       r'browserType\.launch|socket hang up|rate limit|HTTP 5\d\d|Connection (reset|timed out)|Could not resolve host|Killed', re.I)

class Fail(Exception):
    def __init__(self, msg, transient=False): super().__init__(msg); self.transient = transient

def sh(cmd, log, cwd=None, env=None):
    log.write(f'\n$ {" ".join(map(str, cmd))}\n'); log.flush()
    r = subprocess.run(cmd, cwd=cwd, env=env, stdout=log, stderr=subprocess.STDOUT); return r.returncode

def sha256(p):
    h = hashlib.sha256()
    with open(p, 'rb') as f:
        for b in iter(lambda: f.read(1 << 20), b''): h.update(b)
    return h.hexdigest()

def attempt(sid, version, fp, out, log, T):
    s = common.stories()[sid]; mp3 = media.resolve(REPO / 'Audio Files' / 'Final Done' / s['mp3_file'])
    t = time.time()
    # 1. narration (Release asset, never in Git); checksum must equal the one recorded in production/state.json
    if not mp3.exists():
        mp3.parent.mkdir(parents=True, exist_ok=True)
        # narration source: the render repository's own release, or (secure arrangement) a private repository's release read with a read-only token
        env = dict(os.environ); repo = os.environ.get('NARRATION_REPO') or os.environ.get('GITHUB_REPOSITORY')
        if os.environ.get('NARRATION_TOKEN'): env['GH_TOKEN'] = os.environ['NARRATION_TOKEN']
        rc = subprocess.run(['gh', 'release', 'download', common.DEPS['render']['release_tag_inputs'], '-R', repo, '-p', s['mp3_file'], '-D', str(mp3.parent), '--clobber'], env=env, stdout=log, stderr=subprocess.STDOUT).returncode
        if rc or not mp3.exists(): raise Fail(f'narration {s["mp3_file"]} could not be downloaded from the narration release (run: python3 tools/cloud/cloud.py inputs {sid}; secrets NARRATION_REPO/NARRATION_TOKEN must be set when the narration is in a private repository)', transient=bool(rc))
    if sha256(mp3) != s['mp3_sha']: raise Fail(f'narration checksum mismatch for {s["mp3_file"]}: the uploaded input is not the one production/state.json expects')
    T['narration_s'] = round(time.time() - t, 1); t = time.time()
    # 2. production.db (QC reads the story row from it), restored from the tracked state.json
    import db
    if not db.DB.exists(): db.restore().close()
    # 3. build the self-contained player
    d = REPO / 'Animations' / sid
    if sh([sys.executable, 'build.py'], log, cwd=d): raise Fail('build.py failed (missing asset or scene error); see render.log')
    T['build_s'] = round(time.time() - t, 1); t = time.time()
    # 4. render frame by frame
    frames = pathlib.Path(os.environ.get('RUNNER_TEMP', '/tmp')) / f'frames-{sid}'; shutil.rmtree(frames, ignore_errors=True)
    mp4 = out / f'{sid}_{version}.mp4'; part = out / f'{sid}_{version}.partial.mp4'
    workers = max(1, min(4, os.cpu_count() or 2))
    rlog = out / 'render_stdout.log'
    with open(rlog, 'w') as L:
        rc = subprocess.run(['node', 'render.mjs', '--workers', str(workers), '--crf', str(common.DEPS['render']['crf']), '--frames', str(frames), '--out', str(part), '--no-lock'],
                            cwd=d, stdout=L, stderr=subprocess.STDOUT).returncode
    txt = rlog.read_text(errors='replace'); log.write('\n--- render.mjs output (tail) ---\n' + txt[-4000:] + '\n'); log.flush()
    T['render_s'] = round(time.time() - t, 1); T['workers'] = workers
    errs = sorted(set(re.findall(r'PAGEERR (.*)', txt)))
    if errs: raise Fail('page errors while rendering: ' + '; '.join(errs[:5]))
    if rc or 'ffmpeg exit 0' not in txt or not part.exists():
        raise Fail(f'render did not finish (exit {rc}, ffmpeg success line {"present" if "ffmpeg exit 0" in txt else "missing"})', transient=bool(TRANSIENT.search(txt)))
    shutil.rmtree(frames, ignore_errors=True)
    part.rename(mp4)
    m = re.search(r'frames (\d+) (\d+) duration ([\d.]+)', txt); expect = int(m.group(2)) - int(m.group(1)) if m else None
    return mp4, expect, (float(m.group(3)) if m else None)

def probe_frames(mp4):
    j = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-count_frames', '-show_entries', 'stream=nb_read_frames', '-of', 'json', str(mp4)]))
    return int(j['streams'][0]['nb_read_frames'])

def main():
    ap = argparse.ArgumentParser(); ap.add_argument('id'); ap.add_argument('--version', default='v1'); ap.add_argument('--fp', required=True); ap.add_argument('--out', required=True); a = ap.parse_args()
    out = pathlib.Path(a.out); out.mkdir(parents=True, exist_ok=True); sid = a.id; T = {}; t0 = time.time(); status, reason, attempts, transient = 'FAIL', '', 0, False
    qc = None; mp4 = None; frames_ok = None
    with open(out / 'render.log', 'w') as log:
        for attempts in (1, 2):
            try:
                mp4, expect, dur = attempt(sid, a.version, a.fp, out, log, T)
                n = probe_frames(mp4); frames_ok = (expect is None or n == expect); T['frames'] = n
                if sh([sys.executable, 'tools/production/qc.py', sid, str(mp4)], log, cwd=REPO): pass
                qj = REPO / 'Animations' / sid / 'qc' / (mp4.name + '.qc.json'); qc = json.loads(qj.read_text()); shutil.copy(qj, out / f'{sid}_{a.version}.qc.json')
                fails = list(qc.get('fails', []))
                if not frames_ok: fails.append(f'frame count {n} != expected {expect}')
                if dur and dur > 180.0: fails.append(f'player duration {dur} s exceeds 180 s')
                if fails: status, reason = 'FAIL', 'QC: ' + '; '.join(fails)
                else: status, reason = 'PASS', ''
                break
            except Fail as e:
                reason, transient = str(e), e.transient; log.write(f'\nATTEMPT {attempts} FAILED: {reason} (transient={transient})\n'); log.flush()
                if transient and attempts == 1 and time.time() - t0 < 1200: log.write('retrying once\n'); log.flush(); continue
                break
    wall = round(time.time() - t0, 1)
    if mp4 and mp4.exists() and status != 'PASS': mp4.rename(out / (mp4.name + '.FAILED_QC'))   # never publish a film that failed QC; the artifact step skips it
    size = (out / f'{sid}_{a.version}.mp4').stat().st_size if (out / f'{sid}_{a.version}.mp4').exists() else None
    env = os.environ.get
    man = {'story': sid, 'version': a.version, 'result': status, 'reason': reason, 'transient': transient, 'attempts': attempts,
           'commit': env('GITHUB_SHA') or common.git('rev-parse', 'HEAD').strip(), 'fingerprint': a.fp, 'artifact': common.artifact_name(sid, a.version, a.fp),
           'run_id': env('GITHUB_RUN_ID'), 'run_attempt': env('GITHUB_RUN_ATTEMPT'), 'run_url': f'{env("GITHUB_SERVER_URL","")}/{env("GITHUB_REPOSITORY","")}/actions/runs/{env("GITHUB_RUN_ID","")}',
           'runner': {'os': env('RUNNER_OS'), 'cpus': os.cpu_count()}, 'deps': common.DEPS, 'timings_s': dict(T, wall=wall),
           'mp4': {'file': f'{sid}_{a.version}.mp4', 'bytes': size, 'sha256': sha256(out / f'{sid}_{a.version}.mp4') if size else None},
           'source_revision': (json.loads((REPO / 'SOURCE_REVISION.json').read_text()) if (REPO / 'SOURCE_REVISION.json').exists() else None), 'qc': qc, 'generated': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())}
    (out / 'manifest.json').write_text(json.dumps(man, indent=1) + '\n')
    q = qc or {}
    rep = [f'## {sid} {a.version}: {status}', '', f'- commit `{man["commit"][:10]}`, fingerprint `{a.fp[:12]}`, attempts {attempts}, run {man["run_url"]}',
           f'- wall time {wall:.0f} s (narration {T.get("narration_s","-")} s, build {T.get("build_s","-")} s, render+encode {T.get("render_s","-")} s, {T.get("workers","-")} workers on {os.cpu_count()} cpus)']
    if reason: rep.append(f'- **{"transient infrastructure failure" if transient else "failure"}**: {reason}')
    if qc: rep += ['', '| check | value |', '|---|---|', f'| format | {q["format"]["video"]} / {q["format"]["audio"]} |', f'| duration | {q["format"]["duration"]} s (end hold {q.get("end_hold")} s) |',
                   f'| frames | {T.get("frames")} |', f'| loudness | {q.get("lufs")} LUFS |', f'| narration sync | {q.get("sync")} |', f'| decode | {q.get("decode")} |',
                   f'| black stretches | {q.get("black")} |', f'| frozen from | {q.get("frozen_from")} |', f'| size | {size} bytes |']
    rep += ['', '_Automated checks are technical only. Whether the film looks right still needs the visual (Fable) review._']
    (out / 'report.md').write_text('\n'.join(rep) + '\n')
    with open(env('GITHUB_STEP_SUMMARY', os.devnull), 'a') as f: f.write('\n'.join(rep) + '\n')
    print('\n'.join(rep)); sys.exit(0 if status == 'PASS' else (75 if transient else 1))

if __name__ == '__main__': main()
