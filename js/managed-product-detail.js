(function(){
  var mount=document.getElementById('managedProductDetail');
  if(!mount) return;
  var slug=new URLSearchParams(location.search).get('slug')||'';
  function esc(s){return String(s||'').replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function row(k,v){return v?'<tr><th>'+esc(k)+'</th><td>'+esc(v)+'</td></tr>':''}
  function img(src){return src||'assets/products/app-beauty-01.jpg'}
  function setMeta(p){
    if(p.seoTitle){document.title=p.seoTitle}
    if(p.seoDescription){
      var m=document.querySelector('meta[name="description"]');
      if(m) m.setAttribute('content',p.seoDescription);
    }
  }
  if(!slug){mount.innerHTML='<div class="managed-empty">Missing product slug.</div>';return}
  fetch('data/products/'+encodeURIComponent(slug)+'.json').then(function(r){if(!r.ok)throw new Error('not found'); return r.json()}).then(function(p){
    setMeta(p);
    var gallery=(p.gallery&&p.gallery.length?p.gallery:[p.mainImage]).filter(Boolean);
    var main=img(p.mainImage||gallery[0]);
    mount.innerHTML='<div class="container managed-detail-grid">' +
      '<div><div class="managed-main-img"><img id="managedMainImg" src="'+esc(main)+'" alt="'+esc(p.title)+'"></div>' +
      '<div class="managed-thumbs">'+gallery.map(function(g){return '<button type="button" data-img="'+esc(g)+'"><img src="'+esc(g)+'" alt="'+esc(p.title)+' image"></button>'}).join('')+'</div></div>' +
      '<div><p class="eyebrow">OEM / ODM Custom Bag</p><h1>'+esc(p.title)+'</h1><p class="lead">'+esc(p.description||p.seoDescription||'Custom bag product for B2B buyer projects.')+'</p>' +
      '<table class="managed-spec">'+row('Item No.',p.itemNo)+row('Product Type',p.productType)+row('Material',p.material)+row('Application',p.application)+row('Color',p.color)+row('Size',p.size)+row('Logo',p.logo)+row('MOQ',p.moq)+'</table>' +
      '<div class="managed-actions"><a class="btn primary" href="contact.html?product='+encodeURIComponent(p.title)+'">Get A Quote</a><a class="btn dark-btn" target="_blank" rel="noopener" href="https://wa.me/8613957952677?text='+encodeURIComponent('Hello Olaytech, I am interested in '+p.title+'.')+'">WhatsApp</a><a class="btn" href="products-managed.html">Back To Products</a></div>' +
      (p.sourcePage?'<div class="managed-admin-note">Imported from old static page: <a href="'+esc(p.sourcePage)+'">'+esc(p.sourcePage)+'</a>. Future CMS edits update this managed product data first.</div>':'') +
      '</div></div>';
    mount.querySelectorAll('.managed-thumbs button').forEach(function(btn){btn.addEventListener('click',function(){document.getElementById('managedMainImg').src=this.getAttribute('data-img')})})
  }).catch(function(){mount.innerHTML='<div class="container"><div class="managed-empty">Product not found.</div></div>'})
})();
