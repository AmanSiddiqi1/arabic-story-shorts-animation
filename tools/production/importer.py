"""Imports the master script workbook and matches every story to its final narration and word timings.

Source of truth: Spreadsheets/Script_Updated.xlsx (local, not in Git) (sheet 'All Scripts', one row per active paragraph).
Narration: Audio Files/Final Done/<ID>_..._full_slowed.mp3 and <mp3>.words.json (never modified here).
Writes, per eligible story, Animations/<ID>/story.json (once), Animations/<ID>/story/ (derived script files)
and Animations/<ID>/planning/inputs/timeline.{json,md} (script words on the MP3 timeline).
"""
import csv, glob, hashlib, json, os, pathlib, re, subprocess, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
import arabic, db, xlsx
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[2] / 'Library')); import media   # media folder resolver (Library/media.py)

REPO = db.REPO
XLSX = REPO / 'Spreadsheets' / 'Script_Updated.xlsx'   # local only (Spreadsheets/ is not in Git)
FINAL = REPO / 'Audio Files' / 'Final Done'
# the five approved films (already produced; never re-queued)
COMPLETED = {'KD-001': 'thief-and-the-moonbeam', 'KD-002': 'monkey-and-the-turtle', 'KD-003': 'lark-and-the-elephant',
             'KD-004': 'fox-and-the-drum', 'KD-006': 'lion-and-the-hare'}

def sha(p):
    h = hashlib.sha256()
    with open(p, 'rb') as f:
        for b in iter(lambda: f.read(1 << 20), b''): h.update(b)
    return h.hexdigest()

def duration(p):
    return float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(p)]))

def slug(s): return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')

def read_script():
    book = xlsx.read(XLSX)
    head = book['All Scripts'][0]
    want = ['Story ID', 'Story Title (English)', 'Story Title (Arabic)', 'Collection', 'Paragraph #', 'Segment ID',
            'Arabic — clean', 'Arabic — with pauses', 'English translation']
    assert head[:9] == want, ('unexpected All Scripts columns', head)
    stories = {}
    for r in book['All Scripts'][1:]:
        if not r or not r[0]: continue
        s = stories.setdefault(r[0], {'id': r[0], 'title_en': r[1], 'title_ar': r[2], 'collection': r[3], 'paragraphs': []})
        if r[2] and not s['title_ar']: s['title_ar'] = r[2]
        s['paragraphs'].append({'n': int(r[4]), 'segment': r[5], 'ar': (r[6] or '').strip(), 'ar_pauses': (r[7] or '').strip(),
                                'en': (r[8] or '').strip()})
    index = {r[0]: r for r in book['Story Index'][1:] if r and r[0]}
    for k, r in index.items():
        if k in stories:
            if not stories[k]['title_ar'] and r[2]: stories[k]['title_ar'] = r[2]
            stories[k]['index_paragraphs'] = int(r[4])
    cuts = {r[0]: [] for r in book['Audio Cuts'][1:] if r and r[0]}
    for r in book['Audio Cuts'][1:]:
        if r and r[0]: cuts[r[0]].append(r[3])
    rewrites = {}
    for r in book['Duration Rewrites']:
        if r and r[0] and re.match(r'^(AN|KD)-\d+$', str(r[0])) and len(r) > 11 and r[11]: rewrites[r[0]] = r[11]
    return stories, index, cuts, rewrites

def manifest():
    p = FINAL / 'Word_Timing_Manifest.csv'
    if not p.exists(): return {}
    with open(p, encoding='utf-8-sig') as f: return {r['MP3 filename']: r for r in csv.DictReader(f)}

def find_assembly(mp3name, mp3sha):
    for p in [q for base in dict.fromkeys([REPO / 'Audio Files', media.resolve(REPO / 'Audio Files')]) for q in glob.glob(str(base / '**' / (glob.escape(mp3name) + '.assembly.json')), recursive=True)]:   # repository or media folder
        if mp3sha in pathlib.Path(p).read_text(encoding='utf8', errors='replace'):
            return media.logical(p)
    return None

def spoken_words(words_json):
    out = []
    for seg in json.load(open(words_json, encoding='utf8')):
        for w in seg.get('w', []):
            out.append((arabic.norm(w['t']), float(w['a']), float(w['b']), w['t']))
    return out

def analyse(story, mp3, words_json, dur):
    """align script to narration; per-paragraph spans and match ratios; timing sanity"""
    sp = spoken_words(words_json)
    issues = []
    bad = [w for w in sp if w[1] < -0.01 or w[2] > dur + 0.05 or w[2] < w[1]]
    if bad: issues.append(f'{len(bad)} word timestamp(s) outside 0..{dur:.2f} s or reversed')
    if any(sp[i + 1][1] < sp[i][1] - 0.01 for i in range(len(sp) - 1)): issues.append('word timestamps not monotonic')
    spn = [w for w in sp if w[0]]
    words = []
    for p in story['paragraphs']:
        for w in arabic.tokens(p['ar']): words.append((p['n'], w, arabic.norm(w)))
    times, unused = arabic.timed([w[2] for w in words], [(w[0], w[1], w[2]) for w in spn])
    # runs of spoken words that match no script word (text in the audio that is not in the script)
    runs, cur = [], []
    for j in range(len(spn)):
        if j in unused: cur.append(j)
        else:
            if len(cur) >= 6: runs.append(cur)
            cur = []
    if len(cur) >= 6: runs.append(cur)
    paras = []
    for p in story['paragraphs']:
        ks = [k for k, w in enumerate(words) if w[0] == p['n']]
        m = sum(1 for k in ks if times[k][2])
        paras.append({'n': p['n'], 'segment': p['segment'], 'start': times[ks[0]][0], 'end': times[ks[-1]][1],
                      'ratio': round(m / len(ks), 3), 'words': [[words[k][1], times[k][0], times[k][1], int(times[k][2])] for k in ks]})
    total = sum(1 for t in times if t[2]) / max(len(times), 1)
    extra = [{'from': spn[r[0]][1], 'to': spn[r[-1]][2], 'n': len(r), 'text': ' '.join(spn[j][3] for j in r)} for r in runs]
    # pauses (gaps between spoken words) usable for effects
    gaps = [[round(sp[i][2], 2), round(sp[i + 1][1], 2)] for i in range(len(sp) - 1) if sp[i + 1][1] - sp[i][2] >= 0.6]
    if sp and dur - sp[-1][2] >= 0.6: gaps.append([round(sp[-1][2], 2), round(dur, 2)])
    return {'paragraphs': paras, 'match_ratio': round(total, 3), 'extra_runs': extra, 'gaps': gaps, 'issues': issues,
            'last_word_end': round(sp[-1][2], 3) if sp else 0}

def timeline_md(s, a, mp3name, dur):
    L = [f"# {s['id']} {s['title_en']}: narration timeline", '',
         f"Final MP3: `Audio Files/Final Done/{mp3name}`, duration **{dur:.2f} s**; last word ends {a['last_word_end']:.2f} s. "
         'All times are seconds on this MP3. Word times come from the verified `.words.json`, mapped onto the script words '
         '(a `~` before a time means the word was not recognised by Whisper and its time is interpolated).', '',
         f"Pauses of 0.6 s or more (room for effects): " + ', '.join(f'{g[0]:.2f}-{g[1]:.2f}' for g in a['gaps']), '']
    for p, sp in zip(s['paragraphs'], a['paragraphs']):
        L += [f"## P{p['n']} ({p['segment']}) {sp['start']:.2f}-{sp['end']:.2f} s", '',
              'AR: ' + p['ar'], '', 'EN: ' + p['en'], '',
              'Words: ' + ' | '.join(f"{'' if w[3] else '~'}{w[1]:.2f} {w[0]}" for w in sp['words']), '']
    return '\n'.join(L)

def run(write=True, only=None):
    c = db.connect()
    stories, index, cuts, rewrites = read_script()
    man = manifest()
    report = []
    ids = sorted(set(stories) | set(COMPLETED))
    for sid in ids:
        if only and sid not in only: continue
        if sid in COMPLETED:
            r = index.get(sid) or [sid, stories.get(sid, {}).get('title_en'), None, None, None]
            c.execute('INSERT INTO stories (id, title_en, title_ar, collection, eligible, completed_before, folder, input_status, input_notes, updated) '
                      'VALUES (?,?,?,?,0,1,?,?,?,?) ON CONFLICT(id) DO UPDATE SET eligible=0, completed_before=1, folder=excluded.folder, updated=excluded.updated',
                      (sid, r[1], r[2], r[3], f'Animations/{COMPLETED[sid]}', 'complete', 'approved film; not re-queued', db.now()))
            continue
        s = stories[sid]; notes = []; status = 'ok'
        s['paragraphs'].sort(key=lambda p: p['n'])
        for p in s['paragraphs']:
            for k in ('ar', 'en'):
                if not p[k]: notes.append(f"P{p['n']} missing {k}"); status = 'blocked'
        if s.get('index_paragraphs') and s['index_paragraphs'] != len(s['paragraphs']):
            notes.append(f"Story Index says {s['index_paragraphs']} paragraphs, script has {len(s['paragraphs'])}"); status = 'blocked'
        if sid in cuts: notes.append('paragraph(s) removed from audio by design: ' + ', '.join(cuts[sid]))
        if not s['title_ar']: notes.append('no Arabic title in workbook (metadata only)')
        script_sha = hashlib.sha256(json.dumps(s['paragraphs'], ensure_ascii=False, sort_keys=True).encode()).hexdigest()
        mp3s = sorted(glob.glob(str(media.resolve(FINAL) / (sid + '_*_full_slowed.mp3'))))   # MP3s: Audio/Final in the media folder
        row = dict(id=sid, title_en=s['title_en'], title_ar=s['title_ar'], collection=s['collection'], n_paragraphs=len(s['paragraphs']),
                   segments=json.dumps([p['segment'] for p in s['paragraphs']]), script_sha=script_sha, eligible=1, completed_before=0,
                   folder=f'Animations/{sid}', updated=db.now())
        if len(mp3s) != 1:
            notes.append(f'{len(mp3s)} final MP3 candidates'); status = 'blocked'
        else:
            mp3 = pathlib.Path(mp3s[0]); wj = FINAL / (mp3.name + '.words.json')   # word timings are tracked in Git (repository folder)
            row.update(mp3_file=mp3.name, mp3_sha=sha(mp3))
            try: dur = duration(mp3); row['mp3_duration'] = round(dur, 3)
            except Exception as e: notes.append(f'MP3 unreadable: {e}'); status = 'blocked'; dur = None
            m = man.get(mp3.name, {})
            row['words_status'] = m.get('Status', 'not in manifest')
            if m.get('Status') == 'MANUAL REVIEW': notes.append('timing manifest: MANUAL REVIEW (' + m.get('Warnings', '') + ')'); status = 'warn' if status == 'ok' else status
            if not wj.exists(): notes.append('no .words.json'); status = 'blocked'
            elif dur:
                row.update(words_file=wj.name, words_sha=sha(wj))
                row['assembly_file'] = find_assembly(mp3.name, row['mp3_sha'])
                a = analyse(s, mp3, wj, dur)
                row['match_ratio'] = a['match_ratio']; row['para_min_ratio'] = min(p['ratio'] for p in a['paragraphs'])
                for i in a['issues']: notes.append(i); status = 'blocked'
                if a['match_ratio'] < 0.75: notes.append(f"script/narration word match only {a['match_ratio']:.0%}"); status = 'blocked'
                elif a['match_ratio'] < 0.85: notes.append(f"script/narration word match {a['match_ratio']:.0%}"); status = 'warn' if status == 'ok' else status
                for p in a['paragraphs']:
                    if p['ratio'] < 0.6: notes.append(f"P{p['n']} matches the narration poorly ({p['ratio']:.0%})"); status = 'blocked'
                for x in a['extra_runs']:
                    notes.append(f"narration {x['from']:.1f}-{x['to']:.1f} s has {x['n']} words not in the script")
                    if x['n'] >= 12: status = 'blocked'
                    elif status == 'ok': status = 'warn'
                if sid in rewrites:
                    ok = min(p['ratio'] for p in a['paragraphs']) >= 0.9
                    notes.append(f"workbook Duration Rewrites says '{rewrites[sid]}': " + ('the final MP3 matches the revised script (verified)' if ok else 'the final MP3 may predate the revised script'))
                    if not ok: status = 'blocked'
                if write:
                    d = REPO / 'Animations' / sid; (d / 'story').mkdir(parents=True, exist_ok=True); (d / 'planning' / 'inputs').mkdir(parents=True, exist_ok=True)
                    (d / 'story' / 'arabic.txt').write_text('\n\n'.join(p['ar'] for p in s['paragraphs']) + '\n', encoding='utf8')
                    (d / 'story' / 'arabic_pauses.txt').write_text('\n\n'.join(p['ar_pauses'] for p in s['paragraphs']) + '\n', encoding='utf8')
                    (d / 'story' / 'english.txt').write_text('\n\n'.join(p['en'] for p in s['paragraphs']) + '\n', encoding='utf8')
                    (d / 'story' / 'script.json').write_text(json.dumps({'id': sid, 'title_en': s['title_en'], 'title_ar': s['title_ar'],
                        'collection': s['collection'], 'source': 'Spreadsheets/Script_Updated.xlsx', 'script_sha256': script_sha,
                        'paragraphs': s['paragraphs']}, ensure_ascii=False, indent=1) + '\n', encoding='utf8')
                    tl = {'id': sid, 'mp3': f'Audio Files/Final Done/{mp3.name}', 'mp3_sha256': row['mp3_sha'], 'words_sha256': row['words_sha'],
                          'script_sha256': script_sha, 'duration': round(dur, 3), **a}
                    (d / 'planning' / 'inputs' / 'timeline.json').write_text(json.dumps(tl, ensure_ascii=False) + '\n', encoding='utf8')
                    (d / 'planning' / 'inputs' / 'timeline.md').write_text(timeline_md(s, a, mp3.name, dur) + '\n', encoding='utf8')
                    sj = d / 'story.json'
                    if not sj.exists():
                        sj.write_text(json.dumps({'id': sid, 'title': s['title_en'], 'arabicFont': 'naskh', 'arabicScript': 'story/arabic.txt',
                            'englishScript': 'story/english.txt', 'narration': f'../../Audio Files/Final Done/{mp3.name}',
                            'subtitle': 'library', 'scenes': []}, ensure_ascii=False, indent=1) + '\n', encoding='utf8')
        row.update(input_status=status, input_notes='; '.join(notes))
        cols = list(row)
        c.execute(f"INSERT INTO stories ({','.join(cols)}) VALUES ({','.join('?' * len(cols))}) ON CONFLICT(id) DO UPDATE SET "
                  + ','.join(f'{k}=excluded.{k}' for k in cols if k != 'id'), [row[k] for k in cols])
        report.append((sid, status, row.get('match_ratio'), '; '.join(notes)))
    c.commit(); db.log(c, None, 'import', f'{len(report)} stories imported')
    return report
