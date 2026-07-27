#!/usr/bin/env python3
"""Generate WebP variants for referenced large images and update site references."""
from pathlib import Path
import re
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
TEXT_SUFFIXES = {'.html','.css','.js','.json','.xml','.md','.txt'}
IMAGE_RE = re.compile(r'(?P<path>/?(?:assets|about)/[^\s\"\'()<>?]+\.(?:png|jpe?g)|/?[A-Za-z0-9_-]+\.(?:png|jpe?g))', re.I)
THRESHOLD = 300_000


def referenced_images():
    refs=set()
    for p in ROOT.rglob('*'):
        if not p.is_file() or p.suffix.lower() not in TEXT_SUFFIXES or any(part in {'.git'} for part in p.parts):
            continue
        try: text=p.read_text(encoding='utf-8',errors='ignore')
        except Exception: continue
        for m in IMAGE_RE.finditer(text):
            rel=m.group('path').split('?',1)[0].lstrip('/')
            f=ROOT/rel
            if f.exists(): refs.add(rel)
    return refs


def webp_target(src: Path) -> Path:
    return src.with_suffix('.webp')


def convert(src: Path, dst: Path):
    with Image.open(src) as im:
        im=ImageOps.exif_transpose(im)
        has_alpha = im.mode in ('RGBA','LA') or ('transparency' in im.info)
        im=im.convert('RGBA' if has_alpha else 'RGB')
        max_size=(1200,1200) if ('uploads' in src.parts or 'products' in src.parts) else (1920,1400)
        if im.width>max_size[0] or im.height>max_size[1]:
            im.thumbnail(max_size, Image.Resampling.LANCZOS)
        dst.parent.mkdir(parents=True,exist_ok=True)
        im.save(dst,'WEBP',quality=82,method=6,exact=has_alpha)


def main():
    mapping={}
    for rel in sorted(referenced_images()):
        src=ROOT/rel
        if src.stat().st_size < THRESHOLD: continue
        dst=webp_target(src)
        if not dst.exists() or dst.stat().st_mtime < src.stat().st_mtime:
            convert(src,dst)
        mapping[rel]=dst.relative_to(ROOT).as_posix()
    changed=0
    for p in ROOT.rglob('*'):
        if not p.is_file() or p.suffix.lower() not in TEXT_SUFFIXES or p.name=='optimize_images.py': continue
        try: text=p.read_text(encoding='utf-8',errors='ignore')
        except Exception: continue
        original=text
        for old,new in mapping.items():
            text=text.replace('/'+old,'/'+new).replace(old,new)
        if text!=original:
            p.write_text(text,encoding='utf-8'); changed+=1
    before=sum((ROOT/k).stat().st_size for k in mapping)
    after=sum((ROOT/v).stat().st_size for v in mapping.values())
    print(f'Converted {len(mapping)} referenced images; updated {changed} text files')
    print(f'Referenced image bytes: {before/1024/1024:.1f} MB -> {after/1024/1024:.1f} MB')

if __name__=='__main__': main()
