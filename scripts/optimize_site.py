#!/usr/bin/env python3
"""Apply buyer-facing, SEO, conversion, and performance improvements to the Olaytech static site.

The script is intentionally repeatable. It keeps the existing contact email unchanged.
"""
from __future__ import annotations

from pathlib import Path
from urllib.parse import quote
import json
import re
from html import escape as html_escape

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
DOMAIN = "https://olaytech.com"

CATEGORY_INFO = {
    "cosmetic-bags": {
        "label": "Cosmetic Bags",
        "listing": "Explore makeup pouches, vanity cases and cosmetic organizers for beauty brands, retailers and promotional programs. Size, color, lining, zipper, logo and retail packaging can be customized.",
        "details": "Compare practical material, branding and packing options for private-label cosmetic bag projects.",
        "materials": "PU / EVA / Canvas / Nylon",
        "application": "Beauty & Cosmetic",
    },
    "toiletry-bags": {
        "label": "Toiletry Bags",
        "listing": "Explore wash bags, dopp kits and hanging toiletry organizers for travel, hotel, retail and private-label programs. Custom compartments, lining, hooks, zippers and logos are available.",
        "details": "Review the common sourcing options used for travel wash bags and toiletry organizers.",
        "materials": "Nylon / PU / PVC / Polyester",
        "application": "Travel & Toiletry",
    },
    "shopping-bags": {
        "label": "Shopping Bags",
        "listing": "Explore reusable totes, grocery bags and retail shopping bags for store packaging, promotions and sustainable brand programs. Material, handle, size, print and packing can be customized.",
        "details": "Review common specifications for reusable retail and promotional shopping bag orders.",
        "materials": "Canvas / RPET / Non Woven / Jute",
        "application": "Retail & Promotion",
    },
    "cooler-bags": {
        "label": "Cooler Bags",
        "listing": "Explore insulated lunch bags, picnic coolers, bottle carriers and thermal delivery bags. Capacity, insulation, lining, handle, logo and packaging can be customized.",
        "details": "Review common construction and sourcing choices for insulated cooler bag projects.",
        "materials": "Oxford / Polyester / PEVA / Neoprene",
        "application": "Food & Cooler",
    },
    "sports-bags": {
        "label": "Sports Bags",
        "listing": "Explore gym duffels, training bags, yoga totes and team sports bags for retail, clubs and promotional programs. Compartments, straps, fabric, logo and packing are customizable.",
        "details": "Review the most common specifications for gym, team and outdoor sports bag sourcing.",
        "materials": "Nylon / Polyester / Oxford",
        "application": "Outdoor & Sports",
    },
    "drawstring-bags": {
        "label": "Drawstring Bags",
        "listing": "Explore cinch bags, gym sacks and promotional drawstring backpacks for events, schools, sports and retail programs. Fabric, cord, pockets, print and packing can be customized.",
        "details": "Review practical options for promotional and retail drawstring bag orders.",
        "materials": "Polyester / Nylon / RPET",
        "application": "Retail & Promotion",
    },
    "travel-organizers": {
        "label": "Travel Organizers",
        "listing": "Explore packing cubes, shoe bags, cable organizers, passport wallets and travel storage sets. Size combinations, mesh panels, zippers, logo and retail packing can be customized.",
        "details": "Review common sourcing details for travel organizer and packing accessory projects.",
        "materials": "Nylon / Polyester / Mesh",
        "application": "Travel & Toiletry",
    },
    "card-binder": {
        "label": "Card Binder Cases",
        "listing": "Explore zipper binders, pocket albums, toploader cases and collectible card portfolios. Capacity, pocket layout, cover material, logo and packaging can be customized.",
        "details": "Review the most important specifications for collectible card storage and binder projects.",
        "materials": "PU / PP / PVC / EVA",
        "application": "Card & Document Storage",
    },
    "custom-oem-bags": {
        "label": "Custom OEM Bags",
        "listing": "Develop a custom bag from your sketch, reference sample or technical brief. Our team can support material selection, structure development, logo methods, sampling and export packing.",
        "details": "Share your reference, target quantity and market so our team can suggest a workable OEM or ODM direction.",
        "materials": "Custom Materials",
        "application": "Custom OEM / ODM",
    },
}

BUYER_PAGES = {
    "index.html", "about.html", "contact.html", "support.html", "faq.html", "blog.html",
    "product-types.html", "materials.html", "applications.html", "products.html",
    "product-managed.html", "products-managed.html", "material-guide.html",
    "quality-control.html", "logo-methods-for-custom-bags.html",
    "oem-bag-manufacturing-process.html", "download-catalog.html",
}
BUYER_PAGES.update(f"{slug}.html" for slug in CATEGORY_INFO)

# Pages whose file names indicate archived layouts or internal snippets.
ARCHIVE_MARKERS = (
    "about-main-only-", "index-with-", "index-before-", "index-after-", "homepage-", "nav-",
)


def strip_html_path(url: str) -> str:
    """Convert an internal .html URL to the site's preferred extensionless form."""
    if not url or url.startswith(("http://", "https://", "mailto:", "tel:", "javascript:", "#", "data:")):
        return url
    parts = re.split(r"([?#])", url, maxsplit=1)
    path = parts[0]
    suffix = "".join(parts[1:])
    if path.endswith("index.html"):
        path = path[:-10] or "/"
    elif path.endswith(".html"):
        path = path[:-5]
    if not path:
        path = "/"
    return path + suffix


def page_url(path: Path) -> str:
    rel = path.relative_to(ROOT).as_posix()
    if rel == "index.html":
        return DOMAIN + "/"
    return DOMAIN + "/" + rel[:-5] if rel.endswith(".html") else DOMAIN + "/" + rel


def title_and_description(text: str, path: Path) -> tuple[str, str]:
    mt = re.search(r"<title>(.*?)</title>", text, re.I | re.S)
    title = re.sub(r"\s+", " ", mt.group(1)).strip() if mt else path.stem.replace("-", " ").title() + " | Olaytech"
    md = re.search(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']\s*/?>', text, re.I | re.S)
    if not md:
        md = re.search(r'<meta\s+content=["\'](.*?)["\']\s+name=["\']description["\']\s*/?>', text, re.I | re.S)
    desc = re.sub(r"\s+", " ", md.group(1)).strip() if md else "Custom OEM and ODM bags from Olaytech for global brands, retailers and promotional buyers."
    return title, desc


def first_local_image(text: str, html_path: Path) -> str:
    for src in re.findall(r'<img\b[^>]*\bsrc=["\']([^"\']+)["\']', text, re.I):
        if src.startswith(("http://", "https://", "data:")):
            return src
        cleaned = src.split("?", 1)[0].lstrip("/")
        p = (html_path.parent / cleaned).resolve()
        try:
            rel = p.relative_to(ROOT.resolve()).as_posix()
        except Exception:
            rel = cleaned
        if (ROOT / rel).exists():
            return DOMAIN + "/" + rel
    return DOMAIN + "/assets/brand/olay-logo-black.png"


def upsert_head_tag(text: str, pattern: str, tag: str) -> str:
    if re.search(pattern, text, re.I | re.S):
        return re.sub(pattern, tag, text, count=1, flags=re.I | re.S)
    return text.replace("</head>", f"  {tag}\n</head>", 1)


def add_seo(text: str, path: Path) -> str:
    title, desc = title_and_description(text, path)
    canonical = page_url(path)
    image = first_local_image(text, path)

    text = upsert_head_tag(text, r'<link\s+rel=["\']canonical["\'][^>]*>', f'<link rel="canonical" href="{canonical}" />')
    text = upsert_head_tag(text, r'<meta\s+property=["\']og:title["\'][^>]*>', f'<meta property="og:title" content="{html_escape(title, quote=True)}" />')
    text = upsert_head_tag(text, r'<meta\s+property=["\']og:description["\'][^>]*>', f'<meta property="og:description" content="{html_escape(desc, quote=True)}" />')
    text = upsert_head_tag(text, r'<meta\s+property=["\']og:url["\'][^>]*>', f'<meta property="og:url" content="{canonical}" />')
    text = upsert_head_tag(text, r'<meta\s+property=["\']og:image["\'][^>]*>', f'<meta property="og:image" content="{image}" />')
    text = upsert_head_tag(text, r'<meta\s+property=["\']og:type["\'][^>]*>', '<meta property="og:type" content="website" />')
    text = upsert_head_tag(text, r'<meta\s+name=["\']twitter:card["\'][^>]*>', '<meta name="twitter:card" content="summary_large_image" />')
    return text


def normalize_absolute_urls(text: str) -> str:
    text = text.replace("https://www.olaytech.com", DOMAIN).replace("http://www.olaytech.com", DOMAIN).replace("http://olaytech.com", DOMAIN)
    text = re.sub(r"(https://olaytech\.com/[^\"'<>\s?#]+)\.html(?=([?#\"'<>\s]|$))", r"\1", text)
    return text


def add_global_stylesheet(text: str) -> str:
    if "css/site-optimizations.css" in text:
        return text
    return text.replace("</head>", '  <link rel="stylesheet" href="css/site-optimizations.css?v=20260727" />\n</head>', 1)


def normalize_internal_links(text: str) -> str:
    def repl(m: re.Match[str]) -> str:
        return f'{m.group(1)}={m.group(2)}{strip_html_path(m.group(3))}{m.group(2)}'
    return re.sub(r"\b(href)=([\"'])([^\"']+)\2", repl, text, flags=re.I)


def fix_all_missing_asset_paths() -> None:
    pattern = re.compile(r"/?assets/products/([A-Za-z0-9_.-]+\.(?:png|jpe?g|webp|gif|svg))", re.I)
    for p in ROOT.rglob("*"):
        if not p.is_file() or p.suffix.lower() not in {".html", ".css", ".js", ".json", ".xml"}:
            continue
        text = p.read_text(encoding="utf-8", errors="ignore")
        def replace(match: re.Match[str]) -> str:
            original = match.group(0)
            if (ROOT / original.lstrip("/")).exists():
                return original
            name = match.group(1)
            return ("/" if original.startswith("/") else "") + name if (ROOT / name).exists() else original
        updated = pattern.sub(replace, text)
        if updated != text:
            p.write_text(updated, encoding="utf-8")


def fix_missing_image_references(text: str, html_path: Path) -> str:
    def repl(m: re.Match[str]) -> str:
        quote_char, src = m.group(1), m.group(2)
        if src.startswith(("http://", "https://", "data:")):
            return m.group(0)
        clean = src.split("?", 1)[0].lstrip("/")
        resolved = html_path.parent / clean
        if resolved.exists():
            return m.group(0)
        name = Path(clean).name
        root_candidate = ROOT / name
        if root_candidate.exists():
            return f'src={quote_char}{name}{quote_char}'
        return m.group(0)
    return re.sub(r'src=(["\'])([^"\']+)\1', repl, text, flags=re.I)


def image_dimensions(src: str, html_path: Path) -> tuple[int, int] | None:
    if src.startswith(("http://", "https://", "data:")):
        return None
    clean = src.split("?", 1)[0].lstrip("/")
    p = html_path.parent / clean
    if not p.exists():
        p = ROOT / clean
    if not p.exists() or p.suffix.lower() == ".svg":
        return None
    try:
        with Image.open(p) as im:
            return im.size
    except Exception:
        return None


def optimize_img_tags(text: str, html_path: Path) -> str:
    counter = 0
    def repl(m: re.Match[str]) -> str:
        nonlocal counter
        counter += 1
        tag = m.group(0)
        sm = re.search(r'\bsrc=["\']([^"\']+)["\']', tag, re.I)
        if not sm:
            return tag
        src = sm.group(1)
        dims = image_dimensions(src, html_path)
        def add_attr(current: str, attr: str) -> str:
            return re.sub(r'\s*/?>$', lambda mm: ' ' + attr + (' />' if mm.group(0).strip().startswith('/') else '>'), current)
        if dims and not re.search(r'\bwidth=', tag, re.I):
            tag = add_attr(tag, f'width="{dims[0]}" height="{dims[1]}"')
        if not re.search(r'\bdecoding=', tag, re.I):
            tag = add_attr(tag, 'decoding="async"')
        context = text[max(0, m.start()-450):m.start()].lower()
        is_hero = counter == 1 or "hero" in context[-220:]
        if is_hero:
            if not re.search(r'\bfetchpriority=', tag, re.I):
                tag = add_attr(tag, 'fetchpriority="high"')
            tag = re.sub(r'\sloading=["\']lazy["\']', '', tag, flags=re.I)
        elif not re.search(r'\bloading=', tag, re.I):
            tag = add_attr(tag, 'loading="lazy"')
        return tag
    return re.sub(r'<img\b[^>]*>', repl, text, flags=re.I)


def infer_material(title: str, fallback: str) -> str:
    s = title.lower()
    rules = [
        (("clear", "transparent", "eva"), "Clear EVA / PVC"),
        (("pu ", "leather"), "PU Leather"),
        (("canvas", "cotton"), "Cotton Canvas"),
        (("jute",), "Jute"),
        (("rpet", "recycled"), "RPET"),
        (("non woven", "non-woven"), "Non Woven"),
        (("neoprene",), "Neoprene / Insulated Lining"),
        (("mesh",), "Polyester Mesh"),
        (("felt",), "Felt"),
        (("velvet",), "Velvet"),
        (("satin",), "Satin"),
        (("nylon",), "Nylon"),
        (("oxford",), "Oxford Polyester"),
        (("paper",), "Washable Paper / Tyvek"),
        (("card", "binder", "album", "portfolio", "toploader"), "PU Cover / PP Pages"),
        (("quilted", "puffy", "puffer"), "Quilted Polyester / Nylon"),
        (("polyester", "drawstring", "cinch"), "Polyester"),
    ]
    for words, value in rules:
        if any(w in s for w in words):
            return value
    return fallback


def category_product_map() -> dict[str, tuple[str, int, str]]:
    result: dict[str, tuple[str, int, str]] = {}
    for slug, info in CATEGORY_INFO.items():
        path = ROOT / f"{slug}.html"
        if not path.exists():
            continue
        text = path.read_text(encoding="utf-8", errors="ignore")
        cards = re.findall(r'<a\s+class=["\']catalog-product-card["\']\s+href=["\']([^"\']+)["\'][^>]*>.*?<strong>(.*?)</strong>', text, re.I | re.S)
        for idx, (href, title) in enumerate(cards, 1):
            file_name = href.split("?", 1)[0].split("#", 1)[0]
            if not file_name.endswith(".html"):
                file_name += ".html"
            result[file_name] = (slug, idx, re.sub(r"<.*?>", "", title).strip())
    return result


def improve_category_page(text: str, slug: str) -> str:
    info = CATEGORY_INFO[slug]
    text = text.replace(
        "Replace these prepared image slots with real product photos later. The page structure is already ready for SEO and buyer browsing.",
        info["listing"],
    )
    text = text.replace(
        "Use this section to show buyers the most important sourcing details before they contact you.",
        info["details"],
    )
    text = re.sub(r'<section class="catalog-section">', '<section class="catalog-section" id="products">', text, count=1)

    # Give each card a distinct existing category image and more precise material copy.
    card_no = 0
    pattern = re.compile(r'(<a\s+class="catalog-product-card"[^>]*>\s*<img\s+[^>]*src=")([^"]+)("[^>]*alt=")([^"]+)("[^>]*>\s*<div>.*?<strong>)(.*?)(</strong><small>)(.*?)(</small>)', re.I | re.S)
    def card_repl(m: re.Match[str]) -> str:
        nonlocal card_no
        card_no += 1
        title = re.sub(r"<.*?>", "", m.group(6)).strip()
        material = infer_material(title, info["materials"])
        image = f"assets/products/{slug}-{card_no:02d}.jpg"
        if not (ROOT / image).exists():
            image = m.group(2)
        meta = f"{material} · Custom Logo · Sample Available"
        return m.group(1) + image + m.group(3) + title + m.group(5) + m.group(6) + m.group(7) + meta + m.group(9)
    text = pattern.sub(card_repl, text)

    # Category quote buttons carry useful context into the inquiry form.
    product = quote(info["label"])
    text = re.sub(r'href=["\'](?:contact(?:\.html)?)(?:#design-brief)?["\']', f'href="contact?product={product}#design-brief"', text)
    return text


def add_product_schema(text: str, path: Path, mapping: dict[str, tuple[str, int, str]]) -> str:
    if path.name not in mapping and "product-detail-hero" not in text:
        return text
    hm = re.search(r'<h1>(.*?)</h1>', text, re.I | re.S)
    title = re.sub(r"<.*?>", "", hm.group(1)).strip() if hm else path.stem.replace("-", " ").title()
    desc_match = re.search(r'<div class="detail-content"[^>]*>.*?<h1>.*?</h1>\s*<p>(.*?)</p>', text, re.I | re.S)
    desc = re.sub(r"<.*?>", "", desc_match.group(1)).strip() if desc_match else title
    image = first_local_image(text, path)
    material_match = re.search(r'<dt>Material</dt>\s*<dd>(.*?)</dd>', text, re.I | re.S)
    material = re.sub(r"<.*?>", "", material_match.group(1)).strip() if material_match else "Custom material"
    data = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": title,
        "image": [image],
        "description": desc,
        "material": material,
        "brand": {"@type": "Brand", "name": "Olaytech"},
        "manufacturer": {"@type": "Organization", "name": "Guizhou Olay Technology Co., Limited"},
        "url": page_url(path),
        "additionalProperty": [
            {"@type": "PropertyValue", "name": "Customization", "value": "OEM / ODM, custom logo, size, color and packing"},
            {"@type": "PropertyValue", "name": "Buyer Type", "value": "Brands, wholesalers, retailers and promotional buyers"},
        ],
    }
    script = '<script type="application/ld+json">' + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + '</script>'
    # Replace prior generated product schema if present.
    text = re.sub(r'<script\s+type="application/ld\+json"\s+data-olay-generated="product">.*?</script>', '', text, flags=re.I | re.S)
    script = script.replace('<script type="application/ld+json">', '<script type="application/ld+json" data-olay-generated="product">')
    return text.replace("</head>", "  " + script + "\n</head>", 1)


def improve_product_detail(text: str, path: Path, mapping: dict[str, tuple[str, int, str]]) -> str:
    if path.name not in mapping and "product-detail-hero" not in text:
        return text
    hm = re.search(r'<h1>(.*?)</h1>', text, re.I | re.S)
    title = re.sub(r"<.*?>", "", hm.group(1)).strip() if hm else path.stem.replace("-", " ").title()

    fallback = "Custom Material Options"
    if path.name in mapping:
        slug, idx, _ = mapping[path.name]
        fallback = CATEGORY_INFO[slug]["materials"]
        image = f"assets/products/{slug}-{idx:02d}.jpg"
        if (ROOT / image).exists():
            text = re.sub(r'(<div class="detail-gallery">\s*<img\s+[^>]*src=")[^"]+', r'\1' + image, text, count=1, flags=re.I)
    material = infer_material(title, fallback)
    text = re.sub(r'(<dt>Material</dt>\s*<dd>).*?(</dd>)', r'\1' + material + r'\2', text, count=1, flags=re.I | re.S)

    quote_url = f"contact?product={quote(title)}&source={quote(path.stem)}#design-brief"
    text = re.sub(r'(<a\s+class="btn btn-primary"\s+href=")[^"]+("[^>]*>Get Quote</a>)', r'\1' + quote_url + r'\2', text, count=1, flags=re.I)
    return text


def prerender_catalog(text: str, mode: str) -> str:
    try:
        products = json.loads((ROOT / "data/products-index.json").read_text(encoding="utf-8"))
    except Exception:
        return text
    key_map = {"type": "typeGroup", "material": "materialGroup", "application": "applicationGroup"}
    products = [p for p in products if p.get("status", "published") != "draft" and p.get("title")]
    products.sort(key=lambda p: p.get("updatedAt", ""), reverse=True)
    cards = []
    for p in products[:12]:
        raw_card = str(p.get("cardTitle") or "").strip()
        title = raw_card if raw_card and not (raw_card == raw_card.lower() and "-" in raw_card) else (p.get("title") or raw_card)
        raw_subtitle = str(p.get("cardSubtitle") or "").strip()
        subtitle = raw_subtitle if raw_subtitle and not (raw_subtitle == raw_subtitle.lower() and "-" in raw_subtitle) else (p.get("seoDescription") or "Custom OEM and ODM bag manufacturing support.")
        image = p.get("mainImage") or "assets/brand/olay-logo-black.png"
        if image.startswith("/"):
            image = image[1:]
        source = p.get("sourcePage") or p.get("pageUrl")
        if source:
            href = strip_html_path(source)
        else:
            href = "product-managed?slug=" + quote(str(p.get("slug", "")))
        group = p.get(key_map[mode]) or p.get("category") or "Custom Bags"
        material = infer_material(str(title), p.get("material") or p.get("materialGroup") or "Custom Material")
        moq = p.get("moq") or "MOQ by design"
        cards.append(
            '<a class="auto-product-card" href="{href}">'
            '<span class="auto-product-image"><img src="{img}" alt="{alt}" loading="lazy" decoding="async"></span>'
            '<span class="auto-product-content"><span class="auto-product-kicker">{group}</span>'
            '<h3>{title}</h3><p>{subtitle}</p><span class="auto-product-meta">'
            '<span>{material}</span><span>Custom Logo</span><span>{moq}</span></span></span></a>'.format(
                href=html_escape(href, quote=True), img=html_escape(image, quote=True), alt=html_escape(title, quote=True),
                group=html_escape(str(group)), title=html_escape(str(title)), subtitle=html_escape(str(subtitle)),
                material=html_escape(str(material)), moq=html_escape(str(moq)),
            )
        )
    if not cards:
        return text
    rendered = "".join(cards)
    text = re.sub(r'(<div id="autoProductGrid" class="auto-grid">).*?(</div>)', r'\1' + rendered + r'\2', text, count=1, flags=re.I | re.S)
    text = text.replace('class="auto-catalog-section"', 'class="auto-catalog-section" id="products"', 1)
    text = text.replace('>Loading products...</div>', '>Featured products</div>')
    if "<noscript>" not in text:
        text = text.replace('</section>\n</main>', '<noscript><div class="container auto-noscript">JavaScript is disabled. The featured products above remain available, and you can contact us for the full custom catalog.</div></noscript></section>\n</main>', 1)
    return text


def improve_contact(text: str) -> str:
    if 'id="inquiryProduct"' not in text:
        text = text.replace(
            '<input type="hidden" name="from_name" value="Olaytech Website">',
            '<input type="hidden" name="from_name" value="Olaytech Website">\n'
            '          <input type="hidden" name="redirect" value="https://olaytech.com/thank-you">\n'
            '          <input type="hidden" name="Product Name" id="inquiryProduct" value="">\n'
            '          <input type="hidden" name="Product Page" id="inquirySource" value="">\n'
            '          <input type="checkbox" name="botcheck" class="form-botcheck" tabindex="-1" autocomplete="off">'
        )
    target_block = '''          <div class="form-row">
            <label>Packaging Requirement<input type="text" name="Packaging Requirement" placeholder="Polybag, hang tag, retail box, carton..."></label>
            <label>Target Market<input type="text" name="Target Market" placeholder="US, EU, UK, Canada..."></label>
          </div>'''
    replacement = target_block + '''

          <div class="form-row">
            <label>Reference Image / File Link<input type="url" name="Reference Link" placeholder="Google Drive, Dropbox or public file link"></label>
            <label>Required Delivery Date<input type="text" name="Required Delivery Date" placeholder="Preferred delivery month or exact date"></label>
          </div>'''
    if "Reference Image / File Link" not in text:
        text = text.replace(target_block, replacement)
    button = '<button type="submit" class="btn btn-primary">Submit Brief / Request Quote <span>→</span></button>'
    trust = button + '''
          <div class="form-trust" aria-label="Inquiry reassurance">
            <span>Reply within 1 business day</span><span>Design details kept confidential</span><span>No-obligation quotation</span>
          </div>'''
    if "form-trust" not in text:
        text = text.replace(button, trust)
    return text


def create_thank_you() -> None:
    path = ROOT / "thank-you.html"
    if path.exists():
        return
    path.write_text('''<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Inquiry Received | Olaytech</title><meta name="description" content="Thank you for contacting Olaytech about your custom bag project.">
<link rel="stylesheet" href="css/homepage-57.css"><link rel="stylesheet" href="css/unified-nav.css"><link rel="stylesheet" href="css/zz-nav-force-v3.css"><link rel="stylesheet" href="css/site-optimizations.css?v=20260727"></head>
<body class="olay-nav-v3"><main class="thank-you-page"><section><div class="container thank-you-card"><p class="eyebrow">Inquiry Received</p><h1>Thank You for Your Project Brief</h1><p>Our team will review your bag type, material, logo, quantity and timing details and reply within one business day.</p><div class="button-row"><a class="btn btn-primary" href="product-types">Browse Products</a><a class="btn btn-secondary" href="/">Return Home</a></div></div></section></main></body></html>''', encoding="utf-8")


def write_styles() -> None:
    css = r'''/* Olaytech buyer experience improvements — 2026-07-27 */
:root{--olay-focus:#0a7f91;--olay-deep:#071936;--olay-soft-bg:#f4fafc;}
html{scroll-padding-top:116px;}
body.nav-open{overflow:hidden;}
img{height:auto;}
.auto-noscript{padding:16px 0 36px;color:#52647a;font-size:14px;}
.form-botcheck{position:absolute!important;left:-9999px!important;width:1px!important;height:1px!important;opacity:0!important;}
.form-trust{display:flex;flex-wrap:wrap;gap:9px 18px;margin-top:14px;color:#4f6475;font-size:13px;font-weight:700;}
.form-trust span{display:inline-flex;align-items:center;gap:7px;}
.form-trust span::before{content:"✓";display:inline-grid;place-items:center;width:18px;height:18px;border-radius:50%;background:#e8f7f5;color:#087b72;font-size:12px;}
.catalog-product-card img,.related-detail-grid img,.auto-product-image img{aspect-ratio:1/1;object-fit:cover;background:#eef4f7;}
.catalog-product-card small{line-height:1.55;}
.product-detail-grid .detail-gallery>img{aspect-ratio:1/1;object-fit:cover;background:#eef4f7;}
.auto-product-meta span{white-space:normal;}
a:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:3px solid rgba(10,127,145,.28);outline-offset:3px;}
.thank-you-page{min-height:100vh;display:grid;place-items:center;background:linear-gradient(180deg,#f3fbfd,#fff);padding:40px 0;}
.thank-you-card{max-width:760px;text-align:center;background:#fff;border:1px solid #dce8ee;border-radius:26px;padding:56px;box-shadow:0 24px 70px rgba(7,25,54,.11);}
.thank-you-card h1{font-size:clamp(34px,6vw,58px);line-height:1.05;color:var(--olay-deep);margin:12px 0 18px;}
.thank-you-card p{font-size:18px;color:#5e7080;}
.thank-you-card .button-row{justify-content:center;margin-top:28px;}
@media(max-width:920px){
  #site-header .header-inner{min-height:70px!important;height:auto!important;}
  #site-header .nav-toggle{display:inline-flex!important;align-items:center;justify-content:center;width:44px;height:44px;border-radius:12px;border:1px solid #d6e5ec;background:#fff;color:#073556;font-size:22px;cursor:pointer;order:3;margin-left:auto;}
  #site-header .header-cta{display:none!important;}
  #site-header .main-nav{position:fixed!important;inset:104px 0 0 auto!important;width:min(88vw,380px)!important;height:calc(100dvh - 104px)!important;padding:18px!important;background:#fff!important;box-shadow:-24px 0 60px rgba(7,25,54,.18)!important;display:flex!important;flex-direction:column!important;align-items:stretch!important;gap:4px!important;overflow:auto!important;transform:translateX(110%)!important;transition:transform .25s ease!important;z-index:120!important;}
  #site-header .main-nav.open{transform:translateX(0)!important;}
  #site-header .main-nav>a,#site-header .nav-dropdown>a{width:100%!important;min-height:48px!important;height:auto!important;justify-content:space-between!important;padding:12px 14px!important;border-radius:10px!important;font-size:15px!important;}
  #site-header .nav-dropdown{width:100%!important;display:block!important;}
  #site-header .dropdown-panel{position:static!important;display:none!important;opacity:1!important;visibility:visible!important;transform:none!important;box-shadow:none!important;border:0!important;border-left:2px solid #dcebf0!important;border-radius:0!important;margin:0 0 8px 16px!important;padding:4px 0 4px 10px!important;min-width:0!important;background:#f8fbfc!important;}
  #site-header .nav-dropdown.mobile-open>.dropdown-panel{display:grid!important;}
  #site-header .dropdown-panel a{min-height:42px!important;padding:10px 12px!important;font-size:14px!important;}
  .auto-layout{grid-template-columns:1fr!important;}
  .auto-sidebar{display:none!important;}
  .auto-toolbar{grid-template-columns:1fr!important;position:static!important;}
  .auto-toolbar input,.auto-toolbar select{min-height:48px;}
  .whatsapp-float{right:14px!important;bottom:max(14px,env(safe-area-inset-bottom))!important;}
}
@media(max-width:620px){
  .container,.auto-catalog-page .container{width:min(100% - 28px,1240px)!important;}
  .form-row{grid-template-columns:1fr!important;}
  .catalog-product-grid,.related-detail-grid,.auto-grid{grid-template-columns:1fr!important;}
  .thank-you-card{padding:38px 22px;border-radius:20px;}
}
'''
    (ROOT / "css/site-optimizations.css").write_text(css, encoding="utf-8")


def rewrite_main_js() -> None:
    js = r'''/* Olaytech navigation, inquiry context and mobile interaction */
(function(){
  'use strict';
  function pathName(){return (location.pathname.replace(/\/$/,'').split('/').pop()||'index').replace(/\.html$/,'');}
  function section(){
    var p=pathName();
    if(p==='index')return'home';
    if(p==='product-types'||p==='products'||p==='products-managed'||p==='product-managed'||/^(cosmetic-bags|toiletry-bags|shopping-bags|cooler-bags|sports-bags|drawstring-bags|travel-organizers|card-binder|custom-oem-bags)/.test(p))return'type';
    if(p==='materials'||/^(canvas-bags|cotton-canvas-bags|nylon-bags|oxford-bags|pvc-eva-bags|neoprene-bags|rpet-bags|pu-leather-bags|felt-bags|non-woven-bags)/.test(p))return'material';
    if(p==='applications'||p.indexOf('application-')===0)return'application';
    if(['support','faq','blog','oem-bag-manufacturing-process','logo-methods-for-custom-bags','material-guide','quality-control','download-catalog'].indexOf(p)!==-1)return'support';
    if(p==='about')return'about'; if(p==='contact')return'contact'; return'';
  }
  function activeNav(){
    var nav=document.querySelector('#site-header .main-nav'); if(!nav)return;
    nav.querySelectorAll('.active,[aria-current="page"]').forEach(function(el){el.classList.remove('active');el.removeAttribute('aria-current');});
    var key=section(); if(!key)return; var el=nav.querySelector('[data-nav="'+key+'"]');
    if(el&&el.classList.contains('nav-dropdown'))el=el.querySelector(':scope > a');
    if(el){el.classList.add('active');el.setAttribute('aria-current','page');}
  }
  function mobileNav(){
    var header=document.getElementById('site-header'),toggle=header&&header.querySelector('.nav-toggle'),nav=header&&header.querySelector('.main-nav');
    if(!header||!toggle||!nav)return;
    function close(){nav.classList.remove('open');header.classList.remove('nav-open');document.body.classList.remove('nav-open');toggle.setAttribute('aria-expanded','false');header.querySelectorAll('.nav-dropdown.mobile-open').forEach(function(x){x.classList.remove('mobile-open');});}
    toggle.addEventListener('click',function(){var open=!nav.classList.contains('open');nav.classList.toggle('open',open);header.classList.toggle('nav-open',open);document.body.classList.toggle('nav-open',open);toggle.setAttribute('aria-expanded',open?'true':'false');});
    header.querySelectorAll('.nav-dropdown > a').forEach(function(a){a.addEventListener('click',function(e){if(matchMedia('(max-width:920px)').matches){e.preventDefault();var d=a.parentElement;header.querySelectorAll('.nav-dropdown.mobile-open').forEach(function(x){if(x!==d)x.classList.remove('mobile-open');});d.classList.toggle('mobile-open');}});});
    document.addEventListener('click',function(e){if(nav.classList.contains('open')&&!header.contains(e.target))close();});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
    nav.querySelectorAll('.dropdown-panel a,.main-nav>a').forEach(function(a){a.addEventListener('click',function(){if(matchMedia('(max-width:920px)').matches)close();});});
  }
  function inquiryContext(){
    var params=new URLSearchParams(location.search),product=params.get('product')||'',source=params.get('source')||'';
    var productInput=document.getElementById('inquiryProduct'),sourceInput=document.getElementById('inquirySource');
    if(productInput)productInput.value=product;
    if(sourceInput)sourceInput.value=source||document.referrer||'';
    var textarea=document.querySelector('textarea[name="Project Message"]');
    if(textarea&&product){textarea.placeholder='I am interested in '+product+'. Please share your target quantity, size, logo, material, packaging and delivery requirements.';}
    var typeSelect=document.querySelector('select[name="Bag Type"]');
    if(typeSelect&&product){Array.from(typeSelect.options).some(function(o){if(product.toLowerCase().indexOf(o.text.toLowerCase().replace(' / Tote Bags',''))!==-1){typeSelect.value=o.value;return true;}return false;});}
  }
  function productQuoteLinks(){
    var h1=document.querySelector('.product-detail-hero h1'); if(!h1)return;
    var name=h1.textContent.trim(),contact='contact?product='+encodeURIComponent(name)+'&source='+encodeURIComponent(location.pathname)+'#design-brief';
    document.querySelectorAll('a').forEach(function(a){var t=(a.textContent||'').trim().toLowerCase();if((t==='get quote'||t==='request quote')&&!a.href.includes('wa.me'))a.setAttribute('href',contact);});
    var wa='https://wa.me/8613957952677?text='+encodeURIComponent('Hello Olaytech, I am interested in '+name+'.\nTarget quantity:\nLogo:\nDestination:');
    document.querySelectorAll('a[href*="wa.me"]').forEach(function(a){a.setAttribute('href',wa);});
  }
  function jump(){if(location.hash==='#products'){setTimeout(function(){var el=document.getElementById('products')||document.getElementById('autoProductGrid');if(el)el.scrollIntoView({behavior:'smooth',block:'start'});},180);}}
  function init(){document.body.classList.add('olay-nav-v3');activeNav();mobileNav();inquiryContext();productQuoteLinks();jump();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
'''
    (ROOT / "js/main.js").write_text(js, encoding="utf-8")


def improve_auto_catalog_js() -> None:
    path = ROOT / "js/auto-catalog.js"
    text = path.read_text(encoding="utf-8")
    text = text.replace("return 'product-managed.html?slug=' + encodeURIComponent(slug);", "return 'product-managed?slug=' + encodeURIComponent(slug);")
    text = text.replace("function url(p){return productDetailUrl(p);}", "function url(p){ var direct=clean(p.sourcePage||p.pageUrl); if(direct) return direct.replace(/\\.html(?=([?#]|$))/i,''); return productDetailUrl(p); }")
    old_meta = """  function meta(p){
    var items = [];
    if(mode !== 'type') items.push(inferTypes(p)[0]);
    if(mode !== 'material') items.push(inferMaterials(p)[0]);
    if(mode !== 'application') items.push(inferApplications(p)[0]);
    if(p.logo) items.push(clean(p.logo));
    return unique(items.filter(Boolean)).slice(0,4);
  }"""
    new_meta = """  function meta(p){
    var items = [];
    if(mode !== 'material') items.push(inferMaterials(p)[0]);
    items.push('Custom Logo');
    if(p.moq) items.push('MOQ: ' + clean(p.moq));
    else items.push('MOQ by design');
    return unique(items.filter(Boolean)).slice(0,3);
  }"""
    text = text.replace(old_meta, new_meta)
    text = text.replace('alt="'+"'+escapeAttr(productTitle(p))+'"+'" loading="lazy">', 'alt="'+"'+escapeAttr(productTitle(p))+'"+'" loading="lazy" decoding="async">')
    path.write_text(text, encoding="utf-8")


def rewrite_redirects() -> None:
    html_pages = sorted(p for p in ROOT.glob("*.html") if not any(m in p.name for m in ARCHIVE_MARKERS))
    lines = [
        "# Olaytech canonical host and extensionless URLs",
        "https://www.olaytech.com/* https://olaytech.com/:splat 301!",
        "http://www.olaytech.com/* https://olaytech.com/:splat 301!",
        "http://olaytech.com/* https://olaytech.com/:splat 301!",
        "",
    ]
    for p in html_pages:
        if p.name == "index.html":
            lines.append("/index.html / 301!")
        else:
            lines.append(f"/{p.name} /{p.stem} 301!")
    lines += [
        "",
        "# Legacy aliases",
        "/card-binder-cases /card-binder 301!",
        "/cotton-canvas-bags /canvas-bags 301!",
        "/application-card-storage /application-card-document-storage 301!",
        "/application-corporate-gifts /application-corporate-gift-events 301!",
        "",
    ]
    (ROOT / "_redirects").write_text("\n".join(lines), encoding="utf-8")


def update_build_script() -> None:
    path = ROOT / "scripts/build-products-index.py"
    text = path.read_text(encoding="utf-8")
    text = text.replace('DOMAIN = "https://www.olaytech.com"', 'DOMAIN = "https://olaytech.com"')
    text = text.replace('urls.append(f"{DOMAIN}/product-managed.html?slug={slug}")', 'urls.append(f"{DOMAIN}/product-managed?slug={slug}")')
    path.write_text(text, encoding="utf-8")


def write_sitemaps() -> None:
    from datetime import date
    excluded = {"products-managed.html"}
    pages = []
    for p in sorted(ROOT.glob("*.html")):
        if p.name in excluded or any(m in p.name for m in ARCHIVE_MARKERS):
            continue
        if p.name.startswith("admin"):
            continue
        pages.append(page_url(p))
    today = date.today().isoformat()
    lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for url in pages:
        priority = "1.00" if url == DOMAIN + "/" else ("0.90" if url in {DOMAIN+"/product-types",DOMAIN+"/materials",DOMAIN+"/applications",DOMAIN+"/contact"} else "0.70")
        lines += ["  <url>", f"    <loc>{url}</loc>", f"    <lastmod>{today}</lastmod>", "    <changefreq>weekly</changefreq>", f"    <priority>{priority}</priority>", "  </url>"]
    lines.append('</urlset>')
    (ROOT / "sitemap.xml").write_text("\n".join(lines) + "\n", encoding="utf-8")
    (ROOT / "robots.txt").write_text("User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /products-managed\nSitemap: https://olaytech.com/sitemap.xml\nSitemap: https://olaytech.com/sitemap-products-generated.xml\n", encoding="utf-8")


def main() -> None:
    create_thank_you()
    fix_all_missing_asset_paths()
    write_styles()
    rewrite_main_js()
    improve_auto_catalog_js()
    update_build_script()

    mapping = category_product_map()
    for path in sorted(ROOT.glob("*.html")):
        text = path.read_text(encoding="utf-8", errors="ignore")
        text = fix_missing_image_references(text, path)
        if path.stem in CATEGORY_INFO:
            text = improve_category_page(text, path.stem)
        if path.name in {"product-types.html", "materials.html", "applications.html"}:
            text = prerender_catalog(text, path.stem.replace("product-types", "type").replace("materials", "material").replace("applications", "application"))
        if path.name == "contact.html":
            text = improve_contact(text)
        text = improve_product_detail(text, path, mapping)
        text = add_product_schema(text, path, mapping)
        text = normalize_internal_links(text)
        text = normalize_absolute_urls(text)
        text = add_seo(text, path)
        text = add_global_stylesheet(text)
        text = optimize_img_tags(text, path)
        path.write_text(text, encoding="utf-8")

    rewrite_redirects()
    write_sitemaps()
    print(f"Optimized {len(list(ROOT.glob('*.html')))} root HTML pages")
    print(f"Mapped {len(mapping)} static product detail pages")


if __name__ == "__main__":
    main()
