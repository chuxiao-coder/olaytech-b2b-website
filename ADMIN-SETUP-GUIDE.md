# Olaytech 后台与数据统计使用说明

这次我没有推翻你的原网站，而是在原来的静态网站上加了一个“轻后台结构”。

## 已经加入的内容

1. `/admin/` 后台入口  
   打开地址：`https://www.olaytech.com/admin/`

2. `admin/config.yml`  
   Decap CMS 后台配置文件，用来管理产品、图片、SEO字段和网站基础设置。

3. `data/products/`  
   我已经从原来的 HTML 产品页里提取出 145 个产品 JSON 数据文件。

4. `data/products-index.json`  
   产品索引文件，给新的可管理产品目录页面读取。

5. `products-managed.html`  
   新增的可管理产品目录页。它读取 `data/products-index.json`，可以搜索、按产品类型和材质筛选。

6. `product-managed.html?slug=xxx`  
   新增的可管理产品详情页。它读取单个 `data/products/xxx.json` 文件。

7. `assets/uploads/`  
   后台上传产品图的默认文件夹。

8. `js/analytics-config.js` 和 `js/analytics-events.js`  
   浏览数据统计预留代码。后面只需要填入 GA4 ID，就可以统计访问和询盘按钮点击。

9. `.github/workflows/build-product-index.yml`  
   当你通过后台修改产品 JSON 后，GitHub Actions 会自动重新生成 `data/products-index.json` 和 `sitemap-products-generated.xml`。

---

## 后台上线前必须修改的地方

打开：

```txt
admin/config.yml
```

找到：

```yml
repo: YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME
```

改成你的真实 GitHub 仓库，例如：

```yml
repo: ycx18158442575/olaytech-b2b-website-main
```

注意：仓库名要以你实际 GitHub 里的名称为准。

---

## 后台能管理什么

在 `/admin/` 里可以管理：

- 产品名称
- Slug / URL 标识
- 产品状态：draft / published
- 产品类型
- 材质
- 应用场景
- 颜色
- 尺寸
- LOGO 工艺
- MOQ
- 主图
- 详情图
- SEO Title
- SEO Description
- 关键词
- 内部备注

---

## 浏览数据怎么开启

打开：

```txt
js/analytics-config.js
```

找到：

```js
window.OLAYTECH_GA4_ID = "";
```

改成你的 GA4 Measurement ID，例如：

```js
window.OLAYTECH_GA4_ID = "G-ABC1234567";
```

上传网站后，Google Analytics 会开始统计：

- 页面访问量
- 国家/地区
- 设备
- 访问来源
- Contact / Get Quote 点击
- WhatsApp 点击
- 邮箱点击
- 表单提交

Search Console 需要你在 Google Search Console 里单独验证域名，用来查看 Google 搜索关键词、曝光和点击。

---

## 重要说明

现在这是“静态网站 + CMS 数据后台”的第一版。它已经把产品从 HTML 页面里整理到 JSON 数据里，但原来 145 个老产品 HTML 页面仍然保留。

新的后台修改会优先影响：

```txt
products-managed.html
product-managed.html?slug=产品slug
```

如果你希望后台修改后也自动生成原来那种独立 SEO 静态产品页，下一步需要继续做“产品页面模板生成器”。这一步我已经预留了 `scripts/build-products-index.py` 和 GitHub Actions，后面可以继续升级。

---

## 推荐下一步

1. 先把这个包上传到 GitHub 测试。
2. 修改 `admin/config.yml` 里的仓库名。
3. 打开 `/admin/` 测试登录。
4. 填入 GA4 ID。
5. 后续再把旧产品页逐步切换成后台自动生成模式。
