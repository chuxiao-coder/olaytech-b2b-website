/* ==========================================================
   Olaytech Unified Navigation + Link Sync
   Purpose: every page uses the same header size, dropdowns and links.
   ========================================================== */
(function(){
  'use strict';

  var BRAND_LOGO = 'assets/brand/olay-logo-black.png';
  var WHATSAPP = 'https://wa.me/8613957952677?text=Hello%20Olaytech%2C%20I%20would%20like%20to%20ask%20for%20a%20custom%20bag%20quotation.';

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

  function navHtml(active){
    function cls(name){ return name === active ? ' class="active"' : ''; }
    return ''+
      '<a'+cls('home')+' href="index.html">Home</a>'+ 
      '<div class="nav-dropdown"><a'+cls('type')+' href="product-types.html">By Type</a><div class="dropdown-panel">'+
        '<a href="product-types.html">All Bag Categories</a>'+ 
        '<a href="product-types.html?type=Cosmetic%20Bags#products">Cosmetic Bags</a>'+ 
        '<a href="product-types.html?type=Toiletry%20Bags#products">Toiletry Bags</a>'+ 
        '<a href="product-types.html?type=Shopping%20Bags#products">Shopping Bags</a>'+ 
        '<a href="product-types.html?type=Cooler%20Bags#products">Cooler Bags</a>'+ 
        '<a href="product-types.html?type=Sports%20Bags#products">Sports Bags</a>'+ 
        '<a href="product-types.html?type=Drawstring%20Bags#products">Drawstring Bags</a>'+ 
        '<a href="product-types.html?type=Travel%20Organizers#products">Travel Organizers</a>'+ 
        '<a href="product-types.html?type=Card%20Binder%20Cases#products">Card Binder Cases</a>'+ 
        '<a href="product-types.html?type=Custom%20OEM%20Bags#products">Custom OEM Bags</a>'+ 
      '</div></div>'+ 
      '<div class="nav-dropdown"><a'+cls('material')+' href="materials.html">By Material</a><div class="dropdown-panel">'+
        '<a href="materials.html">All Materials</a>'+ 
        '<a href="materials.html?material=Cotton%20%2F%20Canvas#products">Cotton / Canvas</a>'+ 
        '<a href="materials.html?material=Nylon#products">Nylon</a>'+ 
        '<a href="materials.html?material=Oxford#products">Oxford</a>'+ 
        '<a href="materials.html?material=PVC%20%2F%20EVA%20%2F%20TPU#products">PVC / EVA / TPU</a>'+ 
        '<a href="materials.html?material=Neoprene#products">Neoprene</a>'+ 
        '<a href="materials.html?material=RPET#products">RPET</a>'+ 
        '<a href="materials.html?material=PU%20Leather#products">PU Leather</a>'+ 
        '<a href="materials.html?material=Felt#products">Felt</a>'+ 
        '<a href="materials.html?material=Non%20Woven#products">Non Woven</a>'+ 
      '</div></div>'+ 
      '<div class="nav-dropdown"><a'+cls('application')+' href="applications.html">By Application</a><div class="dropdown-panel">'+
        '<a href="applications.html">All Applications</a>'+ 
        '<a href="applications.html?application=Beauty%20%26%20Cosmetic#products">Beauty &amp; Cosmetic</a>'+ 
        '<a href="applications.html?application=Travel%20%26%20Toiletry#products">Travel &amp; Toiletry</a>'+ 
        '<a href="applications.html?application=Retail%20%26%20Promotion#products">Retail &amp; Promotion</a>'+ 
        '<a href="applications.html?application=Food%20%26%20Cooler#products">Food &amp; Cooler</a>'+ 
        '<a href="applications.html?application=Outdoor%20%26%20Sports#products">Outdoor &amp; Sports</a>'+ 
        '<a href="applications.html?application=Card%20%26%20Document%20Storage#products">Card Storage</a>'+ 
        '<a href="applications.html?application=Corporate%20Gifts#products">Corporate Gifts</a>'+ 
      '</div></div>'+ 
      '<div class="nav-dropdown"><a'+cls('support')+' href="support.html">Support</a><div class="dropdown-panel support-menu">'+
        '<a href="support.html">Support Center</a>'+ 
        '<a href="blog.html">Buyer Guide</a>'+ 
        '<a href="oem-bag-manufacturing-process.html">OEM Process</a>'+ 
        '<a href="logo-methods-for-custom-bags.html">Logo Options</a>'+ 
        '<a href="material-guide.html">Material Guide</a>'+ 
        '<a href="quality-control.html">Quality Control</a>'+ 
        '<a href="download-catalog.html">Download Catalog</a>'+ 
        '<a href="faq.html">FAQ</a>'+ 
      '</div></div>'+ 
      '<a'+cls('about')+' href="about.html">About Us</a>'+ 
      '<a'+cls('contact')+' href="contact.html">Contact</a>';
  }

  function currentFile(){ return window.location.pathname.split('/').pop() || 'index.html'; }

  function activeSection(){
    var f = currentFile();
    if(f === 'index.html') return 'home';
    if(f === 'product-types.html' || f === 'products-managed.html' || f === 'product-managed.html') return 'type';
    if(f === 'materials.html') return 'material';
    if(f === 'applications.html') return 'application';
    if(['support.html','faq.html','blog.html','oem-bag-manufacturing-process.html','logo-methods-for-custom-bags.html','material-guide.html','quality-control.html','download-catalog.html'].indexOf(f) !== -1) return 'support';
    if(f === 'about.html') return 'about';
    if(f === 'contact.html') return 'contact';
    return '';
  }

  function ensureCss(){
    if(document.getElementById('olay-unified-nav-css')) return;
    var existing = Array.prototype.some.call(document.querySelectorAll('link[rel="stylesheet"]'), function(link){
      return (link.getAttribute('href') || '').indexOf('unified-nav.css') !== -1;
    });
    if(existing) return;
    var link = document.createElement('link');
    link.id = 'olay-unified-nav-css';
    link.rel = 'stylesheet';
    link.href = 'css/unified-nav.css';
    document.head.appendChild(link);
  }

  function normalizeTopbar(){
    var topbar = document.querySelector('.topbar, .v7-topbar, .initi-topbar, .olay-topbar');
    if(!topbar){
      topbar = document.createElement('div');
      topbar.innerHTML = '<div class="container topbar-inner olay-topbar-inner"><span>OEM &amp; ODM Custom Bags · Factory Direct · Global Shipping Support</span></div>';
      document.body.insertBefore(topbar, document.body.firstChild);
    }
    topbar.classList.add('topbar','v7-topbar','olay-nav-topbar');
    var inner = topbar.querySelector('.topbar-inner');
    if(inner) inner.classList.add('olay-topbar-inner');
  }

  function normalizeHeader(){
    var header = document.getElementById('site-header') || document.querySelector('header.site-header, header.initi-header, .site-header');
    if(!header){
      header = document.createElement('header');
      header.id = 'site-header';
      header.className = 'site-header olay-site-header';
      header.innerHTML = ''+
        '<div class="container header-inner olay-header-inner">'+
          '<a class="logo logo-image olay-logo-link" href="index.html" aria-label="Olaytech home">'+
            '<img src="'+BRAND_LOGO+'" width="132" height="58" alt="O\'Lay custom bag manufacturer logo">'+
          '</a>'+ 
          '<button class="nav-toggle" aria-label="Open navigation" type="button">☰</button>'+ 
          '<nav class="main-nav olay-main-nav" aria-label="Main navigation">'+navHtml(activeSection())+'</nav>'+ 
          '<a class="header-cta olay-header-cta" href="contact.html#design-brief">Get Quote <span>›</span></a>'+ 
        '</div>';
      var afterTopbar = document.querySelector('.topbar, .v7-topbar, .olay-topbar');
      if(afterTopbar && afterTopbar.nextSibling) document.body.insertBefore(header, afterTopbar.nextSibling);
      else document.body.insertBefore(header, document.body.firstChild);
    }
    header.id = 'site-header';
    header.classList.add('site-header','olay-site-header');
    var inner = header.querySelector('.header-inner');
    if(inner) inner.classList.add('olay-header-inner');
    var logo = header.querySelector('.logo, .logo-image');
    if(logo) logo.classList.add('logo','logo-image','olay-logo-link');
    var nav = header.querySelector('.main-nav');
    if(nav) nav.classList.add('olay-main-nav');
    var cta = header.querySelector('.header-cta');
    if(cta) cta.classList.add('olay-header-cta');
  }

  function fileNameFromHref(href){
    if(!href) return '';
    var raw = href.trim();
    if(raw.indexOf('#') === 0 || raw.indexOf('mailto:') === 0 || raw.indexOf('tel:') === 0 || raw.indexOf('javascript:') === 0 || raw.indexOf('http') === 0 && raw.indexOf(window.location.hostname) === -1) return '';
    try { return (new URL(raw, window.location.href)).pathname.split('/').pop() || ''; }
    catch(e) { return raw.split('#')[0].split('?')[0].split('/').pop(); }
  }

  function setActiveState(){
    var section = activeSection();
    var nav = document.querySelector('.main-nav');
    if(!nav) return;
    nav.querySelectorAll('a.active,[aria-current="page"]').forEach(function(a){
      a.classList.remove('active');
      a.removeAttribute('aria-current');
    });
    var target;
    if(section === 'home') target = nav.querySelector(':scope > a[href="index.html"]');
    if(section === 'type') target = nav.querySelector('.nav-dropdown > a[href="product-types.html"]');
    if(section === 'material') target = nav.querySelector('.nav-dropdown > a[href="materials.html"]');
    if(section === 'application') target = nav.querySelector('.nav-dropdown > a[href="applications.html"]');
    if(section === 'support') target = nav.querySelector('.nav-dropdown > a[href="support.html"]');
    if(section === 'about') target = nav.querySelector(':scope > a[href="about.html"]');
    if(section === 'contact') target = nav.querySelector(':scope > a[href="contact.html"]');
    if(target){
      target.classList.add('active');
      target.setAttribute('aria-current','page');
    }
  }

  function syncOldLinks(){
    document.querySelectorAll('a[href]').forEach(function(a){
      var file = fileNameFromHref(a.getAttribute('href'));
      if(file && linkMap[file]) a.setAttribute('href', linkMap[file]);
    });
  }

  function mobileToggle(){
    var header = document.getElementById('site-header');
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.main-nav');
    if(!toggle || !nav) return;
    toggle.addEventListener('click', function(){
      nav.classList.toggle('open');
      header.classList.toggle('nav-open');
    });
    document.addEventListener('click', function(e){
      if(!header.contains(e.target)){
        nav.classList.remove('open');
        header.classList.remove('nav-open');
      }
    });
  }

  function jumpToProducts(){
    if(window.location.hash !== '#products') return;
    setTimeout(function(){
      var el = document.getElementById('products') || document.getElementById('autoProductGrid') || document.querySelector('.auto-main');
      if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
    }, 500);
  }

  function redirectOldPage(){
    var f = currentFile();
    if(linkMap[f] && window.location.search === ''){
      var basePath = window.location.pathname.replace(/[^\/]*$/, '');
      window.location.replace(basePath + linkMap[f]);
    }
  }

  function init(){
    document.body.classList.add('olay-unified-ready');
    ensureCss();
    normalizeTopbar();
    normalizeHeader();
    setActiveState();
    syncOldLinks();
    mobileToggle();
    jumpToProducts();
    redirectOldPage();
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
