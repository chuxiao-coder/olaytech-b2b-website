(function(){
  var mount = document.getElementById('managedProductDetail');
  if(!mount) return;

  var params = new URLSearchParams(window.location.search);
  var slug = params.get('slug') || '';

  function clean(v){
    if(v === null || v === undefined) return '';
    if(Array.isArray(v)) return v.map(clean).filter(Boolean).join(' / ');
    if(typeof v === 'object') return Object.values(v).map(clean).filter(Boolean).join(' / ');
    return String(v).trim().replace(/\s+/g,' ');
  }
  function esc(s){
    return clean(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c];});
  }
  function attr(s){return esc(s).replace(/`/g,'&#096;');}
  function image(src){return clean(src) || 'assets/products/category-custom-oem-bags.jpg';}
  function splitTags(v){
    if(!v) return [];
    if(Array.isArray(v)) return v.map(clean).filter(Boolean);
    return String(v).split(/[,;|/]+/).map(clean).filter(Boolean);
  }
  function first(v){return splitTags(v)[0] || clean(v);}
  function row(k,v){
    v = clean(v);
    return v ? '<tr><th>'+esc(k)+'</th><td>'+esc(v)+'</td></tr>' : '';
  }
  function setMeta(p){
    var title = clean(p.seoTitle || p.title);
    var desc = clean(p.seoDescription || p.description);
    if(title) document.title = title;
    if(desc){
      var m = document.querySelector('meta[name="description"]');
      if(m) m.setAttribute('content', desc);
    }
  }
  function detailText(p){
    return clean(p.longDescription || p.description || p.seoDescription || 'Custom OEM bag product for B2B buyer projects. Uploaders can edit the product title, short introduction, specifications, materials, logo options and images in the admin CMS.');
  }
  function productTitle(p){return clean(p.cardTitle || p.title || 'Custom Bag Product');}
  function productSubtitle(p){
    return clean(p.cardSubtitle || [p.productType, p.material, p.application].filter(Boolean).join(' · ') || 'Custom OEM / ODM bag for brand projects.');
  }
  function backUrl(p){
    var type = clean(p.typeGroup || p.productType || p.category);
    if(type) return 'product-types.html?type=' + encodeURIComponent(type.indexOf('Bags')>-1 ? type : (type === 'Cosmetic pouch' ? 'Cosmetic Bags' : type)) + '#products';
    return 'products-managed.html';
  }
  function categoryLink(label, url){
    return label ? '<a class="managed-pill-link" href="'+attr(url)+'">'+esc(label)+'</a>' : '';
  }
  function render(p){
    setMeta(p);
    var title = productTitle(p);
    var subtitle = productSubtitle(p);
    var gallery = (Array.isArray(p.gallery) && p.gallery.length ? p.gallery : [p.mainImage]).map(image).filter(Boolean);
    var main = image(p.mainImage || gallery[0]);
    var materialTags = splitTags(p.material).slice(0,4);
    var appTags = splitTags(p.application || p.applicationGroup).slice(0,3);
    var typeText = clean(p.typeGroup || p.productType || p.category);
    var matText = clean(p.materialGroup || p.material);
    var appText = clean(p.applicationGroup || p.application);
    var ctaText = 'Hello Olaytech, I am interested in ' + title + '. Please send quotation details.';

    var overview = detailText(p);
    var specRows = ''
      + row('Item No.', p.itemNo)
      + row('Product Type', p.productType || p.typeGroup || p.category)
      + row('Material', p.material || p.materialGroup)
      + row('Application', p.application || p.applicationGroup)
      + row('Color', p.color)
      + row('Size', p.size)
      + row('Logo Option', p.logo)
      + row('MOQ', p.moq);

    mount.innerHTML = ''
      + '<div class="managed-detail-hero">'
      + '  <div class="container managed-breadcrumb"><a href="index.html">Home</a><span>/</span><a href="product-types.html">Products</a><span>/</span><strong>'+esc(title)+'</strong></div>'
      + '</div>'
      + '<div class="container managed-detail-v2">'
      + '  <section class="managed-gallery-card" aria-label="Product images">'
      + '    <div class="managed-gallery-main"><img id="managedMainImg" src="'+attr(main)+'" alt="'+attr(title)+'"></div>'
      + '    <div class="managed-gallery-thumbs">'+gallery.map(function(g,i){return '<button class="'+(i===0?'active':'')+'" type="button" data-img="'+attr(g)+'"><img src="'+attr(g)+'" alt="'+attr(title)+' image '+(i+1)+'"></button>';}).join('')+'</div>'
      + '  </section>'
      + '  <section class="managed-product-info">'
      + '    <p class="managed-kicker">OEM / ODM Custom Bag</p>'
      + '    <h1>'+esc(title)+'</h1>'
      + '    <p class="managed-subtitle">'+esc(subtitle)+'</p>'
      + '    <div class="managed-quick-tags">'
      +        categoryLink(typeText, 'product-types.html?type='+encodeURIComponent(typeText || 'Custom OEM Bags')+'#products')
      +        categoryLink(matText, 'materials.html?material='+encodeURIComponent(matText || 'Other Materials')+'#products')
      +        categoryLink(appText, 'applications.html?application='+encodeURIComponent(appText || 'Other Applications')+'#products')
      + '    </div>'
      + '    <div class="managed-actions managed-actions-top"><a class="btn primary" href="contact.html?product='+encodeURIComponent(title)+'#design-brief">Get A Quote</a><a class="btn dark-btn" target="_blank" rel="noopener" href="https://wa.me/8613957952677?text='+encodeURIComponent(ctaText)+'">WhatsApp</a><a class="btn ghost" href="#product-detail-photos">View Detail Photos</a><a class="btn ghost" href="'+attr(backUrl(p))+'">Back To Category</a></div>'
      + '    <div class="managed-overview-card"><h2>Product Overview</h2><p>'+esc(overview)+'</p></div>'
      + '    <table class="managed-spec managed-spec-v2">'+ specRows + '</table>'
      + '  </section>'
      + '</div>'
      + '<div class="container managed-detail-extra">'
      + '  <section class="managed-description-card"><h2>Customization Support</h2><p>This product can be adjusted for your brand project. You can change the size, fabric, color, lining, zipper, puller, logo position and retail packing according to your order requirements.</p><ul><li>Logo methods: printing, embroidery, woven label, rubber patch or metal plate</li><li>Material options can be selected according to price level and target market</li><li>Suitable for wholesale, promotional, beauty, travel and private label projects</li></ul></section>'
      + '  <section class="managed-description-card managed-inquiry-card"><h2>Request A B2B Quotation</h2><p>Send us your target quantity, logo artwork, size, material preference and reference photos. Our team will help check structure, sampling details, packing method and production quotation.</p><div class="managed-inquiry-actions"><a href="contact.html?product='+encodeURIComponent(title)+'#design-brief">Send Inquiry</a><a class="secondary" target="_blank" rel="noopener" href="https://wa.me/8613957952677?text='+encodeURIComponent(ctaText)+'">WhatsApp Quote</a></div></section>'
      + '</div>'
      + '<section class="container managed-large-gallery-section" id="product-detail-photos">'
      + '  <div class="managed-large-gallery-head"><p class="managed-kicker">Product Detail Photos</p><h2>View Large Product Images</h2><p>Upload more gallery images in the admin CMS and they will appear here as large detail photos for buyers to review.</p></div>'
      + '  <div class="managed-large-gallery-grid">'+gallery.map(function(g,i){return '<button class="managed-large-photo" type="button" data-img="'+attr(g)+'" aria-label="Open large product image '+(i+1)+'"><span>Image '+String(i+1).padStart(2,'0')+'</span><img src="'+attr(g)+'" alt="'+attr(title)+' large detail image '+(i+1)+'"></button>';}).join('')+'</div>'
      + '</section>'
      + '<div class="managed-lightbox" id="managedLightbox" aria-hidden="true"><button class="managed-lightbox-close" type="button" aria-label="Close large image">×</button><img src="" alt="Large product preview"></div>';

    mount.querySelectorAll('.managed-gallery-thumbs button').forEach(function(btn){
      btn.addEventListener('click', function(){
        var img = document.getElementById('managedMainImg');
        if(img) img.src = this.getAttribute('data-img');
        mount.querySelectorAll('.managed-gallery-thumbs button').forEach(function(b){b.classList.remove('active');});
        this.classList.add('active');
      });
    });

    var lightbox = document.getElementById('managedLightbox');
    var lightboxImg = lightbox ? lightbox.querySelector('img') : null;
    function openLarge(src){
      if(!lightbox || !lightboxImg || !src) return;
      lightboxImg.src = src;
      lightbox.setAttribute('aria-hidden','false');
      document.body.classList.add('managed-lightbox-open');
    }
    function closeLarge(){
      if(!lightbox) return;
      lightbox.setAttribute('aria-hidden','true');
      document.body.classList.remove('managed-lightbox-open');
    }
    var mainImage = document.getElementById('managedMainImg');
    if(mainImage){
      mainImage.addEventListener('click', function(){ openLarge(this.getAttribute('src')); });
    }
    mount.querySelectorAll('.managed-large-photo').forEach(function(btn){
      btn.addEventListener('click', function(){ openLarge(this.getAttribute('data-img')); });
    });
    if(lightbox){
      lightbox.addEventListener('click', function(e){ if(e.target === lightbox) closeLarge(); });
      var closeBtn = lightbox.querySelector('.managed-lightbox-close');
      if(closeBtn) closeBtn.addEventListener('click', closeLarge);
      document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeLarge(); });
    }
  }

  if(!slug){
    mount.innerHTML = '<div class="container"><div class="managed-empty">Missing product slug. Please open this product from the catalog page.</div></div>';
    return;
  }

  fetch('data/products/' + encodeURIComponent(slug) + '.json', {cache:'no-store'})
    .then(function(r){ if(!r.ok) throw new Error('not found'); return r.json(); })
    .then(render)
    .catch(function(){
      mount.innerHTML = '<div class="container"><div class="managed-empty"><h2>Product not found</h2><p>Please check whether this product has been published in the admin CMS.</p><a class="btn primary" href="products-managed.html">Back To Products</a></div></div>';
    });
})();
