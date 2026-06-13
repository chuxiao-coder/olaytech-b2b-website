Product detail link and layout fix for Olaytech dynamic catalog.

Upload these files to the GitHub repository and overwrite the old files:

1. js/auto-catalog.js
2. product-managed.html
3. css/cms-products.css
4. js/managed-product-detail.js

Commit message suggestion:
Fix dynamic product links to managed detail page

What this fixes:
- Dynamic category product cards no longer open old static product pages.
- Product cards now open product-managed.html?slug=...
- Product detail page image area is constrained and should not enlarge full screen.
- This does not change the homepage, admin login, product data, By Type, By Material, or By Application layout except product card click links.
