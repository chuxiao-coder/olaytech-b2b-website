# Olaytech Dynamic Catalog Patch

This patch makes these pages dynamic:

- `product-types.html` = auto group products by type
- `materials.html` = auto group products by material
- `applications.html` = auto group products by application

## Files to upload / overwrite

Upload these files to the same paths in your GitHub repository:

- `admin/config.yml`
- `product-types.html`
- `materials.html`
- `applications.html`
- `css/auto-catalog.css`
- `js/auto-catalog.js`
- `scripts/build-products-index.py`
- `data/products-index.json`

## How it works

When you add or edit a product in `/admin/`, the uploader can set:

- Product title
- Card title
- Card subtitle
- Main image
- Type tags
- Material tags
- Application tags

The public pages read `data/products-index.json` and automatically generate product cards.

## Important

After pushing to GitHub, wait for Netlify to deploy.
Then test:

- `/product-types.html`
- `/materials.html`
- `/applications.html`

