const carousel = document.getElementById('carouselImages');
const totalImages = carousel.children.length;
let index = 0;

function showImage() {
  carousel.style.transform = `translateX(-${index * 100}%)`;
}

function nextImage() {
  index = (index + 1) % totalImages;
  showImage();
}

function prevImage() {
  index = (index - 1 + totalImages) % totalImages;
  showImage();
}
