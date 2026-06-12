这个包用于修复 By Type 页面显示成蓝色链接、图片破图的问题。

问题原因：
- product-types.html 使用了 css/catalog-58.css
- 如果只上传 product-types.html，没有上传 catalog-58.css 和对应图片，页面就会变成原始蓝色链接样式

只需要替换 / 上传：
- product-types.html
- css/catalog-58.css
- assets/products/ 里面这些分类图片

不会修改：
- support.html
- blog.html
- css/homepage-57.css
- css/style.css
- js/main.js

说明：
- 标题里的 Food 已删除。
- 页面底部 AI 痕迹文字已优化。
- 这个包只修 By Type 页面和它需要的样式/图片资源。
