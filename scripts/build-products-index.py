#!/usr/bin/env python3
"""Build Olaytech product index and managed product sitemap from data/products/*.json."""
from pathlib import Path
import json
from datetime import date
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parents[1]
PRODUCT_DIR = ROOT / "data" / "products"
INDEX_FILE = ROOT / "data" / "products-index.json"
SITEMAP_FILE = ROOT / "sitemap-products-generated.xml"
DOMAIN = "https://www.olaytech.com"

summary_fields = [
    "title", "cardTitle", "cardSubtitle", "slug", "status", "sourcePage", "pageUrl",
    "itemNo", "category", "productType", "typeGroup", "typeTags", "application",
    "applicationGroup", "applicationTags", "material", "materialGroup", "materialTags",
    "mainImage", "logo", "updatedAt", "seoDescription"
]
products = []
for path in sorted(PRODUCT_DIR.glob("*.json")):
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:
        print(f"Skip invalid JSON {path}: {exc}")
        continue
    if not data.get("slug"):
        data["slug"] = path.stem
    if data.get("status", "published") == "draft":
        continue
    products.append({field: data.get(field, "") for field in summary_fields})

INDEX_FILE.parent.mkdir(parents=True, exist_ok=True)
INDEX_FILE.write_text(json.dumps(products, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

urls = []
for p in products:
    slug = p.get("slug")
    if slug:
        urls.append(f"{DOMAIN}/product-managed.html?slug={slug}")
xml = ["<?xml version=\"1.0\" encoding=\"UTF-8\"?>", '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for url in urls:
    xml.append("  <url>")
    xml.append(f"    <loc>{escape(url)}</loc>")
    xml.append(f"    <lastmod>{date.today().isoformat()}</lastmod>")
    xml.append("    <changefreq>weekly</changefreq>")
    xml.append("    <priority>0.70</priority>")
    xml.append("  </url>")
xml.append("</urlset>")
SITEMAP_FILE.write_text("\n".join(xml) + "\n", encoding="utf-8")
print(f"Built {len(products)} products -> {INDEX_FILE}")
print(f"Built sitemap -> {SITEMAP_FILE}")
