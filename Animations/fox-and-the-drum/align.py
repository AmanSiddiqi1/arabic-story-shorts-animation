# builds timing.json: Arabic/English subtitle chunks with start/end times from the narration
import json,re,difflib
AR=open('../../fox-and-the-drum/The_Fox_and_the_Drum_Simplified_Arabic.txt',encoding='utf8').read()
EN=open('../../fox-and-the-drum/The_Fox_and_the_Drum_English_Translation.txt',encoding='utf8').read()
arP=[p.strip() for p in AR.split('\n\n') if p.strip()]
enP=[p.strip() for p in EN.split('\n\n') if p.strip()]
assert len(arP)==9 and len(enP)==9,(len(arP),len(enP))
# '|' marks subtitle chunk breaks; the same count on both sides
A=[
"في يوم من الأيام، كان ثعلب جائع يمشي في الغابة.|بحث عن طعام بين الأشجار، لكنه لم يجد شيئًا.|قال لنفسه: «سأواصل البحث حتى أجد ما آكله».",
"وبينما كان يمشي، سمع صوتًا عاليًا: «بوم! بوم!»|توقف فجأة، ونظر حوله بخوف.|قال: «ما هذا الصوت؟ هل هناك حيوان كبير قريب مني؟»",
"اختبأ الثعلب خلف شجرة، وانتظر قليلًا.|سمع الصوت مرة أخرى، لكنه لم ير أي حيوان.|شعر بالخوف، وأراد أن يهرب بعيدًا.",
"ثم رفع رأسه، فرأى طبلًا كبيرًا تحت شجرة.|كانت أغصان الشجرة تتحرك مع الرِّيح، وتضرب الطبل.|وكلما ضربت الأغصان الطبل، خرج منه صوت قوي.",
"نظر الثعلب إلى الطبل من بعيد. كان الطبل كبيرًا، وصوته عاليًا.|فكر الثعلب: «ربما يوجد في داخله حيوان ضخم،|وربما أجد فيه طعامًا كثيرًا».",
"اقترب الثعلب ببطء، خطوة بعد خطوة.|لمس الطبل بقدمه، فسمع الصوت مرة أخرى.|قفز إلى الخلف، ثم لاحظ أن الطبل لا يتحرك وحده.",
"جمع الثعلب شجاعته، واقترب من الطبل من جديد.|شم الطبل، ثم حاول فتحه بأسنانه.|وبعد جهد، صنع ثقبًا في جلد الطبل.",
"نظر الثعلب داخل الطبل، فلم يجد حيوانًا ولا طعامًا. كان الطبل فارغًا!|قال بدهشة: «كل هذا الصوت الكبير، ولا شيء في الداخل!»",
"جلس الثعلب وفكر فيما حدث. قال: «لقد خفت قبل أن أعرف الحقيقة.|الصوت العالي لا يعني دائمًا أن هناك خطرًا، والشيء الكبير ليس دائمًا مهمًّا».|ثم ترك الطبل، ومضى يبحث عن طعام.",
]
E_=[
"One day, a hungry fox was walking through the forest.|He searched for food among the trees, but he found nothing.|He said to himself, “I will keep searching until I find something to eat.”",
"As he was walking, he heard a loud sound: “Boom! Boom!”|He stopped suddenly and looked around in fear.|He said, “What is that sound? Is there a large animal near me?”",
"The fox hid behind a tree and waited a little while.|He heard the sound again, but he did not see any animal.|He felt afraid and wanted to run far away.",
"Then he lifted his head and saw a large drum beneath a tree.|The tree's branches were moving in the wind and striking the drum.|Every time the branches hit the drum, it made a loud sound.",
"The fox looked at the drum from a distance. The drum was large, and its sound was loud.|The fox thought, “Perhaps there is an enormous animal inside it,|and perhaps I will find plenty of food in it.”",
"The fox approached slowly, step by step.|He touched the drum with his foot and heard the sound again.|He jumped backward, then noticed that the drum did not move by itself.",
"The fox gathered his courage and approached the drum again.|He sniffed the drum and then tried to open it with his teeth.|After some effort, he made a hole in the drum's skin.",
"The fox looked inside the drum, but he found neither an animal nor any food. The drum was empty!|He said in surprise, “All that loud noise, and there is nothing inside!”",
"The fox sat down and thought about what had happened. He said, “I was afraid before I knew the truth.|A loud sound does not always mean that there is danger, and something large is not always important.”|Then he left the drum and went on searching for food.",
]
def rebuild(mine,orig,tag):
    out=[]
    for i in range(9):
        counts=[len(c.split()) for c in mine[i].split('|')]
        ow=orig[i].split()
        assert sum(counts)==len(ow),(tag,i,sum(counts),len(ow))
        k=0;ch=[]
        for c in counts: ch.append(' '.join(ow[k:k+c]));k+=c
        out.append('|'.join(ch))
        assert ' '.join(ch)==' '.join(ow)
    return out
A=rebuild(A,arP,'AR');E_=rebuild(E_,enP,'EN')
for i in range(9): assert len(A[i].split('|'))==len(E_[i].split('|')),i
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
words=[] # script words per paragraph<=8, with chunk index
for p in range(9):
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
        t1=tm[b][0] if b<n else 161.8
        gap=b-a-1;idx=k-a-1
        tm[k]=(t0+(t1-t0)*idx/gap,t0+(t1-t0)*(idx+1)/gap)
chunks=[]
for p in range(9):
    ac=A[p].split('|');ec=E_[p].split('|')
    for c in range(len(ac)):
        ent=dict(p=p,c=c,ar=ac[c],en=ec[c])
        if True:
            ts=[tm[k] for k in range(n) if words[k][0]==p and words[k][1]==c]
            ent['a']=round(ts[0][0],3);ent['b']=round(ts[-1][1],3)
        chunks.append(ent)
json.dump(dict(chunks=chunks,words=[dict(p=w[0],c=w[1],t=w[2],a=round(t[0],3),b=round(t[1],3)) for w,t in zip(words,tm)]),open('timing.json','w'),ensure_ascii=False,indent=1)
for e in chunks: print(e['p']+1,e['c'],e['a'],e['b'],e['ar'][:28])
