# Olaytech Website Optimization — 2026-07-27

The existing contact email remains unchanged.

## Completed

- Restored the nine product-type category pages as buyer-facing SEO landing pages.
- Removed administrator/template wording from buyer-facing pages.
- Replaced repeated category-card images with distinct existing product images.
- Improved material labels for the 54 core static product detail pages.
- Added product-aware quote links and WhatsApp messages.
- Added product/source fields, reference-link field, delivery date, reassurance copy and bot protection to the inquiry form.
- Added a thank-you page for successful form submissions.
- Standardized internal links, canonical URLs, Open Graph tags and sitemap URLs on `https://olaytech.com` without `.html`.
- Added Product structured data to static product-detail pages.
- Added pre-rendered product cards to dynamic catalog pages so useful content remains present before JavaScript loads.
- Fixed all missing local image references found during the audit.
- Added image dimensions, lazy loading and asynchronous decoding where appropriate.
- Generated optimized WebP variants for large referenced images, reducing those referenced assets from about 80.4 MB to about 6.9 MB.
- Rebuilt the product index using stable filename-based slugs.
- Reworked mobile navigation, focus states and mobile catalog/form layouts.
- Added canonical host redirects, security headers and updated robots/sitemaps.

## Main maintenance scripts

- `python3 scripts/build-products-index.py`
- `python3 scripts/optimize_site.py`
- `python3 scripts/optimize_images.py`

Run the product-index script after adding product JSON records. The other two scripts are optional maintenance utilities when making broad site changes or adding many large images.
