# builds timing.json: Arabic/English subtitle chunks with start/end times from the narration
import json,re,difflib
AR=open('../../thief-and-the-moonbeam/The_Thief_and_the_Moonbeam Arabic.txt',encoding='utf8').read()
EN=open('../../thief-and-the-moonbeam/The_Thief_and_the_Moonbeam_English.txt',encoding='utf8').read()
arP=[p.strip() for p in AR.split('\n\n') if p.strip()]
enP=[p.strip() for p in EN.split('\n\n') if p.strip()][1:]  # drop the 2-line header block below
enAll=[p.strip() for p in EN.split('\n') if p.strip()]
enP=enAll[2:]
assert len(arP)==10 and len(enP)==10,(len(arP),len(enP))
# '|' marks subtitle chunk breaks; the same count on both sides
A=[
"في ليلة صافية، كان القمر يضيء بيوت المدينة.|فوق سَطْح بيت كبير، اقترب ثلاثة لُصوص من فتحة في السقف.|ظَنُّوا أنَّ أهل البيت نائمون.",
"لكنَّ صاحب البيت سَمِعَ خطواتهم.|فتح عينيه بهدوء، ثم أَيْقَظَ زوجته وهَمَسَ:|«هناك لُصوص فوق السطح. لا تخافي، عندي فكرة».",
"قال لها: «اسأليني بصوت عالٍ: كيف جمعتَ مالك؟»|رفعت الزوجة صوتها وقالت:|«يا زوجي، كيف أصبحتَ غنيًّا؟ أخبرني بِسِرِّكَ!».",
"تَظَاهَرَ الرجل بالتردُّد وقال: «لا أريد أن يَسْمَعَ أحدٌ هذا السرّ».|فأَلَحَّتْ زوجته، بينما اقترب اللصوص من فتحة السقف ليستمعوا.",
"قال الرجل أخيرًا:|«كنتُ في شبابي أَتَسَلَّقُ أسطح البيوت في الليالي المُقْمِرَة.|وكنتُ أعرف كلمة سِحْرِيَّة تسمح لي بالنزول على شُعاع القمر!».",
"سألت الزوجة بدهشة: «وكيف كنتَ تفعل ذلك؟»|قال: «أنظر إلى شُعاع القمر، ثم أقول كلمة شُولَمْ سبع مرات.|وبعد ذلك أَمْسِكُ الضوء وأنزل إلى البيت، ولا يَسْمَعُنِي أحد».",
"اتَّسَعَتْ عيون اللصوص من الدهشة.|قال كبيرهم بصوت منخفض: «هذه فرصتنا! لِنُجَرِّبْ ما قال».|وانتظروا حتى ظَنُّوا أنَّ الرجل وزوجته قد ناما.",
"وقف كبير اللصوص عند فتحة السقف، ونظر إلى شُعاع القمر.|قال: «شُولَمْ! شُولَمْ! شُولَمْ! شُولَمْ! شُولَمْ! شُولَمْ! شُولَمْ!»|ثم مدَّ ذراعيه وحاول أن يُمْسِكَ الضوء.",
"قفز اللصُّ من السطح، لكنَّه لم يَمْسِكْ شيئًا!|سقط على أرض البيت بصوت عالٍ، وتألَّم من السقوط.|وفجأة ظهر صاحب البيت يحمل عصًا.",
"نظر صاحب البيت إلى اللص وسأله: «من أنت؟»|تنهد اللص وقال: «أنا الذي صَدَّقْتُ أنَّ ضوء القمر يحمل الناس!»|ثم نظر إلى أصحابه فوق السطح، وخَفَضَ رأسه خجلًا.",
]
E_=[
"On a clear night, the moon lit up the houses of the city.|On the roof of a large house, three thieves approached an opening in the roof.|They thought everyone in the house was asleep.",
"But the owner of the house heard their footsteps.|He quietly opened his eyes, then woke his wife and whispered,|\"There are thieves on the roof. Don't be afraid. I have an idea.\"",
"He said to her, \"Ask me loudly: How did you make your money?\"|His wife raised her voice and said,|\"My husband, how did you become rich? Tell me your secret!\"",
"The man pretended to hesitate and said, \"I don't want anyone to hear this secret.\"|His wife kept insisting, while the thieves moved closer to the opening in the roof to listen.",
"Finally, the man said,|\"When I was young, I used to climb onto the roofs of houses on moonlit nights.|I knew a magic word that allowed me to descend on a moonbeam!\"",
"His wife asked in amazement, \"And how did you do that?\"|He said, \"I would look at the moonbeam, then say the word 'Shulam' seven times.|After that, I would grab hold of the light and descend into the house, and no one would hear me.\"",
"The thieves' eyes widened in astonishment.|Their leader said quietly, \"This is our chance! Let's try what he said.\"|They waited until they thought the man and his wife had fallen asleep.",
"The leader of the thieves stood beside the opening in the roof and looked at the moonbeam.|He said, \"Shulam! Shulam! Shulam! Shulam! Shulam! Shulam! Shulam!\"|Then he stretched out his arms and tried to grab hold of the light.",
"The thief jumped from the roof, but he caught nothing!|He fell onto the floor of the house with a loud crash and was hurt by the fall.|Suddenly, the owner of the house appeared carrying a stick.",
"The owner looked at the thief and asked, \"Who are you?\"|The thief sighed and said, \"I'm the one who believed that moonlight could carry people!\"|Then he looked at his companions on the roof and lowered his head in shame.",
]
def rebuild(mine,orig,tag):
    out=[]
    for i in range(10):
        counts=[len(c.split()) for c in mine[i].split('|')]
        ow=orig[i].split()
        assert sum(counts)==len(ow),(tag,i,sum(counts),len(ow))
        k=0;ch=[]
        for c in counts: ch.append(' '.join(ow[k:k+c]));k+=c
        out.append('|'.join(ch))
        assert ' '.join(ch)==' '.join(ow)
    return out
A=rebuild(A,arP,'AR');E_=rebuild(E_,enP,'EN')
for i in range(10): assert len(A[i].split('|'))==len(E_[i].split('|')),i
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
for p in range(10):
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
        t1=tm[b][0] if b<n else 164.4
        gap=b-a-1;idx=k-a-1
        tm[k]=(t0+(t1-t0)*idx/gap,t0+(t1-t0)*(idx+1)/gap)
chunks=[]
for p in range(10):
    ac=A[p].split('|');ec=E_[p].split('|')
    for c in range(len(ac)):
        ent=dict(p=p,c=c,ar=ac[c],en=ec[c])
        if True:
            ts=[tm[k] for k in range(n) if words[k][0]==p and words[k][1]==c]
            ent['a']=round(ts[0][0],3);ent['b']=round(ts[-1][1],3)
        chunks.append(ent)
json.dump(dict(chunks=chunks,words=[dict(p=w[0],c=w[1],t=w[2],a=round(t[0],3),b=round(t[1],3)) for w,t in zip(words,tm)]),open('timing.json','w'),ensure_ascii=False,indent=1)
for e in chunks: print(e['p']+1,e['c'],e['a'],e['b'],e['ar'][:28])
