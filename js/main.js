
document.addEventListener('DOMContentLoaded', function(){
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if(navToggle && nav){ navToggle.addEventListener('click', ()=>nav.classList.toggle('open')); }
  document.querySelectorAll('.nav-dropdown > a').forEach(a=>{
    a.addEventListener('click', function(e){ if(window.innerWidth <= 980){ e.preventDefault(); this.parentElement.classList.toggle('open'); }});
  });
});
