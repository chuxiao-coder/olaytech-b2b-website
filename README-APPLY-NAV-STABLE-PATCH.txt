Olaytech Stable Navigation Patch

What this patch fixes:
1. Every front-end HTML page now has the same topbar and navigation HTML.
2. css/unified-nav.css is loaded directly inside <head> on every page, so the navigation size is fixed before the page renders.
3. js/main.js no longer rebuilds the header after page load, so the header will not jump.
4. Old category links still redirect/sync to the new dynamic catalog pages.

Files included:
- Root HTML pages that contain the site navigation
- css/unified-nav.css
- js/main.js
- _redirects

Not changed:
- admin/config.yml
- data/products/
- assets/uploads/
- product images
- backend login/upload settings
- page body content except the shared navigation block

Apply:
1. Unzip this package.
2. Copy all files into the GitHub repository root and choose Replace/Cover.
3. Commit: Stable unified navigation without jumping
4. Push origin.
5. Wait for Netlify deploy.
6. Open the site and press Ctrl + F5.
