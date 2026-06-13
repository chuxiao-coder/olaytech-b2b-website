Olaytech Dynamic Catalog Jump-To-Products Patch

Purpose:
- When a visitor clicks Cosmetic Bags / Toiletry Bags / Material / Application links,
  the browser opens the dynamic category page and automatically jumps down to the selected product section.
- The visitor will not need to first look at the general By Type / By Material / By Application hero title.

Files to upload:
1. js/auto-catalog.js
2. js/main.js
3. _redirects

Upload method:
- Unzip this patch.
- Copy these files into the root of your GitHub repository and overwrite old files.
- Commit and push.
- Wait for Netlify deployment.
- Open the homepage and press Ctrl + F5 before testing.

Test examples:
/product-types.html?type=Cosmetic%20Bags#products
/materials.html?material=PU%20Leather#products
/applications.html?application=Beauty%20%26%20Cosmetic#products

This patch only changes jump behavior and category links. It does not change the homepage, product data, CMS login, About Us, Contact, Support, or product images.
