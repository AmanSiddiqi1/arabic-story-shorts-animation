import sys,glob,os,pathlib
from PIL import Image,ImageDraw
here=os.path.dirname(os.path.abspath(__file__))
# stills/<name> arguments are story-relative; with a media folder set they live in its Working files (Library/media.py)
sys.path.insert(0,str(next(p/'Library' for p in pathlib.Path(here).parents if (p/'Library'/'media.py').exists()))); import media
fs=[str(media.resolve(pathlib.Path(here)/f)) for f in sys.argv[2:]]; out=str(media.out(pathlib.Path(here)/sys.argv[1]))
ims=[Image.open(f).convert('RGB').resize((360,640)) for f in fs]
cols=3;rows=(len(ims)+cols-1)//cols
sh=Image.new('RGB',(360*cols,640*rows),'white')
for i,im in enumerate(ims):
    sh.paste(im,((i%cols)*360,(i//cols)*640)); ImageDraw.Draw(sh).text(((i%cols)*360+6,(i//cols)*640+4),os.path.basename(fs[i]),fill=(255,0,0))
sh.save(out,quality=90)
