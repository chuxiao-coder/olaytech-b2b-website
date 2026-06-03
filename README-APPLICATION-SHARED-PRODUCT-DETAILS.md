# Olaytech 4.1 By Application Shared Detail Pages

这个版本按照更合理的 SEO 结构生成：

- `applications.html` = By Application 入口页
- `application-*.html` = 应用场景分类页
- 应用场景页面里的产品卡片全部链接到已有的统一产品详情页
- 不再生成 `application-xxx-product.html` 这种重复详情页

正确结构：

```text
By Type → Cooler Bags → cooler-bags-insulated-lunch-cooler.html
By Material → Neoprene Bags → cooler-bags-insulated-lunch-cooler.html 或其它统一产品页
By Application → Food & Cooler → cooler-bags-insulated-lunch-cooler.html
```

也就是：不同入口可以展示同一个产品，但最后指向同一个产品详情页。

## 上传文件

上传这些文件：

```text
applications.html
application-beauty-cosmetic.html
application-travel-toiletry.html
application-retail-promotion.html
application-food-cooler.html
application-outdoor-sports.html
application-card-storage.html
application-corporate-gifts.html
css/application-catalog.css
sitemap.xml
```

## 不要覆盖

```text
index.html
contact.html
css/style.css
```

这样不会影响主页，也不会影响询盘邮件功能。

## 图片

这些页面会调用你已有的图片路径：

```text
assets/products/cosmetic-bags-01.jpg
assets/products/cooler-bags-01.jpg
assets/products/shopping-bags-01.jpg
...
```

后续你上传真实产品图片，只需要覆盖同名图片即可。
