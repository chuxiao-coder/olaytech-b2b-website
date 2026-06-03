# Olaytech 3.5 Fix Package

This package restores the 2.4 homepage design and keeps the product catalog + product detail page system.

Upload/replace these files in GitHub:
- index.html
- css/style.css
- js/main.js
- products.html
- product-types.html
- materials.html
- applications.html
- all product category pages and product detail pages
- assets/brand/
- assets/factory/
- assets/products/
- sitemap.xml
- robots.txt

Important:
- Do not replace contact.html. This package does not include contact.html, so your Web3Forms email function will not be touched.
- The previous issue happened because css/style.css is shared by all pages. This package uses the 2.4 homepage CSS as the base and only adds catalog/detail styles below it.

Product image upload example:
- assets/products/cosmetic-bags-01.jpg
- assets/products/cosmetic-bags-02.jpg
- assets/products/toiletry-bags-01.jpg

After uploading, commit to main and wait 1–2 minutes for Vercel to deploy.
