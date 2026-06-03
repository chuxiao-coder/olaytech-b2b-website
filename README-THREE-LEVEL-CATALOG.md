# Olaytech 3.6 Three-Level Product Catalog

This version keeps the 2.4 homepage design and adds a clear 3-level product browsing structure:

1. **By Types Directory** — `product-types.html`  
   Buyer clicks **By Types** and sees all main bag categories.

2. **Category Product Gallery** — example `cooler-bags.html`  
   Buyer clicks **Cooler Bags** and sees multiple product styles/cards.

3. **Product Detail Page** — example `cooler-bags-insulated-lunch-cooler.html`  
   Buyer clicks a style and sees product images, thumbnails, specification table, Get A Quote and WhatsApp buttons.

## Example Flow
`product-types.html` → `cooler-bags.html` → `cooler-bags-insulated-lunch-cooler.html`

## Image Upload Rule
Upload product images to:

`assets/products/`

Use existing filenames such as:

- `cooler-bags-01.jpg`
- `cooler-bags-02.jpg`
- `cosmetic-bags-01.jpg`
- `toiletry-bags-01.jpg`

The category cards and product detail pages already reference these filenames.

## Important
This package does **not require changing your Web3Forms settings**. If you upload `contact.html` from another package later, check that the Web3Forms access key is still inside the form.

Recommended upload batches if GitHub says there are too many files:

Batch 1: `index.html`, `css`, `js`, `assets/brand`, `assets/factory`, `products.html`, `product-types.html`, `materials.html`, `applications.html`, `sitemap.xml`, `robots.txt`.

Batch 2: all category pages and product detail `.html` files.

Batch 3: `assets/products`.
