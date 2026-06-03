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


document.querySelectorAll('.thumb-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const image = button.getAttribute('data-image');
    const mainImage = document.getElementById('mainProductImage');
    if (image && mainImage) {
      mainImage.src = image;
      document.querySelectorAll('.thumb-btn').forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
    }
  });
});
