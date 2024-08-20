export function renderImages(images) {
  const gallery = document.querySelector('.js-gallery');
  gallery.innerHTML = '';

  const galleryMarkup = images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <div class="image-container">
      <li class="gallery-item">
        <div class="image-viewer">
          <a class="gallery-link" href="${largeImageURL}">
            <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
          </a>
        </div>
        <ul class="gallery-info-list">
          <li class="gallery-info-item">
            <h3>Likes</h3>
            <p>${likes}</p>
          </li>
          <li class="gallery-info-item">
            <h3>Views</h3>
            <p>${views}</p>
          </li>
          <li class="gallery-info-item">
            <h3>Comments</h3>
            <p>${comments}</p>
          </li>
          <li class="gallery-info-item">
            <h3>Downloads</h3>
            <p>${downloads}</p>
          </li>
        </ul>
      </li>
    </div>
  `
    )
    .join('');
  gallery.innerHTML = galleryMarkup;
}
