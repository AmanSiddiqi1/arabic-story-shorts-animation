# builds timing.json: Arabic/English subtitle chunks with start/end times from the narration
import json,re,difflib,subprocess
AR=open('../../lion-and-the-hare/The_Lion_and_the_Hare_Arabic.txt',encoding='utf8').read()
EN=open('../../lion-and-the-hare/The_Lion_and_the_Hare_English_Translation.txt',encoding='utf8').read()
arP=[p.strip() for p in AR.split('\n\n') if p.strip()]
enP=[p.strip() for p in EN.split('\n\n') if p.strip()]
N=8
assert len(arP)==N and len(enP)==N,(len(arP),len(enP))
DUR=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0','narration.mp3']))
# '|' marks subtitle chunk breaks; the same count on both sides
A=[
"في غابة واسعة، كان أسد يخيف جميع الحيوانات.|كان يخرج كل يوم ليصطاد، فتجري الحيوانات بين الأشجار وتختبئ.|ولم يعد أحد يشعر بالأمان، حتى في وضح النهار.",
"اجتمعت الحيوانات يومًا، وقررت أن تتحدث إلى الأسد.|قالت له: «سنرسل إليك حيوانًا واحدًا كل يوم،|إذا وعدت أن تتوقف عن مطاردتنا.»|وافق الأسد، وعاد الهدوء إلى الغابة لبعض الوقت.",
"وفي صباح جديد، جاء دور أرنب صغير.|خاف أصدقاؤه عليه، لكنه كان ذكيًا ويحب التفكير.|مشى ببطء نحو مكان الأسد،|وفي الطريق ظهرت في رأسه فكرة غريبة.",
"انتظر الأسد طويلًا حتى شعر بالجوع والغضب.|وحين وصل الأرنب، زأر الأسد: «أين كنت؟ ولماذا تأخرت؟»|ارتجف الأرنب قليلًا، ثم قال:|«يا ملك الغابة، حدث أمر خطير!»",
"قال الأرنب: «كنت قادمًا مع أرنب آخر،|ولكن أسدًا ثانيًا أوقفنا وأخذ رفيقي.|قال إنه الملك الحقيقي لهذه الغابة!»|غضب الأسد أكثر، وصاح: «أرني ذلك الأسد فورًا!»",
"قاد الأرنب الأسد إلى بئر عميقة فيها ماء صافٍ.|وقف على حافتها وقال: «الأسد الآخر في الأسفل. انظر بنفسك!»|اقترب الأسد بحذر، ونظر إلى الماء.",
"رأى الأسد صورته في الماء، وظن أنها صورة عدوه.|زأر بقوة، فتحركت الصورة كأنها تزأر أيضًا.|قفز نحوها، وسقط في البئر العميقة، ولم يستطع الخروج.",
"عاد الأرنب وحده إلى الغابة.|تجمعت الحيوانات حوله، وسألته بدهشة عما حدث.|حكى لها قصة البئر، ففرحت جميعًا.|ومن ذلك اليوم، صارت تمشي بين الأشجار دون خوف.",
]
E_=[
"In a wide forest, a lion frightened every animal.|He went hunting each day, and the animals ran among the trees to hide.|No one felt safe anymore, even in broad daylight.",
"One day, the animals gathered and decided to speak to the lion.|“We will send you one animal each day|if you promise to stop chasing us,” they said.|The lion agreed, and the forest grew calm for a while.",
"One morning, it was a little hare’s turn.|His friends were afraid for him, but he was clever and liked to think.|He walked slowly toward the lion,|and an unusual idea came to him along the way.",
"The lion waited so long that he became hungry and furious.|When the hare arrived, the lion roared, “Where were you? Why are you late?”|The hare trembled a little, then said,|“King of the forest, something terrible happened!”",
"“I was coming with another hare,” said the little hare,|“but a second lion stopped us and took my companion.|He said he was the true king of this forest!”|The lion became even angrier and shouted, “Show me that lion at once!”",
"The hare led the lion to a deep well filled with clear water.|He stood at the edge and said, “The other lion is down there. Look for yourself!”|The lion approached carefully and looked into the water.",
"The lion saw his own reflection in the water and thought it was his enemy.|He roared, and the reflection moved as though it were roaring back.|He leaped toward it, fell into the deep well, and could not get out.",
"The hare returned to the forest alone.|The animals gathered around him and asked in amazement what had happened.|He told them about the well, and they rejoiced.|From that day on, they walked among the trees without fear.",
]
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
for s in json.load(open('whisper.json',encoding='utf8')):
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
err=sp.run(['ffmpeg','-hide_banner','-i','narration.mp3','-af','silencedetect=noise=-35dB:d=0.35','-f','null','-'],capture_output=True,text=True).stderr
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
json.dump(dict(chunks=chunks,words=[dict(p=w[0],c=w[1],t=w[2],a=round(t[0],3),b=round(t[1],3)) for w,t in zip(words,tm)]),open('timing.json','w'),ensure_ascii=False,indent=1)
for e in chunks: print(e['p']+1,e['c'],e['a'],e['b'],e['ar'][:28])
