
// Application catalog thumbnail switching. Safe to load with existing main.js.
document.querySelectorAll('.app-thumb-btn, .thumb-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const image = button.getAttribute('data-image');
    const mainImage = document.getElementById('mainProductImage') || document.getElementById('appMainProductImage');
    if (image && mainImage) {
      mainImage.src = image;
      button.parentElement.querySelectorAll('.app-thumb-btn, .thumb-btn').forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
    }
  });
});
