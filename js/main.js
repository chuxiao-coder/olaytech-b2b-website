/* ==========================================================
   Olaytech navigation helper
   Safe scope: mobile dropdown, old-category link sync, and old page redirects.
   Header HTML and size are controlled directly in the page + css/unified-nav.css,
   so navigation no longer jumps after page load.
   ========================================================== */
(function(){
  'use strict';

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

  function currentFile(){ return window.location.pathname.split('/').pop() || 'index.html'; }

  function fileNameFromHref(href){
    if(!href) return '';
    var raw = href.trim();
    if(raw.indexOf('#') === 0 || raw.indexOf('mailto:') === 0 || raw.indexOf('tel:') === 0 || raw.indexOf('javascript:') === 0) return '';
    try {
      var u = new URL(raw, window.location.href);
      if(u.hostname && u.hostname !== window.location.hostname) return '';
      return u.pathname.split('/').pop() || '';
    } catch(e){
      return raw.split('#')[0].split('?')[0].split('/').pop();
    }
  }

  function ensureCssFallback(){
    if(document.querySelector('link[href*="unified-nav.css"]')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/unified-nav.css?v=nav-stable-20260613';
    document.head.appendChild(link);
  }

  function syncOldLinks(){
    document.querySelectorAll('a[href]').forEach(function(a){
      var file = fileNameFromHref(a.getAttribute('href'));
      if(file && linkMap[file]) a.setAttribute('href', linkMap[file]);
    });
  }

  function setActiveNav(){
    var file = currentFile();
    var section = '';
    if(file === 'index.html') section = 'Home';
    else if(file === 'product-types.html' || file === 'product-managed.html' || file === 'products-managed.html') section = 'By Type';
    else if(file === 'materials.html') section = 'By Material';
    else if(file === 'applications.html') section = 'By Application';
    else if(['support.html','faq.html','blog.html','oem-bag-manufacturing-process.html','logo-methods-for-custom-bags.html','material-guide.html','quality-control.html','download-catalog.html'].indexOf(file) !== -1) section = 'Support';
    else if(file === 'about.html') section = 'About Us';
    else if(file === 'contact.html') section = 'Contact';
    if(!section) return;
    var nav = document.querySelector('#site-header .main-nav');
    if(!nav) return;
    nav.querySelectorAll('a.active').forEach(function(a){ a.classList.remove('active'); });
    Array.prototype.some.call(nav.querySelectorAll(':scope > a, :scope > .nav-dropdown > a'), function(a){
      if(a.textContent.trim() === section){ a.classList.add('active'); return true; }
      return false;
    });
  }

  function mobileToggle(){
    var header = document.getElementById('site-header');
    var toggle = header && header.querySelector('.nav-toggle');
    var nav = header && header.querySelector('.main-nav');
    if(!header || !toggle || !nav || toggle.dataset.olayBound === '1') return;
    toggle.dataset.olayBound = '1';
    toggle.addEventListener('click', function(e){
      e.stopPropagation();
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
    }, 250);
  }

  function redirectOldPage(){
    var f = currentFile();
    if(linkMap[f] && window.location.search === ''){
      var basePath = window.location.pathname.replace(/[^\/]*$/, '');
      window.location.replace(basePath + linkMap[f]);
    }
  }

  function init(){
    document.body.classList.add('olay-nav-ready');
    ensureCssFallback();
    setActiveNav();
    syncOldLinks();
    mobileToggle();
    jumpToProducts();
    redirectOldPage();
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
