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
    return String(v).split(/[,;|]+/).map(clean).filter(Boolean);
  }
  function short(v, max){
    v = clean(v);
    if(v.length <= max) return v;
    return v.slice(0, max - 1).trim() + '…';
  }
  function titleOf(p){return clean(p.cardTitle || p.title || 'Custom Bag Product');}
  function subtitleOf(p){
    return clean(p.cardSubtitle || p.shortSubtitle || [p.productType, p.material, p.application].filter(Boolean).join(' · ') || 'Custom OEM / ODM bag for brand projects.');
  }
  function overviewOf(p){
    return clean(p.longDescription || p.description || p.seoDescription || 'Custom OEM bag product developed for brand, retail and promotional projects. Contact us for materials, sizes, logo methods and packaging options.');
  }
  function typeLabel(p){
    var t = clean(p.typeGroup || p.type || '');
    var pt = clean(p.productType || '');
    var cat = clean(p.category || '');
    if(t) return t;
    if(/cosmetic|beauty/i.test(cat + ' ' + pt)) return 'Cosmetic Bags';
    if(/toiletry|wash/i.test(cat + ' ' + pt)) return 'Toiletry Bags';
    if(/shopping|tote/i.test(cat + ' ' + pt)) return 'Shopping Bags';
    if(/cooler|lunch|food/i.test(cat + ' ' + pt)) return 'Cooler Bags';
    if(/sports|gym/i.test(cat + ' ' + pt)) return 'Sports Bags';
    if(/drawstring/i.test(cat + ' ' + pt)) return 'Drawstring Bags';
    if(/travel|organizer/i.test(cat + ' ' + pt)) return 'Travel Organizers';
    if(/card|binder|document/i.test(cat + ' ' + pt)) return 'Card Binder Cases';
    return pt || cat || 'Custom OEM Bags';
  }
  function appLabel(p){return clean(p.applicationGroup || p.application || 'Custom Project');}
  function materialLabel(p){return clean(p.materialGroup || p.material || 'Custom Material');}
  function setMeta(p){
    var title = clean(p.seoTitle || p.title);
    var desc = clean(p.seoDescription || p.description);
    if(title) document.title = title;
    if(desc){
      var m = document.querySelector('meta[name="description"]');
      if(m) m.setAttribute('content', desc);
    }
  }
  function pill(label, href, icon){
    if(!label) return '';
    return '<a class="fused-pill" href="'+attr(href || '#')+'"><span>'+esc(icon || '•')+'</span>'+esc(label)+'</a>';
  }
  function specCard(title, value, icon){
    value = clean(value) || 'Custom available';
    return '<article class="fused-overview-card"><div class="fused-overview-icon">'+icon+'</div><div><h3>'+esc(title)+'</h3><p>'+esc(value)+'</p></div></article>';
  }
  function specRow(label, value){
    value = clean(value);
    if(!value) return '';
    return '<tr><th>'+esc(label)+'</th><td>'+esc(value)+'</td></tr>';
  }
  function benefit(title, text, icon){
    return '<article class="fused-benefit"><span>'+icon+'</span><div><strong>'+esc(title)+'</strong><p>'+esc(text)+'</p></div></article>';
  }
  function backUrl(p){return 'product-types.html?type=' + encodeURIComponent(typeLabel(p)) + '#products';}
  function whatsappUrl(title){
    return 'https://wa.me/8613957952677?text=' + encodeURIComponent('Hello Olaytech, I am interested in ' + title + '. Please send quotation details.');
  }

  function render(p){
    setMeta(p);
    var title = titleOf(p);
    var subtitle = subtitleOf(p);
    var overview = overviewOf(p);
    var type = typeLabel(p);
    var material = materialLabel(p);
    var app = appLabel(p);
    var gallery = (Array.isArray(p.gallery) && p.gallery.length ? p.gallery : [p.mainImage]).map(image).filter(Boolean);
    var main = image(p.mainImage || gallery[0]);
    gallery = [main].concat(gallery.filter(function(g){return g !== main;})).slice(0,8);

    var detailPhotos = gallery.length > 1 ? gallery : [main];
    var categoryHref = 'product-types.html?type=' + encodeURIComponent(type) + '#products';
    var materialHref = 'materials.html?material=' + encodeURIComponent(material) + '#products';
    var appHref = 'applications.html?application=' + encodeURIComponent(app) + '#products';
    var logoText = clean(p.logo || 'Printing, embroidery, woven label, rubber patch or metal plate');
    var moqText = clean(p.moq || 'Based on material, logo and structure');
    var colorText = clean(p.color || 'Custom color / pantone color support');
    var sizeText = clean(p.size || 'Custom size based on buyer requirement');
    var itemNo = clean(p.itemNo || p.sku || slug.toUpperCase());
    var specRows = ''
      + specRow('Item No.', itemNo)
      + specRow('Product Type', clean(p.productType || type))
      + specRow('Material', material)
      + specRow('Application', app)
      + specRow('Color', colorText)
      + specRow('Size', sizeText)
      + specRow('Logo Option', logoText)
      + specRow('MOQ', moqText);

    mount.innerHTML = ''
      + '<div class="container fused-breadcrumb"><a href="index.html">Home</a><span>›</span><a href="product-types.html">By Type</a><span>›</span><a href="'+attr(categoryHref)+'">'+esc(type)+'</a><span>›</span><strong>'+esc(title)+'</strong></div>'
      + '<section class="container fused-product-shell">'
      + '  <div class="fused-product-media">'
      + '    <button class="fused-zoom" type="button" data-lightbox="'+attr(main)+'" aria-label="View large product image">⌕</button>'
      + '    <div class="fused-main-image"><img id="managedMainImg" src="'+attr(main)+'" alt="'+attr(title)+'"></div>'
      + '    <div class="fused-thumbs-wrap"><button class="fused-thumb-arrow" type="button" aria-label="Previous thumbnails">‹</button><div class="fused-thumbs">'
      + gallery.map(function(g,i){return '<button class="'+(i===0?'active':'')+'" type="button" data-img="'+attr(g)+'"><img src="'+attr(g)+'" alt="'+attr(title)+' image '+(i+1)+'"></button>';}).join('')
      + '    </div><button class="fused-thumb-arrow" type="button" aria-label="Next thumbnails">›</button></div>'
      + '  </div>'
      + '  <div class="fused-product-summary">'
      + '    <p class="fused-kicker">OEM / ODM Custom Bag</p>'
      + '    <h1>'+esc(title)+'</h1>'
      + '    <p class="fused-subtitle">'+esc(subtitle)+'</p>'
      + '    <div class="fused-pills">'
      +        pill(clean(p.productType || type), categoryHref, '▣')
      +        pill(short(material, 36), materialHref, '◇')
      +        pill(short(app, 34), appHref, '◉')
      + '    </div>'
      + '    <p class="fused-summary-text">'+esc(overview)+'</p>'
      + '    <div class="fused-cta-row"><a class="fused-btn fused-btn-primary" href="contact.html?product='+encodeURIComponent(title)+'#design-brief">✉ Get A Quote</a><a class="fused-btn fused-btn-outline" target="_blank" rel="noopener" href="'+attr(whatsappUrl(title))+'">☏ WhatsApp</a></div>'
      + '    <div class="fused-service-row">'
      +        benefit('OEM/ODM','Custom Service','▢')
      +        benefit('Low MOQ','Flexible Order','◎')
      +        benefit('Global Shipping','On-time Delivery','▱')
      +        benefit('Quality Assurance','Strict QC','◇')
      + '    </div>'
      + '  </div>'
      + '</section>'
      + '<section class="container fused-overview-section">'
      + '  <div class="fused-section-head"><h2>Product Overview</h2><p>We combine premium materials and factory craftsmanship to help brands create practical, retail-ready custom bag products.</p></div>'
      + '  <div class="fused-overview-grid">'
      +      specCard('Material', material, '▰')
      +      specCard('Use Case', app, '▣')
      +      specCard('Logo', logoText, '◇')
      +      specCard('MOQ', moqText, '▧')
      + '  </div>'
      + '</section>'
      + '<section class="container fused-spec-section">'
      + '  <div class="fused-spec-intro">'
      + '    <p class="fused-mini-kicker">Customization Support</p>'
      + '    <h2>Build This Bag Around Your Brand</h2>'
      + '    <p>Instead of leaving this area empty, buyers now see the key customization support and the full product specification table in one balanced section.</p>'
      + '    <ul class="fused-spec-list"><li>Material, lining, zipper, puller and structure can be adjusted.</li><li>Logo position and logo method can be confirmed before sampling.</li><li>Retail packing, sample details and export carton requirements can be discussed with sales.</li></ul>'
      + '    <div class="fused-spec-cta"><a href="contact.html?product='+encodeURIComponent(title)+'#design-brief">Send Custom Request</a><a class="secondary" href="'+attr(whatsappUrl(title))+'" target="_blank" rel="noopener">Ask On WhatsApp</a></div>'
      + '  </div>'
      + '  <div class="fused-spec-table-card"><h3>Product Specifications</h3><table class="fused-spec-table"><tbody>'+ specRows +'</tbody></table></div>'
      + '</section>'
      + '<section class="container fused-photo-section">'
      + '  <div class="fused-section-head fused-photo-head"><div><h2>Product Detail Photos</h2><p>Use gallery images in the backend to show material texture, inner structure, zipper details, logo position and use scenarios.</p></div><a href="contact.html?product='+encodeURIComponent(title)+'#design-brief">View More Details →</a></div>'
      + '  <div class="fused-photo-grid">'
      + detailPhotos.slice(0,4).map(function(g,i){return '<button type="button" class="fused-detail-photo" data-lightbox="'+attr(g)+'"><img src="'+attr(g)+'" alt="'+attr(title)+' detail photo '+(i+1)+'"></button>';}).join('')
      + '  </div>'
      + '</section>'
      + '<section class="container fused-support-strip">'
      +      benefit('Premium Materials','Selected fabrics for target markets and price levels.','✓')
      +      benefit('Custom Branding','Logo methods and placements can match your brand identity.','✎')
      +      benefit('Flexible Customization','Size, structure, color, lining and packing can be adjusted.','⌁')
      +      benefit('Reliable Quality','Export QC helps every pouch meet order requirements.','◆')
      + '</section>'
      + '<div class="fused-lightbox" aria-hidden="true"><button type="button" class="fused-lightbox-close" aria-label="Close image">×</button><img src="" alt="Large product image"></div>';

    mount.querySelectorAll('.fused-thumbs button[data-img]').forEach(function(btn){
      btn.addEventListener('click', function(){
        var newImg = this.getAttribute('data-img');
        var img = document.getElementById('managedMainImg');
        var zoom = mount.querySelector('.fused-zoom');
        if(img) img.src = newImg;
        if(zoom) zoom.setAttribute('data-lightbox', newImg);
        mount.querySelectorAll('.fused-thumbs button').forEach(function(b){b.classList.remove('active');});
        this.classList.add('active');
      });
    });

    var lightbox = mount.querySelector('.fused-lightbox');
    var lightImg = lightbox && lightbox.querySelector('img');
    function openLightbox(src){
      if(!lightbox || !lightImg || !src) return;
      lightImg.src = src;
      lightbox.setAttribute('aria-hidden','false');
      document.body.classList.add('fused-lightbox-open');
    }
    function closeLightbox(){
      if(!lightbox) return;
      lightbox.setAttribute('aria-hidden','true');
      document.body.classList.remove('fused-lightbox-open');
    }
    mount.querySelectorAll('[data-lightbox]').forEach(function(btn){
      btn.addEventListener('click', function(){openLightbox(this.getAttribute('data-lightbox'));});
    });
    if(lightbox){
      lightbox.addEventListener('click', function(e){ if(e.target === lightbox) closeLightbox(); });
      var closeBtn = lightbox.querySelector('.fused-lightbox-close');
      if(closeBtn) closeBtn.addEventListener('click', closeLightbox);
    }
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeLightbox(); });
  }

  if(!slug){
    mount.innerHTML = '<div class="container"><div class="managed-empty">Missing product slug. Please open this product from the catalog page.</div></div>';
    return;
  }

  fetch('data/products/' + encodeURIComponent(slug) + '.json', {cache:'no-store'})
    .then(function(r){ if(!r.ok) throw new Error('not found'); return r.json(); })
    .then(render)
    .catch(function(){
      mount.innerHTML = '<div class="container"><div class="managed-empty"><h2>Product not found</h2><p>This product page is currently unavailable. Please return to the catalog or contact us for assistance.</p><a class="btn primary" href="product-types.html">Back To Products</a></div></div>';
    });
})();
