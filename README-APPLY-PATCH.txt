Olaytech unified navigation + product detail polish patch

Files included:
- product-managed.html
- css/cms-products.css
- css/unified-nav.css
- js/main.js
- js/managed-product-detail.js
- _redirects

Apply:
1. Unzip this package.
2. Copy the files into the same paths in your GitHub repository and replace the old files.
3. Commit and push to GitHub.
4. Wait for Netlify deploy.
5. Open the website and press Ctrl + F5.

What this patch fixes:
- Product detail page no longer repeats the same material/use/logo/MOQ content in large blocks.
- Product detail page uses a cleaner B2B layout: image gallery, product overview, specs, customization support, inquiry block.
- Navigation and footer are unified through js/main.js + css/unified-nav.css on pages that load js/main.js.
- Old category links are redirected to the new dynamic By Type / By Material / By Application pages.

Does not change:
- Admin login settings
- Product data JSON files
- Homepage hero images
- About Us content
