(function(){
  var state={products:[],filtered:[]};
  var grid=document.getElementById('managedProductGrid');
  if(!grid) return;
  var search=document.getElementById('managedSearch');
  var type=document.getElementById('managedType');
  var material=document.getElementById('managedMaterial');
  var count=document.getElementById('managedCount');
  function img(src){return src||'assets/products/app-beauty-01.jpg'}
  function uniq(values){return Array.from(new Set(values.filter(Boolean))).sort()}
  function fillSelect(el, values, label){
    el.innerHTML='<option value="">'+label+'</option>'+values.map(function(v){return '<option value="'+esc(v)+'">'+esc(v)+'</option>'}).join('')
  }
  function esc(s){return String(s||'').replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function render(){
    var q=(search.value||'').toLowerCase().trim(), t=type.value, m=material.value;
    state.filtered=state.products.filter(function(p){
      var hay=[p.title,p.productType,p.material,p.application,p.category,p.seoDescription].join(' ').toLowerCase();
      return (!q||hay.indexOf(q)!==-1)&&(!t||p.productType===t)&&(!m||p.material===m)&&p.status!=='draft';
    });
    count.textContent=state.filtered.length+' products';
    if(!state.filtered.length){grid.innerHTML='<div class="managed-empty">No products found. Try another keyword or clear filters.</div>';return}
    grid.innerHTML=state.filtered.map(function(p){
      return '<a class="managed-card" href="product-managed.html?slug='+encodeURIComponent(p.slug)+'">' +
        '<img src="'+esc(img(p.mainImage))+'" alt="'+esc(p.title)+'">' +
        '<div class="managed-card-body"><h3>'+esc(p.title)+'</h3>' +
        '<div class="managed-meta">'+(p.productType?'<span>'+esc(p.productType)+'</span>':'')+(p.material?'<span>'+esc(p.material)+'</span>':'')+'</div>' +
        '<p>'+esc((p.seoDescription||'OEM ODM custom bag project for B2B buyers.').slice(0,130))+'</p></div></a>'
    }).join('')
  }
  fetch('data/products-index.json').then(function(r){return r.json()}).then(function(data){
    state.products=data;
    fillSelect(type, uniq(data.map(function(p){return p.productType})), 'All Product Types');
    fillSelect(material, uniq(data.map(function(p){return p.material})), 'All Materials');
    [search,type,material].forEach(function(el){el.addEventListener('input',render);el.addEventListener('change',render)});
    render();
  }).catch(function(){grid.innerHTML='<div class="managed-empty">Product data could not be loaded.</div>'});
})();
