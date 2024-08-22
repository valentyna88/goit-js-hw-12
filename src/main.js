import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { fetchImages } from './js/pixabay-api';
import { renderImages } from './js/render-functions';

const searchFormEl = document.querySelector('.js-search-form');
const loader = document.querySelector('.loader');
let lightbox;

const onSearchFormSubmit = event => {
  event.preventDefault();

  const searchedValue = searchFormEl.elements.user_query.value.trim();

  if (searchedValue === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term.',
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
      } else {
        renderImages(data.hits);
        if (lightbox) {
          lightbox.refresh();
        } else {
          lightbox = new SimpleLightbox('.js-gallery a');
        }
      }
    })
    .catch(error => {
      console.error(error);
      iziToast.error({
        title: 'Error',
        message: 'Failed to fetch images. Please try again later.',
      });
    })
    .finally(() => {
      loader.classList.add('is-hidden');
      searchFormEl.reset();
    });
};
searchFormEl.addEventListener('submit', onSearchFormSubmit);
