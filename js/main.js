/* Olaytech global navigation helper + dynamic catalog link sync */
(function(){
  var linkMap = {
    'cosmetic-bags.html': 'product-types.html?type=Cosmetic%20Bags#products',
    'toiletry-bags.html': 'product-types.html?type=Toiletry%20Bags#products',
    'shopping-bags.html': 'product-types.html?type=Shopping%20Bags#products',
    'cooler-bags.html': 'product-types.html?type=Cooler%20Bags#products',
    'sports-bags.html': 'product-types.html?type=Sports%20Bags#products',
    'drawstring-bags.html': 'product-types.html?type=Drawstring%20Bags#products',
    'travel-organizers.html': 'product-types.html?type=Travel%20Organizers#products',
    'card-binder.html': 'product-types.html?type=Card%20Binder%20Cases#products',
    'card-binder-cases.html': 'product-types.html?type=Card%20Binder%20Cases#products',
    'custom-oem-bags.html': 'product-types.html?type=Custom%20OEM%20Bags#products',
    'products-managed.html': 'product-types.html#products',

    'canvas-bags.html': 'materials.html?material=Cotton%20%2F%20Canvas#products',
    'cotton-canvas-bags.html': 'materials.html?material=Cotton%20%2F%20Canvas#products',
    'nylon-bags.html': 'materials.html?material=Nylon#products',
    'oxford-bags.html': 'materials.html?material=Oxford#products',
    'pvc-eva-bags.html': 'materials.html?material=PVC%20%2F%20EVA%20%2F%20TPU#products',
    'neoprene-bags.html': 'materials.html?material=Neoprene#products',
    'rpet-bags.html': 'materials.html?material=RPET#products',
    'pu-leather-bags.html': 'materials.html?material=PU%20Leather#products',
    'felt-bags.html': 'materials.html?material=Felt#products',
    'non-woven-bags.html': 'materials.html?material=Non%20Woven#products',

    'application-beauty-cosmetic.html': 'applications.html?application=Beauty%20%26%20Cosmetic#products',
    'application-travel-toiletry.html': 'applications.html?application=Travel%20%26%20Toiletry#products',
    'application-retail-promotion.html': 'applications.html?application=Retail%20%26%20Promotion#products',
    'application-food-cooler.html': 'applications.html?application=Food%20%26%20Cooler#products',
    'application-outdoor-sports.html': 'applications.html?application=Outdoor%20%26%20Sports#products',
    'application-card-storage.html': 'applications.html?application=Card%20%26%20Document%20Storage#products',
    'application-card-document-storage.html': 'applications.html?application=Card%20%26%20Document%20Storage#products',
    'application-corporate-gifts.html': 'applications.html?application=Corporate%20Gifts#products',
    'application-corporate-gift-events.html': 'applications.html?application=Corporate%20Gifts#products'
  };

  var navHtml = ''+
    '<a href="index.html">Home</a>'+
    '<div class="nav-dropdown"><a href="product-types.html">By Type</a><div class="dropdown-panel">'+
      '<a href="product-types.html">All Bag Categories</a><a href="product-types.html?type=Cosmetic%20Bags#products">Cosmetic Bags</a><a href="product-types.html?type=Toiletry%20Bags#products">Toiletry Bags</a><a href="product-types.html?type=Shopping%20Bags#products">Shopping Bags</a><a href="product-types.html?type=Cooler%20Bags#products">Cooler Bags</a><a href="product-types.html?type=Sports%20Bags#products">Sports Bags</a><a href="product-types.html?type=Drawstring%20Bags#products">Drawstring Bags</a><a href="product-types.html?type=Travel%20Organizers#products">Travel Organizers</a><a href="product-types.html?type=Card%20Binder%20Cases#products">Card Binder Cases</a><a href="product-types.html?type=Custom%20OEM%20Bags#products">Custom OEM Bags</a></div></div>'+
    '<div class="nav-dropdown"><a href="materials.html">By Material</a><div class="dropdown-panel">'+
      '<a href="materials.html">All Materials</a><a href="materials.html?material=Cotton%20%2F%20Canvas#products">Cotton / Canvas</a><a href="materials.html?material=Nylon#products">Nylon</a><a href="materials.html?material=Oxford#products">Oxford</a><a href="materials.html?material=PVC%20%2F%20EVA%20%2F%20TPU#products">PVC / EVA / TPU</a><a href="materials.html?material=Neoprene#products">Neoprene</a><a href="materials.html?material=RPET#products">RPET</a><a href="materials.html?material=PU%20Leather#products">PU Leather</a><a href="materials.html?material=Felt#products">Felt</a><a href="materials.html?material=Non%20Woven#products">Non Woven</a></div></div>'+
    '<div class="nav-dropdown"><a href="applications.html">By Application</a><div class="dropdown-panel">'+
      '<a href="applications.html">All Applications</a><a href="applications.html?application=Beauty%20%26%20Cosmetic#products">Beauty &amp; Cosmetic</a><a href="applications.html?application=Travel%20%26%20Toiletry#products">Travel &amp; Toiletry</a><a href="applications.html?application=Retail%20%26%20Promotion#products">Retail &amp; Promotion</a><a href="applications.html?application=Food%20%26%20Cooler#products">Food &amp; Cooler</a><a href="applications.html?application=Outdoor%20%26%20Sports#products">Outdoor &amp; Sports</a><a href="applications.html?application=Card%20%26%20Document%20Storage#products">Card Storage</a><a href="applications.html?application=Corporate%20Gifts#products">Corporate Gifts</a></div></div>'+
    '<div class="nav-dropdown"><a href="support.html">Support</a><div class="dropdown-panel support-menu">'+
      '<a href="support.html">Support Center</a><a href="blog.html">Buyer Guide</a><a href="oem-bag-manufacturing-process.html">OEM Process</a><a href="logo-methods-for-custom-bags.html">Logo Options</a><a href="material-guide.html">Material Guide</a><a href="quality-control.html">Quality Control</a><a href="download-catalog.html">Download Catalog</a><a href="faq.html">FAQ</a></div></div>'+
    '<a href="about.html">About Us</a><a href="contact.html">Contact</a>';

  function addUnifiedCss(){
    if(document.getElementById('olay-unified-nav-css')) return;
    var link = document.createElement('link');
    link.id = 'olay-unified-nav-css';
    link.rel = 'stylesheet';
    link.href = 'css/unified-nav.css';
    document.head.appendChild(link);
  }

  function fileNameFromHref(href){
    if(!href) return '';
    var raw = href.trim();
    if(raw.indexOf('#') === 0 || raw.indexOf('mailto:') === 0 || raw.indexOf('tel:') === 0 || raw.indexOf('javascript:') === 0) return '';
    try { return (new URL(raw, window.location.href)).pathname.split('/').pop() || ''; }
    catch(e) { return raw.split('#')[0].split('?')[0].split('/').pop(); }
  }

  function fixLinks(){
    document.querySelectorAll('a[href]').forEach(function(a){
      var file = fileNameFromHref(a.getAttribute('href'));
      if(linkMap[file]) a.setAttribute('href', linkMap[file]);
    });
  }

  function activeNav(){
    var file = window.location.pathname.split('/').pop() || 'index.html';
    var nav = document.querySelector('.main-nav');
    if(!nav) return;
    nav.querySelectorAll('a').forEach(function(a){ a.classList.remove('active'); });
    var selector = 'index.html';
    if(file === 'product-types.html' || file === 'product-managed.html' || file === 'products-managed.html') selector = 'product-types.html';
    if(file === 'materials.html') selector = 'materials.html';
    if(file === 'applications.html') selector = 'applications.html';
    if(file === 'support.html' || file === 'faq.html' || file === 'blog.html' || file === 'oem-bag-manufacturing-process.html' || file === 'logo-methods-for-custom-bags.html' || file === 'material-guide.html' || file === 'quality-control.html' || file === 'download-catalog.html') selector = 'support.html';
    if(file === 'about.html') selector = 'about.html';
    if(file === 'contact.html') selector = 'contact.html';
    var target = Array.prototype.find.call(nav.querySelectorAll('a[href]'), function(a){ return fileNameFromHref(a.getAttribute('href')) === selector; });
    if(target) target.classList.add('active');
  }

  function normalizeHeader(){
    var header = document.getElementById('site-header') || document.querySelector('.site-header');
    var nav = document.querySelector('.main-nav');
    if(nav) nav.innerHTML = navHtml;
    if(header){
      header.id = 'site-header';
      if(!header.querySelector('.nav-toggle')){
        var btn = document.createElement('button');
        btn.className = 'nav-toggle';
        btn.type = 'button';
        btn.setAttribute('aria-label','Open navigation');
        btn.textContent = '☰';
        var navEl = header.querySelector('.main-nav');
        if(navEl) header.querySelector('.header-inner, .container')?.insertBefore(btn, navEl);
      }
    }
    var quote = document.querySelector('.header-cta');
    if(quote) quote.setAttribute('href','contact.html#design-brief');
  }

  function mobileToggle(){
    var header = document.getElementById('site-header');
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.main-nav');
    if(toggle && nav){
      toggle.addEventListener('click', function(){
        nav.classList.toggle('open');
        if(header) header.classList.toggle('nav-open');
      });
    }
  }

  function jumpToProducts(){
    if(window.location.hash !== '#products') return;
    setTimeout(function(){
      var el = document.getElementById('products') || document.getElementById('autoProductGrid') || document.querySelector('.auto-main');
      if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
    }, 600);
  }

  document.addEventListener('DOMContentLoaded', function(){
    document.body.classList.add('olay-unified-ready');
    addUnifiedCss();
    normalizeHeader();
    fixLinks();
    activeNav();
    mobileToggle();
    jumpToProducts();
  });

  var currentFile = window.location.pathname.split('/').pop();
  if(linkMap[currentFile] && window.location.search === ''){
    var basePath = window.location.pathname.replace(/[^\/]*$/, '');
    window.location.replace(basePath + linkMap[currentFile]);
  }
})();
