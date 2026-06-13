(function(){
  var root = document.querySelector('[data-auto-catalog]');
  if(!root) return;

  var mode = root.getAttribute('data-catalog-mode') || 'type';
  var pageTitle = root.getAttribute('data-page-title') || 'Custom Bag Catalog';
  var pageDescription = root.getAttribute('data-page-description') || 'Browse custom bag products from the CMS catalog.';

  var CATEGORY_SETS = {
    type: [
      {key:'Cosmetic Bags', desc:'Makeup pouches, vanity bags and cosmetic packaging bags for beauty brands.'},
      {key:'Toiletry Bags', desc:'Wash bags, dopp kits and hanging toiletry organizers for travel and hotel programs.'},
      {key:'Shopping Bags', desc:'Reusable totes, grocery bags and retail shopping bags for brand packaging.'},
      {key:'Cooler Bags', desc:'Insulated lunch bags, picnic coolers and thermal delivery bags.'},
      {key:'Sports Bags', desc:'Gym bags, duffels, yoga totes and outdoor sports bags.'},
      {key:'Drawstring Bags', desc:'Cinch bags, gym sacks and promotional drawstring backpacks.'},
      {key:'Travel Organizers', desc:'Packing cubes, cable organizers, passport pouches and travel storage bags.'},
      {key:'Card Binder Cases', desc:'Trading card binders, photocard albums and collectible storage cases.'},
      {key:'Care Binder', desc:'Medical document organizers, care binders and family planner storage.'},
      {key:'Custom OEM Bags', desc:'Special custom bag shapes, private label projects and brand gift sets.'},
      {key:'Other Custom Bags', desc:'Additional custom bag projects and mixed category products.'}
    ],
    material: [
      {key:'Cotton / Canvas', desc:'Natural cotton and canvas bags for retail, beauty and promotional use.'},
      {key:'Nylon', desc:'Lightweight nylon bags for travel, sports and daily storage.'},
      {key:'Oxford', desc:'Durable Oxford fabric bags for outdoor, cooler, gym and utility projects.'},
      {key:'PVC / EVA / TPU', desc:'Clear, waterproof and structured plastic-material bags.'},
      {key:'Neoprene', desc:'Soft padded neoprene bags for cosmetics, lunch, tech and sports use.'},
      {key:'RPET', desc:'Recycled polyester bag options for sustainable brand programs.'},
      {key:'PU Leather', desc:'PU leather cosmetic bags, organizers and premium packaging pouches.'},
      {key:'Felt', desc:'Felt organizers, storage cases and protective custom pouches.'},
      {key:'Non Woven', desc:'Cost-effective non-woven bags for promotions, retail and events.'},
      {key:'Polyester', desc:'Versatile polyester bags for cosmetic, travel, retail and sports categories.'},
      {key:'Velvet / Satin', desc:'Soft-touch velvet and satin pouches for gifts, beauty and premium packaging.'},
      {key:'Tyvek', desc:'Washable paper-like Tyvek pouches and lightweight travel bags.'},
      {key:'Mesh', desc:'Breathable mesh storage bags, beach bags and sports gear organizers.'},
      {key:'Other Materials', desc:'Mixed or special materials for custom OEM bag development.'}
    ],
    application: [
      {key:'Beauty & Cosmetic', desc:'Beauty brand packaging, makeup storage, skincare sample kits and retail gift sets.'},
      {key:'Travel & Toiletry', desc:'Travel organizers, wash bags, passport pouches and packing accessories.'},
      {key:'Retail & Promotion', desc:'Retail packaging, promotional giveaways, store totes and private label programs.'},
      {key:'Food & Cooler', desc:'Lunch coolers, picnic bags, bottle carriers and insulated delivery solutions.'},
      {key:'Outdoor & Sports', desc:'Gym, team, beach, yoga, swim and outdoor activity bag projects.'},
      {key:'Card & Document Storage', desc:'Trading card, photocard, planner and document organizer storage.'},
      {key:'Corporate Gifts', desc:'Event welcome bags, holiday gift packaging and branded sample kit bags.'},
      {key:'Office & School', desc:'Stationery, cable, document, desk and school storage products.'},
      {key:'Event Giveaway', desc:'Trade show, conference, campaign and event promotional bag programs.'},
      {key:'Other Applications', desc:'Additional custom scenes and mixed-use bag projects.'}
    ]
  };

  var SELECT_LABELS = {
    type: 'All Product Types',
    material: 'All Materials',
    application: 'All Applications'
  };

  var state = { products: [], active: 'All', visible: 12, search: '', sort: 'featured' };
  var initialJumpDone = false;
  var els = {
    search: document.getElementById('autoSearch'),
    sort: document.getElementById('autoSort'),
    categorySelect: document.getElementById('autoCategorySelect'),
    filterList: document.getElementById('autoFilterList'),
    categoryGrid: document.getElementById('autoCategoryGrid'),
    productGrid: document.getElementById('autoProductGrid'),
    count: document.getElementById('autoCount'),
    activeTitle: document.getElementById('autoActiveTitle'),
    activeDesc: document.getElementById('autoActiveDesc'),
    loadMore: document.getElementById('autoLoadMore'),
    loadWrap: document.getElementById('autoLoadWrap')
  };

  function text(v){
    if(v === null || v === undefined) return '';
    if(Array.isArray(v)) return v.map(text).filter(Boolean).join(' ');
    if(typeof v === 'object') return Object.values(v).map(text).filter(Boolean).join(' ');
    return String(v);
  }
  function lower(v){ return text(v).toLowerCase(); }
  function clean(v){ return text(v).trim().replace(/\s+/g,' '); }
  function arr(v){
    if(!v) return [];
    if(Array.isArray(v)) return v.map(function(x){return clean(x && typeof x==='object' ? (x.value || x.label || x.name || Object.values(x)[0]) : x)}).filter(Boolean);
    return String(v).split(/[,;|]+/).map(clean).filter(Boolean);
  }
  function unique(list){
    var seen = {}; return list.filter(function(x){ var k=x.toLowerCase(); if(seen[k]) return false; seen[k]=true; return true; });
  }
  function hasAny(haystack, words){ return words.some(function(w){ return haystack.indexOf(w) !== -1; }); }
  function addIf(list, key){ if(list.indexOf(key)===-1) list.push(key); }
  function slugify(s){return clean(s).toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');}

  function inferTypes(p){
    var tags = [];
    arr(p.typeTags).forEach(function(x){addIf(tags,x)});
    if(p.typeGroup) addIf(tags, clean(p.typeGroup));
    var s = lower([p.category,p.productType,p.title,p.slug,p.sourcePage,p.pageUrl,p.description].join(' '));
    if(hasAny(s,['cosmetic','makeup','beauty pouch','vanity','skincare','brush organizer'])) addIf(tags,'Cosmetic Bags');
    if(hasAny(s,['toiletry','wash bag','dopp','hanging toiletry','travel wash'])) addIf(tags,'Toiletry Bags');
    if(hasAny(s,['shopping','grocery','retail tote','jute','wine bag','canvas tote','cotton tote'])) addIf(tags,'Shopping Bags');
    if(hasAny(s,['cooler','lunch','insulated','picnic','thermal','bottle carrier','snack'])) addIf(tags,'Cooler Bags');
    if(hasAny(s,['sports','gym','duffel','yoga','swim','outdoor','training','sling bag'])) addIf(tags,'Sports Bags');
    if(hasAny(s,['drawstring','cinch','gym sack'])) addIf(tags,'Drawstring Bags');
    if(hasAny(s,['travel organizer','packing cube','passport','cable organizer','laundry bag','organizer set'])) addIf(tags,'Travel Organizers');
    if(hasAny(s,['card binder','card storage','photocard','toploader','trading card','card album','portfolio'])) addIf(tags,'Card Binder Cases');
    if(hasAny(s,['care binder','medical document','family planner'])) addIf(tags,'Care Binder');
    if(hasAny(s,['custom oem','oem gift','sample kit','gift set','private label'])) addIf(tags,'Custom OEM Bags');
    if(!tags.length && p.productType) addIf(tags, clean(p.productType));
    if(!tags.length) addIf(tags,'Other Custom Bags');
    return unique(tags);
  }
  function inferMaterials(p){
    var tags = [];
    arr(p.materialTags).forEach(function(x){addIf(tags,x)});
    if(p.materialGroup) addIf(tags, clean(p.materialGroup));
    var s = lower([p.material,p.title,p.slug,p.sourcePage,p.category,p.productType,p.description].join(' '));
    if(hasAny(s,['cotton','canvas','jute'])) addIf(tags,'Cotton / Canvas');
    if(hasAny(s,['nylon'])) addIf(tags,'Nylon');
    if(hasAny(s,['oxford'])) addIf(tags,'Oxford');
    if(hasAny(s,['pvc','eva','tpu','clear','transparent'])) addIf(tags,'PVC / EVA / TPU');
    if(hasAny(s,['neoprene','scuba'])) addIf(tags,'Neoprene');
    if(hasAny(s,['rpet','recycled polyester'])) addIf(tags,'RPET');
    if(hasAny(s,['pu leather','pu ', 'leather'])) addIf(tags,'PU Leather');
    if(hasAny(s,['felt'])) addIf(tags,'Felt');
    if(hasAny(s,['non woven','non-woven','nonwoven'])) addIf(tags,'Non Woven');
    if(hasAny(s,['polyester'])) addIf(tags,'Polyester');
    if(hasAny(s,['velvet','satin'])) addIf(tags,'Velvet / Satin');
    if(hasAny(s,['tyvek'])) addIf(tags,'Tyvek');
    if(hasAny(s,['mesh'])) addIf(tags,'Mesh');
    if(!tags.length && p.material) {
      String(p.material).split(/[\/,+]+/).map(clean).filter(Boolean).forEach(function(x){addIf(tags,x)});
    }
    if(!tags.length) addIf(tags,'Other Materials');
    return unique(tags);
  }
  function inferApplications(p){
    var tags = [];
    arr(p.applicationTags).forEach(function(x){addIf(tags,x)});
    if(p.applicationGroup) addIf(tags, clean(p.applicationGroup));
    var s = lower([p.application,p.category,p.title,p.slug,p.sourcePage,p.productType,p.description].join(' '));
    if(hasAny(s,['beauty','cosmetic','makeup','skincare','vanity','sample pouch'])) addIf(tags,'Beauty & Cosmetic');
    if(hasAny(s,['travel','toiletry','wash','passport','packing cube','laundry','cable organizer'])) addIf(tags,'Travel & Toiletry');
    if(hasAny(s,['retail','promotion','promotional','shopping','giveaway','grocery','non woven','packaging'])) addIf(tags,'Retail & Promotion');
    if(hasAny(s,['food','cooler','lunch','picnic','thermal','delivery','bottle','snack'])) addIf(tags,'Food & Cooler');
    if(hasAny(s,['outdoor','sports','gym','duffel','yoga','swim','training','beach'])) addIf(tags,'Outdoor & Sports');
    if(hasAny(s,['card','document','photocard','toploader','portfolio','planner','medical'])) addIf(tags,'Card & Document Storage');
    if(hasAny(s,['corporate','gift','event','holiday','welcome bag','sample kit','trade show'])) addIf(tags,'Corporate Gifts');
    if(hasAny(s,['office','school','stationery','file folder','desk'])) addIf(tags,'Office & School');
    if(hasAny(s,['giveaway','campaign','conference','trade show'])) addIf(tags,'Event Giveaway');
    if(!tags.length && p.application) addIf(tags, clean(p.application));
    if(!tags.length) addIf(tags,'Other Applications');
    return unique(tags);
  }
  function getTags(p){
    if(mode==='material') return inferMaterials(p);
    if(mode==='application') return inferApplications(p);
    return inferTypes(p);
  }
  function allCategories(){
    var defaults = (CATEGORY_SETS[mode] || CATEGORY_SETS.type).map(function(c){return c.key});
    var fromProducts = [];
    state.products.forEach(function(p){ getTags(p).forEach(function(t){ if(fromProducts.indexOf(t)===-1) fromProducts.push(t); }); });
    return unique(defaults.concat(fromProducts));
  }
  function categoryInfo(key){
    var found = (CATEGORY_SETS[mode] || []).filter(function(c){ return c.key === key; })[0];
    return found || {key:key, desc:'Products automatically grouped from CMS fields and product tags.'};
  }
  function countFor(key){
    if(key === 'All') return state.products.length;
    return state.products.filter(function(p){return getTags(p).indexOf(key)!==-1;}).length;
  }
  function productTitle(p){return clean(p.cardTitle || p.title || 'Custom Bag Product');}
  function productSubtitle(p){
    if(p.cardSubtitle) return clean(p.cardSubtitle);
    var type = inferTypes(p)[0] || clean(p.productType) || 'Custom bag';
    var mat = inferMaterials(p).slice(0,2).join(' / ');
    var app = inferApplications(p)[0] || '';
    return [type, mat, app].filter(Boolean).join(' · ');
  }
  function kicker(p){
    if(mode==='type') return (inferApplications(p)[0] || 'OEM Custom Bags').toUpperCase();
    if(mode==='material') return (inferMaterials(p)[0] || 'CUSTOM MATERIAL').toUpperCase();
    return (inferApplications(p)[0] || 'B2B APPLICATION').toUpperCase();
  }
  function image(p){
    var img = clean(p.mainImage) || 'assets/products/category-custom-oem-bags.jpg';
    if(img.indexOf('/')===0) return img;
    return img;
  }
  function url(p){return clean(p.pageUrl) || ('product-managed.html?slug=' + encodeURIComponent(p.slug || ''));}
  function meta(p){
    var items = [];
    if(mode !== 'type') items.push(inferTypes(p)[0]);
    if(mode !== 'material') items.push(inferMaterials(p)[0]);
    if(mode !== 'application') items.push(inferApplications(p)[0]);
    if(p.logo) items.push(clean(p.logo));
    return unique(items.filter(Boolean)).slice(0,4);
  }
  function productText(p){return lower([p.title,p.cardTitle,p.cardSubtitle,p.productType,p.typeGroup,p.material,p.materialGroup,p.application,p.applicationGroup,p.category,p.itemNo,p.description,p.keywords,p.slug].join(' '));}
  function filtered(){
    var q = state.search.toLowerCase().trim();
    var list = state.products.filter(function(p){
      var okCat = state.active === 'All' || getTags(p).indexOf(state.active)!==-1;
      var okSearch = !q || productText(p).indexOf(q)!==-1;
      return okCat && okSearch;
    });
    if(state.sort === 'az') list.sort(function(a,b){return productTitle(a).localeCompare(productTitle(b));});
    if(state.sort === 'za') list.sort(function(a,b){return productTitle(b).localeCompare(productTitle(a));});
    if(state.sort === 'new') list.sort(function(a,b){return (clean(b.updatedAt)||'').localeCompare(clean(a.updatedAt)||'');});
    return list;
  }
  function scrollToCatalog(behavior){
    var target = document.querySelector('.auto-main-head') || document.querySelector('.auto-main') || root;
    if(target){
      var top = target.getBoundingClientRect().top + window.pageYOffset - 98;
      window.scrollTo({top: Math.max(0, top), behavior: behavior || 'smooth'});
    }
  }
  function shouldInitialJump(){
    var params = new URLSearchParams(window.location.search);
    var hasSelectedCategory = !!(params.get(mode) || params.get('category'));
    var hash = (window.location.hash || '').toLowerCase();
    return hasSelectedCategory || hash === '#products' || hash === '#product-list' || hash === '#catalog' || hash === '#catalog-products';
  }
  function initialJumpToSelectedGroup(){
    if(initialJumpDone || !shouldInitialJump()) return;
    initialJumpDone = true;
    /* Wait one frame so the selected category title and product grid are already rendered. */
    setTimeout(function(){ scrollToCatalog('auto'); }, 80);
  }
  function renderFilters(){
    var cats = allCategories();
    var list = ['All'].concat(cats.filter(function(c){return countFor(c)>0 || state.active===c;}));
    if(els.filterList){
      els.filterList.innerHTML = list.map(function(c){return '<button class="auto-filter-button '+(state.active===c?'active':'')+'" data-category="'+escapeHtml(c)+'"><span>'+escapeHtml(c==='All'?SELECT_LABELS[mode]:c)+'</span><span>'+countFor(c)+'</span></button>';}).join('');
      els.filterList.querySelectorAll('button').forEach(function(btn){btn.addEventListener('click',function(){state.active=btn.getAttribute('data-category'); state.visible=12; render(); scrollToCatalog();});});
    }
    if(els.categorySelect){
      els.categorySelect.innerHTML = list.map(function(c){return '<option value="'+escapeHtml(c)+'" '+(state.active===c?'selected':'')+'>'+escapeHtml(c==='All'?SELECT_LABELS[mode]:c)+' ('+countFor(c)+')</option>';}).join('');
    }
  }
  function renderCategoryGrid(){
    if(!els.categoryGrid) return;
    if(state.active !== 'All' || (state.search && state.search.trim())){
      els.categoryGrid.classList.add('auto-hidden');
      els.categoryGrid.innerHTML = '';
      return;
    }
    els.categoryGrid.classList.remove('auto-hidden');
    var cats = allCategories().filter(function(c){return countFor(c)>0;}).slice(0,12);
    els.categoryGrid.innerHTML = cats.map(function(c){ var info=categoryInfo(c); return '<button class="auto-category-card" data-category="'+escapeHtml(c)+'"><strong>'+escapeHtml(c)+'</strong><p>'+escapeHtml(info.desc)+'</p><em>'+countFor(c)+' products · View group →</em></button>'; }).join('');
    els.categoryGrid.querySelectorAll('button').forEach(function(btn){btn.addEventListener('click',function(){state.active=btn.getAttribute('data-category'); state.visible=12; render(); scrollToCatalog();});});
  }
  function renderProducts(){
    var list = filtered();
    var shown = list.slice(0,state.visible);
    if(els.count) els.count.textContent = list.length + ' products found';
    if(els.activeTitle) els.activeTitle.textContent = state.active === 'All' ? pageTitle : state.active + ' Products';
    if(els.activeDesc) els.activeDesc.textContent = state.active === 'All' ? pageDescription : categoryInfo(state.active).desc + ' The product list below updates automatically after this category is selected.';
    if(!els.productGrid) return;
    if(!shown.length){
      els.productGrid.innerHTML = '<div class="auto-empty">No products found in this group yet. Add products in the admin CMS and choose the matching type, material or application tags.</div>';
    } else {
      els.productGrid.innerHTML = shown.map(function(p){
        return '<a class="auto-product-card" href="'+escapeAttr(url(p))+'">'
          + '<span class="auto-product-image"><img src="'+escapeAttr(image(p))+'" alt="'+escapeAttr(productTitle(p))+'" loading="lazy"></span>'
          + '<span class="auto-product-content"><span class="auto-product-kicker">'+escapeHtml(kicker(p))+'</span><h3>'+escapeHtml(productTitle(p))+'</h3><p>'+escapeHtml(productSubtitle(p))+'</p><span class="auto-product-meta">'+meta(p).map(function(m){return '<span>'+escapeHtml(m)+'</span>';}).join('')+'</span></span>'
          + '</a>';
      }).join('');
    }
    if(els.loadWrap) els.loadWrap.classList.toggle('auto-hidden', list.length <= state.visible);
  }
  function render(){
    renderFilters();
    renderCategoryGrid();
    renderProducts();
    var params = new URLSearchParams(window.location.search);
    if(state.active && state.active !== 'All') params.set(mode, state.active); else params.delete(mode);
    var newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '') + (window.location.hash || '');
    if(window.history && window.history.replaceState) window.history.replaceState(null,'',newUrl);
  }
  function escapeHtml(s){return clean(s).replace(/[&<>"']/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m];});}
  function escapeAttr(s){return escapeHtml(s).replace(/`/g,'&#096;');}

  fetch('data/products-index.json', {cache:'no-store'})
    .then(function(r){ if(!r.ok) throw new Error('Cannot load products'); return r.json(); })
    .then(function(data){
      state.products = (Array.isArray(data)?data:[]).filter(function(p){return (p.status||'published') !== 'draft';});
      var params = new URLSearchParams(window.location.search);
      state.active = params.get(mode) || params.get('category') || 'All';
      if(els.search) els.search.addEventListener('input',function(){state.search=this.value; state.visible=12; renderCategoryGrid(); renderProducts();});
      if(els.sort) els.sort.addEventListener('change',function(){state.sort=this.value; state.visible=12; renderProducts();});
      if(els.categorySelect) els.categorySelect.addEventListener('change',function(){state.active=this.value; state.visible=12; render(); scrollToCatalog();});
      if(els.loadMore) els.loadMore.addEventListener('click',function(){state.visible += 12; renderProducts();});
      render();
      initialJumpToSelectedGroup();
    })
    .catch(function(){
      if(els.productGrid) els.productGrid.innerHTML = '<div class="auto-empty">Product data could not be loaded. Please check data/products-index.json.</div>';
      if(els.count) els.count.textContent = 'Product data could not be loaded';
    });
})();
