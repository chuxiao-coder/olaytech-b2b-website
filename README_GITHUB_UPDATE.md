# O'Lay About Us v6.5 GitHub Update

## 本版本目标

v6.5 版本按照“真实工厂官网”的方向重新整理：

- 导航结构保持和主页一致：Home / About Us / Products / By Type / By Material / By Application / Support / Contact / Get Quote
- 首屏文字减少，避免 PPT 感
- 图片统一比例和圆角，避免尺寸不一致
- 能力卡片文字缩短，方便 B2B 买家快速浏览
- SEO 内容放在下方 FAQ 和相关产品内链模块，不堆在首屏
- 加入 FAQ Schema、Breadcrumb Schema、Organization Schema
- 图片提供 WebP + JPG 备份，并设置 width / height / lazy loading

## 推荐更新方式：只替换 About 页面主体，保留你网站原导航

如果你担心导航再次被影响，推荐这样做：

1. 打开你仓库里的 `about.html`
2. 找到原来的 `<main> ... </main>`
3. 用 `about-main-only-v6.5.html` 里的完整 `<main id="main" class="about-v65"> ... </main>` 替换
4. 在 `<head>` 里添加这一行：

```html
<link rel="stylesheet" href="assets/css/about-us-v6.5.css">
```

5. 上传文件夹：

```text
assets/css/about-us-v6.5.css
assets/about/v65/
```

这样可以最大程度保留你主页原来的 header / navigation / footer。

## 直接整页替换方式

如果你想整页替换：

1. 用本包里的 `about.html` 替换仓库根目录原来的 `about.html`
2. 上传：

```text
assets/css/about-us-v6.5.css
assets/about/v65/
```

3. Commit changes
4. 等 GitHub Pages 自动部署
5. 打开 `https://www.olaytech.com/about.html` 强制刷新查看

## 文件说明

```text
about.html                         完整页面版本
about-main-only-v6.5.html           安全替换版，只替换 main 内容
assets/css/about-us-v6.5.css        v6.5 样式文件
assets/about/v65/*.webp             优先加载的 WebP 图片
assets/about/v65/*.jpg              JPG 备用图片
```

## 注意

本版本里的 full `about.html` 带有一个备用导航。如果你的网站原导航已经完全正确，建议使用 `about-main-only-v6.5.html`，这样导航不会被改动。
