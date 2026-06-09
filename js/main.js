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
