/* Render only CMS-managed products with uploaded real photos on category landing pages. */
(function(){
  'use strict';
  var grids=document.querySelectorAll('[data-managed-category]');
  if(!grids.length)return;
  function clean(v){if(v===null||v===undefined)return'';if(Array.isArray(v))return v.map(clean).filter(Boolean);if(typeof v==='object')return Object.values(v).map(clean).filter(Boolean);return String(v).trim();}
  function esc(v){return String(v||'').replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c];});}
  function list(v){var x=clean(v);return Array.isArray(x)?x:String(x||'').split(/[,;|]+/).map(function(s){return s.trim();}).filter(Boolean);}
  function title(p){return clean(p.cardTitle)||clean(p.title)||'Custom Bag';}
  function subtitle(p){return clean(p.cardSubtitle)||clean(p.seoDescription)||[clean(p.material),clean(p.application)].filter(Boolean).join(' · ')||'Custom OEM / ODM bag project.';}
  function matches(p,key){return clean(p.typeGroup)===key||list(p.typeTags).indexOf(key)!==-1;}
  fetch('data/products-index.json',{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error();return r.json();}).then(function(products){
    grids.forEach(function(grid){
      var key=grid.getAttribute('data-managed-category');
      var rows=(Array.isArray(products)?products:[]).filter(function(p){return (p.status||'published')!=='draft'&&p.mainImage&&matches(p,key);});
      rows.sort(function(a,b){return String(b.updatedAt||'').localeCompare(String(a.updatedAt||''));});
      if(!rows.length){grid.innerHTML='<div class="catalog-empty-real">No photographed products are published in this category yet. Contact us for a custom development project.</div>';return;}
      grid.innerHTML=rows.map(function(p){
        var img=clean(p.mainImage).replace(/^\//,'');
        var name=title(p), mat=clean(p.material)||clean(p.materialGroup)||'Custom material', moq=clean(p.moq)||'MOQ by design';
        return '<a class="catalog-product-card" href="product-managed?slug='+encodeURIComponent(clean(p.slug))+'">'+
          '<img src="'+esc(img)+'" alt="'+esc(name)+'" loading="lazy" decoding="async">'+
          '<div><span>'+esc(clean(p.applicationGroup)||'OEM / ODM')+'</span><strong>'+esc(name)+'</strong><small>'+esc(mat)+' · Custom Logo · '+esc(moq)+'</small><p>'+esc(subtitle(p))+'</p></div></a>';
      }).join('');
    });
  }).catch(function(){grids.forEach(function(grid){grid.innerHTML='<div class="catalog-empty-real">Products are temporarily unavailable. Please contact us for assistance.</div>';});});
})();
