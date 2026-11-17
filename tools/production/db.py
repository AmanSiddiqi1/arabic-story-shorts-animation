"""Production database (SQLite): the authoritative record of the Arabic Story Shorts production.

File: production/production.db (local, not in Git). production/state.json is a Git-tracked export written by
`prod.py export`; `prod.py restore` rebuilds the database from it if the .db file is lost.
"""
import datetime, json, pathlib, sqlite3

REPO = pathlib.Path(__file__).resolve().parents[2]
DB = REPO / 'production' / 'production.db'
STATE = REPO / 'production' / 'state.json'

SCHEMA = """
CREATE TABLE IF NOT EXISTS stories (
  id TEXT PRIMARY KEY, title_en TEXT, title_ar TEXT, collection TEXT, n_paragraphs INTEGER, segments TEXT,
  script_sha TEXT, mp3_file TEXT, mp3_sha TEXT, mp3_duration REAL, words_file TEXT, words_sha TEXT,
  words_status TEXT, assembly_file TEXT, match_ratio REAL, para_min_ratio REAL,
  input_status TEXT, input_notes TEXT, eligible INTEGER, completed_before INTEGER, folder TEXT,
  approval TEXT DEFAULT 'none', updated TEXT);
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT, story_id TEXT, stage TEXT, status TEXT, model TEXT, agent_id TEXT,
  attempt INTEGER DEFAULT 1, pid INTEGER, started TEXT, finished TEXT, notes TEXT, outputs TEXT);
CREATE TABLE IF NOT EXISTS plans (
  story_id TEXT, version INTEGER, status TEXT, md_path TEXT, json_path TEXT, model TEXT, agent_id TEXT,
  created TEXT, script_sha TEXT, mp3_sha TEXT, words_sha TEXT, library_rev TEXT, n_scenes INTEGER, n_actions INTEGER,
  new_assets TEXT, warnings TEXT, PRIMARY KEY (story_id, version));
CREATE TABLE IF NOT EXISTS renders (
  story_id TEXT, version TEXT, path TEXT, sha TEXT, duration REAL, status TEXT, qc TEXT, created TEXT,
  PRIMARY KEY (story_id, version));
CREATE TABLE IF NOT EXISTS reviews (
  story_id TEXT, round INTEGER, model TEXT, agent_id TEXT, path TEXT, verdict TEXT, created TEXT,
  PRIMARY KEY (story_id, round));
CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, t TEXT, story_id TEXT, kind TEXT, msg TEXT);
CREATE TABLE IF NOT EXISTS config (key TEXT PRIMARY KEY, value TEXT);
CREATE TABLE IF NOT EXISTS usage_log (id INTEGER PRIMARY KEY AUTOINCREMENT, t TEXT, weekly_pct REAL, resets TEXT, done_v1 INTEGER, active INTEGER, note TEXT);
"""
DEFAULTS = {'max_fable': '3', 'max_opus': '2', 'max_render': '1', 'max_validate': '3', 'max_library': '1',
            'pause_planning': '0', 'pause_production': '0', 'pause_render': '0', 'max_plan_attempts': '3',
            'max_revision_rounds': '2', 'stop_new_at_pct': '95', 'reserve_factor': '1.25'}
TABLES = ['stories', 'tasks', 'plans', 'renders', 'reviews', 'events', 'config', 'usage_log']

def now(): return datetime.datetime.now().isoformat(timespec='seconds')

def connect():
    DB.parent.mkdir(parents=True, exist_ok=True)
    c = sqlite3.connect(DB, timeout=30); c.row_factory = sqlite3.Row
    c.execute('PRAGMA journal_mode=WAL'); c.executescript(SCHEMA)
    for k, v in DEFAULTS.items(): c.execute('INSERT OR IGNORE INTO config VALUES (?,?)', (k, v))
    c.commit(); return c

def cfg(c, k): return c.execute('SELECT value FROM config WHERE key=?', (k,)).fetchone()[0]

def log(c, story, kind, msg):
    c.execute('INSERT INTO events (t, story_id, kind, msg) VALUES (?,?,?,?)', (now(), story, kind, msg)); c.commit()

def export(c):
    data = {t: [dict(r) for r in c.execute(f'SELECT * FROM {t}')] for t in TABLES}
    STATE.write_text(json.dumps(data, ensure_ascii=False, indent=0, sort_keys=True) + '\n', encoding='utf8')
    return STATE

def restore():
    if DB.exists(): raise SystemExit(f'{DB} exists; move it aside first if you really want to restore from {STATE.name}')
    data = json.loads(STATE.read_text(encoding='utf8')); c = connect()
    for t in TABLES:
        c.execute(f'DELETE FROM {t}')
        for r in data.get(t, []):
            c.execute(f'INSERT INTO {t} ({",".join(r)}) VALUES ({",".join("?" * len(r))})', list(r.values()))
    c.commit(); return c
