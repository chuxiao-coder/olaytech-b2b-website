Olaytech Navigation Real Fix - 2026-06-13

This package fixes the navigation jump problem by doing three things:

1. All normal HTML pages now use the same topbar + header HTML.
2. css/unified-nav.css was fully rewritten and ends with a hard lock that overrides old V7/V8 header patches.
3. js/main.js no longer rebuilds the header after page load. It only handles active menu state, mobile menu, old link sync and category redirects.

Important upload note:
- For the safest result, upload the full package.
- If uploading only the small patch package, overwrite ALL files inside it, especially all HTML files, css/unified-nav.css and js/main.js.
- After upload, clear browser cache or test in an incognito/private window.
