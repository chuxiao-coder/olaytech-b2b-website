Olaytech 产品详情页布局修复包（2026-07-27）

本修复包只修改产品详情页，不会删除或替换你现有的其他产品图片。

已修复：
1. 产品图片与参数区域恢复为桌面双栏布局。
2. 限制主图高度，避免一张图片占满整个屏幕。
3. 缩略图统一尺寸，支持点击切换。
4. 参数表、按钮、Related Products 与手机端布局重新整理。
5. 隐藏详情页中的后台上传提示文字。
6. 将你截图中的 PU Vanity Makeup Case 占位线稿更换为仓库中已有的真实产品图片。
7. 共修复 200 个静态产品详情页。

上传方法：
1. 先在 GitHub Desktop 点击 Fetch origin，确保当前 main 是最新版本。
2. 解压本 ZIP。
3. 打开解压后的 olaytech-product-detail-layout-fix 文件夹。
4. 全选其中的 HTML 文件、css 文件夹和 data 文件夹。
5. 复制到你本地 olaytech-b2b-website 仓库的根目录。
6. Windows 询问时选择“替换目标中的文件”。不要先清空原仓库。
7. 回到 GitHub Desktop，Summary 填：Fix product detail page layout
8. 点击 Commit to main，然后 Push origin。
9. Netlify 显示 Published 后，在网站按 Ctrl + F5 强制刷新。

检查网址：
https://olaytech.com/application-beauty-cosmetic-pu-vanity-makeup-case
