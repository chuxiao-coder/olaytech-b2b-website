Olaytech Navigation Force Fix V3
================================

This package fixes the navigation jump/size mismatch by:
1. Replacing the header/topbar HTML with one identical version across all pages.
2. Adding css/zz-nav-force-v3.css after all older CSS files, so old header patches cannot override it.
3. Replacing js/main.js with a no-rebuild version. It no longer rebuilds the header or redirects pages after load.
4. Updating every HTML page to load the new CSS/JS version: nav-force-v3-20260613.

Upload method:
- Use the complete package if possible.
- If using only the required files package, upload ALL included HTML files plus css/zz-nav-force-v3.css and js/main.js.
- After GitHub Pages deploys, open the site in Incognito or press Ctrl+F5.
