# builds timing.json: Arabic/English subtitle chunks with start/end times from the narration
import json,re,difflib
AR=open('../../monkey-and-the-turtle/The_Monkey_and_the_Turtle_Simplified_Arabic.txt',encoding='utf8').read()
EN=open('../../monkey-and-the-turtle/The_Monkey_and_the_Turtle_English_Translation.txt',encoding='utf8').read()
arP=[p.strip() for p in AR.split('\n\n') if p.strip()]
enP=[p.strip() for p in EN.split('\n\n') if p.strip()]
assert len(arP)==9 and len(enP)==9,(len(arP),len(enP))
# '|' marks subtitle chunk breaks; the same count on both sides
A=[
"في يوم مشمس، كان قِرد يعيش فوق شجرة تين كبيرة، قرب نهر هادئ.|كان يأكل التين كل يوم، وأحيانًا تسقط بعض الثمار في الماء.",
"وفي النهر، كان يعيش غَيْلَم، وهو سُلَحْفاة كبيرة.|رأى الغيلم ثمرة تين تطفو على الماء، فأكلها وأعجبه طعمها.|قال للقرد: «شكرًا لك على هذه الفاكهة اللذيذة!»|فضحك القرد، وألقى إليه ثمرة أخرى.",
"ومرَّت الأيام، وأصبح القرد والغيلم صديقين.|كانا يتحدثان كل صباح، ويأكلان التين قرب النهر.|لكن الغيلم صار يقضي وقتًا طويلًا بعيدًا عن بيته.",
"غضبت زوجته وقالت: «أنت تقضي وقتك كله مع القرد!»|ثم تظاهرت بالمرض، وقالت: «لن أشفى إلا إذا أكلت قَلْب قرد!»|حزن الغيلم، لكنه قرر أن يخدع صديقه.",
"في الصباح، قال الغيلم للقرد:|«يا صديقي، تعال معي إلى بيتي في الجزيرة. هناك أشجار جميلة وفاكهة كثيرة».|فرح القرد، وقفز على ظَهْر الغيلم. وبدأ الغيلم يسبح به في النهر.",
"وفي وسط الماء، توقف الغيلم فجأة.|سأله القرد: «لماذا توقفت؟ هل هناك خطر؟»|تنهد الغيلم وقال: «زوجتي مريضة، وتحتاج إلى قَلْب قرد كي تشفى».",
"خاف القرد، لكنه فكر بسرعة وقال:|«يا صديقي، لماذا لم تخبرني قبل أن نغادر؟ لقد تركت قلبي فوق الشجرة!|عُد بي الآن، وسآخذه معي».",
"صدق الغيلم كلامه، وعاد به إلى الشاطئ.|وما إن اقتربا من الشجرة، حتى قفز القرد إلى أحد أغصانها العالية.|ثم نظر إلى الغيلم وقال: «هل تصدق أن القرد يستطيع أن يترك قلبه فوق الشجرة؟|لقد حاولت أن تخدعني!»",
"خفض الغيلم رأسه خجلًا، وسبح بعيدًا.|أما القرد، فبقي فوق شجرته آمنًا، يأكل التين وينظر إلى النهر.",
]
E_=[
"One sunny day, a monkey lived in a large fig tree near a calm river.|He ate figs every day, and sometimes some of the fruit fell into the water.",
"In the river lived a large turtle.|The turtle saw a fig floating on the water, ate it, and liked its taste.|He said to the monkey, “Thank you for this delicious fruit!”|The monkey laughed and tossed him another fig.",
"Days passed, and the monkey and the turtle became friends.|They talked every morning and ate figs by the river.|But the turtle began spending a long time away from his home.",
"His wife became angry and said, “You spend all your time with the monkey!”|Then she pretended to be sick and said, “I won’t get better unless I eat a monkey’s heart!”|The turtle felt sad, but he decided to trick his friend.",
"In the morning, the turtle said to the monkey,|“My friend, come with me to my home on the island. There are beautiful trees and plenty of fruit there.”|The monkey was happy and jumped onto the turtle’s back. The turtle began swimming with him through the river.",
"In the middle of the water, the turtle suddenly stopped.|The monkey asked, “Why did you stop? Is there danger?”|The turtle sighed and said, “My wife is sick, and she needs a monkey’s heart to get better.”",
"The monkey was frightened, but he thought quickly and said,|“My friend, why didn’t you tell me before we left? I left my heart up in the tree!|Take me back now, and I’ll bring it with me.”",
"The turtle believed him and took him back to the riverbank.|As soon as they came near the tree, the monkey jumped onto one of its high branches.|Then he looked at the turtle and said, “Do you really believe a monkey can leave his heart up in a tree?|You tried to trick me!”",
"The turtle lowered his head in shame and swam away.|The monkey remained safe in his tree, eating figs and looking at the river.",
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
        t1=tm[b][0] if b<n else 180.7
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
