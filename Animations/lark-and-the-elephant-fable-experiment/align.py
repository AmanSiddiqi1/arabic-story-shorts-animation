# builds timing.json: Arabic/English subtitle chunks with start/end times from the narration
import json,re,difflib
AR=open('../../lark-and-the-elephant/Original Longer version/The_Lark_and_the_Elephant_Simplified_Arabic.txt',encoding='utf8').read()
EN=open('../../lark-and-the-elephant/Original Longer version/The_Lark_and_the_Elephant_English_Translation.txt',encoding='utf8').read()
arP=[p.strip() for p in AR.split('\n\n') if p.strip()]
enP=[p.strip() for p in EN.split('\n\n') if p.strip()]
assert len(arP)==9 and len(enP)==9,(len(arP),len(enP))
# '|' marks subtitle chunk breaks; the same count on both sides
A=[
"في غابة خضراء، عاشت قُبَّرَة صغيرة قرب طريق واسع.|صنعت عُشًّا بين الأعشاب، ووضعت فيه بيضًا، وكان عندها فِراخ صغيرة.|كانت تعتني ببيتها وصغارها كل يوم.",
"في يوم من الأيام، جاء فيل ضخم يمشي في الطريق.|رأى العُشّ الصغير، لكنه لم يهتم به.|داس على العُشّ بقدمه، فكسر البيض وماتت الفِراخ.",
"عادت القُبَّرَة إلى عُشّها، ورأت ما حدث، فبكت بحزن شديد.|طارت إلى الفيل وسألته: «لماذا كسرت بيضي وقتلت فِراخي؟ هل فعلت هذا لأنني صغيرة وضعيفة؟»|أجاب الفيل بغرور: «نعم!»",
"غضبت القُبَّرَة، لكنها عرفت أنها لا تستطيع مواجهة الفيل وحدها.|ذهبت إلى الطيور الأخرى وحكت لها ما حدث. قالت الطيور: «نحن أيضًا صغار، فكيف نساعدك؟»|فكرت القُبَّرَة في خُطّة.",
"ذهبت إلى الغِربان وقالت: «هل تستطيعون أن تساعدوني؟ انقروا عيني الفيل حتى لا يرى الطريق».|وافقت الغِربان، وطارت إلى الفيل، ونقرت عينيه حتى صار أعمى.",
"صار الفيل لا يرى أمامه، ولا يعرف الطريق إلى الطعام والماء.|مشى وقتًا طويلًا حتى شعر بعطش شديد.|كان يسمع الأصوات حوله، لكنه لم يستطع أن يرى شيئًا.",
"ثم ذهبت القُبَّرَة إلى ضَفادِع تعيش قرب غدير صغير.|قالت: «أريد مساعدتكم أيضًا. اذهبوا إلى حُفرة عميقة، واجلسوا قربها، وأصدروا أصواتًا عالية.|سيظن الفيل أن هناك ماء».",
"ذهبت الضفادع إلى الحُفرة، وبدأت تصدر أصواتًا عالية.|سمع الفيل أصواتها، وظن أن الغدير قريب. سار نحو الصوت لأنه كان عطشانًا،|ثم سقط في الحُفرة العميقة، ولم يستطع الخروج.",
"طارت القُبَّرَة إلى الحُفرة وقالت للفيل:|«لقد احتقرتني لأنني صغيرة وضعيفة. لكن أصدقائي تعاونوا معي، وأنت الآن تعرف نتيجة غرورك».|وهكذا عرف الجميع أن التعاون قد يكون أقوى من القوة وحدها.",
]
E_=[
"In a green forest, a little lark lived near a wide path.|She built a nest among the grass and laid eggs in it, and she also had little chicks.|Every day, she cared for her home and her young.",
"One day, a huge elephant came walking along the path.|He saw the little nest, but he did not care about it.|He stepped on the nest, breaking the eggs, and the chicks died.",
"The lark returned to her nest and saw what had happened. She cried with great sadness.|She flew to the elephant and asked, “Why did you break my eggs and kill my chicks? Did you do this because I am small and weak?”|The elephant answered arrogantly, “Yes!”",
"The lark was angry, but she knew she could not face the elephant alone.|She went to the other birds and told them what had happened. The birds said, “We are small too, so how can we help you?”|The lark thought of a plan.",
"She went to the crows and said, “Can you help me? Peck the elephant’s eyes so he cannot see the path.”|The crows agreed, flew to the elephant, and pecked his eyes until he was blind.",
"The elephant could no longer see in front of him or find his way to food and water.|He walked for a long time until he became very thirsty.|He could hear sounds around him, but he could not see anything.",
"Then the lark went to some frogs who lived near a small pond.|She said, “I need your help too. Go to a deep pit, sit near it, and make loud sounds.|The elephant will think there is water there.”",
"The frogs went to the pit and began making loud sounds.|The elephant heard them and thought the pond was nearby. Because he was thirsty, he walked toward the sound.|Then he fell into the deep pit and could not get out.",
"The lark flew to the pit and said to the elephant,|“You looked down on me because I am small and weak. But my friends worked together to help me, and now you know the result of your arrogance.”|In this way, everyone learned that cooperation can be stronger than strength alone.",
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
        t1=tm[b][0] if b<n else 193.2
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
