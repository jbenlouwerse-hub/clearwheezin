function groupPhotosByYear(photos) {
  return photos.reduce((groups, photo) => {
    if (!groups[photo.year]) groups[photo.year] = [];
    groups[photo.year].push(photo);
    return groups;
  }, {});
}

function renderGallery() {
  const mount = document.querySelector('[data-gallery]');
  if (!mount || !Array.isArray(galleryPhotos)) return;

  const grouped = groupPhotosByYear(galleryPhotos);
  const years = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  mount.innerHTML = years.map(year => `
    <section class="gallery-year" aria-labelledby="gallery-${year}">
      <div class="section-header">
        <div class="eyebrow">${year}</div>
        <h2 id="gallery-${year}">${year} Gallery</h2>
      </div>
      <div class="gallery-grid">
        ${grouped[year].map((photo, index) => `
          <figure class="gallery-item">
            <a href="${photo.src}" class="gallery-link" data-gallery-index="${galleryPhotos.indexOf(photo)}" aria-label="Open image: ${photo.caption}">
              <img src="${photo.src}" alt="${photo.alt}" loading="lazy">
            </a>
            <figcaption>${photo.caption}</figcaption>
          </figure>
        `).join('')}
      </div>
    </section>
  `).join('');

  mount.querySelectorAll('.gallery-link').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      openLightbox(Number(link.dataset.galleryIndex));
    });
  });
}

function openLightbox(index) {
  const photo = galleryPhotos[index];
  const lightbox = document.querySelector('[data-lightbox]');
  const image = lightbox.querySelector('[data-lightbox-image]');
  const caption = lightbox.querySelector('[data-lightbox-caption]');

  image.src = photo.src;
  image.alt = photo.alt;
  caption.textContent = photo.caption;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  const lightbox = document.querySelector('[data-lightbox]');
  const image = lightbox.querySelector('[data-lightbox-image]');
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  image.src = '';
}

document.addEventListener('DOMContentLoaded', () => {
  renderGallery();
  document.querySelectorAll('[data-lightbox-close]').forEach(button => {
    button.addEventListener('click', closeLightbox);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeLightbox();
  });
});
