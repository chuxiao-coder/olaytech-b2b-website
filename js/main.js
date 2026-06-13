/* ==========================================================
   Olaytech Navigation Real Fix - 2026-06-13
   Important: this script no longer rebuilds the header after page load.
   It only sets active state, supports mobile menu, syncs old links and
   keeps old category URLs redirected. This removes the visible nav jump.
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

  function currentFile(){
    return window.location.pathname.split('/').pop() || 'index.html';
  }

  function activeSection(){
    var f = currentFile();
    if(f === 'index.html') return 'home';
    if(f === 'product-types.html' || f === 'product-managed.html' || f === 'products-managed.html') return 'type';
    if(linkMap[f] && linkMap[f].indexOf('product-types.html') === 0) return 'type';
    if(f === 'materials.html') return 'material';
    if(linkMap[f] && linkMap[f].indexOf('materials.html') === 0) return 'material';
    if(f === 'applications.html') return 'application';
    if(linkMap[f] && linkMap[f].indexOf('applications.html') === 0) return 'application';
    if(['support.html','faq.html','blog.html','oem-bag-manufacturing-process.html','logo-methods-for-custom-bags.html','material-guide.html','quality-control.html','download-catalog.html'].indexOf(f) !== -1) return 'support';
    if(f === 'about.html') return 'about';
    if(f === 'contact.html') return 'contact';
    return '';
  }

  function fileNameFromHref(href){
    if(!href) return '';
    var raw = href.trim();
    if(raw.indexOf('#') === 0 || raw.indexOf('mailto:') === 0 || raw.indexOf('tel:') === 0 || raw.indexOf('javascript:') === 0) return '';
    if(raw.indexOf('http') === 0 && raw.indexOf(window.location.hostname) === -1) return '';
    try { return (new URL(raw, window.location.href)).pathname.split('/').pop() || ''; }
    catch(e) { return raw.split('#')[0].split('?')[0].split('/').pop(); }
  }

  function redirectOldPage(){
    var f = currentFile();
    if(linkMap[f] && window.location.search === ''){
      var basePath = window.location.pathname.replace(/[^\/]*$/, '');
      window.location.replace(basePath + linkMap[f]);
    }
  }

  function syncOldLinks(){
    document.querySelectorAll('a[href]').forEach(function(a){
      var href = a.getAttribute('href');
      var file = fileNameFromHref(href);
      if(file && linkMap[file]) a.setAttribute('href', linkMap[file]);
    });
  }

  function markActiveNav(){
    var section = activeSection();
    var nav = document.querySelector('.main-nav');
    if(!nav) return;
    nav.querySelectorAll('.active,[aria-current="page"]').forEach(function(el){
      el.classList.remove('active');
      el.removeAttribute('aria-current');
    });
    if(!section) return;
    var target = nav.querySelector('[data-nav="'+section+'"]');
    if(target){
      if(target.classList.contains('nav-dropdown')) target = target.querySelector(':scope > a') || target.querySelector('a');
      target.classList.add('active');
      target.setAttribute('aria-current','page');
    }
  }

  function mobileToggle(){
    var header = document.getElementById('site-header');
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.main-nav');
    if(!header || !toggle || !nav) return;
    toggle.addEventListener('click', function(){
      var open = !nav.classList.contains('open');
      nav.classList.toggle('open', open);
      header.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function(e){
      if(!header.contains(e.target)){
        nav.classList.remove('open');
        header.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded','false');
      }
    });
  }

  function jumpToProducts(){
    if(window.location.hash !== '#products') return;
    setTimeout(function(){
      var el = document.getElementById('products') || document.getElementById('autoProductGrid') || document.querySelector('.auto-main');
      if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
    }, 300);
  }

  function init(){
    redirectOldPage();
    syncOldLinks();
    markActiveNav();
    mobileToggle();
    jumpToProducts();
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
