# O'Lay About Us 6.4 Clean Update

这次版本重点修复：

- 页面排版重新整理，避免上一版卡片过大、文字过散的问题。
- OEM/ODM、Sample Development、Quality Inspection、Export Packing 四个模块使用不同图片，不再重复使用同一张照片。
- 导航菜单结构保持与当前网站一致：Home / About Us / Products / By Type / By Material / By Application / Support / Contact / Get Quote。
- CSS 文件重新整理，减少对导航和页面全局结构的干扰。
- 增加 SEO 基础项：title、description、canonical、OG tags、FAQ Schema、Breadcrumb Schema、内部链接、图片 alt。
- 文案改成更自然的工厂介绍，减少 AI 模板感。

## 常规更新方法

1. 用 `about.html` 替换网站根目录的 `about.html`。
2. 用 `assets/css/about-us-optimized.css` 替换网站里的同名 CSS。
3. 上传 `assets/about/` 文件夹里的所有图片。
4. Commit changes，等待 GitHub Pages 自动部署。

## 如果你完全不想动导航

使用安全替换法：

1. 打开你原来的 `about.html`。
2. 只替换 `<main>...</main>` 这一段，内容使用 `about-main-only-v6.4-clean.html`。
3. 在 `<head>` 里新增这一行：

```html
<link rel="stylesheet" href="assets/css/about-main-only-v6.4-clean.css">
```

4. 上传 `assets/css/about-main-only-v6.4-clean.css` 和 `assets/about/` 图片。

这样可以保留你网站原来的导航和页脚，只更新 About Us 主体内容。
