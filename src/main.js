import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { fetchImages } from './js/pixabay-api';
import { renderImages } from './js/render-functions';

const searchFormEl = document.querySelector('.js-search-form');
const loader = document.querySelector('.loader');
let lightbox;

searchFormEl.addEventListener('submit', function (event) {
  event.preventDefault();

  const query = event.target.elements.user_query.value.trim();

  if (query === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term.',
    });
    return;
  }

  loader.classList.remove('is-hidden');

  fetchImages(query)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          title: 'No Results',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      } else {
        renderImages(data.hits);
        if (lightbox) {
          lightbox.refresh();
        } else {
          lightbox = new SimpleLightbox('.gallery a');
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
      event.target.reset();
    });
});
