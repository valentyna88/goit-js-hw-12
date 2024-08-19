import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { fetchImages } from './js/pixabay-api';
import { renderImages } from './js/render-functions';

const searchFormEl = document.querySelector('.js-search-form');
const gallery = document.querySelector('.js-gallery');
const loadMoreBtnEl = document.querySelector('.load-more-btn');
const loader = document.querySelector('.loader');

let lightbox;
let query = '';
let currentPage = 1;

searchFormEl.addEventListener('submit', onSearch);
loadMoreBtnEl.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  const query = event.target.elements.user_query.value.trim();

  if (query === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term.',
    });
    return;
  }
  currentPage = 1;
  gallery.innerHTML = '';

  loadMoreBtnEl.classList.add('is-hidden');
  loader.classList.remove('is-hidden');

  try {
    const data = await fetchImages(query, currentPage);
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
      if (data.totalHits > currentPage * 15) {
        loadMoreBtnEl.classList.remove('is-hidden');
      }
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
    });
  } finally {
    loader.classList.add('is-hidden');
    event.target.reset();
  }
}
