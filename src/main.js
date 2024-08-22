import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { fetchImages } from './js/pixabay-api';
import { renderImages } from './js/render-functions';

const searchFormEl = document.querySelector('.js-search-form');
const gallery = document.querySelector('.js-gallery');
const loader = document.querySelector('.loader');
let lightbox = new SimpleLightbox('.js-gallery a');

const onSearchFormSubmit = event => {
  event.preventDefault();

  const searchedValue = searchFormEl.elements.user_query.value.trim();

  if (searchedValue === '') {
    iziToast.error({
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  loader.classList.remove('is-hidden');

  fetchImages(searchedValue)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        gallery.innerHTML = '';
        return;
      }

      const galleryMarkup = renderImages(data.hits);
      gallery.innerHTML = galleryMarkup;
      lightbox.refresh();
    })
    .catch(error => {
      console.error(error);
      iziToast.error({
        message: 'Failed to fetch images. Please try again later.',
        position: 'topRight',
      });
    })
    .finally(() => {
      loader.classList.add('is-hidden');
      searchFormEl.reset();
    });
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
