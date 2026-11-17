"""Minimal read-only .xlsx reader (standard library only): sheets -> list of rows of cell values (strings/numbers)."""
import re, zipfile, xml.etree.ElementTree as ET
NS = {'m': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main',
      'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}
def _col(ref):
    n = 0
    for ch in re.match(r'[A-Z]+', ref).group(): n = n * 26 + ord(ch) - 64
    return n - 1
def _text(si):
    return ''.join(t.text or '' for t in si.iter('{%s}t' % NS['m']))
def read(path):
    z = zipfile.ZipFile(path)
    shared = [_text(si) for si in ET.fromstring(z.read('xl/sharedStrings.xml')).findall('m:si', NS)] if 'xl/sharedStrings.xml' in z.namelist() else []
    wb = ET.fromstring(z.read('xl/workbook.xml'))
    rels = {r.get('Id'): r.get('Target') for r in ET.fromstring(z.read('xl/_rels/workbook.xml.rels'))}
    out = {}
    for s in wb.find('m:sheets', NS):
        tgt = rels[s.get('{%s}id' % NS['r'])].lstrip('/'); tgt = tgt if tgt.startswith('xl/') else 'xl/' + tgt
        rows = []
        for row in ET.fromstring(z.read(tgt)).iter('{%s}row' % NS['m']):
            vals = {}
            for c in row.findall('m:c', NS):
                t = c.get('t'); v = c.find('m:v', NS)
                if t == 's' and v is not None: val = shared[int(v.text)]
                elif t == 'inlineStr': val = _text(c.find('m:is', NS))
                elif v is not None:
                    val = v.text
                    try: val = float(val); val = int(val) if val.is_integer() else val
                    except ValueError: pass
                else: val = None
                vals[_col(c.get('r'))] = val
            rows.append([vals.get(i) for i in range(max(vals) + 1)] if vals else [])
        out[s.get('name')] = rows
    return out
