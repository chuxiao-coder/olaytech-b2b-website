document.addEventListener('DOMContentLoaded',()=>{const t=document.querySelector('.nav-toggle');const n=document.querySelector('.main-nav');if(t&&n){t.addEventListener('click',()=>n.classList.toggle('open'));}document.querySelectorAll('.nav-dropdown>a').forEach(a=>a.addEventListener('click',e=>{}));});


/* V7.3 mobile navigation toggle */
document.addEventListener('DOMContentLoaded', function(){
  var header = document.getElementById('site-header');
  var toggle = document.querySelector('.nav-toggle');
  if(header && toggle){
    toggle.addEventListener('click', function(){
      header.classList.toggle('nav-open');
    });
  }
});

/* Olaytech direct dynamic catalog link sync
   Purpose: every old category link now jumps directly to the CMS-driven dynamic pages. */
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
    'custom-oem-bags.html': 'product-types.html?type=Custom%20OEM%20Bags#products',

    'canvas-bags.html': 'materials.html?material=Cotton%20%2F%20Canvas#products',
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
    'application-corporate-gifts.html': 'applications.html?application=Corporate%20Gifts#products'
  };

  function fileNameFromHref(href){
    if(!href) return '';
    var raw = href.trim();
    if(raw.indexOf('#') === 0 || raw.indexOf('mailto:') === 0 || raw.indexOf('tel:') === 0 || raw.indexOf('javascript:') === 0) return '';
    try {
      var u = new URL(raw, window.location.href);
      return u.pathname.split('/').pop() || '';
    } catch(e) {
      return raw.split('#')[0].split('?')[0].split('/').pop();
    }
  }

  function toAbsoluteTarget(target){
    var basePath = window.location.pathname.replace(/[^\/]*$/, '');
    return basePath + target;
  }

  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('a[href]').forEach(function(a){
      var file = fileNameFromHref(a.getAttribute('href'));
      if(linkMap[file]) a.setAttribute('href', linkMap[file]);
    });
  });

  var currentFile = window.location.pathname.split('/').pop();
  if(linkMap[currentFile] && window.location.search === ''){
    window.location.replace(toAbsoluteTarget(linkMap[currentFile]));
  }
})();
