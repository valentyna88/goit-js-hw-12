import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { fetchImages } from './js/pixabay-api';
import { renderImages } from './js/render-functions';

const searchFormEl = document.querySelector('.js-search-form');
const gallery = document.querySelector('.js-gallery');
const loader = document.querySelector('.js-loader');
const loadBtn = document.querySelector('.js-load-btn');

let lightbox = new SimpleLightbox('.js-gallery a');

let searchedValue = '';
let page = 1;
let totalHits = 0;
const perPage = 15;

const showLoader = () => loader.classList.remove('is-hidden');
const hideLoader = () => loader.classList.add('is-hidden');
const showLoadBtn = () => loadBtn.classList.remove('is-hidden');
const hideLoadBtn = () => loadBtn.classList.add('is-hidden');

const smoothScroll = () => {
  const { height: cardHeight } = document
    .querySelector('.gallery-item')
    .getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};

const fetchAndRenderImages = async (isNewSearch = false) => {
  try {
    const response = await fetchImages(searchedValue, page);

    if (response.data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      if (isNewSearch) gallery.innerHTML = '';
      hideLoadBtn();
      return false;
    }

    if (isNewSearch) {
      totalHits = response.data.totalHits; // Обновляем общее количество изображений при новом поиске
      gallery.innerHTML = renderImages(response.data.hits);
    } else {
      gallery.insertAdjacentHTML('beforeend', renderImages(response.data.hits));
    }

    page++;
    lightbox.refresh();

    const totalPages = Math.ceil(totalHits / perPage);

    if (page > totalPages) {
      hideLoadBtn();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadBtn();
    }

    if (!isNewSearch) {
      smoothScroll();
    }

    return true;
  } catch (error) {
    console.error('Fetch Error:', error);
    iziToast.error({
      message: 'Failed to fetch images. Please try again later.',
      position: 'topRight',
    });
    return false;
  } finally {
    hideLoader();
  }
};

const onSearchFormSubmit = async event => {
  event.preventDefault();
  page = 1;

  searchedValue = searchFormEl.elements.user_query.value.trim();

  if (searchedValue === '') {
    iziToast.error({
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }
  showLoader();
  hideLoadBtn();
  const success = await fetchAndRenderImages(true);
  searchFormEl.reset();
};

const onLoadMoreClick = async () => {
  showLoader();
  hideLoadBtn();
  await fetchAndRenderImages();
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadBtn.addEventListener('click', onLoadMoreClick);
