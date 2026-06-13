Olaytech final equal navigation fix

Upload only these files to GitHub and replace existing files:

- css/homepage-57.css
- css/unified-nav.css
- css/style.css
- js/main.js
- _redirects

This patch removes the Home/About/Contact active underline/pill effect that caused the navigation to jump, keeps dropdown arrows stable, and forces all main navigation items to the same height, font size and spacing.

It does not change admin/config.yml, product data, uploaded images, CMS login, or product content.

GitHub Desktop commit message:
Final equal navigation size and anti jump fix

After Netlify deploy, refresh with Ctrl + F5.
