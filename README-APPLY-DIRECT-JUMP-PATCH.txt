Olaytech Direct Dynamic Catalog Jump Patch

Files included:
- _redirects
- js/main.js

What it does:
- Homepage category cards that still point to old static pages will jump to new dynamic category pages.
- Old category URLs such as cosmetic-bags.html will automatically redirect to product-types.html?type=Cosmetic%20Bags.
- Material and application category links also jump to the matching dynamic pages.

How to upload:
1. Unzip this package.
2. Copy _redirects to the root of your GitHub website repository.
3. Copy js/main.js to the js folder and overwrite the old main.js.
4. Commit and push.
5. Wait for Netlify deployment to finish.
6. Open the homepage and press Ctrl + F5.

This patch does not change homepage layout, About Us, Support, Contact, product data, or admin settings.
