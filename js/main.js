/* Olaytech navigation, inquiry context and mobile interaction */
(function(){
  'use strict';
  function pathName(){return (location.pathname.replace(/\/$/,'').split('/').pop()||'index').replace(/\.html$/,'');}
  function section(){
    var p=pathName();
    if(p==='index')return'home';
    if(p==='product-types'||p==='products'||p==='products-managed'||p==='product-managed'||/^(cosmetic-bags|toiletry-bags|shopping-bags|cooler-bags|sports-bags|drawstring-bags|travel-organizers|card-binder|custom-oem-bags)/.test(p))return'type';
    if(p==='materials'||/^(canvas-bags|cotton-canvas-bags|nylon-bags|oxford-bags|pvc-eva-bags|neoprene-bags|rpet-bags|pu-leather-bags|felt-bags|non-woven-bags)/.test(p))return'material';
    if(p==='applications'||p.indexOf('application-')===0)return'application';
    if(['support','faq','blog','oem-bag-manufacturing-process','logo-methods-for-custom-bags','material-guide','quality-control','download-catalog'].indexOf(p)!==-1)return'support';
    if(p==='about')return'about'; if(p==='contact')return'contact'; return'';
  }
  function activeNav(){
    var nav=document.querySelector('#site-header .main-nav'); if(!nav)return;
    nav.querySelectorAll('.active,[aria-current="page"]').forEach(function(el){el.classList.remove('active');el.removeAttribute('aria-current');});
    var key=section(); if(!key)return; var el=nav.querySelector('[data-nav="'+key+'"]');
    if(el&&el.classList.contains('nav-dropdown'))el=el.querySelector(':scope > a');
    if(el){el.classList.add('active');el.setAttribute('aria-current','page');}
  }
  function mobileNav(){
    var header=document.getElementById('site-header'),toggle=header&&header.querySelector('.nav-toggle'),nav=header&&header.querySelector('.main-nav');
    if(!header||!toggle||!nav)return;
    function close(){nav.classList.remove('open');header.classList.remove('nav-open');document.body.classList.remove('nav-open');toggle.setAttribute('aria-expanded','false');header.querySelectorAll('.nav-dropdown.mobile-open').forEach(function(x){x.classList.remove('mobile-open');});}
    toggle.addEventListener('click',function(){var open=!nav.classList.contains('open');nav.classList.toggle('open',open);header.classList.toggle('nav-open',open);document.body.classList.toggle('nav-open',open);toggle.setAttribute('aria-expanded',open?'true':'false');});
    header.querySelectorAll('.nav-dropdown > a').forEach(function(a){a.addEventListener('click',function(e){if(matchMedia('(max-width:920px)').matches){e.preventDefault();var d=a.parentElement;header.querySelectorAll('.nav-dropdown.mobile-open').forEach(function(x){if(x!==d)x.classList.remove('mobile-open');});d.classList.toggle('mobile-open');}});});
    document.addEventListener('click',function(e){if(nav.classList.contains('open')&&!header.contains(e.target))close();});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
    nav.querySelectorAll('.dropdown-panel a,.main-nav>a').forEach(function(a){a.addEventListener('click',function(){if(matchMedia('(max-width:920px)').matches)close();});});
  }
  function inquiryContext(){
    var params=new URLSearchParams(location.search),product=params.get('product')||'',source=params.get('source')||'';
    var productInput=document.getElementById('inquiryProduct'),sourceInput=document.getElementById('inquirySource');
    if(productInput)productInput.value=product;
    if(sourceInput)sourceInput.value=source||document.referrer||'';
    var textarea=document.querySelector('textarea[name="Project Message"]');
    if(textarea&&product){textarea.placeholder='I am interested in '+product+'. Please share your target quantity, size, logo, material, packaging and delivery requirements.';}
    var typeSelect=document.querySelector('select[name="Bag Type"]');
    if(typeSelect&&product){Array.from(typeSelect.options).some(function(o){if(product.toLowerCase().indexOf(o.text.toLowerCase().replace(' / Tote Bags',''))!==-1){typeSelect.value=o.value;return true;}return false;});}
  }
  function productQuoteLinks(){
    var h1=document.querySelector('.product-detail-hero h1'); if(!h1)return;
    var name=h1.textContent.trim(),contact='contact?product='+encodeURIComponent(name)+'&source='+encodeURIComponent(location.pathname)+'#design-brief';
    document.querySelectorAll('a').forEach(function(a){var t=(a.textContent||'').trim().toLowerCase();if((t==='get quote'||t==='request quote')&&!a.href.includes('wa.me'))a.setAttribute('href',contact);});
    var wa='https://wa.me/8613957952677?text='+encodeURIComponent('Hello Olaytech, I am interested in '+name+'.\nTarget quantity:\nLogo:\nDestination:');
    document.querySelectorAll('a[href*="wa.me"]').forEach(function(a){a.setAttribute('href',wa);});
  }
  function jump(){if(location.hash==='#products'){setTimeout(function(){var el=document.getElementById('products')||document.getElementById('autoProductGrid');if(el)el.scrollIntoView({behavior:'smooth',block:'start'});},180);}}
  function init(){document.body.classList.add('olay-nav-v3');activeNav();mobileNav();inquiryContext();productQuoteLinks();jump();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
