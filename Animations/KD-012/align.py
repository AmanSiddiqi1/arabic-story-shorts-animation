# builds timing.json: Arabic/English subtitle chunks with start/end times from the narration (run after tx.py)
# Script files come from story.json. Chunk breaks: chunks_ar.txt / chunks_en.txt, one paragraph per line, '|' between
# subtitle chunks (2-4 per paragraph, the same count on both sides). The chunk text is rebuilt from the original script words,
# so it stays verbatim; if the chunk files are missing, each paragraph is one chunk.
import json,re,difflib,subprocess,pathlib
H=pathlib.Path(__file__).parent; CFG=json.load(open(H/'story.json',encoding='utf8'))
import sys; sys.path.insert(0,str(next(p/'Library' for p in H.resolve().parents if (p/'Library'/'media.py').exists()))); import media
NAR=str(media.resolve(H/CFG.get('narration','narration.mp3')))  # local narration by default (media.config.json)
AR=open(H/CFG['arabicScript'],encoding='utf8').read()
EN=open(H/CFG['englishScript'],encoding='utf8').read()
arP=[p.strip() for p in AR.split('\n\n') if p.strip()]
enP=[p.strip() for p in EN.split('\n\n') if p.strip()]
N=len(arP)
assert len(enP)==N,(len(arP),len(enP))
DUR=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',NAR]))
rdc=lambda f,P:[l.strip() for l in open(H/f,encoding='utf8').read().split('\n') if l.strip()] if (H/f).exists() else P
A=rdc('chunks_ar.txt',arP); E_=rdc('chunks_en.txt',enP)
assert len(A)==N and len(E_)==N,('chunk files need one line per paragraph',len(A),len(E_),N)
def rebuild(mine,orig,tag):
    out=[]
    for i in range(N):
        counts=[len(c.split()) for c in mine[i].split('|')]
        ow=orig[i].split()
        assert sum(counts)==len(ow),(tag,i,sum(counts),len(ow))
        k=0;ch=[]
        for c in counts: ch.append(' '.join(ow[k:k+c]));k+=c
        out.append('|'.join(ch))
        assert ' '.join(ch)==' '.join(ow)
    return out
A=rebuild(A,arP,'AR');E_=rebuild(E_,enP,'EN')
for i in range(N): assert len(A[i].split('|'))==len(E_[i].split('|')),i
print('verbatim OK')
def norm(w):
    w=re.sub(r'[ً-ْـ«»:،؟!.\"]','',w)
    w=re.sub('[إأآٱ]','ا',w).replace('ى','ي').replace('ة','ه').replace('ؤ','و').replace('ئ','ي')
    return w
wh=[]
for s in json.load(open(H/'whisper.json',encoding='utf8')):
    for w in s['w']:
        n=norm(w['t'].strip())
        if n: wh.append((n,w['a'],w['b']))
words=[] # script words per paragraph, with chunk index
for p in range(N):
    for c,ch in enumerate(A[p].split('|')):
        for w in ch.split():
            words.append((p,c,w,norm(w)))
n,m=len(words),len(wh)
def sim(a,b):
    if a==b: return 2.0
    r=difflib.SequenceMatcher(None,a,b).ratio()
    return 2*r-0.9 if r>0.5 else -0.8
# Needleman-Wunsch
G=-0.35
S=[[0]*(m+1) for _ in range(n+1)];B=[[0]*(m+1) for _ in range(n+1)]
for i in range(1,n+1): S[i][0]=i*G;B[i][0]=1
for j in range(1,m+1): S[0][j]=j*G;B[0][j]=2
for i in range(1,n+1):
    for j in range(1,m+1):
        d=S[i-1][j-1]+sim(words[i-1][3],wh[j-1][0]);u=S[i-1][j]+G;l=S[i][j-1]+G
        S[i][j],B[i][j]=max((d,0),(u,1),(l,2))
i,j=n,m;tm=[None]*n
while i>0 or j>0:
    b=B[i][j]
    if i>0 and j>0 and b==0:
        if sim(words[i-1][3],wh[j-1][0])>0: tm[i-1]=(wh[j-1][1],wh[j-1][2])
        i-=1;j-=1
    elif i>0 and (j==0 or b==1): i-=1
    else: j-=1
print('matched',sum(t is not None for t in tm),'of',n)
# interpolate gaps
for k in range(n):
    if tm[k] is None:
        a=k-1
        while a>=0 and tm[a] is None:a-=1
        b=k+1
        while b<n and tm[b] is None:b+=1
        t0=tm[a][1] if a>=0 else 0.0
        t1=tm[b][0] if b<n else DUR
        gap=b-a-1;idx=k-a-1
        tm[k]=(t0+(t1-t0)*idx/gap,t0+(t1-t0)*(idx+1)/gap)
# refinement: a word time that falls inside a detected silence is moved to the edge of that silence
import subprocess as sp
err=sp.run(['ffmpeg','-hide_banner','-i',NAR,'-af','silencedetect=noise=-35dB:d=0.35','-f','null','-'],capture_output=True,text=True).stderr
ss=[float(x) for x in re.findall(r'silence_start: ([0-9.]+)',err)];se=[float(x) for x in re.findall(r'silence_end: ([0-9.]+)',err)]
sil=list(zip(ss,se)) if len(se)==len(ss) else list(zip(ss,se+[DUR]))
fixed=0
for k in range(n):
    a,b=tm[k]
    for s0,s1 in sil:
        if s0-0.2<=a<s1 and s1<b+0.6: a=max(a,s1-0.05);fixed+=1
        if s0<b<=s1 and s0>a-0.6: b=min(b,s0+0.08)
    if b<a+0.05: b=a+0.05
    tm[k]=(a,b)
print('silence-refined starts',fixed)
chunks=[]
for p in range(N):
    ac=A[p].split('|');ec=E_[p].split('|')
    for c in range(len(ac)):
        ent=dict(p=p,c=c,ar=ac[c],en=ec[c])
        if True:
            ts=[tm[k] for k in range(n) if words[k][0]==p and words[k][1]==c]
            ent['a']=round(ts[0][0],3);ent['b']=round(ts[-1][1],3)
        chunks.append(ent)
json.dump(dict(chunks=chunks,words=[dict(p=w[0],c=w[1],t=w[2],a=round(t[0],3),b=round(t[1],3)) for w,t in zip(words,tm)]),open(H/'timing.json','w',encoding='utf8'),ensure_ascii=False,indent=1)
for e in chunks: print(e['p']+1,e['c'],e['a'],e['b'],e['ar'][:28])
