import sys,glob,os
from PIL import Image,ImageDraw
here=os.path.dirname(os.path.abspath(__file__))
fs=sys.argv[2:]; out=sys.argv[1]
ims=[Image.open(f).convert('RGB').resize((360,640)) for f in fs]
cols=3;rows=(len(ims)+cols-1)//cols
sh=Image.new('RGB',(360*cols,640*rows),'white')
for i,im in enumerate(ims):
    sh.paste(im,((i%cols)*360,(i//cols)*640)); ImageDraw.Draw(sh).text(((i%cols)*360+6,(i//cols)*640+4),os.path.basename(fs[i]),fill=(255,0,0))
sh.save(out,quality=90)
