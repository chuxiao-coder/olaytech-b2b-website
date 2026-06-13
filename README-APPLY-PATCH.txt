Olaytech Unified Navigation Patch

Purpose:
- Make Home, By Type, By Material, By Application, Support, About Us, Contact navigation use the same size, logo size, height, dropdown style and Get Quote button.
- Prevent page jump caused by different header heights on different pages.
- Keep old category links redirected to the new dynamic catalog pages.

Files in this patch:
- css/unified-nav.css
- js/main.js
- _redirects

How to upload:
1. Unzip this package.
2. Copy these files into your GitHub website repository and overwrite existing files:
   css/unified-nav.css
   js/main.js
   _redirects
3. Commit in GitHub:
   Unify navigation size across all pages
4. Push / wait for Netlify deploy.
5. Open the website and press Ctrl + F5.

Safe scope:
- This patch does not change admin/config.yml.
- It does not change product data or uploaded product images.
- It does not change the CMS upload function.
- It only controls global navigation style and old category redirects.

If a page still has old navigation after upload:
- That page may not include js/main.js.
- Add this before </body> in that page:
  <script src="js/main.js"></script>
