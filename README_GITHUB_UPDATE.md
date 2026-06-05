# O'Lay About Us 6.5 Factory Images Update

这个包是根据你刚生成的新版工厂图片做的 About Us 页面优化版。

## 推荐使用方式：安全替换，不改导航

1. 上传整个 `assets/about/v65-factory/` 文件夹到网站仓库对应目录。
2. 上传 `assets/css/about-us-v6.5-factory.css` 到 `assets/css/`。
3. 打开你现在网站里的 `about.html`。
4. 只把原来的 `<main>...</main>` 内容替换成 `about-main-only-v6.5-factory.html` 里的内容。
5. 在 `<head>` 里面加入这一行：

```html
<link rel="stylesheet" href="assets/css/about-us-v6.5-factory.css">
```

这样不会动你主页原来的导航、页脚和全站菜单样式。

## 如果你想直接覆盖

也可以用本包里的 `about.html` 直接替换原来的 `about.html`，但我更建议使用“安全替换”，因为你之前反馈导航容易被改乱。

## 图片说明

- `about-v65f-hero-factory`：首屏工厂外观 + 装货场景
- `about-v65f-showroom`：样品展示与会议室
- `about-v65f-design-review`：设计/打样讨论
- `about-v65f-production-floor`：生产车间
- `about-v65f-quality-inspection`：质检场景
- `about-v65f-packing-shipping`：包装出货场景

页面已经使用 WebP 优先加载，同时保留 JPG 兼容版本。
