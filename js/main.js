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

/* Olaytech dynamic catalog link sync
   Redirect old static category pages to the new CMS-driven dynamic catalog pages. */
document.addEventListener('DOMContentLoaded', function(){
  var linkMap = {
    'cosmetic-bags.html': 'product-types.html?type=Cosmetic%20Bags',
    'toiletry-bags.html': 'product-types.html?type=Toiletry%20Bags',
    'shopping-bags.html': 'product-types.html?type=Shopping%20Bags',
    'cooler-bags.html': 'product-types.html?type=Cooler%20Bags',
    'sports-bags.html': 'product-types.html?type=Sports%20Bags',
    'drawstring-bags.html': 'product-types.html?type=Drawstring%20Bags',
    'travel-organizers.html': 'product-types.html?type=Travel%20Organizers',
    'card-binder.html': 'product-types.html?type=Card%20Binder%20Cases',
    'custom-oem-bags.html': 'product-types.html?type=Custom%20OEM%20Bags',

    'canvas-bags.html': 'materials.html?material=Cotton%20%2F%20Canvas',
    'nylon-bags.html': 'materials.html?material=Nylon',
    'oxford-bags.html': 'materials.html?material=Oxford',
    'pvc-eva-bags.html': 'materials.html?material=PVC%20%2F%20EVA%20%2F%20TPU',
    'neoprene-bags.html': 'materials.html?material=Neoprene',
    'rpet-bags.html': 'materials.html?material=RPET',
    'pu-leather-bags.html': 'materials.html?material=PU%20Leather',
    'felt-bags.html': 'materials.html?material=Felt',
    'non-woven-bags.html': 'materials.html?material=Non%20Woven',

    'application-beauty-cosmetic.html': 'applications.html?application=Beauty%20%26%20Cosmetic',
    'application-travel-toiletry.html': 'applications.html?application=Travel%20%26%20Toiletry',
    'application-retail-promotion.html': 'applications.html?application=Retail%20%26%20Promotion',
    'application-food-cooler.html': 'applications.html?application=Food%20%26%20Cooler',
    'application-outdoor-sports.html': 'applications.html?application=Outdoor%20%26%20Sports',
    'application-card-storage.html': 'applications.html?application=Card%20%26%20Document%20Storage',
    'application-corporate-gifts.html': 'applications.html?application=Corporate%20Gifts'
  };

  function normalizedPath(href){
    if(!href) return '';
    var raw = href.trim();
    if(raw.indexOf('#') === 0 || raw.indexOf('mailto:') === 0 || raw.indexOf('tel:') === 0 || raw.indexOf('https://wa.me/') === 0) return '';
    try {
      var u = new URL(raw, window.location.href);
      var file = u.pathname.split('/').pop();
      return file || '';
    } catch(e) {
      return raw.split('#')[0].split('?')[0].split('/').pop();
    }
  }

  document.querySelectorAll('a[href]').forEach(function(a){
    var file = normalizedPath(a.getAttribute('href'));
    if(linkMap[file]) a.setAttribute('href', linkMap[file]);
  });
});
