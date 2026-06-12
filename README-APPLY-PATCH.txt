Olaytech Netlify Identity Admin Login Patch

This package contains only the files needed for the Netlify Identity + Git Gateway admin login fix.

Files included:
1. admin/config.yml
   - Switches Decap CMS backend from GitHub OAuth to Netlify Git Gateway.

2. admin/index.html
   - Adds the Netlify Identity widget script before Decap CMS.

3. index.html
   - Keeps the homepage structure and adds Netlify Identity invite-token handling before </body>.

How to apply:
1. Unzip this package.
2. Copy these files into your local GitHub repository folder:
   Documents/GitHub/olaytech-b2b-website/
3. Replace the existing files when Windows asks.
4. Open GitHub Desktop.
5. Commit with summary: Add Netlify Identity admin login support
6. Push origin.
7. Wait for Netlify to deploy successfully.
8. In Netlify Identity, invite your email again.
9. Open the new invitation email and set your password.

Do not upload this README file if you do not need it. The website only needs the three code files above.
