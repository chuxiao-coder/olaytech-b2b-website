const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });
}

document.querySelectorAll('.nav-dropdown > a').forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    if (window.innerWidth <= 1024) {
      event.preventDefault();
      trigger.parentElement.classList.toggle('open');
    }
  });
});
